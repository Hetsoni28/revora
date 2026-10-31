'use client';

import { useRef } from 'react';
import { motion, useInView, useReducedMotion } from 'framer-motion';
import { expoOut } from '@/lib/easings';
import { WORLD_DOTS, WORLD_PINS, WORLD_VIEWBOX } from './map-data';
import { GLOBAL_NETWORK, toWorldMap } from '@/lib/network';

const [W, H] = WORLD_VIEWBOX;
const ORIGIN = WORLD_PINS.ahmedabad;

// ~1,500 dots drawn as two paths (land + India) instead of individual circles: one element each to paint.
const dotPath = (pts: number[][], r: number) => pts.map(([x, y]) => `M${x - r} ${y}a${r} ${r} 0 1 0 ${r * 2} 0a${r} ${r} 0 1 0 ${-r * 2} 0`).join('');
const PATH_LAND = dotPath(WORLD_DOTS.filter((d) => !d[2]), 2.6);
const PATH_INDIA = dotPath(WORLD_DOTS.filter((d) => d[2]), 3.2);

/** Curved route from India, bowing upward; short hops (Nepal, Sri Lanka) get a gentle curve. */
function arc(to: readonly number[]) {
  const [x1, y1] = ORIGIN;
  const [x2, y2] = to;
  const dist = Math.hypot(x2 - x1, y2 - y1);
  const mx = (x1 + x2) / 2;
  const my = Math.min(y1, y2) - Math.max(10, dist * 0.32);
  return `M${x1} ${y1} Q ${mx} ${my} ${x2} ${y2}`;
}

/**
 * Where each country label sits (map units) and which side of that point it hangs, chosen so the
 * Gulf and East Africa clusters stay readable. A country without an entry is labelled to the right.
 */
const LABEL_AT: Record<string, { x: number; y: number; side: 'left' | 'right' | 'below' }> = {
  Kazakhstan: { x: 712, y: 98, side: 'right' },
  Nepal: { x: 758, y: 172, side: 'right' },
  Bangladesh: { x: 770, y: 198, side: 'right' },
  'Sri Lanka': { x: 732, y: 268, side: 'below' },
  Malaysia: { x: 796, y: 290, side: 'right' },
  Philippines: { x: 850, y: 232, side: 'right' },
  Iraq: { x: 612, y: 158, side: 'left' },
  Bahrain: { x: 628, y: 188, side: 'left' },
  UAE: { x: 640, y: 214, side: 'left' },
  Yemen: { x: 610, y: 242, side: 'left' },
  Libya: { x: 522, y: 164, side: 'left' },
  Uganda: { x: 576, y: 272, side: 'left' },
  Kenya: { x: 618, y: 282, side: 'right' },
  Tanzania: { x: 614, y: 310, side: 'right' },
  Congo: { x: 530, y: 304, side: 'left' },
  Zimbabwe: { x: 602, y: 344, side: 'right' },
  'South Africa': { x: 594, y: 378, side: 'right' },
};

const MARKETS = GLOBAL_NETWORK.map((m) => {
  const at = toWorldMap(m.lon, m.lat);
  return { ...m, at, route: arc(at), label: LABEL_AT[m.name] ?? { x: at[0] + 10, y: at[1], side: 'right' as const } };
});

const SIDE = { left: '-translate-x-full -translate-y-1/2', right: '-translate-y-1/2', below: '-translate-x-1/2' } as const;

