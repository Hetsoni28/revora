'use client';

import { useEffect, useRef, useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { usePathname } from 'next/navigation';
import { AnimatePresence, motion, useScroll, useSpring, useMotionValueEvent } from 'framer-motion';
import { ArrowRight, ArrowUpRight, ChevronDown, ChevronRight, Globe, Mail, Menu, Phone, ShieldCheck, X } from 'lucide-react';
import { useLenis } from 'lenis/react';
import { expoOut } from '@/lib/easings';
import { THERAPY_CATEGORIES, ALL_PRODUCTS } from '@/lib/therapies-data';
import { productKind } from '@/lib/seo';
import { PARTNER_CATEGORIES, partnerHref } from '@/lib/partner-categories';
import { AnchorLink, Magnetic, Tick } from '@/components/ui/primitives';
import { useFocusTrap } from '@/lib/a11y';

type NavItem = {
  label: string;
  href: string;
  sublinks?: { label: string; href: string }[];
  mega?: boolean;
  /** Two-pane category menu (categories → sub-categories). */
  categories?: boolean;
};

const NAV_ITEMS: NavItem[] = [
  {
    label: 'About Us',
    href: '/about',
    sublinks: [
      { label: 'Profile', href: '/profile' },
      { label: 'Philosophy & Values', href: '/philosophy' },
      { label: 'Certifications', href: '/certifications' },
    ],
  },
  { label: 'Healthcare', href: '', mega: true },
  {
    label: 'Our Presence',
    href: '/our-presence',
    sublinks: [
      { label: 'Domestic Network', href: '/our-presence/domestic-network' },
      { label: 'Global Network', href: '/our-presence/global-network' },
    ],
  },
  { label: 'Innovation', href: '/innovation' },
  { label: 'Channel Partner', href: '/channel-partner', categories: true },
  { label: 'Careers', href: '/careers' },
];

const PHONE = { label: '+91 (079) 4890-REVORA', href: 'tel:+919876543210' };
const EMAIL = 'info@revorahealthcare.com';

const productsOf = (slug: string) => ALL_PRODUCTS.filter((p) => p.categorySlug === slug);

/** Route items light up on their own page and its sub-pages. */
function isActive(item: NavItem, pathname: string) {
  if (item.href.startsWith('/#')) return false;
  if (item.mega) return pathname.startsWith('/products');
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
  const [mobileGroup, setMobileGroup] = useState<string | null>('Healthcare');
  const closeTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  // Close menus whenever the page changes — including the browser's Back button.
  const [lastPath, setLastPath] = useState(pathname);
  if (pathname !== lastPath) {
    setLastPath(pathname);
    setOpen(false);
    setDropdown(null);
  }

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
    const onKey = (e: KeyboardEvent) => {
      if (e.key !== 'Escape') return;
      // close the open dropdown and put focus back on its trigger, not on <body>
      // (focus first: focusing the trigger re-opens its menu, so close it afterwards)
      const item = (document.activeElement as HTMLElement | null)?.closest('[data-menu]');
      item?.querySelector<HTMLElement>(':scope > a, :scope > button')?.focus();
      setDropdown(null);
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, []);

  // Mobile menu: keep Tab inside the menu (and its close button), Escape closes it.
  const menuRef = useRef<HTMLDivElement>(null);
  const toggleRef = useRef<HTMLButtonElement>(null);
  useFocusTrap(menuRef, open, () => setOpen(false), toggleRef);

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
      <header className="fixed inset-x-0 top-0 z-100">
        <div
          className={`relative border-b bg-white transition-[box-shadow,border-color] duration-500 ${
            scrolled || pathname !== '/'
              ? 'border-revora-cobalt/10 shadow-[0_12px_40px_-18px_rgba(11,74,143,0.3)]'
              : 'border-transparent shadow-none'
          }`}
        >
          {/* ── utility strip (desktop) ── */}
          <div className="hidden border-b border-revora-cobalt/10 bg-[#F6F9FC] desktop:block">
            <div className="mx-auto flex max-w-330 items-center justify-between px-8 py-2 font-sans text-[11.5px] text-revora-slate-light">
              <div className="flex items-center gap-4">
                <span className="flex items-center gap-1.5 font-medium text-revora-slate">
                  <ShieldCheck className="h-3.5 w-3.5 text-revora-cobalt" />
                  WHO-GMP &amp; ISO 9001:2015 Certified
                </span>
                <span className="h-3 w-px bg-revora-cobalt/15" />
                <span className="font-mono text-[11px]">CIN: U21000GJ2026PTC174674 · Ahmedabad, Gujarat</span>
              </div>
              <div className="flex items-center gap-4">
                <Link href="/profile#portfolio" className="font-medium transition-colors hover:text-revora-cobalt">
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
          <nav className="relative mx-auto flex max-w-330 items-center justify-between px-5 py-2.5 tablet:px-8 tablet:py-3">
            <Link href="/" aria-label="Revora Healthcare — home" className="flex shrink-0 items-center gap-3">
              <Image src="/logo.png" alt="Revora" width={1024} height={341} loading="eager" className="h-7 w-auto tablet:h-8" />
              <span className="hidden items-center gap-3 sm:flex">
                <span className="h-7 w-px bg-revora-cobalt/25" aria-hidden />
                <span className="flex flex-col font-sans text-[10.5px] font-semibold uppercase leading-[1.35] tracking-[0.22em] text-revora-cobalt">
                  <span>Healthcare</span>
                  <span className="text-revora-crimson">Innovation</span>
                </span>
              </span>
            </Link>

            <ul className="hidden items-center gap-1 desktop:flex">
              {NAV_ITEMS.map((item) => {
                const active = isActive(item, pathname);
                const hasMenu = !!item.sublinks || !!item.mega || !!item.categories;
                const isOpen = dropdown === item.label;
                return (
                  <li
                    key={item.label}
                    className={item.mega ? '' : 'relative'}
                    data-menu
                    onMouseEnter={() => hasMenu && openMenu(item.label)}
                    onMouseLeave={() => hasMenu && closeMenu()}
                    onFocus={() => hasMenu && openMenu(item.label)}
                    onBlur={(e) => {
                      if (!e.currentTarget.contains(e.relatedTarget as Node)) closeMenu();
                    }}
                  >
                    <TopLink
                      href={item.href}
                      aria-current={active ? 'page' : undefined}
                      aria-haspopup={hasMenu || undefined}
                      aria-expanded={hasMenu ? isOpen : undefined}
                      onClick={() => setDropdown(item.mega && !isOpen ? item.label : null)}
                      className={`group relative flex items-center gap-1.5 overflow-hidden whitespace-nowrap rounded-full px-3 py-2 font-sans desktop-lg:px-4 text-[14px] font-medium transition-colors hover:text-revora-cobalt ${
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
                    </TopLink>

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
                      {isOpen && item.categories && <CategoryMenu onNavigate={() => setDropdown(null)} />}
                    </AnimatePresence>
                  </li>
                );
              })}
            </ul>

            <div className="flex items-center gap-2">
              <AnchorLink
                href="/#contact"
                className="hidden rounded-full border border-revora-cobalt/25 px-4 py-2.5 font-sans text-[14px] font-semibold text-revora-cobalt transition-colors hover:bg-revora-sky desktop-lg:inline-flex"
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
                ref={toggleRef}
                onClick={() => setOpen((o) => !o)}
                aria-label={open ? 'Close menu' : 'Open menu'}
                aria-expanded={open}
                aria-controls="mobile-menu"
                className="grid h-10 w-10 place-items-center rounded-full bg-revora-sky text-revora-cobalt desktop:hidden"
              >
                {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
              </button>
            </div>

          </nav>

          {/* scroll progress */}
          <motion.span
            className="absolute inset-x-0 -bottom-px h-0.5 origin-left bg-linear-to-r from-revora-cobalt to-revora-crimson"
            style={{ scaleX: progress }}
          />
        </div>
      </header>

      {/* ── mobile / tablet menu ── */}
      <AnimatePresence>
        {open && (
          <motion.div
            ref={menuRef}
            id="mobile-menu"
            role="dialog"
            aria-modal="true"
            aria-label="Site menu"
            data-lenis-prevent
            className="fixed inset-0 z-90 overflow-y-auto overscroll-contain bg-white px-6 pb-10 pt-28 desktop:hidden"
            initial={{ clipPath: 'inset(0 0 100% 0)' }}
            animate={{ clipPath: 'inset(0 0 0% 0)' }}
            exit={{ clipPath: 'inset(0 0 100% 0)' }}
            transition={{ duration: 0.7, ease: expoOut }}
          >
            <ul className="flex flex-col">
              {NAV_ITEMS.map((item, i) => {
                const hasMenu = !!item.sublinks || !!item.mega || !!item.categories;
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
                      <TopLink
                        href={item.href}
                        onClick={() => (item.mega ? setMobileGroup(expanded ? null : item.label) : setOpen(false))}
                        aria-current={isActive(item, pathname) ? 'page' : undefined}
                        className={`flex-1 py-4 font-heading text-3xl font-extrabold tracking-tight ${
                          isActive(item, pathname) ? 'text-revora-cobalt' : 'text-revora-slate'
                        }`}
                      >
                        {item.label}
                      </TopLink>
                      {hasMenu ? (
                        <button
                          onClick={() => setMobileGroup(expanded ? null : item.label)}
                          aria-label={`${expanded ? 'Collapse' : 'Expand'} ${item.label}`}
                          aria-expanded={expanded}
                          aria-controls={`m-group-${i}`}
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
                          id={`m-group-${i}`}
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
                          {item.categories && (
                            <div className="grid gap-5 pb-6 sm:grid-cols-2">
                              {PARTNER_CATEGORIES.map((c) => (
                                <div key={c.name}>
                                  <p className="font-sans text-[11px] font-semibold uppercase tracking-[0.18em] text-revora-slate-muted">{c.name}</p>
                                  <div className="mt-2 flex flex-col gap-1">
                                    {c.items.map((it) => (
                                      <AnchorLink
                                        key={it}
                                        href={partnerHref(it)}
                                        onClick={() => setOpen(false)}
                                        className="flex items-center gap-2 py-1.5 font-sans text-[15px] font-medium text-revora-slate-light"
                                      >
                                        <Tick className="h-2.5 w-3 text-revora-crimson" />
                                        {it}
                                      </AnchorLink>
                                    ))}
                                  </div>
                                </div>
                              ))}
                            </div>
                          )}
                          {item.mega && (
                            <div className="grid gap-5 pb-6 sm:grid-cols-2">
                              {THERAPY_CATEGORIES.map((cat) => (
                                <div key={cat.slug}>
                                  <p className="flex items-center gap-2 font-heading text-[16px] font-bold text-revora-slate">
                                    <span className="h-2 w-2 rounded-full" style={{ background: cat.color }} />
                                    {cat.shortName}
                                  </p>
                                  <div className="mt-2 grid grid-cols-2 gap-2 pl-4">
                                    {productsOf(cat.slug).map((p) => (
                                      <Link
                                        key={p.id}
                                        href={`/products/${p.id}`}
                                        onClick={() => setOpen(false)}
                                        aria-label={p.name}
                                        className="relative block h-14 rounded-xl border border-revora-cobalt/10 bg-white"
                                      >
                                        <Image unoptimized src={p.logo} alt={`${p.name} ${productKind(p)} logo`} fill sizes="160px" className="object-contain p-2.5" />
                                      </Link>
                                    ))}
                                  </div>
                                </div>
                              ))}
                              <Link
                                href="/profile#portfolio"
                                onClick={() => setOpen(false)}
                                className="inline-flex items-center gap-1.5 font-sans text-[14px] font-semibold text-revora-cobalt sm:col-span-2"
                              >
                                Full portfolio <ArrowRight className="h-4 w-4" />
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

type TopLinkProps = {
  href: string;
  className?: string;
  children: React.ReactNode;
  onClick?: () => void;
  'aria-current'?: 'page';
  'aria-haspopup'?: boolean;
  'aria-expanded'?: boolean;
};

/** A nav item's own link — or, for a menu with no page behind it, a button that opens the menu. */
function TopLink({ href, className, ...rest }: TopLinkProps) {
  if (href) return <AnchorLink href={href} className={className} {...rest} />;
  return <button type="button" className={`${className ?? ''} cursor-pointer text-left`} {...rest} />;
}

/** "Channel Partner" — pick a category on the left, then what you'd like to carry on the right. */
function CategoryMenu({ onNavigate }: { onNavigate: () => void }) {
  const [active, setActive] = useState(0);
  const cat = PARTNER_CATEGORIES[active];
  const row = 'flex items-center justify-between gap-4 rounded-2xl px-4 py-3.5 font-sans text-[15px] font-medium transition-colors';
  return (
    <DropdownPanel className="left-1/2 w-[600px] -translate-x-1/2">
      <div className="grid grid-cols-2">
        <div className="p-4">
          <p className="px-4 pt-2 font-sans text-[11px] font-semibold uppercase tracking-[0.18em] text-revora-slate-muted">Categories</p>
          <div className="mt-3 flex flex-col gap-1">
            {PARTNER_CATEGORIES.map((c, i) => (
              <button
                key={c.name}
                type="button"
                onMouseEnter={() => setActive(i)}
                onFocus={() => setActive(i)}
                onClick={() => setActive(i)}
                aria-pressed={i === active}
                className={`${row} text-left ${i === active ? 'bg-revora-sky text-revora-cobalt' : 'text-revora-slate hover:bg-revora-sky/60'}`}
              >
                {c.name}
                <ChevronRight className="h-4 w-4 shrink-0" />
              </button>
            ))}
          </div>
        </div>
        <div className="border-l border-revora-cobalt/10 p-4">
          <p className="px-4 pt-2 font-sans text-[11px] font-semibold uppercase tracking-[0.18em] text-revora-slate-muted">{cat.name}</p>
          <div className="mt-3 flex flex-col gap-1">
            {cat.items.map((it) => (
              <AnchorLink key={it} href={partnerHref(it)} onClick={onNavigate} className={`${row} text-revora-slate hover:bg-revora-sky hover:text-revora-cobalt`}>
                {it}
                <ChevronRight className="h-4 w-4 shrink-0" />
              </AnchorLink>
            ))}
          </div>
        </div>
      </div>
    </DropdownPanel>
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

/** "Healthcare" — every therapy area with its brands, plus portfolio shortcuts. */
function OfferingsMegaMenu({ onNavigate }: { onNavigate: () => void }) {
  return (
    <DropdownPanel className="left-1/2 w-[min(880px,calc(100vw-48px))] -translate-x-1/2">
      <div className="grid grid-cols-[1fr_250px]">
        <div className="p-6">
          <div className="flex items-center justify-between">
            <span className="font-sans text-[11px] font-semibold uppercase tracking-[0.18em] text-revora-slate-muted">Our Therapies</span>
            <Link
              href="/profile#portfolio"
              onClick={onNavigate}
              className="inline-flex items-center gap-1 font-sans text-[12.5px] font-semibold text-revora-cobalt hover:underline"
            >
              Full portfolio <ArrowRight className="h-3.5 w-3.5" />
            </Link>
          </div>
          <div className="mt-5 grid grid-cols-2 gap-x-6 gap-y-6">
            {THERAPY_CATEGORIES.map((cat) => (
              <div key={cat.slug}>
                <p className="flex items-center gap-2 font-heading text-[16px] font-bold text-revora-slate">
                  <span className="h-2 w-2 rounded-full" style={{ background: cat.color }} />
                  {cat.shortName}
                </p>
                <div className="mt-2.5 grid grid-cols-2 gap-2 pl-4">
                  {productsOf(cat.slug).map((p) => (
                    <Link
                      key={p.id}
                      href={`/products/${p.id}`}
                      onClick={onNavigate}
                      aria-label={p.name}
                      title={p.name}
                      className="group/p relative block h-12 rounded-xl border border-revora-cobalt/10 bg-white transition-all duration-300 hover:-translate-y-0.5 hover:border-revora-cobalt/30 hover:shadow-[0_10px_24px_-14px_rgba(11,74,143,0.5)]"
                    >
                      <Image unoptimized src={p.logo} alt={`${p.name} ${productKind(p)} logo`} fill sizes="140px" className="object-contain p-2" />
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
                ['Company profile & portfolio', '/profile#portfolio'],
                ['Hospital & Distribution Network', '/our-presence/domestic-network'],
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
            href="/innovation"
            onClick={onNavigate}
            className="group inline-flex items-center justify-between gap-2 rounded-full bg-revora-cobalt py-2.5 pl-5 pr-2.5 font-sans text-[13px] font-semibold text-white transition-colors hover:bg-revora-cobalt-dark"
          >
            Explore our innovation range
            <span className="grid h-7 w-7 shrink-0 place-items-center rounded-full bg-white/15 transition-transform duration-500 group-hover:rotate-45">
              <ArrowUpRight className="h-4 w-4" />
            </span>
          </Link>
        </div>
      </div>
    </DropdownPanel>
  );
}
