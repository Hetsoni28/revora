import type { Metadata } from 'next';
import { LandingPage } from '@/components/landing/landing-page';
import { pageMetadata } from '@/lib/seo';

export const metadata: Metadata = pageMetadata({
  title: 'Revora Healthcare | Ophthalmic Eye Drops Company, Ahmedabad',
  absoluteTitle: true,
  description:
    'Revora Healthcare is an Ahmedabad pharmaceutical company making ophthalmic eye drops for infection, inflammation and dry eye in its own WHO-GMP plant.',
  path: '/',
  keywords: ['moxifloxacin eye drops', 'sodium hyaluronate eye drops', 'carboxymethylcellulose eye drops', 'nepafenac eye drops', 'lutein zeaxanthin tablets'],
});

/* Homepage — sections live in src/components/landing. */
export default function Home() {
  return <LandingPage />;
}
