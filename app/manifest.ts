import type { MetadataRoute } from 'next';

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: 'Kevin Eka Pratama | Backend & Fullstack Developer',
    short_name: 'Kevin Pratama',
    description: 'Backend & Fullstack Developer with 2+ years of Application Support experience at PT PLN Icon+. Specializing in Go (Golang), React, and TypeScript.',
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
