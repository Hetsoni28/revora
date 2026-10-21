'use client';

import Image from 'next/image';
import Link from 'next/link';
import { motion, useReducedMotion } from 'framer-motion';
import { ArrowUpRight } from 'lucide-react';
import { expoOut } from '@/lib/easings';

const PAGES = [
  { href: '/our-presence', label: 'Our Presence', text: 'Our office, our plant and how we reach India.', image: '/images/photos/ahmedabad-skyline.webp', alt: 'Aerial view of Ahmedabad and the Sabarmati river' },
  { href: '/our-presence/domestic-network', label: 'Domestic Network', text: 'Doctors, hospitals, pharmacies and distributors across India.', image: '/images/photos/warehouse-inventory.webp', alt: 'Worker checking medicine stock in a warehouse' },
  { href: '/our-presence/global-network', label: 'Global Network', text: 'International reach, export dossiers and global distribution.', image: '/images/photos/warehouse-dispatch.webp', alt: 'Global logistics and distribution dispatch' },
];

/** Photo cards linking the Our Presence pages; the current page is left out. */
export function PresenceLinks({ current, title = 'Explore our presence' }: { current?: string; title?: string }) {
  const reduce = useReducedMotion();
  const pages = PAGES.filter((p) => p.href !== current);
  return (
    <section className="px-5 py-20 tablet:px-8 tablet:py-28">
      <div className="mx-auto max-w-330">
        <h2 className="font-heading text-[clamp(1.8rem,3.4vw,2.6rem)] font-extrabold tracking-[-0.02em] text-revora-slate">{title}</h2>
        <div className={`mt-10 grid gap-5 ${pages.length === 3 ? 'tablet:grid-cols-3' : 'tablet:grid-cols-2'}`}>
          {pages.map((p, i) => (
            <motion.div
              key={p.href}
              initial={reduce ? false : { opacity: 0, y: 36 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-8% 0px' }}
              transition={{ duration: 0.8, delay: i * 0.1, ease: expoOut }}
            >
              <Link href={p.href} className="group block">
                <div className="relative aspect-[4/3] overflow-hidden rounded-[24px] bg-revora-sky">
                  <Image src={p.image} alt={p.alt} fill loading="eager" sizes="(min-width: 768px) 33vw, 100vw" className="object-cover transition-transform duration-[1200ms] ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-[1.06]" />
                  <div aria-hidden className="absolute inset-0 bg-linear-to-t from-revora-cobalt-deep/85 via-revora-cobalt-deep/10 to-transparent" />
                  <span className="absolute right-4 top-4 grid h-11 w-11 place-items-center rounded-full bg-white text-revora-cobalt transition-transform duration-500 group-hover:rotate-45">
                    <ArrowUpRight className="h-5 w-5" />
                  </span>
                  <div className="absolute inset-x-5 bottom-5 text-white">
                    <h3 className="font-heading text-[1.5rem] font-extrabold leading-tight tracking-[-0.01em]">{p.label}</h3>
                    <p className="mt-1 font-sans text-[14px] text-white/80">{p.text}</p>
                  </div>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
