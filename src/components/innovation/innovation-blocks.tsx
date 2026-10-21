'use client';

import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion';
import { ArrowUpRight, Clock, Plus, Thermometer } from 'lucide-react';
import { expoOut } from '@/lib/easings';
import type { InnovationProduct } from '@/lib/innovation-products';
import { Button } from '@/components/ui/button';

/* ── Promo banner (hero) ──────────────────────────────────── */
export function PromoBanner({ product: p }: { product: InnovationProduct }) {
  const reduce = useReducedMotion();
  return (
    <section className="px-3 pt-28 tablet:px-6 tablet:pt-36 desktop:pt-44">
      <motion.div
        initial={reduce ? false : { opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1, ease: expoOut }}
        className="relative isolate mx-auto max-w-[1400px] overflow-hidden rounded-[28px] bg-revora-cobalt-deep text-white tablet:rounded-[36px]"
      >
        {/* backdrop photo with slow zoom */}
        <motion.div
          className="absolute inset-0 -z-20"
          initial={reduce ? false : { scale: 1.15 }}
          animate={{ scale: 1 }}
          transition={{ duration: 2.4, ease: expoOut }}
        >
          <Image src="/images/innovation/himalaya-trek.webp" alt="" fill loading="eager" sizes="100vw" className="object-cover" />
        </motion.div>
        <div aria-hidden className="absolute inset-0 -z-10 bg-linear-to-r from-revora-cobalt-deep via-revora-cobalt-deep/85 to-revora-cobalt-deep/20" />

        <div className="grid grid-cols-[minmax(0,1fr)] items-center gap-10 px-6 py-12 tablet:px-12 tablet:py-16 tablet-lg:grid-cols-[1.05fr_0.95fr] desktop:px-16 desktop:py-20">
          <div>
            <motion.span
              initial={reduce ? false : { opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.2, ease: expoOut }}
              className="inline-flex items-center gap-2 rounded-full bg-white/10 px-3.5 py-1.5 font-sans text-[11px] font-semibold uppercase tracking-[0.18em] text-revora-cobalt-pale backdrop-blur"
            >
              Revora Innovation · New
            </motion.span>
            <motion.h1
              initial={reduce ? false : { opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, delay: 0.3, ease: expoOut }}
              className="mt-5 font-heading text-[clamp(2.6rem,6vw,5.2rem)] font-extrabold leading-[0.98] tracking-[-0.03em]"
            >
              Warmth that
              <br />
              <span className="text-[#FF7A2F]">lasts.</span>
            </motion.h1>
            <motion.p
              initial={reduce ? false : { opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.9, delay: 0.45, ease: expoOut }}
              className="mt-5 max-w-md font-sans text-[17px] leading-[1.7] text-white/75"
            >
              Revora {p.name} {p.accent} — a self-heating pad for extreme cold.
            </motion.p>
            <motion.div
              initial={reduce ? false : { opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.9, delay: 0.55, ease: expoOut }}
              className="mt-7 flex flex-wrap gap-2.5"
            >
              <span className="inline-flex items-center gap-2 rounded-full bg-white/10 px-4 py-2 font-sans text-[13.5px] font-semibold backdrop-blur">
                <Thermometer className="h-4 w-4 text-[#FF7A2F]" /> {p.features[0]?.value}
              </span>
              <span className="inline-flex items-center gap-2 rounded-full bg-white/10 px-4 py-2 font-sans text-[13.5px] font-semibold backdrop-blur">
                <Clock className="h-4 w-4 text-[#FF7A2F]" /> Up to {p.features[1]?.value}
              </span>
            </motion.div>
            <motion.div
              initial={reduce ? false : { opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.9, delay: 0.65, ease: expoOut }}
              className="mt-9 flex flex-wrap gap-3"
            >
              <Button href={`#${p.id}`} variant="light" arrow="down" magnetic>Explore {p.name} {p.accent}</Button>
              <Button href="/channel-partner" variant="outline-light">Become a distributor</Button>
            </motion.div>
          </div>

          {/* product, floating */}
          <motion.div
            initial={reduce ? false : { opacity: 0, x: 40, rotate: 4 }}
            animate={{ opacity: 1, x: 0, rotate: 0 }}
            transition={{ duration: 1.2, delay: 0.35, ease: expoOut }}
            className="relative mx-auto w-full max-w-[560px]"
          >
            <motion.div
              animate={reduce ? undefined : { y: [0, -10, 0] }}
              transition={{ duration: 5, repeat: Infinity, ease: 'easeInOut' }}
              className="relative aspect-[3/2] overflow-hidden rounded-[24px] shadow-[0_50px_90px_-30px_rgba(0,0,0,0.6)]"
            >
              <Image src={p.image} alt={p.imageAlt} fill loading="eager" sizes="(min-width: 1024px) 45vw, 100vw" className="object-cover" />
            </motion.div>
            <span className="absolute -bottom-4 -left-2 rotate-[-4deg] rounded-2xl bg-[#FF7A2F] px-4 py-2.5 font-heading text-[14px] font-extrabold text-white shadow-lg tablet:-left-6">
              {p.highlight}
            </span>
          </motion.div>
        </div>
      </motion.div>
    </section>
  );
}

/* ── Shop by need: photo tiles ────────────────────────────── */
export interface NeedTile {
  label: string;
  image: string;
  alt: string;
  href: string;
}

