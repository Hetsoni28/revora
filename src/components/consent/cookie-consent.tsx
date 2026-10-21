'use client';

import { useEffect, useId, useRef, useState } from 'react';
import Link from 'next/link';
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion';
import { Cookie, X } from 'lucide-react';
import { toast } from 'sonner';
import { expoOut } from '@/lib/easings';
import { CATEGORIES, acceptAll, onOpenCookieSettings, rejectAll, saveConsent, useConsent, type ConsentCategory } from '@/lib/consent';

/**
 * Cookie banner: appears until the visitor decides, then stays out of the way.
 * The footer's "Cookie settings" link reopens it straight into the per-category switches.
 */
export function CookieConsent() {
  const consent = useConsent();
  const reduce = useReducedMotion();
  const uid = useId();
  const panelRef = useRef<HTMLDivElement>(null);
  const [reopened, setReopened] = useState(false);
  const [custom, setCustom] = useState(false);
  const [draft, setDraft] = useState({ analytics: false, marketing: false });

  // footer link → open with the saved choices pre-filled
  useEffect(
    () =>
      onOpenCookieSettings(() => {
        setDraft({ analytics: !!consent?.analytics, marketing: !!consent?.marketing });
        setCustom(true);
        setReopened(true);
      }),
    [consent]
  );

  // when opened on request, move focus in and let Escape close it without changes
  useEffect(() => {
    if (!reopened) return;
    const opener = document.activeElement as HTMLElement | null;
    requestAnimationFrame(() => panelRef.current?.querySelector<HTMLElement>('[role="switch"]:not([disabled])')?.focus());
    const onKey = (e: KeyboardEvent) => e.key === 'Escape' && setReopened(false);
    window.addEventListener('keydown', onKey);
    return () => {
      window.removeEventListener('keydown', onKey);
      opener?.focus?.();
    };
  }, [reopened]);

  // nothing is known on the server; once decided, only show again when asked
  const visible = consent !== undefined && (consent === null || reopened);

  const done = (message: string) => {
    setReopened(false);
    setCustom(false);
    toast.success(message, { id: 'consent', duration: 2500 });
  };
  const onAccept = () => {
    acceptAll();
    done('All cookies allowed');
  };
  const onDecline = () => {
    rejectAll();
    done('Only necessary cookies will be used');
  };
  const onSave = () => {
    saveConsent(draft);
    done('Cookie choices saved');
  };
  const toggle = (id: ConsentCategory) => id !== 'necessary' && setDraft((d) => ({ ...d, [id]: !d[id as 'analytics' | 'marketing'] }));

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          ref={panelRef}
          role="dialog"
          aria-modal="false"
          aria-labelledby={`${uid}-title`}
          aria-describedby={`${uid}-text`}
          initial={reduce ? { opacity: 0 } : { opacity: 0, y: 32 }}
          animate={{ opacity: 1, y: 0 }}
          exit={reduce ? { opacity: 0 } : { opacity: 0, y: 24 }}
          transition={{ duration: 0.5, ease: expoOut }}
          className="fixed inset-x-3 bottom-3 z-95 max-h-[calc(100dvh-1.5rem)] overflow-y-auto rounded-3xl border border-revora-cobalt/10 bg-white p-5 shadow-[0_30px_70px_-25px_rgba(11,74,143,0.5)] tablet:inset-x-auto tablet:bottom-5 tablet:left-5 tablet:w-[440px] tablet:p-6"
          data-lenis-prevent
        >
          <div className="flex items-start gap-3.5">
            <span className="grid h-10 w-10 shrink-0 place-items-center rounded-xl bg-revora-sky text-revora-cobalt">
              <Cookie className="h-5 w-5" />
            </span>
            <div className="min-w-0 flex-1">
              <h2 id={`${uid}-title`} className="font-heading text-[1.1rem] font-extrabold text-revora-slate">
                {custom ? 'Cookie settings' : 'We use cookies'}
              </h2>
              <p id={`${uid}-text`} className="mt-1 font-sans text-[13.5px] leading-[1.6] text-revora-slate-light">
                {custom
                  ? 'Choose which cookies we may use. You can change this any time from the footer.'
                  : 'Necessary cookies keep the site working. With your OK we’d also use analytics and marketing cookies.'}{' '}
                <Link href="/cookie-policy" className="font-semibold text-revora-cobalt underline underline-offset-2">
                  Cookie policy
                </Link>
              </p>
            </div>
            {reopened && (
              <button
                type="button"
                onClick={() => setReopened(false)}
                aria-label="Close cookie settings"
                className="-mr-1 -mt-1 grid h-9 w-9 shrink-0 place-items-center rounded-full text-revora-slate-muted transition-colors hover:bg-revora-sky hover:text-revora-cobalt"
              >
                <X className="h-4 w-4" />
              </button>
            )}
          </div>

          {custom && (
            <ul className="mt-5 divide-y divide-revora-cobalt/10 rounded-2xl border border-revora-cobalt/10">
              {CATEGORIES.map((c) => {
                const on = c.locked ? true : draft[c.id as 'analytics' | 'marketing'];
                return (
                  <li key={c.id} className="flex items-center justify-between gap-4 px-4 py-3.5">
                    <span className="min-w-0">
                      <span id={`${uid}-${c.id}`} className="block font-sans text-[14px] font-semibold text-revora-slate">
                        {c.label}
                      </span>
                      <span className="block font-sans text-[12.5px] leading-snug text-revora-slate-muted">{c.text}</span>
                    </span>
                    <button
                      type="button"
                      role="switch"
                      aria-checked={on}
                      aria-labelledby={`${uid}-${c.id}`}
                      disabled={c.locked}
                      onClick={() => toggle(c.id)}
                      className={`relative h-7 w-12 shrink-0 rounded-full transition-colors duration-300 disabled:cursor-not-allowed disabled:opacity-60 ${on ? 'bg-revora-cobalt' : 'bg-revora-slate-muted/40'}`}
                    >
                      <span className={`absolute top-1 h-5 w-5 rounded-full bg-white shadow transition-[left] duration-300 ${on ? 'left-6' : 'left-1'}`} />
                    </button>
                  </li>
                );
              })}
            </ul>
          )}

          <div className="mt-5 flex flex-wrap items-center gap-2">
            {custom ? (
              <>
                <button type="button" onClick={onSave} className="min-h-11 flex-1 rounded-full bg-revora-cobalt px-5 font-sans text-[14px] font-semibold text-white transition-colors hover:bg-revora-cobalt-dark">
                  Save choices
                </button>
                <button type="button" onClick={onAccept} className="min-h-11 flex-1 rounded-full border border-revora-cobalt/25 px-5 font-sans text-[14px] font-semibold text-revora-cobalt transition-colors hover:bg-revora-sky">
                  Accept all
                </button>
              </>
            ) : (
              <>
                <button type="button" onClick={onAccept} className="min-h-11 flex-1 rounded-full bg-revora-cobalt px-5 font-sans text-[14px] font-semibold text-white transition-colors hover:bg-revora-cobalt-dark">
                  Accept all
                </button>
                <button type="button" onClick={onDecline} className="min-h-11 flex-1 rounded-full border border-revora-cobalt/25 px-5 font-sans text-[14px] font-semibold text-revora-cobalt transition-colors hover:bg-revora-sky">
                  Decline
                </button>
                <button
                  type="button"
                  onClick={() => {
                    setDraft({ analytics: false, marketing: false });
                    setCustom(true);
                  }}
                  className="min-h-11 w-full rounded-full font-sans text-[13.5px] font-semibold text-revora-slate-light underline-offset-4 transition-colors hover:text-revora-cobalt hover:underline"
                >
                  Customise
                </button>
              </>
            )}
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

/** Renders its children only after the visitor has allowed that category (e.g. an analytics <Script>). */
export function ConsentGate({ category, children }: { category: Exclude<ConsentCategory, 'necessary'>; children: React.ReactNode }) {
  const consent = useConsent();
  return consent?.[category] ? <>{children}</> : null;
}
