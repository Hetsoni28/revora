import type { Metadata } from 'next';
import { pageMetadata, SITE } from '@/lib/seo';
import { LegalPage } from '@/components/layout/legal-page';

export const metadata: Metadata = pageMetadata({
  title: 'Pharmacovigilance Policy',
  description: 'How to report a side effect or product quality issue with a Revora Healthcare product, and how our Drug Safety Team handles each report.',
  path: '/pharmacovigilance-policy',
});

const SAFETY = 'safety@revorahealthcare.com';

export default function PharmacovigilancePolicyPage() {
  return (
    <LegalPage
      title="Pharmacovigilance Policy"
      path="/pharmacovigilance-policy"
      updated="31 October 2026"
      sections={[
        {
          heading: 'Our commitment',
          body: <p>Patient safety comes first. We monitor the safety of our products and act on every report of a side effect or quality issue.</p>,
        },
        {
          heading: 'How to report',
          body: (
            <p>
              Write to our Drug Safety Team at <a href={`mailto:${SAFETY}?subject=Adverse%20drug%20reaction%20report`}>{SAFETY}</a> or call{' '}
              <a href={SITE.phone.href}>{SITE.phone.label}</a>. Patients, doctors, pharmacists and partners can all report.
            </p>
          ),
        },
        {
          heading: 'What to include',
          body: (
            <ul>
              <li>The product name and, if possible, the batch number and expiry date.</li>
              <li>What happened, and when.</li>
              <li>Age and sex of the patient (no name needed), and other medicines being taken.</li>
              <li>Your contact details, so we can follow up if needed.</li>
            </ul>
          ),
        },
        {
          heading: 'What happens next',
          body: (
            <p>
              Every report is recorded and assessed by our Drug Safety Team, kept confidential, and shared with regulatory authorities where the law
              requires it. You can also report directly to the Pharmacovigilance Programme of India (PvPI).
            </p>
          ),
        },
      ]}
    />
  );
}
