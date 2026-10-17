'use client';

import { Building2 } from 'lucide-react';

interface FormularyBannerProps {
  title?: string;
  description?: string;
  buttonLabel?: string;
  onAction: () => void;
  showCredentials?: boolean;
}

export function FormularyBanner({
  title = 'Supplying Eye Hospitals & Surgical Centers Across India',
  description = 'Revora Healthcare offers direct institutional rate contracts, consistent batch delivery, and comprehensive analytical documentation for hospital drug formularies.',
  buttonLabel = 'Request Institutional Rate Card',
  onAction,
  showCredentials = false,
}: FormularyBannerProps) {
  return (
    <div className="bg-[#1E2428] rounded-2xl p-6 sm:p-10 text-white relative overflow-hidden shadow-xl">
      <div className="absolute top-0 right-0 w-80 h-80 bg-[#0B4A8F]/30 rounded-full blur-3xl pointer-events-none" />

      <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div className="max-w-2xl">
          <span className="text-xs uppercase tracking-wider text-[#D7262E] font-semibold">
            Institutional Formulary Supply
          </span>
          <h3 className="font-heading font-bold text-xl sm:text-3xl text-white mt-1 tracking-tight">
            {title}
          </h3>
          <p className="font-sans text-xs sm:text-sm text-white/75 mt-2 leading-relaxed">
            {description}
          </p>

          {showCredentials && (
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 mt-6">
              <div className="p-3 rounded-xl bg-white/5 border border-white/10">
                <span className="font-heading font-bold text-xs text-white block">
                  WHO-GMP Certified
                </span>
                <span className="text-[10.5px] text-white/60 mt-0.5 block">
                  Schedule M Adherence
                </span>
              </div>
              <div className="p-3 rounded-xl bg-white/5 border border-white/10">
                <span className="font-heading font-bold text-xs text-white block">
                  BFS Aseptic Fill
                </span>
                <span className="text-[10.5px] text-white/60 mt-0.5 block">
                  Zero Touch Sterility
                </span>
              </div>
              <div className="p-3 rounded-xl bg-white/5 border border-white/10">
                <span className="font-heading font-bold text-xs text-white block">
                  Batch CoA Released
                </span>
                <span className="text-[10.5px] text-white/60 mt-0.5 block">
                  Complete Dossier
                </span>
              </div>
            </div>
          )}
        </div>

        <button
          onClick={onAction}
          className="shrink-0 px-6 py-3.5 rounded-xl bg-[#0B4A8F] hover:bg-[#08356A] text-white text-xs font-semibold whitespace-nowrap transition-colors shadow-md border border-white/20 flex items-center justify-center gap-2"
        >
          <Building2 size={15} />
          <span>{buttonLabel}</span>
        </button>
      </div>
    </div>
  );
}
