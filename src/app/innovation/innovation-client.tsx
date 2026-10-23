'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { onTabListKeyDown } from '@/lib/a11y';
import { Sparkles } from 'lucide-react';
import { useCatalogue } from '@/components/catalogue/catalogue-context';
import { FadeUp } from '@/components/ui/primitives';
import { SectionHeading } from '@/components/ui/section-heading';
import { Button } from '@/components/ui/button';
import { EmptyState } from '@/components/ui/states';
import { ProductShowcase } from '@/components/innovation/innovation-products';
import { FaqList, InnovationProductCard, NeedTiles, PromoBanner } from '@/components/innovation/innovation-blocks';


const NEEDS = [
  { label: 'Defence personnel', image: '/images/innovation/defence-snow.webp', alt: 'Soldiers in winter gear in a snowy forest', href: '/innovation/hypothermia-kit' },
  { label: 'Trekking & outdoors', image: '/images/innovation/outdoor-trek.webp', alt: 'Trekkers climbing a snowy Himalayan trail', href: '/innovation/sleeping-bag-warmer' },
  { label: 'Industrial workforce', image: '/images/innovation/industrial-snow.webp', alt: 'Workers in safety vests clearing snow', href: '/innovation/cooling-vest' },
  { label: 'Everyday comfort', image: '/images/innovation/warm-hands.webp', alt: 'Mittened hands holding a warm cup in the snow', href: '/innovation/quiqool-cool-pack' },
];

