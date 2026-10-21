import type { Metadata } from 'next';

// The CMS editor is private — keep it out of search results.
export const metadata: Metadata = {
  title: 'Studio',
  robots: { index: false, follow: false },
};

export default function StudioLayout({ children }: { children: React.ReactNode }) {
  return children;
}
