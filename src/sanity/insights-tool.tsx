import { useEffect, useMemo, useState } from 'react';
import { useClient } from 'sanity';
import { Badge, Box, Card, Flex, Grid, Heading, Spinner, Stack, Text } from '@sanity/ui';
import { BarChartIcon } from '@sanity/icons/BarChart';

// Both are private documents (dotted ids): only people signed in to the Studio can read them.
const QUERY = `{
  "enquiries": *[_type == "enquiry"]{ form, status, receivedAt },
  "scans": *[_type == "qrScans"]{ name, slug, month, count }
}`;

interface Data {
  enquiries: { form?: string; status?: string; receivedAt?: string }[];
  scans: { name?: string; slug: string; month: string; count?: number }[];
}

const monthKey = (d: Date) => d.toISOString().slice(0, 7);
const monthLabel = (key: string) => new Date(`${key}-01T00:00:00Z`).toLocaleDateString('en-IN', { month: 'short', year: 'numeric', timeZone: 'UTC' });

/** The last six months, newest first ("2026-11", "2026-10", …). */
function lastMonths(n = 6) {
  const now = new Date();
  return Array.from({ length: n }, (_, i) => monthKey(new Date(Date.UTC(now.getUTCFullYear(), now.getUTCMonth() - i, 1))));
}

/** Studio tab: enquiries per month by form and status, and pack QR scans per product. */
function InsightsTool() {
  const base = useClient({ apiVersion: '2024-10-01' });
  const client = useMemo(() => base.withConfig({ perspective: 'raw' }), [base]);
  const [data, setData] = useState<Data | null>(null);
  const [error, setError] = useState('');

  useEffect(() => {
    client.fetch<Data>(QUERY).then(setData, (e: Error) => setError(e.message));
  }, [client]);

  const months = lastMonths();
  const thisMonth = months[0];
  const lastMonth = months[1];

  // small lists, so these are simply worked out on each render
  const enquiryTable = data
    ? {
        forms: [...new Set(data.enquiries.map((e) => e.form ?? 'Other'))].sort(),
        count: (form: string, m: string) => data.enquiries.filter((e) => (e.form ?? 'Other') === form && e.receivedAt?.startsWith(m)).length,
      }
    : null;

  const scanRows = (() => {
    if (!data) return [];
    const bySlug = new Map<string, { name: string; total: number; thisMonth: number; lastMonth: number }>();
    for (const s of data.scans) {
      const row = bySlug.get(s.slug) ?? { name: s.name ?? s.slug, total: 0, thisMonth: 0, lastMonth: 0 };
      const n = s.count ?? 0;
      row.total += n;
      if (s.month === thisMonth) row.thisMonth += n;
      if (s.month === lastMonth) row.lastMonth += n;
      bySlug.set(s.slug, row);
    }
    return [...bySlug.values()].sort((a, b) => b.total - a.total);
  })();

  const status = (s: string) => data?.enquiries.filter((e) => (e.status ?? 'new') === s).length ?? 0;
  const cell = { padding: '8px 10px', borderBottom: '1px solid var(--card-border-color)', textAlign: 'right' as const };
  const head = { ...cell, fontWeight: 600, color: 'var(--card-muted-fg-color)' };

  return (
    <Box padding={[4, 5]} style={{ overflowY: 'auto', height: '100%' }}>
      <Stack gap={5} style={{ maxWidth: 1100, margin: '0 auto' }}>
        <Stack gap={3}>
          <Heading size={3}>Insights</Heading>
          <Text muted size={1}>
            Enquiries from the website forms and scans of the pack QR codes. Visitor numbers and top pages are in Vercel → your project →
            Analytics.
          </Text>
        </Stack>

        {error && (
          <Card tone="critical" padding={4} radius={2}>
            <Text>{error}</Text>
          </Card>
        )}
        {!data && !error && (
          <Flex justify="center" padding={6}>
            <Spinner />
          </Flex>
        )}

        {data && enquiryTable && (
          <>
            <Grid gridTemplateColumns={[1, 3]} gap={3}>
              {[
                ['New — to contact', status('new'), 'primary'],
                ['Contacted', status('contacted'), 'caution'],
                ['Closed', status('closed'), 'positive'],
              ].map(([label, n, tone]) => (
                <Card key={label as string} padding={4} radius={3} shadow={1} tone={tone as 'primary'}>
                  <Stack gap={3}>
                    <Text muted size={1}>{label}</Text>
                    <Heading size={4}>{n}</Heading>
                  </Stack>
                </Card>
              ))}
            </Grid>

            <Card padding={4} radius={3} shadow={1}>
              <Stack gap={4}>
                <Heading size={1}>Enquiries per month</Heading>
                {enquiryTable.forms.length === 0 ? (
                  <Text muted size={1}>No enquiries yet. They appear here as soon as someone sends a form on the website.</Text>
                ) : (
                  <Box style={{ overflowX: 'auto' }}>
                    <table style={{ borderCollapse: 'collapse', width: '100%', fontSize: 14 }}>
                      <thead>
                        <tr>
                          <th style={{ ...head, textAlign: 'left' }}>Form</th>
                          {months.map((m) => (
                            <th key={m} style={head}>{monthLabel(m)}</th>
                          ))}
                        </tr>
                      </thead>
                      <tbody>
                        {enquiryTable.forms.map((f) => (
                          <tr key={f}>
                            <td style={{ ...cell, textAlign: 'left' }}>{f}</td>
                            {months.map((m) => (
                              <td key={m} style={cell}>{enquiryTable.count(f, m) || '–'}</td>
                            ))}
                          </tr>
                        ))}
                        <tr>
                          <td style={{ ...cell, textAlign: 'left', fontWeight: 600 }}>Total</td>
                          {months.map((m) => (
                            <td key={m} style={{ ...cell, fontWeight: 600 }}>
                              {data.enquiries.filter((e) => e.receivedAt?.startsWith(m)).length || '–'}
                            </td>
                          ))}
                        </tr>
                      </tbody>
                    </table>
                  </Box>
                )}
              </Stack>
            </Card>

            <Card padding={4} radius={3} shadow={1}>
              <Stack gap={4}>
                <Flex align="center" gap={3}>
                  <Heading size={1}>Pack QR code scans</Heading>
                  <Badge tone="primary">{scanRows.reduce((n, r) => n + r.total, 0)} total</Badge>
                </Flex>
                {scanRows.length === 0 ? (
                  <Text muted size={1}>No scans yet. Each scan of a pack QR code is counted here.</Text>
                ) : (
                  <Box style={{ overflowX: 'auto' }}>
                    <table style={{ borderCollapse: 'collapse', width: '100%', fontSize: 14 }}>
                      <thead>
                        <tr>
                          <th style={{ ...head, textAlign: 'left' }}>Product</th>
                          <th style={head}>{monthLabel(thisMonth)}</th>
                          <th style={head}>{monthLabel(lastMonth)}</th>
                          <th style={head}>All time</th>
                        </tr>
                      </thead>
                      <tbody>
                        {scanRows.map((r) => (
                          <tr key={r.name}>
                            <td style={{ ...cell, textAlign: 'left' }}>{r.name}</td>
                            <td style={cell}>{r.thisMonth || '–'}</td>
                            <td style={cell}>{r.lastMonth || '–'}</td>
                            <td style={{ ...cell, fontWeight: 600 }}>{r.total}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </Box>
                )}
              </Stack>
            </Card>
          </>
        )}
      </Stack>
    </Box>
  );
}

export const insightsTool = { name: 'insights', title: 'Insights', icon: BarChartIcon, component: InsightsTool };
