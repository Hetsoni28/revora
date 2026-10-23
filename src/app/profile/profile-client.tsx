'use client';

import Image from 'next/image';
import { motion, useReducedMotion } from 'framer-motion';
import { Building2, CalendarDays, Factory, FileText, Globe2, Layers, Mail, MapPin, ShieldCheck, Sparkles } from 'lucide-react';
import { expoOut } from '@/lib/easings';
import { INNOVATION_CATEGORIES } from '@/lib/innovation-products';
import type { Catalogue } from '@/lib/catalogue';
import { useCatalogue } from '@/components/catalogue/catalogue-context';
import { Counter, FadeUp } from '@/components/ui/primitives';
import { PageHero } from '@/components/ui/page-hero';
import { SectionHeading } from '@/components/ui/section-heading';
import { Button } from '@/components/ui/button';

const EMAIL = 'info@revorahealthcare.com';
const REQUEST = `mailto:${EMAIL}?subject=${encodeURIComponent('Request for company profile')}`;

const atAGlance = ({ products, categories, innovation }: Catalogue) => [
  { value: products.length, label: 'Eye-care brands' },
  { value: categories.length, label: 'Therapy areas' },
  { value: innovation.length, label: 'Innovation products' },
  { value: 2, label: 'Locations' },
];

const DETAILS = [
  { icon: Building2, k: 'Company', v: 'Revora Healthcare Private Limited' },
  { icon: FileText, k: 'CIN', v: 'U21000GJ2026PTC174674', mono: true },
  { icon: CalendarDays, k: 'Incorporated', v: '10 March 2026' },
  { icon: Globe2, k: 'Market', v: 'Across India' },
  { icon: Factory, k: 'Manufacturing', v: 'Paonta Sahib, Himachal Pradesh' },
  { icon: ShieldCheck, k: 'Quality', v: 'WHO-GMP · ISO 9001:2015' },
  { icon: MapPin, k: 'Registered office', v: '3rd Floor, S.G. Business Hub, A/303, Sarkhej–Gandhinagar Highway, near Gota Overbridge, Ognaj, Ahmedabad, Gujarat 380060', wide: true },
  { icon: Mail, k: 'Email', v: EMAIL, wide: true },
];

const businessFor = (brands: number, areas: number) => [
  { icon: Layers, title: 'Ophthalmic pharmaceuticals', text: `${brands} brands across ${areas} therapy areas.`, tag: 'Core' },
  { icon: Sparkles, title: 'Innovation products', text: 'Warmers, cooling and field-care products.', tag: 'Growing' },
  { icon: ShieldCheck, title: 'Specialty healthcare & devices', text: 'Expanding into new categories.', tag: 'Expanding' },
];

const portfolioRows = ({ products, categories, innovation }: Catalogue) => [
  ...categories.map((c) => ({
    area: c.shortName,
    innovation: false,
    items: products.filter((p) => p.categorySlug === c.slug).map((p) => ({ label: p.name, href: `/products/${p.id}` })),
  })),
  ...INNOVATION_CATEGORIES.map((cat) => ({
    area: cat,
    innovation: true,
    items: innovation.filter((p) => p.category === cat).map((p) => ({ label: [p.name, p.accent].filter(Boolean).join(' '), href: `/innovation/${p.id}` })),
  })),
];

