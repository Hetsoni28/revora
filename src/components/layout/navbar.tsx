'use client';

import { useEffect, useRef, useState } from 'react';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Menu,
  X,
  ArrowUpRight,
  Globe,
  ShieldCheck,
  Mail,
  Phone,
  ChevronDown,
  ChevronRight,
  ArrowRight,
} from 'lucide-react';
import { RevoraLogo } from '@/components/ui/revora-logo';
import { THERAPY_CATEGORIES, ALL_PRODUCTS } from '@/lib/therapies-data';


const NAV_ITEMS = [
  {
    label: 'Company',
    href: '/#about',
    sublinks: [
      { label: 'About Revora', href: '/#about' },
      { label: 'Philosophy & Values', href: '/#research' },
      { label: 'Certifications', href: '/#process' },
    ],
  },
  {
    label: 'Our Offerings',
    href: '/our-offerings',
    isOfferingsMegaMenu: true,
  },
  {
    label: 'Global Presence',
    href: '/our-presence',
    sublinks: [
      { label: 'Ahmedabad Headquarters', href: '/our-presence#ahmedabad' },
      { label: 'Domestic Network', href: '/our-presence#domestic' },
      { label: 'International Markets (47+)', href: '/our-presence#global' },
    ],
  },
  {
    label: 'Careers',
    href: '/careers',
  },
];

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);
  const [mobileOfferingsOpen, setMobileOfferingsOpen] = useState(true);
  const headerRef = useRef<HTMLElement>(null);
  const dropdownTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 30);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  // Prevent background body scroll when mobile navigation is open
  useEffect(() => {
    if (mobileOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [mobileOpen]);

  const handleMouseEnter = (label: string) => {
    if (dropdownTimeoutRef.current) {
      clearTimeout(dropdownTimeoutRef.current);
    }
    setActiveDropdown(label);
  };

  const handleMouseLeave = () => {
    dropdownTimeoutRef.current = setTimeout(() => {
      setActiveDropdown(null);
    }, 180);
  };

  return (
    <>
      <motion.header
        ref={headerRef}
        className="fixed top-0 left-0 right-0 z-[100] transition-all"
        initial={{
          backgroundColor: 'rgba(255, 255, 255, 0.98)',
          boxShadow: '0 1px 3px rgba(0, 0, 0, 0.05)',
        }}
        animate={{
          backgroundColor: 'rgba(255, 255, 255, 0.98)',
          boxShadow: scrolled
            ? '0 4px 24px rgba(11, 74, 143, 0.08)'
            : '0 1px 3px rgba(0, 0, 0, 0.05)',
        }}
        transition={{ duration: 0.25 }}
      >
        {/* ── Top Utility Strip (Institutional Corporate Header) ── */}
        <div className="hidden desktop:block bg-[#F8F9FA] border-b border-[#E8F1F9] text-[#1E2428]/70 text-xs">
          <div className="mx-auto max-w-7xl px-6 h-8 flex items-center justify-between">
            {/* Left corporate credentials */}
            <div className="flex items-center gap-5">
              <span className="flex items-center gap-1.5 font-medium tracking-wide">
                <ShieldCheck size={13} className="text-[#0B4A8F]" />
                <span className="text-[#1E2428]/90">WHO-GMP &amp; ISO 9001:2015 Certified</span>
              </span>
              <span className="w-px h-3 bg-[#E8F1F9]" />
              <span className="text-[#1E2428]/60 font-mono text-[11px]">
                CIN: U24239GJ2009PTC058921 · Ahmedabad, Gujarat
              </span>
            </div>

            {/* Right institutional quick links */}
            <div className="flex items-center gap-5">
              <Link
                href="/our-offerings"
                className="hover:text-[#0B4A8F] transition-colors font-medium flex items-center gap-1 text-[11px]"
              >
                <span>Physician Formulary</span>
              </Link>
              <span className="w-px h-3 bg-[#E8F1F9]" />
              <div className="flex items-center gap-1.5 text-[11px] text-[#1E2428]/75">
                <Globe size={12} className="text-[#0B4A8F]" />
                <span>Global / India (IN)</span>
              </div>
              <span className="w-px h-3 bg-[#E8F1F9]" />
              <a
                href="tel:+919876543210"
                className="hover:text-[#0B4A8F] transition-colors font-semibold text-[11px] text-[#0B4A8F]"
              >
                +91 (079) 4890-REVORA
              </a>
            </div>
          </div>
        </div>

        {/* ── Main Navigation Bar ── */}
        <div className="mx-auto max-w-7xl px-4 sm:px-6 flex items-center justify-between h-16 tablet:h-[72px]">
          {/* Logo Lockup — Revora Wordmark + Healthcare Descriptor */}
          <Link
            href="/"
            className="flex items-center gap-2.5 sm:gap-3 select-none group"
            aria-label="Revora Healthcare Private Limited"
          >
            <RevoraLogo
              variant="color"
              className="h-7 sm:h-8 tablet:h-9 w-auto object-contain transition-transform duration-200 group-hover:scale-[1.01]"
              priority
            />
            <div className="hidden xs:flex items-center gap-2 sm:gap-3 translate-y-[4px] tablet:translate-y-[5px]">
              <span className="w-px h-3.5 sm:h-4 tablet:h-[18px] bg-[#0B4A8F]/30" aria-hidden="true" />
              <span className="font-sans text-[9.5px] sm:text-[10px] tablet:text-[11px] uppercase tracking-[0.2em] sm:tracking-[0.22em] text-[#0B4A8F] font-semibold leading-none">
                Healthcare
              </span>
            </div>
          </Link>

          {/* Desktop Navigation Links */}
          <nav className="hidden tablet-lg:flex items-center gap-1">
            {NAV_ITEMS.map((item) => {
              const hasDropdown = item.sublinks || item.isOfferingsMegaMenu;
              const isOpen = activeDropdown === item.label;

              return (
                <div
                  key={item.label}
                  className="relative"
                  onMouseEnter={() => hasDropdown && handleMouseEnter(item.label)}
                  onMouseLeave={handleMouseLeave}
                >
                  <Link
                    href={item.href}
                    className={`flex items-center gap-1.5 px-3.5 py-2 font-sans text-[13.5px] font-semibold transition-colors duration-150 rounded-md ${
                      isOpen
                        ? 'text-[#0B4A8F] bg-[#E8F1F9]/70'
                        : 'text-[#1E2428] hover:text-[#0B4A8F] hover:bg-[#E8F1F9]/50'
                    }`}
                  >
                    <span>{item.label}</span>
                    {hasDropdown && (
                      <ChevronDown
                        size={13}
                        className={`transition-transform duration-200 opacity-60 ${
                          isOpen ? 'rotate-180 text-[#0B4A8F] opacity-100' : ''
                        }`}
                      />
                    )}
                  </Link>

                  {/* ── Cipla-Style "Our Offerings" Dropdown Menu (With Lenis Prevent for smooth scrolling) ── */}
                  {item.isOfferingsMegaMenu && (
                    <AnimatePresence>
                      {isOpen && (
                        <motion.div
                          data-lenis-prevent="true"
                          initial={{ opacity: 0, y: 6 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0, y: 6 }}
                          transition={{ duration: 0.16, ease: 'easeOut' }}
                          className="absolute left-0 top-full pt-1.5 z-50 w-[380px]"
                          onWheel={(e) => e.stopPropagation()}
                        >
                          <div className="bg-white rounded-xl shadow-2xl border border-[#D9DFE8] overflow-hidden">
                            {/* Header: Our Therapies */}
                            <div className="px-5 py-3.5 bg-[#FAFBFD] border-b border-[#EAEFF5] flex items-center justify-between">
                              <span className="font-heading font-bold text-xs uppercase tracking-wider text-[#1E2428]">
                                Our Therapies
                              </span>
                              <Link
                                href="/our-offerings"
                                onClick={() => setActiveDropdown(null)}
                                className="text-[11px] font-semibold text-[#0B4A8F] hover:underline flex items-center gap-1"
                              >
                                <span>Overview</span>
                                <ArrowRight size={11} />
                              </Link>
                            </div>

                            {/* Scrollable Therapies & Formulations List (Scrolls effortlessly via wheel) */}
                            <div
                              data-lenis-prevent="true"
                              className="max-h-[460px] overflow-y-auto overscroll-contain divide-y divide-[#EAEFF5] scrollbar-thin"
                              style={{
                                overscrollBehavior: 'contain',
                                WebkitOverflowScrolling: 'touch',
                              }}
                              onWheel={(e) => e.stopPropagation()}
                            >
                              {THERAPY_CATEGORIES.map((cat) => {
                                const prods = ALL_PRODUCTS.filter(
                                  (p) => p.categorySlug === cat.slug
                                );

                                return (
                                  <div key={cat.slug} className="py-2">
                                    {/* Category Main Line */}
                                    <Link
                                      href={`/our-offerings/${cat.slug}`}
                                      onClick={() => setActiveDropdown(null)}
                                      className="px-5 py-1.5 flex items-center text-xs font-semibold text-[#1E2428] hover:text-[#0B4A8F] hover:bg-[#F8FAFC] transition-colors group/cat"
                                    >
                                      <div className="flex items-center gap-1.5">
                                        <span className="text-[#0B4A8F] font-bold text-sm leading-none">
                                          –
                                        </span>
                                        <span className="group-hover/cat:translate-x-0.5 transition-transform">
                                          {cat.shortName}
                                        </span>
                                      </div>
                                    </Link>

                                    {/* Indented Sub-Products */}
                                    <div className="pl-8 pr-4 mt-0.5 space-y-0.5">
                                      {prods.map((prod) => (
                                        <Link
                                          key={prod.id}
                                          href={`/products/${prod.id}`}
                                          onClick={() => setActiveDropdown(null)}
                                          className="px-2.5 py-1.5 rounded-md text-[12.5px] text-[#1E2428]/80 hover:text-[#0B4A8F] hover:bg-[#F1F5F9] transition-colors block group/prod"
                                        >
                                          <span className="font-medium group-hover/prod:font-semibold text-[#1E2428]">
                                            {prod.name}
                                          </span>
                                        </Link>
                                      ))}
                                    </div>
                                  </div>
                                );
                              })}

                              {/* Secondary Group: Revora Institutional / Generics */}
                              <div className="py-2.5 bg-[#FAFBFD]">
                                <div className="px-5 py-1 text-xs font-semibold text-[#1E2428] flex items-center gap-1.5">
                                  <span>Revora Portfolio</span>
                                </div>
                                <div className="pl-8 pr-4 mt-0.5 space-y-0.5">
                                  <Link
                                    href="/our-offerings"
                                    onClick={() => setActiveDropdown(null)}
                                    className="px-2.5 py-1.5 rounded-md text-[12px] text-[#0B4A8F] font-semibold hover:bg-[#E8F1F9] transition-colors flex items-center justify-between"
                                  >
                                    <span>– All Formulations Directory</span>
                                    <ChevronRight size={12} />
                                  </Link>
                                  <Link
                                    href="/our-presence"
                                    onClick={() => setActiveDropdown(null)}
                                    className="px-2.5 py-1.5 rounded-md text-[12px] text-[#1E2428]/70 hover:text-[#0B4A8F] hover:bg-[#F1F5F9] transition-colors flex items-center justify-between"
                                  >
                                    <span>– Hospital &amp; Distribution Network</span>
                                    <ChevronRight size={12} />
                                  </Link>
                                </div>
                              </div>
                            </div>

                            {/* Dropdown Bottom CTA Footer */}
                            <div className="p-3 bg-white border-t border-[#EAEFF5] text-center">
                              <Link
                                href="/our-offerings"
                                onClick={() => setActiveDropdown(null)}
                                className="block w-full py-2 px-3 rounded-lg bg-[#0B4A8F] hover:bg-[#08356A] text-white text-[11px] font-semibold transition-colors"
                              >
                                View Complete Prescribing Portfolio
                              </Link>
                            </div>
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  )}

                  {/* Standard Submenu Dropdown for Company / Global Presence */}
                  {item.sublinks && !item.isOfferingsMegaMenu && (
                    <AnimatePresence>
                      {isOpen && (
                        <motion.div
                          data-lenis-prevent="true"
                          initial={{ opacity: 0, y: 6 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0, y: 6 }}
                          transition={{ duration: 0.16, ease: 'easeOut' }}
                          className="absolute left-0 top-full pt-1.5 z-50 w-60"
                          onWheel={(e) => e.stopPropagation()}
                        >
                          <div className="bg-white rounded-xl shadow-xl border border-[#D9DFE8] p-2 flex flex-col gap-0.5">
                            {item.sublinks.map((sublink) => (
                              <Link
                                key={sublink.href}
                                href={sublink.href}
                                onClick={() => setActiveDropdown(null)}
                                className="px-3 py-2 text-xs font-medium text-[#1E2428]/80 hover:text-[#0B4A8F] hover:bg-[#E8F1F9]/60 rounded-md transition-colors"
                              >
                                {sublink.label}
                              </Link>
                            ))}
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  )}
                </div>
              );
            })}
          </nav>

          {/* Corporate Action Buttons */}
          <div className="hidden tablet-lg:flex items-center gap-3">
            <Link
              href="/#contact"
              className="px-4 py-2 rounded-md border border-[#0B4A8F]/40 text-[#0B4A8F] font-sans text-xs font-semibold hover:bg-[#E8F1F9] transition-colors"
            >
              Partner With Us
            </Link>
            <Link
              href="/#contact"
              className="flex items-center gap-1.5 px-5 py-2 rounded-md bg-[#0B4A8F] text-white font-sans text-xs font-semibold hover:bg-[#08356A] transition-colors shadow-sm"
            >
              <span>Contact Us</span>
              <ArrowUpRight size={14} />
            </Link>
          </div>

          {/* Mobile hamburger */}
          <button
            className="tablet-lg:hidden p-2 rounded-md text-[#1E2428] hover:bg-[#F8F9FA] transition-colors"
            onClick={() => setMobileOpen((v) => !v)}
            aria-label="Toggle Navigation Menu"
          >
            {mobileOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {/* Signature Cobalt to Crimson Line */}
        <div
          className="absolute bottom-0 left-0 right-0 h-[2px]"
          style={{
            background: 'linear-gradient(90deg, #0B4A8F 0%, #D7262E 100%)',
          }}
        />
      </motion.header>

      {/* ── Mobile Navigation Drawer (100% Scrollable with Lenis Prevent) ── */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            key="mobile-nav"
            data-lenis-prevent="true"
            className="fixed inset-0 z-[120] bg-white overflow-y-auto overscroll-contain"
            style={{
              WebkitOverflowScrolling: 'touch',
              touchAction: 'pan-y',
            }}
            initial={{ opacity: 0, y: -16 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -16 }}
            transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
            onWheel={(e) => e.stopPropagation()}
          >
            <div className="flex flex-col min-h-full">
              {/* Sticky Drawer Header */}
              <div className="sticky top-0 z-30 flex items-center justify-between h-16 px-4 sm:px-6 bg-white/98 backdrop-blur-md border-b border-[#E8F1F9]">
                <Link href="/" onClick={() => setMobileOpen(false)} className="flex items-center gap-2.5">
                  <RevoraLogo variant="color" className="h-7 w-auto object-contain" />
                  <div className="flex items-center gap-2 translate-y-[3.5px]">
                    <span className="w-px h-3.5 bg-[#0B4A8F]/30" />
                    <span className="font-sans text-[9.5px] uppercase tracking-[0.2em] text-[#0B4A8F] font-semibold">
                      Healthcare
                    </span>
                  </div>
                </Link>
                <button
                  onClick={() => setMobileOpen(false)}
                  className="p-2 rounded-md text-[#1E2428] hover:bg-[#F8F9FA] transition-colors"
                  aria-label="Close Navigation Menu"
                >
                  <X size={22} />
                </button>
              </div>

              {/* Navigation Groups with ample bottom padding so everything is easily scrollable */}
              <div className="px-5 sm:px-6 py-6 flex flex-col gap-6 flex-1 pb-32">
                {NAV_ITEMS.map((item, i) => (
                  <motion.div
                    key={item.label}
                    initial={{ opacity: 0, x: -12 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.04 * i, duration: 0.3 }}
                    className="flex flex-col gap-2"
                  >
                    {item.isOfferingsMegaMenu ? (
                      <div>
                        <div className="flex items-center justify-between">
                          <Link
                            href={item.href}
                            onClick={() => setMobileOpen(false)}
                            className="font-heading font-bold text-xl text-[#1E2428] hover:text-[#0B4A8F] transition-colors"
                          >
                            {item.label}
                          </Link>
                          <button
                            onClick={() => setMobileOfferingsOpen(!mobileOfferingsOpen)}
                            className="p-1 text-[#1E2428]/60 hover:text-[#0B4A8F]"
                            aria-label="Toggle Offerings Categories"
                          >
                            <ChevronDown
                              size={18}
                              className={`transition-transform duration-200 ${
                                mobileOfferingsOpen ? 'rotate-180' : ''
                              }`}
                            />
                          </button>
                        </div>

                        {mobileOfferingsOpen && (
                          <div className="mt-3 pl-3 border-l-2 border-[#0B4A8F]/20 space-y-4">
                            {THERAPY_CATEGORIES.map((cat) => {
                              const prods = ALL_PRODUCTS.filter(
                                (p) => p.categorySlug === cat.slug
                              );
                              return (
                                <div key={cat.slug} className="space-y-1">
                                  <Link
                                    href={`/our-offerings/${cat.slug}`}
                                    onClick={() => setMobileOpen(false)}
                                    className="text-xs font-bold text-[#0B4A8F] block"
                                  >
                                    – {cat.shortName}
                                  </Link>
                                    <div className="pl-3 space-y-1">
                                      {prods.map((p) => (
                                        <Link
                                          key={p.id}
                                          href={`/products/${p.id}`}
                                          onClick={() => setMobileOpen(false)}
                                          className="text-xs text-[#1E2428]/80 hover:text-[#0B4A8F] block py-1 font-medium"
                                        >
                                          {p.name}
                                        </Link>
                                      ))}
                                    </div>
                                </div>
                              );
                            })}
                          </div>
                        )}
                      </div>
                    ) : (
                      <>
                        <Link
                          href={item.href}
                          onClick={() => setMobileOpen(false)}
                          className="font-heading font-bold text-xl text-[#1E2428] hover:text-[#0B4A8F] transition-colors"
                        >
                          {item.label}
                        </Link>

                        {item.sublinks && (
                          <div className="flex flex-col gap-1.5 pl-3 border-l border-[#E8F1F9]">
                            {item.sublinks.map((sublink) => (
                              <Link
                                key={sublink.href}
                                href={sublink.href}
                                onClick={() => setMobileOpen(false)}
                                className="font-sans text-xs text-[#1E2428]/70 hover:text-[#0B4A8F] py-1"
                              >
                                {sublink.label}
                              </Link>
                            ))}
                          </div>
                        )}
                      </>
                    )}
                  </motion.div>
                ))}

                {/* Mobile Institutional Meta & Quick Actions */}
                <div className="mt-4 pt-6 border-t border-[#E8F1F9] flex flex-col gap-3 text-xs text-[#1E2428]/70">
                  <div className="flex items-center gap-2">
                    <ShieldCheck size={14} className="text-[#0B4A8F] shrink-0" />
                    <span>WHO-GMP &amp; ISO 9001:2015 Certified</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Mail size={14} className="text-[#0B4A8F] shrink-0" />
                    <a href="mailto:info@revorahealthcare.com" className="hover:text-[#0B4A8F] truncate">
                      info@revorahealthcare.com
                    </a>
                  </div>
                  <div className="flex items-center gap-2">
                    <Phone size={14} className="text-[#0B4A8F] shrink-0" />
                    <a href="tel:+919876543210" className="hover:text-[#0B4A8F]">
                      +91 (079) 4890-REVORA
                    </a>
                  </div>

                  <div className="flex flex-col gap-2 pt-3">
                    <Link
                      href="/#contact"
                      onClick={() => setMobileOpen(false)}
                      className="w-full text-center py-2.5 rounded-lg bg-[#0B4A8F] text-white font-semibold text-xs shadow-sm hover:bg-[#08356A] transition-colors"
                    >
                      Contact Corporate Office
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
