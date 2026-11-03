import { after, NextResponse, type NextRequest } from 'next/server';
import { cleanSlug, findProductPage } from '@/lib/qr';
import { recordQrScan } from '@/lib/sanity-write';

// link checkers and crawlers that open links without a person scanning a pack
const BOT = /bot|crawl|spider|slurp|preview|facebookexternalhit|whatsapp|curl|wget|python|headless/i;

/**
 * GET /p/<slug> — the link inside every pack QR code. Forwards to that product's page, tagged
 * utm_source=qr so scans can be counted. A temporary (307) redirect, so the destination can change
 * later without browsers remembering the old one. An unknown slug lands on the homepage, never a 404.
 * Each scan of a real product is counted for the Studio (Insights → QR scans), after the redirect is sent.
 */
export async function GET(request: NextRequest, { params }: { params: Promise<{ slug: string }> }) {
  const slug = cleanSlug((await params).slug);
  const page = await findProductPage(slug);
  const url = new URL(page?.path ?? '/', request.url);
  url.searchParams.set('utm_source', 'qr');
  url.searchParams.set('utm_medium', 'pack');
  url.searchParams.set('utm_campaign', slug || 'unknown');

  if (page && !BOT.test(request.headers.get('user-agent') ?? '')) {
    // counted under the product's current slug, so old pack codes add to the same total
    const productSlug = page.path.split('/').pop()!;
    after(() => recordQrScan(productSlug, page.name));
  }
  return NextResponse.redirect(url, 307);
}
