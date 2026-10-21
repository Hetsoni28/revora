'use client';

import Image from 'next/image';
import { motion, useMotionValue, useReducedMotion, useSpring } from 'framer-motion';
import {
  Backpack, Check, Clock, Droplet, Feather, Flame, Hand, HandMetal, HardHat, Leaf, Mountain, PlugZap, Recycle, ShieldCheck, Shield, Snowflake, Soup, Sun, Tent, Thermometer, Timer, Vibrate,
} from 'lucide-react';
import { expoOut } from '@/lib/easings';
import type { FeatureIcon, InnovationProduct, UseIcon } from '@/lib/innovation-products';
import { FadeUp } from '@/components/ui/primitives';
import { Button } from '@/components/ui/button';

const FEATURE_ICON: Record<FeatureIcon, typeof Clock> = {
  heat: Thermometer, time: Clock, safe: ShieldCheck, easy: Hand, instant: Timer, nonElectric: PlugZap, snow: Snowflake, leaf: Leaf,
  feather: Feather, water: Droplet, bowl: Soup, reuse: Recycle, squeeze: HandMetal, shake: Vibrate, apply: Hand, portable: Backpack,
};
const USE_ICON: Record<UseIcon, typeof Clock> = { defence: Shield, outdoor: Mountain, industrial: HardHat, expedition: Tent, hot: Sun, coldOps: Flame };

