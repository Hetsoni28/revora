import { PageLoader } from '@/components/ui/states';

/**
 * Shown while a page's content is still on its way (slow network, first visit to a product).
 * Keep it free of URL hooks (no navbar): it renders outside any Suspense boundary.
 */
export default function Loading() {
  return (
    <div className="flex min-h-screen flex-col bg-[#F6F9FC]">
      <PageLoader />
    </div>
  );
}
