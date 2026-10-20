'use client';

import { useMemo, useState } from 'react';
import { AnimatePresence, LayoutGroup, motion, useReducedMotion } from 'framer-motion';
import { Search, X } from 'lucide-react';
import { expoOut } from '@/lib/easings';
import { Product, TherapyCategory } from '@/lib/therapies-data';
import { FadeUp } from '@/components/ui/primitives';
import { Breadcrumb } from '@/components/ui/breadcrumb';
import { SectionHeading } from '@/components/ui/section-heading';
import { ProductCard } from '@/components/offerings/product-card';
import { CategoryCard } from '@/components/offerings/category-card';
import { FormularyBanner } from '@/components/offerings/formulary-banner';
import { FormularyModal } from '@/components/offerings/formulary-modal';

interface OfferingsClientProps {
  initialProducts: Product[];
  initialCategories: TherapyCategory[];
}

export function OfferingsClient({ initialProducts, initialCategories }: OfferingsClientProps) {
  const reduce = useReducedMotion();
  const [filter, setFilter] = useState('all');
  const [query, setQuery] = useState('');
  const [modalOpen, setModalOpen] = useState(false);
  const [selected, setSelected] = useState<Product | null>(null);

  const FILTERS = [
    { slug: 'all', label: 'All products' },
    ...initialCategories.map((c) => ({ slug: c.slug, label: c.shortName })),
  ];

  const STATS = [
    { value: initialProducts.length, label: 'Ophthalmic brands' },
    { value: initialCategories.length, label: 'Therapy areas' },
    { value: 1, label: 'Dedicated eye-drop plant' },
  ];

  const results = useMemo(() => {
    const q = query.trim().toLowerCase();
    return initialProducts.filter(
      (p) =>
        (filter === 'all' || p.categorySlug === filter) &&
        (!q || [p.name, p.genericName, p.badge, ...p.indications].some((s) => s.toLowerCase().includes(q)))
    );
  }, [filter, query, initialProducts]);

  const openSample = (p?: Product) => {
    setSelected(p ?? null);
    setModalOpen(true);
  };

  return (
    <>
      {/* ── hero ── */}
      <section className="relative isolate overflow-hidden px-5 pb-16 pt-36 tablet:px-8 tablet:pb-24 tablet:pt-44 desktop:pt-52">
        <div aria-hidden className="absolute -left-40 top-10 -z-10 h-[480px] w-[480px] rounded-full bg-revora-sky blur-3xl" />
        <div aria-hidden className="absolute -right-24 top-40 -z-10 h-[380px] w-[380px] rounded-full bg-revora-cobalt-light/10 blur-3xl" />
        <div className="mx-auto max-w-330">
          <Breadcrumb items={[{ label: 'Home', href: '/' }, { label: 'Our Offerings' }]} />
          <div className="mt-8 grid grid-cols-[minmax(0,1fr)] gap-10 desktop:grid-cols-[1.2fr_0.8fr] desktop:items-end">
            <div>
              <SectionHeading level="page" eyebrow="Ophthalmic portfolio" lines={['Nine brands.', 'Built for the eye.']} highlight={{ 'eye.': 'text-revora-cobalt' }} />
              <FadeUp delay={0.5}>
                <p className="mt-7 max-w-xl font-sans text-[17px] leading-[1.7] text-revora-slate-light">
                  From first prescription to surgical recovery and long-term care — explore every Revora formulation, its composition and its
                  clinical use.
                </p>
              </FadeUp>
            </div>
            <FadeUp delay={0.6}>
              <dl className="grid grid-cols-3 gap-4 border-t border-revora-cobalt/10 pt-6">
                {STATS.map((s) => (
                  <div key={s.label}>
                    <dd className="font-heading text-4xl font-extrabold tracking-tight text-revora-cobalt tablet:text-5xl">{s.value}</dd>
                    <dt className="mt-1 font-sans text-[13px] font-medium leading-snug text-revora-slate-light">{s.label}</dt>
                  </div>
                ))}
              </dl>
            </FadeUp>
          </div>
        </div>
      </section>

      {/* ── product explorer ── */}
      <section id="products" className="scroll-mt-28 desktop:scroll-mt-44 px-5 pb-24 tablet:px-8 tablet:pb-32">
        <div className="mx-auto max-w-330">
          <div className="flex flex-col gap-4 desktop:flex-row desktop:items-center desktop:justify-between">
            <LayoutGroup id="filters">
              <div role="tablist" aria-label="Filter by therapy area" className="-mx-5 flex gap-1 overflow-x-auto px-5 pb-1 [scrollbar-width:none] tablet:mx-0 tablet:px-0">
                {FILTERS.map((f) => {
                  const active = filter === f.slug;
                  return (
                    <button
                      key={f.slug}
                      role="tab"
                      aria-selected={active}
                      onClick={() => setFilter(f.slug)}
                      className={`relative shrink-0 rounded-full px-5 py-2.5 font-sans text-[14px] font-semibold transition-colors duration-300 ${
                        active ? 'text-white' : 'text-revora-slate hover:text-revora-cobalt'
                      }`}
                    >
                      {active && (
                        <motion.span
                          layoutId="filter-pill"
                          className="absolute inset-0 rounded-full bg-revora-cobalt"
                          transition={{ type: 'spring', stiffness: 380, damping: 32 }}
                        />
                      )}
                      <span className="relative">{f.label}</span>
                    </button>
                  );
                })}
              </div>
            </LayoutGroup>

            <label className="relative block w-full desktop:w-80">
              <span className="sr-only">Search products</span>
              <Search className="pointer-events-none absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-revora-slate-muted" />
              <input
                type="search"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Search by brand, molecule or use…"
                className="w-full rounded-full border border-revora-cobalt/15 bg-white py-3 pl-11 pr-10 font-sans text-[14px] text-revora-slate outline-none transition-[border-color,box-shadow] placeholder:text-revora-slate-muted focus:border-revora-cobalt focus:shadow-[0_0_0_4px_rgba(11,74,143,0.12)]"
              />
              {query && (
                <button
                  type="button"
                  onClick={() => setQuery('')}
                  aria-label="Clear search"
                  className="absolute right-3 top-1/2 grid h-6 w-6 -translate-y-1/2 place-items-center rounded-full text-revora-slate-muted hover:bg-revora-sky hover:text-revora-cobalt"
                >
                  <X className="h-3.5 w-3.5" />
                </button>
              )}
            </label>
          </div>

          <p aria-live="polite" className="mt-6 font-sans text-[13px] text-revora-slate-muted">
            Showing {results.length} of {initialProducts.length} products
          </p>

          <motion.div layout={!reduce} className="mt-4 grid gap-5 tablet:grid-cols-2 desktop:grid-cols-3">
            <AnimatePresence mode="popLayout">
              {results.map((p, i) => (
                <ProductCard key={p.id} product={p} index={i} eager={i < 3} onRequestSample={openSample} />
              ))}
            </AnimatePresence>
          </motion.div>

          <AnimatePresence>
            {results.length === 0 && (
              <motion.div
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.4, ease: expoOut }}
                className="rounded-[24px] border border-dashed border-revora-cobalt/20 bg-white px-6 py-16 text-center"
              >
                <p className="font-heading text-xl font-bold text-revora-slate">No products match “{query}”.</p>
                <button
                  type="button"
                  onClick={() => { setQuery(''); setFilter('all'); }}
                  className="mt-4 font-sans text-[14px] font-semibold text-revora-cobalt hover:underline"
                >
                  Clear filters
                </button>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </section>

      {/* ── therapy areas ── */}
      <section className="bg-white px-5 py-24 tablet:px-8 tablet:py-32">
        <div className="mx-auto max-w-330">
          <SectionHeading
            eyebrow="Therapy areas"
            lines={['Four focused areas of care.']}
            highlight={{ focused: 'text-revora-cobalt' }}
            aside="Each area brings together the formulations, clinical rationale and prescribing detail an ophthalmologist needs."
          />
          <div className="mt-14 grid gap-5 tablet:grid-cols-2">
            {initialCategories.map((c, i) => (
              <CategoryCard key={c.slug} category={c} index={i} productCount={c.productIds?.length ?? 0} />
            ))}
          </div>
        </div>
      </section>

      <div className="px-5 py-24 tablet:px-8 tablet:py-32">
        <div className="mx-auto max-w-330">
          <FormularyBanner
            title="Samples, literature and institutional supply."
            description="Request product samples, prescribing literature or an institutional rate card — our team responds to doctors, hospitals, pharmacies and distributors across India."
            buttonLabel="Request samples"
            onAction={() => openSample()}
            showCredentials
          />
        </div>
      </div>

      <FormularyModal isOpen={modalOpen} onClose={() => setModalOpen(false)} product={selected} />
    </>
  );
}
