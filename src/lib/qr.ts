import { getCatalogue } from '@/lib/sanity';
import { SITE_URL } from '@/lib/seo';

/**
 * Pack QR codes hold a short, permanent link — /p/<slug> — instead of the page address, so packs
 * never need reprinting if a page moves. The site forwards each short link to the product's page.
 */
export const qrLink = (slug: string) => `${SITE_URL}/p/${slug}`;

/** Slugs are lower-case letters, digits and hyphens; anything else can't be a product. */
export const cleanSlug = (raw: string) => raw.toLowerCase().replace(/[^a-z0-9-]/g, '');

/** The page a slug belongs to — an eye-care product or an innovation product — or null. */
export async function findProductPage(slug: string): Promise<{ path: string; name: string } | null> {
  const { products, innovation } = await getCatalogue();
  const eyeCare = products.find((p) => p.id === slug);
  if (eyeCare) return { path: `/products/${eyeCare.id}`, name: eyeCare.name };
  const item = innovation.find((p) => p.id === slug);
  if (item) return { path: `/innovation/${item.id}`, name: [item.name, item.accent].filter(Boolean).join(' ') };
  return null;
}
