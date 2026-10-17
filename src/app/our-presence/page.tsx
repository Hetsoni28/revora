'use client';

import Link from 'next/link';
import { Navbar } from '@/components/layout/navbar';
import { Footer } from '@/components/layout/footer';
import { MapPin, Globe, Building2, ShieldCheck, Plane, Truck, Users, Award, ExternalLink } from 'lucide-react';

const REGIONS = [
  {
    name: 'Middle East & GCC',
    countries: 'United Arab Emirates, Saudi Arabia, Oman, Kuwait, Bahrain, Qatar',
    hubs: 'Regional Distribution Center — Dubai Logistics City',
    focus: 'Ocular surface care, dry eye drops, surgical ophthalmic consumables',
  },
  {
    name: 'Southeast Asia (ASEAN)',
    countries: 'Vietnam, Philippines, Myanmar, Cambodia, Indonesia, Thailand',
    hubs: 'ASEAN Liaison Office — Singapore & Manila',
    focus: 'Preservative-free formulations, anti-infectives, cataract post-op care',
  },
  {
    name: 'Latin America & Caribbean',
    countries: 'Colombia, Peru, Dominican Republic, Guatemala, Ecuador, Chile',
    hubs: 'LATAM Regional Depot — Bogota, Colombia',
    focus: 'Glaucoma management platforms, surgical irrigation solutions (BSS)',
  },
  {
    name: 'Africa & Sub-Saharan Markets',
    countries: 'Kenya, Nigeria, Ghana, Tanzania, Uganda, South Africa',
    hubs: 'East Africa Distribution Center — Nairobi, Kenya',
    focus: 'Affordable clinical eye drops, anti-fungal ophthalmic solutions',
  },
  {
    name: 'Central Asia & CIS Countries',
    countries: 'Uzbekistan, Kazakhstan, Azerbaijan, Armenia, Georgia',
    hubs: 'CIS Logistics Node — Tashkent',
    focus: 'Specialty ophthalmic formulations, intraocular viscosurgical devices',
  },
];

const FACILITIES = [
  {
    name: 'Corporate Headquarters & Executive Office',
    location: '3rd Floor, S G Business Hub, Ahmedabad, Gujarat, India',
    type: 'Commercial Operations & Global Strategy',
    detail: 'Oversees global regulatory submissions, strategic partnerships, corporate finance, and commercial supply chain across all international territories.',
    badge: 'HQ Office',
  },
  {
    name: 'Aseptic Ophthalmic Formulation Suite',
    location: 'Sanand Industrial Estate, Ahmedabad, Gujarat',
    type: 'Sterile Manufacturing & R&D Hub',
    detail: 'Equipped with ISO Class 5 sterile blow-fill-seal (BFS) machinery, automated liquid line filling, and state-of-the-art microbiology testing laboratories.',
    badge: 'WHO-GMP Certified',
  },
  {
    name: 'Cold-Chain Global Distribution Center',
    location: 'Sardar Vallabhbhai Patel International Air Cargo Zone, Ahmedabad',
    type: 'Global Logistics & Supply Chain',
    detail: 'GDP-certified temperature-controlled storage (2°C–8°C and 15°C–25°C) guaranteeing end-to-end potency preservation for sensitive ocular biotics.',
    badge: 'Cold-Chain Hub',
  },
];

