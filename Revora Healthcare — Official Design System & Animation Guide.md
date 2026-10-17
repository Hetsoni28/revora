Official Brand Identity — Revora Healthcare Pvt. Ltd.

# Design System & Animation Guide

CSS tokens, animation patterns, hover effects, and GSAP code — built from your official brand document. Colors: **Medical Cobalt Blue #0B4A8F** + **Revora Crimson Red #D7262E**

[01 Colors](#colors) [02 Typography](#type) [03 Animations](#anims) [04 Hover Effects](#hover) [05 Navbar](#navbar) [06 Easing](#easing) [07 GSAP Code](#code)

01

Official Color Palette

Extracted from Revora Healthcare Brand Identity Document

Primary Brand Anchor

Medical Cobalt Blue

#0B4A8F

Logotype, main nav, primary buttons, trust elements, section backgrounds

Primary Brand Accent

Revora Crimson Red

#D7262E

V-tick glyph, CTAs, urgent alerts, vital highlights, animated accents

Typography / High-Contrast

Charcoal Slate

#1E242B

Tagline body, section headings, dark footer backgrounds, dark overlays

Support Tint / Chip Fill

Medical Sky Tint

#E8F1F9

Hover states, data pills, selected rows, active nav indicators, code blocks

Environmental Texture

Architectural Warm Beige

#EFECE6

Warm section backgrounds, conference brochures, subtle section alternates

Surface & Canvas

Clinical Pure White

#FFFFFF / #F8F9FA

Card surfaces, modal dialogs, app backgrounds, clean UI ground

tokens.css — Official Revora CSS Variables

/\* ── REVORA HEALTHCARE — OFFICIAL CSS TOKENS ── \*/ :root { /\* Primary colors — from brand document \*/ --revora-cobalt: #0B4A8F; /\* Medical Cobalt Blue · rgb(11,74,143) \*/ --revora-crimson: #D7262E; /\* Revora Crimson Red · rgb(215,38,46) \*/ --revora-slate: #1E242B; /\* Charcoal Slate · rgb(30,36,43) \*/ --revora-sky-tint: #E8F1F9; /\* Medical Sky Tint · rgb(232,241,249) \*/ --revora-neutral: #EFECE6; /\* Warm Beige · rgb(239,236,230) \*/ --revora-white: #FFFFFF; /\* Clinical Pure White \*/ --revora-off-white: #F8F9FA; /\* Canvas / Surface \*/ /\* Typography \*/ --f-headline: 'Plus Jakarta Sans', sans-serif; /\* H1–H4, nav, buttons \*/ --f-body: 'Inter', sans-serif; /\* body, labels, captions \*/ }

02

Typography System

Plus Jakarta Sans (Headline) · Inter (Body) — from brand doc

Hero / Display

Plus Jakarta Sans · 800 · clamp(2.8rem,6vw,5.5rem) · lh 1.02 · ls -0.03em

Healthcare *Beyond* the *Cure*

H2 Section

Plus Jakarta Sans · 700 · clamp(1.8rem,3.5vw,3rem) · lh 1.1 · ls -0.02em

Our Ophthalmic Speciality

H3 Heading

Plus Jakarta Sans · 700 · 1.375rem · lh 1.3

Clinical-Grade Eye Solutions

Body Large

Inter · 400 · 1.0625rem · lh 1.75

Revora Healthcare develops precision-formulated ophthalmic and specialty pharma products, trusted across 12+ countries and millions of patient touchpoints.

Body Regular

Inter · 400 · 1rem · lh 1.7

GMP Certified · ISO 9001:2015 · AAA Accessibility Contrast Compliant

Label / Eyebrow

Inter · 600 · 0.6875rem · ls 0.1em · UPPERCASE

Ophthalmic Formulations

03

Animation Library — 8 Patterns

Live demos using your exact Cobalt + Crimson brand colors

Healthcare Beyond the Cure

revora · Ahmedabad, Gujarat

Word Slide-Up — Hero Entrance

Each word slides from 110% below its own line. Stagger 120ms between words. "Beyond" in Cobalt Blue, "Cure" in Crimson.

translateY(110%→0)stagger 0.12sexpo.out 0.75s

Revora Healthcare

Healthcare – Beyond the Cure

Clip-Path Wipe — Section Titles

Text wiped in from left using clip-path. "Healthcare" appears in Crimson Red accent color on scroll entry.

clip-path inset(0 100%→0)900msScrollTrigger

Stagger Fade-Up — Service Cards

Cards enter from below, 100ms apart. First two in Cobalt gradient, last two in Crimson gradient to show brand duality.

gsap.stagger(0.1)y 28→0opacity 0→1

Ophthalmic Excellence

Clinical Research & Development

Line Draw — Section Dividers

Lines scale from left using scaleX. First line in Cobalt Blue, second in Crimson Red, third a subtle slate — showing brand hierarchy.

scaleX(0→1)transform-origin:left700ms

0

Patients

0

Countries

0

Products

Number Counter — Stats Section

Numbers animate from 0 to target on viewport entry. White on Cobalt Blue background — highest contrast per your brand doc (9.4:1).

CountUp.jsgsap tweenduration 2s

Hover — see parallax

Parallax Background — Hero

Background transitions from Cobalt Dark → Cobalt Blue → Crimson. Moves at 60% scroll speed using GSAP scrub.

scrub: 1.5yPercent: -20ease: none

revora

Image Wipe — About / Team Photos

Crimson cover slides in (left→right) then exits (right→left) revealing the image. Two-step CSS keyframe sequence.

scaleX coverclip-path revealcrimson #D7262E

Healthcare · Beyond the Cure

**2.8M+** Patients· **47** Countries· **850+** Products· **15+** Years· **2.8M+** Patients· **47** Countries· **850+** Products· **15+** Years·

Gradient Shift + Marquee Ticker

Hero BG animates Cobalt→Crimson gradient. Stats marquee loops infinitely. Pure CSS — no JS needed.

background-positionmarquee loopCSS only

04

Hover Effects — 6 Patterns

All interactive — hover each card to see the effect

Cobalt Glow Pulse

Cobalt Slide Fill

Our Products

Crimson Lift + Shadow

Urgent Care

Text Swap (Label→CTA)

Learn More

→ View Details

Outlined → Filled

Schedule Consultation

Crimson Underline Reveal

Download Formulary

hover-effects.css

/\* ── Card Lift (used on all service/product cards) ── \*/ .product-card { border: 1px solid var(--revora-sky-tint); transition: transform 0.4s cubic-bezier(0.16,1,0.3,1), box-shadow 0.4s cubic-bezier(0.16,1,0.3,1), border-color 0.25s ease; } .product-card:hover { transform: translateY(-6px); border-color: var(--revora-cobalt); box-shadow: 0 20px 60px rgba(11,74,143,0.18); } /\* Crimson accent on card top border on hover \*/ .product-card::before { content: ''; position: absolute; top: 0; left: 0; right: 0; height: 2px; background: linear-gradient(90deg, var(--revora-cobalt), var(--revora-crimson)); transform: scaleX(0); transition: transform 0.35s cubic-bezier(0.16,1,0.3,1); } .product-card:hover::before { transform: scaleX(1); }

05

Navbar — Sticky Scroll Transition

revora Healthcare

- [About](#)
- [Products](#)
- [Research](#)
- [Careers](#)

[Contact Us](#) [Urgent Care](#)

navbar.css + navbar.js

/\* ── Sticky navbar: transparent on hero → slate on scroll ── \*/ .navbar { position: fixed; top: 0; z-index: 100; width: 100%; background: transparent; border-bottom: 1px solid transparent; backdrop-filter: blur(0px); transition: all 0.4s cubic-bezier(0.16,1,0.3,1); } .navbar.scrolled { background: rgba(30,36,43,0.94); /\* --revora-slate at 94% \*/ backdrop-filter: blur(20px); border-bottom-color: rgba(255,255,255,0.06); box-shadow: 0 4px 32px rgba(11,74,143,0.25); } /\* Bottom accent line on scroll — Cobalt to Crimson gradient \*/ .navbar.scrolled::after { content: ''; position: absolute; bottom: 0; left: 0; right: 0; height: 2px; background: linear-gradient(90deg, var(--revora-cobalt), var(--revora-crimson)); } /\* ── JS (vanilla) ── \*/ window.addEventListener('scroll', () => { document.querySelector('.navbar').classList .toggle('scrolled', window.scrollY > 60); });

06

Easing Curves — Live Preview

Expo Out

All scroll reveals, card lifts, hero text

cubic-bezier(0.16, 1, 0.3, 1)

Bounce Out

Button press, icon pop, counter ping

cubic-bezier(0.34, 1.56, 0.64, 1)

Ease In-Out

Carousel slide, gradient shift, counters

cubic-bezier(0.45, 0, 0.55, 1)

Linear

Marquee ticker, rotating rings, loader

linear — constant speed

07

GSAP Code — Complete Setup

Copy-paste ready — all animations for Revora Healthcare site

cdn-links.html — All libraries needed

\<!-- Google Fonts --> \<link href="https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@300;400;500;600;700;800&family=Inter:wght@300;400;500;600;700&display=swap" rel="stylesheet"> \<!-- GSAP + ScrollTrigger (animation engine) --> \<script src="https://cdnjs.cloudflare.com/ajax/libs/gsap/3.12.5/gsap.min.js">\</script> \<script src="https://cdnjs.cloudflare.com/ajax/libs/gsap/3.12.5/ScrollTrigger.min.js">\</script> \<!-- Lenis (smooth scroll) --> \<script src="https://cdn.jsdelivr.net/npm/lenis@1.1.18/dist/lenis.min.js">\</script> \<!-- Swiper (testimonial / product carousel) --> \<link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/swiper@11/swiper-bundle.min.css"> \<script src="https://cdn.jsdelivr.net/npm/swiper@11/swiper-bundle.min.js">\</script>

main.js — Full GSAP animation setup for Revora

// ═══════════════════════════════════════ // REVORA HEALTHCARE — GSAP MASTER SETUP // ═══════════════════════════════════════ gsap.registerPlugin(ScrollTrigger); // 1. LENIS SMOOTH SCROLL ────────────────── const lenis = new Lenis({ lerp: 0.08, smooth: true }); function raf(time) { lenis.raf(time); ScrollTrigger.update(); requestAnimationFrame(raf); } requestAnimationFrame(raf); // 2. HERO ENTRANCE (page load) ──────────── const hero = gsap.timeline({ delay: 0.3 }); hero .from('.hero-word', { yPercent: 110, opacity: 0, duration: 0.75, ease: 'expo.out', stagger: 0.12 }) .from('.hero-tagline', { opacity: 0, y: 20, duration: 0.5 }, '-=0.3') .from('.hero-cta-group .btn', { opacity: 0, y: 18, stagger: 0.1, duration: 0.5 }, '-=0.2') .from('.hero-scroll-indicator', { opacity: 0, duration: 0.4 }, '-=0.1'); // 3. PARALLAX HERO BG ───────────────────── gsap.to('.hero-bg', { yPercent: -20, ease: 'none', scrollTrigger: { trigger: '.hero-section', scrub: 1.5 } }); // 4. SCROLL REVEALS ─────────────────────── gsap.utils.toArray('.reveal-section').forEach(el => { gsap.from(el, { opacity: 0, y: 48, duration: 0.9, ease: 'expo.out', scrollTrigger: { trigger: el, start: 'top 80%', toggleActions: 'play none none reverse' } }); }); // 5. STAGGER CARDS ──────────────────────── gsap.from('.service-card', { opacity: 0, y: 40, scale: 0.96, stagger: 0.1, duration: 0.65, ease: 'expo.out', scrollTrigger: { trigger: '.services-grid', start: 'top 75%' } }); // 6. COUNTER ANIMATION ──────────────────── gsap.utils.toArray('.stat-number').forEach(el => { const target = +el.dataset.target; gsap.from({ val: 0 }, { val: target, duration: 2, ease: 'power2.out', onUpdate() { el.textContent = Math.round(this.targets()\[0\].val).toLocaleString('en-IN'); }, scrollTrigger: { trigger: el, start: 'top 85%', once: true } }); }); // 7. CLIP-PATH TITLE REVEAL ─────────────── gsap.from('.clip-heading', { clipPath: 'inset(0 100% 0 0)', duration: 0.9, ease: 'expo.out', scrollTrigger: { trigger: '.clip-heading', start: 'top 80%' } }); // 8. IMAGE WIPE REVEAL ──────────────────── gsap.timeline({ scrollTrigger: { trigger: '.about-img', start: 'top 75%' } }) .to('.img-cover', { scaleX: 1, transformOrigin: 'left', duration: 0.5, ease: 'expo.inOut' }) .set('.about-img img', { visibility: 'visible' }) .to('.img-cover', { scaleX: 0, transformOrigin: 'right', duration: 0.5, ease: 'expo.inOut' });

Live Button States

[Schedule Consultation](#) [Urgent Ophthalmic Care](#) [Download Drug Formulary](#)

revora Healthcare

Design System & Animation Guide · Built from Official Brand Identity Document · Soni