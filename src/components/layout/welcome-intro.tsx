'use client';

import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { RevoraLogo } from '@/components/ui/revora-logo';

/**
 * WelcomeIntro — Premium pharmaceutical brand welcome animation.
 *
 * Rules:
 * - White background, Plus Jakarta Sans (font-heading) headline, Inter body.
 * - Plays ONCE per browser session (sessionStorage guard).
 * - Respects prefers-reduced-motion: skips immediately if set.
 * - No typewriter, bounce, glow, particles, dramatic zoom, or layout shifts.
 * - Total visible duration: ~1.4 s. Fade-out: 0.5 s.
 */
export function WelcomeIntro() {
  const [show, setShow] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);

    // Respect prefers-reduced-motion
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      return;
    }

    // Only show once per browser session
    if (sessionStorage.getItem('revora-intro-seen')) {
      return;
    }

    setShow(true);

    // Auto-dismiss after 1.8 s (gives the staggered text time to fully appear)
    const dismissTimer = setTimeout(() => {
      sessionStorage.setItem('revora-intro-seen', '1');
      setShow(false);
    }, 1800);

    return () => clearTimeout(dismissTimer);
  }, []);

  // During SSR or before hydration — render nothing so the page is never blocked
  if (!mounted) return null;

  return (
    <AnimatePresence>
      {show && (
        <motion.div
          key="welcome-intro"
          className="fixed inset-0 z-[9999] flex flex-col items-center justify-center bg-white"
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.5, ease: [0.45, 0, 0.55, 1] }}
          // Block pointer events while visible so the page underneath isn't accidentally clicked
          style={{ pointerEvents: 'all' }}
        >
          {/* ── Logo: fade in + 8 px upward movement ── */}
          <motion.div
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.55, ease: [0.16, 1, 0.3, 1], delay: 0.1 }}
          >
            <RevoraLogo
              variant="color"
              className="h-11 tablet:h-14 w-auto object-contain"
              priority
            />
          </motion.div>

          {/* ── "Welcome to Revora" headline ── */}
          <motion.p
            className="mt-6 font-heading font-semibold text-[1.5rem] tablet:text-[1.875rem] leading-tight tracking-tight text-[#0B4A8E]"
            initial={{ opacity: 0, y: 6 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1], delay: 0.38 }}
          >
            Welcome to Revora
          </motion.p>

          {/* ── "Healthcare. Beyond the Cure." sub-line ── */}
          <motion.p
            className="mt-2 font-sans font-normal text-sm tablet:text-base tracking-wide"
            style={{ color: 'rgba(30, 36, 43, 0.55)' }}
            initial={{ opacity: 0, y: 4 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1], delay: 0.58 }}
          >
            Healthcare.{' '}
            <span style={{ color: '#D7263D' }}>Beyond the Cure.</span>
          </motion.p>

          {/* ── Subtle cobalt → crimson accent line at bottom ── */}
          <motion.div
            className="absolute bottom-0 left-0 right-0 h-[2px]"
            style={{
              background: 'linear-gradient(90deg, #0B4A8E 0%, #D7263D 100%)',
              transformOrigin: 'left center',
            }}
            initial={{ scaleX: 0 }}
            animate={{ scaleX: 1 }}
            transition={{ duration: 1.3, ease: [0.16, 1, 0.3, 1], delay: 0.15 }}
          />
        </motion.div>
      )}
    </AnimatePresence>
  );
}