export default function OurPresencePage() {
  return (
    <div className="min-h-screen flex flex-col bg-[#F8F9FA]">
      <Navbar />

      <main className="flex-1 pt-24 tablet:pt-32 pb-24">
        {/* Hero Section */}
        <section className="relative px-6 py-16 tablet:py-24 bg-gradient-to-b from-[#08356A] to-[#0B4A8F] text-white overflow-hidden">
          <div className="absolute inset-0 opacity-10 bg-[radial-gradient(#E8F1F9_1px,transparent_1px)] [background-size:24px_24px]" />

          <div className="relative max-w-7xl mx-auto">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 border border-white/15 text-xs uppercase tracking-widest text-[#D7262E] font-semibold">
              <Globe size={14} /> Global Footprint &amp; Facility Network
            </div>
            <h1 className="font-heading font-bold text-4xl sm:text-5xl tablet:text-6xl text-white mt-4 tracking-tight max-w-3xl">
              Our Presence Across India and 47+ International Markets
            </h1>
            <p className="font-sans text-lg text-white/80 mt-6 max-w-2xl leading-relaxed">
              Headquartered at S G Business Hub in Ahmedabad, Gujarat, Revora combines Indian formulation engineering with an international distribution infrastructure trusted by ophthalmologists worldwide.
            </p>

            {/* Quick Stats Grid */}
            <div className="grid grid-cols-2 tablet:grid-cols-4 gap-4 mt-10">
              <div className="bg-white/10 backdrop-blur-sm rounded-xl p-4 border border-white/15">
                <span className="font-heading font-bold text-3xl tablet:text-4xl text-white">47+</span>
                <p className="font-sans text-xs text-white/70 uppercase tracking-wider mt-1">Export Destinations</p>
              </div>
              <div className="bg-white/10 backdrop-blur-sm rounded-xl p-4 border border-white/15">
                <span className="font-heading font-bold text-3xl tablet:text-4xl text-[#D7262E]">2.8M+</span>
                <p className="font-sans text-xs text-white/70 uppercase tracking-wider mt-1">Patients Reached</p>
              </div>
              <div className="bg-white/10 backdrop-blur-sm rounded-xl p-4 border border-white/15">
                <span className="font-heading font-bold text-3xl tablet:text-4xl text-white">850+</span>
                <p className="font-sans text-xs text-white/70 uppercase tracking-wider mt-1">Formulations Supplied</p>
              </div>
              <div className="bg-white/10 backdrop-blur-sm rounded-xl p-4 border border-white/15">
                <span className="font-heading font-bold text-3xl tablet:text-4xl text-white">15+</span>
                <p className="font-sans text-xs text-white/70 uppercase tracking-wider mt-1">Years of Excellence</p>
              </div>
            </div>
          </div>
        </section>

        {/* Core Facilities Spotlight */}
        <section id="ahmedabad" className="max-w-7xl mx-auto px-6 py-20">
          <div className="text-center max-w-2xl mx-auto mb-14">
            <span className="font-sans font-semibold text-xs uppercase tracking-[0.25em] text-[#D7262E]">
              Operational Infrastructure
            </span>
            <h2 className="font-heading font-bold text-3xl tablet:text-4xl text-[#1E2428] mt-2 tracking-tight">
              State-of-the-Art Facilities in Gujarat, India
            </h2>
            <p className="font-sans text-sm text-[#1E2428]/70 mt-3">
              Precision manufacturing under WHO-GMP standards with continuous validation and cold-chain compliance.
            </p>
          </div>

          <div className="grid grid-cols-1 tablet:grid-cols-3 gap-8">
            {FACILITIES.map((facility) => (
              <div
                key={facility.name}
                className="bg-white rounded-2xl border border-[#D9DFE8] p-8 hover:shadow-xl hover:border-[#0B4A8F] transition-all flex flex-col justify-between"
              >
                <div>
                  <span className="inline-block px-3 py-1 rounded-full text-xs font-semibold uppercase tracking-wider bg-[#E8F1F9] text-[#0B4A8F] mb-4">
                    {facility.badge}
                  </span>
                  <h3 className="font-heading font-bold text-xl text-[#1E2428] tracking-tight">
                    {facility.name}
                  </h3>
                  <div className="flex items-start gap-2 mt-3 text-xs text-[#D7262E] font-medium">
                    <MapPin size={14} className="shrink-0 mt-0.5" />
                    <span>{facility.location}</span>
                  </div>
                  <p className="font-sans text-xs text-[#0B4A8F] font-semibold mt-2">
                    {facility.type}
                  </p>
                  <p className="font-sans text-sm text-[#1E2428]/75 mt-3 leading-relaxed">
                    {facility.detail}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Global Distribution Regions */}
        <section id="global" className="bg-white border-y border-[#D9DFE8] py-20 px-6">
          <div className="max-w-7xl mx-auto">
            <div className="flex flex-col tablet:flex-row tablet:items-end justify-between gap-6 mb-12">
              <div>
                <span className="font-sans font-semibold text-xs uppercase tracking-[0.25em] text-[#0B4A8F]">
                  International Territories
                </span>
                <h2 className="font-heading font-bold text-3xl tablet:text-4xl text-[#1E2428] mt-2 tracking-tight">
                  Global Export Network &amp; Regional Hubs
                </h2>
              </div>
              <p className="font-sans text-sm text-[#1E2428]/70 max-w-md">
                Revora partners with licensed pharmaceutical distributors and health ministries to ensure prompt supply chain continuity.
              </p>
            </div>

            <div className="grid grid-cols-1 tablet:grid-cols-2 desktop:grid-cols-3 gap-6">
              {REGIONS.map((reg) => (
                <div
                  key={reg.name}
                  className="bg-[#F8F9FA] rounded-xl border border-[#D9DFE8] p-6 hover:border-[#0B4A8F] transition-all"
                >
                  <div className="flex items-center justify-between">
                    <h3 className="font-heading font-bold text-lg text-[#0B4A8F]">
                      {reg.name}
                    </h3>
                    <Globe size={18} className="text-[#0B4A8F]/40" />
                  </div>
                  <p className="font-sans text-xs text-[#1E2428]/60 mt-1">{reg.hubs}</p>
                  <div className="mt-4 pt-3 border-t border-[#D9DFE8]/60">
                    <p className="font-sans text-xs font-semibold text-[#1E2428] mb-1">Supplied Markets:</p>
                    <p className="font-sans text-xs text-[#1E2428]/70">{reg.countries}</p>
                  </div>
                  <div className="mt-3">
                    <p className="font-sans text-xs font-semibold text-[#D7262E] mb-1">Key Therapeutic Focus:</p>
                    <p className="font-sans text-xs text-[#1E2428]/70">{reg.focus}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Global Partnership CTA */}
        <section className="max-w-7xl mx-auto px-6 pt-20">
          <div className="bg-[#1E2428] rounded-3xl p-10 tablet:p-14 text-white flex flex-col tablet:flex-row items-center justify-between gap-8 relative overflow-hidden">
            <div className="relative max-w-xl">
              <span className="font-sans text-xs uppercase tracking-widest text-[#D7262E] font-semibold">
                International Distribution &amp; Licensing
              </span>
              <h3 className="font-heading font-bold text-2xl tablet:text-4xl text-white mt-2">
                Become a Revora Distribution Partner in Your Country
              </h3>
              <p className="font-sans text-sm text-white/70 mt-3">
                We offer exclusive country distributorships, ready-to-file CTD/eCTD dossiers, bioequivalence data, and full regulatory documentation support for expedited local registration.
              </p>
            </div>
            <Link
              href="/#contact"
              className="relative shrink-0 px-8 py-4 rounded-full bg-[#0B4A8F] hover:bg-[#08356A] text-white font-semibold text-sm transition-all border border-white/20 shadow-lg"
            >
              Contact Global Business Team
            </Link>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}

