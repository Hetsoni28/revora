'use client';

import { useState } from 'react';
import { ArrowUpRight, MapPin, Navigation, Phone } from 'lucide-react';
import { SITE } from '@/lib/seo';
import { useConsent } from '@/lib/consent';
import { CookieSettingsLink } from '@/components/consent/cookie-settings-link';

const ADDRESS = [SITE.address.streetAddress, `${SITE.address.addressLocality}, ${SITE.address.addressRegion} ${SITE.address.postalCode}`];

/**
 * The office on a Google Map, beside its address and quick actions. Google Maps sets its own cookies,
 * so the map loads straight away only for visitors who allowed marketing cookies; everyone else sees
 * a "Show map" button and loads it with one tap (their choice, for this visit).
 */
export function OfficeMap() {
  const consent = useConsent();
  const [shown, setShown] = useState(false);
  const load = shown || !!consent?.marketing;

  return (
    <div className="grid grid-cols-[minmax(0,1fr)] overflow-hidden rounded-[28px] border border-revora-cobalt/10 bg-white shadow-[0_30px_60px_-45px_rgba(11,74,143,0.45)] tablet-lg:grid-cols-[0.85fr_1.15fr]">
      {/* address and actions */}
      <div className="flex flex-col p-7 tablet:p-9">
        <span className="grid h-12 w-12 place-items-center rounded-2xl bg-revora-sky text-revora-cobalt">
          <MapPin className="h-5 w-5" />
        </span>
        <p className="mt-6 font-sans text-[11px] font-semibold uppercase tracking-[0.18em] text-revora-slate-muted">Registered office</p>
        <p className="mt-2 font-heading text-[1.35rem] font-extrabold leading-snug text-revora-slate">{SITE.legalName}</p>
        <address className="mt-3 font-sans text-[15px] not-italic leading-[1.7] text-revora-slate-light">
          {ADDRESS.map((line) => (
            <span key={line} className="block">
              {line}
            </span>
          ))}
        </address>
        <a href={SITE.phone.href} className="mt-4 inline-flex min-h-6 w-fit items-center gap-2 font-sans text-[15px] font-semibold text-revora-cobalt hover:underline">
          <Phone className="h-4 w-4" /> {SITE.phone.label}
        </a>
        <div className="mt-8 flex flex-wrap gap-3 tablet-lg:mt-auto tablet-lg:pt-8">
          <a
            href={SITE.map.directions}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex min-h-11 items-center gap-2 rounded-full bg-revora-cobalt px-5 font-sans text-[14px] font-semibold text-white transition-colors hover:bg-revora-cobalt-dark"
          >
            <Navigation className="h-4 w-4" /> Get directions
          </a>
          <a
            href={SITE.map.url}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex min-h-11 items-center gap-2 rounded-full border border-revora-cobalt/20 px-5 font-sans text-[14px] font-semibold text-revora-cobalt transition-colors hover:border-revora-cobalt hover:bg-revora-sky"
          >
            Open in Google Maps <ArrowUpRight className="h-4 w-4" />
          </a>
        </div>
      </div>

      {/* the map */}
      <div className="relative min-h-80 bg-revora-sky tablet:min-h-105">
        {load ? (
          <iframe
            src={SITE.map.embed}
            title={`Map showing ${SITE.legalName}, ${ADDRESS.join(', ')}`}
            className="absolute inset-0 h-full w-full border-0"
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
            allowFullScreen
          />
        ) : (
          <div className="absolute inset-0 flex flex-col items-center justify-center bg-[radial-gradient(circle_at_50%_40%,#FFFFFF_0%,#E8F1F9_55%,#D5E4F4_100%)] p-6 text-center">
            {/* a soft street-grid pattern behind the pin */}
            <div
              aria-hidden
              className="absolute inset-0 opacity-50 [background-image:linear-gradient(rgba(11,74,143,0.08)_1px,transparent_1px),linear-gradient(90deg,rgba(11,74,143,0.08)_1px,transparent_1px)] [background-size:44px_44px]"
            />
            <span className="relative grid h-16 w-16 place-items-center rounded-full bg-revora-crimson text-white shadow-[0_16px_30px_-12px_rgba(215,38,46,0.7)]">
              <MapPin className="h-7 w-7" />
            </span>
            <p className="relative mt-5 font-heading text-[1.15rem] font-extrabold text-revora-slate">S.G. Business Hub, Gota, Ahmedabad</p>
            <button
              type="button"
              onClick={() => setShown(true)}
              className="relative mt-5 inline-flex min-h-11 items-center gap-2 rounded-full bg-white px-6 font-sans text-[14px] font-semibold text-revora-cobalt shadow-[0_12px_30px_-14px_rgba(11,74,143,0.5)] ring-1 ring-revora-cobalt/15 transition-colors hover:bg-revora-cobalt hover:text-white"
            >
              <MapPin className="h-4 w-4" /> Show map
            </button>
            <p className="relative mt-4 max-w-xs font-sans text-[12.5px] leading-[1.6] text-revora-slate-muted">
              The map is provided by Google, which may set its own cookies. To show it automatically, allow marketing cookies in{' '}
              <CookieSettingsLink className="font-semibold text-revora-cobalt underline-offset-2 hover:underline" />.
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
