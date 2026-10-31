import type { Metadata } from 'next';
import { breadcrumbLd, pageMetadata } from '@/lib/seo';
import { JsonLd } from '@/components/seo/json-ld';
import { Navbar } from '@/components/layout/navbar';
import { Footer } from '@/components/layout/footer';
import { CareersClient } from './careers-client';

export const metadata: Metadata = pageMetadata({
  title: 'Careers — Pharma Jobs in Ahmedabad',
  description:
    'Join Revora Healthcare: sales & marketing, manufacturing & QA/QC, export, medical & regulatory and accounts roles. Send us your CV.',
  path: '/careers',
  keywords: ['pharma jobs Ahmedabad', 'medical representative jobs', 'pharmaceutical careers Gujarat'],
});

const breadcrumbs = breadcrumbLd([['Home', '/'], ['Careers', '/careers']]);

export default function CareersPage() {
  return (
    <div className="flex min-h-screen flex-col bg-[#F6F9FC]">
      <Navbar />
      <main id="main" tabIndex={-1} className="flex-1">
        <JsonLd data={breadcrumbs} />
        <CareersClient />
      </main>
      <Footer />
    </div>
  );
}