/** Full product feature: tilting photo, key specs, who it is for, and enquiry buttons. */
export function ProductShowcase({ product: p, flip = false }: { product: InnovationProduct; flip?: boolean }) {
  const reduce = useReducedMotion();
  // Gentle 3D tilt toward the cursor.
  const rx = useSpring(useMotionValue(0), { stiffness: 150, damping: 18 });
  const ry = useSpring(useMotionValue(0), { stiffness: 150, damping: 18 });

  return (
    <article id={p.id} className="scroll-mt-32 desktop:scroll-mt-48 grid grid-cols-[minmax(0,1fr)] items-center gap-10 overflow-hidden rounded-[32px] border border-revora-cobalt/10 bg-[#F6F9FC] p-5 tablet:p-8 tablet-lg:grid-cols-2 tablet-lg:gap-14 desktop:p-12">
      {/* image */}
      <motion.div
        initial={reduce ? false : { opacity: 0, y: 40, scale: 0.97 }}
        whileInView={{ opacity: 1, y: 0, scale: 1 }}
        viewport={{ once: true, margin: '-10% 0px' }}
        transition={{ duration: 1, ease: expoOut }}
        className={`[perspective:1000px] ${flip ? 'tablet-lg:order-2' : ''}`}
        onPointerMove={(e) => {
          if (reduce || e.pointerType !== 'mouse') return;
          const r = e.currentTarget.getBoundingClientRect();
          ry.set(((e.clientX - r.left) / r.width - 0.5) * 10);
          rx.set(-((e.clientY - r.top) / r.height - 0.5) * 10);
        }}
        onPointerLeave={() => {
          rx.set(0);
          ry.set(0);
        }}
      >
        <motion.div style={{ rotateX: rx, rotateY: ry }} className={`relative overflow-hidden rounded-[24px] bg-white shadow-[0_40px_80px_-40px_rgba(11,74,143,0.5)] ${p.square ? 'mx-auto aspect-square max-w-[520px]' : 'aspect-[3/2]'}`}>
          <Image src={p.image} alt={p.imageAlt} fill sizes="(min-width: 1024px) 50vw, 100vw" className="object-cover" />
          {p.highlight && (
            <span className="absolute bottom-4 left-4 inline-flex items-center gap-2 rounded-full bg-white/90 px-4 py-2 font-sans text-[12.5px] font-semibold text-revora-slate shadow-sm backdrop-blur">
              <Snowflake className="h-4 w-4 text-revora-cobalt" /> {p.highlight}
            </span>
          )}
        </motion.div>
      </motion.div>

      {/* details */}
      <div>
        <FadeUp>
          <span className="inline-flex items-center gap-2 rounded-full bg-revora-crimson-tint px-3 py-1.5 font-sans text-[11px] font-semibold uppercase tracking-[0.16em] text-revora-crimson-dark">
            New · {p.pack}
          </span>
          {p.badge && (
            <span className="mt-2 flex w-fit items-center gap-1.5 rounded-full bg-revora-cobalt px-3 py-1.5 font-sans text-[11px] font-semibold uppercase tracking-[0.14em] text-white">
              <Shield className="h-3.5 w-3.5" /> {p.badge}
            </span>
          )}
          <h3 className="mt-5 font-heading text-[clamp(2rem,3.8vw,3.2rem)] font-extrabold leading-[1.02] tracking-[-0.03em] text-revora-slate">
            {p.name} {p.accent && <span className="text-revora-crimson">{p.accent}</span>}
          </h3>
          <p className="mt-2 font-heading text-[1.15rem] font-semibold text-revora-cobalt">{p.tagline}</p>
          <p className="mt-4 max-w-md font-sans text-[16px] leading-[1.7] text-revora-slate-light">{p.description}</p>
          {p.includes && (
            <div className="mt-6">
              <p className="font-sans text-[11px] font-semibold uppercase tracking-[0.16em] text-revora-slate-muted">Kit includes</p>
              <ul className="mt-2.5 grid gap-1.5 tablet:grid-cols-2">
                {p.includes.map((x) => (
                  <li key={x} className="flex items-center gap-2 font-sans text-[14.5px] font-medium text-revora-slate">
                    <Check className="h-4 w-4 shrink-0 text-revora-cobalt" strokeWidth={3} /> {x}
                  </li>
                ))}
              </ul>
            </div>
          )}
        </FadeUp>

        {/* key features */}
        <div className="mt-8 grid grid-cols-2 gap-3">
          {p.features.map((f, i) => {
            const Icon = FEATURE_ICON[f.icon];
            return (
              <motion.div
                key={f.value}
                initial={reduce ? false : { opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-5% 0px' }}
                transition={{ duration: 0.6, delay: 0.1 + i * 0.08, ease: expoOut }}
                className="group flex items-center gap-2.5 rounded-2xl border border-revora-cobalt/10 bg-white p-3 transition-shadow tablet:gap-3 tablet:p-4 duration-500 hover:shadow-[0_16px_36px_-20px_rgba(11,74,143,0.5)]"
              >
                <span className="grid h-9 w-9 shrink-0 place-items-center rounded-xl bg-revora-crimson-tint text-revora-crimson transition-transform duration-500 group-hover:scale-110 tablet:h-11 tablet:w-11">
                  <Icon className="h-5 w-5" />
                </span>
                <span>
                  <span className="block font-sans text-[11px] font-semibold uppercase tracking-[0.12em] text-revora-slate-muted">{f.label}</span>
                  <span className="block font-heading text-[15px] font-extrabold leading-tight text-revora-slate tablet:text-base">{f.value}</span>
                </span>
              </motion.div>
            );
          })}
        </div>

        {/* who it's for */}
        <FadeUp delay={0.2}>
          {p.uses.length > 0 && <p className="mt-8 font-sans text-[11px] font-semibold uppercase tracking-[0.16em] text-revora-slate-muted">Made for</p>}
          <div className="mt-3 flex flex-wrap gap-2">
            {p.uses.map((u) => {
              const Icon = USE_ICON[u.icon];
              return (
                <span key={u.label} className="inline-flex items-center gap-2 rounded-full border border-revora-cobalt/15 bg-white px-4 py-2 font-sans text-[13.5px] font-semibold text-revora-slate">
                  <Icon className="h-4 w-4 text-revora-cobalt" /> {u.label}
                </span>
              );
            })}
          </div>
          <div className="mt-9 flex flex-wrap gap-3">
            <Button
              href={`mailto:depot@revorahealthcare.com?subject=${encodeURIComponent(`Enquiry — Revora ${p.name} ${p.accent ?? ''}`.trim())}`}
              arrow="up-right"
              magnetic
            >
              Enquire now
            </Button>
            <Button href="/channel-partner" variant="outline">Become a distributor</Button>
          </div>
        </FadeUp>
      </div>
    </article>
  );
}
