'use client';

import { useRef } from 'react';
import { motion, useReducedMotion, useScroll, useTransform } from 'framer-motion';
import { Building2, Factory, Hospital, ShieldCheck, Truck, UserRound } from 'lucide-react';
import { expoOut } from '@/lib/easings';
import { FadeUp } from '@/components/ui/primitives';
import { SectionHeading } from '@/components/ui/section-heading';
import { MediaFrame } from '@/components/ui/media-frame';

const FLOW = [
  { icon: Factory, title: 'Made', where: 'Paonta Sahib plant', body: 'In our WHO-GMP eye-drop plant.' },
  { icon: Building2, title: 'Coordinated', where: 'Ahmedabad HQ', body: 'Sales and supply, from Ahmedabad.' },
  { icon: Truck, title: 'Distributed', where: 'Distributors & stockists', body: 'Partners carry the portfolio into their territories across India.' },
  { icon: Hospital, title: 'Dispensed', where: 'Hospitals & pharmacies', body: 'Steady supply to hospitals and pharmacies.' },
  { icon: UserRound, title: 'Prescribed', where: 'Doctors & patients', body: 'Doctors prescribe; patients trust.' },
];

/** "From our plant to the patient" — five steps joined by a line that draws as you scroll. */
export function SupplyFlow({ image = '/images/site/sterile-formulation-lab.webp', imageAlt = 'Technicians in a sterile formulation laboratory' }: { image?: string; imageAlt?: string }) {
  const ref = useRef<HTMLDivElement>(null);
  const reduce = useReducedMotion();
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start 0.8', 'end 0.55'] });
  // Function form keeps this on the JS path (see components/landing/hero.tsx).
  const line = useTransform(scrollYProgress, (v) => Math.min(Math.max(v, 0), 1));

  return (
    <section className="relative isolate overflow-hidden bg-revora-cobalt-deep px-5 py-24 text-white tablet:px-8 tablet:py-32">
      <div aria-hidden className="absolute inset-0 -z-10 bg-[radial-gradient(ellipse_at_top_right,rgba(11,74,143,0.9),transparent_60%),radial-gradient(ellipse_at_bottom_left,rgba(58,130,200,0.18),transparent_55%)]" />
      <div className="mx-auto max-w-330">
        <div className="grid grid-cols-[minmax(0,1fr)] items-center gap-12 tablet-lg:grid-cols-2">
          <div>
            <SectionHeading tone="light" eyebrow="How we reach India" lines={['From our plant', 'to the patient.']} highlight={{ 'patient.': 'text-revora-cobalt-pale' }} />
            <FadeUp delay={0.2}>
              <p className="mt-6 max-w-md font-sans text-[16px] leading-[1.75] text-white/70">
                Made in our plant, run from Ahmedabad, carried by our partners.
              </p>
            </FadeUp>
          </div>
          <MediaFrame src={image} alt={imageAlt} aspect="aspect-[16/10]" caption={<><ShieldCheck className="mr-1.5 inline h-4 w-4 text-revora-cobalt" />Quality under WHO-GMP</>} />
        </div>

        <div ref={ref} className="relative mt-20">
          <div aria-hidden className="absolute left-[22px] top-0 h-full w-[2px] bg-white/10 desktop:left-0 desktop:top-[22px] desktop:h-[2px] desktop:w-full" />
          <motion.div aria-hidden className="absolute left-0 top-[22px] hidden h-[2px] w-full origin-left bg-linear-to-r from-revora-cobalt-pale via-white to-revora-crimson desktop:block" style={{ scaleX: reduce ? 1 : line }} />
          <motion.div aria-hidden className="absolute left-[22px] top-0 h-full w-[2px] origin-top bg-linear-to-b from-revora-cobalt-pale via-white to-revora-crimson desktop:hidden" style={{ scaleY: reduce ? 1 : line }} />
          <ol className="relative grid gap-10 desktop:grid-cols-5 desktop:gap-8">
            {FLOW.map((s, i) => (
              <motion.li
                key={s.title}
                className="relative pl-16 desktop:pl-0 desktop:pt-16"
                initial={reduce ? false : { opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-10% 0px' }}
                transition={{ duration: 0.8, delay: i * 0.1, ease: expoOut }}
              >
                <span className="absolute left-0 top-0 grid h-11 w-11 place-items-center rounded-full border border-white/20 bg-revora-cobalt-deep text-revora-cobalt-pale">
                  <s.icon className="h-5 w-5" />
                </span>
                <p className="font-sans text-[11px] font-semibold uppercase tracking-[0.18em] text-white/70">0{i + 1} · {s.where}</p>
                <h3 className="mt-2 font-heading text-2xl font-extrabold tracking-tight">{s.title}</h3>
                <p className="mt-2 max-w-sm font-sans text-[14.5px] leading-[1.7] text-white/65">{s.body}</p>
              </motion.li>
            ))}
          </ol>
        </div>
      </div>
    </section>
  );
}
