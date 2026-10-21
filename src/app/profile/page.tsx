import type { Metadata } from 'next';
import { Navbar } from '@/components/layout/navbar';
import { Footer } from '@/components/layout/footer';
import { ProfileClient } from './profile-client';

export const metadata: Metadata = {
  title: 'Company Profile',
  description:
    'Revora Healthcare Private Limited at a glance — company details, lines of business and the full product portfolio.',
};

export default function ProfilePage() {
  return (
    <div className="flex min-h-screen flex-col bg-[#F6F9FC]">
      <Navbar />
      <main className="flex-1">
        <ProfileClient />
      </main>
      <Footer />
    </div>
  );
}
