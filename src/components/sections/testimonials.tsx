'use client';

import { useRef } from 'react';
import { motion } from 'framer-motion';
import { expoOut } from '@/lib/easings';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, Pagination, Navigation } from 'swiper/modules';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';

const TESTIMONIALS = [
  {
    quote:
      'Revora OcuShield™ has transformed post-cataract care in our unit. The preservative-free vials and superior viscosity profile have significantly reduced patient discomfort, and we have seen a marked improvement in corneal epithelial recovery times.',
    author: 'Dr. Priya Mehta',
    role: 'Consultant Ophthalmologist',
    org: 'L.V. Prasad Eye Institute, Hyderabad',
    initials: 'PM',
    accentColor: '#0B4A8F',
  },
  {
    quote:
      "The quality of Revora's surgical consumables is exceptional. ClinSurg™ BSS consistently performs at or above the endothelial protection standards we require for complex vitreoretinal procedures. Their regulatory support for international markets is world-class.",
    author: 'Dr. James Okonkwo',
    role: 'Head of Ophthalmology',
    org: 'Korle Bu Teaching Hospital, Ghana',
    initials: 'JO',
    accentColor: '#D7262E',
  },
  {
    quote:
      "ClearVis™ has become our first-line recommendation for patients with severe aqueous-deficient dry eye. The COMOD® delivery system is a game-changer for multi-dose preservative-free therapy. Revora's medical affairs team is always responsive and scientifically informed.",
    author: 'Dr. Ayesha Rahman',
    role: 'Clinical Director',
    org: 'Moorfields Eye Hospital, Dubai',
    initials: 'AR',
    accentColor: '#0B4A8F',
  },
  {
    quote:
      "Our Phase III trial support through Revora's clinical research division has been seamless. Their in-house bioanalytical labs, regulatory expertise, and commitment to ICH GCP standards gave us confidence throughout the study. I would strongly recommend them as a CRO partner.",
    author: 'Prof. Sanjay Gupta',
    role: 'Principal Investigator',
    org: 'All India Institute of Medical Sciences, New Delhi',
    initials: 'SG',
    accentColor: '#D7262E',
  },
];

export function Testimonials() {
  const prevRef = useRef<HTMLButtonElement>(null);
  const nextRef = useRef<HTMLButtonElement>(null);

  return (
    <section id="testimonials" className="py-24 tablet:py-32 bg-[#F8F9FA] overflow-hidden">
      <div className="max-w-7xl mx-auto px-6">

        {/* Header */}
        <div className="flex flex-col tablet:flex-row tablet:items-end justify-between gap-6 mb-12">
          <div>
            <motion.span
              className="font-sans font-semibold text-xs uppercase tracking-[0.28em] text-[#D7262E]"
              initial={{ opacity: 0, y: 8 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, ease: expoOut }}
            >
              Trusted by Clinicians Worldwide
            </motion.span>
            <motion.h2
              className="font-heading font-bold text-4xl tablet:text-5xl text-[#1E2428] mt-2 tracking-tight"
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, ease: expoOut, delay: 0.1 }}
            >
              What Clinicians Say
            </motion.h2>
          </div>

          {/* Nav arrows */}
          <div className="flex gap-3">
            <button
              ref={prevRef}
              className="w-11 h-11 rounded-full border-2 border-[#0B4A8F] flex items-center justify-center text-[#0B4A8F] hover:bg-[#0B4A8F] hover:text-white transition-colors duration-200"
              aria-label="Previous testimonial"
            >
              <ChevronLeft size={18} />
            </button>
            <button
              ref={nextRef}
              className="w-11 h-11 rounded-full bg-[#0B4A8F] flex items-center justify-center text-white hover:bg-[#08356A] transition-colors duration-200"
              aria-label="Next testimonial"
            >
              <ChevronRight size={18} />
            </button>
          </div>
        </div>

        {/* Swiper (existing animation logic preserved) */}
        <Swiper
          modules={[Autoplay, Pagination, Navigation]}
          autoplay={{ delay: 5000, disableOnInteraction: false, pauseOnMouseEnter: true }}
          loop
          pagination={{ clickable: true, el: '.revora-swiper-pagination' }}
          navigation={{ prevEl: prevRef.current, nextEl: nextRef.current }}
          onSwiper={(swiper) => {
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            (swiper.params.navigation as any).prevEl = prevRef.current;
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            (swiper.params.navigation as any).nextEl = nextRef.current;
            swiper.navigation.init();
            swiper.navigation.update();
          }}
          spaceBetween={20}
          breakpoints={{
            0:    { slidesPerView: 1 },
            768:  { slidesPerView: 1.15 },
            1024: { slidesPerView: 2 },
          }}
          className="!pb-14"
        >
          {TESTIMONIALS.map((t) => (
            <SwiperSlide key={t.author} className="h-auto">
              <TestimonialCard testimonial={t} />
            </SwiperSlide>
          ))}
        </Swiper>

        {/* Custom pagination */}
        <div className="revora-swiper-pagination flex justify-center gap-2 mt-2" />
      </div>

      <style jsx global>{`
        .revora-swiper-pagination .swiper-pagination-bullet {
          width: 8px; height: 8px;
          background: #0B4A8F; opacity: 0.25;
          border-radius: 999px;
          transition: all 0.3s ease;
        }
        .revora-swiper-pagination .swiper-pagination-bullet-active {
          opacity: 1; width: 28px;
        }
      `}</style>
    </section>
  );
}

function TestimonialCard({ testimonial }: { testimonial: (typeof TESTIMONIALS)[number] }) {
  return (
    <div className="relative flex flex-col justify-between h-full bg-white rounded-2xl p-8 overflow-hidden"
      style={{ boxShadow: '0 2px 24px rgba(11,74,143,0.07)', border: '1px solid #F0F4F8' }}
    >
      {/* Large faded background quote mark */}
      <div
        className="absolute -top-2 -left-1 font-heading font-bold text-[9rem] leading-none select-none pointer-events-none"
        style={{ color: 'rgba(11,74,143,0.04)', lineHeight: 1 }}
        aria-hidden="true"
      >
        &ldquo;
      </div>

      {/* Top accent */}
      <div className="absolute top-0 left-0 right-0 h-[3px] rounded-t-2xl"
        style={{ background: `linear-gradient(90deg, ${testimonial.accentColor}, transparent)` }}
      />

      {/* Quote text */}
      <p className="relative font-sans text-[#1E2428]/75 text-[0.9375rem] leading-[1.75] flex-1 z-10">
        &ldquo;{testimonial.quote}&rdquo;
      </p>

      {/* Author */}
      <div className="flex items-center gap-4 mt-8 pt-6 border-t border-[#F0F4F8] z-10">
        <div
          className="w-11 h-11 rounded-full flex items-center justify-center flex-shrink-0 font-heading font-bold text-sm text-white"
          style={{
            background: `linear-gradient(135deg, ${testimonial.accentColor}, #1A62A8)`,
          }}
        >
          {testimonial.initials}
        </div>
        <div>
          <p className="font-heading font-semibold text-[#1E2428] text-sm">{testimonial.author}</p>
          <p className="font-sans text-xs text-[#1E2428]/50 mt-0.5">{testimonial.role}</p>
          <p className="font-sans text-xs mt-0.5 font-medium" style={{ color: testimonial.accentColor }}>
            {testimonial.org}
          </p>
        </div>
      </div>
    </div>
  );
}
