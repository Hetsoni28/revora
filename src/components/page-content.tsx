'use client';

import dynamic from 'next/dynamic';

const WelcomeIntro = dynamic(
  () => import('@/components/layout/welcome-intro').then((m) => ({ default: m.WelcomeIntro })),
  { ssr: false }
);
const Navbar = dynamic(
  () => import('@/components/layout/navbar').then((m) => ({ default: m.Navbar })),
  { ssr: false }
);
const Hero = dynamic(
  () => import('@/components/sections/hero').then((m) => ({ default: m.Hero })),
  { ssr: false }
);
const StatsTicker = dynamic(
  () => import('@/components/sections/stats-ticker').then((m) => ({ default: m.StatsTicker })),
  { ssr: false }
);
const About = dynamic(
  () => import('@/components/sections/about').then((m) => ({ default: m.About })),
  { ssr: false }
);
const Process = dynamic(
  () => import('@/components/sections/process').then((m) => ({ default: m.Process })),
  { ssr: false }
);
const Services = dynamic(
  () => import('@/components/sections/services').then((m) => ({ default: m.Services })),
  { ssr: false }
);
const Certifications = dynamic(
  () => import('@/components/sections/certifications').then((m) => ({ default: m.Certifications })),
  { ssr: false }
);
const ProductsPinned = dynamic(
  () => import('@/components/sections/products-pinned').then((m) => ({ default: m.ProductsPinned })),
  { ssr: false }
);
const MissionBand = dynamic(
  () => import('@/components/sections/mission-band').then((m) => ({ default: m.MissionBand })),
  { ssr: false }
);
const Testimonials = dynamic(
  () => import('@/components/sections/testimonials').then((m) => ({ default: m.Testimonials })),
  { ssr: false }
);
const CTABand = dynamic(
  () => import('@/components/sections/cta-band').then((m) => ({ default: m.CTABand })),
  { ssr: false }
);

export function PageContent() {
  return (
    <>
      <WelcomeIntro />
      <Navbar />
      <main className="flex flex-col">
        <Hero />
        <StatsTicker />
        <About />
        <Process />
        <Services />
        <Certifications />
        <ProductsPinned />
        <MissionBand />
        <Testimonials />
        <CTABand />
      </main>
    </>
  );
}
