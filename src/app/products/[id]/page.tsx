import { Suspense } from 'react';
import { notFound } from 'next/navigation';
import { Metadata } from 'next';
import { Navbar } from '@/components/layout/navbar';
import { Footer } from '@/components/layout/footer';
import {
  ALL_PRODUCTS,
  getProductById,
  getCategoryBySlug,
} from '@/lib/therapies-data';
import { ProductClient } from './product-client';


export function generateStaticParams() {
  return ALL_PRODUCTS.map((prod) => ({
    id: prod.id,
  }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ id: string }>;
}): Promise<Metadata> {
  const { id } = await params;
  const product = getProductById(id);

  if (!product) {
    return {
      title: 'Product Monograph Not Found | Revora Healthcare',
      description: 'The requested pharmaceutical formulation could not be located.',
    };
  }

  return {
    title: `${product.name} (${product.genericName}) — Prescribing Information | Revora Healthcare`,
    description: `${product.name} (${product.volume}): ${product.summary}. View composition, mechanism of action, clinical indications, and hospital formulary details.`,
    openGraph: {
      title: `${product.name} — Ophthalmic Formulation | Revora Healthcare`,
      description: product.summary,
      images: [
        {
          url: product.image,
          width: 800,
          height: 800,
          alt: `${product.name} packaging carton and bottle`,
        },
      ],
    },
  };
}

async function ProductDetails({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const product = getProductById(id);

  if (!product) {
    notFound();
  }

  const category = getCategoryBySlug(product.categorySlug);

  if (!category) {
    notFound();
  }

  return <ProductClient product={product} category={category} />;
}

export default function ProductPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  return (
    <div className="min-h-screen flex flex-col bg-[#F8F9FA]">
      <Navbar />
      <main className="flex-1 pt-20 tablet:pt-28 pb-16">
        <Suspense
          fallback={
            <div className="max-w-7xl mx-auto px-4 sm:px-6 py-20 text-center">
              <div className="inline-block w-8 h-8 border-2 border-[#0B4A8F] border-t-transparent rounded-full animate-spin mb-3" />
              <p className="text-xs text-[#1E2428]/60 font-sans">
                Loading formulation monograph...
              </p>
            </div>
          }
        >
          <ProductDetails params={params} />
        </Suspense>
      </main>
      <Footer />
    </div>
  );
}
