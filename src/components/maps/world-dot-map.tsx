'use client';

import { useRef } from 'react';
import { motion, useInView, useReducedMotion } from 'framer-motion';
import { expoOut } from '@/lib/easings';
import { WORLD_DOTS, WORLD_PINS, WORLD_VIEWBOX } from './map-data';

const [W, H] = WORLD_VIEWBOX;
const ORIGIN = WORLD_PINS.ahmedabad;

// ~1,500 dots drawn as two paths (land + India) instead of individual circles: one element each to paint.
const dotPath = (pts: number[][], r: number) => pts.map(([x, y]) => `M${x - r} ${y}a${r} ${r} 0 1 0 ${r * 2} 0a${r} ${r} 0 1 0 ${-r * 2} 0`).join('');
const PATH_LAND = dotPath(WORLD_DOTS.filter((d) => !d[2]), 2.6);
const PATH_INDIA = dotPath(WORLD_DOTS.filter((d) => d[2]), 3.2);

/** Regions shown as partnership opportunities — broad areas, not claims of existing sales. */
export const WORLD_REGIONS = [
  { key: 'middleEast', label: 'Middle East' },
  { key: 'eastAfrica', label: 'Africa' },
  { key: 'southeastAsia', label: 'Southeast Asia' },
  { key: 'cis', label: 'CIS' },
  { key: 'latinAmerica', label: 'Latin America' },
] as const;

/** Curved arc from India to a region, bowing upward. */
function arc(to: readonly number[]) {
  const [x1, y1] = ORIGIN;
  const [x2, y2] = to;
  const mx = (x1 + x2) / 2;
  const my = Math.min(y1, y2) - Math.max(40, Math.abs(x2 - x1) * 0.28);
  return `M${x1} ${y1} Q ${mx} ${my} ${x2} ${y2}`;
}

/** Dotted world map with India highlighted and animated arcs out to partnership regions. */
export function WorldDotMap({ className }: { className?: string }) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: '-10% 0px' });
  // Looping effects only run while the map is on screen.
  const onScreen = useInView(ref, { margin: '0px' });
  const reduce = useReducedMotion();
  const play = inView || reduce;
  const loop = onScreen && !reduce;

  return (
    <div ref={ref} className={`relative ${className ?? ''}`}>
      <svg viewBox={`0 0 ${W} ${H}`} className="h-auto w-full" role="img" aria-label="World map with India highlighted and routes to partnership regions">
        <defs>
          <linearGradient id="wd-route" x1="0" y1="0" x2="1" y2="0">
            <stop offset="0%" stopColor="#94B6E5" />
            <stop offset="100%" stopColor="#D7262E" />
          </linearGradient>
        </defs>

        <motion.g initial={reduce ? false : { opacity: 0 }} animate={play ? { opacity: 1 } : undefined} transition={{ duration: 1.2, ease: expoOut }}>
          <path d={PATH_LAND} fill="rgba(148,182,229,0.45)" />
          <path d={PATH_INDIA} fill="#FFFFFF" />
        </motion.g>
      </svg>

      {/* moving parts on their own compositor layer, so they never repaint the dots */}
      <svg viewBox={`0 0 ${W} ${H}`} className="pointer-events-none absolute inset-0 h-full w-full [transform:translateZ(0)]" aria-hidden>

        {WORLD_REGIONS.map((r, i) => {
          const to = WORLD_PINS[r.key];
          const d = arc(to);
          return (
            <g key={r.key}>
              <motion.path
                d={d}
                fill="none"
                stroke="url(#wd-route)"
                strokeWidth="2"
                strokeLinecap="round"
                initial={reduce ? false : { pathLength: 0, opacity: 0 }}
                animate={play ? { pathLength: 1, opacity: 1 } : undefined}
                transition={{ duration: 1.4, delay: 1 + i * 0.2, ease: expoOut }}
              />
              {loop && inView && (
                <circle r="3.5" fill="#FFFFFF">
                  <animateMotion dur="3s" begin={`${2.4 + i * 0.5}s`} repeatCount="indefinite" path={d} />
                </circle>
              )}
              <motion.circle
                cx={to[0]}
                cy={to[1]}
                r="5"
                fill="#D7262E"
                stroke="#FFFFFF"
                strokeWidth="2"
                initial={reduce ? false : { scale: 0 }}
                animate={play ? { scale: 1 } : undefined}
                style={{ transformOrigin: `${to[0]}px ${to[1]}px` }}
                transition={{ duration: 0.6, delay: 1.8 + i * 0.2, ease: [0.34, 1.56, 0.64, 1] }}
              />
            </g>
          );
        })}

        {/* origin */}
        {loop && inView && (
          <motion.circle cx={ORIGIN[0]} cy={ORIGIN[1]} fill="#FFFFFF" initial={{ r: 6, opacity: 0.5 }} animate={{ r: 30, opacity: 0 }} transition={{ duration: 2.2, repeat: Infinity, ease: 'easeOut' }} />
        )}
        <circle cx={ORIGIN[0]} cy={ORIGIN[1]} r="7" fill="#0B4A8F" stroke="#FFFFFF" strokeWidth="3" />
      </svg>

      {/* region labels */}
      {WORLD_REGIONS.map((r, i) => {
        const [x, y] = WORLD_PINS[r.key];
        return (
          <motion.span
            key={r.key}
            initial={reduce ? false : { opacity: 0, y: 6 }}
            animate={play ? { opacity: 1, y: 0 } : undefined}
            transition={{ duration: 0.6, delay: 2 + i * 0.2, ease: expoOut }}
            className="absolute hidden w-max -translate-x-1/2 translate-y-3 rounded-full bg-white/10 px-2.5 py-1 font-sans text-[11px] font-semibold text-white tablet:block"
            style={{ left: `${(x / W) * 100}%`, top: `${(y / H) * 100}%` }}
          >
            {r.label}
          </motion.span>
        );
      })}
      <motion.span
        initial={reduce ? false : { opacity: 0 }}
        animate={play ? { opacity: 1 } : undefined}
        transition={{ duration: 0.6, delay: 0.6 }}
        className="absolute w-max -translate-x-1/2 -translate-y-[calc(100%+14px)] rounded-full bg-white px-3 py-1 font-sans text-[11.5px] font-bold text-revora-cobalt"
        style={{ left: `${(ORIGIN[0] / W) * 100}%`, top: `${(ORIGIN[1] / H) * 100}%` }}
      >
        India · Ahmedabad
      </motion.span>
    </div>
  );
}
