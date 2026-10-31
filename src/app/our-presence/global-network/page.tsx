import type { Metadata } from 'next';
import { breadcrumbLd, pageMetadata } from '@/lib/seo';
import { JsonLd } from '@/components/seo/json-ld';
import { Navbar } from '@/components/layout/navbar';
import { Footer } from '@/components/layout/footer';
import { GlobalClient } from './global-client';

export const metadata: Metadata = pageMetadata({
  title: 'Export — Importer & Distribution Partners',
  description:
    'Revora Healthcare is appointing importers and distributors in 17 priority markets across Asia and Africa for its WHO-GMP formulations. Send an export enquiry.',
  path: '/our-presence/global-network',
  keywords: ['pharma exports India', 'eye drops importer partnership', 'pharmaceutical distributor Africa Asia'],
});

const breadcrumbs = breadcrumbLd([['Home', '/'], ['Our Presence', '/our-presence'], ['Global Network', '/our-presence/global-network']]);

export default function GlobalNetworkPage() {
  return (
    <div className="flex min-h-screen flex-col bg-[#F6F9FC]">
      <Navbar />
      <main id="main" tabIndex={-1} className="flex-1">
        <JsonLd data={breadcrumbs} />
        <GlobalClient />
      </main>
      <Footer />
    </div>
  );
}