/** Innovation — a storefront-style page for Revora's products beyond the ophthalmic range. */
export function InnovationClient() {
  const products = useCatalogue().innovation;
  const FEATURED = products[0];
  // grouped by range, in catalogue order
  const CATEGORIES = [...new Set(products.map((p) => p.category))].map((category) => ({
    category,
    products: products.filter((p) => p.category === category),
  }));
  const [faqFor, setFaqFor] = useState(products[0]?.id ?? '');
  const faqProduct = products.find((p) => p.id === faqFor) ?? products[0];
  if (!FEATURED) {
    return (
      <section className="px-5 py-28 tablet:px-8">
        <EmptyState icon={Sparkles} title="Innovation products coming soon" text="Our new range is being added. Check back shortly." action={<Button href="/channel-partner">Become a partner</Button>} />
      </section>
    );
  }
  return (
    <>
      <PromoBanner product={FEATURED} />

      {/* ── shop by need ── */}
      <section className="px-5 py-20 tablet:px-8 tablet:py-28">
        <div className="mx-auto max-w-330">
          <SectionHeading eyebrow="Shop by need" lines={['Made for extremes.']} highlight={{ 'extremes.': 'text-revora-cobalt' }} aside="Comfort and wellness, through innovation." />
          <div className="mt-12">
            <NeedTiles tiles={NEEDS} />
          </div>
        </div>
      </section>

      {/* ── our products — shown once there is more than one product to browse ── */}
      {products.length > 1 && (
      <section className="bg-white px-5 py-20 tablet:px-8 tablet:py-28">
        <div className="mx-auto max-w-330">
          <SectionHeading eyebrow="Our products" lines={['New from Revora.']} highlight={{ 'Revora.': 'text-revora-crimson' }} />
          <div className="mt-12 space-y-12">
            {CATEGORIES.map(({ category, products }) => (
              <div key={category}>
                <h3 className="flex items-baseline gap-3 font-heading text-[1.4rem] font-extrabold text-revora-slate">
                  {category}
                  <span className="font-sans text-[13px] font-semibold text-revora-slate-muted">
                    {products.length} {products.length === 1 ? 'product' : 'products'}
                  </span>
                </h3>
                <div className="mt-5 grid gap-5 tablet:grid-cols-2 desktop:grid-cols-3">
                  {products.map((p) => (
                    <InnovationProductCard key={p.id} product={p} index={products.indexOf(p)} />
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
      )}

      {/* ── experience each product ── */}
      <section className="bg-white px-5 py-20 tablet:px-8 tablet:py-28">
        <div className="mx-auto max-w-330 space-y-8">
          {products.map((p, i) => (
            <div key={p.id}>
              <FadeUp>
                <p className="mb-6 font-heading text-[clamp(1.6rem,3vw,2.4rem)] font-extrabold tracking-[-0.02em] text-revora-slate">
                  Experience <span className="text-revora-cobalt">{p.name} {p.accent}</span>
                </p>
              </FadeUp>
              <ProductShowcase product={p} flip={i % 2 === 1} />
            </div>
          ))}
        </div>
      </section>

      {/* ── FAQs ── */}
      <section className="px-5 py-20 tablet:px-8 tablet:py-28">
        <div className="mx-auto grid max-w-330 grid-cols-[minmax(0,1fr)] gap-10 tablet-lg:grid-cols-[0.8fr_1.2fr] tablet-lg:gap-16">
          <SectionHeading eyebrow="FAQs" lines={['Good to know.']} highlight={{ 'know.': 'text-revora-cobalt' }} />
          <FadeUp delay={0.1}>
            <div
              role="tablist"
              aria-label="Choose a product"
              onKeyDown={(e) => onTabListKeyDown(e, products.map((p) => p.id), faqFor, setFaqFor)}
              className="-mx-5 mb-5 flex gap-2 overflow-x-auto px-5 pb-1 [scrollbar-width:none] tablet:mx-0 tablet:flex-wrap tablet:px-0">
              {products.map((p) => {
                const on = p.id === faqFor;
                return (
                  <button
                    key={p.id}
                    type="button"
                    role="tab"
                    id={`faq-tab-${p.id}`}
                    data-tab={p.id}
                    aria-selected={on}
                    aria-controls="faq-panel"
                    tabIndex={on ? 0 : -1}
                    onClick={() => setFaqFor(p.id)}
                    className={`relative shrink-0 rounded-full px-4 py-2 font-sans text-[13.5px] font-semibold transition-colors ${on ? 'text-white' : 'text-revora-slate hover:text-revora-cobalt'}`}
                  >
                    {on && <motion.span layoutId="faq-pill" className="absolute inset-0 rounded-full bg-revora-cobalt" transition={{ type: 'spring', stiffness: 380, damping: 32 }} />}
                    <span className="relative">{p.name.replace(/[®™]/g, '')} {p.accent}</span>
                  </button>
                );
              })}
            </div>
            <div id="faq-panel" role="tabpanel" aria-labelledby={`faq-tab-${faqProduct.id}`}>
              <FaqList key={faqProduct.id} items={faqProduct.faqs} />
            </div>
          </FadeUp>
        </div>
      </section>

      {/* ── distributor CTA ── */}
      <section className="px-5 py-20 tablet:px-8 tablet:py-28">
        <FadeUp className="relative isolate mx-auto flex max-w-330 flex-col gap-8 overflow-hidden rounded-[32px] bg-revora-slate p-8 text-white tablet:p-14 desktop:flex-row desktop:items-center desktop:justify-between">
          <div aria-hidden className="absolute inset-0 -z-10 bg-[radial-gradient(ellipse_at_top_right,rgba(255,122,47,0.35),transparent_60%),radial-gradient(ellipse_at_bottom_left,rgba(11,74,143,0.6),transparent_55%)]" />
          <div>
            <h2 className="font-heading text-[clamp(1.8rem,3.6vw,2.8rem)] font-extrabold leading-[1.08] tracking-[-0.02em]">Stock Revora innovation products.</h2>
            <p className="mt-2 font-sans text-[16px] text-white/70">For distributors, institutions and bulk orders across India.</p>
          </div>
          <div className="flex flex-wrap gap-3 desktop:shrink-0">
            <Button href="/channel-partner" variant="light" arrow="up-right" magnetic>Become a partner</Button>
            <Button href={`mailto:depot@revorahealthcare.com?subject=${encodeURIComponent('Bulk enquiry — innovation products')}`} variant="outline-light">Bulk enquiry</Button>
          </div>
        </FadeUp>
      </section>
    </>
  );
}
