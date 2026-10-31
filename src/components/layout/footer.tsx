'use client';

import { useRef } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { motion, useScroll, useTransform, useReducedMotion } from 'framer-motion';
import { AlertCircle, ArrowUpRight, Award, Building2, Globe, Mail, MapPin, Phone, ShieldCheck } from 'lucide-react';
import { SITE } from '@/lib/seo';
import { AnchorLink, Magnetic, Tick } from '@/components/ui/primitives';
import { CookieSettingsLink } from '@/components/consent/cookie-settings-link';

const COLUMNS: { title: string; href?: string; links: [string, string | null][] }[] = [
  {
    title: 'Our products',
    links: [
      ['Ophthalmology', '/profile#portfolio'],
      ['Orthopaedics', '/profile#portfolio'],
      ['Nutrition', '/profile#portfolio'],
      ['Thermal care', '/innovation'],
    ],
  },
  {
    title: 'Manufacturing & quality',
    links: [
      ['Manufacturing & CDMO', '/manufacturing'],
      ['WHO-GMP facility', '/certifications'],
      ['In-house QC lab', '/manufacturing'],
      ['Licences & registrations', '/certifications'],
    ],
  },
  {
    title: 'Corporate & Trade',
    links: [
      ['Domestic Network', '/our-presence/domestic-network'],
      ['Export', '/our-presence/global-network'],
      ['Ahmedabad Headquarters', '/our-presence#ahmedabad'],
      ['Innovation', '/innovation'],
      ['Channel Partner', '/channel-partner'],
      ['Careers at Revora', '/careers'],
      ['Contact Us', '/contact'],
    ],
  },
];

const BADGES = [
  { icon: ShieldCheck, label: 'WHO-GMP' },
  { icon: Award, label: 'Drug licence 20B · 21B' },
  { icon: Globe, label: 'Serving Across India' },
];

