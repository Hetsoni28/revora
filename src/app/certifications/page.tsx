import type { Metadata } from 'next';
import { Navbar } from '@/components/layout/navbar';
import { Footer } from '@/components/layout/footer';
import { CertificationsClient } from './certifications-client';

export const metadata: Metadata = {
  title: 'Certifications & Quality',
  description:
    'Revora eye drops are made in our own WHO-GMP certified, EU-compliant plant at Paonta Sahib, Himachal Pradesh. Certificate copies are available on request.',
};

export default function CertificationsPage() {
  return (
    <div className="flex min-h-screen flex-col bg-[#F6F9FC]">
      <Navbar />
      <main id="main" tabIndex={-1} className="flex-1">
        <CertificationsClient />
      </main>
      <Footer />
    </div>
  );
}
