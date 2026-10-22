import { defineCliConfig } from 'sanity/cli';

// Used by the Sanity command line (e.g. `npx sanity documents query ...`), which signs in with your own Sanity account.
export default defineCliConfig({
  api: {
    projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID ?? 'hi6d4ijd',
    dataset: process.env.NEXT_PUBLIC_SANITY_DATASET ?? 'production',
  },
});
