import type { Metadata } from 'next';
import { Navbar } from '@/components/layout/navbar';
import { Footer } from '@/components/layout/footer';
import { ChannelPartnerClient } from './channel-partner-client';

export const metadata: Metadata = {
  title: 'Channel Partner',
  description: 'Become a Revora Healthcare channel partner — bring nine ophthalmic brands, made in our own WHO-GMP plant, to your territory.',
};

export default function ChannelPartnerPage() {
  return (
    <div className="flex min-h-screen flex-col bg-[#F6F9FC]">
      <Navbar />
      <main className="flex-1">
        <ChannelPartnerClient />
      </main>
      <Footer />
    </div>
  );
}
