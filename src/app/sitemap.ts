import type { MetadataRoute } from 'next';
import { ALL_PRODUCTS } from '@/lib/therapies-data';
import { SITE_URL } from '@/lib/seo';

/** /sitemap.xml — every public page, products included. */
export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();
  const page = (path: string, priority: number, changeFrequency: 'weekly' | 'monthly' | 'yearly' = 'monthly') => ({
    url: `${SITE_URL}${path}`,
    lastModified: now,
    changeFrequency,
    priority,
  });

  return [
    page('/', 1, 'weekly'),
    ...ALL_PRODUCTS.map((p) => ({
      ...page(`/products/${p.id}`, 0.9),
      images: [`${SITE_URL}${p.image}`],
    })),
    page('/about', 0.8),
    page('/profile', 0.8),
    page('/certifications', 0.7),
    page('/innovation', 0.7),
    page('/channel-partner', 0.7),
    page('/our-presence', 0.6),
    page('/our-presence/domestic-network', 0.6),
    page('/our-presence/global-network', 0.5),
    page('/philosophy', 0.5, 'yearly'),
    page('/careers', 0.5),
    page('/cookie-policy', 0.2, 'yearly'),
  ];
}
