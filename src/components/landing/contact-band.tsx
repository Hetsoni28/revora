'use client';

import Link from 'next/link';
import { motion, useReducedMotion } from 'framer-motion';
import { ArrowUpRight, Factory, Globe2, Stethoscope, Truck, Users } from 'lucide-react';
import { expoOut } from '@/lib/easings';
import { Eyebrow, SplitWords } from '@/components/ui/primitives';

const PATHS = [
  {
    icon: Stethoscope,
    who: 'Doctors & hospitals',
    line: 'Samples, literature or a visit from our medical representative.',
    cta: 'Talk to our team',
    href: '/contact#message',
  },
  {
    icon: Truck,
    who: 'Distributors & stockists',
    line: 'Bring our specialty range to your territory.',
    cta: 'Become a partner',
    href: '/channel-partner',
  },
  {
    icon: Factory,
    who: 'Brand owners',
    line: 'WHO-GMP manufacturing for your formulations.',
    cta: 'Manufacture with us',
    href: '/manufacturing',
  },
  {
    icon: Globe2,
    who: 'International buyers',
    line: 'Importer and distribution partnerships abroad.',
    cta: 'Export enquiry',
    href: '/our-presence/global-network',
  },
  {
    icon: Users,
    who: 'Future Revorians',
    line: 'We don’t just sell products — we build brands and relationships.',
    cta: 'See careers',
    href: '/careers',
  },
];

export function ContactBand() {
  const reduce = useReducedMotion();
  return (
    <section id="contact" className="relative bg-white px-5 py-24 tablet:px-8 tablet:py-36">
      <div className="mx-auto max-w-[1320px]">
        <div className="text-center">
          <Eyebrow>Work with us</Eyebrow>
          <h2 className="mx-auto mt-5 max-w-4xl font-heading text-[clamp(2.6rem,6.4vw,5.6rem)] font-extrabold leading-[0.98] tracking-[-0.03em] text-revora-slate">
            <SplitWords text="Let’s build healthier futures, together." highlight={{ healthier: 'text-revora-cobalt', 'together.': 'text-revora-crimson' }} />
          </h2>
        </div>

        <div className="mt-16 grid gap-4 tablet:grid-cols-2 tablet-lg:grid-cols-3 tablet-lg:gap-5 desktop:grid-cols-5">
          {PATHS.map((p, i) => {
            const internal = p.href.startsWith('/');
            const Comp = internal ? Link : 'a';
            return (
              <motion.div
                key={p.who}
                initial={reduce ? false : { opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-10% 0px' }}
                transition={{ duration: 0.9, delay: i * 0.1, ease: expoOut }}
              >
                <Comp
                  href={p.href}
                  className="group relative flex h-full flex-col overflow-hidden rounded-[28px] border border-revora-cobalt/10 bg-[#F6F9FC] p-8 transition-colors duration-500 hover:border-transparent"
                >
                  <span aria-hidden className="absolute inset-0 translate-y-full bg-revora-cobalt transition-transform duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:translate-y-0" />
                  <span className="relative grid h-12 w-12 place-items-center rounded-2xl bg-white text-revora-cobalt shadow-sm transition-colors duration-500 group-hover:bg-white/15 group-hover:text-white">
                    <p.icon className="h-5 w-5" />
                  </span>
                  <h3 className="relative mt-10 font-heading text-2xl font-extrabold tracking-tight text-revora-slate transition-colors duration-500 group-hover:text-white">
                    {p.who}
                  </h3>
                  <p className="relative mt-3 font-sans text-[14.5px] leading-[1.7] text-revora-slate-light transition-colors duration-500 group-hover:text-white/75">
                    {p.line}
                  </p>
                  <span className="relative mt-auto inline-flex items-center gap-2 pt-8 font-sans text-[14px] font-semibold text-revora-cobalt transition-colors duration-500 group-hover:text-white">
                    {p.cta}
                    <ArrowUpRight className="h-4 w-4 transition-transform duration-500 group-hover:rotate-45" />
                  </span>
                </Comp>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
