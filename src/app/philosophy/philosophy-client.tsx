'use client';

import { Fragment, useRef } from 'react';
import Image from 'next/image';
import { motion, useReducedMotion, useScroll, useTransform } from 'framer-motion';
import { FlaskConical, Globe2, HeartHandshake, HeartPulse, Package, Scale, ShieldCheck, Stethoscope, Users } from 'lucide-react';
import { expoOut } from '@/lib/easings';
import { FadeUp, SplitWords, Tick } from '@/components/ui/primitives';
import { PageHero } from '@/components/ui/page-hero';
import { SectionHeading } from '@/components/ui/section-heading';
import { Button } from '@/components/ui/button';
import { IrisPromise } from '@/components/illustrations/illustrations';
import { MediaFrame } from '@/components/ui/media-frame';

/* Content from the company's philosophy deck ("Revora — Healthcare, Beyond the Cure"). */

const PURPOSE =
  'To make quality eye care more accessible, meaningful and impactful — going beyond medicines to improve the eye-care experience.';
const EMPHASIS = new Set(['accessible,', 'meaningful', 'impactful']);

const PILLARS = [
  { icon: Package, title: 'Quality products', text: 'Deliver dependable ophthalmic solutions built on quality, safety and reliability.' },
  {
    icon: Stethoscope,
    title: 'Professional partnership',
    text: 'Support ophthalmologists through scientific engagement, clinical education and responsible practice support.',
  },
  { icon: HeartPulse, title: 'Patient experience', text: 'Support awareness, treatment understanding, adherence and continuity of care.' },
];

const PRINCIPLES = [
  {
    icon: ShieldCheck,
    title: 'Quality without compromise',
    text: 'Quality is the foundation of every product and patient experience.',
    image: '/images/photos/value-quality.webp',
    alt: 'Quality-control scientist inspecting eye-drop vials in a cleanroom',
  },
  {
    icon: FlaskConical,
    title: 'Science-led innovation',
    text: 'Translate evolving science into relevant healthcare solutions.',
    image: '/images/photos/value-focus.webp',
    alt: 'Close-up of a slit-lamp eye examination microscope',
  },
  {
    icon: Stethoscope,
    title: 'Partnership with ophthalmologists',
    text: 'Build enduring relationships through credibility and mutual respect.',
    image: '/images/photos/value-relationships.webp',
    alt: 'Medical representative meeting an ophthalmologist at his desk',
  },
  {
    icon: HeartPulse,
    title: 'Patient-centricity beyond medicines',
    text: 'Support awareness, adherence, follow-up and continuity of care.',
    image: '/images/photos/value-care.webp',
    alt: 'Eye doctor reassuring an elderly patient',
  },
  {
    icon: Scale,
    title: 'Trust through responsibility',
    text: 'Act with transparency, integrity, accountability and ethical discipline.',
    image: '/images/photos/value-trust.webp',
    alt: 'Ophthalmologist checking an eye-drop bottle',
  },
];

const ECOSYSTEM = [
  'Quality ophthalmic products',
  'Scientific & clinical engagement',
  'Ophthalmologist partnership',
  'Patient awareness & education',
  'Adherence & continuity of care',
];

const COMMITMENTS = [
  { icon: HeartHandshake, to: 'To our patients', text: 'A more informed, supported and positive eye-care journey.' },
  { icon: Stethoscope, to: 'To ophthalmologists', text: 'Dependable products, credible science and responsible partnership.' },
  { icon: Users, to: 'To our people', text: 'A culture of ownership, integrity, learning and purposeful execution.' },
  { icon: Globe2, to: 'To our communities', text: 'A commitment to awareness, access and better eye health.' },
];

