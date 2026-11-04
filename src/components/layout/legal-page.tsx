import Image from 'next/image';
import Link from 'next/link';
import { ArrowUpRight, CalendarDays, FileText, ListOrdered, Mail, Phone, ShieldAlert, Cookie, Scale, Lock } from 'lucide-react';
import { Navbar } from '@/components/layout/navbar';
import { Footer } from '@/components/layout/footer';
import { Breadcrumb } from '@/components/ui/breadcrumb';
import { JsonLd } from '@/components/seo/json-ld';
import { breadcrumbLd, SITE } from '@/lib/seo';
import { LegalToc, PrintButton, ReadingProgress, SectionLink } from './legal-toc';

/** The date the current versions of the policies took effect (shown as "Last updated"). */
export const POLICIES_UPDATED = '1 November 2026';

export interface LegalSection {
  heading: string;
  body: React.ReactNode;
}

const POLICIES = [
  {
    href: '/privacy-policy',
    title: 'Privacy Policy',
    text: 'What we collect, why, and your rights.',
    icon: Lock,
  },
  {
    href: '/terms-of-use',
    title: 'Terms of Use',
    text: 'The rules for using this website.',
    icon: Scale,
  },
  {
    href: '/pharmacovigilance-policy',
    title: 'Pharmacovigilance Policy',
    text: 'How to report a side effect or quality issue.',
    icon: ShieldAlert,
  },
  {
    href: '/cookie-policy',
    title: 'Cookie Policy',
    text: 'The cookies we use and your choices.',
    icon: Cookie,
  },
];

// "3. Who can report" → "who-can-report"
const slug = (heading: string) =>
  heading
    .replace(/^\d+\.\s*/, '')
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-|-$/g, '');

/**
 * Shared layout for the policy pages: header with summary and key facts, an "On this page" list that
 * follows the reader, linkable sections, related policies and a contact card.
 */
