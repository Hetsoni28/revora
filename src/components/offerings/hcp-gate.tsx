'use client';

import { useEffect, useId, useRef, useState, useSyncExternalStore } from 'react';
import { useRouter } from 'next/navigation';
import { AnimatePresence, motion } from 'framer-motion';
import { useLenis } from 'lenis/react';
import { Stethoscope } from 'lucide-react';
import { expoOut } from '@/lib/easings';
import { useFocusTrap } from '@/lib/a11y';

/** Remembered on this device once confirmed, so the question is asked once (see Cookie Policy). */
export const HCP_KEY = 'revora-hcp-confirmed';

function confirmed() {
  try {
    return window.localStorage.getItem(HCP_KEY) === '1';
  } catch {
    return false;
  }
}
const subscribe = (onChange: () => void) => {
  window.addEventListener('storage', onChange);
  return () => window.removeEventListener('storage', onChange);
};

/**
 * Prescription (Schedule H) product details are for healthcare professionals: ask once before showing
 * them. "Go back" returns to the previous page (or the homepage when there isn't one).
 */
export function HcpGate() {
  // read the stored answer after hydration (the server never renders the dialog)
  const alreadyConfirmed = useSyncExternalStore(subscribe, confirmed, () => true);
  const [accepted, setAccepted] = useState(false);
  const open = !alreadyConfirmed && !accepted;
  const router = useRouter();
  const lenis = useLenis();
  const ref = useRef<HTMLDivElement>(null);
  const uid = useId();

  useEffect(() => {
    if (!open) return;
    lenis?.stop();
    return () => {
      lenis?.start();
    };
  }, [open, lenis]);
  useFocusTrap(ref, open);

  const accept = () => {
    try {
      window.localStorage.setItem(HCP_KEY, '1');
    } catch {}
    setAccepted(true);
  };
  const leave = () => {
    if (window.history.length > 1) router.back();
    else router.push('/');
  };

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          className="fixed inset-0 z-160 flex items-end justify-center bg-revora-slate/70 p-3 backdrop-blur-md tablet:items-center tablet:p-8"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3 }}
        >
          <motion.div
            ref={ref}
            role="dialog"
            aria-modal="true"
            aria-labelledby={`${uid}-title`}
            aria-describedby={`${uid}-text`}
            initial={{ y: 30, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: 20, opacity: 0 }}
            transition={{ duration: 0.45, ease: expoOut }}
            className="w-full max-w-lg rounded-[28px] bg-white p-7 shadow-[0_40px_80px_-30px_rgba(11,74,143,0.6)] tablet:p-9"
          >
            <span className="grid h-12 w-12 place-items-center rounded-2xl bg-revora-sky text-revora-cobalt">
              <Stethoscope className="h-5 w-5" />
            </span>
            <p id={`${uid}-title`} className="mt-5 font-heading text-[1.4rem] font-extrabold text-revora-slate">
              For healthcare professionals
            </p>
            <p id={`${uid}-text`} className="mt-2 font-sans text-[15.5px] leading-[1.7] text-revora-slate-light">
              This section is intended for registered medical practitioners and healthcare professionals only.
            </p>
            <div className="mt-7 flex flex-col gap-3 sm:flex-row">
              <button
                type="button"
                onClick={accept}
                className="inline-flex min-h-12 flex-1 items-center justify-center rounded-full bg-revora-cobalt px-6 font-sans text-[15px] font-semibold text-white transition-colors hover:bg-revora-cobalt-dark"
              >
                I am a healthcare professional
              </button>
              <button
                type="button"
                onClick={leave}
                className="inline-flex min-h-12 items-center justify-center rounded-full border border-revora-cobalt/25 px-6 font-sans text-[15px] font-semibold text-revora-cobalt transition-colors hover:bg-revora-sky"
              >
                Go back
              </button>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
