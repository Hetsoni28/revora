'use client';

import { useRef, useState } from 'react';
import { AlertCircle, CheckCircle2, Loader2, Paperclip } from 'lucide-react';

const REPORTER_TYPES = ['Patient or carer', 'Doctor / Physician', 'Pharmacist', 'Nurse', 'Other healthcare professional', 'Industry / Company employee'];
const SERIOUSNESS = [
  'Not serious (mild discomfort, resolved quickly)',
  'Serious – hospitalisation or prolonged stay',
  'Serious – life-threatening',
  'Serious – disability or permanent damage',
  'Serious – congenital anomaly',
  'Serious – death',
  'Serious – other medically important event',
];
const OUTCOMES = ['Recovered / resolved', 'Recovering / resolving', 'Not recovered / not resolved', 'Recovered with sequelae', 'Fatal', 'Unknown'];

interface FieldProps {
  label: string;
  required?: boolean;
  hint?: string;
  children: React.ReactNode;
}

function Field({ label, required, hint, children }: FieldProps) {
  return (
    <div>
      <label className="mb-1.5 block font-sans text-[13.5px] font-semibold text-revora-slate">
        {label}
        {required && <span className="ml-1 text-revora-crimson">*</span>}
      </label>
      {hint && <p className="mb-1.5 font-sans text-[12.5px] text-revora-slate-muted">{hint}</p>}
      {children}
    </div>
  );
}

const inputCls =
  'w-full rounded-xl border border-slate-200 bg-white px-4 py-2.5 font-sans text-[14px] text-revora-slate placeholder:text-slate-400 focus:border-revora-cobalt focus:outline-none focus:ring-2 focus:ring-revora-cobalt/20 transition-colors';
const selectCls = inputCls + ' cursor-pointer appearance-none';

