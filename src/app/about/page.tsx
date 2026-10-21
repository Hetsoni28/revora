import type { Metadata } from 'next';
import { breadcrumbLd, pageMetadata } from '@/lib/seo';
import { JsonLd } from '@/components/seo/json-ld';
import { Navbar } from '@/components/layout/navbar';
import { Footer } from '@/components/layout/footer';
import { AboutClient } from './about-client';

export const metadata: Metadata = pageMetadata({
  title: 'About Us — Ophthalmic Pharma Company',
  description:
    'Revora Healthcare, founded in Ahmedabad in 2026, makes ophthalmic eye drops and eye-care nutrition and is growing into specialty healthcare and medical devices.',
  path: '/about',
  keywords: ['about Revora Healthcare', 'ophthalmic company Ahmedabad', 'eye care company Gujarat'],
});

const breadcrumbs = breadcrumbLd([['Home', '/'], ['About Us', '/about']]);

export default function AboutPage() {
  return (
    <div className="flex min-h-screen flex-col bg-[#F6F9FC]">
      <Navbar />
      <main id="main" tabIndex={-1} className="flex-1">
        <JsonLd data={breadcrumbs} />
        <AboutClient />
      </main>
      <Footer />
    </div>
  );
}
