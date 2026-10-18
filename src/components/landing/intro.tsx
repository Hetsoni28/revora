'use client';

import { useCallback, useEffect, useState, useSyncExternalStore } from 'react';
import Image from 'next/image';
import { AnimatePresence, motion, stagger, useAnimate } from 'framer-motion';
import { useLenis } from 'lenis/react';
import { bounceOut, expoOut } from '@/lib/easings';

export const INTRO_KEY = 'revora-intro-seen';

/** How long the intro holds before the curtain lifts (ms). */
const HOLD_MS = 3200;
/** Hero entrance delay on a first visit (s): starts as the curtain lifts. */
export const HERO_DELAY_AFTER_INTRO = HOLD_MS / 1000 + 0.25;

/** Has the intro already played in this browser session? */
export function introSeen(): boolean {
  if (typeof window === 'undefined') return false;
  try {
    return (
      window.sessionStorage.getItem(INTRO_KEY) === '1' ||
      window.matchMedia('(prefers-reduced-motion: reduce)').matches
    );
  } catch {
    return false;
  }
}

const noopSubscribe = () => () => {};

/* Iris ring — the same dotted motif as the hero eye. */
const DOTS = 28;
const RING = Array.from({ length: DOTS }, (_, i) => {
  const a = (i / DOTS) * Math.PI * 2 - Math.PI / 2;
  return {
    cx: Math.round((100 + 74 * Math.cos(a)) * 1000) / 1000,
    cy: Math.round((100 + 74 * Math.sin(a)) * 1000) / 1000,
    fill: i % 7 === 0 ? '#D7262E' : i % 2 === 0 ? '#0B4A8F' : '#94B6E5',
  };
});

const TAGLINE = 'Healthcare — Beyond the Cure';

/**
 * Welcome sequence (first visit per session), one timeline:
 *  0.00s  iris ring blooms dot by dot, slowly turning
 *  0.20s  cobalt pupil pops in
 *  0.60s  a white Revora tick draws itself inside the pupil — held as the beat
 *  1.50s  ring expands and dissolves, pupil folds away, wordmark wipes in
 *  1.90s  cobalt → crimson rule draws, tagline types in
 *  3.20s  two-layer curtain (white, then cobalt) lifts off the hero
 */
