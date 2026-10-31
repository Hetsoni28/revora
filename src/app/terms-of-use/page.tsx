import type { Metadata } from 'next';
import Link from 'next/link';
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
      updated="[Date of Going Live]"
      sections={[
        {
          heading: '1. Accepting these terms',
          body: (
            <p>
              This website is owned and operated by {SITE.legalName} (&ldquo;Revora&rdquo;, &ldquo;we&rdquo;, &ldquo;us&rdquo;). By using it,
              you agree to these Terms of Use and to our{' '}
              <Link href="/privacy-policy">Privacy Policy</Link> and{' '}
              <Link href="/cookie-policy">Cookie Policy</Link>. If you do not agree, please do not use the website.
            </p>
          ),
        },
        {
          heading: '2. Who this website is for',
          body: (
            <p>
              The product and medical information on this website is intended for registered medical practitioners, healthcare professionals, and
              authorised trade and business partners in India. Some pages ask you to confirm that you are a healthcare professional before you
              continue. By confirming, you accept that the information is meant for professional use.
            </p>
          ),
        },
        {
          heading: '3. Not medical advice',
          body: (
            <>
              <p>
                Information on this website is for general and educational purposes only. It is not a diagnosis, a prescription or a recommendation
                for treatment, and it does not replace the advice of a qualified doctor.
              </p>
              <ul>
                <li>
                  Prescription medicines must be used only on the advice and prescription of a registered medical practitioner.
                </li>
                <li>Always read the label and package insert before using any product.</li>
                <li>In a medical emergency, contact a doctor or the nearest hospital immediately.</li>
              </ul>
            </>
          ),
        },
        {
          heading: '4. Product information',
          body: (
            <>
              <p>
                We take care to keep product information accurate and up to date. However, compositions, pack sizes, indications and availability
                may change. The approved label and package insert of the product always take priority over this website.
              </p>
              <p>
                Products shown here are subject to regulatory approval and may not be available in every state or country. Showing a product here
                is not an offer to sell it where it is not approved.
              </p>
            </>
          ),
        },
        {
          heading: '5. Products made or supplied by partners',
          body: (
            <p>
              Some products on this website are manufactured by partner companies and marketed or distributed by Revora. The manufacturer&apos;s
              name is shown on the product label. Trademarks belonging to other companies are used only to identify their products.
            </p>
          ),
        },
        {
          heading: '6. Business enquiries are not contracts',
          body: (
            <p>
              Submitting an enquiry for distribution, manufacturing, export or bulk supply does not create an agreement. Any business relationship
              is formed only through a separate written agreement signed by both parties. Prices, terms and territories are confirmed only in
              writing.
            </p>
          ),
        },
        {
          heading: '7. Intellectual property',
          body: (
            <>
              <p>
                The Revora name, logo, brand names (including MOXORA, REHYNATE, TREHYNATE, RevoFresh, RevoGel, REVONAC CS and REVOPT), packaging
                designs, text, images and design of this website belong to {SITE.legalName} or its licensors.
              </p>
              <p>
                You may view and print pages for your own personal or professional use. You may not copy, change, publish or use any of this
                content for commercial purposes without our written permission.
              </p>
            </>
          ),
        },
        {
          heading: '8. Acceptable use',
          body: (
            <>
              <p>When you use this website, you agree not to:</p>
              <ul>
                <li>Submit false information or pretend to be someone else.</li>
                <li>Try to gain unauthorised access to the website or its systems.</li>
                <li>Upload viruses or harmful code, or disrupt the website.</li>
                <li>Copy content in bulk, or use automated tools to collect data from the site.</li>
                <li>Use the website in any way that breaks Indian law or applicable regulations.</li>
              </ul>
            </>
          ),
        },
        {
          heading: '9. Limitation of liability',
          body: (
            <>
              <p>
                To the extent permitted by law, {SITE.legalName} is not liable for any loss or damage arising from your use of this website or
                reliance on its content. This includes indirect, consequential or economic loss.
              </p>
              <p>
                We are not responsible for the content of external websites linked from this site, or for any outage, interruption or error on
                this website.
              </p>
            </>
          ),
        },
        {
          heading: '10. Pharmacovigilance',
          body: (
            <p>
              If you have a side effect or product quality issue to report, please use the{' '}
              <Link href="/pharmacovigilance-policy">Pharmacovigilance Policy</Link> page or email{' '}
              <a href="mailto:safety@revorahealthcare.com">safety@revorahealthcare.com</a>. Do not rely on these Terms of Use as a substitute for
              reporting a safety concern.
            </p>
          ),
        },
        {
          heading: '11. Privacy',
          body: (
            <p>
              Your use of this website is also governed by our{' '}
              <Link href="/privacy-policy">Privacy Policy</Link>, which is part of these terms.
            </p>
          ),
        },
        {
          heading: '12. Links to other websites',
          body: (
            <p>
              Links to other websites are provided for convenience only. We are not responsible for their content, accuracy or privacy practices.
            </p>
          ),
        },
        {
          heading: '13. Changes to these terms',
          body: (
            <p>
              We may update these terms at any time. The &ldquo;Last updated&rdquo; date shows the most recent version. Continued use of the
              website after a change means you accept the updated terms.
            </p>
          ),
        },
        {
          heading: '14. Governing law',
          body: (
            <>
              <p>
                These Terms of Use are governed by the laws of India. Any dispute arising from your use of this website will be subject to the
                exclusive jurisdiction of the courts of Ahmedabad, Gujarat.
              </p>
              <p>
                Questions about these terms:{' '}
                <a href={`mailto:${SITE.email}`}>{SITE.email}</a>.
              </p>
            </>
          ),
        },
      ]}
    />
  );
}
