import type { Metadata } from 'next';
import { breadcrumbLd, pageMetadata } from '@/lib/seo';
import { JsonLd } from '@/components/seo/json-ld';
import { Navbar } from '@/components/layout/navbar';
import { Footer } from '@/components/layout/footer';
import { PhilosophyClient } from './philosophy-client';

export const metadata: Metadata = pageMetadata({
  title: 'Philosophy & Values',
  description:
    'Trust, focus, quality, relationships and care — the values behind every Revora Healthcare product, from our facility to the patient.',
  path: '/philosophy',
  keywords: ['Revora Healthcare values', 'patient-first eye care'],
});

const breadcrumbs = breadcrumbLd([['Home', '/'], ['About Us', '/about'], ['Philosophy & Values', '/philosophy']]);

export default function PhilosophyPage() {
  return (
    <div className="flex min-h-screen flex-col bg-[#F6F9FC]">
      <Navbar />
      <main id="main" tabIndex={-1} className="flex-1">
        <JsonLd data={breadcrumbs} />
        <PhilosophyClient />
      </main>
      <Footer />
    </div>
  );
}
