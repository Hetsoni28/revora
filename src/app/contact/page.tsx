import type { Metadata } from 'next';
import { breadcrumbLd, pageMetadata } from '@/lib/seo';
import { JsonLd } from '@/components/seo/json-ld';
import { Navbar } from '@/components/layout/navbar';
import { Footer } from '@/components/layout/footer';
import { ContactClient } from './contact-client';

export const metadata: Metadata = pageMetadata({
  title: 'Contact Us — Revora Healthcare, Ahmedabad',
  description:
    'Contact Revora Healthcare in Ahmedabad: product and sales enquiries, distributorship, exports and drug safety. Email us or send a message online.',
  path: '/contact',
  keywords: ['Revora Healthcare contact', 'ophthalmic pharma company Ahmedabad', 'eye drops distributor enquiry'],
});

const breadcrumbs = breadcrumbLd([['Home', '/'], ['Contact Us', '/contact']]);

export default function ContactPage() {
  return (
    <div className="flex min-h-screen flex-col bg-[#F6F9FC]">
      <Navbar />
      <main id="main" tabIndex={-1} className="flex-1">
        <JsonLd data={breadcrumbs} />
        <ContactClient />
      </main>
      <Footer />
    </div>
  );
}
