'use client';

/*
 * Original brand illustrations (vector, animated) for the company pages.
 * All built from the Revora palette and the dotted-iris motif shared by every product logo.
 */
import { motion, useReducedMotion } from 'framer-motion';
import { expoOut } from '@/lib/easings';
import { C, Frame, ring } from './illustration-kit';

/* ── About: an eye-drop bottle releasing a drop into the iris ── */
export function EyeDropScene() {
  const reduce = useReducedMotion();
  const outer = ring(40, 138, 260, 330);
  const inner = ring(26, 102, 260, 330);
  return (
    <Frame label="Illustration of an eye-drop bottle releasing a drop above a dotted iris">
      <svg viewBox="0 0 520 520" className="absolute inset-0 h-full w-full" aria-hidden>
        <defs>
          <radialGradient id="ed-bg" cx="50%" cy="58%" r="60%">
            <stop offset="0%" stopColor="#FFFFFF" />
            <stop offset="100%" stopColor={C.sky} />
          </radialGradient>
          <linearGradient id="ed-bottle" x1="0" y1="0" x2="1" y2="0">
            <stop offset="0%" stopColor="#FFFFFF" />
            <stop offset="55%" stopColor="#F3F7FC" />
            <stop offset="100%" stopColor="#DCE8F5" />
          </linearGradient>
          <linearGradient id="ed-drop" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor={C.light} />
            <stop offset="100%" stopColor={C.cobalt} />
          </linearGradient>
        </defs>
        <rect width="520" height="520" fill="url(#ed-bg)" />

        {/* dotted iris */}
        {[...outer, ...inner].map((p, i) => (
          <motion.circle
            key={i}
            cx={p.x}
            cy={p.y}
            r={i < outer.length ? 4 : 3.2}
            fill={i < outer.length ? (i % 8 === 0 ? C.crimson : C.cobalt) : C.pale}
            initial={reduce ? false : { scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            style={{ transformOrigin: `${p.x}px ${p.y}px` }}
            transition={{ duration: 0.5, delay: 0.3 + i * 0.012, ease: expoOut }}
          />
        ))}
        <circle cx="260" cy="330" r="58" fill={C.cobalt} />
        <circle cx="260" cy="330" r="24" fill={C.deep} />
        <circle cx="245" cy="315" r="8" fill="#FFFFFF" opacity="0.85" />

        {/* ripple where the drop lands */}
        {!reduce && (
          <motion.circle
            cx="260"
            cy="330"
            fill="none"
            stroke={C.light}
            strokeWidth="2"
            initial={{ r: 58, opacity: 0 }}
            animate={{ r: [58, 112], opacity: [0.7, 0] }}
            transition={{ duration: 1.4, delay: 1.95, repeat: Infinity, repeatDelay: 1.2, ease: 'easeOut' }}
          />
        )}

        {/* falling drop */}
        <motion.path
          d="M260 0 C 260 0, 246 20, 246 30 a14 14 0 0 0 28 0 C 274 20, 260 0, 260 0 Z"
          fill="url(#ed-drop)"
          initial={reduce ? { y: 166, opacity: 1 } : { y: 150, opacity: 0 }}
          animate={reduce ? undefined : { y: [150, 150, 262], opacity: [0, 1, 0] }}
          transition={{ duration: 1.3, delay: 1.3, times: [0, 0.25, 1], repeat: Infinity, repeatDelay: 1.3, ease: 'easeIn' }}
        />

        {/* dropper bottle, tilted */}
        <motion.g
          initial={reduce ? false : { y: -40, opacity: 0, rotate: 8 }}
          animate={{ y: 0, opacity: 1, rotate: 0 }}
          style={{ transformOrigin: '260px 80px' }}
          transition={{ duration: 1.1, delay: 0.2, ease: expoOut }}
        >
          <g transform="translate(0 8) scale(0.92) translate(22 0)">
            <rect x="214" y="-6" width="92" height="104" rx="18" fill="url(#ed-bottle)" stroke="#D3E0EE" strokeWidth="2" />
            <rect x="214" y="30" width="92" height="38" fill={C.cobalt} />
            <rect x="226" y="42" width="46" height="5" rx="2.5" fill="#FFFFFF" opacity="0.9" />
            <rect x="226" y="52" width="30" height="4" rx="2" fill={C.pale} />
            <path d="M286 36 l6 8 l12 -16" fill="none" stroke={C.crimson} strokeWidth="5" strokeLinecap="round" strokeLinejoin="round" />
            <rect x="238" y="98" width="44" height="20" rx="6" fill="#FFFFFF" stroke="#D3E0EE" strokeWidth="2" />
            <path d="M246 118 L274 118 L266 146 Q260 156 254 146 Z" fill="#FFFFFF" stroke="#D3E0EE" strokeWidth="2" />
          </g>
        </motion.g>
      </svg>
    </Frame>
  );
}

/* ── Philosophy: the iris with the Revora tick drawn at its heart ── */
export function IrisPromise() {
  const reduce = useReducedMotion();
  const rings = [ring(44, 190, 260, 260), ring(34, 152, 260, 260), ring(26, 116, 260, 260)];
  return (
    <Frame tone="dark" label="Illustration of a dotted iris with the Revora tick at its centre">
      <svg viewBox="0 0 520 520" className="absolute inset-0 h-full w-full" aria-hidden>
        <defs>
          <radialGradient id="ip-glow" cx="50%" cy="50%" r="55%">
            <stop offset="0%" stopColor={C.light} stopOpacity="0.55" />
            <stop offset="100%" stopColor={C.deep} stopOpacity="0" />
          </radialGradient>
        </defs>
        <rect width="520" height="520" fill="url(#ip-glow)" />
        {rings.map((r, ri) => (
          <motion.g
            key={ri}
            animate={reduce ? undefined : { rotate: ri % 2 ? -360 : 360 }}
            transition={{ duration: 80 + ri * 30, repeat: Infinity, ease: 'linear' }}
            style={{ transformOrigin: '260px 260px' }}
          >
            {r.map((p, i) => (
              <motion.circle
                key={i}
                cx={p.x}
                cy={p.y}
                r={ri === 0 ? 4 : ri === 1 ? 3.6 : 3.2}
                fill={ri === 0 ? (i % 11 === 0 ? C.crimson : C.pale) : ri === 1 ? C.light : '#FFFFFF'}
                opacity={ri === 2 ? 0.8 : 1}
                initial={reduce ? false : { scale: 0, opacity: 0 }}
                whileInView={{ scale: 1, opacity: ri === 2 ? 0.8 : 1 }}
                viewport={{ once: true }}
                style={{ transformOrigin: `${p.x}px ${p.y}px` }}
                transition={{ duration: 0.45, delay: 0.2 + ri * 0.25 + i * 0.01, ease: expoOut }}
              />
            ))}
          </motion.g>
        ))}
        <circle cx="260" cy="260" r="74" fill={C.cobalt} />
        <circle cx="260" cy="260" r="74" fill="none" stroke="#FFFFFF" strokeOpacity="0.15" strokeWidth="10" />
        <motion.path
          d="M224 262 L250 286 L300 230"
          fill="none"
          stroke="#FFFFFF"
          strokeWidth="14"
          strokeLinecap="round"
          strokeLinejoin="round"
          initial={reduce ? false : { pathLength: 0 }}
          whileInView={{ pathLength: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.9, delay: 1.3, ease: expoOut }}
        />
      </svg>
      <figcaption className="absolute inset-x-6 bottom-6 text-center font-heading text-[15px] font-bold tracking-[0.18em] text-white/70 uppercase">
        Healthcare — Beyond the Cure
      </figcaption>
    </Frame>
  );
}

/* ── Certifications: a quality seal with a slowly turning dotted rim ── */
export function QualitySeal() {
  const reduce = useReducedMotion();
  const rim = ring(48, 176, 260, 250);
  const scallops = ring(24, 150, 260, 250);
  return (
    <Frame label="Illustration of a quality seal with a shield and tick">
      <svg viewBox="0 0 520 520" className="absolute inset-0 h-full w-full" aria-hidden>
        <defs>
          <radialGradient id="qs-bg" cx="50%" cy="45%" r="65%">
            <stop offset="0%" stopColor="#FFFFFF" />
            <stop offset="100%" stopColor={C.sky} />
          </radialGradient>
          <linearGradient id="qs-face" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor={C.light} />
            <stop offset="100%" stopColor={C.deep} />
          </linearGradient>
        </defs>
        <rect width="520" height="520" fill="url(#qs-bg)" />

        {/* ribbons */}
        <motion.g initial={reduce ? false : { y: -30, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ duration: 0.9, delay: 0.6, ease: expoOut }}>
          <path d="M200 360 L170 470 L205 452 L228 482 L250 380 Z" fill={C.crimson} />
          <path d="M320 360 L350 470 L315 452 L292 482 L270 380 Z" fill="#B51E25" />
        </motion.g>

        {/* turning dotted rim */}
        <motion.g animate={reduce ? undefined : { rotate: 360 }} transition={{ duration: 60, repeat: Infinity, ease: 'linear' }} style={{ transformOrigin: '260px 250px' }}>
          {rim.map((p, i) => (
            <circle key={i} cx={p.x} cy={p.y} r={i % 6 === 0 ? 5 : 3.5} fill={i % 6 === 0 ? C.crimson : C.pale} />
          ))}
        </motion.g>

        {/* scalloped seal */}
        <motion.g initial={reduce ? false : { scale: 0.6, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} style={{ transformOrigin: '260px 250px' }} transition={{ duration: 0.9, delay: 0.2, ease: [0.34, 1.56, 0.64, 1] }}>
          {scallops.map((p, i) => (
            <circle key={i} cx={p.x} cy={p.y} r="22" fill={C.cobalt} />
          ))}
          <circle cx="260" cy="250" r="150" fill="url(#qs-face)" />
          <circle cx="260" cy="250" r="128" fill="none" stroke="#FFFFFF" strokeOpacity="0.35" strokeWidth="2" strokeDasharray="3 7" />
          {/* shield */}
          <path d="M260 162 L328 188 L328 244 C328 292 298 322 260 338 C222 322 192 292 192 244 L192 188 Z" fill="#FFFFFF" />
          <motion.path
            d="M228 250 L252 274 L296 222"
            fill="none"
            stroke={C.cobalt}
            strokeWidth="14"
            strokeLinecap="round"
            strokeLinejoin="round"
            initial={reduce ? false : { pathLength: 0 }}
            animate={{ pathLength: 1 }}
            transition={{ duration: 0.8, delay: 1.1, ease: expoOut }}
          />
        </motion.g>
      </svg>
    </Frame>
  );
}

/* ── Certifications: a stylised eye-drop plant with bottles moving down the line ── */
export function PlantLine() {
  const reduce = useReducedMotion();
  const bottles = [-1, 0, 1, 2, 3, 4, 5];
  return (
    <Frame tone="dark" label="Illustration of an eye-drop manufacturing line">
      <svg viewBox="0 0 520 520" className="absolute inset-0 h-full w-full" aria-hidden>
        <defs>
          <linearGradient id="pl-sky" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor={C.mid} stopOpacity="0.6" />
            <stop offset="100%" stopColor={C.deep} stopOpacity="0" />
          </linearGradient>
        </defs>
        <rect width="520" height="520" fill="url(#pl-sky)" />

        {/* building */}
        <motion.g initial={reduce ? false : { y: 30, opacity: 0 }} whileInView={{ y: 0, opacity: 1 }} viewport={{ once: true }} transition={{ duration: 1, ease: expoOut }}>
          <path d="M70 330 L70 190 L170 140 L170 190 L270 140 L270 190 L370 140 L370 190 L450 190 L450 330 Z" fill={C.cobalt} />
          <rect x="390" y="110" width="34" height="80" rx="4" fill={C.mid} />
          {[100, 160, 220, 280, 340, 400].map((x) => (
            <rect key={x} x={x} y="230" width="34" height="44" rx="6" fill={C.light} opacity="0.55" />
          ))}
          {/* drop emblem */}
          <path d="M260 196 C 260 196, 246 214, 246 223 a14 14 0 0 0 28 0 C 274 214, 260 196, 260 196 Z" fill="#FFFFFF" />
        </motion.g>

        {/* conveyor */}
        <rect x="40" y="392" width="440" height="12" rx="6" fill={C.mid} />
        {[70, 150, 230, 310, 390, 450].map((x) => (
          <circle key={x} cx={x} cy="398" r="9" fill={C.deep} stroke={C.light} strokeWidth="2" />
        ))}

        {/* bottles riding the conveyor */}
        <g clipPath="url(#pl-clip)">
          <clipPath id="pl-clip">
            <rect x="40" y="300" width="440" height="100" />
          </clipPath>
          {bottles.map((i) => (
            <motion.g
              key={i}
              initial={{ x: i * 84 }}
              animate={reduce ? undefined : { x: [i * 84, i * 84 + 84] }}
              transition={{ duration: 2.4, repeat: Infinity, ease: 'linear' }}
            >
              <rect x="20" y="342" width="34" height="50" rx="8" fill="#FFFFFF" />
              <rect x="20" y="358" width="34" height="16" fill={C.cobalt} />
              <rect x="28" y="330" width="18" height="14" rx="3" fill="#FFFFFF" />
              <path d="M31 330 L43 330 L39 318 Q37 314 35 318 Z" fill="#FFFFFF" />
            </motion.g>
          ))}
        </g>

        {/* quality badge */}
        <motion.g initial={reduce ? false : { scale: 0 }} whileInView={{ scale: 1 }} viewport={{ once: true }} style={{ transformOrigin: '420px 110px' }} transition={{ duration: 0.7, delay: 0.6, ease: [0.34, 1.56, 0.64, 1] }}>
          <circle cx="420" cy="110" r="38" fill={C.crimson} />
          <path d="M404 110 L415 121 L437 98" fill="none" stroke="#FFFFFF" strokeWidth="7" strokeLinecap="round" strokeLinejoin="round" />
        </motion.g>
      </svg>
    </Frame>
  );
}
