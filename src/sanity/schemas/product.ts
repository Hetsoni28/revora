import { defineType, defineField } from 'sanity';

/** One product page. Keep every field short — the page shows it as written. */
export const product = defineType({
  name: 'product',
  title: 'Product',
  type: 'document',
  fields: [
    defineField({ name: 'name', title: 'Brand name', type: 'string', validation: (r) => r.required() }),
    defineField({
      name: 'id',
      title: 'URL slug',
      description: 'The product page and QR code use it: /products/moxora and /p/moxora. Changing it breaks printed QR codes.',
      type: 'slug',
      options: { source: 'name' },
      validation: (r) => r.required(),
    }),
    defineField({ name: 'genericName', title: 'Generic name', type: 'string', validation: (r) => r.required() }),
    defineField({
      name: 'category',
      title: 'Therapy area',
      type: 'reference',
      to: [{ type: 'therapyCategory' }],
      validation: (r) => r.required(),
    }),
    defineField({
      name: 'image',
      title: 'Product photo',
      description: 'Carton and bottle, square.',
      type: 'image',
      options: { hotspot: true },
      validation: (r) => r.required(),
    }),
    defineField({
      name: 'logo',
      title: 'Brand logo',
      description: 'Transparent PNG or WebP. Shown on the homepage and product cards.',
      type: 'image',
    }),
    defineField({ name: 'badge', title: 'Type', description: 'e.g. Antibacterial + Steroid', type: 'string', validation: (r) => r.max(40) }),
    defineField({ name: 'volume', title: 'Pack size', description: 'e.g. 5 ml Sterile Dropper Vial', type: 'string', validation: (r) => r.max(50) }),
    defineField({
      name: 'summary',
      title: 'Short description',
      description: 'One line, up to 140 characters.',
      type: 'text',
      rows: 2,
      validation: (r) => r.max(140),
    }),
    defineField({
      name: 'composition',
      title: 'Composition',
      description: 'One ingredient per line, e.g. "Moxifloxacin 0.5% w/v".',
      type: 'array',
      of: [{ type: 'string' }],
    }),
    defineField({
      name: 'indications',
      title: 'Uses',
      description: 'Up to 3 short points.',
      type: 'array',
      of: [{ type: 'string' }],
      validation: (r) => r.max(3),
    }),
    defineField({ name: 'dosage', title: 'How to use', type: 'text', rows: 2, validation: (r) => r.max(160) }),
    defineField({ name: 'storage', title: 'Storage', type: 'string', validation: (r) => r.max(100) }),
    defineField({ name: 'schedule', title: 'Supply', description: 'e.g. Schedule H Prescription Drug', type: 'string' }),
    defineField({ name: 'order', title: 'Order in therapy area', type: 'number' }),
  ],
  preview: {
    select: {
      title: 'name',
      subtitle: 'genericName',
      media: 'image',
    },
  },
});
