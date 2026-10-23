import { NextResponse, type NextRequest } from 'next/server';
import { cleanSlug, findProductPage } from '@/lib/qr';

/**
 * GET /p/<slug> — the link inside every pack QR code. Forwards to that product's page, tagged
 * utm_source=qr so scans can be counted. A temporary (307) redirect, so the destination can change
 * later without browsers remembering the old one. An unknown slug lands on the homepage, never a 404.
 */
export async function GET(request: NextRequest, { params }: { params: Promise<{ slug: string }> }) {
  const slug = cleanSlug((await params).slug);
  const page = await findProductPage(slug);
  const url = new URL(page?.path ?? '/', request.url);
  url.searchParams.set('utm_source', 'qr');
  url.searchParams.set('utm_medium', 'pack');
  url.searchParams.set('utm_campaign', slug || 'unknown');
  return NextResponse.redirect(url, 307);
}
