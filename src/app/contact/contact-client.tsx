'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useLenis } from 'lenis/react';
import { AlertCircle, ArrowRight, ArrowUpRight, Briefcase, Factory, Globe2, Mail, MapPin, Phone, Send, Stethoscope, Truck } from 'lucide-react';
import { FadeUp } from '@/components/ui/primitives';
import { PageHero } from '@/components/ui/page-hero';
import { SectionHeading } from '@/components/ui/section-heading';
import { Button } from '@/components/ui/button';
import { SITE } from '@/lib/seo';
import { useEnquiry } from '@/lib/use-enquiry';
import { Honeypot } from '@/components/ui/honeypot';

/**
 * Who to write to. Picking a card selects that team in the message form below (each is its own
 * enquiry type, so the right person sees it). Careers goes to the Careers form, which takes a CV.
 */
const DESKS = [
  { id: 'products', icon: Stethoscope, title: 'Product enquiry', text: 'Doctors and hospitals: samples, literature or a visit from our representative.', cta: 'Send a product enquiry', team: 'product team' },
  { id: 'distribution', icon: Truck, title: 'Distributor enquiry', text: 'Distributors, stockists and institutional supply in India.', cta: 'Become a distributor', team: 'distribution team' },
  { id: 'manufacturing', icon: Factory, title: 'Manufacturing enquiry', text: 'Third-party and contract manufacturing under WHO-GMP.', cta: 'Discuss manufacturing', team: 'manufacturing team' },
  { id: 'exports', icon: Globe2, title: 'Export enquiry', text: 'Importers and distribution partners outside India.', cta: 'Send an export enquiry', team: 'export team' },
  { id: 'careers', icon: Briefcase, title: 'Careers', text: 'Send your CV — we’ll be in touch.', cta: 'Apply with your CV', team: 'HR team', href: '/careers#apply' },
  { id: 'general', icon: Mail, title: 'General & corporate', text: 'Company information, certificates and media.', cta: 'Write to us', team: 'corporate team' },
] as const;
type DeskId = (typeof DESKS)[number]['id'];

