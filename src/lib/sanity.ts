import { createClient } from 'next-sanity';
import { cacheLife } from 'next/cache';
import { createImageUrlBuilder } from '@sanity/image-url';
import { EMPTY_CATALOGUE, type Catalogue, type Product, type SeoFields, type TherapyCategory } from '@/lib/catalogue';
import { INNOVATION_CATEGORIES, type InnovationProduct } from '@/lib/innovation-products';

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
  // Only what's been published in the Studio — never unpublished drafts.
  perspective: 'published' as const,
};

export const sanityClient = createClient(config);
// The dataset is public, so a rejected token (revoked, expired) shouldn't take the site down — read without it.
const publicClient = token ? createClient({ ...config, token: undefined, useCdn: true }) : null;

const builder = createImageUrlBuilder(sanityClient);
export function urlFor(source: SanityImageSource) {
  return builder.image(source);
}

// ─── Shapes returned by the query ─────────────────────────────────────────────

interface SanityTherapyCategory {
  slug: string;
  division?: string;
  title: string;
  shortName?: string;
  subtitle?: string;
  description?: string;
  clinicalRationale?: string;
  badge?: string;
  color?: string;
  subTherapies?: string[];
}

interface SanitySeo {
  title?: string;
  description?: string;
  image?: SanityImageSource & { alt?: string };
  noIndex?: boolean;
}

interface SanityProduct {
  id: string;
  distributed?: boolean;
  fssaiLicence?: string;
  seo?: SanitySeo;
  pi?: { url?: string; size?: number; updated?: string };
  name: string;
  genericName?: string;
  categorySlug?: string;
  badge?: string;
  volume?: string;
  image?: SanityImageSource;
  logo?: SanityImageSource;
  summary?: string;
  composition?: string[];
  indications?: string[];
  dosage?: string;
  storage?: string;
  schedule?: string;
}

interface SanityInnovationProduct {
  id: string;
  seo?: SanitySeo;
  category: InnovationProduct['category'];
  name: string;
  accent?: string;
  tagline?: string;
  description?: string;
  image?: SanityImageSource & { alt?: string };
  square?: boolean;
  pack?: string;
  badge?: string;
  includes?: string[];
  features?: InnovationProduct['features'];
  uses?: InnovationProduct['uses'];
  highlight?: string;
  faqs?: InnovationProduct['faqs'];
}

const CATALOGUE_QUERY = `{
  "categories": *[_type == "therapyCategory" && defined(slug.current)] | order(order asc, title asc) {
    "slug": slug.current, title, shortName, division, subtitle, description, clinicalRationale, badge, color, subTherapies
  },
  "products": *[_type == "product" && defined(id.current) && defined(category->slug.current) && defined(image.asset)] | order(category->order asc, order asc, name asc) {
    "id": id.current, name, genericName, "categorySlug": category->slug.current,
    badge, volume, image, logo, summary, composition, indications, dosage, storage, schedule, seo, distributed, fssaiLicence,
    "pi": prescribingInfo { "url": asset->url, "size": asset->size, updated }
  },
  "innovation": *[_type == "innovationProduct" && defined(slug.current) && defined(category) && defined(image.asset)] | order(order asc, name asc) {
    "id": slug.current, category, name, accent, tagline, description,
    image { asset, hotspot, crop, alt },
    square, pack, badge, includes,
    features[] { icon, label, value },
    uses[] { icon, label },
    highlight,
    faqs[] { q, a },
    seo
  }
}`;

// ─── Sanity → site shapes ─────────────────────────────────────────────────────

/** Only the SEO fields an editor actually filled in. Share images are cropped to 1200 × 630. */
function adaptSeo(s: SanitySeo | undefined): SeoFields | undefined {
  if (!s) return undefined;
  const seo: SeoFields = {
    title: s.title?.trim() || undefined,
    description: s.description?.trim() || undefined,
    image: s.image?.asset ? urlFor(s.image).width(1200).height(630).fit('crop').url() : undefined,
    imageAlt: s.image?.alt?.trim() || undefined,
    noIndex: s.noIndex || undefined,
  };
  return Object.values(seo).some((v) => v !== undefined) ? seo : undefined;
}

const DEFAULT_COLOR = '#0B4A8F';

