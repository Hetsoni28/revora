'use client';

import Image from 'next/image';
import { Building2, CalendarDays, Factory, Hospital, Layers, MapPin, Pill, Stethoscope, Truck } from 'lucide-react';
import { ALL_PRODUCTS, THERAPY_CATEGORIES } from '@/lib/therapies-data';
import { Counter, FadeUp } from '@/components/ui/primitives';
import { PageHero } from '@/components/ui/page-hero';
import { SectionHeading } from '@/components/ui/section-heading';
import { Button } from '@/components/ui/button';
import { ProductLogoLink } from '@/components/offerings/product-logo';
import { EyeDropScene } from '@/components/illustrations/illustrations';
import { NextPages } from '@/components/company/next-pages';
import { MediaFrame } from '@/components/ui/media-frame';

const FACTS = [
  { icon: CalendarDays, k: 'Incorporated', v: '10 March 2026' },
  { icon: Building2, k: 'Headquarters', v: 'Ahmedabad, Gujarat' },
  { icon: Factory, k: 'Manufacturing', v: 'Paonta Sahib, H.P.' },
  { icon: MapPin, k: 'Serving', v: 'Across India' },
];

const FOCUS = [
  { tag: 'Today', title: 'Ophthalmic pharmaceuticals', text: 'Eye drops and eye-care nutrition across four therapy areas.', now: true },
  { tag: 'Expanding', title: 'Specialty healthcare products', text: 'Building beyond ophthalmology into specialty care.', now: false },
  { tag: 'Expanding', title: 'Medical devices', text: 'Adding medical devices to our portfolio.', now: false },
];

const SERVE = [
  { icon: Stethoscope, name: 'Doctors' },
  { icon: Hospital, name: 'Hospitals' },
  { icon: Pill, name: 'Pharmacies' },
  { icon: Truck, name: 'Distributors' },
];

const DETAILS = [
  ['Company', 'Revora Healthcare Private Limited'],
  ['CIN', 'U21000GJ2026PTC174674'],
  ['Incorporated', '10 March 2026'],
  ['Registered office', '3rd Floor, S.G. Business Hub, A/303, Sarkhej–Gandhinagar Highway, near Gota Overbridge, Ognaj, Ahmedabad, Gujarat 380060'],
];

