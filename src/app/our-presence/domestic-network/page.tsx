import type { Metadata } from 'next';
import { Navbar } from '@/components/layout/navbar';
import { Footer } from '@/components/layout/footer';
import { DomesticClient } from './domestic-client';

export const metadata: Metadata = {
  title: 'Domestic Network — Serving India',
  description:
    'How Revora Healthcare serves doctors, hospitals, pharmacies and distributors across India — and how to become a distribution partner.',
};

export default function DomesticNetworkPage() {
  return (
    <div className="flex min-h-screen flex-col bg-[#F6F9FC]">
      <Navbar />
      <main className="flex-1">
        <DomesticClient />
      </main>
      <Footer />
    </div>
  );
}
