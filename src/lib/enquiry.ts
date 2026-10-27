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
}

interface EnquiryKind {
  /** Shown in the email and the visitor's confirmation, e.g. "Channel partner enquiry". */
  title: string;
  to: string;
  fields: EnquiryField[];
  subject: (v: Record<string, string>) => string;
  /** Accepts a CV upload. */
  cv?: boolean;
}

const INFO = 'info@revorahealthcare.com';
const DEPOT = 'depot@revorahealthcare.com';
const EXPORTS = 'exports@revorahealthcare.com';

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
  'contact-products': contact('Doctors & products enquiry', DEPOT),
  'contact-distribution': contact('Distribution in India enquiry', DEPOT),
  'contact-exports': contact('Exports enquiry', EXPORTS),
  'contact-careers': contact('Careers enquiry', INFO),
  partner: {
    title: 'Channel partner enquiry',
    to: DEPOT,
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
    to: INFO,
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
    to: EXPORTS,
    fields: [NAME, EMAIL, { name: 'country', label: 'Country', max: 80 }, { name: 'type', label: 'Partner type', max: 60 }, MESSAGE],
    subject: (v) => `International partnership enquiry — ${v.name}${v.country ? ` (${v.country})` : ''}`,
  },
  samples: {
    title: 'Sample request',
    to: DEPOT,
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
