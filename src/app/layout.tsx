import type { Metadata } from "next";
import { Inter, Geist_Mono } from "next/font/google";
import localFont from "next/font/local";
import { Providers } from "@/components/providers";
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

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  // Absolute base for Open Graph / Twitter image URLs; override per environment with NEXT_PUBLIC_SITE_URL.
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL ?? 'https://revorahealthcare.com'),
  title: {
    default: "Revora Healthcare",
    template: "%s | Revora Healthcare",
  },
  description:
    "Revora Healthcare Private Limited is a trusted pharmaceutical company in Ahmedabad, Gujarat, specializing in ophthalmic pharmaceuticals and expanding into specialty healthcare products and medical devices. Healthcare – Beyond the Cure.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${inter.variable} ${plusJakartaSans.variable} ${geistMono.variable} h-full antialiased`}
      suppressHydrationWarning
    >
      <body className="min-h-full flex flex-col font-sans bg-background text-foreground">
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
