'use client';

import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { Droplets, Scissors, FlaskConical, Shield, Truck, Microscope } from 'lucide-react';
import { expoOut } from '@/lib/easings';

const SERVICES = [
  {
    number: '01',
    icon: Droplets,
    color: '#0B4A8F',
    title: 'Ophthalmic Solutions',
    description:
      'A comprehensive range of eye drops, lubricants, anti-infectives, and ocular surface protection agents formulated for superior bioavailability and patient comfort.',
  },
  {
    number: '02',
    icon: Scissors,
    color: '#D7262E',
    title: 'Surgical Products',
    description:
      'OR-grade ophthalmic instruments and surgical consumables designed for cataract, vitreoretinal, and refractive procedures, meeting the highest sterility standards.',
  },
  {
    number: '03',
    icon: Microscope,
    color: '#0B4A8F',
    title: 'Clinical Research',
    description:
      'Robust Phase II–IV clinical trial support, bioequivalence studies, and pharmacokinetic profiling for ophthalmic and speciality drug candidates.',
  },
  {
    number: '04',
    icon: FlaskConical,
    color: '#D7262E',
    title: 'Drug Formulation',
    description:
      'Innovative novel delivery systems — nano-emulsions, liposomal formulations, in-situ gels, and sustained-release platforms for improved therapeutic outcomes.',
  },
  {
    number: '05',
    icon: Shield,
    color: '#0B4A8F',
    title: 'Quality Assurance',
    description:
      'End-to-end quality management under WHO-GMP and ISO 9001:2015 certified processes, with in-house analytical labs and real-time stability monitoring.',
  },
  {
    number: '06',
    icon: Truck,
    color: '#D7262E',
    title: 'Global Distribution',
    description:
      'A supply chain spanning 47+ countries with cold-chain logistics, regulatory dossier support, and dedicated country managers for reliable market access.',
  },
];

const containerVariants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.1 } },
};

const cardVariants = {
  hidden: { opacity: 0, y: 32 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.65, ease: expoOut } },
};

export function Services() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: '-10% 0px' });

  return (
    <section id="services" className="py-24 tablet:py-32 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">

        {/* Header */}
        <div className="flex flex-col tablet:flex-row tablet:items-end justify-between gap-6 mb-14">
          <div>
            <motion.span
              className="font-sans font-semibold text-xs uppercase tracking-[0.28em] text-[#D7262E]"
              initial={{ opacity: 0, y: 8 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, ease: expoOut }}
            >
              Our Capabilities
            </motion.span>
            <motion.h2
              className="font-heading font-bold text-2xl sm:text-4xl tablet:text-5xl text-[#1E2428] mt-3 tracking-tight"
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, ease: expoOut, delay: 0.1 }}
            >
              Products &amp; Services
            </motion.h2>
          </div>
          <motion.p
            className="font-sans text-[#1E2428]/55 text-sm max-w-sm leading-relaxed tablet:text-right"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, ease: expoOut, delay: 0.2 }}
          >
            From laboratory bench to global bedside — end-to-end pharmaceutical
            solutions crafted with precision and clinical rigour.
          </motion.p>
        </div>

        {/* Grid */}
        <motion.div
          ref={ref}
          className="grid grid-cols-1 tablet:grid-cols-2 tablet-lg:grid-cols-3 gap-px bg-[#F0F4F8]"
          style={{ borderRadius: '16px', overflow: 'hidden' }}
          variants={containerVariants}
          initial="hidden"
          animate={inView ? 'visible' : 'hidden'}
        >
          {SERVICES.map((service) => (
            <ServiceCard key={service.title} service={service} />
          ))}
        </motion.div>
      </div>
    </section>
  );
}

function ServiceCard({ service }: { service: (typeof SERVICES)[number] }) {
  const Icon = service.icon;

  return (
    <motion.div
      variants={cardVariants}
      className="group relative bg-white p-7 overflow-hidden cursor-pointer"
      whileHover={{ backgroundColor: '#FAFCFF' }}
      transition={{ duration: 0.2 }}
    >
      {/* Left accent bar */}
      <motion.div
        className="absolute left-0 top-0 bottom-0 w-[3px]"
        style={{ backgroundColor: service.color, transformOrigin: 'top', scaleY: 0 }}
        whileHover={{ scaleY: 1 }}
        transition={{ duration: 0.35, ease: expoOut }}
      />

      {/* Faded number */}
      <div
        className="absolute top-4 right-5 font-heading font-bold text-5xl leading-none select-none pointer-events-none"
        style={{ color: 'rgba(11,74,143,0.05)' }}
        aria-hidden="true"
      >
        {service.number}
      </div>

      {/* Icon */}
      <div
        className="w-11 h-11 rounded-xl flex items-center justify-center mb-5"
        style={{ backgroundColor: '#E8F1F9' }}
      >
        <Icon size={20} style={{ color: '#0B4A8F' }} />
      </div>

      {/* Title */}
      <h3 className="font-heading font-semibold text-[1.0625rem] text-[#1E2428] mb-2.5 group-hover:text-[#0B4A8F] transition-colors duration-200">
        {service.title}
      </h3>

      {/* Description */}
      <p className="font-sans text-sm text-[#1E2428]/60 leading-relaxed">
        {service.description}
      </p>

      {/* Arrow */}
      <motion.span
        className="inline-flex items-center gap-1.5 mt-5 font-sans font-semibold text-xs tracking-wide"
        style={{ color: service.color }}
        initial={{ opacity: 0, x: -4 }}
        whileHover={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.2 }}
      >
        Learn more →
      </motion.span>
    </motion.div>
  );
}
