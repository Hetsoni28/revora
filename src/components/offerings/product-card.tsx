'use client';

import Image from 'next/image';
import Link from 'next/link';
import { motion, useReducedMotion } from 'framer-motion';
import { ArrowUpRight } from 'lucide-react';
import { expoOut } from '@/lib/easings';
import { Product, THERAPY_CATEGORIES } from '@/lib/therapies-data';

const AREA = Object.fromEntries(THERAPY_CATEGORIES.map((c) => [c.slug, c.shortName]));

interface ProductCardProps {
  product: Product;
  /** Position in its grid — staggers the entrance. */
  index?: number;
  /** Show the first indications under the summary. */
  detailed?: boolean;
  onRequestSample?: (product: Product) => void;
  /** Load the photo immediately — for cards in the first visible row. */
  eager?: boolean;
}

/** Product tile: photo stage, identity, and a clear path to the full monograph. */
export function ProductCard({ product, index = 0, detailed = false, onRequestSample, eager = false }: ProductCardProps) {
  const reduce = useReducedMotion();

  return (
    <motion.article
      layout={!reduce}
      initial={reduce ? false : { opacity: 0, y: 28 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-6% 0px' }}
      exit={reduce ? undefined : { opacity: 0, scale: 0.96 }}
      transition={{ duration: 0.6, delay: (index % 6) * 0.05, ease: expoOut }}
      className="group relative flex h-full flex-col overflow-hidden rounded-[24px] border border-revora-cobalt/10 bg-white transition-shadow duration-500 hover:shadow-[0_28px_60px_-28px_rgba(11,74,143,0.45)]"
    >
      <Link
        href={`/products/${product.id}`}
        className="relative block aspect-[4/3] overflow-hidden"
        aria-label={`${product.name} — view product details`}
      >
        <Image
          src={product.image}
          alt={`${product.name} carton and container`}
          fill
          loading={eager ? 'eager' : 'lazy'}
          sizes="(max-width: 640px) 100vw, (max-width: 1280px) 50vw, 33vw"
          className="object-cover transition-transform duration-[900ms] ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-[1.06]"
        />
        <span
          aria-hidden
          className="absolute inset-0 opacity-0 transition-opacity duration-500 group-hover:opacity-100"
          style={{ background: `linear-gradient(180deg, transparent 55%, ${product.color}33)` }}
        />
        <span className="absolute left-4 top-4 rounded-full bg-white/90 px-3 py-1 font-sans text-[11px] font-semibold uppercase tracking-[0.14em] text-revora-slate backdrop-blur">
          {AREA[product.categorySlug]}
        </span>
        <span className="absolute bottom-4 right-4 grid h-11 w-11 translate-y-2 place-items-center rounded-full bg-white text-revora-cobalt opacity-0 shadow-lg transition-all duration-500 group-hover:translate-y-0 group-hover:opacity-100">
          <ArrowUpRight className="h-5 w-5" />
        </span>
      </Link>

      <div className="flex flex-1 flex-col p-6">
        <span className="font-sans text-[11px] font-semibold uppercase tracking-[0.14em]" style={{ color: product.color }}>
          {product.badge}
        </span>
        <h3 className="mt-2 font-heading text-[1.5rem] font-extrabold leading-tight tracking-[-0.01em] text-revora-slate">
          <Link href={`/products/${product.id}`} className="transition-colors hover:text-revora-cobalt">
            {product.name}
          </Link>
        </h3>
        <p className="mt-1.5 font-sans text-[14px] font-medium leading-snug text-revora-cobalt">{product.genericName}</p>
        <p className="mt-3 line-clamp-2 font-sans text-[14px] leading-[1.65] text-revora-slate-light">{product.summary}</p>

        {detailed && (
          <ul className="mt-4 space-y-1.5 border-t border-revora-cobalt/10 pt-4">
            {product.indications.slice(0, 2).map((ind) => (
              <li key={ind} className="flex gap-2 font-sans text-[13px] leading-snug text-revora-slate-light">
                <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full" style={{ background: product.color }} />
                {ind}
              </li>
            ))}
          </ul>
        )}

        <div className="mt-auto flex items-center justify-between gap-3 pt-6">
          <span className="font-sans text-[12.5px] text-revora-slate-muted">{product.volume}</span>
          {onRequestSample ? (
            <button
              type="button"
              onClick={() => onRequestSample(product)}
              className="shrink-0 rounded-full border border-revora-cobalt/20 px-4 py-2 font-sans text-[12.5px] font-semibold text-revora-cobalt transition-colors hover:border-revora-cobalt hover:bg-revora-cobalt hover:text-white"
            >
              Request sample
            </button>
          ) : (
            <Link
              href={`/products/${product.id}`}
              className="-my-2 inline-flex min-h-10 shrink-0 items-center gap-1 font-sans text-[13px] font-semibold text-revora-cobalt"
            >
              Details <ArrowUpRight className="h-4 w-4 transition-transform duration-500 group-hover:rotate-45" />
            </Link>
          )}
        </div>
      </div>
    </motion.article>
  );
}
