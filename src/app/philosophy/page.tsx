import type { Metadata } from 'next';
import { Navbar } from '@/components/layout/navbar';
import { Footer } from '@/components/layout/footer';
import { PhilosophyClient } from './philosophy-client';

export const metadata: Metadata = {
  title: 'Philosophy & Values — Healthcare, Beyond the Cure',
  description:
    'What “beyond the cure” means at Revora Healthcare: a promise of trust in every drop, a focus on eye care, quality in our own plant, and lasting relationships.',
};

export default function PhilosophyPage() {
  return (
    <div className="flex min-h-screen flex-col bg-[#F6F9FC]">
      <Navbar />
      <main id="main" tabIndex={-1} className="flex-1">
        <PhilosophyClient />
      </main>
      <Footer />
    </div>
  );
}
