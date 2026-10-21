'use client'; // Error boundaries must be Client Components

import './globals.css';

/**
 * Last-resort screen when the root layout itself fails. It replaces the whole document, so it carries
 * its own <html>/<body> and stays free of the navbar, fonts and providers that might be what broke.
 */
export default function GlobalError({ retry }: { error: unknown; retry: () => void }) {
  return (
    <html lang="en-IN">
      <body className="flex min-h-screen items-center bg-[#F6F9FC] px-5 font-sans text-revora-slate">
        <title>Something went wrong | Revora Healthcare</title>
        <main className="mx-auto w-full max-w-xl py-20 text-center">
          {/* plain links on purpose: reload the page fresh rather than through the app shell that failed */}
          {/* eslint-disable-next-line @next/next/no-html-link-for-pages */}
          <a href="/" className="font-heading text-2xl font-extrabold text-revora-cobalt">
            revora
          </a>
          <p className="mt-10 font-sans text-[12px] font-semibold uppercase tracking-[0.18em] text-revora-crimson">Error 500</p>
          <h1 className="mt-3 font-heading text-4xl font-extrabold tracking-tight">The site didn’t load.</h1>
          <p className="mt-4 text-[17px] leading-[1.7] text-revora-slate-light">Please try again in a moment. If it keeps happening, email info@revorahealthcare.com.</p>
          <div className="mt-8 flex flex-wrap justify-center gap-3">
            <button
              type="button"
              onClick={() => retry()}
              className="rounded-full bg-revora-cobalt px-6 py-3.5 text-[15px] font-semibold text-white transition-colors hover:bg-revora-cobalt-dark"
            >
              Try again
            </button>
            {/* eslint-disable-next-line @next/next/no-html-link-for-pages */}
            <a href="/" className="rounded-full border border-revora-cobalt/25 px-6 py-3.5 text-[15px] font-semibold text-revora-cobalt">
              Back to home
            </a>
          </div>
        </main>
      </body>
    </html>
  );
}
