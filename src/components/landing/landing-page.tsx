'use client';

import { useState } from 'react';
import { Navbar } from '@/components/layout/navbar';
import { Footer } from '@/components/layout/footer';
import { Intro, introSeen, HERO_DELAY_AFTER_INTRO } from './intro';
import { LandingHero } from './hero';
import { BrandMarquee, Manifesto } from './marquee-manifesto';
import { Pillars } from './pillars';
import { Portfolio } from './portfolio';
import { Plant } from './plant';
import { FounderSection } from './founder';
import { ContactBand } from './contact-band';

/**
 * Revora Healthcare — landing page.
 * Section order: Intro → Hero → Brand marquee → Philosophy → Why Revora →
 * Portfolio (pinned horizontal rail) → Plant → Leadership (Founder) → Contact → Footer.
 */
export function LandingPage() {
  // Hero entrance waits for the intro curtain on the first visit of a session.
  // (Only animation timing depends on this, never markup, so hydration is safe.)
  const [heroDelay] = useState(() => (introSeen() ? 0.1 : HERO_DELAY_AFTER_INTRO));

  return (
    <>
      <Intro />
      <Navbar />
      <main id="main" tabIndex={-1} className="flex flex-col overflow-x-clip">
        <LandingHero startDelay={heroDelay} />
        <BrandMarquee />
        <Manifesto />
        <Pillars />
        <Portfolio />
        <Plant />
        <FounderSection />
        <ContactBand />
      </main>
      <Footer />
    </>
  );
}
