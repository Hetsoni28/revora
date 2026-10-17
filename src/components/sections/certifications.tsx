'use client';

import { motion } from 'framer-motion';
import { ShieldCheck, Award, Globe, Microscope, BadgeCheck, FlaskConical } from 'lucide-react';
import { expoOut } from '@/lib/easings';

const CERTS = [
  { icon: ShieldCheck, label: 'WHO-GMP Certified',  color: '#0B4A8F' },
  { icon: Award,       label: 'ISO 9001:2015',       color: '#D7262E' },
  { icon: Globe,       label: 'CDSCO Approved',      color: '#0B4A8F' },
  { icon: Microscope,  label: 'ICH GCP Compliant',   color: '#D7262E' },
  { icon: BadgeCheck,  label: 'MHRA Registered',     color: '#0B4A8F' },
  { icon: FlaskConical,label: 'EU-GMP Aligned',      color: '#D7262E' },
];

export function Certifications() {
  return (
    <section className="py-14 bg-[#F8F9FA] border-y border-[#E8F1F9]">
      <div className="max-w-7xl mx-auto px-6">
        <div className="flex flex-col tablet:flex-row items-center gap-8 tablet:gap-0">

          {/* Left label */}
          <motion.div
            className="flex-shrink-0 text-center tablet:text-left tablet:w-48 tablet:border-r tablet:border-[#E8F1F9] tablet:pr-10 tablet:mr-10"
            initial={{ opacity: 0, x: -12 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.55, ease: expoOut }}
          >
            <p className="font-sans font-semibold text-[10px] uppercase tracking-[0.28em] text-[#D7262E]">
              Accreditations
            </p>
            <p className="font-heading font-semibold text-lg text-[#1E2428] mt-1 leading-snug">
              Internationally<br />Certified
            </p>
          </motion.div>

          {/* Cert pills */}
          <div className="flex flex-wrap justify-center tablet:justify-start gap-3 flex-1">
            {CERTS.map((cert, i) => {
              const Icon = cert.icon;
              return (
                <motion.div
                  key={cert.label}
                  className="flex items-center gap-2.5 bg-white rounded-lg px-4 py-2.5 border border-[#E8F1F9]"
                  style={{ boxShadow: '0 1px 4px rgba(0,0,0,0.04)' }}
                  initial={{ opacity: 0, y: 10 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.45, ease: expoOut, delay: i * 0.06 }}
                  whileHover={{ y: -2, boxShadow: '0 6px 20px rgba(11,74,143,0.10)' }}
                >
                  <Icon size={14} style={{ color: cert.color }} />
                  <span className="font-sans font-semibold text-xs text-[#1E2428]">{cert.label}</span>
                </motion.div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
