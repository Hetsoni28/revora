import { NextResponse, type NextRequest } from 'next/server';
import nodemailer from 'nodemailer';
import { CV_MAX_BYTES, CV_TYPES, ENQUIRIES, enquiryLines, isEnquiryKind, type EnquiryField } from '@/lib/enquiry';
import { SITE, SITE_URL } from '@/lib/seo';

/**
 * POST /api/enquiry — every form on the site sends here. The email goes out through the cPanel
 * mailbox set in the environment (Vercel → Settings → Environment Variables):
 *
 *   SMTP_HOST   e.g. mail.revorahealthcare.com
 *   SMTP_PORT   465 (SSL) or 587 (STARTTLS)
 *   SMTP_USER   the full mailbox address, e.g. info@revorahealthcare.com
 *   SMTP_PASS   that mailbox's password            ← never prefix with NEXT_PUBLIC_
 *   MAIL_FROM   optional sender, defaults to SMTP_USER
 *   ENQUIRY_TO  optional: send every enquiry to this one address instead (handy for testing)
 *
 * Until those are set the route answers 503 and the forms open the visitor's email app instead.
 */

const smtp = () => {
  const { SMTP_HOST, SMTP_PORT, SMTP_USER, SMTP_PASS } = process.env;
  if (!SMTP_HOST || !SMTP_USER || !SMTP_PASS) return null;
  const port = Number(SMTP_PORT) || 465;
  return nodemailer.createTransport({ host: SMTP_HOST, port, secure: port === 465, auth: { user: SMTP_USER, pass: SMTP_PASS } });
};

// Spam protection, part 1: a few submissions per address per 10 minutes. Kept in memory, so it
// resets when the server restarts — enough to stop a bot hammering one instance.
const WINDOW_MS = 10 * 60 * 1000;
const MAX_PER_WINDOW = 5;
const hits = new Map<string, number[]>();
function rateLimited(ip: string) {
  const now = Date.now();
  const recent = (hits.get(ip) ?? []).filter((t) => now - t < WINDOW_MS);
  recent.push(now);
  hits.set(ip, recent);
  if (hits.size > 5000) hits.clear();
  return recent.length > MAX_PER_WINDOW;
}

