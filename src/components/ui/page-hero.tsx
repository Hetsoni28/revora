'use client';

import { FadeUp } from './primitives';
import { Breadcrumb, type Crumb } from './breadcrumb';
import { SectionHeading } from './section-heading';

interface PageHeroProps {
  crumbs: Crumb[];
  eyebrow: string;
  lines: string[];
  highlight?: Record<string, string>;
  text: string;
  actions?: React.ReactNode;
  /** Illustration or media shown beside the copy. */
  visual: React.ReactNode;
}

/** Inner-page hero: breadcrumb, headline and one line of copy, with a visual on the right. */
export function PageHero({ crumbs, eyebrow, lines, highlight, text, actions, visual }: PageHeroProps) {
  return (
    <section className="relative isolate overflow-hidden px-5 pb-16 pt-32 tablet:px-8 tablet:pb-24 tablet:pt-40 desktop:pt-48">
      <div aria-hidden className="absolute -left-40 top-10 -z-10 h-[480px] w-[480px] rounded-full bg-revora-sky blur-3xl" />
      <div className="mx-auto max-w-330">
        <Breadcrumb items={crumbs} />
        <div className="mt-8 grid grid-cols-[minmax(0,1fr)] items-center gap-12 tablet-lg:grid-cols-[1.1fr_0.9fr]">
          <div>
            <SectionHeading level="page" eyebrow={eyebrow} lines={lines} highlight={highlight} />
            <FadeUp delay={0.45}>
              <p className="mt-6 max-w-lg font-sans text-[17px] leading-[1.7] text-revora-slate-light">{text}</p>
            </FadeUp>
            {actions && (
              <FadeUp delay={0.55} className="mt-9 flex flex-wrap gap-3">
                {actions}
              </FadeUp>
            )}
          </div>
          {visual}
        </div>
      </div>
    </section>
  );
}
