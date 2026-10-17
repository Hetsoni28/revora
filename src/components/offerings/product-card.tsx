'use client';

import Image from 'next/image';
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import { Product } from '@/lib/therapies-data';

interface ProductCardProps {
  product: Product;
  onRequestSample?: (product: Product) => void;
  onDownloadDossier?: (product: Product) => void;
  variant?: 'compact' | 'detailed';
}

export function ProductCard({
  product,
  onRequestSample,
  onDownloadDossier,
  variant = 'compact',
}: ProductCardProps) {
  return (
    <div className="bg-white rounded-2xl border border-[#D9DFE8] hover:border-[#0B4A8F]/40 hover:shadow-lg transition-all duration-200 overflow-hidden flex flex-col justify-between group">
      <div>
        {/* Photo Pedestal */}
        <Link
          href={`/products/${product.id}`}
          className="relative aspect-square w-full bg-[#FAFBFD] p-4 sm:p-6 flex items-center justify-center border-b border-[#EAEFF5] block overflow-hidden"
        >
          <Image
            src={product.image}
            alt={`${product.name} packaging`}
            fill
            className="object-cover object-center group-hover:scale-105 transition-transform duration-300"
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
          />
          <span
            className="absolute top-3 left-3 px-2.5 py-0.5 rounded text-[9.5px] font-semibold uppercase tracking-wider text-white shadow-2xs max-w-[80%] truncate"
            style={{ backgroundColor: product.color }}
          >
            {product.badge}
          </span>
          <span className="absolute bottom-3 right-3 font-mono text-[10.5px] text-[#1E2428]/60 bg-white/95 backdrop-blur-xs px-2 py-0.5 rounded border border-[#EAEFF5]">
            {product.volume}
          </span>
        </Link>

        {/* Product Details */}
        <div className="p-4 sm:p-5">
          <Link href={`/products/${product.id}`}>
            <h3 className="font-heading font-bold text-base sm:text-lg text-[#1E2428] group-hover:text-[#0B4A8F] transition-colors leading-snug">
              {product.name}
            </h3>
          </Link>

          <p className="font-sans text-xs font-semibold text-[#0B4A8F] mt-1 line-clamp-1">
            {product.genericName}
          </p>

          <p className="font-sans text-xs text-[#1E2428]/70 mt-2 line-clamp-2 leading-relaxed">
            {product.summary}
          </p>

          {variant === 'detailed' && product.indications && (
            <div className="mt-3 pt-3 border-t border-[#F0F4F8]">
              <span className="text-[10px] uppercase tracking-wider text-[#1E2428]/50 font-semibold block mb-1">
                Indications:
              </span>
              <div className="flex flex-wrap gap-1">
                {product.indications.slice(0, 2).map((ind, i) => (
                  <span
                    key={i}
                    className="text-[10px] bg-[#F1F5F9] text-[#1E2428]/80 px-2 py-0.5 rounded font-medium truncate max-w-full"
                  >
                    {ind}
                  </span>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Action Buttons */}
      <div className="p-4 pt-0 flex flex-col gap-2">
        <Link
          href={`/products/${product.id}`}
          className="w-full py-2 px-3 rounded-lg bg-[#0B4A8F] hover:bg-[#08356A] text-white text-xs font-semibold text-center transition-colors flex items-center justify-center gap-1.5 shadow-2xs"
        >
          <span>View Monograph</span>
          <ArrowRight size={13} />
        </Link>

        <div className="flex items-center gap-2">
          {onRequestSample && (
            <button
              onClick={() => onRequestSample(product)}
              className="flex-1 py-1.5 px-2 rounded-lg border border-[#D9DFE8] hover:border-[#D7262E] hover:text-[#D7262E] text-[11px] sm:text-xs font-medium text-[#1E2428]/80 text-center transition-colors truncate"
            >
              Request Sample
            </button>
          )}
          {onDownloadDossier && (
            <button
              onClick={() => onDownloadDossier(product)}
              className="flex-1 py-1.5 px-2 rounded-lg border border-[#D9DFE8] hover:border-[#0B4A8F] hover:text-[#0B4A8F] text-[11px] sm:text-xs font-medium text-[#1E2428]/80 text-center transition-colors truncate"
            >
              Dossier (PDF)
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
