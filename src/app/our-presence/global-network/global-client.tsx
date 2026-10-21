'use client';

import { useState } from 'react';
import Image from 'next/image';
import { motion, useReducedMotion } from 'framer-motion';
import { toast } from 'sonner';
import { Globe, ShieldCheck, Award, Ship, Plane, FileCheck, ArrowUpRight } from 'lucide-react';
import { expoOut } from '@/lib/easings';
import { Counter, FadeUp } from '@/components/ui/primitives';
import { PageHero } from '@/components/ui/page-hero';
import { SectionHeading } from '@/components/ui/section-heading';
import { Button } from '@/components/ui/button';
import { MediaFrame } from '@/components/ui/media-frame';
import { PresenceLinks } from '@/components/presence/presence-links';

const PARTNER_EMAIL = 'exports@revorahealthcare.com';

const STATS = [
  { value: 15, suffix: '+', label: 'Export Markets Target' },
  { value: 100, suffix: '%', label: 'WHO-GMP Compliant' },
  { value: 4, suffix: '', label: 'Therapy Verticals' },
];

const CAPABILITIES = [
  {
    icon: ShieldCheck,
    title: 'International Quality Standards',
    desc: 'Sterile ophthalmic manufacturing strictly adhering to WHO-GMP and international cGMP guidelines.',
  },
  {
    icon: FileCheck,
    title: 'Regulatory & Dossier Support',
    desc: 'CTD/eCTD dossier documentation ready for registration across overseas drug authorities and ministries.',
  },
  {
    icon: Plane,
    title: 'Global Supply Logistics',
    desc: 'Validated cold chain and temperature-controlled air/sea logistics ensuring product stability across borders.',
  },
  {
    icon: Award,
    title: 'Contract & Out-Licensing',
    desc: 'Flexible partnership models including private labeling, out-licensing, and country-exclusive distribution.',
  },
];

