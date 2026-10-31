import type { Metadata } from 'next';
import { breadcrumbLd, pageMetadata } from '@/lib/seo';
import { JsonLd } from '@/components/seo/json-ld';
import { Navbar } from '@/components/layout/navbar';
import { Footer } from '@/components/layout/footer';
import { AboutClient } from './about-client';

export const metadata: Metadata = pageMetadata({
  title: 'About Us — New Name, Proven Experience',
  description:
    'Revora Healthcare, incorporated in Ahmedabad in 2026, brings 15+ years of pharmaceutical leadership: specialty brands, WHO-GMP manufacturing and export.',
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
