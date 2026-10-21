import { ImageResponse } from 'next/og';
import { readFile } from 'node:fs/promises';
import { join } from 'node:path';

// Site-wide share image (link previews on WhatsApp, LinkedIn, X, etc.). Product pages use their own photo.
export const alt = 'Revora Healthcare — ophthalmic pharmaceuticals from Ahmedabad, India';
export const size = { width: 1200, height: 630 };
export const contentType = 'image/png';

export default async function Image() {
  const logo = await readFile(join(process.cwd(), 'public/logo.png'));
  const logoSrc = `data:image/png;base64,${logo.toString('base64')}`;

  return new ImageResponse(
    (
      <div
        style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
          background: '#FFFFFF',
          padding: '72px 80px 0',
        }}
      >
        {/* eslint-disable-next-line @next/next/no-img-element -- ImageResponse renders plain <img> */}
        <img src={logoSrc} alt="" width={330} height={110} />
        <div style={{ display: 'flex', flexDirection: 'column' }}>
          <div style={{ fontSize: 68, fontWeight: 800, color: '#1E242B', lineHeight: 1.05, letterSpacing: -2 }}>Ophthalmic pharmaceuticals</div>
          <div style={{ fontSize: 68, fontWeight: 800, color: '#0B4A8F', lineHeight: 1.05, letterSpacing: -2 }}>from Ahmedabad, India.</div>
          <div style={{ marginTop: 28, fontSize: 30, color: '#4A5568' }}>
            Eye drops for infection, inflammation and dry eye · WHO-GMP plant
          </div>
        </div>
        <div style={{ display: 'flex', height: 18, marginLeft: -80, marginRight: -80 }}>
          <div style={{ flex: 3, background: '#0B4A8F' }} />
          <div style={{ flex: 1, background: '#D7262E' }} />
        </div>
      </div>
    ),
    size
  );
}
