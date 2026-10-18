'use client';

import { motion, useReducedMotion } from 'framer-motion';
import { ArrowUpRight, Factory, MapPin, ShieldCheck } from 'lucide-react';
import { expoOut } from '@/lib/easings';
import { Magnetic } from '@/components/ui/primitives';

interface FormularyBannerProps {
  title?: string;
  description?: string;
  buttonLabel?: string;
  onAction: () => void;
  showCredentials?: boolean;
}

const CREDENTIALS = [
  { icon: ShieldCheck, label: 'WHO-GMP certified plant' },
  { icon: Factory, label: 'Own eye-drop manufacturing' },
  { icon: MapPin, label: 'Supplying across India' },
];

/** Deep-cobalt call to action for samples and institutional supply. */
export function FormularyBanner({
  title = 'Supplying Eye Hospitals & Surgical Centers Across India',
  description = 'Revora Healthcare offers institutional rate contracts and consistent batch delivery for hospital drug formularies.',
  buttonLabel = 'Request Institutional Rate Card',
  onAction,
  showCredentials = false,
}: FormularyBannerProps) {
  const reduce = useReducedMotion();
  return (
    <motion.section
      initial={reduce ? false : { opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-10% 0px' }}
      transition={{ duration: 0.9, ease: expoOut }}
      className="relative isolate overflow-hidden rounded-[32px] bg-revora-cobalt-deep p-8 text-white tablet:p-14"
    >
      <div
        aria-hidden
        className="absolute inset-0 -z-10 bg-[radial-gradient(ellipse_at_top_right,rgba(58,130,200,0.55),transparent_60%),radial-gradient(ellipse_at_bottom_left,rgba(215,38,46,0.18),transparent_55%)]"
      />
      <div className="flex flex-col gap-10 desktop:flex-row desktop:items-end desktop:justify-between">
        <div className="max-w-2xl">
          <h2 className="font-heading text-[clamp(1.8rem,3.6vw,3rem)] font-extrabold leading-[1.05] tracking-[-0.02em]">{title}</h2>
          <p className="mt-4 font-sans text-[16px] leading-[1.7] text-white/70">{description}</p>
          {showCredentials && (
            <ul className="mt-8 flex flex-wrap gap-2.5">
              {CREDENTIALS.map((c) => (
                <li
                  key={c.label}
                  className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/10 px-4 py-2 font-sans text-[13px] font-medium"
                >
                  <c.icon className="h-4 w-4 text-revora-cobalt-pale" />
                  {c.label}
                </li>
              ))}
            </ul>
          )}
        </div>
        <Magnetic className="shrink-0">
          <button
            type="button"
            onClick={onAction}
            className="group relative inline-flex items-center gap-3 overflow-hidden rounded-full bg-white py-3.5 pl-7 pr-3.5 font-sans text-[15px] font-semibold text-revora-cobalt"
          >
            <span className="absolute inset-0 -translate-x-full bg-revora-crimson transition-transform duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:translate-x-0" />
            <span className="relative transition-colors duration-500 group-hover:text-white">{buttonLabel}</span>
            <span className="relative grid h-8 w-8 place-items-center rounded-full bg-revora-cobalt text-white transition-transform duration-500 group-hover:rotate-45">
              <ArrowUpRight className="h-4 w-4" />
            </span>
          </button>
        </Magnetic>
      </div>
    </motion.section>
  );
}
