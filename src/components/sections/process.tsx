'use client';

import { useRef } from 'react';
import Image from 'next/image';
import { motion, useInView } from 'framer-motion';
import { FlaskConical, Microscope, BadgeCheck, Globe } from 'lucide-react';
import { expoOut } from '@/lib/easings';

const STEPS = [
  {
    number: '01',
    icon: Microscope,
    title: 'Research & Discovery',
    description:
      'Our scientists identify unmet clinical needs and characterise active pharmaceutical ingredients through rigorous in-vitro and pharmacokinetic studies.',
  },
  {
    number: '02',
    icon: FlaskConical,
    title: 'Formulation Development',
    description:
      'Proprietary delivery platforms — nano-emulsions, in-situ gels, and COMOD® systems — are engineered for optimal bioavailability and patient tolerability.',
  },
  {
    number: '03',
    icon: BadgeCheck,
    title: 'Clinical Validation',
    description:
      'Phase II–IV trials, bioequivalence studies, and stability testing under ICH Q1 conditions ensure every product is safe, effective, and globally compliant.',
  },
  {
    number: '04',
    icon: Globe,
    title: 'Global Distribution',
    description:
      'Cold-chain logistics, multi-country regulatory dossiers, and dedicated country managers deliver our portfolio reliably to 47+ markets worldwide.',
  },
];

export function Process() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: '-10% 0px' });

  return (
    <section id="process" className="py-24 tablet:py-32 bg-[#F8F9FA]">
      <div className="max-w-7xl mx-auto px-6">

        {/* Header */}
        <div className="max-w-2xl mb-16 tablet:mb-20">
          <motion.span
            className="font-sans font-semibold text-xs uppercase tracking-[0.28em] text-[#D7262E]"
            initial={{ opacity: 0, y: 8 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, ease: expoOut }}
          >
            How We Work
          </motion.span>
          <motion.h2
            className="font-heading font-bold text-4xl tablet:text-5xl text-[#1E2428] mt-3 tracking-tight leading-[1.1]"
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, ease: expoOut, delay: 0.1 }}
          >
            From Lab Bench{' '}
            <span className="text-[#0B4A8F]">to Global Bedside</span>
          </motion.h2>
          <motion.p
            className="font-sans text-[#1E2428]/60 text-base mt-4 leading-relaxed"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, ease: expoOut, delay: 0.2 }}
          >
            A four-stage process built on scientific rigour, regulatory excellence,
            and an unwavering commitment to patient outcomes.
          </motion.p>
        </div>

        {/* Steps */}
        <div ref={ref} className="relative">
          {/* Connecting line — desktop only */}
          <div className="hidden tablet-lg:block absolute top-12 left-0 right-0 h-px" style={{ backgroundColor: '#E8F1F9' }} />
          <motion.div
            className="hidden tablet-lg:block absolute top-12 left-0 h-px"
            style={{ background: 'linear-gradient(90deg, #0B4A8F, #D7262E)', transformOrigin: 'left' }}
            initial={{ scaleX: 0 }}
            animate={inView ? { scaleX: 1 } : {}}
            transition={{ duration: 1.2, ease: expoOut, delay: 0.3 }}
          />

          <div className="grid grid-cols-1 tablet:grid-cols-2 tablet-lg:grid-cols-4 gap-8 tablet-lg:gap-6">
            {STEPS.map((step, i) => {
              const Icon = step.icon;
              return (
                <motion.div
                  key={step.number}
                  className="flex flex-col gap-4 pt-0 tablet-lg:pt-0"
                  initial={{ opacity: 0, y: 28 }}
                  animate={inView ? { opacity: 1, y: 0 } : {}}
                  transition={{ duration: 0.65, ease: expoOut, delay: 0.15 + i * 0.1 }}
                >
                  {/* Number dot on the line */}
                  <div className="flex items-center gap-4 tablet-lg:flex-col tablet-lg:items-start tablet-lg:gap-0">
                    <div
                      className="relative z-10 w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0 border-2"
                      style={{
                        backgroundColor: '#F8F9FA',
                        borderColor: i === 0 ? '#0B4A8F' : i === STEPS.length - 1 ? '#D7262E' : '#E8F1F9',
                      }}
                    >
                      <Icon size={16} style={{ color: i === STEPS.length - 1 ? '#D7262E' : '#0B4A8F' }} />
                    </div>
                  </div>

                  {/* Text content */}
                  <div className="flex flex-col gap-2 tablet-lg:mt-6">
                    <span
                      className="font-heading font-bold text-5xl tablet:text-6xl leading-none"
                      style={{ color: 'rgba(11,74,143,0.06)' }}
                    >
                      {step.number}
                    </span>
                    <h3 className="font-heading font-semibold text-lg text-[#1E2428] -mt-2">
                      {step.title}
                    </h3>
                    <p className="font-sans text-sm text-[#1E2428]/60 leading-relaxed">
                      {step.description}
                    </p>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>

        {/* R&D Laboratory Documentary Showcase */}
        <div className="mt-16 rounded-2xl overflow-hidden bg-white border border-[#D9DFE8] shadow-sm grid grid-cols-1 md:grid-cols-12 items-center">
          <div className="md:col-span-5 relative aspect-[4/3] md:aspect-auto md:h-full min-h-[300px]">
            <Image
              src="/images/research-lab.jpg"
              alt="Revora Ophthalmic R&D Analytical Laboratory"
              fill
              className="object-cover object-center"
              sizes="(max-width: 768px) 100vw, 40vw"
            />
          </div>
          <div className="md:col-span-7 p-8 md:p-12 flex flex-col justify-center">
            <span className="font-sans font-semibold text-xs uppercase tracking-[0.25em] text-[#0B4A8F]">
              Analytical R&amp;D Center · Ahmedabad
            </span>
            <h3 className="font-heading font-bold text-2xl sm:text-3xl text-[#1E2428] mt-2 tracking-tight">
              Evidence-Led Ophthalmic Formulation Science
            </h3>
            <p className="font-sans text-sm text-[#1E2428]/75 mt-3 leading-relaxed">
              Every drop is validated through HPLC assay, automated osmometry, laser diffraction particle sizing, and kinetic chromogenic endotoxin testing before advancing to human clinical trials.
            </p>
            <div className="grid grid-cols-2 gap-4 mt-6 pt-6 border-t border-[#EAEFF5] text-xs">
              <div>
                <span className="font-heading font-bold text-base text-[#0B4A8F] block">HPLC &amp; UPLC-MS</span>
                <span className="text-[#1E2428]/60 mt-0.5 block">High-precision assay profiling</span>
              </div>
              <div>
                <span className="font-heading font-bold text-base text-[#0B4A8F] block">ICH Q1A Stability</span>
                <span className="text-[#1E2428]/60 mt-0.5 block">Accelerated &amp; real-time chambers</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
