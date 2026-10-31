'use client';

import { useState } from 'react';
import { ClipboardCheck, Droplets, FlaskConical, Handshake, MessageSquare, Package, Pill, Send, ShieldCheck, SprayCan, Tag } from 'lucide-react';
import { SITE } from '@/lib/seo';
import { useEnquiry } from '@/lib/use-enquiry';
import { FadeUp } from '@/components/ui/primitives';
import { PageHero } from '@/components/ui/page-hero';
import { SectionHeading } from '@/components/ui/section-heading';
import { Button } from '@/components/ui/button';
import { Honeypot } from '@/components/ui/honeypot';

const DOSAGE_FORMS = [
  { icon: Droplets, title: 'Sterile eye drops', text: 'Ophthalmic solutions and suspensions in dropper vials.' },
  { icon: FlaskConical, title: 'Ophthalmic ointments', text: 'Eye ointments in tubes.' },
  { icon: SprayCan, title: 'Nasal sprays', text: 'Metered nasal sprays.' },
  { icon: Pill, title: 'Tablets', text: 'Oral tablets, including nutraceuticals.' },
];

const STRENGTHS = [
  { icon: ShieldCheck, title: 'WHO-GMP certified facility', text: 'Manufacturing at Paonta Sahib, Himachal Pradesh.' },
  { icon: ClipboardCheck, title: 'In-house QC lab', text: 'Every batch released only after testing by our quality control lab.' },
  { icon: Tag, title: 'Your brand or ours', text: 'Third-party manufacturing under your label, or supply under the Revora brand.' },
  { icon: Package, title: 'Four dosage forms, one roof', text: 'Eye drops, ointments, nasal sprays and tablets from one facility.' },
];

const STEPS = [
  { icon: Send, title: 'Enquire', text: 'Share your product and volumes.' },
  { icon: MessageSquare, title: 'Discuss', text: 'Formulation, packs and timelines.' },
  { icon: Handshake, title: 'Agree', text: 'Commercials and quality agreement.' },
  { icon: ClipboardCheck, title: 'Manufacture', text: 'Production with QC release.' },
];

/** Manufacturing & CDMO: what the facility makes, why partner with us, and an enquiry form. */
export function ManufacturingClient() {
  return (
    <>
      <PageHero
        crumbs={[{ label: 'Home', href: '/' }, { label: 'Manufacturing & CDMO' }]}
        eyebrow="Manufacturing & CDMO"
        lines={['Your formulation.', 'Our discipline.']}
        highlight={{ 'discipline.': 'text-revora-cobalt-pale' }}
        text="Third-party and contract manufacturing of eye drops, ointments, nasal sprays and tablets at a WHO-GMP certified facility, with every batch released by an in-house QC lab."
        background={{ src: '/images/photos/cert-who-gmp.webp', alt: 'Automated eye-drop filling line in a cleanroom' }}
        actions={
          <>
            <Button href="#enquiry" variant="light" arrow="down" magnetic>Manufacture with us</Button>
            <Button href="/certifications" variant="outline-light">Licences & registrations</Button>
          </>
        }
      />

      {/* ── dosage forms ── */}
      <section className="bg-white px-5 py-20 tablet:px-8 tablet:py-28">
        <div className="mx-auto max-w-330">
          <SectionHeading eyebrow="Capabilities" lines={['Four dosage forms.']} highlight={{ 'forms.': 'text-revora-cobalt' }} aside="Made at our WHO-GMP manufacturing facility in Paonta Sahib, Himachal Pradesh." />
          <div className="mt-12 grid gap-4 tablet:grid-cols-2 desktop:grid-cols-4">
            {DOSAGE_FORMS.map((d, i) => (
              <FadeUp key={d.title} delay={i * 0.08}>
                <div className="flex h-full flex-col rounded-[24px] border border-revora-cobalt/10 bg-[#F6F9FC] p-7">
                  <span className="grid h-12 w-12 place-items-center rounded-2xl bg-white text-revora-cobalt shadow-sm">
                    <d.icon className="h-5 w-5" />
                  </span>
                  <h3 className="mt-6 font-heading text-[1.3rem] font-extrabold text-revora-slate">{d.title}</h3>
                  <p className="mt-2 font-sans text-[15px] leading-[1.65] text-revora-slate-light">{d.text}</p>
                </div>
              </FadeUp>
            ))}
          </div>
        </div>
      </section>

      {/* ── why partner ── */}
      <section className="px-5 py-20 tablet:px-8 tablet:py-28">
        <div className="mx-auto max-w-330">
          <SectionHeading eyebrow="Why Revora" lines={['Quality under', 'one roof.']} highlight={{ 'roof.': 'text-revora-crimson' }} />
          <div className="mt-12 grid gap-4 tablet:grid-cols-2">
            {STRENGTHS.map((s, i) => (
              <FadeUp key={s.title} delay={(i % 2) * 0.08}>
                <div className="flex h-full items-start gap-5 rounded-[24px] border border-revora-cobalt/10 bg-white p-7">
                  <span className="grid h-12 w-12 shrink-0 place-items-center rounded-2xl bg-revora-sky text-revora-cobalt">
                    <s.icon className="h-5 w-5" />
                  </span>
                  <div>
                    <h3 className="font-heading text-[1.2rem] font-extrabold text-revora-slate">{s.title}</h3>
                    <p className="mt-1.5 font-sans text-[15px] leading-[1.65] text-revora-slate-light">{s.text}</p>
                  </div>
                </div>
              </FadeUp>
            ))}
          </div>

          <ol className="mt-12 grid gap-3 rounded-[28px] border border-revora-cobalt/10 bg-white p-6 tablet:grid-cols-4 tablet:p-8">
            {STEPS.map((s, i) => (
              <li key={s.title} className="flex items-start gap-3">
                <span className="grid h-9 w-9 shrink-0 place-items-center rounded-full bg-revora-cobalt font-sans text-[13px] font-bold text-white">{i + 1}</span>
                <span>
                  <span className="block font-sans text-[15px] font-semibold text-revora-slate">{s.title}</span>
                  <span className="block font-sans text-[13.5px] text-revora-slate-light">{s.text}</span>
                </span>
              </li>
            ))}
          </ol>
        </div>
      </section>

      <EnquiryForm />
    </>
  );
}