export function ProfileClient() {
  const reduce = useReducedMotion();
  const catalogue = useCatalogue();
  const AT_A_GLANCE = atAGlance(catalogue);
  const BUSINESS = businessFor(catalogue.products.length, catalogue.categories.length);
  const PORTFOLIO = portfolioRows(catalogue);
  return (
    <>
      <PageHero
        backdrop="/images/heroes/hero-profile.webp"
        crumbs={[{ label: 'Home', href: '/' }, { label: 'About Us', href: '/about' }, { label: 'Profile' }]}
        eyebrow="Company profile"
        lines={['Revora at', 'a glance.']}
        highlight={{ 'glance.': 'text-revora-cobalt' }}
        text="The key facts about Revora Healthcare Private Limited, in one place."
        actions={
          <>
            <Button href={REQUEST} arrow="up-right" magnetic icon={<Mail />}>Request profile</Button>
            <Button href="/about" variant="outline">Our story</Button>
          </>
        }
        visual={
          /* ID-card style summary */
          <motion.div
            initial={reduce ? false : { opacity: 0, y: 40, rotate: -2 }}
            animate={{ opacity: 1, y: 0, rotate: 0 }}
            transition={{ duration: 1.1, delay: 0.2, ease: expoOut }}
            className="relative isolate mx-auto w-full max-w-130 overflow-hidden rounded-[28px] bg-revora-cobalt-deep p-8 text-white shadow-[0_40px_80px_-40px_rgba(11,74,143,0.6)] tablet:rounded-[32px] tablet:p-10"
          >
            <div aria-hidden className="absolute inset-0 -z-10 bg-[radial-gradient(ellipse_at_top_right,rgba(58,130,200,0.55),transparent_60%),radial-gradient(ellipse_at_bottom_left,rgba(215,38,46,0.22),transparent_55%)]" />
            <div className="flex items-center justify-between gap-4">
              <span className="rounded-2xl bg-white px-4 py-2.5">
                <Image src="/logo.png" alt="Revora" width={1024} height={341} loading="eager" className="h-7 w-auto" />
              </span>
              <span className="rounded-full bg-white/10 px-3 py-1.5 font-sans text-[11px] font-semibold uppercase tracking-[0.16em] text-revora-cobalt-pale">Est. 2026</span>
            </div>
            <p className="mt-10 font-heading text-[clamp(1.4rem,2.4vw,1.8rem)] font-extrabold leading-tight">Revora Healthcare Private Limited</p>
            <p className="mt-1 font-sans text-[14px] text-white/70">Healthcare — Beyond the Cure</p>
            <dl className="mt-8 grid grid-cols-2 gap-4 border-t border-white/10 pt-6">
              {AT_A_GLANCE.map((s) => (
                <div key={s.label}>
                  <dd className="font-heading text-3xl font-extrabold tracking-tight tablet:text-4xl"><Counter to={s.value} /></dd>
                  <dt className="mt-0.5 font-sans text-[12.5px] text-white/65">{s.label}</dt>
                </div>
              ))}
            </dl>
          </motion.div>
        }
      />

      {/* ── company details ── */}
      <section className="bg-white px-5 py-20 tablet:px-8 tablet:py-28">
        <div className="mx-auto max-w-330">
          <SectionHeading eyebrow="Company details" lines={['On the record.']} highlight={{ 'record.': 'text-revora-cobalt' }} />
          <div className="mt-12 grid gap-4 tablet:grid-cols-2">
            {DETAILS.map((d, i) => (
              <FadeUp key={d.k} delay={(i % 2) * 0.08} className={d.wide ? 'tablet:col-span-2' : undefined}>
                <div className="group flex h-full items-start gap-4 rounded-[22px] border border-revora-cobalt/10 bg-[#F6F9FC] p-6 transition-shadow duration-500 hover:shadow-[0_20px_44px_-26px_rgba(11,74,143,0.5)]">
                  <span className="grid h-11 w-11 shrink-0 place-items-center rounded-xl bg-white text-revora-cobalt shadow-sm transition-transform duration-500 group-hover:-rotate-6">
                    <d.icon className="h-5 w-5" />
                  </span>
                  <div className="min-w-0">
                    <p className="font-sans text-[11px] font-semibold uppercase tracking-[0.16em] text-revora-slate-muted">{d.k}</p>
                    <p className={`mt-1 wrap-break-word font-heading text-[16px] font-bold leading-snug text-revora-slate ${d.mono ? 'font-mono text-[15px]' : ''}`}>{d.v}</p>
                  </div>
                </div>
              </FadeUp>
            ))}
          </div>
        </div>
      </section>

      {/* ── what we do ── */}
      <section className="px-5 py-20 tablet:px-8 tablet:py-28">
        <div className="mx-auto max-w-330">
          <SectionHeading eyebrow="What we do" lines={['Three lines of business.']} highlight={{ 'business.': 'text-revora-crimson' }} />
          <div className="mt-12 grid gap-5 tablet:grid-cols-3">
            {BUSINESS.map((b, i) => (
              <FadeUp key={b.title} delay={i * 0.1}>
                <div className="group relative isolate flex h-full min-h-55 flex-col overflow-hidden rounded-[28px] border border-revora-cobalt/10 bg-white p-7">
                  <span aria-hidden className="absolute inset-0 -z-10 translate-y-full bg-revora-cobalt transition-transform duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:translate-y-0" />
                  <div className="flex items-start justify-between">
                    <span className="grid h-12 w-12 place-items-center rounded-2xl bg-revora-sky text-revora-cobalt transition-all duration-500 group-hover:rotate-[-8deg] group-hover:bg-white">
                      <b.icon className="h-5 w-5" />
                    </span>
                    <span className="rounded-full bg-revora-crimson-tint px-3 py-1 font-sans text-[11px] font-semibold uppercase tracking-[0.14em] text-revora-crimson-dark transition-colors duration-500 group-hover:bg-white/15 group-hover:text-white">{b.tag}</span>
                  </div>
                  <h3 className="mt-auto pt-10 font-heading text-[1.35rem] font-extrabold leading-tight text-revora-slate transition-colors duration-500 group-hover:text-white">{b.title}</h3>
                  <p className="mt-2 font-sans text-[14.5px] leading-[1.6] text-revora-slate-light transition-colors duration-500 group-hover:text-white/80">{b.text}</p>
                </div>
              </FadeUp>
            ))}
          </div>
        </div>
      </section>

      {/* ── portfolio at a glance ── */}
      <section id="portfolio" className="scroll-mt-32 bg-white px-5 py-20 tablet:px-8 tablet:py-28">
        <div className="mx-auto max-w-330">
          <SectionHeading eyebrow="Portfolio" lines={['Every product,', 'one table.']} highlight={{ 'one': 'text-revora-crimson' }} aside="Grouped by therapy area and range." />
          <FadeUp className="mt-12 overflow-hidden rounded-[28px] border border-revora-cobalt/10">
            {PORTFOLIO.map((row, i) => (
              <div
                key={row.area}
                className={`grid gap-3 p-5 tablet:grid-cols-[220px_1fr] tablet:items-center tablet:gap-8 tablet:px-8 tablet:py-6 ${i ? 'border-t border-revora-cobalt/10' : ''} ${row.innovation ? 'bg-revora-sky/50' : 'bg-[#F6F9FC]'}`}
              >
                <div>
                  <p className="font-sans text-[11px] font-semibold uppercase tracking-[0.16em] text-revora-slate-muted">{row.innovation ? 'Innovation' : 'Ophthalmic'}</p>
                  <p className="mt-0.5 font-heading text-[17px] font-extrabold text-revora-slate">{row.area}</p>
                </div>
                {!row.items.length && <p className="font-sans text-[14px] text-revora-slate-muted">Coming soon</p>}
                <ul className="flex flex-wrap gap-2">
                  {row.items.map((it) => (
                    <li key={it.label}>
                      <a href={it.href} className="inline-flex rounded-full border border-revora-cobalt/15 bg-white px-3.5 py-1.5 font-sans text-[13.5px] font-semibold text-revora-slate transition-colors hover:border-revora-cobalt hover:text-revora-cobalt">{it.label}</a>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </FadeUp>
        </div>
      </section>

      {/* ── request profile ── */}
      <section className="px-5 py-20 tablet:px-8 tablet:py-28">
        <FadeUp className="relative isolate mx-auto flex max-w-330 flex-col gap-8 overflow-hidden rounded-[32px] bg-revora-slate p-8 text-white tablet:p-14 desktop:flex-row desktop:items-center desktop:justify-between">
          <div aria-hidden className="absolute inset-0 -z-10 bg-[radial-gradient(ellipse_at_top_right,rgba(11,74,143,0.85),transparent_60%),radial-gradient(ellipse_at_bottom_left,rgba(215,38,46,0.22),transparent_55%)]" />
          <div>
            <h2 className="font-heading text-[clamp(1.8rem,3.6vw,2.8rem)] font-extrabold leading-[1.08] tracking-[-0.02em]">Need our company profile?</h2>
            <p className="mt-2 font-sans text-[16px] text-white/70">For tenders, registrations and partnerships — we’ll email it to you.</p>
          </div>
          <Button href={REQUEST} variant="light" arrow="up-right" magnetic className="shrink-0 self-start desktop:self-auto">Request by email</Button>
        </FadeUp>
      </section>
    </>
  );
}
