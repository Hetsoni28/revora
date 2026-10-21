'use client';

import Image from 'next/image';
import { Building2, Compass, Factory, Layers, Rocket, Sparkles, Target } from 'lucide-react';
import { ALL_PRODUCTS, THERAPY_CATEGORIES } from '@/lib/therapies-data';
import { FadeUp } from '@/components/ui/primitives';
import { PageHero } from '@/components/ui/page-hero';
import { SectionHeading } from '@/components/ui/section-heading';
import { Button } from '@/components/ui/button';
import { EyeDropScene } from '@/components/illustrations/illustrations';

const PURPOSE = [
  {
    icon: Target,
    tag: 'Our mission',
    text: 'Make dependable eye-care medicines easy to find for every doctor, hospital and pharmacy in India.',
    filled: true,
  },
  {
    icon: Compass,
    tag: 'Our vision',
    text: 'Grow from eye care into specialty healthcare and medical devices — with the same care for quality.',
    filled: false,
  },
];

const JOURNEY = [
  { icon: Building2, when: 'March 2026', title: 'Founded in Ahmedabad', text: 'Revora Healthcare Private Limited is incorporated on 10 March 2026.' },
  { icon: Factory, when: 'Manufacturing', title: 'Our own plant', text: 'Eye drops made at our WHO-GMP plant in Paonta Sahib, Himachal Pradesh.' },
  { icon: Layers, when: 'Portfolio', title: `${ALL_PRODUCTS.length} eye-care brands`, text: `Covering ${THERAPY_CATEGORIES.length} therapy areas, from dry eye to infection.` },
  { icon: Sparkles, when: 'Innovation', title: 'A new range', text: 'Warmers, cooling and field-care products for everyday comfort.' },
  { icon: Rocket, when: 'Next', title: 'Beyond the eye', text: 'Specialty healthcare products and medical devices.', next: true },
];

