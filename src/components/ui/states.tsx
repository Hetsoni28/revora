import type { ReactNode } from 'react';
import type { LucideIcon } from 'lucide-react';

/**
 * Full-page message for 404 / error screens: a large status code, a heading, one line of help and
 * actions. Server-safe (no hooks), so it works in not-found, error and global-error alike.
 */
export function StateScreen({
  code,
  eyebrow,
  title,
  text,
  actions,
  children,
}: {
  code: string;
  eyebrow: string;
  title: string;
  text: string;
  actions?: ReactNode;
  children?: ReactNode;
}) {
  return (
    <section className="relative isolate flex min-h-[78vh] items-center overflow-hidden px-5 pb-20 pt-36 tablet:px-8 tablet:pt-44">
      <div aria-hidden className="absolute -left-40 top-24 -z-10 h-120 w-120 rounded-full bg-revora-sky blur-3xl" />
      <div className="mx-auto grid w-full max-w-330 grid-cols-[minmax(0,1fr)] items-center gap-10 tablet-lg:grid-cols-[1.1fr_0.9fr]">
        <div>
          <p className="font-sans text-[12px] font-semibold uppercase tracking-[0.18em] text-revora-crimson">{eyebrow}</p>
          <h1 className="mt-4 font-heading text-[clamp(2.4rem,5.4vw,4.4rem)] font-extrabold leading-[1.02] tracking-[-0.03em] text-revora-slate">{title}</h1>
          <p className="mt-5 max-w-lg font-sans text-[17px] leading-[1.7] text-revora-slate-light">{text}</p>
          {actions && <div className="mt-9 flex flex-wrap gap-3">{actions}</div>}
          {children}
        </div>
        <p
          aria-hidden
          className="select-none text-center font-heading text-[clamp(7rem,22vw,16rem)] font-extrabold leading-none tracking-[-0.06em] text-revora-cobalt/10 tablet-lg:text-right"
        >
          {code}
        </p>
      </div>
    </section>
  );
}

/** Small card for a list or section that has nothing to show yet. */
export function EmptyState({ icon: Icon, title, text, action }: { icon: LucideIcon; title: string; text?: string; action?: ReactNode }) {
  return (
    <div role="status" className="flex flex-col items-center rounded-3xl border border-dashed border-revora-cobalt/20 bg-white px-6 py-12 text-center">
      <span className="grid h-12 w-12 place-items-center rounded-2xl bg-revora-sky text-revora-cobalt">
        <Icon className="h-5 w-5" />
      </span>
      <p className="mt-4 font-heading text-[1.15rem] font-extrabold text-revora-slate">{title}</p>
      {text && <p className="mt-1.5 max-w-sm font-sans text-[14.5px] leading-[1.6] text-revora-slate-light">{text}</p>}
      {action && <div className="mt-5">{action}</div>}
    </div>
  );
}

/** Loading indicator — announced to screen readers, pulses gently instead of spinning when motion is reduced. */
export function PageLoader({ label = 'Loading…' }: { label?: string }) {
  return (
    <div role="status" aria-live="polite" className="loader-delayed flex min-h-[60vh] flex-col items-center justify-center gap-4 px-5 pt-32">
      <span className="relative grid h-14 w-14 place-items-center">
        <span className="absolute inset-0 rounded-full border-2 border-revora-cobalt/15" />
        <span className="absolute inset-0 animate-spin rounded-full border-2 border-transparent border-t-revora-cobalt motion-reduce:animate-pulse motion-reduce:border-t-revora-cobalt/40" />
        <span className="h-2.5 w-2.5 rounded-full bg-revora-crimson" />
      </span>
      <span className="font-sans text-[13px] font-medium text-revora-slate-muted">{label}</span>
    </div>
  );
}
