import Image from 'next/image';
import Link from 'next/link';
import { Product } from '@/lib/therapies-data';

interface ProductLogoProps {
  product: Product;
  /** Tailwind aspect/size classes for the tile. */
  className?: string;
  /** Wrap in a link to the product page (default). */
  link?: boolean;
  sizes?: string;
  eager?: boolean;
}

/**
 * The product's brand logo on a softly tinted tile — used in place of carton photos.
 * The logo lifts slightly on hover of the nearest `group`.
 */
export function ProductLogo({ product, className = 'aspect-[4/3]', link = true, sizes = '(max-width: 768px) 80vw, 360px', eager = true }: ProductLogoProps) {
  const tile = (
    <span
      className={`relative block overflow-hidden ${className}`}
      style={{ background: `radial-gradient(ellipse at 50% 40%, #ffffff 30%, ${product.color}14 100%)` }}
    >
      <Image
        unoptimized
        src={product.logo}
        alt={`${product.name} logo`}
        fill
        sizes={sizes}
        loading={eager ? 'eager' : 'lazy'}
        className="object-contain p-[12%] transition-transform duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-[1.05]"
      />
    </span>
  );
  if (!link) return tile;
  return (
    <Link href={`/products/${product.id}`} aria-label={`${product.name} — view product details`} className="block">
      {tile}
    </Link>
  );
}

/** Logo only, no tile or card — the whole logo links to the product. */
export function ProductLogoLink({ product, className = 'h-[150px] w-full tablet:h-[180px]', sizes = '(min-width: 768px) 340px, 70vw', eager = true }: { product: Product; className?: string; sizes?: string; eager?: boolean }) {
  return (
    <Link href={`/products/${product.id}`} aria-label={`${product.name} — view product details`} className={`group relative block ${className}`}>
      <Image
        unoptimized
        src={product.logo}
        alt={`${product.name} logo`}
        fill
        sizes={sizes}
        loading={eager ? 'eager' : 'lazy'}
        className="object-contain transition-transform duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:-translate-y-1.5 group-hover:scale-[1.06]"
      />
    </Link>
  );
}