export function AboutClient() {
  return (
    <>
      <PageHero
        crumbs={[{ label: 'Home', href: '/' }, { label: 'About Us' }]}
        eyebrow="About Us"
        lines={['Our story', 'so far.']}
        highlight={{ 'story': 'text-revora-cobalt', 'far.': 'text-revora-crimson' }}
        text="A young Ahmedabad company with one clear purpose — eye care that India can rely on."
        actions={
          <>
            <Button href="/profile" arrow="up-right" magnetic>Company profile</Button>
            <Button href="/philosophy" variant="outline">Our philosophy</Button>
          </>
        }
        visual={<EyeDropScene />}
      />

      {/* ── mission & vision ── */}
      <section className="px-5 pb-20 tablet:px-8 tablet:pb-28">
        <div className="mx-auto max-w-330">
          <SectionHeading eyebrow="Why we exist" lines={['Mission & vision.']} highlight={{ 'vision.': 'text-revora-cobalt' }} />
          <div className="mt-12 grid gap-5 tablet-lg:grid-cols-2">
            {PURPOSE.map((p, i) => (
              <FadeUp key={p.tag} delay={i * 0.1}>
                <div
                  className={`group relative isolate flex h-full min-h-[280px] flex-col overflow-hidden rounded-[28px] p-8 tablet:p-10 ${
                    p.filled ? 'bg-revora-cobalt text-white' : 'border border-revora-cobalt/10 bg-white'
                  }`}
                >
                  {p.filled && <div aria-hidden className="absolute -bottom-24 -right-16 -z-10 h-72 w-72 rounded-full bg-revora-cobalt-light/40 blur-3xl" />}
                  <span className={`grid h-12 w-12 place-items-center rounded-2xl transition-transform duration-500 group-hover:rotate-[-8deg] ${p.filled ? 'bg-white/15' : 'bg-revora-sky text-revora-cobalt'}`}>
                    <p.icon className="h-5 w-5" />
                  </span>
                  <p className={`mt-auto pt-12 font-sans text-[11px] font-semibold uppercase tracking-[0.16em] ${p.filled ? 'text-revora-cobalt-pale' : 'text-revora-crimson'}`}>{p.tag}</p>
                  <p className={`mt-2 font-heading text-[clamp(1.4rem,2.4vw,1.9rem)] font-extrabold leading-snug tracking-[-0.01em] ${p.filled ? '' : 'text-revora-slate'}`}>{p.text}</p>
                </div>
              </FadeUp>
            ))}
          </div>
        </div>
      </section>

      {/* ── our journey ── */}
      <section className="bg-white px-5 py-20 tablet:px-8 tablet:py-28">
        <div className="mx-auto max-w-330">
          <SectionHeading
            eyebrow="Our journey"
            lines={['Step by step.']}
            highlight={{ 'step.': 'text-revora-crimson' }}
            aside="Where we started, where we are, and where we’re heading."
          />
          <div className="relative mt-14 grid gap-8 border-l border-revora-cobalt/15 pl-8 desktop:grid-cols-5 desktop:gap-5 desktop:border-l-0 desktop:border-t desktop:pl-0 desktop:pt-10">
            {JOURNEY.map((j, i) => (
              <FadeUp key={j.title} delay={i * 0.08} className="relative">
                <div>
                  <span
                    aria-hidden
                    className={`absolute -left-[41px] top-1 h-4 w-4 rounded-full ring-4 ring-white desktop:-top-[49px] desktop:left-0 ${j.next ? 'border-2 border-dashed border-revora-crimson bg-white' : 'bg-revora-cobalt'}`}
                  />
                  <span className={`grid h-11 w-11 place-items-center rounded-xl ${j.next ? 'bg-revora-crimson-tint text-revora-crimson' : 'bg-revora-sky text-revora-cobalt'}`}>
                    <j.icon className="h-5 w-5" />
                  </span>
                  <p className={`mt-5 font-sans text-[11px] font-semibold uppercase tracking-[0.16em] ${j.next ? 'text-revora-crimson' : 'text-revora-slate-muted'}`}>{j.when}</p>
                  <h3 className="mt-1 font-heading text-[1.25rem] font-extrabold leading-tight text-revora-slate">{j.title}</h3>
                  <p className="mt-2 font-sans text-[14.5px] leading-[1.6] text-revora-slate-light">{j.text}</p>
                </div>
              </FadeUp>
            ))}
          </div>
        </div>
      </section>

      {/* ── leadership & vision (founder) ── */}
      <section className="border-b border-revora-cobalt/10 px-5 py-20 tablet:px-8 tablet:py-28">
        <div className="mx-auto max-w-330">
          <SectionHeading
            eyebrow="Leadership & Direction"
            lines={['Vision from the founder.']}
            highlight={{ 'founder.': 'text-revora-cobalt' }}
            aside="Steering Revora's journey with a singular commitment to ophthalmic excellence."
          />

          <div className="mt-14 grid grid-cols-[minmax(0,1fr)] items-center gap-10 tablet-lg:grid-cols-[0.85fr_1.15fr] tablet-lg:gap-16">
            <FadeUp>
              <div className="relative mx-auto max-w-[420px] tablet-lg:mx-0 tablet-lg:max-w-none">
                <div className="relative aspect-square w-full overflow-hidden rounded-[28px] border border-revora-cobalt/15 bg-revora-cobalt-deep shadow-[0_24px_60px_-20px_rgba(11,74,143,0.25)]">
                  <Image
                    src="/images/leadership/founder.webp"
                    alt="Founder & Managing Director — Revora Healthcare"
                    fill
                    loading="eager"
                    sizes="(min-width: 1024px) 40vw, 85vw"
                    className="object-cover object-top transition-transform duration-700 hover:scale-[1.03]"
                  />
                  <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-revora-slate/90 via-revora-slate/40 to-transparent p-6 text-white">
                    <p className="font-heading text-xl font-bold">Founder & Managing Director</p>
                    <p className="mt-0.5 font-sans text-[13px] text-white/80">Revora Healthcare Private Limited</p>
                  </div>
                </div>
              </div>
            </FadeUp>

            <FadeUp delay={0.15}>
              <div className="space-y-6">
                <div className="rounded-[24px] border border-revora-cobalt/15 bg-revora-sky/40 p-6 tablet:p-8">
                  <p className="font-heading text-lg font-bold italic leading-relaxed text-revora-slate tablet:text-xl">
                    “Healthcare is about earning trust — of the surgeon in theatre and the patient at home, every day.”
                  </p>
                </div>

                <div className="space-y-4 font-sans text-[15.5px] leading-[1.8] text-revora-slate-light">
                  <p>
                    Revora started with a simple idea — eye-care medicines that doctors can rely on and patients can trust.
                  </p>
                  <p>
                    Every decision since, from where we manufacture to which brands we build, comes back to that idea.
                  </p>
                </div>

                <div className="flex flex-wrap items-center gap-4 border-t border-revora-cobalt/10 pt-6">
                  <div>
                    <p className="font-heading text-[17px] font-extrabold text-revora-slate">Founder & Managing Director</p>
                    <p className="font-sans text-[13px] text-revora-slate-muted">Ahmedabad, Gujarat</p>
                  </div>
                  <span className="inline-flex items-center gap-1.5 rounded-full bg-revora-sky px-4 py-2 font-sans text-[12px] font-semibold text-revora-cobalt">
                    <span className="h-2 w-2 rounded-full bg-revora-cobalt" />
                    WHO-GMP & ISO 9001:2015 Direction
                  </span>
                </div>
              </div>
            </FadeUp>
          </div>
        </div>
      </section>
    </>
  );
}
