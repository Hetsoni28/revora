import type { Metadata } from 'next';
import { breadcrumbLd, pageMetadata } from '@/lib/seo';
import { JsonLd } from '@/components/seo/json-ld';
import { Navbar } from '@/components/layout/navbar';
import { Footer } from '@/components/layout/footer';
import { InnovationClient } from './innovation-client';

export const metadata: Metadata = pageMetadata({
  title: 'Hand Warmers, Cooling Vests & Field Kits',
  description:
    'Revora innovation products: self-heating hand and sleeping-bag warmers, instant cooling vests, cool packs, hypothermia kits and the InstaHot cooking bowl.',
  path: '/innovation',
  keywords: ['self-heating hand warmer India', 'instant cooling vest', 'hypothermia prevention kit', 'InstaHot cooking bowl'],
});

const breadcrumbs = breadcrumbLd([['Home', '/'], ['Innovation', '/innovation']]);

export default function InnovationPage() {
  return (
    <div className="flex min-h-screen flex-col bg-[#F6F9FC]">
      <Navbar />
      <main id="main" tabIndex={-1} className="flex-1">
        <JsonLd data={breadcrumbs} />
        <InnovationClient />
      </main>
      <Footer />
    </div>
  );
}
