import type { Metadata } from 'next';
import { breadcrumbLd, pageMetadata } from '@/lib/seo';
import { JsonLd } from '@/components/seo/json-ld';
import { Navbar } from '@/components/layout/navbar';
import { Footer } from '@/components/layout/footer';
import { ManufacturingClient } from './manufacturing-client';

export const metadata: Metadata = pageMetadata({
  title: 'Manufacturing & CDMO — WHO-GMP Third-Party Manufacturing',
  description:
    'Third-party and contract manufacturing of eye drops, ointments, nasal sprays and tablets at a WHO-GMP certified facility, with in-house QC. Send an enquiry.',
  path: '/manufacturing',
  keywords: ['third party manufacturing eye drops', 'pharma contract manufacturing India', 'WHO-GMP CDMO', 'nasal spray manufacturer', 'ophthalmic ointment manufacturer'],
});

const breadcrumbs = breadcrumbLd([['Home', '/'], ['Manufacturing & CDMO', '/manufacturing']]);

export default function ManufacturingPage() {
  return (
    <div className="flex min-h-screen flex-col bg-[#F6F9FC]">
      <Navbar />
      <main id="main" tabIndex={-1} className="flex-1">
        <JsonLd data={breadcrumbs} />
        <ManufacturingClient />
      </main>
      <Footer />
    </div>
  );
}
