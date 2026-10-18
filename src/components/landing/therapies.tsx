'use client';

import { useState } from 'react';
import Link from 'next/link';
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion';
import { ArrowUpRight, Plus } from 'lucide-react';
import { THERAPY_CATEGORIES, ALL_PRODUCTS } from '@/lib/therapies-data';
import { expoOut } from '@/lib/easings';
import { Eyebrow, SplitWords } from '@/components/ui/primitives';

const NAME = Object.fromEntries(ALL_PRODUCTS.map((p) => [p.id, p.name]));

export function Therapies() {
  const [active, setActive] = useState(0);
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
            </AnimatePresence>
          </div>
        </div>

        <ul className="border-t border-revora-cobalt/10">
          {THERAPY_CATEGORIES.map((c, i) => {
            const open = active === i;
            return (
              <li key={c.slug} className="border-b border-revora-cobalt/10">
                <button
                  onClick={() => setActive(i)}
                  aria-expanded={open}
                  className="group flex w-full items-center gap-5 py-7 text-left tablet:py-9"
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
                  >
                    <Plus className="h-5 w-5" />
                  </span>
                </button>

                <AnimatePresence initial={false}>
                  {open && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.6, ease: expoOut }}
                      className="overflow-hidden"
                    >
                      <div className="pb-9 pl-0 tablet:pl-10">
                        <p className="max-w-xl font-sans text-[15px] leading-[1.75] text-revora-slate-light">{c.subtitle}.</p>
                        <div className="mt-6 flex flex-wrap gap-2">
                          {c.productIds.map((id) => (
                            <Link
                              key={id}
                              href={`/products/${id}`}
                              className="rounded-full border px-4 py-2 font-heading text-[14px] font-bold transition-colors duration-300 hover:text-white"
                              style={{ borderColor: `${c.color}40`, color: c.color }}
                              onMouseEnter={(e) => (e.currentTarget.style.background = c.color)}
                              onMouseLeave={(e) => (e.currentTarget.style.background = 'transparent')}
                            >
                              {NAME[id]}
                            </Link>
                          ))}
                        </div>
                        <Link
                          href={`/our-offerings/${c.slug}`}
                          className="group mt-7 inline-flex items-center gap-2 font-sans text-[14px] font-semibold text-revora-cobalt"
                        >
                          Explore {c.shortName}
                          <ArrowUpRight className="h-4 w-4 transition-transform duration-500 group-hover:rotate-45" />
                        </Link>
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
