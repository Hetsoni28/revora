import { defineArrayMember, defineField, defineType } from 'sanity';
import { FEATURE_ICONS, INNOVATION_CATEGORIES, USE_ICONS } from '../../lib/innovation-products';

/**
 * One product on the Innovation page (warmers, cooling, field kits, field food).
 * Everything here should match what is printed on the pack.
 */
export const innovationProduct = defineType({
  name: 'innovationProduct',
  title: 'Innovation product',
  type: 'document',
  groups: [
    { name: 'basics', title: 'Basics', default: true },
    { name: 'pack', title: 'Pack & photo' },
    { name: 'features', title: 'Features & uses' },
    { name: 'faqs', title: 'FAQs' },
  ],
  fields: [
    defineField({
      name: 'name',
      title: 'Name',
      description: 'First part of the name, e.g. "Hand" or "InstaHot®".',
      type: 'string',
      group: 'basics',
      validation: (r) => r.required().max(40),
    }),
    defineField({
      name: 'accent',
      title: 'Highlighted part of the name',
      description: 'Shown in red after the name, e.g. "Warmer" or "Cooking Bowl".',
      type: 'string',
      group: 'basics',
      validation: (r) => r.max(30),
    }),
    defineField({
      name: 'slug',
      title: 'URL id',
      description: 'Used in links like /innovation#hand-warmer.',
      type: 'slug',
      group: 'basics',
      options: { source: (doc) => [doc.name, doc.accent].filter(Boolean).join(' ') },
      validation: (r) => r.required(),
    }),
    defineField({
      name: 'category',
      title: 'Range',
      type: 'string',
      group: 'basics',
      options: { list: INNOVATION_CATEGORIES.map((c) => ({ title: c, value: c })), layout: 'radio' },
      validation: (r) => r.required(),
    }),
    defineField({ name: 'tagline', title: 'Tagline', description: 'One short line, e.g. "Self-heating warmer pad".', type: 'string', group: 'basics', validation: (r) => r.required().max(60) }),
    defineField({ name: 'description', title: 'Short description', type: 'text', rows: 2, group: 'basics', validation: (r) => r.required().max(160) }),
    defineField({ name: 'order', title: 'Order within its range', description: 'Lower numbers come first.', type: 'number', group: 'basics' }),

    defineField({
      name: 'image',
      title: 'Pack photo',
      type: 'image',
      group: 'pack',
      options: { hotspot: true },
      fields: [defineField({ name: 'alt', title: 'Describe the photo', type: 'string', validation: (r) => r.required().max(140) })],
      validation: (r) => r.required(),
    }),
    defineField({ name: 'square', title: 'Square photo', description: 'Turn on for 1:1 pack shots so nothing is cropped.', type: 'boolean', group: 'pack', initialValue: false }),
    defineField({ name: 'pack', title: 'Pack contents', description: 'e.g. "10 single-use warmer pads".', type: 'string', group: 'pack', validation: (r) => r.required().max(60) }),
    defineField({ name: 'badge', title: 'Pack badge', description: 'e.g. "Specially made for Indian Army".', type: 'string', group: 'pack', validation: (r) => r.max(60) }),
    defineField({
      name: 'includes',
      title: 'What’s in the kit',
      description: 'Only for kits — one item per line.',
      type: 'array',
      group: 'pack',
      of: [defineArrayMember({ type: 'string' })],
    }),
    defineField({ name: 'highlight', title: 'Photo caption', description: 'e.g. "Ideal for extreme cold conditions".', type: 'string', group: 'pack', validation: (r) => r.max(60) }),

    defineField({
      name: 'features',
      title: 'Features',
      description: 'Up to 4, as printed on the pack.',
      type: 'array',
      group: 'features',
      validation: (r) => r.required().min(1).max(4),
      of: [
        defineArrayMember({
          type: 'object',
          fields: [
            defineField({ name: 'icon', title: 'Icon', type: 'string', options: { list: [...FEATURE_ICONS] }, validation: (r) => r.required() }),
            defineField({ name: 'label', title: 'Small text', description: 'e.g. "Heats up to".', type: 'string', validation: (r) => r.required().max(24) }),
            defineField({ name: 'value', title: 'Main text', description: 'e.g. "36°C – 42°C".', type: 'string', validation: (r) => r.required().max(24) }),
          ],
          preview: { select: { title: 'value', subtitle: 'label' } },
        }),
      ],
    }),
    defineField({
      name: 'uses',
      title: 'Made for',
      type: 'array',
      group: 'features',
      validation: (r) => r.max(5),
      of: [
        defineArrayMember({
          type: 'object',
          fields: [
            defineField({ name: 'icon', title: 'Icon', type: 'string', options: { list: [...USE_ICONS] }, validation: (r) => r.required() }),
            defineField({ name: 'label', title: 'Text', description: 'e.g. "Defence personnel".', type: 'string', validation: (r) => r.required().max(40) }),
          ],
          preview: { select: { title: 'label', subtitle: 'icon' } },
        }),
      ],
    }),

    defineField({
      name: 'faqs',
      title: 'FAQs',
      type: 'array',
      group: 'faqs',
      of: [
        defineArrayMember({
          type: 'object',
          fields: [
            defineField({ name: 'q', title: 'Question', type: 'string', validation: (r) => r.required().max(90) }),
            defineField({ name: 'a', title: 'Answer', type: 'text', rows: 2, validation: (r) => r.required().max(240) }),
          ],
          preview: { select: { title: 'q', subtitle: 'a' } },
        }),
      ],
    }),
  ],
  orderings: [
    { title: 'Range, then order', name: 'rangeOrder', by: [{ field: 'category', direction: 'asc' }, { field: 'order', direction: 'asc' }] },
  ],
  preview: {
    select: { name: 'name', accent: 'accent', category: 'category', media: 'image' },
    prepare: ({ name, accent, category, media }) => ({ title: [name, accent].filter(Boolean).join(' '), subtitle: category, media }),
  },
});
