'use client';

import { useRef, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { AnimatePresence, motion, useInView, useMotionValue, useReducedMotion, useSpring } from 'framer-motion';
import { ArrowLeft, ArrowRight, Clock, FileText, FlaskConical, ListChecks, ShieldAlert, ShieldCheck, Thermometer } from 'lucide-react';
import { expoOut } from '@/lib/easings';
import { ALL_PRODUCTS, Product, TherapyCategory, getProductsByCategory } from '@/lib/therapies-data';
import { Eyebrow, FadeUp } from '@/components/ui/primitives';
import { Breadcrumb } from '@/components/ui/breadcrumb';
import { Button } from '@/components/ui/button';
import { ProductLogo, ProductLogoLink } from '@/components/offerings/product-logo';
import { LazyFormularyModal as FormularyModal } from '@/components/offerings/lazy-formulary-modal';

interface ProductClientProps {
  product: Product;
  category: TherapyCategory;
}

/** "Moxifloxacin Hydrochloride IP eq. to Moxifloxacin 0.5% w/v" → name / equivalence / strength. */
function parseIngredient(line: string) {
  const m = line.match(/^(.*?)\s+([\d.]+%\s*w\/v)$/);
  if (m) {
    const [name, eq] = m[1].split(/\s+eq\. to\s+/);
    return { name, note: eq ? `eq. to ${eq}` : undefined, strength: m[2] };
  }
  if (/\s*q\.s\.$/.test(line)) return { name: line.replace(/\s*q\.s\.$/, ''), strength: 'q.s.', vehicle: true };
  return { name: line };
}

/** Dose, frequency and duration inside the dosage text, so they stand out. */
const DOSE_RE = /(\d+(?:\s(?:to|or)\s\d+)?\s(?:drops?|tablets?)|\d+(?:\sto\s\d+)?\stimes daily|for (?:up to )?\d+ days|as needed)/gi;

export function ProductClient({ product, category }: ProductClientProps) {
  const reduce = useReducedMotion();
  const [modalOpen, setModalOpen] = useState(false);

  const idx = ALL_PRODUCTS.findIndex((p) => p.id === product.id);
  const prev = ALL_PRODUCTS[(idx - 1 + ALL_PRODUCTS.length) % ALL_PRODUCTS.length];
  const next = ALL_PRODUCTS[(idx + 1) % ALL_PRODUCTS.length];
  const sameArea = getProductsByCategory(category.slug).filter((p) => p.id !== product.id);
  const related = (sameArea.length ? sameArea : ALL_PRODUCTS.filter((p) => p.id !== product.id)).slice(0, 3);
  const isRx = /schedule/i.test(product.schedule);
  const [supply] = product.schedule.split(' — ');
  const perUnit = /tablet/i.test(product.volume) ? 'Each tablet contains' : 'Each ml contains';

  // Hero CTAs out of view → show the mobile sticky bar…
  const ctaRef = useRef<HTMLDivElement>(null);
  const ctaVisible = useInView(ctaRef, { margin: '0px 0px -10% 0px' });
  // …and tuck it away at the end of the page so it never covers the footer.
  const endRef = useRef<HTMLElement>(null);
  const atEnd = useInView(endRef, { margin: '100000px 0px 0px 0px' });

  return (
    <>
      {/* ── hero ── */}
      <section className="relative isolate overflow-hidden px-5 pb-16 pt-36 tablet:px-8 tablet:pb-24 tablet:pt-44 desktop:pt-52">
        <div aria-hidden className="absolute -left-40 top-20 -z-10 h-155 w-155 rounded-full opacity-[0.12] blur-3xl" style={{ background: product.color }} />
        <div className="mx-auto max-w-330">
          <Breadcrumb
            items={[
              { label: 'Home', href: '/' },
              { label: 'Portfolio', href: '/profile#portfolio' },
              { label: category.shortName },
              { label: product.name },
            ]}
          />

          <div className="mt-10 grid grid-cols-[minmax(0,1fr)] items-center gap-10 tablet:gap-12 tablet-lg:grid-cols-2 desktop:gap-16">
            <ZoomStage product={product} reduce={!!reduce} />

            <div>
              <motion.p
                initial={reduce ? false : { opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7, delay: 0.1, ease: expoOut }}
                className="inline-flex flex-wrap items-center gap-x-2 gap-y-1 font-sans text-[12px] font-semibold uppercase tracking-[0.14em] text-revora-slate-muted"
              >
                <span className="inline-flex items-center gap-2 whitespace-nowrap">
                  <span className="h-2 w-2 rounded-full" style={{ background: product.color }} />
                  {category.shortName}
                </span>
                <span aria-hidden>·</span>
                <span className="whitespace-nowrap" style={{ color: product.color }}>{product.badge}</span>
              </motion.p>
              <motion.h1
                initial={reduce ? false : { opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 1, delay: 0.15, ease: expoOut }}
                className="mt-4 font-heading text-[clamp(2.8rem,6vw,5rem)] font-extrabold leading-[0.95] tracking-[-0.035em] text-revora-slate"
              >
                {product.name}
              </motion.h1>
              <FadeUp delay={0.3}>
                <p className="mt-4 font-heading text-[clamp(1.1rem,1.8vw,1.3rem)] font-semibold leading-snug text-revora-cobalt">{product.genericName}</p>
                <p className="mt-4 max-w-lg font-sans text-[16.5px] leading-[1.7] text-revora-slate-light">{product.summary}</p>
              </FadeUp>

              <FadeUp delay={0.4}>
                <dl className="mt-7 grid grid-cols-2 gap-px overflow-hidden rounded-[18px] border border-revora-cobalt/10 bg-revora-cobalt/10">
                  {[
                    { label: 'Pack', value: product.volume },
                    { label: 'Supply', value: supply },
                  ].map((f) => (
                    <div key={f.label} className="bg-white px-5 py-4">
                      <dt className="font-sans text-[11px] font-semibold uppercase tracking-[0.14em] text-revora-slate-muted">{f.label}</dt>
                      <dd className="mt-1 font-sans text-[14.5px] font-semibold leading-snug text-revora-slate">{f.value}</dd>
                    </div>
                  ))}
                </dl>
                <p
                  className={`mt-3 flex items-start gap-2.5 font-sans text-[13px] leading-[1.55] ${isRx ? 'text-revora-crimson-dark' : 'text-revora-cobalt-dark'}`}
                >
                  {isRx ? <ShieldAlert className="mt-0.5 h-4 w-4 shrink-0" /> : <ShieldCheck className="mt-0.5 h-4 w-4 shrink-0" />}
                  {product.schedule}
                </p>
              </FadeUp>

              <FadeUp delay={0.5}>
                <div ref={ctaRef} className="mt-8 flex flex-wrap items-center gap-3">
                  <Button onClick={() => setModalOpen(true)} arrow="up-right" magnetic>Request samples</Button>
                  <Button onClick={() => setModalOpen(true)} variant="outline" icon={<FileText />}>Prescribing info</Button>
                </div>
              </FadeUp>
            </div>
          </div>
        </div>
      </section>

      {/* ── details ── */}
      <section className="bg-white px-5 py-20 tablet:px-8 tablet:py-24">
        <div className="mx-auto max-w-330">
          <Eyebrow>Product details</Eyebrow>
          <div className="mt-8 grid gap-5 tablet-lg:grid-cols-2">
            <DetailCard icon={FlaskConical} title="Composition" kicker={perUnit} color={product.color}>
              <ul>
                {product.composition.map((line) => {
                  const ing = parseIngredient(line);
                  return (
                    <li key={line} className="flex items-baseline gap-3 border-b border-dashed border-revora-cobalt/15 py-3 last:border-b-0 last:pb-0">
                      <span className="min-w-0">
                        <span className={`block font-sans text-[15px] font-semibold leading-snug ${ing.vehicle ? 'text-revora-slate-light' : 'text-revora-slate'}`}>{ing.name}</span>
                        {ing.note && <span className="mt-0.5 block font-sans text-[12.5px] text-revora-slate-muted">{ing.note}</span>}
                      </span>
                      {ing.strength && (
                        <>
                          <span aria-hidden className="min-w-4 flex-1 border-b border-dotted border-revora-cobalt/25" />
                          <span className="shrink-0 font-mono text-[14px] font-semibold" style={{ color: ing.vehicle ? undefined : product.color }}>{ing.strength}</span>
                        </>
                      )}
                    </li>
                  );
                })}
              </ul>
            </DetailCard>

            <DetailCard icon={ListChecks} title="Uses" kicker="Indicated for" color={product.color}>
              <ul className="space-y-3">
                {product.indications.map((ind) => (
                  <li key={ind} className="flex gap-3 font-sans text-[15px] font-medium leading-[1.55] text-revora-slate">
                    <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full" style={{ background: product.color }} />
                    {ind}
                  </li>
                ))}
              </ul>
            </DetailCard>

            <DetailCard icon={Clock} title="How to use" kicker="As directed by the doctor" color={product.color}>
              <p className="font-sans text-[15.5px] leading-[1.7] text-revora-slate">
                {product.dosage.split(DOSE_RE).map((part, i) =>
                  i % 2 ? (
                    <b key={i} className="whitespace-nowrap font-bold" style={{ color: product.color }}>
                      {part}
                    </b>
                  ) : (
                    part
                  )
                )}
              </p>
            </DetailCard>

            <DetailCard icon={Thermometer} title="Storage" kicker="Keep it right" color={product.color}>
              <p className="font-sans text-[15.5px] leading-[1.7] text-revora-slate">{product.storage}</p>
            </DetailCard>
          </div>
        </div>
      </section>

      {/* ── more products ── */}
      <section className="px-5 py-20 tablet:px-8 tablet:py-24">
        <div className="mx-auto max-w-330">
          <Eyebrow>{sameArea.length ? `More in ${category.shortName}` : 'More from Revora'}</Eyebrow>
          <div className="mt-8 grid grid-cols-1 items-center gap-8 tablet:grid-cols-3">
            {related.map((p, i) => (
              <FadeUp key={p.id} delay={i * 0.08}>
                <ProductLogoLink product={p} eager={false} className="h-30 w-full tablet:h-35" />
              </FadeUp>
            ))}
          </div>

          {/* prev / next */}
          <nav ref={endRef} aria-label="Browse products" className="mt-14 grid gap-4 border-t border-revora-cobalt/10 pt-10 tablet:grid-cols-2">
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
                <ProductLogo product={p} link={false} eager={false} sizes="120px" className="h-16 w-28 shrink-0 rounded-2xl border border-revora-cobalt/10" />
                <span className="flex-1">
                  <span className="flex items-center gap-1.5 font-sans text-[12px] font-semibold uppercase tracking-[0.14em] text-revora-slate-muted tablet:inline-flex">
                    {dir === 'Previous' && <Icon className="h-3.5 w-3.5" />}
                    {dir} product
                    {dir === 'Next' && <Icon className="h-3.5 w-3.5" />}
                  </span>
                  <span className="mt-1 block font-heading text-[18px] font-extrabold text-revora-slate transition-colors group-hover:text-revora-cobalt">{p.name}</span>
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

function DetailCard({ icon: Icon, title, kicker, color, children }: { icon: typeof Clock; title: string; kicker: string; color: string; children: React.ReactNode }) {
  return (
    <FadeUp className="h-full">
      <div className="h-full rounded-3xl border border-revora-cobalt/10 bg-[#F6F9FC] p-6 tablet:p-8">
        <div className="flex items-center gap-3.5">
          <span className="grid h-11 w-11 shrink-0 place-items-center rounded-xl bg-white shadow-sm" style={{ color }}>
            <Icon className="h-5 w-5" />
          </span>
          <div>
            <p className="font-sans text-[11px] font-semibold uppercase tracking-[0.14em] text-revora-slate-muted">{kicker}</p>
            <h2 className="font-heading text-[1.3rem] font-extrabold leading-tight text-revora-slate">{title}</h2>
          </div>
        </div>
        <div className="mt-6">{children}</div>
      </div>
    </FadeUp>
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
      className="relative mx-auto aspect-square w-full max-w-140 overflow-hidden rounded-3xl bg-white shadow-[0_40px_80px_-40px_rgba(11,74,143,0.45)] tablet:rounded-4xl tablet-lg:max-w-none"
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
