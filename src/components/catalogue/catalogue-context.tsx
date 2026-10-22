'use client';

import { createContext, useContext } from 'react';
import { EMPTY_CATALOGUE, type Catalogue } from '@/lib/catalogue';

const CatalogueContext = createContext<Catalogue>(EMPTY_CATALOGUE);

/** Shares the Sanity catalogue (see catalogue-data.tsx) with every client component. */
export function CatalogueProvider({ catalogue, children }: { catalogue: Catalogue; children: React.ReactNode }) {
  return <CatalogueContext.Provider value={catalogue}>{children}</CatalogueContext.Provider>;
}

/** Therapy areas, eye-care products and innovation products, as published in Sanity. */
export function useCatalogue(): Catalogue {
  return useContext(CatalogueContext);
}
