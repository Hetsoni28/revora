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
  plugins: [
    structureTool({
      // "WhatsApp chat" is one settings page, not a list of documents
      structure: (S) =>
        S.list()
          .title('Content')
          .items([
            S.listItem().title('WhatsApp chat').id('whatsappSettings').child(S.document().schemaType('whatsapp').documentId('whatsappSettings')),
            S.divider(),
            ...S.documentTypeListItems().filter((item) => item.getId() !== 'whatsapp'),
          ]),
    }),
    visionTool(),
  ],
  // the WhatsApp settings page can't be duplicated or created again from "New document"
  document: {
    newDocumentOptions: (prev) => prev.filter((t) => t.templateId !== 'whatsapp'),
    actions: (prev, ctx) => (ctx.schemaType === 'whatsapp' ? prev.filter((a) => a.action !== 'duplicate' && a.action !== 'delete') : prev),
  },
  // "QR codes" tab: download every product's pack QR code (only editors signed in to the Studio see it)
  tools: (prev) => [...prev, qrCodesTool],
  schema: { types: schemaTypes },
});

export default config;
