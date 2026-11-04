import type { Metadata } from 'next';
import { breadcrumbLd, pageMetadata } from '@/lib/seo';
import { JsonLd } from '@/components/seo/json-ld';
import { Navbar } from '@/components/layout/navbar';
import { Footer } from '@/components/layout/footer';
import { PhilosophyClient } from './philosophy-client';

export const metadata: Metadata = pageMetadata({
  title: 'Philosophy & Values',
  description:
    'Better vision, brighter lives. Revora Healthcare’s purpose, five guiding principles, vision for an integrated eye-care ecosystem and commitments to patients, ophthalmologists, people and communities.',
  path: '/philosophy',
  keywords: ['Revora Healthcare philosophy', 'Revora Healthcare values', 'Better Vision Brighter Lives', 'patient-centric eye care'],
});

const breadcrumbs = breadcrumbLd([['Home', '/'], ['About Us', '/about'], ['Philosophy & Values', '/philosophy']]);

export default function PhilosophyPage() {
  return (
    <div className="flex min-h-screen flex-col bg-[#F6F9FC]">
      <Navbar />
      <main id="main" tabIndex={-1} className="flex-1">
        <JsonLd data={breadcrumbs} />
        <PhilosophyClient />
      </main>
      <Footer />
    </div>
  );
}
