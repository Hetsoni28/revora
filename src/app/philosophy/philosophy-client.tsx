'use client';

import { useRef } from 'react';
import { motion, useReducedMotion, useScroll, useTransform } from 'framer-motion';
import { Eye, Factory, HeartHandshake, ShieldCheck, Users } from 'lucide-react';
import { expoOut } from '@/lib/easings';
import { Eyebrow, FadeUp, Tick } from '@/components/ui/primitives';
import { PageHero } from '@/components/ui/page-hero';
import { SectionHeading } from '@/components/ui/section-heading';
import { Button } from '@/components/ui/button';
import { IrisPromise } from '@/components/illustrations/illustrations';
import { MediaFrame } from '@/components/ui/media-frame';

const PROMISE =
  'Every drop that leaves our plant carries one promise — that the doctor who prescribes it, and the patient who uses it, can trust it completely.';
const EMPHASIS = new Set(['promise', 'trust', 'completely.']);

const VALUES = [
  { icon: ShieldCheck, title: 'Trust', text: 'Every product, every time.' },
  { icon: Eye, title: 'Focus', text: 'Ophthalmology is all we do — and it shows in every brand.' },
  { icon: Factory, title: 'Quality', text: 'Our eye drops are made in our own WHO-GMP certified plant.' },
  { icon: HeartHandshake, title: 'Relationships', text: 'Partners for the long term — doctors, pharmacies and distributors.' },
  { icon: Users, title: 'Care', text: 'Better patient care, healthier communities.' },
];

export function PhilosophyClient() {
  return (
    <>
      <PageHero
        crumbs={[{ label: 'Home', href: '/' }, { label: 'Philosophy & Values' }]}
        eyebrow="Philosophy & Values"
        lines={['Beyond', 'the cure.']}
        highlight={{ 'cure.': 'text-revora-crimson' }}
        text="Our job ends only when the patient can trust the medicine completely."
        actions={<Button href="#values" arrow="down" magnetic>Our values</Button>}
        visual={<IrisPromise />}
      />

      <PromiseStatement />

      {/* ── care photo ── */}
      <section className="px-5 pb-20 tablet:px-8 tablet:pb-28">
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

      {/* ── values ── */}
      <section id="values" className="bg-white px-5 py-20 tablet:px-8 tablet:py-28">
        <div className="mx-auto max-w-330">
          <SectionHeading eyebrow="Our values" lines={['What we stand for.']} highlight={{ 'for.': 'text-revora-cobalt' }} />
          <div className="mt-12 grid gap-5 tablet:grid-cols-2 desktop:grid-cols-3">
            {VALUES.map((v, i) => (
              <FadeUp key={v.title} delay={(i % 3) * 0.08} className={i === 0 ? 'desktop:row-span-2' : undefined}>
                <div
                  className={`group relative isolate flex h-full flex-col overflow-hidden rounded-[28px] p-8 ${
                    i === 0 ? 'min-h-[260px] bg-revora-cobalt text-white desktop:min-h-full' : 'min-h-[220px] border border-revora-cobalt/10 bg-[#F6F9FC]'
                  }`}
                >
                  {i !== 0 && (
                    <span aria-hidden className="absolute inset-0 -z-10 translate-y-full bg-revora-cobalt transition-transform duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:translate-y-0" />
                  )}
                  {i === 0 && <div aria-hidden className="absolute -bottom-24 -right-16 -z-10 h-72 w-72 rounded-full bg-revora-cobalt-light/40 blur-3xl" />}
                  <div className="flex items-start justify-between">
                    <span className={`grid h-12 w-12 place-items-center rounded-2xl transition-all duration-500 group-hover:rotate-[-8deg] ${i === 0 ? 'bg-white/15' : 'bg-white text-revora-cobalt shadow-sm group-hover:bg-white/15 group-hover:text-white'}`}>
                      <v.icon className="h-5 w-5" />
                    </span>
                    <span className={`font-heading text-[40px] font-extrabold leading-none tracking-[-0.04em] ${i === 0 ? 'text-white/20' : 'text-revora-cobalt/10 transition-colors duration-500 group-hover:text-white/20'}`}>
                      0{i + 1}
                    </span>
                  </div>
                  <h3 className={`mt-auto pt-10 font-heading font-extrabold tracking-tight ${i === 0 ? 'text-4xl tablet:text-5xl' : 'text-2xl text-revora-slate transition-colors duration-500 group-hover:text-white'}`}>
                    {v.title}
                  </h3>
                  <p className={`mt-2.5 max-w-sm font-sans leading-[1.65] ${i === 0 ? 'text-[17px] text-white/80' : 'text-[15px] text-revora-slate-light transition-colors duration-500 group-hover:text-white/80'}`}>
                    {v.text}
                  </p>
                </div>
              </FadeUp>
            ))}
          </div>
        </div>
      </section>

      {/* ── revorian band ── */}
      <section className="px-5 py-20 tablet:px-8 tablet:py-28">
        <FadeUp className="relative isolate mx-auto max-w-330 overflow-hidden rounded-[32px] bg-revora-slate px-8 py-14 text-center text-white tablet:px-14 tablet:py-20">
          <div aria-hidden className="absolute inset-0 -z-10 bg-[radial-gradient(ellipse_at_top,rgba(11,74,143,0.85),transparent_60%),radial-gradient(ellipse_at_bottom_right,rgba(215,38,46,0.25),transparent_55%)]" />
          <Tick className="mx-auto h-10 w-12 text-revora-crimson" />
          <p className="mx-auto mt-6 max-w-3xl font-heading text-[clamp(2rem,4.6vw,3.6rem)] font-extrabold leading-[1.05] tracking-[-0.02em]">
            Live these values <span className="text-revora-cobalt-pale">with us.</span>
          </p>
          <p className="mx-auto mt-5 max-w-xl font-sans text-[16.5px] leading-[1.7] text-white/70">
            Join a team that puts the patient first.
          </p>
          <div className="mt-9 flex justify-center">
            <Button href="/careers" variant="light" arrow="up-right" magnetic>Join the team</Button>
          </div>
        </FadeUp>
      </section>

    </>
  );
}

/** The promise, lighting up word by word as it scrolls through the viewport. */
function PromiseStatement() {
  const ref = useRef<HTMLParagraphElement>(null);
  const reduce = useReducedMotion();
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start 0.85', 'end 0.45'] });
  const words = PROMISE.split(' ');
  return (
    <section className="px-5 py-20 tablet:px-8 tablet:py-28">
      <div className="mx-auto max-w-[1100px]">
        <Eyebrow>Our promise</Eyebrow>
        <p ref={ref} className="mt-8 font-heading text-[clamp(1.9rem,4.4vw,3.6rem)] font-bold leading-[1.15] tracking-[-0.02em] text-revora-slate">
          {words.map((w, i) => (
            <Word key={i} progress={scrollYProgress} range={[i / words.length, (i + 1) / words.length]} reduce={!!reduce} emphasis={EMPHASIS.has(w)}>
              {w}
            </Word>
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
      className={`mr-[0.25em] inline-block ${emphasis ? 'text-revora-crimson' : ''}`}
    >
      {children}
    </motion.span>
  );
}
