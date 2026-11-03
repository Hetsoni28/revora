import { defineType, defineField, defineArrayMember } from 'sanity';

export const ENQUIRY_STATUSES = [
  { title: 'New', value: 'new' },
  { title: 'Contacted', value: 'contacted' },
  { title: 'Closed', value: 'closed' },
];

/**
 * A website enquiry, saved by /api/enquiry. Private: its _id has a dot (enquiry.…), so only people
 * signed in to the Studio can read it. What the visitor sent is read-only; the team sets the status
 * and keeps notes. Changes save straight away (no Publish step).
 */
export const enquiry = defineType({
  name: 'enquiry',
  title: 'Enquiry',
  type: 'document',
  liveEdit: true,
  fields: [
    defineField({
      name: 'status',
      title: 'Status',
      type: 'string',
      options: { list: ENQUIRY_STATUSES, layout: 'radio', direction: 'horizontal' },
      initialValue: 'new',
    }),
    defineField({ name: 'notes', title: 'Team notes', description: 'Who called back, what was agreed, next step.', type: 'text', rows: 4 }),
    defineField({ name: 'form', title: 'Form', type: 'string', readOnly: true }),
    defineField({ name: 'receivedAt', title: 'Received', type: 'datetime', readOnly: true }),
    defineField({ name: 'name', title: 'Name', type: 'string', readOnly: true }),
    defineField({ name: 'organisation', title: 'Organisation', type: 'string', readOnly: true }),
    defineField({ name: 'email', title: 'Email', type: 'string', readOnly: true }),
    defineField({ name: 'phone', title: 'Phone', type: 'string', readOnly: true }),
    defineField({ name: 'message', title: 'Message', type: 'text', rows: 5, readOnly: true }),
    defineField({
      name: 'details',
      title: 'All details sent',
      type: 'array',
      readOnly: true,
      of: [
        defineArrayMember({
          type: 'object',
          name: 'detail',
          fields: [
            defineField({ name: 'label', type: 'string' }),
            defineField({ name: 'value', type: 'string' }),
          ],
          preview: { select: { title: 'value', subtitle: 'label' } },
        }),
      ],
    }),
    defineField({ name: 'attachment', title: 'Attachment (in the email)', type: 'string', readOnly: true }),
    defineField({ name: 'page', title: 'Sent from page', type: 'string', readOnly: true }),
    defineField({ name: 'emailSent', title: 'Email delivered to the inbox', type: 'boolean', readOnly: true }),
    defineField({ name: 'kind', title: 'Form id', type: 'string', readOnly: true, hidden: true }),
  ],
  orderings: [{ title: 'Newest first', name: 'receivedDesc', by: [{ field: 'receivedAt', direction: 'desc' }] }],
  preview: {
    select: { name: 'name', form: 'form', status: 'status', at: 'receivedAt', org: 'organisation' },
    prepare: ({ name, form, status, at, org }) => ({
      title: `${name || 'Unnamed'}${org ? ` · ${org}` : ''}`,
      subtitle: `${status === 'new' ? '🔵 New' : status === 'contacted' ? '🟡 Contacted' : '✅ Closed'} · ${form ?? ''}${
        at ? ` · ${new Date(at).toLocaleDateString('en-IN', { day: 'numeric', month: 'short' })}` : ''
      }`,
    }),
  },
});

/** Pack QR scans for one product in one month, counted by /p/<slug>. Private (dotted _id), read-only. */
export const qrScans = defineType({
  name: 'qrScans',
  title: 'QR scans',
  type: 'document',
  liveEdit: true,
  readOnly: true,
  fields: [
    defineField({ name: 'name', title: 'Product', type: 'string' }),
    defineField({ name: 'slug', title: 'Slug', type: 'string' }),
    defineField({ name: 'month', title: 'Month', type: 'string' }),
    defineField({ name: 'count', title: 'Scans', type: 'number' }),
    defineField({ name: 'lastScanAt', title: 'Last scan', type: 'datetime' }),
  ],
  preview: { select: { title: 'name', month: 'month', count: 'count' }, prepare: ({ title, month, count }) => ({ title, subtitle: `${month} · ${count} scans` }) },
});