export function NeedTiles({ tiles }: { tiles: NeedTile[] }) {
  const reduce = useReducedMotion();
  return (
    <div className="grid grid-cols-2 gap-4 desktop:grid-cols-4 desktop:gap-5">
      {tiles.map((t, i) => (
        <motion.div
          key={t.label}
          initial={reduce ? false : { opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-8% 0px' }}
          transition={{ duration: 0.8, delay: i * 0.08, ease: expoOut }}
        >
          <Link href={t.href} className="group block">
            <div className="relative aspect-[3/4] overflow-hidden rounded-[24px] bg-revora-sky">
              <Image src={t.image} alt={t.alt} fill sizes="(min-width: 1280px) 25vw, 50vw" className="object-cover transition-transform duration-[1200ms] ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-[1.07]" />
              <div aria-hidden className="absolute inset-0 bg-linear-to-t from-revora-cobalt-deep/85 via-transparent to-transparent" />
              <div className="absolute inset-x-4 bottom-4 flex items-end justify-between gap-3 text-white tablet:inset-x-5 tablet:bottom-5">
                <h3 className="font-heading text-[1.15rem] font-extrabold leading-tight tablet:text-[1.4rem]">{t.label}</h3>
                <span className="grid h-10 w-10 shrink-0 place-items-center rounded-full bg-white text-revora-cobalt transition-transform duration-500 group-hover:rotate-45">
                  <ArrowUpRight className="h-4 w-4" />
                </span>
              </div>
            </div>
          </Link>
        </motion.div>
      ))}
    </div>
  );
}

/* ── Product card ─────────────────────────────────────────── */
export function InnovationProductCard({ product: p, index = 0 }: { product: InnovationProduct; index?: number }) {
  const reduce = useReducedMotion();
  return (
    <motion.article
      initial={reduce ? false : { opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-8% 0px' }}
      transition={{ duration: 0.8, delay: index * 0.08, ease: expoOut }}
      className="group flex flex-col overflow-hidden rounded-[24px] border border-revora-cobalt/10 bg-white transition-shadow duration-500 hover:shadow-[0_30px_60px_-30px_rgba(11,74,143,0.5)]"
    >
      <Link href={`#${p.id}`} className="relative block aspect-[4/3] overflow-hidden bg-white">
        <Image src={p.image} alt={p.imageAlt} fill sizes="(min-width: 1024px) 33vw, 100vw" className="object-contain p-3 transition-transform duration-[1000ms] ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-[1.05]" />
        <span className="absolute left-4 top-4 rounded-full bg-revora-crimson px-3 py-1 font-sans text-[11px] font-bold uppercase tracking-[0.14em] text-white">New</span>
      </Link>
      <div className="flex flex-1 flex-col p-6">
        <span className="font-sans text-[11px] font-semibold uppercase tracking-[0.16em] text-revora-slate-muted">{p.category}</span>
        <h3 className="mt-1.5 font-heading text-[1.4rem] font-extrabold leading-tight text-revora-slate">
          {p.name} {p.accent && <span className="text-revora-crimson">{p.accent}</span>}
        </h3>
        <p className="mt-1 font-sans text-[14px] text-revora-slate-light">{p.pack}</p>
        <div className="mt-4 flex flex-wrap gap-2">
          {p.features.slice(0, 2).map((f) => (
            <span key={f.value} className="rounded-full bg-revora-sky px-3 py-1 font-sans text-[12.5px] font-semibold text-revora-cobalt">{f.value}</span>
          ))}
        </div>
        <div className="mt-auto flex items-center justify-between gap-3 pt-6">
          <Link href={`#${p.id}`} className="inline-flex items-center gap-1.5 font-sans text-[14px] font-semibold text-revora-cobalt">
            View details <ArrowUpRight className="h-4 w-4 transition-transform duration-500 group-hover:rotate-45" />
          </Link>
          <a
            href={`mailto:depot@revorahealthcare.com?subject=${encodeURIComponent(`Enquiry — Revora ${p.name} ${p.accent ?? ''}`.trim())}`}
            className="rounded-full border border-revora-cobalt/20 px-4 py-2 font-sans text-[13px] font-semibold text-revora-cobalt transition-colors hover:bg-revora-cobalt hover:text-white"
          >
            Enquire
          </a>
        </div>
      </div>
    </motion.article>
  );
}

/* ── FAQ accordion ────────────────────────────────────────── */
export function FaqList({ items }: { items: { q: string; a: string }[] }) {
  const [open, setOpen] = useState<number | null>(0);
  return (
    <ul className="divide-y divide-revora-cobalt/10 rounded-[24px] border border-revora-cobalt/10 bg-white">
      {items.map((f, i) => {
        const on = open === i;
        return (
          <li key={f.q}>
            <button
              type="button"
              onClick={() => setOpen(on ? null : i)}
              aria-expanded={on}
              className="flex w-full items-center justify-between gap-4 px-6 py-5 text-left tablet:px-8"
            >
              <span className="font-heading text-[1.05rem] font-bold text-revora-slate tablet:text-[1.15rem]">{f.q}</span>
              <span className={`grid h-9 w-9 shrink-0 place-items-center rounded-full transition-all duration-500 ${on ? 'rotate-45 bg-revora-cobalt text-white' : 'bg-revora-sky text-revora-cobalt'}`}>
                <Plus className="h-4 w-4" />
              </span>
            </button>
            <AnimatePresence initial={false}>
              {on && (
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: 'auto', opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.45, ease: expoOut }}
                  className="overflow-hidden"
                >
                  <p className="px-6 pb-6 font-sans text-[15.5px] leading-[1.7] text-revora-slate-light tablet:px-8">{f.a}</p>
                </motion.div>
              )}
            </AnimatePresence>
          </li>
        );
      })}
    </ul>
  );
}
