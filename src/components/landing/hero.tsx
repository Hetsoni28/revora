'use client';

import { useEffect, useRef, useState } from 'react';
import { motion, useScroll, useTransform, useReducedMotion } from 'framer-motion';
import { ArrowUpRight } from 'lucide-react';
import { expoOut } from '@/lib/easings';
import { useCatalogue } from '@/components/catalogue/catalogue-context';
import { AnchorLink, Counter, Eyebrow, Magnetic, SplitWords } from '@/components/ui/primitives';
import Link from 'next/link';
import { IrisBurst } from './iris-burst';

const factsFor = (brands: number, innovationCount: number) => [
  { value: 15, suffix: '+', label: 'Years of industry leadership' },
  { value: brands, suffix: '', label: 'Healthcare brands' },
  { value: 4, suffix: '', label: 'Dosage forms manufactured' },
  { value: innovationCount, suffix: '', label: 'Innovation products' },
];

export function LandingHero({ startDelay = 0 }: { startDelay?: number }) {
  const { products, innovation } = useCatalogue();
  const FACTS = factsFor(products.length, innovation.length);
  const ref = useRef<HTMLElement>(null);
  const reduce = useReducedMotion();
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start start', 'end start'] });
  const irisScale = useTransform(scrollYProgress, [0, 1], [1, 1.35]);
  const irisY = useTransform(scrollYProgress, [0, 1], ['0%', '18%']);
  // Function-form transforms keep opacity on the JS path. The array form can be handed to a native
  // ScrollTimeline, which keeps the scroll position from when the hero mounted after a client-side
  // navigation, leaving the copy invisible at the top of the page.
  const irisOpacity = useTransform(scrollYProgress, (v) => 1 - Math.min(v / 0.85, 1));
  const copyY = useTransform(scrollYProgress, [0, 1], ['0%', '-25%']);
  const copyOpacity = useTransform(scrollYProgress, (v) => 1 - Math.min(v / 0.7, 1));

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
      className="relative isolate flex min-h-[100svh] items-center overflow-hidden bg-[#F6F9FC] pt-28 pb-16 tablet:pt-32 desktop:pt-40"
    >
      {/* backdrop: soft colour fields */}
      <div aria-hidden className="absolute -left-40 top-1/3 -z-10 h-[520px] w-[520px] rounded-full bg-revora-sky blur-3xl" />
      <div aria-hidden className="absolute -right-20 -top-20 -z-10 h-[420px] w-[420px] rounded-full bg-revora-cobalt-light/10 blur-3xl" />

      <div className="mx-auto grid w-full max-w-[1320px] items-center gap-10 px-5 tablet:px-8 tablet-lg:grid-cols-[1.1fr_0.9fr] desktop:gap-4">
        <motion.div style={parallax ? { y: copyY } : undefined} className="relative z-10">
          <h1 className="font-heading text-[clamp(3rem,8.4vw,7.4rem)] font-extrabold leading-[0.95] tracking-[-0.03em] text-revora-slate">
            {/* the label is part of the H1, so search engines read what we do with the headline */}
            <motion.span
              className="mb-6 block leading-none"
              initial={reduce ? false : { opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: d, ease: expoOut }}
            >
              <Eyebrow>Pharmaceuticals · Manufacturing · Export</Eyebrow>
              <span className="sr-only">: </span>
            </motion.span>
            <SplitWords text="Healthcare," trigger="mount" delay={d + 0.1} />{' '}
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
            We develop, manufacture and market trusted medicines across ophthalmology, orthopaedics, nutrition and thermal care, for doctors
            and partners in India and abroad.
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
                <span className="relative">Explore our products</span>
                <span className="relative grid h-8 w-8 place-items-center rounded-full bg-white text-revora-cobalt transition-transform duration-500 group-hover:rotate-45">
                  <ArrowUpRight className="h-4 w-4" />
                </span>
              </AnchorLink>
            </Magnetic>
            <Link
              href="/manufacturing"
              className="group inline-flex items-center gap-2 rounded-full px-5 py-3.5 font-sans text-[15px] font-semibold text-revora-slate"
            >
              <span className="bg-[linear-gradient(currentColor,currentColor)] bg-[length:0%_1.5px] bg-left-bottom bg-no-repeat pb-0.5 transition-[background-size] duration-500 group-hover:bg-[length:100%_1.5px]">
                Manufacture with us
              </span>
            </Link>
          </motion.div>

          <motion.dl
            className="mt-14 grid max-w-2xl grid-cols-2 gap-x-4 gap-y-6 border-t border-revora-cobalt/10 pt-7 sm:grid-cols-4"
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
        </motion.div>
      </div>

    </section>
  );
}
