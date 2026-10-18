'use client';

import Link from 'next/link';
import { motion, useReducedMotion } from 'framer-motion';
import { ArrowUpRight } from 'lucide-react';
import { expoOut } from '@/lib/easings';
import { TherapyCategory } from '@/lib/therapies-data';

interface CategoryCardProps {
  category: TherapyCategory;
  index: number;
  productCount: number;
}

/** Therapy-area tile; the colour wash rises on hover. */
export function CategoryCard({ category, index, productCount }: CategoryCardProps) {
  const reduce = useReducedMotion();
  return (
    <motion.div
      initial={reduce ? false : { opacity: 0, y: 36 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-8% 0px' }}
      transition={{ duration: 0.8, delay: (index % 2) * 0.1, ease: expoOut }}
    >
      <Link
        href={`/our-offerings/${category.slug}`}
        className="group relative flex h-full min-h-[280px] flex-col overflow-hidden rounded-[28px] border border-revora-cobalt/10 bg-white p-8 tablet:p-10"
      >
        <span
          aria-hidden
          className="absolute inset-0 translate-y-full transition-transform duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:translate-y-0"
          style={{ background: category.color }}
        />
        <div className="relative flex items-start justify-between">
          <span className="font-heading text-[56px] font-extrabold leading-none tracking-[-0.04em] text-revora-cobalt/10 transition-colors duration-500 group-hover:text-white/20">
            0{index + 1}
          </span>
          <span className="grid h-12 w-12 place-items-center rounded-full bg-revora-sky text-revora-cobalt transition-all duration-500 group-hover:rotate-45 group-hover:bg-white">
            <ArrowUpRight className="h-5 w-5" />
          </span>
        </div>
        <div className="relative mt-auto pt-10">
          <span
            className="font-sans text-[11px] font-semibold uppercase tracking-[0.16em] transition-colors duration-500 group-hover:text-white/70"
            style={{ color: category.color }}
          >
            {category.badge} · {productCount} {productCount === 1 ? 'brand' : 'brands'}
          </span>
          <h3 className="mt-2 font-heading text-[clamp(1.6rem,2.6vw,2.2rem)] font-extrabold leading-[1.05] tracking-[-0.02em] text-revora-slate transition-colors duration-500 group-hover:text-white">
            {category.shortName}
          </h3>
          <p className="mt-3 max-w-md font-sans text-[14.5px] leading-[1.65] text-revora-slate-light transition-colors duration-500 group-hover:text-white/80">
            {category.subtitle}
          </p>
        </div>
      </Link>
    </motion.div>
  );
}
