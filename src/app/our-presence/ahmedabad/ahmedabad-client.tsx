'use client';

import { useState } from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import { toast } from 'sonner';
import { Check, Copy, HeartPulse, Mail, MapPin, Megaphone, Navigation, PackageCheck, Truck } from 'lucide-react';
import { expoOut } from '@/lib/easings';
import { FadeUp } from '@/components/ui/primitives';
import { PageHero } from '@/components/ui/page-hero';
import { SectionHeading } from '@/components/ui/section-heading';
import { Button } from '@/components/ui/button';
import { MediaFrame } from '@/components/ui/media-frame';
import { HQOffice } from '@/components/illustrations/presence-illustrations';
import { PresenceLinks } from '@/components/presence/presence-links';

const ADDRESS_LINES = ['3rd Floor, S.G. Business Hub, A/303', 'Sarkhej–Gandhinagar Highway', 'Near Gota Overbridge, Ognaj', 'Ahmedabad, Gujarat 380060'];
const ADDRESS = ADDRESS_LINES.join(', ');
const MAP_QUERY = 'S.G. Business Hub, Gota, Ahmedabad, Gujarat 380060';
const DIRECTIONS = `https://www.google.com/maps/dir/?api=1&destination=${encodeURIComponent(MAP_QUERY)}`;

const TEAMS = [
  { icon: Megaphone, name: 'Sales & marketing', text: 'Brand building and support for prescribers.' },
  { icon: Truck, name: 'Distribution & supply', text: 'Planning stock and supply across India.' },
  { icon: PackageCheck, name: 'Partnerships', text: 'Distributors, stockists and institutional supply.' },
  { icon: HeartPulse, name: 'Pharmacovigilance', text: 'Recording and following up product safety reports.' },
];

const CONTACTS = [
  { label: 'General enquiries', email: 'info@revorahealthcare.com' },
  { label: 'Samples & orders', email: 'depot@revorahealthcare.com' },
  { label: 'Drug safety (ADR)', email: 'safety@revorahealthcare.com' },
];

