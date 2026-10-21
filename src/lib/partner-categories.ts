/** What a channel partner can carry, shown in the Channel Partner menu. */
export const PARTNER_CATEGORIES: { name: string; items: string[] }[] = [
  { name: 'Core Oncology', items: ['Injectable Oncology', 'Oral Oncology'] },
  { name: 'Supportive Care', items: ['Antiemetics', 'Other Specialty Injectables'] },
  { name: 'Transdermal Patches', items: ['Pain Management Patches', 'Cognitive Care Patch'] },
];

/** Opens the partner enquiry form with the chosen category filled in. */
export const partnerHref = (item: string) => `/channel-partner?interest=${encodeURIComponent(item)}#apply`;
