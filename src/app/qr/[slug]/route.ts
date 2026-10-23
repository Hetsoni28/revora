import { NextResponse, type NextRequest } from 'next/server';
import QRCode from 'qrcode';
import { cleanSlug, findProductPage, qrLink } from '@/lib/qr';

// Black on white with a 4-module quiet zone and 25% error correction: scans reliably on cartons,
// even with a small scuff. Only change these after test-scanning printed proofs.
const OPTIONS = { errorCorrectionLevel: 'Q', margin: 4, color: { dark: '#000000', light: '#FFFFFF' } } as const;

/**
 * GET /qr/<slug> — the QR code for a product's pack, pointing at its short link (/p/<slug>).
 *   ?format=svg (default) — vector, for the packaging designer and printer
 *   ?format=png           — 1200 × 1200 px, for quick use
 *   &download             — save as a file instead of showing it
 */
export async function GET(request: NextRequest, { params }: { params: Promise<{ slug: string }> }) {
  const slug = cleanSlug((await params).slug);
  if (!(await findProductPage(slug))) {
    return new NextResponse('No published product with this slug.', { status: 404 });
  }

  const query = request.nextUrl.searchParams;
  const png = query.get('format') === 'png';
  const headers: Record<string, string> = {
    'Content-Type': png ? 'image/png' : 'image/svg+xml',
    // a slug's short link never changes, so its QR code never does either
    'Cache-Control': 'public, max-age=86400, stale-while-revalidate=604800',
  };
  if (query.has('download')) headers['Content-Disposition'] = `attachment; filename="revora-${slug}-qr.${png ? 'png' : 'svg'}"`;

  if (png) {
    const buffer = await QRCode.toBuffer(qrLink(slug), { ...OPTIONS, type: 'png', width: 1200 });
    return new NextResponse(new Uint8Array(buffer), { headers });
  }
  return new NextResponse(await QRCode.toString(qrLink(slug), { ...OPTIONS, type: 'svg' }), { headers });
}
