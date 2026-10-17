'use client';

import { useRef } from 'react';
import Image from 'next/image';
import { motion, useInView } from 'framer-motion';
import { expoOut } from '@/lib/easings';
import { LineDrawDivider } from '@/components/ui/line-divider';
import { RevoraLogo } from '@/components/ui/revora-logo';

const ABOUT_POINTS = [
  'Revora Healthcare Private Limited is a trusted pharmaceutical company in Ahmedabad, Gujarat, committed to delivering innovative healthcare solutions with a focus on quality, research, and integrity.',
  'Specializing in ophthalmic pharmaceuticals and expanding into specialty healthcare products and medical devices, we develop reliable solutions for doctors, hospitals, pharmacies, and distributors.',
  'Guided by our philosophy, "Healthcare – Beyond the Cure," Revora Healthcare combines scientific excellence, advanced manufacturing, and customer-centric innovation to improve patient care and build healthier communities across India.',
];

const CARD_STATS = [
  { value: '850+', label: 'Products' },
  { value: '47', label: 'Countries' },
  { value: '15+', label: 'Years' },
];

const BADGES = [
  { label: 'WHO-GMP Certified', color: '#0B4A8F' },
  { label: 'ISO 9001:2015', color: '#D7262E' },
  { label: 'CDSCO Approved', color: '#1A62A8' },
];