const LEGAL = [
  ['Privacy Policy', '/privacy-policy'],
  ['Terms of Use', '/terms-of-use'],
  ['Pharmacovigilance Policy', '/pharmacovigilance-policy'],
];

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
              To report an adverse drug reaction or product quality issue, contact our Drug Safety Team at{' '}
              <a href="mailto:safety@revorahealthcare.com" className="font-medium text-revora-cobalt-pale hover:underline">
                safety@revorahealthcare.com
              </a>{' '}
              or call{' '}
              <a href={SITE.phone.href} className="font-medium text-revora-cobalt-pale hover:underline">
                {SITE.phone.label}
              </a>
              .
            </p>
          </div>
          <a
            href="mailto:safety@revorahealthcare.com?subject=Adverse%20drug%20reaction%20report"
            className="shrink-0 rounded-full border border-white/15 bg-white/10 px-5 py-2.5 text-center font-sans text-[13px] font-semibold transition-colors hover:bg-white/15"
          >
            Report a side effect
          </a>
        </div>

        {/* ── company + link columns ── */}
        <div className="mt-16 grid gap-12 tablet:grid-cols-2 desktop:grid-cols-[1.5fr_1fr_1fr_1fr]">
          <div>
            {/* logo stays in its original colours on a white tile */}
            <span className="inline-block rounded-2xl bg-white px-5 py-3.5">
              <Image src="/logo.png" alt="Revora" width={1024} height={341} className="h-8 w-auto" />
            </span>
            <p className="mt-6 max-w-sm font-sans text-[14.5px] leading-[1.7] text-white/65">
              Revora Healthcare Pvt. Ltd. is an Ahmedabad-based pharmaceutical company that develops, manufactures and markets medicines across
              ophthalmology, orthopaedics, nutrition and thermal care, for India and the world.
            </p>

            <ul className="mt-6 space-y-3 font-sans text-[13.5px] leading-[1.6] text-white/70">
              <li className="flex gap-3">
                <Building2 className="mt-0.5 h-4 w-4 shrink-0 text-white/40" />
                <span className="font-mono text-[12.5px]">CIN: U21000GJ2026PTC174674 · GSTIN: {SITE.gstin}</span>
              </li>
              <li className="flex gap-3">
                <MapPin className="mt-0.5 h-4 w-4 shrink-0 text-white/40" />
                Registered Office: A-303, 3rd Floor, S.G. Business Hub, B/s Bhagvat Petrol Pump, Nr. Gota Over Bridge, S.G. Highway, Ahmedabad, Gujarat 382470, India.
              </li>
              <li className="flex gap-3">
                <Phone className="mt-0.5 h-4 w-4 shrink-0 text-white/40" />
                <a href={SITE.phone.href} className="inline-flex min-h-6 items-center hover:text-white">
                  Phone: {SITE.phone.label}
                </a>
              </li>
              <li className="flex gap-3">
                <Mail className="mt-0.5 h-4 w-4 shrink-0 text-white/40" />
                <a href="mailto:info@revorahealthcare.com" className="inline-flex min-h-6 items-center hover:text-white">
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
                href="/channel-partner"
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
                  className="-my-3 flex h-10 w-fit items-center gap-1.5 font-sans text-[11px] font-semibold uppercase tracking-[0.18em] text-white/70 transition-colors hover:text-white"
                >
                  {col.title} <ArrowUpRight className="h-3 w-3" />
                </Link>
              ) : (
                <p className="flex h-4 items-center font-sans text-[11px] font-semibold uppercase tracking-[0.18em] text-white/70">{col.title}</p>
              )}
              <ul className="mt-5 space-y-3 font-sans text-[14.5px]">
                {col.links.map(([label, href]) => (
                  <li key={label}>
                    {href ? <FooterLink label={label} href={href} /> : <span className="text-white/70">{label}</span>}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* ── statutory notice ── */}
        <p className="mt-16 border-t border-white/10 pt-8 font-sans text-[12px] leading-[1.75] text-white/70">
          <span className="font-semibold text-white/60">Statutory Notice: </span>
          The information contained on this website is intended solely for healthcare professionals, registered medical practitioners, and
          authorized distribution partners. It is provided for informational and educational purposes only and should not be construed as medical
          diagnosis, prescription advice, or a treatment recommendation. All pharmaceutical products mentioned herein are subject to regulatory
          clearance in their respective jurisdictions and must be administered strictly in compliance with applicable laws and physician guidance.
        </p>

        {/* ── bottom bar ── */}
        <div className="mt-8 flex flex-wrap items-center justify-between gap-x-10 gap-y-4 border-t border-white/10 py-6 font-sans text-[12px] text-white/70">
          <div className="space-y-1.5">
            <p>© 2026 Revora Healthcare Private Limited. All rights reserved. S.G. Business Hub, S.G. Highway, Ahmedabad, Gujarat, India.</p>
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
            <Link href="/profile#portfolio" className="transition-colors hover:text-white">Portfolio</Link>
            <Link href="/our-presence" className="transition-colors hover:text-white">Presence</Link>
            <Link href="/manufacturing" className="transition-colors hover:text-white">Manufacturing</Link>
            <Link href="/innovation" className="transition-colors hover:text-white">Innovation</Link>
            <Link href="/channel-partner" className="transition-colors hover:text-white">Channel Partner</Link>
            <Link href="/careers" className="transition-colors hover:text-white">Careers</Link>
            <span className="text-white/20">|</span>
            {LEGAL.map(([label, href]) => (
              <Link key={href} href={href} className="transition-colors hover:text-white">
                {label}
              </Link>
            ))}
            <Link href="/cookie-policy" className="transition-colors hover:text-white">Cookie Policy</Link>
            <CookieSettingsLink className="inline-flex min-h-10 items-center transition-colors hover:text-white" />
          </div>
        </div>
      </div>

      {/* oversized wordmark rising into view */}
      <div aria-hidden className="pointer-events-none select-none overflow-hidden">
        <motion.p
          style={reduce ? undefined : { y: wordY }}
          className="mt-[-0.1em] pb-[0.08em] text-center font-heading text-[clamp(4rem,13vw,11rem)] font-extrabold leading-[0.9] tracking-[-0.04em] text-white/[0.07]"
        >
          revora
        </motion.p>
      </div>
    </footer>
  );
}
