'use client';

import { useEffect, useRef, useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { motion, useScroll, useSpring, useTransform, useReducedMotion } from 'framer-motion';
import { ArrowUpRight } from 'lucide-react';
import { ALL_PRODUCTS, THERAPY_CATEGORIES } from '@/lib/therapies-data';
import { Eyebrow, SplitWords } from '@/components/ui/primitives';

const CAT_NAME = Object.fromEntries(THERAPY_CATEGORIES.map((c) => [c.slug, c.shortName]));

function ProductCard({ p, index }: { p: (typeof ALL_PRODUCTS)[number]; index: number }) {
  return (
    <Link
      href={`/products/${p.id}`}
      className="group relative flex h-full w-[78vw] max-w-[380px] shrink-0 snap-start flex-col overflow-hidden rounded-[28px] border border-revora-cobalt/10 bg-white tablet:w-[360px]"
    >
      {/* visual stage */}
      <div className="relative h-[280px] overflow-hidden bg-revora-sky tablet:h-[320px] tablet-lg:h-[min(320px,34vh)] desktop:h-[min(320px,30vh)]">
        <Image
          src={p.image}
          alt={`${p.name} — ${p.genericName}, carton and bottle`}
          fill
          sizes="(min-width: 768px) 360px, 78vw"
          className="object-cover transition-transform duration-[1200ms] ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-[1.07]"
        />
        {/* brand-colour wash rises on hover */}
        <span
          aria-hidden
          className="absolute inset-x-0 bottom-0 h-2/3 translate-y-1/3 opacity-0 transition-all duration-700 group-hover:translate-y-0 group-hover:opacity-100"
          style={{ background: `linear-gradient(to top, ${p.color}40, transparent)` }}
        />
        <span className="absolute left-4 top-4 grid h-8 min-w-8 place-items-center rounded-full bg-white/85 px-2 font-heading text-[12px] font-extrabold text-revora-slate backdrop-blur">
          {String(index + 1).padStart(2, '0')}
        </span>
        <span className="absolute right-4 top-4 rounded-full bg-white/85 px-3 py-1.5 font-sans text-[11px] font-semibold uppercase tracking-[0.14em] text-revora-slate backdrop-blur">
          {CAT_NAME[p.categorySlug]}
        </span>
      </div>

      <div className="flex flex-1 flex-col p-6">
        <span className="font-sans text-[11px] font-semibold uppercase tracking-[0.14em]" style={{ color: p.color }}>
          {p.badge}
        </span>
        <h3 className="mt-2 font-heading text-[1.7rem] font-extrabold leading-none tracking-[-0.01em] text-revora-slate">{p.name}</h3>
        <p className="mt-2 font-sans text-[13.5px] leading-[1.55] text-revora-slate-light">{p.genericName}</p>
        <div className="mt-auto flex items-center justify-between pt-6">
          <span className="font-sans text-[12px] text-revora-slate-muted">{p.volume}</span>
          <span className="grid h-10 w-10 place-items-center rounded-full bg-revora-sky text-revora-cobalt transition-all duration-500 group-hover:rotate-45 group-hover:bg-revora-cobalt group-hover:text-white">
            <ArrowUpRight className="h-4 w-4" />
          </span>
        </div>
      </div>
    </Link>
  );
}

function Heading() {
  return (
    <div className="flex flex-col gap-5 tablet-lg:flex-row tablet-lg:items-end tablet-lg:justify-between">
      <div>
        <Eyebrow>The launch portfolio</Eyebrow>
        <h2 className="mt-5 font-heading text-[clamp(2.4rem,5.4vw,4.6rem)] font-extrabold leading-[1] tracking-[-0.02em] text-revora-slate">
          <SplitWords text="Nine brands. One focus." highlight={{ 'focus.': 'text-revora-crimson' }} />
        </h2>
      </div>
      <Link
        href="/our-offerings"
        className="group -my-2 inline-flex min-h-10 items-center gap-2 self-start font-sans text-[15px] font-semibold text-revora-cobalt tablet-lg:self-auto"
      >
        View all therapy areas
        <ArrowUpRight className="h-4 w-4 transition-transform duration-500 group-hover:rotate-45" />
      </Link>
    </div>
  );
}

/** Pinned section: vertical scroll drives a horizontal product rail (desktop). */
export function Portfolio() {
  const sectionRef = useRef<HTMLElement>(null);
  const railRef = useRef<HTMLDivElement>(null);
  const reduce = useReducedMotion();
  const [distance, setDistance] = useState(0);
  const [pinned, setPinned] = useState(false);

  useEffect(() => {
    const measure = () => {
      const isWide = window.matchMedia('(min-width: 64rem)').matches;
      setPinned(isWide && !reduce);
      if (railRef.current) {
        setDistance(Math.max(0, railRef.current.scrollWidth - window.innerWidth + 64));
      }
    };
    measure();
    const ro = new ResizeObserver(measure);
    if (railRef.current) ro.observe(railRef.current);
    window.addEventListener('resize', measure);
    return () => {
      ro.disconnect();
      window.removeEventListener('resize', measure);
    };
  }, [reduce]);

  const { scrollYProgress } = useScroll({ target: sectionRef, offset: ['start start', 'end end'] });
  const smooth = useSpring(scrollYProgress, { stiffness: 140, damping: 30, mass: 0.4 });
  const x = useTransform(smooth, [0, 1], [0, -distance]);
  const bar = useTransform(smooth, [0, 1], [0.04, 1]);

  return (
    <section
      id="portfolio"
      ref={sectionRef}
      className="relative bg-[#F6F9FC]"
      style={{ height: pinned ? `calc(100vh + ${distance}px)` : undefined }}
    >
      <div className={pinned ? 'sticky top-0 flex h-screen flex-col justify-center overflow-hidden pt-20 desktop:pt-40' : 'py-24 tablet:py-32'}>
        <div className="mx-auto w-full max-w-[1320px] px-5 tablet:px-8">
          <Heading />
        </div>

        <motion.div
          ref={railRef}
          style={pinned ? { x } : undefined}
          className={`mt-12 flex gap-5 px-5 tablet:px-8 [@media(max-height:820px)]:mt-8 ${
            pinned ? 'w-max' : 'snap-x snap-mandatory overflow-x-auto pb-4 [scrollbar-width:none]'
          } desktop:pl-[max(2rem,calc((100vw-1320px)/2+2rem))]`}
        >
          {ALL_PRODUCTS.map((p, i) => (
            <ProductCard key={p.id} p={p} index={i} />
          ))}
        </motion.div>

        {pinned && (
          <div className="mx-auto mt-10 w-full max-w-[1320px] px-8">
            <div className="h-[2px] w-full overflow-hidden rounded-full bg-revora-cobalt/10">
              <motion.div className="h-full origin-left bg-gradient-to-r from-revora-cobalt to-revora-crimson" style={{ scaleX: bar }} />
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