export function AhmedabadClient() {
  return (
    <>
      <PageHero
        crumbs={[{ label: 'Home', href: '/' }, { label: 'Our Presence', href: '/our-presence' }, { label: 'Ahmedabad Headquarters' }]}
        eyebrow="Ahmedabad Headquarters"
        lines={['Our home on', 'S.G. Highway.']}
        highlight={{ 'S.G.': 'text-revora-cobalt', 'Highway.': 'text-revora-cobalt' }}
        text="Our registered and corporate office, where sales, supply and partnerships for all of India are run."
        actions={
          <>
            <Button href={DIRECTIONS} arrow="up-right" magnetic>Get directions</Button>
            <Button href="#visit" variant="outline">Visit us</Button>
          </>
        }
        visual={<HQOffice />}
      />

      {/* ── address + live map ── */}
      <section id="visit" className="px-5 pb-20 tablet:px-8 tablet:pb-28">
        <div className="mx-auto grid max-w-330 grid-cols-[minmax(0,1fr)] gap-5 tablet-lg:grid-cols-[0.85fr_1.15fr]">
          <AddressCard />
          <MapCard />
        </div>
      </section>

      {/* ── what happens here ── */}
      <section className="bg-white px-5 py-20 tablet:px-8 tablet:py-28">
        <div className="mx-auto max-w-330">
          <SectionHeading eyebrow="What happens here" lines={['Run from Ahmedabad.']} highlight={{ 'Ahmedabad.': 'text-revora-cobalt' }} aside="Our eye drops are made at our Paonta Sahib plant. Everything that brings them to you is run from here." />
          <div className="mt-12 grid gap-5 tablet:grid-cols-2 desktop:grid-cols-4">
            {TEAMS.map((t, i) => (
              <FadeUp key={t.name} delay={i * 0.08}>
                <div className="group relative isolate flex h-full min-h-[220px] flex-col overflow-hidden rounded-[28px] border border-revora-cobalt/10 bg-[#F6F9FC] p-7">
                  <span aria-hidden className="absolute inset-0 -z-10 translate-y-full bg-revora-cobalt transition-transform duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:translate-y-0" />
                  <span className="grid h-12 w-12 place-items-center rounded-2xl bg-white text-revora-cobalt shadow-sm transition-all duration-500 group-hover:rotate-[-8deg] group-hover:bg-white/15 group-hover:text-white">
                    <t.icon className="h-5 w-5" />
                  </span>
                  <h3 className="mt-auto pt-10 font-heading text-[1.35rem] font-extrabold leading-tight text-revora-slate transition-colors duration-500 group-hover:text-white">{t.name}</h3>
                  <p className="mt-2 font-sans text-[14.5px] leading-[1.6] text-revora-slate-light transition-colors duration-500 group-hover:text-white/80">{t.text}</p>
                </div>
              </FadeUp>
            ))}
          </div>
        </div>
      </section>

      {/* ── photos ── */}
      <section className="px-5 py-20 tablet:px-8 tablet:py-28">
        <div className="mx-auto grid max-w-330 grid-cols-[minmax(0,1fr)] items-center gap-12 tablet-lg:grid-cols-2 tablet-lg:gap-16">
          <div className="grid grid-cols-[1.2fr_0.8fr] gap-4">
            <MediaFrame src="/images/photos/office-team.webp" alt="Colleagues in a meeting at an office" aspect="aspect-[4/5]" sizes="(min-width: 1024px) 30vw, 60vw" />
            <MediaFrame src="/images/photos/ahmedabad-skyline.webp" alt="Aerial view of Ahmedabad and the Sabarmati river" aspect="aspect-[3/5]" sizes="(min-width: 1024px) 20vw, 40vw" className="mt-12" />
          </div>
          <div>
            <SectionHeading eyebrow="Why Ahmedabad" lines={['Gujarat’s pharma', 'heartland.']} highlight={{ 'heartland.': 'text-revora-crimson' }} />
            <FadeUp delay={0.15}>
              <p className="mt-6 max-w-md font-sans text-[16.5px] leading-[1.75] text-revora-slate-light">
                Ahmedabad sits at the centre of Gujarat’s pharmaceutical industry. Our office on the Sarkhej–Gandhinagar Highway keeps us close to the
                partners and people we work with.
              </p>
              <ul className="mt-7 space-y-3">
                {['Registered office of Revora Healthcare Private Limited', 'Incorporated 10 March 2026', 'CIN U21000GJ2026PTC174674'].map((x) => (
                  <li key={x} className="flex items-center gap-3 font-sans text-[15px] font-medium text-revora-slate">
                    <span className="grid h-6 w-6 shrink-0 place-items-center rounded-full bg-revora-sky text-revora-cobalt">
                      <Check className="h-3.5 w-3.5" strokeWidth={3} />
                    </span>
                    {x}
                  </li>
                ))}
              </ul>
            </FadeUp>
          </div>
        </div>
      </section>

      {/* ── contacts ── */}
      <section className="bg-white px-5 py-20 tablet:px-8 tablet:py-28">
        <div className="mx-auto max-w-330">
          <SectionHeading eyebrow="Get in touch" lines={['Write to the right team.']} highlight={{ 'right': 'text-revora-cobalt' }} />
          <div className="mt-12 grid gap-5 tablet:grid-cols-3">
            {CONTACTS.map((c, i) => (
              <FadeUp key={c.email} delay={i * 0.08}>
                <a href={`mailto:${c.email}`} className="group flex h-full flex-col rounded-[24px] border border-revora-cobalt/10 bg-[#F6F9FC] p-7 transition-shadow duration-500 hover:shadow-[0_24px_50px_-28px_rgba(11,74,143,0.45)]">
                  <span className="grid h-11 w-11 place-items-center rounded-2xl bg-white text-revora-cobalt shadow-sm transition-transform duration-500 group-hover:-rotate-12">
                    <Mail className="h-5 w-5" />
                  </span>
                  <span className="mt-8 font-sans text-[12px] font-semibold uppercase tracking-[0.14em] text-revora-slate-muted">{c.label}</span>
                  <span className="mt-1 break-all font-heading text-[1.1rem] font-bold text-revora-cobalt group-hover:underline">{c.email}</span>
                </a>
              </FadeUp>
            ))}
          </div>
        </div>
      </section>

      <PresenceLinks current="/our-presence/ahmedabad" />
    </>
  );
}

