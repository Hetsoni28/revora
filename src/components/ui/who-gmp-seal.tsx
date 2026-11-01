import { useId } from 'react';

/*
 * WHO-GMP certification marks. Deliberately not the WHO emblem (WHO doesn't allow companies to use
 * it): a generic certification seal, as Indian pharma sites use for WHO-GMP manufacturing.
 */

// a scalloped rosette: points alternating between two radii, joined with round corners
const rosette = (cx: number, cy: number, outer: number, inner: number, points: number) =>
  Array.from({ length: points * 2 }, (_, i) => {
    const r = i % 2 === 0 ? outer : inner;
    const a = (Math.PI * i) / points - Math.PI / 2;
    return `${i === 0 ? 'M' : 'L'}${(cx + r * Math.cos(a)).toFixed(2)} ${(cy + r * Math.sin(a)).toFixed(2)}`;
  }).join(' ') + ' Z';

const ICON_ROSETTE = rosette(12, 9.5, 8, 6.9, 12);

/** Line icon (same size and stroke as the lucide icons beside it): a rosette seal with a tick and ribbons. */
export function WhoGmpIcon({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      aria-hidden
    >
      <path d="M8.4 15.2 7 21.6l2.7-1.3 1.6 2.1 1-4.3" />
      <path d="M15.6 15.2 17 21.6l-2.7-1.3-1.6 2.1-1-4.3" />
      <path d={ICON_ROSETTE} fill="var(--seal-fill, none)" />
      <path d="m9.2 9.6 1.9 1.9 3.7-3.9" />
    </svg>
  );
}

const SEAL_ROSETTE = rosette(60, 56, 50, 45, 30);

/** Full-colour seal for larger spots: ribbons, scalloped rim and "WHO-GMP certified" lettering. */
export function WhoGmpSeal({ className }: { className?: string }) {
  const ring = useId();
  return (
    <svg viewBox="0 0 120 124" className={className} role="img" aria-label="WHO-GMP certified manufacturing">
      <path d="M38 88 28 122l11-5 8 7 8-28Z" fill="#D7262E" />
      <path d="M82 88 92 122l-11-5-8 7-8-28Z" fill="#A01C22" />
      <path d={SEAL_ROSETTE} fill="#0B4A8F" stroke="#0B4A8F" strokeWidth="3" strokeLinejoin="round" />
      <circle cx="60" cy="56" r="41" fill="none" stroke="#FFFFFF" strokeOpacity="0.55" strokeWidth="1" />
      <defs>
        <path id={ring} d="M60 56 m-35 0 a35 35 0 1 1 70 0 a35 35 0 1 1 -70 0" />
      </defs>
      <text fill="#FFFFFF" fontFamily="inherit" fontSize="7.4" fontWeight="700" letterSpacing="1.1">
        <textPath href={`#${ring}`} textLength="214" lengthAdjust="spacing">
          WHO-GMP CERTIFIED • QUALITY MANUFACTURING •
        </textPath>
      </text>
      <circle cx="60" cy="56" r="26" fill="#062B55" />
      <text x="60" y="48" textAnchor="middle" fill="#94B6E5" fontFamily="inherit" fontSize="7.5" fontWeight="700" letterSpacing="1.5">
        WHO
      </text>
      <text x="60" y="63" textAnchor="middle" fill="#FFFFFF" fontFamily="inherit" fontSize="16" fontWeight="800" letterSpacing="0.5">
        GMP
      </text>
      <path d="m52 69 5 5 10-10" fill="none" stroke="#D7262E" strokeWidth="3.4" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}
