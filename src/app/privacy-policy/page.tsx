import type { Metadata } from 'next';
import Link from 'next/link';
import { pageMetadata, SITE } from '@/lib/seo';
import { LegalPage } from '@/components/layout/legal-page';

export const metadata: Metadata = pageMetadata({
  title: 'Privacy Policy',
  description: 'How Revora Healthcare collects, uses and protects the personal information you share through this website, and how to contact us about it.',
  path: '/privacy-policy',
});

const address = `${SITE.address.streetAddress}, ${SITE.address.addressLocality}, ${SITE.address.addressRegion} ${SITE.address.postalCode}`;

export default function PrivacyPolicyPage() {
  return (
    <LegalPage
      title="Privacy Policy"
      path="/privacy-policy"
      updated="31 October 2026"
      sections={[
        {
          heading: 'Who we are',
          body: (
            <p>
              {SITE.legalName} (CIN {SITE.cin}), {address}. For any question about your information, write to{' '}
              <a href={`mailto:${SITE.email}`}>{SITE.email}</a>.
            </p>
          ),
        },
        {
          heading: 'What we collect',
          body: (
            <ul>
              <li>Details you send through our forms: name, email, phone, organisation, city or country, your message and, for job applications, your CV.</li>
              <li>Reports of side effects or product quality issues sent to our Drug Safety Team.</li>
              <li>The cookies described in our <Link href="/cookie-policy">Cookie Policy</Link>.</li>
            </ul>
          ),
        },
        {
          heading: 'How we use it',
          body: (
            <ul>
              <li>To answer your enquiry, send samples or literature, and follow up on partnership, manufacturing or export requests.</li>
              <li>To consider job applications.</li>
              <li>To handle safety reports as pharmacovigilance rules require.</li>
            </ul>
          ),
        },
        {
          heading: 'Who we share it with',
          body: (
            <p>
              We do not sell your information. It is shared only with the services that run this website and our email, and with regulatory
              authorities where the law requires it (for example, safety reports).
            </p>
          ),
        },
        {
          heading: 'How long we keep it',
          body: <p>Only as long as needed for the purpose you shared it for, or as long as the law requires.</p>,
        },
        {
          heading: 'Your choices',
          body: (
            <p>
              You can ask to see, correct or delete the information we hold about you by writing to <a href={`mailto:${SITE.email}`}>{SITE.email}</a>.
            </p>
          ),
        },
      ]}
    />
  );
}
