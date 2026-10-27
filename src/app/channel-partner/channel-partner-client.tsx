'use client';

import { Suspense, useEffect, useState } from 'react';
import { useSearchParams } from 'next/navigation';
import { motion, useReducedMotion } from 'framer-motion';
import { Building2, Eye, Factory, Handshake, Layers, MapPin, MessageSquare, Package, Rocket, Send, Sparkles, Store, Truck } from 'lucide-react';
import { expoOut } from '@/lib/easings';
import { useCatalogue } from '@/components/catalogue/catalogue-context';
import { FadeUp } from '@/components/ui/primitives';
import { PageHero } from '@/components/ui/page-hero';
import { SectionHeading } from '@/components/ui/section-heading';
import { Button } from '@/components/ui/button';
import { useEnquiry } from '@/lib/use-enquiry';
import { Honeypot } from '@/components/ui/honeypot';

const PARTNER_EMAIL = 'depot@revorahealthcare.com';

const benefitsFor = (brands: number, areas: number) => [
  { icon: Layers, title: 'A focused range', text: `${brands} ophthalmic brands across ${areas} therapy areas.` },
  { icon: Factory, title: 'Made in our plant', text: 'WHO-GMP certified, EU-compliant manufacturing.' },
  { icon: Package, title: 'Premium packs', text: 'Cartons doctors and patients recognise.' },
  { icon: Building2, title: 'Backed by HQ', text: 'Sales and supply support from Ahmedabad.' },
];

const rangesFor = (brands: number, areas: number, innovationCount: number) => [
  { icon: Eye, count: brands, title: 'Ophthalmic range', text: `Prescription eye drops and eye nutrition across ${areas} therapy areas.`, href: '/profile#portfolio', cta: 'See the brands' },
  { icon: Sparkles, count: innovationCount, title: 'Innovation range', text: 'Warmers, cooling and field-care products for tough conditions.', href: '/innovation', cta: 'See the products' },
];

const STEPS = [
  { icon: Send, title: 'Enquire', text: 'Send us your details.' },
  { icon: MessageSquare, title: 'Talk', text: 'Meet our business team.' },
  { icon: Handshake, title: 'Agree', text: 'Set territory and terms.' },
  { icon: Rocket, title: 'Launch', text: 'Bring Revora to market.' },
];

const TYPES = [
  { icon: Truck, label: 'Distributor' },
  { icon: Store, label: 'Stockist' },
  { icon: Building2, label: 'Institutional supplier' },
];

