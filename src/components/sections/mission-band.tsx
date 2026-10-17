'use client';

import { useRef } from 'react';
import Image from 'next/image';
import { motion, useScroll, useTransform } from 'framer-motion';
import { Shield } from 'lucide-react';
import { expoOut } from '@/lib/easings';

const VALUES = [
  { label: 'Patient-First', desc: 'Every decision starts and ends with patient safety and well-being.' },
  { label: 'Scientific Rigour', desc: 'Evidence-based formulations backed by robust clinical data.' },
  { label: 'Global Reach', desc: 'Serving 47+ countries with consistent quality and compliance.' },
];

export function MissionBand() {
  const sectionRef = useRef<HTMLElement>(null);

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start end', 'end start'],
  });

  // Inner content moves at a slower rate than the container (parallax)
  const contentY = useTransform(scrollYProgress, [0, 1], ['-8%', '8%']);

  return (
    <section
      id="research"
      ref={sectionRef}
      className="relative min-h-screen flex items-center justify-center overflow-hidden"
    >
      {/* Background authentic R&D campus architecture */}
      <div className="absolute inset-0 z-0">
        <Image
          src="/images/mission-bg.jpg"
          alt="Revora Global Research & Formulation Campus"
          fill
          className="object-cover object-center"
          sizes="100vw"
        />
        <div
          className="absolute inset-0"
          style={{
            background:
              'linear-gradient(160deg, rgba(8, 53, 106, 0.90) 0%, rgba(11, 74, 143, 0.84) 45%, rgba(14, 20, 26, 0.94) 100%)',
          }}
        />
      </div>




      {/* Parallax inner content */}
      <motion.div
        style={{ y: contentY }}
        className="relative z-10 max-w-5xl mx-auto px-6 py-24 text-center flex flex-col items-center gap-10"
      >
        {/* GMP badge */}
        <motion.div
          className="flex items-center gap-2 bg-white/10 border border-white/20 rounded-full px-5 py-2 backdrop-blur-sm"
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, ease: expoOut }}
        >
          <Shield size={14} className="text-white/80" />
          <span className="font-sans text-xs font-semibold uppercase tracking-[0.2em] text-white/80">
            WHO-GMP Certified
          </span>
        </motion.div>

        {/* Large quote */}
        <div className="flex flex-col items-center gap-2">
          <motion.h2
            className="font-heading font-bold text-5xl tablet:text-6xl desktop:text-7xl text-white leading-[1.05] tracking-tight"
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, ease: expoOut, delay: 0.1 }}
          >
            Healthcare
          </motion.h2>
          <motion.div
            className="flex items-center gap-4 tablet:gap-6"
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, ease: expoOut, delay: 0.2 }}
          >
            <span
              className="font-sans text-xs uppercase tracking-[0.3em] font-semibold"
              style={{ color: 'rgba(232,241,249,0.5)' }}
            >
              ·
            </span>
            <span className="font-heading font-bold text-5xl tablet:text-6xl desktop:text-7xl text-white leading-[1.05] tracking-tight">
              Beyond the{' '}
              <span className="text-[#D7262E]">Cure</span>
            </span>
          </motion.div>
        </div>

        {/* Gradient line */}
        <div className="w-full max-w-md">
          <motion.div
            className="h-[2px] w-full"
            style={{
              background: 'linear-gradient(90deg, #0B4A8F, #D7262E)',
              transformOrigin: 'left center',
            }}
            initial={{ scaleX: 0 }}
            whileInView={{ scaleX: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, ease: expoOut, delay: 0.35 }}
          />
        </div>

        {/* Subtext */}
        <motion.p
          className="font-sans text-base tablet:text-lg max-w-2xl leading-relaxed"
          style={{ color: 'rgba(232,241,249,0.65)' }}
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, ease: expoOut, delay: 0.45 }}
        >
          At Revora, we believe medicine is more than molecules — it is a commitment to human dignity.
          Our mission is to make precision-grade pharmaceutical therapies accessible to every patient,
          everywhere, regardless of geography or economic circumstance.
        </motion.p>

        {/* Values */}
        <motion.div
          className="grid grid-cols-1 tablet:grid-cols-3 gap-6 mt-4 w-full"
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, ease: expoOut, delay: 0.55 }}
        >
          {VALUES.map(({ label, desc }) => (
            <div
              key={label}
              className="flex flex-col gap-2 bg-white/5 border border-white/10 rounded-xl p-6 backdrop-blur-sm text-left"
            >
              <span className="font-heading font-semibold text-base text-white">{label}</span>
              <span className="font-sans text-sm text-white/55 leading-relaxed">{desc}</span>
            </div>
          ))}
        </motion.div>
      </motion.div>
    </section>
  );
}
