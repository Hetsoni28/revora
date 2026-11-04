/**
 * Approved formulations at our manufacturing facility, from the Feb 2026 lists (eye, ear & nasal
 * preparations; tablets & capsules). One line per formulation. A variant in brackets at the end of a
 * line, e.g. "(BKC FREE)", is shown as a tag; see `splitVariant`.
 */

const lines = (s: string) =>
  s
    .trim()
    .split('\n')
    .map((l) => l.trim())
    .filter(Boolean);

const EYE_EAR_DROPS = lines(`
Acetyl Cysteine 5% Eye Drops
Alcaftadine 0.25% Ophthalmic Solution
Alcaftadine 0.25% Ophthalmic Solution (Solution preserved with ionic buffered system)
Alcaftadine 0.25% & Ketorolac Tromethamine 0.4% Eye Drops (BKC FREE)
Atropine 0.025% Ophthalmic Solution (Solution preserved with ionic buffered system)
Atropine Sulphate 0.01% Ophthalmic Solution (BKC FREE)
Atropine Sulphate 0.01% Ophthalmic Solution (Solution preserved with ionic buffered system)
Atropine Sulphate 1% Ophthalmic Solution (BKC FREE)
Atropine Sulfate 1% Ophthalmic Solution USP
Atropine Sulfate 1% Ophthalmic Solution USP (BKC FREE)
Atropine Sulfate 1% Ophthalmic Solution IP (Chlorbutol)
Azelastine Hydrochloride 0.05% Ophthalmic Solution
Azithromycin 1% Ophthalmic Solution
Bepotastine Besilate 1.5% Ophthalmic Solution
Bepotastine Besilate 1.5% Ophthalmic Solution (BKC FREE)
Besifloxacin 0.6% Ophthalmic Suspension
Betamethasone 0.1% Eye Drops
Betamethasone Sodium Phosphate 0.1%, Neomycin Sulphate 0.5% & HPMC 0.25% Eye/Ear Drops
Betaxolol 0.56% Eye Drops
Betaxolol 0.5% Eye Drops
Bimatoprost 0.01% Ophthalmic Solution
Bimatoprost 0.03% Ophthalmic Solution (BKC FREE)
Bimatoprost 0.03% & Timolol 0.5% Eye Drops (BKC FREE)
Brimonidine Tartrate 0.1% Eye Drops (BKC FREE)
Brimonidine Tartrate 0.15% Eye Drops (BKC FREE)
Brimonidine Tartrate 0.15% Eye Drops (With BKC)
Brimonidine Tartrate 0.2% Eye Drops
Brimonidine Tartrate 0.2% Eye Drops (BKC FREE)
Brimonidine Tartrate 0.15% & Timolol Maleate 0.5% Ophthalmic Solution
Brimonidine Tartrate 0.15% & Timolol Maleate 0.5% Ophthalmic Solution (BKC FREE)
Brimonidine Tartrate 0.2% & Timolol Maleate 0.5% Ophthalmic Solution (BKC FREE)
Brimonidine Tartrate 0.2% & Timolol Maleate 0.5% Ophthalmic Solution
Brimonidine Tartrate 0.2% & Timolol Maleate 0.5% Ophthalmic Solution (Solution preserved with ionic buffered system)
Brinzolamide 1% Ophthalmic Suspension (BKC FREE)
Brinzolamide 1% & Brimonidine Tartrate 0.2% Ophthalmic Suspension (BKC FREE)
Brinzolamide 1% & Brimonidine Tartrate 0.2% Ophthalmic Suspension (Preservative Free)
Brinzolamide 1% & Brimonidine Tartrate 0.2% Ophthalmic Suspension (Suspension preserved with ionic buffered system)
Brinzolamide 1% & Timolol Maleate 0.5% Ophthalmic Suspension (BKC FREE)
Bromfenac Sodium 0.09% Eye Drops
Bromfenac Sodium 0.09% Eye Drops (BKC FREE)
Bromfenac Sodium 0.09% Ophthalmic Solution (Solution preserved with ionic buffered system)
Carboxymethylcellulose Sodium 0.5% Eye Drops
Carboxymethylcellulose Sodium 0.5% with Linseed Oil (Omega-3) Eye Drops (Solution preserved with ionic buffered system)
Carboxymethylcellulose Sodium 1% Eye Drops
Carboxymethylcellulose Sodium 1% with Linseed Oil (Omega-3) Eye Drops (Solution preserved with ionic buffered system)
Carboxymethylcellulose Sodium 0.3%, N-Acetyl Carnosine 1%, Glycerin 1% & Boric Acid 0.1% Ophthalmic Solution
Sodium Carboxymethylcellulose 0.3%, N-Acetyl Carnosine 1%, Glycerin 1% & Boric Acid 0.3% Ophthalmic Solution (BKC FREE)
Carboxymethylcellulose Sodium 0.5% & Glycerin 0.5% Eye Drops (BKC FREE)
Carboxymethylcellulose Sodium 1% & Glycerin 0.5% Eye Drops (BKC FREE)
Chloramphenicol 0.5% & Hydroxypropylmethylcellulose 0.25% Eye Drops
Chloramphenicol 0.5% Eye Drops
Chloramphenicol 1% Eye Drops
Chloramphenicol 1%, Dexamethasone 0.01% & HPMC 0.25% Ophthalmic Solution
Chloroquine Phosphate 0.03% Eye Drops
Ciprofloxacin 0.3% Eye/Ear Drops
Ciprofloxacin 0.3% & Dexamethasone 0.05% Eye/Ear Drops
Ciprofloxacin 0.3% & Dexamethasone 0.1% Eye/Ear Drops
Cyclopentolate Hydrochloride 1% Eye Drops
Cyclopentolate Hydrochloride 1% Ophthalmic Solution (with Chlorbutol)
Cyclosporine 0.05% Eye Drops
Cyclosporine 0.05% Eye Drops (BKC FREE)
Cyclosporine 0.09% Ophthalmic Solution (BKC FREE)
Cyclosporine 0.1% Eye Drops
Cyclosporine 0.1% Eye Drops (BKC FREE)
Dexamethasone Sodium Phosphate 0.1% Ophthalmic Solution (BKC FREE)
Diclofenac Sodium 0.1% Ophthalmic Solution
Difluprednate 0.05% Ophthalmic Emulsion
Dorzolamide Hydrochloride 2% Eye Drops (BKC FREE)
Dorzolamide Hydrochloride 2% & Timolol Maleate 0.5% Eye Drops
Dorzolamide Hydrochloride 2% Eye Drops (Solution preserved with ionic buffered system)
Dorzolamide Hydrochloride 2% & Timolol Maleate 0.5% Eye Drops (BKC FREE)
Dorzolamide Hydrochloride 2% & Timolol Maleate 0.5% Eye Drops (Solution preserved with ionic buffered system)
Econazole 1% Ophthalmic Solution (BKC FREE)
Epinastine Hydrochloride 0.05% Eye Drops
Fluconazole 0.3% Ophthalmic Solution
Fluconazole 0.3% Eye/Ear Drops (BKC FREE)
Fluorometholone Acetate 0.1% Ophthalmic Suspension (Suspension preserved with ionic buffered system)
Fluorometholone 0.1% Eye Drops
Fluorometholone 0.1% Ophthalmic Suspension (BKC FREE)
Fluorometholone 0.1% & Neomycin Sulphate 0.35% Ophthalmic Suspension
Fluorometholone 0.1% & Neomycin Sulphate 0.5% Ophthalmic Suspension (With BKC)
Fluorometholone 0.1% & Tobramycin 0.3% Ophthalmic Suspension (BKC FREE)
Fluorometholone 0.1% & Tobramycin Sulphate 0.3% Ophthalmic Suspension
Flurbiprofen 0.03% Eye Drops (BKC FREE)
Flurbiprofen Sodium 0.03% Eye Drops
Flurbiprofen Sodium 0.03% & Gatifloxacin 0.3% Ophthalmic Solution
Flurbiprofen 0.03% & Gatifloxacin 0.3% Ophthalmic Solution (BKC FREE)
Flurbiprofen 0.03% & HPMC 0.25% Ophthalmic Solution
Gatifloxacin 0.3% Ophthalmic Solution
Gatifloxacin 0.3% Ophthalmic Solution (BKC FREE)
Gatifloxacin 0.3%, Betamethasone 0.1% & HPMC 0.025% Ophthalmic Solution
Gatifloxacin 0.3% & Dexamethasone Sodium Phosphate 0.1% Eye Drops
Gatifloxacin 0.3% & Dexamethasone Phosphate 0.1% Eye Drops (BKC FREE)
Gatifloxacin 0.3% & Ketorolac Tromethamine 0.4% Eye Drops (BKC FREE)
Gatifloxacin 0.3% & Loteprednol Etabonate 0.5% Ophthalmic Suspension (BKC FREE)
Gatifloxacin 0.3% & Prednisolone Acetate 1% Ophthalmic Suspension
Gatifloxacin 0.3% & Prednisolone Acetate 1% Eye Drops (BKC FREE)
Gatifloxacin 0.5% & Prednisolone Acetate 1% Eye Drops (BKC FREE)
Gentamicin 0.3% Eye/Ear Drops
Gatifloxacin 0.5% Ophthalmic Solution
Gatifloxacin 0.5% Ophthalmic Solution (BKC FREE)
Homatropine Hydrobromide 2% Eye Drops
Hydroxypropylmethylcellulose 0.3%, Dextran 70 0.1% & Glycerin 0.2% Ophthalmic Solution (BKC FREE)
Hypromellose 0.3% Ophthalmic Solution (with Sodium Perborate)
Itraconazole 1% Ophthalmic Suspension
Ketotifen Fumarate 0.25 mg Ophthalmic Solution (BKC FREE)
Ketorolac Tromethamine 0.4% Eye Drops
Ketorolac Tromethamine 0.5% Ophthalmic Solution
Ketorolac Tromethamine 0.5% Ophthalmic Solution (BKC FREE)
Ketorolac Tromethamine 0.4%, Fluorometholone 0.1% & Polyvinyl Alcohol 0.4% Eye Drops
Ketorolac Tromethamine 0.4%, Fluorometholone 0.1% & Polyvinyl Alcohol 1.4% Eye Drops
Ketorolac Tromethamine 0.5%, Dexamethasone Sodium Phosphate 0.01% & HPMC 0.025% Ophthalmic Solution
Latanoprost 50 mcg Ophthalmic Solution (BKC FREE)
Latanoprost 50 mcg Ophthalmic Solution (Solution preserved with ionic buffered system)
Latanoprost 50 mcg & Timolol 0.5% Eye Drops
Latanoprost 0.005% & Timolol Maleate 0.5% Ophthalmic Solution
Latanoprost 0.005% & Timolol Maleate 0.5% Ophthalmic Solution (BKC FREE)
Latanoprost 0.005% & Timolol Maleate 0.5% Ophthalmic Solution (Solution preserved with ionic buffered system)
Levofloxacin Hemihydrate 0.5% Ophthalmic Solution
Levofloxacin Hemihydrate 1.5% Ophthalmic Solution
Levofloxacin 1.5% & Loteprednol Etabonate 0.5% Eye Drops
Levofloxacin 1.5% & Prednisolone Acetate 1% Eye Drops
Loteprednol Etabonate 0.2% Ophthalmic Suspension
Loteprednol Etabonate 0.2% Ophthalmic Suspension (BKC FREE)
Loteprednol Etabonate 0.5% Ophthalmic Suspension
Loteprednol Etabonate 0.5% Ophthalmic Suspension (BKC FREE)
Loteprednol Etabonate 0.5% & Tobramycin 0.3% Ophthalmic Solution
Loteprednol Etabonate 0.5% & Gatifloxacin 0.3% Ophthalmic Suspension
Moxifloxacin Hydrochloride 0.5% Eye Drops
Moxifloxacin Hydrochloride 0.5% Eye Drops (Gel Form)
Moxifloxacin 0.5% with HPMC 0.25% Ophthalmic Solution
Moxifloxacin Hydrochloride 0.5% & Bromfenac Sodium 0.09% Ophthalmic Solution
Moxifloxacin Hydrochloride 0.5% & Bromfenac Sodium 0.09% Ophthalmic Solution (BKC FREE)
Moxifloxacin Hydrochloride 0.5%, Betamethasone 0.1% & HPMC 0.25% Eye/Ear Drops
Moxifloxacin Hydrochloride 0.5% & Dexamethasone Sodium Phosphate 0.1% Ophthalmic Solution (Preservative Free)
Moxifloxacin Hydrochloride 0.5% & Dexamethasone Sodium Phosphate 0.1% Ophthalmic Solution (BKC FREE)
Moxifloxacin Hydrochloride 0.5% & Dexamethasone Sodium Phosphate 0.1% Ophthalmic Solution
Moxifloxacin 0.5% & Dexamethasone 0.1% Eye Drops (Solution preserved with ionic buffered system)
Moxifloxacin Hydrochloride 0.5% & Difluprednate 0.05% Eye Drops
Moxifloxacin Hydrochloride 0.5% & Ketorolac Tromethamine 0.5% Eye Drops
Moxifloxacin Hydrochloride 0.5% & Ketorolac Tromethamine 0.5% Eye Drops (BKC FREE)
Moxifloxacin Hydrochloride 0.5% & Ketorolac Tromethamine 0.4% Ophthalmic Solution (BKC FREE)
Moxifloxacin Hydrochloride 0.5%, Ketorolac Tromethamine 0.5% & HPMC 0.25% Ophthalmic Solution (BKC FREE)
Moxifloxacin Hydrochloride 0.5% & Loteprednol Etabonate 0.5% Ophthalmic Suspension (BKC FREE)
Moxifloxacin 0.5% & Loteprednol Etabonate 0.5% Ophthalmic Suspension (Suspension preserved with ionic buffered system)
Moxifloxacin Hydrochloride 0.5% & Prednisolone Acetate 1% Eye Drops
Moxifloxacin 0.5% & Prednisolone Acetate 1% Ophthalmic Suspension (Suspension preserved with ionic buffered system)
Moxifloxacin Hydrochloride 0.5% & Prednisolone Acetate 1% Eye Drops (BKC FREE)
Moxifloxacin Hydrochloride 0.5% & Tobramycin Sulphate 0.3% Ophthalmic Solution (BKC FREE)
Naphazoline 0.056%, CMC 0.5%, Camphor 0.01%, Menthol 0.005%, Chlorpheniramine Maleate 0.01% & Boric Acid 1.25% Eye Drops (BKC FREE)
Naphazoline Hydrochloride 0.05%, Sodium Carboxymethylcellulose 0.5%, Phenylephrine Hydrochloride 0.012%, Camphor 0.01% & Menthol 0.005% Ophthalmic Solution (BKC FREE)
Natamycin 5% Ophthalmic Suspension
Natamycin 5% Ophthalmic Suspension (BKC FREE)
Nepafenac 0.1% Ophthalmic Solution (Clear Solution)
Nepafenac 0.1% Ophthalmic Suspension (BKC FREE)
Nepafenac 0.1% Ophthalmic Suspension
Nepafenac 0.1% Ophthalmic Suspension (Suspension preserved with ionic buffered system)
Nepafenac 0.3% Ophthalmic Solution (Clear Solution)
Nepafenac 0.3% Ophthalmic Suspension
Nepafenac 0.3% Ophthalmic Suspension (BKC FREE)
Nepafenac 0.3% Ophthalmic Suspension (Suspension preserved with ionic buffered system)
Netarsudil 0.02% Ophthalmic Solution (BKC FREE)
Norfloxacin 0.3% Eye/Ear Drops (BKC FREE)
Ofloxacin 0.3% Ophthalmic Solution
Ofloxacin 0.3% & Betamethasone Sodium Phosphate 0.01% Eye/Ear Drops
Ofloxacin 0.3%, Betamethasone 0.1% & HPMC 0.25% Eye/Ear Drops
Ofloxacin 0.3% & Dexamethasone Phosphate 0.1% Eye/Ear Drops
Ofloxacin 0.3% & HPMC 0.025% Eye/Ear Drops
Ofloxacin 0.3% & Ketorolac Tromethamine 0.5% Eye Drops (BKC FREE)
Ofloxacin 0.3%, Ketorolac Tromethamine 0.5% & Hydroxypropylmethylcellulose 0.025% Ophthalmic Solution
Olopatadine Hydrochloride 0.1% & Ketorolac Tromethamine 0.4% Ophthalmic Solution
Olopatadine Hydrochloride 0.1% Eye Drops (BKC FREE)
Olopatadine Hydrochloride 0.1% Ophthalmic Solution
Olopatadine Hydrochloride 0.2% Eye Drops (BKC FREE)
Olopatadine Hydrochloride 0.2% Ophthalmic Solution (Solution preserved with ionic buffered system)
Olopatadine Hydrochloride 0.7% Ophthalmic Solution (BKC FREE)
Olopatadine Hydrochloride 0.7% Eye Drops
Pilocarpine Nitrate 2% Eye Drops
Phenylephrine 2.5% Eye Drops
Phenylephrine 5% Eye Drops
Phenylephrine HCl 0.12%, HPMC 0.3%, Chlorpheniramine Maleate 0.2% & Boric Acid 1.25% Eye Drops
Polyethylene Glycol 0.4% & Propylene Glycol 0.3% Ophthalmic Solution (BKC FREE)
Polymyxin B Sulphate 5000 IU & Chloramphenicol 4 mg Eye/Ear Drops
Polymyxin B Sulphate 5000 IU & Chloramphenicol 10 mg Eye/Ear Drops
Polymyxin B Sulphate 5000 IU, Chloramphenicol 1% & Dexamethasone Sodium Phosphate 0.1% Eye/Ear Drops
Polymyxin B Sulphate 5000 IU, Chloramphenicol 10 mg & HPMC 2.5 mg Ophthalmic Solution
Polymyxin B Sulphate 5000 IU, Chloramphenicol 5 mg, Dexamethasone Sodium Phosphate 1 mg & Phenyl Mercuric Nitrate 0.001% Eye Drops
Polyvinyl Alcohol 1.4% & Povidone 0.6% Ophthalmic Solution
Potassium Iodide 3.3%, Calcium Chloride 1% & Sodium Chloride 0.83% Ophthalmic Solution
Povidone Iodine 5% Ophthalmic Solution
Prednisolone Acetate 1% Ophthalmic Suspension
Proparacaine Hydrochloride 0.5% Eye Drops
Riboflavin 0.1% Ophthalmic Solution IP (BKC FREE)
Ripasudil 0.4% Eye Drops (BKC FREE)
Sodium Chloride 5% Ophthalmic Solution (with Phenyl Mercuric Nitrate)
Sodium Chloride 5% Ophthalmic Solution (With BKC)
Sodium Cromoglycate 2% Ophthalmic Solution
Sodium Cromoglycate 4% Ophthalmic Solution
Sodium Cromolyn 4% Ophthalmic Solution (BKC FREE)
Sodium Hyaluronate 0.1% Eye Drops
Sodium Hyaluronate 0.1% Eye Drops (BKC FREE)
Sodium Hyaluronate 0.1% Eye Drops (with Sodium Perborate 0.028%)
Sodium Hyaluronate 0.18% Eye Drops (with Sodium Perborate 0.028%)
Sodium Hyaluronate 0.18% Eye Drops (BKC FREE)
Sodium Hyaluronate 0.3% Eye Drops (BKC FREE)
Sodium Hyaluronate 0.4% Eye Drops (BKC FREE)
Sodium Hyaluronate 0.4% Eye Drops (Solution preserved with ionic buffered system)
Sodium Hyaluronate 0.1% & D-Panthenol 5% Eye Drops
Sodium Hyaluronate 0.15%, Polyethylene Glycol 400 0.4% & Propylene Glycol 0.3% Lubricant Eye Drops
Sulphacetamide Sodium 20% & Chloramphenicol 0.5% Eye Drops
Sulphacetamide Sodium 12.5%, Sodium Chloride 2%, Boric Acid 2% & Zinc Sulphate Eye Drops
Tacrolimus 0.1% Ophthalmic Solution (BKC FREE)
Timolol Maleate 0.5% Eye Drops
Timolol Maleate 0.5% Eye Drops (BKC FREE)
Timolol Maleate 0.5% Long Acting Ophthalmic Solution (Preservative Free)
Timolol Maleate 0.5% & Pilocarpine Nitrate 2% Eye Drops
Tobramycin Sulphate 0.3% Ophthalmic Solution (BKC FREE)
Tobramycin Sulphate 0.3% Ophthalmic Solution
Tobramycin 0.3% & Betamethasone 0.1% Ophthalmic Solution (BKC FREE)
Tobramycin 0.3% & Dexamethasone Phosphate 0.05% Ophthalmic Solution (With BKC)
Tobramycin Sulphate 0.3% with Dexamethasone Phosphate 0.1% Ophthalmic Solution
Travoprost 0.004% & Timolol Maleate 0.5% Eye Drops (BKC FREE)
Travoprost 0.004% & Timolol Maleate 0.5% Ophthalmic Solution
Travoprost 0.004% Ophthalmic Solution (BKC FREE)
Travoprost 0.004% Eye Drops IP (Solution preserved with ionic buffered system)
Tropicamide 0.8% & Phenylephrine Hydrochloride 5% Ophthalmic Solution
Tropicamide 0.5% Eye Drops
Tropicamide 1% Eye Drops
Voriconazole 1% Eye Drops (Solution Form)
`);

