'use client';

import { useCallback, useEffect, useRef, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { AnimatePresence, motion, useReducedMotion, useScroll, useSpring, useTransform } from 'framer-motion';
import { ArrowLeft, ArrowRight, ArrowUpRight, Eye, Sparkles } from 'lucide-react';
import { expoOut } from '@/lib/easings';
import { ALL_PRODUCTS } from '@/lib/therapies-data';
import { INNOVATION_PRODUCTS } from '@/lib/innovation-products';
import { onTabListKeyDown } from '@/lib/a11y';
import { ProductLogo, ProductLogoLink } from '@/components/offerings/product-logo';
import { Eyebrow, SplitWords } from '@/components/ui/primitives';

const RANGES = [
  {
    id: 'healthcare',
    icon: Eye,
    label: 'Healthcare',
    count: `${ALL_PRODUCTS.length} eye-care brands`,
    text: 'Eye drops, eye gel and retinal nutrition for doctors, hospitals and pharmacies.',
    href: '/profile#portfolio',
    cta: 'View all eye-care brands',
  },
  {
    id: 'innovation',
    icon: Sparkles,
    label: 'Innovation',
    count: `${INNOVATION_PRODUCTS.length} products`,
    text: 'Warmers, cooling and field-care products for comfort in extreme conditions.',
    href: '/innovation',
    cta: 'Explore innovation',
  },
] as const;

type RangeId = (typeof RANGES)[number]['id'];

/**
 * Our products: one switch, two ranges.
 * Healthcare on desktop keeps the pinned rail — scrolling down slides the brand logos sideways;
 * on smaller screens (or with reduced motion) the brands sit in a grid. Innovation is a swipeable row.
 */
export function Portfolio() {
  const reduce = useReducedMotion();
  const [range, setRange] = useState<RangeId>('healthcare');
  const active = RANGES.find((r) => r.id === range) ?? RANGES[0];

  const sectionRef = useRef<HTMLElement>(null);
  const railRef = useRef<HTMLDivElement>(null);
  const [wide, setWide] = useState(false);
  const [distance, setDistance] = useState(0);
  const pinned = wide && !reduce && range === 'healthcare';

  useEffect(() => {
    const measure = () => {
      setWide(window.matchMedia('(min-width: 64rem)').matches);
      if (railRef.current) setDistance(Math.max(0, railRef.current.scrollWidth - window.innerWidth + 64));
    };
    measure();
    const ro = new ResizeObserver(measure);
    if (railRef.current) ro.observe(railRef.current);
    window.addEventListener('resize', measure);
    return () => {
      ro.disconnect();
      window.removeEventListener('resize', measure);
    };
  }, [pinned]);

  const { scrollYProgress } = useScroll({ target: sectionRef, offset: ['start start', 'end end'] });
  const smooth = useSpring(scrollYProgress, { stiffness: 140, damping: 30, mass: 0.4 });
  const x = useTransform(smooth, [0, 1], [0, -distance]);
  const bar = useTransform(smooth, [0, 1], [0.04, 1]);

  return (
    <section
      id="portfolio"
      ref={sectionRef}
      className="relative scroll-mt-24 bg-[#F6F9FC]"
      style={{ height: pinned ? `calc(100vh + ${distance}px)` : undefined }}
    >
      <div className={pinned ? 'sticky top-0 flex h-screen flex-col overflow-hidden pt-28 desktop:pt-32' : 'py-24 tablet:py-32'}>
        <div className="mx-auto w-full max-w-[1320px] px-5 tablet:px-8">
          <div className="flex flex-col gap-6 desktop:flex-row desktop:items-end desktop:justify-between">
            <div className="max-w-2xl">
              <Eyebrow>Our products</Eyebrow>
              <h2 className="mt-5 font-heading text-[clamp(2.3rem,5.4vw,4.6rem)] font-extrabold leading-[1] tracking-[-0.02em] text-revora-slate">
                <SplitWords text="Two ranges. One promise." highlight={{ 'promise.': 'text-revora-crimson' }} />
              </h2>
              <p className="mt-4 font-sans text-[16px] leading-[1.7] text-revora-slate-light">{active.text}</p>
            </div>

            <div
              role="tablist"
              aria-label="Product ranges"
              onKeyDown={(e) => onTabListKeyDown(e, RANGES.map((r) => r.id), range, setRange)}
              className="flex w-full shrink-0 gap-1 rounded-full border border-revora-cobalt/10 bg-white p-1 sm:w-auto"
            >
              {RANGES.map((r) => {
                const on = r.id === range;
                return (
                  <button
                    key={r.id}
                    type="button"
                    role="tab"
                    id={`range-tab-${r.id}`}
                    data-tab={r.id}
                    aria-selected={on}
                    aria-controls="range-panel"
                    tabIndex={on ? 0 : -1}
                    onClick={() => setRange(r.id)}
                    className={`relative flex min-h-12 flex-1 items-center justify-center gap-2 whitespace-nowrap rounded-full px-4 font-sans text-[14.5px] font-semibold transition-colors sm:flex-none sm:px-5 ${on ? 'text-white' : 'text-revora-slate hover:text-revora-cobalt'}`}
                  >
                    {on && <motion.span layoutId="range-pill" className="absolute inset-0 rounded-full bg-revora-cobalt" transition={{ type: 'spring', stiffness: 380, damping: 32 }} />}
                    <r.icon className="relative h-4 w-4 shrink-0" />
                    <span className="relative">{r.label}</span>
                    <span className={`relative hidden font-medium tablet:inline ${on ? 'text-white/70' : 'text-revora-slate-muted'}`}>· {r.count}</span>
                  </button>
                );
              })}
            </div>
          </div>
        </div>

        <div id="range-panel" role="tabpanel" aria-labelledby={`range-tab-${range}`}>
          {pinned ? (
            <>
              {/* the original logo rail: vertical scroll drives it sideways */}
              <motion.div
                ref={railRef}
                style={{ x }}
                className="mt-10 flex w-max items-center gap-24 px-8 desktop:pl-[max(2rem,calc((100vw-1320px)/2+2rem))] [@media(max-height:820px)]:mt-6"
              >
                {ALL_PRODUCTS.map((p) => (
                  <ProductLogoLink key={p.id} product={p} eager className="h-[min(240px,26vh)] w-[460px] shrink-0" />
                ))}
              </motion.div>
              <div className="mx-auto mt-10 w-full max-w-[1320px] px-8 [@media(max-height:820px)]:mt-6">
                <div className="h-[2px] w-full overflow-hidden rounded-full bg-revora-cobalt/10">
                  <motion.div className="h-full origin-left bg-gradient-to-r from-revora-cobalt to-revora-crimson" style={{ scaleX: bar }} />
                </div>
              </div>
            </>
          ) : (
            <div className="mx-auto mt-10 max-w-[1320px] px-5 tablet:mt-12 tablet:px-8">
              <AnimatePresence mode="wait" initial={false}>
                <motion.div
                  key={range}
                  initial={reduce ? false : { opacity: 0, y: 16 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={reduce ? undefined : { opacity: 0, y: -8 }}
                  transition={{ duration: 0.4, ease: expoOut }}
                >
                  {range === 'healthcare' ? <BrandGrid /> : <InnovationRow />}
                </motion.div>
              </AnimatePresence>
            </div>
          )}
        </div>

        <div className="mx-auto w-full max-w-[1320px] px-5 tablet:px-8">
          <Link href={active.href} className="group mt-8 inline-flex min-h-11 items-center gap-2 font-sans text-[15px] font-semibold text-revora-cobalt [@media(max-height:820px)]:mt-5">
            {active.cta}
            <ArrowUpRight className="h-4 w-4 transition-transform duration-500 group-hover:rotate-45" />
          </Link>
        </div>
      </div>
    </section>
  );
}

/* ── Healthcare: every brand fully visible ───────────────── */
function BrandGrid() {
  return (
    <ul className="grid grid-cols-2 gap-3 tablet:grid-cols-3 tablet:gap-4">
      {ALL_PRODUCTS.map((p) => (
        <li key={p.id} className="group overflow-hidden rounded-3xl border border-revora-cobalt/10 bg-white transition-shadow duration-500 hover:shadow-[0_24px_50px_-28px_rgba(11,74,143,0.45)]">
          <ProductLogo product={p} sizes="(min-width: 768px) 30vw, 45vw" className="aspect-[16/10]" />
        </li>
      ))}
    </ul>
  );
}

/* ── Innovation: swipeable row with arrows and dots ───────── */
function InnovationRow() {
  const rowRef = useRef<HTMLUListElement>(null);
  const [index, setIndex] = useState(0);
  const [edges, setEdges] = useState({ start: true, end: false });

  // which card sits at the left edge, and whether we can scroll further
  const update = useCallback(() => {
    const row = rowRef.current;
    if (!row) return;
    const first = row.children[0] as HTMLElement | undefined;
    const step = first ? first.offsetWidth + parseFloat(getComputedStyle(row).columnGap || '0') : row.clientWidth;
    setIndex(Math.round(row.scrollLeft / step));
    setEdges({ start: row.scrollLeft < 8, end: row.scrollLeft + row.clientWidth > row.scrollWidth - 8 });
  }, []);

  useEffect(() => {
    update();
    window.addEventListener('resize', update);
    return () => window.removeEventListener('resize', update);
  }, [update]);

  const go = (to: number) => {
    const card = rowRef.current?.children[Math.max(0, Math.min(to, INNOVATION_PRODUCTS.length - 1))] as HTMLElement | undefined;
    card?.scrollIntoView({ behavior: 'smooth', block: 'nearest', inline: 'start' });
  };

  return (
    <div>
      <ul
        ref={rowRef}
        onScroll={update}
        aria-label="Innovation products"
        className="-mx-5 flex snap-x snap-mandatory gap-4 overflow-x-auto scroll-px-5 px-5 pb-2 [scrollbar-width:none] tablet:mx-0 tablet:scroll-px-0 tablet:gap-5 tablet:px-0 [&::-webkit-scrollbar]:hidden"
      >
        {INNOVATION_PRODUCTS.map((p) => (
          <li key={p.id} className="w-[82%] shrink-0 snap-start sm:w-[calc((100%-1rem)/2)] tablet:w-[calc((100%-1.25rem)/2)] desktop:w-[calc((100%-2.5rem)/3)]">
            <Link
              href={`/innovation#${p.id}`}
              className="group flex h-full flex-col overflow-hidden rounded-[28px] border border-revora-cobalt/10 bg-white transition-shadow duration-500 hover:shadow-[0_30px_60px_-30px_rgba(11,74,143,0.45)]"
            >
              <span className="relative block aspect-[4/3] bg-[#F6F9FC]">
                <Image
                  src={p.image}
                  alt={p.imageAlt}
                  fill
                  sizes="(min-width: 1280px) 420px, (min-width: 768px) 45vw, 82vw"
                  className="object-contain p-4 transition-transform duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-[1.05]"
                />
              </span>
              <span className="flex flex-1 flex-col p-5 tablet:p-6">
                <span className="font-sans text-[11px] font-semibold uppercase tracking-[0.16em] text-revora-crimson-dark">{p.category}</span>
                <span className="mt-1 font-heading text-[1.2rem] font-extrabold leading-tight text-revora-slate tablet:text-[1.3rem]">
                  {[p.name, p.accent].filter(Boolean).join(' ')}
                </span>
                <span className="mt-1 font-sans text-[14px] leading-snug text-revora-slate-light">{p.tagline}</span>
                <span className="mt-auto inline-flex items-center gap-1.5 pt-4 font-sans text-[13.5px] font-semibold text-revora-cobalt">
                  View product <ArrowUpRight className="h-4 w-4 transition-transform duration-500 group-hover:rotate-45" />
                </span>
              </span>
            </Link>
          </li>
        ))}
      </ul>

      <div className="mt-6 flex items-center justify-between gap-4">
        <div className="flex items-center gap-2" aria-hidden>
          {INNOVATION_PRODUCTS.map((p, i) => (
            <span key={p.id} className={`h-2 rounded-full transition-all duration-300 ${i === index ? 'w-6 bg-revora-cobalt' : 'w-2 bg-revora-cobalt/20'}`} />
          ))}
        </div>
        <div className="flex gap-2">
          <button
            type="button"
            onClick={() => go(index - 1)}
            disabled={edges.start}
            aria-label="Previous products"
            className="grid h-11 w-11 place-items-center rounded-full border border-revora-cobalt/15 bg-white text-revora-cobalt transition-colors hover:bg-revora-sky disabled:cursor-not-allowed disabled:opacity-40"
          >
            <ArrowLeft className="h-4 w-4" />
          </button>
          <button
            type="button"
            onClick={() => go(index + 1)}
            disabled={edges.end}
            aria-label="Next products"
            className="grid h-11 w-11 place-items-center rounded-full border border-revora-cobalt/15 bg-white text-revora-cobalt transition-colors hover:bg-revora-sky disabled:cursor-not-allowed disabled:opacity-40"
          >
            <ArrowRight className="h-4 w-4" />
          </button>
        </div>
      </div>
    </div>
  );
}
