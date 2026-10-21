import type { Metadata } from 'next';
import { Navbar } from '@/components/layout/navbar';
import { Footer } from '@/components/layout/footer';
import { PresenceClient } from './presence-client';

export const metadata: Metadata = {
  title: 'Our Presence — Ahmedabad & Across India',
  description:
    'Revora Healthcare is headquartered at S.G. Business Hub, Ahmedabad, with a dedicated WHO-GMP eye-drop plant in Paonta Sahib — serving doctors, hospitals, pharmacies and distributors across India.',
};

export default function OurPresencePage() {
  return (
    <div className="flex min-h-screen flex-col bg-[#F6F9FC]">
      <Navbar />
      <main id="main" tabIndex={-1} className="flex-1">
        <PresenceClient />
      </main>
      <Footer />
    </div>
  );
}
