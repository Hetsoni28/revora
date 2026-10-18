'use client';

import { useEffect, useState } from 'react';
import { toast } from 'sonner';
import { AnimatePresence, motion } from 'framer-motion';
import { useLenis } from 'lenis/react';
import { X, Building2, Send, ShieldCheck } from 'lucide-react';
import { expoOut } from '@/lib/easings';
import { Product } from '@/lib/therapies-data';

const REQUEST_EMAIL = 'depot@revorahealthcare.com';

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
  const [isSubmitting, setIsSubmitting] = useState(false);
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

  // Lock the page behind the dialog and close on Escape.
  const lenis = useLenis();
  useEffect(() => {
    if (!isOpen) return;
    lenis?.stop();
    const onKey = (e: KeyboardEvent) => e.key === 'Escape' && onClose();
    window.addEventListener('keydown', onKey);
    return () => {
      lenis?.start();
      window.removeEventListener('keydown', onKey);
    };
  }, [isOpen, lenis, onClose]);

  // No backend yet: hand the request to the visitor's email app, pre-filled.
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    const subject = `Sample request — ${product ? product.name : categoryName || 'Ophthalmic products'}`;
    const body = [
      `Product: ${product ? `${product.name} (${product.genericName})` : categoryName || 'General enquiry'}`,
      `Name: ${formData.name}`,
      `Designation: ${formData.designation}`,
      `Institution: ${formData.institution}`,
      `City / State: ${formData.city}, ${formData.state}`,
      `Email: ${formData.email}`,
      `Phone: ${formData.phone}`,
      `Quantity: ${formData.quantityNeeded}`,
      '',
      formData.message,
    ].join('\n');
    window.location.href = `mailto:${REQUEST_EMAIL}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
    toast.success('Your email app is opening', {
      description: `The request is pre-filled — just press send to reach ${REQUEST_EMAIL}.`,
    });
    setIsSubmitting(false);
    onClose();
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
        role="dialog"
        aria-modal="true"
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

          <h3 className="font-heading font-bold text-xl tablet:text-2xl text-white">
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
          className="min-h-0 flex-1 space-y-4 overflow-y-auto overscroll-contain p-5 tablet:p-6"
        >
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
              <label className="block text-xs font-semibold text-revora-slate mb-1">
                Full Name / Doctor Name *
              </label>
              <input
                type="text"
                required
                placeholder="Dr. Rajesh Patel"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                className="w-full rounded-lg px-3 py-2.5 text-[16px] tablet:py-2 tablet:text-xs border border-[#D9DFE8] focus:border-revora-cobalt focus:outline-none"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-revora-slate mb-1">
                Designation / Role *
              </label>
              <select
                value={formData.designation}
                onChange={(e) => setFormData({ ...formData, designation: e.target.value })}
                className="w-full rounded-lg px-3 py-2.5 text-[16px] tablet:py-2 tablet:text-xs border border-[#D9DFE8] focus:border-revora-cobalt focus:outline-none bg-white"
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
              <label className="block text-xs font-semibold text-revora-slate mb-1">
                Hospital / Clinic / Pharmacy *
              </label>
              <input
                type="text"
                required
                placeholder="Aavkar Eye Institute"
                value={formData.institution}
                onChange={(e) => setFormData({ ...formData, institution: e.target.value })}
                className="w-full rounded-lg px-3 py-2.5 text-[16px] tablet:py-2 tablet:text-xs border border-[#D9DFE8] focus:border-revora-cobalt focus:outline-none"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-revora-slate mb-1">
                City / Location *
              </label>
              <input
                type="text"
                required
                placeholder="Ahmedabad, Gujarat"
                value={formData.city}
                onChange={(e) => setFormData({ ...formData, city: e.target.value })}
                className="w-full rounded-lg px-3 py-2.5 text-[16px] tablet:py-2 tablet:text-xs border border-[#D9DFE8] focus:border-revora-cobalt focus:outline-none"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
            <div>
              <label className="block text-xs font-semibold text-revora-slate mb-1">
                Official Email Address *
              </label>
              <input
                type="email"
                required
                placeholder="dr.patel@eyehospital.com"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                className="w-full rounded-lg px-3 py-2.5 text-[16px] tablet:py-2 tablet:text-xs border border-[#D9DFE8] focus:border-revora-cobalt focus:outline-none"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-revora-slate mb-1">
                Mobile / WhatsApp Number *
              </label>
              <input
                type="tel"
                required
                placeholder="+91 98765 43210"
                value={formData.phone}
                onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                className="w-full rounded-lg px-3 py-2.5 text-[16px] tablet:py-2 tablet:text-xs border border-[#D9DFE8] focus:border-revora-cobalt focus:outline-none"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-semibold text-revora-slate mb-1">
              Sample Type &amp; Requirements
            </label>
            <select
              value={formData.quantityNeeded}
              onChange={(e) => setFormData({ ...formData, quantityNeeded: e.target.value })}
              className="w-full rounded-lg px-3 py-2.5 text-[16px] tablet:py-2 tablet:text-xs border border-[#D9DFE8] focus:border-revora-cobalt focus:outline-none bg-white"
            >
              <option value="Sample Pack (5 units)">Doctor Evaluation Sample Pack (5 units)</option>
              <option value="Hospital Formulary Review (10 units)">Hospital Formulary Review Pack (10 units)</option>
              <option value="Institutional Quotation / Bulk Pricing">Institutional Quotation / Bulk Hospital Pricing</option>
              <option value="Distributorship Inquiry">Authorized Territory Distributorship</option>
            </select>
          </div>

          <div>
            <label className="block text-xs font-semibold text-revora-slate mb-1">
              Clinical Notes / Special Requests
            </label>
            <textarea
              rows={2}
              placeholder="e.g. Please include Certificate of Analysis (CoA) and product stability data."
              value={formData.message}
              onChange={(e) => setFormData({ ...formData, message: e.target.value })}
              className="w-full rounded-lg px-3 py-2.5 text-[16px] tablet:py-2 tablet:text-xs border border-[#D9DFE8] focus:border-revora-cobalt focus:outline-none"
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
              <span>{isSubmitting ? 'Opening email…' : 'Send request by email'}</span>
            </button>
          </div>
        </form>
      </motion.div>
    </motion.div>
    )}
    </AnimatePresence>
  );
}
