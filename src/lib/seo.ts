import type { Metadata } from 'next';
import type { Product, SeoFields, TherapyCategory } from '@/lib/catalogue';
import type { InnovationProduct } from '@/lib/innovation-products';

/** Public site address. Set NEXT_PUBLIC_SITE_URL per environment (no trailing slash). */
export const SITE_URL = (process.env.NEXT_PUBLIC_SITE_URL ?? 'https://revorahealthcare.com').replace(/\/$/, '');

export const SITE = {
  name: 'Revora Healthcare',
  legalName: 'Revora Healthcare Private Limited',
  tagline: 'Healthcare — Beyond the Cure',
  email: 'info@revorahealthcare.com',
  phone: { label: '+91 88666 44642', href: 'tel:+918866644642' },
  gstin: '24AAPCR6391D1Z4',
  drugLicences: ['20B GJ-AD2-265245', '21B GJ-AD2-265246'],
  cin: 'U21000GJ2026PTC174674',
  foundingDate: '2026-03-10',
  founder: { name: 'Rajnikant Dave', title: 'Founder & Director' },
  logo: '/logo.png',
  address: {
    streetAddress: 'A-303, 3rd Floor, S.G. Business Hub, B/s Bhagvat Petrol Pump, Nr. Gota Over Bridge, S.G. Highway',
    addressLocality: 'Ahmedabad',
    addressRegion: 'Gujarat',
    postalCode: '382470',
    addressCountry: 'IN',
  },
} as const;

/** Site-wide search terms — what the company actually makes and where. */
export const KEYWORDS = [
  'pharmaceutical company Ahmedabad',
  'third party manufacturing eye drops',
  'ophthalmic pharmaceutical company',
  'eye drops manufacturer India',
  'eye care products',
  'ophthalmic eye drops',
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
  noIndex = false,
}: {
  title: string;
  description: string;
  path: string;
  keywords?: string[];
  image?: { url: string; alt: string; width?: number; height?: number };
  absoluteTitle?: boolean;
  /** Keep the page out of search results (it stays reachable by link). */
  noIndex?: boolean;
}): Metadata {
  const desc = clip(description);
  const fullTitle = absoluteTitle ? title : `${title} | ${SITE.name}`;
  const images = [image ?? DEFAULT_SHARE_IMAGE];
  return {
    title: absoluteTitle ? { absolute: title } : title,
    description: desc,
    keywords: [...keywords, ...KEYWORDS],
    alternates: { canonical: path },
    ...(noIndex && { robots: { index: false, follow: true } }),
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

/** Whole sentences, added in order while the text stays within 160 characters. */
const sentences = (parts: string[]) =>
  parts.filter(Boolean).reduce((text, part, i) => (i === 0 || `${text} ${part}`.length > 160 ? text : `${text} ${part}`));

/** Google shows about 60 characters of a title: the longest option that fits, else the shortest. */
const fitTitle = (options: string[]) => options.find((t) => t.length <= 60) ?? options[options.length - 1];

/** Share image: the editor's Sanity image if set, else the product photo. */
const shareImage = (seo: SeoFields | undefined, fallback: { url: string; alt: string; width?: number; height?: number }) =>
  seo?.image ? { url: seo.image, alt: seo.imageAlt ?? fallback.alt, width: 1200, height: 630 } : fallback;

export function productMetadata(product: Product, category: TherapyCategory | undefined): Metadata {
  const [supply] = product.schedule.split(' — ');
  const kind = productKind(product);
  const Kind = kind.replace(/\b\w/g, (c) => c.toUpperCase());
  const alt = `${product.name} ${kind} (${product.genericName}), ${product.volume} pack`;
  return pageMetadata({
    title:
      product.seo?.title ??
      fitTitle([`${product.name} (${product.genericName})`, `${product.name} ${Kind} | ${SITE.name}`, `${product.name} ${Kind}`]),
    absoluteTitle: true,
    description:
      product.seo?.description ??
      sentences([`${product.name}: ${product.summary}`, `${product.volume}.`, `${supply}.`, 'Made by Revora Healthcare, Ahmedabad.']),
    path: `/products/${product.id}`,
    keywords: [product.name, product.genericName, `${product.name} ${kind}`, ...(category ? [category.shortName] : [])],
    image: shareImage(product.seo, { url: product.image, alt, width: 1200, height: 1200 }),
    noIndex: product.seo?.noIndex,
  });
}

/** Display name of an innovation product, e.g. "Hand Warmer". */
export const innovationName = (p: Pick<InnovationProduct, 'name' | 'accent'>) => [p.name, p.accent].filter(Boolean).join(' ');

export function innovationMetadata(p: InnovationProduct): Metadata {
  const name = innovationName(p);
  const plain = name.replace(/[®™]/g, '').replace(/\s+/g, ' ').trim();
  return pageMetadata({
    title: p.seo?.title ?? fitTitle([`${name} — ${p.tagline} | ${SITE.name}`, `${name} | ${SITE.name}`, name]),
    absoluteTitle: true,
    description:
      p.seo?.description ??
      sentences([
        `${name}: ${p.description}`,
        p.pack ? `${p.pack}.` : '',
        p.badge ? `${p.badge}.` : '',
        p.uses.length ? `For ${p.uses.map((u) => u.label.toLowerCase()).join(', ')}.` : '',
        'From Revora Healthcare, Ahmedabad.',
      ]),
    path: `/innovation/${p.id}`,
    keywords: [plain, `Revora ${plain}`, `${plain} India`, p.category, ...p.uses.map((u) => `${plain} for ${u.label.toLowerCase()}`)],
    image: shareImage(p.seo, { url: p.image, alt: p.imageAlt }),
    noIndex: p.seo?.noIndex,
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
  telephone: SITE.phone.label,
  taxID: SITE.gstin,
  foundingDate: SITE.foundingDate,
  founder: { '@type': 'Person', name: SITE.founder.name, jobTitle: SITE.founder.title },
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

/** An innovation product page: schema.org Product, made and sold by Revora. */
export function innovationLd(p: InnovationProduct) {
  return {
    '@context': 'https://schema.org',
    '@type': 'Product',
    '@id': `${abs(`/innovation/${p.id}`)}#product`,
    name: innovationName(p),
    url: abs(`/innovation/${p.id}`),
    image: abs(p.image),
    description: p.description,
    category: p.category,
    brand: { '@type': 'Brand', name: SITE.name },
    manufacturer: { '@id': `${SITE_URL}/#organization` },
    ...(p.features.length && {
      additionalProperty: p.features.map((f) => ({ '@type': 'PropertyValue', name: f.label, value: f.value })),
    }),
  };
}

/** Questions and answers shown on a page, as schema.org FAQPage. */
export function faqLd(faqs: { q: string; a: string }[]) {
  return {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faqs.map((f) => ({ '@type': 'Question', name: f.q, acceptedAnswer: { '@type': 'Answer', text: f.a } })),
  };
}
