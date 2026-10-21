'use client';

import { useRef } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { motion, useScroll, useTransform, useReducedMotion } from 'framer-motion';
import { AlertCircle, ArrowUpRight, Award, Building2, Globe, Mail, MapPin, Phone, ShieldCheck } from 'lucide-react';
import { AnchorLink, Magnetic, Tick } from '@/components/ui/primitives';

const COLUMNS: { title: string; href?: string; links: [string, string][] }[] = [
  {
    title: 'Therapeutic Areas',
    href: '/our-offerings',
    links: [
      ['Anti-Infective & Anti-Inflammatory', '/our-offerings/anti-infectives'],
      ['Dry Eye & Tear Substitutes', '/our-offerings/dry-eye-lubricants'],
      ['Ophthalmic NSAIDs & Cataract', '/our-offerings/nsaids-surgical'],
      ['Retinal Vitality & Nutrition', '/our-offerings/retinal-nutrition'],
      ['View All Products & Formularies', '/our-offerings'],
    ],
  },
  {
    title: 'Quality & Compliance',
    links: [
      ['WHO-GMP Certified Facility', '/certifications'],
      ['Sterile Formulation Suites', '/#plant'],
      ['Analytical Testing & Stability', '/#plant'],
      ['ICH Q1 Compliance', '/#plant'],
      ['Cold-Chain Logistics', '/#plant'],
    ],
  },
  {
    title: 'Corporate & Trade',
    links: [
      ['Ahmedabad Headquarters', '/our-presence/ahmedabad'],
      ['Our Presence Across India', '/our-presence/domestic-network'],
      ['Careers at Revora', '/careers'],
      ['Distribution Partnerships', '/#contact'],
      ['Institutional Inquiries', '/#contact'],
    ],
  },
];

const BADGES = [
  { icon: ShieldCheck, label: 'WHO-GMP' },
  { icon: Award, label: 'ISO 9001:2015' },
  { icon: Globe, label: 'Serving Across India' },
];

const LEGAL = ['Privacy Policy', 'Terms of Use', 'Pharmacovigilance Policy'];

function FooterLink({ label, href }: { label: string; href: string }) {
  const cls = 'group -my-1.5 inline-flex min-h-9 items-center gap-2 text-white/70 transition-colors hover:text-white';
  const inner = (
    <>
      <Tick className="h-2.5 w-3 -translate-x-2 text-revora-crimson opacity-0 transition-all duration-300 group-hover:translate-x-0 group-hover:opacity-100" />
      {label}
    </>
  );
  return href.startsWith('mailto:') ? (
    <a href={href} className={cls}>
      {inner}
    </a>
  ) : (
    <AnchorLink href={href} className={cls}>
      {inner}
    </AnchorLink>
  );
}

