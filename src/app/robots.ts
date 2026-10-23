import type { MetadataRoute } from 'next';
import { SITE_URL } from '@/lib/seo';

/** /robots.txt — everything public is crawlable except the Sanity Studio and the pack QR links/images. */
export default function robots(): MetadataRoute.Robots {
  return {
    rules: [{ userAgent: '*', allow: '/', disallow: ['/studio', '/api/', '/p/', '/qr/'] }],
    sitemap: `${SITE_URL}/sitemap.xml`,
    host: SITE_URL,
  };
}
