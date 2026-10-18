'use client';

import { useEffect, useRef, useState } from 'react';
import { motion, useScroll, useTransform, useReducedMotion } from 'framer-motion';
import { ArrowDown, ArrowUpRight } from 'lucide-react';
import { expoOut } from '@/lib/easings';
import { AnchorLink, Counter, Eyebrow, Magnetic, SplitWords } from '@/components/ui/primitives';
import { IrisBurst } from './iris-burst';

const FACTS = [
  { value: 15, suffix: '+', label: 'Years in ophthalmology' },
  { value: 9, suffix: '', label: 'Launch brands' },
  { value: 4, suffix: '', label: 'Therapy areas' },
];

export function LandingHero({ startDelay = 0 }: { startDelay?: number }) {
  const ref = useRef<HTMLElement>(null);
  const reduce = useReducedMotion();
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start start', 'end start'] });
  const irisScale = useTransform(scrollYProgress, [0, 1], [1, 1.35]);
  const irisY = useTransform(scrollYProgress, [0, 1], ['0%', '18%']);
  const irisOpacity = useTransform(scrollYProgress, [0, 0.85], [1, 0]);
  const copyY = useTransform(scrollYProgress, [0, 1], ['0%', '-25%']);
  const copyOpacity = useTransform(scrollYProgress, [0, 0.7], [1, 0]);

  const d = startDelay;

  // Scroll-linked parallax only on wide screens; on phones the iris sits
  // below the copy and should stay fully visible.
  const [wide, setWide] = useState(false);
  useEffect(() => {
    const mq = window.matchMedia('(min-width: 64rem)');
    const update = () => setWide(mq.matches);
    update();
    mq.addEventListener('change', update);
    return () => mq.removeEventListener('change', update);
  }, []);
  const parallax = wide && !reduce;

  return (
    <section
      ref={ref}
      className="relative isolate flex min-h-[100svh] items-center overflow-hidden bg-[#F6F9FC] pt-28 pb-16 tablet:pt-32"
    >
      {/* backdrop: soft colour fields */}
      <div aria-hidden className="absolute -left-40 top-1/3 -z-10 h-[520px] w-[520px] rounded-full bg-revora-sky blur-3xl" />
      <div aria-hidden className="absolute -right-20 -top-20 -z-10 h-[420px] w-[420px] rounded-full bg-revora-cobalt-light/10 blur-3xl" />

      <div className="mx-auto grid w-full max-w-[1320px] items-center gap-10 px-5 tablet:px-8 tablet-lg:grid-cols-[1.1fr_0.9fr] desktop:gap-4">
        <motion.div style={parallax ? { y: copyY, opacity: copyOpacity } : undefined} className="relative z-10">
          <motion.div
            initial={reduce ? false : { opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: d, ease: expoOut }}
          >
            <Eyebrow>A dedicated ophthalmic company</Eyebrow>
          </motion.div>

          <h1 className="mt-6 font-heading text-[clamp(3rem,8.4vw,7.4rem)] font-extrabold leading-[0.95] tracking-[-0.03em] text-revora-slate">
            <SplitWords text="Healthcare," trigger="mount" delay={d + 0.1} />
            <br />
            <SplitWords
              text="beyond the cure."
              trigger="mount"
              delay={d + 0.25}
              highlight={{ beyond: 'text-revora-cobalt', 'cure.': 'text-revora-crimson' }}
            />
          </h1>

          <motion.p
            className="mt-7 max-w-[34rem] font-sans text-[1.0625rem] leading-[1.7] text-revora-slate-light tablet:text-lg"
            initial={reduce ? false : { opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, delay: d + 0.7, ease: expoOut }}
          >
            Revora Healthcare builds precision eye-care brands — anti-infectives, tear substitutes,
            NSAIDs and retinal nutrition — made in our own WHO-GMP, EU-compliant eye-drop plant.
          </motion.p>

          <motion.div
            className="mt-9 flex flex-wrap items-center gap-3"
            initial={reduce ? false : { opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, delay: d + 0.85, ease: expoOut }}
          >
            <Magnetic>
              <AnchorLink
                href="#portfolio"
                className="group relative inline-flex items-center gap-3 overflow-hidden rounded-full bg-revora-cobalt py-3.5 pl-7 pr-3.5 font-sans text-[15px] font-semibold text-white shadow-[0_18px_40px_-14px_rgba(11,74,143,0.7)]"
              >
                <span className="absolute inset-0 -translate-x-full bg-revora-crimson transition-transform duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:translate-x-0" />
                <span className="relative">Explore the portfolio</span>
                <span className="relative grid h-8 w-8 place-items-center rounded-full bg-white text-revora-cobalt transition-transform duration-500 group-hover:rotate-45">
                  <ArrowUpRight className="h-4 w-4" />
                </span>
              </AnchorLink>
            </Magnetic>
            <AnchorLink
              href="#plant"
              className="group inline-flex items-center gap-2 rounded-full px-5 py-3.5 font-sans text-[15px] font-semibold text-revora-slate"
            >
              <span className="bg-[linear-gradient(currentColor,currentColor)] bg-[length:0%_1.5px] bg-left-bottom bg-no-repeat pb-0.5 transition-[background-size] duration-500 group-hover:bg-[length:100%_1.5px]">
                See our plant
              </span>
            </AnchorLink>
          </motion.div>

          <motion.dl
            className="mt-14 grid max-w-xl grid-cols-3 gap-4 border-t border-revora-cobalt/10 pt-7"
            initial={reduce ? false : { opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, delay: d + 1.05 }}
          >
            {FACTS.map((f) => (
              <div key={f.label}>
                <dt className="sr-only">{f.label}</dt>
                <dd className="font-heading text-4xl font-extrabold tracking-tight text-revora-cobalt tablet:text-5xl">
                  <Counter to={f.value} />
                  <span className="text-revora-crimson">{f.suffix}</span>
                </dd>
                <p aria-hidden className="mt-1 font-sans text-[12px] font-medium leading-snug text-revora-slate-light tablet:text-[13px]">
                  {f.label}
                </p>
              </div>
            ))}
          </motion.dl>
        </motion.div>

        <motion.div
          className="relative mx-auto w-full max-w-[560px] tablet-lg:max-w-none"
          style={parallax ? { scale: irisScale, y: irisY, opacity: irisOpacity } : undefined}
        >
          <IrisBurst className="h-auto w-full" />
          <motion.div
            className="absolute bottom-[8%] left-[4%] rounded-2xl border border-white/60 bg-white/80 px-4 py-3 shadow-[0_20px_50px_-20px_rgba(11,74,143,0.35)] backdrop-blur-md"
            initial={reduce ? false : { opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, delay: d + 1.3, ease: expoOut }}
          >
            <p className="font-sans text-[11px] font-semibold uppercase tracking-[0.16em] text-revora-slate-muted">Made at</p>
            <p className="font-heading text-[15px] font-bold text-revora-slate">Paonta Sahib, H.P.</p>
            <p className="mt-0.5 flex items-center gap-1.5 font-sans text-[12px] text-revora-cobalt">
              <span className="relative flex h-2 w-2">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-revora-cobalt-light opacity-75" />
                <span className="relative inline-flex h-2 w-2 rounded-full bg-revora-cobalt-light" />
              </span>
              WHO-GMP · EU-compliant
            </p>
          </motion.div>
        </motion.div>
      </div>

      <motion.div
        className="absolute bottom-6 left-1/2 hidden -translate-x-1/2 items-center gap-2 font-sans text-[11px] font-semibold uppercase tracking-[0.2em] text-revora-slate-muted tablet:flex"
        initial={reduce ? false : { opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: d + 1.6 }}
      >
        <motion.span animate={reduce ? undefined : { y: [0, 6, 0] }} transition={{ repeat: Infinity, duration: 1.8 }}>
          <ArrowDown className="h-3.5 w-3.5" />
        </motion.span>
        Scroll
      </motion.div>
    </section>
  );
}
