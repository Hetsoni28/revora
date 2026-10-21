import type { Metadata } from 'next';
import { breadcrumbLd, pageMetadata } from '@/lib/seo';
import { JsonLd } from '@/components/seo/json-ld';
import { Navbar } from '@/components/layout/navbar';
import { Footer } from '@/components/layout/footer';
import { ChannelPartnerClient } from './channel-partner-client';

export const metadata: Metadata = pageMetadata({
  title: 'Channel Partner — Eye Care Distributorship',
  description:
    'Distributors, stockists and institutional suppliers: carry the Revora Healthcare ophthalmic and innovation ranges in your territory. Apply online.',
  path: '/channel-partner',
  keywords: ['pharma distributorship', 'eye drops distributor', 'pharma channel partner India'],
});

const breadcrumbs = breadcrumbLd([['Home', '/'], ['Channel Partner', '/channel-partner']]);

export default function ChannelPartnerPage() {
  return (
    <div className="flex min-h-screen flex-col bg-[#F6F9FC]">
      <Navbar />
      <main id="main" tabIndex={-1} className="flex-1">
        <JsonLd data={breadcrumbs} />
        <ChannelPartnerClient />
      </main>
      <Footer />
    </div>
  );
}
