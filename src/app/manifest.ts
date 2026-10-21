import type { MetadataRoute } from 'next';

/** /manifest.webmanifest — name, colours and icons for "Add to home screen" and search apps. */
export default function manifest(): MetadataRoute.Manifest {
  return {
    name: 'Revora Healthcare',
    short_name: 'Revora',
    description: 'Ophthalmic pharmaceuticals from Ahmedabad — eye drops, eye gel and retinal nutrition.',
    start_url: '/',
    display: 'standalone',
    background_color: '#F6F9FC',
    theme_color: '#0B4A8F',
    lang: 'en-IN',
    categories: ['health', 'medical', 'business'],
    icons: [
      { src: '/icon.png', sizes: '512x512', type: 'image/png' },
      { src: '/apple-icon.png', sizes: '180x180', type: 'image/png' },
      { src: '/icon.svg', sizes: 'any', type: 'image/svg+xml' },
    ],
  };
}
