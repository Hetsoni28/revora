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
  useInView,
  type MotionValue,
} from 'framer-motion';
import Image from 'next/image';
import Link from 'next/link';
import { useCatalogue } from '@/components/catalogue/catalogue-context';
import { productKind } from '@/lib/seo';
import { SplitWords, Tick } from '@/components/ui/primitives';

/* ─────────────────────────────────────────────────────────────
   Velocity marquee — brand names drift, and speed up / reverse
   with the user's scroll.
   ───────────────────────────────────────────────────────────── */
function wrap(min: number, max: number, v: number) {
  const r = max - min;
  return ((((v - min) % r) + r) % r) + min;
}

export function BrandMarquee() {
  const { products } = useCatalogue();
  const reduce = useReducedMotion();
  const sectionRef = useRef<HTMLElement>(null);
  // Skip per-frame work while the strip is off screen.
  const visible = useInView(sectionRef, { margin: '200px 0px' });
  const base = useMotionValue(0);
  const { scrollY } = useScroll();
  const vel = useSpring(useVelocity(scrollY), { damping: 50, stiffness: 400 });
  const factor = useTransform(vel, [-1000, 0, 1000], [-4, 0, 4], { clamp: false });
  const x = useTransform(base, (v) => `${wrap(-50, 0, v)}%`);
  const dir = useRef(1);

  useAnimationFrame((_, delta) => {
    if (reduce || !visible) return;
    const f = factor.get();
    if (f < 0) dir.current = -1;
    else if (f > 0) dir.current = 1;
    let move = dir.current * -1.6 * (delta / 1000);
    move += move * Math.abs(f);
    base.set(base.get() + move);
  });

  const row = [...products, ...products];

  return (
    <section ref={sectionRef} aria-label="Revora brands" className="relative overflow-hidden border-y border-revora-cobalt/10 bg-white py-7 tablet:py-9">
      <motion.div className="flex w-max whitespace-nowrap" style={{ x }}>
        {[0, 1].map((k) => (
          <div key={k} className="flex shrink-0 items-center" aria-hidden={k === 1}>
            {row.map((p, i) => (
              <span key={`${k}-${i}`} className="flex items-center">
                <Link
                  href={`/products/${p.id}`}
                  tabIndex={k === 1 ? -1 : undefined}
                  aria-label={p.name}
                  className="relative mx-6 block h-14 w-44 transition-transform duration-500 hover:scale-110 tablet:mx-10 tablet:h-20 tablet:w-60"
                >
                  <Image unoptimized loading="eager" src={p.logo} alt={`${p.name} ${productKind(p)} logo`} fill sizes="240px" className="object-contain" />
                </Link>
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
    <section id="philosophy" className="relative isolate overflow-hidden bg-white px-5 py-28 tablet:px-8 tablet:py-40">
      {/* eye-drop filling line behind the copy; a white wash from the left keeps the text crisp */}
      <Image
        src="/images/photos/eye-drop-filling-line.webp"
        alt=""
        fill
        sizes="100vw"
        className="-z-20 object-cover object-[70%_center] tablet-lg:object-right"
      />
      <div
        aria-hidden
        className="absolute inset-0 -z-10 bg-white/80 tablet-lg:bg-transparent tablet-lg:bg-[linear-gradient(90deg,#fff_0%,rgba(255,255,255,0.94)_38%,rgba(255,255,255,0.55)_62%,rgba(255,255,255,0.05)_100%)]"
      />
      <div className="mx-auto max-w-[1320px]">
        <h2 className="font-heading text-[clamp(2.6rem,6.4vw,5.6rem)] font-extrabold leading-[1] tracking-[-0.03em] text-revora-slate">
          <SplitWords text="Our philosophy." highlight={{ 'philosophy.': 'text-revora-cobalt' }} />
        </h2>
        <div
          ref={ref}
          className="mt-8 max-w-4xl font-heading text-[clamp(1.25rem,2.2vw,1.9rem)] font-semibold leading-[1.4] tracking-[-0.01em] text-revora-slate"
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
