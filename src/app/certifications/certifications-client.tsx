'use client';

import { Award, Building2, FileCheck2, Globe2, Mail, MapPin, ShieldCheck } from 'lucide-react';
import { FadeUp } from '@/components/ui/primitives';
import { PageHero } from '@/components/ui/page-hero';
import { SectionHeading } from '@/components/ui/section-heading';
import { Button } from '@/components/ui/button';
import { PlantLine, QualitySeal } from '@/components/illustrations/illustrations';
import { NextPages } from '@/components/company/next-pages';
import { MediaFrame } from '@/components/ui/media-frame';

const EMAIL = 'info@revorahealthcare.com';
const REQUEST = `mailto:${EMAIL}?subject=${encodeURIComponent('Request for certificate copies')}`;

const CERTS = [
  {
    icon: ShieldCheck,
    name: 'WHO-GMP',
    scope: 'Manufacturing plant',
    text: 'Our eye-drop plant follows WHO Good Manufacturing Practice.',
    where: 'Paonta Sahib, H.P.',
    featured: true,
  },
  {
    icon: Globe2,
    name: 'EU-compliant',
    scope: 'Manufacturing plant',
    text: 'The plant is built and run to EU-compliant standards.',
    where: 'Paonta Sahib, H.P.',
  },
  {
    icon: Award,
    name: 'ISO 9001:2015',
    scope: 'Quality management',
    text: 'A certified quality management system.',
    where: 'Revora Healthcare',
  },
  {
    icon: Building2,
    name: 'Registered company',
    scope: 'Ministry of Corporate Affairs',
    text: 'CIN U21000GJ2026PTC174674 · incorporated 10 March 2026.',
    where: 'Ahmedabad, Gujarat',
  },
];

