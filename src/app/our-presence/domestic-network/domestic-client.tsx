'use client';

import { useState } from 'react';
import Image from 'next/image';
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion';
import { toast } from 'sonner';
import { BadgeCheck, Factory, Hospital, Layers, Package, Pill, Stethoscope, Truck } from 'lucide-react';
import { expoOut } from '@/lib/easings';
import { ALL_PRODUCTS, THERAPY_CATEGORIES } from '@/lib/therapies-data';
import { Counter, FadeUp } from '@/components/ui/primitives';
import { PageHero } from '@/components/ui/page-hero';
import { SectionHeading } from '@/components/ui/section-heading';
import { Button } from '@/components/ui/button';
import { MediaFrame } from '@/components/ui/media-frame';
import { NetworkHub } from '@/components/illustrations/presence-illustrations';
import { SupplyFlow } from '@/components/presence/supply-flow';
import { PresenceLinks } from '@/components/presence/presence-links';
import { IndiaDotMap } from '@/components/maps/india-dot-map';

const PARTNER_EMAIL = 'depot@revorahealthcare.com';

const AUDIENCES = [
  {
    id: 'doctors',
    icon: Stethoscope,
    name: 'Doctors',
    image: '/images/photos/doctor-portrait.webp',
    alt: 'Doctor in a white coat with a stethoscope',
    text: 'Ophthalmic formulations you can prescribe with confidence, with product literature and samples on request.',
    points: ['Product literature', 'Samples on request', 'Medical representative support'],
  },
  {
    id: 'hospitals',
    icon: Hospital,
    name: 'Hospitals & eye clinics',
    image: '/images/photos/hospital-doctors.webp',
    alt: 'Two doctors reviewing a scan together',
    text: 'A focused portfolio for the eye clinic — from anti-infectives to post-surgical care and retinal nutrition.',
    points: ['Four therapy areas', 'Institutional supply', 'Rate cards on request'],
  },
  {
    id: 'pharmacies',
    icon: Pill,
    name: 'Pharmacies',
    image: '/images/photos/pharmacist.webp',
    alt: 'Pharmacist in a white coat at a pharmacy',
    text: 'Recognisable, premium cartons and steady supply for the pharmacies patients visit every day.',
    points: ['Premium outer cartons', 'Consistent supply', 'Easy re-ordering'],
  },
  {
    id: 'distributors',
    icon: Truck,
    name: 'Distributors & stockists',
    image: '/images/photos/warehouse-inventory.webp',
    alt: 'Worker checking medicine stock in a warehouse',
    text: 'Partnerships that bring a dedicated ophthalmic portfolio to new territories across India.',
    points: ['Dedicated eye-care range', 'Made in our own plant', 'Support from Ahmedabad HQ'],
  },
];

const WHY = [
  { icon: Layers, value: ALL_PRODUCTS.length, label: 'eye-care brands in one range' },
  { icon: Package, value: THERAPY_CATEGORIES.length, label: 'focused therapy areas' },
  { icon: Factory, value: 1, label: 'own WHO-GMP certified plant' },
];

