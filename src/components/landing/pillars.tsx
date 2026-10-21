'use client';

import { useRef } from 'react';
import { motion, useMotionTemplate, useMotionValue, useReducedMotion } from 'framer-motion';
import Link from 'next/link';
import { ArrowUpRight, Eye, Handshake, Lightbulb } from 'lucide-react';
import { expoOut } from '@/lib/easings';
import { SplitWords } from '@/components/ui/primitives';

const PILLARS = [
  {
    icon: Eye,
    kicker: '01 · Healthcare',
    title: 'Only ophthalmology.',
    body: 'Nine eye-care brands across four therapy areas.',
    href: '/profile#portfolio',
    cta: 'Our products',
    span: 'tablet-lg:col-span-7',
    tone: 'cobalt' as const,
  },
  {
    icon: Lightbulb,
    kicker: '02 · Innovation',
    title: 'Distinct by design.',
    body: 'Warmers, cooling and field-care products for extreme conditions.',
    href: '/innovation',
    cta: 'Explore innovation',
    span: 'tablet-lg:col-span-5',
    tone: 'light' as const,
  },
  {
    icon: Handshake,
    kicker: '03 · Channel Partner',
    title: 'Grow with Revora.',
    body: 'Bring Revora to your territory — with full support from our Ahmedabad team.',
    href: '/channel-partner',
    cta: 'Become a partner',
    span: 'tablet-lg:col-span-12',
    tone: 'crimson' as const,
  },
];

function PillarCard({ p, i }: { p: (typeof PILLARS)[number]; i: number }) {
  const ref = useRef<HTMLDivElement>(null);
  const reduce = useReducedMotion();
  const mx = useMotionValue(-400);
  const my = useMotionValue(-400);
  const spot = useMotionTemplate`radial-gradient(420px circle at ${mx}px ${my}px, ${
    p.tone === 'light' ? 'rgba(11,74,143,0.10)' : 'rgba(255,255,255,0.16)'
  }, transparent 70%)`;

  const toneCls =
    p.tone === 'cobalt'
      ? 'bg-revora-cobalt text-white'
      : p.tone === 'crimson'
        ? 'bg-revora-slate text-white'
        : 'bg-white text-revora-slate border border-revora-cobalt/10';

  const Icon = p.icon;

  return (
    <motion.article
      ref={ref}
      onPointerMove={(e) => {
        const r = ref.current?.getBoundingClientRect();
        if (!r) return;
        mx.set(e.clientX - r.left);
        my.set(e.clientY - r.top);
      }}
      onPointerLeave={() => {
        mx.set(-400);
        my.set(-400);
      }}
      initial={reduce ? false : { opacity: 0, y: 48, scale: 0.97 }}
      whileInView={{ opacity: 1, y: 0, scale: 1 }}
      viewport={{ once: true, margin: '-10% 0px' }}
      transition={{ duration: 0.9, delay: (i % 2) * 0.12, ease: expoOut }}
      className={`group relative isolate flex min-h-[300px] flex-col overflow-hidden rounded-[28px] p-7 tablet:min-h-[320px] tablet:p-10 ${toneCls} ${p.span}`}
    >
      <motion.div aria-hidden className="pointer-events-none absolute inset-0 -z-10" style={{ background: spot }} />
      {p.tone === 'crimson' && (
        <div aria-hidden className="absolute -right-24 -top-24 -z-10 h-72 w-72 rounded-full bg-revora-crimson/40 blur-3xl" />
      )}
      {p.tone === 'cobalt' && (
        <div aria-hidden className="absolute -bottom-32 -right-16 -z-10 h-80 w-80 rounded-full bg-revora-cobalt-light/30 blur-3xl" />
      )}

      <div className="flex items-center justify-between">
        <span className={`font-sans text-[11px] font-semibold uppercase tracking-[0.18em] ${p.tone === 'light' ? 'text-revora-slate-muted' : 'text-white/75'}`}>
          {p.kicker}
        </span>
        <span
          className={`grid h-12 w-12 place-items-center rounded-2xl transition-transform duration-700 ease-[cubic-bezier(0.34,1.56,0.64,1)] group-hover:-rotate-12 group-hover:scale-110 ${
            p.tone === 'light' ? 'bg-revora-sky text-revora-cobalt' : 'bg-white/10 text-white'
          }`}
        >
          <Icon className="h-5 w-5" />
        </span>
      </div>

      <div className="mt-auto pt-16">
        <h3 className="font-heading text-[clamp(1.8rem,3.2vw,2.75rem)] font-extrabold leading-[1.02] tracking-[-0.02em]">
          {p.title}
        </h3>
        <p className={`mt-4 max-w-md font-sans text-[15px] leading-[1.7] ${p.tone === 'light' ? 'text-revora-slate-light' : 'text-white/75'}`}>
          {p.body}
        </p>
        <Link
          href={p.href}
          className={`mt-7 inline-flex min-h-6 items-center gap-2 font-sans text-[14.5px] font-semibold after:absolute after:inset-0 after:content-[''] ${p.tone === 'light' ? 'text-revora-cobalt' : 'text-white'}`}
        >
          {p.cta}
          <ArrowUpRight className="h-4 w-4 transition-transform duration-500 group-hover:rotate-45" />
        </Link>
      </div>

      <span
        aria-hidden
        className={`absolute inset-x-0 top-0 h-[3px] origin-left scale-x-0 bg-gradient-to-r from-revora-cobalt to-revora-crimson transition-transform duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-x-100`}
      />
    </motion.article>
  );
}

export function Pillars() {
  return (
    <section id="why" className="relative bg-[#F6F9FC] px-5 pb-12 pt-24 tablet:px-8 tablet:pb-16 tablet:pt-36">
      <div className="mx-auto max-w-[1320px]">
        <h2 className="font-heading text-[clamp(2.6rem,6.4vw,5.6rem)] font-extrabold leading-[1] tracking-[-0.03em] text-revora-slate">
          <SplitWords text="Why Revora?" highlight={{ 'Revora?': 'text-revora-cobalt' }} />
        </h2>

        <div className="mt-14 grid grid-cols-1 gap-4 tablet:mt-20 tablet-lg:grid-cols-12 tablet-lg:gap-5">
          {PILLARS.map((p, i) => (
            <PillarCard key={p.title} p={p} i={i} />
          ))}
        </div>
      </div>
    </section>
  );
}
