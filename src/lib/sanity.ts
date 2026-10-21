import { createClient } from 'next-sanity';
import { cacheLife } from 'next/cache';
import { createImageUrlBuilder } from '@sanity/image-url';

// Use a broad type since @sanity/image-url sub-path types vary by version
// eslint-disable-next-line @typescript-eslint/no-explicit-any
type SanityImageSource = any;

const token = process.env.SANITY_API_TOKEN ?? process.env.SANITY_API_READ_TOKEN;

const config = {
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID!,
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET!,
  apiVersion: process.env.NEXT_PUBLIC_SANITY_API_VERSION ?? '2024-10-01',
  // Public dataset: read through Sanity's edge CDN (faster, cached). With a token, read the live API.
  useCdn: !token,
  // Read-only (Viewer) token. Local .env.local uses SANITY_API_TOKEN; the Sanity–Vercel integration sets SANITY_API_READ_TOKEN.
  token,
};

export const sanityClient = createClient(config);

/**
 * Run a Sanity query; on failure (bad token, offline, project missing) return `fallback`.
 * Errors thrown inside a 'use cache' scope would otherwise fail the prerender, so callers
 * get an empty result and fall back to the static catalogue in lib/therapies-data.
 */
async function safeFetch<T>(query: string, params: Record<string, unknown>, fallback: T): Promise<T> {
  try {
    return await sanityClient.fetch<T>(query, params);
  } catch (err) {
    console.warn('[sanity] query failed, using static data:', (err as Error).message);
    return fallback;
  }
}

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
  summary?: string;
  composition?: string[];
  indications?: string[];
  dosage?: string;
  storage?: string;
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
  summary,
  composition,
  indications,
  dosage,
  storage,
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
  'use cache';
  cacheLife('minutes');
  return safeFetch(
    `*[_type == "therapyCategory"] | order(order asc) { ${CATEGORY_FIELDS} }`,
    {},
    []
  );
}

/** Fetch single category by slug */
export async function getCategoryBySlug(slug: string): Promise<SanityTherapyCategory | null> {
  'use cache';
  cacheLife('minutes');
  return safeFetch(
    `*[_type == "therapyCategory" && slug.current == $slug][0] { ${CATEGORY_FIELDS} }`,
    { slug },
    null
  );
}

/** Fetch all products, ordered */
export async function getAllProducts(): Promise<SanityProduct[]> {
  'use cache';
  cacheLife('minutes');
  return safeFetch(
    `*[_type == "product"] | order(category->order asc, order asc) { ${PRODUCT_FIELDS} }`,
    {},
    []
  );
}

/** Fetch all products in a given category slug */
export async function getProductsByCategory(categorySlug: string): Promise<SanityProduct[]> {
  'use cache';
  cacheLife('minutes');
  return safeFetch(
    `*[_type == "product" && category->slug.current == $categorySlug] | order(order asc) { ${PRODUCT_FIELDS} }`,
    { categorySlug },
    []
  );
}

/** Fetch single product by slug */
export async function getProductBySlug(slug: string): Promise<SanityProduct | null> {
  'use cache';
  cacheLife('minutes');
  return safeFetch(
    `*[_type == "product" && id.current == $slug][0] { ${PRODUCT_FIELDS} }`,
    { slug },
    null
  );
}

/** Fetch all product slugs (for generateStaticParams) */
export async function getAllProductSlugs(): Promise<string[]> {
  'use cache';
  cacheLife('minutes');
  const results: { id: { current: string } }[] = await safeFetch(
    `*[_type == "product"]{ "id": id }`,
    {},
    [] as { id: { current: string } }[]
  );
  return results.map((r) => r.id.current);
}

/** Fetch all category slugs (for generateStaticParams) */
export async function getAllCategorySlugs(): Promise<string[]> {
  'use cache';
  cacheLife('minutes');
  const results: { slug: { current: string } }[] = await safeFetch(
    `*[_type == "therapyCategory"]{ slug }`,
    {},
    [] as { slug: { current: string } }[]
  );
  return results.map((r) => r.slug.current);
}

// ─── Helpers to adapt Sanity types → legacy Product/TherapyCategory types ──────
// (lets existing client components work unchanged)

import { getProductById, type Product, type TherapyCategory } from '@/lib/therapies-data';

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
    logo: `/images/brand-logos/${p.id.current}.webp`,
    // brand colour isn't edited in Studio — it follows the site's own data, then the category
    color: getProductById(p.id.current)?.color ?? p.category?.color ?? '#0B4A8F',
    summary: p.summary ?? '',
    composition: p.composition ?? [],
    indications: p.indications ?? [],
    dosage: p.dosage ?? '',
    storage: p.storage ?? '',
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
