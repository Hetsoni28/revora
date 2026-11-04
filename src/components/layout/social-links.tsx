import { SITE } from '@/lib/seo';

type Network = keyof typeof SITE.social;

/** Each network's colour and logo (simple, recognisable marks at icon size). */
const NETWORKS: Record<Network, { label: string; bg: string; icon: React.ReactNode }> = {
  instagram: {
    label: 'Instagram',
    bg: 'bg-[radial-gradient(circle_at_30%_110%,#fdf497_0%,#fd5949_45%,#d6249f_60%,#285AEB_90%)]',
    icon: (
      <svg viewBox="0 0 24 24" aria-hidden className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="2">
        <rect x="3" y="3" width="18" height="18" rx="5" />
        <circle cx="12" cy="12" r="4" />
        <circle cx="17.5" cy="6.5" r="1" fill="currentColor" stroke="none" />
      </svg>
    ),
  },
  linkedin: {
    label: 'LinkedIn',
    bg: 'bg-[#0A66C2]',
    icon: (
      <svg viewBox="0 0 24 24" aria-hidden className="h-[18px] w-[18px]" fill="currentColor">
        <path d="M4.98 3.5a2.5 2.5 0 1 1 0 5 2.5 2.5 0 0 1 0-5ZM3 9.75h4v11H3v-11Zm6.5 0h3.83v1.5h.06c.53-1 1.84-2.06 3.79-2.06 4.05 0 4.8 2.67 4.8 6.13v5.43h-4v-4.81c0-1.15-.02-2.62-1.6-2.62-1.6 0-1.84 1.25-1.84 2.54v4.89h-4v-11Z" />
      </svg>
    ),
  },
  facebook: {
    label: 'Facebook',
    bg: 'bg-[#1877F2]',
    icon: (
      <svg viewBox="0 0 24 24" aria-hidden className="h-5 w-5" fill="currentColor">
        <path d="M13.5 21v-7.5h2.53l.38-2.94H13.5V8.69c0-.85.24-1.43 1.46-1.43h1.56V4.63a20.9 20.9 0 0 0-2.27-.12c-2.25 0-3.79 1.37-3.79 3.89v2.16H7.92v2.94h2.54V21h3.04Z" />
      </svg>
    ),
  },
  youtube: {
    label: 'YouTube',
    bg: 'bg-[#FF0000]',
    icon: (
      <svg viewBox="0 0 24 24" aria-hidden className="h-5 w-5" fill="currentColor">
        <path d="M21.58 7.19a2.5 2.5 0 0 0-1.76-1.77C18.25 5 12 5 12 5s-6.25 0-7.82.42A2.5 2.5 0 0 0 2.42 7.2C2 8.77 2 12 2 12s0 3.23.42 4.81a2.5 2.5 0 0 0 1.76 1.77C5.75 19 12 19 12 19s6.25 0 7.82-.42a2.5 2.5 0 0 0 1.76-1.77C22 15.23 22 12 22 12s0-3.23-.42-4.81ZM10 15.02V8.98L15.2 12 10 15.02Z" />
      </svg>
    ),
  },
};

/** Round icons for the company's social profiles; a network shows only once its link is set in SITE.social. */
export function SocialLinks({ className }: { className?: string }) {
  const links = (Object.keys(NETWORKS) as Network[]).filter((n) => SITE.social[n]);
  if (!links.length) return null;
  return (
    <ul className={`flex flex-wrap gap-2.5 ${className ?? ''}`} aria-label="Revora Healthcare on social media">
      {links.map((n) => (
        <li key={n}>
          <a
            href={SITE.social[n]}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={`Revora Healthcare on ${NETWORKS[n].label}`}
            title={NETWORKS[n].label}
            className={`grid h-10 w-10 place-items-center rounded-full text-white transition-transform duration-300 hover:scale-110 ${NETWORKS[n].bg}`}
          >
            {NETWORKS[n].icon}
          </a>
        </li>
      ))}
    </ul>
  );
}
