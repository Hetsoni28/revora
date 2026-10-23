import type { Metadata } from 'next';
import Link from 'next/link';
import { ArrowUpRight } from 'lucide-react';
import { Navbar } from '@/components/layout/navbar';
import { Footer } from '@/components/layout/footer';
import { Button } from '@/components/ui/button';
import { StateScreen } from '@/components/ui/states';

export const metadata: Metadata = {
  title: 'Page not found',
  robots: { index: false, follow: true },
};

const POPULAR = [
  { label: 'Our products', href: '/profile#portfolio' },
  { label: 'About Us', href: '/about' },
  { label: 'Certifications', href: '/certifications' },
  { label: 'Channel Partner', href: '/channel-partner' },
];

export default function NotFound() {
  return (
    <div className="flex min-h-screen flex-col bg-[#F6F9FC]">
      <Navbar />
      <main id="main" tabIndex={-1} className="flex-1">
        <StateScreen
          code="404"
          eyebrow="Page not found"
          title="This page isn’t here."
          text="The link may be old or mistyped. Try one of these pages instead."
          actions={
            <>
              <Button href="/" arrow="up-right" magnetic>Back to home</Button>
              <Button href="/contact" variant="outline">Contact us</Button>
            </>
          }
        >
          <ul className="mt-10 grid max-w-lg gap-2 border-t border-revora-cobalt/10 pt-6 sm:grid-cols-2">
            {POPULAR.map((p) => (
              <li key={p.href}>
                <Link href={p.href} className="group inline-flex min-h-10 items-center gap-1.5 font-sans text-[15px] font-semibold text-revora-cobalt">
                  {p.label}
                  <ArrowUpRight className="h-4 w-4 transition-transform duration-300 group-hover:rotate-45" />
                </Link>
              </li>
            ))}
          </ul>
        </StateScreen>
      </main>
      <Footer />
    </div>
  );
}
