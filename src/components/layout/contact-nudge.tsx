'use client';

import { useEffect, useId, useRef, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion';
import { ArrowLeft, ArrowRight, Check, ChevronDown, Search, X } from 'lucide-react';
import { expoOut } from '@/lib/easings';
import { SITE } from '@/lib/seo';
import { COUNTRIES } from '@/lib/countries';
import { useConsent } from '@/lib/consent';
import { PHONE_RE, normalisePhone } from '@/lib/enquiry';
import { useEnquiry } from '@/lib/use-enquiry';
import { useCatalogue } from '@/components/catalogue/catalogue-context';
import { Honeypot } from '@/components/ui/honeypot';
import { Eyebrow } from '@/components/ui/primitives';

/** Seconds a visitor spends on the site (tab visible, across pages) before the card appears. */
const DELAY_S = 30;
const SEEN_KEY = 'revora-callback-card';
const OPEN_EVENT = 'revora:open-callback';

/** Pages that already have their own contact form, plus the Studio. */
const SKIP = ['/contact', '/studio'];

const INTERESTS = ['Products & samples', 'Become a distributor', 'Manufacturing (CDMO)', 'Export / import', 'Something else'];
const TIMES = ['Morning', 'Afternoon', 'Evening', 'Any time'];

const seen = () => {
  try {
    return sessionStorage.getItem(SEEN_KEY) === '1';
  } catch {
    return false;
  }
};
const markSeen = () => {
  try {
    sessionStorage.setItem(SEEN_KEY, '1');
  } catch {}
};

/** Open the call-back card from anywhere (e.g. a "Request a call back" link). */
export const openCallback = () => window.dispatchEvent(new Event(OPEN_EVENT));

/**
 * "Request a call back" card: the visitor leaves a name and number and our team calls them; call and
 * WhatsApp buttons sit underneath. It appears once per visit after a while on the site (only after the
 * cookie banner is answered), above the WhatsApp button, and can be opened any time with openCallback().
 * Requests go through /api/enquiry like every other form (email to info@ + Studio → Enquiries).
 */
export function ContactNudge() {
  const pathname = usePathname() ?? '/';
  const consent = useConsent();
  const [open, setOpen] = useState(false);
  // pages where the card never pops up by itself (it still opens when asked)
  const skip = useRef(false);
  useEffect(() => {
    skip.current = SKIP.some((p) => pathname === p || pathname.startsWith(`${p}/`));
  }, [pathname]);
  // undefined: not known yet (server); null: cookie banner still open
  const ready = consent !== undefined && consent !== null;

  // count visible seconds; the component lives in the layout, so the count carries across pages
  useEffect(() => {
    if (!ready || seen()) return;
    let elapsed = 0;
    const id = window.setInterval(() => {
      if (document.visibilityState !== 'visible') return;
      elapsed += 1;
      // on a skipped page, wait until the visitor moves on
      if (elapsed >= DELAY_S && !skip.current) {
        window.clearInterval(id);
        markSeen();
        setOpen(true);
      }
    }, 1000);
    return () => window.clearInterval(id);
  }, [ready]);

  useEffect(() => {
    const show = () => {
      markSeen();
      setOpen(true);
    };
    window.addEventListener(OPEN_EVENT, show);
    return () => window.removeEventListener(OPEN_EVENT, show);
  }, []);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => e.key === 'Escape' && setOpen(false);
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [open]);

  // product pages have a "Request samples" bar along the bottom below desktop: sit higher there
  const lifted = pathname.startsWith('/products/');

  if (pathname.startsWith('/studio')) return null;
  return <AnimatePresence>{open && <CallbackCard lifted={lifted} onClose={() => setOpen(false)} />}</AnimatePresence>;
}