function adaptCategory(c: SanityTherapyCategory): TherapyCategory {
  return {
    slug: c.slug,
    division: c.division === 'orthopaedics' ? 'orthopaedics' : 'ophthalmology',
    title: c.title,
    shortName: c.shortName ?? c.title,
    subtitle: c.subtitle ?? '',
    description: c.description ?? '',
    clinicalRationale: c.clinicalRationale ?? '',
    badge: c.badge ?? '',
    color: c.color ?? DEFAULT_COLOR,
    subTherapies: c.subTherapies ?? [],
  };
}

function adaptProduct(p: SanityProduct, categories: TherapyCategory[]): Product {
  const image = urlFor(p.image).width(800).height(800).url();
  return {
    id: p.id,
    name: p.name,
    genericName: p.genericName ?? '',
    categorySlug: p.categorySlug ?? '',
    badge: p.badge ?? '',
    volume: p.volume ?? '',
    image,
    // no logo uploaded yet → show the product photo instead
    logo: p.logo?.asset ? urlFor(p.logo).width(800).fit('max').url() : image,
    // a brand takes its therapy area's colour
    color: categories.find((c) => c.slug === p.categorySlug)?.color ?? DEFAULT_COLOR,
    summary: p.summary ?? '',
    composition: p.composition ?? [],
    indications: p.indications ?? [],
    dosage: p.dosage ?? '',
    storage: p.storage ?? '',
    schedule: p.schedule ?? '',
    distributed: p.distributed || undefined,
    fssaiLicence: p.fssaiLicence?.trim() || undefined,
    prescribingInfo: p.pi?.url ? { url: p.pi.url, size: p.pi.size, updated: p.pi.updated } : undefined,
    seo: adaptSeo(p.seo),
  };
}

function adaptInnovationProduct(p: SanityInnovationProduct): InnovationProduct {
  return {
    id: p.id,
    category: p.category,
    name: p.name,
    accent: p.accent || undefined,
    tagline: p.tagline ?? '',
    description: p.description ?? '',
    image: urlFor(p.image).width(1600).fit('max').auto('format').url(),
    imageAlt: p.image?.alt ?? [p.name, p.accent].filter(Boolean).join(' '),
    square: p.square || undefined,
    pack: p.pack ?? '',
    badge: p.badge || undefined,
    includes: p.includes?.length ? p.includes : undefined,
    features: p.features ?? [],
    uses: p.uses ?? [],
    highlight: p.highlight || undefined,
    faqs: p.faqs ?? [],
    seo: adaptSeo(p.seo),
  };
}

/**
 * Therapy areas, eye-care products and innovation products — all from Sanity, in one query.
 * Innovation products are sorted by range (Warmers → Cooling → Field kits → Field food), keeping
 * each range's own order. If Sanity can't be reached, the lists are empty and pages show their
 * empty states.
 */
export async function getCatalogue(): Promise<Catalogue> {
  'use cache';
  cacheLife('minutes');
  let raw: { categories: SanityTherapyCategory[]; products: SanityProduct[]; innovation: SanityInnovationProduct[] };
  try {
    raw = await sanityClient.fetch(CATALOGUE_QUERY);
  } catch (err) {
    console.warn('[sanity] catalogue query failed:', (err as Error).message);
    if (!publicClient) return EMPTY_CATALOGUE;
    try {
      raw = await publicClient.fetch(CATALOGUE_QUERY);
      console.warn('[sanity] read the public dataset without the token — renew or remove SANITY_API_TOKEN / SANITY_API_READ_TOKEN');
    } catch (retryErr) {
      // Throwing inside 'use cache' would fail the prerender, so log and show nothing instead.
      console.warn('[sanity] catalogue query failed without the token too:', (retryErr as Error).message);
      return EMPTY_CATALOGUE;
    }
  }
  const categories = raw.categories.map(adaptCategory);
  const rank = (c: InnovationProduct['category']) => INNOVATION_CATEGORIES.indexOf(c);
  return {
    categories,
    products: raw.products.map((p) => adaptProduct(p, categories)),
    innovation: raw.innovation.map(adaptInnovationProduct).sort((a, b) => rank(a.category) - rank(b.category)),
  };
}