/** Address with copy-to-clipboard and directions. */
function AddressCard() {
  const reduce = useReducedMotion();
  const [copied, setCopied] = useState(false);
  const copy = async () => {
    try {
      await navigator.clipboard.writeText(ADDRESS);
      setCopied(true);
      toast.success('Address copied');
      setTimeout(() => setCopied(false), 2000);
    } catch {
      toast.error('Could not copy — please select the address instead.');
    }
  };
  return (
    <motion.div
      initial={reduce ? false : { opacity: 0, y: 36 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-8% 0px' }}
      transition={{ duration: 0.85, ease: expoOut }}
      className="relative isolate flex flex-col overflow-hidden rounded-[28px] bg-revora-cobalt-deep p-8 text-white tablet:p-10"
    >
      <div aria-hidden className="absolute inset-0 -z-10 bg-[radial-gradient(ellipse_at_top_right,rgba(58,130,200,0.55),transparent_60%),radial-gradient(ellipse_at_bottom_left,rgba(215,38,46,0.2),transparent_55%)]" />
      <span className="grid h-12 w-12 place-items-center rounded-2xl bg-white/15">
        <MapPin className="h-6 w-6" />
      </span>
      <p className="mt-8 font-sans text-[11px] font-semibold uppercase tracking-[0.16em] text-revora-cobalt-pale">Registered office</p>
      <address className="mt-2 font-heading text-[clamp(1.3rem,2.2vw,1.65rem)] font-bold not-italic leading-[1.35]">
        {ADDRESS_LINES.map((l) => (
          <span key={l} className="block">{l}</span>
        ))}
      </address>
      <div className="mt-auto flex flex-wrap gap-3 pt-10">
        <Button href={DIRECTIONS} variant="light" icon={<Navigation />}>Directions</Button>
        <button
          type="button"
          onClick={copy}
          className="inline-flex items-center gap-2 rounded-full border border-white/25 px-6 py-3.5 font-sans text-[15px] font-semibold text-white transition-colors hover:bg-white/10"
        >
          {copied ? <Check className="h-4 w-4" /> : <Copy className="h-4 w-4" />} {copied ? 'Copied' : 'Copy address'}
        </button>
      </div>
    </motion.div>
  );
}

/** Live Google map of the office (no API key needed). */
function MapCard() {
  const reduce = useReducedMotion();
  return (
    <motion.div
      // fade + rise (a fully clipped element never registers as in view)
      initial={reduce ? false : { opacity: 0, y: 36 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-8% 0px' }}
      transition={{ duration: 1.1, delay: 0.1, ease: expoOut }}
      className="relative min-h-[360px] overflow-hidden rounded-[28px] border border-revora-cobalt/10 bg-revora-sky tablet:min-h-[440px]"
    >
      <iframe
        title="Map of Revora Healthcare, S.G. Business Hub, Ahmedabad"
        src={`https://maps.google.com/maps?q=${encodeURIComponent(MAP_QUERY)}&z=15&output=embed`}
        loading="lazy"
        referrerPolicy="no-referrer-when-downgrade"
        className="absolute inset-0 h-full w-full border-0"
      />
    </motion.div>
  );
}
