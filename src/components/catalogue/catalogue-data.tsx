import { getCatalogue } from '@/lib/sanity';
import { CatalogueProvider } from './catalogue-context';

/**
 * Loads the Sanity catalogue once for the whole site. getCatalogue() is cached ('use cache'), so it
 * resolves while the page is prerendered and the lists are in the HTML from the start. No Suspense
 * here on purpose: a fallback would put a second, empty-catalogue copy of every page (showing "0"
 * counts) ahead of the real one in the HTML.
 */
export async function WithCatalogue({ children }: { children: React.ReactNode }) {
  return <CatalogueProvider catalogue={await getCatalogue()}>{children}</CatalogueProvider>;
}
