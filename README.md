# Revora Healthcare

Website of Revora Healthcare Private Limited — ophthalmic pharmaceuticals from Ahmedabad, India.

**Live site:** https://revorahealthcare.com

## Stack

Next.js (App Router) · React · Tailwind CSS · Framer Motion · Sanity (content at `/studio`)

## Scripts

```bash
npm install      # install dependencies
npm run dev      # development server
npm run build    # production build
npm run start    # serve the production build
npm run lint     # ESLint
```

## Environment

Copy `.env.example` to `.env.local` and fill in:

| Variable | Purpose |
|---|---|
| `NEXT_PUBLIC_SITE_URL` | Public address — `https://revorahealthcare.com`. Used for canonical links, the sitemap, robots.txt and share images. |
| `NEXT_PUBLIC_SANITY_PROJECT_ID` / `NEXT_PUBLIC_SANITY_DATASET` / `NEXT_PUBLIC_SANITY_API_VERSION` | Sanity project. |
| `SANITY_API_TOKEN` | Only if the dataset is made private (read-only Viewer token). |
| `SMTP_HOST` / `SMTP_PORT` / `SMTP_USER` / `SMTP_PASS` | Enquiry emails — see below. Never prefix with `NEXT_PUBLIC_`. |
| `MAIL_FROM` / `ENQUIRY_TO` | Optional sender, and one address to receive every enquiry (for testing). |

## SEO

- Page titles, descriptions, canonical, Open Graph and Twitter tags: `src/lib/seo.ts` (`pageMetadata`, `productMetadata`)
- Structured data (company, website, medicines, breadcrumbs): `src/lib/seo.ts` + `src/components/seo/json-ld.tsx`
- `src/app/sitemap.ts`, `src/app/robots.ts`, `src/app/manifest.ts`, `src/app/opengraph-image.tsx`

## Sanity content

All products live in Sanity — edit them at `/studio` (sign in with your Sanity account):

- **Therapy Category** — the eye-care therapy areas (menu order, colour)
- **Product** — eye-care brands: photo, brand logo, composition, uses, dosage
- **Innovation product** — warmers, cooling and field-care products

Published changes appear on the site within a few minutes. Drafts are never shown.
A product needs a photo (and an innovation product a range) before it appears.

## Enquiry emails

Every form (Contact, Channel Partner, Careers with CV upload, Global Network, sample requests) posts
to `/api/enquiry`, which emails the right team through the cPanel mailbox and sends the visitor a
short confirmation. Inboxes are set per form in `src/lib/enquiry.ts`.

To switch it on, add in Vercel → Settings → Environment Variables (mark `SMTP_PASS` Sensitive), then redeploy:

| Variable | Value |
|---|---|
| `SMTP_HOST` | `mail.revorahealthcare.com` (from cPanel → Email Accounts → Connect Devices) |
| `SMTP_PORT` | `465` |
| `SMTP_USER` | the full mailbox address, e.g. `info@revorahealthcare.com` |
| `SMTP_PASS` | that mailbox's password |

Until these are set, the forms open the visitor's email app instead, so nothing breaks.
Spam protection: a hidden honeypot field, a minimum fill time and a per-address rate limit.