const FORMS = ['Eye drops', 'Ophthalmic ointment', 'Nasal spray', 'Tablets', 'Not sure yet'];

function EnquiryForm() {
  const empty = { name: '', company: '', email: '', phone: '', dosageForm: FORMS[0], country: 'India', message: '' };
  const [form, setForm] = useState(empty);
  const set = (k: keyof typeof form) => (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => setForm({ ...form, [k]: e.target.value });
  const { send, sending, honeypot } = useEnquiry('manufacturing');

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (await send(form)) setForm(empty);
  };

  const field = 'w-full rounded-xl border border-revora-cobalt/15 bg-white px-4 py-3 font-sans text-[16px] text-revora-slate outline-none transition-[border-color,box-shadow] placeholder:text-revora-slate-muted focus:border-revora-cobalt focus:shadow-[0_0_0_4px_rgba(11,74,143,0.12)] tablet:text-[15px]';
  const label = 'mb-1.5 block font-sans text-[12px] font-semibold uppercase tracking-[0.12em] text-revora-slate-light';

  return (
    <section id="enquiry" className="scroll-mt-28 bg-white px-5 py-20 tablet:px-8 tablet:py-28">
      <div className="mx-auto grid max-w-330 grid-cols-[minmax(0,1fr)] gap-12 tablet-lg:grid-cols-[0.8fr_1.2fr] tablet-lg:gap-16">
        <div className="tablet-lg:sticky tablet-lg:top-32 tablet-lg:self-start desktop:top-48">
          <SectionHeading eyebrow="Manufacture with us" lines={['Tell us about', 'your product.']} highlight={{ 'product.': 'text-revora-cobalt' }} />
          <FadeUp delay={0.15}>
            <p className="mt-6 max-w-sm font-sans text-[16px] leading-[1.7] text-revora-slate-light">Our team will get back to you with next steps.</p>
            <a href={SITE.phone.href} className="mt-6 inline-flex min-h-6 items-center gap-2 font-sans text-[15px] font-semibold text-revora-cobalt hover:underline">
              {SITE.phone.label}
            </a>
          </FadeUp>
        </div>

        <FadeUp delay={0.1}>
          <form onSubmit={submit} className="relative rounded-[28px] border border-revora-cobalt/10 bg-[#F6F9FC] p-6 tablet:p-9">
            <Honeypot inputRef={honeypot} />
            <div className="grid gap-5 tablet:grid-cols-2">
              <label>
                <span className={label}>Full name *</span>
                <input required value={form.name} onChange={set('name')} autoComplete="name" className={field} />
              </label>
              <label>
                <span className={label}>Company *</span>
                <input required value={form.company} onChange={set('company')} autoComplete="organization" className={field} />
              </label>
              <label>
                <span className={label}>Email *</span>
                <input required type="email" value={form.email} onChange={set('email')} autoComplete="email" className={field} />
              </label>
              <label>
                <span className={label}>Phone *</span>
                <input required type="tel" value={form.phone} onChange={set('phone')} autoComplete="tel" className={field} />
              </label>
              <label>
                <span className={label}>Dosage form</span>
                <select value={form.dosageForm} onChange={set('dosageForm')} className={field}>
                  {FORMS.map((f) => (
                    <option key={f}>{f}</option>
                  ))}
                </select>
              </label>
              <label>
                <span className={label}>Country</span>
                <input value={form.country} onChange={set('country')} autoComplete="country-name" className={field} />
              </label>
              <label className="tablet:col-span-2">
                <span className={label}>Product & volumes *</span>
                <textarea required rows={5} value={form.message} onChange={set('message')} className={`${field} resize-y`} />
              </label>
            </div>
            <div className="mt-7 flex justify-end">
              <Button type="submit" arrow="up-right" magnetic disabled={sending}>{sending ? 'Sending…' : 'Send enquiry'}</Button>
            </div>
          </form>
        </FadeUp>
      </div>
    </section>
  );
}
