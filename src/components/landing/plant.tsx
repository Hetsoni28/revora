'use client';

import { useRef } from 'react';
import { motion, useScroll, useTransform, useReducedMotion } from 'framer-motion';
import { Droplets, FlaskConical, MapPin, PackageCheck, ShieldCheck, Shield, Activity } from 'lucide-react';
import { expoOut } from '@/lib/easings';
import { SectionHeading } from '@/components/ui/section-heading';
import { MediaFrame } from '@/components/ui/media-frame';

const STEPS = [
  { icon: FlaskConical, title: 'Formulate', body: 'Each brand built around a distinct ingredient.' },
  { icon: Droplets, title: 'Fill', body: 'Sterile filling in a dedicated eye-drop facility.' },
  { icon: ShieldCheck, title: 'Verify', body: 'WHO-GMP quality, in an EU-compliant plant.' },
  { icon: PackageCheck, title: 'Present', body: 'Premium cartons, ready for the pharmacy shelf.' },
];

export function Plant() {
  const ref = useRef<HTMLDivElement>(null);
  const reduce = useReducedMotion();
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start 0.75', 'end 0.6'] });
  const line = useTransform(scrollYProgress, [0, 1], [0, 1]);

  return (
    <section id="plant" className="relative isolate overflow-hidden bg-revora-cobalt-deep px-5 py-24 text-white tablet:px-8 tablet:py-36">
      {/* backdrop */}
      <div aria-hidden className="absolute inset-0 -z-10 bg-[radial-gradient(ellipse_at_top_right,rgba(11,74,143,0.9),transparent_60%),radial-gradient(ellipse_at_bottom_left,rgba(58,130,200,0.18),transparent_55%)]" />

      <div className="mx-auto max-w-[1320px]">
        <SectionHeading
          tone="light"
          eyebrow="Manufacturing"
          lines={['Made in our own plant.']}
          highlight={{ own: 'text-revora-cobalt-pale' }}
          aside="We make our eye drops ourselves — so quality stays in our hands."
        />

        <MediaFrame
          src="/videos/eye-drop-filling-poster.webp"
          video={{ webm: '/videos/eye-drop-filling.webm', mp4: '/videos/eye-drop-filling.mp4' }}
          alt="Eye-drop bottles being filled and capped on a sterile filling line"
          aspect="aspect-[4/3] tablet:aspect-video"
          sizes="(min-width: 1320px) 1320px, 100vw"
          className="mt-14"
          caption={<b className="font-semibold">Sterile eye-drop filling</b>}
        />

        {/* location card */}
        <motion.div
          initial={reduce ? false : { opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-10% 0px' }}
          transition={{ duration: 1, ease: expoOut }}
          className="mt-5 grid overflow-hidden rounded-[28px] border border-white/10 bg-white/[0.04] backdrop-blur-sm tablet:grid-cols-3"
        >
          {[
            { icon: MapPin, k: 'Location', v: 'Paonta Sahib, Himachal Pradesh' },
            { icon: ShieldCheck, k: 'Certification', v: 'WHO-GMP certified' },
            { icon: Shield, k: 'Standards', v: 'EU-compliant facility' },
          ].map((item, i) => (
            <div key={item.k} className={`flex items-start gap-4 p-7 tablet:p-9 ${i > 0 ? 'border-t border-white/10 tablet:border-l tablet:border-t-0' : ''}`}>
              <item.icon className="mt-1 h-5 w-5 shrink-0 text-revora-cobalt-pale" />
              <div>
                <p className="font-sans text-[11px] font-semibold uppercase tracking-[0.18em] text-white/70">{item.k}</p>
                <p className="mt-1.5 font-heading text-xl font-bold tracking-tight tablet:text-2xl">{item.v}</p>
              </div>
            </div>
          ))}
        </motion.div>

        {/* process with scroll-drawn line */}
        <div ref={ref} className="relative mt-20 tablet:mt-28">
          <div aria-hidden className="absolute left-[22px] top-0 h-full w-[2px] bg-white/10 tablet-lg:left-0 tablet-lg:top-[22px] tablet-lg:h-[2px] tablet-lg:w-full" />
          <motion.div
            aria-hidden
            className="absolute left-[22px] top-0 hidden h-[2px] w-full origin-left bg-gradient-to-r from-revora-cobalt-pale via-white to-revora-crimson tablet-lg:left-0 tablet-lg:top-[22px] tablet-lg:block"
            style={{ scaleX: reduce ? 1 : line }}
          />
          <motion.div
            aria-hidden
            className="absolute left-[22px] top-0 h-full w-[2px] origin-top bg-gradient-to-b from-revora-cobalt-pale via-white to-revora-crimson tablet-lg:hidden"
            style={{ scaleY: reduce ? 1 : line }}
          />

          <ol className="relative grid gap-10 tablet-lg:grid-cols-4 tablet-lg:gap-8">
            {STEPS.map((s, i) => (
              <motion.li
                key={s.title}
                className="relative pl-16 tablet-lg:pl-0 tablet-lg:pt-16"
                initial={reduce ? false : { opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-15% 0px' }}
                transition={{ duration: 0.8, delay: i * 0.12, ease: expoOut }}
              >
                <span className="absolute left-0 top-0 grid h-11 w-11 place-items-center rounded-full border border-white/20 bg-revora-cobalt-deep text-revora-cobalt-pale">
                  <s.icon className="h-5 w-5" />
                </span>
                <p className="font-sans text-[11px] font-semibold uppercase tracking-[0.18em] text-white/70">Step 0{i + 1}</p>
                <h3 className="mt-2 font-heading text-2xl font-extrabold tracking-tight">{s.title}</h3>
                <p className="mt-2 max-w-xs font-sans text-[14.5px] leading-[1.7] text-white/65">{s.body}</p>
              </motion.li>
            ))}
          </ol>
        </div>

        {/* beyond ophthalmology */}
        <motion.div
          initial={reduce ? false : { opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-10% 0px' }}
          transition={{ duration: 0.9, ease: expoOut }}
          className="mt-24 flex flex-col gap-6 rounded-[28px] bg-white p-7 text-revora-slate tablet:mt-32 tablet:flex-row tablet:items-center tablet:justify-between tablet:p-10"
        >
          <div>
            <p className="font-sans text-[11px] font-semibold uppercase tracking-[0.18em] text-revora-crimson">Beyond ophthalmology</p>
            <p className="mt-2 max-w-xl font-heading text-[clamp(1.4rem,2.6vw,2rem)] font-extrabold leading-[1.15] tracking-[-0.01em]">
              Also present in oncology, with a strong record of supplying the defence sector.
            </p>
          </div>
          <div className="flex gap-3">
            <span className="inline-flex items-center gap-2 rounded-full bg-revora-sky px-4 py-2.5 font-sans text-[13px] font-semibold text-revora-cobalt">
              <Activity className="h-4 w-4" /> Oncology
            </span>
            <span className="inline-flex items-center gap-2 rounded-full bg-revora-sky px-4 py-2.5 font-sans text-[13px] font-semibold text-revora-cobalt">
              <Shield className="h-4 w-4" /> Defence supply
            </span>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
