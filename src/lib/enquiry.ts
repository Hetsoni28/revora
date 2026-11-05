/**
 * Every enquiry form on the site, in one place: which inbox it goes to, which fields it sends and
 * how its email subject reads. Used by the browser (forms, and the email-app fallback) and by the
 * server (/api/enquiry), so both always agree. Inboxes are chosen here — never sent by the browser.
 */

export interface EnquiryField {
  name: string;
  label: string;
  required?: boolean;
  /** Longest accepted value (characters). */
  max?: number;
  /** The value must match (checked on the server too). */
  pattern?: RegExp;
}

/** A phone number: Indian mobile (10 digits, optional 0 / +91 / 91) or any international number starting with +. */
export const PHONE_RE = /^(?:(?:\+?91|0)?[6-9]\d{9}|\+[1-9]\d{6,14})$/;
export const normalisePhone = (v: string) => v.replace(/[\s()-]/g, '');

interface EnquiryKind {
  /** Shown in the email and the visitor's confirmation, e.g. "Channel partner enquiry". */
  title: string;
  to: string;
  fields: EnquiryField[];
  subject: (v: Record<string, string>) => string;
  /** Accepts a CV upload. */
  cv?: boolean;
}

// Careers go to HR, export and manufacturing to the depot, everything else to info@
// (the subject line says which form it came from).
const INFO = 'info@revorahealthcare.com';
const HR = 'hr@revorahealthcare.com';
const DEPOT = 'depot@revorahealthcare.com';
const SAFETY = INFO;

const NAME: EnquiryField = { name: 'name', label: 'Name', required: true, max: 100 };
const EMAIL: EnquiryField = { name: 'email', label: 'Email', required: true, max: 160 };
const PHONE: EnquiryField = { name: 'phone', label: 'Phone', max: 30 };
const MESSAGE: EnquiryField = { name: 'message', label: 'Message', max: 3000 };

const contact = (title: string, to: string): EnquiryKind => ({
  title,
  to,
  fields: [NAME, { name: 'organisation', label: 'Organisation', max: 160 }, EMAIL, PHONE, { ...MESSAGE, required: true }],
  subject: (v) => `${title} — ${v.organisation || v.name}`,
});

