import { Suspense } from 'react';
import { notFound } from 'next/navigation';
import { Metadata } from 'next';
import { Navbar } from '@/components/layout/navbar';
import { Footer } from '@/components/layout/footer';
import { THERAPY_CATEGORIES, getCategoryBySlug, getProductsByCategory, type Product, type TherapyCategory } from '@/lib/therapies-data';
import {
  getAllCategorySlugs,
  getCategoryBySlug as getSanityCategoryBySlug,
  getProductsByCategory as getSanityProductsByCategory,
  adaptProduct,
  adaptCategory,
} from '@/lib/sanity';
import { CategoryClient } from './category-client';

export async function generateStaticParams() {
  try {
    const slugs = await getAllCategorySlugs();
    if (slugs.length > 0) return slugs.map((category) => ({ category }));
  } catch {}
  return THERAPY_CATEGORIES.map((cat) => ({ category: cat.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ category: string }>;
}): Promise<Metadata> {
  const { category } = await params;

  try {
    const cat = await getSanityCategoryBySlug(category);
    if (cat) {
      const adapted = adaptCategory(cat);
      return {
        title: `${adapted.shortName} — Prescribing Monograph & Formulations | Revora Healthcare`,
        description: `${adapted.title}: ${adapted.subtitle}. Review complete clinical monographs, indications, and compositions.`,
        openGraph: { title: `${adapted.title} | Revora Healthcare`, description: adapted.description },
      };
    }
  } catch {}

  const cat = getCategoryBySlug(category);
  if (!cat) return { title: 'Therapeutic Portfolio Not Found | Revora Healthcare' };
  return {
    title: `${cat.shortName} — Prescribing Monograph & Formulations | Revora Healthcare`,
    description: `${cat.title}: ${cat.subtitle}. Review complete clinical monographs.`,
    openGraph: { title: `${cat.title} | Revora Healthcare`, description: cat.description },
  };
}

async function CategoryDetails({ params }: { params: Promise<{ category: string }> }) {
  const { category } = await params;

  // ── 1. Try Sanity (data only — rendering stays outside the try) ───────────
  let fromSanity: { cat: TherapyCategory; products: Product[] } | null = null;
  try {
    const sanityCategory = await getSanityCategoryBySlug(category);
    if (sanityCategory) {
      const sanityProducts = await getSanityProductsByCategory(category);
      fromSanity = { cat: adaptCategory(sanityCategory), products: sanityProducts.map(adaptProduct) };
    }
  } catch {
    // Sanity unavailable — fall through to static data
  }
  if (fromSanity) return <CategoryClient category={fromSanity.cat} products={fromSanity.products} />;

  // ── 2. Fall back to static data ────────────────────────────────────────────
  const cat = getCategoryBySlug(category);
  if (!cat) notFound();
  const products = getProductsByCategory(category);
  return <CategoryClient category={cat} products={products} />;
}

export default function CategoryPage({ params }: { params: Promise<{ category: string }> }) {
  return (
    <div className="min-h-screen flex flex-col bg-[#F6F9FC]">
      <Navbar />
      <main className="flex-1">
        <Suspense
          fallback={
            <div className="max-w-7xl mx-auto px-4 sm:px-6 pt-44 pb-20 text-center">
              <div className="inline-block w-8 h-8 border-2 border-revora-cobalt border-t-transparent rounded-full animate-spin mb-3" />
              <p className="text-xs text-revora-slate/60 font-sans">Loading therapeutic portfolio…</p>
            </div>
          }
        >
          <CategoryDetails params={params} />
        </Suspense>
      </main>
      <Footer />
    </div>
  );
}
