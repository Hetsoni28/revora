import { defineType, defineField } from 'sanity';

/**
 * Search & sharing overrides for one page. Every field is optional: left empty, the site builds the
 * title, description and share image from the product itself.
 */
export const seo = defineType({
  name: 'seo',
  title: 'Search & sharing (SEO)',
  type: 'object',
  options: { collapsible: true, collapsed: true },
  fields: [
    defineField({
      name: 'title',
      title: 'SEO title',
      description: 'Shown in Google results and browser tabs. Up to 60 characters. Leave empty to use the product name.',
      type: 'string',
      validation: (r) => r.max(60).warning('Google cuts titles longer than about 60 characters.'),
    }),
    defineField({
      name: 'description',
      title: 'Meta description',
      description: 'The line under the title in Google. 120–160 characters. Leave empty to build it from the product details.',
      type: 'text',
      rows: 3,
      validation: (r) => r.max(160).warning('Google cuts descriptions longer than about 160 characters.'),
    }),
    defineField({
      name: 'image',
      title: 'Share image',
      description: 'Shown when the page is shared on WhatsApp, LinkedIn or X. 1200 × 630 works best. Leave empty to use the product photo.',
      type: 'image',
      fields: [defineField({ name: 'alt', title: 'Describe the image', type: 'string', validation: (r) => r.max(140) })],
    }),
    defineField({
      name: 'noIndex',
      title: 'Hide from search engines',
      description: 'Turn on only for pages that shouldn’t appear in Google (e.g. a product not yet launched). Also removes it from the sitemap.',
      type: 'boolean',
      initialValue: false,
    }),
  ],
});
