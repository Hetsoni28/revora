'use client';

import Link from 'next/link';
import { Navbar } from '@/components/layout/navbar';
import { Footer } from '@/components/layout/footer';
import { Building2, Hospital, MapPin, Pill, Stethoscope, Truck } from 'lucide-react';

const STATS = [
  { value: '2026', label: 'Incorporated in Ahmedabad' },
  { value: '9', label: 'Ophthalmic Brands' },
  { value: '4', label: 'Therapy Areas' },
  { value: '1', label: 'Dedicated Eye-Drop Plant' },
];

const FACILITIES = [
  {
    name: 'Corporate Headquarters & Registered Office',
    location: '3rd Floor, S.G. Business Hub, A/303, Sarkhej–Gandhinagar Highway, near Gota Overbridge, Ognaj, Ahmedabad, Gujarat 380060',
    type: 'Corporate & Commercial Operations',
    detail: 'Our Ahmedabad office leads sales, distribution and partnerships with doctors, hospitals, pharmacies and distributors across India.',
    badge: 'Registered Office',
  },
  {
    name: 'Ophthalmic Manufacturing Plant',
    location: 'Paonta Sahib, Himachal Pradesh',
    type: 'Dedicated Eye-Drop Manufacturing',
    detail: 'Revora eye drops are made in our own dedicated eye-drop plant — WHO-GMP certified and EU-compliant — so quality stays in our hands.',
    badge: 'WHO-GMP Certified',
  },
];

const AUDIENCES = [
  {
    icon: Stethoscope,
    name: 'Doctors & Ophthalmologists',
    detail: 'Reliable ophthalmic formulations, product literature and medical representative support for prescribers.',
  },
  {
    icon: Hospital,
    name: 'Hospitals & Eye Clinics',
    detail: 'A focused portfolio spanning anti-infectives, tear substitutes, post-surgical NSAIDs and retinal nutrition.',
  },
  {
    icon: Pill,
    name: 'Pharmacies',
    detail: 'Premium, recognisable cartons and consistent supply for the pharmacies that serve patients every day.',
  },
  {
    icon: Truck,
    name: 'Distributors & Stockists',
    detail: 'Partnerships that bring a dedicated ophthalmic portfolio to new territories across India.',
  },
];

