import { Suspense } from 'react';
import { notFound } from 'next/navigation';
import type { Metadata } from 'next';
import { Navbar } from '@/components/layout/navbar';
import { Footer } from '@/components/layout/footer';
import { JsonLd } from '@/components/seo/json-ld';
import { PageLoader } from '@/components/ui/states';
import { getCatalogue } from '@/lib/sanity';
import { breadcrumbLd, pageMetadata } from '@/lib/seo';
import { InnovationProductClient } from './innovation-product-client';

async function findInnovationProduct(slug: string) {
  const { innovation } = await getCatalogue();
  return innovation.find((p) => p.id === slug) ?? null;
}

// One page per published innovation product (also where its pack QR code lands).
export async function generateStaticParams() {
  const { innovation } = await getCatalogue();
  return innovation.map((p) => ({ slug: p.id }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const product = await findInnovationProduct((await params).slug);
  if (!product) return { title: 'Product not found', robots: { index: false } };
  const name = [product.name, product.accent].filter(Boolean).join(' ');
  return pageMetadata({
    title: `${name} — ${product.tagline || product.category}`,
    description: product.description || `${name} from Revora Healthcare: ${product.pack}.`,
    path: `/innovation/${product.id}`,
    keywords: [name, `Revora ${name}`, product.category, ...product.uses.map((u) => `${name} for ${u.label.toLowerCase()}`)],
    image: { url: product.image, alt: product.imageAlt },
  });
}

async function ProductDetails({ params }: { params: Promise<{ slug: string }> }) {
  const product = await findInnovationProduct((await params).slug);
  if (!product) notFound();
  const name = [product.name, product.accent].filter(Boolean).join(' ');
  return (
    <>
      <JsonLd data={breadcrumbLd([['Home', '/'], ['Innovation', '/innovation'], [name, `/innovation/${product.id}`]])} />
      <InnovationProductClient product={product} />
    </>
  );
}

export default function InnovationProductPage({ params }: { params: Promise<{ slug: string }> }) {
  return (
    <div className="flex min-h-screen flex-col bg-[#F6F9FC]">
      <Navbar />
      <main id="main" tabIndex={-1} className="flex-1">
        <Suspense fallback={<PageLoader label="Loading product…" />}>
          <ProductDetails params={params} />
        </Suspense>
      </main>
      <Footer />
    </div>
  );
}
