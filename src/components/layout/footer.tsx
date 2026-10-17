import Link from 'next/link';
import { MapPin, Mail, Phone, ExternalLink, ShieldCheck, Award, Globe, AlertCircle, Building2 } from 'lucide-react';
import { RevoraLogo } from '@/components/ui/revora-logo';

export function Footer() {
  return (
    <footer className="bg-[#14181B] text-white pt-16 pb-12 border-t border-white/10 font-sans">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">

        {/* ── Section 1: Pre-footer Patient Safety & Pharmacovigilance Notice ── */}
        <div className="bg-white/[0.03] border border-white/10 rounded-xl p-4 sm:p-5 mb-14 flex flex-col tablet:flex-row items-start tablet:items-center justify-between gap-4">
          <div className="flex items-start gap-3">
            <AlertCircle size={18} className="text-[#D7262E] shrink-0 mt-0.5" />
            <div className="text-xs text-white/75 leading-relaxed">
              <span className="font-semibold text-white">Pharmacovigilance &amp; Patient Safety: </span>
              To report an adverse drug reaction (ADR) or product quality issue, please contact our Drug Safety Team at{' '}
              <a href="mailto:safety@revorahealthcare.com" className="text-[#3A82C8] hover:underline font-medium">
                safety@revorahealthcare.com
              </a>{' '}
              or call our 24/7 dedicated safety desk.
            </div>
          </div>
          <div className="w-full tablet:w-auto tablet:shrink-0 flex items-center justify-center sm:justify-start gap-2 text-xs font-semibold text-white/90">
            <span className="w-full tablet:w-auto text-center px-3 py-1.5 rounded bg-white/10 border border-white/15">
              Toll-Free ADR Line: 1800-489-REVORA
            </span>
          </div>
        </div>

        {/* ── Section 2: 5-Column Institutional Navigation Grid ── */}
        <div className="grid grid-cols-1 tablet:grid-cols-2 desktop:grid-cols-5 gap-10 pb-14 border-b border-white/10">

          {/* Column 1: Corporate Entity & Identity */}
          <div className="desktop:col-span-2 flex flex-col gap-4">
            <Link
              href="/"
              className="flex items-center gap-3 select-none w-fit"
              aria-label="Revora Healthcare Private Limited"
            >
              <RevoraLogo variant="color" className="h-8 w-auto object-contain" />
              <div className="flex items-center gap-2.5 translate-y-[4.5px]">
                <span className="w-px h-4 bg-white/25" aria-hidden="true" />
                <span className="font-sans text-[11px] uppercase tracking-[0.22em] text-[#0B4A8F] font-semibold leading-none">
                  Healthcare
                </span>
              </div>
            </Link>

            <p className="text-xs text-white/65 max-w-sm leading-relaxed mt-1">
              Revora Healthcare Private Limited is a trusted pharmaceutical enterprise based in Ahmedabad, Gujarat,
              specializing in ophthalmic pharmaceuticals, surgical formulations, and specialty healthcare solutions.
            </p>

            {/* Corporate identification details */}
            <div className="flex flex-col gap-2 pt-2 text-xs text-white/60">
              <div className="flex items-start gap-2.5">
                <Building2 size={14} className="text-[#0B4A8F] shrink-0 mt-0.5" />
                <span className="font-mono text-[11px] text-white/70">CIN: U24239GJ2009PTC058921</span>
              </div>
              <div className="flex items-start gap-2.5">
                <MapPin size={14} className="text-[#D7262E] shrink-0 mt-0.5" />
                <span className="text-white/70">
                  Registered Office: 3rd Floor, S G Business Hub, S.G. Highway, Ahmedabad - 380054, Gujarat, India.
                </span>
              </div>
              <div className="flex items-center gap-2.5">
                <Phone size={14} className="text-[#0B4A8F] shrink-0" />
                <a href="tel:+919876543210" className="text-white/70 hover:text-white transition-colors">
                  Boardline: +91 (079) 4890-REVORA
                </a>
              </div>
              <div className="flex items-center gap-2.5">
                <Mail size={14} className="text-[#0B4A8F] shrink-0" />
                <a href="mailto:info@revorahealthcare.com" className="text-white/70 hover:text-white transition-colors">
                  info@revorahealthcare.com
                </a>
              </div>
            </div>

            {/* Accreditation Badges */}
            <div className="flex items-center gap-2 pt-3 flex-wrap">
              <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded bg-white/5 border border-white/10 text-[10.5px] text-white/80">
                <ShieldCheck size={12} className="text-[#0B4A8F]" /> WHO-GMP
              </span>
              <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded bg-white/5 border border-white/10 text-[10.5px] text-white/80">
                <Award size={12} className="text-[#D7262E]" /> ISO 9001:2015
              </span>
              <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded bg-white/5 border border-white/10 text-[10.5px] text-white/80">
                <Globe size={12} className="text-[#0B4A8F]" /> 47+ Countries
              </span>
            </div>
          </div>

          {/* Column 2: Therapeutic & Product Solutions */}
          <div className="flex flex-col gap-3">
            <h3 className="font-heading font-semibold text-xs uppercase tracking-wider text-white border-b border-white/10 pb-2">
              <Link href="/our-offerings" className="hover:text-[#3A82C8] transition-colors flex items-center gap-1">
                Therapeutic Areas <ExternalLink size={11} className="opacity-60" />
              </Link>
            </h3>
            <ul className="flex flex-col gap-2 text-xs text-white/65">
              <li>
                <Link href="/our-offerings/anti-infectives" className="hover:text-white transition-colors">
                  Anti-Infective &amp; Anti-Inflammatory
                </Link>
              </li>
              <li>
                <Link href="/our-offerings/dry-eye-lubricants" className="hover:text-white transition-colors">
                  Dry Eye &amp; Tear Substitutes
                </Link>
              </li>
              <li>
                <Link href="/our-offerings/nsaids-surgical" className="hover:text-white transition-colors">
                  Ophthalmic NSAIDs &amp; Cataract
                </Link>
              </li>
              <li>
                <Link href="/our-offerings/retinal-nutrition" className="hover:text-white transition-colors">
                  Retinal Vitality &amp; Nutrition
                </Link>
              </li>
              <li>
                <Link href="/our-offerings" className="hover:text-[#3A82C8] transition-colors font-medium">
                  View All Products &amp; Formularies &rarr;
                </Link>
              </li>
            </ul>
          </div>

          {/* Column 3: Quality & Manufacturing */}
          <div className="flex flex-col gap-3">
            <h3 className="font-heading font-semibold text-xs uppercase tracking-wider text-white border-b border-white/10 pb-2">
              Quality &amp; Compliance
            </h3>
            <ul className="flex flex-col gap-2 text-xs text-white/65">
              <li>
                <Link href="/#about" className="hover:text-white transition-colors">
                  WHO-GMP Certified Facility
                </Link>
              </li>
              <li>
                <Link href="/#process" className="hover:text-white transition-colors">
                  Sterile Formulation Suites
                </Link>
              </li>
              <li>
                <Link href="/#process" className="hover:text-white transition-colors">
                  Analytical Testing &amp; Stability
                </Link>
              </li>
              <li>
                <Link href="/#process" className="hover:text-white transition-colors">
                  ICH Q1 Compliance
                </Link>
              </li>
              <li>
                <Link href="/#process" className="hover:text-white transition-colors">
                  Cold-Chain Logistics
                </Link>
              </li>
            </ul>
          </div>

          {/* Column 4: Corporate & Commercial Contacts */}
          <div className="flex flex-col gap-3">
            <h3 className="font-heading font-semibold text-xs uppercase tracking-wider text-white border-b border-white/10 pb-2">
              Corporate &amp; Trade
            </h3>
            <ul className="flex flex-col gap-2 text-xs text-white/65">
              <li>
                <Link href="/our-presence" className="hover:text-white transition-colors">
                  Ahmedabad Headquarters
                </Link>
              </li>
              <li>
                <Link href="/our-presence#global" className="hover:text-white transition-colors">
                  Global Footprint (47+ Countries)
                </Link>
              </li>
              <li>
                <Link href="/careers" className="hover:text-white transition-colors">
                  Careers at Revora
                </Link>
              </li>
              <li>
                <a href="mailto:exports@revorahealthcare.com" className="hover:text-white transition-colors">
                  Export &amp; Trade Desk
                </a>
              </li>
              <li>
                <Link href="/#contact" className="hover:text-white transition-colors">
                  Institutional Inquiries
                </Link>
              </li>
            </ul>
          </div>
        </div>

        {/* ── Section 3: Statutory Pharmaceutical Disclaimer ── */}
        <div className="py-6 border-b border-white/10 text-[11px] text-white/45 leading-relaxed">
          <p>
            <strong className="text-white/60">Statutory Notice: </strong>
            The information contained on this website is intended solely for healthcare professionals, registered medical practitioners, and authorized distribution partners. It is provided for informational and educational purposes only and should not be construed as medical diagnosis, prescription advice, or a treatment recommendation. All pharmaceutical products mentioned herein are subject to regulatory clearance in their respective jurisdictions and must be administered strictly in compliance with applicable laws and physician guidance.
          </p>
        </div>

        {/* ── Section 4: Bottom Compliance & Copyright Bar ── */}
        <div className="pt-6 flex flex-col tablet:flex-row items-center justify-between gap-4 text-xs text-white/50">
          <p>
            &copy; 2026 Revora Healthcare Private Limited. All rights reserved. S G Business Hub, Ahmedabad, Gujarat, India.
          </p>

          <div className="flex items-center gap-5 flex-wrap">
            <Link href="/our-offerings" className="hover:text-white transition-colors">
              Products
            </Link>
            <Link href="/our-presence" className="hover:text-white transition-colors">
              Presence
            </Link>
            <Link href="/careers" className="hover:text-white transition-colors">
              Careers
            </Link>
            <span className="text-white/20">|</span>
            <a href="#" className="hover:text-white transition-colors">
              Privacy Policy
            </a>
            <a href="#" className="hover:text-white transition-colors">
              Terms of Use
            </a>
            <a href="#" className="hover:text-white transition-colors">
              Pharmacovigilance Policy
            </a>
          </div>
        </div>

      </div>
    </footer>
  );
}