export function CertificationsClient() {
  return (
    <>
      <PageHero
        crumbs={[{ label: 'Home', href: '/' }, { label: 'Certifications' }]}
        eyebrow="Certifications"
        lines={['Quality,', 'certified.']}
        highlight={{ 'certified.': 'text-revora-cobalt' }}
        text="Revora eye drops are made in our own WHO-GMP certified, EU-compliant plant — so quality stays in our hands."
        actions={
          <>
            <Button href="#certificates" arrow="down" magnetic>See certifications</Button>
            <Button href={REQUEST} variant="outline" icon={<Mail />}>Request copies</Button>
          </>
        }
        visual={<QualitySeal />}
      />

      {/* ── certificates ── */}
      <section id="certificates" className="bg-white px-5 py-20 tablet:px-8 tablet:py-28">
        <div className="mx-auto max-w-330">
          <SectionHeading
            eyebrow="Our certifications"
            lines={['Standards we meet.']}
            highlight={{ 'meet.': 'text-revora-cobalt' }}
            aside="Copies of each certificate are available to doctors, hospitals and partners on request."
          />
          <div className="mt-12 grid gap-5 tablet:grid-cols-2">
            {CERTS.map((c, i) => (
              <FadeUp key={c.name} delay={(i % 2) * 0.1}>
                <article
                  className={`group relative isolate flex h-full flex-col overflow-hidden rounded-[28px] p-7 tablet:p-9 ${
                    c.featured ? 'bg-revora-cobalt-deep text-white' : 'border border-revora-cobalt/10 bg-[#F6F9FC]'
                  }`}
                >
                  {c.featured && (
                    <div aria-hidden className="absolute inset-0 -z-10 bg-[radial-gradient(ellipse_at_top_right,rgba(58,130,200,0.55),transparent_60%)]" />
                  )}
                  <div className="flex items-start justify-between gap-4">
                    <span
                      className={`grid h-14 w-14 place-items-center rounded-2xl transition-transform duration-500 group-hover:rotate-[-8deg] group-hover:scale-105 ${
                        c.featured ? 'bg-white/15' : 'bg-white text-revora-cobalt shadow-sm'
                      }`}
                    >
                      <c.icon className="h-6 w-6" />
                    </span>
                    <span
                      className={`inline-flex items-center gap-1.5 rounded-full px-3 py-1.5 font-sans text-[12px] font-semibold ${
                        c.featured ? 'bg-white/10 text-white/85' : 'bg-white text-revora-slate-light'
                      }`}
                    >
                      <MapPin className={`h-3.5 w-3.5 ${c.featured ? 'text-revora-cobalt-pale' : 'text-revora-crimson'}`} /> {c.where}
                    </span>
                  </div>
                  <p className={`mt-10 font-sans text-[11px] font-semibold uppercase tracking-[0.16em] ${c.featured ? 'text-revora-cobalt-pale' : 'text-revora-slate-muted'}`}>
                    {c.scope}
                  </p>
                  <h3 className={`mt-1.5 font-heading text-[clamp(1.8rem,3vw,2.4rem)] font-extrabold leading-[1.05] tracking-[-0.02em] ${c.featured ? '' : 'text-revora-slate'}`}>
                    {c.name}
                  </h3>
                  <p className={`mt-3 max-w-md font-sans text-[15px] leading-[1.65] ${c.featured ? 'text-white/75' : 'text-revora-slate-light'}`}>{c.text}</p>
                  <span
                    aria-hidden
                    className="absolute inset-x-0 top-0 h-[3px] origin-left scale-x-0 bg-linear-to-r from-revora-cobalt-light to-revora-crimson transition-transform duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-x-100"
                  />
                </article>
              </FadeUp>
            ))}
          </div>
        </div>
      </section>

      {/* ── quality photos ── */}
      <section className="px-5 pt-20 tablet:px-8 tablet:pt-28">
        <div className="mx-auto grid max-w-330 gap-5 tablet:grid-cols-[1.2fr_0.8fr]">
          <FadeUp>
            <MediaFrame src="/images/photos/lab-scientist.webp" alt="Scientist in protective gear working with samples" aspect="aspect-[4/3]" sizes="(min-width: 768px) 60vw, 100vw" caption={<b className="font-semibold">Quality first</b>} />
          </FadeUp>
          <FadeUp delay={0.1}>
            <MediaFrame src="/images/photos/lab-team.webp" alt="Test tubes in a laboratory with scientists in the background" aspect="aspect-[4/3] tablet:aspect-auto tablet:h-full" sizes="(min-width: 768px) 40vw, 100vw" caption={<b className="font-semibold">Care in every detail</b>} />
          </FadeUp>
        </div>
      </section>

      {/* ── the plant ── */}
      <section className="px-5 py-20 tablet:px-8 tablet:py-28">
        <div className="mx-auto grid max-w-330 grid-cols-[minmax(0,1fr)] items-center gap-12 tablet-lg:grid-cols-2 tablet-lg:gap-20">
          <PlantLine />
          <div>
            <SectionHeading eyebrow="Where it’s made" lines={['Our own', 'eye-drop plant.']} highlight={{ own: 'text-revora-cobalt' }} />
            <FadeUp delay={0.15}>
              <p className="mt-6 max-w-md font-sans text-[16.5px] leading-[1.75] text-revora-slate-light">
                We don’t outsource the part that matters most. A dedicated ophthalmic plant means quality is something we control.
              </p>
              <ul className="mt-8 space-y-3">
                {[
                  { icon: MapPin, t: 'Paonta Sahib, Himachal Pradesh' },
                  { icon: ShieldCheck, t: 'WHO-GMP certified' },
                  { icon: Globe2, t: 'EU-compliant facility' },
                ].map((x) => (
                  <li key={x.t} className="flex items-center gap-3 font-sans text-[15.5px] font-semibold text-revora-slate">
                    <span className="grid h-9 w-9 place-items-center rounded-xl bg-revora-sky text-revora-cobalt">
                      <x.icon className="h-4 w-4" />
                    </span>
                    {x.t}
                  </li>
                ))}
              </ul>
            </FadeUp>
          </div>
        </div>
      </section>

      {/* ── request copies ── */}
      <section className="px-5 pb-20 tablet:px-8 tablet:pb-28">
        <FadeUp className="relative isolate mx-auto flex max-w-330 flex-col gap-8 overflow-hidden rounded-[32px] bg-revora-cobalt-deep p-8 text-white tablet:p-14 desktop:flex-row desktop:items-center desktop:justify-between">
          <div aria-hidden className="absolute inset-0 -z-10 bg-[radial-gradient(ellipse_at_top_right,rgba(58,130,200,0.55),transparent_60%),radial-gradient(ellipse_at_bottom_left,rgba(215,38,46,0.2),transparent_55%)]" />
          <div className="flex items-start gap-5">
            <span className="grid h-14 w-14 shrink-0 place-items-center rounded-2xl bg-white/15">
              <FileCheck2 className="h-6 w-6" />
            </span>
            <div>
              <h2 className="font-heading text-[clamp(1.7rem,3.4vw,2.6rem)] font-extrabold leading-[1.1] tracking-[-0.02em]">Need a certificate copy?</h2>
              <p className="mt-2 max-w-lg font-sans text-[16px] leading-[1.7] text-white/70">For tenders, hospital formularies or distribution — we’ll email it to you.</p>
            </div>
          </div>
          <Button href={REQUEST} variant="light" arrow="up-right" magnetic className="shrink-0 self-start desktop:self-auto">Request by email</Button>
        </FadeUp>
      </section>

      <NextPages current="/certifications" />
    </>
  );
}
