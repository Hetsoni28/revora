'use client';

import { Eyebrow, FadeUp, SplitWords } from './primitives';

interface SectionHeadingProps {
  eyebrow: string;
  /** One string per line; each line's words rise in turn. */
  lines: string[];
  /** word (punctuation included) → colour class */
  highlight?: Record<string, string>;
  /** Short supporting copy shown beside the heading on desktop. */
  aside?: React.ReactNode;
  tone?: 'dark' | 'light';
  /** 'page' for the h1 of a page hero (plays on mount), 'section' for h2s. */
  level?: 'page' | 'section';
  className?: string;
}

const SIZES = {
  page: 'text-[clamp(2.5rem,5.6vw,4.9rem)] leading-[1] tracking-[-0.03em]',
  section: 'text-[clamp(2.2rem,4.6vw,3.8rem)] leading-[1.02] tracking-[-0.02em]',
};

export function SectionHeading({ eyebrow, lines, highlight, aside, tone = 'dark', level = 'section', className }: SectionHeadingProps) {
  const Tag = level === 'page' ? 'h1' : 'h2';
  const trigger = level === 'page' ? 'mount' : 'view';
  // On a page hero the small label is part of the H1, so search engines read the topic with the headline.
  const label = <Eyebrow tone={tone}>{eyebrow}</Eyebrow>;
  const heading = (
    <div>
      {level === 'section' && label}
      <Tag className={`font-heading font-extrabold ${level === 'section' ? 'mt-5' : ''} ${SIZES[level]} ${tone === 'dark' ? 'text-revora-slate' : 'text-white'}`}>
        {level === 'page' && (
          <span className="mb-5 block leading-none">
            {label}
            <span className="sr-only">: </span>
          </span>
        )}
        {lines.map((line, i) => (
          <span key={line}>
            {i > 0 && <>{' '}<br /></>}
            <SplitWords text={line} trigger={trigger} delay={0.1 + i * 0.2} highlight={highlight} />
          </span>
        ))}
      </Tag>
    </div>
  );

  if (!aside) return <div className={className}>{heading}</div>;
  return (
    <div className={`flex flex-col gap-5 desktop:flex-row desktop:items-end desktop:justify-between ${className ?? ''}`}>
      {heading}
      <FadeUp delay={0.15} className="desktop:max-w-sm">
        <div className={`font-sans text-[15px] leading-[1.7] ${tone === 'dark' ? 'text-revora-slate-light' : 'text-white/70'}`}>{aside}</div>
      </FadeUp>
    </div>
  );
}
