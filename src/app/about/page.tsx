import type { Metadata } from 'next';
import { Navbar } from '@/components/layout/navbar';
import { Footer } from '@/components/layout/footer';
import { AboutClient } from './about-client';

export const metadata: Metadata = {
  title: 'About Us — Ophthalmic Pharmaceuticals, Ahmedabad',
  description:
    'Revora Healthcare Private Limited is a pharmaceutical company in Ahmedabad, Gujarat, specialising in ophthalmic pharmaceuticals and expanding into specialty healthcare products and medical devices.',
};

export default function AboutPage() {
  return (
    <div className="flex min-h-screen flex-col bg-[#F6F9FC]">
      <Navbar />
      <main className="flex-1">
        <AboutClient />
      </main>
      <Footer />
    </div>
  );
}
