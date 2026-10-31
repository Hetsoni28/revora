'use client';

import Image from 'next/image';
import Link from 'next/link';
import { motion, useReducedMotion } from 'framer-motion';
import { ArrowUpRight, Quote, ShieldCheck } from 'lucide-react';
import { expoOut } from '@/lib/easings';
import { Eyebrow, FadeUp } from '@/components/ui/primitives';
import { SITE } from '@/lib/seo';

export function FounderSection() {
  const reduce = useReducedMotion();

  return (
    <section id="leadership" className="relative isolate overflow-hidden bg-white px-5 py-24 tablet:px-8 tablet:py-36">
      {/* subtle ambient background glow */}
      <div
        aria-hidden
        className="pointer-events-none absolute -left-32 top-1/2 -z-10 h-[520px] w-[520px] -translate-y-1/2 rounded-full bg-revora-sky/60 blur-3xl"
      />
      <div
        aria-hidden
        className="pointer-events-none absolute -right-32 bottom-10 -z-10 h-[480px] w-[480px] rounded-full bg-revora-cobalt-pale/25 blur-3xl"
      />

      <div className="mx-auto max-w-[1320px]">
        <div className="grid grid-cols-[minmax(0,1fr)] items-center gap-12 tablet-lg:grid-cols-[0.9fr_1.1fr] tablet-lg:gap-16 desktop:gap-24">
          
          {/* ── Left Column: Founder Portrait Card ── */}
          <motion.div
            initial={reduce ? false : { opacity: 0, scale: 0.96, y: 32 }}
            whileInView={{ opacity: 1, scale: 1, y: 0 }}
            viewport={{ once: true, margin: '-10% 0px' }}
            transition={{ duration: 1, ease: expoOut }}
            className="relative mx-auto w-full max-w-[480px] tablet-lg:mx-0 tablet-lg:max-w-none"
          >
            {/* outer framing with shadow and subtle border */}
            <div className="relative overflow-hidden rounded-[32px] border border-revora-cobalt/15 bg-gradient-to-b from-white to-revora-sky/40 p-3 shadow-[0_30px_70px_-25px_rgba(11,74,143,0.22)]">
              <div className="relative aspect-square w-full overflow-hidden rounded-[24px] bg-revora-cobalt-deep">
                <Image
                  src="/images/leadership/founder.webp"
                  alt={`${SITE.founder.name}, ${SITE.founder.title} of Revora Healthcare`}
                  fill
                  sizes="(min-width: 1024px) 45vw, 90vw"
                  className="object-cover object-top transition-transform duration-700 hover:scale-[1.03]"
                  loading="eager"
                />
                
                {/* gradient vignette at bottom */}
                <div
                  aria-hidden
                  className="absolute inset-x-0 bottom-0 h-32 bg-gradient-to-t from-revora-slate/85 via-revora-slate/30 to-transparent"
                />

                {/* badge over photo */}
                <div className="absolute bottom-4 left-4 right-4 flex items-center justify-between rounded-2xl border border-white/20 bg-white/90 px-4 py-3 backdrop-blur-md">
                  <div>
                    <p className="font-heading text-[15px] font-bold text-revora-slate">
                      {SITE.founder.name}
                    </p>
                    <p className="font-sans text-[12px] text-revora-slate-light">
                      {SITE.founder.title} · {SITE.legalName}
                    </p>
                  </div>
                  <span className="grid h-9 w-9 shrink-0 place-items-center rounded-xl bg-revora-cobalt text-white shadow-sm">
                    <ShieldCheck className="h-5 w-5" />
                  </span>
                </div>
              </div>

              {/* quick credential pills below photo */}
              <div className="mt-3 grid grid-cols-2 gap-2 text-center">
                <div className="rounded-xl border border-revora-cobalt/10 bg-white/80 p-2.5 backdrop-blur-sm">
                  <p className="font-heading text-lg font-extrabold text-revora-cobalt">15+ Years</p>
                  <p className="font-sans text-[11px] font-medium text-revora-slate-light">Pharma Leadership</p>
                </div>
                <div className="rounded-xl border border-revora-cobalt/10 bg-white/80 p-2.5 backdrop-blur-sm">
                  <p className="font-heading text-lg font-extrabold text-revora-crimson">Ahmedabad</p>
                  <p className="font-sans text-[11px] font-medium text-revora-slate-light">Headquarters</p>
                </div>
              </div>
            </div>
          </motion.div>

          {/* ── Right Column: Leadership Statement ── */}
          <div className="relative">
            <FadeUp>
              <Eyebrow>Leadership & Direction</Eyebrow>
              <h2 className="mt-5 font-heading text-[clamp(2.2rem,4.4vw,3.8rem)] font-extrabold leading-[1.05] tracking-[-0.02em] text-revora-slate">
                Built on trust.{' '}
                <span className="text-revora-cobalt">Driven by ambition.</span>
              </h2>
            </FadeUp>

            {/* quote callout */}
            <FadeUp delay={0.15}>
              <div className="relative mt-8 rounded-[24px] border border-revora-cobalt/15 bg-revora-sky/30 p-6 tablet:p-8">
                <Quote className="h-9 w-9 text-revora-cobalt/30" />
                <blockquote className="mt-2 font-heading text-[clamp(1.15rem,2vw,1.45rem)] font-bold italic leading-relaxed text-revora-slate">
                  “We are a young company with an old-fashioned belief: trust is earned one prescription, one batch and one partnership at a time.”
                </blockquote>
              </div>
            </FadeUp>

            <FadeUp delay={0.25}>
              <div className="mt-7 space-y-4 font-sans text-[15.5px] leading-[1.8] text-revora-slate-light">
                <p>
                  From our Ahmedabad headquarters, Revora brings 15+ years of pharmaceutical leadership to doctors, partners and markets in India and
                  abroad.
                </p>
              </div>
            </FadeUp>

            {/* signatory block & CTA */}
            <FadeUp delay={0.35}>
              <div className="mt-9 flex flex-wrap items-center justify-between gap-6 border-t border-revora-cobalt/10 pt-7">
                <div>
                  <p className="font-heading text-xl font-extrabold text-revora-slate">
                    {SITE.founder.name}
                  </p>
                  <p className="font-sans text-[13px] font-medium text-revora-slate-light">
                    {SITE.founder.title} · {SITE.legalName} · Ahmedabad, Gujarat
                  </p>
                </div>

                <Link
                  href="/about"
                  className="group inline-flex items-center gap-2 rounded-full border border-revora-cobalt/20 bg-white px-5 py-3 font-sans text-[14px] font-semibold text-revora-cobalt transition-all duration-300 hover:border-revora-cobalt hover:bg-revora-cobalt hover:text-white"
                >
                  <span>Our company story</span>
                  <ArrowUpRight className="h-4 w-4 transition-transform duration-300 group-hover:rotate-45" />
                </Link>
              </div>
            </FadeUp>
          </div>

        </div>
      </div>
    </section>
  );
}
