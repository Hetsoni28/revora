'use client';

import { useEffect, useId, useRef, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { useLenis } from 'lenis/react';
import { X, Building2, Send, ShieldCheck } from 'lucide-react';
import { expoOut } from '@/lib/easings';
import type { Product } from '@/lib/catalogue';
import { useFocusTrap } from '@/lib/a11y';
import { useEnquiry } from '@/lib/use-enquiry';
import { Honeypot } from '@/components/ui/honeypot';


interface FormularyModalProps {
  isOpen: boolean;
  onClose: () => void;
  product?: Product | null;
  categoryName?: string;
}

export function FormularyModal({
  isOpen,
  onClose,
  product,
  categoryName,
}: FormularyModalProps) {
  const [formData, setFormData] = useState({
    name: '',
    designation: 'Ophthalmologist / Surgeon',
    institution: '',
    city: '',
    state: 'Gujarat',
    email: '',
    phone: '',
    quantityNeeded: 'Sample Pack (5 units)',
    message: '',
  });

  // Lock the page behind the dialog; keep keyboard focus inside it and close on Escape.
  const lenis = useLenis();
  useEffect(() => {
    if (!isOpen) return;
    lenis?.stop();
    return () => {
      lenis?.start();
    };
  }, [isOpen, lenis]);
  const dialogRef = useRef<HTMLDivElement>(null);
  useFocusTrap(dialogRef, isOpen, onClose);
  const uid = useId();

  const { send, sending: isSubmitting, honeypot } = useEnquiry('samples');

  // Sent straight to our sales inbox; falls back to the visitor's email app until email is set up.
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const { quantityNeeded, ...rest } = formData;
    const ok = await send({
      ...rest,
      quantity: quantityNeeded,
      product: product ? `${product.name} (${product.genericName})` : categoryName || 'General enquiry',
    });
    if (ok) onClose();
  };

  return (
    <AnimatePresence>
    {isOpen && (
    <motion.div
      data-lenis-prevent
      className="fixed inset-0 z-150 flex items-end justify-center bg-revora-slate/60 p-3 tablet:items-center tablet:p-8 backdrop-blur-sm"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.3 }}
      onClick={(e) => e.target === e.currentTarget && onClose()}
    >
      <motion.div
        className="flex max-h-[calc(100dvh-1.5rem)] w-full max-w-xl flex-col overflow-hidden rounded-[24px] border border-revora-cobalt/10 bg-white shadow-2xl tablet:max-h-[calc(100dvh-4rem)] tablet:rounded-[28px]"
        ref={dialogRef}
        role="dialog"
        aria-modal="true"
        aria-labelledby={`${uid}-title`}
        initial={{ opacity: 0, y: 40, scale: 0.97 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        exit={{ opacity: 0, y: 24, scale: 0.98 }}
        transition={{ duration: 0.5, ease: expoOut }}
      >
        {/* Header */}
        <div className="relative shrink-0 bg-revora-cobalt p-5 pr-14 text-white tablet:p-6 tablet:pr-14">
          <button
            onClick={onClose}
            className="absolute right-3 top-3 grid h-10 w-10 place-items-center rounded-full text-white/70 transition-colors hover:bg-white/10 hover:text-white tablet:right-4 tablet:top-4"
            aria-label="Close dialog"
          >
            <X size={20} />
          </button>

          <div className="inline-flex items-center gap-2 px-2.5 py-1 rounded-full bg-white/10 text-white/90 text-xs font-semibold mb-2">
            <Building2 size={13} />
            <span>Institutional &amp; Clinician Request</span>
          </div>

          <h3 id={`${uid}-title`} className="font-heading font-bold text-xl tablet:text-2xl text-white">
            {product
              ? `Request Samples: ${product.name}`
              : `Formulary Request: ${categoryName || 'Ophthalmic Solutions'}`}
          </h3>
          <p className="font-sans text-xs text-white/80 mt-1">
            Complimentary clinical evaluation packs provided exclusively to Registered Medical Practitioners (RMPs), Eye Hospitals, and Licensed Pharmacies.
          </p>
        </div>

        {/* Form Body */}
        <form
          onSubmit={handleSubmit}
          data-lenis-prevent="true"
          className="relative min-h-0 flex-1 space-y-4 overflow-y-auto overscroll-contain p-5 tablet:p-6"
        >
          <Honeypot inputRef={honeypot} />
          {product && (
            <div className="bg-revora-sky/60 p-3 rounded-lg border border-revora-cobalt/15 flex items-center justify-between text-xs">
              <div>
                <span className="font-semibold text-revora-cobalt">{product.name}</span>
                <span className="text-revora-slate/60 ml-2">({product.volume})</span>
              </div>
              <span className="font-mono text-[11px] bg-white px-2 py-0.5 rounded text-revora-slate/70 border border-[#D9DFE8]">
                {product.badge}
              </span>
            </div>
          )}

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
            <div>
              <label htmlFor={`${uid}-f1`} className="block text-xs font-semibold text-revora-slate mb-1">
                Full Name / Doctor Name *
              </label>
              <input
                id={`${uid}-f1`}
                type="text"
                required
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                className="w-full rounded-lg px-3 py-2.5 text-[16px] tablet:py-2 tablet:text-xs border border-[#D9DFE8] focus:border-revora-cobalt focus:outline-none focus:shadow-[0_0_0_4px_rgba(11,74,143,0.12)]"
              />
            </div>

            <div>
              <label htmlFor={`${uid}-f2`} className="block text-xs font-semibold text-revora-slate mb-1">
                Designation / Role *
              </label>
              <select
                id={`${uid}-f2`}
                value={formData.designation}
                onChange={(e) => setFormData({ ...formData, designation: e.target.value })}
                className="w-full rounded-lg px-3 py-2.5 text-[16px] tablet:py-2 tablet:text-xs border border-[#D9DFE8] focus:border-revora-cobalt focus:outline-none focus:shadow-[0_0_0_4px_rgba(11,74,143,0.12)] bg-white"
              >
                <option value="Ophthalmologist / Surgeon">Ophthalmologist / Surgeon</option>
                <option value="Hospital Procurement Manager">Hospital Procurement Manager</option>
                <option value="Clinical Pharmacist">Clinical Pharmacist</option>
                <option value="Wholesale Distributor">Wholesale Distributor</option>
                <option value="Medical Director">Medical Director</option>
              </select>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
            <div>
              <label htmlFor={`${uid}-f3`} className="block text-xs font-semibold text-revora-slate mb-1">
                Hospital / Clinic / Pharmacy *
              </label>
              <input
                id={`${uid}-f3`}
                type="text"
                required
                value={formData.institution}
                onChange={(e) => setFormData({ ...formData, institution: e.target.value })}
                className="w-full rounded-lg px-3 py-2.5 text-[16px] tablet:py-2 tablet:text-xs border border-[#D9DFE8] focus:border-revora-cobalt focus:outline-none focus:shadow-[0_0_0_4px_rgba(11,74,143,0.12)]"
              />
            </div>

            <div>
              <label htmlFor={`${uid}-f4`} className="block text-xs font-semibold text-revora-slate mb-1">
                City / Location *
              </label>
              <input
                id={`${uid}-f4`}
                type="text"
                required
                value={formData.city}
                onChange={(e) => setFormData({ ...formData, city: e.target.value })}
                className="w-full rounded-lg px-3 py-2.5 text-[16px] tablet:py-2 tablet:text-xs border border-[#D9DFE8] focus:border-revora-cobalt focus:outline-none focus:shadow-[0_0_0_4px_rgba(11,74,143,0.12)]"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
            <div>
              <label htmlFor={`${uid}-f5`} className="block text-xs font-semibold text-revora-slate mb-1">
                Official Email Address *
              </label>
              <input
                id={`${uid}-f5`}
                type="email"
                required
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                className="w-full rounded-lg px-3 py-2.5 text-[16px] tablet:py-2 tablet:text-xs border border-[#D9DFE8] focus:border-revora-cobalt focus:outline-none focus:shadow-[0_0_0_4px_rgba(11,74,143,0.12)]"
              />
            </div>

            <div>
              <label htmlFor={`${uid}-f6`} className="block text-xs font-semibold text-revora-slate mb-1">
                Mobile / WhatsApp Number *
              </label>
              <input
                id={`${uid}-f6`}
                type="tel"
                required
                value={formData.phone}
                onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                className="w-full rounded-lg px-3 py-2.5 text-[16px] tablet:py-2 tablet:text-xs border border-[#D9DFE8] focus:border-revora-cobalt focus:outline-none focus:shadow-[0_0_0_4px_rgba(11,74,143,0.12)]"
              />
            </div>
          </div>

          <div>
            <label htmlFor={`${uid}-f7`} className="block text-xs font-semibold text-revora-slate mb-1">
              Sample Type &amp; Requirements
            </label>
            <select
                id={`${uid}-f7`}
              value={formData.quantityNeeded}
              onChange={(e) => setFormData({ ...formData, quantityNeeded: e.target.value })}
              className="w-full rounded-lg px-3 py-2.5 text-[16px] tablet:py-2 tablet:text-xs border border-[#D9DFE8] focus:border-revora-cobalt focus:outline-none focus:shadow-[0_0_0_4px_rgba(11,74,143,0.12)] bg-white"
            >
              <option value="Sample Pack (5 units)">Doctor Evaluation Sample Pack (5 units)</option>
              <option value="Hospital Formulary Review (10 units)">Hospital Formulary Review Pack (10 units)</option>
              <option value="Institutional Quotation / Bulk Pricing">Institutional Quotation / Bulk Hospital Pricing</option>
              <option value="Distributorship Inquiry">Authorized Territory Distributorship</option>
            </select>
          </div>

          <div>
            <label htmlFor={`${uid}-f8`} className="block text-xs font-semibold text-revora-slate mb-1">
              Clinical Notes / Special Requests
            </label>
            <textarea
                id={`${uid}-f8`}
              rows={2}
              value={formData.message}
              onChange={(e) => setFormData({ ...formData, message: e.target.value })}
              className="w-full rounded-lg px-3 py-2.5 text-[16px] tablet:py-2 tablet:text-xs border border-[#D9DFE8] focus:border-revora-cobalt focus:outline-none focus:shadow-[0_0_0_4px_rgba(11,74,143,0.12)]"
            />
          </div>

          <div className="flex items-center gap-2 text-[11px] text-revora-slate/60 bg-[#F8FAFC] p-2.5 rounded-lg border border-[#D9DFE8]">
            <ShieldCheck size={16} className="text-revora-cobalt shrink-0" />
            <span>
              Samples dispatched strictly to verified medical practitioners and healthcare facilities under DCGI guidelines.
            </span>
          </div>

          <div className="pt-2 flex items-center justify-end gap-3">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-3 text-xs font-semibold text-revora-slate/70 hover:text-revora-slate transition-colors"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={isSubmitting}
              className="inline-flex items-center gap-2 px-5 py-3 rounded-lg bg-revora-cobalt hover:bg-revora-cobalt-dark text-white text-xs font-semibold transition-colors shadow-xs disabled:opacity-50"
            >
              <Send size={14} />
              <span>{isSubmitting ? 'Sending…' : 'Send request'}</span>
            </button>
          </div>
        </form>
      </motion.div>
    </motion.div>
    )}
    </AnimatePresence>
  );
}