const EAR_DROPS = lines(`
Clotrimazole 1% & Lignocaine HCl 2% Ear Drops
Chloramphenicol 5%, Beclomethasone Dipropionate 0.025%, Clotrimazole 1% & Glycerin 2% Ear Drops
Chloramphenicol 5%, Benzocaine 1% & Propylene Glycol Ear Drops
Fluconazole 0.3% Eye/Ear Drops
Gentamicin 0.3%, Clotrimazole 1%, Lignocaine HCl 2% & Beclomethasone Dipropionate 0.025% Ear Drops
Ofloxacin 0.3%, Beclomethasone Dipropionate 0.025%, Clotrimazole 1% & Glycerin 2% Ear Drops
Paradichlorobenzene 2%, Benzocaine 2.7%, Chlorbutol 5% with Turpentine Oil 15% Ear Drops
`);

const NASAL = lines(`
Azelastine 0.1% Nasal Spray
Azelastine Hydrochloride 140 mcg & Fluticasone Propionate 50 mcg Nasal Spray
Calcitonin (Salmon) 200 IU Nasal Solution
Desmopressin 0.1 mg Nasal Spray
Fluticasone 50 mcg Nasal Spray
Fluticasone Furoate 27.5 mcg Nasal Spray
Fluticasone Furoate 27.5 mcg & Oxymetazoline Hydrochloride 50 mcg Nasal Spray
Mometasone Aqueous 50 mcg Nasal Spray
Mometasone Furoate 50 mcg & Azelastine Hydrochloride 137 mcg Nasal Spray
Saline 0.65% Nasal Spray (Sodium Chloride)
Oxymetazoline Hydrochloride 0.01% Nasal Solution
Oxymetazoline Hydrochloride 0.025% Nasal Solution
Oxymetazoline Hydrochloride 0.05% Nasal Solution
Xylometazoline Hydrochloride 0.05% Nasal Drops
Xylometazoline Hydrochloride 0.1% Nasal Drops
`);

