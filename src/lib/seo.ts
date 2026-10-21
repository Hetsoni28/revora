import type { Metadata } from 'next';
import type { Product, TherapyCategory } from '@/lib/therapies-data';

/** Public site address. Set NEXT_PUBLIC_SITE_URL per environment (no trailing slash). */
export const SITE_URL = (process.env.NEXT_PUBLIC_SITE_URL ?? 'https://revorahealthcare.com').replace(/\/$/, '');

export const SITE = {
  name: 'Revora Healthcare',
  legalName: 'Revora Healthcare Private Limited',
  tagline: 'Healthcare — Beyond the Cure',
  email: 'info@revorahealthcare.com',
  cin: 'U21000GJ2026PTC174674',
  foundingDate: '2026-03-10',
  logo: '/logo.png',
  address: {
    streetAddress: '3rd Floor, S.G. Business Hub, A/303, Sarkhej–Gandhinagar Highway, near Gota Overbridge, Ognaj',
    addressLocality: 'Ahmedabad',
    addressRegion: 'Gujarat',
    postalCode: '380060',
    addressCountry: 'IN',
  },
} as const;

/** Site-wide search terms — what the company actually makes and where. */
export const KEYWORDS = [
  'ophthalmic pharmaceutical company',
  'eye drops manufacturer India',
  'eye care products',
  'ophthalmic eye drops',
  'pharmaceutical company Ahmedabad',
  'WHO-GMP eye drop plant',
  'dry eye drops',
  'antibiotic eye drops',
  'Revora Healthcare',
];

/** app/opengraph-image — pages that set their own Open Graph tags would otherwise lose it. */
const DEFAULT_SHARE_IMAGE = { url: '/opengraph-image', width: 1200, height: 630, alt: 'Revora Healthcare — ophthalmic pharmaceuticals from Ahmedabad, India' };

const clip = (text: string, max = 160) => (text.length <= max ? text : `${text.slice(0, max - 1).replace(/\s+\S*$/, '')}…`);

/**
 * Title, description (kept under 160 characters), canonical URL, Open Graph and Twitter tags for a page.
 * `image` is optional — pages without one use the site-wide share image (app/opengraph-image).
 */
export function pageMetadata({
  title,
  description,
  path,
  keywords = [],
  image,
  absoluteTitle = false,
}: {
  title: string;
  description: string;
  path: string;
  keywords?: string[];
  image?: { url: string; alt: string; width?: number; height?: number };
  absoluteTitle?: boolean;
}): Metadata {
  const desc = clip(description);
  const fullTitle = absoluteTitle ? title : `${title} | ${SITE.name}`;
  const images = [image ?? DEFAULT_SHARE_IMAGE];
  return {
    title: absoluteTitle ? { absolute: title } : title,
    description: desc,
    keywords: [...keywords, ...KEYWORDS],
    alternates: { canonical: path },
    openGraph: {
      type: 'website',
      locale: 'en_IN',
      siteName: SITE.name,
      url: path,
      title: fullTitle,
      description: desc,
      images,
    },
    twitter: {
      card: 'summary_large_image',
      title: fullTitle,
      description: desc,
      images: images.map((i) => i.url),
    },
  };
}

/** "eye drops", "eye gel" or "tablets" — used in titles and image alt text. */
export function productKind(p: Pick<Product, 'genericName' | 'volume'>) {
  if (/tablet/i.test(p.volume) || /tablet/i.test(p.genericName)) return 'tablets';
  if (/gel/i.test(p.genericName)) return 'eye gel';
  return 'eye drops';
}

export function productMetadata(product: Product, category: TherapyCategory | undefined): Metadata {
  const [supply] = product.schedule.split(' — ');
  // add whole sentences while the description stays within 160 characters
  const description = [`${product.name}: ${product.summary}`, `${product.volume}.`, `${supply}.`, 'Made by Revora Healthcare, Ahmedabad.'].reduce(
    (text, part, i) => (i === 0 || `${text} ${part}`.length > 160 ? text : `${text} ${part}`)
  );
  return pageMetadata({
    title: `${product.name} (${product.genericName})`,
    absoluteTitle: true,
    description,
    path: `/products/${product.id}`,
    keywords: [product.name, product.genericName, `${product.name} ${productKind(product)}`, ...(category ? [category.shortName] : [])],
    image: { url: product.image, alt: `${product.name} (${product.genericName}) — ${product.volume} pack`, width: 1200, height: 1200 },
  });
}

/* ── structured data (schema.org JSON-LD) ─────────────────────────────── */

const abs = (path: string) => (path.startsWith('http') ? path : `${SITE_URL}${path}`);

export const organizationLd = {
  '@context': 'https://schema.org',
  '@type': 'Corporation',
  '@id': `${SITE_URL}/#organization`,
  name: SITE.name,
  legalName: SITE.legalName,
  slogan: SITE.tagline,
  url: SITE_URL,
  logo: abs(SITE.logo),
  email: SITE.email,
  foundingDate: SITE.foundingDate,
  identifier: { '@type': 'PropertyValue', propertyID: 'CIN', value: SITE.cin },
  address: { '@type': 'PostalAddress', ...SITE.address },
  areaServed: { '@type': 'Country', name: 'India' },
  knowsAbout: ['Ophthalmic pharmaceuticals', 'Eye drops', 'Dry eye treatment', 'Ocular anti-infectives', 'Retinal nutrition'],
};

export const websiteLd = {
  '@context': 'https://schema.org',
  '@type': 'WebSite',
  '@id': `${SITE_URL}/#website`,
  name: SITE.name,
  url: SITE_URL,
  inLanguage: 'en-IN',
  publisher: { '@id': `${SITE_URL}/#organization` },
};

/** BreadcrumbList from [label, path] pairs, Home first. */
export function breadcrumbLd(trail: [string, string][]) {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: trail.map(([name, path], i) => ({ '@type': 'ListItem', position: i + 1, name, item: abs(path) })),
  };
}

/** A medicine page: schema.org Drug (or DietarySupplement for the nutrition tablets). */
export function productLd(product: Product, category: TherapyCategory | undefined) {
  const tablets = productKind(product) === 'tablets';
  const actives = product.composition.filter((c) => !/q\.s\.$/.test(c));
  return {
    '@context': 'https://schema.org',
    '@type': tablets ? 'DietarySupplement' : 'Drug',
    '@id': `${abs(`/products/${product.id}`)}#product`,
    name: product.name,
    url: abs(`/products/${product.id}`),
    image: abs(product.image),
    description: product.summary,
    ...(tablets
      ? { activeIngredient: actives.join('; ') }
      : {
          nonProprietaryName: product.genericName,
          activeIngredient: actives,
          administrationRoute: 'Ophthalmic',
          prescriptionStatus: /schedule/i.test(product.schedule) ? 'https://schema.org/PrescriptionOnly' : 'https://schema.org/OTC',
          ...(category && { drugClass: { '@type': 'DrugClass', name: category.shortName } }),
        }),
    manufacturer: { '@id': `${SITE_URL}/#organization` },
  };
}
