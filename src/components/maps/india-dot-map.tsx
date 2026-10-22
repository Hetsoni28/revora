'use client';

import { useRef } from 'react';
import { motion, useInView, useReducedMotion } from 'framer-motion';
import { expoOut } from '@/lib/easings';
import { INDIA_DOTS, INDIA_PINS, INDIA_VIEWBOX } from './map-data';
import { DOMESTIC_NETWORK, toIndiaMap } from '@/lib/network';

const [W, H] = INDIA_VIEWBOX;
const HQ = INDIA_PINS.ahmedabad;
const PLANT = INDIA_PINS.paonta;
const MAX_R = Math.ceil(Math.max(...INDIA_DOTS.map(([x, y]) => Math.hypot(x - HQ[0], y - HQ[1])))) + 10;

// All ~800 dots as ONE path (each dot = two arcs), split into two tones. One element is far cheaper
// to paint than hundreds of <circle>s.
const R = 2.9;
const dotPath = (pts: [number, number][]) => pts.map(([x, y]) => `M${x - R} ${y}a${R} ${R} 0 1 0 ${R * 2} 0a${R} ${R} 0 1 0 ${-R * 2} 0`).join('');
const PATH_LIGHT = dotPath(INDIA_DOTS.filter((_, i) => i % 17 !== 0));
const PATH_ACCENT = dotPath(INDIA_DOTS.filter((_, i) => i % 17 === 0));

/** Curved route from Ahmedabad, bowing to one side like the routes on the world map. */
function arc(to: readonly number[], bow = 0.22) {
  const [x1, y1] = HQ;
  const [x2, y2] = to;
  const dx = x2 - x1;
  const dy = y2 - y1;
  // control point pushed sideways from the midpoint, always towards the upper side of the route
  const s = dx >= 0 ? -1 : 1;
  const cx = (x1 + x2) / 2 + s * dy * bow;
  const cy = (y1 + y2) / 2 - s * dx * bow;
  return `M${x1} ${y1} Q ${cx} ${cy} ${x2} ${y2}`;
}

/**
 * Where each label sits (viewBox units) and which side it hangs off, chosen so no label covers a pin
 * in the crowded north. A state without an entry gets a label just to the right of its pin.
 */
const LABEL_AT: Record<string, { x: number; y: number; side: 'left' | 'right' }> = {
  // left column (north to south), ~40+ units apart
  'Jammu & Kashmir': { x: 96, y: 58, side: 'left' },
  'Himachal Pradesh': { x: 126, y: 98, side: 'left' },
  Punjab: { x: 120, y: 140, side: 'left' },
  Rajasthan: { x: 110, y: 198, side: 'left' },
  Maharashtra: { x: 68, y: 330, side: 'left' },
  // right column, below the plant label
  Uttarakhand: { x: 184, y: 132, side: 'right' },
  // kept above Lucknow's pin
  Delhi: { x: 178, y: 170, side: 'right' },
  'Uttar Pradesh': { x: 222, y: 228, side: 'right' },
  'Madhya Pradesh': { x: 172, y: 274, side: 'right' },
  Telangana: { x: 186, y: 330, side: 'right' },
  'Andhra Pradesh': { x: 216, y: 376, side: 'right' },
  Karnataka: { x: 172, y: 420, side: 'right' },
  Kerala: { x: 160, y: 486, side: 'right' },
};

// the HQ state is shown by the HQ pin, so it gets no route or pin of its own
const NETWORK = DOMESTIC_NETWORK.filter((s) => !s.hq).map((s) => {
  const at = toIndiaMap(s.lon, s.lat);
  const label = LABEL_AT[s.name] ?? { x: at[0] + 12, y: at[1], side: 'right' as const };
  return { ...s, at, label, route: arc(at) };
});
const PLANT_ROUTE = arc(PLANT, 0.3);
const PLANT_LABEL = { x: 164, y: 90 };

