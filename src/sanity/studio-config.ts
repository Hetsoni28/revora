import { defineConfig } from 'sanity';
import { structureTool, type StructureBuilder } from 'sanity/structure';
import { visionTool } from '@sanity/vision';
import { schemaTypes } from './schemas';
import { qrCodesTool } from './qr-tool';
import { insightsTool } from './insights-tool';

// Saved by the website, not created or copied in the Studio.
const SYSTEM_TYPES = ['whatsapp', 'enquiry', 'qrScans'];

/** One status list in the enquiry inbox, newest first. */
const enquiryList = (S: StructureBuilder, title: string, filter: string) =>
  S.listItem()
    .title(title)
    .id(`enquiries-${title.toLowerCase()}`)
    .child(
      S.documentList()
        .title(title)
        .schemaType('enquiry')
        .filter(`_type == "enquiry" && ${filter}`)
        .defaultOrdering([{ field: 'receivedAt', direction: 'desc' }])
    );

const config = defineConfig({
  name: 'revora-healthcare',
  title: 'Revora Healthcare CMS',
  projectId: 'hi6d4ijd',
  dataset: 'production',
  basePath: '/studio',
  plugins: [
    structureTool({
      structure: (S) =>
        S.list()
          .title('Content')
          .items([
            // website enquiries, by status (private: only signed-in Studio users can read them)
            S.listItem()
              .title('Enquiries')
              .id('enquiries')
              .child(
                S.list()
                  .title('Enquiries')
                  .items([
                    enquiryList(S, 'New', '(status == "new" || !defined(status))'),
                    enquiryList(S, 'Contacted', 'status == "contacted"'),
                    enquiryList(S, 'Closed', 'status == "closed"'),
                    S.divider(),
                    enquiryList(S, 'All', 'true'),
                  ])
              ),
            // "WhatsApp chat" is one settings page, not a list of documents
            S.listItem().title('WhatsApp chat').id('whatsappSettings').child(S.document().schemaType('whatsapp').documentId('whatsappSettings')),
            S.divider(),
            ...S.documentTypeListItems().filter((item) => !SYSTEM_TYPES.includes(item.getId() ?? '')),
          ]),
    }),
    visionTool(),
  ],
  // settings, enquiries and scan counts can't be created, copied or (settings) deleted by hand
  document: {
    newDocumentOptions: (prev) => prev.filter((t) => !SYSTEM_TYPES.includes(t.templateId)),
    actions: (prev, ctx) => {
      if (ctx.schemaType === 'whatsapp') return prev.filter((a) => a.action !== 'duplicate' && a.action !== 'delete');
      if (ctx.schemaType === 'enquiry' || ctx.schemaType === 'qrScans') return prev.filter((a) => a.action !== 'duplicate');
      return prev;
    },
  },
  // "Insights": enquiries per month and pack QR scans. "QR codes": download every product's pack QR code.
  tools: (prev) => [...prev, insightsTool, qrCodesTool],
  schema: { types: schemaTypes },
});

export default config;
