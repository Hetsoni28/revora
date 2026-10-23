import { defineConfig } from 'sanity';
import { structureTool } from 'sanity/structure';
import { visionTool } from '@sanity/vision';
import { schemaTypes } from './schemas';
import { qrCodesTool } from './qr-tool';

const config = defineConfig({
  name: 'revora-healthcare',
  title: 'Revora Healthcare CMS',
  projectId: 'hi6d4ijd',
  dataset: 'production',
  basePath: '/studio',
  plugins: [structureTool(), visionTool()],
  // "QR codes" tab: download every product's pack QR code (only editors signed in to the Studio see it)
  tools: (prev) => [...prev, qrCodesTool],
  schema: { types: schemaTypes },
});

export default config;