export function PhilosophyClient() {
  return (
    <>
      <PageHero
        backdrop="/images/heroes/hero-philosophy.webp"
        crumbs={[{ label: 'Home', href: '/' }, { label: 'Philosophy & Values' }]}
        eyebrow="Our philosophy · Healthcare, beyond the cure"
        lines={['Better vision.', 'Brighter lives.']}
        highlight={{ 'lives.': 'text-revora-crimson' }}
        text="Eye care is more than medicines. It is a commitment to people and their lives — from awareness and treatment to adherence and long-term eye health."
        actions={<Button href="#principles" arrow="down" magnetic>Our principles</Button>}
        visual={<IrisPromise />}
      />

      <PurposeStatement />

      {/* ── what the purpose means in practice ── */}
      <section className="px-5 pb-14 tablet:px-8 tablet:pb-20">
        <div className="mx-auto max-w-330">
          <div className="grid gap-5 tablet-lg:grid-cols-3">
            {PILLARS.map((p, i) => (
              <FadeUp key={p.title} delay={i * 0.08}>
                <div className="flex h-full flex-col rounded-[24px] border border-revora-cobalt/10 bg-white p-7">
                  <span className="grid h-12 w-12 place-items-center rounded-2xl bg-revora-sky text-revora-cobalt">
                    <p.icon className="h-5 w-5" />
                  </span>
                  <h3 className="mt-6 font-heading text-[1.3rem] font-extrabold text-revora-slate">{p.title}</h3>
                  <p className="mt-2 font-sans text-[15px] leading-[1.65] text-revora-slate-light">{p.text}</p>
                </div>
              </FadeUp>
            ))}
          </div>
          <FadeUp delay={0.2}>
            <p className="mt-10 max-w-3xl font-sans text-[17px] leading-[1.7] text-revora-slate-light">
              We do not aspire to be only part of the prescription. We aspire to contribute to the larger journey towards better vision and
              healthier lives.
            </p>
          </FadeUp>
        </div>
      </section>

      {/* ── care photo ── */}
      <section className="px-5 pb-14 tablet:px-8 tablet:pb-20">
        <div className="mx-auto max-w-330">
          <MediaFrame
            src="/images/photos/eye-drops-care.webp"
            alt="A woman helping an older man with his eye drops"
            aspect="aspect-[4/5] tablet:aspect-[16/9] desktop:aspect-[21/9]"
            sizes="(min-width: 1320px) 1320px, 100vw"
            caption={<><b className="font-semibold">Beyond the cure</b> · care that continues at home</>}
          />
        </div>
      </section>

      {/* ── our ethos: five principles ── */}
      <section id="principles" className="scroll-mt-28 bg-white px-5 py-14 tablet:px-8 tablet:py-20">
        <div className="mx-auto max-w-330">
          <SectionHeading
            eyebrow="Our ethos"
            lines={['Five principles', 'that guide us.']}
            highlight={{ 'guide': 'text-revora-cobalt', 'us.': 'text-revora-cobalt' }}
            aside="The behaviours and choices that should define every Revora product, partnership and interaction."
          />
          <div className="mt-12 grid gap-5 tablet:grid-cols-2 desktop:grid-cols-3">
            {PRINCIPLES.map((v, i) => (
              <FadeUp key={v.title} delay={(i % 3) * 0.08} className={i === 0 ? 'desktop:row-span-2' : undefined}>
                {/* the photo fills the card; a colour wash rising from the bottom keeps the copy readable */}
                <div
                  className={`group relative isolate flex h-full flex-col overflow-hidden rounded-[28px] bg-revora-slate p-7 text-white tablet:p-8 ${
                    i === 0 ? 'min-h-105 desktop:min-h-full' : 'min-h-80 tablet:min-h-85'
                  }`}
                >
                  <Image
                    src={v.image}
                    alt={v.alt}
                    fill
                    sizes="(min-width: 1280px) 420px, (min-width: 768px) 50vw, 100vw"
                    className="-z-20 object-cover object-center transition-transform duration-1200 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-[1.05]"
                  />
                  <div
                    aria-hidden
                    className={`absolute inset-0 -z-10 ${
                      i === 0
                        ? 'bg-[linear-gradient(to_top,rgba(8,52,104,0.97)_0%,rgba(11,74,143,0.8)_38%,rgba(11,74,143,0.15)_75%,rgba(11,74,143,0.05)_100%)]'
                        : 'bg-[linear-gradient(to_top,rgba(9,20,38,0.95)_0%,rgba(9,20,38,0.72)_45%,rgba(9,20,38,0.12)_100%)]'
                    }`}
                  />
                  <div className="flex items-start justify-between">
                    <span className="grid h-12 w-12 place-items-center rounded-2xl bg-white/15 backdrop-blur-md transition-transform duration-500 group-hover:rotate-[-8deg]">
                      <v.icon className="h-5 w-5" />
                    </span>
                    <span aria-hidden className="font-heading text-[40px] font-extrabold leading-none tracking-[-0.04em] text-white/35">
                      0{i + 1}
                    </span>
                  </div>
                  <div className="mt-auto pt-16">
                    <h3 className={`font-heading font-extrabold tracking-tight ${i === 0 ? 'text-4xl tablet:text-5xl' : 'text-2xl'}`}>{v.title}</h3>
                    <p className={`mt-2.5 max-w-sm font-sans leading-[1.65] text-white/85 ${i === 0 ? 'text-[17px]' : 'text-[15px]'}`}>{v.text}</p>
                  </div>
                </div>
              </FadeUp>
            ))}
          </div>
          <FadeUp delay={0.1}>
            <p className="mt-10 max-w-3xl font-sans text-[17px] leading-[1.7] text-revora-slate-light">
              Not just statements on a wall — standards for how we work, decide, engage and grow.
            </p>
          </FadeUp>
        </div>
      </section>

      {/* ── our vision: the eye-care ecosystem ── */}
      <section className="px-5 py-14 tablet:px-8 tablet:py-20">
        <div className="mx-auto max-w-330">
          <SectionHeading
            eyebrow="Our vision"
            lines={['An integrated', 'eye-care ecosystem.']}
            highlight={{ 'eye-care': 'text-revora-cobalt', 'ecosystem.': 'text-revora-cobalt' }}
            aside="Beyond the product portfolio: creating connected value for ophthalmologists, clinics and patients."
          />
          <div className="mt-12 grid grid-cols-[minmax(0,1fr)] gap-6 tablet-lg:grid-cols-[0.9fr_1.1fr] tablet-lg:gap-10">
            <FadeUp>
              <div className="relative isolate flex h-full flex-col justify-center overflow-hidden rounded-[28px] bg-revora-cobalt-deep p-8 text-white tablet:p-10">
                <div aria-hidden className="absolute inset-0 -z-10 bg-[radial-gradient(ellipse_at_top_right,rgba(58,130,200,0.5),transparent_60%)]" />
                <p className="font-sans text-[12px] font-semibold uppercase tracking-[0.18em] text-revora-cobalt-pale">Our vision</p>
                <p className="mt-4 font-heading text-[clamp(1.35rem,2.2vw,1.8rem)] font-extrabold leading-[1.3]">
                  In ophthalmology, to emerge as a trusted and respected specialty company, recognised for quality, scientific credibility and
                  meaningful partnerships.
                </p>
                <p className="mt-6 font-sans text-[15px] font-semibold text-white/75">Better vision. Brighter lives.</p>
              </div>
            </FadeUp>
            <FadeUp delay={0.1}>
              <div className="h-full rounded-[28px] border border-revora-cobalt/10 bg-white p-7 tablet:p-9">
                <h3 className="font-heading text-[1.3rem] font-extrabold text-revora-slate">The Revora eye-care ecosystem</h3>
                <ol className="mt-6 space-y-4">
                  {ECOSYSTEM.map((label, i) => (
                    <li key={label} className="flex items-center gap-4">
                      <span className="grid h-9 w-9 shrink-0 place-items-center rounded-full bg-revora-cobalt font-sans text-[13px] font-bold text-white">{i + 1}</span>
                      <span className="font-sans text-[16px] font-semibold text-revora-slate">{label}</span>
                    </li>
                  ))}
                </ol>
                <p className="mt-7 border-t border-revora-cobalt/10 pt-5 font-sans text-[15px] leading-[1.65] text-revora-slate-light">
                  A connected experience. A stronger partnership. A healthier future.
                </p>
              </div>
            </FadeUp>
          </div>
        </div>
      </section>

      {/* ── our commitment ── */}
      <section className="bg-white px-5 py-14 tablet:px-8 tablet:py-20">
        <div className="mx-auto max-w-330">
          <SectionHeading eyebrow="Our commitment" lines={['We don’t just build brands.']} highlight={{ 'brands.': 'text-revora-cobalt' }} />
          <FadeUp delay={0.1}>
            <p className="mt-4 max-w-2xl font-sans text-[17px] leading-[1.7] text-revora-slate-light">
              We build trust, partnerships and better eye-care experiences.
            </p>
          </FadeUp>
          <div className="mt-10 grid gap-4 tablet:grid-cols-2">
            {COMMITMENTS.map((c, i) => (
              <FadeUp key={c.to} delay={(i % 2) * 0.08}>
                <div className="flex h-full items-start gap-5 rounded-[24px] border border-revora-cobalt/10 bg-[#F6F9FC] p-7">
                  <span className="grid h-12 w-12 shrink-0 place-items-center rounded-2xl bg-white text-revora-cobalt shadow-sm">
                    <c.icon className="h-5 w-5" />
                  </span>
                  <div>
                    <h3 className="font-heading text-[1.2rem] font-extrabold text-revora-slate">{c.to}</h3>
                    <p className="mt-1.5 font-sans text-[15px] leading-[1.65] text-revora-slate-light">{c.text}</p>
                  </div>
                </div>
              </FadeUp>
            ))}
          </div>
        </div>
      </section>

      {/* ── revorian band ── */}
      <section className="px-5 py-14 tablet:px-8 tablet:py-20">
        <FadeUp className="relative isolate mx-auto max-w-330 overflow-hidden rounded-[32px] bg-revora-slate px-8 py-14 text-center text-white tablet:px-14 tablet:py-20">
          <div aria-hidden className="absolute inset-0 -z-10 bg-[radial-gradient(ellipse_at_top,rgba(11,74,143,0.85),transparent_60%),radial-gradient(ellipse_at_bottom_right,rgba(215,38,46,0.25),transparent_55%)]" />
          <Tick className="mx-auto h-10 w-12 text-revora-crimson" />
          <p className="mx-auto mt-6 max-w-3xl font-heading text-[clamp(2rem,4.6vw,3.6rem)] font-extrabold leading-[1.05] tracking-[-0.02em]">
            Live these values <span className="text-revora-cobalt-pale">with us.</span>
          </p>
          <p className="mx-auto mt-5 max-w-xl font-sans text-[16.5px] leading-[1.7] text-white/70">
            A culture of ownership, integrity, learning and purposeful execution.
          </p>
          <div className="mt-9 flex justify-center">
            <Button href="/careers" variant="light" arrow="up-right" magnetic>Join the team</Button>
          </div>
        </FadeUp>
      </section>
    </>
  );
}

