export interface Product {
  id: string;
  name: string;
  genericName: string;
  categorySlug: string;
  badge: string;
  volume: string;
  image: string;
  /** Brand logo (transparent WebP), shown in place of the carton photo. */
  logo: string;
  color: string;
  tagline: string;
  summary: string;
  composition: string[];
  mechanismOfAction: string;
  indications: string[];
  dosage: string;
  storage: string;
  packaging: string;
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
    logo: '/images/logos/moxora-d.webp',
    color: '#0B4A8F',
    tagline: 'Synergistic 4th-Gen Bactericidal & Potent Anti-Inflammatory Therapy',
    summary:
      'MOXORA-D combines the broad-spectrum 4th-generation fluoroquinolone moxifloxacin with dexamethasone sodium phosphate. It is indicated for post-operative ocular inflammation and prophylaxis of microbial infection following cataract, refractive, and corneal surgery.',
    composition: [
      'Moxifloxacin Hydrochloride IP eq. to Moxifloxacin 0.5% w/v',
      'Dexamethasone Sodium Phosphate IP eq. to Dexamethasone Phosphate 0.1% w/v',
      'Sterile Aqueous Vehicle q.s.',
    ],
    mechanismOfAction:
      'Moxifloxacin inhibits topoisomerase II (DNA gyrase) and topoisomerase IV required for bacterial DNA replication. Dexamethasone suppresses vascular permeability, leukocyte infiltration, and inflammatory cytokine cascade.',
    indications: [
      'Prophylaxis & management of post-cataract inflammation and infection',
      'Anterior uveitis complicated by susceptible bacterial infections',
      'Post-trabeculectomy and vitreoretinal surgery care',
    ],
    dosage:
      'Instill 1 drop into the affected eye(s) 3 to 4 times daily, or as strictly directed by the ophthalmologist.',
    storage: 'Store below 25°C in a dry place. Protect from light. Do not freeze.',
    packaging: '5 ml sterile white plastic vial with tamper-evident seal and nozzle cap in carton packaging.',
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
    logo: '/images/logos/moxora-lp.webp',
    color: '#0B4A8F',
    tagline: 'Broad-Spectrum Antimicrobial Coverage with Site-Specific IOP-Spike Safety',
    summary:
      'MOXORA-LP combines moxifloxacin with loteprednol etabonate—a retro-metabolically designed ester corticosteroid. Upon reaching therapeutic targets, loteprednol rapidly deactivates into inactive metabolites, virtually eliminating the risk of clinically significant intraocular pressure (IOP) elevation.',
    composition: [
      'Moxifloxacin Hydrochloride IP eq. to Moxifloxacin 0.5% w/v',
      'Loteprednol Etabonate 0.5% w/v',
      'Preservative-optimized micronized sterile vehicle q.s.',
    ],
    mechanismOfAction:
      'Dual mechanism: Moxifloxacin disrupts bacterial gyrase and topoisomerase IV. Loteprednol binds glucocorticoid receptors locally and is enzymatically cleaved into inactive PJ-91 and PJ-90 metabolites, mitigating trabecular meshwork edema.',
    indications: [
      'Post-operative inflammation in steroid-responder patients',
      'Ocular surgical recovery where IOP preservation is vital',
      'Blepharokeratoconjunctivitis and post-surgical anterior segment edema',
    ],
    dosage:
      'Shake well before use. Instill 1 to 2 drops into the conjunctival sac 4 times daily for up to 14 days.',
    storage: 'Store between 15°C to 25°C. Do not freeze. Keep bottle tightly closed.',
    packaging: '5 ml sterile plastic suspension dropper bottle in protective individual mono carton.',
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
    logo: '/images/logos/moxora.webp',
    color: '#0B4A8F',
    tagline: 'High-Penetration Pure 4th-Generation Fluoroquinolone Monotherapy',
    summary:
      'MOXORA contains pure moxifloxacin 0.5% w/v isotonic solution. Formulated with a physiological pH and preservative-free profile, it provides superior trans-corneal penetration reaching therapeutic concentrations in both the aqueous humor and anterior chamber.',
    composition: [
      'Moxifloxacin Hydrochloride IP eq. to Moxifloxacin 0.5% w/v',
      'Sterile Isotonic Buffered Vehicle q.s.',
    ],
    mechanismOfAction:
      'Dual-binding inhibition of bacterial DNA gyrase and topoisomerase IV prevents the emergence of single-step bacterial mutants, maintaining superior eradication rates against resistant Staphylococcus and Streptococcus isolates.',
    indications: [
      'Acute and sub-acute bacterial conjunctivitis',
      'Bacterial corneal ulcers and microbial keratitis',
      'Pre-operative antisepsis and post-surgical antimicrobial cover',
    ],
    dosage:
      'Instill 1 drop in the affected eye 3 times daily for 7 days, or as directed by an ophthalmologist.',
    storage: 'Store below 30°C. Protect from direct heat and sunlight. Do not freeze.',
    packaging: '5 ml sterile dropper vial with tamper-evident ring in carton packaging.',
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
    logo: '/images/logos/revonac-cs.webp',
    color: '#D7262E',
    tagline: 'Advanced Targeted Prodrug for Post-Cataract Pain & Macular Edema Prevention',
    summary:
      'REVONAC CS is an advanced non-steroidal anti-inflammatory prodrug. It rapidly penetrates the cornea in an uncharged lipophilic prodrug state and is bioactivated by ocular tissue hydrolases directly into amfenac—a potent inhibitor of COX-1 and COX-2 enzymes.',
    composition: [
      'Nepafenac IP 0.1% w/v',
      'Sterile aqueous vehicle with comfort-enhancing polymers q.s.',
    ],
    mechanismOfAction:
      'Nepafenac permeates corneal barriers efficiently. Intraocular esterases convert it into amfenac, which strongly inhibits prostaglandin PGE2 synthesis, reducing surgical miosis, vascular hyperpermeability, and CME risk.',
    indications: [
      'Prevention and treatment of post-operative ocular pain and inflammation',
      'Reduction in risk of post-cataract cystoid macular edema (CME)',
      'Management of post-refractive surgery discomfort',
    ],
    dosage:
      'Instill 1 drop in the operative eye 3 times daily, beginning 1 day prior to cataract surgery and continuing for 14 days post-operatively.',
    storage: 'Store between 2°C and 25°C. Keep bottle in protective blister packaging until first use.',
    packaging: '3 ml sterile vial enclosed in a tamper-proof thermoformed blister tray and outer carton.',
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
    logo: '/images/logos/trehynate.webp',
    color: '#1A62A8',
    tagline: 'Calibrated 0.18% High-Molecular-Weight Sodium Hyaluronate Viscoelastic Shield',
    summary:
      'TREHYNATE provides clinically calibrated 0.18% high-molecular-weight sodium hyaluronate. Its non-Newtonian shear-thinning viscoelasticity ensures extended pre-corneal retention without causing blurry vision upon blinking.',
    composition: [
      'Sodium Hyaluronate BP 0.18% w/v',
      'Isotonic electrolyte-buffered vehicle q.s.',
    ],
    mechanismOfAction:
      'High water-binding capacity (up to 1,000 times its molecular weight). Interacts with corneal epithelial CD44 receptors, accelerating microvilli regeneration, stabilizing the mucin layer, and promoting corneal wound healing.',
    indications: [
      'Severe dry eye syndrome (aqueous deficient and neurotrophic)',
      'Corneal epithelial erosion and persistent epithelial defects (PED)',
      'Post-LASIK and post-PRK corneal surface rehabilitation',
      'Severe dry eye secondary to Sjögren’s syndrome',
    ],
    dosage:
      'Instill 1 drop into the conjunctival sac 3 to 5 times daily, or as needed for ocular surface hydration.',
    storage: 'Store below 25°C in a dry place. Protect from light. Do not freeze.',
    packaging: '10 ml sterile dropper bottle packed in a medical-grade blister tray and protective carton.',
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
    logo: '/images/logos/rehynate.webp',
    color: '#1A62A8',
    tagline: 'Synergistic Dual-Glycol + Sodium Hyaluronate Biomimetic Tear Film Stabilizer',
    summary:
      'REHYNATE delivers a multi-polymer matrix combining bio-adhesive sodium hyaluronate with polyethylene glycol 400 (PEG 400) and propylene glycol. Designed to bind to hydrophobic surface patches, it creates a long-lasting hydrophilic barrier against evaporative tear loss.',
    composition: [
      'Sodium Hyaluronate BP 0.1% w/v',
      'Polyethylene Glycol 400 IP 0.4% w/v',
      'Propylene Glycol IP 0.3% w/v',
      'Preservative-optimized aqueous vehicle q.s.',
    ],
    mechanismOfAction:
      'Polyethylene glycol and propylene glycol bind to exposed hydrophobic patches on the damaged corneal epithelium. Sodium hyaluronate locks in hydration, reducing tear evaporation rates and restoring physiological osmolarity.',
    indications: [
      'Evaporative and mixed-mechanism dry eye disease',
      'Computer vision syndrome and prolonged digital screen strain',
      'Contact lens discomfort and environmental ocular irritation',
    ],
    dosage:
      'Instill 1 to 2 drops into the affected eye(s) as needed throughout the day.',
    storage: 'Store below 30°C. Protect from heat and moisture.',
    packaging: '10 ml sterile dropper vial in sealed protective blister tray with patient instructional carton.',
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
    logo: '/images/logos/revgel.webp',
    color: '#1A62A8',
    tagline: 'Intensive 1.0% High-Viscosity Gel Shield for Severe Dry Eye & Nocturnal Protection',
    summary:
      'RevoGel features an enriched 1.0% concentration of high-purity carboxymethylcellulose sodium. Its high-viscosity hydrogel formulation provides maximum pre-corneal retention time, protecting against nocturnal lagophthalmos and persistent dry eye exposure.',
    composition: [
      'Carboxymethylcellulose Sodium IP 1.0% w/v',
      'Sterile buffered isotonic vehicle with stabilized oxychloro complex q.s.',
    ],
    mechanismOfAction:
      'Forms a protective viscoelastic polymer shield across the corneal and conjunctival epithelial surface, providing durable lubrication, reducing shear forces, and shielding bare nerve endings from friction.',
    indications: [
      'Moderate to severe persistent dry eye disease',
      'Nocturnal lagophthalmos and recurrent corneal erosions',
      'Prolonged environmental exposure (arid climates, AC, wind)',
      'Post-surgical ocular surface recovery requiring thick cushioning',
    ],
    dosage:
      'Instill 1 drop into the affected eye(s) 2 to 3 times daily, especially at bedtime for overnight ocular protection.',
    storage: 'Store below 25°C. Keep bottle tightly closed when not in use.',
    packaging: '10 ml sterile turquoise bottle with calibrated nozzle in individual unit carton.',
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
    logo: '/images/logos/revfresh.webp',
    color: '#1A62A8',
    tagline: 'Instant Soothing Hydration for Everyday Dry Eye & Digital Fatigue',
    summary:
      'RevoFresh provides isotonic 0.5% carboxymethylcellulose sodium designed for immediate, clear, non-blurring ocular surface refreshment. Perfect for everyday relief from computer vision strain, reading fatigue, and burning sensations.',
    composition: [
      'Carboxymethylcellulose Sodium IP 0.5% w/v',
      'Isotonic electrolyte-buffered vehicle q.s.',
    ],
    mechanismOfAction:
      'Replenishes tear volume, stabilizes the pre-corneal tear film, and reduces friction during eyelid blinking without altering refractive index or impairing visual acuity.',
    indications: [
      'Mild to moderate dry eye symptoms (burning, stinging, grittiness)',
      'Digital eye strain / computer vision syndrome',
      'Contact lens rewetting and soothing',
      'Environmental dryness from air travel, air-conditioning, and smoke',
    ],
    dosage:
      'Instill 1 or 2 drops in the affected eye(s) as needed throughout the day.',
    storage: 'Store at room temperature below 30°C. Protect from direct sunlight.',
    packaging: '10 ml sterile emerald green bottle with ergonomic dropper tip and sealed carton.',
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
    logo: '/images/logos/revopt-tablets.webp',
    color: '#1E242B',
    tagline: 'Comprehensive AREDS-2 Aligned Macular Carotenoid & Neurovascular Complex',
    summary:
      'REVOPT Tablets deliver an advanced multi-modal nutraceutical formula combining Lutein, Zeaxanthin, Astaxanthin, Omega-3 DHA, Resveratrol, Curcumin, Bilberry, Pine Bark, and Ginkgo Biloba with essential vitamins and trace minerals for retinal photoreceptor integrity.',
    composition: [
      'Lutein 10 mg & Zeaxanthin 2 mg (Macular Carotenoid Complex)',
      'Astaxanthin 2 mg & Omega-3 DHA 100 mg',
      'Resveratrol, Curcumin Extract, Bilberry Extract & Pine Bark Extract',
      'Ginkgo Biloba Extract, Ginseng Extract & Grape Seed Extract',
      'Essential Amino Acids, Vitamins (A, C, E, B-Complex) & Minerals (Zinc, Selenium, Copper)',
    ],
    mechanismOfAction:
      'Increases Macular Pigment Optical Density (MPOD), filtering phototoxic short-wavelength blue light. Quenches reactive oxygen species (ROS) in photoreceptors, improves ocular microcirculation, and protects retinal ganglion cells from neurodegenerative damage.',
    indications: [
      'Age-Related Macular Degeneration (AMD) prophylaxis and progression delay',
      'Diabetic retinopathy and retinal vascular permeability support',
      'High-myopia chorioretinal degeneration protection',
      'Prolonged high-energy visible (HEV) blue light screen exposure',
    ],
    dosage:
      '1 tablet daily after meals with water, or as recommended by an ophthalmologist/physician.',
    storage: 'Store in a cool, dry place away from heat and direct sunlight.',
    packaging: '1 x 10 tablets in premium moisture-barrier Alu-Alu blister strip with inner patient insert.',
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