export const ENQUIRIES = {
  'contact-general': contact('General & corporate enquiry', INFO),
  'contact-products': contact('Doctors & products enquiry', INFO),
  'contact-distribution': contact('Distribution in India enquiry', INFO),
  'contact-exports': contact('Exports enquiry', DEPOT),
  'contact-careers': contact('Careers enquiry', HR),
  'contact-manufacturing': contact('Manufacturing (CDMO) enquiry', DEPOT),
  manufacturing: {
    title: 'Manufacturing (CDMO) enquiry',
    to: DEPOT,
    fields: [
      NAME,
      { name: 'company', label: 'Company', required: true, max: 160 },
      EMAIL,
      { ...PHONE, required: true },
      { name: 'dosageForm', label: 'Dosage form', max: 60 },
      { name: 'country', label: 'Country', max: 80 },
      { ...MESSAGE, required: true },
    ],
    subject: (v) => `Manufacturing enquiry — ${v.company}${v.dosageForm ? ` (${v.dosageForm})` : ''}`,
  },
  partner: {
    title: 'Channel partner enquiry',
    to: INFO,
    fields: [
      { name: 'type', label: 'Partner type', max: 60 },
      NAME,
      { name: 'company', label: 'Company', max: 160 },
      { name: 'city', label: 'City / territory', required: true, max: 120 },
      { ...PHONE, required: true },
      EMAIL,
      MESSAGE,
    ],
    subject: (v) => `Channel partner enquiry — ${v.company || v.name} (${v.city})`,
  },
  career: {
    title: 'Job application',
    to: HR,
    cv: true,
    fields: [
      { name: 'team', label: 'Team', max: 80 },
      NAME,
      EMAIL,
      { ...PHONE, required: true },
      { name: 'city', label: 'City', max: 120 },
      { name: 'experience', label: 'Experience', max: 40 },
      MESSAGE,
    ],
    subject: (v) => `Job application — ${v.team} — ${v.name}`,
  },
  export: {
    title: 'International partnership enquiry',
    to: DEPOT,
    fields: [NAME, EMAIL, { name: 'country', label: 'Country', max: 80 }, { name: 'type', label: 'Partner type', max: 60 }, MESSAGE],
    subject: (v) => `International partnership enquiry — ${v.name}${v.country ? ` (${v.country})` : ''}`,
  },
  callback: {
    title: 'Callback request',
    to: INFO,
    fields: [
      NAME,
      { name: 'phone', label: 'Phone', required: true, max: 20, pattern: PHONE_RE },
      { name: 'interest', label: 'Interested in', max: 60 },
      { name: 'time', label: 'Best time to call', max: 40 },
    ],
    subject: (v) => `Call back request — ${v.name} (${v.phone})${v.interest ? ` — ${v.interest}` : ''}`,
  },
  samples: {
    title: 'Sample request',
    to: INFO,
    fields: [
      { name: 'product', label: 'Product', max: 200 },
      NAME,
      { name: 'designation', label: 'Designation', max: 80 },
      { name: 'institution', label: 'Institution', required: true, max: 160 },
      { name: 'city', label: 'City', required: true, max: 120 },
      { name: 'state', label: 'State', max: 80 },
      EMAIL,
      { ...PHONE, required: true },
      { name: 'quantity', label: 'Quantity', max: 80 },
      MESSAGE,
    ],
    subject: (v) => `Sample request — ${v.product || 'Ophthalmic products'}`,
  },
  adr: {
    title: 'Adverse Drug Reaction / Safety Report',
    to: SAFETY,
    cv: true,
    fields: [
      { name: 'reporter_type', label: 'I am a', max: 80 },
      NAME,
      EMAIL,
      PHONE,
      { name: 'city', label: 'City / State', max: 120 },
      { name: 'patient_initials', label: 'Patient initials (or anonymous)', max: 40 },
      { name: 'patient_gender', label: 'Patient gender', max: 20 },
      { name: 'patient_age', label: 'Patient age', max: 20 },
      { name: 'product_name', label: 'Product name', required: true, max: 200 },
      { name: 'batch_number', label: 'Batch number', max: 80 },
      { name: 'expiry_date', label: 'Expiry date (on pack)', max: 40 },
      { name: 'indication', label: 'What was the product being used for?', max: 500 },
      { name: 'dose', label: 'Dose and frequency', max: 200 },
      { name: 'event_description', label: 'What happened? (describe the reaction or quality issue)', required: true, max: 3000 },
      { name: 'onset_date', label: 'Date / approximate date of onset', max: 80 },
      { name: 'seriousness', label: 'Seriousness', max: 200 },
      { name: 'outcome', label: 'Current outcome', max: 200 },
      { name: 'other_medicines', label: 'Other medicines being taken at the same time', max: 500 },
    ],
    subject: (v) => `ADR / Safety report — ${v.product_name || 'product'} — ${v.name || 'anonymous'}`,
  },
} satisfies Record<string, EnquiryKind>;

export type EnquiryKindId = keyof typeof ENQUIRIES;

export const isEnquiryKind = (k: string): k is EnquiryKindId => Object.hasOwn(ENQUIRIES, k);

/** CV uploads: PDF or Word, up to 4 MB (Vercel accepts requests up to 4.5 MB). */
export const CV_TYPES = ['application/pdf', 'application/msword', 'application/vnd.openxmlformats-officedocument.wordprocessingml.document'];
export const CV_ACCEPT = '.pdf,.doc,.docx';
export const CV_MAX_BYTES = 4 * 1024 * 1024;

/** The enquiry as plain "Label: value" lines, in form order (empty fields left out). */
export function enquiryLines(kind: EnquiryKindId, values: Record<string, string>) {
  return (ENQUIRIES[kind].fields as EnquiryField[])
    .filter((f) => f.name !== 'message' && values[f.name]?.trim())
    .map((f) => `${f.label}: ${values[f.name].trim()}`);
}
