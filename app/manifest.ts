import type { MetadataRoute } from 'next';

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: 'Kevin Eka Pratama | Fullstack Developer',
    short_name: 'Kevin Pratama',
    description: 'Fullstack Developer with 3 years of Application Support experience. Specializing in React, TypeScript, and Go (Golang).',
    start_url: '/',
    display: 'standalone',
    background_color: '#020617',
    theme_color: '#10b981',
    icons: [
      {
        src: '/favicon.ico',
        sizes: 'any',
        type: 'image/x-icon',
      },
      {
        src: '/profile/kev.png',
        sizes: '192x192',
        type: 'image/png',
      },
      {
        src: '/profile/kev.png',
        sizes: '512x512',
        type: 'image/png',
      },
    ],
  };
}