export function LegalPage({
  title,
  path,
  summary,
  updated = POLICIES_UPDATED,
  heroImage,
  sections,
}: {
  title: string;
  path: string;
  summary: string;
  updated?: string;
  /** Full-width background hero photo. When supplied the header becomes a photo hero with white text. */
  heroImage?: { src: string; alt: string };
  sections: LegalSection[];
}) {
  const items = sections.map((s) => ({
    id: slug(s.heading),
    label: s.heading.replace(/^\d+\.\s*/, ''),
  }));
  const related = POLICIES.filter((p) => p.href !== path);

  return (
    <div className="flex min-h-screen flex-col bg-[#F6F9FC]">
      <Navbar />
      <ReadingProgress target="policy" />
      <main id="main" tabIndex={-1} className="flex-1">
        <JsonLd
          data={breadcrumbLd([
            ['Home', '/'],
            [title, path],
          ])}
        />

        {/* ── header ── */}
        {heroImage ? (
          /* ── full-width photo hero ── */
          <header className="relative isolate flex min-h-[52vh] items-end overflow-hidden px-5 pb-12 pt-28 tablet:min-h-[58vh] tablet:px-8 tablet:pb-16 tablet:pt-32 desktop:min-h-[62vh] print:pt-6">
            {/* background photo */}
            <Image
              src={heroImage.src}
              alt={heroImage.alt}
              fill
              priority
              sizes="100vw"
              className="-z-20 object-cover object-center"
            />
            {/* navy gradient — mobile: bottom-up; desktop: left-to-right */}
            <div
              aria-hidden
              className="absolute inset-0 -z-10 bg-[linear-gradient(180deg,rgba(6,27,56,0.35)_0%,rgba(6,27,56,0.82)_55%,rgba(6,27,56,0.95)_100%)] tablet-lg:bg-[linear-gradient(100deg,rgba(6,27,56,0.95)_0%,rgba(6,27,56,0.80)_42%,rgba(6,27,56,0.30)_72%,rgba(6,27,56,0.05)_100%)]"
            />
            <div className="mx-auto w-full max-w-330">
              <div className="print:hidden">
                <Breadcrumb items={[{ label: 'Home', href: '/' }, { label: title }]} tone="light" />
              </div>
              <p className="mt-6 inline-flex items-center gap-2 font-sans text-[11px] font-semibold uppercase tracking-[0.18em] text-white/70">
                <FileText className="h-3.5 w-3.5" /> Legal
              </p>
              <h1 className="mt-2 font-heading text-[clamp(2.4rem,5vw,4rem)] font-extrabold leading-[1.04] tracking-[-0.03em] text-white">
                {title}
              </h1>
              <p className="mt-4 max-w-2xl font-sans text-[17px] leading-[1.7] text-white/80">{summary}</p>
              <div className="mt-7 flex flex-wrap items-center gap-3">
                <span className="inline-flex items-center gap-2 rounded-full bg-white/15 px-4 py-2 font-sans text-[13px] font-medium text-white backdrop-blur-sm">
                  <CalendarDays className="h-4 w-4 text-revora-cobalt-pale" /> Last updated {updated}
                </span>
                <span className="inline-flex items-center gap-2 rounded-full bg-white/15 px-4 py-2 font-sans text-[13px] font-medium text-white backdrop-blur-sm">
                  <ListOrdered className="h-4 w-4 text-revora-cobalt-pale" /> {sections.length} sections
                </span>
                <PrintButton light />
              </div>
            </div>
          </header>
        ) : (
          /* ── plain gradient header (no image) ── */
          <header className="relative isolate overflow-hidden border-b border-revora-cobalt/10 bg-[linear-gradient(180deg,#FFFFFF_0%,#EEF4FB_100%)] px-5 pb-12 pt-32 tablet:px-8 tablet:pb-16 tablet:pt-40 print:pt-6">
            <div aria-hidden className="absolute -right-32 -top-32 -z-10 h-120 w-120 rounded-full bg-revora-cobalt/6 blur-3xl" />
            <div className="mx-auto max-w-330">
              <div className="print:hidden">
                <Breadcrumb items={[{ label: 'Home', href: '/' }, { label: title }]} />
              </div>
              <p className="mt-8 inline-flex items-center gap-2 font-sans text-[12px] font-semibold uppercase tracking-[0.18em] text-revora-cobalt">
                <FileText className="h-4 w-4" /> Legal
              </p>
              <h1 className="mt-3 font-heading text-[clamp(2.4rem,5vw,3.8rem)] font-extrabold leading-[1.04] tracking-[-0.03em] text-revora-slate">{title}</h1>
              <p className="mt-4 max-w-2xl font-sans text-[17px] leading-[1.7] text-revora-slate-light">{summary}</p>
              <div className="mt-7 flex flex-wrap items-center gap-3">
                <span className="inline-flex items-center gap-2 rounded-full bg-white px-4 py-2 font-sans text-[13px] font-medium text-revora-slate ring-1 ring-revora-cobalt/10">
                  <CalendarDays className="h-4 w-4 text-revora-cobalt" /> Last updated {updated}
                </span>
                <span className="inline-flex items-center gap-2 rounded-full bg-white px-4 py-2 font-sans text-[13px] font-medium text-revora-slate ring-1 ring-revora-cobalt/10">
                  <ListOrdered className="h-4 w-4 text-revora-cobalt" /> {sections.length} sections
                </span>
                <PrintButton />
              </div>
            </div>
          </header>
        )}

        {/* ── contents + policy ── */}
        <div className="px-5 py-12 tablet:px-8 tablet:py-16">
          {/* the phone bar sits outside the grid so it stays pinned for the whole policy */}
          <div className="mx-auto max-w-330">
            <LegalToc items={items} compact />
            <div className="grid grid-cols-[minmax(0,1fr)] gap-x-14 desktop:grid-cols-[260px_minmax(0,1fr)]">
              <aside>
                <LegalToc items={items} />
              </aside>

              <article
                id="policy"
                className="min-w-0 rounded-[28px] border border-revora-cobalt/10 bg-white px-5 py-8 font-sans text-[16px] leading-[1.8] text-revora-slate-light shadow-[0_30px_60px_-50px_rgba(11,74,143,0.45)] tablet:px-10 tablet:py-12 print:border-0 print:p-0 print:shadow-none [&_a]:font-semibold [&_a]:text-revora-cobalt [&_a:hover]:underline [&_b]:text-revora-slate [&_li]:mt-2 [&_ul]:mt-3 [&_ul]:list-disc [&_ul]:pl-5 [&_li::marker]:text-revora-cobalt"
              >
                {sections.map((s, i) => (
                  <section key={items[i].id} id={items[i].id} className={`scroll-mt-32 ${i > 0 ? 'mt-10 border-t border-revora-cobalt/8 pt-10' : ''}`}>
                    <h2 className="group flex items-center font-heading text-[1.35rem] font-extrabold leading-snug text-revora-slate tablet:text-[1.5rem]">
                      {s.heading}
                      <SectionLink id={items[i].id} label={items[i].label} />
                    </h2>
                    <div className="mt-3 space-y-3">{s.body}</div>
                  </section>
                ))}
              </article>
            </div>
          </div>
        </div>

        {/* ── related + contact ── */}
        <section className="px-5 pb-16 tablet:px-8 tablet:pb-24 print:hidden">
          <div className="mx-auto grid max-w-330 gap-5 desktop:grid-cols-[minmax(0,1fr)_380px]">
            <div>
              <p className="font-sans text-[12px] font-semibold uppercase tracking-[0.18em] text-revora-slate-muted">Related policies</p>
              <div className="mt-4 grid gap-4 tablet:grid-cols-3">
                {related.map((p) => (
                  <Link
                    key={p.href}
                    href={p.href}
                    className="group flex flex-col rounded-[22px] border border-revora-cobalt/10 bg-white p-5 transition-all duration-300 hover:-translate-y-1 hover:border-revora-cobalt/30 hover:shadow-[0_24px_44px_-30px_rgba(11,74,143,0.55)]"
                  >
                    <span className="grid h-10 w-10 place-items-center rounded-xl bg-revora-sky text-revora-cobalt">
                      <p.icon className="h-5 w-5" />
                    </span>
                    <span className="mt-4 flex items-center justify-between gap-2 font-heading text-[1.05rem] font-extrabold text-revora-slate">
                      {p.title}
                      <ArrowUpRight className="h-4 w-4 shrink-0 text-revora-cobalt transition-transform duration-300 group-hover:rotate-45" />
                    </span>
                    <span className="mt-1 font-sans text-[14px] leading-[1.6] text-revora-slate-light">{p.text}</span>
                  </Link>
                ))}
              </div>
            </div>

            <div className="rounded-[26px] bg-revora-cobalt-deep p-6 text-white tablet:p-7">
              <p className="font-heading text-[1.25rem] font-extrabold">Questions about this policy?</p>
              <p className="mt-2 font-sans text-[14.5px] leading-[1.7] text-white/70">
                Write to us or call. We reply within 30 days, and sooner for safety reports.
              </p>
              <div className="mt-5 space-y-2.5 font-sans text-[14.5px]">
                <a
                  href={`mailto:${SITE.email}?subject=${encodeURIComponent(`Question about the ${title}`)}`}
                  className="flex items-center gap-3 text-white/90 transition-colors hover:text-white"
                >
                  <Mail className="h-4 w-4 text-revora-cobalt-pale" /> {SITE.email}
                </a>
                <a href={SITE.phone.href} className="flex items-center gap-3 text-white/90 transition-colors hover:text-white">
                  <Phone className="h-4 w-4 text-revora-cobalt-pale" /> {SITE.phone.label}
                </a>
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
