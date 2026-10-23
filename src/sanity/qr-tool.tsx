import { useEffect, useMemo, useState } from 'react';
import { useClient } from 'sanity';
import { Badge, Box, Button, Card, Flex, Grid, Heading, Spinner, Stack, Text } from '@sanity/ui';
import { DownloadIcon } from '@sanity/icons/Download';
import { LaunchIcon } from '@sanity/icons/Launch';
import { ThListIcon } from '@sanity/icons/ThList';

// Same rules as the website's catalogue (lib/sanity.ts): only published products with a photo appear.
const QUERY = `{
  "products": *[_type == "product" && defined(id.current) && defined(category->slug.current) && defined(image.asset)]
    | order(category->order asc, order asc, name asc) { "slug": id.current, name, "group": category->title },
  "innovation": *[_type == "innovationProduct" && defined(slug.current) && defined(category) && defined(image.asset)]
    | order(order asc, name asc) { "slug": slug.current, "name": select(defined(accent) => name + " " + accent, name), "group": category }
}`;

interface Row {
  slug: string;
  name: string;
  group: string;
}

/** Studio tab: every product's pack QR code, ready to download for the packaging designer. */
function QrCodesTool() {
  const base = useClient({ apiVersion: '2024-10-01' });
  const client = useMemo(() => base.withConfig({ perspective: 'published' }), [base]);
  const [rows, setRows] = useState<{ products: Row[]; innovation: Row[] } | null>(null);
  const [error, setError] = useState('');

  useEffect(() => {
    client.fetch(QUERY).then(setRows, (e: Error) => setError(e.message));
  }, [client]);

  return (
    <Box padding={[4, 5]} style={{ overflowY: 'auto', height: '100%' }}>
      <Stack gap={5} style={{ maxWidth: 1100, margin: '0 auto' }}>
        <Stack gap={3}>
          <Heading size={3}>Pack QR codes</Heading>
          <Text muted size={1}>
            Each code opens a short link (revorahealthcare.com/p/…) that forwards to the product page, so printed packs keep working even
            if a page changes. Give the <strong>SVG</strong> to the packaging designer. Print at least 2 × 2 cm, dark on light, with the
            white border kept, and test-scan the printed proof. Don&apos;t change a product&apos;s URL slug after its pack is printed.
          </Text>
          <Text muted size={1}>A newly published product can take a minute or two to appear here.</Text>
        </Stack>

        {error && (
          <Card tone="critical" padding={4} radius={2}>
            <Text size={1}>Couldn&apos;t load products: {error}</Text>
          </Card>
        )}
        {!rows && !error && (
          <Flex justify="center" padding={6}>
            <Spinner muted />
          </Flex>
        )}
        {rows && <Section title="Eye-care products" rows={rows.products} />}
        {rows && <Section title="Innovation products" rows={rows.innovation} />}
      </Stack>
    </Box>
  );
}

function Section({ title, rows }: { title: string; rows: Row[] }) {
  return (
    <Stack gap={3}>
      <Heading size={1}>
        {title} <Badge>{rows.length}</Badge>
      </Heading>
      {rows.length === 0 ? (
        <Text muted size={1}>No published products yet.</Text>
      ) : (
        <Grid gridTemplateColumns={[1, 2, 3]} gap={3}>
          {rows.map((r) => (
            <QrCard key={r.slug} row={r} />
          ))}
        </Grid>
      )}
    </Stack>
  );
}

function QrCard({ row }: { row: Row }) {
  const file = `/qr/${row.slug}`;
  return (
    <Card padding={3} radius={3} shadow={1}>
      <Stack gap={3}>
        {/* always on white, like the printed pack */}
        <Box style={{ background: '#fff', borderRadius: 8, padding: 8 }}>
          {/* eslint-disable-next-line @next/next/no-img-element -- Studio UI, not a site page */}
          <img src={file} alt={`QR code for ${row.name}`} style={{ display: 'block', width: '100%', aspectRatio: '1' }} loading="lazy" />
        </Box>
        <Stack gap={2}>
          <Text weight="semibold">{row.name}</Text>
          <Text muted size={1}>{row.group}</Text>
          <Text muted size={1} style={{ wordBreak: 'break-all' }}>revorahealthcare.com/p/{row.slug}</Text>
        </Stack>
        <Flex gap={2} wrap="wrap">
          <Button as="a" href={`${file}?format=svg&download`} icon={DownloadIcon} text="SVG" tone="primary" mode="default" fontSize={1} padding={2} />
          <Button as="a" href={`${file}?format=png&download`} icon={DownloadIcon} text="PNG" mode="ghost" fontSize={1} padding={2} />
          <Button as="a" href={`/p/${row.slug}`} target="_blank" rel="noopener" icon={LaunchIcon} text="Test link" mode="bleed" fontSize={1} padding={2} />
        </Flex>
      </Stack>
    </Card>
  );
}

export const qrCodesTool = { name: 'qr-codes', title: 'QR codes', icon: ThListIcon, component: QrCodesTool };
