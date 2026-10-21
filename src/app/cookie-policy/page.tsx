import type { Metadata } from 'next';
import { breadcrumbLd, pageMetadata } from '@/lib/seo';
import { JsonLd } from '@/components/seo/json-ld';
import { Navbar } from '@/components/layout/navbar';
import { Footer } from '@/components/layout/footer';
import { Breadcrumb } from '@/components/ui/breadcrumb';
import { CookieSettingsLink } from '@/components/consent/cookie-settings-link';

export const metadata: Metadata = pageMetadata({
  title: 'Cookie Policy',
  description: 'Which cookies the Revora Healthcare website uses, why, and how to accept, decline or change your cookie choices at any time.',
  path: '/cookie-policy',
});

const breadcrumbs = breadcrumbLd([['Home', '/'], ['Cookie Policy', '/cookie-policy']]);

/** What the site actually stores today. Update this table whenever a new cookie or tag is added. */
const STORED = [
  { name: 'revora_consent', type: 'Cookie', category: 'Necessary', duration: '6 months', purpose: 'Remembers your cookie choice so we don’t ask on every visit.' },
  { name: 'revora-intro-seen', type: 'Session storage', category: 'Necessary', duration: 'Until you close the tab', purpose: 'Plays the opening animation once per visit.' },
];

export default function CookiePolicyPage() {
  return (
    <div className="flex min-h-screen flex-col bg-[#F6F9FC]">
      <Navbar />
      <main id="main" tabIndex={-1} className="flex-1">
        <JsonLd data={breadcrumbs} />
        <article className="px-5 pb-24 pt-36 tablet:px-8 tablet:pt-44">
          <div className="mx-auto max-w-3xl">
            <Breadcrumb items={[{ label: 'Home', href: '/' }, { label: 'Cookie Policy' }]} />
            <h1 className="mt-8 font-heading text-[clamp(2.4rem,5vw,3.6rem)] font-extrabold leading-[1.05] tracking-[-0.03em] text-revora-slate">Cookie Policy</h1>
            <p className="mt-3 font-sans text-[14px] text-revora-slate-muted">Revora Healthcare Private Limited · revorahealthcare.com</p>

            <div className="mt-10 space-y-10 font-sans text-[16px] leading-[1.75] text-revora-slate-light">
              <section>
                <h2 className="font-heading text-[1.4rem] font-extrabold text-revora-slate">What cookies are</h2>
                <p className="mt-3">Cookies are small files a website saves in your browser. Some are needed for the site to work; others help measure visits or campaigns.</p>
              </section>

              <section>
                <h2 className="font-heading text-[1.4rem] font-extrabold text-revora-slate">The choices you have</h2>
                <ul className="mt-3 space-y-2">
                  <li><b className="text-revora-slate">Necessary</b> — always on. They keep the site working and remember your cookie choice.</li>
                  <li><b className="text-revora-slate">Analytics</b> — off unless you allow them. Anonymous statistics about how pages are used.</li>
                  <li><b className="text-revora-slate">Marketing</b> — off unless you allow them. Used to measure campaigns.</li>
                </ul>
                <p className="mt-4">
                  Analytics and marketing tools only load after you allow them. Choosing <b className="text-revora-slate">Decline</b> keeps only the necessary ones.
                </p>
              </section>

              <section>
                <h2 className="font-heading text-[1.4rem] font-extrabold text-revora-slate">What we store today</h2>
                <div className="mt-4 overflow-x-auto rounded-2xl border border-revora-cobalt/10 bg-white">
                  <table className="w-full min-w-[560px] text-left text-[14px]">
                    <thead className="bg-revora-sky/60 text-revora-slate">
                      <tr>
                        {['Name', 'Type', 'Category', 'Kept for', 'Purpose'].map((h) => (
                          <th key={h} scope="col" className="px-4 py-3 font-semibold">{h}</th>
                        ))}
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-revora-cobalt/10">
                      {STORED.map((c) => (
                        <tr key={c.name}>
                          <td className="px-4 py-3 font-mono text-[13px] text-revora-slate">{c.name}</td>
                          <td className="px-4 py-3">{c.type}</td>
                          <td className="px-4 py-3">{c.category}</td>
                          <td className="px-4 py-3">{c.duration}</td>
                          <td className="px-4 py-3">{c.purpose}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
                <p className="mt-4">We don’t use analytics or marketing cookies at the moment. If we add them, they will appear here and only run with your consent.</p>
              </section>

              <section>
                <h2 className="font-heading text-[1.4rem] font-extrabold text-revora-slate">Change your choice</h2>
                <p className="mt-3">You can change or withdraw your consent at any time. Your choice is kept for 6 months, then we ask again.</p>
                <CookieSettingsLink className="mt-5 inline-flex min-h-11 items-center rounded-full bg-revora-cobalt px-6 font-sans text-[14.5px] font-semibold text-white transition-colors hover:bg-revora-cobalt-dark">
                  Open cookie settings
                </CookieSettingsLink>
              </section>

              <section>
                <h2 className="font-heading text-[1.4rem] font-extrabold text-revora-slate">Contact</h2>
                <p className="mt-3">
                  Questions about cookies or your data:{' '}
                  <a href="mailto:info@revorahealthcare.com" className="font-semibold text-revora-cobalt underline underline-offset-2">info@revorahealthcare.com</a>
                </p>
              </section>
            </div>
          </div>
        </article>
      </main>
      <Footer />
    </div>
  );
}