function CallbackCard({ lifted, onClose }: { lifted: boolean; onClose: () => void }) {
  const reduce = useReducedMotion();
  const uid = useId();
  const { whatsapp } = useCatalogue();
  const { send, sending, honeypot } = useEnquiry('callback', { successToast: false });
  const [form, setForm] = useState({ name: '', phone: '', interest: INTERESTS[0], time: TIMES[3] });
  const [country, setCountry] = useState('IN');
  const [picking, setPicking] = useState(false);
  const [phoneError, setPhoneError] = useState('');
  const [done, setDone] = useState(false);
  const flagButton = useRef<HTMLButtonElement>(null);

  // keep the whole card between the fixed menu bar and its own bottom edge, on any screen height
  const cardRef = useRef<HTMLDivElement>(null);
  const [maxH, setMaxH] = useState<number>();
  useEffect(() => {
    let raf = 0;
    const fit = () => {
      cancelAnimationFrame(raf);
      raf = requestAnimationFrame(() => {
        const card = cardRef.current;
        if (!card) return;
        const bar = document.querySelector('header')?.getBoundingClientRect().bottom ?? 0;
        // the card's resting bottom edge (its CSS bottom), not its animated position
        const bottom = window.innerHeight - parseFloat(getComputedStyle(card).bottom);
        setMaxH(Math.max(240, bottom - Math.max(bar, 0) - 12));
      });
    };
    fit();
    window.addEventListener('resize', fit);
    window.addEventListener('scroll', fit, { passive: true });
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener('resize', fit);
      window.removeEventListener('scroll', fit);
    };
  }, []);

  const wa = whatsapp ? `https://wa.me/${whatsapp.number}?text=${encodeURIComponent(whatsapp.defaultMessage)}` : null;
  const dial = COUNTRIES.find(([c]) => c === country)?.[1] ?? '91';
  // the number without its country code (a typed leading 0, or 91 for India, is dropped)
  const national = (() => {
    const d = form.phone.replace(/\D/g, '');
    if (country === 'IN' && d.length === 12 && d.startsWith('91')) return d.slice(2);
    return d.replace(/^0+/, '');
  })();
  const valid = country === 'IN' ? /^[6-9]\d{9}$/.test(national) : /^\d{6,14}$/.test(national) && dial.length + national.length <= 15;
  // Indian numbers read +91 98765 43210
  const shownPhone = country === 'IN' ? `+91 ${national.slice(0, 5)} ${national.slice(5)}` : `+${dial} ${national}`;

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!valid || !PHONE_RE.test(normalisePhone(shownPhone))) {
      setPhoneError(country === 'IN' ? 'Please enter a 10-digit mobile number.' : 'Please check the number (without the country code).');
      return;
    }
    if (await send({ name: form.name.trim(), phone: shownPhone, interest: form.interest, time: form.time })) setDone(true);
  };

  const field =
    'w-full rounded-xl border border-transparent bg-[#F3F6FA] px-3.5 py-2.5 font-sans text-[16px] text-revora-slate outline-none transition-[background-color,border-color,box-shadow] focus:border-revora-cobalt focus:bg-white focus:shadow-[0_0_0_3px_rgba(11,74,143,0.1)] tablet:text-[15px]';
  const label = 'mb-1.5 block font-sans text-[13px] font-medium text-revora-slate';
  const firstName = form.name.trim().split(/\s+/)[0];

  return (
    <motion.div
      ref={cardRef}
      role="dialog"
      aria-modal="false"
      aria-labelledby={`${uid}-title`}
      initial={reduce ? { opacity: 0 } : { opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={reduce ? { opacity: 0 } : { opacity: 0, y: 12 }}
      transition={{ duration: 0.45, ease: expoOut }}
      data-lenis-prevent
      style={{ maxHeight: maxH }}
      className={`fixed right-3 z-70 flex max-h-[calc(100dvh-10rem)] w-[min(22.5rem,calc(100vw-1.5rem))] flex-col overflow-hidden rounded-[20px] border border-revora-cobalt/10 bg-white shadow-[0_2px_6px_rgba(16,37,66,0.06),0_24px_56px_-20px_rgba(16,37,66,0.35)] print:hidden tablet:right-6 ${
        lifted ? 'bottom-42 desktop:bottom-24' : 'bottom-22 tablet:bottom-24'
      }`}
    >
      {/* header: the site's eyebrow, a plain question and one line of context */}
      <div className="relative shrink-0 px-6 pb-1 pt-5 [@media(max-height:720px)]:pt-4">
        <button
          type="button"
          onClick={onClose}
          aria-label="Close"
          className="absolute right-3 top-3 grid h-9 w-9 place-items-center rounded-full text-revora-slate-muted transition-colors hover:bg-[#F3F6FA] hover:text-revora-slate"
        >
          <X className="h-4.5 w-4.5" />
        </button>
        <Eyebrow>Revora Healthcare</Eyebrow>
        <h2 id={`${uid}-title`} className="mt-2.5 font-heading text-[1.45rem] font-extrabold leading-[1.15] tracking-[-0.02em] text-revora-slate">
          {/* the question gives way to the thank-you once the request is in */}
          <motion.span
            key={done ? 'thanks' : 'ask'}
            className="block"
            initial={done && !reduce ? { opacity: 0, y: 6 } : false}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, ease: expoOut, delay: 0.35 }}
          >
            {done ? `Thanks, ${firstName}.` : 'Prefer a call?'}
          </motion.span>
        </h2>
        {!done && !picking && (
          <p className="mt-1.5 pr-4 font-sans text-[14px] leading-normal text-revora-slate-light [@media(max-height:640px)]:hidden">
            Leave your number and someone from our Ahmedabad team will call you back.
          </p>
        )}
      </div>

      {/* while picking a country the list scrolls on its own; otherwise the body scrolls if the screen is short */}
      <div className={`flex min-h-0 flex-1 flex-col overscroll-contain scrollbar-thin ${picking ? 'overflow-hidden' : 'overflow-y-auto'}`}>
        <AnimatePresence mode="wait" initial={false}>
        {done ? (
          <motion.div key="done" className="px-6 pb-6 pt-3" aria-live="polite">
            <DrawnTick reduce={!!reduce} />
            <Rise reduce={!!reduce} delay={0.75}>
              <p className="mt-4 font-sans text-[15px] leading-relaxed text-revora-slate-light">
                We’ll call you on <span className="whitespace-nowrap font-semibold text-revora-slate">{shownPhone}</span>
                {form.time !== 'Any time' ? ` in the ${form.time.toLowerCase()}` : ' soon'}.
              </p>
            </Rise>
            <Rise reduce={!!reduce} delay={0.85}>
              <p className="mt-3 font-sans text-[13.5px] leading-relaxed text-revora-slate-light">
                Need us sooner? Call{' '}
                <a href={SITE.phone.href} className="whitespace-nowrap font-semibold text-revora-cobalt hover:underline">
                  {SITE.phone.label}
                </a>
                .
              </p>
            </Rise>
            <Rise reduce={!!reduce} delay={0.95}>
              <button type="button" onClick={onClose} className="mt-5 w-full rounded-full bg-[#F3F6FA] px-5 py-3 font-sans text-[14.5px] font-semibold text-revora-slate transition-colors hover:bg-revora-sky/70">
                Done
              </button>
            </Rise>
          </motion.div>
        ) : picking ? (
          <CountryList
            selected={country}
            onPick={(c) => {
              if (c) {
                setCountry(c);
                setPhoneError('');
              }
              setPicking(false);
              requestAnimationFrame(() => flagButton.current?.focus());
            }}
          />
        ) : (
          <motion.form
            key="form"
            exit={reduce ? { opacity: 0 } : { opacity: 0, y: -8, transition: { duration: 0.25 } }}
            onSubmit={submit}
            className="relative space-y-3.5 px-6 pb-5 pt-4 [@media(max-height:720px)]:space-y-2.5 [@media(max-height:720px)]:pt-3" noValidate>
            <Honeypot inputRef={honeypot} />
            <label className="block">
              <span className={label}>Name</span>
              <input required value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} autoComplete="name" className={field} />
            </label>
            <div>
              <label htmlFor={`${uid}-phone`} className={label}>
                Mobile number
              </label>
              <div
                className={`flex items-stretch overflow-hidden rounded-xl border transition-[background-color,border-color,box-shadow] focus-within:bg-white focus-within:shadow-[0_0_0_3px_rgba(11,74,143,0.1)] ${
                  phoneError ? 'border-revora-crimson bg-white' : 'border-transparent bg-[#F3F6FA] focus-within:border-revora-cobalt'
                }`}
              >
                <button
                  ref={flagButton}
                  type="button"
                  onClick={() => setPicking(true)}
                  aria-label={`Country code: ${countryName(country)} +${dial}. Change`}
                  className="flex shrink-0 items-center gap-1.5 pl-3.5 pr-2.5 font-sans text-[15px] font-medium text-revora-slate transition-colors hover:text-revora-cobalt focus-visible:text-revora-cobalt focus-visible:outline-none"
                >
                  <Flag code={country} />
                  +{dial}
                  <ChevronDown className="h-3.5 w-3.5 text-revora-slate-muted" />
                </button>
                <span aria-hidden className="my-2.5 w-px bg-revora-cobalt/15" />
                <input
                  id={`${uid}-phone`}
                  required
                  type="tel"
                  inputMode="tel"
                  autoComplete="tel-national"
                  value={form.phone}
                  onChange={(e) => {
                    setForm({ ...form, phone: e.target.value });
                    setPhoneError('');
                  }}
                  aria-invalid={!!phoneError}
                  aria-describedby={phoneError ? `${uid}-phone-error` : undefined}
                  className="min-w-0 flex-1 bg-transparent px-3 py-2.5 font-sans text-[16px] text-revora-slate outline-none tablet:text-[15px]"
                />
              </div>
              {phoneError && (
                <span id={`${uid}-phone-error`} className="mt-1.5 block font-sans text-[12.5px] text-revora-crimson-dark">
                  {phoneError}
                </span>
              )}
            </div>
            <label className="block">
              <span className={label}>What’s it about?</span>
              <span className="relative block">
                <select value={form.interest} onChange={(e) => setForm({ ...form, interest: e.target.value })} className={`${field} appearance-none pr-10`}>
                  {INTERESTS.map((i) => (
                    <option key={i}>{i}</option>
                  ))}
                </select>
                <ChevronDown aria-hidden className="pointer-events-none absolute right-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-revora-slate-muted" />
              </span>
            </label>
            <fieldset>
              <legend className={label}>When should we call?</legend>
              <div className="grid grid-cols-4 gap-1.5">
                {TIMES.map((t) => (
                  <label key={t}>
                    <input type="radio" name={`${uid}-time`} value={t} checked={form.time === t} onChange={() => setForm({ ...form, time: t })} className="peer sr-only" />
                    <span className="block cursor-pointer rounded-full border border-revora-cobalt/15 px-1 py-1.5 text-center font-sans text-[12.5px] font-medium text-revora-slate-light transition-colors hover:border-revora-cobalt/40 peer-checked:border-revora-cobalt peer-checked:bg-revora-cobalt peer-checked:text-white peer-focus-visible:ring-2 peer-focus-visible:ring-revora-cobalt peer-focus-visible:ring-offset-2">
                      {t}
                    </span>
                  </label>
                ))}
              </div>
            </fieldset>
            <button
              type="submit"
              disabled={sending || !form.name.trim() || !form.phone.trim()}
              className="group flex w-full items-center justify-center gap-2 rounded-full bg-revora-cobalt px-5 py-3.5 font-sans text-[15px] font-semibold text-white transition-colors hover:bg-revora-cobalt-deep disabled:cursor-not-allowed disabled:bg-revora-cobalt/45"
            >
              {sending ? 'Sending…' : 'Call me back'}
              {!sending && <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-0.5" />}
            </button>
            <p className="font-sans text-[13px] leading-relaxed text-revora-slate-light">
              Or call{' '}
              <a href={SITE.phone.href} className="whitespace-nowrap font-semibold text-revora-cobalt hover:underline">
                {SITE.phone.label}
              </a>
              {wa && (
                <>
                  {' '}
                  or{' '}
                  <a href={wa} target="_blank" rel="noopener noreferrer" className="font-semibold text-[#128C4B] hover:underline">
                    message us on WhatsApp
                  </a>
                </>
              )}
              .
            </p>
            <p className="border-t border-revora-cobalt/10 pt-3 font-sans text-[11.5px] leading-snug text-revora-slate-muted">
              We only use your number to call you back.{' '}
              <Link href="/privacy-policy" className="underline underline-offset-2 hover:text-revora-cobalt">
                Privacy policy
              </Link>
            </p>
          </motion.form>
        )}
        </AnimatePresence>
      </div>
    </motion.div>
  );
}