export function About() {
  const imageRef = useRef<HTMLDivElement>(null);
  const textRef  = useRef<HTMLDivElement>(null);

  const imageInView = useInView(imageRef, { once: true, margin: '-15% 0px' });
  const textInView  = useInView(textRef,  { once: true, margin: '-15% 0px' });

  return (
    <section id="about" className="py-24 tablet:py-32 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="grid tablet-lg:grid-cols-2 gap-12 tablet-lg:gap-20 items-center">

          {/* ── Left: Image wipe reveal ── */}
          <div ref={imageRef} className="relative">
            <div
              className="relative w-full aspect-[4/5] rounded-2xl overflow-hidden shadow-2xl"
              style={{ boxShadow: '0 32px 80px rgba(11,74,143,0.18)' }}
            >
              {/* Authentic WHO-GMP Cleanroom Photo */}
              <Image
                src="/images/about-facility.jpg"
                alt="Revora WHO-GMP Certified Sterile Ophthalmic BFS Facility"
                fill
                className="object-cover object-center"
                sizes="(max-width: 1024px) 100vw, 50vw"
              />

              {/* Gradient overlay for text legibility */}
              <div
                className="absolute inset-0 z-5"
                style={{
                  background:
                    'linear-gradient(180deg, rgba(11, 74, 143, 0.25) 0%, rgba(10, 26, 46, 0.85) 75%, rgba(10, 26, 46, 0.95) 100%)',
                }}
              />

              {/* Inner content */}
              <div className="absolute inset-0 flex flex-col justify-between p-6 tablet:p-8 z-10">
                {/* Logo chip at top left */}
                <div className="bg-white/95 backdrop-blur-md px-4 py-2 rounded-xl shadow-md border border-white/40 w-fit">
                  <RevoraLogo variant="color" className="h-6 w-auto object-contain" />
                </div>

                {/* Facility caption at bottom */}
                <div className="bg-white/10 backdrop-blur-md p-3.5 rounded-xl border border-white/20 text-white max-w-sm">
                  <span className="font-heading font-semibold text-[11px] tracking-[0.2em] uppercase text-white/90 block">
                    WHO-GMP Manufacturing Facility
                  </span>
                  <p className="font-sans text-white/75 text-xs mt-1 leading-snug">
                    Automated Blow-Fill-Seal (BFS) aseptic line · Ahmedabad, Gujarat
                  </p>
                </div>
              </div>

              {/* Crimson wipe reveal (existing animation preserved) */}
              <motion.div
                className="absolute inset-0 z-20"
                style={{ backgroundColor: '#D7262E', transformOrigin: 'left center' }}
                initial={{ scaleX: 0 }}
                animate={imageInView ? { scaleX: [0, 1, 1, 0] } : { scaleX: 0 }}
                transition={{ duration: 1.2, ease: expoOut, times: [0, 0.45, 0.55, 1], delay: 0.1 }}
              />
            </div>

            {/* Floating accent card - 2.8M+ Patients Served */}
            <motion.div
              className="absolute -bottom-6 right-2 sm:-right-4 tablet-lg:-right-6 z-30 bg-white rounded-2xl px-4 py-3 sm:px-6 sm:py-4.5 border border-[#E2E8F0] shadow-2xl"
              style={{ boxShadow: '0 20px 50px rgba(11,74,143,0.18)' }}
              initial={{ opacity: 0, scale: 0.88, y: 14 }}
              animate={imageInView ? { opacity: 1, scale: 1, y: 0 } : {}}
              transition={{ duration: 0.6, ease: expoOut, delay: 0.8 }}
            >
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-[#E8F1F9] flex items-center justify-center text-[#0B4A8F] shrink-0 font-bold text-lg">
                  ✦
                </div>
                <div>
                  <p className="font-heading font-bold text-2xl tablet:text-3xl text-[#0B4A8F] leading-tight">
                    2.8M<span className="text-[#D7262E]">+</span>
                  </p>
                  <p className="font-sans text-xs font-medium text-[#1E2428]/60 mt-0.5 tracking-wide">
                    Patients Served
                  </p>
                </div>
              </div>
            </motion.div>

            {/* Decorative corner accent */}
            <div
              className="absolute -top-4 -left-4 w-24 h-24 rounded-2xl -z-10"
              style={{ background: 'linear-gradient(135deg, #E8F1F9 0%, #D7262E 100%)', opacity: 0.18 }}
            />
          </div>

          {/* ── Right: Text ── */}
          <div ref={textRef} className="flex flex-col gap-6">
            {/* Founded meta */}
            <motion.span
              className="font-sans text-[10px] uppercase tracking-[0.25em] text-[#1E2428]/35"
              initial={{ opacity: 0 }}
              animate={textInView ? { opacity: 1 } : {}}
              transition={{ duration: 0.4, ease: expoOut }}
            >
              Founded 2009 · Ahmedabad, Gujarat
            </motion.span>

            {/* Section label */}
            <motion.span
              className="font-sans font-semibold text-xs uppercase tracking-[0.25em] text-[#D7262E]"
              initial={{ opacity: 0, y: 8 }}
              animate={textInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, ease: expoOut, delay: 0.08 }}
            >
              About Revora
            </motion.span>

            {/* Clip-path title (existing animation preserved) */}
            <div className="overflow-hidden">
              <motion.h2
                className="font-heading font-bold text-4xl tablet:text-5xl desktop:text-[3.25rem] leading-[1.1] tracking-tight text-[#1E2428]"
                initial={{ clipPath: 'inset(0 100% 0 0)', opacity: 0 }}
                animate={textInView ? { clipPath: 'inset(0 0% 0 0)', opacity: 1 } : {}}
                transition={{ duration: 0.85, ease: expoOut, delay: 0.2 }}
              >
                Advancing Human
                <br />
                <span className="text-[#0B4A8F]">Ocular Wellness</span>
              </motion.h2>
            </div>

            {/* Line divider (existing) */}
            <LineDrawDivider delay={0.4} color="#0B4A8F" thickness={2} />

            {/* Body text */}
            <div className="flex flex-col gap-3.5">
              {ABOUT_POINTS.map((point, i) => (
                <motion.p
                  key={i}
                  className="font-sans text-[#1E2428]/65 text-[0.9375rem] leading-relaxed"
                  initial={{ opacity: 0, y: 12 }}
                  animate={textInView ? { opacity: 1, y: 0 } : {}}
                  transition={{ duration: 0.6, ease: expoOut, delay: 0.45 + i * 0.08 }}
                >
                  {point}
                </motion.p>
              ))}
            </div>

            {/* Badges */}
            <motion.div
              className="flex flex-wrap gap-2.5 mt-1"
              initial={{ opacity: 0, y: 12 }}
              animate={textInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, ease: expoOut, delay: 0.85 }}
            >
              {BADGES.map(({ label, color }) => (
                <div
                  key={label}
                  className="flex items-center gap-2 bg-[#F8F9FA] rounded-lg px-4 py-2.5 border border-[#E8F1F9]"
                >
                  <span className="w-2 h-2 rounded-full flex-shrink-0" style={{ backgroundColor: color }} />
                  <span className="font-sans font-semibold text-xs text-[#1E2428]">{label}</span>
                </div>
              ))}
            </motion.div>

            {/* Clean Stats Strip */}
            <motion.div
              className="grid grid-cols-3 gap-4 pt-6 border-t border-[#EAEFF5] mt-2"
              initial={{ opacity: 0, y: 12 }}
              animate={textInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, ease: expoOut, delay: 0.95 }}
            >
              {CARD_STATS.map((s) => (
                <div key={s.label}>
                  <span className="font-heading font-bold text-2xl text-[#0B4A8F]">{s.value}</span>
                  <span className="font-sans text-xs text-[#1E2428]/60 block mt-0.5">{s.label}</span>
                </div>
              ))}
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}