const OINTMENTS = lines(`
Aciclovir 3% Eye Ointment
Atropine Sulphate 1% Eye Ointment (BKC FREE)
Atropine Sulphate 1% Eye Ointment
Azithromycin 1% Eye Ointment
Carboxymethylcellulose Sodium 0.3% & Glycerin 1% Eye Ointment
Chloramphenicol 1% Eye Ointment
Chloramphenicol 1% & Hydrocortisone Acetate 0.5% Eye Ointment
Chloramphenicol 1% & Polymyxin B Sulphate 10000 Eye Ointment
Dexpanthenol 5% Ophthalmic Gel
Fluorometholone 0.1% Eye Ointment
Ganciclovir 0.15% Eye Gel
Gatifloxacin 0.3% Eye Ointment
Hydrocortisone Acetate 0.5% Eye Ointment
Hydrocortisone Acetate 2.5% Eye Ointment
Hydroxypropyl Methylcellulose 0.3% Ophthalmic Gel
Hypromellose 0.3% Ophthalmic Gel (with Sodium Perborate)
Hydroxypropylmethylcellulose 2% Ophthalmic Gel (BKC FREE)
Hydroxypropylmethylcellulose 2% Ophthalmic Gel (with Sodium Perborate)
HPMC 2%, Sodium Chloride 0.49%, Potassium Chloride 0.075%, Calcium Chloride 0.048%, Magnesium Chloride 0.03%, Sodium Acetate 0.39% & Sodium Citrate 0.17% Eye Gel
Itraconazole 1% Eye Ointment
Loteprednol Etabonate 0.5% Eye Ointment
Moxifloxacin 0.5% Eye Ointment
Neomycin 5000 Units, Polymyxin B Sulfate 400 Units, Bacitracin Zinc 3400 Units & Hydrocortisone 10 mg Ophthalmic Ointment USP
Ofloxacin 0.3% Eye Ointment
Polymyxin B Sulphate 5000 IU, Chloramphenicol 10 mg & Betamethasone Sodium Phosphate 1 mg Ophthalmic Ointment
Polymyxin B Sulphate 10000 IU, Chloramphenicol 10 mg & Dexamethasone Sodium Phosphate 1 mg Eye Ointment
Polymyxin B Sulphate 5000 IU, Chloramphenicol 10 mg & Dexamethasone Sodium Phosphate 1 mg Eye Ointment
Sodium Chloride 6% Eye Ointment
Sodium Hyaluronate 0.18% Gel
Tacrolimus 0.03% Ophthalmic Ointment
Tobramycin Sulphate 0.3% Eye Ointment
Tetracycline Hydrochloride 1% Ophthalmic Ointment
`);

