'use client';

import { useState } from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import { toast } from 'sonner';
import { Building2, Factory, Handshake, Layers, MessageSquare, Package, Rocket, Send, Store, Truck } from 'lucide-react';
import { expoOut } from '@/lib/easings';
import { ALL_PRODUCTS, THERAPY_CATEGORIES } from '@/lib/therapies-data';
import { Counter, FadeUp } from '@/components/ui/primitives';
import { PageHero } from '@/components/ui/page-hero';
import { SectionHeading } from '@/components/ui/section-heading';
import { Button } from '@/components/ui/button';
import { IndiaDotMap } from '@/components/maps/india-dot-map';
import { ProductLogoLink } from '@/components/offerings/product-logo';

const PARTNER_EMAIL = 'depot@revorahealthcare.com';

const STATS = [
  { value: ALL_PRODUCTS.length, label: 'Eye-care brands' },
  { value: THERAPY_CATEGORIES.length, label: 'Therapy areas' },
  { value: 1, label: 'Own WHO-GMP plant' },
];

const BENEFITS = [
  { icon: Layers, title: 'A focused range', text: 'Nine ophthalmic brands across four therapy areas.' },
  { icon: Factory, title: 'Made in our plant', text: 'WHO-GMP certified, EU-compliant manufacturing.' },
  { icon: Package, title: 'Premium packs', text: 'Cartons doctors and patients recognise.' },
  { icon: Building2, title: 'Backed by HQ', text: 'Sales and supply support from Ahmedabad.' },
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
  return (
    <>
      <PageHero
        crumbs={[{ label: 'Home', href: '/' }, { label: 'Channel Partner' }]}
        eyebrow="Channel Partner"
        lines={['Grow with', 'Revora.']}
        highlight={{ 'Revora.': 'text-revora-cobalt' }}
        text="Bring our eye-care range to your territory."
        actions={
          <>
            <Button href="#apply" arrow="down" magnetic>Become a partner</Button>
            <Button href="/our-offerings" variant="outline">See the range</Button>
          </>
        }
        visual={
          <FadeUp className="mx-auto w-full max-w-[560px] rounded-[28px] border border-revora-cobalt/10 bg-white p-6 shadow-[0_40px_80px_-40px_rgba(11,74,143,0.45)] tablet:rounded-[32px] tablet:p-10">
            <IndiaDotMap className="mx-auto w-full max-w-[420px]" />
          </FadeUp>
        }
      />

      {/* ── stats ── */}
      <div className="px-5 tablet:px-8">
        <FadeUp className="mx-auto grid max-w-330 grid-cols-3 divide-x divide-revora-cobalt/10 rounded-[28px] border border-revora-cobalt/10 bg-white">
          {STATS.map((s) => (
            <div key={s.label} className="p-6 text-center tablet:p-8">
              <p className="font-heading text-4xl font-extrabold tracking-tight text-revora-cobalt tablet:text-5xl"><Counter to={s.value} /></p>
              <p className="mt-1 font-sans text-[12.5px] font-medium text-revora-slate-light tablet:text-[13.5px]">{s.label}</p>
            </div>
          ))}
        </FadeUp>
      </div>

      {/* ── why partner ── */}
      <section className="px-5 py-20 tablet:px-8 tablet:py-28">
        <div className="mx-auto max-w-330">
          <SectionHeading eyebrow="Why partner with us" lines={['Everything you need', 'to grow.']} highlight={{ 'grow.': 'text-revora-crimson' }} />
          <div className="mt-12 grid gap-5 tablet:grid-cols-2 desktop:grid-cols-4">
            {BENEFITS.map((b, i) => (
              <FadeUp key={b.title} delay={i * 0.08}>
                <div className="group relative isolate flex h-full min-h-[220px] flex-col overflow-hidden rounded-[28px] border border-revora-cobalt/10 bg-white p-7">
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

      {/* ── the range ── */}
      <section className="bg-white px-5 py-20 tablet:px-8 tablet:py-28">
        <div className="mx-auto max-w-330">
          <SectionHeading eyebrow="The range you’ll carry" lines={['Nine brands.', 'One focus.']} highlight={{ 'focus.': 'text-revora-crimson' }} />
          <div className="mt-12 grid grid-cols-3 items-center gap-x-6 gap-y-8 tablet:gap-x-10">
            {ALL_PRODUCTS.map((p, i) => (
              <FadeUp key={p.id} delay={(i % 3) * 0.06}>
                <ProductLogoLink product={p} className="h-[60px] w-full tablet:h-[100px]" sizes="(min-width: 768px) 30vw, 30vw" />
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
                className="rounded-[24px] border border-white/10 bg-white/[0.04] p-6 backdrop-blur-sm"
              >
                <div className="flex items-center justify-between">
                  <span className="grid h-12 w-12 place-items-center rounded-2xl bg-white/10 text-revora-cobalt-pale">
                    <s.icon className="h-5 w-5" />
                  </span>
                  <span className="font-heading text-3xl font-extrabold text-white/15">0{i + 1}</span>
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

  // No backend yet: open the visitor's email app with the enquiry filled in.
  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    const subject = `Channel partner enquiry — ${form.company || form.name} (${form.city})`;
    const body = [`Partner type: ${form.type}`, `Name: ${form.name}`, `Company: ${form.company}`, `City / territory: ${form.city}`, `Phone: ${form.phone}`, `Email: ${form.email}`, '', form.message].join('\n');
    window.location.href = `mailto:${PARTNER_EMAIL}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
    toast.success('Your email app is opening', { description: `Press send to reach ${PARTNER_EMAIL}.` });
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
            <a href={`mailto:${PARTNER_EMAIL}`} className="mt-6 inline-flex items-center gap-2 font-sans text-[15px] font-semibold text-revora-cobalt hover:underline">
              <Send className="h-4 w-4" /> {PARTNER_EMAIL}
            </a>
          </FadeUp>
        </div>

        <FadeUp delay={0.1}>
          <form onSubmit={submit} className="rounded-[28px] border border-revora-cobalt/10 bg-white p-6 tablet:p-9">
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
              <Button type="submit" arrow="up-right" magnetic>Send enquiry</Button>
            </div>
          </form>
        </FadeUp>
      </div>
    </section>
  );
}
