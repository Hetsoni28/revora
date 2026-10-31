import type { Metadata } from 'next';
import Link from 'next/link';
import { pageMetadata, SITE } from '@/lib/seo';
import { LegalPage } from '@/components/layout/legal-page';
import { AdrForm } from '@/components/legal/adr-form';

export const metadata: Metadata = pageMetadata({
  title: 'Pharmacovigilance Policy',
  description: 'How to report a side effect or product quality issue with a Revora Healthcare product, and how our Drug Safety Team handles each report.',
  path: '/pharmacovigilance-policy',
});

const SAFETY = 'safety@revorahealthcare.com';
const SAFETY_PHONE = '+91 88666 44642';
const SAFETY_PHONE_HREF = 'tel:+918866644642';

export default function PharmacovigilancePolicyPage() {
  return (
    <LegalPage
      title="Pharmacovigilance Policy"
      path="/pharmacovigilance-policy"
      updated="[Date of Going Live]"
      sections={[
        {
          heading: '1. Our commitment to patient safety',
          body: (
            <>
              <p>
                {SITE.legalName} is committed to patient safety and the quality of its products. We monitor the safety of every product we
                market, and we take every report of a suspected adverse drug reaction (ADR) or product quality issue seriously.
              </p>
              <p>
                This policy explains how we collect, handle and report safety information, and how you can report a side effect or quality
                concern to us.
              </p>
            </>
          ),
        },
        {
          heading: '2. What is pharmacovigilance?',
          body: (
            <>
              <p>
                Pharmacovigilance is the science and activity of detecting, assessing, understanding and preventing adverse effects or any other
                medicine-related problems. All pharmaceutical companies licensed in India are required by the Drugs and Cosmetics Act, 1940 (and
                Schedule Y and the Pharmacovigilance Programme of India) to monitor the safety of their products and report adverse events to the
                Central Drugs Standard Control Organisation (CDSCO).
              </p>
              <p>We go beyond the legal minimum — our Drug Safety Team actively reviews every report, whether serious or non-serious.</p>
            </>
          ),
        },
        {
          heading: '3. Who can report',
          body: (
            <>
              <p>Anyone can report a suspected side effect or product quality issue:</p>
              <ul>
                <li>Patients and carers</li>
                <li>Doctors, ophthalmologists, orthopaedic surgeons and other medical practitioners</li>
                <li>Pharmacists and chemists</li>
                <li>Nurses and other healthcare professionals</li>
                <li>Distributors, stockists and channel partners</li>
              </ul>
              <p>
                You do not need to be certain that the product caused the problem. If you suspect a link, please report it. No report is too
                small.
              </p>
            </>
          ),
        },
        {
          heading: '4. How to contact our Drug Safety Team',
          body: (
            <>
              <p>
                <b>Email:</b>{' '}
                <a href={`mailto:${SAFETY}?subject=Adverse%20drug%20reaction%20report`}>{SAFETY}</a>
                <br />
                <b>Phone:</b>{' '}
                <a href={SAFETY_PHONE_HREF}>{SAFETY_PHONE}</a>
                <br />
                <b>Hours:</b> [Monday to Saturday, 10 am to 6 pm IST]
              </p>
              <p>
                <b>Postal / in-person:</b>
                <br />
                Drug Safety Team — Pharmacovigilance
                <br />
                {SITE.legalName}
                <br />
                {SITE.address.streetAddress}, {SITE.address.addressLocality}, {SITE.address.addressRegion} {SITE.address.postalCode}, India
              </p>
              <p>
                You can also report directly to the{' '}
                <a href="https://pvpi.nic.in/" target="_blank" rel="noopener noreferrer">
                  Pharmacovigilance Programme of India (PvPI)
                </a>{' '}
                at the national coordination centre, IPC Ghaziabad. PvPI national helpline:{' '}
                <a href="tel:18001804722">1800-180-4722</a> (toll free).
              </p>
            </>
          ),
        },
        {
          heading: '5. What to include in a report',
          body: (
            <>
              <p>
                The more detail you can provide, the better we can assess the report. Even a partial report is valuable — please do not let
                missing information stop you from reporting.
              </p>
              <p>Useful information includes:</p>
              <ul>
                <li>The product name, batch number and expiry date (printed on the pack or carton).</li>
                <li>A description of what happened and when it started.</li>
                <li>The patient&apos;s initials or &ldquo;anonymous&rdquo; (no full name is needed), age, and gender.</li>
                <li>Any other medicines the patient was taking at the same time.</li>
                <li>The indication the product was being used for, and the dose.</li>
                <li>What action was taken (e.g. product stopped, dose reduced) and the current outcome.</li>
                <li>Your contact details, so we can follow up if needed.</li>
              </ul>
            </>
          ),
        },
        {
          heading: '6. What happens after you report',
          body: (
            <ul>
              <li>
                <b>Acknowledgement:</b> We acknowledge every report within 5 working days.
              </li>
              <li>
                <b>Assessment:</b> Our Drug Safety Team assesses the report for causality, seriousness and expectedness, using established
                pharmacovigilance methods.
              </li>
              <li>
                <b>Follow-up:</b> We may contact you for additional information. You are under no obligation to provide it.
              </li>
              <li>
                <b>Regulatory reporting:</b> Serious and unexpected adverse events are reported to CDSCO within the timeframes set by Indian
                pharmacovigilance regulations. All ADR reports are forwarded to PvPI as required.
              </li>
              <li>
                <b>Signal detection:</b> We review reports in aggregate over time to detect any new safety signals and, where necessary, update
                product labelling or take other risk-minimisation measures.
              </li>
              <li>
                <b>Confidentiality:</b> Your identity and the patient&apos;s identity are kept confidential. Patient data shared with regulators
                is de-identified wherever possible.
              </li>
            </ul>
          ),
        },
        {
          heading: '7. Product quality complaints',
          body: (
            <>
              <p>
                If you notice a product quality issue — such as a foreign particle, incorrect colour, broken seal, suspected counterfeit, or any
                change in appearance — please report it to our Drug Safety Team using the same contact details in section 4.
              </p>
              <p>Please keep the original pack and do not destroy it, as it may be needed for investigation.</p>
            </>
          ),
        },
        {
          heading: '8. How we handle your personal data',
          body: (
            <p>
              Safety reports contain personal and health information. We handle it in accordance with our{' '}
              <Link href="/privacy-policy">Privacy Policy</Link>. Safety records are retained for as long as drug safety regulations require,
              even if you subsequently ask us to delete other information about you.
            </p>
          ),
        },
        {
          heading: '9. Our regulatory obligations',
          body: (
            <>
              <p>As a licensed pharmaceutical company in India, we are obligated to:</p>
              <ul>
                <li>Maintain a pharmacovigilance system and appoint a qualified person responsible for pharmacovigilance.</li>
                <li>
                  Collect and evaluate ADR reports and report serious ADRs to CDSCO within 15 calendar days (for fatal/life-threatening events)
                  or 30 calendar days (for other serious events).
                </li>
                <li>Submit periodic safety update reports (PSURs) as required.</li>
                <li>Cooperate with any regulatory inspection or audit of our pharmacovigilance activities.</li>
              </ul>
            </>
          ),
        },
        {
          heading: '10. Medical emergencies',
          body: (
            <p>
              <b>
                If you or the patient needs urgent medical attention, call emergency services (112) or go to the nearest hospital immediately.
                Do not delay emergency care to make a report.
              </b>{' '}
              You can report the side effect to us afterwards.
            </p>
          ),
        },
        {
          heading: '11. Changes to this policy',
          body: (
            <p>
              We may update this policy from time to time to reflect changes in law or our practices. The &ldquo;Last updated&rdquo; date at the
              top shows the current version.
            </p>
          ),
        },
        {
          heading: 'Report a side effect or quality issue online',
          body: (
            <>
              <p className="mb-6 text-revora-slate-muted">
                Use the form below to submit a report directly to our Drug Safety Team at{' '}
                <a href={`mailto:${SAFETY}`}>{SAFETY}</a>. All fields marked{' '}
                <span className="text-revora-crimson font-semibold">*</span> are required.
              </p>
              <div id="report">
                <AdrForm />
              </div>
            </>
          ),
        },
      ]}
    />
  );
}
