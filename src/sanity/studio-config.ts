import { defineConfig } from 'sanity';
import { structureTool } from 'sanity/structure';
import { visionTool } from '@sanity/vision';
import { schemaTypes } from './schemas';

const config = defineConfig({
  name: 'revora-healthcare',
  title: 'Revora Healthcare CMS',
  projectId: 'hi6d4ijd',
  dataset: 'production',
  basePath: '/studio',
  plugins: [structureTool(), visionTool()],
  schema: { types: schemaTypes },
});

export default config;
