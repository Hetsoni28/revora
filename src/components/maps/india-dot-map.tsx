'use client';

import { useRef } from 'react';
import { motion, useInView, useReducedMotion } from 'framer-motion';
import { expoOut } from '@/lib/easings';
import { INDIA_DOTS, INDIA_PINS, INDIA_VIEWBOX } from './map-data';

const [W, H] = INDIA_VIEWBOX;
const HQ = INDIA_PINS.ahmedabad;
const PLANT = INDIA_PINS.paonta;
const ARC = `M${HQ[0]} ${HQ[1]} Q ${(HQ[0] + PLANT[0]) / 2 - 60} ${(HQ[1] + PLANT[1]) / 2 - 10} ${PLANT[0]} ${PLANT[1]}`;
const MAX_R = Math.ceil(Math.max(...INDIA_DOTS.map(([x, y]) => Math.hypot(x - HQ[0], y - HQ[1])))) + 10;

// All ~800 dots as ONE path (each dot = two arcs), split into two tones. One element is far cheaper
// to paint than hundreds of <circle>s.
const R = 2.9;
const dotPath = (pts: [number, number][]) => pts.map(([x, y]) => `M${x - R} ${y}a${R} ${R} 0 1 0 ${R * 2} 0a${R} ${R} 0 1 0 ${-R * 2} 0`).join('');
const PATH_LIGHT = dotPath(INDIA_DOTS.filter((_, i) => i % 17 !== 0));
const PATH_ACCENT = dotPath(INDIA_DOTS.filter((_, i) => i % 17 === 0));

/** Dotted map of India (official boundary) with our HQ and plant, animated when it scrolls into view. */
export function IndiaDotMap({ className }: { className?: string }) {
  const ref = useRef<HTMLDivElement>(null);
  const seen = useInView(ref, { once: true, margin: '-10% 0px' });
  // Looping effects only run while the map is actually on screen.
  const onScreen = useInView(ref, { margin: '0px' });
  const reduce = useReducedMotion();
  const play = seen || !!reduce;
  const loop = onScreen && !reduce;

  return (
    <div ref={ref} className={`relative ${className ?? ''}`}>
      {/* layer 1: static dots, revealed once by a mask growing out from Ahmedabad */}
      <svg viewBox={`0 0 ${W} ${H}`} className="h-auto w-full" role="img" aria-label="Map of India showing Revora's Ahmedabad headquarters and Paonta Sahib plant">
        <defs>
          <clipPath id="ind-reveal">
            <motion.circle
              cx={HQ[0]}
              cy={HQ[1]}
              initial={{ r: reduce ? MAX_R : 0 }}
              animate={play ? { r: MAX_R } : undefined}
              transition={{ duration: 1.6, ease: expoOut }}
            />
          </clipPath>
        </defs>
        <g clipPath="url(#ind-reveal)">
          <path d={PATH_LIGHT} fill="#94B6E5" />
          <path d={PATH_ACCENT} fill="#3A82C8" />
        </g>
      </svg>

      {/* layer 2: route, pins and pulses on their own compositor layer, so they never repaint the dots */}
      <svg viewBox={`0 0 ${W} ${H}`} className="pointer-events-none absolute inset-0 h-full w-full [transform:translateZ(0)]" aria-hidden>
        <defs>
          <linearGradient id="ind-route" x1="0" y1="1" x2="1" y2="0">
            <stop offset="0%" stopColor="#0B4A8F" />
            <stop offset="100%" stopColor="#D7262E" />
          </linearGradient>
        </defs>
        <path d={ARC} fill="none" stroke="rgba(11,74,143,0.15)" strokeWidth="2" strokeDasharray="3 5" />
        <motion.path
          d={ARC}
          fill="none"
          stroke="url(#ind-route)"
          strokeWidth="2.5"
          strokeLinecap="round"
          initial={reduce ? false : { pathLength: 0 }}
          animate={play ? { pathLength: 1 } : undefined}
          transition={{ duration: 1.4, delay: 1, ease: expoOut }}
        />
        {loop && seen && (
          <circle r="4" fill="#0B4A8F">
            <animateMotion dur="2.8s" begin="1.6s" repeatCount="indefinite" path={ARC} />
          </circle>
        )}
        {[
          { p: HQ, color: '#0B4A8F', d: 0.3 },
          { p: PLANT, color: '#D7262E', d: 1.1 },
        ].map(({ p, color, d }) => (
          <g key={color}>
            {loop && seen && (
              <motion.circle
                cx={p[0]}
                cy={p[1]}
                r="26"
                fill={color}
                initial={{ scale: 0.27, opacity: 0.45 }}
                animate={{ scale: 1, opacity: 0 }}
                style={{ transformOrigin: `${p[0]}px ${p[1]}px` }}
                transition={{ duration: 2, repeat: Infinity, ease: 'easeOut', delay: d + 0.8 }}
              />
            )}
            <motion.circle
              cx={p[0]}
              cy={p[1]}
              r="7"
              fill={color}
              stroke="#FFFFFF"
              strokeWidth="3"
              initial={reduce ? false : { scale: 0 }}
              animate={play ? { scale: 1 } : undefined}
              style={{ transformOrigin: `${p[0]}px ${p[1]}px` }}
              transition={{ duration: 0.6, delay: d, ease: [0.34, 1.56, 0.64, 1] }}
            />
          </g>
        ))}
      </svg>

      <MapLabel x={HQ[0]} y={HQ[1]} play={play} delay={0.5} kicker="Headquarters" title="Ahmedabad" />
      <MapLabel x={PLANT[0]} y={PLANT[1]} play={play} delay={1.3} kicker="Manufacturing" title="Paonta Sahib" />
    </div>
  );
}

function MapLabel({ x, y, play, delay, kicker, title }: { x: number; y: number; play: boolean; delay: number; kicker: string; title: string }) {
  const reduce = useReducedMotion();
  return (
    <motion.div
      initial={reduce ? false : { opacity: 0, y: 8 }}
      animate={play ? { opacity: 1, y: 0 } : undefined}
      transition={{ duration: 0.7, delay, ease: expoOut }}
      className="absolute w-max translate-x-4 -translate-y-1/2 rounded-xl border border-revora-cobalt/10 bg-white px-3 py-2 shadow-[0_10px_30px_-14px_rgba(11,74,143,0.45)]"
      style={{ left: `${(x / W) * 100}%`, top: `${(y / H) * 100}%` }}
    >
      <p className="font-sans text-[10.5px] font-semibold uppercase tracking-[0.14em] text-revora-slate-muted">{kicker}</p>
      <p className="font-heading text-[14px] font-extrabold leading-tight text-revora-slate tablet:text-[15px]">{title}</p>
    </motion.div>
  );
}
