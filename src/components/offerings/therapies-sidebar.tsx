'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useState } from 'react';
import { ChevronDown, ChevronRight, Building2, ShieldCheck, FileText, Pill } from 'lucide-react';
import { THERAPY_CATEGORIES, ALL_PRODUCTS, getProductById } from '@/lib/therapies-data';

interface TherapiesSidebarProps {
  activeSlug?: string;
  activeProductId?: string;
  onSelectCategory?: (slug: string) => void;
  className?: string;
}

export function TherapiesSidebar({
  activeSlug,
  activeProductId,
  onSelectCategory,
  className = '',
}: TherapiesSidebarProps) {
  const pathname = usePathname();

  // If activeProductId is provided, find its category to ensure it's expanded
  const activeProduct = activeProductId ? getProductById(activeProductId) : null;
  const targetCategorySlug = activeProduct ? activeProduct.categorySlug : activeSlug;

  // Expanded state for categories - default all true or ensuring active category is open
  const [expanded, setExpanded] = useState<Record<string, boolean>>({
    'anti-infectives': true,
    'dry-eye-lubricants': true,
    'nsaids-surgical': true,
    'retinal-nutrition': true,
    ...(targetCategorySlug ? { [targetCategorySlug]: true } : {}),
  });

  const toggleExpand = (slug: string, e: React.MouseEvent) => {
    e.stopPropagation();
    setExpanded((prev) => ({ ...prev, [slug]: !prev[slug] }));
  };

  return (
    <aside
      className={`bg-white rounded-xl border border-[#D9DFE8] shadow-sm overflow-hidden ${className}`}
      aria-label="Therapeutic Categories Navigation"
    >
      {/* Sidebar Header - Authentic Cipla Style */}
      <div className="px-5 py-4 bg-[#F8FAFC] border-b border-[#D9DFE8] flex items-center justify-between">
        <div className="flex items-center gap-2.5">
          <div className="w-2.5 h-2.5 rounded-full bg-[#0B4A8F]" />
          <h2 className="font-heading font-bold text-base text-[#1E2428] tracking-tight">
            Our Therapies
          </h2>
        </div>
        <span className="text-[11px] font-sans font-semibold text-[#0B4A8F] bg-[#E8F1F9] px-2 py-0.5 rounded-full">
          {THERAPY_CATEGORIES.length} Domains
        </span>
      </div>

      {/* Therapy Categories List */}
      <div className="divide-y divide-[#EAEFF5] text-sm">
        {THERAPY_CATEGORIES.map((cat) => {
          const isCategoryActive =
            activeSlug === cat.slug ||
            pathname === `/our-offerings/${cat.slug}` ||
            (activeProduct && activeProduct.categorySlug === cat.slug);
          const isCategoryExpanded = expanded[cat.slug] ?? true;

          return (
            <div key={cat.slug} className="group">
              {/* Category Header Row */}
              <div
                className={`flex items-center justify-between px-4 py-3 cursor-pointer transition-colors ${
                  isCategoryActive
                    ? 'bg-[#E8F1F9]/60 text-[#0B4A8F] font-semibold border-l-4 border-l-[#0B4A8F]'
                    : 'text-[#1E2428] hover:bg-[#F8FAFC] border-l-4 border-l-transparent'
                }`}
                onClick={() => {
                  if (onSelectCategory) {
                    onSelectCategory(cat.slug);
                  }
                }}
              >
                <Link
                  href={`/our-offerings/${cat.slug}`}
                  className="flex items-center gap-2 flex-1 min-w-0 pr-2"
                  onClick={(e) => {
                    if (onSelectCategory && pathname === '/our-offerings') {
                      e.preventDefault();
                      onSelectCategory(cat.slug);
                    }
                  }}
                >
                  <span className="text-xs text-[#0B4A8F]/70 font-mono select-none">
                    {isCategoryExpanded ? '−' : '+'}
                  </span>
                  <span className="truncate text-[13.5px] leading-snug">
                    {cat.shortName}
                  </span>
                </Link>

                <div className="flex items-center gap-1.5 shrink-0">
                  <span className="text-[10.5px] font-mono text-[#1E2428]/45 bg-[#EAEFF5] px-1.5 py-0.5 rounded">
                    {cat.productIds.length}
                  </span>
                  <button
                    type="button"
                    onClick={(e) => toggleExpand(cat.slug, e)}
                    className="p-1 text-[#1E2428]/40 hover:text-[#0B4A8F] transition-colors rounded"
                    aria-label={isCategoryExpanded ? 'Collapse sub-therapies' : 'Expand sub-therapies'}
                  >
                    {isCategoryExpanded ? (
                      <ChevronDown size={14} />
                    ) : (
                      <ChevronRight size={14} />
                    )}
                  </button>
                </div>
              </div>

              {/* Sub-therapies: Each product is a direct clickable link to its individual product page! */}
              {isCategoryExpanded && (
                <div className="bg-[#FAFBFD] px-3 py-2 border-t border-[#F0F4F8] space-y-1">
                  {cat.productIds.map((pId) => {
                    const prod = getProductById(pId);
                    if (!prod) return null;
                    const isProdActive = activeProductId === prod.id || pathname === `/products/${prod.id}`;

                    return (
                      <Link
                        key={prod.id}
                        href={`/products/${prod.id}`}
                        className={`flex items-center justify-between px-3 py-1.5 rounded-lg text-xs transition-all ${
                          isProdActive
                            ? 'bg-[#0B4A8F] text-white font-semibold shadow-xs'
                            : 'text-[#1E2428]/75 hover:bg-white hover:text-[#0B4A8F] hover:shadow-2xs'
                        }`}
                      >
                        <div className="flex items-center gap-2 truncate">
                          <span
                            className={`w-1.5 h-1.5 rounded-full shrink-0 ${
                              isProdActive ? 'bg-white' : 'bg-[#0B4A8F]'
                            }`}
                          />
                          <span className="truncate font-medium">{prod.name}</span>
                        </div>
                        <span
                          className={`text-[10px] font-mono shrink-0 ${
                            isProdActive ? 'text-white/80' : 'text-[#1E2428]/45'
                          }`}
                        >
                          {prod.volume}
                        </span>
                      </Link>
                    );
                  })}

                  <div className="pt-2 pb-1 px-1">
                    <Link
                      href={`/our-offerings/${cat.slug}`}
                      className="inline-flex items-center gap-1 text-[11px] font-semibold text-[#0B4A8F] hover:text-[#D7262E] transition-colors"
                    >
                      <span>Explore all {cat.shortName} &rarr;</span>
                    </Link>
                  </div>
                </div>
              )}
            </div>
          );
        })}
      </div>
    </aside>
  );
}