const TABLETS = lines(`
Acebrophylline 200 mg Sustained Release Tablets
Acebrophylline 200 mg (SR), Fexofenadine Hydrochloride 120 mg & Montelukast Sodium 10 mg Tablets
Acebrophylline 100 mg & N-Acetylcysteine 600 mg Tablets
Aceclofenac 200 mg Sustained Release Tablets
Aceclofenac 100 mg & Drotaverine Hydrochloride 80 mg Tablets
Aceclofenac 100 mg & Paracetamol 325 mg Tablets (Film Coated)
Aceclofenac 100 mg & Paracetamol 325 mg Tablets (Uncoated)
Aceclofenac 100 mg & Thiocolchicoside 4 mg Tablets
Aceclofenac 100 mg, Paracetamol 325 mg & Chlorzoxazone 250 mg Tablets (Film Coated)
Aceclofenac 100 mg, Paracetamol 325 mg & Chlorzoxazone 250 mg Tablets (Uncoated)
Aceclofenac 100 mg, Paracetamol 325 mg & Serratiopeptidase 10 mg Tablets
Aceclofenac 100 mg, Paracetamol 325 mg & Serratiopeptidase 15 mg Tablets
Aceclofenac 100 mg, Paracetamol 325 mg & Tizanidine 2 mg Tablets
Acetazolamide 250 mg Tablets IP (Uncoated)
Acetazolamide 250 mg Tablets (Film Coated)
Aciclovir 200 mg Dispersible Tablets
Aciclovir 400 mg Dispersible Tablets
Aciclovir 800 mg Dispersible Tablets
Albendazole 400 mg & Ivermectin 6 mg Tablets
Albendazole 400 mg & Ivermectin 12 mg Tablets
Amisulpride 50 mg Tablets
Amisulpride 100 mg Tablets
Amisulpride 200 mg Tablets
Amitriptyline 10 mg Tablets
Amitriptyline 25 mg Tablets
Amitriptyline 10 mg & Propranolol 40 mg (Extended Release) Tablets
Amitriptyline Hydrochloride 10 mg & Mecobalamin 1500 mcg (Sustained Release) Tablets
Amitriptyline Hydrochloride 10 mg & Methylcobalamin 1500 mcg Tablets
Amitriptyline Hydrochloride 5 mg & Methylcobalamin 1500 mcg Tablets
Amlodipine 5 mg Tablets
Amlodipine 5 mg & Atenolol 50 mg Tablets
Aripiprazole 5 mg Tablets
Aripiprazole 10 mg Tablets
Aripiprazole 15 mg Tablets
Artemether 20 mg & Lumefantrine 120 mg Tablets
Ascorbic Acid (Vitamin C) 100 mg & Zinc 5 mg Chewable Tablets
Atorvastatin 10 mg Tablets
Atorvastatin 20 mg Tablets
Atorvastatin 10 mg & Fenofibrate 145 mg Tablets
Atorvastatin 20 mg & Fenofibrate 160 mg Tablets
Azithromycin 100 mg Dispersible Tablets
Azithromycin 250 mg Tablets
Azithromycin 500 mg Tablets
Azithromycin 500 mg & Ambroxol 75 mg (Sustained Release) Tablets
Baclofen 10 mg Tablets
Baclofen 20 mg (Extended Release) Tablets
Betahistine Hydrochloride 16 mg Tablets
Betahistine Hydrochloride 24 mg Sustained Release Tablets
Betahistine Hydrochloride 8 mg Tablets
Betamethasone 0.5 mg Tablets IP
Betamethasone 1 mg Tablets IP
Bilastine 10 mg Tablets
Bilastine 20 mg Tablets
Bilastine 20 mg & Montelukast 10 mg Tablets
Bisoprolol Fumarate 2.5 mg Tablets
Bisoprolol Fumarate 5 mg Tablets
Brivaracetam 50 mg Tablets
Brivaracetam 75 mg Tablets
Brivaracetam 100 mg Tablets
Calcium 500 mg with Vitamin D3 250 IU Tablets
Calcium Citrate Maleate 1000 mg, Magnesium Hydroxide 100 mg, Vitamin D3 200 IU & Zinc 4 mg Tablets
Calcium Citrate Maleate 250 mg, Vitamin D3 100 IU & Folic Acid 50 mcg Tablets
Calcium Citrate 1000 mg, Magnesium Hydroxide 100 mg, Zinc Sulphate 4 mg & Vitamin D3 200 IU Tablets
Calcium Citrate 1000 mg, Calcitriol 0.25 mcg, Zinc Sulphate 7.5 mg, Folic Acid 1.5 mg, Methylcobalamin 1500 mcg & Vitamin K2-7 50 mcg Tablets
Calcium Aspartate 500 mg, Calcium Orotate 500 mg, Calcitriol 0.25 mcg, Zinc 7.5 mg, Magnesium Hydroxide 50 mg, Hydroxocobalamin 100 mcg & Folic Acid 1.5 mg Tablets
Calcium Citrate Malate 1000 mg, Vitamin D3 1000 IU, Vitamin K2-7 50 mcg, Magnesium 50 mg & Zinc 15 mg Tablets
Cetirizine Hydrochloride 5 mg, Phenylephrine Hydrochloride 5 mg & Paracetamol 325 mg Tablets
Cetirizine Hydrochloride 5 mg, Phenylephrine Hydrochloride 5 mg & Paracetamol 500 mg Tablets
Cholecalciferol Chewable 60,000 Tablets
Cilnidipine 5 mg Tablets
Cilnidipine 10 mg Tablets
Cinnarizine 20 mg & Dimenhydrinate 40 mg Tablets
Cinnarizine 20 mg & Domperidone 15 mg Tablets
Cinnarizine 20 mg & Dimenhydrinate 40 mg Mouth Dissolving Tablets
Ciprofloxacin 250 mg Tablets
Ciprofloxacin 500 mg Tablets
Ciprofloxacin 750 mg Tablets
Ciprofloxacin 500 mg & Tinidazole 600 mg Tablets
Citicoline 500 mg Tablets
Citicoline 500 mg & Piracetam 800 mg Tablets
Dapagliflozin 10 mg Tablets
Dapoxetine Hydrochloride 30 mg Tablets
Dapoxetine Hydrochloride 60 mg Tablets
Deflazacort 6 mg Tablets
Deflazacort 12 mg Tablets
Deflazacort 18 mg Tablets
Deflazacort 30 mg Tablets
Desloratadine 5 mg Tablets
Desloratadine 5 mg & Montelukast Sodium 10 mg Tablets
Desvenlafaxine 50 mg Extended Release Tablets
Desvenlafaxine 100 mg Extended Release Tablets
Diacerein 50 mg & Glucosamine 750 mg Tablets
Diclofenac Potassium 50 mg & Metaxalone 400 mg Tablets
Diclofenac Sodium 50 mg & Paracetamol 325 mg Tablets
Diclofenac Potassium 50 mg, Paracetamol 325 mg & Chlorzoxazone 250 mg Tablets (Film Coated)
Diclofenac Potassium 50 mg, Paracetamol 325 mg & Chlorzoxazone 250 mg Tablets (Uncoated)
Diclofenac Potassium 50 mg, Paracetamol 325 mg & Serratiopeptidase 10 mg Tablets
Diclofenac Potassium 50 mg, Paracetamol 325 mg & Serratiopeptidase 15 mg Tablets
Diclofenac Potassium 50 mg & Serratiopeptidase 10 mg Enteric Coated Tablets
Divalproex Sodium 250 mg Extended Release Tablets
Divalproex Sodium 500 mg Extended Release Tablets
Divalproex Sodium 750 mg (Prolonged Release) Tablets
Divalproex Sodium 1000 mg Prolonged Release Tablets
Domperidone 10 mg Mouth Dissolving Tablets
Domperidone Maleate 10 mg & Naproxen Sodium 250 mg Tablets
Domperidone Maleate 10 mg & Naproxen Sodium 500 mg Tablets
Dothiepin Hydrochloride 25 mg Tablets
Dothiepin Hydrochloride 50 mg Tablets
Dothiepin Hydrochloride 75 mg Tablets
Doxofylline 400 mg Tablets
Doxofylline 400 mg (Sustained Release) & Montelukast 10 mg Tablets
Doxofylline 650 mg Modified Release Tablets
Doxycycline Hydrochloride 100 mg & Lactic Acid Bacillus (60 Million Spores) Tablets
Doxylamine Succinate 10 mg & Pyridoxine Hydrochloride 10 mg Tablets
Doxylamine Succinate 10 mg, Pyridoxine Hydrochloride 10 mg & Folic Acid 2.5 mg Tablets
Doxylamine Succinate 10 mg, Pyridoxine Hydrochloride 10 mg & Folic Acid 5 mg Tablets
Doxylamine Succinate 20 mg, Pyridoxine Hydrochloride 20 mg & Folic Acid 5 mg Tablets
Drotaverine Hydrochloride 80 mg Tablets
Duloxetine 20 mg Gastro-Resistant Tablets
Duloxetine 30 mg Gastro-Resistant Tablets
Ebastine 10 mg Tablets
Ebastine 20 mg Tablets
Escitalopram Oxalate 10 mg Tablets
Escitalopram Oxalate 20 mg Tablets
Esomeprazole 40 mg Gastro-Resistant Tablets
Etodolac 400 mg (Extended Release) Tablets
Etoricoxib 90 mg Tablets
Etoricoxib 120 mg Tablets
Etoricoxib 60 mg & Paracetamol 500 mg Tablets
Etoricoxib 60 mg & Thiocolchicoside 4 mg Tablets
Etoricoxib 60 mg & Thiocolchicoside 8 mg Tablets
Etoricoxib 60 mg & Paracetamol 325 mg Tablets
Etophylline 231 mg & Theophylline 69 mg Prolonged Release Tablets
Febuxostat 40 mg Tablets
Febuxostat 80 mg Tablets
Ferrous Ascorbate 100 mg & Folic Acid 1.5 mg Tablets
Ferrous Ascorbate 100 mg, Folic Acid 1.5 mg & Zinc 22.5 mg Tablets
Ferrous Bisglycinate 50 mg, Zinc Bisglycinate 15 mg, Methylcobalamin 500 mcg & L-Methylfolate Calcium 1 mg Tablets
Fexofenadine Hydrochloride 120 mg Tablets
Fexofenadine Hydrochloride 180 mg Tablets
Fexofenadine Hydrochloride 120 mg & Montelukast 10 mg Tablets
Fexofenadine Hydrochloride 120 mg & Montelukast 10 mg Tablets (Uncoated Bilayered)
Fluconazole 150 mg Tablets
Fluconazole 200 mg Tablets
Fluconazole 400 mg Tablets
Fluconazole 150 mg & Ivermectin 6 mg Tablets
Fluconazole 150 mg & Ivermectin 12 mg Tablets
Flunarizine Dihydrochloride 5 mg Tablets
Flunarizine 10 mg Tablets
Flunarizine 5 mg & Domperidone 10 mg Tablets
Flunarizine Dihydrochloride 10 mg & Propranolol Hydrochloride 40 mg Sustained Release Tablets
Flupirtine Maleate 100 mg & Paracetamol 325 mg Tablets
Flupentixol 0.5 mg & Melitracen 10 mg Tablets
Fluvoxamine Maleate 50 mg Tablets
Fluvoxamine Maleate 100 mg Tablets
Gabapentin 100 mg Tablets
Gabapentin 300 mg Tablets
Gabapentin 300 mg & Methylcobalamin 500 mg Tablets
Gabapentin 400 mg & Nortriptyline 10 mg Tablets
Gliclazide 80 mg & Metformin Hydrochloride 500 mg Tablets
Glucosamine 750 mg, Methyl Sulfonyl Methane 250 mg & Diacerein 50 mg Tablets
Granisetron Hydrochloride 1 mg Mouth Dissolving Tablets
Haloperidol 1.5 mg Tablets IP
Haloperidol 5 mg Tablets IP
Haloperidol 10 mg Tablets IP
Hydroxyzine Hydrochloride 10 mg Tablets
Hydroxyzine Hydrochloride 25 mg Tablets
Hyoscine Butylbromide 10 mg & Mefenamic Acid 250 mg Tablets
Ivermectin 6 mg Tablets
Ivermectin 12 mg Tablets
Ketorolac Tromethamine 10 mg Tablets
Ketorolac Tromethamine 10 mg Dispersible Tablets
Labetalol 100 mg Tablets
L-Carnitine 500 mg, Co-Enzyme Q10 100 mg, Alpha Lipoic Acid 100 mg, Vitamin E 150 IU & Mixed Carotenoids 40 mg Tablets
L-Carnitine L-Tartrate 500 mg & Folic Acid 1.5 mg Tablets
L-Carnitine L-Tartrate 500 mg, Methylcobalamin 1500 mg & Folic Acid 1.5 mg Tablets
Levetiracetam 500 mg Tablets
Levetiracetam 750 mg Tablets
Levetiracetam 250 mg Tablets IP
Levetiracetam 1000 mg Tablets IP
Levocarnitine 250 mg, Methylcobalamin 1500 mcg & Folic Acid 1.5 mg Tablets
Levocetirizine 5 mg Tablets
Levocetirizine Dihydrochloride 10 mg Tablets
Levocetirizine 4 mg & Montelukast 2.5 mg Dispersible Tablets
Levocetirizine Hydrochloride 5 mg & Montelukast Sodium 10 mg Tablets (Film Coated)
Levocetirizine Dihydrochloride 5 mg & Montelukast 10 mg Tablets (Film Coated Bilayered)
Levocetirizine Dihydrochloride 5 mg & Montelukast 10 mg Tablets (Uncoated)
Levocetirizine Hydrochloride 5 mg & Montelukast 10 mg Tablets (Uncoated Bilayered)
Levocetirizine Dihydrochloride 10 mg, Montelukast 5 mg & Ambroxol Hydrochloride 45 mg (SR) Tablets
Levofloxacin 250 mg Tablets
Levofloxacin 500 mg Tablets
Levofloxacin 750 mg Tablets
Levofloxacin 250 mg & Ornidazole 500 mg Tablets
Linagliptin 2.5 mg & Metformin Hydrochloride 500 mg Tablets
Linagliptin 5 mg Tablets
Linezolid 600 mg Tablets IP
Lithium Carbonate 300 mg Tablets
Lithium Carbonate 450 mg Tablets
L-Methylfolate Calcium 5.6 mg, Mecobalamin 2 mg & Acetylcysteine 600 mg Tablets
L-Methylfolate 1 mg, Methylcobalamin 1500 mcg & Pyridoxal-5-Phosphate 0.5 mg Tablets
Loratadine 10 mg Tablets
Lornoxicam 8 mg & Paracetamol 325 mg Tablets
Mefenamic Acid 250 mg & Dicyclomine Hydrochloride 10 mg Tablets (Uncoated)
Mefenamic Acid 250 mg & Dicyclomine Hydrochloride 20 mg Tablets (Uncoated)
Mefenamic Acid 500 mg & Paracetamol 325 mg Tablets (Uncoated)
Metformin Hydrochloride 500 mg Sustained Release Tablets
Metformin Hydrochloride 1000 mg Sustained Release Tablets
Methylcobalamin 500 mcg Tablets
Methylcobalamin 1500 mcg (Extended Release) Tablets
Methylcobalamin 1500 mcg, Alpha Lipoic Acid 100 mg, Pyridoxine Hydrochloride 3 mg, Folic Acid 1.5 mg, Benfotiamine 50 mg, Biotin 5 mg & Chromium 200 mcg Tablets
Mecobalamin 1500 mcg, Alpha Lipoic Acid 200 mg, Myo-Inositol 100 mg, Folic Acid 1.5 mg, Pyridoxine Hydrochloride 3 mg, Chromium 200 mcg & Benfotiamine 200 mg Tablets
Methylcobalamin 1500 mg, Alpha Lipoic Acid 100 mg, Pyridoxine Hydrochloride 3 mg & Folic Acid 1.5 mg Tablets
Methylcobalamin 1500 mcg, Alpha Lipoic Acid 100 mg, Vitamin D3 1000 IU, Pyridoxine Hydrochloride 3 mg & Folic Acid 1.5 mg Tablets
Mecobalamin 750 mcg, Pyridoxine 1.5 mg, Nicotinamide 45 mg & Benfotiamine 150 mg Tablets
Methylprednisolone 4 mg Tablets
Methylprednisolone 8 mg Tablets
Methylprednisolone 16 mg Tablets
Metronidazole 400 mg Tablets
Metronidazole 600 mg Extended Release Tablets
Moxifloxacin Hydrochloride 400 mg Tablets
Nebivolol 2.5 mg Tablets
N-Acetylcysteine 50 mg, Biotin 10 mg, Calcium Pantothenate 100 mg, Selenium 65 mcg, Copper 3 mg & Zinc 22.5 mg Tablets
Nimesulide 100 mg Dispersible Tablets
Nimesulide 100 mg & Paracetamol 325 mg Tablets
Ofloxacin 200 mg Tablets
Ofloxacin 400 mg Tablets
Ofloxacin 200 mg & Ornidazole 500 mg Tablets
Olmesartan Medoxomil 20 mg Tablets
Olmesartan Medoxomil 40 mg Tablets
Olmesartan Medoxomil 40 mg & Hydrochlorothiazide 12.5 mg Tablets
Olanzapine 5 mg & Fluoxetine 20 mg Tablets
Omeprazole Magnesium 20 mg & Domperidone 10 mg Tablets
Ondansetron 4 mg Orally Disintegrating Tablets
Ondansetron 8 mg Orally Disintegrating Tablets
Ornidazole 500 mg Tablets
Oxcarbazepine 300 mg Tablets
Oxcarbazepine 450 mg Tablets
Pantoprazole 40 mg & Domperidone 10 mg Tablets
Pantoprazole 40 mg Gastro-Resistant Tablets
Paracetamol 125 mg Dispersible Tablets
Paracetamol 650 mg Tablets
Paracetamol 125 mg & Ibuprofen 100 mg Dispersible Tablets
Paracetamol 325 mg, Caffeine 30 mg, Phenylephrine Hydrochloride 5 mg & Chlorpheniramine Maleate 25 mg Tablets
Paracetamol 325 mg, Phenylephrine Hydrochloride 5 mg, Caffeine 30 mg & Diphenhydramine Hydrochloride 25 mg Tablets
Paracetamol 500 mg & Domperidone 20 mg Tablets
Paracetamol 500 mg, Phenylephrine Hydrochloride 5 mg, Caffeine 30 mg & Diphenhydramine Hydrochloride 25 mg Tablets
Paroxetine 12.5 mg (Prolonged Release) Tablets
Paroxetine 12.5 mg (Sustained Release) Tablets
Paroxetine 25 mg (Prolonged Release) Tablets
Piracetam 800 mg Tablets
Prednisolone 5 mg Tablets
Prednisolone 10 mg Tablets
Pregabalin 75 mg & Methylcobalamin 1500 mcg Tablets
Pregabalin 75 mg (Sustained Release), Nortriptyline 10 mg & Methylcobalamin 1500 mcg Tablets
Pregabalin 75 mg, Nortriptyline 10 mg & Methylcobalamin 1500 mcg Tablets
Promethazine Hydrochloride 25 mg Tablets
Promethazine Hydrochloride 50 mg Tablets
Propranolol 20 mg Sustained Release Tablets
Propranolol 40 mg Sustained Release Tablets
Quetiapine Fumarate 50 mg Tablets
Quetiapine Fumarate 100 mg Tablets
Rabeprazole Sodium 10 mg Gastro-Resistant Tablets
Rabeprazole Sodium 20 mg & Domperidone 10 mg Tablets
Rabeprazole Sodium 20 mg Gastro-Resistant Tablets
Rabeprazole Sodium 40 mg Gastro-Resistant Tablets
Racecadotril 10 mg Dispersible Tablets
Racecadotril 30 mg Dispersible Tablets
Rifaximin 200 mg Tablets
Rifaximin 400 mg Tablets
Rifaximin 550 mg Tablets
Risperidone 1 mg Orally Disintegrating Tablets
Risperidone 4 mg Orally Disintegrating Tablets
Risperidone 2 mg & Trihexyphenidyl 2 mg Tablets
Risperidone 3 mg & Trihexyphenidyl 2 mg Tablets
Rizatriptan 5 mg Tablets IP (Uncoated)
Rosuvastatin 10 mg Tablets
Rosuvastatin 10 mg & Fenofibrate 145 mg Tablets
Roxithromycin 150 mg Tablets
Serratiopeptidase 20 mg Tablets
Sertraline Hydrochloride 50 mg Tablets
S-Amlodipine 2.5 mg & Atenolol 25 mg Tablets
S-Amlodipine 2.5 mg & Atenolol 50 mg Tablets
Sildenafil Citrate 50 mg Tablets
Sildenafil Citrate 100 mg Tablets
Sildenafil 50 mg & Dapoxetine 30 mg Tablets
Sitagliptin 50 mg & Metformin Hydrochloride 500 mg Tablets
Sodium Valproate 133 mg & Valproic Acid 58 mg Tablets (200 mg)
Sodium Valproate 200 mg & Valproic Acid 87 mg Tablets (300 mg)
Sodium Valproate 333 mg & Valproic Acid 145 mg Tablets (500 mg)
Sumatriptan 85 mg & Naproxen 500 mg Tablets
Tadalafil 2.5 mg Tablets
Tadalafil 5 mg Tablets
Tadalafil 10 mg Tablets
Tadalafil 20 mg Tablets
Tapentadol 50 mg Tablets
Tapentadol 100 mg Tablets
Telmisartan 40 mg Tablets
Telmisartan 40 mg & Amlodipine 5 mg Tablets
Telmisartan 40 mg & Hydrochlorothiazide 12.5 mg Tablets
Telmisartan 80 mg & Hydrochlorothiazide 12.5 mg Tablets
Telmisartan 40 mg, Amlodipine 5 mg & Hydrochlorothiazide 12.5 mg Tablets
Telmisartan 80 mg & Amlodipine 10 mg Tablets
Teneligliptin 20 mg Tablets
Teneligliptin 20 mg & Metformin Hydrochloride 500 mg (SR) Tablets
Teneligliptin 20 mg & Metformin Hydrochloride 1000 mg (SR) Tablets IP
Terbinafine 250 mg Tablets
Terbinafine 500 mg Tablets
Thiamine Hydrochloride 100 mg Tablets
Thiocolchicoside 4 mg & Aceclofenac 100 mg Tablets
Thiocolchicoside 4 mg, Aceclofenac 100 mg & Paracetamol 325 mg Tablets
Thiocolchicoside 8 mg & Aceclofenac 100 mg Tablets
Thiocolchicoside 8 mg, Aceclofenac 100 mg & Paracetamol 325 mg Tablets
Tofacitinib 5 mg Tablets
Tolperisone Hydrochloride 150 mg & Diclofenac Sodium 50 mg Tablets (Film Coated)
Tranexamic Acid 500 mg Tablets IP
Tranexamic Acid 500 mg & Ethamsylate 250 mg Tablets
Tranexamic Acid 500 mg & Mefenamic Acid 250 mg Tablets
Trihexyphenidyl 2 mg Tablets
Trihexyphenidyl 5 mg Tablets
Trypsin 48 mg, Bromelain 90 mg, Rutoside 100 mg & Diclofenac Sodium 50 mg Tablets
Trypsin & Chymotrypsin Tablets (1,00,000 Armour units of enzymatic activity)
Trypsin-Chymotrypsin (50,000 Armour units enzymatic activity) with Paracetamol 325 mg & Aceclofenac 100 mg Tablets
Ursodeoxycholic Acid 150 mg Tablets
Ursodeoxycholic Acid 300 mg Tablets
Ursodeoxycholic Acid 450 mg Tablets
Valacyclovir Hydrochloride 1000 mg Tablets
Valacyclovir Hydrochloride 500 mg Tablets
Vildagliptin 50 mg & Metformin Hydrochloride 500 mg Tablets
Vildagliptin 50 mg & Metformin Hydrochloride 850 mg Tablets
Vildagliptin 50 mg & Metformin Hydrochloride 1000 mg Tablets
Vitamin C 500 mg Tablets
Vitamin D3 (Cholecalciferol) 2000 IU & Vitamin K2-7 50 mcg Tablets
Voriconazole 200 mg Tablets
`);

