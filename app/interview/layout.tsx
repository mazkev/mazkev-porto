import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Pusat Latihan Interview & Simulasi Wawancara | Kevin Eka Pratama',
  description:
    'Platform interaktif simulasi wawancara kerja, latihan soal teknis Backend Go & Java, troubleshooting database SQL PLN Icon+, dan arsitektur RESTful API.',
  keywords: [
    'Interview Practice',
    'Mock Interview Backend',
    'Golang Interview',
    'Clean Architecture Go',
    'SQL Optimization PostgreSQL',
    'RESTful API Go',
    'Kevin Eka Pratama',
    'PLN Icon+ Application Support'
  ],
  openGraph: {
    title: 'Pusat Latihan Interview & Coding Challenge - Kevin Eka Pratama',
    description:
      'Simulasi mock interview interaktif, latihan soal teknis backend, dan coding arena Go & Concurrency.',
    type: 'website',
    locale: 'id_ID'
  }
};

export default function InterviewLayout({
  children
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
