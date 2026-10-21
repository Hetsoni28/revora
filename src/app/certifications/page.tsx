import type { Metadata } from 'next';
import { breadcrumbLd, pageMetadata } from '@/lib/seo';
import { JsonLd } from '@/components/seo/json-ld';
import { Navbar } from '@/components/layout/navbar';
import { Footer } from '@/components/layout/footer';
import { CertificationsClient } from './certifications-client';

export const metadata: Metadata = pageMetadata({
  title: 'WHO-GMP Certified Eye Drop Manufacturing',
  description:
    'Revora eye drops are made in a WHO-GMP certified, EU-compliant plant at Paonta Sahib, Himachal Pradesh, under an ISO 9001:2015 quality system.',
  path: '/certifications',
  keywords: ['WHO-GMP certified eye drops', 'ISO 9001:2015 pharmaceutical', 'eye drop manufacturing plant Himachal Pradesh'],
});

const breadcrumbs = breadcrumbLd([['Home', '/'], ['About Us', '/about'], ['Certifications', '/certifications']]);

export default function CertificationsPage() {
  return (
    <div className="flex min-h-screen flex-col bg-[#F6F9FC]">
      <Navbar />
      <main id="main" tabIndex={-1} className="flex-1">
        <JsonLd data={breadcrumbs} />
        <CertificationsClient />
      </main>
      <Footer />
    </div>
  );
}
