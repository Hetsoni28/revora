'use client';

import { useRef, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { motion, useScroll, useTransform, useMotionValueEvent } from 'framer-motion';
import { ArrowRight, CheckCircle2 } from 'lucide-react';
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
      'State-of-the-art moxifloxacin formulations engineered for rapid bactericidal action, trans-corneal penetration, and optimal compliance in surgical prophylaxis and microbial keratitis.',
    formulations: ['MOXORA-D Eye Drops', 'MOXORA-LP Suspension', 'MOXORA 0.5% Drops'],
    specs: [
      'Broad-Spectrum 4th-Gen Moxifloxacin 0.5%',
      'Dual Steroid Synergy (Dexa + Loteprednol)',
      'Aseptic Blow-Fill-Seal (BFS) Packaging',
      'Rapid Anterior Chamber Bioavailability',
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
      'A comprehensive spectrum of tear supplements spanning bio-adhesive carboxymethylcellulose, multi-polymer PEG combinations, and high-molecular-weight sodium hyaluronate.',
    formulations: ['TREHYNATE 0.18%', 'REHYNATE Multi-Polymer', 'RevGel 1.0%', 'RevFresh 0.5%'],
    specs: [
      'High Molecular Sodium Hyaluronate 0.18%',
      'Multi-Polymer PEG 400 & PG Matrix',
      'Sustained Pre-Corneal Residence Zero Blur',
      'Protective Blister-Packed Single Units',
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
      'Targeted non-steroidal anti-inflammatory agents designed for rapid anterior-to-posterior bioavailability, minimizing post-surgical pain, photophobia, and post-cataract CME.',
    formulations: ['REVONAC CS (Nepafenac 0.1%)'],
    specs: [
      'Bioactivated into Amfenac by Hydrolases',
      'Superior Anterior & Posterior Bioavailability',
      'Reduces Post-Cataract CME Incidence',
      '3 ml Sterile Unit in Thermoformed Blister',
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
      'Evidence-based clinical nutraceuticals formulated with optimal ratios of lutein, zeaxanthin, astaxanthin, omega-DHA, and resveratrol to support photoreceptor longevity.',
    formulations: ['REVOPT Tablets (Macular Carotenoid Complex)'],
    specs: [
      'Macular Carotenoids (Lutein & Zeaxanthin)',
      'Omega-3 DHA for Photoreceptor Health',
      'Resveratrol & Ginkgo Neurovascular Support',
      '100% Vegetarian Alu-Alu Blister Strip',
    ],
    color: '#1A3A8F',
  },
];

export function ProductsPinned() {
  const wrapperRef = useRef<HTMLDivElement>(null);
  const [activeDivision, setActiveDivision] = useState(0);

  const { scrollYProgress } = useScroll({
    target: wrapperRef,
    offset: ['start start', 'end end'],
  });

  // 4 categories: translate horizontally from 0% to -75%
  const x = useTransform(scrollYProgress, [0, 1], ['0%', '-75%']);

  useMotionValueEvent(scrollYProgress, 'change', (latest) => {
    const idx = Math.min(
      THERAPEUTIC_DIVISIONS.length - 1,
      Math.max(0, Math.round(latest * (THERAPEUTIC_DIVISIONS.length - 1)))
    );
    setActiveDivision(idx);
  });

  const scrollToDivision = (idx: number) => {
    if (!wrapperRef.current) return;
    const rect = wrapperRef.current.getBoundingClientRect();
    const scrollTop = window.scrollY || document.documentElement.scrollTop;
    const wrapperTop = rect.top + scrollTop;
    const scrollRange = wrapperRef.current.offsetHeight - window.innerHeight;
    const targetY = wrapperTop + (idx / (THERAPEUTIC_DIVISIONS.length - 1)) * scrollRange;
    window.scrollTo({ top: targetY, behavior: 'smooth' });
  };

  return (
    <section id="products" className="relative bg-[#F8F9FA]">
      {/* ── Desktop: Pinned Horizontal Scroll (tablet-lg and above) ── */}
      <div
        ref={wrapperRef}
        className="hidden tablet-lg:block"
        style={{ height: '300vh' }}
      >
        <div className="sticky top-0 h-screen overflow-hidden flex flex-col justify-between pt-20 desktop:pt-[104px] pb-4 px-6 desktop:px-12 bg-[#F8F9FA]">
          {/* Header Bar — Strictly positioned in flex flow below the fixed navbar */}
          <div className="w-full max-w-5xl mx-auto flex items-center justify-between flex-shrink-0 pt-2 pb-1">
            <div>
              <span className="font-sans font-semibold text-[11px] desktop:text-xs uppercase tracking-[0.24em] text-[#D7262E]">
                Therapeutic Portfolios
              </span>
              <h2 className="font-heading font-bold text-2xl desktop:text-3xl text-[#1E2428] mt-0.5 tracking-tight">
                Core Healthcare Divisions
              </h2>
            </div>
            <div className="flex items-center gap-3">
              <div className="hidden desktop:flex items-center gap-2 text-xs text-[#1E2428]/60 bg-white px-3.5 py-1.5 rounded-full border border-[#E8F1F9] shadow-xs">
                <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                <span>Scroll or click below to explore</span>
              </div>
              <Link
                href="/our-offerings"
                className="text-xs font-semibold px-4 py-2 rounded-full bg-[#0B4A8F] hover:bg-[#08356A] text-white transition-colors shadow-xs inline-flex items-center gap-1.5"
              >
                <span>All Offerings</span>
                <ArrowRight size={13} />
              </Link>
            </div>
          </div>

          {/* Horizontal Track — Centered in remaining vertical space */}
          <div className="flex-1 min-h-0 flex items-center overflow-hidden w-full my-auto">
            <motion.div
              className="flex items-center h-full"
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
          </div>

          {/* Bottom Category Switcher — In natural flow below card, impossible to collide */}
          <div className="w-full flex-shrink-0 flex items-center justify-center pt-1 pb-1">
            <div className="inline-flex items-center gap-1.5 bg-white/95 backdrop-blur-md p-1.5 rounded-full border border-[#E8F1F9] shadow-sm">
              {THERAPEUTIC_DIVISIONS.map((d, i) => {
                const isActive = activeDivision === i;
                return (
                  <button
                    key={d.id}
                    type="button"
                    onClick={() => scrollToDivision(i)}
                    className={`flex items-center gap-2 px-3.5 py-1.5 rounded-full transition-all text-xs cursor-pointer ${
                      isActive
                        ? 'bg-[#1E2428] text-white shadow-xs font-semibold'
                        : 'text-[#1E2428]/60 hover:text-[#1E2428] hover:bg-[#F1F5F9]'
                    }`}
                  >
                    <span
                      className="w-2 h-2 rounded-full flex-shrink-0"
                      style={{ backgroundColor: isActive ? '#FFFFFF' : d.color }}
                    />
                    <span className="font-mono text-[11px]">0{i + 1}</span>
                    <span className="text-[11px] font-medium hidden desktop:inline">
                      {d.badge}
                    </span>
                  </button>
                );
              })}
            </div>
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

// ── Desktop Card: Compact Two-Column Presentation ──
function DesktopCategoryCard({
  division,
  index,
}: {
  division: (typeof THERAPEUTIC_DIVISIONS)[number];
  index: number;
}) {
  return (
    <div className="flex items-center justify-center w-screen h-full flex-shrink-0 px-6 desktop:px-16">
      <div className="w-full max-w-5xl bg-white rounded-2xl overflow-hidden shadow-lg border border-[#E8F1F9] grid grid-cols-12 max-h-[calc(100vh-210px)]">
        {/* Left Column: Category Information */}
        <div className="col-span-7 p-6 desktop:p-8 flex flex-col justify-between overflow-y-auto">
          <div className="flex flex-col gap-2.5">
            {/* Header badges */}
            <div className="flex items-center gap-2.5">
              <span
                className="px-2.5 py-0.5 rounded-full font-sans font-semibold text-[11px] uppercase tracking-wider text-white shadow-xs"
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
              <h3 className="font-heading font-bold text-2xl desktop:text-[28px] text-[#1E2428] leading-tight">
                {division.title}
              </h3>
              <p
                className="font-sans font-semibold text-xs desktop:text-sm mt-1"
                style={{ color: division.color }}
              >
                {division.tagline}
              </p>
            </div>

            {/* Description */}
            <p className="font-sans text-xs desktop:text-sm text-[#1E2428]/70 leading-relaxed line-clamp-2 desktop:line-clamp-3">
              {division.description}
            </p>

            {/* Key Formulations Available */}
            <div className="pt-1">
              <span className="text-[10px] desktop:text-[11px] font-semibold uppercase tracking-wider text-[#1E2428]/50 block mb-1">
                Key Formulations:
              </span>
              <div className="flex flex-wrap gap-1.5">
                {division.formulations.map((f, fIdx) => (
                  <span
                    key={fIdx}
                    className="text-[11px] desktop:text-xs font-semibold px-2 py-0.5 rounded bg-[#FAFBFD] border border-[#E8F1F9] text-[#1E2428]/80"
                  >
                    {f}
                  </span>
                ))}
              </div>
            </div>

            {/* Specifications list (Compact 2x2 grid) */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-3 gap-y-1 pt-2 border-t border-[#F0F4F8]">
              {division.specs.map((spec) => (
                <div
                  key={spec}
                  className="flex items-start gap-1.5 font-sans text-[11px] desktop:text-xs text-[#1E2428]/80"
                >
                  <CheckCircle2
                    size={13}
                    className="flex-shrink-0 mt-0.5"
                    style={{ color: division.color }}
                  />
                  <span className="line-clamp-1">{spec}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Actions */}
          <div className="flex items-center gap-3 pt-4 mt-3 border-t border-[#F0F4F8]">
            <Link
              href={`/our-offerings/${division.slug}`}
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-lg font-sans font-semibold text-xs desktop:text-sm text-white transition-all shadow-xs group hover:opacity-95"
              style={{ backgroundColor: division.color }}
            >
              <span>Explore Portfolio</span>
              <ArrowRight
                size={14}
                className="transition-transform group-hover:translate-x-1"
              />
            </Link>
            <Link
              href="/#contact"
              className="px-4 py-2.5 rounded-lg border border-[#D9DFE8] font-sans font-semibold text-xs desktop:text-sm text-[#1E2428] hover:bg-[#F8FAFC] transition-colors"
            >
              Request Samples
            </Link>
            <span className="ml-auto font-sans text-[11px] text-[#1E2428]/40 hidden sm:inline">
              WHO-GMP · ISO 9001:2015
            </span>
          </div>
        </div>

        {/* Right Column: Hero Category Packaging Showcase */}
        <div
          className="col-span-5 relative flex items-center justify-center p-6 border-l border-[#E8F1F9]"
          style={{ backgroundColor: '#FAFBFD' }}
        >
          <div className="relative w-full aspect-square max-w-[240px] desktop:max-w-[280px] rounded-xl overflow-hidden shadow-md border border-[#E8F1F9] bg-white p-3">
            <Image
              src={division.image}
              alt={`${division.title} flagship formulation`}
              fill
              className="object-cover object-center"
              sizes="(max-width: 1200px) 35vw, 280px"
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