export function DomesticClient() {
  return (
    <>
      <PageHero
        crumbs={[{ label: 'Home', href: '/' }, { label: 'Our Presence', href: '/our-presence' }, { label: 'Domestic Network' }]}
        eyebrow="Domestic Network"
        lines={['Every link in', 'the eye-care chain.']}
        highlight={{ 'eye-care': 'text-revora-cobalt' }}
        text="From our plant to doctors, hospitals, pharmacies and distributors — building lasting relationships across India."
        actions={
          <>
            <Button href="#partner" arrow="up-right" magnetic>Become a partner</Button>
            <Button href="#who" variant="outline">Who we serve</Button>
          </>
        }
        visual={<NetworkHub />}
      />

      {/* ── across India map ── */}
      <section className="px-5 pb-20 tablet:px-8 tablet:pb-28">
        <div className="mx-auto grid max-w-330 grid-cols-[minmax(0,1fr)] items-center gap-12 overflow-hidden rounded-[32px] border border-revora-cobalt/10 bg-white p-6 tablet:p-12 tablet-lg:grid-cols-[0.9fr_1.1fr] tablet-lg:gap-16">
          <div>
            <SectionHeading eyebrow="Across India" lines={['One office. One plant.', 'All of India.']} highlight={{ 'India.': 'text-revora-cobalt' }} />
            <FadeUp delay={0.15}>
              <p className="mt-6 max-w-md font-sans text-[16.5px] leading-[1.75] text-revora-slate-light">
                Made at our WHO-GMP plant in Paonta Sahib, coordinated from our Ahmedabad headquarters, and delivered to doctors, hospitals and
                pharmacies across the country through our distribution partners.
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
            </FadeUp>
          </div>
          <IndiaDotMap className="mx-auto w-full max-w-[460px]" />
        </div>
      </section>

      <WhoWeServe />
      <SupplyFlow image="/images/photos/warehouse-dispatch.webp" imageAlt="Workers moving stock through a warehouse" />
      <Partner />
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

        <div role="tablist" aria-label="Who we serve" className="-mx-5 mt-10 flex gap-2 overflow-x-auto px-5 pb-1 [scrollbar-width:none] tablet:mx-0 tablet:px-0">
          {AUDIENCES.map((x) => {
            const on = x.id === active;
            return (
              <button
                key={x.id}
                type="button"
                role="tab"
                aria-selected={on}
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

        <div className="mt-8 grid grid-cols-[minmax(0,1fr)] overflow-hidden rounded-[28px] border border-revora-cobalt/10 bg-[#F6F9FC] tablet-lg:grid-cols-2">
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

/* ── become a partner ─────────────────────────────────────── */
function Partner() {
  const [form, setForm] = useState({ name: '', company: '', city: '', phone: '', email: '', type: 'Distributor', message: '' });
  const set = (k: keyof typeof form) => (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => setForm({ ...form, [k]: e.target.value });

  // No backend yet: open the visitor's email app with the enquiry filled in.
  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    const subject = `Partnership enquiry — ${form.company || form.name} (${form.city})`;
    const body = [`Type: ${form.type}`, `Name: ${form.name}`, `Company: ${form.company}`, `City / territory: ${form.city}`, `Phone: ${form.phone}`, `Email: ${form.email}`, '', form.message].join('\n');
    window.location.href = `mailto:${PARTNER_EMAIL}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
    toast.success('Your email app is opening', { description: `Press send to reach ${PARTNER_EMAIL}.` });
  };

  const field = 'w-full rounded-xl border border-revora-cobalt/15 bg-white px-4 py-3 font-sans text-[16px] text-revora-slate outline-none transition-[border-color,box-shadow] placeholder:text-revora-slate-muted focus:border-revora-cobalt focus:shadow-[0_0_0_4px_rgba(11,74,143,0.12)] tablet:text-[15px]';
  const label = 'mb-1.5 block font-sans text-[12px] font-semibold uppercase tracking-[0.12em] text-revora-slate-light';

  return (
    <section id="partner" className="px-5 py-20 tablet:px-8 tablet:py-28">
      <div className="mx-auto grid max-w-330 grid-cols-[minmax(0,1fr)] gap-12 tablet-lg:grid-cols-[0.9fr_1.1fr] tablet-lg:gap-16">
        <div>
          <SectionHeading eyebrow="Become a partner" lines={['Bring Revora to', 'your territory.']} highlight={{ 'territory.': 'text-revora-cobalt' }} />
          <FadeUp delay={0.15}>
            <p className="mt-6 max-w-md font-sans text-[16.5px] leading-[1.75] text-revora-slate-light">
              We’re looking for distributors and stockists who share our focus on reliable eye care.
            </p>
            <dl className="mt-10 grid grid-cols-3 gap-4 border-t border-revora-cobalt/10 pt-8">
              {WHY.map((w) => (
                <div key={w.label}>
                  <dd className="font-heading text-4xl font-extrabold tracking-tight text-revora-cobalt tablet:text-5xl"><Counter to={w.value} /></dd>
                  <dt className="mt-1 font-sans text-[13px] font-medium leading-snug text-revora-slate-light">{w.label}</dt>
                </div>
              ))}
            </dl>
          </FadeUp>
          <FadeUp delay={0.25}>
            <MediaFrame src="/images/photos/warehouse-inventory.webp" alt="Worker checking medicine stock in a warehouse" aspect="aspect-[16/10]" className="mt-10" sizes="(min-width: 1024px) 40vw, 100vw" />
          </FadeUp>
        </div>

        <FadeUp delay={0.1}>
          <form onSubmit={submit} className="rounded-[28px] border border-revora-cobalt/10 bg-white p-6 tablet:p-9">
            <h3 className="font-heading text-2xl font-extrabold text-revora-slate">Partnership enquiry</h3>
            <p className="mt-1 font-sans text-[14px] text-revora-slate-muted">Our business team will get back to you.</p>
            <div className="mt-7 grid gap-5 tablet:grid-cols-2">
              <div className="tablet:col-span-2">
                <span className={label}>I am a</span>
                <div className="flex flex-wrap gap-2">
                  {['Distributor', 'Stockist', 'Hospital / clinic', 'Pharmacy'].map((t) => (
                    <button
                      type="button"
                      key={t}
                      onClick={() => setForm({ ...form, type: t })}
                      aria-pressed={form.type === t}
                      className={`rounded-full border px-4 py-2 font-sans text-[14px] font-semibold transition-colors ${form.type === t ? 'border-revora-cobalt bg-revora-cobalt text-white' : 'border-revora-cobalt/15 bg-white text-revora-slate hover:border-revora-cobalt'}`}
                    >
                      {t}
                    </button>
                  ))}
                </div>
              </div>
              <label>
                <span className={label}>Your name *</span>
                <input required value={form.name} onChange={set('name')} className={field} placeholder="Full name" />
              </label>
              <label>
                <span className={label}>Company</span>
                <input value={form.company} onChange={set('company')} className={field} placeholder="Firm name" />
              </label>
              <label>
                <span className={label}>City / territory *</span>
                <input required value={form.city} onChange={set('city')} className={field} placeholder="e.g. Surat" />
              </label>
              <label>
                <span className={label}>Phone *</span>
                <input required type="tel" value={form.phone} onChange={set('phone')} className={field} placeholder="+91" />
              </label>
              <label className="tablet:col-span-2">
                <span className={label}>Email</span>
                <input type="email" value={form.email} onChange={set('email')} className={field} placeholder="you@example.com" />
              </label>
              <label className="tablet:col-span-2">
                <span className={label}>Message</span>
                <textarea rows={3} value={form.message} onChange={set('message')} className={field} placeholder="Tell us about your business and the area you cover" />
              </label>
            </div>
            <div className="mt-7 flex justify-end">
              <Button type="submit" arrow="up-right" magnetic>Send enquiry</Button>
            </div>
          </form>
        </FadeUp>
      </div>
    </section>
  );
}
