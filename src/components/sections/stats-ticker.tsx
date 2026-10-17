'use client';

import { useEffect, useRef, useState, useCallback } from 'react';
import { motion, useInView } from 'framer-motion';
import { expoOut } from '@/lib/easings';

// ─── Marquee ticker items ─────────────────────────────────────────────────────
const TICKER_ITEMS = [
  '2.8M+ Patients',
  '47 Countries',
  '850+ Products',
  '15+ Years',
];

function TickerItem({ text }: { text: string }) {
  return (
    <span className="flex items-center gap-4 px-6 whitespace-nowrap">
      <span className="font-heading font-semibold text-white text-base tablet:text-lg tracking-wide">
        {text}
      </span>
      <span
        className="w-2 h-2 rounded-full flex-shrink-0"
        style={{ backgroundColor: '#D7262E' }}
      />
    </span>
  );
}

// ─── Animated counter ─────────────────────────────────────────────────────────
interface StatCardProps {
  value: number;
  label: string;
  suffix: string;
  delay: number;
}

function StatCard({ value, label, suffix, delay }: StatCardProps) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: '-15% 0px' });
  const [count, setCount] = useState(0);
  const rafRef = useRef<number | null>(null);

  const startCounter = useCallback(() => {
    const duration = 2000;
    const startTime = performance.now();

    const tick = (now: number) => {
      const elapsed = now - startTime;
      const progress = Math.min(elapsed / duration, 1);
      // easeOutExpo
      const eased = progress === 1 ? 1 : 1 - Math.pow(2, -10 * progress);
      setCount(Math.round(eased * value));
      if (progress < 1) {
        rafRef.current = requestAnimationFrame(tick);
      }
    };

    rafRef.current = requestAnimationFrame(tick);
  }, [value]);

  useEffect(() => {
    if (inView) {
      const t = setTimeout(startCounter, delay * 1000);
      return () => {
        clearTimeout(t);
        if (rafRef.current) cancelAnimationFrame(rafRef.current);
      };
    }
  }, [inView, delay, startCounter]);

  const formatCount = (n: number) => {
    if (n >= 1_000_000) return `${(n / 1_000_000).toFixed(1)}M`;
    if (n >= 1_000) return `${(n / 1_000).toFixed(0)}K`;
    return n.toString();
  };

  return (
    <motion.div
      ref={ref}
      className="flex flex-col items-center justify-center py-10 px-6"
      initial={{ opacity: 0, y: 24 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.7, ease: expoOut, delay }}
    >
      <span
        className="font-heading font-bold text-3xl xs:text-4xl sm:text-5xl tablet:text-6xl tabular-nums"
        style={{ color: '#0B4A8F' }}
      >
        {formatCount(count)}
        <span className="text-[#D7262E]">{suffix}</span>
      </span>
      <span
        className="mt-2 font-sans text-sm tablet:text-base font-medium tracking-wide text-center"
        style={{ color: '#1E2428' }}
      >
        {label}
      </span>
    </motion.div>
  );
}

const STATS = [
  { value: 2_800_000, label: 'Patients Served', suffix: '+' },
  { value: 47, label: 'Countries', suffix: '' },
  { value: 850, label: 'Products', suffix: '+' },
  { value: 15, label: 'Years of Excellence', suffix: '+' },
];

// ─── Component ────────────────────────────────────────────────────────────────
export function StatsTicker() {
  // Duplicate items for seamless loop
  const doubled = [...TICKER_ITEMS, ...TICKER_ITEMS];

  return (
    <section id="stats" className="w-full">
      {/* Part A — Marquee ticker */}
      <div
        className="relative overflow-hidden py-4"
        style={{ backgroundColor: '#0B4A8F' }}
      >
        <motion.div
          className="flex"
          animate={{ x: ['0%', '-50%'] }}
          transition={{ duration: 25, ease: 'linear', repeat: Infinity }}
        >
          {doubled.map((item, i) => (
            <TickerItem key={`${item}-${i}`} text={item} />
          ))}
        </motion.div>
      </div>

      {/* Part B — Stats grid */}
      <div className="bg-white">
        <div className="max-w-6xl mx-auto px-6">
          <div className="grid grid-cols-2 tablet-lg:grid-cols-4 divide-x divide-y tablet-lg:divide-y-0 divide-[#E8F1F9]">
            {STATS.map((stat, i) => (
              <StatCard
                key={stat.label}
                value={stat.value}
                label={stat.label}
                suffix={stat.suffix}
                delay={i * 0.1}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
