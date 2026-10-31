/**
 * Innovation products (beyond the ophthalmic range) — the shape the site uses and the choices
 * offered in Sanity Studio. The products themselves are edited at /studio → Innovation product.
 * Every feature, use and FAQ answer must match what is printed on the pack.
 */

import type { SeoFields } from '@/lib/catalogue';

/** Ranges, in display order. */
export const INNOVATION_CATEGORIES = ['Warmers', 'Cooling', 'Field kits', 'Field food'] as const;

/** Icons a feature can use — also the choices offered in Sanity Studio. */
export const FEATURE_ICONS = [
  { value: 'heat', title: 'Heat / temperature' },
  { value: 'time', title: 'Time / duration' },
  { value: 'safe', title: 'Safe (shield)' },
  { value: 'easy', title: 'Easy to use' },
  { value: 'instant', title: 'Instant' },
  { value: 'nonElectric', title: 'Non-electric' },
  { value: 'snow', title: 'Cold / snow' },
  { value: 'leaf', title: 'Natural / eco' },
  { value: 'feather', title: 'Lightweight / thin' },
  { value: 'water', title: 'Water' },
  { value: 'bowl', title: 'Bowl / food' },
  { value: 'reuse', title: 'Reusable' },
  { value: 'squeeze', title: 'Squeeze' },
  { value: 'shake', title: 'Shake' },
  { value: 'apply', title: 'Apply' },
  { value: 'portable', title: 'Portable' },
] as const;

/** Icons a "made for" use can show — also the choices offered in Sanity Studio. */
export const USE_ICONS = [
  { value: 'defence', title: 'Defence' },
  { value: 'outdoor', title: 'Outdoor / trekking' },
  { value: 'industrial', title: 'Industrial' },
  { value: 'expedition', title: 'Expedition / camping' },
  { value: 'hot', title: 'Hot conditions' },
  { value: 'coldOps', title: 'Cold conditions' },
] as const;

export type FeatureIcon = (typeof FEATURE_ICONS)[number]['value'];
export type UseIcon = (typeof USE_ICONS)[number]['value'];

export interface InnovationProduct {
  id: string;
  /** Range the product belongs to; used for grouping and the card label. */
  category: (typeof INNOVATION_CATEGORIES)[number];
  name: string;
  /** Word(s) of the name shown in the accent colour. */
  accent?: string;
  tagline: string;
  description: string;
  image: string;
  imageAlt: string;
  /** Square pack shots are shown 1:1 so nothing is cropped. */
  square?: boolean;
  pack: string;
  /** Short badge printed on the pack, e.g. "Built for defence & extreme-condition use". */
  badge?: string;
  includes?: string[];
  features: { icon: FeatureIcon; label: string; value: string }[];
  uses: { icon: UseIcon; label: string }[];
  highlight?: string;
  faqs: { q: string; a: string }[];
  seo?: SeoFields;
}
