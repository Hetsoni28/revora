'use client';

import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import {
  ChevronRight,
  Building2,
  Download,
  CheckCircle2,
  AlertCircle,
  FlaskConical,
  HeartPulse,
  FileCheck,
  Clock,
  Box,
  Thermometer,
} from 'lucide-react';
import { toast } from 'sonner';
import { FormularyModal } from '@/components/offerings/formulary-modal';
import { ProductCard } from '@/components/offerings/product-card';
import { FormularyBanner } from '@/components/offerings/formulary-banner';
import { Product, TherapyCategory, getProductsByCategory } from '@/lib/therapies-data';

interface ProductClientProps {
  product: Product;
  category: TherapyCategory;
}

export function ProductClient({ product, category }: ProductClientProps) {
  const [modalOpen, setModalOpen] = useState(false);
  const [activeTab, setActiveTab] = useState<'composition' | 'moa' | 'indications' | 'dosage' | 'packaging'>(
    'composition'
  );

  const relatedProducts = getProductsByCategory(category.slug).filter(
    (p) => p.id !== product.id
  );

  const handleDownloadPI = () => {
    toast.success('Prescribing Information (PI) Generating', {
      description: `Official prescribing dossier for ${product.name} (${product.genericName}) is downloading.`,
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
        <Link href={`/our-offerings/${category.slug}`} className="hover:text-[#0B4A8F] transition-colors">
          {category.shortName}
        </Link>
        <ChevronRight size={12} className="text-[#1E2428]/40" />
        <span className="font-semibold text-[#0B4A8F]">{product.name}</span>
      </nav>

      {/* Main Single Product Layout */}
      <div className="space-y-10">
        {/* Product Showcase Card */}
        <div className="bg-white rounded-2xl border border-[#D9DFE8] p-6 tablet:p-10 shadow-sm relative overflow-hidden">
          <div
            className="absolute top-0 left-0 right-0 h-1.5"
            style={{ background: `linear-gradient(90deg, ${product.color}, #D7262E)` }}
          />

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
            {/* Image Pedestal */}
            <div className="lg:col-span-5 flex flex-col items-center">
              <div className="relative aspect-square w-full max-w-[380px] rounded-2xl overflow-hidden bg-[#FAFBFD] border border-[#EAEFF5] p-6 shadow-sm group">
                <Image
                  src={product.image}
                  alt={`${product.name} packaging carton and bottle`}
                  fill
                  className="object-cover object-center group-hover:scale-105 transition-transform duration-300"
                  sizes="(max-width: 768px) 100vw, 380px"
                  priority
                />
                <span
                  className="absolute top-4 left-4 px-3 py-1 rounded text-[10px] font-semibold uppercase tracking-wider text-white shadow-xs"
                  style={{ backgroundColor: product.color }}
                >
                  {product.badge}
                </span>
              </div>
              <span className="text-xs font-mono text-[#1E2428]/50 mt-3 text-center">
                Commercial Unit: {product.volume} · Sterile BFS Pack
              </span>

              {/* Action Buttons */}
              <div className="w-full max-w-[380px] mt-6 space-y-2.5">
                <button
                  onClick={() => setModalOpen(true)}
                  className="w-full py-3 px-4 rounded-xl bg-[#0B4A8F] hover:bg-[#08356A] text-white text-xs font-semibold transition-all shadow-sm flex items-center justify-center gap-2"
                >
                  <Building2 size={15} />
                  <span>Request Doctor / Hospital Samples</span>
                </button>
                <button
                  onClick={handleDownloadPI}
                  className="w-full py-2.5 px-4 rounded-xl border border-[#D9DFE8] hover:border-[#0B4A8F] hover:bg-[#F8FAFC] text-[#1E2428] text-xs font-medium transition-colors flex items-center justify-center gap-2"
                >
                  <Download size={15} />
                  <span>Download Prescribing Dossier (PDF)</span>
                </button>
              </div>
            </div>

            {/* Specifications & Overview */}
            <div className="lg:col-span-7 flex flex-col justify-between">
              <div>
                <div className="flex flex-wrap items-center gap-2.5 mb-2.5">
                  <Link
                    href={`/our-offerings/${category.slug}`}
                    className="text-xs font-semibold uppercase tracking-wider text-[#0B4A8F] hover:underline"
                  >
                    {category.shortName}
                  </Link>
                  <span className="text-xs text-[#1E2428]/30">·</span>
                  <span className="text-xs font-mono text-[#1E2428]/60 bg-[#F1F5F9] px-2.5 py-0.5 rounded-full font-medium">
                    {product.volume}
                  </span>
                  <span className="text-xs text-[#1E2428]/30">·</span>
                  <span className="text-xs font-semibold text-[#008B74] bg-[#E6F4F1] px-2.5 py-0.5 rounded-full">
                    Aseptic ISO Class 5
                  </span>
                </div>

                <h1 className="font-heading font-bold text-3xl sm:text-5xl text-[#1E2428] tracking-tight">
                  {product.name}
                </h1>

                <p className="font-sans text-base font-semibold text-[#0B4A8F] mt-2 leading-snug">
                  {product.genericName}
                </p>

                <p className="font-sans text-xs sm:text-sm text-[#1E2428]/75 mt-3 italic">
                  &ldquo;{product.tagline}&rdquo;
                </p>

                <p className="font-sans text-xs sm:text-sm text-[#1E2428]/85 mt-4 leading-relaxed">
                  {product.summary}
                </p>

                {/* Key Spec Grid */}
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mt-6 pt-6 border-t border-[#EAEFF5] text-xs">
                  <div className="p-3 rounded-xl bg-[#F8FAFC] border border-[#EAEFF5]">
                    <span className="text-[10px] uppercase tracking-wider text-[#1E2428]/50 font-semibold block">Therapy Area</span>
                    <span className="font-semibold text-[#1E2428] mt-1 block truncate">{category.badge}</span>
                  </div>
                  <div className="p-3 rounded-xl bg-[#F8FAFC] border border-[#EAEFF5]">
                    <span className="text-[10px] uppercase tracking-wider text-[#1E2428]/50 font-semibold block">Pack Form</span>
                    <span className="font-semibold text-[#1E2428] mt-1 block truncate">{product.volume}</span>
                  </div>
                  <div className="p-3 rounded-xl bg-[#F8FAFC] border border-[#EAEFF5]">
                    <span className="text-[10px] uppercase tracking-wider text-[#1E2428]/50 font-semibold block">Sterility</span>
                    <span className="font-semibold text-[#008B74] mt-1 block">SAL 10⁻⁶ BFS</span>
                  </div>
                  <div className="p-3 rounded-xl bg-[#F8FAFC] border border-[#EAEFF5]">
                    <span className="text-[10px] uppercase tracking-wider text-[#1E2428]/50 font-semibold block">Standard</span>
                    <span className="font-semibold text-[#0B4A8F] mt-1 block">WHO-GMP / IP</span>
                  </div>
                </div>

                {/* Schedule Warning */}
                <div className="mt-5 p-3.5 rounded-xl bg-[#FFF8E7] border border-[#FEE685] flex items-start gap-3 text-xs text-[#7A4B00]">
                  <AlertCircle size={17} className="shrink-0 mt-0.5 text-[#B45309]" />
                  <div>
                    <span className="font-semibold block">{product.schedule}</span>
                    <span className="text-[11px] text-[#7A4B00]/85 mt-0.5 block">
                      Warning: To be sold by retail on the prescription of a Registered Medical Practitioner (RMP) only.
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Clinical Monograph Tabs */}
        <div className="bg-white rounded-2xl border border-[#D9DFE8] overflow-hidden shadow-xs">
          <div className="flex border-b border-[#D9DFE8] bg-[#F8FAFC] overflow-x-auto scrollbar-none">
            {[
              { id: 'composition', label: 'Formula & Composition', icon: FlaskConical },
              { id: 'moa', label: 'Pharmacodynamics (MOA)', icon: HeartPulse },
              { id: 'indications', label: 'Indications & Scope', icon: FileCheck },
              { id: 'dosage', label: 'Dosage & Administration', icon: Clock },
              { id: 'packaging', label: 'Packaging & Storage', icon: Box },
            ].map((tab) => {
              const Icon = tab.icon;
              const isSelected = activeTab === tab.id;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id as typeof activeTab)}
                  className={`flex items-center gap-2 px-6 py-4 text-xs font-semibold whitespace-nowrap transition-colors border-b-2 ${
                    isSelected
                      ? 'border-[#0B4A8F] text-[#0B4A8F] bg-white'
                      : 'border-transparent text-[#1E2428]/70 hover:text-[#0B4A8F] hover:bg-white/50'
                  }`}
                >
                  <Icon size={15} />
                  <span>{tab.label}</span>
                </button>
              );
            })}
          </div>

          <div className="p-6 tablet:p-10 text-xs tablet:text-sm">
            {activeTab === 'composition' && (
              <div className="space-y-6">
                <div>
                  <h3 className="font-heading font-bold text-lg text-[#1E2428] mb-1">Qualitative &amp; Quantitative Formulation</h3>
                  <p className="text-xs text-[#1E2428]/70">Formulated to physiological ocular osmolarity.</p>
                </div>
                <div className="bg-[#FAFBFD] rounded-xl border border-[#EAEFF5] divide-y divide-[#EAEFF5]">
                  {product.composition.map((c, i) => (
                    <div key={i} className="p-4 flex items-start gap-3">
                      <CheckCircle2 size={16} className="text-[#0B4A8F] shrink-0 mt-0.5" />
                      <span className="font-mono text-xs font-semibold text-[#1E2428]">{c}</span>
                    </div>
                  ))}
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-2">
                  <div className="p-4 rounded-xl bg-[#F8FAFC] border border-[#EAEFF5]">
                    <span className="text-[10.5px] uppercase font-semibold text-[#1E2428]/50 block">Target pH Range</span>
                    <span className="font-mono text-sm font-semibold text-[#0B4A8F] mt-1 block">6.8 – 7.4 (Physiological)</span>
                  </div>
                  <div className="p-4 rounded-xl bg-[#F8FAFC] border border-[#EAEFF5]">
                    <span className="text-[10.5px] uppercase font-semibold text-[#1E2428]/50 block">Target Osmolality</span>
                    <span className="font-mono text-sm font-semibold text-[#0B4A8F] mt-1 block">290 – 310 mOsm/kg</span>
                  </div>
                  <div className="p-4 rounded-xl bg-[#F8FAFC] border border-[#EAEFF5]">
                    <span className="text-[10.5px] uppercase font-semibold text-[#1E2428]/50 block">Sterility Assurance</span>
                    <span className="font-mono text-sm font-semibold text-[#008B74] mt-1 block">SAL 10⁻⁶ Aseptic</span>
                  </div>
                </div>
              </div>
            )}

            {activeTab === 'moa' && (
              <div className="space-y-4">
                <h3 className="font-heading font-bold text-lg text-[#1E2428]">Mechanism of Action &amp; Clinical Pharmacodynamics</h3>
                <div className="p-5 rounded-xl bg-[#FAFBFD] border border-[#EAEFF5] leading-relaxed text-[#1E2428]/85 text-sm">
                  {product.mechanismOfAction}
                </div>
              </div>
            )}

            {activeTab === 'indications' && (
              <div className="space-y-4">
                <h3 className="font-heading font-bold text-lg text-[#1E2428]">Therapeutic Indications</h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {product.indications.map((ind, i) => (
                    <div key={i} className="p-4 rounded-xl bg-[#FAFBFD] border border-[#EAEFF5] flex items-start gap-3">
                      <CheckCircle2 size={16} className="text-[#008B74] shrink-0 mt-0.5" />
                      <span className="font-medium text-[#1E2428]/85">{ind}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {activeTab === 'dosage' && (
              <div className="space-y-4">
                <h3 className="font-heading font-bold text-lg text-[#1E2428]">Dosage &amp; Administration</h3>
                <div className="p-5 rounded-xl bg-[#FAFBFD] border border-[#EAEFF5] text-sm text-[#1E2428]/85 font-medium leading-relaxed">
                  {product.dosage}
                </div>
              </div>
            )}

            {activeTab === 'packaging' && (
              <div className="space-y-4">
                <h3 className="font-heading font-bold text-lg text-[#1E2428]">Packaging &amp; Storage</h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="p-5 rounded-xl bg-[#FAFBFD] border border-[#EAEFF5] flex items-start gap-3.5">
                    <Thermometer size={20} className="text-[#D7262E] shrink-0 mt-0.5" />
                    <div>
                      <span className="font-semibold text-[#1E2428] text-xs sm:text-sm block">Storage</span>
                      <p className="text-xs sm:text-sm text-[#1E2428]/75 mt-1">{product.storage}</p>
                    </div>
                  </div>
                  <div className="p-5 rounded-xl bg-[#FAFBFD] border border-[#EAEFF5] flex items-start gap-3.5">
                    <Box size={20} className="text-[#0B4A8F] shrink-0 mt-0.5" />
                    <div>
                      <span className="font-semibold text-[#1E2428] text-xs sm:text-sm block">Container</span>
                      <p className="text-xs sm:text-sm text-[#1E2428]/75 mt-1">{product.packaging}</p>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Reusable Formulary Banner */}
        <FormularyBanner
          title={`Procure ${product.name} for Your Eye Institute or Pharmacy`}
          description="We supply eye hospitals, surgical day-centers, and pharmacy networks across India with consistent batch delivery, Certificate of Analysis (CoA), and stability dossiers."
          buttonLabel="Request Rate Card & Samples"
          onAction={() => setModalOpen(true)}
        />

        {/* Related Formulations Grid */}
        {relatedProducts.length > 0 && (
          <div className="pt-8 border-t border-[#D9DFE8]">
            <div className="flex items-center justify-between mb-6">
              <div>
                <span className="text-xs uppercase tracking-wider text-[#0B4A8F] font-semibold">
                  {category.shortName} Portfolio
                </span>
                <h4 className="font-heading font-bold text-xl sm:text-2xl text-[#1E2428] mt-0.5">
                  Other Formulations in this Category
                </h4>
              </div>
              <Link
                href={`/our-offerings/${category.slug}`}
                className="text-xs font-semibold text-[#0B4A8F] hover:underline flex items-center gap-1"
              >
                <span>View Full Category</span>
                <ChevronRight size={14} />
              </Link>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
              {relatedProducts.map((rel) => (
                <ProductCard
                  key={rel.id}
                  product={rel}
                  onRequestSample={() => setModalOpen(true)}
                />
              ))}
            </div>
          </div>
        )}
      </div>

      <FormularyModal
        isOpen={modalOpen}
        onClose={() => setModalOpen(false)}
        product={product}
        categoryName={category.title}
      />
    </div>
  );
}
