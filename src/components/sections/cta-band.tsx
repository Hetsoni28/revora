'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import { ArrowRight, Mail, Phone } from 'lucide-react';
import { expoOut } from '@/lib/easings';

export function CTABand() {
  return (
    <section
      id="contact"
      className="relative py-24 tablet:py-32 overflow-hidden"
      style={{ background: 'linear-gradient(135deg, #08356A 0%, #0B4A8F 55%, #0A1A2E 100%)' }}
    >
      {/* Background glow */}
      <div
        className="absolute -top-32 -right-32 w-[500px] h-[500px] rounded-full blur-[100px] pointer-events-none"
        style={{ backgroundColor: 'rgba(215,38,46,0.12)' }}
      />
      <div
        className="absolute -bottom-24 -left-24 w-[400px] h-[400px] rounded-full blur-[100px] pointer-events-none"
        style={{ backgroundColor: 'rgba(11,74,143,0.25)' }}
      />

      <div className="relative z-10 max-w-5xl mx-auto px-6 text-center flex flex-col items-center gap-8">

        {/* Eyebrow */}
        <motion.span
          className="font-sans font-semibold text-xs uppercase tracking-[0.3em]"
          style={{ color: 'rgba(232,241,249,0.55)' }}
          initial={{ opacity: 0, y: 8 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, ease: expoOut }}
        >
          Let&apos;s Work Together
        </motion.span>

        {/* Headline */}
        <motion.h2
          className="font-heading font-bold text-4xl tablet:text-5xl desktop:text-6xl text-white leading-[1.08] tracking-tight"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, ease: expoOut, delay: 0.1 }}
        >
          Partner with{' '}
          <span style={{ color: '#D7262E' }}>Revora</span>
          <br className="hidden tablet:block" />
          {' '}Healthcare
        </motion.h2>

        {/* Sub text */}
        <motion.p
          className="font-sans text-base tablet:text-lg max-w-2xl leading-relaxed"
          style={{ color: 'rgba(232,241,249,0.60)' }}
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, ease: expoOut, delay: 0.2 }}
        >
          Whether you are a hospital formulary director, a global distributor,
          or a clinical research partner — our team is ready to build a
          relationship that puts patients first.
        </motion.p>

        {/* CTA buttons */}
        <motion.div
          className="flex flex-col sm:flex-row items-center gap-4"
          initial={{ opacity: 0, y: 14 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, ease: expoOut, delay: 0.3 }}
        >
          <Link
            href="mailto:info@revorahealthcare.com"
            className="group flex items-center gap-2.5 px-7 py-3.5 rounded-lg font-sans font-semibold text-sm text-[#0B4A8F] bg-white hover:bg-[#E8F1F9] transition-colors duration-200"
          >
            <Mail size={15} />
            Contact Us
            <ArrowRight size={14} className="transition-transform duration-200 group-hover:translate-x-1" />
          </Link>
          <a
            href="tel:+919876543210"
            className="group flex items-center gap-2.5 px-7 py-3.5 rounded-lg border font-sans font-semibold text-sm text-white hover:bg-white/10 transition-colors duration-200"
            style={{ borderColor: 'rgba(255,255,255,0.25)' }}
          >
            <Phone size={15} />
            +91 (079) 4890-REVORA
          </a>
        </motion.div>

        {/* Divider gradient line */}
        <motion.div
          className="w-24 h-px mt-2"
          style={{ background: 'linear-gradient(90deg, transparent, rgba(215,38,46,0.6), transparent)' }}
          initial={{ scaleX: 0 }}
          whileInView={{ scaleX: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, ease: expoOut, delay: 0.4 }}
        />

        {/* Address micro text */}
        <motion.p
          className="font-sans text-xs"
          style={{ color: 'rgba(232,241,249,0.35)' }}
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, ease: expoOut, delay: 0.5 }}
        >
          3rd Floor, S G Business Hub, Ahmedabad, Gujarat, India — info@revorahealthcare.com
        </motion.p>
      </div>
    </section>
  );
}
