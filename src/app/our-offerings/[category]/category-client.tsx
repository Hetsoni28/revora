'use client';

import { useState } from 'react';
import Link from 'next/link';
import {
  ChevronRight,
  FlaskConical,
  Building2,
} from 'lucide-react';
import { toast } from 'sonner';
import { FormularyModal } from '@/components/offerings/formulary-modal';
import { ProductCard } from '@/components/offerings/product-card';
import { FormularyBanner } from '@/components/offerings/formulary-banner';
import { TherapyCategory, Product, THERAPY_CATEGORIES } from '@/lib/therapies-data';

interface CategoryClientProps {
  category: TherapyCategory;
  products: Product[];
}

export function CategoryClient({ category, products }: CategoryClientProps) {
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);

  const handleOpenModal = (prod?: Product) => {
    setSelectedProduct(prod || null);
    setModalOpen(true);
  };

  const handleDownloadDossier = (prod: Product) => {
    toast.success('Clinical Dossier Requested', {
      description: `Prescribing monograph for ${prod.name} (${prod.genericName}) is preparing for download.`,
    });
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 py-8 tablet:py-12">
      {/* Breadcrumb Navigation */}
      <nav aria-label="Breadcrumb" className="mb-6 flex items-center gap-2 text-xs font-sans text-[#1E2428]/60">
        <Link href="/" className="hover:text-[#0B4A8F] transition-colors">Home</Link>
        <ChevronRight size={12} className="text-[#1E2428]/40" />
        <Link href="/our-offerings" className="hover:text-[#0B4A8F] transition-colors">Our Offerings</Link>
        <ChevronRight size={12} className="text-[#1E2428]/40" />
        <span className="font-semibold text-[#0B4A8F]">{category.shortName}</span>
      </nav>

      {/* Clean Category Header */}
      <div className="bg-white rounded-2xl border border-[#D9DFE8] p-6 tablet:p-10 mb-8 shadow-xs relative overflow-hidden">
        <div
          className="absolute top-0 left-0 right-0 h-1.5"
          style={{ background: `linear-gradient(90deg, ${category.color}, #D7262E)` }}
        />
        <div className="flex flex-col md:flex-row md:items-start justify-between gap-6">
          <div className="max-w-3xl">
            <div className="flex items-center gap-2 mb-2.5">
              <span
                className="text-[10.5px] font-semibold uppercase tracking-wider px-2.5 py-0.5 rounded text-white"
                style={{ backgroundColor: category.color }}
              >
                {category.badge}
              </span>
              <span className="text-xs font-mono text-[#1E2428]/60">
                {products.length} Formulations
              </span>
              <span className="text-xs text-[#1E2428]/30">·</span>
              <span className="text-xs text-[#008B74] font-medium">WHO-GMP / ISO Class 5</span>
            </div>

            <h1 className="font-heading font-bold text-2xl sm:text-4xl text-[#1E2428] tracking-tight">
              {category.title}
            </h1>

            <p className="font-sans text-xs sm:text-sm font-semibold text-[#0B4A8F] mt-1.5">
              {category.subtitle}
            </p>

            <p className="font-sans text-xs sm:text-sm text-[#1E2428]/75 mt-3 leading-relaxed">
              {category.description}
            </p>
          </div>

          <button
            onClick={() => handleOpenModal()}
            className="shrink-0 px-5 py-3 rounded-xl bg-[#0B4A8F] hover:bg-[#08356A] text-white text-xs font-semibold transition-colors flex items-center gap-2 shadow-xs"
          >
            <Building2 size={15} />
            <span>Request Hospital Samples</span>
          </button>
        </div>
      </div>

      {/* Main Content Space */}
      <div className="space-y-10">
        {/* Scientific & Pharmacological Rationale */}
        <div className="bg-white rounded-2xl border border-[#D9DFE8] p-6 tablet:p-8 shadow-xs">
          <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-[#0B4A8F] mb-2">
            <FlaskConical size={15} />
            <span>Scientific &amp; Pharmacological Rationale</span>
          </div>
          <h3 className="font-heading font-bold text-lg sm:text-xl text-[#1E2428] mb-2">
            Pathophysiology &amp; Therapeutic Strategy
          </h3>
          <p className="font-sans text-xs tablet:text-sm text-[#1E2428]/80 leading-relaxed max-w-4xl">
            {category.clinicalRationale}
          </p>
        </div>

        {/* Product Cards Grid */}
        <div className="space-y-6">
          <div className="flex items-center justify-between border-b border-[#D9DFE8] pb-3">
            <div>
              <span className="font-sans text-xs uppercase tracking-wider font-semibold text-[#D7262E]">
                Prescribing Formulations
              </span>
              <h2 className="font-heading font-bold text-xl tablet:text-2xl text-[#1E2428]">
                Products in {category.shortName}
              </h2>
            </div>
            <span className="text-xs font-mono text-[#1E2428]/60">
              Showing all {products.length} commercial packs
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {products.map((prod) => (
              <ProductCard
                key={prod.id}
                product={prod}
                variant="detailed"
                onRequestSample={handleOpenModal}
                onDownloadDossier={handleDownloadDossier}
              />
            ))}
          </div>
        </div>

        {/* Hospital Supply Banner */}
        <FormularyBanner
          title="Supplying Eye Hospitals & Surgical Centers Across India"
          description="Revora Healthcare offers direct institutional rate contracts, consistent batch delivery, and comprehensive analytical documentation for hospital drug formularies."
          buttonLabel="Request Institutional Rate Card"
          onAction={() => handleOpenModal()}
        />

        {/* Cross-Therapy Navigation */}
        <div className="pt-6 border-t border-[#D9DFE8]">
          <h4 className="font-heading font-semibold text-sm text-[#1E2428] mb-4">
            Explore Other Therapeutic Portfolios:
          </h4>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            {THERAPY_CATEGORIES.filter((c) => c.slug !== category.slug).map((other) => (
              <Link
                key={other.slug}
                href={`/our-offerings/${other.slug}`}
                className="p-5 rounded-2xl bg-white border border-[#D9DFE8] hover:border-[#0B4A8F] hover:shadow-md transition-all group"
              >
                <span
                  className="text-[10px] font-semibold uppercase tracking-wider px-2.5 py-0.5 rounded text-white inline-block mb-2"
                  style={{ backgroundColor: other.color }}
                >
                  {other.badge}
                </span>
                <h5 className="font-heading font-bold text-base text-[#1E2428] group-hover:text-[#0B4A8F] transition-colors">
                  {other.title}
                </h5>
                <p className="font-sans text-xs text-[#1E2428]/60 mt-1 line-clamp-2">
                  {other.subtitle}
                </p>
                <div className="mt-4 flex items-center gap-1.5 text-xs font-semibold text-[#0B4A8F] group-hover:translate-x-1 transition-transform">
                  <span>Explore Portfolio</span>
                  <ChevronRight size={13} />
                </div>
              </Link>
            ))}
          </div>
        </div>
      </div>

      <FormularyModal
        isOpen={modalOpen}
        onClose={() => setModalOpen(false)}
        product={selectedProduct}
        categoryName={category.title}
      />
    </div>
  );
}
