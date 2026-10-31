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
      updated="[Date of Going Live]"
      sections={[
        {
          heading: '1. Who we are',
          body: (
            <>
              <p>
                This website is operated by {SITE.legalName} (&ldquo;Revora&rdquo;, &ldquo;we&rdquo;, &ldquo;us&rdquo;), CIN {SITE.cin}, with
                its registered office at {address}, India.
              </p>
              <p>
                Revora is the Data Fiduciary for the personal data described in this policy. This policy explains what we collect, why we collect
                it, and the choices you have. It is written in line with the Digital Personal Data Protection Act, 2023 and the rules made under
                it, and the Information Technology Act, 2000.
              </p>
            </>
          ),
        },
        {
          heading: '2. What we collect',
          body: (
            <>
              <p>We collect only the personal data you choose to give us, and a small amount of technical data needed to run the site.</p>
              <div className="overflow-x-auto">
                <table className="mt-4 w-full border-collapse text-[14px]">
                  <thead>
                    <tr className="bg-revora-slate text-white">
                      <th className="border border-slate-300 px-4 py-2.5 text-left font-semibold">When you</th>
                      <th className="border border-slate-300 px-4 py-2.5 text-left font-semibold">We collect</th>
                    </tr>
                  </thead>
                  <tbody>
                    {[
                      ['Send a product, sample or partner enquiry', 'Name, company, city or territory, phone, email, your message'],
                      ['Send an export or manufacturing enquiry', 'Name, company, business email, country, products of interest, your message'],
                      ['Apply for a job', 'Name, email, phone, city, experience, your CV and anything you write about yourself'],
                      ['Report a side effect or product complaint', 'Your contact details, and the patient and medicine details you share (see section 5)'],
                      ['Browse the site', 'Necessary cookies only, as explained in our Cookie Policy'],
                    ].map(([when, what], i) => (
                      <tr key={i} className={i % 2 === 0 ? 'bg-white' : 'bg-slate-50'}>
                        <td className="border border-slate-200 px-4 py-2.5">{when}</td>
                        <td className="border border-slate-200 px-4 py-2.5">{what}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              <p className="mt-4">
                We do not ask for, and you should not send us, passwords, bank details, card numbers or government ID numbers through this website.
              </p>
            </>
          ),
        },
        {
          heading: '3. Why we use it',
          body: (
            <ul>
              <li>To reply to your enquiry and follow up on it.</li>
              <li>To appoint and manage distributors, stockists and business partners.</li>
              <li>To consider your job application.</li>
              <li>
                To record, assess and report adverse drug reactions and product quality complaints, as the law requires of pharmaceutical companies.
              </li>
              <li>To keep the website secure and working.</li>
              <li>To meet our legal and regulatory duties.</li>
            </ul>
          ),
        },
        {
          heading: '4. Your consent',
          body: (
            <p>
              By submitting a form on this website, you consent to us using the details you provide for the purpose of that form. You can withdraw
              your consent at any time by writing to the Grievance Officer (section 10). Withdrawal does not affect what we did before it, and we
              may still keep records the law requires us to keep.
            </p>
          ),
        },
        {
          heading: '5. Health information in safety reports',
          body: (
            <p>
              If you report a side effect or a product complaint, you may share health details about yourself or a patient. We use this information
              only to assess the report and to meet our pharmacovigilance duties. We may share it, in a form that does not identify the patient
              wherever possible, with the Pharmacovigilance Programme of India (PvPI), the Central Drugs Standard Control Organisation (CDSCO),
              State Licensing Authorities and the product&apos;s manufacturer. Safety records are kept for as long as drug safety law requires,
              even if other data is deleted.
            </p>
          ),
        },
        {
          heading: '6. Who we share it with',
          body: (
            <>
              <p>We share personal data only when needed, and only with:</p>
              <ul>
                <li>Our employees who handle your enquiry, application or report.</li>
                <li>
                  Service providers who host this website and run our email, under contracts that require them to protect your data.
                </li>
                <li>Regulators and authorities, when the law requires it.</li>
                <li>Our manufacturing partners, for product quality complaints about their products.</li>
              </ul>
              <p>
                Some service providers may store data on servers outside India. When this happens, we only transfer data as permitted under Indian
                law.
              </p>
            </>
          ),
        },
        {
          heading: '7. How long we keep it',
          body: (
            <>
              <div className="overflow-x-auto">
                <table className="mt-1 w-full border-collapse text-[14px]">
                  <thead>
                    <tr className="bg-revora-slate text-white">
                      <th className="border border-slate-300 px-4 py-2.5 text-left font-semibold">Data</th>
                      <th className="border border-slate-300 px-4 py-2.5 text-left font-semibold">Kept for</th>
                    </tr>
                  </thead>
                  <tbody>
                    {[
                      ['Business enquiries', 'Up to 3 years after our last contact, unless a business relationship follows'],
                      ['Job applications', 'Up to 1 year, unless you join us'],
                      ['Safety and complaint reports', 'As long as drug safety regulations require'],
                      ['Cookie choice', '6 months'],
                    ].map(([data, kept], i) => (
                      <tr key={i} className={i % 2 === 0 ? 'bg-white' : 'bg-slate-50'}>
                        <td className="border border-slate-200 px-4 py-2.5">{data}</td>
                        <td className="border border-slate-200 px-4 py-2.5">{kept}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              <p className="mt-3">After this, we delete or anonymise the data.</p>
            </>
          ),
        },
        {
          heading: '8. How we protect it',
          body: (
            <p>
              We use reasonable security practices, including encrypted connections (HTTPS), restricted access for staff, and trusted hosting
              providers. No system is fully secure. If a personal data breach affects you, we will inform you and the authorities as the law
              requires.
            </p>
          ),
        },
        {
          heading: '9. Your rights',
          body: (
            <>
              <p>Under Indian law, you can:</p>
              <ul>
                <li>Ask what personal data we hold about you.</li>
                <li>Ask us to correct, complete or update it.</li>
                <li>Ask us to erase it, where we are not required to keep it.</li>
                <li>Withdraw your consent.</li>
                <li>Nominate another person to exercise these rights for you.</li>
                <li>Raise a grievance with us, and then with the Data Protection Board of India if you are not satisfied.</li>
              </ul>
              <p>To use any of these rights, write to the Grievance Officer. We will reply within 30 days.</p>
            </>
          ),
        },
        {
          heading: '10. Grievance Officer',
          body: (
            <address className="not-italic">
              <p>
                <b>[Grievance Officer Name]</b>, Grievance Officer
                <br />
                {SITE.legalName}
                <br />
                {address}, India
                <br />
                Email:{' '}
                <a href="mailto:privacy@revorahealthcare.com">privacy@revorahealthcare.com</a>
                <br />
                Phone: <a href="tel:+918866644642">+91 88666 44642</a>
              </p>
            </address>
          ),
        },
        {
          heading: '11. Children',
          body: (
            <p>
              This website is meant for healthcare professionals, business partners and adults. We do not knowingly collect personal data from
              anyone under 18. A parent or guardian may report a side effect on behalf of a child.
            </p>
          ),
        },
        {
          heading: '12. Links to other websites',
          body: (
            <p>
              This site may link to other websites, such as government safety portals. Their privacy practices are their own, and this policy does
              not cover them.
            </p>
          ),
        },
        {
          heading: '13. Changes to this policy',
          body: (
            <>
              <p>
                We may update this policy from time to time. The &ldquo;Last updated&rdquo; date at the top shows the latest version. Significant
                changes will be shown on this page.
              </p>
              <p>
                See also our{' '}
                <Link href="/cookie-policy">Cookie Policy</Link>{' '}
                and{' '}
                <Link href="/pharmacovigilance-policy">Pharmacovigilance Policy</Link>.
              </p>
            </>
          ),
        },
      ]}
    />
  );
}
