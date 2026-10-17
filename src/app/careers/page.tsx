'use client';

import { useState } from 'react';
import Link from 'next/link';
import { Navbar } from '@/components/layout/navbar';
import { Footer } from '@/components/layout/footer';
import { Briefcase, MapPin, Clock, ArrowRight, CheckCircle2, Send, Sparkles, HeartHandshake, Microscope, Award } from 'lucide-react';
import { toast } from 'sonner';

const OPEN_POSITIONS = [
  {
    id: 'formulation-scientist',
    title: 'Senior Formulation Scientist — Ophthalmic Liquids & BFS',
    department: 'Research & Development',
    location: 'Sanand Formulation Hub, Ahmedabad, Gujarat',
    type: 'Full-time · On-site',
    experience: '5–8 Years in Sterile Ophthalmic BFS / Multi-Dose',
    description:
      'Lead formulation optimization for novel dry eye drops, nano-emulsions, and in-situ gels. Oversee laboratory scale-up, pilot batches, and technology transfer to commercial manufacturing lines.',
  },
  {
    id: 'qa-specialist',
    title: 'Quality Assurance & Regulatory Compliance Lead',
    department: 'Quality & Regulatory Affairs',
    location: '3rd Floor, S G Business Hub, Ahmedabad, Gujarat',
    type: 'Full-time · Hybrid',
    experience: '4–7 Years in WHO-GMP / US FDA Audits',
    description:
      'Manage global eCTD dossiers, batch record reviews, stability protocols, vendor qualification, and continuous audit readiness across all manufacturing partnerships.',
  },
  {
    id: 'cra-clinical',
    title: 'Clinical Research Associate (CRA) — Phase II–IV',
    department: 'Clinical Operations',
    location: 'Ahmedabad, Gujarat (with travel to clinical sites)',
    type: 'Full-time · Field/Office',
    experience: '3–6 Years in Ophthalmology Clinical Trials',
    description:
      'Coordinate multi-center clinical trials for ophthalmic drug candidates. Monitor investigator sites, ensure GCP compliance, and interface with ophthalmic key opinion leaders (KOLs).',
  },
  {
    id: 'intl-business-dev',
    title: 'International Business Development Manager — MENA & SEA',
    department: 'Global Commercial Operations',
    location: 'Ahmedabad, Gujarat / Regional Hub',
    type: 'Full-time · Hybrid',
    experience: '5+ Years in Pharma Export Sales & Dossier Out-Licensing',
    description:
      'Drive export revenue growth, manage distributor networks across the Middle East and Southeast Asia, and lead out-licensing negotiations for Revora proprietary formulations.',
  },
  {
    id: 'microbiology-analyst',
    title: 'Quality Control Microbiology Analyst (Cleanroom Suite)',
    department: 'Quality Control',
    location: 'Sanand Sterile Facility, Ahmedabad, Gujarat',
    type: 'Full-time · On-site',
    experience: '2–4 Years in Sterile Cleanroom Environmental Monitoring',
    description:
      'Execute bioburden testing, sterility assurance assays, bacterial endotoxin testing (BET/LAL), and environmental monitoring in ISO Class 5 filling zones.',
  },
];

const PERKS = [
  {
    icon: Microscope,
    title: 'Cutting-Edge R&D Labs',
    desc: 'Work with the latest instrumentation in ocular drug delivery, BFS tech, and nano-formulations.',
  },
  {
    icon: Award,
    title: 'Continuous Career Growth',
    desc: 'Tuition assistance, conference sponsorships, and clear leadership advancement pathways.',
  },
  {
    icon: HeartHandshake,
    title: 'Patient-First Mission',
    desc: 'Direct contribution to products that prevent vision loss and improve eye health for millions.',
  },
  {
    icon: Sparkles,
    title: 'Competitive Benefits',
    desc: 'Comprehensive medical insurance, performance incentives, and supportive work-life balance.',
  },
];

