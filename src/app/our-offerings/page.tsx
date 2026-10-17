'use client';

import { useState } from 'react';
import Link from 'next/link';
import {
  ChevronRight,
  ShieldCheck,
  Eye,
  FlaskConical,
  Sparkles,
  Stethoscope,
} from 'lucide-react';
import { Navbar } from '@/components/layout/navbar';
import { Footer } from '@/components/layout/footer';
import { FormularyModal } from '@/components/offerings/formulary-modal';
import { ProductCard } from '@/components/offerings/product-card';
import { CategoryCard } from '@/components/offerings/category-card';
import { FormularyBanner } from '@/components/offerings/formulary-banner';
import {
  THERAPY_CATEGORIES,
  ALL_PRODUCTS,
  Product,
} from '@/lib/therapies-data';

const CATEGORY_ICONS = [ShieldCheck, Eye, FlaskConical, Sparkles];
const FEATURED_IDS = ['moxora-d', 'trehynate', 'revonac-cs', 'revopt-tablets'];

export default function OurOfferingsPage() {
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);

  const featuredProducts = ALL_PRODUCTS.filter((p) =>
    FEATURED_IDS.includes(p.id)
  );

  const handleOpenSample = (prod?: Product) => {
    setSelectedProduct(prod || null);
    setModalOpen(true);
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#F8FAFC]">
      <Navbar />

      <main className="flex-1 pt-24 tablet:pt-28 pb-20">
        {/* Header Hero */}
        <section className="bg-white border-b border-[#EAEFF5] py-12 tablet:py-16 px-4 sm:px-6 relative overflow-hidden">
          <div className="max-w-7xl mx-auto relative z-10">
            <nav aria-label="Breadcrumb" className="flex items-center gap-2 text-xs text-[#1E2428]/60 mb-4">
              <Link href="/" className="hover:text-[#0B4A8F] transition-colors">Home</Link>
              <ChevronRight size={12} className="text-[#1E2428]/40" />
              <span className="text-[#0B4A8F] font-semibold">Our Offerings</span>
            </nav>

            <div className="max-w-3xl">
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold uppercase tracking-wider bg-[#E8F1F9] text-[#0B4A8F] mb-3">
                <Stethoscope size={13} />
                <span>Ophthalmic Speciality Therapeutics</span>
              </span>
              <h1 className="font-heading font-bold text-3xl sm:text-5xl text-[#1E2428] tracking-tight leading-tight">
                What We Serve
              </h1>
              <p className="font-sans text-sm sm:text-base text-[#1E2428]/75 mt-3 leading-relaxed">
                Precision-engineered ophthalmic pharmaceuticals formulated to physiological standards. From broad-spectrum anti-infectives to advanced tear lubricants, explore our portfolio below.
              </p>
            </div>
          </div>
        </section>

        {/* Section 1: Categories Grid */}
        <section className="max-w-7xl mx-auto px-4 sm:px-6 py-12 tablet:py-16">
          <div className="mb-8">
            <span className="text-xs font-semibold uppercase tracking-wider text-[#D7262E]">
              Core Healthcare Segments
            </span>
            <h2 className="font-heading font-bold text-2xl sm:text-3xl text-[#1E2428] mt-1">
              Therapeutic Categories
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 tablet:gap-8">
            {THERAPY_CATEGORIES.map((cat, idx) => (
              <CategoryCard
                key={cat.slug}
                category={cat}
                icon={CATEGORY_ICONS[idx % CATEGORY_ICONS.length]}
              />
            ))}
          </div>
        </section>

        {/* Section 2: Featured Formulations */}
        <section className="bg-white border-y border-[#EAEFF5] py-12 tablet:py-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6">
            <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-8">
              <div>
                <span className="text-xs font-semibold uppercase tracking-wider text-[#0B4A8F]">
                  Flagship Formulations
                </span>
                <h2 className="font-heading font-bold text-2xl sm:text-3xl text-[#1E2428] mt-1">
                  Featured Products
                </h2>
              </div>
              <p className="text-xs text-[#1E2428]/60">
                Click any product to inspect its complete prescribing monograph.
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {featuredProducts.map((prod) => (
                <ProductCard
                  key={prod.id}
                  product={prod}
                  onRequestSample={handleOpenSample}
                />
              ))}
            </div>
          </div>
        </section>

        {/* Section 3: Hospital Supply Banner */}
        <section className="max-w-7xl mx-auto px-4 sm:px-6 py-12 tablet:py-16">
          <FormularyBanner
            title="Manufactured to the Highest Global Standards"
            description="Every batch of Revora ophthalmic solution is synthesized in aseptic ISO Class 5 cleanrooms with automated Blow-Fill-Seal (BFS) technology, ensuring verified sterility assurance (SAL 10⁻⁶)."
            buttonLabel="Contact Hospital Supply"
            onAction={() => handleOpenSample()}
            showCredentials
          />
        </section>
      </main>

      <Footer />

      <FormularyModal
        isOpen={modalOpen}
        onClose={() => setModalOpen(false)}
        product={selectedProduct}
      />
    </div>
  );
}
