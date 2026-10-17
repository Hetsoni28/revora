'use client';

import { useState } from 'react';
import { toast } from 'sonner';
import { X, Building2, Send, ShieldCheck, CheckCircle2 } from 'lucide-react';
import { Product } from '@/lib/therapies-data';

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

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    setTimeout(() => {
      setIsSubmitting(false);
      toast.success('Formulary Request Dispatched', {
        description: `Your clinical sample request for ${
          product ? product.name : categoryName || 'Ophthalmic Products'
        } has been routed to Revora Medical Affairs & Institutional Supply.`,
      });
      onClose();
    }, 600);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs">
      <div
        className="bg-white rounded-2xl max-w-xl w-full border border-[#D9DFE8] shadow-2xl overflow-hidden animate-in fade-in zoom-in-95 duration-200"
        role="dialog"
        aria-modal="true"
      >
        {/* Header */}
        <div className="bg-[#0B4A8F] text-white p-6 relative">
          <button
            onClick={onClose}
            className="absolute top-5 right-5 text-white/70 hover:text-white transition-colors"
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
          className="p-6 space-y-4 max-h-[75vh] overflow-y-auto overscroll-contain"
        >
          {product && (
            <div className="bg-[#E8F1F9]/60 p-3 rounded-lg border border-[#0B4A8F]/15 flex items-center justify-between text-xs">
              <div>
                <span className="font-semibold text-[#0B4A8F]">{product.name}</span>
                <span className="text-[#1E2428]/60 ml-2">({product.volume})</span>
              </div>
              <span className="font-mono text-[10.5px] bg-white px-2 py-0.5 rounded text-[#1E2428]/70 border border-[#D9DFE8]">
                {product.badge}
              </span>
            </div>
          )}

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
            <div>
              <label className="block text-xs font-semibold text-[#1E2428] mb-1">
                Full Name / Doctor Name *
              </label>
              <input
                type="text"
                required
                placeholder="Dr. Rajesh Patel"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                className="w-full px-3 py-2 text-xs rounded-lg border border-[#D9DFE8] focus:border-[#0B4A8F] focus:outline-none"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-[#1E2428] mb-1">
                Designation / Role *
              </label>
              <select
                value={formData.designation}
                onChange={(e) => setFormData({ ...formData, designation: e.target.value })}
                className="w-full px-3 py-2 text-xs rounded-lg border border-[#D9DFE8] focus:border-[#0B4A8F] focus:outline-none bg-white"
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
              <label className="block text-xs font-semibold text-[#1E2428] mb-1">
                Hospital / Clinic / Pharmacy *
              </label>
              <input
                type="text"
                required
                placeholder="Aavkar Eye Institute"
                value={formData.institution}
                onChange={(e) => setFormData({ ...formData, institution: e.target.value })}
                className="w-full px-3 py-2 text-xs rounded-lg border border-[#D9DFE8] focus:border-[#0B4A8F] focus:outline-none"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-[#1E2428] mb-1">
                City / Location *
              </label>
              <input
                type="text"
                required
                placeholder="Ahmedabad, Gujarat"
                value={formData.city}
                onChange={(e) => setFormData({ ...formData, city: e.target.value })}
                className="w-full px-3 py-2 text-xs rounded-lg border border-[#D9DFE8] focus:border-[#0B4A8F] focus:outline-none"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
            <div>
              <label className="block text-xs font-semibold text-[#1E2428] mb-1">
                Official Email Address *
              </label>
              <input
                type="email"
                required
                placeholder="dr.patel@eyehospital.com"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                className="w-full px-3 py-2 text-xs rounded-lg border border-[#D9DFE8] focus:border-[#0B4A8F] focus:outline-none"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-[#1E2428] mb-1">
                Mobile / WhatsApp Number *
              </label>
              <input
                type="tel"
                required
                placeholder="+91 98765 43210"
                value={formData.phone}
                onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                className="w-full px-3 py-2 text-xs rounded-lg border border-[#D9DFE8] focus:border-[#0B4A8F] focus:outline-none"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-semibold text-[#1E2428] mb-1">
              Sample Type &amp; Requirements
            </label>
            <select
              value={formData.quantityNeeded}
              onChange={(e) => setFormData({ ...formData, quantityNeeded: e.target.value })}
              className="w-full px-3 py-2 text-xs rounded-lg border border-[#D9DFE8] focus:border-[#0B4A8F] focus:outline-none bg-white"
            >
              <option value="Sample Pack (5 units)">Doctor Evaluation Sample Pack (5 units)</option>
              <option value="Hospital Formulary Review (10 units)">Hospital Formulary Review Pack (10 units)</option>
              <option value="Institutional Quotation / Bulk Pricing">Institutional Quotation / Bulk Hospital Pricing</option>
              <option value="Distributorship Inquiry">Authorized Territory Distributorship</option>
            </select>
          </div>

          <div>
            <label className="block text-xs font-semibold text-[#1E2428] mb-1">
              Clinical Notes / Special Requests
            </label>
            <textarea
              rows={2}
              placeholder="e.g. Please include Certificate of Analysis (CoA) and product stability data."
              value={formData.message}
              onChange={(e) => setFormData({ ...formData, message: e.target.value })}
              className="w-full px-3 py-2 text-xs rounded-lg border border-[#D9DFE8] focus:border-[#0B4A8F] focus:outline-none"
            />
          </div>

          <div className="flex items-center gap-2 text-[11px] text-[#1E2428]/60 bg-[#F8FAFC] p-2.5 rounded-lg border border-[#D9DFE8]">
            <ShieldCheck size={16} className="text-[#0B4A8F] shrink-0" />
            <span>
              Samples dispatched strictly to verified medical practitioners and healthcare facilities under DCGI guidelines.
            </span>
          </div>

          <div className="pt-2 flex items-center justify-end gap-3">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 text-xs font-semibold text-[#1E2428]/70 hover:text-[#1E2428] transition-colors"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={isSubmitting}
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-lg bg-[#0B4A8F] hover:bg-[#08356A] text-white text-xs font-semibold transition-colors shadow-xs disabled:opacity-50"
            >
              <Send size={14} />
              <span>{isSubmitting ? 'Dispatching Request...' : 'Submit Formulary Request'}</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
