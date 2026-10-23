'use client';

import { useRef } from 'react';
import Image from 'next/image';
import { motion, useMotionTemplate, useMotionValue, useReducedMotion } from 'framer-motion';
import Link from 'next/link';
import { ArrowUpRight, Eye, Handshake, Lightbulb } from 'lucide-react';
import { expoOut } from '@/lib/easings';
import { SplitWords } from '@/components/ui/primitives';
import { useCatalogue } from '@/components/catalogue/catalogue-context';

const PILLARS = [
  {
    icon: Eye,
    kicker: '01 · Healthcare',
    title: 'Only ophthalmology.',
    body: (brands: number, areas: number) => `${brands} eye-care brands across ${areas} therapy areas.`,
    href: '/profile#portfolio',
    cta: 'Our products',
    span: 'tablet-lg:col-span-7',
    tone: 'cobalt' as const,
    image: '/images/photos/pillar-ophthalmology.webp',
    imageAlt: 'Ophthalmologist examining a patient with a slit lamp',
    focus: 'object-[center_40%]',
  },
  {
    icon: Lightbulb,
    kicker: '02 · Innovation',
    title: 'Distinct by design.',
    body: () => 'Warmers, cooling and field-care products for extreme conditions.',
    href: '/innovation',
    cta: 'Explore innovation',
    span: 'tablet-lg:col-span-5',
    tone: 'navy' as const,
    image: '/images/photos/pillar-innovation.webp',
    imageAlt: 'Gloved hands holding a warming pack in snowy mountains',
    focus: 'object-center',
  },
  {
    icon: Handshake,
    kicker: '03 · Channel Partner',
    title: 'Grow with Revora.',
    body: () => 'Bring Revora to your territory — with full support from our Ahmedabad team.',
    href: '/channel-partner',
    cta: 'Become a partner',
    span: 'tablet-lg:col-span-12',
    tone: 'slate' as const,
    image: '/images/photos/pillar-partnership.webp',
    imageAlt: 'Two business partners shaking hands in an office',
    focus: 'object-[65%_35%]',
  },
];

/**
 * Colour wash over each photo, in the card's tone: rising from the bottom on the two top cards,
 * and from the left on the wide partner card (from the bottom on phones), where the copy sits.
 */
const WASH = {
  cobalt: 'bg-[linear-gradient(to_top,rgba(8,52,104,0.96)_0%,rgba(11,74,143,0.78)_42%,rgba(11,74,143,0.12)_100%)]',
  navy: 'bg-[linear-gradient(to_top,rgba(9,20,38,0.95)_0%,rgba(9,20,38,0.7)_42%,rgba(9,20,38,0.08)_100%)]',
  slate:
    'bg-[linear-gradient(to_top,rgba(30,36,43,0.96)_0%,rgba(30,36,43,0.75)_45%,rgba(30,36,43,0.15)_100%)] tablet-lg:bg-[linear-gradient(90deg,rgba(30,36,43,0.97)_0%,rgba(30,36,43,0.88)_34%,rgba(30,36,43,0.25)_68%,rgba(30,36,43,0)_100%)]',
};

function PillarCard({ p, i, body }: { p: (typeof PILLARS)[number]; i: number; body: string }) {
  const ref = useRef<HTMLDivElement>(null);
  const reduce = useReducedMotion();
  const mx = useMotionValue(-400);
  const my = useMotionValue(-400);
  const spot = useMotionTemplate`radial-gradient(420px circle at ${mx}px ${my}px, rgba(255,255,255,0.14), transparent 70%)`;
  const wide = p.tone === 'slate';
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
      className={`group relative isolate flex min-h-105 flex-col overflow-hidden rounded-[28px] bg-revora-slate p-7 text-white tablet:min-h-115 tablet:p-10 ${
        wide ? 'tablet-lg:min-h-100' : ''
      } ${p.span}`}
    >
      {/* photo fills the card, with a slow zoom on hover */}
      <Image
        src={p.image}
        alt={p.imageAlt}
        fill
        // the top row can be the largest thing on screen when the page opens, so don't lazy-load it
        loading={wide ? 'lazy' : 'eager'}
        sizes={wide ? '(min-width: 1024px) 1320px, 100vw' : '(min-width: 1024px) 60vw, 100vw'}
        className={`-z-30 object-cover ${p.focus} transition-transform duration-1200 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-[1.05]`}
      />
      <div aria-hidden className={`absolute inset-0 -z-20 ${WASH[p.tone]}`} />
      <motion.div aria-hidden className="pointer-events-none absolute inset-0 -z-10" style={{ background: spot }} />

      <div className="flex items-center justify-between">
        <span className="font-sans text-[11px] font-semibold uppercase tracking-[0.18em] text-white/85">{p.kicker}</span>
        <span className="grid h-12 w-12 place-items-center rounded-2xl bg-white/15 text-white backdrop-blur-md transition-transform duration-700 ease-[cubic-bezier(0.34,1.56,0.64,1)] group-hover:-rotate-12 group-hover:scale-110">
          <Icon className="h-5 w-5" />
        </span>
      </div>

      <div className={`mt-auto pt-24 ${wide ? 'tablet-lg:max-w-xl' : ''}`}>
        <h3 className="font-heading text-[clamp(1.9rem,3.2vw,2.9rem)] font-extrabold leading-[1.02] tracking-[-0.02em]">{p.title}</h3>
        <p className="mt-4 max-w-md font-sans text-[15.5px] leading-[1.7] text-white/85">{body}</p>
        <Link
          href={p.href}
          className="mt-7 inline-flex min-h-6 items-center gap-2 font-sans text-[14.5px] font-semibold text-white after:absolute after:inset-0 after:content-['']"
        >
          {p.cta}
          <ArrowUpRight className="h-4 w-4 transition-transform duration-500 group-hover:rotate-45" />
        </Link>
      </div>

      <span
        aria-hidden
        className="absolute inset-x-0 top-0 h-[3px] origin-left scale-x-0 bg-linear-to-r from-revora-cobalt to-revora-crimson transition-transform duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-x-100"
      />
    </motion.article>
  );
}

export function Pillars() {
  const { products, categories } = useCatalogue();
  return (
    <section id="why" className="relative bg-[#F6F9FC] px-5 pb-12 pt-24 tablet:px-8 tablet:pb-16 tablet:pt-36">
      <div className="mx-auto max-w-[1320px]">
        <h2 className="font-heading text-[clamp(2.6rem,6.4vw,5.6rem)] font-extrabold leading-[1] tracking-[-0.03em] text-revora-slate">
          <SplitWords text="Why Revora?" highlight={{ 'Revora?': 'text-revora-cobalt' }} />
        </h2>

        <div className="mt-14 grid grid-cols-1 gap-4 tablet:mt-20 tablet-lg:grid-cols-12 tablet-lg:gap-5">
          {PILLARS.map((p, i) => (
            <PillarCard key={p.title} p={p} i={i} body={p.body(products.length, categories.length)} />
          ))}
        </div>
      </div>
    </section>
  );
}
