'use client';

import { useState } from 'react';
import Image from 'next/image';
import { motion, useReducedMotion } from 'framer-motion';
import { toast } from 'sonner';
import { Eye, MapPin, Rocket, Send, Sprout } from 'lucide-react';
import { expoOut } from '@/lib/easings';
import { FadeUp, Tick } from '@/components/ui/primitives';
import { Breadcrumb } from '@/components/ui/breadcrumb';
import { SectionHeading } from '@/components/ui/section-heading';
import { Button } from '@/components/ui/button';
import { HeroBackdrop } from '@/components/ui/hero-backdrop';

const CAREERS_EMAIL = 'info@revorahealthcare.com';

/** Teams an applicant can pick in the form — not a list of live vacancies. */
const TEAMS = ['Sales & marketing', 'Distribution & supply', 'Manufacturing & quality', 'Corporate office'];

const VALUES = [
  {
    icon: Eye,
    title: 'Only eye care',
    text: 'Go deep in one specialty, not wide across many.',
    image: '/images/photos/career-eyecare.webp',
    imageAlt: 'Eye doctor examining a patient with a phoropter',
  },
  {
    icon: Sprout,
    title: 'Build brands',
    text: 'Help shape our eye-care brands from the very start.',
    image: '/images/photos/career-brands.webp',
    imageAlt: 'Team working together around a table',
  },
  {
    icon: Rocket,
    title: 'Grow early',
    text: 'A young company: your work shapes how we grow.',
    image: '/images/photos/career-growth.webp',
    imageAlt: 'Young professional at a desk in a bright office',
  },
];

const STEPS = ['Send your CV', 'A first conversation', 'Meet the team', 'Welcome aboard'];

const EXPERIENCE = ['Fresher', '1–3 years', '3–5 years', '5–10 years', '10+ years'];