export default function OurPresencePage() {
  return (
    <div className="min-h-screen flex flex-col bg-[#F8F9FA]">
      <Navbar />

      <main className="flex-1 pb-24">
        {/* Hero Section */}
        <section className="relative px-6 pt-32 pb-16 tablet:pt-40 tablet:pb-24 bg-gradient-to-b from-revora-cobalt-dark to-revora-cobalt text-white overflow-hidden">

          <div className="relative max-w-7xl mx-auto">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 border border-white/15 text-xs uppercase tracking-widest text-white font-semibold">
              <MapPin size={14} className="text-revora-crimson" /> Headquartered in Ahmedabad, Gujarat
            </div>
            <h1 className="font-heading font-bold text-4xl sm:text-5xl tablet:text-6xl text-white mt-4 tracking-tight max-w-3xl">
              Our Presence Across India
            </h1>
            <p className="font-sans text-lg text-white/80 mt-6 max-w-2xl leading-relaxed">
              From our office at S.G. Business Hub in Ahmedabad, Revora Healthcare develops reliable ophthalmic solutions for doctors, hospitals,
              pharmacies and distributors — improving patient care and building healthier communities across India.
            </p>

            {/* Quick Stats Grid */}
            <div className="grid grid-cols-2 tablet:grid-cols-4 gap-4 mt-10">
              {STATS.map((s) => (
                <div key={s.label} className="bg-white/10 backdrop-blur-sm rounded-xl p-4 border border-white/15">
                  <span className="font-heading font-bold text-3xl tablet:text-4xl text-white">{s.value}</span>
                  <p className="font-sans text-xs text-white/70 uppercase tracking-wider mt-1">{s.label}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Facilities */}
        <section id="ahmedabad" className="max-w-7xl mx-auto px-6 py-20">
          <div className="text-center max-w-2xl mx-auto mb-14">
            <span className="font-sans font-semibold text-xs uppercase tracking-[0.25em] text-revora-crimson">
              Our Facilities
            </span>
            <h2 className="font-heading font-bold text-3xl tablet:text-4xl text-revora-slate mt-2 tracking-tight">
              Where We Operate
            </h2>
            <p className="font-sans text-sm text-revora-slate/70 mt-3">
              A corporate office in Ahmedabad, Gujarat and a dedicated ophthalmic manufacturing plant in Himachal Pradesh.
            </p>
          </div>

          <div className="grid grid-cols-1 tablet:grid-cols-2 gap-8">
            {FACILITIES.map((facility) => (
              <div
                key={facility.name}
                className="bg-white rounded-2xl border border-[#D9DFE8] p-8 hover:shadow-xl hover:border-revora-cobalt transition-all flex flex-col justify-between"
              >
                <div>
                  <span className="inline-block px-3 py-1 rounded-full text-xs font-semibold uppercase tracking-wider bg-revora-sky text-revora-cobalt mb-4">
                    {facility.badge}
                  </span>
                  <h3 className="font-heading font-bold text-xl text-revora-slate tracking-tight">
                    {facility.name}
                  </h3>
                  <div className="flex items-start gap-2 mt-3 text-xs text-revora-crimson font-medium">
                    <MapPin size={14} className="shrink-0 mt-0.5" />
                    <span>{facility.location}</span>
                  </div>
                  <p className="font-sans text-xs text-revora-cobalt font-semibold mt-2">
                    {facility.type}
                  </p>
                  <p className="font-sans text-sm text-revora-slate/75 mt-3 leading-relaxed">
                    {facility.detail}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Who we serve across India */}
        <section id="domestic" className="bg-white border-y border-[#D9DFE8] py-20 px-6">
          <div className="max-w-7xl mx-auto">
            <div className="flex flex-col tablet:flex-row tablet:items-end justify-between gap-6 mb-12">
              <div>
                <span className="font-sans font-semibold text-xs uppercase tracking-[0.25em] text-revora-cobalt">
                  Domestic Network
                </span>
                <h2 className="font-heading font-bold text-3xl tablet:text-4xl text-revora-slate mt-2 tracking-tight">
                  Who We Serve Across India
                </h2>
              </div>
              <p className="font-sans text-sm text-revora-slate/70 max-w-md">
                Specializing in ophthalmic pharmaceuticals and expanding into specialty healthcare products and medical devices, we build lasting
                relationships with every link in the eye-care chain.
              </p>
            </div>

            <div className="grid grid-cols-1 tablet:grid-cols-2 desktop:grid-cols-4 gap-6">
              {AUDIENCES.map((a) => (
                <div
                  key={a.name}
                  className="bg-[#F8F9FA] rounded-xl border border-[#D9DFE8] p-6 hover:border-revora-cobalt transition-all"
                >
                  <span className="grid h-11 w-11 place-items-center rounded-xl bg-revora-sky text-revora-cobalt">
                    <a.icon size={20} />
                  </span>
                  <h3 className="font-heading font-bold text-lg text-revora-slate mt-4">{a.name}</h3>
                  <p className="font-sans text-sm text-revora-slate/70 mt-2 leading-relaxed">{a.detail}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Partnership CTA */}
        <section className="max-w-7xl mx-auto px-6 pt-20">
          <div className="bg-revora-slate rounded-3xl p-10 tablet:p-14 text-white flex flex-col tablet:flex-row items-center justify-between gap-8 relative overflow-hidden">
            <div className="relative max-w-xl">
              <span className="inline-flex items-center gap-2 font-sans text-xs uppercase tracking-widest text-revora-crimson font-semibold">
                <Building2 size={14} /> Distribution Partnerships
              </span>
              <h3 className="font-heading font-bold text-2xl tablet:text-4xl text-white mt-2">
                Become a Revora Distribution Partner in Your Territory
              </h3>
              <p className="font-sans text-sm text-white/70 mt-3">
                Partner with Revora to bring a dedicated ophthalmic portfolio to the doctors, hospitals and pharmacies in your region.
              </p>
            </div>
            <Link
              href="/#contact"
              className="relative shrink-0 px-8 py-4 rounded-full bg-revora-cobalt hover:bg-revora-cobalt-dark text-white font-semibold text-sm transition-all border border-white/20 shadow-lg"
            >
              Contact Our Business Team
            </Link>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
