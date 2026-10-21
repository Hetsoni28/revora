import type { Metadata } from 'next';
import { breadcrumbLd, pageMetadata } from '@/lib/seo';
import { JsonLd } from '@/components/seo/json-ld';
import { Navbar } from '@/components/layout/navbar';
import { Footer } from '@/components/layout/footer';
import { DomesticClient } from './domestic-client';

export const metadata: Metadata = pageMetadata({
  title: 'Domestic Network — Eye Care Supply in India',
  description:
    'How Revora Healthcare serves doctors, hospitals, eye clinics, pharmacies and distributors across India with ophthalmic eye drops made in its own plant.',
  path: '/our-presence/domestic-network',
  keywords: ['eye drops supplier India', 'ophthalmic products for hospitals', 'eye care distributor India'],
});

const breadcrumbs = breadcrumbLd([['Home', '/'], ['Our Presence', '/our-presence'], ['Domestic Network', '/our-presence/domestic-network']]);

export default function DomesticNetworkPage() {
  return (
    <div className="flex min-h-screen flex-col bg-[#F6F9FC]">
      <Navbar />
      <main id="main" tabIndex={-1} className="flex-1">
        <JsonLd data={breadcrumbs} />
        <DomesticClient />
      </main>
      <Footer />
    </div>
  );
}
