'use client';

import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion';
import { Plus } from 'lucide-react';
import { THERAPY_CATEGORIES, ALL_PRODUCTS } from '@/lib/therapies-data';
import { expoOut } from '@/lib/easings';
import { Eyebrow, SplitWords } from '@/components/ui/primitives';

const PRODUCT = Object.fromEntries(ALL_PRODUCTS.map((p) => [p.id, p]));

export function Therapies() {
  const [active, setActive] = useState<number | null>(0);
  const reduce = useReducedMotion();

  return (
    <section id="therapies" className="relative bg-white px-5 py-24 tablet:px-8 tablet:py-36">
      <div className="mx-auto grid max-w-[1320px] gap-12 tablet-lg:grid-cols-[0.8fr_1.2fr] tablet-lg:gap-20">
        <div className="tablet-lg:sticky tablet-lg:top-32 desktop:top-48 tablet-lg:self-start">
          <Eyebrow>Therapy areas</Eyebrow>
          <h2 className="mt-5 font-heading text-[clamp(2.4rem,5vw,4.2rem)] font-extrabold leading-[1] tracking-[-0.02em] text-revora-slate">
            <SplitWords text="From infection to the retina." highlight={{ 'retina.': 'text-revora-cobalt' }} />
          </h2>
          <p className="mt-6 max-w-sm font-sans text-[15px] leading-[1.7] text-revora-slate-light">
            Four focused therapy areas that follow the patient through the eye clinic — from first prescription to surgical recovery and long-term care.
          </p>

          {/* big animated index */}
          <div className="relative mt-12 hidden h-[140px] overflow-hidden tablet-lg:block">
            <AnimatePresence mode="popLayout" initial={false}>
              {active !== null && THERAPY_CATEGORIES[active] && (
                <motion.span
                  key={active}
                  initial={reduce ? false : { y: '100%' }}
                  animate={{ y: '0%' }}
                  exit={{ y: '-100%' }}
                  transition={{ duration: 0.7, ease: expoOut }}
                  className="absolute font-heading text-[140px] font-extrabold leading-none tracking-[-0.04em]"
                  style={{ color: THERAPY_CATEGORIES[active].color }}
                >
                  0{active + 1}
                </motion.span>
              )}
            </AnimatePresence>
          </div>
        </div>

        <ul className="border-t border-revora-cobalt/10">
          {THERAPY_CATEGORIES.map((c, i) => {
            const open = active === i;
            return (
              <li key={c.slug} className="border-b border-revora-cobalt/10">
                <button
                  type="button"
                  onClick={() => setActive((prev) => (prev === i ? null : i))}
                  aria-expanded={open}
                  aria-controls={`therapy-${c.slug}`}
                  className="group flex w-full cursor-pointer items-center gap-5 py-7 text-left tablet:py-9"
                >
                  <span className="font-sans text-[12px] font-semibold text-revora-slate-muted">0{i + 1}</span>
                  <span
                    className={`flex-1 font-heading text-[clamp(1.6rem,3.2vw,2.6rem)] font-extrabold leading-[1.05] tracking-[-0.02em] transition-colors duration-500 ${
                      open ? 'text-revora-slate' : 'text-revora-slate/35 group-hover:text-revora-slate/70'
                    }`}
                  >
                    {c.shortName}
                  </span>
                  <span
                    className={`grid h-11 w-11 shrink-0 place-items-center rounded-full transition-all duration-500 ${
                      open ? 'rotate-45 text-white' : 'bg-revora-sky text-revora-cobalt'
                    }`}
                    style={open ? { background: c.color } : undefined}
                    aria-hidden="true"
                  >
                    <Plus className="h-5 w-5" />
                  </span>
                </button>

                <AnimatePresence initial={false}>
                  {open && (
                    <motion.div
                      id={`therapy-${c.slug}`}
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.6, ease: expoOut }}
                      className="overflow-hidden"
                    >
                      <div className="pb-9 pl-0 tablet:pl-10">
                        <p className="max-w-xl font-sans text-[15px] leading-[1.75] text-revora-slate-light">{c.subtitle}.</p>
                        <div className="mt-6 grid max-w-2xl grid-cols-2 gap-3 tablet:grid-cols-3">
                          {c.productIds.map((id) => {
                            const p = PRODUCT[id];
                            if (!p) return null;
                            return (
                              <Link
                                key={id}
                                href={`/products/${id}`}
                                aria-label={p.name}
                                title={p.name}
                                className="relative block h-16 rounded-2xl border bg-white transition-all duration-300 hover:-translate-y-0.5 hover:shadow-[0_12px_28px_-16px_rgba(11,74,143,0.55)] tablet:h-20"
                                style={{ borderColor: `${c.color}33` }}
                              >
                                <Image unoptimized src={p.logo} alt={`${p.name} logo`} fill sizes="200px" className="object-contain p-3" />
                              </Link>
                            );
                          })}
                        </div>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </li>
            );
          })}
        </ul>
      </div>
    </section>
  );
}
