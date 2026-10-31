'use client';

import { useState } from 'react';
import { toast } from 'sonner';
import { Send, Paperclip } from 'lucide-react';
import { useEnquiry } from '@/lib/use-enquiry';
import { CV_ACCEPT, CV_MAX_BYTES, CV_TYPES } from '@/lib/enquiry';
import { Honeypot } from '@/components/ui/honeypot';
import { Button } from '@/components/ui/button';

/* ─── static option lists ─── */
const REPORTER_TYPES = [
  'Patient or carer',
  'Doctor / Physician',
  'Pharmacist',
  'Nurse',
  'Other healthcare professional',
  'Industry / Company employee',
];

const SERIOUSNESS = [
  '',
  'Not serious (mild discomfort, resolved quickly)',
  'Serious – hospitalisation or prolonged stay',
  'Serious – life-threatening',
  'Serious – disability or permanent damage',
  'Serious – congenital anomaly',
  'Serious – death',
  'Serious – other medically important event',
];

const OUTCOMES = ['', 'Recovered / resolved', 'Recovering / resolving', 'Not recovered / not resolved', 'Recovered with sequelae', 'Fatal', 'Unknown'];

/* ─── site-wide field & label styles (matches contact / careers) ─── */
const field =
  'w-full rounded-xl border border-revora-cobalt/15 bg-white px-4 py-3 font-sans text-[16px] text-revora-slate outline-none transition-[border-color,box-shadow] placeholder:text-revora-slate-muted focus:border-revora-cobalt focus:shadow-[0_0_0_4px_rgba(11,74,143,0.12)] tablet:text-[15px]';
const label = 'mb-1.5 block font-sans text-[12px] font-semibold uppercase tracking-[0.12em] text-revora-slate-light';

/* ─── section card (visual grouping) ─── */
function Card({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div className="rounded-[20px] border border-revora-cobalt/10 bg-[#F6F9FC] p-6 tablet:p-7">
      <p className="mb-5 font-sans text-[11px] font-semibold uppercase tracking-[0.18em] text-revora-cobalt">{title}</p>
      {children}
    </div>
  );
}

/* ════════════════════════════════════════════════════════
   ADR Online Reporting Form
   Submits to /api/enquiry → safety@revorahealthcare.com
   ════════════════════════════════════════════════════════ */
