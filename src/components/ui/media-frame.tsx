'use client';

import { useRef } from 'react';
import Image from 'next/image';
import { motion, useInView, useReducedMotion } from 'framer-motion';
import { expoOut } from '@/lib/easings';

interface MediaFrameProps {
  src: string;
  alt: string;
  /** Tailwind aspect class, e.g. "aspect-[4/3]". */
  aspect?: string;
  sizes?: string;
  /** Small glass label in the corner. */
  caption?: React.ReactNode;
  className?: string;
}

/** Rounded photo that wipes up into view and settles from a slight zoom. */
export function MediaFrame({ src, alt, aspect = 'aspect-[4/3]', sizes = '(min-width: 1024px) 50vw, 100vw', caption, className }: MediaFrameProps) {
  // Observe the unclipped figure: a fully clipped element reports zero visibility.
  const ref = useRef<HTMLElement>(null);
  const inView = useInView(ref, { once: true, amount: 0.2 });
  const reduce = useReducedMotion();
  const shown = inView || reduce;

  return (
    <figure ref={ref} className={`relative ${aspect} ${className ?? ''}`}>
      <motion.div
        initial={false}
        animate={{ clipPath: shown ? 'inset(0% 0 0 0 round 28px)' : 'inset(100% 0 0 0 round 28px)' }}
        transition={{ duration: 1.2, ease: expoOut }}
        className="absolute inset-0 overflow-hidden rounded-[28px] bg-revora-sky"
      >
        <motion.div
          className="absolute inset-0"
          initial={false}
          animate={{ scale: shown ? 1 : 1.15 }}
          transition={{ duration: 1.6, ease: expoOut }}
        >
          {/* eager: these large photos are often the LCP element, depending on where the page is opened */}
          <Image src={src} alt={alt} fill sizes={sizes} loading="eager" className="object-cover" />
        </motion.div>
        {caption && (
          <figcaption className="absolute bottom-4 left-4 right-4 w-fit rounded-2xl border border-white/50 bg-white/85 px-4 py-2.5 font-sans text-[13px] text-revora-slate backdrop-blur-md">
            {caption}
          </figcaption>
        )}
      </motion.div>
    </figure>
  );
}
