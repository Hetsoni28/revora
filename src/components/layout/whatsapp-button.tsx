'use client';

import { usePathname } from 'next/navigation';
import { useCatalogue } from '@/components/catalogue/catalogue-context';
import type { Catalogue, WhatsAppSettings } from '@/lib/catalogue';

const fill = (template: string, values: Record<string, string>) => template.replace(/\{(\w+)\}/g, (m, k: string) => values[k] ?? m);

/**
 * The ready-made first message, all from Sanity (Studio → WhatsApp chat): the product message on a
 * product page, the closest matching page message elsewhere, otherwise the default message.
 */
function messageFor(pathname: string, w: WhatsAppSettings, { products, innovation }: Catalogue) {
  const [, section, slug] = pathname.split('/');
  if (section === 'products' && w.productMessage) {
    const p = products.find((x) => x.id === slug);
    if (p) return fill(w.productMessage, { product: p.name, generic: p.genericName });
  }
  if (section === 'innovation' && slug && w.innovationMessage) {
    const p = innovation.find((x) => x.id === slug);
    if (p) return fill(w.innovationMessage, { product: [p.name, p.accent].filter(Boolean).join(' ') });
  }
  // the longest listed path that this page sits under (/our-presence/global-network beats /our-presence)
  const page = w.pages
    .filter((p) => {
      const path = p.path.replace(/\/+$/, '') || '/';
      return path === '/' ? pathname === '/' : pathname === path || pathname.startsWith(`${path}/`);
    })
    .sort((a, b) => b.path.length - a.path.length)[0];
  return page?.message ?? w.defaultMessage;
}

/** Floating WhatsApp button (bottom right), shown only when it's switched on in Sanity. */
export function WhatsAppButton() {
  const pathname = usePathname() ?? '/';
  const catalogue = useCatalogue();
  const w = catalogue.whatsapp;
  if (!w || pathname.startsWith('/studio')) return null;

  const href = `https://wa.me/${w.number}?text=${encodeURIComponent(messageFor(pathname, w, catalogue))}`;
  // product pages have a "Request samples" bar along the bottom below desktop: sit above it
  const lifted = pathname.startsWith('/products/');

  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={`${w.label} with Revora`}
      className={`group fixed right-4 z-70 flex items-center gap-3 print:hidden tablet:right-6 ${lifted ? 'bottom-24 desktop:bottom-6' : 'bottom-4 tablet:bottom-6'}`}
    >
      {/* label slides out on hover (mouse) */}
      <span className="pointer-events-none hidden translate-x-2 rounded-full bg-white px-4 py-2 font-sans text-[13.5px] font-semibold text-revora-slate opacity-0 shadow-[0_12px_30px_-12px_rgba(11,74,143,0.45)] ring-1 ring-revora-cobalt/10 transition-all duration-300 group-hover:translate-x-0 group-hover:opacity-100 [@media(hover:hover)]:inline-block">
        {w.label}
      </span>
      <span className="relative grid h-14 w-14 place-items-center rounded-full bg-[#25D366] text-white shadow-[0_14px_30px_-10px_rgba(37,211,102,0.7)] transition-transform duration-300 group-hover:scale-105 group-active:scale-95">
        <span aria-hidden className="absolute inset-0 rounded-full bg-[#25D366] opacity-40 motion-safe:animate-ping [animation-iteration-count:3]" />
        <svg viewBox="0 0 24 24" aria-hidden className="relative h-7 w-7 fill-current">
          <path d="M17.47 14.38c-.3-.15-1.76-.87-2.03-.97-.27-.1-.47-.15-.67.15-.2.3-.77.97-.94 1.17-.17.2-.35.22-.65.07-.3-.15-1.26-.46-2.4-1.48-.89-.79-1.49-1.77-1.66-2.07-.17-.3-.02-.46.13-.61.13-.13.3-.35.45-.52.15-.17.2-.3.3-.5.1-.2.05-.37-.02-.52-.08-.15-.67-1.62-.92-2.22-.24-.58-.49-.5-.67-.51h-.57c-.2 0-.52.07-.79.37-.27.3-1.04 1.02-1.04 2.48 0 1.46 1.07 2.88 1.21 3.08.15.2 2.1 3.2 5.08 4.49.71.31 1.26.49 1.69.63.71.23 1.36.2 1.87.12.57-.09 1.76-.72 2.01-1.41.25-.69.25-1.29.17-1.41-.07-.12-.27-.2-.57-.35zM12.05 21.5h-.01a9.43 9.43 0 0 1-4.81-1.32l-.35-.2-3.57.94.95-3.48-.23-.36a9.42 9.42 0 0 1-1.44-5.02c0-5.2 4.24-9.44 9.46-9.44a9.4 9.4 0 0 1 6.68 2.77 9.38 9.38 0 0 1 2.77 6.68c0 5.21-4.24 9.45-9.45 9.45zm8.04-17.49A11.3 11.3 0 0 0 12.05.7C5.78.7.67 5.8.67 12.08c0 2 .52 3.96 1.52 5.69L.57 23.7l6.08-1.6a11.36 11.36 0 0 0 5.4 1.38h.01c6.27 0 11.38-5.11 11.38-11.39 0-3.04-1.18-5.9-3.35-8.07z" />
        </svg>
      </span>
    </a>
  );
}
