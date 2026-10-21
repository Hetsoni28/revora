'use client';

import { useEffect, useRef, useState } from 'react';
import Link from 'next/link';
import { ProductLogoLink } from '@/components/offerings/product-logo';
import { motion, useScroll, useSpring, useTransform, useReducedMotion } from 'framer-motion';
import { ArrowUpRight } from 'lucide-react';
import { ALL_PRODUCTS } from '@/lib/therapies-data';
import { Eyebrow, SplitWords } from '@/components/ui/primitives';

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
          className={`mt-12 flex items-center gap-12 px-5 tablet:gap-16 tablet:px-8 [@media(max-height:820px)]:mt-8 ${
            pinned ? 'w-max' : 'snap-x snap-mandatory scroll-px-5 overflow-x-auto pb-4 [scrollbar-width:none] tablet:scroll-px-8'
          } desktop:pl-[max(2rem,calc((100vw-1320px)/2+2rem))]`}
        >
          {ALL_PRODUCTS.map((p) => (
            <ProductLogoLink key={p.id} product={p} eager className="h-[150px] w-[64vw] max-w-[340px] shrink-0 snap-start tablet:h-[180px] tablet:w-[340px]" />
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
