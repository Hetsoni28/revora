'use client';

import Link from 'next/link';
import { ArrowUpRight, BadgeCheck, Building2, HeartHandshake } from 'lucide-react';
import { FadeUp } from '@/components/ui/primitives';

const PAGES = [
  { href: '/about', label: 'About Revora', text: 'Who we are and what we make.', icon: Building2 },
  { href: '/philosophy', label: 'Philosophy & Values', text: 'The promise behind every drop.', icon: HeartHandshake },
  { href: '/certifications', label: 'Certifications', text: 'How we make quality certain.', icon: BadgeCheck },
];

/** Links to the other company pages, shown at the end of each one. */
export function NextPages({ current }: { current: string }) {
  const others = PAGES.filter((p) => p.href !== current);
  return (
    <section className="px-5 pb-24 tablet:px-8 tablet:pb-32">
      <div className="mx-auto grid max-w-330 gap-5 tablet:grid-cols-2">
        {others.map((p, i) => (
          <FadeUp key={p.href} delay={i * 0.1}>
            <Link
              href={p.href}
              className="group relative isolate flex items-center gap-5 overflow-hidden rounded-[28px] border border-revora-cobalt/10 bg-white p-7 tablet:p-8"
            >
              <span aria-hidden className="absolute inset-0 -z-10 translate-y-full bg-revora-cobalt transition-transform duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:translate-y-0" />
              <span className="grid h-14 w-14 shrink-0 place-items-center rounded-2xl bg-revora-sky text-revora-cobalt transition-colors duration-500 group-hover:bg-white/15 group-hover:text-white">
                <p.icon className="h-6 w-6" />
              </span>
              <span className="flex-1">
                <span className="block font-heading text-xl font-extrabold text-revora-slate transition-colors duration-500 group-hover:text-white tablet:text-2xl">{p.label}</span>
                <span className="mt-1 block font-sans text-[14.5px] text-revora-slate-light transition-colors duration-500 group-hover:text-white/75">{p.text}</span>
              </span>
              <ArrowUpRight className="h-6 w-6 shrink-0 text-revora-cobalt transition-all duration-500 group-hover:rotate-45 group-hover:text-white" />
            </Link>
          </FadeUp>
        ))}
      </div>
    </section>
  );
}
