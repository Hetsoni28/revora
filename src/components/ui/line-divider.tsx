'use client';

import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { expoOut } from '@/lib/easings';

interface LineDrawDividerProps {
  color?: string;
  delay?: number;
  thickness?: number;
  className?: string;
}

export function LineDrawDivider({
  color = '#0B4A8F',
  delay = 0,
  thickness = 2,
  className = '',
}: LineDrawDividerProps) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: '-10% 0px' });

  return (
    <div ref={ref} className={`w-full overflow-hidden ${className}`}>
      <motion.div
        style={{
          height: thickness,
          backgroundColor: color,
          transformOrigin: 'left center',
        }}
        initial={{ scaleX: 0 }}
        animate={inView ? { scaleX: 1 } : { scaleX: 0 }}
        transition={{ duration: 0.7, ease: expoOut, delay }}
      />
    </div>
  );
}
