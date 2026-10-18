'use client';

import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { motion, useReducedMotion } from 'framer-motion';
import { ArrowDown, ArrowUpRight, ChevronRight } from 'lucide-react';
import { expoOut } from '@/lib/easings';
import { TherapyCategory, Product, THERAPY_CATEGORIES } from '@/lib/therapies-data';
import { AnchorLink, Eyebrow, FadeUp, Magnetic, SplitWords } from '@/components/ui/primitives';
import { ProductCard } from '@/components/offerings/product-card';
import { CategoryCard } from '@/components/offerings/category-card';
import { FormularyBanner } from '@/components/offerings/formulary-banner';
import { FormularyModal } from '@/components/offerings/formulary-modal';

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
      <section className="relative isolate overflow-hidden px-5 pb-20 pt-36 tablet:px-8 tablet:pb-28 tablet:pt-44">
        <div
          aria-hidden
          className="absolute -right-32 -top-32 -z-10 h-[560px] w-[560px] rounded-full opacity-[0.12] blur-3xl"
          style={{ background: category.color }}
        />
        <div aria-hidden className="absolute -left-40 bottom-0 -z-10 h-[420px] w-[420px] rounded-full bg-revora-sky blur-3xl" />

        <div className="mx-auto max-w-330">
          <nav aria-label="Breadcrumb" className="flex flex-wrap items-center gap-2 font-sans text-[13px] text-revora-slate-muted">
            <Link href="/" className="transition-colors hover:text-revora-cobalt">Home</Link>
            <ChevronRight className="h-3.5 w-3.5" />
            <Link href="/our-offerings" className="transition-colors hover:text-revora-cobalt">Our Offerings</Link>
            <ChevronRight className="h-3.5 w-3.5" />
            <span className="font-semibold text-revora-cobalt">{category.shortName}</span>
          </nav>

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
                <Magnetic>
                  <AnchorLink
                    href="#products"
                    className="group inline-flex items-center gap-3 rounded-full bg-revora-cobalt py-3.5 pl-7 pr-3.5 font-sans text-[15px] font-semibold text-white shadow-[0_18px_40px_-14px_rgba(11,74,143,0.7)]"
                  >
                    View {products.length} {products.length === 1 ? 'product' : 'products'}
                    <span className="grid h-8 w-8 place-items-center rounded-full bg-white/15 transition-transform duration-500 group-hover:translate-y-0.5">
                      <ArrowDown className="h-4 w-4" />
                    </span>
                  </AnchorLink>
                </Magnetic>
                <button
                  type="button"
                  onClick={() => openSample()}
                  className="rounded-full border border-revora-cobalt/25 px-6 py-3.5 font-sans text-[15px] font-semibold text-revora-cobalt transition-colors hover:bg-revora-sky"
                >
                  Request samples
                </button>
              </FadeUp>
            </div>

            {/* fanned product stack */}
            <div className="relative mx-auto h-[340px] w-full max-w-[520px] tablet:h-[420px]">
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
                    className="absolute left-1/2 top-0 w-[58%] -translate-x-1/2"
                    style={{ zIndex: o === 0 ? 3 : 2 - i }}
                  >
                    <Link
                      href={`/products/${p.id}`}
                      className="block overflow-hidden rounded-[24px] border-4 border-white bg-white shadow-[0_30px_60px_-24px_rgba(11,74,143,0.5)]"
                    >
                      <div className="relative aspect-[4/5]">
                        <Image src={p.image} alt={`${p.name} carton`} fill sizes="300px" className="object-cover" priority={i === 0} />
                      </div>
                      <span className="block px-4 py-3 font-heading text-[15px] font-extrabold text-revora-slate">{p.name}</span>
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
          <div className="desktop:sticky desktop:top-36 desktop:self-start">
            <Eyebrow>Clinical rationale</Eyebrow>
            <h2 className="mt-5 font-heading text-[clamp(2rem,4vw,3.2rem)] font-extrabold leading-[1.04] tracking-[-0.02em] text-revora-slate">
              <SplitWords text="Why this therapy area matters." highlight={{ matters: 'text-revora-cobalt' }} />
            </h2>
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
      <section id="products" className="scroll-mt-28 px-5 py-24 tablet:px-8 tablet:py-32">
        <div className="mx-auto max-w-330">
          <div className="flex flex-col gap-4 desktop:flex-row desktop:items-end desktop:justify-between">
            <div>
              <Eyebrow>The formulations</Eyebrow>
              <h2 className="mt-5 font-heading text-[clamp(2rem,4.4vw,3.6rem)] font-extrabold leading-[1.02] tracking-[-0.02em] text-revora-slate">
                <SplitWords text={`${category.shortName} portfolio.`} />
              </h2>
            </div>
            <p className="font-sans text-[14px] text-revora-slate-muted">
              {products.length} {products.length === 1 ? 'formulation' : 'formulations'} · open any product for its full monograph
            </p>
          </div>
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
