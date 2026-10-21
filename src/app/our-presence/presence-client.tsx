'use client';

import Image from 'next/image';
import { motion, useReducedMotion } from 'framer-motion';
import { Building2, Factory, Hospital, Mail, MapPin, Navigation, Pill, ShieldCheck, Stethoscope, Truck } from 'lucide-react';
import { expoOut } from '@/lib/easings';
import { Counter, FadeUp } from '@/components/ui/primitives';
import { Breadcrumb } from '@/components/ui/breadcrumb';
import { SectionHeading } from '@/components/ui/section-heading';
import { Button } from '@/components/ui/button';
import { SupplyFlow } from '@/components/presence/supply-flow';
import { PresenceLinks } from '@/components/presence/presence-links';

const EMAIL = 'info@revorahealthcare.com';
const mapsUrl = (q: string) => `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(q)}`;

const STATS = [
  { value: 9, label: 'Ophthalmic brands' },
  { value: 4, label: 'Therapy areas' },
  { value: 2, label: 'Locations — office & plant' },
  { value: 1, label: 'Dedicated eye-drop plant' },
];

const FACILITIES = [
  {
    index: '01',
    icon: Building2,
    badge: 'Registered office',
    name: 'Corporate headquarters',
    city: 'Ahmedabad, Gujarat',
    address: '3rd Floor, S.G. Business Hub, A/303, Sarkhej–Gandhinagar Highway, near Gota Overbridge, Ognaj, Ahmedabad, Gujarat 380060',
    detail: 'Our Ahmedabad office leads sales, distribution and partnerships with doctors, hospitals, pharmacies and distributors across India.',
    roles: ['Sales & marketing', 'Distribution & supply planning', 'Partnerships & institutional supply', 'Pharmacovigilance'],
    facts: [['Incorporated', '10 March 2026'], ['CIN', 'U21000GJ2026PTC174674']],
    mapQuery: 'S.G. Business Hub, Gota, Ahmedabad, Gujarat 380060',
    images: ['/images/logos/moxora.webp', '/images/logos/rehynate.webp', '/images/logos/revopt-tablets.webp'],
    logos: true,
    second: { label: 'Visit HQ page', href: '/our-presence/ahmedabad', icon: undefined },
  },
  {
    index: '02',
    icon: Factory,
    badge: 'WHO-GMP certified',
    name: 'Ophthalmic manufacturing plant',
    city: 'Paonta Sahib, Himachal Pradesh',
    address: 'Paonta Sahib, Himachal Pradesh',
    detail: 'Revora eye drops are made in our own dedicated eye-drop plant — WHO-GMP certified and EU-compliant — so quality stays in our hands.',
    roles: ['Sterile eye-drop filling', 'Dedicated ophthalmic lines', 'Quality control & release', 'Packing in premium cartons'],
    facts: [['Standard', 'WHO-GMP'], ['Compliance', 'EU-compliant']],
    mapQuery: 'Paonta Sahib, Himachal Pradesh',
    images: ['/images/site/eye-drop-filling-line.webp'],
    logos: false,
    second: { label: 'Certifications', href: '/certifications', icon: undefined },
  },
];

const AUDIENCES = [
  { icon: Stethoscope, name: 'Doctors & ophthalmologists', detail: 'Reliable ophthalmic formulations, product literature and medical representative support for prescribers.' },
  { icon: Hospital, name: 'Hospitals & eye clinics', detail: 'A focused portfolio spanning anti-infectives, tear substitutes, post-surgical NSAIDs and retinal nutrition.' },
  { icon: Pill, name: 'Pharmacies', detail: 'Premium, recognisable cartons and consistent supply for the pharmacies that serve patients every day.' },
  { icon: Truck, name: 'Distributors & stockists', detail: 'Partnerships that bring a dedicated ophthalmic portfolio to new territories across India.' },
];

