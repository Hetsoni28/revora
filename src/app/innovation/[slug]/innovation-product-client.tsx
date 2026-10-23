'use client';

import type { InnovationProduct } from '@/lib/innovation-products';
import { useCatalogue } from '@/components/catalogue/catalogue-context';
import { Breadcrumb } from '@/components/ui/breadcrumb';
import { FadeUp } from '@/components/ui/primitives';
import { SectionHeading } from '@/components/ui/section-heading';
import { Button } from '@/components/ui/button';
import { ProductShowcase } from '@/components/innovation/innovation-products';
import { FaqList, InnovationProductCard } from '@/components/innovation/innovation-blocks';

/** One innovation product: the full feature block, its FAQs, and more from the same range. */
export function InnovationProductClient({ product }: { product: InnovationProduct }) {
  const { innovation } = useCatalogue();
  const name = [product.name, product.accent].filter(Boolean).join(' ');
  const others = innovation.filter((p) => p.id !== product.id);
  const sameRange = others.filter((p) => p.category === product.category);
  const more = [...sameRange, ...others.filter((p) => p.category !== product.category)].slice(0, 3);

  return (
    <>
      <section className="px-5 pb-12 pt-32 tablet:px-8 tablet:pb-16 tablet:pt-40 desktop:pt-48">
        <div className="mx-auto max-w-330">
          <Breadcrumb items={[{ label: 'Home', href: '/' }, { label: 'Innovation', href: '/innovation' }, { label: name }]} />
          <div className="mt-8">
            <ProductShowcase product={product} as="h1" />
          </div>
        </div>
      </section>

      {product.faqs.length > 0 && (
        <section className="bg-white px-5 py-20 tablet:px-8 tablet:py-28">
          <div className="mx-auto grid max-w-330 grid-cols-[minmax(0,1fr)] gap-10 tablet-lg:grid-cols-[0.8fr_1.2fr] tablet-lg:gap-16">
            <SectionHeading eyebrow="FAQs" lines={['Good to know.']} highlight={{ 'know.': 'text-revora-cobalt' }} aside={`Common questions about ${name}.`} />
            <FadeUp delay={0.1}>
              <FaqList items={product.faqs} />
            </FadeUp>
          </div>
        </section>
      )}

      {more.length > 0 && (
        <section className="px-5 py-20 tablet:px-8 tablet:py-28">
          <div className="mx-auto max-w-330">
            <SectionHeading
              eyebrow={sameRange.length ? product.category : 'Revora Innovation'}
              lines={['More from Revora.']}
              highlight={{ 'Revora.': 'text-revora-crimson' }}
              aside={<Button href="/innovation" variant="outline">All innovation products</Button>}
            />
            <div className="mt-12 grid gap-5 tablet:grid-cols-2 desktop:grid-cols-3">
              {more.map((p, i) => (
                <InnovationProductCard key={p.id} product={p} index={i} />
              ))}
            </div>
          </div>
        </section>
      )}
    </>
  );
}