export function AdrForm() {
  const formRef = useRef<HTMLFormElement>(null);
  const [status, setStatus] = useState<'idle' | 'submitting' | 'success' | 'error'>('idle');
  const [errorMsg, setErrorMsg] = useState('');
  const [fileName, setFileName] = useState('');
  const [consent, setConsent] = useState(false);

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (!consent) {
      setErrorMsg('Please tick the consent checkbox before submitting.');
      setStatus('error');
      return;
    }
    setStatus('submitting');
    setErrorMsg('');

    const fd = new FormData(e.currentTarget);
    fd.set('kind', 'adr');
    fd.set('_t', Date.now().toString());

    try {
      const res = await fetch('/api/enquiry', { method: 'POST', body: fd });
      if (!res.ok) throw new Error('Server error');
      setStatus('success');
      formRef.current?.reset();
      setConsent(false);
      setFileName('');
    } catch {
      setStatus('error');
      setErrorMsg('Something went wrong. Please try again or email safety@revorahealthcare.com directly.');
    }
  }

  if (status === 'success') {
    return (
      <div className="rounded-2xl border border-green-200 bg-green-50 p-8 text-center">
        <CheckCircle2 className="mx-auto mb-4 h-10 w-10 text-green-600" />
        <h3 className="font-heading text-xl font-extrabold text-revora-slate">Report received — thank you</h3>
        <p className="mt-2 font-sans text-[15px] text-revora-slate-light">
          Our Drug Safety Team will review your report and may contact you for follow-up. All reports are treated in strict confidence.
        </p>
        <button
          onClick={() => setStatus('idle')}
          className="mt-6 rounded-full bg-revora-slate px-6 py-2.5 font-sans text-[13.5px] font-semibold text-white transition-opacity hover:opacity-80"
        >
          Submit another report
        </button>
      </div>
    );
  }

  return (
    <form ref={formRef} onSubmit={handleSubmit} noValidate className="space-y-6">
      {/* Honeypot */}
      <input type="text" name="website" className="hidden" tabIndex={-1} autoComplete="off" />

      {/* Section A – Reporter */}
      <div className="rounded-2xl border border-slate-200 bg-slate-50/60 p-6">
        <h3 className="mb-5 font-heading text-lg font-extrabold text-revora-slate">A. About you (the reporter)</h3>
        <div className="grid gap-5 tablet:grid-cols-2">
          <Field label="I am a" required>
            <select name="reporter_type" required className={selectCls} defaultValue="">
              <option value="" disabled>Select…</option>
              {REPORTER_TYPES.map((r) => <option key={r} value={r}>{r}</option>)}
            </select>
          </Field>
          <Field label="Your name" required>
            <input type="text" name="name" required maxLength={100} placeholder="Full name" className={inputCls} />
          </Field>
          <Field label="Email">
            <input type="email" name="email" maxLength={160} placeholder="your@email.com" className={inputCls} />
          </Field>
          <Field label="Phone">
            <input type="tel" name="phone" maxLength={30} placeholder="+91 …" className={inputCls} />
          </Field>
          <Field label="City / State" hint="Optional — helps us follow up if needed">
            <input type="text" name="city" maxLength={120} placeholder="e.g. Ahmedabad, Gujarat" className={inputCls} />
          </Field>
        </div>
      </div>

      {/* Section B – Patient */}
      <div className="rounded-2xl border border-slate-200 bg-slate-50/60 p-6">
        <h3 className="mb-5 font-heading text-lg font-extrabold text-revora-slate">B. About the patient</h3>
        <p className="mb-4 font-sans text-[13px] text-revora-slate-muted">
          You do not need to give the patient's name. Initials or &quot;anonymous&quot; is fine. We use this information only to assess the report.
        </p>
        <div className="grid gap-5 tablet:grid-cols-3">
          <Field label="Patient initials / anonymous">
            <input type="text" name="patient_initials" maxLength={40} placeholder="e.g. R.S. or Anonymous" className={inputCls} />
          </Field>
          <Field label="Gender">
            <select name="patient_gender" className={selectCls} defaultValue="">
              <option value="">Not specified</option>
              <option value="Male">Male</option>
              <option value="Female">Female</option>
              <option value="Other">Other</option>
            </select>
          </Field>
          <Field label="Age">
            <input type="text" name="patient_age" maxLength={20} placeholder="e.g. 45 years" className={inputCls} />
          </Field>
        </div>
      </div>

      {/* Section C – Product */}
      <div className="rounded-2xl border border-slate-200 bg-slate-50/60 p-6">
        <h3 className="mb-5 font-heading text-lg font-extrabold text-revora-slate">C. About the product</h3>
        <div className="grid gap-5 tablet:grid-cols-2">
          <Field label="Product name" required>
            <input type="text" name="product_name" required maxLength={200} placeholder="e.g. MOXORA Eye Drops" className={inputCls} />
          </Field>
          <Field label="Batch number" hint="Printed on the carton or strip">
            <input type="text" name="batch_number" maxLength={80} placeholder="e.g. MX26001A" className={inputCls} />
          </Field>
          <Field label="Expiry date (on pack)">
            <input type="text" name="expiry_date" maxLength={40} placeholder="e.g. 03/2027" className={inputCls} />
          </Field>
          <Field label="What was the product being used for?">
            <input type="text" name="indication" maxLength={500} placeholder="Indication or condition" className={inputCls} />
          </Field>
          <Field label="Dose and frequency" hint="e.g. 1 drop in each eye, twice daily">
            <input type="text" name="dose" maxLength={200} placeholder="Dose and how often" className={inputCls} />
          </Field>
          <Field label="Other medicines being taken at the same time">
            <input type="text" name="other_medicines" maxLength={500} placeholder="List any other medicines" className={inputCls} />
          </Field>
        </div>
        <div className="mt-5">
          <Field
            label="Photo of the pack / label (optional)"
            hint="PDF, JPG or PNG, up to 4 MB. Helps us identify the batch faster."
          >
            <label className="flex cursor-pointer items-center gap-3 rounded-xl border border-dashed border-slate-300 bg-white px-4 py-3 transition-colors hover:border-revora-cobalt">
              <Paperclip className="h-4 w-4 shrink-0 text-slate-400" />
              <span className="font-sans text-[13.5px] text-slate-500">{fileName || 'Choose file…'}</span>
              <input
                type="file"
                name="cv"
                accept=".pdf,.jpg,.jpeg,.png"
                className="hidden"
                onChange={(e) => setFileName(e.target.files?.[0]?.name ?? '')}
              />
            </label>
          </Field>
        </div>
      </div>

      {/* Section D – Event */}
      <div className="rounded-2xl border border-slate-200 bg-slate-50/60 p-6">
        <h3 className="mb-5 font-heading text-lg font-extrabold text-revora-slate">D. What happened</h3>
        <div className="grid gap-5">
          <Field label="Describe the reaction or quality issue" required hint="Include what you observed, when it started, how long it lasted, and any action taken.">
            <textarea
              name="event_description"
              required
              maxLength={3000}
              rows={5}
              placeholder="Describe what happened…"
              className={inputCls + ' resize-y'}
            />
          </Field>
          <div className="grid gap-5 tablet:grid-cols-2">
            <Field label="Date / approximate date of onset">
              <input type="text" name="onset_date" maxLength={80} placeholder="e.g. 20 October 2026" className={inputCls} />
            </Field>
            <Field label="Seriousness">
              <select name="seriousness" className={selectCls} defaultValue="">
                <option value="">Select…</option>
                {SERIOUSNESS.map((s) => <option key={s} value={s}>{s}</option>)}
              </select>
            </Field>
            <Field label="Current outcome">
              <select name="outcome" className={selectCls} defaultValue="">
                <option value="">Select…</option>
                {OUTCOMES.map((o) => <option key={o} value={o}>{o}</option>)}
              </select>
            </Field>
          </div>
        </div>
      </div>

      {/* Consent */}
      <label className="flex cursor-pointer items-start gap-3 rounded-xl border border-slate-200 bg-white p-5">
        <input
          type="checkbox"
          checked={consent}
          onChange={(e) => setConsent(e.target.checked)}
          className="mt-0.5 h-4 w-4 shrink-0 cursor-pointer accent-revora-crimson"
        />
        <span className="font-sans text-[13.5px] leading-[1.6] text-revora-slate-light">
          I consent to Revora Healthcare Private Limited using the details I have provided for the purpose of assessing and acting on this report,
          and sharing it (with patient information de-identified wherever possible) with the Pharmacovigilance Programme of India (PvPI), CDSCO, and
          any relevant regulatory authority, as required by pharmacovigilance law. I understand that this report may be kept for as long as drug
          safety regulations require.{' '}
          <span className="font-semibold text-revora-slate">This field is required.</span>
        </span>
      </label>

      {status === 'error' && (
        <div className="flex items-start gap-3 rounded-xl border border-red-200 bg-red-50 px-4 py-3">
          <AlertCircle className="mt-0.5 h-4 w-4 shrink-0 text-red-600" />
          <p className="font-sans text-[13.5px] text-red-700">{errorMsg}</p>
        </div>
      )}

      <button
        type="submit"
        disabled={status === 'submitting'}
        className="flex w-full items-center justify-center gap-2 rounded-full bg-revora-crimson px-8 py-3.5 font-sans text-[14.5px] font-semibold text-white transition-opacity hover:opacity-90 disabled:opacity-60"
      >
        {status === 'submitting' && <Loader2 className="h-4 w-4 animate-spin" />}
        {status === 'submitting' ? 'Submitting…' : 'Submit safety report'}
      </button>

      <p className="text-center font-sans text-[12px] text-revora-slate-muted">
        You can also report directly to the{' '}
        <a href="https://pvpi.nic.in/" target="_blank" rel="noopener noreferrer" className="font-semibold text-revora-cobalt hover:underline">
          Pharmacovigilance Programme of India (PvPI)
        </a>
        . National helpline: <a href="tel:18001804722" className="font-semibold text-revora-cobalt hover:underline">1800-180-4722</a>.
      </p>
    </form>
  );
}
