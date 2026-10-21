'use client';

import { useEffect, useRef, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import {
  AnimatePresence,
  LayoutGroup,
  motion,
  useInView,
  useMotionValue,
  useReducedMotion,
  useSpring,
} from 'framer-motion';
import {
  ArrowLeft,
  ArrowRight,
  ArrowUpRight,
  Box,
  Clock,
  FileText,
  FlaskConical,
  HeartPulse,
  ListChecks,
  ShieldAlert,
  ShieldCheck,
  Thermometer,
} from 'lucide-react';
import { expoOut } from '@/lib/easings';
import { ALL_PRODUCTS, Product, TherapyCategory, getProductsByCategory } from '@/lib/therapies-data';
import { AnchorLink, Eyebrow, FadeUp } from '@/components/ui/primitives';
import { Breadcrumb } from '@/components/ui/breadcrumb';
import { Button } from '@/components/ui/button';
import { ProductLogo, ProductLogoLink } from '@/components/offerings/product-logo';
import { FormularyBanner } from '@/components/offerings/formulary-banner';
import { LazyFormularyModal as FormularyModal } from '@/components/offerings/lazy-formulary-modal';

interface ProductClientProps {
  product: Product;
  category: TherapyCategory;
}

const SECTIONS = [
  { id: 'composition', label: 'Composition', icon: FlaskConical },
  { id: 'mechanism', label: 'Mechanism of action', icon: HeartPulse },
  { id: 'indications', label: 'Indications', icon: ListChecks },
  { id: 'dosage', label: 'Dosage', icon: Clock },
  { id: 'storage', label: 'Storage & packaging', icon: Box },
] as const;

/** "Moxifloxacin Hydrochloride IP eq. to Moxifloxacin 0.5% w/v" → name / equivalence / strength. */
function parseIngredient(line: string) {
  const m = line.match(/^(.*?)\s+([\d.]+%\s*w\/v)$/);
  if (m) {
    const [name, eq] = m[1].split(/\s+eq\. to\s+/);
    return { name, note: eq ? `eq. to ${eq}` : undefined, strength: m[2] };
  }
  if (/\s*q\.s\.$/.test(line)) return { name: line.replace(/\s*q\.s\.$/, ''), strength: 'q.s.' };
  return { name: line };
}

export function ProductClient({ product, category }: ProductClientProps) {
  const reduce = useReducedMotion();
  const [modalOpen, setModalOpen] = useState(false);
  const [active, setActive] = useState<string>(SECTIONS[0].id);

  const idx = ALL_PRODUCTS.findIndex((p) => p.id === product.id);
  const prev = ALL_PRODUCTS[(idx - 1 + ALL_PRODUCTS.length) % ALL_PRODUCTS.length];
  const next = ALL_PRODUCTS[(idx + 1) % ALL_PRODUCTS.length];
  const sameArea = getProductsByCategory(category.slug).filter((p) => p.id !== product.id);
  const related = (sameArea.length ? sameArea : ALL_PRODUCTS.filter((p) => p.id !== product.id)).slice(0, 3);
  const isRx = /schedule/i.test(product.schedule);
  const [supplyClass] = product.schedule.split(' — ');

  // Hero CTAs out of view → show the mobile sticky bar.
  const ctaRef = useRef<HTMLDivElement>(null);
  const ctaVisible = useInView(ctaRef, { margin: '0px 0px -10% 0px' });
  // …and tuck it away again at the end of the page so it never covers the footer.
  const endRef = useRef<HTMLElement>(null);
  const atEnd = useInView(endRef, { margin: '100000px 0px 0px 0px' });

  // Scroll-spy for the monograph contents.
  useEffect(() => {
    const els = SECTIONS.map((s) => document.getElementById(s.id)).filter(Boolean) as HTMLElement[];
    const io = new IntersectionObserver(
      (entries) => {
        const hit = entries.filter((e) => e.isIntersecting).sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top)[0];
        if (hit) setActive(hit.target.id);
      },
      { rootMargin: '-35% 0px -55% 0px' }
    );
    els.forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, []);

  const facts = [
    { label: 'Pack', value: product.volume },
    { label: 'Therapy area', value: category.shortName, href: `/our-offerings/${category.slug}` },
    { label: 'Class', value: product.badge },
    { label: 'Supply', value: supplyClass },
  ];

  return (
    <>
      {/* ── hero ── */}
      <section className="relative isolate overflow-hidden px-5 pb-20 pt-36 tablet:px-8 tablet:pb-28 tablet:pt-44 desktop:pt-52">
        <div
          aria-hidden
          className="absolute -left-40 top-20 -z-10 h-[620px] w-[620px] rounded-full opacity-[0.12] blur-3xl"
          style={{ background: product.color }}
        />
        <div className="mx-auto max-w-330">
          <Breadcrumb
            items={[
              { label: 'Home', href: '/' },
              { label: 'Our Offerings', href: '/our-offerings' },
              { label: category.shortName, href: `/our-offerings/${category.slug}` },
              { label: product.name },
            ]}
          />

          <div className="mt-10 grid grid-cols-[minmax(0,1fr)] items-start gap-10 tablet:gap-12 tablet-lg:grid-cols-2 desktop:gap-16">
            <ZoomStage product={product} reduce={!!reduce} />

            <div className="tablet-lg:pt-2 desktop:pt-4">
              <motion.span
                initial={reduce ? false : { opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7, delay: 0.1, ease: expoOut }}
                className="font-sans text-[12px] font-semibold uppercase tracking-[0.16em]"
                style={{ color: product.color }}
              >
                {product.badge}
              </motion.span>
              <motion.h1
                initial={reduce ? false : { opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 1, delay: 0.15, ease: expoOut }}
                className="mt-3 font-heading text-[clamp(2.8rem,6vw,5.2rem)] font-extrabold leading-[0.98] tracking-[-0.03em] text-revora-slate"
              >
                {product.name}
              </motion.h1>
              <FadeUp delay={0.3}>
                <p className="mt-4 font-heading text-[clamp(1.1rem,1.8vw,1.35rem)] font-semibold leading-snug text-revora-cobalt">
                  {product.genericName}
                </p>
                <p className="mt-5 border-l-2 pl-4 font-sans text-[15px] italic leading-[1.65] text-revora-slate-light" style={{ borderColor: product.color }}>
                  {product.tagline}
                </p>
                <p className="mt-5 font-sans text-[16px] leading-[1.75] text-revora-slate-light">{product.summary}</p>
              </FadeUp>

              <FadeUp delay={0.4}>
                <dl className="mt-8 grid grid-cols-2 gap-px overflow-hidden rounded-[20px] border border-revora-cobalt/10 bg-revora-cobalt/10">
                  {facts.map((f) => (
                    <div key={f.label} className="bg-white px-5 py-4">
                      <dt className="font-sans text-[11px] font-semibold uppercase tracking-[0.14em] text-revora-slate-muted">{f.label}</dt>
                      <dd className="mt-1 font-sans text-[14.5px] font-semibold leading-snug text-revora-slate">
                        {f.href ? (
                          <Link href={f.href} className="text-revora-cobalt hover:underline">
                            {f.value}
                          </Link>
                        ) : (
                          f.value
                        )}
                      </dd>
                    </div>
                  ))}
                </dl>
              </FadeUp>

              <FadeUp delay={0.5}>
                <div
                  className={`mt-5 flex items-start gap-3 rounded-[16px] border px-4 py-3.5 font-sans text-[13.5px] leading-[1.55] ${
                    isRx
                      ? 'border-revora-crimson/25 bg-revora-crimson-tint text-revora-crimson-dark'
                      : 'border-revora-cobalt/15 bg-revora-sky text-revora-cobalt-dark'
                  }`}
                >
                  {isRx ? <ShieldAlert className="mt-0.5 h-4 w-4 shrink-0" /> : <ShieldCheck className="mt-0.5 h-4 w-4 shrink-0" />}
                  <span>{product.schedule}</span>
                </div>
              </FadeUp>

              <FadeUp delay={0.6}>
                <div ref={ctaRef} className="mt-8 flex flex-wrap items-center gap-3">
                  <Button onClick={() => setModalOpen(true)} arrow="up-right" magnetic>Request samples</Button>
                  <Button onClick={() => setModalOpen(true)} variant="outline" icon={<FileText />}>Request prescribing info</Button>
                </div>
              </FadeUp>
            </div>
          </div>
        </div>
      </section>

      {/* ── monograph ── */}
      <section className="bg-white px-5 py-20 tablet:px-8 tablet:py-28">
        <div className="mx-auto grid max-w-330 grid-cols-[minmax(0,1fr)] gap-10 desktop:grid-cols-[260px_minmax(0,1fr)] desktop:gap-20">
          {/* contents */}
          <aside className="desktop:sticky desktop:top-48 desktop:self-start">
            <Eyebrow>Product monograph</Eyebrow>
            <LayoutGroup id="toc">
              <ul className="-mx-5 mt-6 flex gap-2 overflow-x-auto px-5 pb-1 [scrollbar-width:none] desktop:mx-0 desktop:flex-col desktop:gap-1 desktop:px-0">
                {SECTIONS.map((s) => {
                  const on = active === s.id;
                  return (
                    <li key={s.id} className="shrink-0">
                      <AnchorLink
                        href={`#${s.id}`}
                        aria-current={on ? 'true' : undefined}
                        className={`relative flex items-center gap-3 rounded-full px-4 py-2.5 font-sans text-[14px] font-semibold transition-colors duration-300 desktop:rounded-xl ${
                          on ? 'text-revora-cobalt' : 'text-revora-slate-light hover:text-revora-cobalt'
                        }`}
                      >
                        {on && (
                          <motion.span
                            layoutId="toc-active"
                            className="absolute inset-0 rounded-full bg-revora-sky desktop:rounded-xl"
                            transition={{ type: 'spring', stiffness: 380, damping: 34 }}
                          />
                        )}
                        <s.icon className="relative h-4 w-4" />
                        <span className="relative whitespace-nowrap">{s.label}</span>
                      </AnchorLink>
                    </li>
                  );
                })}
              </ul>
            </LayoutGroup>
          </aside>

          <div className="space-y-20 tablet:space-y-24">
            <MonographSection id="composition" title="Composition" kicker="Each ml / unit contains">
              <div className="overflow-hidden rounded-[20px] border border-revora-cobalt/10">
                {product.composition.map((line, i) => {
                  const ing = parseIngredient(line);
                  return (
                    <motion.div
                      key={line}
                      initial={reduce ? false : { opacity: 0, x: -16 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.6, delay: i * 0.07, ease: expoOut }}
                      className="flex items-center justify-between gap-6 border-b border-revora-cobalt/10 px-5 py-4 last:border-b-0 tablet:px-6"
                    >
                      <div>
                        <p className="font-sans text-[15.5px] font-semibold text-revora-slate">{ing.name}</p>
                        {ing.note && <p className="mt-0.5 font-sans text-[13px] text-revora-slate-muted">{ing.note}</p>}
                      </div>
                      {ing.strength && (
                        <span
                          className="shrink-0 rounded-full px-3 py-1 font-mono text-[13px] font-semibold"
                          style={{ color: product.color, background: `${product.color}12` }}
                        >
                          {ing.strength}
                        </span>
                      )}
                    </motion.div>
                  );
                })}
              </div>
            </MonographSection>

            <MonographSection id="mechanism" title="Mechanism of action" kicker="How it works">
              <p className="font-heading text-[clamp(1.15rem,1.9vw,1.5rem)] font-semibold leading-[1.55] text-revora-slate">
                {product.mechanismOfAction}
              </p>
            </MonographSection>

            <MonographSection id="indications" title="Indications" kicker="Clinical use">
              <ol className="grid gap-3 tablet:grid-cols-2">
                {product.indications.map((ind, i) => (
                  <motion.li
                    key={ind}
                    initial={reduce ? false : { opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6, delay: i * 0.08, ease: expoOut }}
                    className="flex gap-4 rounded-[20px] border border-revora-cobalt/10 bg-[#F6F9FC] p-5"
                  >
                    <span
                      className="grid h-8 w-8 shrink-0 place-items-center rounded-full font-sans text-[13px] font-bold text-white"
                      style={{ background: product.color }}
                    >
                      {i + 1}
                    </span>
                    <span className="font-sans text-[15px] font-medium leading-[1.55] text-revora-slate">{ind}</span>
                  </motion.li>
                ))}
              </ol>
            </MonographSection>

            <MonographSection id="dosage" title="Dosage & administration" kicker="As directed by the prescriber">
              <div className="flex gap-5 rounded-[24px] p-6 tablet:p-8" style={{ background: `${product.color}0D` }}>
                <span className="grid h-12 w-12 shrink-0 place-items-center rounded-2xl bg-white" style={{ color: product.color }}>
                  <Clock className="h-5 w-5" />
                </span>
                <p className="font-sans text-[16.5px] font-medium leading-[1.7] text-revora-slate">{product.dosage}</p>
              </div>
            </MonographSection>

            <MonographSection id="storage" title="Storage & packaging" kicker="Handling">
              <div className="grid gap-4 tablet:grid-cols-2">
                {[
                  { icon: Thermometer, label: 'Storage', text: product.storage, tone: 'text-revora-crimson' },
                  { icon: Box, label: 'Container', text: product.packaging, tone: 'text-revora-cobalt' },
                ].map((c) => (
                  <div key={c.label} className="rounded-[20px] border border-revora-cobalt/10 p-6">
                    <c.icon className={`h-6 w-6 ${c.tone}`} />
                    <p className="mt-4 font-sans text-[12px] font-semibold uppercase tracking-[0.14em] text-revora-slate-muted">{c.label}</p>
                    <p className="mt-1.5 font-sans text-[15px] leading-[1.65] text-revora-slate">{c.text}</p>
                  </div>
                ))}
              </div>
            </MonographSection>
          </div>
        </div>
      </section>

      {/* ── CTA ── */}
      <div className="px-5 pt-24 tablet:px-8 tablet:pt-32">
        <div className="mx-auto max-w-330">
          <FormularyBanner
            title={`Stock ${product.name} at your hospital or pharmacy.`}
            description="Samples, literature or a rate card — our team replies across India."
            buttonLabel="Request rate card & samples"
            onAction={() => setModalOpen(true)}
          />
        </div>
      </div>

      {/* ── related ── */}
      <section className="px-5 py-24 tablet:px-8 tablet:py-32">
        <div className="mx-auto max-w-330">
          <div className="flex items-end justify-between gap-6">
            <div>
              <Eyebrow>{sameArea.length ? `More in ${category.shortName}` : 'More from Revora'}</Eyebrow>
              <h2 className="mt-5 font-heading text-[clamp(1.8rem,3.6vw,2.8rem)] font-extrabold tracking-[-0.02em] text-revora-slate">
                Related formulations
              </h2>
            </div>
            <Link
              href={sameArea.length ? `/our-offerings/${category.slug}` : '/our-offerings'}
              className="group hidden shrink-0 items-center gap-1.5 font-sans text-[14px] font-semibold text-revora-cobalt tablet:inline-flex"
            >
              View all <ArrowUpRight className="h-4 w-4 transition-transform duration-500 group-hover:rotate-45" />
            </Link>
          </div>
          <div className="mt-10 grid grid-cols-1 items-center gap-10 tablet:grid-cols-2 desktop:grid-cols-3">
            {related.map((p, i) => (
              <FadeUp key={p.id} delay={i * 0.08}>
                <ProductLogoLink product={p} />
              </FadeUp>
            ))}
          </div>

          {/* prev / next */}
          <nav ref={endRef} aria-label="Browse products" className="mt-16 grid gap-4 border-t border-revora-cobalt/10 pt-10 tablet:grid-cols-2">
            {[
              { p: prev, dir: 'Previous', Icon: ArrowLeft },
              { p: next, dir: 'Next', Icon: ArrowRight },
            ].map(({ p, dir, Icon }) => (
              <Link
                key={dir}
                href={`/products/${p.id}`}
                className={`group flex items-center gap-4 rounded-[20px] border border-revora-cobalt/10 bg-white p-4 transition-shadow duration-500 hover:shadow-[0_20px_40px_-24px_rgba(11,74,143,0.45)] ${
                  dir === 'Next' ? 'tablet:flex-row-reverse tablet:text-right' : ''
                }`}
              >
                <ProductLogo product={p} link={false} sizes="120px" className="h-16 w-28 shrink-0 rounded-2xl border border-revora-cobalt/10" />
                <span className="flex-1">
                  <span className="flex items-center gap-1.5 font-sans text-[12px] font-semibold uppercase tracking-[0.14em] text-revora-slate-muted tablet:inline-flex">
                    {dir === 'Previous' && <Icon className="h-3.5 w-3.5" />}
                    {dir} product
                    {dir === 'Next' && <Icon className="h-3.5 w-3.5" />}
                  </span>
                  <span className="mt-1 block font-heading text-[18px] font-extrabold text-revora-slate transition-colors group-hover:text-revora-cobalt">
                    {p.name}
                  </span>
                </span>
              </Link>
            ))}
          </nav>
        </div>
      </section>

      {/* ── mobile sticky CTA ── */}
      <AnimatePresence>
        {!ctaVisible && !atEnd && !modalOpen && (
          <motion.div
            initial={{ y: '120%' }}
            animate={{ y: 0 }}
            exit={{ y: '120%' }}
            transition={{ duration: 0.5, ease: expoOut }}
            className="fixed inset-x-3 bottom-3 z-80 flex items-center justify-between gap-3 rounded-2xl border border-revora-cobalt/10 bg-white/95 p-3 pl-5 shadow-[0_20px_50px_-20px_rgba(11,74,143,0.45)] backdrop-blur desktop:hidden"
          >
            <span className="min-w-0">
              <span className="block truncate font-heading text-[16px] font-extrabold text-revora-slate">{product.name}</span>
              <span className="block truncate font-sans text-[12px] text-revora-slate-muted">{product.volume}</span>
            </span>
            <button
              type="button"
              onClick={() => setModalOpen(true)}
              className="shrink-0 rounded-full bg-revora-cobalt px-5 py-3 font-sans text-[14px] font-semibold text-white"
            >
              Request samples
            </button>
          </motion.div>
        )}
      </AnimatePresence>

      <FormularyModal isOpen={modalOpen} onClose={() => setModalOpen(false)} product={product} categoryName={category.title} />
    </>
  );
}

function MonographSection({ id, title, kicker, children }: { id: string; title: string; kicker: string; children: React.ReactNode }) {
  return (
    <section id={id} className="scroll-mt-32 desktop:scroll-mt-48">
      <FadeUp>
        <p className="font-sans text-[12px] font-semibold uppercase tracking-[0.16em] text-revora-slate-muted">{kicker}</p>
        <h2 className="mt-2 font-heading text-[clamp(1.7rem,3vw,2.4rem)] font-extrabold tracking-[-0.02em] text-revora-slate">{title}</h2>
      </FadeUp>
      <div className="mt-7">{children}</div>
    </section>
  );
}

/** Product photo that reveals with a wipe and magnifies under the cursor. */
function ZoomStage({ product, reduce }: { product: Product; reduce: boolean }) {
  const ox = useMotionValue(0.5);
  const oy = useMotionValue(0.5);
  const scale = useSpring(1, { stiffness: 200, damping: 26 });

  return (
    <motion.div
      initial={reduce ? false : { clipPath: 'inset(0 0 100% 0 round 32px)' }}
      animate={{ clipPath: 'inset(0 0 0% 0 round 32px)' }}
      transition={{ duration: 1.1, ease: expoOut }}
      className="relative mx-auto aspect-square w-full max-w-[560px] overflow-hidden rounded-[24px] bg-white shadow-[0_40px_80px_-40px_rgba(11,74,143,0.45)] tablet:rounded-[32px] tablet-lg:sticky tablet-lg:top-32 tablet-lg:max-w-none desktop:top-48"
      onPointerMove={(e) => {
        if (reduce || e.pointerType !== 'mouse') return;
        const r = e.currentTarget.getBoundingClientRect();
        ox.set((e.clientX - r.left) / r.width);
        oy.set((e.clientY - r.top) / r.height);
      }}
      onPointerEnter={(e) => !reduce && e.pointerType === 'mouse' && scale.set(1.7)}
      onPointerLeave={() => scale.set(1)}
    >
      <motion.div className="absolute inset-0" style={{ scale, originX: ox, originY: oy }}>
        <Image
          src={product.image}
          alt={`${product.name} carton and container`}
          fill
          loading="eager"
          sizes="(max-width: 1023px) min(100vw, 560px), 50vw"
          className="object-cover"
        />
      </motion.div>
      <span className="pointer-events-none absolute bottom-5 left-5 hidden rounded-full bg-white/90 px-3.5 py-1.5 font-sans text-[12px] font-semibold text-revora-slate-light backdrop-blur desktop:inline-block">
        Hover to zoom
      </span>
    </motion.div>
  );
}
