'use client';

import Image from 'next/image';
import { FadeUp } from './primitives';
import { Breadcrumb, type Crumb } from './breadcrumb';
import { SectionHeading } from './section-heading';
import { HeroBackdrop } from './hero-backdrop';

interface PageHeroProps {
  crumbs: Crumb[];
  eyebrow: string;
  lines: string[];
  highlight?: Record<string, string>;
  text: string;
  actions?: React.ReactNode;
  /** Illustration or media shown beside the copy. */
  visual?: React.ReactNode;
  /** Full-width photo behind the whole hero (instead of a visual beside the copy); the copy turns white. */
  background?: { src: string; alt: string };
  /** Pale, decorative photo behind the hero; the copy stays dark and the visual stays beside it. */
  backdrop?: string;
}

/** Inner-page hero: breadcrumb, headline and one line of copy, with a visual on the right or a full-width photo behind. */
export function PageHero({ crumbs, eyebrow, lines, highlight, text, actions, visual, background, backdrop }: PageHeroProps) {
  const tone = background ? 'light' : 'dark';
  const copy = (
    <div className={background ? 'max-w-2xl' : undefined}>
      <SectionHeading level="page" tone={tone} eyebrow={eyebrow} lines={lines} highlight={highlight} />
      <FadeUp delay={0.45}>
        <p className={`mt-6 max-w-lg font-sans text-[17px] leading-[1.7] ${background ? 'text-white/80' : 'text-revora-slate-light'}`}>{text}</p>
      </FadeUp>
      {actions && (
        <FadeUp delay={0.55} className="mt-9 flex flex-wrap gap-3">
          {actions}
        </FadeUp>
      )}
    </div>
  );

  if (background) {
    return (
      // one full screen tall; the copy sits centred in the space below the fixed navbar
      <section className="relative isolate flex min-h-svh items-center overflow-hidden px-5 pb-14 pt-28 tablet:px-8 tablet:pb-16 tablet:pt-32">
        <Image src={background.src} alt={background.alt} fill loading="eager" sizes="100vw" className="-z-20 object-cover object-[70%_center]" />
        {/* navy fade behind the copy: from below on phones, from the left on wider screens */}
        <div
          aria-hidden
          className="absolute inset-0 -z-10 bg-[linear-gradient(180deg,rgba(6,27,56,0.45)_0%,rgba(6,27,56,0.88)_70%)] tablet-lg:bg-[linear-gradient(90deg,rgba(6,27,56,0.92)_0%,rgba(6,27,56,0.78)_38%,rgba(6,27,56,0.2)_72%,rgba(6,27,56,0)_100%)]"
        />
        <div className="mx-auto w-full max-w-330">
          <Breadcrumb items={crumbs} tone="light" />
          <div className="mt-8">{copy}</div>
        </div>
      </section>
    );
  }

  return (
    <section className="relative isolate overflow-hidden px-5 pb-16 pt-32 tablet:px-8 tablet:pb-24 tablet:pt-40 desktop:pt-48">
      {backdrop ? (
        <HeroBackdrop src={backdrop} />
      ) : (
        <div aria-hidden className="absolute -left-40 top-10 -z-10 h-[480px] w-[480px] rounded-full bg-revora-sky blur-3xl" />
      )}
      <div className="mx-auto max-w-330">
        <Breadcrumb items={crumbs} />
        <div className="mt-8 grid grid-cols-[minmax(0,1fr)] items-center gap-12 tablet-lg:grid-cols-[1.1fr_0.9fr]">
          {copy}
          {visual}
        </div>
      </div>
    </section>
  );
}