const EMAIL_RE = /^[^\s@<>()[\]\\,;:"]+@[^\s@<>()[\]\\,;:"]+\.[a-z]{2,}$/i;
const escapeHtml = (s: string) => s.replace(/[&<>"']/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' })[c]!);
const oneLine = (s: string) => s.replace(/[\r\n]+/g, ' ').trim();

const fail = (status: number, error: string) => NextResponse.json({ ok: false, error }, { status });

export async function POST(request: NextRequest) {
  const transport = smtp();
  if (!transport) return fail(503, 'not-configured');

  let form: FormData;
  try {
    form = await request.formData();
  } catch {
    return fail(400, 'Please check the form and try again.');
  }

  // Spam protection, part 2: a hidden field people never see (bots fill it in), and a minimum time
  // between the form appearing and being sent. Bots get a quiet "ok" so they don't retry.
  const startedAt = Number(form.get('_t'));
  if (form.get('website') || !startedAt || Date.now() - startedAt < 3000) return NextResponse.json({ ok: true });

  const ip = request.headers.get('x-forwarded-for')?.split(',')[0]?.trim() || 'unknown';
  if (rateLimited(ip)) return fail(429, 'Too many messages in a short time. Please try again in a few minutes.');

  const kindId = String(form.get('kind') ?? '');
  if (!isEnquiryKind(kindId)) return fail(400, 'Unknown form.');
  const kind = ENQUIRIES[kindId];

  // Only the fields this form defines, each trimmed and length-checked.
  const values: Record<string, string> = {};
  for (const f of kind.fields as EnquiryField[]) {
    const v = String(form.get(f.name) ?? '').trim();
    if (f.required && !v) return fail(400, `Please fill in ${f.label.toLowerCase()}.`);
    if (f.max && v.length > f.max) return fail(400, `${f.label} is too long.`);
    values[f.name] = f.name === 'message' ? v : oneLine(v);
  }
  if (values.email && !EMAIL_RE.test(values.email)) return fail(400, 'Please enter a valid email address.');

  let attachment: { filename: string; content: Buffer; contentType: string } | undefined;
  const cv = form.get('cv');
  if ('cv' in kind && kind.cv && cv instanceof File && cv.size > 0) {
    if (cv.size > CV_MAX_BYTES) return fail(400, 'Your CV must be 4 MB or smaller.');
    const ALLOWED_TYPES = [...CV_TYPES, 'image/jpeg', 'image/png', 'image/webp'];
    if (!ALLOWED_TYPES.includes(cv.type)) return fail(400, 'Please attach a PDF, Word or image file.');
    const safeName = cv.name.replace(/[^\w.\- ]+/g, '_').slice(-120) || 'cv';
    attachment = { filename: safeName, content: Buffer.from(await cv.arrayBuffer()), contentType: cv.type };
  }

  const lines = enquiryLines(kindId, values);
  const page = String(form.get('page') ?? '').slice(0, 300);
  const text = [kind.title, '', ...lines, '', values.message ? `Message:\n${values.message}` : '', '', `Sent from ${page || SITE_URL}`].join('\n');
  const html = `<div style="font-family:Arial,sans-serif;font-size:14px;color:#1E242B;line-height:1.6">
    <h2 style="margin:0 0 12px;color:#0B4A8F;font-size:18px">${escapeHtml(kind.title)}</h2>
    <table cellpadding="6" style="border-collapse:collapse">${lines
      .map((l) => {
        const [label, ...rest] = l.split(': ');
        return `<tr><td style="color:#56606B;vertical-align:top;white-space:nowrap">${escapeHtml(label)}</td><td><b>${escapeHtml(rest.join(': '))}</b></td></tr>`;
      })
      .join('')}</table>
    ${values.message ? `<p style="margin:16px 0 4px;color:#56606B">Message</p><p style="margin:0;white-space:pre-wrap">${escapeHtml(values.message)}</p>` : ''}
    ${attachment ? `<p style="margin:16px 0 0;color:#56606B">CV attached: ${escapeHtml(attachment.filename)}</p>` : ''}
    <p style="margin:24px 0 0;font-size:12px;color:#8A939D">Sent from ${escapeHtml(page || SITE_URL)} — reply to this email to answer ${escapeHtml(values.name)} directly.</p>
  </div>`;

  const from = process.env.MAIL_FROM || process.env.SMTP_USER!;
  try {
    await transport.sendMail({
      from: { name: `${SITE.name} website`, address: from },
      to: process.env.ENQUIRY_TO || kind.to,
      replyTo: { name: values.name, address: values.email },
      subject: oneLine(kind.subject(values)).slice(0, 200),
      text,
      html,
      attachments: attachment ? [attachment] : undefined,
    });
  } catch (err) {
    console.error('[enquiry] sending failed:', (err as Error).message);
    return fail(502, 'We couldn’t send your message just now. Please try again, or email us directly.');
  }

  // A short confirmation to the visitor (awaited: serverless work can stop once we reply).
  // If it fails, their enquiry has still reached us.
  await transport
    .sendMail({
      from: { name: SITE.name, address: from },
      to: { name: values.name, address: values.email },
      subject: `We’ve received your ${kind.title.toLowerCase()}`,
      text: `Dear ${values.name},\n\nThank you for contacting ${SITE.name}. We’ve received your ${kind.title.toLowerCase()} and our team will get back to you soon.\n\nRegards,\n${SITE.legalName}\n${SITE_URL}`,
    })
    .catch((err) => console.warn('[enquiry] confirmation email failed:', (err as Error).message));

  return NextResponse.json({ ok: true });
}
