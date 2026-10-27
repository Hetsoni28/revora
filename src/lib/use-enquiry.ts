'use client';

import { useEffect, useRef, useState } from 'react';
import { toast } from 'sonner';
import { ENQUIRIES, enquiryLines, type EnquiryKindId } from '@/lib/enquiry';

/**
 * Sends a form to /api/enquiry. If email sending isn't set up yet (or the server can't be reached),
 * it falls back to opening the visitor's email app with the same message filled in, so a form never
 * dead-ends. Render <Honeypot inputRef={honeypot} /> inside the form for the spam check.
 */
export function useEnquiry(kind: EnquiryKindId) {
  const [sending, setSending] = useState(false);
  // when the form appeared (bots submit instantly), and a hidden field only bots fill in
  const startedAt = useRef(0);
  const honeypot = useRef<HTMLInputElement>(null);
  useEffect(() => {
    startedAt.current = Date.now();
  }, []);

  const openEmailApp = (values: Record<string, string>, note?: string) => {
    const k = ENQUIRIES[kind];
    const body = [...enquiryLines(kind, values), '', values.message ?? '', note ?? ''].join('\n').trim();
    window.location.href = `mailto:${k.to}?subject=${encodeURIComponent(k.subject(values))}&body=${encodeURIComponent(body)}`;
    toast.success('Your email app is opening', { description: `Press send to reach ${k.to}.` });
  };

  /** Resolves true once the enquiry has been sent (or handed to the email app). */
  async function send(values: Record<string, string>, cv?: File | null): Promise<boolean> {
    const data = new FormData();
    data.set('kind', kind);
    data.set('page', window.location.href);
    data.set('_t', String(startedAt.current));
    data.set('website', honeypot.current?.value ?? '');
    for (const [k, v] of Object.entries(values)) data.set(k, v);
    if (cv) data.set('cv', cv);

    setSending(true);
    try {
      const res = await fetch('/api/enquiry', { method: 'POST', body: data });
      const json = (await res.json().catch(() => ({}))) as { ok?: boolean; error?: string };
      if (res.ok && json.ok) {
        toast.success('Thank you — your message has been sent', { description: 'We’ve emailed you a confirmation and will reply soon.' });
        return true;
      }
      if (res.status === 503) {
        openEmailApp(values, cv ? '(Please attach your CV.)' : undefined);
        return true;
      }
      toast.error(json.error ?? 'Something went wrong. Please try again.');
      return false;
    } catch {
      openEmailApp(values, cv ? '(Please attach your CV.)' : undefined);
      return true;
    } finally {
      setSending(false);
    }
  }

  return { send, sending, honeypot };
}