/** Reveal-on-scroll wrapper shared by the cards on this page. */
function Rise({ children, i = 0, className }: { children: React.ReactNode; i?: number; className?: string }) {
  const reduce = useReducedMotion();
  return (
    <motion.div
      initial={reduce ? false : { opacity: 0, y: 36 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-8% 0px' }}
      transition={{ duration: 0.85, delay: i * 0.1, ease: expoOut }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

export function PresenceClient() {
  return (
    <>
      {/* ── hero ── */}
      <section className="relative isolate overflow-hidden px-5 pb-16 pt-36 tablet:px-8 tablet:pb-24 tablet:pt-44 desktop:pt-52">
        <div aria-hidden className="absolute -left-40 top-10 -z-10 h-[480px] w-[480px] rounded-full bg-revora-sky blur-3xl" />
        <div className="mx-auto max-w-330">
          <Breadcrumb items={[{ label: 'Home', href: '/' }, { label: 'Our Presence' }]} />
          <div className="mt-8 grid grid-cols-[minmax(0,1fr)] items-center gap-12 tablet-lg:grid-cols-[1.15fr_0.85fr] desktop:gap-16">
            <div>
              <SectionHeading
                level="page"
                eyebrow="Our presence"
                lines={['Rooted in Ahmedabad.', 'Serving India.']}
                highlight={{ 'Ahmedabad.': 'text-revora-cobalt' }}
              />
              <FadeUp delay={0.5}>
                <p className="mt-7 max-w-xl font-sans text-[17px] leading-[1.7] text-revora-slate-light">
                  From our office at S.G. Business Hub in Ahmedabad and our own eye-drop plant in Himachal Pradesh, Revora Healthcare serves
                  doctors, hospitals, pharmacies and distributors across India.
                </p>
              </FadeUp>
              <FadeUp delay={0.6} className="mt-9 flex flex-wrap gap-3">
                <Button href="/our-presence/ahmedabad" arrow="up-right" magnetic>Ahmedabad HQ</Button>
                <Button href="/our-presence/domestic-network" variant="outline">Domestic network</Button>
              </FadeUp>
            </div>
            <RouteCard />
          </div>
          <FadeUp delay={0.2}>
            <dl className="mt-16 grid grid-cols-2 gap-x-6 gap-y-8 border-t border-revora-cobalt/10 pt-8 tablet:grid-cols-4">
              {STATS.map((s) => (
                <div key={s.label}>
                  <dd className="font-heading text-4xl font-extrabold tracking-tight text-revora-cobalt tablet:text-5xl">
                    <Counter to={s.value} />
                  </dd>
                  <dt className="mt-1 font-sans text-[13px] font-medium leading-snug text-revora-slate-light">{s.label}</dt>
                </div>
              ))}
            </dl>
          </FadeUp>
        </div>
      </section>

      {/* ── where we operate ── */}
      <section id="ahmedabad" className="bg-white px-5 py-24 tablet:px-8 tablet:py-32">
        <div className="mx-auto max-w-330">
          <SectionHeading
            eyebrow="Where we operate"
            lines={['One office. One plant.', 'One focus.']}
            highlight={{ 'focus.': 'text-revora-crimson' }}
            aside="A corporate office in Ahmedabad, Gujarat and a dedicated ophthalmic manufacturing plant in Himachal Pradesh."
          />
          <div className="mt-14 grid grid-cols-[minmax(0,1fr)] gap-5 tablet-lg:grid-cols-2">
            {FACILITIES.map((f, i) => (
              <Rise key={f.index} i={i}>
                <FacilityCard f={f} />
              </Rise>
            ))}
          </div>
        </div>
      </section>

      <SupplyFlow />

      {/* ── who we serve ── */}
      <section id="domestic" className="px-5 py-24 tablet:px-8 tablet:py-32">
        <div className="mx-auto max-w-330">
          <SectionHeading
            eyebrow="Domestic network"
            lines={['Who we serve across India.']}
            highlight={{ 'India.': 'text-revora-cobalt' }}
            aside="Specialising in ophthalmic pharmaceuticals and expanding into specialty healthcare products and medical devices, we build lasting relationships with every link in the eye-care chain."
          />
          <div className="mt-14 grid gap-5 tablet:grid-cols-2 desktop:grid-cols-4">
            {AUDIENCES.map((a, i) => (
              <Rise key={a.name} i={i} className="group relative isolate flex min-h-[260px] flex-col overflow-hidden rounded-[28px] border border-revora-cobalt/10 bg-white p-7">
                <span aria-hidden className="absolute inset-0 -z-10 translate-y-full bg-revora-cobalt transition-transform duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:translate-y-0" />
                <div className="flex items-start justify-between">
                  <span className="grid h-12 w-12 place-items-center rounded-2xl bg-revora-sky text-revora-cobalt transition-all duration-500 group-hover:rotate-[-8deg] group-hover:bg-white">
                    <a.icon className="h-5 w-5" />
                  </span>
                  <span className="font-heading text-[40px] font-extrabold leading-none tracking-[-0.04em] text-revora-cobalt/10 transition-colors duration-500 group-hover:text-white/20">
                    0{i + 1}
                  </span>
                </div>
                <h3 className="mt-auto pt-10 font-heading text-[22px] font-extrabold leading-tight text-revora-slate transition-colors duration-500 group-hover:text-white">{a.name}</h3>
                <p className="mt-2.5 font-sans text-[14.5px] leading-[1.65] text-revora-slate-light transition-colors duration-500 group-hover:text-white/80">{a.detail}</p>
              </Rise>
            ))}
          </div>
          <FadeUp className="mt-10 flex justify-center">
            <Button href="/our-presence/domestic-network" arrow="up-right">Explore our domestic network</Button>
          </FadeUp>
        </div>
      </section>

      {/* ── partnership ── */}
      <div id="partner" className="px-5 pb-24 tablet:px-8 tablet:pb-32">
        <Rise className="relative isolate mx-auto max-w-330 overflow-hidden rounded-[32px] bg-revora-slate p-8 text-white tablet:p-14">
          <div aria-hidden className="absolute inset-0 -z-10 bg-[radial-gradient(ellipse_at_top_right,rgba(11,74,143,0.85),transparent_60%),radial-gradient(ellipse_at_bottom_left,rgba(215,38,46,0.22),transparent_55%)]" />
          <div className="flex flex-col gap-10 desktop:flex-row desktop:items-end desktop:justify-between">
            <div className="max-w-2xl">
              <p className="inline-flex items-center gap-2 font-sans text-[12px] font-semibold uppercase tracking-[0.18em] text-revora-cobalt-pale">
                <Truck className="h-4 w-4" /> Distribution partnerships
              </p>
              <h2 className="mt-4 font-heading text-[clamp(1.9rem,3.8vw,3.2rem)] font-extrabold leading-[1.05] tracking-[-0.02em]">
                Bring Revora to the doctors and pharmacies in your territory.
              </h2>
              <p className="mt-4 font-sans text-[16px] leading-[1.7] text-white/70">
                We’re looking for distributors and stockists who share our focus on reliable eye care. Tell us about your region and our business
                team will get in touch.
              </p>
            </div>
            <div className="flex flex-wrap gap-3 desktop:shrink-0 desktop:flex-col">
              <Button href="/our-presence/domestic-network#partner" variant="light" arrow="up-right" magnetic>Partner with us</Button>
              <Button href={`mailto:${EMAIL}?subject=${encodeURIComponent('Distribution partnership enquiry')}`} variant="outline-light" icon={<Mail />}>
                {EMAIL}
              </Button>
            </div>
          </div>
        </Rise>
      </div>

      <PresenceLinks current="/our-presence" title="Explore more" />
    </>
  );
}

/* ── facility card ────────────────────────────────────────── */
function FacilityCard({ f }: { f: (typeof FACILITIES)[number] }) {
  return (
    <article className="group flex h-full flex-col overflow-hidden rounded-[28px] border border-revora-cobalt/10 bg-[#F6F9FC] transition-shadow duration-500 hover:shadow-[0_30px_60px_-30px_rgba(11,74,143,0.45)]">
      {/* photo header with the title over it */}
      <div className="relative aspect-[16/10] overflow-hidden bg-revora-cobalt">
        {f.logos ? (
          /* brand logos on a light wall, as our portfolio — not carton photos */
          <div className="logo-wall absolute inset-x-0 top-0 grid h-[62%] grid-cols-3 gap-2 bg-white p-3">
            {f.images.map((src) => (
              <div key={src} className="relative mt-10 rounded-xl bg-[#F6F9FC]">
                <Image src={src} alt="" fill loading="eager" sizes="200px" className="object-contain p-3 transition-transform duration-700 group-hover:scale-[1.06]" />
              </div>
            ))}
          </div>
        ) : (
          <div className="absolute inset-0">
            <Image src={f.images[0]} alt="" fill loading="eager" sizes="(min-width: 1024px) 50vw, 100vw" className="object-cover transition-transform duration-[1200ms] ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-[1.06]" />
          </div>
        )}
        <div aria-hidden className={`absolute inset-x-0 bottom-0 bg-linear-to-t from-revora-cobalt-deep to-transparent ${f.logos ? 'top-[62%] via-revora-cobalt-deep' : 'top-0 via-revora-cobalt-deep/40'}`} />
        <span aria-hidden className="absolute right-5 top-3 hidden font-heading text-[88px] [.group:not(:has(.logo-wall))_&]:block font-extrabold leading-none tracking-[-0.05em] text-white/25">{f.index}</span>
        <span className="absolute left-5 top-5 inline-flex items-center gap-2 rounded-full bg-white/90 px-3 py-1.5 font-sans text-[11px] font-semibold uppercase tracking-[0.14em] text-revora-cobalt backdrop-blur tablet:left-7 tablet:top-7">
          <f.icon className="h-3.5 w-3.5" /> {f.badge}
        </span>
        <div className="absolute inset-x-5 bottom-5 text-white tablet:inset-x-7 tablet:bottom-7">
          <h3 className="font-heading text-[clamp(1.5rem,2.4vw,2.1rem)] font-extrabold leading-[1.05] tracking-[-0.02em]">{f.name}</h3>
          <p className="mt-1 font-sans text-[15px] font-medium text-white/80">{f.city}</p>
        </div>
      </div>

      <div className="flex flex-1 flex-col px-6 py-7 tablet:px-8">
        <p className="flex items-start gap-2.5 font-sans text-[14.5px] leading-[1.6] text-revora-slate">
          <MapPin className="mt-0.5 h-4 w-4 shrink-0 text-revora-crimson" />
          {f.address}
        </p>
        <p className="mt-4 font-sans text-[15px] leading-[1.7] text-revora-slate-light">{f.detail}</p>
        <ul className="mt-6 grid gap-2 tablet:grid-cols-2">
          {f.roles.map((r) => (
            <li key={r} className="flex items-center gap-2.5 font-sans text-[14px] font-medium text-revora-slate">
              <span className="h-1.5 w-1.5 shrink-0 rounded-full bg-revora-cobalt" />
              {r}
            </li>
          ))}
        </ul>
        <dl className="mt-7 grid grid-cols-2 gap-px overflow-hidden rounded-2xl border border-revora-cobalt/10 bg-revora-cobalt/10">
          {f.facts.map(([k, v]) => (
            <div key={k} className="bg-white px-4 py-3">
              <dt className="font-sans text-[11px] font-semibold uppercase tracking-[0.14em] text-revora-slate-muted">{k}</dt>
              <dd className="mt-0.5 break-words font-sans text-[13.5px] font-semibold text-revora-slate">{v}</dd>
            </div>
          ))}
        </dl>
        <div className="mt-auto flex flex-wrap gap-3 pt-8">
          <Button href={mapsUrl(f.mapQuery)} icon={<Navigation />}>Get directions</Button>
          <Button href={f.second.href} variant="outline" icon={f.second.icon}>{f.second.label}</Button>
        </div>
      </div>
    </article>
  );
}

/* ── hero route card ──────────────────────────────────────── */
const ROUTE = 'M132 318 C 150 196, 262 118, 392 112';
const PINS = [
  { x: 392, y: 112, c: '#D7262E', d: 1.2 },
  { x: 132, y: 318, c: '#FFFFFF', d: 0.9 },
];

function RouteCard() {
  const reduce = useReducedMotion();
  return (
    <motion.div
      initial={reduce ? false : { opacity: 0, y: 40, scale: 0.97 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{ duration: 1.1, delay: 0.25, ease: expoOut }}
      className="relative mx-auto aspect-[13/11] w-full max-w-[600px] overflow-hidden rounded-[28px] bg-revora-cobalt-deep shadow-[0_40px_80px_-40px_rgba(11,74,143,0.6)] tablet:rounded-[32px]"
    >
      <div aria-hidden className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,rgba(58,130,200,0.55),transparent_60%),radial-gradient(ellipse_at_bottom_left,rgba(215,38,46,0.2),transparent_55%)]" />
      <svg viewBox="0 0 520 440" className="absolute inset-0 h-full w-full" aria-hidden>
        <defs>
          <linearGradient id="route" x1="0" y1="1" x2="1" y2="0">
            <stop offset="0%" stopColor="#94B6E5" />
            <stop offset="100%" stopColor="#D7262E" />
          </linearGradient>
        </defs>
        {/* reach rings around Ahmedabad */}
        {[90, 170, 250, 330].map((r, i) => (
          <motion.circle key={r} cx="132" cy="318" r={r} fill="none" stroke="rgba(148,182,229,0.16)" strokeDasharray="2 6"
            initial={reduce ? false : { opacity: 0, scale: 0.6 }} animate={{ opacity: 1, scale: 1 }} style={{ transformOrigin: '132px 318px' }}
            transition={{ duration: 1.4, delay: 0.5 + i * 0.12, ease: expoOut }} />
        ))}
        {!reduce && (
          <motion.circle cx="132" cy="318" fill="none" stroke="rgba(148,182,229,0.5)" strokeWidth="1.5"
            initial={{ r: 20, opacity: 0.8 }} animate={{ r: 330, opacity: 0 }} transition={{ duration: 3.6, repeat: Infinity, ease: 'easeOut', delay: 1.6 }} />
        )}
        <path d={ROUTE} fill="none" stroke="rgba(255,255,255,0.12)" strokeWidth="2" />
        <motion.path d={ROUTE} fill="none" stroke="url(#route)" strokeWidth="2.5" strokeLinecap="round"
          initial={reduce ? false : { pathLength: 0 }} animate={{ pathLength: 1 }} transition={{ duration: 1.6, delay: 0.7, ease: expoOut }} />
        {!reduce && (
          <circle r="5" fill="#fff">
            <animateMotion dur="3.4s" begin="2.2s" repeatCount="indefinite" path="M392 112 C 262 118, 150 196, 132 318" />
          </circle>
        )}
        {PINS.map((p) => (
          <g key={p.x}>
            {!reduce && (
              <motion.circle cx={p.x} cy={p.y} fill={p.c} initial={{ r: 8, opacity: 0.45 }} animate={{ r: 22, opacity: 0 }}
                transition={{ duration: 1.8, repeat: Infinity, ease: 'easeOut', delay: p.d + 0.6 }} />
            )}
            <motion.circle cx={p.x} cy={p.y} r="8" fill={p.c} stroke="#062B55" strokeWidth="3"
              initial={reduce ? false : { scale: 0 }} animate={{ scale: 1 }} style={{ transformOrigin: `${p.x}px ${p.y}px` }}
              transition={{ duration: 0.7, delay: p.d, ease: [0.34, 1.56, 0.64, 1] }} />
          </g>
        ))}
      </svg>

      <PinLabel at={['25.4%', '72.3%']} placement="left-5 -translate-y-1/2" delay={1.1} kicker="Headquarters" title="Ahmedabad" sub="Gujarat" icon={Building2} />
      <PinLabel at={['75.4%', '25.5%']} placement="right-0 top-5 translate-x-3 text-right" delay={1.4} kicker="Manufacturing" title="Paonta Sahib" sub="Himachal Pradesh" icon={Factory} />

      <div className="absolute inset-x-5 top-5 flex items-center justify-between tablet:inset-x-7 tablet:top-7">
        <span className="font-sans text-[11px] font-semibold uppercase tracking-[0.18em] text-revora-cobalt-pale">Plant → Patient</span>
        <span className="inline-flex items-center gap-1.5 rounded-full border border-white/15 bg-white/10 px-3 py-1.5 font-sans text-[11px] font-semibold text-white backdrop-blur">
          <ShieldCheck className="h-3.5 w-3.5 text-revora-cobalt-pale" /> WHO-GMP
        </span>
      </div>
      <p className="absolute bottom-5 right-5 font-sans text-[11px] font-semibold uppercase tracking-[0.18em] text-white/45 tablet:bottom-7 tablet:right-7">
        Serving across India
      </p>
    </motion.div>
  );
}

function PinLabel({ at, placement, delay, kicker, title, sub, icon: Icon }: {
  at: [string, string];
  placement: string;
  delay: number;
  kicker: string;
  title: string;
  sub: string;
  icon: typeof Building2;
}) {
  const reduce = useReducedMotion();
  return (
    <div className="absolute h-0 w-0" style={{ left: at[0], top: at[1] }}>
      <motion.div
        initial={reduce ? false : { opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay, ease: expoOut }}
        className={`absolute w-max rounded-2xl border border-white/15 bg-white/10 px-3 py-2 text-white backdrop-blur-md tablet:px-4 tablet:py-3 ${placement}`}
      >
        <p className="hidden items-center gap-1.5 font-sans text-[11px] font-semibold uppercase tracking-[0.16em] text-revora-cobalt-pale tablet:inline-flex">
          <Icon className="h-3.5 w-3.5" /> {kicker}
        </p>
        <p className="font-heading text-[14px] font-extrabold leading-tight tablet:mt-1 tablet:text-[18px]">{title}</p>
        <p className="hidden font-sans text-[12px] text-white/60 tablet:block">{sub}</p>
      </motion.div>
    </div>
  );
}
