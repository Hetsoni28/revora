'use client';

import { useEffect, useState } from 'react';
import { useLenis } from 'lenis/react';
import { Check, ChevronDown, Link2, Printer } from 'lucide-react';

export interface TocItem {
  id: string;
  label: string;
}

/**
 * Smooth-scrolls to a section and keeps the URL hash in step. The sections' scroll-margin keeps the
 * heading clear of the fixed navbar (Lenis and scrollIntoView both respect it).
 */
function useJump() {
  const lenis = useLenis();
  return (id: string) => {
    const el = document.getElementById(id);
    if (!el) return;
    history.replaceState(null, '', `#${id}`);
    if (lenis) lenis.scrollTo(el);
    else el.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };
}

/** The last section whose heading has passed under the navbar, for highlighting it in the contents. */
function useActiveSection(ids: string[]) {
  const [active, setActive] = useState(ids[0]);
  const key = ids.join('|');
  useEffect(() => {
    const els = key
      .split('|')
      .map((id) => document.getElementById(id))
      .filter((e): e is HTMLElement => !!e);
    if (!els.length) return;
    let frame = 0;
    const update = () => {
      cancelAnimationFrame(frame);
      frame = requestAnimationFrame(() => {
        // at the very bottom the last sections may never reach the top: pick the last one then
        const atEnd = window.innerHeight + window.scrollY >= document.documentElement.scrollHeight - 4;
        const passed = els.filter((e) => e.getBoundingClientRect().top <= 160);
        setActive((atEnd ? els[els.length - 1] : (passed[passed.length - 1] ?? els[0])).id);
      });
    };
    update();
    window.addEventListener('scroll', update, { passive: true });
    window.addEventListener('resize', update);
    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener('scroll', update);
      window.removeEventListener('resize', update);
    };
  }, [key]);
  return [active, setActive] as const;
}

/** Thin bar under the navbar showing how far through the policy the reader is. */
export function ReadingProgress({ target }: { target: string }) {
  const [progress, setProgress] = useState(0);
  useEffect(() => {
    const el = document.getElementById(target);
    if (!el) return;
    const update = () => {
      const r = el.getBoundingClientRect();
      const total = r.height - window.innerHeight * 0.6;
      setProgress(total > 0 ? Math.min(1, Math.max(0, -r.top / total)) : 1);
    };
    update();
    window.addEventListener('scroll', update, { passive: true });
    window.addEventListener('resize', update);
    return () => {
      window.removeEventListener('scroll', update);
      window.removeEventListener('resize', update);
    };
  }, [target]);
  return (
    <div aria-hidden className="pointer-events-none fixed inset-x-0 top-0 z-130 h-1 print:hidden">
      <div className="h-full origin-left bg-revora-cobalt transition-transform duration-150" style={{ transform: `scaleX(${progress})` }} />
    </div>
  );
}

/** "On this page": a sticky list beside the policy on desktop, or a pinned collapsible bar on phones. */
export function LegalToc({ items, compact = false }: { items: TocItem[]; compact?: boolean }) {
  const [active, setActive] = useActiveSection(items.map((i) => i.id));
  const jump = useJump();
  const [open, setOpen] = useState(false);
  const current = items.find((i) => i.id === active) ?? items[0];

  const list = (onPick?: () => void) => (
    <ol className="space-y-0.5 font-sans text-[14px]">
      {items.map((item) => {
        const on = item.id === active;
        return (
          <li key={item.id}>
            <a
              href={`#${item.id}`}
              aria-current={on ? 'location' : undefined}
              onClick={(e) => {
                e.preventDefault();
                setActive(item.id);
                jump(item.id);
                onPick?.();
              }}
              className={`block rounded-lg border-l-2 py-1.5 pl-3 pr-2 leading-snug transition-colors ${
                on
                  ? 'border-revora-cobalt bg-revora-sky font-semibold text-revora-cobalt'
                  : 'border-transparent text-revora-slate-light hover:border-revora-cobalt/30 hover:text-revora-slate'
              }`}
            >
              {item.label}
            </a>
          </li>
        );
      })}
    </ol>
  );

  if (compact)
    return (
      <div className="sticky top-20 z-20 -mx-1 mb-8 desktop:hidden print:hidden">
        <button
          type="button"
          onClick={() => setOpen((o) => !o)}
          aria-expanded={open}
          data-toc-toggle
          className="flex w-full items-center justify-between gap-3 rounded-2xl border border-revora-cobalt/15 bg-white/95 px-4 py-3 text-left shadow-[0_12px_30px_-20px_rgba(11,74,143,0.5)] backdrop-blur"
        >
          <span className="min-w-0">
            <span className="block font-sans text-[11px] font-semibold uppercase tracking-[0.16em] text-revora-slate-muted">On this page</span>
            <span className="block truncate font-sans text-[14px] font-semibold text-revora-slate">{current?.label}</span>
          </span>
          <ChevronDown className={`h-4 w-4 shrink-0 text-revora-cobalt transition-transform ${open ? 'rotate-180' : ''}`} />
        </button>
        {open && (
          <div className="mt-2 max-h-[60vh] overflow-y-auto rounded-2xl border border-revora-cobalt/15 bg-white p-3 shadow-[0_20px_40px_-24px_rgba(11,74,143,0.55)]">
            {list(() => setOpen(false))}
          </div>
        )}
      </div>
    );

  return (
    <nav aria-label="On this page" className="sticky top-32 hidden max-h-[calc(100vh-10rem)] overflow-y-auto pr-2 desktop:block print:hidden">
      <p className="mb-3 font-sans text-[11px] font-semibold uppercase tracking-[0.18em] text-revora-slate-muted">On this page</p>
      {list()}
    </nav>
  );
}

/** Copies a link straight to one section (shown beside each heading). */
export function SectionLink({ id, label }: { id: string; label: string }) {
  const [copied, setCopied] = useState(false);
  return (
    <button
      type="button"
      onClick={async () => {
        const url = `${location.origin}${location.pathname}#${id}`;
        try {
          await navigator.clipboard.writeText(url);
        } catch {
          history.replaceState(null, '', `#${id}`);
        }
        setCopied(true);
        setTimeout(() => setCopied(false), 1600);
      }}
      aria-label={copied ? 'Link copied' : `Copy link to “${label}”`}
      className="ml-2 inline-grid h-8 w-8 shrink-0 place-items-center rounded-full text-revora-slate-muted opacity-0 transition-opacity hover:bg-revora-sky hover:text-revora-cobalt focus-visible:opacity-100 group-hover:opacity-100 print:hidden"
    >
      {copied ? <Check className="h-4 w-4 text-revora-cobalt" /> : <Link2 className="h-4 w-4" />}
    </button>
  );
}

export function PrintButton({ light = false }: { light?: boolean }) {
  return (
    <button
      type="button"
      onClick={() => window.print()}
      className={`inline-flex min-h-10 items-center gap-2 rounded-full px-4 font-sans text-[13.5px] font-semibold transition-colors print:hidden ${
        light
          ? 'border border-white/25 bg-white/15 text-white backdrop-blur-sm hover:bg-white/25'
          : 'border border-revora-cobalt/20 bg-white text-revora-cobalt hover:border-revora-cobalt hover:bg-revora-cobalt hover:text-white'
      }`}
    >
      <Printer className="h-4 w-4" /> Print or save as PDF
    </button>
  );
}
