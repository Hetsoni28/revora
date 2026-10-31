import type { Metadata } from 'next';
import { pageMetadata, SITE } from '@/lib/seo';
import { LegalPage } from '@/components/layout/legal-page';

export const metadata: Metadata = pageMetadata({
  title: 'Terms of Use',
  description: 'The terms that apply when you use the Revora Healthcare website, including medical information, intellectual property and governing law.',
  path: '/terms-of-use',
});

export default function TermsOfUsePage() {
  return (
    <LegalPage
      title="Terms of Use"
      path="/terms-of-use"
      updated="31 October 2026"
      sections={[
        {
          heading: 'About this website',
          body: <p>This website is run by {SITE.legalName}. By using it, you agree to these terms.</p>,
        },
        {
          heading: 'Medical information',
          body: (
            <p>
              Product information on this site is intended for registered medical practitioners and healthcare professionals. It is not medical
              advice and does not replace a consultation with a doctor. Prescription medicines must only be used as prescribed.
            </p>
          ),
        },
        {
          heading: 'Accuracy',
          body: <p>We work to keep the information accurate and up to date, but it may change without notice. The approved product label and pack insert always take precedence.</p>,
        },
        {
          heading: 'Trademarks and content',
          body: (
            <p>
              Brand names, logos and content on this site belong to {SITE.legalName} or to their respective owners, and may not be copied or used
              without written permission.
            </p>
          ),
        },
        {
          heading: 'Links to other websites',
          body: <p>Links to other websites are provided for convenience. We are not responsible for their content.</p>,
        },
        {
          heading: 'Governing law',
          body: <p>These terms are governed by the laws of India. Courts in Ahmedabad, Gujarat have jurisdiction.</p>,
        },
        {
          heading: 'Contact',
          body: (
            <p>
              Questions about these terms: <a href={`mailto:${SITE.email}`}>{SITE.email}</a>.
            </p>
          ),
        },
      ]}
    />
  );
}