// country names in English from the browser, e.g. "AE" → "United Arab Emirates"
let regionNames: Intl.DisplayNames | null = null;
function countryName(code: string) {
  try {
    regionNames ??= new Intl.DisplayNames(['en'], { type: 'region' });
    return regionNames.of(code) ?? code;
  } catch {
    return code;
  }
}

function Flag({ code }: { code: string }) {
  return (
    <Image
      unoptimized
      src={`/flags/${code.toLowerCase()}.svg`}
      alt=""
      width={21}
      height={14}
      className="h-3.5 w-5.25 shrink-0 rounded-xs object-cover shadow-[0_0_0_1px_rgba(0,0,0,0.08)]"
    />
  );
}

/** Country-code picker shown in place of the form: India first, then every country A–Z, with search. */
function CountryList({ selected, onPick }: { selected: string; onPick: (code: string | null) => void }) {
  const uid = useId();
  const [query, setQuery] = useState('');
  const [active, setActive] = useState(0);
  const listRef = useRef<HTMLUListElement>(null);

  const all = COUNTRIES.map(([code, dial]) => ({ code, dial, name: countryName(code) })).sort((a, b) =>
    a.code === 'IN' ? -1 : b.code === 'IN' ? 1 : a.name.localeCompare(b.name)
  );
  const q = query.trim().toLowerCase().replace(/^\+/, '');
  const shown = q ? all.filter((c) => c.name.toLowerCase().includes(q) || c.dial.startsWith(q) || c.code.toLowerCase() === q) : all;
  const at = Math.min(active, Math.max(shown.length - 1, 0));

  useEffect(() => {
    listRef.current?.querySelector<HTMLElement>(`[data-i="${at}"]`)?.scrollIntoView({ block: 'nearest' });
  }, [at]);

  const onKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'ArrowDown' || e.key === 'ArrowUp') {
      e.preventDefault();
      setActive(Math.max(0, Math.min(shown.length - 1, at + (e.key === 'ArrowDown' ? 1 : -1))));
    } else if (e.key === 'Enter') {
      e.preventDefault();
      if (shown[at]) onPick(shown[at].code);
    } else if (e.key === 'Escape') {
      // back to the form, without closing the whole card
      e.preventDefault();
      e.stopPropagation();
      onPick(null);
    }
  };

  return (
    <div className="flex min-h-0 flex-1 flex-col px-5 pb-3 pt-3">
      <div className="flex items-center gap-2">
        <button type="button" onClick={() => onPick(null)} aria-label="Back to the form" className="grid h-9 w-9 shrink-0 place-items-center rounded-full text-revora-slate-light transition-colors hover:bg-revora-sky/60 hover:text-revora-cobalt">
          <ArrowLeft className="h-4.5 w-4.5" />
        </button>
        <label className="relative flex-1">
          <span className="sr-only">Search country or code</span>
          <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-revora-slate-muted" />
          <input
            autoFocus
            type="search"
            value={query}
            onChange={(e) => {
              setQuery(e.target.value);
              setActive(0);
            }}
            onKeyDown={onKeyDown}
            placeholder="Search country or code"
            role="combobox"
            aria-expanded="true"
            aria-controls={`${uid}-list`}
            aria-activedescendant={shown[at] ? `${uid}-${shown[at].code}` : undefined}
            className="w-full rounded-xl border border-revora-cobalt/15 bg-[#F6F9FC] py-2.5 pl-9 pr-3 font-sans text-[16px] text-revora-slate outline-none transition-[border-color,box-shadow] placeholder:text-revora-slate-muted focus:border-revora-cobalt focus:bg-white focus:shadow-[0_0_0_4px_rgba(11,74,143,0.12)] tablet:text-[14.5px]"
          />
        </label>
      </div>
      <ul ref={listRef} id={`${uid}-list`} role="listbox" aria-label="Countries" className="-mx-2 mt-3 min-h-40 flex-1 overflow-y-auto overscroll-contain border-t border-revora-cobalt/10 px-2 pt-2 scrollbar-thin desktop:max-h-96">
        {shown.map((c, i) => (
          <li
            key={c.code}
            id={`${uid}-${c.code}`}
            data-i={i}
            role="option"
            aria-selected={c.code === selected}
            onClick={() => onPick(c.code)}
            onMouseMove={() => i !== at && setActive(i)}
            className={`flex cursor-pointer items-center gap-3 rounded-lg px-2.5 py-2 font-sans text-[14px] ${i === at ? 'bg-revora-sky/70' : ''} ${c.code === 'IN' && !q ? 'mb-1 border-b border-revora-cobalt/10 pb-2.5' : ''}`}
          >
            <Flag code={c.code} />
            <span className={`min-w-0 flex-1 truncate ${c.code === selected ? 'font-semibold text-revora-cobalt' : 'text-revora-slate'}`}>{c.name}</span>
            <span className="shrink-0 font-mono text-[12.5px] text-revora-slate-muted">+{c.dial}</span>
            {c.code === selected && <Check className="h-4 w-4 shrink-0 text-revora-cobalt" />}
          </li>
        ))}
        {!shown.length && <li className="px-2.5 py-6 text-center font-sans text-[14px] text-revora-slate-light">No country matches “{query.trim()}”.</li>}
      </ul>
    </div>
  );
}

/** The Revora tick (as in the logo and every eyebrow) drawing itself, then filling in. */
function DrawnTick({ reduce }: { reduce: boolean }) {
  const d = 'M0 9.5 L7.5 7 L11 15.5 L24.5 0 L28 0 L12 22 Z';
  return (
    <svg viewBox="-1 -1 30 24" className="h-9 w-11.5 text-revora-crimson" aria-hidden>
      <motion.path
        d={d}
        fill="currentColor"
        stroke="currentColor"
        strokeWidth={1}
        strokeLinejoin="round"
        initial={reduce ? false : { pathLength: 0, fillOpacity: 0 }}
        animate={{ pathLength: 1, fillOpacity: 1 }}
        transition={{ pathLength: { duration: 0.55, ease: [0.65, 0, 0.35, 1], delay: 0.15 }, fillOpacity: { duration: 0.3, delay: 0.6 } }}
      />
    </svg>
  );
}

/** A line of the thank-you note easing up into place. */
function Rise({ reduce, delay, children }: { reduce: boolean; delay: number; children: React.ReactNode }) {
  return (
    <motion.div initial={reduce ? false : { opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, ease: expoOut, delay }}>
      {children}
    </motion.div>
  );
}
