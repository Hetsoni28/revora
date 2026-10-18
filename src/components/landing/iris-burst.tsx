'use client';

import { useEffect } from 'react';
import { motion, useMotionValue, useSpring, useTransform, useReducedMotion } from 'framer-motion';

/**
 * Revora "Radial Burst" iris — the packaging motif (concentric rings of
 * circles whose gaps read as four-pointed stars) wrapped around an eye
 * whose pupil follows the cursor.
 */

type Dot = { cx: number; cy: number; r: number };
type Ring = { dots: Dot[]; tone: 'cobalt' | 'navy' | 'sky' | 'crimson'; dir: 1 | -1; dur: number };

const SIZE = 640;
const C = SIZE / 2;

/**
 * Math.sin/cos can differ in the last digit between Node (server render) and
 * the browser, which breaks hydration — so every SVG coordinate is rounded.
 */
const round = (v: number) => Math.round(v * 1000) / 1000;

function buildRings(): Ring[] {
  const rings: Ring[] = [];
  let R = 124; // first ring sits just outside the iris
  const counts = [24, 28, 32, 36, 40];
  counts.forEach((n, k) => {
    const r = R * Math.sin(Math.PI / n) * 0.92;
    const offset = k % 2 === 0 ? 0 : Math.PI / n; // stagger → star-shaped gaps
    const dots: Dot[] = Array.from({ length: n }, (_, i) => {
      const a = (i / n) * Math.PI * 2 + offset;
      return { cx: round(C + R * Math.cos(a)), cy: round(C + R * Math.sin(a)), r: round(r) };
    });
    const tones: Ring['tone'][] = ['cobalt', 'navy', 'sky', 'cobalt', 'crimson'];
    rings.push({ dots, tone: tones[k], dir: k % 2 === 0 ? 1 : -1, dur: 90 + k * 25 });
    R += r * 2 + 3;
  });
  return rings;
}

const RINGS = buildRings();

/** Radial iris fibres, from the pupil edge to the iris rim. */
const FIBRES = Array.from({ length: 48 }, (_, i) => {
  const a = (i / 48) * Math.PI * 2;
  return {
    x1: round(C + 44 * Math.cos(a)),
    y1: round(C + 44 * Math.sin(a)),
    x2: round(C + 100 * Math.cos(a)),
    y2: round(C + 100 * Math.sin(a)),
    strong: i % 3 === 0,
  };
});

const TONE: Record<Ring['tone'], { fill: string; opacity: number }> = {
  cobalt: { fill: '#0B4A8F', opacity: 0.9 },
  navy: { fill: '#08356A', opacity: 0.75 },
  sky: { fill: '#3A82C8', opacity: 0.35 },
  crimson: { fill: '#D7262E', opacity: 0.22 },
};

export function IrisBurst({ className }: { className?: string }) {
  const reduce = useReducedMotion();

  // pointer → pupil offset
  const mx = useMotionValue(0);
  const my = useMotionValue(0);
  const sx = useSpring(mx, { stiffness: 60, damping: 14 });
  const sy = useSpring(my, { stiffness: 60, damping: 14 });
  const irisX = useTransform(sx, (v) => v * 26);
  const irisY = useTransform(sy, (v) => v * 26);
  const pupilX = useTransform(sx, (v) => v * 40);
  const pupilY = useTransform(sy, (v) => v * 40);
  const glintX = useTransform(sx, (v) => v * -10);
  const glintY = useTransform(sy, (v) => v * -10);

  useEffect(() => {
    if (reduce) return;
    const onMove = (e: PointerEvent) => {
      mx.set((e.clientX / window.innerWidth - 0.5) * 2);
      my.set((e.clientY / window.innerHeight - 0.5) * 2);
    };
    window.addEventListener('pointermove', onMove, { passive: true });
    return () => window.removeEventListener('pointermove', onMove);
  }, [mx, my, reduce]);

  return (
    <svg viewBox={`0 0 ${SIZE} ${SIZE}`} className={className} role="img" aria-label="Revora radial iris motif">
      <defs>
        <radialGradient id="iris-g" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="#94B6E5" />
          <stop offset="38%" stopColor="#3A82C8" />
          <stop offset="70%" stopColor="#0B4A8F" />
          <stop offset="100%" stopColor="#08356A" />
        </radialGradient>
        <radialGradient id="halo-g" cx="50%" cy="50%" r="50%">
          <stop offset="72%" stopColor="#F6F9FC" stopOpacity="0" />
          <stop offset="100%" stopColor="#F6F9FC" stopOpacity="0.9" />
        </radialGradient>
        <filter id="soft" x="-20%" y="-20%" width="140%" height="140%">
          <feGaussianBlur stdDeviation="14" />
        </filter>
      </defs>

      {/* rotating rings of dots */}
      {RINGS.map((ring, k) => (
        <motion.g
          key={k}
          style={{ originX: '50%', originY: '50%', transformBox: 'view-box' }}
          initial={reduce ? false : { opacity: 0, scale: 0.85, rotate: ring.dir * -20 }}
          animate={
            reduce
              ? undefined
              : { opacity: 1, scale: 1, rotate: [ring.dir * -20 + 0, ring.dir * 340] }
          }
          transition={{
            opacity: { duration: 1.2, delay: 0.5 + k * 0.09 },
            scale: { duration: 1.6, delay: 0.5 + k * 0.09, ease: [0.16, 1, 0.3, 1] },
            rotate: { duration: ring.dur, ease: 'linear', repeat: Infinity },
          }}
        >
          {ring.dots.map((d, i) => (
            <circle
              key={i}
              cx={d.cx}
              cy={d.cy}
              r={d.r}
              fill={TONE[ring.tone].fill}
              opacity={TONE[ring.tone].opacity}
            />
          ))}
        </motion.g>
      ))}

      {/* fade outer rings into the canvas */}
      <circle cx={C} cy={C} r={C} fill="url(#halo-g)" pointerEvents="none" />

      {/* soft glow behind iris */}
      <circle cx={C} cy={C} r={110} fill="#3A82C8" opacity={0.35} filter="url(#soft)" />

      {/* iris + pupil follow the cursor */}
      <motion.g
        style={{ x: irisX, y: irisY }}
        initial={reduce ? false : { scale: 0, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 1.2, delay: 0.3, ease: [0.34, 1.56, 0.64, 1] }}
      >
        <g style={{ transformOrigin: `${C}px ${C}px` }}>
          <circle cx={C} cy={C} r={104} fill="url(#iris-g)" />
          {/* iris fibres */}
          {FIBRES.map((f, i) => (
            <line
              key={i}
              x1={f.x1}
              y1={f.y1}
              x2={f.x2}
              y2={f.y2}
              stroke="#E8F1F9"
              strokeOpacity={f.strong ? 0.28 : 0.12}
              strokeWidth={1.2}
            />
          ))}
          <circle cx={C} cy={C} r={104} fill="none" stroke="#08356A" strokeWidth={5} />
        </g>
        <motion.circle cx={C} cy={C} r={40} fill="#1E242B" style={{ x: pupilX, y: pupilY }} />
        <motion.g style={{ x: glintX, y: glintY }}>
          <ellipse cx={C - 30} cy={C - 34} rx={18} ry={12} fill="#fff" opacity={0.9} transform={`rotate(-30 ${C - 30} ${C - 34})`} />
          <circle cx={C + 26} cy={C + 22} r={5} fill="#fff" opacity={0.6} />
        </motion.g>
      </motion.g>
    </svg>
  );
}
