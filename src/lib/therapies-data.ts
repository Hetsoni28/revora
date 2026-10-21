export interface Product {
  id: string;
  name: string;
  genericName: string;
  categorySlug: string;
  badge: string;
  volume: string;
  image: string;
  /** Official brand logo (transparent WebP). */
  logo: string;
  color: string;
  summary: string;
  composition: string[];
  indications: string[];
  dosage: string;
  storage: string;
  schedule: string;
}

export interface TherapyCategory {
  slug: string;
  title: string;
  shortName: string;
  subtitle: string;
  description: string;
  clinicalRationale: string;
  badge: string;
  color: string;
  subTherapies: string[];
  productIds: string[];
}

export const THERAPY_CATEGORIES: TherapyCategory[] = [
  {
    slug: 'anti-infectives',
    title: 'Anti-Infective & Anti-Inflammatory Therapeutics',
    shortName: 'Anti-Infectives',
    subtitle: 'Advanced 4th-Gen Fluoroquinolones & Synergistic Corticosteroids',
    description:
      'Revora’s anti-infective portfolio features state-of-the-art moxifloxacin formulations engineered for rapid bactericidal action, high trans-corneal penetration, and optimal patient compliance in both surgical prophylaxis and clinical management of microbial keratitis.',
    clinicalRationale:
      'Post-operative ocular infections and severe bacterial keratitis require potent, broad-spectrum antimicrobial eradication combined with controlled steroid inflammation suppression that avoids compromising corneal epithelial integrity or triggering intraocular pressure (IOP) spikes.',
    badge: 'Infection & Inflammation',
    color: '#0B4A8F',
    subTherapies: [
      'Moxifloxacin & Dexamethasone (MOXORA-D)',
      'Moxifloxacin & Loteprednol Etabonate (MOXORA-LP)',
      'Moxifloxacin 0.5% Monotherapy (MOXORA)',
    ],
    productIds: ['moxora-d', 'moxora-lp', 'moxora'],
  },
  {
    slug: 'dry-eye-lubricants',
    title: 'Ocular Surface Disease & Tear Substitutes',
    shortName: 'Dry Eye & Lubricants',
    subtitle: 'Multi-Polymer Viscoelastics & Preservative-Free Formulations',
    description:
      'A comprehensive spectrum of tear supplements spanning bio-adhesive carboxymethylcellulose, multi-polymer PEG combinations, and high-molecular-weight sodium hyaluronate engineered to replenish the mucin-aqueous-lipid tear film interface.',
    clinicalRationale:
      'Evaporative and aqueous-deficient dry eye disease disrupts tear film homeostasis, causing chronic hyperosmolarity, inflammation, and corneal epithelial breakdown. Revora tear substitutes provide sustained residence time, reduce friction, and stimulate physiological re-epithelialization.',
    badge: 'Ocular Surface Protection',
    color: '#1A62A8',
    subTherapies: [
      'Sodium Hyaluronate 0.18% (TREHYNATE)',
      'Multi-Polymer PEG & PG + HA (REHYNATE)',
      'Carboxymethylcellulose 1.0% Gel (RevoGel)',
      'Carboxymethylcellulose 0.5% Drops (RevoFresh)',
    ],
    productIds: ['trehynate', 'rehynate', 'revgel', 'revfresh'],
  },
  {
    slug: 'nsaids-surgical',
    title: 'Ophthalmic NSAIDs & Cataract Recovery',
    shortName: 'Ophthalmic NSAIDs',
    subtitle: 'Targeted Prodrugs & Intraoperative Corneal Endothelial Protection',
    description:
      'Targeted non-steroidal anti-inflammatory agents designed for rapid anterior-to-posterior segment bioavailability, minimizing post-surgical pain, photophobia, and the incidence of post-operative cystoid macular edema (CME).',
    clinicalRationale:
      'Targeted prodrug formulations like nepafenac undergo intraocular bioactivation into amfenac via ocular tissue hydrolases, providing profound prostaglandin inhibition directly at the iris, ciliary body, and retina with minimal corneal surface toxicity.',
    badge: 'Post-Surgical Care',
    color: '#D7262E',
    subTherapies: [
      'Nepafenac Ophthalmic Solution (REVONAC CS)',
    ],
    productIds: ['revonac-cs'],
  },
  {
    slug: 'retinal-nutrition',
    title: 'Retinal Vitality & Ocular Neuroprotection',
    shortName: 'Retinal Nutrition',
    subtitle: 'Advanced Macular Carotenoids & Neurovascular Antioxidant Therapy',
    description:
      'Evidence-based clinical nutraceuticals formulated with optimal ratios of lutein, zeaxanthin, astaxanthin, omega-DHA, resveratrol, and botanical bioflavonoids to support macular pigment optical density and photoreceptor longevity.',
    clinicalRationale:
      'High metabolic demand and continuous blue-light photon exposure make the retina uniquely susceptible to cumulative oxidative stress. Revora ocular antioxidants cross the blood-retinal barrier to neutralize free radicals and sustain microvascular health.',
    badge: 'Macular & Retinal Health',
    color: '#1E242B',
    subTherapies: [
      'Retinal Antioxidant & Macular Complex (REVOPT Tablets)',
    ],
    productIds: ['revopt-tablets'],
  },
];

