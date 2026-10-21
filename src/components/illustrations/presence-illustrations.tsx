'use client';

/* Animated illustrations for the Our Presence pages (same palette and frame as illustrations.tsx). */
import { motion, useReducedMotion } from 'framer-motion';
import { expoOut } from '@/lib/easings';
import { C, Frame, ring } from './illustration-kit';

/* ── Ahmedabad HQ: an office tower whose windows light up, with a pin dropping onto it ── */
export function HQOffice() {
  const reduce = useReducedMotion();
  const cols = [0, 1, 2, 3];
  const rows = [0, 1, 2, 3, 4, 5];
  return (
    <Frame label="Illustration of the Revora office building in Ahmedabad">
      <svg viewBox="0 0 520 520" className="absolute inset-0 h-full w-full" aria-hidden>
        <defs>
          <linearGradient id="hq-sky" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor={C.sky} />
            <stop offset="100%" stopColor="#FFFFFF" />
          </linearGradient>
          <linearGradient id="hq-tower" x1="0" y1="0" x2="1" y2="0">
            <stop offset="0%" stopColor={C.cobalt} />
            <stop offset="100%" stopColor={C.deep} />
          </linearGradient>
        </defs>
        <rect width="520" height="520" fill="url(#hq-sky)" />

        {/* sun and a drifting cloud */}
        <circle cx="410" cy="110" r="34" fill={C.pale} opacity="0.5" />
        <motion.g animate={reduce ? undefined : { x: [0, 30, 0] }} transition={{ duration: 14, repeat: Infinity, ease: 'easeInOut' }}>
          <rect x="60" y="92" width="110" height="26" rx="13" fill="#FFFFFF" />
          <rect x="88" y="76" width="60" height="30" rx="15" fill="#FFFFFF" />
        </motion.g>

        {/* neighbouring blocks */}
        <rect x="58" y="300" width="96" height="140" rx="6" fill={C.pale} opacity="0.55" />
        <rect x="368" y="270" width="104" height="170" rx="6" fill={C.pale} opacity="0.55" />

        {/* the office tower rises, then its windows light up floor by floor */}
        <motion.g initial={reduce ? false : { y: 60, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ duration: 1.1, ease: expoOut }}>
          <rect x="176" y="150" width="172" height="290" rx="10" fill="url(#hq-tower)" />
          <rect x="176" y="150" width="172" height="20" rx="10" fill={C.mid} />
          {rows.map((r) =>
            cols.map((c) => (
              <motion.rect
                key={`${r}-${c}`}
                x={196 + c * 36}
                y={188 + r * 38}
                width="24"
                height="24"
                rx="4"
                fill="#FFFFFF"
                initial={reduce ? false : { opacity: 0.12 }}
                animate={reduce ? { opacity: 0.7 } : { opacity: [0.12, 0.85, 0.5] }}
                transition={{ duration: 1.6, delay: 0.8 + ((5 - r) * 4 + c) * 0.06, ease: 'easeOut' }}
              />
            ))
          )}
          <rect x="236" y="404" width="52" height="36" rx="4" fill={C.sky} />
          {/* rooftop sign with the Revora tick */}
          <rect x="214" y="124" width="96" height="24" rx="12" fill="#FFFFFF" />
          <path d="M228 136 l5 6 l11 -12" fill="none" stroke={C.crimson} strokeWidth="4" strokeLinecap="round" strokeLinejoin="round" />
          <rect x="250" y="132" width="46" height="8" rx="4" fill={C.cobalt} />
        </motion.g>

        {/* ground and the highway with passing traffic */}
        <rect x="30" y="440" width="460" height="8" rx="4" fill={C.cobalt} opacity="0.2" />
        <rect x="30" y="462" width="460" height="18" rx="9" fill={C.slate} opacity="0.12" />
        {!reduce && (
          <motion.rect y="468" width="34" height="6" rx="3" fill={C.light} initial={{ x: 30 }} animate={{ x: [30, 456] }} transition={{ duration: 5, repeat: Infinity, ease: 'linear' }} />
        )}

        {/* map pin drops onto the roof */}
        <motion.g initial={reduce ? false : { y: -120, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ duration: 0.9, delay: 1.6, ease: [0.34, 1.56, 0.64, 1] }}>
          <path d="M262 30 C 238 30, 222 48, 222 70 C 222 96, 262 120, 262 120 C 262 120, 302 96, 302 70 C 302 48, 286 30, 262 30 Z" fill={C.crimson} />
          <circle cx="262" cy="70" r="14" fill="#FFFFFF" />
        </motion.g>
      </svg>
      <figcaption className="absolute bottom-5 left-5 rounded-2xl border border-revora-cobalt/10 bg-white/90 px-4 py-2.5 font-sans text-[13px] text-revora-slate backdrop-blur">
        <b className="font-semibold">S.G. Business Hub</b> · Ahmedabad
      </figcaption>
    </Frame>
  );
}

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
