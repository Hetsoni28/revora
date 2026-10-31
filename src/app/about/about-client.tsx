'use client';

import Image from 'next/image';
import { Bone, Building2, Compass, Factory, Globe2, History, Layers, Rocket, Sparkles, Target } from 'lucide-react';
import { useCatalogue } from '@/components/catalogue/catalogue-context';
import { SITE } from '@/lib/seo';
import { FadeUp } from '@/components/ui/primitives';
import { PageHero } from '@/components/ui/page-hero';
import { SectionHeading } from '@/components/ui/section-heading';
import { Button } from '@/components/ui/button';
import { EyeDropScene } from '@/components/illustrations/illustrations';

const PURPOSE = [
  {
    icon: Target,
    tag: 'Our mission',
    text: 'To develop, manufacture and deliver dependable, differentiated medicines for every doctor, hospital and partner we serve, in India and beyond.',
    filled: true,
  },
  {
    icon: Compass,
    tag: 'Our vision',
    text: 'To become one of India’s most trusted pharmaceutical companies, recognised for differentiated medicines, uncompromising quality and partnerships that grow across borders.',
    filled: false,
  },
];

const journeyFor = (brands: number, areas: number) => [
  { icon: History, when: 'The foundation', title: '15+ years of leadership', text: 'Across sales, marketing, manufacturing and export.' },
  { icon: Building2, when: 'March 2026', title: 'Founded in Ahmedabad', text: 'Revora Healthcare Private Limited is incorporated on 10 March 2026.' },
  { icon: Factory, when: 'Manufacturing', title: 'WHO-GMP facility', text: 'Paonta Sahib, Himachal Pradesh: eye drops, ointments, nasal sprays and tablets.' },
  { icon: Layers, when: 'Portfolio', title: `${brands} healthcare brands`, text: `Across ${areas} therapy areas.` },
  { icon: Bone, when: 'Orthopaedics', title: 'Entry with HYSTRIDE', text: 'Our first step into joint care.' },
  { icon: Sparkles, when: 'Innovation', title: 'Thermal care range', text: 'Warmers, cooling and field-care products for extreme conditions.' },
  { icon: Globe2, when: 'Now', title: 'Manufacturing & export', text: 'Third-party manufacturing and export partnerships.' },
  { icon: Rocket, when: 'Next', title: 'New therapy areas', text: 'Specialty healthcare and medical devices.', next: true },
];

