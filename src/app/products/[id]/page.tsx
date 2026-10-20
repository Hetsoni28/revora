import { Suspense } from 'react';
import { notFound } from 'next/navigation';
import { Metadata } from 'next';
import { Navbar } from '@/components/layout/navbar';
import { Footer } from '@/components/layout/footer';
import { ALL_PRODUCTS, type Product, type TherapyCategory } from '@/lib/therapies-data';
import {
  getProductBySlug,
  getAllProductSlugs,
  getCategoryBySlug as getSanityCategoryBySlug,
  adaptProduct,
  adaptCategory,
} from '@/lib/sanity';
import { getCategoryBySlug, getProductById } from '@/lib/therapies-data';
import { ProductClient } from './product-client';

// Generate static params — try Sanity first, fall back to static data
export async function generateStaticParams() {
  try {
    const slugs = await getAllProductSlugs();
    if (slugs.length > 0) return slugs.map((id) => ({ id }));
  } catch {}
  return ALL_PRODUCTS.map((prod) => ({ id: prod.id }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ id: string }>;
}): Promise<Metadata> {
  const { id } = await params;

  // Try Sanity first
  try {
    const sanityProduct = await getProductBySlug(id);
    if (sanityProduct) {
      const product = adaptProduct(sanityProduct);
      return {
        title: `${product.name} (${product.genericName}) — Prescribing Information | Revora Healthcare`,
        description: `${product.name} (${product.volume}): ${product.summary}`,
        openGraph: {
          title: `${product.name} — Ophthalmic Formulation | Revora Healthcare`,
          description: product.summary,
          images: [{ url: product.logo.replace('.webp', '.png'), alt: `${product.name} logo` }],
        },
      };
    }
  } catch {}

  // Fall back to static data
  const product = getProductById(id);
  if (!product) return { title: 'Product Not Found | Revora Healthcare' };
  return {
    title: `${product.name} (${product.genericName}) — Prescribing Information | Revora Healthcare`,
    description: `${product.name} (${product.volume}): ${product.summary}`,
    openGraph: {
      title: `${product.name} — Ophthalmic Formulation | Revora Healthcare`,
      description: product.summary,
      images: [{ url: product.logo.replace('.webp', '.png'), alt: `${product.name} logo` }],
    },
  };
}

async function ProductDetails({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;

  // ── 1. Try Sanity (data only — rendering stays outside the try) ───────────
  let fromSanity: { product: Product; category: TherapyCategory | undefined } | null = null;
  try {
    const sanityProduct = await getProductBySlug(id);
    if (sanityProduct) {
      const product = adaptProduct(sanityProduct);
      const sanityCategory = await getSanityCategoryBySlug(product.categorySlug);
      fromSanity = { product, category: sanityCategory ? adaptCategory(sanityCategory) : getCategoryBySlug(product.categorySlug) };
    }
  } catch {
    // Sanity unavailable — fall through to static data
  }
  if (fromSanity) {
    if (!fromSanity.category) notFound();
    return <ProductClient product={fromSanity.product} category={fromSanity.category} />;
  }

  // ── 2. Fall back to static data ────────────────────────────────────────────
  const product = getProductById(id);
  if (!product) notFound();
  const category = getCategoryBySlug(product.categorySlug);
  if (!category) notFound();
  return <ProductClient product={product} category={category} />;
}

export default function ProductPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  return (
    <div className="min-h-screen flex flex-col bg-[#F6F9FC]">
      <Navbar />
      <main className="flex-1">
        <Suspense
          fallback={
            <div className="max-w-7xl mx-auto px-4 sm:px-6 pt-44 pb-20 text-center">
              <div className="inline-block w-8 h-8 border-2 border-revora-cobalt border-t-transparent rounded-full animate-spin mb-3" />
              <p className="text-xs text-revora-slate/60 font-sans">
                Loading formulation monograph…
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
