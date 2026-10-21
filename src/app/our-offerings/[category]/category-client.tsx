'use client';

import { useState } from 'react';
import { ProductLogo } from '@/components/offerings/product-logo';
import Link from 'next/link';
import { motion, useReducedMotion } from 'framer-motion';
import { ArrowUpRight } from 'lucide-react';
import { expoOut } from '@/lib/easings';
import { TherapyCategory, Product, THERAPY_CATEGORIES } from '@/lib/therapies-data';
import { FadeUp, SplitWords } from '@/components/ui/primitives';
import { Breadcrumb } from '@/components/ui/breadcrumb';
import { SectionHeading } from '@/components/ui/section-heading';
import { Button } from '@/components/ui/button';
import { ProductCard } from '@/components/offerings/product-card';
import { CategoryCard } from '@/components/offerings/category-card';
import { FormularyBanner } from '@/components/offerings/formulary-banner';
import { LazyFormularyModal as FormularyModal } from '@/components/offerings/lazy-formulary-modal';

interface CategoryClientProps {
  category: TherapyCategory;
  products: Product[];
}

export function CategoryClient({ category, products }: CategoryClientProps) {
  const reduce = useReducedMotion();
  const [modalOpen, setModalOpen] = useState(false);
  const [selected, setSelected] = useState<Product | null>(null);
  const others = THERAPY_CATEGORIES.filter((c) => c.slug !== category.slug);
  const index = THERAPY_CATEGORIES.findIndex((c) => c.slug === category.slug);
  const stack = products.slice(0, 3);

  const openSample = (p?: Product) => {
    setSelected(p ?? null);
    setModalOpen(true);
  };

  return (
    <>
      {/* ── hero ── */}
      <section className="relative isolate overflow-hidden px-5 pb-20 pt-36 tablet:px-8 tablet:pb-28 tablet:pt-44 desktop:pt-52">
        <div
          aria-hidden
          className="absolute -right-32 -top-32 -z-10 h-[560px] w-[560px] rounded-full opacity-[0.12] blur-3xl"
          style={{ background: category.color }}
        />
        <div aria-hidden className="absolute -left-40 bottom-0 -z-10 h-[420px] w-[420px] rounded-full bg-revora-sky blur-3xl" />

        <div className="mx-auto max-w-330">
          <Breadcrumb items={[{ label: 'Home', href: '/' }, { label: 'Our Offerings', href: '/our-offerings' }, { label: category.shortName }]} />

          <div className="mt-10 grid grid-cols-[minmax(0,1fr)] items-center gap-14 desktop:grid-cols-[1.1fr_0.9fr]">
            <div>
              <motion.span
                initial={reduce ? false : { opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7, ease: expoOut }}
                className="inline-flex items-center gap-2 rounded-full px-4 py-1.5 font-sans text-[12px] font-semibold uppercase tracking-[0.14em] text-white"
                style={{ background: category.color }}
              >
                Therapy area 0{index + 1} · {category.badge}
              </motion.span>
              <h1 className="mt-6 font-heading text-[clamp(2.6rem,6vw,5rem)] font-extrabold leading-[1] tracking-[-0.03em] text-revora-slate">
                <SplitWords text={category.shortName} trigger="mount" delay={0.1} />
              </h1>
              <FadeUp delay={0.35}>
                <p className="mt-4 font-heading text-[clamp(1.1rem,1.8vw,1.4rem)] font-semibold leading-snug" style={{ color: category.color }}>
                  {category.subtitle}
                </p>
                <p className="mt-5 max-w-xl font-sans text-[16.5px] leading-[1.75] text-revora-slate-light">{category.description}</p>
              </FadeUp>
              <FadeUp delay={0.5} className="mt-9 flex flex-wrap items-center gap-3">
                <Button href="#products" arrow="down" magnetic>
                  View {products.length} {products.length === 1 ? 'product' : 'products'}
                </Button>
                <Button onClick={() => openSample()} variant="outline">Request samples</Button>
              </FadeUp>
            </div>

            {/* fanned product stack */}
            <div className="relative mx-auto h-[300px] w-full max-w-[540px] tablet:h-[380px]">
              {stack.map((p, i) => {
                const offsets = stack.length === 1 ? [0] : stack.length === 2 ? [-1, 1] : [-1, 0, 1];
                const o = offsets[i];
                return (
                  <motion.div
                    key={p.id}
                    initial={reduce ? false : { opacity: 0, y: 60, rotate: 0 }}
                    animate={{ opacity: 1, y: Math.abs(o) * 18, rotate: o * 7, x: `${o * 26}%` }}
                    transition={{ duration: 1.1, delay: 0.25 + i * 0.12, ease: expoOut }}
                    whileHover={reduce ? undefined : { y: Math.abs(o) * 18 - 14, rotate: o * 4 }}
                    className="absolute left-1/2 top-12 w-[62%] -translate-x-1/2 tablet:top-16"
                    style={{ zIndex: o === 0 ? 3 : 2 - i }}
                  >
                    <Link
                      href={`/products/${p.id}`}
                      className="block overflow-hidden rounded-[24px] border-4 border-white bg-white shadow-[0_30px_60px_-24px_rgba(11,74,143,0.5)]"
                    >
                      <ProductLogo product={p} link={false} className="aspect-[4/3]" sizes="300px" eager />
                      <span className="flex items-center justify-between border-t border-revora-cobalt/10 px-4 py-3 font-sans text-[13px] font-semibold text-revora-cobalt">
                        View product <ArrowUpRight className="h-4 w-4" />
                      </span>
                    </Link>
                  </motion.div>
                );
              })}
            </div>
          </div>
        </div>
      </section>

      {/* ── clinical rationale ── */}
      <section className="bg-white px-5 py-24 tablet:px-8 tablet:py-32">
        <div className="mx-auto grid max-w-330 grid-cols-[minmax(0,1fr)] gap-12 desktop:grid-cols-[0.8fr_1.2fr] desktop:gap-20">
          <div className="desktop:sticky desktop:top-48 desktop:self-start">
            <SectionHeading eyebrow="Clinical rationale" lines={['Why this therapy', 'area matters.']} highlight={{ 'matters.': 'text-revora-cobalt' }} />
          </div>
          <div>
            <FadeUp>
              <p className="font-heading text-[clamp(1.2rem,2vw,1.6rem)] font-semibold leading-[1.5] text-revora-slate">
                {category.clinicalRationale}
              </p>
            </FadeUp>
            <FadeUp delay={0.1}>
              <h3 className="mt-12 font-sans text-[12px] font-semibold uppercase tracking-[0.16em] text-revora-slate-muted">
                Formulations in this area
              </h3>
              <ul className="mt-4 divide-y divide-revora-cobalt/10 border-y border-revora-cobalt/10">
                {category.subTherapies.map((s, i) => (
                  <li key={s} className="flex items-baseline gap-5 py-4">
                    <span className="font-sans text-[12px] font-semibold text-revora-slate-muted">0{i + 1}</span>
                    <span className="font-sans text-[16px] font-medium text-revora-slate">{s}</span>
                  </li>
                ))}
              </ul>
            </FadeUp>
          </div>
        </div>
      </section>

      {/* ── products ── */}
      <section id="products" className="scroll-mt-28 desktop:scroll-mt-44 px-5 py-24 tablet:px-8 tablet:py-32">
        <div className="mx-auto max-w-330">
          <SectionHeading
            eyebrow="The formulations"
            lines={[`${category.shortName} portfolio.`]}
            aside={`${products.length} ${products.length === 1 ? 'formulation' : 'formulations'} · open any product for its full monograph`}
          />
          <div className="mt-12 grid gap-5 tablet:grid-cols-2 desktop:grid-cols-3">
            {products.map((p, i) => (
              <ProductCard key={p.id} product={p} index={i} detailed onRequestSample={openSample} />
            ))}
          </div>
        </div>
      </section>

      {/* ── institutional CTA ── */}
      <div className="px-5 tablet:px-8">
        <div className="mx-auto max-w-330">
          <FormularyBanner
            title={`Bring ${category.shortName} to your hospital or pharmacy.`}
            description="Request samples, prescribing literature or an institutional rate card. Our team supports eye hospitals, surgical centres and pharmacies across India."
            buttonLabel="Request rate card"
            onAction={() => openSample()}
          />
        </div>
      </div>

      {/* ── other areas ── */}
      <section className="px-5 py-24 tablet:px-8 tablet:py-32">
        <div className="mx-auto max-w-330">
          <div className="flex items-end justify-between gap-6">
            <h2 className="font-heading text-[clamp(1.8rem,3.4vw,2.6rem)] font-extrabold tracking-[-0.02em] text-revora-slate">
              Explore other therapy areas
            </h2>
            <Link
              href="/our-offerings"
              className="group hidden shrink-0 items-center gap-1.5 font-sans text-[14px] font-semibold text-revora-cobalt tablet:inline-flex"
            >
              All offerings <ArrowUpRight className="h-4 w-4 transition-transform duration-500 group-hover:rotate-45" />
            </Link>
          </div>
          <div className="mt-10 grid gap-5 tablet:grid-cols-3">
            {others.map((c) => (
              <CategoryCard
                key={c.slug}
                category={c}
                index={THERAPY_CATEGORIES.findIndex((x) => x.slug === c.slug)}
                productCount={c.productIds.length}
              />
            ))}
          </div>
        </div>
      </section>

      <FormularyModal
        isOpen={modalOpen}
        onClose={() => setModalOpen(false)}
        product={selected}
        categoryName={category.title}
      />
    </>
  );
}
