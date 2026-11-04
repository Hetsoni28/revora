import { notFound } from 'next/navigation';
import type { Metadata } from 'next';
import { Navbar } from '@/components/layout/navbar';
import { Footer } from '@/components/layout/footer';
import { JsonLd } from '@/components/seo/json-ld';
import { getCatalogue } from '@/lib/sanity';
import { breadcrumbLd, faqLd, innovationLd, innovationMetadata, innovationName } from '@/lib/seo';
import { InnovationProductClient } from './innovation-product-client';

async function findInnovationProduct(slug: string) {
  const { innovation } = await getCatalogue();
  return innovation.find((p) => p.id === slug) ?? null;
}

// The page waits for its product (cached catalogue) before rendering, on purpose: that puts the real content in
// the HTML instead of a "Loading" placeholder. So opt out of the dev-only instant-navigation check, which
// expects a placeholder shell; it changes nothing in production.
export const instant = false;

// One page per published innovation product (also where its pack QR code lands).
export async function generateStaticParams() {
  const { innovation } = await getCatalogue();
  return innovation.map((p) => ({ slug: p.id }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const product = await findInnovationProduct((await params).slug);
  if (!product) return { title: 'Product not found', robots: { index: false } };
  return innovationMetadata(product);
}

/** Page body plus its structured data (product, breadcrumb trail, FAQs). */
function ProductDetails({ product }: { product: NonNullable<Awaited<ReturnType<typeof findInnovationProduct>>> }) {
  const name = innovationName(product);
  return (
    <>
      <JsonLd
        data={[
          innovationLd(product),
          breadcrumbLd([['Home', '/'], ['Innovation', '/innovation'], [name, `/innovation/${product.id}`]]),
          ...(product.faqs.length ? [faqLd(product.faqs)] : []),
        ]}
      />
      <InnovationProductClient product={product} />
    </>
  );
}

// The catalogue is cached, so the product is in the prerendered HTML straight away (no "Loading" fallback),
// and an unknown slug answers with a real 404.
export default async function InnovationProductPage({ params }: { params: Promise<{ slug: string }> }) {
  const product = await findInnovationProduct((await params).slug);
  if (!product) notFound();
  return (
    <div className="flex min-h-screen flex-col bg-[#F6F9FC]">
      <Navbar />
      <main id="main" tabIndex={-1} className="flex-1">
        <ProductDetails product={product} />
      </main>
      <Footer />
    </div>
  );
}
