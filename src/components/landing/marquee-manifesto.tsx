'use client';

import { useRef } from 'react';
import {
  motion,
  useScroll,
  useTransform,
  useVelocity,
  useSpring,
  useAnimationFrame,
  useMotionValue,
  useReducedMotion,
  type MotionValue,
} from 'framer-motion';
import { ALL_PRODUCTS } from '@/lib/therapies-data';
import { Eyebrow, Tick } from '@/components/ui/primitives';

/* ─────────────────────────────────────────────────────────────
   Velocity marquee — brand names drift, and speed up / reverse
   with the user's scroll.
   ───────────────────────────────────────────────────────────── */
function wrap(min: number, max: number, v: number) {
  const r = max - min;
  return ((((v - min) % r) + r) % r) + min;
}

export function BrandMarquee() {
  const reduce = useReducedMotion();
  const base = useMotionValue(0);
  const { scrollY } = useScroll();
  const vel = useSpring(useVelocity(scrollY), { damping: 50, stiffness: 400 });
  const factor = useTransform(vel, [-1000, 0, 1000], [-4, 0, 4], { clamp: false });
  const x = useTransform(base, (v) => `${wrap(-50, 0, v)}%`);
  const dir = useRef(1);

  useAnimationFrame((_, delta) => {
    if (reduce) return;
    const f = factor.get();
    if (f < 0) dir.current = -1;
    else if (f > 0) dir.current = 1;
    let move = dir.current * -1.6 * (delta / 1000);
    move += move * Math.abs(f);
    base.set(base.get() + move);
  });

  const names = ALL_PRODUCTS.map((p) => p.name.replace(' Tablets', ''));
  const row = [...names, ...names];

  return (
    <section aria-label="Revora brands" className="relative overflow-hidden border-y border-revora-cobalt/10 bg-white py-7 tablet:py-9">
      <motion.div className="flex w-max whitespace-nowrap" style={{ x }}>
        {[0, 1].map((k) => (
          <div key={k} className="flex shrink-0 items-center" aria-hidden={k === 1}>
            {row.map((n, i) => (
              <span key={`${k}-${i}`} className="flex items-center">
                <span
                  className={`px-6 font-heading text-[clamp(2rem,5vw,4rem)] font-extrabold tracking-[-0.02em] tablet:px-10 ${
                    i % 2 === 0 ? 'text-revora-cobalt' : 'text-transparent [-webkit-text-stroke:1.5px_#0B4A8F]'
                  }`}
                >
                  {n}
                </span>
                <Tick className="h-5 w-6 text-revora-crimson tablet:h-6 tablet:w-8" />
              </span>
            ))}
          </div>
        ))}
      </motion.div>
    </section>
  );
}

/* ─────────────────────────────────────────────────────────────
   Manifesto — words light up as the paragraph scrolls past.
   ───────────────────────────────────────────────────────────── */
const MANIFESTO =
  'Every drop that leaves our plant carries one promise — that the doctor who prescribes it, and the patient who uses it, can trust it completely. That is what beyond the cure means to us.';
const EMPHASIS = new Set(['promise', 'trust', 'completely.', 'beyond', 'cure']);

function Word({
  children,
  progress,
  range,
  emphasis,
}: {
  children: string;
  progress: MotionValue<number>;
  range: [number, number];
  emphasis: boolean;
}) {
  // Function form keeps this on the JS path (see hero.tsx) so it survives client-side navigation.
  const opacity = useTransform(progress, (v) => 0.14 + 0.86 * Math.min(Math.max((v - range[0]) / (range[1] - range[0]), 0), 1));
  return (
    <span className="relative mr-[0.25em] inline-block">
      <motion.span style={{ opacity }} className={emphasis ? 'text-revora-crimson' : undefined}>
        {children}
      </motion.span>
    </span>
  );
}

export function Manifesto() {
  const ref = useRef<HTMLDivElement>(null);
  const reduce = useReducedMotion();
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start 0.85', 'end 0.45'] });
  const words = MANIFESTO.split(' ');

  return (
    <section id="philosophy" className="relative bg-white px-5 py-28 tablet:px-8 tablet:py-40">
      <div className="mx-auto max-w-[1100px]">
        <Eyebrow>Our philosophy</Eyebrow>
        <div
          ref={ref}
          className="mt-8 font-heading text-[clamp(1.9rem,4.6vw,4rem)] font-bold leading-[1.12] tracking-[-0.02em] text-revora-slate"
        >
          {reduce ? (
            <p>{MANIFESTO}</p>
          ) : (
            <p aria-label={MANIFESTO}>
              {words.map((w, i) => {
                const start = i / words.length;
                return (
                  <Word
                    key={i}
                    progress={scrollYProgress}
                    range={[start, start + 1 / words.length]}
                    emphasis={EMPHASIS.has(w)}
                  >
                    {w}
                  </Word>
                );
              })}
            </p>
          )}
        </div>
      </div>
    </section>
  );
}
