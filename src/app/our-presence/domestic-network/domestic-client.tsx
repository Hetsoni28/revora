'use client';

import { useState } from 'react';
import Image from 'next/image';
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion';
import { BadgeCheck, Hospital, Pill, Stethoscope, Truck } from 'lucide-react';
import { expoOut } from '@/lib/easings';
import { onTabListKeyDown } from '@/lib/a11y';
import { FadeUp } from '@/components/ui/primitives';
import { PageHero } from '@/components/ui/page-hero';
import { SectionHeading } from '@/components/ui/section-heading';
import { Button } from '@/components/ui/button';
import { NetworkHub } from '@/components/illustrations/presence-illustrations';
import { PresenceLinks } from '@/components/presence/presence-links';
import { IndiaDotMap } from '@/components/maps/india-dot-map';
import { DOMESTIC_NETWORK } from '@/lib/network';

const AUDIENCES = [
  {
    id: 'doctors',
    icon: Stethoscope,
    name: 'Doctors',
    image: '/images/photos/doctor-portrait.webp',
    alt: 'Doctor in a white coat with a stethoscope',
    text: 'Formulations to prescribe with confidence.',
    points: ['Product literature', 'Samples on request', 'Medical representative support'],
  },
  {
    id: 'hospitals',
    icon: Hospital,
    name: 'Hospitals & eye clinics',
    image: '/images/photos/hospital-doctors.webp',
    alt: 'Two doctors reviewing a scan together',
    text: 'A focused portfolio for the eye clinic.',
    points: ['Four therapy areas', 'Institutional supply', 'Rate cards on request'],
  },
  {
    id: 'pharmacies',
    icon: Pill,
    name: 'Pharmacies',
    image: '/images/photos/pharmacist.webp',
    alt: 'Pharmacist in a white coat at a pharmacy',
    text: 'Premium packs and steady supply.',
    points: ['Premium outer cartons', 'Consistent supply', 'Easy re-ordering'],
  },
  {
    id: 'distributors',
    icon: Truck,
    name: 'Distributors & stockists',
    image: '/images/photos/warehouse-inventory.webp',
    alt: 'Worker checking medicine stock in a warehouse',
    text: 'Our range, in new territories.',
    points: ['Dedicated eye-care range', 'Made in our own plant', 'Support from Ahmedabad HQ'],
  },
];