/** The purpose, lighting up word by word as it scrolls through the viewport. */
function PurposeStatement() {
  const ref = useRef<HTMLParagraphElement>(null);
  const reduce = useReducedMotion();
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start 0.85', 'end 0.45'] });
  const words = PURPOSE.split(' ');
  return (
    <section className="px-5 py-14 tablet:px-8 tablet:py-20">
      <div className="mx-auto max-w-[1100px]">
        <p className="font-sans text-[12px] font-semibold uppercase tracking-[0.18em] text-revora-cobalt">Why Revora exists</p>
        <h2 className="mt-3 font-heading text-[clamp(2.6rem,6.4vw,5.6rem)] font-extrabold leading-[1] tracking-[-0.03em] text-revora-slate">
          <SplitWords text="Our purpose." highlight={{ 'purpose.': 'text-revora-cobalt' }} />
        </h2>
        <p ref={ref} className="mt-8 max-w-3xl font-heading text-[clamp(1.15rem,1.9vw,1.6rem)] font-semibold leading-[1.5] tracking-[-0.01em] text-revora-slate">
          {/* real spaces between the words: the sentence reads (and indexes) once, as words */}
          {words.map((w, i) => (
            <Fragment key={i}>
              <Word progress={scrollYProgress} range={[i / words.length, (i + 1) / words.length]} reduce={!!reduce} emphasis={EMPHASIS.has(w)}>
                {w}
              </Word>{' '}
            </Fragment>
          ))}
        </p>
      </div>
    </section>
  );
}

function Word({ children, progress, range, reduce, emphasis }: {
  children: string;
  progress: ReturnType<typeof useScroll>['scrollYProgress'];
  range: [number, number];
  reduce: boolean;
  emphasis: boolean;
}) {
  // Function form keeps this on the JS path (see components/landing/hero.tsx).
  const opacity = useTransform(progress, (v) => 0.15 + 0.85 * Math.min(Math.max((v - range[0]) / (range[1] - range[0]), 0), 1));
  return (
    <motion.span
      style={reduce ? undefined : { opacity }}
      transition={{ ease: expoOut }}
      className={`inline-block ${emphasis ? 'text-revora-crimson' : ''}`}
    >
      {children}
    </motion.span>
  );
}
