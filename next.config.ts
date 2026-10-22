import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  cacheComponents: true,
  partialPrefetching: true,
  turbopack: {
    rules: {
      "*.css": {
        loaders: ["@tailwindcss/turbopack"],
        as: "*.css",
      },
    },
  },
  images: {
    // AVIF first (smallest), WebP fallback; browsers without either get the original.
    formats: ["image/avif", "image/webp"],
    // Optimised images are re-generated at most monthly (default is 4 hours).
    minimumCacheTTL: 2678400,
    remotePatterns: [
      {
        protocol: "https",
        hostname: "cdn.sanity.io",
        pathname: "/images/**",
      },
    ],
  },
  async redirects() {
    // The Healthcare (Our Offerings) pages were removed; old links land on the portfolio table.
    return [
      { source: "/our-offerings", destination: "/profile#portfolio", permanent: true },
      { source: "/our-offerings/:path*", destination: "/profile#portfolio", permanent: true },
      // The separate Ahmedabad page was folded into Our Presence.
      { source: "/our-presence/ahmedabad", destination: "/our-presence#ahmedabad", permanent: true },
    ];
  },
  async headers() {
    // Files in /public aren't content-hashed, so cache for a week and revalidate in the background
    // instead of marking them immutable — a replaced photo still shows up within days.
    const week = "public, max-age=604800, stale-while-revalidate=2592000";
    return [
      { source: "/images/:path*", headers: [{ key: "Cache-Control", value: week }] },
      { source: "/videos/:path*", headers: [{ key: "Cache-Control", value: week }] },
      { source: "/logo.png", headers: [{ key: "Cache-Control", value: week }] },
    ];
  },
};

export default nextConfig;