export function ChannelPartnerClient() {
  const reduce = useReducedMotion();
  const { products, categories, innovation } = useCatalogue();
  const BENEFITS = benefitsFor(products.length, categories.length);
  const RANGES = rangesFor(products.length, categories.length, innovation.length);
  return (
    <>
      <PageHero
        backdrop="/images/heroes/hero-channel-partner.webp"
        crumbs={[{ label: 'Home', href: '/' }, { label: 'Channel Partner' }]}
        eyebrow="Pharma channel partner"
        lines={['Grow with', 'Revora.']}
        highlight={{ 'Revora.': 'text-revora-cobalt' }}
        text="Bring our eye-care range to your territory."
        actions={
          <>
            <Button href="#apply" arrow="down" magnetic>Become a partner</Button>
            <Button href="/profile#portfolio" variant="outline">See the range</Button>
          </>
        }
        visual={
          <PartnerCard />
        }
      />

      {/* ── why partner ── */}
      <section className="px-5 py-20 tablet:px-8 tablet:py-28">
        <div className="mx-auto max-w-330">
          <SectionHeading eyebrow="Why partner with us" lines={['Everything you need', 'to grow.']} highlight={{ 'grow.': 'text-revora-crimson' }} />
          <div className="mt-12 grid gap-5 tablet:grid-cols-2 desktop:grid-cols-4">
            {BENEFITS.map((b, i) => (
              <FadeUp key={b.title} delay={i * 0.08}>
                <div className="group relative isolate flex h-full min-h-55 flex-col overflow-hidden rounded-[28px] border border-revora-cobalt/10 bg-white p-7">
                  <span aria-hidden className="absolute inset-0 -z-10 translate-y-full bg-revora-cobalt transition-transform duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:translate-y-0" />
                  <span className="grid h-12 w-12 place-items-center rounded-2xl bg-revora-sky text-revora-cobalt transition-all duration-500 group-hover:rotate-[-8deg] group-hover:bg-white">
                    <b.icon className="h-5 w-5" />
                  </span>
                  <h3 className="mt-auto pt-10 font-heading text-[1.35rem] font-extrabold leading-tight text-revora-slate transition-colors duration-500 group-hover:text-white">{b.title}</h3>
                  <p className="mt-2 font-sans text-[14.5px] leading-[1.6] text-revora-slate-light transition-colors duration-500 group-hover:text-white/80">{b.text}</p>
                </div>
              </FadeUp>
            ))}
          </div>
        </div>
      </section>

      {/* ── the ranges ── */}
      <section className="bg-white px-5 py-20 tablet:px-8 tablet:py-28">
        <div className="mx-auto max-w-330">
          <SectionHeading eyebrow="What you’ll carry" lines={['Two ranges.', 'One partner.']} highlight={{ 'One': 'text-revora-crimson' }} />
          <div className="mt-12 grid gap-5 tablet-lg:grid-cols-2">
            {RANGES.map((r, i) => (
              <FadeUp key={r.title} delay={i * 0.1}>
                <a href={r.href} className="group relative isolate flex h-full min-h-65 flex-col overflow-hidden rounded-[28px] border border-revora-cobalt/10 bg-[#F6F9FC] p-8 tablet:p-10">
                  <span aria-hidden className="absolute inset-0 -z-10 translate-y-full bg-revora-cobalt transition-transform duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:translate-y-0" />
                  <div className="flex items-start justify-between">
                    <span className="grid h-12 w-12 place-items-center rounded-2xl bg-white text-revora-cobalt shadow-sm transition-all duration-500 group-hover:rotate-[-8deg] group-hover:bg-white/15 group-hover:text-white">
                      <r.icon className="h-5 w-5" />
                    </span>
                    <span aria-hidden className="font-heading text-[56px] font-extrabold leading-none tracking-[-0.04em] text-revora-cobalt/15 transition-colors duration-500 group-hover:text-white/25">{r.count}</span>
                  </div>
                  <h3 className="mt-auto pt-10 font-heading text-[1.6rem] font-extrabold leading-tight text-revora-slate transition-colors duration-500 group-hover:text-white">{r.title}</h3>
                  <p className="mt-2 font-sans text-[15px] leading-[1.6] text-revora-slate-light transition-colors duration-500 group-hover:text-white/80">{r.text}</p>
                  <span className="mt-6 font-sans text-[14px] font-semibold text-revora-cobalt transition-colors duration-500 group-hover:text-white">{r.cta} →</span>
                </a>
              </FadeUp>
            ))}
          </div>
        </div>
      </section>

      {/* ── how it works ── */}
      <section className="relative isolate overflow-hidden bg-revora-cobalt-deep px-5 py-20 text-white tablet:px-8 tablet:py-28">
        <div aria-hidden className="absolute inset-0 -z-10 bg-[radial-gradient(ellipse_at_top_right,rgba(58,130,200,0.5),transparent_60%)]" />
        <div className="mx-auto max-w-330">
          <SectionHeading tone="light" eyebrow="How it works" lines={['Four simple steps.']} highlight={{ 'steps.': 'text-revora-cobalt-pale' }} />
          <ol className="mt-12 grid grid-cols-2 gap-5 desktop:grid-cols-4">
            {STEPS.map((s, i) => (
              <motion.li
                key={s.title}
                initial={reduce ? false : { opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-10% 0px' }}
                transition={{ duration: 0.7, delay: i * 0.12, ease: expoOut }}
                className="rounded-[24px] border border-white/10 bg-white/4 p-6 backdrop-blur-sm"
              >
                <div className="flex items-center justify-between">
                  <span className="grid h-12 w-12 place-items-center rounded-2xl bg-white/10 text-revora-cobalt-pale">
                    <s.icon className="h-5 w-5" />
                  </span>
                  <span aria-hidden className="font-heading text-3xl font-extrabold text-white/15">0{i + 1}</span>
                </div>
                <h3 className="mt-8 font-heading text-2xl font-extrabold">{s.title}</h3>
                <p className="mt-1 font-sans text-[14.5px] text-white/65">{s.text}</p>
              </motion.li>
            ))}
          </ol>
        </div>
      </section>

      <ApplyForm />
    </>
  );
}

/* ── partnership enquiry ──────────────────────────────────── */
function ApplyForm() {
  const [form, setForm] = useState({ type: TYPES[0].label, name: '', company: '', city: '', phone: '', email: '', message: '' });
  const set = (k: keyof typeof form) => (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => setForm({ ...form, [k]: e.target.value });

  const { send, sending, honeypot } = useEnquiry('partner');

  // Sent straight to our inbox; falls back to the visitor's email app until email is set up.
  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (await send(form)) setForm({ type: TYPES[0].label, name: '', company: '', city: '', phone: '', email: '', message: '' });
  };

  const field = 'w-full rounded-xl border border-revora-cobalt/15 bg-white px-4 py-3 font-sans text-[16px] text-revora-slate outline-none transition-[border-color,box-shadow] placeholder:text-revora-slate-muted focus:border-revora-cobalt focus:shadow-[0_0_0_4px_rgba(11,74,143,0.12)] tablet:text-[15px]';
  const label = 'mb-1.5 block font-sans text-[12px] font-semibold uppercase tracking-[0.12em] text-revora-slate-light';

  return (
    <section id="apply" className="px-5 py-20 tablet:px-8 tablet:py-28">
      <div className="mx-auto grid max-w-330 grid-cols-[minmax(0,1fr)] gap-12 tablet-lg:grid-cols-[0.8fr_1.2fr] tablet-lg:gap-16">
        <div className="tablet-lg:sticky tablet-lg:top-32 tablet-lg:self-start desktop:top-48">
          <SectionHeading eyebrow="Apply" lines={['Let’s grow', 'together.']} highlight={{ 'together.': 'text-revora-cobalt' }} />
          <FadeUp delay={0.15}>
            <p className="mt-6 max-w-sm font-sans text-[16px] leading-[1.7] text-revora-slate-light">Tell us about your business. Our team will get back to you.</p>
            <a href={`mailto:${PARTNER_EMAIL}`} className="mt-6 inline-flex min-h-6 items-center gap-2 font-sans text-[15px] font-semibold text-revora-cobalt hover:underline">
              <Send className="h-4 w-4" /> {PARTNER_EMAIL}
            </a>
          </FadeUp>
        </div>

        <FadeUp delay={0.1}>
          <Suspense fallback={null}>
            <InterestPrefill onInterest={(it) => setForm((f) => ({ ...f, message: `Interested in: ${it}` }))} />
          </Suspense>
          <form onSubmit={submit} className="relative rounded-[28px] border border-revora-cobalt/10 bg-white p-6 tablet:p-9">
            <Honeypot inputRef={honeypot} />
            <div className="grid gap-5 tablet:grid-cols-2">
              <div className="tablet:col-span-2">
                <span className={label}>I am a</span>
                <div className="grid grid-cols-3 gap-2">
                  {TYPES.map((t) => {
                    const on = form.type === t.label;
                    return (
                      <button
                        type="button"
                        key={t.label}
                        onClick={() => setForm({ ...form, type: t.label })}
                        aria-pressed={on}
                        className={`flex flex-col items-center gap-2 rounded-2xl border px-3 py-4 font-sans text-[13px] font-semibold transition-colors ${on ? 'border-revora-cobalt bg-revora-cobalt text-white' : 'border-revora-cobalt/15 bg-white text-revora-slate hover:border-revora-cobalt'}`}
                      >
                        <t.icon className="h-5 w-5" />
                        {t.label}
                      </button>
                    );
                  })}
                </div>
              </div>
              <label>
                <span className={label}>Your name *</span>
                <input required value={form.name} onChange={set('name')} className={field} placeholder="Full name" />
              </label>
              <label>
                <span className={label}>Company</span>
                <input value={form.company} onChange={set('company')} className={field} placeholder="Firm name" />
              </label>
              <label>
                <span className={label}>City / territory *</span>
                <input required value={form.city} onChange={set('city')} className={field} placeholder="e.g. Surat" />
              </label>
              <label>
                <span className={label}>Phone *</span>
                <input required type="tel" value={form.phone} onChange={set('phone')} className={field} placeholder="+91" />
              </label>
              <label className="tablet:col-span-2">
                <span className={label}>Email</span>
                <input type="email" value={form.email} onChange={set('email')} className={field} placeholder="you@example.com" />
              </label>
              <label className="tablet:col-span-2">
                <span className={label}>Message</span>
                <textarea rows={3} value={form.message} onChange={set('message')} className={field} placeholder="Your business and the area you cover" />
              </label>
            </div>
            <div className="mt-7 flex justify-end">
              <Button type="submit" arrow="up-right" magnetic disabled={sending}>{sending ? 'Sending…' : 'Send enquiry'}</Button>
            </div>
          </form>
        </FadeUp>
      </div>
    </section>
  );
}

/** Fills the message from the menu's ?interest= link (kept in Suspense so the page stays static). */
function InterestPrefill({ onInterest }: { onInterest: (interest: string) => void }) {
  const interest = useSearchParams().get('interest');
  useEffect(() => {
    if (interest) onInterest(interest);
    // only when the chosen range changes
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [interest]);
  return null;
}

/* ── hero: partner card ───────────────────────────────────── */
function PartnerCard() {
  const reduce = useReducedMotion();
  return (
    <motion.div
      initial={reduce ? false : { opacity: 0, y: 40, rotate: 2 }}
      animate={{ opacity: 1, y: 0, rotate: 0 }}
      transition={{ duration: 1.1, delay: 0.2, ease: expoOut }}
      className="relative isolate mx-auto w-full max-w-130 overflow-hidden rounded-[28px] bg-revora-cobalt-deep p-8 text-white shadow-[0_40px_80px_-40px_rgba(11,74,143,0.6)] tablet:rounded-[32px] tablet:p-10"
    >
      <div aria-hidden className="absolute inset-0 -z-10 bg-[radial-gradient(ellipse_at_top_right,rgba(58,130,200,0.55),transparent_60%),radial-gradient(ellipse_at_bottom_left,rgba(215,38,46,0.22),transparent_55%)]" />
      <div className="flex items-center justify-between gap-4">
        <span className="font-sans text-[11px] font-semibold uppercase tracking-[0.18em] text-revora-cobalt-pale">Partner programme</span>
        <span className="inline-flex items-center gap-1.5 rounded-full bg-white/10 px-3 py-1.5 font-sans text-[11px] font-semibold">
          <MapPin className="h-3.5 w-3.5 text-revora-crimson" /> Your territory
        </span>
      </div>
      <p className="mt-10 font-heading text-[clamp(1.5rem,2.6vw,2rem)] font-extrabold leading-tight">Open to</p>
      <ul className="mt-5 space-y-3">
        {TYPES.map((t, i) => (
          <motion.li
            key={t.label}
            initial={reduce ? false : { opacity: 0, x: -16 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.7, delay: 0.6 + i * 0.12, ease: expoOut }}
            className="flex items-center gap-3 rounded-2xl border border-white/10 bg-white/5 px-4 py-3"
          >
            <span className="grid h-9 w-9 shrink-0 place-items-center rounded-xl bg-white/10"><t.icon className="h-4 w-4" /></span>
            <span className="font-heading text-[17px] font-bold">{t.label}</span>
          </motion.li>
        ))}
      </ul>
      <p className="mt-8 border-t border-white/10 pt-5 font-sans text-[13px] text-white/60">Supported from Ahmedabad · Supplied from our own plant</p>
    </motion.div>
  );
}