/** Reveal-on-scroll wrapper for the cards on this page. */
function Rise({ children, i = 0, className }: { children: React.ReactNode; i?: number; className?: string }) {
  const reduce = useReducedMotion();
  return (
    <motion.div
      initial={reduce ? false : { opacity: 0, y: 36 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-8% 0px' }}
      transition={{ duration: 0.85, delay: i * 0.08, ease: expoOut }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

export function CareersClient() {
  return (
    <>
      <Hero />
      <Values />
      <HowWeHire />
      <Apply />
    </>
  );
}

/* ── hero ─────────────────────────────────────────────────── */
function Hero() {
  const reduce = useReducedMotion();
  return (
    <section className="relative isolate overflow-hidden px-5 pb-16 pt-32 tablet:px-8 tablet:pb-24 tablet:pt-40 desktop:pt-48">
      <HeroBackdrop src="/images/heroes/hero-careers.webp" />
      <div className="mx-auto max-w-330">
        <Breadcrumb items={[{ label: 'Home', href: '/' }, { label: 'Careers' }]} />
        <div className="mt-8 grid grid-cols-[minmax(0,1fr)] items-center gap-12 tablet-lg:grid-cols-[1.1fr_0.9fr]">
          <div>
            <SectionHeading level="page" eyebrow="Careers" lines={['Proud to be', 'a Revorian.']} highlight={{ 'Revorian.': 'text-revora-cobalt' }} />
            <FadeUp delay={0.45}>
              <p className="mt-6 max-w-lg font-sans text-[17px] leading-[1.7] text-revora-slate-light">
                Help us build trusted eye-care brands for doctors and patients across India.
              </p>
            </FadeUp>
            <FadeUp delay={0.55} className="mt-9 flex flex-wrap gap-3">
              <Button href="#apply" arrow="down" magnetic>Send your CV</Button>
              <Button href="#how-we-hire" variant="outline">How we hire</Button>
            </FadeUp>
          </div>

          {/* brand card: the Revora tick drawing itself */}
          <motion.div
            initial={reduce ? false : { opacity: 0, y: 40, scale: 0.97 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            transition={{ duration: 1.1, delay: 0.2, ease: expoOut }}
            className="relative isolate mx-auto min-h-[340px] w-full max-w-[560px] tablet:aspect-[5/4] tablet:min-h-0 overflow-hidden rounded-[28px] bg-revora-cobalt-deep p-8 text-white shadow-[0_40px_80px_-40px_rgba(11,74,143,0.6)] tablet:rounded-[32px] tablet:p-10"
          >
            <div aria-hidden className="absolute inset-0 -z-10 bg-[radial-gradient(ellipse_at_top_right,rgba(58,130,200,0.55),transparent_60%),radial-gradient(ellipse_at_bottom_left,rgba(215,38,46,0.25),transparent_55%)]" />
            <motion.svg viewBox="0 0 28 22" aria-hidden className="absolute -right-6 -top-4 h-56 w-72 text-white/10 tablet:h-64 tablet:w-80">
              <motion.path
                d="M0 9.5 L7.5 7 L11 15.5 L24.5 0 L28 0 L12 22 Z"
                fill="currentColor"
                initial={reduce ? false : { pathLength: 0, opacity: 0 }}
                animate={{ pathLength: 1, opacity: 1 }}
                transition={{ duration: 1.4, delay: 0.6, ease: expoOut }}
              />
            </motion.svg>
            <div className="flex h-full min-h-[276px] flex-col justify-between gap-10 tablet:min-h-0">
              <span className="inline-flex w-fit items-center gap-2 rounded-full border border-white/15 bg-white/10 px-3.5 py-1.5 font-sans text-[12px] font-semibold">
                <Tick className="h-2.5 w-3 text-revora-crimson" /> Life at Revora
              </span>
              <div>
                <p className="font-heading text-[clamp(1.5rem,2.6vw,2.1rem)] font-extrabold leading-[1.15] tracking-[-0.01em]">
                  “We don’t just sell products — we build brands and relationships.”
                </p>
                <div className="mt-7 flex flex-wrap gap-2">
                  {['Ahmedabad HQ', 'Paonta Sahib plant', 'Across India'].map((t) => (
                    <span key={t} className="inline-flex items-center gap-1.5 rounded-full bg-white/10 px-3 py-1.5 font-sans text-[12.5px] font-medium text-white/85">
                      <MapPin className="h-3.5 w-3.5 text-revora-cobalt-pale" /> {t}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

/* ── why join ─────────────────────────────────────────────── */
function Values() {
  return (
    <section className="bg-white px-5 py-20 tablet:px-8 tablet:py-28">
      <div className="mx-auto max-w-330">
        <SectionHeading eyebrow="Why join us" lines={['Small team. Clear focus.']} highlight={{ 'focus.': 'text-revora-crimson' }} />
        <div className="mt-12 grid gap-5 tablet:grid-cols-3">
          {VALUES.map((v, i) => (
            <Rise key={v.title} i={i} className="group relative isolate flex h-full min-h-100 flex-col overflow-hidden rounded-[28px] bg-revora-slate p-8 text-white tablet:min-h-110">
              {/* the photo fills the card; a dark wash rising from the bottom keeps the copy readable */}
              <Image src={v.image} alt={v.imageAlt} fill sizes="(min-width: 768px) 33vw, 100vw" className="-z-20 object-cover transition-transform duration-1200 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-[1.05]" />
              <div aria-hidden className="absolute inset-0 -z-10 bg-[linear-gradient(to_top,rgba(9,20,38,0.95)_0%,rgba(9,20,38,0.74)_42%,rgba(9,20,38,0.15)_80%,rgba(9,20,38,0.06)_100%)]" />
              <span className="grid h-12 w-12 place-items-center rounded-2xl bg-revora-slate/45 ring-1 ring-white/20 backdrop-blur-md transition-transform duration-500 group-hover:rotate-[-8deg]">
                <v.icon className="h-5 w-5" />
              </span>
              <div className="mt-auto pt-16">
                <h3 className="font-heading text-2xl font-extrabold tracking-tight">{v.title}</h3>
                <p className="mt-2.5 font-sans text-[15px] leading-[1.65] text-white/85">{v.text}</p>
              </div>
            </Rise>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ── how we hire ───────────────────────────────────────────── */
function HowWeHire() {
  return (
    <section id="how-we-hire" className="px-5 py-20 tablet:px-8 tablet:py-28">
      <div className="mx-auto max-w-330">
        <SectionHeading
          eyebrow="How we hire"
          lines={['Four simple steps.']}
          highlight={{ 'steps.': 'text-revora-cobalt' }}
          aside="No fixed openings — send your CV and we’ll be in touch."
        />
        <ol className="mt-12 grid gap-3 rounded-[28px] border border-revora-cobalt/10 bg-white p-6 tablet:grid-cols-4 tablet:p-8">
          {STEPS.map((s, i) => (
            <li key={s}>
              <Rise i={i} className="flex items-center gap-3">
                <span className="grid h-9 w-9 shrink-0 place-items-center rounded-full bg-revora-cobalt font-sans text-[13px] font-bold text-white">{i + 1}</span>
                <span className="font-sans text-[15px] font-semibold text-revora-slate">{s}</span>
              </Rise>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}

/* ── apply ────────────────────────────────────────────────── */
function Apply() {
  const [team, setTeam] = useState(TEAMS[0]);
  const [form, setForm] = useState({ name: '', email: '', phone: '', city: '', experience: EXPERIENCE[1], message: '' });
  const set = (k: keyof typeof form) => (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) =>
    setForm({ ...form, [k]: e.target.value });

  // No backend yet: open the visitor's email app with everything filled in.
  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    const subject = `Job application — ${team} — ${form.name}`;
    const body = [
      `Team: ${team}`,
      `Name: ${form.name}`,
      `Email: ${form.email}`,
      `Phone: ${form.phone}`,
      `City: ${form.city}`,
      `Experience: ${form.experience}`,
      '',
      form.message,
      '',
      '(CV attached)',
    ].join('\n');
    window.location.href = `mailto:${CAREERS_EMAIL}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
    toast.success('Your email app is opening', { description: 'Attach your CV and press send.' });
  };

  const field = 'w-full rounded-xl border border-revora-cobalt/15 bg-white px-4 py-3 font-sans text-[16px] text-revora-slate outline-none transition-[border-color,box-shadow] placeholder:text-revora-slate-muted focus:border-revora-cobalt focus:shadow-[0_0_0_4px_rgba(11,74,143,0.12)] tablet:text-[15px]';
  const label = 'mb-1.5 block font-sans text-[12px] font-semibold uppercase tracking-[0.12em] text-revora-slate-light';

  return (
    <section id="apply" className="bg-white px-5 py-20 tablet:px-8 tablet:py-28">
      <div className="mx-auto grid max-w-330 grid-cols-[minmax(0,1fr)] gap-12 tablet-lg:grid-cols-[0.8fr_1.2fr] tablet-lg:gap-16">
        <div className="tablet-lg:sticky tablet-lg:top-32 tablet-lg:self-start desktop:top-48">
          <SectionHeading eyebrow="Apply" lines={['Send us your CV.']} highlight={{ 'CV.': 'text-revora-cobalt' }} />
          <FadeUp delay={0.15}>
            <p className="mt-6 max-w-sm font-sans text-[16px] leading-[1.7] text-revora-slate-light">
              Fill in your details, attach your CV, send.
            </p>
            <a href={`mailto:${CAREERS_EMAIL}`} className="mt-6 inline-flex min-h-6 items-center gap-2 font-sans text-[15px] font-semibold text-revora-cobalt hover:underline">
              <Send className="h-4 w-4" /> {CAREERS_EMAIL}
            </a>
          </FadeUp>
        </div>

        <Rise>
          <form onSubmit={submit} className="rounded-[28px] border border-revora-cobalt/10 bg-[#F6F9FC] p-6 tablet:p-9">
            <div className="grid gap-5 tablet:grid-cols-2">
              <label className="tablet:col-span-2">
                <span className={label}>Team</span>
                <select value={team} onChange={(e) => setTeam(e.target.value)} className={field}>
                  {TEAMS.map((t) => (
                    <option key={t}>{t}</option>
                  ))}
                </select>
              </label>
              <label>
                <span className={label}>Full name *</span>
                <input required value={form.name} onChange={set('name')} placeholder="Your name" className={field} />
              </label>
              <label>
                <span className={label}>Email *</span>
                <input required type="email" value={form.email} onChange={set('email')} placeholder="you@example.com" className={field} />
              </label>
              <label>
                <span className={label}>Phone *</span>
                <input required type="tel" value={form.phone} onChange={set('phone')} placeholder="+91" className={field} />
              </label>
              <label>
                <span className={label}>City</span>
                <input value={form.city} onChange={set('city')} placeholder="Ahmedabad" className={field} />
              </label>
              <div className="tablet:col-span-2">
                <span className={label}>Experience</span>
                <div className="flex flex-wrap gap-2">
                  {EXPERIENCE.map((x) => (
                    <button
                      type="button"
                      key={x}
                      onClick={() => setForm({ ...form, experience: x })}
                      aria-pressed={form.experience === x}
                      className={`rounded-full border px-4 py-2 font-sans text-[14px] font-semibold transition-colors ${
                        form.experience === x ? 'border-revora-cobalt bg-revora-cobalt text-white' : 'border-revora-cobalt/15 bg-white text-revora-slate hover:border-revora-cobalt'
                      }`}
                    >
                      {x}
                    </button>
                  ))}
                </div>
              </div>
              <label className="tablet:col-span-2">
                <span className={label}>A few words about you</span>
                <textarea rows={4} value={form.message} onChange={set('message')} placeholder="Your current role and what you’d like to do at Revora" className={field} />
              </label>
            </div>
            <div className="mt-7 flex flex-wrap items-center justify-between gap-4">
              <p className="font-sans text-[13px] text-revora-slate-muted">Attach your CV in the email that opens.</p>
              <Button type="submit" arrow="up-right" magnetic>Send application</Button>
            </div>
          </form>
        </Rise>
      </div>
    </section>
  );
}