export function AdrForm() {
  /* form state */
  const [reporter_type, setReporterType] = useState(REPORTER_TYPES[0]);
  const [form, setForm] = useState({
    name: '', email: '', phone: '', city: '',
    patient_initials: '', patient_gender: '', patient_age: '',
    product_name: '', batch_number: '', expiry_date: '',
    indication: '', dose: '', other_medicines: '',
    event_description: '', onset_date: '', seriousness: '', outcome: '',
  });
  const [packPhoto, setPackPhoto] = useState<File | null>(null);
  const [packKey, setPackKey] = useState(0);
  const [consent, setConsent] = useState(false);

  const set = (k: keyof typeof form) =>
    (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) =>
      setForm({ ...form, [k]: e.target.value });

  /* useEnquiry handles fetch → toast → email-app fallback */
  const { send, sending, honeypot } = useEnquiry('adr');

  /* file pick — reuse site's CV validation */
  const pickPhoto = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0] ?? null;
    if (file && (file.size > CV_MAX_BYTES || !CV_TYPES.includes(file.type))) {
      toast.error('Please choose a PDF or image file up to 4 MB.');
      e.target.value = '';
      setPackPhoto(null);
      return;
    }
    setPackPhoto(file);
  };

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!consent) {
      toast.error('Please tick the consent checkbox before submitting.');
      return;
    }
    if (await send({ reporter_type, ...form }, packPhoto)) {
      setForm({
        name: '', email: '', phone: '', city: '',
        patient_initials: '', patient_gender: '', patient_age: '',
        product_name: '', batch_number: '', expiry_date: '',
        indication: '', dose: '', other_medicines: '',
        event_description: '', onset_date: '', seriousness: '', outcome: '',
      });
      setReporterType(REPORTER_TYPES[0]);
      setPackPhoto(null);
      setPackKey((k) => k + 1);
      setConsent(false);
    }
  };

  return (
    <form onSubmit={submit} className="relative space-y-5">
      <Honeypot inputRef={honeypot} />

      {/* A – Reporter */}
      <Card title="A — About you (the reporter)">
        <div className="grid gap-5 tablet:grid-cols-2">
          <label className="tablet:col-span-2">
            <span className={label}>I am a *</span>
            <select value={reporter_type} onChange={(e) => setReporterType(e.target.value)} className={field}>
              {REPORTER_TYPES.map((r) => <option key={r}>{r}</option>)}
            </select>
          </label>
          <label>
            <span className={label}>Your name *</span>
            <input required value={form.name} onChange={set('name')} placeholder="Full name" className={field} />
          </label>
          <label>
            <span className={label}>Email</span>
            <input type="email" value={form.email} onChange={set('email')} placeholder="your@email.com" className={field} />
          </label>
          <label>
            <span className={label}>Phone</span>
            <input type="tel" value={form.phone} onChange={set('phone')} placeholder="+91 …" className={field} />
          </label>
          <label>
            <span className={label}>City / State</span>
            <input value={form.city} onChange={set('city')} placeholder="e.g. Ahmedabad, Gujarat" className={field} />
          </label>
        </div>
      </Card>

      {/* B – Patient */}
      <Card title="B — About the patient">
        <p className="mb-4 font-sans text-[13px] leading-[1.6] text-revora-slate-muted">
          No full name needed — initials or &quot;anonymous&quot; is fine. We use this only to assess the report.
        </p>
        <div className="grid gap-5 tablet:grid-cols-3">
          <label>
            <span className={label}>Patient initials / anon</span>
            <input value={form.patient_initials} onChange={set('patient_initials')} placeholder="e.g. R.S." className={field} />
          </label>
          <label>
            <span className={label}>Gender</span>
            <select value={form.patient_gender} onChange={set('patient_gender')} className={field}>
              <option value="">Not specified</option>
              <option>Male</option>
              <option>Female</option>
              <option>Other</option>
            </select>
          </label>
          <label>
            <span className={label}>Age</span>
            <input value={form.patient_age} onChange={set('patient_age')} placeholder="e.g. 45 years" className={field} />
          </label>
        </div>
      </Card>

      {/* C – Product */}
      <Card title="C — About the product">
        <div className="grid gap-5 tablet:grid-cols-2">
          <label>
            <span className={label}>Product name *</span>
            <input required value={form.product_name} onChange={set('product_name')} placeholder="e.g. MOXORA Eye Drops" className={field} />
          </label>
          <label>
            <span className={label}>Batch number</span>
            <input value={form.batch_number} onChange={set('batch_number')} placeholder="Printed on the carton or strip" className={field} />
          </label>
          <label>
            <span className={label}>Expiry date (on pack)</span>
            <input value={form.expiry_date} onChange={set('expiry_date')} placeholder="e.g. 03/2027" className={field} />
          </label>
          <label>
            <span className={label}>Used for (indication)</span>
            <input value={form.indication} onChange={set('indication')} placeholder="Condition being treated" className={field} />
          </label>
          <label>
            <span className={label}>Dose and frequency</span>
            <input value={form.dose} onChange={set('dose')} placeholder="e.g. 1 drop in each eye, twice daily" className={field} />
          </label>
          <label>
            <span className={label}>Other medicines at same time</span>
            <input value={form.other_medicines} onChange={set('other_medicines')} placeholder="List any other medicines" className={field} />
          </label>
          <label className="tablet:col-span-2">
            <span className={label}>Photo of pack / label (PDF, JPG or PNG, up to 4 MB)</span>
            <input
              key={packKey}
              type="file"
              accept={CV_ACCEPT + ',.jpg,.jpeg,.png'}
              onChange={pickPhoto}
              className={`${field} cursor-pointer file:mr-4 file:cursor-pointer file:rounded-full file:border-0 file:bg-revora-sky file:px-4 file:py-2 file:font-sans file:text-[13px] file:font-semibold file:text-revora-cobalt`}
            />
            {packPhoto && (
              <p className="mt-1.5 flex items-center gap-1.5 font-sans text-[12px] text-revora-cobalt">
                <Paperclip className="h-3.5 w-3.5" /> {packPhoto.name}
              </p>
            )}
          </label>
        </div>
      </Card>

      {/* D – Event */}
      <Card title="D — What happened">
        <div className="grid gap-5 tablet:grid-cols-2">
          <label className="tablet:col-span-2">
            <span className={label}>Describe the reaction or quality issue *</span>
            <p className="mb-1.5 font-sans text-[12px] text-revora-slate-muted">Include what you observed, when it started, how long it lasted, and any action taken.</p>
            <textarea
              required
              rows={5}
              value={form.event_description}
              onChange={set('event_description')}
              placeholder="Describe what happened…"
              className={`${field} resize-y`}
            />
          </label>
          <label>
            <span className={label}>Date / approx. date of onset</span>
            <input value={form.onset_date} onChange={set('onset_date')} placeholder="e.g. 20 October 2026" className={field} />
          </label>
          <label>
            <span className={label}>Seriousness</span>
            <select value={form.seriousness} onChange={set('seriousness')} className={field}>
              {SERIOUSNESS.map((s) => <option key={s} value={s}>{s || 'Select…'}</option>)}
            </select>
          </label>
          <label>
            <span className={label}>Current outcome</span>
            <select value={form.outcome} onChange={set('outcome')} className={field}>
              {OUTCOMES.map((o) => <option key={o} value={o}>{o || 'Select…'}</option>)}
            </select>
          </label>
        </div>
      </Card>

      {/* Consent */}
      <label className="flex cursor-pointer items-start gap-3 rounded-[20px] border border-revora-cobalt/15 bg-white p-5">
        <input
          type="checkbox"
          checked={consent}
          onChange={(e) => setConsent(e.target.checked)}
          className="mt-0.5 h-4 w-4 shrink-0 cursor-pointer accent-revora-cobalt"
        />
        <span className="font-sans text-[13.5px] leading-[1.65] text-revora-slate-light">
          I consent to Revora Healthcare Private Limited using the details I have provided for the purpose of assessing and acting on this report,
          and sharing it (with patient data de-identified wherever possible) with PvPI, CDSCO and any relevant authority, as required by
          pharmacovigilance law. I understand this report may be kept for as long as drug safety regulations require.{' '}
          <span className="font-semibold text-revora-slate">Required.</span>
        </span>
      </label>

      {/* Footer row */}
      <div className="flex flex-wrap items-center justify-between gap-4">
        <p className="font-sans text-[13px] text-revora-slate-muted">
          {packPhoto ? `Attached: ${packPhoto.name}` : 'Sent to safety@revorahealthcare.com'}
        </p>
        <Button type="submit" arrow="up-right" magnetic icon={<Send />} disabled={sending}>
          {sending ? 'Submitting…' : 'Submit safety report'}
        </Button>
      </div>

      <p className="font-sans text-[12px] text-revora-slate-muted">
        You can also report to the{' '}
        <a href="https://pvpi.nic.in/" target="_blank" rel="noopener noreferrer" className="font-semibold text-revora-cobalt hover:underline">
          Pharmacovigilance Programme of India (PvPI)
        </a>
        . National helpline:{' '}
        <a href="tel:18001804722" className="font-semibold text-revora-cobalt hover:underline">1800-180-4722</a> (toll free).
      </p>
    </form>
  );
}