const CAPSULES = lines(`
Acebrophylline 100 mg Capsules
Acetazolamide 250 mg (Sustained Release) Capsules
Caroverine 20 mg Capsules
Dexlansoprazole 60 mg Delayed Release Capsules
Diacerein 50 mg Capsules
Esomeprazole 40 mg (Enteric Coated) & Domperidone 30 mg (Sustained Release) Capsules
Esomeprazole 40 mg (Enteric Coated) & Levosulpiride 75 mg (Sustained Release) Capsules
Flupirtine Maleate 100 mg Capsules
Indomethacin 75 mg (Sustained Release) Capsules
Itraconazole 50 mg Capsules
Itraconazole 100 mg Capsules
Itraconazole 200 mg Capsules
L-Carnitine 500 mg, Coenzyme Q10 100 mg, Vitamin K2-7 50 mcg, Astaxanthin 8 mg, Magnesium Sulphate 50 mg & Zinc Sulphate Monohydrate 7.5 mg Capsules
Methylcobalamin 1500 mcg, Alpha Lipoic Acid 100 mg, Inositol 100 mg, Benfotiamine 150 mg, Folic Acid 1.5 mg, Chromium 200 mg & Selenium 55 mg Capsules
Methylcobalamin 750 mg, Pregabalin 75 mg, Vitamin B6 1.5 mg, Folic Acid 750 mcg & Benfotiamine 7.5 mg Capsules
Mecobalamin 500 mcg with Gabapentin 300 mg Capsules
Omeprazole 20 mg Capsules
Omeprazole 20 mg (EC) & Domperidone 30 mg (SR) Capsules
Pantoprazole 40 mg Gastro-Resistant & Domperidone 30 mg Prolonged-Release Capsules
Pantoprazole 40 mg (EC) & Levosulpiride 75 mg (SR) Capsules
Pregabalin 75 mg & Methylcobalamin 750 mcg Capsules
Rabeprazole Sodium 20 mg (EC) & Diclofenac Sodium 100 mg (SR) Capsules
Rabeprazole Sodium 20 mg (Enteric Coated) & Domperidone 30 mg (Sustained Release) Capsules
Rabeprazole Sodium 20 mg (Enteric Coated) & Levosulpiride 75 mg (Sustained Release) Capsules
Rosuvastatin Calcium 10 mg & Aspirin 75 mg Capsules
Rosuvastatin 20 mg, Clopidogrel 75 mg & Aspirin 75 mg Capsules
Silodosin 8 mg Capsules
Silodosin 8 mg & Dutasteride 0.5 mg Capsules
Tamsulosin Hydrochloride 0.2 mg Prolonged-Release Capsules IP
Tamsulosin Hydrochloride 0.4 mg Prolonged-Release Capsules IP
Tamsulosin Hydrochloride 0.4 mg Prolonged-Release & Dutasteride 0.5 mg Capsules
`);

