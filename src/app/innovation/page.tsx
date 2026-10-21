import type { Metadata } from 'next';
import { Navbar } from '@/components/layout/navbar';
import { Footer } from '@/components/layout/footer';
import { InnovationClient } from './innovation-client';

export const metadata: Metadata = {
  title: 'Innovation',
  description: 'Thoughtful formulations, premium presentation and a portfolio growing into specialty healthcare products and medical devices.',
};

export default function InnovationPage() {
  return (
    <div className="flex min-h-screen flex-col bg-[#F6F9FC]">
      <Navbar />
      <main id="main" tabIndex={-1} className="flex-1">
        <InnovationClient />
      </main>
      <Footer />
    </div>
  );
}