/** Dotted world map with India highlighted and routes out to each priority export market. */
export function WorldDotMap({ className }: { className?: string }) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: '-10% 0px' });
  // Looping effects only run while the map is on screen.
  const onScreen = useInView(ref, { margin: '0px' });
  const reduce = useReducedMotion();
  const play = inView || reduce;
  const loop = onScreen && !reduce;

  return (
    <div ref={ref} className={`overflow-hidden ${className ?? ''}`}>
      {/* phones: the map is drawn ~1.9× wider and shifted so only x 440–960 (Africa → Philippines) shows */}
      <div className="@container relative -ml-[84.6%] w-[192.3%] tablet:ml-0 tablet:w-full">
        <svg viewBox={`0 0 ${W} ${H}`} className="h-auto w-full" role="img" aria-label={`World map: Revora in India and ${MARKETS.length} priority export markets — ${MARKETS.map((m) => m.name).join(', ')}`}>
          <defs>
            <linearGradient id="wd-route" x1="0" y1="0" x2="1" y2="0">
              <stop offset="0%" stopColor="#94B6E5" />
              <stop offset="100%" stopColor="#FFFFFF" />
            </linearGradient>
          </defs>

          <motion.g initial={reduce ? false : { opacity: 0 }} animate={play ? { opacity: 1 } : undefined} transition={{ duration: 1.2, ease: expoOut }}>
            <path d={PATH_LAND} fill="rgba(148,182,229,0.45)" />
            <path d={PATH_INDIA} fill="#FFFFFF" />
          </motion.g>
        </svg>

        {/* moving parts on their own compositor layer, so they never repaint the dots */}
        <svg viewBox={`0 0 ${W} ${H}`} className="pointer-events-none absolute inset-0 h-full w-full transform-[translateZ(0)]" aria-hidden>
          {/* routes */}
          {MARKETS.map((m, i) => (
            <g key={m.name}>
              <motion.path
                d={m.route}
                fill="none"
                stroke="url(#wd-route)"
                strokeOpacity={0.7}
                strokeWidth="1.6"
                strokeLinecap="round"
                initial={reduce ? false : { pathLength: 0, opacity: 0 }}
                animate={play ? { pathLength: 1, opacity: 1 } : undefined}
                transition={{ duration: 1.3, delay: 0.8 + i * 0.07, ease: expoOut }}
              />
              {loop && inView && (
                <circle r="2.6" fill="#FFFFFF">
                  <animateMotion dur={`${2.6 + (i % 4) * 0.45}s`} begin={`${2.2 + (i % 6) * 0.4}s`} repeatCount="indefinite" path={m.route} />
                </circle>
              )}
            </g>
          ))}

          {/* leader lines to labels */}
          {MARKETS.map((m, i) => (
            <motion.line
              key={`${m.name}-leader`}
              x1={m.at[0]}
              y1={m.at[1]}
              x2={m.label.x}
              y2={m.label.y}
              stroke="#FFFFFF"
              strokeOpacity={0.4}
              strokeWidth="0.8"
              initial={reduce ? false : { opacity: 0 }}
              animate={play ? { opacity: 1 } : undefined}
              transition={{ duration: 0.5, delay: 1.8 + i * 0.05 }}
            />
          ))}

          {/* country pins */}
          {MARKETS.map((m, i) => (
            <motion.circle
              key={`${m.name}-pin`}
              cx={m.at[0]}
              cy={m.at[1]}
              r="4.2"
              fill="#D7262E"
              stroke="#FFFFFF"
              strokeWidth="1.8"
              initial={reduce ? false : { scale: 0 }}
              animate={play ? { scale: 1 } : undefined}
              style={{ transformOrigin: `${m.at[0]}px ${m.at[1]}px` }}
              transition={{ duration: 0.5, delay: 1.5 + i * 0.07, ease: [0.34, 1.56, 0.64, 1] }}
            />
          ))}

          {/* origin */}
          {loop && inView && (
            <motion.circle cx={ORIGIN[0]} cy={ORIGIN[1]} fill="#FFFFFF" initial={{ r: 6, opacity: 0.5 }} animate={{ r: 30, opacity: 0 }} transition={{ duration: 2.2, repeat: Infinity, ease: 'easeOut' }} />
          )}
          <circle cx={ORIGIN[0]} cy={ORIGIN[1]} r="7" fill="#0B4A8F" stroke="#FFFFFF" strokeWidth="3" />
        </svg>

        {/* country labels */}
        {MARKETS.map((m, i) => (
          <motion.span
            key={m.name}
            initial={reduce ? false : { opacity: 0 }}
            animate={play ? { opacity: 1 } : undefined}
            transition={{ duration: 0.5, delay: 1.9 + i * 0.05, ease: expoOut }}
            className={`absolute w-max rounded-full bg-white/12 px-[0.8em] py-[0.2em] font-sans text-[clamp(8.5px,1.42cqw,11px)] font-semibold text-white backdrop-blur-sm ${SIDE[m.label.side]}`}
            style={{ left: `${(m.label.x / W) * 100}%`, top: `${(m.label.y / H) * 100}%` }}
          >
            {m.name}
          </motion.span>
        ))}
        <motion.span
          initial={reduce ? false : { opacity: 0 }}
          animate={play ? { opacity: 1 } : undefined}
          transition={{ duration: 0.6, delay: 0.6 }}
          className="absolute w-max -translate-x-1/2 translate-y-3 rounded-full bg-white px-[0.9em] py-[0.25em] font-sans text-[clamp(9px,1.5cqw,11.5px)] font-bold text-revora-cobalt"
          style={{ left: `${(ORIGIN[0] / W) * 100}%`, top: `${(ORIGIN[1] / H) * 100}%` }}
        >
          India<span className="hidden desktop:inline"> · Ahmedabad</span>
        </motion.span>
      </div>
    </div>
  );
}