const ADDRESS = [SITE.address.streetAddress, `${SITE.address.addressLocality}, ${SITE.address.addressRegion} ${SITE.address.postalCode}`];
const MAP_URL = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(`${SITE.legalName}, ${ADDRESS.join(', ')}`)}`;

export function ContactClient() {
  const [desk, setDesk] = useState<DeskId>('products');
  return (
    <>
      <PageHero
        backdrop="/images/heroes/hero-contact.webp"
        crumbs={[{ label: 'Home', href: '/' }, { label: 'Contact Us' }]}
        eyebrow="Contact Revora Healthcare"
        lines={['Let’s talk', 'healthcare.']}
        highlight={{ 'healthcare.': 'text-revora-cobalt' }}
        text="Questions about our products, a distributorship, manufacturing, export or working with us — write to the right team and we’ll get back to you."
        actions={
          <>
            <Button href="#message" arrow="down" magnetic icon={<Send />}>Send a message</Button>
            <Button href={MAP_URL} variant="outline" icon={<MapPin />}>Find our office</Button>
          </>
        }
        visual={<OfficeCard />}
      />
      <Desks selected={desk} onPick={setDesk} />
      <MessageForm desk={desk} onDesk={setDesk} />
      <SafetyNote />
    </>
  );
}

/* ── office card (hero visual) ────────────────────────────── */
function OfficeCard() {
  return (
    <FadeUp delay={0.3}>
      <div className="relative isolate overflow-hidden rounded-[28px] bg-revora-cobalt-deep p-8 text-white shadow-[0_40px_80px_-40px_rgba(11,74,143,0.6)] tablet:p-10">
        <div aria-hidden className="absolute inset-0 -z-10 bg-[radial-gradient(ellipse_at_top_right,rgba(58,130,200,0.55),transparent_60%),radial-gradient(ellipse_at_bottom_left,rgba(215,38,46,0.25),transparent_55%)]" />
        <span className="grid h-12 w-12 place-items-center rounded-2xl bg-white/15">
          <MapPin className="h-5 w-5" />
        </span>
        <p className="mt-6 font-sans text-[11px] font-semibold uppercase tracking-[0.18em] text-revora-cobalt-pale">Registered office</p>
        <p className="mt-2 font-heading text-[1.4rem] font-extrabold leading-snug">{SITE.legalName}</p>
        <address className="mt-3 font-sans text-[15px] not-italic leading-[1.7] text-white/80">
          {ADDRESS.map((line) => (
            <span key={line} className="block">{line}</span>
          ))}
        </address>
        <div className="mt-7 flex flex-wrap gap-x-6 gap-y-3 border-t border-white/15 pt-6 font-sans text-[14.5px]">
          <a href={`mailto:${SITE.email}`} className="inline-flex min-h-6 items-center gap-2 font-semibold hover:underline">
            <Mail className="h-4 w-4 text-revora-cobalt-pale" /> {SITE.email}
          </a>
          <a href={SITE.phone.href} className="inline-flex min-h-6 items-center gap-2 font-semibold hover:underline">
            <Phone className="h-4 w-4 text-revora-cobalt-pale" /> {SITE.phone.label}
          </a>
          <a href={MAP_URL} target="_blank" rel="noopener noreferrer" className="inline-flex min-h-6 items-center gap-1.5 font-semibold hover:underline">
            Open in Google Maps <ArrowUpRight className="h-4 w-4" />
          </a>
        </div>
      </div>
    </FadeUp>
  );
}

/* ── which team to write to ───────────────────────────────── */
function Desks({ selected, onPick }: { selected: DeskId; onPick: (id: DeskId) => void }) {
  const lenis = useLenis();
  const toForm = () => {
    const form = document.getElementById('message');
    if (!form) return;
    if (lenis) lenis.scrollTo(form);
    else form.scrollIntoView({ behavior: 'smooth', block: 'start' });
    // focus the first field once the scroll has settled, so people can start typing
    setTimeout(() => document.querySelector<HTMLInputElement>('#message input[autocomplete="name"]')?.focus({ preventScroll: true }), 900);
  };
  const card =
    'group flex h-full w-full flex-col rounded-[24px] border bg-[#F6F9FC] p-7 text-left transition-[box-shadow,border-color] duration-500 hover:shadow-[0_24px_50px_-28px_rgba(11,74,143,0.45)]';
  return (
    <section className="bg-white px-5 py-14 tablet:px-8 tablet:py-20">
      <div className="mx-auto max-w-330">
        <SectionHeading eyebrow="Write to the right team" lines={['Who should I contact?']} highlight={{ 'contact?': 'text-revora-cobalt' }} />
        <div className="mt-12 grid gap-4 tablet:grid-cols-2 desktop:grid-cols-3">
          {DESKS.map((d, i) => {
            const body = (
              <>
                <span className="grid h-12 w-12 place-items-center rounded-2xl bg-white text-revora-cobalt shadow-sm transition-transform duration-500 group-hover:rotate-[-8deg]">
                  <d.icon className="h-5 w-5" />
                </span>
                <h3 className="mt-6 font-heading text-[1.35rem] font-extrabold text-revora-slate">{d.title}</h3>
                <p className="mt-2 font-sans text-[14.5px] leading-[1.65] text-revora-slate-light">{d.text}</p>
                <span className="mt-auto inline-flex items-center gap-1.5 pt-6 font-sans text-[14px] font-semibold text-revora-cobalt">
                  {d.cta}
                  {'href' in d ? (
                    <ArrowUpRight className="h-4 w-4 transition-transform duration-500 group-hover:rotate-45" />
                  ) : (
                    <ArrowRight className="h-4 w-4 transition-transform duration-500 group-hover:translate-x-1" />
                  )}
                </span>
              </>
            );
            return (
              <FadeUp key={d.id} delay={(i % 3) * 0.08}>
                {'href' in d ? (
                  <Link href={d.href} className={`${card} border-revora-cobalt/10`}>
                    {body}
                  </Link>
                ) : (
                  <button
                    type="button"
                    aria-pressed={selected === d.id}
                    onClick={() => {
                      onPick(d.id);
                      toForm();
                    }}
                    className={`${card} ${selected === d.id ? 'border-revora-cobalt/40' : 'border-revora-cobalt/10'}`}
                  >
                    {body}
                  </button>
                )}
              </FadeUp>
            );
          })}
        </div>
      </div>
    </section>
  );
}

/* ── message form ─────────────────────────────────────────── */
function MessageForm({ desk: deskId, onDesk }: { desk: DeskId; onDesk: (id: DeskId) => void }) {
  const [form, setForm] = useState({ name: '', email: '', phone: '', organisation: '', message: '' });
  const set = (k: keyof typeof form) => (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => setForm({ ...form, [k]: e.target.value });
  const desk = DESKS.find((d) => d.id === deskId) ?? DESKS[0];

  const { send, sending, honeypot } = useEnquiry(`contact-${desk.id}`);

  // Sent straight to the chosen team's inbox; falls back to the visitor's email app until email is set up.
  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    const { name, organisation, email, phone, message } = form;
    if (await send({ name, organisation, email, phone, message })) setForm({ name: '', email: '', phone: '', organisation: '', message: '' });
  };

  const field = 'w-full rounded-xl border border-revora-cobalt/15 bg-white px-4 py-3 font-sans text-[16px] text-revora-slate outline-none transition-[border-color,box-shadow] placeholder:text-revora-slate-muted focus:border-revora-cobalt focus:shadow-[0_0_0_4px_rgba(11,74,143,0.12)] tablet:text-[15px]';
  const label = 'mb-1.5 block font-sans text-[12px] font-semibold uppercase tracking-[0.12em] text-revora-slate-light';

  return (
    <section id="message" className="scroll-mt-28 px-5 py-14 tablet:px-8 tablet:py-20">
      <div className="mx-auto grid max-w-330 grid-cols-[minmax(0,1fr)] gap-12 tablet-lg:grid-cols-[0.8fr_1.2fr] tablet-lg:gap-16">
        <div className="tablet-lg:sticky tablet-lg:top-32 tablet-lg:self-start desktop:top-48">
          <SectionHeading eyebrow="Send a message" lines={['How can we', 'help?']} highlight={{ 'help?': 'text-revora-cobalt' }} />
          <FadeUp delay={0.15}>
            <p className="mt-6 max-w-sm font-sans text-[16px] leading-[1.7] text-revora-slate-light">
              Choose what it’s about and your message goes straight to that team.
            </p>
          </FadeUp>
        </div>

        <FadeUp delay={0.1}>
          <form onSubmit={submit} className="relative rounded-[28px] border border-revora-cobalt/10 bg-white p-6 tablet:p-9">
            <Honeypot inputRef={honeypot} />
            <div className="grid gap-5 tablet:grid-cols-2">
              <label className="tablet:col-span-2">
                <span className={label}>About</span>
                <select value={desk.id} onChange={(e) => onDesk(e.target.value as DeskId)} className={field}>
                  {DESKS.filter((d) => !('href' in d)).map((d) => (
                    <option key={d.id} value={d.id}>{d.title}</option>
                  ))}
                </select>
              </label>
              <label>
                <span className={label}>Full name *</span>
                <input required value={form.name} onChange={set('name')} placeholder="Your name" autoComplete="name" className={field} />
              </label>
              <label>
                <span className={label}>Organisation</span>
                <input value={form.organisation} onChange={set('organisation')} placeholder="Hospital, clinic or company" autoComplete="organization" className={field} />
              </label>
              <label>
                <span className={label}>Email *</span>
                <input required type="email" value={form.email} onChange={set('email')} placeholder="you@example.com" autoComplete="email" className={field} />
              </label>
              <label>
                <span className={label}>Phone</span>
                <input type="tel" value={form.phone} onChange={set('phone')} placeholder="+91" autoComplete="tel" className={field} />
              </label>
              <label className="tablet:col-span-2">
                <span className={label}>Message *</span>
                <textarea required rows={5} value={form.message} onChange={set('message')} placeholder="How can we help?" className={`${field} resize-y`} />
              </label>
            </div>
            <div className="mt-7 flex flex-wrap items-center justify-between gap-4">
              <p className="font-sans text-[13px] text-revora-slate-muted">Goes straight to our {desk.team}</p>
              <Button type="submit" arrow="up-right" magnetic icon={<Send />} disabled={sending}>{sending ? 'Sending…' : 'Send message'}</Button>
            </div>
          </form>
        </FadeUp>
      </div>
    </section>
  );
}

/* ── drug safety (pharmacovigilance) ─────────────────────── */
function SafetyNote() {
  return (
    <section className="px-5 pb-14 tablet:px-8 tablet:pb-20">
      <FadeUp className="mx-auto flex max-w-330 flex-col gap-4 rounded-[28px] border border-revora-crimson/20 bg-revora-crimson-tint p-7 tablet:flex-row tablet:items-center tablet:p-9">
        <span className="grid h-12 w-12 shrink-0 place-items-center rounded-2xl bg-white text-revora-crimson">
          <AlertCircle className="h-5 w-5" />
        </span>
        <p className="font-sans text-[15px] leading-[1.7] text-revora-slate">
          <span className="font-semibold">Reporting a side effect or a product quality problem?</span> Please use our{' '}
          <Link href="/pharmacovigilance-policy#report" className="font-semibold text-revora-crimson-dark hover:underline">online safety report form</Link> or call{' '}
          <a href={SITE.phone.href} className="font-semibold text-revora-crimson-dark hover:underline">{SITE.phone.label}</a>.
        </p>
      </FadeUp>
    </section>
  );
}
