import type { Metadata } from 'next';
import { Navbar } from '@/components/layout/navbar';
import { Footer } from '@/components/layout/footer';
import { CareersClient } from './careers-client';

export const metadata: Metadata = {
  title: 'Careers — Proud to be a Revorian',
  description:
    'Build eye-care brands with Revora Healthcare. We hire across sales, distribution, manufacturing and our Ahmedabad office — send us your CV.',
};

export default function CareersPage() {
  return (
    <div className="flex min-h-screen flex-col bg-[#F6F9FC]">
      <Navbar />
      <main id="main" tabIndex={-1} className="flex-1">
        <CareersClient />
      </main>
      <Footer />
    </div>
  );
}
