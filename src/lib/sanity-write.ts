import { createClient } from 'next-sanity';

/**
 * Server-only writes to Sanity: the enquiry inbox and QR scan counts, both shown in the Studio.
 *
 * Needs SANITY_API_WRITE_TOKEN (an Editor token from sanity.io/manage → API → Tokens), set in Vercel →
 * Settings → Environment Variables. Never prefix it with NEXT_PUBLIC_. Without it nothing is saved and
 * the site works as before (enquiries still go by email).
 *
 * Privacy: every document here has a dot in its _id (enquiry.…, qrscans.…). Sanity never serves such
 * documents to unauthenticated requests, so they stay private even though the dataset is public —
 * only people signed in to the Studio can read them.
 */
const token = process.env.SANITY_API_WRITE_TOKEN;

const client = token
  ? createClient({
      projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID!,
      dataset: process.env.NEXT_PUBLIC_SANITY_DATASET!,
      apiVersion: process.env.NEXT_PUBLIC_SANITY_API_VERSION ?? '2024-10-01',
      token,
      useCdn: false,
    })
  : null;

/** Gives up after a few seconds so a slow Sanity never holds up the visitor. */
const withTimeout = <T,>(p: Promise<T>, ms = 4000) =>
  Promise.race([p, new Promise<never>((_, reject) => setTimeout(() => reject(new Error('timed out')), ms))]);

const month = (d = new Date()) => d.toISOString().slice(0, 7); // "2026-11"

/** One more scan for this product this month (a document per product per month). */
export async function recordQrScan(slug: string, name: string) {
  if (!client) return;
  const m = month();
  const id = `qrscans.${slug}.${m}`;
  try {
    await withTimeout(
      client
        .transaction()
        .createIfNotExists({ _id: id, _type: 'qrScans', slug, name, month: m, count: 0 })
        .patch(id, (p) => p.inc({ count: 1 }).set({ name, lastScanAt: new Date().toISOString() }))
        .commit()
    );
  } catch (err) {
    console.warn('[qr] scan not recorded:', (err as Error).message);
  }
}

export interface EnquiryRecord {
  kind: string;
  form: string;
  name: string;
  email?: string;
  phone?: string;
  organisation?: string;
  details: { label: string; value: string }[];
  message?: string;
  page?: string;
  attachment?: string;
  emailSent: boolean;
}

/** Saves an enquiry to the Studio inbox as "New". Returns whether it was saved. */
export async function saveEnquiry(e: EnquiryRecord): Promise<boolean> {
  if (!client) return false;
  try {
    await withTimeout(
      client.create({
        _id: `enquiry.${crypto.randomUUID()}`,
        _type: 'enquiry',
        status: 'new',
        receivedAt: new Date().toISOString(),
        ...e,
        details: e.details.map((d, i) => ({ _key: `d${i}`, _type: 'detail', ...d })),
      })
    );
    return true;
  } catch (err) {
    console.error('[enquiry] not saved to the Studio:', (err as Error).message);
    return false;
  }
}

export const canSave = Boolean(client);
