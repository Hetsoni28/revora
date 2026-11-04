import type { Product } from '@/lib/catalogue';

/** The product name in its logo colours: two-tone parts when set in Sanity, otherwise the one brand colour. */
export function BrandName({ product }: { product: Pick<Product, 'name' | 'color' | 'nameParts'> }) {
  if (!product.nameParts?.length) return <span style={{ color: product.color }}>{product.name}</span>;
  return (
    <span>
      {product.nameParts.map((part, i) => (
        <span key={i} style={{ color: part.color }}>
          {part.text}
        </span>
      ))}
    </span>
  );
}
