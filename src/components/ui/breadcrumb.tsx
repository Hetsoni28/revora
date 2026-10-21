import Link from 'next/link';
import { ChevronRight } from 'lucide-react';

export type Crumb = { label: string; href?: string };

/** Page trail; the last crumb (no href) is the current page. */
export function Breadcrumb({ items }: { items: Crumb[] }) {
  return (
    <nav aria-label="Breadcrumb" className="flex flex-wrap items-center gap-2 font-sans text-[13px] text-revora-slate-muted">
      {items.map((c, i) => (
        <span key={c.label} className="flex items-center gap-2">
          {i > 0 && <ChevronRight className="h-3.5 w-3.5" />}
          {c.href ? (
            <Link href={c.href} className="inline-flex min-h-6 items-center transition-colors hover:text-revora-cobalt">
              {c.label}
            </Link>
          ) : (
            <span aria-current="page" className="font-semibold text-revora-cobalt">
              {c.label}
            </span>
          )}
        </span>
      ))}
    </nav>
  );
}
