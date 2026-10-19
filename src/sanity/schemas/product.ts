import { defineType, defineField } from 'sanity';

export const product = defineType({
  name: 'product',
  title: 'Product',
  type: 'document',
  fields: [
    defineField({ name: 'id', title: 'Product ID / Slug', type: 'slug', options: { source: 'name' }, validation: (r) => r.required() }),
    defineField({ name: 'name', title: 'Brand Name', type: 'string', validation: (r) => r.required() }),
    defineField({ name: 'genericName', title: 'Generic / Pharmacological Name', type: 'string', validation: (r) => r.required() }),
    defineField({
      name: 'category',
      title: 'Therapy Category',
      type: 'reference',
      to: [{ type: 'therapyCategory' }],
      validation: (r) => r.required(),
    }),
    defineField({ name: 'badge', title: 'Badge Label', type: 'string' }),
    defineField({ name: 'volume', title: 'Pack Size / Volume', type: 'string' }),
    defineField({
      name: 'image',
      title: 'Product Image',
      type: 'image',
      options: { hotspot: true },
    }),
    defineField({ name: 'color', title: 'Brand Color (hex)', type: 'string' }),
    defineField({ name: 'tagline', title: 'Clinical Tagline', type: 'string' }),
    defineField({ name: 'summary', title: 'Product Summary', type: 'text', rows: 5 }),
    defineField({
      name: 'composition',
      title: 'Composition',
      type: 'array',
      of: [{ type: 'string' }],
    }),
    defineField({ name: 'mechanismOfAction', title: 'Mechanism of Action', type: 'text', rows: 4 }),
    defineField({
      name: 'indications',
      title: 'Indications',
      type: 'array',
      of: [{ type: 'string' }],
    }),
    defineField({ name: 'dosage', title: 'Dosage & Administration', type: 'text', rows: 3 }),
    defineField({ name: 'storage', title: 'Storage Conditions', type: 'string' }),
    defineField({ name: 'packaging', title: 'Packaging Description', type: 'string' }),
    defineField({ name: 'schedule', title: 'Schedule / Regulatory Status', type: 'string' }),
    defineField({
      name: 'order',
      title: 'Display Order (within category)',
      type: 'number',
    }),
  ],
  preview: {
    select: {
      title: 'name',
      subtitle: 'genericName',
      media: 'image',
    },
  },
});
