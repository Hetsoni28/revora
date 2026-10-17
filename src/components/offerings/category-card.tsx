'use client';

import Link from 'next/link';
import { ArrowRight, CheckCircle2, LucideIcon } from 'lucide-react';
import { TherapyCategory } from '@/lib/therapies-data';

interface CategoryCardProps {
  category: TherapyCategory;
  icon: LucideIcon;
}

export function CategoryCard({ category, icon: IconComponent }: CategoryCardProps) {
  return (
    <div className="bg-white rounded-2xl border border-[#D9DFE8] hover:border-[#0B4A8F]/40 hover:shadow-lg transition-all duration-300 p-5 sm:p-7 md:p-8 flex flex-col justify-between group relative overflow-hidden">
      {/* Top accent bar */}
      <div
        className="absolute top-0 left-0 right-0 h-1 transition-all duration-300 group-hover:h-1.5"
        style={{ backgroundColor: category.color }}
      />

      <div>
        {/* Header: Icon + Badge */}
        <div className="flex items-center justify-between gap-2 mb-4">
          <div
            className="w-11 h-11 sm:w-12 sm:h-12 rounded-xl flex items-center justify-center transition-transform group-hover:scale-105 duration-300 shrink-0"
            style={{
              backgroundColor: `${category.color}15`,
              color: category.color,
            }}
          >
            <IconComponent size={22} className="sm:size-6" />
          </div>
          <span
            className="px-2.5 py-1 rounded-full text-[9.5px] sm:text-[10px] font-semibold uppercase tracking-wider text-white text-right shrink-0"
            style={{ backgroundColor: category.color }}
          >
            {category.badge}
          </span>
        </div>

        {/* Title & Subtitle */}
        <h3 className="font-heading font-bold text-lg sm:text-xl md:text-2xl text-[#1E2428] group-hover:text-[#0B4A8F] transition-colors leading-tight">
          {category.title}
        </h3>
        <p className="font-sans text-xs font-semibold text-[#0B4A8F] mt-1.5">
          {category.subtitle}
        </p>

        {/* Description */}
        <p className="font-sans text-xs sm:text-sm text-[#1E2428]/75 mt-3 leading-relaxed">
          {category.description}
        </p>

        {/* Key Formulations List */}
        <div className="mt-5 pt-4 border-t border-[#F0F4F8]">
          <span className="text-[10.5px] sm:text-[11px] font-semibold uppercase tracking-wider text-[#1E2428]/50 block mb-2">
            Key Formulations &amp; Molecules:
          </span>
          <ul className="space-y-1.5">
            {category.subTherapies.map((sub, sIdx) => (
              <li
                key={sIdx}
                className="flex items-start gap-2 text-xs text-[#1E2428]/85 font-medium leading-snug"
              >
                <CheckCircle2 size={13} className="text-[#0B4A8F] shrink-0 mt-0.5" />
                <span>{sub}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* Card Action Link */}
      <div className="mt-6 pt-5 border-t border-[#F0F4F8] flex flex-wrap items-center justify-between gap-2">
        <span className="text-xs font-mono text-[#1E2428]/60">
          {category.productIds.length} Prescribing Formulations
        </span>
        <Link
          href={`/our-offerings/${category.slug}`}
          className="inline-flex items-center gap-1.5 text-xs font-semibold text-[#0B4A8F] group-hover:text-[#08356A] group-hover:translate-x-1 transition-all"
        >
          <span>Explore Category</span>
          <ArrowRight size={14} />
        </Link>
      </div>
    </div>
  );
}