export function Footer() {
  const ref = useRef<HTMLElement>(null);
  const reduce = useReducedMotion();
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start end', 'end end'] });
  const wordY = useTransform(scrollYProgress, [0, 0.9], ['30%', '0%']);

  return (
    <footer ref={ref} className="relative overflow-hidden bg-revora-slate text-white">
      <div className="mx-auto max-w-330 px-5 pt-16 tablet:px-8 tablet:pt-24">
        {/* ── pharmacovigilance & patient safety ── */}
        <div className="flex flex-col gap-4 rounded-[28px] border border-white/10 bg-white/4 p-6 tablet:flex-row tablet:items-center tablet:justify-between tablet:p-7">
          <div className="flex items-start gap-4">
            <span className="grid h-10 w-10 shrink-0 place-items-center rounded-2xl bg-revora-crimson/15 text-revora-crimson-light">
              <AlertCircle className="h-5 w-5" />
            </span>
            <p className="max-w-3xl font-sans text-[14px] leading-[1.7] text-white/70">
              <span className="font-semibold text-white">Pharmacovigilance &amp; Patient Safety. </span>
              To report an adverse drug reaction (ADR) or product quality issue, please contact our Drug Safety Team at{' '}
              <a href="mailto:safety@revorahealthcare.com" className="font-medium text-revora-cobalt-light hover:underline">
                safety@revorahealthcare.com
              </a>{' '}
              or call our 24/7 dedicated safety desk.
            </p>
          </div>
          <span className="shrink-0 rounded-full border border-white/15 bg-white/10 px-5 py-2.5 text-center font-sans text-[13px] font-semibold">
            Toll-Free ADR Line: 1800-489-REVORA
          </span>
        </div>

        {/* ── company + link columns ── */}
        <div className="mt-16 grid gap-12 tablet:grid-cols-2 desktop:grid-cols-[1.5fr_1fr_1fr_1fr]">
          <div>
            {/* logo stays in its original colours on a white tile */}
            <span className="inline-block rounded-2xl bg-white px-5 py-3.5">
              <Image src="/logo.png" alt="Revora" width={1024} height={341} className="h-8 w-auto" />
            </span>
            <p className="mt-6 max-w-sm font-sans text-[14.5px] leading-[1.7] text-white/65">
              Revora Healthcare Private Limited is a trusted pharmaceutical company in Ahmedabad, Gujarat, specializing in ophthalmic
              pharmaceuticals and expanding into specialty healthcare products and medical devices — reliable solutions for doctors, hospitals,
              pharmacies, and distributors.
            </p>

            <ul className="mt-6 space-y-3 font-sans text-[13.5px] leading-[1.6] text-white/70">
              <li className="flex gap-3">
                <Building2 className="mt-0.5 h-4 w-4 shrink-0 text-white/40" />
                <span className="font-mono text-[12.5px]">CIN: U21000GJ2026PTC174674</span>
              </li>
              <li className="flex gap-3">
                <MapPin className="mt-0.5 h-4 w-4 shrink-0 text-white/40" />
                Registered Office: 3rd Floor, S.G. Business Hub, A/303, Sarkhej–Gandhinagar Highway, near Gota Overbridge, Ognaj, Ahmedabad,
                Gujarat 380060, India.
              </li>
              <li className="flex gap-3">
                <Phone className="mt-0.5 h-4 w-4 shrink-0 text-white/40" />
                <a href="tel:+919876543210" className="hover:text-white">
                  Boardline: +91 (079) 4890-REVORA
                </a>
              </li>
              <li className="flex gap-3">
                <Mail className="mt-0.5 h-4 w-4 shrink-0 text-white/40" />
                <a href="mailto:info@revorahealthcare.com" className="hover:text-white">
                  info@revorahealthcare.com
                </a>
              </li>
            </ul>

            <div className="mt-6 flex flex-wrap gap-2">
              {BADGES.map((b) => (
                <span
                  key={b.label}
                  className="inline-flex items-center gap-1.5 rounded-full border border-white/10 bg-white/5 px-3 py-1.5 font-sans text-[12px] text-white/80"
                >
                  <b.icon className="h-3.5 w-3.5 text-revora-cobalt-light" />
                  {b.label}
                </span>
              ))}
            </div>

            <Magnetic className="mt-8">
              <AnchorLink
                href="/#contact"
                className="group inline-flex items-center gap-3 rounded-full bg-revora-crimson py-3 pl-6 pr-3 font-sans text-[14px] font-semibold text-white"
              >
                Partner with Revora
                <span className="grid h-8 w-8 place-items-center rounded-full bg-white/15 transition-transform duration-500 group-hover:rotate-45">
                  <ArrowUpRight className="h-4 w-4" />
                </span>
              </AnchorLink>
            </Magnetic>
          </div>

          {COLUMNS.map((col) => (
            <div key={col.title}>
              {col.href ? (
                <Link
                  href={col.href}
                  className="-my-3 flex h-10 w-fit items-center gap-1.5 font-sans text-[11px] font-semibold uppercase tracking-[0.18em] text-white/45 transition-colors hover:text-white"
                >
                  {col.title} <ArrowUpRight className="h-3 w-3" />
                </Link>
              ) : (
                <p className="flex h-4 items-center font-sans text-[11px] font-semibold uppercase tracking-[0.18em] text-white/45">{col.title}</p>
              )}
              <ul className="mt-5 space-y-3 font-sans text-[14.5px]">
                {col.links.map(([label, href]) => (
                  <li key={label}>
                    <FooterLink label={label} href={href} />
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* ── statutory notice ── */}
        <p className="mt-16 border-t border-white/10 pt-8 font-sans text-[12px] leading-[1.75] text-white/45">
          <span className="font-semibold text-white/60">Statutory Notice: </span>
          The information contained on this website is intended solely for healthcare professionals, registered medical practitioners, and
          authorized distribution partners. It is provided for informational and educational purposes only and should not be construed as medical
          diagnosis, prescription advice, or a treatment recommendation. All pharmaceutical products mentioned herein are subject to regulatory
          clearance in their respective jurisdictions and must be administered strictly in compliance with applicable laws and physician guidance.
        </p>

        {/* ── bottom bar ── */}
        <div className="mt-8 flex flex-wrap items-center justify-between gap-x-10 gap-y-4 border-t border-white/10 py-6 font-sans text-[12px] text-white/45">
          <div className="space-y-1.5">
            <p>© 2026 Revora Healthcare Private Limited. All rights reserved. S.G. Business Hub, Ognaj, Ahmedabad, Gujarat, India.</p>
            <p>
              Designed &amp; built by{' '}
              <a
                href="https://www.hntech.in/"
                target="_blank"
                rel="noopener noreferrer"
                className="font-semibold text-white/70 underline-offset-4 transition-colors hover:text-white hover:underline"
              >
                HN Tech
              </a>
            </p>
          </div>
          <div className="-my-2 flex flex-wrap items-center gap-x-5 [&_a]:inline-flex [&_a]:min-h-10 [&_a]:items-center">
            <Link href="/our-offerings" className="transition-colors hover:text-white">Products</Link>
            <Link href="/our-presence" className="transition-colors hover:text-white">Presence</Link>
            <Link href="/careers" className="transition-colors hover:text-white">Careers</Link>
            <span className="text-white/20">|</span>
            {LEGAL.map((l) => (
              <a key={l} href="#" className="transition-colors hover:text-white">
                {l}
              </a>
            ))}
          </div>
        </div>
      </div>

      {/* oversized wordmark rising into view */}
      <div aria-hidden className="pointer-events-none select-none overflow-hidden">
        <motion.p
          style={reduce ? undefined : { y: wordY }}
          className="mt-[-0.1em] pb-[0.08em] text-center font-heading text-[clamp(5.5rem,21vw,20rem)] font-extrabold leading-[0.9] tracking-[-0.04em] text-white/5"
        >
          revora
        </motion.p>
      </div>
    </footer>
  );
}
