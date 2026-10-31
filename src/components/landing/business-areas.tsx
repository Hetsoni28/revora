'use client';

import Link from 'next/link';
import { ArrowUpRight, Factory, Globe2, ShieldCheck, Stethoscope } from 'lucide-react';
import { FadeUp } from '@/components/ui/primitives';
import { SectionHeading } from '@/components/ui/section-heading';

const AREAS = [
  { icon: Stethoscope, title: 'India Business', text: 'Specialty brands for doctors, hospitals and pharmacies.', href: '/profile#portfolio' },
  { icon: ShieldCheck, title: 'Institutional & Defence', text: 'Reliable supply where failure is not an option.', href: '/our-presence/domestic-network' },
  { icon: Factory, title: 'Manufacturing & CDMO', text: 'WHO-GMP manufacturing for partners.', href: '/manufacturing' },
  { icon: Globe2, title: 'International Business', text: 'Export partnerships across Asia and Africa.', href: '/our-presence/global-network' },
];

/** The four business areas, side by side. */
export function BusinessAreas() {
  return (
    <section id="business" className="bg-white px-5 py-24 tablet:px-8 tablet:py-32">
      <div className="mx-auto max-w-[1320px]">
        <SectionHeading eyebrow="Business areas" lines={['Four ways Revora', 'creates value.']} highlight={{ value: 'text-revora-cobalt', 'value.': 'text-revora-cobalt' }} />
        <div className="mt-12 grid gap-4 tablet:grid-cols-2 desktop:grid-cols-4">
          {AREAS.map((a, i) => (
            <FadeUp key={a.title} delay={i * 0.08}>
              <Link
                href={a.href}
                className="group flex h-full flex-col rounded-[24px] border border-revora-cobalt/10 bg-[#F6F9FC] p-7 transition-shadow duration-500 hover:shadow-[0_24px_50px_-28px_rgba(11,74,143,0.45)]"
              >
                <span className="grid h-12 w-12 place-items-center rounded-2xl bg-white text-revora-cobalt shadow-sm transition-transform duration-500 group-hover:rotate-[-8deg]">
                  <a.icon className="h-5 w-5" />
                </span>
                <h3 className="mt-6 font-heading text-[1.35rem] font-extrabold leading-tight text-revora-slate">{a.title}</h3>
                <p className="mt-2 font-sans text-[15px] leading-[1.65] text-revora-slate-light">{a.text}</p>
                <ArrowUpRight className="mt-auto h-5 w-5 self-end pt-0 text-revora-cobalt transition-transform duration-500 group-hover:rotate-45" />
              </Link>
            </FadeUp>
          ))}
        </div>
      </div>
    </section>
  );
}
