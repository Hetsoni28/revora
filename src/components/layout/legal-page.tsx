import { Navbar } from '@/components/layout/navbar';
import { Footer } from '@/components/layout/footer';
import { Breadcrumb } from '@/components/ui/breadcrumb';
import { JsonLd } from '@/components/seo/json-ld';
import { breadcrumbLd } from '@/lib/seo';

export interface LegalSection {
  heading: string;
  body: React.ReactNode;
}

/** Shared layout for the policy pages: title, last-updated line and plain sections. */
export function LegalPage({ title, path, updated, sections }: { title: string; path: string; updated: string; sections: LegalSection[] }) {
  return (
    <div className="flex min-h-screen flex-col bg-[#F6F9FC]">
      <Navbar />
      <main id="main" tabIndex={-1} className="flex-1">
        <JsonLd data={breadcrumbLd([['Home', '/'], [title, path]])} />
        <article className="px-5 pb-24 pt-36 tablet:px-8 tablet:pt-44">
          <div className="mx-auto max-w-3xl">
            <Breadcrumb items={[{ label: 'Home', href: '/' }, { label: title }]} />
            <h1 className="mt-8 font-heading text-[clamp(2.4rem,5vw,3.6rem)] font-extrabold leading-[1.05] tracking-[-0.03em] text-revora-slate">{title}</h1>
            <p className="mt-3 font-sans text-[14px] text-revora-slate-muted">Revora Healthcare Private Limited · Last updated {updated}</p>
            <div className="mt-10 space-y-10 font-sans text-[16px] leading-[1.75] text-revora-slate-light [&_a]:font-semibold [&_a]:text-revora-cobalt [&_a:hover]:underline [&_b]:text-revora-slate [&_li]:mt-2 [&_ul]:mt-3 [&_ul]:list-disc [&_ul]:pl-5">
              {sections.map((s) => (
                <section key={s.heading}>
                  <h2 className="font-heading text-[1.4rem] font-extrabold text-revora-slate">{s.heading}</h2>
                  <div className="mt-3 space-y-3">{s.body}</div>
                </section>
              ))}
            </div>
          </div>
        </article>
      </main>
      <Footer />
    </div>
  );
}
