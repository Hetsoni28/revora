'use client';

import Link from 'next/link';
import { ArrowDown, ArrowUpRight } from 'lucide-react';
import { AnchorLink, Magnetic } from './primitives';

type Variant = 'primary' | 'light' | 'outline' | 'outline-light';

interface ButtonProps {
  children: React.ReactNode;
  /** "#id" scrolls smoothly, "/path" routes, "mailto:" / "https:" open natively; omit for a <button>. */
  href?: string;
  onClick?: () => void;
  variant?: Variant;
  /** Trailing round arrow (filled variants only). */
  arrow?: 'up-right' | 'down';
  /** Leading icon (any variant). */
  icon?: React.ReactNode;
  magnetic?: boolean;
  className?: string;
}

const BASE = 'group relative inline-flex items-center gap-3 overflow-hidden rounded-full font-sans text-[15px] font-semibold';

const VARIANTS: Record<Variant, string> = {
  primary: 'bg-revora-cobalt text-white shadow-[0_18px_40px_-14px_rgba(11,74,143,0.7)]',
  light: 'bg-white text-revora-cobalt',
  outline: 'border border-revora-cobalt/25 text-revora-cobalt transition-colors hover:bg-revora-sky',
  'outline-light': 'border border-white/25 text-white transition-colors hover:bg-white/10',
};

/** The site's one button: a crimson sweep and rotating arrow on the filled variants. */
export function Button({ children, href, onClick, variant = 'primary', arrow, icon, magnetic, className }: ButtonProps) {
  const filled = variant === 'primary' || variant === 'light';
  const hasArrow = filled && arrow;
  const cls = `${BASE} ${VARIANTS[variant]} ${hasArrow ? 'py-3.5 pl-7 pr-3.5' : 'px-6 py-3.5'} ${className ?? ''}`;
  const Arrow = arrow === 'down' ? ArrowDown : ArrowUpRight;

  const inner = (
    <>
      {filled && (
        <span className="absolute inset-0 -translate-x-full bg-revora-crimson transition-transform duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:translate-x-0" />
      )}
      {icon && <span className="relative [&>svg]:h-4 [&>svg]:w-4">{icon}</span>}
      <span className={`relative ${variant === 'light' ? 'transition-colors duration-500 group-hover:text-white' : ''}`}>{children}</span>
      {hasArrow && (
        <span
          className={`relative grid h-8 w-8 place-items-center rounded-full transition-transform duration-500 ${
            arrow === 'down' ? 'group-hover:translate-y-0.5' : 'group-hover:rotate-45'
          } ${variant === 'light' ? 'bg-revora-cobalt text-white' : 'bg-white text-revora-cobalt'}`}
        >
          <Arrow className="h-4 w-4" />
        </span>
      )}
    </>
  );

  const el = !href ? (
    <button type="button" onClick={onClick} className={cls}>
      {inner}
    </button>
  ) : href.startsWith('#') ? (
    <AnchorLink href={href} onClick={onClick} className={cls}>
      {inner}
    </AnchorLink>
  ) : href.startsWith('/') ? (
    <Link href={href} onClick={onClick} className={cls}>
      {inner}
    </Link>
  ) : (
    <a href={href} onClick={onClick} className={cls} {...(href.startsWith('http') ? { target: '_blank', rel: 'noopener noreferrer' } : {})}>
      {inner}
    </a>
  );

  return magnetic ? <Magnetic>{el}</Magnetic> : el;
}