export interface FormulationList {
  id: string;
  label: string;
  items: string[];
}

/** One dialog per dosage-form card on the Manufacturing page; each can hold several lists (tabs). */
export const FORMULATIONS: Record<'drops' | 'ointments' | 'nasal' | 'oral', FormulationList[]> = {
  drops: [
    { id: 'eye', label: 'Eye & ear drops', items: EYE_EAR_DROPS },
    { id: 'ear', label: 'Ear drops', items: EAR_DROPS },
  ],
  ointments: [{ id: 'ointments', label: 'Eye ointments & gels', items: OINTMENTS }],
  nasal: [{ id: 'nasal', label: 'Nasal sprays & drops', items: NASAL }],
  oral: [
    { id: 'tablets', label: 'Tablets', items: TABLETS },
    { id: 'capsules', label: 'Capsules', items: CAPSULES },
  ],
};

export const FORMULATION_TOTAL = Object.values(FORMULATIONS)
  .flat()
  .reduce((n, l) => n + l.items.length, 0);

/** Short tag for the common variants; anything else in end brackets is shown as written. */
const VARIANT_TAGS: [RegExp, string][] = [
  [/^bkc free$/i, 'BKC-free'],
  [/^with bkc$/i, 'With BKC'],
  [/^preservative free$/i, 'Preservative-free'],
  [/preserved with ionic buffered system/i, 'Ionic-buffer preserved'],
];

/** "Timolol 0.5% Eye Drops (BKC FREE)" → { name: "Timolol 0.5% Eye Drops", variant: "BKC-free" }. */
export function splitVariant(line: string): { name: string; variant?: string } {
  const m = line.match(/^(.*\S)\s+\(([^()]+)\)$/);
  // keep brackets that belong to the name, e.g. "(Omega-3)" or "(Salmon)", when nothing follows a dosage word
  if (!m || !/(drops|solution|suspension|emulsion|ointment|gel|spray|tablets|capsules|usp|ip)$/i.test(m[1])) return { name: line };
  const tag = VARIANT_TAGS.find(([re]) => re.test(m[2]))?.[1] ?? m[2];
  return { name: m[1], variant: tag };
}
