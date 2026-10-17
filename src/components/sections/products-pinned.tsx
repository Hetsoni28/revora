'use client';

import { useRef } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { motion, useScroll, useTransform } from 'framer-motion';
import { ArrowRight, CheckCircle2, Layers } from 'lucide-react';
import { expoOut } from '@/lib/easings';

export const THERAPEUTIC_DIVISIONS = [
  {
    id: 'anti-infectives',
    slug: 'anti-infectives',
    badge: 'Infection & Inflammation',
    title: 'Anti-Infective & Anti-Inflammatory Therapeutics',
    tagline: 'Advanced 4th-Gen Fluoroquinolones & Synergistic Corticosteroids',
    productCount: '3 Commercial Formulations',
    image: '/images/products/moxora-d.jpg',
    description:
      'State-of-the-art moxifloxacin formulations engineered for rapid bactericidal action, high trans-corneal penetration, and optimal patient compliance in both surgical prophylaxis and clinical management of microbial keratitis.',
    formulations: ['MOXORA-D Eye Drops', 'MOXORA-LP Suspension', 'MOXORA 0.5% Drops'],
    specs: [
      'Broad-Spectrum 4th-Gen Fluoroquinolone (Moxifloxacin 0.5%)',
      'Dual Steroid Synergy (Dexamethasone & Soft-Steroid Loteprednol)',
      'Aseptic Blow-Fill-Seal (BFS) Sterile Dropper Packaging',
      'Rapid Anterior Chamber Trans-Corneal Penetration',
    ],
    color: '#0B4A8F',
  },
  {
    id: 'dry-eye-lubricants',
    slug: 'dry-eye-lubricants',
    badge: 'Ocular Surface Protection',
    title: 'Ocular Surface Disease & Tear Substitutes',
    tagline: 'Multi-Polymer Viscoelastics & Preservative-Free Formulations',
    productCount: '4 Commercial Formulations',
    image: '/images/products/trehynate.jpg',
    description:
      'A comprehensive spectrum of tear supplements spanning bio-adhesive carboxymethylcellulose, multi-polymer PEG combinations, and high-molecular-weight sodium hyaluronate engineered to replenish the mucin-aqueous-lipid tear film interface.',
    formulations: ['TREHYNATE 0.18%', 'REHYNATE Multi-Polymer', 'RevGel 1.0%', 'RevFresh 0.5%'],
    specs: [
      'High Molecular Weight Sodium Hyaluronate 0.18% (Trehynate)',
      'Multi-Polymer PEG 400 & Propylene Glycol Matrix (Rehynate)',
      'Sustained Pre-Corneal Residence Time With Zero Blur',
      'Protective Blister-Packed Packaging for Max Purity',
    ],
    color: '#008B74',
  },
  {
    id: 'nsaids-surgical',
    slug: 'nsaids-surgical',
    badge: 'Post-Surgical Care',
    title: 'Ophthalmic NSAIDs & Cataract Recovery',
    tagline: 'Targeted Prodrugs & Intraoperative Corneal Endothelial Protection',
    productCount: '1 Flagship Formulation',
    image: '/images/products/revonac-cs.jpg',
    description:
      'Targeted non-steroidal anti-inflammatory agents designed for rapid anterior-to-posterior segment bioavailability, minimizing post-surgical pain, photophobia, and the incidence of post-operative cystoid macular edema (CME).',
    formulations: ['REVONAC CS (Nepafenac 0.1%)'],
    specs: [
      'Targeted Prodrug Bioactivated into Amfenac by Ocular Hydrolases',
      'Superior Bioavailability to Anterior & Posterior Segments',
      'Significantly Reduces Incidence of Post-Cataract CME',
      '3 ml Sterile Unit in Protective Thermoformed Blister',
    ],
    color: '#7E1E6B',
  },
  {
    id: 'retinal-nutrition',
    slug: 'retinal-nutrition',
    badge: 'Macular & Retinal Health',
    title: 'Retinal Vitality & Ocular Neuroprotection',
    tagline: 'Advanced Macular Carotenoids & Neurovascular Antioxidant Therapy',
    productCount: '1 Specialized Complex',
    image: '/images/products/revopt-tablets.jpg',
    description:
      'Evidence-based clinical nutraceuticals formulated with optimal ratios of lutein, zeaxanthin, astaxanthin, omega-DHA, resveratrol, and botanical bioflavonoids to support macular pigment optical density and photoreceptor longevity.',
    formulations: ['REVOPT Tablets (Macular Carotenoid Complex)'],
    specs: [
      'Concentrated Macular Carotenoids (Lutein, Zeaxanthin, Astaxanthin)',
      'Omega-3 DHA for Photoreceptor Membrane Fluidity',
      'Neurovascular Protection via Resveratrol & Ginkgo Biloba',
      '100% Vegetarian Certified Alu-Alu Blister Strip (1x10)',
    ],
    color: '#1A3A8F',
  },
];

