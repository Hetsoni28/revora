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
import { JsonLd } from '@/components/seo/json-ld';
import { PageLoader } from '@/components/ui/states';
import { breadcrumbLd, productLd, productMetadata } from '@/lib/seo';

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
      return productMetadata(product, getCategoryBySlug(product.categorySlug));
    }
  } catch {}

  // Fall back to static data
  const product = getProductById(id);
  if (!product) return { title: 'Product not found', robots: { index: false } };
  return productMetadata(product, getCategoryBySlug(product.categorySlug));
}

/** Product page body plus its structured data (medicine + breadcrumb trail). */
function ProductWithSchema({ product, category }: { product: Product; category: TherapyCategory }) {
  return (
    <>
      <JsonLd
        data={[
          productLd(product, category),
          breadcrumbLd([
            ['Home', '/'],
            ['Portfolio', '/profile'],
            [product.name, `/products/${product.id}`],
          ]),
        ]}
      />
      <ProductClient product={product} category={category} />
    </>
  );
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
    return <ProductWithSchema product={fromSanity.product} category={fromSanity.category} />;
  }

  // ── 2. Fall back to static data ────────────────────────────────────────────
  const product = getProductById(id);
  if (!product) notFound();
  const category = getCategoryBySlug(product.categorySlug);
  if (!category) notFound();
  return <ProductWithSchema product={product} category={category} />;
}

export default function ProductPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  return (
    <div className="min-h-screen flex flex-col bg-[#F6F9FC]">
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
