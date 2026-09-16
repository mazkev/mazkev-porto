import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Pusat Latihan Interview & Coding Challenge | Kevin Eka Pratama',
  description:
    'Platform interaktif simulasi wawancara kerja, latihan soal teknis Backend Go & Java, sistem perbankan ACID, troubleshooting SQL PLN Icon+, dan arena tantangan coding algoritma.',
  keywords: [
    'Interview Practice',
    'Mock Interview Backend',
    'Golang Interview',
    'Coding Challenge Go',
    'Clean Architecture Go',
    'ACID Transactions PostgreSQL',
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
