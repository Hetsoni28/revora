import { Suspense } from 'react';
import { notFound } from 'next/navigation';
import { Metadata } from 'next';
import { Navbar } from '@/components/layout/navbar';
import { Footer } from '@/components/layout/footer';
import {
  THERAPY_CATEGORIES,
  getCategoryBySlug,
  getProductsByCategory,
} from '@/lib/therapies-data';
import { CategoryClient } from './category-client';


export function generateStaticParams() {
  return THERAPY_CATEGORIES.map((cat) => ({
    category: cat.slug,
  }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ category: string }>;
}): Promise<Metadata> {
  const { category } = await params;
  const cat = getCategoryBySlug(category);

  if (!cat) {
    return {
      title: 'Therapeutic Portfolio Not Found | Revora Healthcare',
      description: 'The requested pharmaceutical therapy category could not be located.',
    };
  }

  return {
    title: `${cat.shortName} — Prescribing Monograph & Formulations | Revora Healthcare`,
    description: `${cat.title}: ${cat.subtitle}. Review complete clinical monographs, indications, compositions, and prescribing guidelines.`,
    openGraph: {
      title: `${cat.title} | Revora Healthcare`,
      description: cat.description,
    },
  };
}

async function CategoryDetails({
  params,
}: {
  params: Promise<{ category: string }>;
}) {
  const { category } = await params;
  const cat = getCategoryBySlug(category);

  if (!cat) {
    notFound();
  }

  const products = getProductsByCategory(category);

  return <CategoryClient category={cat} products={products} />;
}

export default function CategoryPage({
  params,
}: {
  params: Promise<{ category: string }>;
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
                Loading therapeutic portfolio...
              </p>
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