export function ProductsPinned() {
  const wrapperRef = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: wrapperRef,
    offset: ['start start', 'end end'],
  });

  // 4 categories: translate horizontally from 0% to -75%
  const x = useTransform(scrollYProgress, [0, 1], ['0%', '-75%']);

  return (
    <section id="products" className="relative bg-[#F8F9FA]">
      {/* ── Desktop: Pinned Horizontal Scroll (tablet-lg and above) ── */}
      <div
        ref={wrapperRef}
        className="hidden tablet-lg:block"
        style={{ height: '340vh' }}
      >
        <div className="sticky top-0 h-screen overflow-hidden flex flex-col justify-center">
          {/* Header Bar */}
          <div className="absolute top-8 left-12 right-12 z-20 flex items-center justify-between">
            <div>
              <span className="font-sans font-semibold text-xs uppercase tracking-[0.28em] text-[#D7262E]">
                Therapeutic Portfolios
              </span>
              <h2 className="font-heading font-bold text-3xl desktop:text-4xl text-[#1E2428] mt-1 tracking-tight">
                Core Healthcare Divisions
              </h2>
            </div>
            <div className="flex items-center gap-3">
              <div className="flex items-center gap-2 text-xs text-[#1E2428]/60 bg-white px-4 py-2 rounded-full border border-[#E8F1F9] shadow-sm">
                <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                <span>Scroll to explore 4 therapeutic areas</span>
              </div>
              <Link
                href="/our-offerings"
                className="text-xs font-semibold px-4 py-2 rounded-full bg-[#0B4A8F] hover:bg-[#08356A] text-white transition-colors shadow-sm inline-flex items-center gap-1.5"
              >
                <span>All Offerings</span>
                <ArrowRight size={13} />
              </Link>
            </div>
          </div>

          {/* Horizontal Track */}
          <motion.div
            className="flex h-[80vh] items-center"
            style={{ x, width: `${THERAPEUTIC_DIVISIONS.length * 100}vw` }}
          >
            {THERAPEUTIC_DIVISIONS.map((division, index) => (
              <DesktopCategoryCard
                key={division.id}
                division={division}
                index={index}
              />
            ))}
          </motion.div>

          {/* Pagination Indicators */}
          <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex items-center gap-3 z-20 bg-white/95 backdrop-blur-md px-5 py-2.5 rounded-full border border-[#E8F1F9] shadow-md">
            {THERAPEUTIC_DIVISIONS.map((d, i) => (
              <div key={d.id} className="flex items-center gap-1.5">
                <span
                  className="w-2.5 h-2.5 rounded-full"
                  style={{ backgroundColor: d.color }}
                />
                <span className="font-mono text-xs font-semibold text-[#1E2428]/80">
                  0{i + 1}
                </span>
                <span className="text-[11px] font-medium text-[#1E2428]/60 hidden desktop:inline">
                  {d.badge}
                </span>
                {i < THERAPEUTIC_DIVISIONS.length - 1 && (
                  <span className="text-[#1E2428]/20 ml-2">/</span>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* ── Mobile / Tablet: Vertical Structured Stack ── */}
      <div className="tablet-lg:hidden py-16 px-4 sm:px-6">
        <div className="max-w-2xl mx-auto">
          <div className="mb-10 text-center">
            <span className="font-sans font-semibold text-xs uppercase tracking-[0.28em] text-[#D7262E]">
              Therapeutic Portfolios
            </span>
            <h2 className="font-heading font-bold text-2xl sm:text-3xl text-[#1E2428] mt-1.5 tracking-tight">
              Core Healthcare Divisions
            </h2>
            <p className="font-sans text-xs sm:text-sm text-[#1E2428]/60 mt-2 max-w-md mx-auto">
              Manufactured under strict WHO-GMP compliance in sterile formulation suites, Ahmedabad.
            </p>
          </div>

          <div className="flex flex-col gap-6">
            {THERAPEUTIC_DIVISIONS.map((division, i) => (
              <MobileCategoryCard
                key={division.id}
                division={division}
                delay={i * 0.05}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

// ── Desktop Card: Two-Column Category Presentation ──
function DesktopCategoryCard({
  division,
  index,
}: {
  division: (typeof THERAPEUTIC_DIVISIONS)[number];
  index: number;
}) {
  return (
    <div className="relative flex items-center justify-center w-screen h-full flex-shrink-0 px-12 desktop:px-24">
      <div className="w-full max-w-5xl bg-white rounded-2xl overflow-hidden shadow-xl border border-[#E8F1F9] grid grid-cols-12 min-h-[520px]">
        {/* Left Column: Category Information */}
        <div className="col-span-7 p-10 desktop:p-12 flex flex-col justify-between">
          <div className="flex flex-col gap-4">
            {/* Header badges */}
            <div className="flex items-center gap-3">
              <span
                className="px-3 py-1 rounded-full font-sans font-semibold text-xs uppercase tracking-wider text-white shadow-xs"
                style={{ backgroundColor: division.color }}
              >
                {division.badge}
              </span>
              <span className="font-mono text-xs text-[#1E2428]/50">
                {division.productCount}
              </span>
            </div>

            {/* Division Title & Tagline */}
            <div>
              <h3 className="font-heading font-bold text-3xl desktop:text-4xl text-[#1E2428] leading-tight">
                {division.title}
              </h3>
              <p
                className="font-sans font-semibold text-sm mt-1.5"
                style={{ color: division.color }}
              >
                {division.tagline}
              </p>
            </div>

            {/* Description */}
            <p className="font-sans text-sm text-[#1E2428]/70 leading-relaxed">
              {division.description}
            </p>

            {/* Key Formulations Available */}
            <div className="pt-2">
              <span className="text-[11px] font-semibold uppercase tracking-wider text-[#1E2428]/50 block mb-1.5">
                Key Formulations in this Division:
              </span>
              <div className="flex flex-wrap gap-2">
                {division.formulations.map((f, fIdx) => (
                  <span
                    key={fIdx}
                    className="text-xs font-semibold px-2.5 py-1 rounded-md bg-[#FAFBFD] border border-[#E8F1F9] text-[#1E2428]/80"
                  >
                    {f}
                  </span>
                ))}
              </div>
            </div>

            {/* Specifications list */}
            <ul className="flex flex-col gap-2 pt-2 border-t border-[#F0F4F8]">
              {division.specs.map((spec) => (
                <li
                  key={spec}
                  className="flex items-center gap-2.5 font-sans text-xs text-[#1E2428]/80"
                >
                  <CheckCircle2
                    size={15}
                    className="flex-shrink-0"
                    style={{ color: division.color }}
                  />
                  <span>{spec}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Actions */}
          <div className="flex items-center gap-4 pt-6 mt-4 border-t border-[#F0F4F8]">
            <Link
              href={`/our-offerings/${division.slug}`}
              className="inline-flex items-center gap-2 px-6 py-3 rounded-lg font-sans font-semibold text-sm text-white transition-all shadow-sm group hover:opacity-95"
              style={{ backgroundColor: division.color }}
            >
              <span>Explore Portfolio</span>
              <ArrowRight
                size={15}
                className="transition-transform group-hover:translate-x-1"
              />
            </Link>
            <Link
              href="/#contact"
              className="px-5 py-3 rounded-lg border border-[#D9DFE8] font-sans font-semibold text-sm text-[#1E2428] hover:bg-[#F8FAFC] transition-colors"
            >
              Request Samples
            </Link>
            <span className="ml-auto font-sans text-xs text-[#1E2428]/40">
              WHO-GMP · ISO 9001:2015
            </span>
          </div>
        </div>

        {/* Right Column: Hero Category Packaging Showcase */}
        <div
          className="col-span-5 relative flex items-center justify-center p-8 border-l border-[#E8F1F9]"
          style={{ backgroundColor: '#FAFBFD' }}
        >
          <div className="relative w-full aspect-square max-w-[340px] rounded-2xl overflow-hidden shadow-md border border-[#E8F1F9] bg-white p-4">
            <Image
              src={division.image}
              alt={`${division.title} flagship formulation`}
              fill
              className="object-cover object-center"
              sizes="(max-width: 1200px) 40vw, 340px"
              priority={index < 2}
            />
          </div>
        </div>
      </div>
    </div>
  );
}

// ── Mobile Card: Stacked Layout ──
function MobileCategoryCard({
  division,
  delay,
}: {
  division: (typeof THERAPEUTIC_DIVISIONS)[number];
  delay: number;
}) {
  return (
    <motion.div
      className="bg-white rounded-2xl overflow-hidden shadow-sm border border-[#E8F1F9]"
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-10% 0px' }}
      transition={{ duration: 0.55, ease: expoOut, delay }}
    >
      {/* Category Image */}
      <div className="relative w-full aspect-[16/10] bg-[#FAFBFD] border-b border-[#E8F1F9] p-4 flex items-center justify-center">
        <Image
          src={division.image}
          alt={division.title}
          fill
          className="object-cover object-center"
          sizes="100vw"
        />
        <span
          className="absolute top-3 left-3 px-2.5 py-0.5 rounded-full font-sans font-semibold text-[10px] uppercase tracking-wider text-white shadow-xs"
          style={{ backgroundColor: division.color }}
        >
          {division.badge}
        </span>
      </div>

      {/* Details */}
      <div className="p-5 flex flex-col gap-3">
        <div>
          <span className="text-[10px] uppercase font-semibold text-[#1E2428]/50 block">
            {division.productCount}
          </span>
          <h3 className="font-heading font-bold text-xl text-[#1E2428] mt-0.5 leading-tight">
            {division.title}
          </h3>
          <p
            className="font-sans font-semibold text-xs mt-1"
            style={{ color: division.color }}
          >
            {division.tagline}
          </p>
        </div>

        <p className="font-sans text-xs text-[#1E2428]/70 leading-relaxed">
          {division.description}
        </p>

        <div className="pt-2">
          <span className="text-[10.5px] font-semibold uppercase tracking-wider text-[#1E2428]/50 block mb-1.5">
            Key Formulations:
          </span>
          <div className="flex flex-wrap gap-1.5">
            {division.formulations.map((f, i) => (
              <span
                key={i}
                className="text-[11px] font-medium bg-[#F1F5F9] text-[#1E2428]/80 px-2 py-0.5 rounded"
              >
                {f}
              </span>
            ))}
          </div>
        </div>

        <div className="pt-4 border-t border-[#F0F4F8] mt-1 flex items-center justify-between">
          <Link
            href={`/our-offerings/${division.slug}`}
            className="inline-flex items-center gap-1.5 font-sans font-semibold text-xs px-4 py-2 rounded-lg text-white shadow-xs"
            style={{ backgroundColor: division.color }}
          >
            <span>Explore Portfolio</span>
            <ArrowRight size={13} />
          </Link>
          <Link
            href="/#contact"
            className="text-xs font-semibold hover:underline"
            style={{ color: division.color }}
          >
            Inquire &rarr;
          </Link>
        </div>
      </div>
    </motion.div>
  );
}