export function Intro() {
  // The server (and hydration) always renders the curtain; the client
  // snapshot then drops it straight away if it has already played.
  const seen = useSyncExternalStore(noopSubscribe, introSeen, () => false);
  const [done, setDone] = useState(false);
  const show = !seen && !done;
  const lenis = useLenis();
  const [scope, animate] = useAnimate();

  const finish = useCallback(() => {
    try {
      window.sessionStorage.setItem(INTRO_KEY, '1');
    } catch {
      /* storage unavailable — intro simply plays again next time */
    }
    setDone(true);
  }, []);

  useEffect(() => {
    if (seen) return;
    const t = window.setTimeout(finish, HOLD_MS);
    return () => window.clearTimeout(t);
  }, [seen, finish]);

  // Choreography — every step pinned to an absolute time on one timeline.
  useEffect(() => {
    if (!show || !scope.current) return;
    const spin = animate('.ri-ring', { rotate: [-30, 50] }, { duration: 2.4, ease: 'linear' });
    const seq = animate([
      ['.ri-dot', { scale: [0, 1], opacity: [0, 1] }, { duration: 0.5, delay: stagger(0.018), ease: bounceOut, at: 0 }],
      ['.ri-pupil', { scale: [0, 1] }, { duration: 0.55, ease: bounceOut, at: 0.2 }],
      ['.ri-tick', { pathLength: [0, 1] }, { duration: 0.45, ease: expoOut, at: 0.6 }],
      ['.ri-ring', { scale: 1.9, opacity: 0 }, { duration: 0.8, ease: expoOut, at: 1.5 }],
      ['.ri-pupil', { scale: 0.2, opacity: 0 }, { duration: 0.45, ease: expoOut, at: 1.5 }],
      ['.ri-logo', { clipPath: 'inset(0 0% 0 0)', y: 0 }, { duration: 0.9, ease: expoOut, at: 1.6 }],
      ['.ri-rule', { scaleX: 1 }, { duration: 0.8, ease: expoOut, at: 1.9 }],
      ['.ri-char', { opacity: 1, y: 0 }, { duration: 0.35, delay: stagger(0.014), ease: expoOut, at: 2.0 }],
      ['.ri-skip', { opacity: 1 }, { duration: 0.5, at: 0.8 }],
    ]);
    return () => {
      spin.stop();
      seq.stop();
    };
  }, [show, animate, scope]);

  // Hold the page still while the curtain is down.
  useEffect(() => {
    if (!show) return;
    lenis?.stop();
    return () => lenis?.start();
  }, [show, lenis]);

  return (
    <AnimatePresence>
      {show && (
        <motion.div
          key="intro-underlay"
          aria-hidden
          className="fixed inset-0 z-199 bg-revora-cobalt"
          initial={{ clipPath: 'inset(0 0 0% 0)' }}
          exit={{ clipPath: 'inset(0 0 100% 0)' }}
          transition={{ duration: 0.9, delay: 0.12, ease: expoOut }}
        />
      )}
      {show && (
        <motion.div
          key="intro"
          ref={scope}
          role="status"
          aria-label="Welcome to Revora Healthcare"
          className="fixed inset-0 z-200 grid place-items-center overflow-hidden bg-white"
          initial={{ clipPath: 'inset(0 0 0% 0)' }}
          exit={{ clipPath: 'inset(0 0 100% 0)' }}
          transition={{ duration: 0.85, ease: expoOut }}
        >
          {/* soft sky wash */}
          <div
            aria-hidden
            className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_50%_45%,#E8F1F9_0%,rgba(232,241,249,0)_55%)]"
          />

          <motion.div
            className="relative flex flex-col items-center"
            exit={{ y: -40, opacity: 0 }}
            transition={{ duration: 0.6, ease: expoOut }}
          >
            {/* stage: iris + pupil sit over the logo position */}
            <div className="relative grid h-40 w-75 place-items-center tablet:h-48 tablet:w-105">
              {/* iris ring */}
              <motion.svg
                viewBox="0 0 200 200"
                aria-hidden
                className="ri-ring absolute h-40 w-40 tablet:h-48 tablet:w-48"
                initial={{ rotate: -30, scale: 1, opacity: 1 }}
              >
                {RING.map((d, i) => (
                  <motion.circle
                    key={i}
                    className="ri-dot"
                    cx={d.cx}
                    cy={d.cy}
                    r={5.2}
                    fill={d.fill}
                    initial={{ scale: 0, opacity: 0 }}
                    style={{ transformBox: 'fill-box', transformOrigin: 'center' }}
                  />
                ))}
              </motion.svg>

              {/* pupil with a self-drawing tick */}
              <motion.div
                aria-hidden
                className="ri-pupil absolute grid h-20 w-20 place-items-center rounded-full bg-revora-cobalt shadow-[0_18px_40px_-12px_rgba(11,74,143,0.55)] tablet:h-24 tablet:w-24"
                initial={{ scale: 0, opacity: 1 }}
              >
                <svg viewBox="0 0 28 22" className="h-8 w-10 tablet:h-9 tablet:w-11">
                  <motion.path
                    className="ri-tick"
                    d="M3 11.5 L11 18.5 L25.5 3"
                    fill="none"
                    stroke="#fff"
                    strokeWidth={3.4}
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    initial={{ pathLength: 0 }}
                  />
                </svg>
              </motion.div>

              {/* wordmark wipes in as the iris dissolves; multiply drops the PNG's white */}
              <motion.div
                className="ri-logo mix-blend-multiply"
                initial={{ clipPath: 'inset(0 100% 0 0)', y: 10 }}
              >
                <Image src="/logo.png" alt="Revora" width={1024} height={341} loading="eager" className="h-14 w-auto tablet:h-20" />
              </motion.div>
            </div>

            {/* brand rule */}
            <motion.span
              className="ri-rule mt-2 block h-0.5 w-44 origin-left rounded-full bg-linear-to-r from-revora-cobalt to-revora-crimson"
              initial={{ scaleX: 0 }}
            />

            {/* tagline types in */}
            <p className="mt-4 font-sans text-[11px] font-semibold uppercase tracking-[0.3em] text-revora-slate-muted" aria-hidden>
              {TAGLINE.split('').map((ch, i) => (
                <motion.span key={i} className="ri-char inline-block" initial={{ opacity: 0, y: 6 }}>
                  {ch === ' ' ? ' ' : ch}
                </motion.span>
              ))}
            </p>
          </motion.div>

          {/* progress */}
          <motion.span
            aria-hidden
            className="absolute inset-x-0 bottom-0 h-0.5 origin-left bg-linear-to-r from-revora-cobalt to-revora-crimson"
            initial={{ scaleX: 0 }}
            animate={{ scaleX: 1 }}
            transition={{ duration: HOLD_MS / 1000, ease: 'linear' }}
          />

          <motion.button
            type="button"
            onClick={finish}
            className="ri-skip absolute bottom-6 right-6 rounded-full px-4 py-2 font-sans text-[12px] font-semibold uppercase tracking-[0.18em] text-revora-slate-muted transition-colors hover:bg-revora-sky hover:text-revora-cobalt"
            initial={{ opacity: 0 }}
          >
            Skip
          </motion.button>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
