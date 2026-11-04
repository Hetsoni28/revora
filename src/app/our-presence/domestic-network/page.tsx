import type { Metadata } from 'next';
import { breadcrumbLd, pageMetadata } from '@/lib/seo';
import { JsonLd } from '@/components/seo/json-ld';
import { Navbar } from '@/components/layout/navbar';
import { Footer } from '@/components/layout/footer';
import { DOMESTIC_NETWORK } from '@/lib/network';
import { DomesticClient } from './domestic-client';

const states = DOMESTIC_NETWORK.map((s) => s.name);

export const metadata: Metadata = pageMetadata({
  title: 'Domestic Network — Launch States in India',
  // the states come from lib/network.ts, so the description stays in step with the map
  description: `Revora Healthcare serves doctors, hospitals, pharmacies, distributors and institutions in ${states.slice(0, -1).join(', ')} and ${states.at(-1)}.`,
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
