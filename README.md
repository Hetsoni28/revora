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
| `SANITY_API_TOKEN` | Only if the dataset is private (read-only Viewer token). |

## SEO

- Page titles, descriptions, canonical, Open Graph and Twitter tags: `src/lib/seo.ts` (`pageMetadata`, `productMetadata`)
- Structured data (company, website, medicines, breadcrumbs): `src/lib/seo.ts` + `src/components/seo/json-ld.tsx`
- `src/app/sitemap.ts`, `src/app/robots.ts`, `src/app/manifest.ts`, `src/app/opengraph-image.tsx`
