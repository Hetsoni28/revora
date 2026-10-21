'use client';

/* Animated illustrations for the Our Presence pages (same palette and frame as illustrations.tsx). */
import { motion, useReducedMotion } from 'framer-motion';
import { expoOut } from '@/lib/easings';
import { C, Frame, ring } from './illustration-kit';

/* ── Domestic network: a hub with pulses travelling out to the people we serve ── */
const NODES = [
  { x: 110, y: 120, label: 'Doctors' },
  { x: 410, y: 120, label: 'Hospitals' },
  { x: 110, y: 380, label: 'Pharmacies' },
  { x: 410, y: 380, label: 'Distributors' },
];

export function NetworkHub() {
  const reduce = useReducedMotion();
  const ringDots = ring(36, 220, 260, 260);
  return (
    <Frame tone="dark" label="Illustration of the Revora network connecting doctors, hospitals, pharmacies and distributors">
      <svg viewBox="0 0 520 520" className="absolute inset-0 h-full w-full" aria-hidden>
        <defs>
          <radialGradient id="nh-glow" cx="50%" cy="50%" r="55%">
            <stop offset="0%" stopColor={C.light} stopOpacity="0.45" />
            <stop offset="100%" stopColor={C.deep} stopOpacity="0" />
          </radialGradient>
        </defs>
        <rect width="520" height="520" fill="url(#nh-glow)" />
        <motion.g animate={reduce ? undefined : { rotate: 360 }} transition={{ duration: 90, repeat: Infinity, ease: 'linear' }} style={{ transformOrigin: '260px 260px' }}>
          {ringDots.map((p, i) => (
            <circle key={i} cx={p.x} cy={p.y} r="2.6" fill={i % 9 === 0 ? C.crimson : C.pale} opacity="0.7" />
          ))}
        </motion.g>

        {NODES.map((n, i) => {
          const path = `M260 260 L${n.x} ${n.y}`;
          return (
            <g key={n.label}>
              <path d={path} stroke="rgba(148,182,229,0.25)" strokeWidth="2" strokeDasharray="4 6" />
              <motion.path
                d={path}
                stroke={C.pale}
                strokeWidth="2.5"
                strokeLinecap="round"
                initial={reduce ? false : { pathLength: 0 }}
                animate={{ pathLength: 1 }}
                transition={{ duration: 0.9, delay: 0.5 + i * 0.15, ease: expoOut }}
              />
              {!reduce && (
                <circle r="5" fill="#FFFFFF">
                  <animateMotion dur="2.4s" begin={`${1.4 + i * 0.6}s`} repeatCount="indefinite" path={path} />
                </circle>
              )}
              <motion.g
                initial={reduce ? false : { scale: 0, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                style={{ transformOrigin: `${n.x}px ${n.y}px` }}
                transition={{ duration: 0.7, delay: 0.9 + i * 0.15, ease: [0.34, 1.56, 0.64, 1] }}
              >
                <circle cx={n.x} cy={n.y} r="34" fill={C.cobalt} stroke="rgba(255,255,255,0.25)" strokeWidth="2" />
                <circle cx={n.x} cy={n.y} r="10" fill={i % 2 ? C.pale : '#FFFFFF'} />
                <text x={n.x} y={n.y + 58} textAnchor="middle" fill="#FFFFFF" fontSize="17" fontWeight="700">
                  {n.label}
                </text>
              </motion.g>
            </g>
          );
        })}

        {/* hub with the Revora tick, pulsing outward */}
        {!reduce && (
          <motion.circle cx="260" cy="260" fill="none" stroke={C.pale} strokeWidth="2" initial={{ r: 56, opacity: 0.7 }} animate={{ r: 120, opacity: 0 }} transition={{ duration: 2.4, repeat: Infinity, ease: 'easeOut' }} />
        )}
        <motion.g initial={reduce ? false : { scale: 0.6, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} style={{ transformOrigin: '260px 260px' }} transition={{ duration: 0.8, ease: [0.34, 1.56, 0.64, 1] }}>
          <circle cx="260" cy="260" r="56" fill="#FFFFFF" />
          <path d="M236 262 L254 280 L288 240" fill="none" stroke={C.crimson} strokeWidth="11" strokeLinecap="round" strokeLinejoin="round" />
        </motion.g>
      </svg>
    </Frame>
  );
}