export function AboutClient() {
  const { products, categories } = useCatalogue();
  const JOURNEY = journeyFor(products.length, categories.length);
  return (
    <>
      <PageHero
        crumbs={[{ label: 'Home', href: '/' }, { label: 'About Us' }]}
        eyebrow="About Revora Healthcare"
        backdrop="/images/photos/about-cleanroom.webp"
        lines={['New name.', 'Proven experience.', 'Bigger ambition.']}
        highlight={{ 'experience.': 'text-revora-cobalt', 'ambition.': 'text-revora-crimson' }}
        text="Revora Healthcare brings 15+ years of pharmaceutical leadership to a new-generation company that develops, manufactures and markets trusted medicines for India and the world."
        actions={
          <>
            <Button href="/profile" arrow="up-right" magnetic>Company profile</Button>
            <Button href="/philosophy" variant="outline">Our philosophy</Button>
          </>
        }
        visual={<EyeDropScene />}
      />

      {/* ── the Revora story ── */}
      <section className="px-5 pb-16 tablet:px-8 tablet:pb-20">
        <div className="mx-auto grid max-w-330 grid-cols-[minmax(0,1fr)] gap-8 tablet-lg:grid-cols-[0.8fr_1.2fr] tablet-lg:gap-16">
          <SectionHeading eyebrow="Our story" lines={['The Revora story.']} highlight={{ 'story.': 'text-revora-cobalt' }} />
          <FadeUp delay={0.1}>
            <p className="font-sans text-[17px] leading-[1.8] text-revora-slate-light">
              Revora Healthcare was incorporated in Ahmedabad in March 2026. The experience behind it goes back more than fifteen years, across
              sales, marketing, manufacturing and export, including oncology and supplies to India’s defence sector. Revora began where precision
              matters most, in ophthalmology. That discipline now shapes everything we do: orthopaedics, nutrition, thermal innovation,
              manufacturing for partners and export. <span className="font-semibold text-revora-slate">The name is new. The standards are not.</span>
            </p>
          </FadeUp>
        </div>
      </section>

      {/* ── mission & vision ── */}
      <section className="px-5 pb-20 tablet:px-8 tablet:pb-28">
        <div className="mx-auto max-w-330">
          <SectionHeading eyebrow="Why we exist" lines={['Mission & vision.']} highlight={{ 'vision.': 'text-revora-cobalt' }} />
          <div className="mt-12 grid gap-5 tablet-lg:grid-cols-2">
            {PURPOSE.map((p, i) => (
              <FadeUp key={p.tag} delay={i * 0.1}>
                <div
                  className={`group relative isolate flex h-full min-h-70 flex-col overflow-hidden rounded-[28px] p-8 tablet:p-10 ${
                    p.filled ? 'bg-revora-cobalt text-white' : 'border border-revora-cobalt/10 bg-white'
                  }`}
                >
                  {p.filled && <div aria-hidden className="absolute -bottom-24 -right-16 -z-10 h-72 w-72 rounded-full bg-revora-cobalt-light/40 blur-3xl" />}
                  <span className={`grid h-12 w-12 place-items-center rounded-2xl transition-transform duration-500 group-hover:rotate-[-8deg] ${p.filled ? 'bg-white/15' : 'bg-revora-sky text-revora-cobalt'}`}>
                    <p.icon className="h-5 w-5" />
                  </span>
                  <p className={`mt-auto pt-12 font-sans text-[11px] font-semibold uppercase tracking-[0.16em] ${p.filled ? 'text-white/80' : 'text-revora-crimson'}`}>{p.tag}</p>
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
          <div className="relative mt-14 grid gap-8 border-l border-revora-cobalt/15 pl-8 desktop:grid-cols-4 desktop:gap-x-5 desktop:gap-y-14 desktop:border-l-0 desktop:border-t desktop:pl-0 desktop:pt-10">
            {JOURNEY.map((j, i) => (
              <FadeUp key={j.title} delay={i * 0.08} className="relative">
                <div>
                  <span
                    aria-hidden
                    className={`absolute -left-10.25 top-1 h-4 w-4 rounded-full ring-4 ring-white desktop:-top-12.25 desktop:left-0 ${j.next ? 'border-2 border-dashed border-revora-crimson bg-white' : 'bg-revora-cobalt'}`}
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
            aside="Steering Revora’s growth with a commitment to quality, integrity and ambition."
          />

          <div className="mt-14 grid grid-cols-[minmax(0,1fr)] items-center gap-10 tablet-lg:grid-cols-[0.85fr_1.15fr] tablet-lg:gap-16">
            <FadeUp>
              <div className="relative mx-auto max-w-105 tablet-lg:mx-0 tablet-lg:max-w-none">
                <div className="relative aspect-square w-full overflow-hidden rounded-[28px] border border-revora-cobalt/15 bg-revora-cobalt-deep shadow-[0_24px_60px_-20px_rgba(11,74,143,0.25)]">
                  <Image
                    src="/images/leadership/founder.webp"
                    alt={`${SITE.founder.name}, ${SITE.founder.title} of Revora Healthcare`}
                    fill
                    loading="eager"
                    sizes="(min-width: 1024px) 40vw, 85vw"
                    className="object-cover object-top transition-transform duration-700 hover:scale-[1.03]"
                  />
                  <div className="absolute inset-x-0 bottom-0 bg-linear-to-t from-revora-slate/90 via-revora-slate/40 to-transparent p-6 text-white">
                    <p className="font-heading text-xl font-bold">{SITE.founder.name}</p>
                    <p className="mt-0.5 font-sans text-[13px] text-white/80">{SITE.founder.title} · {SITE.legalName}</p>
                  </div>
                </div>
              </div>
            </FadeUp>

            <FadeUp delay={0.15}>
              <div className="space-y-6">
                <div className="rounded-[24px] border border-revora-cobalt/15 bg-revora-sky/40 p-6 tablet:p-8">
                  <p className="font-heading text-lg font-bold italic leading-relaxed text-revora-slate tablet:text-xl">
                    “Every great pharmaceutical company in India started small. What separated the ones that endured was how seriously they took the
                    trust placed in them.”
                  </p>
                </div>

                <div className="space-y-4 font-sans text-[15.5px] leading-[1.8] text-revora-slate-light">
                  <p>
                    I have spent more than fifteen years in this industry, in the field, in marketing, in manufacturing and in export. Revora is
                    everything I learned, built into one company.
                  </p>
                  <p>
                    Our promise to every doctor, partner and Revorian is the same: we will grow fast, but never at the cost of quality or integrity.
                    This is only the beginning.
                  </p>
                </div>

                <div className="flex flex-wrap items-center gap-4 border-t border-revora-cobalt/10 pt-6">
                  <div>
                    <p className="font-heading text-[17px] font-extrabold text-revora-slate">{SITE.founder.name}</p>
                    <p className="font-sans text-[13px] text-revora-slate-muted">{SITE.founder.title} · Ahmedabad, Gujarat</p>
                  </div>
                  <span className="inline-flex items-center gap-1.5 rounded-full bg-revora-sky px-4 py-2 font-sans text-[12px] font-semibold text-revora-cobalt">
                    <span className="h-2 w-2 rounded-full bg-revora-cobalt" />
                    15+ Years · Pharmaceutical Leadership
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
