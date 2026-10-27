import type { InnovationProduct } from '@/lib/innovation-products';

/** Optional search & sharing overrides edited in Sanity (empty fields fall back to defaults). */
export interface SeoFields {
  title?: string;
  description?: string;
  /** Absolute image URL for social sharing. */
  image?: string;
  imageAlt?: string;
  noIndex?: boolean;
}

/** An eye-care product, as the site shows it (adapted from Sanity in lib/sanity.ts). */
export interface Product {
  id: string;
  name: string;
  genericName: string;
  categorySlug: string;
  badge: string;
  volume: string;
  image: string;
  /** Official brand logo (transparent). */
  logo: string;
  color: string;
  summary: string;
  composition: string[];
  indications: string[];
  dosage: string;
  storage: string;
  schedule: string;
  /** Prescribing information leaflet uploaded in Sanity. */
  prescribingInfo?: { url: string; size?: number; updated?: string };
  seo?: SeoFields;
}

export interface TherapyCategory {
  slug: string;
  title: string;
  shortName: string;
  subtitle: string;
  description: string;
  clinicalRationale: string;
  badge: string;
  color: string;
  subTherapies: string[];
}

/** Everything the site lists — all of it edited in Sanity. */
export interface Catalogue {
  categories: TherapyCategory[];
  products: Product[];
  innovation: InnovationProduct[];
}

export const EMPTY_CATALOGUE: Catalogue = { categories: [], products: [], innovation: [] };
