'use client';

import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { RevoraLogo } from '@/components/ui/revora-logo';

export function PageLoader() {
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setVisible(false), 2200);
    return () => clearTimeout(timer);
  }, []);

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          key="page-loader"
          className="fixed inset-0 z-[9999] flex items-center justify-center"
          style={{ backgroundColor: '#1E2428' }}
          initial={{ clipPath: 'inset(0 0 0% 0)' }}
          exit={{
            clipPath: 'inset(0 0 100% 0)',
            transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1], delay: 0.1 },
          }}
        >
          {/* Official brand logo entrance */}
          <motion.div
            className="flex flex-col items-center select-none"
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1], delay: 0.15 }}
          >
            <RevoraLogo
              variant="color"
              className="h-16 tablet:h-20 w-auto object-contain"
              priority
            />
          </motion.div>

          {/* Tagline under logo */}
          <motion.p
            className="absolute bottom-[calc(50%-80px)] text-xs font-sans tracking-[0.25em] uppercase"
            style={{ color: 'rgba(232,241,249,0.5)' }}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.6 }}
          >
            Healthcare · Beyond the Cure
          </motion.p>

          {/* Loading bar */}
          <motion.div
            className="absolute bottom-0 left-0 h-[3px]"
            style={{ backgroundColor: '#D7262E' }}
            initial={{ width: '0%' }}
            animate={{ width: '100%' }}
            transition={{ duration: 2.0, ease: [0.45, 0, 0.55, 1], delay: 0.1 }}
          />
        </motion.div>
      )}
    </AnimatePresence>
  );
}
