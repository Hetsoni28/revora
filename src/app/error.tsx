'use client'; // Error boundaries must be Client Components

import { useEffect } from 'react';
import { RotateCw } from 'lucide-react';
import { Navbar } from '@/components/layout/navbar';
import { Footer } from '@/components/layout/footer';
import { Button } from '@/components/ui/button';
import { StateScreen } from '@/components/ui/states';

/** Any page that fails to render or load (server errors, failed requests) lands here. */
export default function Error({ error, retry }: { error: unknown; retry: () => void }) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  const digest = error instanceof Error && 'digest' in error ? String((error as Error & { digest?: string }).digest ?? '') : '';
  const offline = typeof navigator !== 'undefined' && !navigator.onLine;

  return (
    <div className="flex min-h-screen flex-col bg-[#F6F9FC]">
      <Navbar />
      <main id="main" tabIndex={-1} className="flex-1">
        <StateScreen
          code={offline ? 'Offline' : '500'}
          eyebrow={offline ? 'No connection' : 'Something went wrong'}
          title={offline ? 'You’re offline.' : 'This page didn’t load.'}
          text={
            offline
              ? 'Check your internet connection, then try again.'
              : 'Our server had a problem showing this page. Please try again in a moment.'
          }
          actions={
            <>
              <Button onClick={() => retry()} icon={<RotateCw />}>Try again</Button>
              <Button href="/" variant="outline">Back to home</Button>
            </>
          }
        >
          {digest && <p className="mt-8 font-mono text-[12px] text-revora-slate-muted">Reference: {digest}</p>}
        </StateScreen>
      </main>
      <Footer />
    </div>
  );
}
