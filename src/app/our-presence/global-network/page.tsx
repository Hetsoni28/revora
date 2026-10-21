import type { Metadata } from 'next';
import { Navbar } from '@/components/layout/navbar';
import { Footer } from '@/components/layout/footer';
import { GlobalClient } from './global-client';

export const metadata: Metadata = {
  title: 'Global Network — International Reach',
  description:
    'Revora Healthcare global footprint and international distribution reach for ophthalmic formulations.',
};

export default function GlobalNetworkPage() {
  return (
    <div className="flex min-h-screen flex-col bg-[#F6F9FC]">
      <Navbar />
      <main id="main" tabIndex={-1} className="flex-1">
        <GlobalClient />
      </main>
      <Footer />
    </div>
  );
}
