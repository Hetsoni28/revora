import type { Metadata } from 'next';
import { Navbar } from '@/components/layout/navbar';
import { Footer } from '@/components/layout/footer';
import { ALL_PRODUCTS, THERAPY_CATEGORIES } from '@/lib/therapies-data';
import { getAllProducts, getAllCategories, adaptProduct, adaptCategory } from '@/lib/sanity';
import { OfferingsClient } from './offerings-client';

export const instant = false;

export const metadata: Metadata = {
  title: 'Our Offerings — Ophthalmic Portfolio | Revora Healthcare',
  description:
    "Explore Revora Healthcare's ophthalmic portfolio: nine brands across anti-infectives, dry eye & lubricants, ophthalmic NSAIDs and retinal nutrition.",
};

export default async function OurOfferingsPage() {
  let products = ALL_PRODUCTS;
  let categories = THERAPY_CATEGORIES;

  try {
    const [sanityProducts, sanityCategories] = await Promise.all([
      getAllProducts(),
      getAllCategories(),
    ]);
    if (sanityProducts.length > 0) products = sanityProducts.map(adaptProduct);
    if (sanityCategories.length > 0) categories = sanityCategories.map(adaptCategory);
  } catch (_) {
    // Sanity unavailable — keep static fallback
  }

  return (
    <div className="flex min-h-screen flex-col bg-[#F6F9FC]">
      <Navbar />
      <main className="flex-1">
        <OfferingsClient initialProducts={products} initialCategories={categories} />
      </main>
      <Footer />
    </div>
  );
}
