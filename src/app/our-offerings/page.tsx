import type { Metadata } from 'next';
import { Navbar } from '@/components/layout/navbar';
import { Footer } from '@/components/layout/footer';
import { OfferingsClient } from './offerings-client';

export const metadata: Metadata = {
  title: 'Our Offerings — Ophthalmic Portfolio',
  description:
    'Explore Revora Healthcare’s ophthalmic portfolio: nine brands across anti-infectives, dry eye & lubricants, ophthalmic NSAIDs and retinal nutrition.',
};

export default function OurOfferingsPage() {
  return (
    <div className="flex min-h-screen flex-col bg-[#F6F9FC]">
      <Navbar />
      <main className="flex-1">
        <OfferingsClient />
      </main>
      <Footer />
    </div>
  );
}
