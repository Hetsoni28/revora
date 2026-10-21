import type { Metadata } from 'next';
import { breadcrumbLd, pageMetadata } from '@/lib/seo';
import { JsonLd } from '@/components/seo/json-ld';
import { Navbar } from '@/components/layout/navbar';
import { Footer } from '@/components/layout/footer';
import { PresenceClient } from './presence-client';

export const metadata: Metadata = pageMetadata({
  title: 'Our Presence — Ahmedabad & Eye Drop Plant',
  description:
    'Revora Healthcare runs from its Ahmedabad head office and makes eye drops at its WHO-GMP plant in Paonta Sahib, supplying doctors and pharmacies across India.',
  path: '/our-presence',
  keywords: ['eye drop plant Paonta Sahib', 'pharma company Ahmedabad office'],
});

const breadcrumbs = breadcrumbLd([['Home', '/'], ['Our Presence', '/our-presence']]);

export default function OurPresencePage() {
  return (
    <div className="flex min-h-screen flex-col bg-[#F6F9FC]">
      <Navbar />
      <main id="main" tabIndex={-1} className="flex-1">
        <JsonLd data={breadcrumbs} />
        <PresenceClient />
      </main>
      <Footer />
    </div>
  );
}
