import { defineType, defineField, defineArrayMember } from 'sanity';

/** One document (id "whatsappSettings"): the floating WhatsApp button's number and its ready-made messages. */
export const whatsapp = defineType({
  name: 'whatsapp',
  title: 'WhatsApp chat',
  type: 'document',
  fields: [
    defineField({
      name: 'enabled',
      title: 'Show the WhatsApp button',
      type: 'boolean',
      initialValue: true,
    }),
    defineField({
      name: 'number',
      title: 'WhatsApp number',
      description: 'Country code + number, digits only. Example: 918866644642',
      type: 'string',
      validation: (r) =>
        r.required().custom((v) => (!v || /^\d{10,15}$/.test(v) ? true : 'Digits only, with the country code (e.g. 918866644642)')),
    }),
    defineField({
      name: 'label',
      title: 'Button label',
      description: 'Shown beside the button when a mouse hovers over it.',
      type: 'string',
      initialValue: 'Chat on WhatsApp',
    }),
    defineField({
      name: 'productMessage',
      title: 'Message on product pages',
      description: 'Use {product} for the brand name and {generic} for the generic name.',
      type: 'text',
      rows: 3,
    }),
    defineField({
      name: 'innovationMessage',
      title: 'Message on innovation product pages',
      description: 'Use {product} for the product name.',
      type: 'text',
      rows: 3,
    }),
    defineField({
      name: 'pages',
      title: 'Messages for specific pages',
      description: 'The page path (e.g. /channel-partner) and its message. Sub-pages use their parent’s message unless listed.',
      type: 'array',
      of: [
        defineArrayMember({
          type: 'object',
          name: 'pageMessage',
          fields: [
            defineField({
              name: 'path',
              title: 'Page path',
              type: 'string',
              validation: (r) => r.required().custom((v) => (!v || v.startsWith('/') ? true : 'Start with / (e.g. /careers)')),
            }),
            defineField({ name: 'message', title: 'Message', type: 'text', rows: 3, validation: (r) => r.required() }),
          ],
          preview: { select: { title: 'path', subtitle: 'message' } },
        }),
      ],
    }),
    defineField({
      name: 'defaultMessage',
      title: 'Message on every other page',
      type: 'text',
      rows: 3,
      validation: (r) => r.required(),
    }),
  ],
  preview: { prepare: () => ({ title: 'WhatsApp chat' }) },
});
