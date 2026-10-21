import type { Metadata } from 'next';
import { breadcrumbLd, pageMetadata } from '@/lib/seo';
import { JsonLd } from '@/components/seo/json-ld';
import { Navbar } from '@/components/layout/navbar';
import { Footer } from '@/components/layout/footer';
import { ProfileClient } from './profile-client';

export const metadata: Metadata = pageMetadata({
  title: 'Company Profile & Product Portfolio',
  description:
    'Revora Healthcare Private Limited at a glance: CIN U21000GJ2026PTC174674, registered office in Ahmedabad, WHO-GMP manufacturing and the full product list.',
  path: '/profile',
  keywords: ['Revora Healthcare company profile', 'Revora Healthcare CIN', 'ophthalmic product list'],
});

const breadcrumbs = breadcrumbLd([['Home', '/'], ['About Us', '/about'], ['Profile', '/profile']]);

export default function ProfilePage() {
  return (
    <div className="flex min-h-screen flex-col bg-[#F6F9FC]">
      <Navbar />
      <main id="main" tabIndex={-1} className="flex-1">
        <JsonLd data={breadcrumbs} />
        <ProfileClient />
      </main>
      <Footer />
    </div>
  );
}