export function DomesticClient() {
  return (
    <>
      <PageHero
        crumbs={[{ label: 'Home', href: '/' }, { label: 'Our Presence', href: '/our-presence' }, { label: 'Domestic Network' }]}
        eyebrow="Domestic Network"
        lines={['Every link in', 'the eye-care chain.']}
        highlight={{ 'eye-care': 'text-revora-cobalt' }}
        text="From our plant to every doctor, hospital and pharmacy across India."
        actions={
          <>
            <Button href="/channel-partner" arrow="up-right" magnetic>Become a partner</Button>
            <Button href="#who" variant="outline">Who we serve</Button>
          </>
        }
        visual={<NetworkHub />}
      />

      {/* ── across India map ── */}
      <section className="px-5 pb-20 tablet:px-8 tablet:pb-28">
        <div className="mx-auto grid max-w-330 grid-cols-[minmax(0,1fr)] items-center gap-12 overflow-hidden rounded-[32px] border border-revora-cobalt/10 bg-white p-6 tablet:p-12 tablet-lg:grid-cols-[0.9fr_1.1fr] tablet-lg:gap-16">
          <div>
            <SectionHeading eyebrow="Across India" lines={['Made in the hills.', 'Sent across India.']} highlight={{ 'India.': 'text-revora-cobalt' }} />
            <FadeUp delay={0.15}>
              <p className="mt-6 max-w-md font-sans text-[16.5px] leading-[1.75] text-revora-slate-light">
                Made in Paonta Sahib, run from Ahmedabad and delivered through our partners in {DOMESTIC_NETWORK.length} states and union territories.
              </p>
              <ul className="mt-8 space-y-4">
                {[
                  { c: 'bg-revora-cobalt', t: 'Ahmedabad, Gujarat', s: 'Headquarters & registered office' },
                  { c: 'bg-revora-crimson', t: 'Paonta Sahib, Himachal Pradesh', s: 'Eye-drop manufacturing plant' },
                ].map((x) => (
                  <li key={x.t} className="flex items-start gap-3">
                    <span className={`mt-1.5 h-3 w-3 shrink-0 rounded-full ring-4 ring-revora-sky ${x.c}`} />
                    <span>
                      <span className="block font-heading text-[17px] font-extrabold text-revora-slate">{x.t}</span>
                      <span className="block font-sans text-[14px] text-revora-slate-light">{x.s}</span>
                    </span>
                  </li>
                ))}
              </ul>
              <div className="mt-8 border-t border-revora-cobalt/10 pt-6">
                <p className="flex items-center gap-3 font-heading text-[17px] font-extrabold text-revora-slate">
                  <span aria-hidden className="h-3 w-3 shrink-0 rounded-full border-2 border-revora-cobalt bg-white ring-4 ring-revora-sky" />
                  Our network · {DOMESTIC_NETWORK.length} states &amp; UTs
                </p>
                <ul className="mt-4 flex flex-wrap gap-2">
                  {DOMESTIC_NETWORK.map((s) => (
                    <li key={s.name} className="rounded-full border border-revora-cobalt/15 bg-[#F6F9FC] px-3 py-1.5 font-sans text-[13px] text-revora-slate">
                      <span className="font-semibold">{s.name}</span>
                      <span className="text-revora-slate-muted"> · {s.city}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </FadeUp>
          </div>
          <IndiaDotMap className="mx-auto w-full max-w-[460px] desktop:max-w-[540px]" />
        </div>
      </section>

      <WhoWeServe />
      {/* ── partner CTA ── */}
      <section className="px-5 py-20 tablet:px-8 tablet:py-28">
        <FadeUp className="relative isolate mx-auto flex max-w-330 flex-col gap-8 overflow-hidden rounded-[32px] bg-revora-slate p-8 text-white tablet:p-14 desktop:flex-row desktop:items-center desktop:justify-between">
          <div aria-hidden className="absolute inset-0 -z-10 bg-[radial-gradient(ellipse_at_top_right,rgba(11,74,143,0.85),transparent_60%),radial-gradient(ellipse_at_bottom_left,rgba(215,38,46,0.22),transparent_55%)]" />
          <div>
            <h2 className="font-heading text-[clamp(1.8rem,3.6vw,2.8rem)] font-extrabold leading-[1.08] tracking-[-0.02em]">Cover a territory we don’t reach yet?</h2>
            <p className="mt-3 max-w-md font-sans text-[16px] leading-[1.7] text-white/70">Distributors and stockists can apply to carry our range.</p>
          </div>
          <Button href="/channel-partner" variant="light" arrow="up-right" magnetic className="shrink-0 self-start desktop:self-auto">Become a channel partner</Button>
        </FadeUp>
      </section>
      <PresenceLinks current="/our-presence/domestic-network" />
    </>
  );
}

/* ── who we serve: tabs with a photo panel ───────────────── */
function WhoWeServe() {
  const reduce = useReducedMotion();
  const [active, setActive] = useState(AUDIENCES[0].id);
  const a = AUDIENCES.find((x) => x.id === active) ?? AUDIENCES[0];
  return (
    <section id="who" className="bg-white px-5 py-20 tablet:px-8 tablet:py-28">
      <div className="mx-auto max-w-330">
        <SectionHeading eyebrow="Who we serve" lines={['Four partners.', 'One promise.']} highlight={{ 'promise.': 'text-revora-crimson' }} />

        <div
          role="tablist"
          aria-label="Who we serve"
          onKeyDown={(e) => onTabListKeyDown(e, AUDIENCES.map((x) => x.id), active, setActive)}
          className="-mx-5 mt-10 flex gap-2 overflow-x-auto px-5 pb-1 [scrollbar-width:none] tablet:mx-0 tablet:px-0">
          {AUDIENCES.map((x) => {
            const on = x.id === active;
            return (
              <button
                key={x.id}
                type="button"
                role="tab"
                id={`who-tab-${x.id}`}
                data-tab={x.id}
                aria-selected={on}
                aria-controls="who-panel"
                tabIndex={on ? 0 : -1}
                onClick={() => setActive(x.id)}
                className={`relative inline-flex shrink-0 items-center gap-2 rounded-full px-5 py-3 font-sans text-[14.5px] font-semibold transition-colors duration-300 ${on ? 'text-white' : 'text-revora-slate hover:text-revora-cobalt'}`}
              >
                {on && <motion.span layoutId="serve-pill" className="absolute inset-0 rounded-full bg-revora-cobalt" transition={{ type: 'spring', stiffness: 380, damping: 32 }} />}
                <x.icon className="relative h-4 w-4" />
                <span className="relative">{x.name}</span>
              </button>
            );
          })}
        </div>

        <div
          id="who-panel"
          role="tabpanel"
          aria-labelledby={`who-tab-${a.id}`}
          className="mt-8 grid grid-cols-[minmax(0,1fr)] overflow-hidden rounded-[28px] border border-revora-cobalt/10 bg-[#F6F9FC] tablet-lg:grid-cols-2"
        >
          <div className="relative aspect-[4/3] tablet-lg:aspect-auto tablet-lg:min-h-[420px]">
            <AnimatePresence mode="popLayout" initial={false}>
              <motion.div
                key={a.id}
                initial={reduce ? false : { opacity: 0, scale: 1.06 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={reduce ? undefined : { opacity: 0 }}
                transition={{ duration: 0.7, ease: expoOut }}
                className="absolute inset-0"
              >
                <Image src={a.image} alt={a.alt} fill sizes="(min-width: 1024px) 50vw, 100vw" className="object-cover" />
              </motion.div>
            </AnimatePresence>
          </div>
          <AnimatePresence mode="wait" initial={false}>
            <motion.div
              key={a.id}
              initial={reduce ? false : { opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              exit={reduce ? undefined : { opacity: 0, y: -10 }}
              transition={{ duration: 0.45, ease: expoOut }}
              className="flex flex-col justify-center p-8 tablet:p-12"
            >
              <span className="grid h-14 w-14 place-items-center rounded-2xl bg-revora-cobalt text-white">
                <a.icon className="h-6 w-6" />
              </span>
              <h3 className="mt-7 font-heading text-[clamp(1.7rem,3vw,2.4rem)] font-extrabold leading-[1.05] tracking-[-0.02em] text-revora-slate">{a.name}</h3>
              <p className="mt-3 max-w-md font-sans text-[16px] leading-[1.7] text-revora-slate-light">{a.text}</p>
              <ul className="mt-7 space-y-3">
                {a.points.map((p) => (
                  <li key={p} className="flex items-center gap-3 font-sans text-[15px] font-medium text-revora-slate">
                    <BadgeCheck className="h-5 w-5 shrink-0 text-revora-cobalt" /> {p}
                  </li>
                ))}
              </ul>
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
}
