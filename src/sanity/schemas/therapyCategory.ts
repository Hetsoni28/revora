import { defineType, defineField } from 'sanity';

export const therapyCategory = defineType({
  name: 'therapyCategory',
  title: 'Therapy Category',
  type: 'document',
  fields: [
    defineField({ name: 'slug', title: 'Slug', type: 'slug', options: { source: 'shortName' }, validation: (r) => r.required() }),
    defineField({ name: 'title', title: 'Full Title', type: 'string', validation: (r) => r.required() }),
    defineField({ name: 'shortName', title: 'Short Name', type: 'string', validation: (r) => r.required() }),
    defineField({
      name: 'division',
      title: 'Division',
      description: 'Groups the therapy area on the site (homepage ranges, menu, portfolio).',
      type: 'string',
      options: { list: [{ title: 'Ophthalmology', value: 'ophthalmology' }, { title: 'Orthopaedics', value: 'orthopaedics' }], layout: 'radio' },
      initialValue: 'ophthalmology',
    }),
    defineField({ name: 'subtitle', title: 'Subtitle', type: 'string' }),
    defineField({ name: 'description', title: 'Description', type: 'text', rows: 4 }),
    defineField({ name: 'clinicalRationale', title: 'Clinical Rationale', type: 'text', rows: 4 }),
    defineField({ name: 'badge', title: 'Badge Label', type: 'string' }),
    defineField({ name: 'color', title: 'Brand Color (hex)', type: 'string' }),
    defineField({
      name: 'subTherapies',
      title: 'Sub-Therapies',
      type: 'array',
      of: [{ type: 'string' }],
    }),
    defineField({
      name: 'order',
      title: 'Display Order',
      type: 'number',
      description: 'Lower number appears first',
    }),
  ],
  preview: {
    select: { title: 'title', subtitle: 'badge' },
  },
});