export function GlobalClient() {
  const reduce = useReducedMotion();
  const [partnerType, setPartnerType] = useState('importer');
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [country, setCountry] = useState('');
  const [message, setMessage] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !email.trim()) {
      toast.error('Please fill in your name and email.');
      return;
    }
    const body = `Name: ${name}\nCountry: ${country}\nType: ${partnerType}\n\nMessage:\n${message}`;
    window.location.href = `mailto:${PARTNER_EMAIL}?subject=International Partnership Inquiry - ${encodeURIComponent(name)}&body=${encodeURIComponent(body)}`;
    setSubmitted(true);
    toast.success('Opening email client for global inquiry...');
  };

  return (
    <>
      <PageHero
        crumbs={[
          { label: 'Home', href: '/' },
          { label: 'Our Presence', href: '/our-presence' },
          { label: 'Global Network' },
        ]}
        eyebrow="Global Network"
        lines={['Expanding vision,', 'worldwide.']}
        highlight={{ 'worldwide.': 'text-revora-cobalt' }}
        text="Taking Revora's precision ophthalmic eye-care formulations to international markets through dedicated distribution and institutional partnerships."
        visual={
          <MediaFrame
            src="/images/photos/warehouse-dispatch.webp"
            alt="International dispatch of ophthalmic formulations"
            aspect="video"
          />
        }
      />

      {/* ── Key Global Metrics ── */}
      <section className="border-b border-revora-cobalt/10 bg-white px-5 py-12 tablet:px-8">
        <div className="mx-auto grid max-w-330 grid-cols-1 gap-6 sm:grid-cols-3">
          {STATS.map((s, i) => (
            <div key={i} className="flex flex-col items-center justify-center p-4 text-center">
              <span className="font-heading text-4xl font-extrabold text-revora-cobalt tablet:text-5xl">
                <Counter to={s.value} />
                <span className="text-revora-crimson">{s.suffix}</span>
              </span>
              <span className="mt-2 font-sans text-sm font-semibold text-revora-slate-light">
                {s.label}
              </span>
            </div>
          ))}
        </div>
      </section>

      {/* ── Global Capabilities ── */}
      <section className="px-5 py-20 tablet:px-8 tablet:py-28">
        <div className="mx-auto max-w-330">
          <SectionHeading
            eyebrow="Export Readiness"
            lines={['Built for stringent', 'global standards.']}
            highlight={{ 'global': 'text-revora-cobalt' }}
            aside="From sterile ophthalmic BFS production to complete dossier preparation, our operations are tuned for international markets."
          />

          <div className="mt-14 grid gap-6 sm:grid-cols-2 desktop:grid-cols-4">
            {CAPABILITIES.map((c, i) => (
              <motion.div
                key={i}
                initial={reduce ? false : { opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: i * 0.1, ease: expoOut }}
                className="flex flex-col rounded-3xl border border-revora-cobalt/10 bg-white p-7 shadow-xs"
              >
                <div className="grid h-12 w-12 place-items-center rounded-2xl bg-revora-sky text-revora-cobalt">
                  <c.icon className="h-6 w-6" />
                </div>
                <h3 className="mt-6 font-heading text-lg font-bold text-revora-slate">{c.title}</h3>
                <p className="mt-2 font-sans text-sm leading-relaxed text-revora-slate-light">{c.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Worldwide Inquiry Form ── */}
      <section className="bg-white px-5 py-20 tablet:px-8 tablet:py-28">
        <div className="mx-auto max-w-330 grid gap-12 tablet-lg:grid-cols-2 items-center">
          <div>
            <span className="font-sans text-[12px] font-semibold uppercase tracking-[0.2em] text-revora-crimson">
              Global Alliances
            </span>
            <h2 className="mt-3 font-heading text-[clamp(2rem,4vw,3.2rem)] font-extrabold leading-tight text-revora-slate">
              Partner with Revora in your country.
            </h2>
            <p className="mt-4 font-sans text-base text-revora-slate-light leading-relaxed">
              We welcome partnerships with pharmaceutical importers, regional distributors, hospital supply groups, and out-licensing collaborators across overseas markets.
            </p>
            <div className="mt-8 flex flex-col gap-3 font-sans text-sm text-revora-slate">
              <div className="flex items-center gap-2">
                <Globe className="h-4 w-4 text-revora-cobalt" />
                <span>Dedicated Export Regulatory Cell</span>
              </div>
              <div className="flex items-center gap-2">
                <Ship className="h-4 w-4 text-revora-cobalt" />
                <span>Port connectivity via Mundra & Nhava Sheva</span>
              </div>
            </div>
          </div>

          <div className="rounded-3xl border border-revora-cobalt/10 bg-[#F6F9FC] p-8">
            <h3 className="font-heading text-xl font-bold text-revora-slate">International Trade Inquiry</h3>
            <p className="mt-1 font-sans text-xs text-revora-slate-light">
              Direct connection with our Global Business Development team.
            </p>

            <form onSubmit={handleSubmit} className="mt-6 flex flex-col gap-4">
              <div>
                <label className="block font-sans text-xs font-semibold text-revora-slate">Your Name</label>
                <input
                  type="text"
                  required
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="e.g. Dr. Alex Morgan"
                  className="mt-1 w-full rounded-xl border border-revora-cobalt/15 bg-white px-4 py-2.5 font-sans text-sm focus:border-revora-cobalt focus:outline-none"
                />
              </div>

              <div>
                <label className="block font-sans text-xs font-semibold text-revora-slate">Business Email</label>
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="alex@company.com"
                  className="mt-1 w-full rounded-xl border border-revora-cobalt/15 bg-white px-4 py-2.5 font-sans text-sm focus:border-revora-cobalt focus:outline-none"
                />
              </div>

              <div>
                <label className="block font-sans text-xs font-semibold text-revora-slate">Target Country / Region</label>
                <input
                  type="text"
                  value={country}
                  onChange={(e) => setCountry(e.target.value)}
                  placeholder="e.g. UAE, Vietnam, Kenya"
                  className="mt-1 w-full rounded-xl border border-revora-cobalt/15 bg-white px-4 py-2.5 font-sans text-sm focus:border-revora-cobalt focus:outline-none"
                />
              </div>

              <div>
                <label className="block font-sans text-xs font-semibold text-revora-slate">Message / Products of Interest</label>
                <textarea
                  rows={3}
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  placeholder="Tell us about your distribution reach or formulation needs..."
                  className="mt-1 w-full rounded-xl border border-revora-cobalt/15 bg-white px-4 py-2.5 font-sans text-sm focus:border-revora-cobalt focus:outline-none"
                />
              </div>

              <Button type="submit" className="mt-2 w-full justify-center">
                Send Global Inquiry
              </Button>
            </form>
          </div>
        </div>
      </section>

      <PresenceLinks current="/our-presence/global-network" />
    </>
  );
}
