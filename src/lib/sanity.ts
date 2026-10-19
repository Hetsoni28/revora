import { createClient } from 'next-sanity';
import { createImageUrlBuilder } from '@sanity/image-url';

// Use a broad type since @sanity/image-url sub-path types vary by version
// eslint-disable-next-line @typescript-eslint/no-explicit-any
type SanityImageSource = any;

const config = {
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID!,
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET!,
  apiVersion: process.env.NEXT_PUBLIC_SANITY_API_VERSION ?? '2024-10-01',
  useCdn: false,
  // Token enables authenticated reads (needed for Editor-level token)
  token: process.env.SANITY_API_TOKEN,
};

export const sanityClient = createClient(config);

const builder = createImageUrlBuilder(sanityClient);
export function urlFor(source: SanityImageSource) {
  return builder.image(source);
}

// ─── TypeScript Types (mirrors therapies-data.ts but with Sanity refs) ────────

export interface SanityProduct {
  _id: string;
  id: { current: string };
  name: string;
  genericName: string;
  category: SanityTherapyCategory;
  badge?: string;
  volume?: string;
  image?: SanityImageSource;
  color?: string;
  tagline?: string;
  summary?: string;
  composition?: string[];
  mechanismOfAction?: string;
  indications?: string[];
  dosage?: string;
  storage?: string;
  packaging?: string;
  schedule?: string;
  order?: number;
}

export interface SanityTherapyCategory {
  _id: string;
  slug: { current: string };
  title: string;
  shortName: string;
  subtitle?: string;
  description?: string;
  clinicalRationale?: string;
  badge?: string;
  color?: string;
  subTherapies?: string[];
  order?: number;
}

// ─── GROQ Queries ─────────────────────────────────────────────────────────────

const PRODUCT_FIELDS = `
  _id,
  "id": id,
  name,
  genericName,
  category->{
    _id,
    slug,
    title,
    shortName,
    subtitle,
    badge,
    color
  },
  badge,
  volume,
  image,
  color,
  tagline,
  summary,
  composition,
  mechanismOfAction,
  indications,
  dosage,
  storage,
  packaging,
  schedule,
  order
`;

const CATEGORY_FIELDS = `
  _id,
  slug,
  title,
  shortName,
  subtitle,
  description,
  clinicalRationale,
  badge,
  color,
  subTherapies,
  order
`;

/** Fetch all therapy categories, ordered */
export async function getAllCategories(): Promise<SanityTherapyCategory[]> {
  return sanityClient.fetch(
    `*[_type == "therapyCategory"] | order(order asc) { ${CATEGORY_FIELDS} }`,
    {},
    { next: { revalidate: 60 } }
  );
}

/** Fetch single category by slug */
export async function getCategoryBySlug(slug: string): Promise<SanityTherapyCategory | null> {
  return sanityClient.fetch(
    `*[_type == "therapyCategory" && slug.current == $slug][0] { ${CATEGORY_FIELDS} }`,
    { slug },
    { next: { revalidate: 60 } }
  );
}

/** Fetch all products, ordered */
export async function getAllProducts(): Promise<SanityProduct[]> {
  return sanityClient.fetch(
    `*[_type == "product"] | order(category->order asc, order asc) { ${PRODUCT_FIELDS} }`,
    {},
    { next: { revalidate: 60 } }
  );
}

/** Fetch all products in a given category slug */
export async function getProductsByCategory(categorySlug: string): Promise<SanityProduct[]> {
  return sanityClient.fetch(
    `*[_type == "product" && category->slug.current == $categorySlug] | order(order asc) { ${PRODUCT_FIELDS} }`,
    { categorySlug },
    { next: { revalidate: 60 } }
  );
}

/** Fetch single product by slug */
export async function getProductBySlug(slug: string): Promise<SanityProduct | null> {
  return sanityClient.fetch(
    `*[_type == "product" && id.current == $slug][0] { ${PRODUCT_FIELDS} }`,
    { slug },
    { next: { revalidate: 60 } }
  );
}

/** Fetch all product slugs (for generateStaticParams) */
export async function getAllProductSlugs(): Promise<string[]> {
  const results: { id: { current: string } }[] = await sanityClient.fetch(
    `*[_type == "product"]{ "id": id }`,
    {},
    { next: { revalidate: 60 } }
  );
  return results.map((r) => r.id.current);
}

/** Fetch all category slugs (for generateStaticParams) */
export async function getAllCategorySlugs(): Promise<string[]> {
  const results: { slug: { current: string } }[] = await sanityClient.fetch(
    `*[_type == "therapyCategory"]{ slug }`,
    {},
    { next: { revalidate: 60 } }
  );
  return results.map((r) => r.slug.current);
}

// ─── Helpers to adapt Sanity types → legacy Product/TherapyCategory types ──────
// (lets existing client components work unchanged)

import type { Product, TherapyCategory } from '@/lib/therapies-data';

export function adaptProduct(p: SanityProduct): Product {
  return {
    id: p.id.current,
    name: p.name,
    genericName: p.genericName,
    categorySlug: p.category?.slug?.current ?? '',
    badge: p.badge ?? '',
    volume: p.volume ?? '',
    image: p.image
      ? urlFor(p.image).width(800).height(800).url()
      : `/images/products/${p.id.current}.jpg`,
    color: p.color ?? '#0B4A8F',
    tagline: p.tagline ?? '',
    summary: p.summary ?? '',
    composition: p.composition ?? [],
    mechanismOfAction: p.mechanismOfAction ?? '',
    indications: p.indications ?? [],
    dosage: p.dosage ?? '',
    storage: p.storage ?? '',
    packaging: p.packaging ?? '',
    schedule: p.schedule ?? '',
  };
}

export function adaptCategory(c: SanityTherapyCategory): TherapyCategory {
  return {
    slug: c.slug.current,
    title: c.title,
    shortName: c.shortName,
    subtitle: c.subtitle ?? '',
    description: c.description ?? '',
    clinicalRationale: c.clinicalRationale ?? '',
    badge: c.badge ?? '',
    color: c.color ?? '#0B4A8F',
    subTherapies: c.subTherapies ?? [],
    productIds: [], // populated separately if needed
  };
}
