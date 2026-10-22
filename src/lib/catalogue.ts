import type { InnovationProduct } from '@/lib/innovation-products';

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