export default function CareersPage() {
  const [selectedJob, setSelectedJob] = useState('Senior Formulation Scientist — Ophthalmic Liquids & BFS');
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    experience: '3-5 years',
    linkedin: '',
    message: '',
  });
  const [submitting, setSubmitting] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.phone) {
      toast.error('Missing Required Fields', {
        description: 'Please provide your full name, email address, and phone number.',
      });
      return;
    }

    setSubmitting(true);
    setTimeout(() => {
      setSubmitting(false);
      toast.success('Application Received!', {
        description: `Thank you ${formData.name}. Our HR team has received your application for ${selectedJob}.`,
      });
      setFormData({
        name: '',
        email: '',
        phone: '',
        experience: '3-5 years',
        linkedin: '',
        message: '',
      });
    }, 1000);
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#F8F9FA]">
      <Navbar />

      <main className="flex-1 pt-24 tablet:pt-32 pb-24">
        {/* Hero Section */}
        <section className="relative px-6 py-16 tablet:py-24 bg-gradient-to-b from-[#08356A] to-[#0B4A8F] text-white overflow-hidden">
          <div className="absolute inset-0 opacity-10 bg-[radial-gradient(#E8F1F9_1px,transparent_1px)] [background-size:24px_24px]" />

          <div className="relative max-w-7xl mx-auto">
            <span className="font-sans font-semibold text-xs uppercase tracking-[0.25em] text-[#D7262E] bg-white/10 px-3 py-1 rounded-full border border-white/15">
              Join Our Talent Network
            </span>
            <h1 className="font-heading font-bold text-4xl sm:text-5xl tablet:text-6xl text-white mt-4 tracking-tight max-w-3xl">
              Build the Future of Ophthalmic Healthcare with Us
            </h1>
            <p className="font-sans text-lg text-white/80 mt-6 max-w-2xl leading-relaxed">
              At Revora Healthcare, our scientists, quality engineers, and commercial leaders work together to advance medicine beyond the cure. Discover your next career milestone in Ahmedabad.
            </p>

            <div className="flex flex-wrap items-center gap-4 mt-8">
              <a
                href="#openings"
                className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-[#D7262E] hover:bg-[#A01C22] text-white font-semibold text-sm transition-all shadow-lg"
              >
                View 5 Open Positions <ArrowRight size={16} />
              </a>
              <a
                href="#apply"
                className="inline-flex items-center gap-2 px-6 py-3 rounded-full border-2 border-white/80 hover:bg-white hover:text-[#0B4A8F] text-white font-semibold text-sm transition-all"
              >
                Direct Application Form
              </a>
            </div>
          </div>
        </section>

        {/* Culture / Perks Grid */}
        <section id="culture" className="max-w-7xl mx-auto px-6 py-20">
          <div className="text-center max-w-2xl mx-auto mb-14">
            <span className="font-sans font-semibold text-xs uppercase tracking-[0.25em] text-[#0B4A8F]">
              Life at Revora
            </span>
            <h2 className="font-heading font-bold text-3xl tablet:text-4xl text-[#1E2428] mt-2 tracking-tight">
              Why Leaders and Scientists Choose Revora
            </h2>
          </div>

          <div className="grid grid-cols-1 tablet:grid-cols-2 desktop:grid-cols-4 gap-6">
            {PERKS.map((perk) => {
              const Icon = perk.icon;
              return (
                <div
                  key={perk.title}
                  className="bg-white rounded-2xl border border-[#D9DFE8] p-6 hover:shadow-lg hover:border-[#0B4A8F] transition-all"
                >
                  <div className="w-12 h-12 rounded-xl bg-[#E8F1F9] text-[#0B4A8F] flex items-center justify-center mb-4">
                    <Icon size={24} />
                  </div>
                  <h3 className="font-heading font-bold text-lg text-[#1E2428]">
                    {perk.title}
                  </h3>
                  <p className="font-sans text-xs text-[#1E2428]/70 mt-2 leading-relaxed">
                    {perk.desc}
                  </p>
                </div>
              );
            })}
          </div>
        </section>

        {/* Open Positions List */}
        <section id="openings" className="bg-white border-y border-[#D9DFE8] py-20 px-6">
          <div className="max-w-7xl mx-auto">
            <div className="flex flex-col tablet:flex-row tablet:items-end justify-between gap-6 mb-12">
              <div>
                <span className="font-sans font-semibold text-xs uppercase tracking-[0.25em] text-[#D7262E]">
                  Current Opportunities
                </span>
                <h2 className="font-heading font-bold text-3xl tablet:text-4xl text-[#1E2428] mt-2 tracking-tight">
                  Open Career Roles in Ahmedabad &amp; Gujarat
                </h2>
              </div>
              <p className="font-sans text-sm text-[#1E2428]/70 max-w-md">
                Click any role below to pre-select it in the application form and submit your curriculum vitae.
              </p>
            </div>

            <div className="flex flex-col gap-6">
              {OPEN_POSITIONS.map((job) => (
                <div
                  key={job.id}
                  className="bg-[#F8F9FA] rounded-2xl border border-[#D9DFE8] p-8 hover:border-[#0B4A8F] hover:shadow-md transition-all flex flex-col desktop:flex-row desktop:items-center justify-between gap-6"
                >
                  <div className="flex-1">
                    <div className="flex flex-wrap items-center gap-2 mb-2">
                      <span className="px-2.5 py-0.5 rounded-full text-xs font-semibold bg-[#E8F1F9] text-[#0B4A8F]">
                        {job.department}
                      </span>
                      <span className="px-2.5 py-0.5 rounded-full text-xs font-semibold bg-white border border-[#D9DFE8] text-[#1E2428]/70">
                        {job.type}
                      </span>
                    </div>

                    <h3 className="font-heading font-bold text-xl tablet:text-2xl text-[#1E2428] tracking-tight">
                      {job.title}
                    </h3>

                    <div className="flex flex-wrap items-center gap-4 mt-3 text-xs text-[#1E2428]/60">
                      <span className="flex items-center gap-1.5">
                        <MapPin size={14} className="text-[#D7262E]" /> {job.location}
                      </span>
                      <span className="flex items-center gap-1.5">
                        <Briefcase size={14} className="text-[#0B4A8F]" /> {job.experience}
                      </span>
                    </div>

                    <p className="font-sans text-sm text-[#1E2428]/75 mt-3 leading-relaxed max-w-3xl">
                      {job.description}
                    </p>
                  </div>

                  <a
                    href="#apply"
                    onClick={() => setSelectedJob(job.title)}
                    className="shrink-0 px-6 py-3 rounded-full bg-[#0B4A8F] hover:bg-[#08356A] text-white font-semibold text-sm transition-all text-center"
                  >
                    Apply for Role →
                  </a>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Application Form */}
        <section id="apply" className="max-w-4xl mx-auto px-6 py-20">
          <div className="bg-white rounded-3xl border border-[#D9DFE8] p-8 tablet:p-14 shadow-lg">
            <div className="text-center max-w-xl mx-auto mb-10">
              <span className="font-sans font-semibold text-xs uppercase tracking-[0.25em] text-[#D7262E]">
                Direct Talent Submission
              </span>
              <h2 className="font-heading font-bold text-3xl text-[#1E2428] mt-2 tracking-tight">
                Submit Your Application to Revora
              </h2>
              <p className="font-sans text-sm text-[#1E2428]/70 mt-2">
                Our human resources team reviews every submission within 48 business hours.
              </p>
            </div>

            <form onSubmit={handleSubmit} className="flex flex-col gap-6">
              <div>
                <label className="block font-sans text-xs font-semibold text-[#1E2428] uppercase tracking-wider mb-2">
                  Applying For Role:
                </label>
                <select
                  value={selectedJob}
                  onChange={(e) => setSelectedJob(e.target.value)}
                  className="w-full h-12 px-4 rounded-xl border border-[#D9DFE8] bg-[#F8F9FA] text-[#1E2428] font-sans text-sm focus:outline-none focus:border-[#0B4A8F]"
                >
                  {OPEN_POSITIONS.map((job) => (
                    <option key={job.id} value={job.title}>
                      {job.title}
                    </option>
                  ))}
                  <option value="General Clinical Talent Pool">General Clinical / Commercial Talent Pool</option>
                </select>
              </div>

              <div className="grid grid-cols-1 tablet:grid-cols-2 gap-6">
                <div>
                  <label className="block font-sans text-xs font-semibold text-[#1E2428] uppercase tracking-wider mb-2">
                    Full Name *
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Dr. Rajesh Patel"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className="w-full h-12 px-4 rounded-xl border border-[#D9DFE8] bg-[#F8F9FA] text-[#1E2428] font-sans text-sm focus:outline-none focus:border-[#0B4A8F]"
                  />
                </div>

                <div>
                  <label className="block font-sans text-xs font-semibold text-[#1E2428] uppercase tracking-wider mb-2">
                    Email Address *
                  </label>
                  <input
                    type="email"
                    required
                    placeholder="rajesh.patel@example.com"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    className="w-full h-12 px-4 rounded-xl border border-[#D9DFE8] bg-[#F8F9FA] text-[#1E2428] font-sans text-sm focus:outline-none focus:border-[#0B4A8F]"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 tablet:grid-cols-2 gap-6">
                <div>
                  <label className="block font-sans text-xs font-semibold text-[#1E2428] uppercase tracking-wider mb-2">
                    Phone / WhatsApp *
                  </label>
                  <input
                    type="tel"
                    required
                    placeholder="+91 98765 43210"
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    className="w-full h-12 px-4 rounded-xl border border-[#D9DFE8] bg-[#F8F9FA] text-[#1E2428] font-sans text-sm focus:outline-none focus:border-[#0B4A8F]"
                  />
                </div>

                <div>
                  <label className="block font-sans text-xs font-semibold text-[#1E2428] uppercase tracking-wider mb-2">
                    Total Pharma / Clinical Experience
                  </label>
                  <select
                    value={formData.experience}
                    onChange={(e) => setFormData({ ...formData, experience: e.target.value })}
                    className="w-full h-12 px-4 rounded-xl border border-[#D9DFE8] bg-[#F8F9FA] text-[#1E2428] font-sans text-sm focus:outline-none focus:border-[#0B4A8F]"
                  >
                    <option value="1-3 years">1–3 Years</option>
                    <option value="3-5 years">3–5 Years</option>
                    <option value="5-8 years">5–8 Years</option>
                    <option value="8+ years">8+ Years (Senior Lead / Principal)</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block font-sans text-xs font-semibold text-[#1E2428] uppercase tracking-wider mb-2">
                  LinkedIn Profile / Portfolio Link
                </label>
                <input
                  type="url"
                  placeholder="https://linkedin.com/in/yourprofile"
                  value={formData.linkedin}
                  onChange={(e) => setFormData({ ...formData, linkedin: e.target.value })}
                  className="w-full h-12 px-4 rounded-xl border border-[#D9DFE8] bg-[#F8F9FA] text-[#1E2428] font-sans text-sm focus:outline-none focus:border-[#0B4A8F]"
                />
              </div>

              <div>
                <label className="block font-sans text-xs font-semibold text-[#1E2428] uppercase tracking-wider mb-2">
                  Professional Summary &amp; Research Highlights
                </label>
                <textarea
                  rows={4}
                  placeholder="Briefly describe your expertise in ophthalmic formulation, regulatory audits, or clinical operations..."
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  className="w-full p-4 rounded-xl border border-[#D9DFE8] bg-[#F8F9FA] text-[#1E2428] font-sans text-sm focus:outline-none focus:border-[#0B4A8F]"
                />
              </div>

              <button
                type="submit"
                disabled={submitting}
                className="w-full py-4 rounded-xl bg-[#D7262E] hover:bg-[#A01C22] text-white font-semibold text-base transition-all flex items-center justify-center gap-2 shadow-lg disabled:opacity-50"
              >
                {submitting ? (
                  <span>Submitting Application...</span>
                ) : (
                  <>
                    <Send size={18} /> Submit Application
                  </>
                )}
              </button>
            </form>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}