export function AboutClient() {
  return (
    <>
      <PageHero
        crumbs={[{ label: 'Home', href: '/' }, { label: 'About Revora' }]}
        eyebrow="About Revora"
        lines={['Healthcare,', 'beyond the cure.']}
        highlight={{ 'beyond': 'text-revora-cobalt', 'cure.': 'text-revora-crimson' }}
        text="Reliable eye care from Ahmedabad — for doctors, hospitals, pharmacies and distributors across India."
        actions={
          <>
            <Button href="/our-offerings" arrow="up-right" magnetic>Our products</Button>
            <Button href="/philosophy" variant="outline">Our philosophy</Button>
          </>
        }
        visual={<EyeDropScene />}
      />

      {/* ── key facts ── */}
      <div className="px-5 tablet:px-8">
        <FadeUp className="mx-auto grid max-w-330 grid-cols-2 overflow-hidden rounded-[28px] border border-revora-cobalt/10 bg-white desktop:grid-cols-4">
          {FACTS.map((f, i) => (
            <div key={f.k} className={`flex items-start gap-3.5 p-6 tablet:p-8 ${i % 2 ? 'border-l border-revora-cobalt/10' : ''} ${i > 1 ? 'border-t border-revora-cobalt/10 desktop:border-t-0' : ''} ${i === 2 ? 'desktop:border-l' : ''}`}>
              <f.icon className="mt-0.5 h-5 w-5 shrink-0 text-revora-cobalt" />
              <div>
                <p className="font-sans text-[11px] font-semibold uppercase tracking-[0.16em] text-revora-slate-muted">{f.k}</p>
                <p className="mt-1 font-heading text-[17px] font-extrabold leading-snug text-revora-slate tablet:text-xl">{f.v}</p>
              </div>
            </div>
          ))}
        </FadeUp>
      </div>

      {/* ── who we are ── */}
      <section className="px-5 py-20 tablet:px-8 tablet:py-28">
        <div className="mx-auto grid max-w-330 grid-cols-[minmax(0,1fr)] gap-12 tablet-lg:grid-cols-[0.9fr_1.1fr] tablet-lg:gap-20">
          <div>
            <SectionHeading eyebrow="Who we are" lines={['Eye care first.', 'More to come.']} highlight={{ 'first.': 'text-revora-cobalt' }} />
            <FadeUp delay={0.15}>
              <p className="mt-6 max-w-md font-sans text-[16.5px] leading-[1.75] text-revora-slate-light">
                An Ahmedabad pharmaceutical company focused on ophthalmics — and growing into specialty healthcare products and medical
                devices.
              </p>
            </FadeUp>
            <FadeUp delay={0.25}>
              <dl className="mt-10 grid grid-cols-2 gap-6 border-t border-revora-cobalt/10 pt-8">
                <div>
                  <dd className="font-heading text-5xl font-extrabold tracking-tight text-revora-cobalt"><Counter to={ALL_PRODUCTS.length} /></dd>
                  <dt className="mt-1 font-sans text-[13px] font-medium text-revora-slate-light">Eye-care brands</dt>
                </div>
                <div>
                  <dd className="font-heading text-5xl font-extrabold tracking-tight text-revora-cobalt"><Counter to={THERAPY_CATEGORIES.length} /></dd>
                  <dt className="mt-1 font-sans text-[13px] font-medium text-revora-slate-light">Therapy areas</dt>
                </div>
              </dl>
            </FadeUp>
          </div>

          <div className="space-y-4">
            {FOCUS.map((f, i) => (
              <FadeUp key={f.title} delay={i * 0.1}>
                <div
                  className={`group flex items-start gap-5 rounded-[24px] border p-6 transition-shadow duration-500 hover:shadow-[0_24px_50px_-28px_rgba(11,74,143,0.45)] tablet:p-7 ${
                    f.now ? 'border-transparent bg-revora-cobalt text-white' : 'border-revora-cobalt/10 bg-white'
                  }`}
                >
                  <span className={`grid h-12 w-12 shrink-0 place-items-center rounded-2xl transition-transform duration-500 group-hover:rotate-[-8deg] ${f.now ? 'bg-white/15' : 'bg-revora-sky text-revora-cobalt'}`}>
                    <Layers className="h-5 w-5" />
                  </span>
                  <div>
                    <span className={`font-sans text-[11px] font-semibold uppercase tracking-[0.16em] ${f.now ? 'text-revora-cobalt-pale' : 'text-revora-crimson'}`}>{f.tag}</span>
                    <h3 className={`mt-1 font-heading text-[1.35rem] font-extrabold leading-tight ${f.now ? '' : 'text-revora-slate'}`}>{f.title}</h3>
                    <p className={`mt-1.5 font-sans text-[14.5px] leading-[1.6] ${f.now ? 'text-white/75' : 'text-revora-slate-light'}`}>{f.text}</p>
                  </div>
                </div>
              </FadeUp>
            ))}
            <FadeUp delay={0.3}>
              <div className="flex flex-wrap items-center gap-2 pt-4">
                <span className="mr-1 font-sans text-[13px] font-semibold text-revora-slate-muted">We serve</span>
                {SERVE.map((s) => (
                  <span key={s.name} className="inline-flex items-center gap-2 rounded-full border border-revora-cobalt/15 bg-white px-4 py-2 font-sans text-[14px] font-semibold text-revora-slate">
                    <s.icon className="h-4 w-4 text-revora-cobalt" /> {s.name}
                  </span>
                ))}
              </div>
            </FadeUp>
          </div>
        </div>
      </section>

      {/* ── leadership & vision (founder) ── */}
      <section className="border-y border-revora-cobalt/10 bg-white px-5 py-20 tablet:px-8 tablet:py-28">
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
                    Revora was founded in Ahmedabad to pair dedicated WHO-GMP manufacturing with focused eye-care formulations.
                  </p>
                  <p>
                    Our own eye-drop plant at Paonta Sahib keeps quality in our hands — and the portfolio keeps growing across India.
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

      {/* ── the people we serve ── */}
      <section className="px-5 py-20 tablet:px-8 tablet:py-28">
        <div className="mx-auto grid max-w-330 gap-5 tablet:grid-cols-2">
          {[
            { src: '/images/photos/eye-exam-doctor.webp', alt: 'Patient during an eye examination', label: 'For doctors', text: 'Formulations ophthalmologists can prescribe with confidence.' },
            { src: '/images/photos/pharmacist.webp', alt: 'Pharmacist in a white coat at a pharmacy', label: 'For pharmacies', text: 'Recognisable brands and steady supply for every counter.' },
          ].map((p, i) => (
            <FadeUp key={p.label} delay={i * 0.1}>
              <MediaFrame src={p.src} alt={p.alt} aspect="aspect-[4/5] tablet:aspect-[4/3] desktop:aspect-[5/4]" sizes="(min-width: 768px) 50vw, 100vw" />
              <p className="mt-5 font-sans text-[11px] font-semibold uppercase tracking-[0.16em] text-revora-crimson">{p.label}</p>
              <p className="mt-1.5 max-w-md font-heading text-[1.3rem] font-bold leading-snug text-revora-slate">{p.text}</p>
            </FadeUp>
          ))}
        </div>
      </section>

      {/* ── brands ── */}
      <section className="bg-white px-5 py-20 tablet:px-8 tablet:py-28">
        <div className="mx-auto max-w-330">
          <SectionHeading
            eyebrow="Our brands"
            lines={['Nine brands. One focus.']}
            highlight={{ 'focus.': 'text-revora-crimson' }}
            aside="Tap a brand to see the product."
          />
          <div className="mt-12 grid grid-cols-2 items-center gap-x-8 gap-y-10 tablet:grid-cols-3">
            {ALL_PRODUCTS.map((p, i) => (
              <FadeUp key={p.id} delay={(i % 3) * 0.08}>
                <ProductLogoLink product={p} className="h-[90px] w-full tablet:h-[120px]" sizes="(min-width: 768px) 30vw, 45vw" />
              </FadeUp>
            ))}
          </div>
        </div>
      </section>

      {/* ── company details ── */}
      <section className="px-5 py-20 tablet:px-8 tablet:py-28">
        <div className="mx-auto max-w-330">
          <SectionHeading eyebrow="Company details" lines={['On the record.']} highlight={{ 'record.': 'text-revora-cobalt' }} />
          <FadeUp delay={0.1}>
            <dl className="mt-10 overflow-hidden rounded-[28px] border border-revora-cobalt/10 bg-white">
              {DETAILS.map(([k, v]) => (
                <div key={k} className="grid gap-1 border-b border-revora-cobalt/10 px-6 py-5 last:border-b-0 tablet:grid-cols-[220px_1fr] tablet:gap-6 tablet:px-8">
                  <dt className="font-sans text-[12px] font-semibold uppercase tracking-[0.14em] text-revora-slate-muted">{k}</dt>
                  <dd className={`font-sans text-[15.5px] font-medium leading-[1.6] text-revora-slate ${k === 'CIN' ? 'font-mono text-[14.5px]' : ''}`}>{v}</dd>
                </div>
              ))}
            </dl>
          </FadeUp>
        </div>
      </section>

      <NextPages current="/about" />
    </>
  );
}
