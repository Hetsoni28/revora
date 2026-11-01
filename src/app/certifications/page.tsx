import type { Metadata } from 'next';
import { breadcrumbLd, pageMetadata } from '@/lib/seo';
import { JsonLd } from '@/components/seo/json-ld';
import { Navbar } from '@/components/layout/navbar';
import { Footer } from '@/components/layout/footer';
import { CertificationsClient } from './certifications-client';

export const metadata: Metadata = pageMetadata({
  title: 'WHO-GMP Manufacturing & Quality',
  description:
    'Revora products are made in a WHO-GMP certified facility in Paonta Sahib, H.P., released by an in-house QC lab.',
  path: '/certifications',
  keywords: ['WHO-GMP eye drops', 'eye drop manufacturing Himachal Pradesh', 'WHO-GMP certified pharma company Gujarat'],
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
