'use client';

import { useEffect, useRef, type KeyboardEvent, type RefObject } from 'react';

const FOCUSABLE =
  'a[href], button:not([disabled]), input:not([disabled]):not([type="hidden"]), select:not([disabled]), textarea:not([disabled]), [tabindex]:not([tabindex="-1"])';

/**
 * While `active`, keeps Tab / Shift+Tab inside `ref` (plus an optional `extra` element, e.g. the
 * button that toggles a menu), moves focus in on open, closes on Escape and hands focus back to
 * whatever had it before.
 */
export function useFocusTrap(
  ref: RefObject<HTMLElement | null>,
  active: boolean,
  onClose?: () => void,
  extra?: RefObject<HTMLElement | null>
) {
  const close = useRef(onClose);
  useEffect(() => {
    close.current = onClose;
  }, [onClose]);

  useEffect(() => {
    if (!active) return;
    const opener = document.activeElement as HTMLElement | null;
    const items = () => {
      const inside = [...(ref.current?.querySelectorAll<HTMLElement>(FOCUSABLE) ?? [])].filter((el) => el.getClientRects().length > 0);
      return extra?.current ? [extra.current, ...inside] : inside;
    };
    // wait a frame so entrance animations have mounted their content
    const raf = requestAnimationFrame(() => {
      const list = items();
      (list.find((el) => el !== extra?.current) ?? ref.current)?.focus({ preventScroll: true });
    });
    const onKey = (e: globalThis.KeyboardEvent) => {
      if (e.key === 'Escape') {
        e.preventDefault();
        close.current?.();
        return;
      }
      if (e.key !== 'Tab') return;
      const list = items();
      if (!list.length) return;
      const first = list[0];
      const last = list[list.length - 1];
      const at = document.activeElement as HTMLElement | null;
      if (!at || !list.includes(at)) {
        e.preventDefault();
        first.focus();
      } else if (e.shiftKey && at === first) {
        e.preventDefault();
        last.focus();
      } else if (!e.shiftKey && at === last) {
        e.preventDefault();
        first.focus();
      }
    };
    document.addEventListener('keydown', onKey);
    return () => {
      cancelAnimationFrame(raf);
      document.removeEventListener('keydown', onKey);
      if (opener?.isConnected) opener.focus({ preventScroll: true });
    };
  }, [active, ref, extra]);
}

/**
 * Arrow-key support for a `role="tablist"`: Left/Right move between tabs, Home/End jump to the ends.
 * Tabs need `data-tab={id}`; selection follows focus.
 */
export function onTabListKeyDown<T extends string>(e: KeyboardEvent<HTMLElement>, ids: readonly T[], active: T, select: (id: T) => void) {
  const i = ids.indexOf(active);
  const to = ({ ArrowRight: i + 1, ArrowLeft: i - 1, Home: 0, End: ids.length - 1 } as Record<string, number>)[e.key];
  if (to === undefined) return;
  e.preventDefault();
  const id = ids[(to + ids.length) % ids.length];
  select(id);
  e.currentTarget.querySelector<HTMLElement>(`[data-tab="${id}"]`)?.focus();
}