export const ALL_PRODUCTS: Product[] = [
  {
    id: 'moxora-d',
    name: 'MOXORA-D',
    genericName: 'Moxifloxacin & Dexamethasone Phosphate Eye Drops',
    categorySlug: 'anti-infectives',
    badge: 'Antibacterial + Steroid',
    volume: '5 ml Sterile Dropper Vial',
    image: '/images/products/moxora-d.jpg',
    logo: '/images/brand-logos/moxora-d.webp',
    color: '#0B4A8F',
    summary: 'Moxifloxacin with dexamethasone — for inflammation and infection after eye surgery.',
    composition: [
      'Moxifloxacin Hydrochloride IP eq. to Moxifloxacin 0.5% w/v',
      'Dexamethasone Sodium Phosphate IP eq. to Dexamethasone Phosphate 0.1% w/v',
      'Sterile Aqueous Vehicle q.s.',
    ],
    indications: [
      'Prophylaxis & management of post-cataract inflammation and infection',
      'Anterior uveitis complicated by susceptible bacterial infections',
      'Post-trabeculectomy and vitreoretinal surgery care',
    ],
    dosage:
      'Instill 1 drop into the affected eye(s) 3 to 4 times daily, or as strictly directed by the ophthalmologist.',
    storage: 'Store below 25°C in a dry place. Protect from light. Do not freeze.',
    schedule: 'Schedule H Prescription Drug — Warning: To be sold by retail on the prescription of an RMP only.',
  },
  {
    id: 'moxora-lp',
    name: 'MOXORA-LP',
    genericName: 'Moxifloxacin & Loteprednol Etabonate Ophthalmic Suspension',
    categorySlug: 'anti-infectives',
    badge: 'Soft Steroid Complex',
    volume: '5 ml Sterile Suspension',
    image: '/images/products/moxora-lp.jpg',
    logo: '/images/brand-logos/moxora-lp.webp',
    color: '#0B4A8F',
    summary: 'Moxifloxacin with loteprednol, a soft steroid — post-surgery care with a low risk of eye-pressure rise.',
    composition: [
      'Moxifloxacin Hydrochloride IP eq. to Moxifloxacin 0.5% w/v',
      'Loteprednol Etabonate 0.5% w/v',
      'Preservative-optimized micronized sterile vehicle q.s.',
    ],
    indications: [
      'Post-operative inflammation in steroid-responder patients',
      'Ocular surgical recovery where IOP preservation is vital',
      'Blepharokeratoconjunctivitis and post-surgical anterior segment edema',
    ],
    dosage:
      'Shake well before use. Instill 1 to 2 drops into the conjunctival sac 4 times daily for up to 14 days.',
    storage: 'Store between 15°C to 25°C. Do not freeze. Keep bottle tightly closed.',
    schedule: 'Schedule H Prescription Drug — Warning: For ophthalmic use only.',
  },
  {
    id: 'moxora',
    name: 'MOXORA',
    genericName: 'Moxifloxacin Eye Drops IP 0.5% w/v',
    categorySlug: 'anti-infectives',
    badge: '4th-Gen Fluoroquinolone',
    volume: '5 ml Sterile Dropper Vial',
    image: '/images/products/moxora.jpg',
    logo: '/images/brand-logos/moxora.webp',
    color: '#0B4A8F',
    summary: 'Moxifloxacin 0.5% eye drops for bacterial eye infections.',
    composition: [
      'Moxifloxacin Hydrochloride IP eq. to Moxifloxacin 0.5% w/v',
      'Sterile Isotonic Buffered Vehicle q.s.',
    ],
    indications: [
      'Acute and sub-acute bacterial conjunctivitis',
      'Bacterial corneal ulcers and microbial keratitis',
      'Pre-operative antisepsis and post-surgical antimicrobial cover',
    ],
    dosage:
      'Instill 1 drop in the affected eye 3 times daily for 7 days, or as directed by an ophthalmologist.',
    storage: 'Store below 30°C. Protect from direct heat and sunlight. Do not freeze.',
    schedule: 'Schedule H Prescription Drug — Warning: Not for injection. For topical ophthalmic use only.',
  },
  {
    id: 'revonac-cs',
    name: 'REVONAC CS',
    genericName: 'Nepafenac Ophthalmic Solution 0.1% w/v',
    categorySlug: 'nsaids-surgical',
    badge: 'Targeted NSAID Prodrug',
    volume: '3 ml Sterile (Blister Packed)',
    image: '/images/products/revonac-cs.jpg',
    logo: '/images/brand-logos/revonac-cs.webp',
    color: '#D7262E',
    summary: 'Nepafenac eye drops for pain and inflammation after cataract surgery.',
    composition: [
      'Nepafenac IP 0.1% w/v',
      'Sterile aqueous vehicle with comfort-enhancing polymers q.s.',
    ],
    indications: [
      'Prevention and treatment of post-operative ocular pain and inflammation',
      'Reduction in risk of post-cataract cystoid macular edema (CME)',
      'Management of post-refractive surgery discomfort',
    ],
    dosage:
      'Instill 1 drop in the operative eye 3 times daily, beginning 1 day prior to cataract surgery and continuing for 14 days post-operatively.',
    storage: 'Store between 2°C and 25°C. Keep bottle in protective blister packaging until first use.',
    schedule: 'Schedule H Prescription Drug — Warning: For topical ophthalmic use only.',
  },
  {
    id: 'trehynate',
    name: 'TREHYNATE',
    genericName: 'Sodium Hyaluronate Eye Drops 0.18% w/v',
    categorySlug: 'dry-eye-lubricants',
    badge: 'High-Concentration Viscoelastic',
    volume: '10 ml Sterile (Blister Packed)',
    image: '/images/products/trehynate.jpg',
    logo: '/images/brand-logos/trehynate.webp',
    color: '#1A62A8',
    summary: 'Sodium hyaluronate 0.18% lubricating drops for long-lasting dry-eye relief.',
    composition: [
      'Sodium Hyaluronate BP 0.18% w/v',
      'Isotonic electrolyte-buffered vehicle q.s.',
    ],
    indications: [
      'Severe dry eye syndrome (aqueous deficient and neurotrophic)',
      'Corneal epithelial erosion and persistent epithelial defects (PED)',
      'Post-LASIK and post-PRK corneal surface rehabilitation',
    ],
    dosage:
      'Instill 1 drop into the conjunctival sac 3 to 5 times daily, or as needed for ocular surface hydration.',
    storage: 'Store below 25°C in a dry place. Protect from light. Do not freeze.',
    schedule: 'Ophthalmic Lubricant Formulation — Safe for long-term clinical maintenance.',
  },
  {
    id: 'rehynate',
    name: 'REHYNATE',
    genericName: 'Sodium Hyaluronate, PEG 400 & Propylene Glycol Lubricant',
    categorySlug: 'dry-eye-lubricants',
    badge: 'Triple-Action Multi-Polymer',
    volume: '10 ml Sterile (Blister Packed)',
    image: '/images/products/rehynate.jpg',
    logo: '/images/brand-logos/rehynate.webp',
    color: '#1A62A8',
    summary: 'Sodium hyaluronate with PEG 400 and propylene glycol — lubricating drops that slow tear evaporation.',
    composition: [
      'Sodium Hyaluronate BP 0.1% w/v',
      'Polyethylene Glycol 400 IP 0.4% w/v',
      'Propylene Glycol IP 0.3% w/v',
      'Preservative-optimized aqueous vehicle q.s.',
    ],
    indications: [
      'Evaporative and mixed-mechanism dry eye disease',
      'Computer vision syndrome and prolonged digital screen strain',
      'Contact lens discomfort and environmental ocular irritation',
    ],
    dosage:
      'Instill 1 to 2 drops into the affected eye(s) as needed throughout the day.',
    storage: 'Store below 30°C. Protect from heat and moisture.',
    schedule: 'Ophthalmic Tear Substitute — Medical Device Grade Formulation.',
  },
  {
    id: 'revgel',
    name: 'RevoGel',
    genericName: 'Carboxymethylcellulose Sodium Eye Drops IP 1% w/v',
    categorySlug: 'dry-eye-lubricants',
    badge: 'High-Viscosity Intensive Gel',
    volume: '10 ml Sterile Dropper Vial',
    image: '/images/products/revgel.jpg',
    logo: '/images/brand-logos/revgel.webp',
    color: '#1A62A8',
    summary: 'Carboxymethylcellulose 1.0% gel for moderate to severe dry eye and overnight protection.',
    composition: [
      'Carboxymethylcellulose Sodium IP 1.0% w/v',
      'Sterile buffered isotonic vehicle with stabilized oxychloro complex q.s.',
    ],
    indications: [
      'Moderate to severe persistent dry eye disease',
      'Nocturnal lagophthalmos and recurrent corneal erosions',
      'Prolonged environmental exposure (arid climates, AC, wind)',
    ],
    dosage:
      'Instill 1 drop into the affected eye(s) 2 to 3 times daily, especially at bedtime for overnight ocular protection.',
    storage: 'Store below 25°C. Keep bottle tightly closed when not in use.',
    schedule: 'Topical Ophthalmic Gel Formulation.',
  },
  {
    id: 'revfresh',
    name: 'RevoFresh',
    genericName: 'Carboxymethylcellulose Sodium Eye Drops IP 0.5% w/v',
    categorySlug: 'dry-eye-lubricants',
    badge: 'Refreshing Tear Film Protectant',
    volume: '10 ml Sterile Dropper Vial',
    image: '/images/products/revfresh.jpg',
    logo: '/images/brand-logos/revfresh.webp',
    color: '#1A62A8',
    summary: 'Carboxymethylcellulose 0.5% drops for everyday dry eye and screen strain.',
    composition: [
      'Carboxymethylcellulose Sodium IP 0.5% w/v',
      'Isotonic electrolyte-buffered vehicle q.s.',
    ],
    indications: [
      'Mild to moderate dry eye symptoms (burning, stinging, grittiness)',
      'Digital eye strain / computer vision syndrome',
      'Contact lens rewetting and soothing',
    ],
    dosage:
      'Instill 1 or 2 drops in the affected eye(s) as needed throughout the day.',
    storage: 'Store at room temperature below 30°C. Protect from direct sunlight.',
    schedule: 'Ophthalmic Comfort Solution.',
  },
  {
    id: 'revopt-tablets',
    name: 'REVOPT Tablets',
    genericName: 'Advanced Retinal Antioxidant & Macular Nutrients',
    categorySlug: 'retinal-nutrition',
    badge: 'Retinal Neuroprotection',
    volume: '1 x 10 Tablets (Alu-Alu Blister Box)',
    image: '/images/products/revopt-tablets.jpg',
    logo: '/images/brand-logos/revopt-tablets.webp',
    color: '#1E242B',
    summary: 'Lutein, zeaxanthin, astaxanthin and omega-3 DHA tablets for retinal and macular health.',
    composition: [
      'Lutein 10 mg & Zeaxanthin 2 mg (Macular Carotenoid Complex)',
      'Astaxanthin 2 mg & Omega-3 DHA 100 mg',
      'Resveratrol, Curcumin Extract, Bilberry Extract & Pine Bark Extract',
      'Ginkgo Biloba Extract, Ginseng Extract & Grape Seed Extract',
      'Essential Amino Acids, Vitamins (A, C, E, B-Complex) & Minerals (Zinc, Selenium, Copper)',
    ],
    indications: [
      'Age-Related Macular Degeneration (AMD) prophylaxis and progression delay',
      'Diabetic retinopathy and retinal vascular permeability support',
      'High-myopia chorioretinal degeneration protection',
    ],
    dosage:
      '1 tablet daily after meals with water, or as recommended by an ophthalmologist/physician.',
    storage: 'Store in a cool, dry place away from heat and direct sunlight.',
    schedule: '100% Vegetarian Certified (Green Dot) Nutritional Supplement.',
  },
];

export function getCategoryBySlug(slug: string): TherapyCategory | undefined {
  return THERAPY_CATEGORIES.find((cat) => cat.slug === slug);
}

export function getProductsByCategory(categorySlug: string): Product[] {
  return ALL_PRODUCTS.filter((prod) => prod.categorySlug === categorySlug);
}

export function getProductById(id: string): Product | undefined {
  return ALL_PRODUCTS.find((prod) => prod.id === id);
}
