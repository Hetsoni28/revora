'use client';

import { useRef } from 'react';
import Image from 'next/image';
import { motion, useScroll, useTransform } from 'framer-motion';
import { ArrowRight } from 'lucide-react';

const HEADLINE_WORDS = ['Healthcare', 'Beyond', 'the', 'Cure'];

export function Hero() {
  const sectionRef = useRef<HTMLElement>(null);

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start start', 'end start'],
  });

  const bgY = useTransform(scrollYProgress, [0, 1], ['0%', '-15%']);

  return (
    <section
      id="hero"
      ref={sectionRef}
      className="relative min-h-screen flex flex-col items-center justify-center pt-20 tablet:pt-24 overflow-hidden"
    >
      {/* ── Parallax background with authentic research cleanroom ── */}
      <motion.div className="absolute -top-24 -bottom-24 inset-x-0 z-0" style={{ y: bgY }}>
        <Image
          src="/images/hero-bg.jpg"
          alt="Revora Ophthalmic Formulation & Sterile Suite"
          fill
          priority
          className="object-cover object-center"
          quality={90}
        />
        {/* Deep cinematic corporate overlay for maximum readability and prestige */}
        <div
          className="absolute inset-0"
          style={{
            background:
              'linear-gradient(135deg, rgba(8, 53, 106, 0.88) 0%, rgba(11, 74, 143, 0.78) 50%, rgba(10, 26, 46, 0.94) 100%)',
          }}
        />
        {/* Noise texture */}
        <div
          className="absolute inset-0 opacity-[0.03]"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)' opacity='1'/%3E%3C/svg%3E")`,
          }}
        />
        {/* Glow accent */}
        <div
          className="absolute bottom-1/4 right-1/4 w-[400px] h-[400px] rounded-full opacity-15 blur-[100px]"
          style={{ backgroundColor: '#D7262E' }}
        />
      </motion.div>

      {/* ── Content ── */}
      <div className="relative z-10 max-w-6xl mx-auto px-4 sm:px-6 text-center flex flex-col items-center gap-6 sm:gap-7">

        {/* Eyebrow + rule */}
        <div className="flex flex-col items-center gap-3">
          <motion.p
            className="font-sans font-semibold text-[10.5px] sm:text-xs uppercase tracking-[0.28em] sm:tracking-[0.35em]"
            style={{ color: '#D7262E' }}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1], delay: 0.2 }}
          >
            Ophthalmic &amp; Speciality Pharma
          </motion.p>
          <motion.div
            className="w-10 h-px"
            style={{ backgroundColor: 'rgba(215,38,46,0.55)' }}
            initial={{ scaleX: 0 }}
            animate={{ scaleX: 1 }}
            transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1], delay: 0.3 }}
          />
        </div>

        {/* Headline — word by word */}
        <h1 className="font-heading font-bold text-3xl xs:text-4xl sm:text-5xl tablet:text-7xl desktop:text-[5.5rem] leading-[1.08] sm:leading-[1.03] tracking-tight">
          {HEADLINE_WORDS.map((word, i) => {
            const isHighlighted = word === 'Beyond';
            const isCrimson = word === 'Cure';
            return (
              <span key={word + i} className="inline-block overflow-hidden mr-[0.2em] last:mr-0">
                <motion.span
                  className="inline-block"
                  style={{
                    color: isCrimson ? '#D7262E' : isHighlighted ? '#E8F1F9' : '#FFFFFF',
                  }}
                  initial={{ y: '110%' }}
                  animate={{ y: '0%' }}
                  transition={{ duration: 0.75, ease: [0.16, 1, 0.3, 1], delay: 0.3 + i * 0.12 }}
                >
                  {word}
                </motion.span>
              </span>
            );
          })}
        </h1>

        {/* Tagline */}
        <motion.p
          className="font-sans text-xs sm:text-sm tablet:text-base max-w-xl leading-relaxed"
          style={{ color: 'rgba(232,241,249,0.70)' }}
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1], delay: 0.85 }}
        >
          Revora Healthcare Pvt. Ltd.&nbsp;—&nbsp;Ahmedabad, Gujarat.
          Precision-formulated ophthalmic and speciality pharmaceutical products
          for clinicians, patients, and partners worldwide.
        </motion.p>

        {/* CTAs */}
        <motion.div
          className="flex flex-col sm:flex-row items-center gap-3 mt-1 w-full sm:w-auto"
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1], delay: 1.05 }}
        >
          <a
            href="#about"
            className="group w-full sm:w-auto flex items-center justify-center gap-2 px-7 py-3 rounded-lg font-sans font-semibold text-sm text-white transition-all duration-200"
            style={{ backgroundColor: '#D7262E' }}
          >
            <span>Discover Revora</span>
            <ArrowRight size={15} className="transition-transform duration-200 group-hover:translate-x-1" />
          </a>
          <a
            href="#products"
            className="w-full sm:w-auto text-center px-7 py-3 rounded-lg border font-sans font-semibold text-sm text-white transition-all duration-200 hover:bg-white/10"
            style={{ borderColor: 'rgba(255,255,255,0.25)' }}
          >
            View Products
          </a>
        </motion.div>
      </div>

      {/* CSS gradient animation */}
      <style jsx>{`
        @keyframes gradientShift {
          0%   { background-position: 0% 0%; }
          100% { background-position: 100% 100%; }
        }
      `}</style>
    </section>
  );
}
