import type { Metadata, Viewport } from "next";
import { Inter, Geist_Mono } from "next/font/google";
import localFont from "next/font/local";
import { Providers } from "@/components/providers";
import { WithCatalogue } from "@/components/catalogue/catalogue-data";
import { JsonLd } from "@/components/seo/json-ld";
import { KEYWORDS, SITE, SITE_URL, organizationLd, websiteLd } from "@/lib/seo";
import "./globals.css";

/* Revora Brand Typography (Official Design System)
   - Headlines: Plus Jakarta Sans
   - Body/Labels: Inter
   - Mono: Geist Mono (code & data) */
const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});

/* Plus Jakarta Sans is self-hosted (latin, variable 200–800) so headings
   never fall back to Arial when Google Fonts can't be reached. */
const plusJakartaSans = localFont({
  src: "./fonts/plus-jakarta-sans-latin-variable.woff2",
  variable: "--font-plus-jakarta-sans",
  weight: "200 800",
  display: "swap",
});

// Only used for a few small CIN/strength labels, so don't preload it on every page.
const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
  display: "swap",
  preload: false,
});

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: 'Revora Healthcare | Ophthalmic Eye Drops Company, Ahmedabad',
    template: '%s | Revora Healthcare',
  },
  description:
    'Revora Healthcare is an Ahmedabad pharmaceutical company making ophthalmic eye drops for infection, inflammation and dry eye in its own WHO-GMP plant.',
  applicationName: SITE.name,
  keywords: KEYWORDS,
  authors: [{ name: SITE.legalName, url: SITE_URL }],
  creator: SITE.legalName,
  publisher: SITE.legalName,
  category: 'health',
  formatDetection: { telephone: false, address: false, email: false },
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true, 'max-image-preview': 'large', 'max-snippet': -1, 'max-video-preview': -1 },
  },
  openGraph: { type: 'website', locale: 'en_IN', siteName: SITE.name },
  twitter: { card: 'summary_large_image' },
  icons: {
    icon: [
      { url: '/favicon.ico', sizes: 'any' },
      { url: '/icon.svg', type: 'image/svg+xml' },
      { url: '/icon.png', type: 'image/png', sizes: '512x512' },
    ],
    apple: [
      { url: '/apple-icon.png', sizes: '180x180', type: 'image/png' },
    ],
  },
};

export const viewport: Viewport = {
  themeColor: '#0B4A8F',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en-IN"
      className={`${inter.variable} ${plusJakartaSans.variable} ${geistMono.variable} h-full antialiased`}
      suppressHydrationWarning
    >
      <head>
        {/* Runs before the first paint: returning visitors never see the intro curtain flash while scripts load. */}
        <script
          dangerouslySetInnerHTML={{
            __html: `try{var k='revora-intro-seen',t=+localStorage.getItem(k);if(sessionStorage.getItem(k)==='1'||(t&&Date.now()-t<2592e6)||matchMedia('(prefers-reduced-motion: reduce)').matches)document.documentElement.setAttribute('data-intro-seen','')}catch(e){}`,
          }}
        />
      </head>
      <body className="min-h-full flex flex-col font-sans bg-background text-foreground">
        <a
          href="#main"
          className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-200 focus:rounded-full focus:bg-revora-cobalt focus:px-5 focus:py-3 focus:font-sans focus:text-sm focus:font-semibold focus:text-white"
        >
          Skip to content
        </a>
        <JsonLd data={[organizationLd, websiteLd]} />
        <Providers>
          <WithCatalogue>{children}</WithCatalogue>
        </Providers>
      </body>
    </html>
  );
}
