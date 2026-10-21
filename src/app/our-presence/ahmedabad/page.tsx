import type { Metadata } from 'next';
import { Navbar } from '@/components/layout/navbar';
import { Footer } from '@/components/layout/footer';
import { AhmedabadClient } from './ahmedabad-client';

export const metadata: Metadata = {
  title: 'Ahmedabad Headquarters',
  description:
    'Revora Healthcare’s registered and corporate office: 3rd Floor, S.G. Business Hub, A/303, Sarkhej–Gandhinagar Highway, near Gota Overbridge, Ognaj, Ahmedabad, Gujarat 380060.',
};

export default function AhmedabadPage() {
  return (
    <div className="flex min-h-screen flex-col bg-[#F6F9FC]">
      <Navbar />
      <main id="main" tabIndex={-1} className="flex-1">
        <AhmedabadClient />
      </main>
      <Footer />
    </div>
  );
}
