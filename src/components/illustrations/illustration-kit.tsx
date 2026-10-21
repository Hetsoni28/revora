'use client';

/* Shared palette, ring helper and frame for the brand illustrations. */
import { motion, useReducedMotion } from 'framer-motion';
import { expoOut } from '@/lib/easings';

export const C = {
  cobalt: '#0B4A8F',
  mid: '#1A62A8',
  light: '#3A82C8',
  pale: '#94B6E5',
  sky: '#E8F1F9',
  deep: '#062B55',
  crimson: '#D7262E',
  slate: '#1E242B',
};

/** Points on a ring, rounded so server and client markup match exactly. */
export function ring(n: number, r: number, cx: number, cy: number) {
  return Array.from({ length: n }, (_, i) => {
    const a = (i / n) * Math.PI * 2 - Math.PI / 2;
    return { x: Math.round((cx + r * Math.cos(a)) * 100) / 100, y: Math.round((cy + r * Math.sin(a)) * 100) / 100 };
  });
}

/** Rounded card that frames every illustration. */
export function Frame({ children, tone = 'light', label }: { children: React.ReactNode; tone?: 'light' | 'dark'; label: string }) {
  const reduce = useReducedMotion();
  return (
    <motion.figure
      role="img"
      aria-label={label}
      initial={reduce ? false : { opacity: 0, y: 40, scale: 0.97 }}
      whileInView={{ opacity: 1, y: 0, scale: 1 }}
      viewport={{ once: true, margin: '-10% 0px' }}
      transition={{ duration: 1.1, ease: expoOut }}
      className={`relative mx-auto aspect-square w-full max-w-[560px] overflow-hidden rounded-[28px] shadow-[0_40px_80px_-40px_rgba(11,74,143,0.5)] tablet:rounded-[32px] ${
        tone === 'dark' ? 'bg-revora-cobalt-deep' : 'bg-white'
      }`}
    >
      {children}
    </motion.figure>
  );
}
