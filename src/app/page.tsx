import type { Metadata } from 'next';
import { LandingPage } from '@/components/landing/landing-page';
import { pageMetadata } from '@/lib/seo';

export const metadata: Metadata = pageMetadata({
  title: 'Revora Healthcare | Pharmaceutical Company in Ahmedabad',
  absoluteTitle: true,
  description:
    'Revora Healthcare is an Ahmedabad pharmaceutical company: specialty brands in ophthalmology and orthopaedics, WHO-GMP manufacturing for partners, and exports.',
  path: '/',
  keywords: ['moxifloxacin eye drops', 'sodium hyaluronate eye drops', 'carboxymethylcellulose eye drops', 'nepafenac eye drops', 'lutein zeaxanthin tablets'],
});

/* Homepage — sections live in src/components/landing. */
export default function Home() {
  return <LandingPage />;
}
