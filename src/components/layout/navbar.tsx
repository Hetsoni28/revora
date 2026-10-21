'use client';

import { useEffect, useRef, useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { usePathname } from 'next/navigation';
import { AnimatePresence, motion, useScroll, useSpring, useMotionValueEvent } from 'framer-motion';
import { ArrowRight, ArrowUpRight, ChevronDown, Globe, Mail, Menu, Phone, ShieldCheck, X } from 'lucide-react';
import { useLenis } from 'lenis/react';
import { expoOut } from '@/lib/easings';
import { THERAPY_CATEGORIES, ALL_PRODUCTS } from '@/lib/therapies-data';
import { AnchorLink, Magnetic, Tick } from '@/components/ui/primitives';

type NavItem = {
  label: string;
  href: string;
  sublinks?: { label: string; href: string }[];
  mega?: boolean;
};

const NAV_ITEMS: NavItem[] = [
  {
    label: 'Company',
    href: '/about',
    sublinks: [
      { label: 'About Revora', href: '/about' },
      { label: 'Philosophy & Values', href: '/philosophy' },
      { label: 'Certifications', href: '/certifications' },
    ],
  },
  { label: 'Our Offerings', href: '/our-offerings', mega: true },
  {
    label: 'Our Presence',
    href: '/our-presence',
    sublinks: [
      { label: 'Ahmedabad Headquarters', href: '/our-presence#ahmedabad' },
      { label: 'Domestic Network', href: '/our-presence#domestic' },
    ],
  },
  { label: 'Careers', href: '/careers' },
];

const PHONE = { label: '+91 (079) 4890-REVORA', href: 'tel:+919876543210' };
const EMAIL = 'info@revorahealthcare.com';

const productsOf = (slug: string) => ALL_PRODUCTS.filter((p) => p.categorySlug === slug);

/** Route items light up on their own page and its sub-pages. */
function isActive(item: NavItem, pathname: string) {
  if (item.href.startsWith('/#')) return false;
  if (item.mega) return pathname.startsWith('/our-offerings') || pathname.startsWith('/products');
  if (item.sublinks?.some((s) => !s.href.includes('#') && pathname.startsWith(s.href))) return true;
  return pathname.startsWith(item.href);
}

export function Navbar() {
  const pathname = usePathname();
  const { scrollY, scrollYProgress } = useScroll();
  const progress = useSpring(scrollYProgress, { stiffness: 120, damping: 24, mass: 0.3 });
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const [dropdown, setDropdown] = useState<string | null>(null);
  const [mobileGroup, setMobileGroup] = useState<string | null>('Our Offerings');
  const closeTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  // The full bar (utility strip included) stays put; scrolling only deepens its shadow.
  useMotionValueEvent(scrollY, 'change', (v) => setScrolled(v > 24));

  const lenis = useLenis();
  useEffect(() => {
    if (open) lenis?.stop();
    else lenis?.start();
    document.documentElement.style.overflow = open ? 'hidden' : '';
    return () => {
      document.documentElement.style.overflow = '';
    };
  }, [open, lenis]);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => e.key === 'Escape' && setDropdown(null);
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, []);

  const openMenu = (label: string) => {
    if (closeTimer.current) clearTimeout(closeTimer.current);
    setDropdown(label);
  };
  const closeMenu = () => {
    if (closeTimer.current) clearTimeout(closeTimer.current);
    closeTimer.current = setTimeout(() => setDropdown(null), 140);
  };

  return (
    <>
      <header className="fixed inset-x-0 top-0 z-100 px-3 pt-3 tablet:px-6 tablet:pt-4">
        <div
          className={`relative mx-auto max-w-330 rounded-2xl border bg-white transition-[box-shadow,border-color] duration-500 ${
            scrolled || pathname !== '/'
              ? 'border-revora-cobalt/10 shadow-[0_12px_40px_-12px_rgba(11,74,143,0.25)]'
              : 'border-transparent shadow-none'
          }`}
        >
          {/* ── utility strip (desktop) ── */}
          <div className="hidden desktop:block">
            <div className="flex items-center justify-between border-b border-revora-cobalt/10 px-6 py-2 font-sans text-[11.5px] text-revora-slate-light">
              <div className="flex items-center gap-4">
                <span className="flex items-center gap-1.5 font-medium text-revora-slate">
                  <ShieldCheck className="h-3.5 w-3.5 text-revora-cobalt" />
                  WHO-GMP &amp; ISO 9001:2015 Certified
                </span>
                <span className="h-3 w-px bg-revora-cobalt/15" />
                <span className="font-mono text-[11px]">CIN: U21000GJ2026PTC174674 · Ahmedabad, Gujarat</span>
              </div>
              <div className="flex items-center gap-4">
                <Link href="/our-offerings" className="font-medium transition-colors hover:text-revora-cobalt">
                  Physician Formulary
                </Link>
                <span className="h-3 w-px bg-revora-cobalt/15" />
                <span className="flex items-center gap-1.5">
                  <Globe className="h-3.5 w-3.5 text-revora-cobalt" />
                  India (IN)
                </span>
                <span className="h-3 w-px bg-revora-cobalt/15" />
                <a href={PHONE.href} className="font-semibold text-revora-cobalt transition-colors hover:text-revora-cobalt-dark">
                  {PHONE.label}
                </a>
              </div>
            </div>
          </div>

          {/* ── main row ── */}
          <nav className="relative flex items-center justify-between px-4 py-2.5 tablet:px-6 tablet:py-3">
            <Link href="/" aria-label="Revora Healthcare — home" className="flex shrink-0 items-center gap-3">
              <Image src="/logo.png" alt="Revora" width={1024} height={341} loading="eager" className="h-7 w-auto tablet:h-8" />
              <span className="hidden items-center gap-3 sm:flex">
                <span className="h-4 w-px bg-revora-cobalt/25" aria-hidden />
                <span className="font-sans text-[11px] font-semibold uppercase tracking-[0.22em] text-revora-cobalt">Healthcare</span>
              </span>
            </Link>

            <ul className="hidden items-center gap-1 desktop:flex">
              {NAV_ITEMS.map((item) => {
                const active = isActive(item, pathname);
                const hasMenu = !!item.sublinks || !!item.mega;
                const isOpen = dropdown === item.label;
                return (
                  <li
                    key={item.label}
                    className={item.mega ? '' : 'relative'}
                    onMouseEnter={() => hasMenu && openMenu(item.label)}
                    onMouseLeave={() => hasMenu && closeMenu()}
                    onFocus={() => hasMenu && openMenu(item.label)}
                    onBlur={(e) => {
                      if (!e.currentTarget.contains(e.relatedTarget as Node)) closeMenu();
                    }}
                  >
                    <AnchorLink
                      href={item.href}
                      aria-current={active ? 'page' : undefined}
                      aria-haspopup={hasMenu || undefined}
                      aria-expanded={hasMenu ? isOpen : undefined}
                      onClick={() => setDropdown(null)}
                      className={`group relative flex items-center gap-1.5 overflow-hidden rounded-full px-4 py-2 font-sans text-[14px] font-medium transition-colors hover:text-revora-cobalt ${
                        active || isOpen ? 'text-revora-cobalt' : 'text-revora-slate'
                      }`}
                    >
                      <span className="relative z-10">{item.label}</span>
                      {hasMenu && (
                        <ChevronDown
                          className={`relative z-10 h-3.5 w-3.5 transition-transform duration-300 ${isOpen ? 'rotate-180' : 'opacity-60'}`}
                        />
                      )}
                      <span
                        className={`absolute inset-0 z-0 rounded-full bg-revora-sky transition-all duration-300 group-hover:scale-100 group-hover:opacity-100 ${
                          active || isOpen ? 'scale-100 opacity-100' : 'scale-75 opacity-0'
                        }`}
                      />
                    </AnchorLink>

                    <AnimatePresence>
                      {isOpen && item.sublinks && (
                        <DropdownPanel className="left-0 w-64">
                          <div className="flex flex-col p-2">
                            {item.sublinks.map((s) => (
                              <AnchorLink
                                key={s.label}
                                href={s.href}
                                onClick={() => setDropdown(null)}
                                className="group/s flex items-center gap-2 rounded-xl px-3.5 py-2.5 font-sans text-[13.5px] font-medium text-revora-slate transition-colors hover:bg-revora-sky hover:text-revora-cobalt"
                              >
                                <Tick className="h-2.5 w-3 text-revora-crimson opacity-40 transition-opacity group-hover/s:opacity-100" />
                                {s.label}
                              </AnchorLink>
                            ))}
                          </div>
                        </DropdownPanel>
                      )}
                      {isOpen && item.mega && <OfferingsMegaMenu onNavigate={() => setDropdown(null)} />}
                    </AnimatePresence>
                  </li>
                );
              })}
            </ul>

            <div className="flex items-center gap-2">
              <AnchorLink
                href="/#contact"
                className="hidden rounded-full border border-revora-cobalt/25 px-4 py-2.5 font-sans text-[14px] font-semibold text-revora-cobalt transition-colors hover:bg-revora-sky desktop:inline-flex"
              >
                Partner With Us
              </AnchorLink>
              <Magnetic className="hidden tablet:inline-block">
                <AnchorLink
                  href="/#contact"
                  className="group inline-flex items-center gap-2 rounded-full bg-revora-cobalt py-2.5 pl-5 pr-2.5 font-sans text-[14px] font-semibold text-white transition-colors hover:bg-revora-cobalt-dark"
                >
                  Contact Us
                  <span className="grid h-7 w-7 place-items-center rounded-full bg-white/15 transition-transform duration-500 group-hover:rotate-45">
                    <ArrowUpRight className="h-4 w-4" />
                  </span>
                </AnchorLink>
              </Magnetic>
              <button
                onClick={() => setOpen((o) => !o)}
                aria-label={open ? 'Close menu' : 'Open menu'}
                aria-expanded={open}
                className="grid h-10 w-10 place-items-center rounded-full bg-revora-sky text-revora-cobalt desktop:hidden"
              >
                {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
              </button>
            </div>

            {/* scroll progress */}
            <motion.span
              className="absolute inset-x-6 bottom-0 h-0.5 origin-left rounded-full bg-linear-to-r from-revora-cobalt to-revora-crimson"
              style={{ scaleX: progress }}
            />
          </nav>
        </div>
      </header>

      {/* ── mobile / tablet menu ── */}
      <AnimatePresence>
        {open && (
          <motion.div
            data-lenis-prevent
            className="fixed inset-0 z-90 overflow-y-auto overscroll-contain bg-white px-6 pb-10 pt-28 desktop:hidden"
            initial={{ clipPath: 'inset(0 0 100% 0)' }}
            animate={{ clipPath: 'inset(0 0 0% 0)' }}
            exit={{ clipPath: 'inset(0 0 100% 0)' }}
            transition={{ duration: 0.7, ease: expoOut }}
          >
            <ul className="flex flex-col">
              {NAV_ITEMS.map((item, i) => {
                const hasMenu = !!item.sublinks || !!item.mega;
                const expanded = mobileGroup === item.label;
                return (
                  <motion.li
                    key={item.label}
                    className="border-b border-revora-cobalt/10"
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.15 + i * 0.06, duration: 0.6, ease: expoOut }}
                  >
                    <div className="flex items-center justify-between">
                      <AnchorLink
                        href={item.href}
                        onClick={() => setOpen(false)}
                        aria-current={isActive(item, pathname) ? 'page' : undefined}
                        className={`flex-1 py-4 font-heading text-3xl font-extrabold tracking-tight ${
                          isActive(item, pathname) ? 'text-revora-cobalt' : 'text-revora-slate'
                        }`}
                      >
                        {item.label}
                      </AnchorLink>
                      {hasMenu ? (
                        <button
                          onClick={() => setMobileGroup(expanded ? null : item.label)}
                          aria-label={`${expanded ? 'Collapse' : 'Expand'} ${item.label}`}
                          aria-expanded={expanded}
                          className="grid h-10 w-10 place-items-center rounded-full bg-revora-sky text-revora-cobalt"
                        >
                          <ChevronDown className={`h-5 w-5 transition-transform duration-300 ${expanded ? 'rotate-180' : ''}`} />
                        </button>
                      ) : (
                        <ArrowUpRight className="h-6 w-6 text-revora-crimson" />
                      )}
                    </div>

                    <AnimatePresence initial={false}>
                      {hasMenu && expanded && (
                        <motion.div
                          initial={{ height: 0, opacity: 0 }}
                          animate={{ height: 'auto', opacity: 1 }}
                          exit={{ height: 0, opacity: 0 }}
                          transition={{ duration: 0.45, ease: expoOut }}
                          className="overflow-hidden"
                        >
                          {item.sublinks && (
                            <div className="flex flex-col gap-1 pb-5">
                              {item.sublinks.map((s) => (
                                <AnchorLink
                                  key={s.label}
                                  href={s.href}
                                  onClick={() => setOpen(false)}
                                  className="flex items-center gap-2 py-1.5 font-sans text-[15px] font-medium text-revora-slate-light"
                                >
                                  <Tick className="h-2.5 w-3 text-revora-crimson" />
                                  {s.label}
                                </AnchorLink>
                              ))}
                            </div>
                          )}
                          {item.mega && (
                            <div className="grid gap-5 pb-6 sm:grid-cols-2">
                              {THERAPY_CATEGORIES.map((cat) => (
                                <div key={cat.slug}>
                                  <Link
                                    href={`/our-offerings/${cat.slug}`}
                                    onClick={() => setOpen(false)}
                                    className="flex items-center gap-2 font-heading text-[16px] font-bold text-revora-slate"
                                  >
                                    <span className="h-2 w-2 rounded-full" style={{ background: cat.color }} />
                                    {cat.shortName}
                                  </Link>
                                  <div className="mt-2 flex flex-wrap gap-2 pl-4">
                                    {productsOf(cat.slug).map((p) => (
                                      <Link
                                        key={p.id}
                                        href={`/products/${p.id}`}
                                        onClick={() => setOpen(false)}
                                        className="rounded-full border border-revora-cobalt/15 px-3.5 py-2 font-sans text-[13px] font-semibold text-revora-cobalt"
                                      >
                                        {p.name}
                                      </Link>
                                    ))}
                                  </div>
                                </div>
                              ))}
                              <Link
                                href="/our-offerings"
                                onClick={() => setOpen(false)}
                                className="inline-flex items-center gap-1.5 font-sans text-[14px] font-semibold text-revora-cobalt sm:col-span-2"
                              >
                                All Formulations Directory <ArrowRight className="h-4 w-4" />
                              </Link>
                            </div>
                          )}
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </motion.li>
                );
              })}
            </ul>

            <div className="mt-8 flex flex-col gap-3 font-sans text-[14px] text-revora-slate-light">
              <span className="flex items-center gap-2">
                <ShieldCheck className="h-4 w-4 shrink-0 text-revora-cobalt" /> WHO-GMP &amp; ISO 9001:2015 Certified
              </span>
              <a href={`mailto:${EMAIL}`} className="flex items-center gap-2">
                <Mail className="h-4 w-4 shrink-0 text-revora-cobalt" /> {EMAIL}
              </a>
              <a href={PHONE.href} className="flex items-center gap-2">
                <Phone className="h-4 w-4 shrink-0 text-revora-cobalt" /> {PHONE.label}
              </a>
            </div>

            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <AnchorLink
                href="/#contact"
                onClick={() => setOpen(false)}
                className="inline-flex justify-center rounded-full bg-revora-cobalt px-6 py-3.5 font-sans text-[15px] font-semibold text-white"
              >
                Contact Corporate Office
              </AnchorLink>
              <AnchorLink
                href="/#contact"
                onClick={() => setOpen(false)}
                className="inline-flex justify-center rounded-full border border-revora-cobalt/25 px-6 py-3.5 font-sans text-[15px] font-semibold text-revora-cobalt"
              >
                Partner With Us
              </AnchorLink>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

function DropdownPanel({ className, children }: { className?: string; children: React.ReactNode }) {
  return (
    <motion.div
      data-lenis-prevent
      initial={{ opacity: 0, y: 10, scale: 0.98 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      exit={{ opacity: 0, y: 6, scale: 0.98 }}
      transition={{ duration: 0.25, ease: expoOut }}
      className={`absolute top-full z-50 pt-3 ${className ?? ''}`}
    >
      <div className="overflow-hidden rounded-2xl border border-revora-cobalt/10 bg-white shadow-[0_24px_60px_-20px_rgba(11,74,143,0.35)]">
        {children}
      </div>
    </motion.div>
  );
}

/** "Our Offerings" — every therapy area with its brands, plus portfolio shortcuts. */
function OfferingsMegaMenu({ onNavigate }: { onNavigate: () => void }) {
  return (
    <DropdownPanel className="left-1/2 w-[min(880px,calc(100vw-48px))] -translate-x-1/2">
      <div className="grid grid-cols-[1fr_250px]">
        <div className="p-6">
          <div className="flex items-center justify-between">
            <span className="font-sans text-[11px] font-semibold uppercase tracking-[0.18em] text-revora-slate-muted">Our Therapies</span>
            <Link
              href="/our-offerings"
              onClick={onNavigate}
              className="inline-flex items-center gap-1 font-sans text-[12.5px] font-semibold text-revora-cobalt hover:underline"
            >
              Overview <ArrowRight className="h-3.5 w-3.5" />
            </Link>
          </div>
          <div className="mt-5 grid grid-cols-2 gap-x-6 gap-y-6">
            {THERAPY_CATEGORIES.map((cat) => (
              <div key={cat.slug}>
                <Link
                  href={`/our-offerings/${cat.slug}`}
                  onClick={onNavigate}
                  className="group/c flex items-center gap-2 font-heading text-[16px] font-bold text-revora-slate transition-colors hover:text-revora-cobalt"
                >
                  <span className="h-2 w-2 rounded-full" style={{ background: cat.color }} />
                  {cat.shortName}
                  <ArrowUpRight className="h-3.5 w-3.5 opacity-0 transition-opacity group-hover/c:opacity-100" />
                </Link>
                <div className="mt-2.5 flex flex-wrap gap-1.5 pl-4">
                  {productsOf(cat.slug).map((p) => (
                    <Link
                      key={p.id}
                      href={`/products/${p.id}`}
                      onClick={onNavigate}
                      className="rounded-full border border-revora-cobalt/15 px-3 py-1 font-sans text-[12px] font-semibold text-revora-slate transition-colors hover:border-transparent hover:text-white"
                      onMouseEnter={(e) => (e.currentTarget.style.background = cat.color)}
                      onMouseLeave={(e) => (e.currentTarget.style.background = 'transparent')}
                    >
                      {p.name}
                    </Link>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="flex flex-col justify-between gap-6 bg-revora-sky/60 p-6">
          <div>
            <span className="font-sans text-[11px] font-semibold uppercase tracking-[0.18em] text-revora-slate-muted">Revora Portfolio</span>
            <div className="mt-4 flex flex-col gap-1">
              {[
                ['All Formulations Directory', '/our-offerings'],
                ['Hospital & Distribution Network', '/our-presence#domestic'],
              ].map(([label, href]) => (
                <Link
                  key={label}
                  href={href}
                  onClick={onNavigate}
                  className="flex items-center justify-between rounded-xl px-3 py-2.5 font-sans text-[13px] font-semibold text-revora-slate transition-colors hover:bg-white hover:text-revora-cobalt"
                >
                  {label}
                  <ArrowRight className="h-3.5 w-3.5" />
                </Link>
              ))}
            </div>
          </div>
          <Link
            href="/our-offerings"
            onClick={onNavigate}
            className="group inline-flex items-center justify-between gap-2 rounded-full bg-revora-cobalt py-2.5 pl-5 pr-2.5 font-sans text-[13px] font-semibold text-white transition-colors hover:bg-revora-cobalt-dark"
          >
            View Complete Prescribing Portfolio
            <span className="grid h-7 w-7 shrink-0 place-items-center rounded-full bg-white/15 transition-transform duration-500 group-hover:rotate-45">
              <ArrowUpRight className="h-4 w-4" />
            </span>
          </Link>
        </div>
      </div>
    </DropdownPanel>
  );
}
