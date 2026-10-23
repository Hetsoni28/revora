'use client';

import { useEffect, useRef, useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import {
  motion,
  useInView,
  useMotionValue,
  useSpring,
  useReducedMotion,
  animate,
} from 'framer-motion';
import { useLenis } from 'lenis/react';
import { expoOut } from '@/lib/easings';

/* ─────────────────────────────────────────────────────────────
   SplitWords — each word rises out of its own masked line.
   ───────────────────────────────────────────────────────────── */
export function SplitWords({
  text,
  className,
  wordClassName,
  delay = 0,
  stagger = 0.08,
  highlight = {},
  trigger = 'view',
}: {
  text: string;
  className?: string;
  wordClassName?: string;
  delay?: number;
  stagger?: number;
  /** word (exact, punctuation included) → extra className */
  highlight?: Record<string, string>;
  /** 'view' plays on viewport entry, 'mount' plays immediately */
  trigger?: 'view' | 'mount';
}) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, margin: '-10% 0px' });
  const reduce = useReducedMotion();
  const play = trigger === 'mount' || inView;
  const words = text.split(' ');

  return (
    <span ref={ref} className={className}>
      <span className="sr-only">{text}</span>
      {words.map((w, i) => (
        <span
          key={i}
          aria-hidden
          className="inline-block overflow-hidden align-bottom pb-[0.08em] mb-[-0.08em]"
        >
          <motion.span
            className={`inline-block will-change-transform ${wordClassName ?? ''} ${highlight[w] ?? ''}`}
            initial={reduce ? false : { y: '110%', rotate: 4 }}
            // reduced motion is only known after hydration, so words may already sit hidden: show them at once
            animate={play || reduce ? { y: '0%', rotate: 0 } : undefined}
            transition={reduce ? { duration: 0 } : { duration: 1, ease: expoOut, delay: delay + i * stagger }}
          >
            {w}
          </motion.span>
          {i < words.length - 1 && ' '}
        </span>
      ))}
    </span>
  );
}

/* ─────────────────────────────────────────────────────────────
   FadeUp — simple viewport reveal.
   ───────────────────────────────────────────────────────────── */
export function FadeUp({
  children,
  delay = 0,
  y = 32,
  className,
}: {
  children: React.ReactNode;
  delay?: number;
  y?: number;
  className?: string;
}) {
  const reduce = useReducedMotion();
  return (
    <motion.div
      className={className}
      initial={reduce ? false : { opacity: 0, y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-8% 0px' }}
      transition={{ duration: 0.9, ease: expoOut, delay }}
    >
      {children}
    </motion.div>
  );
}

/* ─────────────────────────────────────────────────────────────
   Magnetic — pulls its child slightly toward the cursor.
   ───────────────────────────────────────────────────────────── */
export function Magnetic({
  children,
  strength = 0.35,
  className,
}: {
  children: React.ReactNode;
  strength?: number;
  className?: string;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const sx = useSpring(x, { stiffness: 220, damping: 18, mass: 0.4 });
  const sy = useSpring(y, { stiffness: 220, damping: 18, mass: 0.4 });

  return (
    <motion.div
      ref={ref}
      className={`inline-block ${className ?? ''}`}
      style={{ x: sx, y: sy }}
      onPointerMove={(e) => {
        if (e.pointerType !== 'mouse' || !ref.current) return;
        const r = ref.current.getBoundingClientRect();
        x.set((e.clientX - (r.left + r.width / 2)) * strength);
        y.set((e.clientY - (r.top + r.height / 2)) * strength);
      }}
      onPointerLeave={() => {
        x.set(0);
        y.set(0);
      }}
    >
      {children}
    </motion.div>
  );
}

/* ─────────────────────────────────────────────────────────────
   Counter — counts up once when visible.
   ───────────────────────────────────────────────────────────── */
export function Counter({ to, duration = 1.8 }: { to: number; duration?: number }) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, margin: '-10% 0px' });
  const reduce = useReducedMotion();
  const [val, setVal] = useState(reduce ? to : 0);

  useEffect(() => {
    if (!inView || reduce) return;
    const controls = animate(0, to, {
      duration,
      ease: expoOut,
      onUpdate: (v) => setVal(Math.round(v)),
    });
    return () => controls.stop();
  }, [inView, to, duration, reduce]);

  return <span ref={ref}>{val}</span>;
}

/* ─────────────────────────────────────────────────────────────
   Eyebrow — small uppercase label with the brand tick.
   ───────────────────────────────────────────────────────────── */
export function Eyebrow({
  children,
  tone = 'dark',
}: {
  children: React.ReactNode;
  tone?: 'dark' | 'light';
}) {
  return (
    <span
      className={`inline-flex items-center gap-2.5 font-sans text-[11px] font-semibold uppercase tracking-[0.18em] ${
        tone === 'dark' ? 'text-revora-cobalt' : 'text-white/70'
      }`}
    >
      <Tick className="h-3 w-3.5 text-revora-crimson" />
      {children}
    </span>
  );
}

/** The red "v-tick" from the Revora wordmark, as a reusable glyph. */
export function Tick({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 28 22" className={className} aria-hidden fill="currentColor">
      <path d="M0 9.5 L7.5 7 L11 15.5 L24.5 0 L28 0 L12 22 Z" />
    </svg>
  );
}

/* ─────────────────────────────────────────────────────────────
   AnchorLink — client-side link that smooth-scrolls through Lenis
   when the target section is on the current page ("#plant", or
   "/#plant" while on the homepage); otherwise navigates normally.
   ───────────────────────────────────────────────────────────── */
export function AnchorLink({
  href,
  onClick,
  ...props
}: React.AnchorHTMLAttributes<HTMLAnchorElement> & { href: string }) {
  const lenis = useLenis();
  const pathname = usePathname();
  return (
    <Link
      href={href}
      {...props}
      onClick={(e) => {
        onClick?.(e);
        const hash = href.startsWith('#')
          ? href
          : href.startsWith('/#') && pathname === '/'
            ? href.slice(1)
            : null;
        if (hash && lenis) {
          e.preventDefault();
          // land just below the fixed navbar, whatever its height on this screen
          const nav = document.querySelector('header')?.getBoundingClientRect().bottom ?? 90;
          lenis.scrollTo(hash, { offset: -nav, duration: 1.4, force: true });
        }
      }}
    />
  );
}
