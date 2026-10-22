import { Suspense } from 'react';
import { getCatalogue } from '@/lib/sanity';
import { CatalogueProvider } from './catalogue-context';

async function LoadCatalogue({ children }: { children: React.ReactNode }) {
  return <CatalogueProvider catalogue={await getCatalogue()}>{children}</CatalogueProvider>;
}

/**
 * Loads the Sanity catalogue once for the whole site. The cached result is part of the prerendered
 * page; only on a cold cache does the page first render without it and stream the lists in.
 */
export function WithCatalogue({ children }: { children: React.ReactNode }) {
  return (
    <Suspense fallback={children}>
      <LoadCatalogue>{children}</LoadCatalogue>
    </Suspense>
  );
}
