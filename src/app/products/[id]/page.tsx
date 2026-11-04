import { notFound } from 'next/navigation';
import { Metadata } from 'next';
import { Navbar } from '@/components/layout/navbar';
import { Footer } from '@/components/layout/footer';
import type { Product, TherapyCategory } from '@/lib/catalogue';
import { getCatalogue } from '@/lib/sanity';
import { ProductClient } from './product-client';
import { JsonLd } from '@/components/seo/json-ld';
import { breadcrumbLd, productLd, productMetadata } from '@/lib/seo';

/** The product and its therapy area from Sanity, or nothing if either is missing. */
async function findProduct(id: string) {
  const { products, categories } = await getCatalogue();
  const product = products.find((p) => p.id === id);
  const category = product && categories.find((c) => c.slug === product.categorySlug);
  return product && category ? { product, category } : null;
}

// The page waits for its product (cached catalogue) before rendering, on purpose: that puts the real content in
// the HTML instead of a "Loading" placeholder. So opt out of the dev-only instant-navigation check, which
// expects a placeholder shell; it changes nothing in production.
export const instant = false;

// One page per published product.
export async function generateStaticParams() {
  const { products } = await getCatalogue();
  return products.map((p) => ({ id: p.id }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ id: string }>;
}): Promise<Metadata> {
  const found = await findProduct((await params).id);
  if (!found) return { title: 'Product not found', robots: { index: false } };
  return productMetadata(found.product, found.category);
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

// The catalogue is cached, so the product is in the prerendered HTML straight away (no "Loading" fallback),
// and an unknown id answers with a real 404 rather than a "not found" page sent as 200.
export default async function ProductPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const found = await findProduct((await params).id);
  if (!found) notFound();
  return (
    <div className="min-h-screen flex flex-col bg-[#F6F9FC]">
      <Navbar />
      <main id="main" tabIndex={-1} className="flex-1">
        <ProductWithSchema product={found.product} category={found.category} />
      </main>
      <Footer />
    </div>
  );
}
