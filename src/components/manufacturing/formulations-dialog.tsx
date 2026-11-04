'use client';

import { useDeferredValue, useEffect, useId, useRef, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { useLenis } from 'lenis/react';
import { ArrowDown, Search, X, type LucideIcon } from 'lucide-react';
import { expoOut } from '@/lib/easings';
import { onTabListKeyDown, useFocusTrap } from '@/lib/a11y';
import { splitVariant, type FormulationList } from '@/lib/formulations';

/**
 * Full list of approved formulations for one dosage form: tabs when it has several lists
 * (e.g. Tablets / Capsules), a search box, and a link down to the enquiry form.
 * Give it a new `key` on each open so it starts on the first tab with an empty search.
 */
export function FormulationsDialog({
  open,
  onClose,
  icon: Icon,
  title,
  lists,
  onEnquire,
}: {
  open: boolean;
  onClose: () => void;
  icon: LucideIcon;
  title: string;
  lists: FormulationList[];
  onEnquire: () => void;
}) {
  const [tab, setTab] = useState(lists[0].id);
  const [query, setQuery] = useState('');
  const q = useDeferredValue(query.trim().toLowerCase());

  // Lock the page behind the dialog; keep keyboard focus inside it and close on Escape.
  const lenis = useLenis();
  useEffect(() => {
    if (!open) return;
    lenis?.stop();
    return () => {
      lenis?.start();
    };
  }, [open, lenis]);
  const dialogRef = useRef<HTMLDivElement>(null);
  useFocusTrap(dialogRef, open, onClose);
  const uid = useId();

  const list = lists.find((l) => l.id === tab) ?? lists[0];
  const total = lists.reduce((n, l) => n + l.items.length, 0);
  const rows = list.items.map((line, i) => ({ n: i + 1, ...splitVariant(line) })).filter((r) => !q || `${r.name} ${r.variant ?? ''}`.toLowerCase().includes(q));

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          data-lenis-prevent
          className="fixed inset-0 z-150 flex items-end justify-center bg-revora-slate/60 p-3 backdrop-blur-sm tablet:items-center tablet:p-8"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3 }}
          onClick={(e) => e.target === e.currentTarget && onClose()}
        >
          <motion.div
            ref={dialogRef}
            role="dialog"
            aria-modal="true"
            aria-labelledby={`${uid}-title`}
            className="flex h-[min(52rem,calc(100dvh-1.5rem))] w-full max-w-3xl flex-col overflow-hidden rounded-[24px] border border-revora-cobalt/10 bg-white shadow-2xl tablet:h-[min(52rem,calc(100dvh-4rem))] tablet:rounded-[28px]"
            initial={{ opacity: 0, y: 40, scale: 0.97 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 24, scale: 0.98 }}
            transition={{ duration: 0.5, ease: expoOut }}
          >
            {/* header */}
            <div className="relative shrink-0 bg-revora-cobalt-deep p-5 pr-14 text-white tablet:p-7 tablet:pr-16">
              <button
                type="button"
                onClick={onClose}
                className="absolute right-3 top-3 grid h-10 w-10 place-items-center rounded-full text-white/70 transition-colors hover:bg-white/10 hover:text-white tablet:right-4 tablet:top-4"
                aria-label="Close list"
              >
                <X size={20} />
              </button>
              <div className="flex items-center gap-4">
                <span className="grid h-12 w-12 shrink-0 place-items-center rounded-2xl bg-white/10">
                  <Icon className="h-5 w-5" />
                </span>
                <div>
                  <p className="font-sans text-[11px] font-semibold uppercase tracking-[0.16em] text-white/60">Approved formulations</p>
                  <h3 id={`${uid}-title`} className="font-heading text-[1.5rem] font-extrabold leading-tight tablet:text-[1.75rem]">
                    {title} <span className="text-revora-cobalt-pale">· {total}</span>
                  </h3>
                </div>
              </div>

              {lists.length > 1 && (
                <div role="tablist" aria-label={`${title} lists`} className="mt-5 inline-flex gap-1 rounded-full bg-white/10 p-1" onKeyDown={(e) => onTabListKeyDown(e, lists.map((l) => l.id), tab, setTab)}>
                  {lists.map((l) => (
                    <button
                      key={l.id}
                      type="button"
                      role="tab"
                      data-tab={l.id}
                      aria-selected={l.id === tab}
                      tabIndex={l.id === tab ? 0 : -1}
                      onClick={() => setTab(l.id)}
                      className={`rounded-full px-4 py-2 font-sans text-[13.5px] font-semibold transition-colors ${l.id === tab ? 'bg-white text-revora-cobalt-deep' : 'text-white/80 hover:text-white'}`}
                    >
                      {l.label} <span className="opacity-60">{l.items.length}</span>
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* search */}
            <div className="shrink-0 border-b border-revora-cobalt/10 p-4 tablet:px-7">
              <label className="relative block">
                <span className="sr-only">Search {list.label.toLowerCase()}</span>
                <Search className="pointer-events-none absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-revora-slate-muted" />
                <input
                  type="search"
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  placeholder="Search by molecule, strength or variant, e.g. Moxifloxacin, BKC-free"
                  className="w-full rounded-xl border border-revora-cobalt/15 bg-[#F6F9FC] py-3 pl-11 pr-4 font-sans text-[16px] text-revora-slate outline-none transition-[border-color,box-shadow] placeholder:text-revora-slate-muted focus:border-revora-cobalt focus:bg-white focus:shadow-[0_0_0_4px_rgba(11,74,143,0.12)] tablet:text-[15px]"
                />
              </label>
              <p className="mt-2 font-sans text-[12.5px] text-revora-slate-muted" aria-live="polite">
                {q ? `${rows.length} of ${list.items.length} ${list.label.toLowerCase()}` : `${list.items.length} ${list.label.toLowerCase()}`}
              </p>
            </div>

            {/* list */}
            <div data-lenis-prevent className="min-h-0 flex-1 overflow-y-auto overscroll-contain px-4 tablet:px-7">
              {rows.length ? (
                <ol className="divide-y divide-revora-cobalt/10">
                  {rows.map((r) => (
                    <li key={r.n} className="flex items-baseline gap-4 py-3">
                      <span className="w-8 shrink-0 text-right font-mono text-[12px] text-revora-slate-muted">{r.n}</span>
                      <span className="min-w-0 flex-1 font-sans text-[14.5px] leading-normal text-revora-slate">
                        {r.name}
                        {r.variant && (
                          <span className="ml-2 inline-block rounded-full bg-revora-sky px-2.5 py-0.5 align-[1px] font-sans text-[11.5px] font-semibold text-revora-cobalt">{r.variant}</span>
                        )}
                      </span>
                    </li>
                  ))}
                </ol>
              ) : (
                <p className="py-12 text-center font-sans text-[15px] text-revora-slate-light">No formulation matches “{query.trim()}”. Ask us: we can develop new formulations too.</p>
              )}
            </div>

            {/* footer */}
            <div className="flex shrink-0 flex-col items-start justify-between gap-3 border-t border-revora-cobalt/10 bg-[#F6F9FC] p-4 tablet:flex-row tablet:items-center tablet:px-7">
              <p className="font-sans text-[13.5px] text-revora-slate-light">Need one of these under your brand?</p>
              <button
                type="button"
                onClick={onEnquire}
                className="inline-flex items-center gap-2 rounded-full bg-revora-cobalt px-5 py-3 font-sans text-[14px] font-semibold text-white transition-colors hover:bg-revora-cobalt-deep"
              >
                Enquire about manufacturing <ArrowDown className="h-4 w-4" />
              </button>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