/** Dotted map of India (official boundary) with routes from Ahmedabad to our plant and every state we serve. */
export function IndiaDotMap({ className }: { className?: string }) {
  const ref = useRef<HTMLDivElement>(null);
  const seen = useInView(ref, { once: true, margin: '-10% 0px' });
  // Looping effects only run while the map is actually on screen.
  const onScreen = useInView(ref, { margin: '0px' });
  const reduce = useReducedMotion();
  const play = seen || !!reduce;
  const loop = onScreen && !reduce;

  return (
    <div ref={ref} className={`@container relative ${className ?? ''}`}>
      {/* layer 1: static dots, revealed once by a mask growing out from Ahmedabad */}
      <svg
        viewBox={`0 0 ${W} ${H}`}
        className="h-auto w-full"
        role="img"
        aria-label={`Map of India: headquarters in Ahmedabad, plant in Paonta Sahib, and our network in ${NETWORK.map((n) => `${n.city} (${n.name})`).join(', ')}`}
      >
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

      {/* layer 2: routes, pins and pulses on their own compositor layer, so they never repaint the dots */}
      <svg viewBox={`0 0 ${W} ${H}`} className="pointer-events-none absolute inset-0 h-full w-full transform-[translateZ(0)]" aria-hidden>
        <defs>
          <linearGradient id="ind-route" x1="0" y1="1" x2="1" y2="0">
            <stop offset="0%" stopColor="#0B4A8F" />
            <stop offset="100%" stopColor="#D7262E" />
          </linearGradient>
        </defs>

        {/* routes to the network */}
        {NETWORK.map((n, i) => (
          <g key={n.name}>
            <motion.path
              d={n.route}
              fill="none"
              stroke="url(#ind-route)"
              strokeOpacity={0.55}
              strokeWidth="1.5"
              strokeLinecap="round"
              initial={reduce ? false : { pathLength: 0, opacity: 0 }}
              animate={play ? { pathLength: 1, opacity: 1 } : undefined}
              transition={{ duration: 1.2, delay: 1.2 + i * 0.08, ease: expoOut }}
            />
            {loop && seen && (
              <circle r="2.6" fill="#0B4A8F">
                <animateMotion dur={`${2.6 + (i % 4) * 0.4}s`} begin={`${2.4 + (i % 6) * 0.35}s`} repeatCount="indefinite" path={n.route} />
              </circle>
            )}
          </g>
        ))}

        {/* route to the plant — the main line */}
        <motion.path
          d={PLANT_ROUTE}
          fill="none"
          stroke="url(#ind-route)"
          strokeWidth="2.5"
          strokeLinecap="round"
          initial={reduce ? false : { pathLength: 0 }}
          animate={play ? { pathLength: 1 } : undefined}
          transition={{ duration: 1.4, delay: 0.8, ease: expoOut }}
        />

        {/* leader lines from pins to their labels */}
        {NETWORK.map((n, i) => (
          <motion.line
            key={`${n.name}-leader`}
            x1={n.at[0]}
            y1={n.at[1]}
            x2={n.label.x}
            y2={n.label.y}
            stroke="#0B4A8F"
            strokeOpacity={0.35}
            strokeWidth="1"
            initial={reduce ? false : { opacity: 0 }}
            animate={play ? { opacity: 1 } : undefined}
            transition={{ duration: 0.5, delay: 2 + i * 0.06 }}
          />
        ))}

        <motion.line
          x1={PLANT[0]}
          y1={PLANT[1]}
          x2={PLANT_LABEL.x}
          y2={PLANT_LABEL.y}
          stroke="#D7262E"
          strokeOpacity={0.45}
          strokeWidth="1"
          initial={reduce ? false : { opacity: 0 }}
          animate={play ? { opacity: 1 } : undefined}
          transition={{ duration: 0.5, delay: 1.3 }}
        />

        {/* network pins */}
        {NETWORK.map((n, i) => (
          <motion.circle
            key={`${n.name}-pin`}
            cx={n.at[0]}
            cy={n.at[1]}
            r="4.5"
            fill="#D7262E"
            stroke="#FFFFFF"
            strokeWidth="2"
            initial={reduce ? false : { scale: 0 }}
            animate={play ? { scale: 1 } : undefined}
            style={{ transformOrigin: `${n.at[0]}px ${n.at[1]}px` }}
            transition={{ duration: 0.5, delay: 1.8 + i * 0.08, ease: [0.34, 1.56, 0.64, 1] }}
          />
        ))}

        {/* plant + HQ */}
        {[
          { p: PLANT, color: '#D7262E', d: 1.1, r: 6.5 },
          { p: HQ, color: '#0B4A8F', d: 0.3, r: 7.5 },
        ].map(({ p, color, d, r }) => (
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
              r={r}
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

      {/* labels */}
      <MapLabel x={HQ[0]} y={HQ[1] + 9} side="below" play={play} delay={0.5} strong="HQ" state="Gujarat" />
      <MapLabel x={PLANT_LABEL.x} y={PLANT_LABEL.y} side="right" play={play} delay={1.3} strong="Plant" state="Himachal Pradesh" />
      {NETWORK.map((n, i) => (
        <MapLabel key={n.name} x={n.label.x} y={n.label.y} side={n.label.side} play={play} delay={2 + i * 0.06} state={n.name} small />
      ))}
    </div>
  );
}

const SIDE = { left: '-translate-x-full -translate-y-1/2', right: '-translate-y-1/2', below: '-translate-x-1/2' } as const;

/**
 * State name pill. Text and padding are sized in container units, so labels shrink with the map and
 * keep the same overlap-free layout from phone to desktop.
 */
function MapLabel({ x, y, side, play, delay, state, strong, small }: {
  x: number;
  y: number;
  side: 'left' | 'right' | 'below';
  play: boolean;
  delay: number;
  state: string;
  city?: string;
  strong?: string;
  small?: boolean;
}) {
  const reduce = useReducedMotion();
  return (
    <motion.div
      initial={reduce ? false : { opacity: 0 }}
      animate={play ? { opacity: 1 } : undefined}
      transition={{ duration: 0.6, delay, ease: expoOut }}
      className={`absolute w-max rounded-lg border bg-white shadow-[0_8px_22px_-14px_rgba(11,74,143,0.55)] ${SIDE[side]} ${
        small ? 'border-revora-cobalt/10 px-[0.7em] py-[0.35em] text-[clamp(7.5px,2.28cqw,12px)]' : 'border-revora-cobalt/20 px-[0.75em] py-[0.4em] text-[clamp(8.5px,2.55cqw,13.5px)]'
      }`}
      style={{ left: `${(x / W) * 100}%`, top: `${(y / H) * 100}%` }}
    >
      <p className="font-heading font-extrabold leading-tight text-revora-slate">
        {strong && <span className="mr-[0.5em] font-sans text-[0.75em] font-semibold uppercase tracking-[0.12em] text-revora-crimson-dark">{strong}</span>}
        {state}
      </p>
    </motion.div>
  );
}
