'use client';

import { useSyncExternalStore } from 'react';

/**
 * Cookie consent — one small first-party cookie holds the visitor's choice.
 *
 * - `necessary` is always on (the consent cookie itself, the intro-seen flag).
 * - Anything else (analytics, marketing) must check `hasConsent('analytics')` / `useConsent()`
 *   or sit inside <ConsentGate category="analytics"> before it loads.
 * - Bump CONSENT_VERSION when categories or their meaning change: everyone is asked again.
 */
export const CONSENT_COOKIE = 'revora_consent';
export const CONSENT_VERSION = 1;
const MAX_AGE_DAYS = 180;

export type ConsentCategory = 'necessary' | 'analytics' | 'marketing';

export type Consent = {
  v: number;
  necessary: true;
  analytics: boolean;
  marketing: boolean;
  /** ISO date of the decision */
  at: string;
};

export const CATEGORIES: { id: ConsentCategory; label: string; text: string; locked?: boolean }[] = [
  { id: 'necessary', label: 'Necessary', text: 'Keep the site working and remember this choice. Always on.', locked: true },
  { id: 'analytics', label: 'Analytics', text: 'Anonymous visit statistics that help us improve pages.' },
  { id: 'marketing', label: 'Marketing', text: 'Measure campaigns and show relevant content on other sites.' },
];

const OPEN_EVENT = 'revora:open-cookie-settings';
const listeners = new Set<() => void>();
let cached: Consent | null | undefined;

function read(): Consent | null {
  if (typeof document === 'undefined') return null;
  const raw = document.cookie.split('; ').find((c) => c.startsWith(`${CONSENT_COOKIE}=`));
  if (!raw) return null;
  try {
    const value = JSON.parse(decodeURIComponent(raw.slice(CONSENT_COOKIE.length + 1))) as Consent;
    return value.v === CONSENT_VERSION ? value : null;
  } catch {
    return null;
  }
}

function snapshot() {
  if (cached === undefined) cached = read();
  return cached;
}

/** Save a decision; necessary is forced on. */
export function saveConsent(choice: Pick<Consent, 'analytics' | 'marketing'>) {
  const value: Consent = { v: CONSENT_VERSION, necessary: true, analytics: choice.analytics, marketing: choice.marketing, at: new Date().toISOString() };
  const secure = location.protocol === 'https:' ? '; Secure' : '';
  document.cookie = `${CONSENT_COOKIE}=${encodeURIComponent(JSON.stringify(value))}; Max-Age=${MAX_AGE_DAYS * 86400}; Path=/; SameSite=Lax${secure}`;
  cached = value;
  syncTags(value);
  listeners.forEach((l) => l());
}

export const acceptAll = () => saveConsent({ analytics: true, marketing: true });
export const rejectAll = () => saveConsent({ analytics: false, marketing: false });

/** Non-hook check, for code that runs outside React (e.g. before injecting a script). */
export function hasConsent(category: ConsentCategory) {
  if (category === 'necessary') return true;
  return !!snapshot()?.[category];
}

/** Ask the banner to open its settings panel (footer "Cookie settings" link). */
export function openCookieSettings() {
  window.dispatchEvent(new Event(OPEN_EVENT));
}

export function onOpenCookieSettings(fn: () => void) {
  window.addEventListener(OPEN_EVENT, fn);
  return () => window.removeEventListener(OPEN_EVENT, fn);
}

function subscribe(fn: () => void) {
  listeners.add(fn);
  return () => listeners.delete(fn);
}

/**
 * Current decision: `undefined` while rendering on the server (nothing is known yet),
 * `null` when the visitor hasn't chosen, otherwise their saved choice.
 */
export function useConsent(): Consent | null | undefined {
  return useSyncExternalStore(subscribe, snapshot, () => undefined);
}

/** Pass the decision on to Google tags (Consent Mode v2) if any are added to the site later. */
function syncTags(c: Consent) {
  const w = window as unknown as { gtag?: (...args: unknown[]) => void; dataLayer?: unknown[] };
  const granted = (on: boolean) => (on ? 'granted' : 'denied');
  w.gtag?.('consent', 'update', {
    analytics_storage: granted(c.analytics),
    ad_storage: granted(c.marketing),
    ad_user_data: granted(c.marketing),
    ad_personalization: granted(c.marketing),
  });
  w.dataLayer?.push({ event: 'consent_update', analytics: c.analytics, marketing: c.marketing });
}
