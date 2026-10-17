import type { Metadata } from "next";
import { Inter, Nunito, Geist_Mono } from "next/font/google";
import { Providers } from "@/components/providers";
import "./globals.css";

/* Revora Brand Typography
   - Headlines: Nunito — rounded humanist sans-serif, low stroke contrast,
                single-story 'g', curved terminals (matches reference exactly)
   - Body/Labels: Inter (matches design spec)
   - Mono: Geist Mono (code & data) */
const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});

const nunito = Nunito({
  variable: "--font-nunito",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
  display: "swap",
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: {
    default: "Revora Healthcare",
    template: "%s | Revora Healthcare",
  },
  description:
    "Revora Healthcare Private Limited is a trusted pharmaceutical company in Ahmedabad, Gujarat, committed to delivering innovative healthcare solutions with a focus on quality, research, and integrity. Healthcare – Beyond the Cure.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${inter.variable} ${nunito.variable} ${geistMono.variable} h-full antialiased`}
      suppressHydrationWarning
    >
      <body className="min-h-full flex flex-col font-sans bg-background text-foreground">
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
