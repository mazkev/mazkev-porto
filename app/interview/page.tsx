'use client';

import React, { useState, useEffect, useMemo, useRef } from 'react';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import {
  ArrowLeft,
  Volume2,
  Pause,
  CheckCircle2,
  Search,
  ChevronRight,
  UserCheck,
  Play,
  User,
  ListFilter,
  Sparkles,
  BookOpen,
  Copy,
  Check,
  ShieldCheck,
  Zap
} from 'lucide-react';
import dynamic from 'next/dynamic';
import {
  interviewQuestions,
  InterviewQuestion,
  PracticeRole,
  PracticeDifficulty,
  PracticeTopic
} from '../lib/data/interviewData';

// Dynamic Feature Loading with Skeletons
function FeatureLoadingSkeleton({ title }: { title: string }) {
  return (
    <div className="bg-white rounded-3xl border border-slate-200 p-12 text-center space-y-4 shadow-sm animate-pulse">
      <div className="w-12 h-12 rounded-2xl bg-emerald-100 text-emerald-600 mx-auto flex items-center justify-center font-bold">
        <Sparkles size={22} className="animate-spin" />
      </div>
      <div className="space-y-1">
        <div className="text-base font-extrabold text-slate-800">{title}</div>
        <p className="text-xs text-slate-400">Menyiapkan workspace interaktif...</p>
      </div>
    </div>
  );
}

const MockInterviewFeature = dynamic(() => import('./components/MockInterviewFeature'), {
  loading: () => <FeatureLoadingSkeleton title="Memuat Mock Interview..." />
});
const PracticeFeature = dynamic(() => import('./components/PracticeFeature'), {
  loading: () => <FeatureLoadingSkeleton title="Memuat Sesi Latihan..." />
});

type MainTab = 'mock' | 'practice' | 'pitch' | 'syllabus';
type LangMode = 'id' | 'en';

export interface SpokenInterviewTopic {
  id: string;
  number: number;
  badge: string;
  category: string;
  title: { id: string; en: string };
  subtitle: { id: string; en: string };
  duration: { id: string; en: string };
  script: { id: string; en: string };
  bulletPoints: { id: string[]; en: string[] };
  tips: { id: string; en: string };
}

export const spokenInterviewTopics: SpokenInterviewTopic[] = [
  {
    id: 'intro',
    number: 1,
    badge: 'Opening & Intro',
    category: 'Perkenalan Diri',
    title: {
      id: '1. Perkenalan Diri',
      en: '1. Self-Introduction'
    },
    subtitle: {
      id: 'Latar belakang S1 Amikom, 3+ tahun Application Support di PLN, pengalaman development Go & microservices, serta motivasi transisi ke Software Engineer.',
      en: 'Background from Amikom University, 3+ years Application Support at PLN, Go & microservices development experience, and transition motivation.'
    },
    duration: {
      id: 'Durasi Bicara: ~90–120 Detik (Santai & Percaya Diri)',
      en: 'Speaking Duration: ~90–120 Seconds (Natural & Confident)'
    },
    script: {
      id: `Tentu. Nama saya Kevin Eka Pratama. Saya memiliki gelar S1 Informatika dari Universitas Amikom Yogyakarta.

Saat ini saya bekerja di PLN sebagai Application Support dan sudah lebih dari tiga tahun menangani aplikasi enterprise. Tanggung jawab saya meliputi troubleshooting masalah aplikasi, bekerja dengan SQL dan database, melakukan monitoring aplikasi, serta berkoordinasi dengan developer untuk menyelesaikan masalah.

Selain pekerjaan utama, saya juga memiliki pengalaman development. Saya pernah mengembangkan aplikasi internal untuk membantu proses support, dan saya juga membangun beberapa project menggunakan Go, React, JavaScript, PostgreSQL, dan Docker. Saat ini saya lebih fokus ke backend development menggunakan Go, termasuk REST API dan microservices.

Saya tertarik dengan posisi ini karena saya ingin beralih ke posisi Software Engineer yang lebih banyak terlibat dalam proses membangun dan mengembangkan software. Saya percaya pengalaman saya dalam menangani aplikasi di lingkungan nyata, ditambah pengalaman development yang saya miliki, bisa membantu saya berkontribusi kepada tim sekaligus terus berkembang sebagai engineer.`,
      en: `Sure. My name is Kevin Eka Pratama. I hold a Bachelor's degree in Computer Science from Universitas Amikom Yogyakarta.

Currently, I work at PLN as an Application Support specialist, where I have spent over three years supporting enterprise applications. My responsibilities include troubleshooting application issues, working with SQL and relational databases, monitoring system health, and collaborating closely with developers to resolve problems.

Alongside my primary role, I have hands-on software development experience. I built internal tools to streamline our support workflows, and I have also developed several personal projects using Go, React, JavaScript, PostgreSQL, and Docker. Currently, I am deeply focused on backend engineering using Go, building RESTful APIs and microservices architectures.

I am very excited about this role because I want to transition into a dedicated Software Engineer position where I can be directly involved in designing and engineering software products. I believe my hands-on production troubleshooting experience combined with my development background will allow me to contribute immediately to your team while continuously growing as an engineer.`
    },
    bulletPoints: {
      id: [
        'Pendidikan: S1 Informatika dari Universitas Amikom Yogyakarta',
        'Pengalaman Kerja: 3+ Tahun Application Support di PLN (Enterprise App, SQL & DB, Monitoring, Dev Coordination)',
        'Pengalaman Dev: Internal tool otomasi support, project Go, React, PostgreSQL, Docker, REST API & Microservices',
        'Motivasi: Transisi ke Software Engineer untuk fokus merancang dan membangun software'
      ],
      en: [
        'Education: Bachelor of Computer Science, Universitas Amikom Yogyakarta',
        'Experience: 3+ Years Application Support at PLN (Enterprise Apps, SQL/DB, Monitoring, Dev Collaboration)',
        'Development: Internal support tools, Go projects, React, PostgreSQL, Docker, REST APIs & Microservices',
        'Motivation: Transition to Software Engineer to build and scale production systems'
      ]
    },
    tips: {
      id: 'Gunakan intonasi ramah, santai, dan jangan terdengar seperti membaca CV. Tekankan kombinasi pengalaman 3+ tahun troubleshooting di PLN dan inisiatif belajar backend Go.',
      en: 'Speak naturally and warmly without sounding like reading a resume. Highlight the unique mix of 3+ years PLN enterprise support and self-driven Go backend projects.'
    }
  },
  {
    id: 'challenge',
    number: 2,
    badge: 'Incident & SLA',
    category: 'Tantangan di Pekerjaan',
    title: {
      id: '2. Tantangan di Pekerjaan (Menghadapi Masalah)',
      en: '2. Handling Challenges on the Job'
    },
    subtitle: {
      id: 'Studi kasus penanganan aplikasi down mendadak saat jam sibuk, investigasi log dan database, koordinasi dengan developer, dan komunikasi ke user.',
      en: 'Case study handling sudden application outage during peak work hours, log and SQL DB investigation, developer coordination, and user updates.'
    },
    duration: {
      id: 'Durasi Bicara: ~90 Detik',
      en: 'Speaking Duration: ~90 Seconds'
    },
    script: {
      id: `Salah satu situasi yang saya ingat adalah ketika salah satu aplikasi tiba-tiba mengalami down saat jam kerja.

Saat itu banyak user melaporkan masalah yang sama sehingga kami menerima banyak tiket hampir secara bersamaan. Saya mulai dengan mengecek status aplikasi dan log untuk memahami apa yang terjadi. Kemudian saya melakukan pengecekan database menggunakan SQL untuk melihat apakah ada masalah yang berkaitan dengan database.

Di saat yang sama, saya berkomunikasi dengan tim developer dan memberikan informasi yang saya temukan. Saya juga memberikan update kepada user selama proses penanganan berlangsung.

Akhirnya kami menemukan root cause dan aplikasi berhasil dipulihkan. Dari pengalaman tersebut saya belajar bahwa saat terjadi incident, bukan hanya kemampuan teknis yang penting. Kita juga perlu berkomunikasi dengan jelas, menentukan prioritas, dan bekerja sama dengan tim lain.`,
      en: `One memorable situation was when a critical enterprise application went down unexpectedly during active business hours.

Multiple users reported the issue at once, creating a sudden influx of support tickets. I started by checking the application health metrics and server logs to diagnose the failure pattern. Next, I executed SQL queries to investigate whether the bottleneck originated from the database layer.

Simultaneously, I coordinated with our development team, sharing real-time diagnostic findings, while keeping end-users updated on the resolution progress to manage expectations.

We identified the root cause and successfully restored the service. That incident taught me that resolving production outages requires more than just technical troubleshooting—it demands clear communication, quick prioritization, and seamless cross-team collaboration.`
    },
    bulletPoints: {
      id: [
        'Situasi: Aplikasi enterprise down mendadak saat jam kerja dengan lonjakan tiket user bersamaan',
        'Tindakan Sistematis: Cek server status & error logs, investigasi query database SQL, koordinasi aktif dengan developer',
        'Komunikasi: Memberikan update berkala dan transparan kepada user selama mitigasi',
        'Pembelajaran: Incident management membutuhkan ketepatan prioritas, komunikasi jelas, dan kerja sama tim'
      ],
      en: [
        'Situation: Unexpected production downtime during peak hours with high ticket influx',
        'Systematic Action: Checked health status & logs, investigated SQL queries on database, coordinated with developers',
        'Communication: Provided steady, transparent status updates to users throughout recovery',
        'Takeaway: Successful incident handling relies on clear priorities, timely communication, and teamwork'
      ]
    },
    tips: {
      id: 'Tekankan ketenangan dan langkah terstruktur Anda: mulai dari cek log -> cek SQL database -> koordinasi developer -> info ke user.',
      en: 'Emphasize your structured composure: logs first -> database queries -> dev coordination -> clear user updates.'
    }
  },
  {
    id: 'disagreement',
    number: 3,
    badge: 'Collaboration',
    category: 'Perbedaan Pendapat',
    title: {
      id: '3. Kalau Berbeda Pendapat dengan Teammate',
      en: '3. Handling Disagreements with Teammates'
    },
    subtitle: {
      id: 'Menghadapi perbedaan pandangan teknis (aplikasi vs database) dengan kepala dingin, menyajikan data dan log objektif, serta fokus pada solusi.',
      en: 'Handling technical disagreements (app logic vs DB issue) objectively using data, SQL results, and error logs.'
    },
    duration: {
      id: 'Durasi Bicara: ~90 Detik',
      en: 'Speaking Duration: ~90 Seconds'
    },
    script: {
      id: `Kalau saya tidak setuju dengan teammate, biasanya saya mencoba memahami sudut pandang mereka terlebih dahulu. Setelah itu saya menyampaikan kekhawatiran atau pendapat saya berdasarkan data dan dampaknya terhadap aplikasi.

Contohnya, pernah ada masalah aplikasi di mana saya memiliki pendapat berbeda dengan developer mengenai penyebab masalah. Developer awalnya mengira masalahnya berasal dari aplikasi, sedangkan dari investigasi saya menemukan beberapa indikasi yang berkaitan dengan database.

Daripada berdebat mengenai siapa yang benar, saya menunjukkan hasil SQL dan informasi yang saya temukan dari log. Kami kemudian mendiskusikannya dan melakukan pengecekan dari kedua sisi.

Setelah dilakukan investigasi lebih lanjut, kami menemukan penyebab sebenarnya dan menentukan solusi yang tepat.

Dari pengalaman tersebut saya belajar bahwa perbedaan pendapat adalah hal yang normal dalam sebuah tim. Yang penting adalah fokus pada masalah dan bukti yang ada, bukan menjadikannya masalah pribadi.`,
      en: `Whenever I disagree with a teammate, my first step is always to listen and genuinely understand their perspective. After that, I present my viewpoint supported by concrete data and the potential impact on the system.

For instance, we once had an incident where the developer believed the root cause was in the application code, whereas my troubleshooting showed signs pointing toward the database.

Rather than arguing over who was right, I shared the exact SQL query metrics and log snippets I had gathered. We sat together to review both sides objectively.

Through that collaborative deep-dive, we pinpointed the actual root cause and applied the right fix together.

That experience reinforced that technical disagreements are natural in any healthy team. What matters most is staying objective, relying on data, and focusing on solving the problem together rather than taking things personally.`
    },
    bulletPoints: {
      id: [
        'Prinsip Utama: Memahami sudut pandang rekan terlebih dahulu sebelum berargumen',
        'Pendekatan Objektif: Menyajikan bukti nyata dari hasil SQL query dan log, bukan sekadar asumsi',
        'Kolaborasi: Diskusi dua arah dan evaluasi bersama developer dari kedua sisi (app & DB)',
        'Kesimpulan: Perbedaan pendapat adalah hal wajar; fokus pada data dan solusi, bukan ego pribadi'
      ],
      en: [
        'Core Principle: Listen and understand the teammate’s point of view first',
        'Data-Driven: Present concrete evidence using SQL output and log traces instead of pure speculation',
        'Collaboration: Two-way discussion to inspect both application logic and database layers',
        'Mindset: Disagreements are normal; keep the focus on solving the issue objectively'
      ]
    },
    tips: {
      id: 'Gunakan kalimat "daripada berdebat siapa yang benar, saya menunjukkan hasil SQL dan log". Poin ini menunjukkan kedewasaan profesional yang tinggi.',
      en: 'Highlight phrase "rather than arguing, I presented the SQL results and logs". This demonstrates strong professional maturity.'
    }
  },
  {
    id: 'learning',
    number: 4,
    badge: 'Growth Mindset',
    category: 'Cara Belajar Teknologi Baru',
    title: {
      id: '4. Cara Belajar Teknologi Baru',
      en: '4. How I Learn New Technologies'
    },
    subtitle: {
      id: 'Metode belajar hands-on melalui project nyata: dari sintaks dasar Go, REST API, PostgreSQL, Docker, hingga Microservices, Kafka, dan deploy VPS.',
      en: 'Hands-on learning by building real projects: from basic Go syntax to REST APIs, PostgreSQL, Docker, Microservices, Kafka, and VPS deployments.'
    },
    duration: {
      id: 'Durasi Bicara: ~90–120 Detik',
      en: 'Speaking Duration: ~90–120 Seconds'
    },
    script: {
      id: `Ketika mempelajari teknologi baru, biasanya saya mulai dengan memahami konsep dan syntax dasarnya. Setelah itu saya lebih suka belajar dengan membuat sesuatu yang nyata daripada hanya membaca dokumentasi atau menonton tutorial.

Contohnya, saya baru-baru ini belajar Go karena ingin meningkatkan kemampuan backend development. Saya mulai dari syntax dasar, kemudian belajar membuat REST API, koneksi ke PostgreSQL, JWT authentication, dan Docker.

Setelah memahami dasarnya, saya membuat marketplace backend menggunakan Go. Belakangan saya juga mulai membuat project microservices dan mempelajari teknologi seperti gRPC, RabbitMQ, dan Kafka. Project tersebut juga saya deploy ke Linux VPS supaya saya tidak hanya memahami cara menulis kode, tetapi juga bagaimana aplikasi berjalan di environment yang sebenarnya.

Menurut saya cara ini membuat saya lebih memahami teknologi karena saya mempelajari konsepnya, langsung menerapkannya, menemukan masalah, lalu mencari solusinya. Saya juga menggunakan dokumentasi dan AI tools untuk mempercepat proses belajar, tetapi tetap melakukan testing dan memastikan saya memahami apa yang saya implementasikan.`,
      en: `When learning new technologies, I usually start by understanding the core concepts and basic syntax. From there, I strongly prefer learning by building something real rather than just passively reading docs or watching tutorials.

For example, when I set out to master backend engineering with Go, I started with the fundamentals, then built RESTful APIs, integrated PostgreSQL, implemented JWT authentication, and containerized the apps with Docker.

Once comfortable with the basics, I built a full marketplace backend in Go. More recently, I moved into microservices architectures, exploring gRPC, RabbitMQ, and Apache Kafka. I also deployed these projects onto a Linux VPS to understand how services operate in realistic production environments.

This practical approach helps me truly grasp the technology because I apply concepts directly, encounter real bugs, and solve them hands-on. I leverage official documentation and AI tools to accelerate my learning curve, but always run tests and ensure I fully understand every line I implement.`
    },
    bulletPoints: {
      id: [
        'Metode: Pahami konsep & sintaks dasar -> buat project nyata (learning by doing)',
        'Perjalanan Go: Syntax dasar -> REST API -> PostgreSQL -> JWT Auth -> Docker container',
        'Evolusi Proyek: Marketplace backend Go -> Microservices (gRPC, RabbitMQ, Kafka)',
        'Deployment Nyata: Deploy ke Linux VPS untuk memahami runtime environment sesungguhnya',
        'Validasi: Manfaatkan dokumentasi & AI tools dengan tetap melakukan testing mandiri'
      ],
      en: [
        'Methodology: Core fundamentals -> hands-on project creation (learning by doing)',
        'Go Journey: Syntax -> REST API -> PostgreSQL -> JWT Auth -> Docker containerization',
        'Project Scope: Go marketplace backend -> Microservices (gRPC, RabbitMQ, Kafka)',
        'Real Deployment: Deployed to Linux VPS to observe real-world runtime behavior',
        'Validation: Using documentation & AI tools responsibly with automated testing'
      ]
    },
    tips: {
      id: 'Ceritakan alur belajar Anda yang runtut dari hal dasar hingga deploy VPS. Ini membuktikan bahwa Anda adalah tipe self-starter yang cepat beradaptasi.',
      en: 'Walk through your structured progression from fundamentals to VPS deployment, proving you are a highly adaptable self-starter.'
    }
  },
  {
    id: 'initiative',
    number: 5,
    badge: 'Proactivity',
    category: 'Inisiatif / Entrepreneur Spirit',
    title: {
      id: '5. Inisiatif / Entrepreneur Spirit',
      en: '5. Proactivity & Problem Solving'
    },
    subtitle: {
      id: 'Inisiatif mandiri membangun internal tool untuk mengotomasi tugas support yang berulang dan memangkas pekerjaan manual tim.',
      en: 'Self-driven initiative developing internal support tools to automate repetitive workflows and eliminate manual team overhead.'
    },
    duration: {
      id: 'Durasi Bicara: ~75 Detik',
      en: 'Speaking Duration: ~75 Seconds'
    },
    script: {
      id: `Di pekerjaan saya sekarang, saya melihat ada beberapa aktivitas support yang dilakukan berulang dan cukup memakan waktu karena masih dilakukan secara manual.

Saya melihat ada peluang untuk membuat proses tersebut lebih efisien. Walaupun membuat internal tool bukan tanggung jawab utama saya, saya berinisiatif untuk membuat aplikasi sederhana yang bisa membantu workflow tersebut.

Saya mengidentifikasi bagian proses yang bisa dibuat lebih otomatis, kemudian saya merancang dan mengembangkan aplikasinya sendiri.

Setelah digunakan, proses tersebut menjadi lebih mudah dan mengurangi beberapa pekerjaan manual yang berulang bagi tim.

Dari pengalaman itu saya belajar bahwa kita tidak selalu harus menunggu seseorang memberikan tugas untuk melakukan improvement. Kalau saya melihat ada masalah yang bisa diselesaikan dengan teknologi, saya mencoba memahami masalahnya terlebih dahulu dan mencari solusi yang praktis.`,
      en: `In my current role, I noticed several daily support tasks were being handled manually and repeatedly, taking up considerable team bandwidth.

I saw an opportunity to make the workflow far more efficient. Even though developing software tools was not explicitly part of my daily job description, I took the initiative to build a dedicated internal application.

I identified the specific repetitive bottlenecks, designed a streamlined flow, and developed the tool myself.

Once deployed, it made the process much smoother and significantly reduced manual repetitive work for the entire team.

That experience taught me that we don't always have to wait for instructions to make an improvement. When I spot an operational bottleneck that technology can resolve, I make it a point to understand the root issue and build a practical solution.`
    },
    bulletPoints: {
      id: [
        'Observasi Lapangan: Menemukan aktivitas operasional manual yang berulang dan memakan waktu',
        'Inisiatif Mandiri: Merancang dan membangun aplikasi internal tanpa menunggu instruksi atasan',
        'Dampak Nyata: Mengurangi beban manual tim support dan mempercepat proses harian',
        'Mindset: Proaktif menciptakan solusi praktis berbasis teknologi untuk continuous improvement'
      ],
      en: [
        'Field Observation: Identified repetitive manual support workflows consuming team time',
        'Self-Initiative: Designed and engineered an internal tool proactively without waiting for orders',
        'Concrete Impact: Reduced manual workload and accelerated daily operational response',
        'Mindset: Proactively seeking technological solutions for continuous team improvement'
      ]
    },
    tips: {
      id: 'Tekankan kalimat "tidak harus menunggu seseorang memberikan tugas". Hal ini menunjukkan kepemilikan (ownership) dan proaktivitas.',
      en: 'Emphasize phrase "we don\'t have to wait for instructions to improve things". This highlights strong personal ownership.'
    }
  },
  {
    id: 'pressure',
    number: 6,
    badge: 'Resilience',
    category: 'Bekerja di Bawah Tekanan',
    title: {
      id: '6. Bekerja di Bawah Tekanan',
      en: '6. Working Under Pressure'
    },
    subtitle: {
      id: 'Menjaga ketenangan saat sistem down dan tiket menumpuk, mendahulukan investigasi bertahap, dan menghindari tindakan terburu-buru.',
      en: 'Maintaining composure during production outages under heavy ticket load, prioritizing step-by-step troubleshooting.'
    },
    duration: {
      id: 'Durasi Bicara: ~80 Detik',
      en: 'Speaking Duration: ~80 Seconds'
    },
    script: {
      id: `Salah satu contohnya ketika aplikasi tiba-tiba mengalami down saat jam kerja dan kami menerima banyak tiket dari user secara bersamaan.

Ada tekanan untuk memulihkan aplikasi secepat mungkin. Namun saya tahu bahwa melakukan perubahan tanpa memahami root cause justru bisa menimbulkan masalah yang lebih besar.

Jadi saya mencoba tetap fokus dan bekerja secara bertahap. Saya mengecek status aplikasi dan log, kemudian melakukan investigasi database menggunakan SQL dan mengumpulkan informasi yang bisa membantu menemukan masalah.

Saya juga berkomunikasi dengan developer mengenai hasil investigasi dan terus memberikan update kepada user selama proses berlangsung.

Setelah root cause ditemukan, kami menerapkan solusi yang sesuai dan memastikan aplikasi kembali berjalan dengan baik.

Dari pengalaman tersebut saya belajar bahwa bekerja di bawah tekanan bukan berarti harus terburu-buru tanpa berpikir. Bagi saya, itu berarti menentukan prioritas, berkomunikasi dengan baik, dan tetap mengikuti proses troubleshooting yang benar.`,
      en: `A clear example is when an enterprise application experienced unexpected downtime during peak hours and tickets flooded our queue.

There was intense pressure to restore the service immediately. However, I knew that making hasty changes without diagnosing the root cause could create even larger failures.

I stayed calm and proceeded systematically. I checked the application health and logs, queried the database using SQL to isolate data anomalies, and compiled relevant evidence.

I maintained constant communication with our developers, sharing our findings while providing regular, transparent status updates to affected users.

Once the root cause was verified, we deployed the appropriate fix and confirmed the application was fully stable.

From that, I learned that working under pressure isn't about rushing blindly. It means prioritizing effectively, communicating transparently, and sticking to rigorous troubleshooting practices.`
    },
    bulletPoints: {
      id: [
        'Situasi Bertekanan: Aplikasi down mendadak saat jam sibuk dan tiket aduan membanjiri sistem',
        'Sikap Kritis: Menolak panik atau membuat perubahan serampangan yang berisiko memperparah insiden',
        'Metode Kerja: Bertindak bertahap (cek server log -> query SQL database -> koordinasi developer -> info user)',
        'Prinsip: Bekerja di bawah tekanan berarti memegang kendali prioritas dan mengikuti prosedur tepat'
      ],
      en: [
        'High-Pressure Situation: Production system outage during peak hours with flooded support queue',
        'Critical Discipline: Avoided panic or reckless changes that could worsen the outage',
        'Step-by-Step Method: Investigated logs -> diagnosed SQL queries -> synced with devs -> updated users',
        'Core Lesson: Thriving under pressure means setting clear priorities and following proper procedures'
      ]
    },
    tips: {
      id: 'Tegaskan bahwa Anda tidak panik melakukan perubahan sembarangan di production. Pewawancara sangat menghargai kehati-hatian ini.',
      en: 'Stress that you never apply reckless hotfixes in production under panic. Interviewers value this defensive mindset.'
    }
  },
  {
    id: 'mistake',
    number: 7,
    badge: 'Accountability',
    category: 'Ketika Melakukan Kesalahan',
    title: {
      id: '7. Ketika Melakukan Kesalahan (Kesalahan & Tanggung Jawab)',
      en: '7. Handling Mistakes & Accountability'
    },
    subtitle: {
      id: 'Pengalaman membuat asumsi investigasi yang keliru, mengakuinya secara terbuka kepada tim, dan memvalidasi fakta berbasis data.',
      en: 'Experience making an incorrect troubleshooting assumption, openly taking responsibility, and learning data-driven validation.'
    },
    duration: {
      id: 'Durasi Bicara: ~80 Detik',
      en: 'Speaking Duration: ~80 Seconds'
    },
    script: {
      id: `Salah satu kesalahan yang pernah saya lakukan adalah ketika sedang melakukan investigasi masalah aplikasi, saya awalnya fokus pada bagian sistem yang ternyata bukan sumber masalahnya.

Saya mengira masalahnya berkaitan dengan application logic. Namun setelah mengecek database dan melihat log dengan lebih teliti, saya menyadari bahwa asumsi awal saya salah.

Setelah menyadarinya, saya menyampaikan hal tersebut kepada tim dan tidak melanjutkan investigasi dengan pendekatan yang salah. Saya menjelaskan apa saja yang sudah saya cek dan apa yang sebelumnya terlewat, kemudian melanjutkan investigasi berdasarkan informasi baru tersebut.

Akhirnya kami menemukan penyebab sebenarnya dan menyelesaikan masalah tersebut.

Dari pengalaman itu saya belajar untuk tidak terlalu cepat membuat asumsi ketika melakukan troubleshooting. Sekarang saya berusaha memvalidasi asumsi menggunakan log, database, dan bukti lain sebelum memberikan solusi.

Menurut saya, melakukan kesalahan itu mungkin terjadi, tetapi yang penting adalah jujur, bertanggung jawab, dan belajar supaya kesalahan yang sama tidak terulang.`,
      en: `One mistake I made in the past was focusing on the wrong component during a system investigation because of an early assumption.

I initially assumed the bug was caused by application logic. However, after analyzing database query patterns and checking server logs more thoroughly, I realized my initial assumption was incorrect.

As soon as I realized this, I communicated it transparently to the team rather than persisting down the wrong path. I walked through what I had checked, highlighted what was originally overlooked, and pivoted the investigation using the new evidence.

We were then able to locate the actual root cause and resolve the incident effectively.

That experience taught me never to jump to conclusions during troubleshooting. Today, I always validate every hypothesis against error logs, database metrics, and empirical data before committing to a solution.

Mistakes can happen, but the key is being honest, taking full responsibility, and learning so it never repeats.`
    },
    bulletPoints: {
      id: [
        'Kesalahan: Asumsi awal keliru (mengira masalah berada di logika aplikasi, padahal pada database)',
        'Tindakan Tanggung Jawab: Terbuka mengakui kekeliruan ke tim dan segera memutar arah investigasi',
        'Resolusi: Memaparkan data log & SQL baru hingga akar masalah sebenarnya berhasil dituntaskan',
        'Pembelajaran: Selalu validasi asumsi dengan data log dan database sebelum menarik kesimpulan'
      ],
      en: [
        'The Mistake: Made an initial wrong assumption attributing a database issue to application logic',
        'Accountability: Openly communicated the mistake to the team and pivoted direction immediately',
        'Resolution: Shared fresh SQL/log data, successfully resolving the actual root cause',
        'Takeaway: Always validate hypotheses with empirical log and database evidence before concluding'
      ]
    },
    tips: {
      id: 'Pewawancara ingin melihat integritas Anda. Ceritakan kesalahan secara jujur dan tekankan bagaimana Anda langsung berterus terang serta belajar darinya.',
      en: 'Interviewers look for genuine integrity. Be honest about the mistake and emphasize how quickly you communicated and adapted.'
    }
  },
  {
    id: 'teamwork',
    number: 8,
    badge: 'Culture & Fit',
    category: 'Bagaimana Teammate Menggambarkan Kamu',
    title: {
      id: '8. Bagaimana Teammate Menggambarkan Kamu (Teamwork)',
      en: '8. How Teammates Would Describe You'
    },
    subtitle: {
      id: 'Dikenal dapat diandalkan, mudah diajak kolaborasi, serta selalu mengawal koordinasi teknis hingga masalah tuntas.',
      en: 'Known as reliable, collaborative, sharing findings openly, and following up technical issues until resolved.'
    },
    duration: {
      id: 'Durasi Bicara: ~80 Detik',
      en: 'Speaking Duration: ~80 Seconds'
    },
    script: {
      id: `Saya rasa teammate saya akan menggambarkan saya sebagai orang yang bisa diandalkan dan mudah bekerja sama.

Dalam pekerjaan saya sekarang, saya sering bekerja dengan developer dan tim lain untuk melakukan investigasi dan menyelesaikan masalah aplikasi. Jadi komunikasi dan kolaborasi merupakan bagian penting dari pekerjaan saya.

Saya berusaha menjadi orang yang bisa diandalkan ketika ada masalah. Saya biasanya membagikan informasi yang saya temukan, menyampaikan kondisi dengan jelas, dan membantu follow up sampai masalah tersebut selesai.

Salah satu hal yang masih saya tingkatkan adalah menjadi lebih proaktif dalam memberikan update. Kadang saya terlalu fokus menyelesaikan masalah teknis terlebih dahulu sehingga tidak langsung meng-update tim mengenai apa yang sedang saya kerjakan.

Sekarang saya berusaha berkomunikasi lebih awal dan memberikan update secara berkala, terutama ketika suatu masalah melibatkan beberapa orang.

Menurut saya, teamwork bukan hanya tentang menyelesaikan tugas sendiri, tetapi juga memastikan anggota tim lain mendapatkan informasi yang mereka perlukan.`,
      en: `I believe my teammates would describe me as someone who is dependable, communicative, and easy to collaborate with.

In my day-to-day work, I routinely coordinate with developers and cross-functional teams to investigate and resolve application issues. Effective communication and teamwork are central to everything I do.

I strive to be the person the team can rely on during incidents. I share my findings transparently, state system conditions clearly, and follow up relentlessly until the issue is fully resolved.

One area I actively work on improving is being even more proactive with real-time status updates. In the past, I sometimes got so focused on debugging the technical problem that I delayed sharing quick intermediate updates.

Now, I make a conscious effort to communicate early and send regular progress check-ins, especially when an issue impacts multiple stakeholders.

To me, teamwork isn't just about finishing your own tasks—it's about ensuring your teammates always have the information they need to succeed.`
    },
    bulletPoints: {
      id: [
        'Ciri Utama: Dapat diandalkan (dependable), komunikatif, dan kooperatif dengan developer',
        'Peran Nyata: Berbagi temuan investigasi, transparan mengenai status, dan follow up hingga tuntas',
        'Area Peningkatan Diri: Memberikan update berkala lebih dini saat proses troubleshooting intensif',
        'Filosofi Tim: Kerja tim berarti memastikan seluruh anggota mendapatkan informasi yang dibutuhkan'
      ],
      en: [
        'Key Traits: Dependable, transparent communicator, highly collaborative with developers',
        'Active Contribution: Sharing diagnostic data, clarifying system health, following up to completion',
        'Self-Improvement: Providing earlier intermediate progress updates during deep debugging',
        'Philosophy: True teamwork means ensuring everyone on the team has the context they need'
      ]
    },
    tips: {
      id: 'Menyebutkan area peningkatan diri secara jujur (seperti memberi update lebih cepat) membuktikan bahwa Anda memiliki self-awareness yang matang.',
      en: 'Mentioning an honest area of improvement (like earlier status updates) proves mature self-awareness.'
    }
  },
  {
    id: 'career',
    number: 9,
    badge: 'Future Vision',
    category: '2–3 Tahun ke Depan (Career Goals)',
    title: {
      id: '9. Rencana 2–3 Tahun ke Depan (Career Goals)',
      en: '9. Career Goals for the Next 2–3 Years'
    },
    subtitle: {
      id: 'Menjadi Backend Software Engineer mandiri yang menguasai ekosistem Go, distributed systems, serta memegang ownership fitur end-to-end.',
      en: 'Becoming an autonomous Backend Software Engineer mastering Go, distributed systems, and end-to-end feature ownership.'
    },
    duration: {
      id: 'Durasi Bicara: ~80 Detik',
      en: 'Speaking Duration: ~80 Seconds'
    },
    script: {
      id: `Dalam dua sampai tiga tahun ke depan, saya ingin menjadi Software Engineer yang lebih kuat dan mandiri, terutama di bidang backend development.

Saya ingin memperdalam kemampuan di Go, backend architecture, database, dan distributed systems. Di saat yang sama, saya ingin mendapatkan lebih banyak pengalaman menangani production system dan mengambil ownership terhadap sebuah feature, mulai dari development sampai deployment.

Di luar tanggung jawab individual, saya juga ingin berkontribusi dengan berbagi knowledge kepada teammate, membantu meningkatkan proses development, dan membantu menyelesaikan masalah teknis ketika dibutuhkan.

Tujuan saya adalah terus berkembang sekaligus memberikan kontribusi kepada perkembangan tim dan membantu perusahaan membangun produk yang reliable dan bermanfaat.`,
      en: `Over the next two to three years, my goal is to become a strong, autonomous Software Engineer specializing in backend development.

I want to deepen my expertise in Go, backend architecture, relational databases, and distributed systems. At the same time, I look forward to taking end-to-end ownership of core features—from initial architecture design and implementation to automated testing and production deployment.

Beyond individual contributions, I want to actively share knowledge with teammates, help refine our development workflows, and mentor others on technical troubleshooting when needed.

Ultimately, my goal is to continuously grow as an engineer while contributing meaningfully to the team's velocity and helping the company build reliable, high-impact products.`
    },
    bulletPoints: {
      id: [
        'Target Keahlian: Pendalaman backend Go, arsitektur sistem terdistribusi, dan optimasi database',
        'Feature Ownership: Memegang kendali penuh atas fitur dari perancangan arsitektur hingga deployment',
        'Kontribusi Tim: Berbagi pengetahuan (knowledge sharing) dan membantu perbaikan alur development',
        'Tujuan Akhir: Membantu perusahaan membangun produk perangkat lunak yang tangguh dan bermanfaat'
      ],
      en: [
        'Technical Depth: Deepening Go backend systems, distributed architecture, and database tuning',
        'Feature Ownership: Leading features end-to-end from architecture to production deployment',
        'Team Contribution: Knowledge sharing, improving development velocity, and technical support',
        'Ultimate Goal: Helping the company engineer reliable, high-impact software products'
      ]
    },
    tips: {
      id: 'Kaitkan cita-cita backend Go Anda dengan komitmen memberi nilai tambah bagi perusahaan dan rekan tim.',
      en: 'Connect your Go backend ambitions with a strong commitment to delivering business value and lifting team capability.'
    }
  },
  {
    id: 'achievement',
    number: 10,
    badge: 'Closing & Impact',
    category: 'Pencapaian Terbesar / Penutup',
    title: {
      id: '10. Pencapaian Terbesar — Penutup Interview',
      en: '10. Biggest Achievement — Closing Pitch'
    },
    subtitle: {
      id: 'Kemampuan berkembang secara konsisten membangun berbagai proyek software produksi di saat tetap bekerja full-time sebagai Application Support.',
      en: 'Continuous growth building real software projects and deploying to VPS while working full-time in Application Support.'
    },
    duration: {
      id: 'Durasi Bicara: ~90–120 Detik (Kuat & Meyakinkan)',
      en: 'Speaking Duration: ~90–120 Seconds (Strong & Memorable)'
    },
    script: {
      id: `Menurut saya, pencapaian terbesar saya sejauh ini adalah kemampuan untuk terus berkembang sebagai developer sambil tetap bekerja full-time sebagai Application Support.

Ketika memulai karier, fokus utama saya adalah menangani aplikasi enterprise, troubleshooting, dan bekerja dengan database. Seiring waktu, saya menyadari bahwa saya ingin lebih terlibat dalam software development. Karena itu saya mulai belajar dan membangun project di luar tanggung jawab utama saya.

Saya mempelajari teknologi seperti Go, React, PostgreSQL, dan Docker, kemudian membangun beberapa aplikasi, termasuk marketplace dan project microservices. Saya juga melakukan deployment project ke VPS supaya mendapatkan pengalaman yang lebih luas, bukan hanya menulis kode.

Hal yang membuat pencapaian ini berarti bagi saya adalah saya melakukannya sambil tetap bekerja full-time. Ini menunjukkan kepada saya bahwa saya bisa mengambil tanggung jawab terhadap perkembangan diri sendiri dan terus belajar meskipun tidak diwajibkan oleh pekerjaan.

Sekarang saya merasa memiliki arah karier yang lebih jelas. Saya ingin terus berkembang sebagai Software Engineer dan menggabungkan pengalaman production yang saya miliki dengan kemampuan development untuk membangun software yang lebih baik.`,
      en: `In my view, my biggest achievement so far is my ability to continuously grow and build production software projects while working full-time in enterprise Application Support.

When I started my career, my primary focus was maintaining enterprise systems, troubleshooting issues, and managing databases. Over time, I realized my passion lay in engineering software from the ground up. Because of that, I dedicated my time outside work to learning and building real projects.

I mastered Go, React, PostgreSQL, and Docker, building complete applications including marketplace backends and microservices pipelines. I also deployed these systems onto Linux VPS servers to gain end-to-end deployment experience beyond just writing code.

What makes this achievement so meaningful is that I accomplished it while maintaining a demanding full-time job. It proved to me that I have the self-discipline and drive to take full ownership of my career and growth without needing external pressure.

Today, I have a crystal-clear career direction. I am eager to contribute as a Software Engineer, combining my real-world production reliability experience with solid development skills to build resilient software.`
    },
    bulletPoints: {
      id: [
        'Pencapaian Inti: Disiplin bertumbuh dan belajar konsisten di sela tanggung jawab full-time',
        'Bukti Nyata: Membangun project Go backend, marketplace, microservices, dan deployment ke Linux VPS',
        'Karakter: Menunjukkan dedikasi tinggi, self-driven, dan kemampuan manajemen waktu yang kuat',
        'Closing Value: Siap memadukan mindset keandalan sistem produksi dengan kemampuan engineering perangkat lunak'
      ],
      en: [
        'Core Achievement: Self-driven discipline learning and coding alongside a full-time support role',
        'Concrete Proof: Built Go backend architectures, marketplace apps, microservices, and VPS deployments',
        'Character: Demonstrates strong grit, high self-motivation, and effective time management',
        'Closing Pitch: Ready to blend real-world production resilience with solid software engineering skills'
      ]
    },
    tips: {
      id: 'Gunakan ini sebagai penutup yang berkesan. Sikap pantang menyerah dan konsistensi belajar mandiri adalah kualitas yang sangat dicari oleh engineering manager.',
      en: 'Use this as a memorable closing statement. Self-driven grit and continuous learning are top qualities engineering managers seek.'
    }
  }
];

export default function InterviewPracticePage() {
  const [activeTab, setActiveTab] = useState<MainTab>('mock');
  const [selectedTopicIndex, setSelectedTopicIndex] = useState<number>(0);
  const [lang, setLang] = useState<LangMode>('id');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [selectedTopicFilter, setSelectedTopicFilter] = useState<string>('all');

  // Audio Speech States
  const [isAudioPlaying, setIsAudioPlaying] = useState<boolean>(false);
  const [speechRate, setSpeechRate] = useState<number>(1.0);
  const [isCopied, setIsCopied] = useState<boolean>(false);

  // Filtered Questions for Question Bank Syllabus
  const filteredQuestions = useMemo(() => {
    return interviewQuestions.filter((q) => {
      const matchTopic = selectedTopicFilter === 'all' || q.topic === selectedTopicFilter;
      const qText = `${q.question[lang]} ${q.context} ${q.keyConcepts.join(' ')} ${q.role} ${q.topic}`.toLowerCase();
      const matchSearch = searchQuery === '' || qText.includes(searchQuery.toLowerCase());
      return matchTopic && matchSearch;
    });
  }, [selectedTopicFilter, searchQuery, lang]);

  const currentTopic = spokenInterviewTopics[selectedTopicIndex] || spokenInterviewTopics[0];

  // Cancel speech on unmount / tab change / topic change
  useEffect(() => {
    return () => {
      if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
        window.speechSynthesis.cancel();
      }
      setIsAudioPlaying(false);
    };
  }, [activeTab, lang, selectedTopicIndex]);

  // Audio Handler
  const handlePlayVoice = (text: string) => {
    if (typeof window === 'undefined' || !('speechSynthesis' in window)) {
      alert('Browser Anda tidak mendukung Web Speech API.');
      return;
    }

    if (isAudioPlaying) {
      window.speechSynthesis.cancel();
      setIsAudioPlaying(false);
      return;
    }

    window.speechSynthesis.cancel();
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.lang = lang === 'id' ? 'id-ID' : 'en-US';
    utterance.rate = speechRate;

    utterance.onstart = () => setIsAudioPlaying(true);
    utterance.onend = () => setIsAudioPlaying(false);
    utterance.onerror = () => setIsAudioPlaying(false);

    window.speechSynthesis.speak(utterance);
  };

  const handleCopyPitch = () => {
    navigator.clipboard.writeText(currentTopic.script[lang]);
    setIsCopied(true);
    setTimeout(() => setIsCopied(false), 2000);
  };

  return (
    <div className="min-h-screen bg-[#F8FAFC] text-slate-900 font-sans selection:bg-emerald-100 selection:text-emerald-900 pb-20">
      {/* ========================================================= */}
      {/* 1. TOP HEADER */}
      {/* ========================================================= */}
      <header className="sticky top-0 z-50 bg-white border-b border-slate-200 shadow-sm">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          {/* Brand & Return */}
          <div className="flex items-center gap-3">
            <Link
              href="/"
              className="flex items-center gap-2 text-xs font-bold text-slate-600 hover:text-slate-950 transition-colors p-1.5 rounded-lg hover:bg-slate-100"
            >
              <ArrowLeft size={16} className="text-slate-800" />
              <span className="hidden sm:inline">Kembali ke Portofolio</span>
            </Link>

            <div className="h-4 w-px bg-slate-300 hidden sm:block" />

            <div className="flex items-center gap-2">
              <span className="font-extrabold text-sm tracking-tight text-slate-900">
                Pusat Latihan Interview
              </span>
              <span className="px-2 py-0.5 rounded bg-emerald-50 text-emerald-700 border border-emerald-200 text-[10px] font-mono font-bold">
                Backend Go
              </span>
            </div>
          </div>

          {/* Desktop Navigation Tabs (Streamlined: 4 Core Tabs) */}
          <div className="hidden md:flex items-center bg-slate-100 p-1 rounded-xl border border-slate-200 text-xs font-bold">
            <button
              onClick={() => setActiveTab('mock')}
              className={`flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg transition-all cursor-pointer ${
                activeTab === 'mock'
                  ? 'bg-white text-emerald-700 shadow-sm border border-slate-200/80 font-extrabold'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              <UserCheck size={14} className={activeTab === 'mock' ? 'text-emerald-600' : 'text-slate-500'} />
              <span>Simulasi Wawancara</span>
            </button>

            <button
              onClick={() => setActiveTab('practice')}
              className={`flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg transition-all cursor-pointer ${
                activeTab === 'practice'
                  ? 'bg-white text-emerald-700 shadow-sm border border-slate-200/80 font-extrabold'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              <Play size={14} className={activeTab === 'practice' ? 'text-emerald-600' : 'text-slate-500'} />
              <span>Latihan Soal</span>
            </button>

            <button
              onClick={() => setActiveTab('pitch')}
              className={`flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg transition-all cursor-pointer ${
                activeTab === 'pitch'
                  ? 'bg-white text-emerald-700 shadow-sm border border-slate-200/80 font-extrabold'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              <User size={14} className={activeTab === 'pitch' ? 'text-emerald-600' : 'text-slate-500'} />
              <span>Naskah Lisan (10 Topik)</span>
            </button>

            <button
              onClick={() => setActiveTab('syllabus')}
              className={`flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg transition-all cursor-pointer ${
                activeTab === 'syllabus'
                  ? 'bg-white text-emerald-700 shadow-sm border border-slate-200/80 font-extrabold'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              <ListFilter size={14} className={activeTab === 'syllabus' ? 'text-emerald-600' : 'text-slate-500'} />
              <span>Bank Soal ({interviewQuestions.length})</span>
            </button>
          </div>

          {/* Language Switcher */}
          <div className="flex items-center gap-2">
            <div className="flex items-center bg-slate-100 border border-slate-200 p-0.5 rounded-lg text-xs font-mono font-bold">
              <button
                onClick={() => setLang('id')}
                className={`px-2.5 py-1 rounded-md transition-all cursor-pointer ${
                  lang === 'id' ? 'bg-white text-emerald-700 shadow-sm font-extrabold' : 'text-slate-500 hover:text-slate-800'
                }`}
              >
                ID
              </button>
              <button
                onClick={() => setLang('en')}
                className={`px-2.5 py-1 rounded-md transition-all cursor-pointer ${
                  lang === 'en' ? 'bg-white text-emerald-700 shadow-sm font-extrabold' : 'text-slate-500 hover:text-slate-800'
                }`}
              >
                EN
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* ========================================================= */}
      {/* 2. MOBILE TAB SELECTOR */}
      {/* ========================================================= */}
      <div className="md:hidden bg-white border-b border-slate-200 px-4 py-2 flex items-center justify-between gap-1 overflow-x-auto text-xs font-bold">
        {[
          { id: 'mock', label: 'Simulasi Wawancara' },
          { id: 'practice', label: 'Latihan Soal' },
          { id: 'pitch', label: 'Naskah Lisan (10)' },
          { id: 'syllabus', label: 'Bank Soal' }
        ].map((t) => (
          <button
            key={t.id}
            onClick={() => setActiveTab(t.id as MainTab)}
            className={`px-3 py-1.5 rounded-lg whitespace-nowrap transition-all ${
              activeTab === t.id
                ? 'bg-emerald-600 text-white font-extrabold shadow-sm'
                : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
            }`}
          >
            {t.label}
          </button>
        ))}
      </div>

      {/* ========================================================= */}
      {/* 3. MAIN CONTENT CONTAINER */}
      {/* ========================================================= */}
      <main className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 pt-6">
        {/* TAB 1: MOCK INTERVIEW (DEFAULT) */}
        {activeTab === 'mock' && (
          <MockInterviewFeature
            lang={lang}
            onSaveMockResult={() => {}}
            onNavigateToDashboard={() => setActiveTab('practice')}
          />
        )}

        {/* TAB 2: PRACTICE QUESTIONS */}
        {activeTab === 'practice' && (
          <PracticeFeature
            lang={lang}
            onSaveResult={() => {}}
            onNavigateToDashboard={() => setActiveTab('mock')}
          />
        )}

        {/* TAB 3: 10 CONVERSATIONAL INTERVIEW TOPICS & AUDIO */}
        {activeTab === 'pitch' && (
          <div className="space-y-6">
            {/* Topic Navigation Selector Bar (10 Topics) */}
            <div className="bg-white rounded-2xl border border-slate-200 p-3 sm:p-4 shadow-sm">
              <div className="flex items-center justify-between gap-2 mb-2 px-1">
                <span className="text-xs font-mono font-bold uppercase tracking-wider text-slate-500">
                  Pilih Topik Pertanyaan Lisan (1 s.d. 10):
                </span>
                <span className="text-[11px] font-mono text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200 font-bold">
                  Bahasa Percakapan Wawancara Nyata
                </span>
              </div>

              <div className="grid grid-cols-2 sm:grid-cols-5 gap-2">
                {spokenInterviewTopics.map((topic, idx) => {
                  const isSelected = selectedTopicIndex === idx;
                  return (
                    <button
                      key={topic.id}
                      onClick={() => {
                        if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
                          window.speechSynthesis.cancel();
                        }
                        setIsAudioPlaying(false);
                        setSelectedTopicIndex(idx);
                      }}
                      className={`text-left p-2.5 rounded-xl border transition-all cursor-pointer ${
                        isSelected
                          ? 'bg-emerald-50/80 border-emerald-500 text-emerald-950 shadow-xs'
                          : 'bg-slate-50/70 border-slate-200 hover:border-slate-300 text-slate-700 hover:bg-slate-100/80'
                      }`}
                    >
                      <div className="flex items-center justify-between mb-1">
                        <span className={`text-[10px] font-mono font-bold px-1.5 py-0.2 rounded ${
                          isSelected ? 'bg-emerald-600 text-white' : 'bg-slate-200 text-slate-700'
                        }`}>
                          #{topic.number}
                        </span>
                        <span className="text-[9px] font-mono text-slate-600 truncate max-w-[70px]">
                          {topic.badge}
                        </span>
                      </div>
                      <div className={`text-xs font-bold leading-tight line-clamp-1 ${
                        isSelected ? 'text-emerald-900 font-extrabold' : 'text-slate-800'
                      }`}>
                        {topic.category}
                      </div>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Header Detail Card for Selected Topic */}
            <div className="bg-white rounded-2xl border border-slate-200/90 p-6 sm:p-8 shadow-sm space-y-4">
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div className="space-y-1.5">
                  <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-50 text-emerald-700 border border-emerald-200 text-xs font-mono font-bold">
                    <User size={13} />
                    <span>Topik #{currentTopic.number} • {currentTopic.badge}</span>
                  </div>
                  <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
                    {currentTopic.title[lang]}
                  </h1>
                  <p className="text-slate-600 text-xs sm:text-sm max-w-2xl leading-relaxed">
                    {currentTopic.subtitle[lang]}
                  </p>
                </div>

                {/* Duration Indicator */}
                <div className="px-3.5 py-2 rounded-xl bg-slate-100 border border-slate-200 text-xs font-mono font-bold text-slate-700 self-start md:self-auto">
                  {currentTopic.duration[lang]}
                </div>
              </div>

              {/* Audio Controls Bar */}
              <div className="pt-4 border-t border-slate-100 flex flex-wrap items-center justify-between gap-4">
                <div className="flex items-center gap-3">
                  <button
                    onClick={() => handlePlayVoice(currentTopic.script[lang])}
                    className={`flex items-center gap-2 px-5 py-2.5 rounded-xl font-bold text-xs sm:text-sm transition-all shadow-sm cursor-pointer ${
                      isAudioPlaying
                        ? 'bg-emerald-700 text-white animate-pulse'
                        : 'bg-emerald-600 hover:bg-emerald-500 text-white font-extrabold'
                    }`}
                  >
                    {isAudioPlaying ? <Pause size={16} /> : <Volume2 size={16} />}
                    <span>{isAudioPlaying ? 'Jeda Suara Audio' : 'Dengarkan Contoh Pengucapan Suara'}</span>
                  </button>

                  <button
                    onClick={handleCopyPitch}
                    className="flex items-center gap-1.5 px-4 py-2.5 rounded-xl text-xs font-bold bg-slate-100 hover:bg-slate-200 text-slate-700 border border-slate-200 transition-colors cursor-pointer"
                  >
                    {isCopied ? <Check size={14} className="text-emerald-600" /> : <Copy size={14} />}
                    <span>{isCopied ? 'Tersalin!' : 'Salin Teks Naskah'}</span>
                  </button>
                </div>

                {/* Speech Speed Selector */}
                <div className="flex items-center gap-2 text-xs font-bold text-slate-600">
                  <span className="font-mono">Kecepatan:</span>
                  {[0.8, 1.0, 1.2].map((rate) => (
                    <button
                      key={rate}
                      onClick={() => setSpeechRate(rate)}
                      className={`px-2.5 py-1 rounded-lg border text-xs font-mono transition-all cursor-pointer ${
                        speechRate === rate
                          ? 'bg-slate-900 text-white border-slate-900 font-extrabold'
                          : 'bg-white text-slate-600 border-slate-200 hover:bg-slate-50'
                      }`}
                    >
                      {rate}x
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* Main Pitch Body & Key Highlights Grid */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
              {/* Left: Teleprompter Spoken Script (7 cols) */}
              <div className="lg:col-span-7 bg-white rounded-2xl border border-slate-200/90 p-6 sm:p-8 shadow-sm space-y-4">
                <div className="flex items-center justify-between border-b border-slate-100 pb-3">
                  <span className="text-xs font-mono font-bold uppercase tracking-wider text-slate-500 flex items-center gap-1.5">
                    <BookOpen size={14} className="text-emerald-600" />
                    <span>Naskah Jawaban Percakapan Wawancara:</span>
                  </span>
                  <span className="text-xs font-mono font-bold text-emerald-700 bg-emerald-50 px-2.5 py-0.5 rounded border border-emerald-200">
                    Bukan Bahasa Formal CV
                  </span>
                </div>

                <div className="text-sm sm:text-[15px] text-slate-800 leading-relaxed space-y-4 whitespace-pre-line font-sans">
                  {currentTopic.script[lang]}
                </div>
              </div>

              {/* Right: Key Bullets & Strategy Points (5 cols) */}
              <div className="lg:col-span-5 space-y-5">
                <div className="bg-white rounded-2xl border border-slate-200/90 p-6 shadow-sm space-y-4">
                  <div className="flex items-center gap-2 text-emerald-800 font-bold text-sm border-b border-slate-100 pb-3">
                    <ShieldCheck size={18} className="text-emerald-600" />
                    <span>Intisari & Poin Kunci Jawaban:</span>
                  </div>

                  <ul className="space-y-3 text-xs sm:text-sm text-slate-700">
                    {currentTopic.bulletPoints[lang].map((item, idx) => (
                      <li key={idx} className="flex items-start gap-2.5">
                        <CheckCircle2 size={16} className="text-emerald-600 flex-shrink-0 mt-0.5" />
                        <span className="leading-snug">{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="bg-emerald-50/80 rounded-2xl border border-emerald-200 p-6 space-y-2.5">
                  <div className="flex items-center gap-1.5 text-emerald-800 font-bold text-xs uppercase tracking-wider font-mono">
                    <Zap size={14} className="text-emerald-600" />
                    <span>Tips Eksekusi Pewawancara:</span>
                  </div>
                  <p className="text-xs text-emerald-900 leading-relaxed">
                    {currentTopic.tips[lang]}
                  </p>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* TAB 4: QUESTION BANK SYLLABUS */}
        {activeTab === 'syllabus' && (
          <div className="space-y-6">
            <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm flex flex-col md:flex-row items-center justify-between gap-4">
              <div>
                <h2 className="text-lg font-extrabold text-slate-900">Bank Pertanyaan & Kisi-Kisi Lengkap</h2>
                <p className="text-xs text-slate-500">
                  Daftar seluruh topik wawancara teknis backend Golang, Java, database SQL, Docker, Redis, Kafka, gRPC, dan System Design.
                </p>
              </div>

              <div className="flex flex-wrap items-center gap-2.5 w-full md:w-auto">
                {/* Topic Selector */}
                <select
                  value={selectedTopicFilter}
                  onChange={(e) => setSelectedTopicFilter(e.target.value)}
                  className="px-3 py-1.5 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-800 focus:outline-none focus:border-emerald-500"
                >
                  <option value="all">Semua Topik</option>
                  <option value="Golang">Golang</option>
                  <option value="SQL">SQL</option>
                  <option value="REST API">REST API</option>
                  <option value="Database">Database</option>
                  <option value="Docker">Docker</option>
                  <option value="Redis">Redis</option>
                  <option value="Kafka">Kafka</option>
                  <option value="gRPC">gRPC</option>
                  <option value="System Design">System Design</option>
                </select>

                <div className="relative w-full md:w-64">
                  <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
                  <input
                    type="text"
                    placeholder="Cari topik pertanyaan..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-full pl-9 pr-3 py-1.5 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-900 focus:outline-none focus:border-emerald-500"
                  />
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {filteredQuestions.map((q, idx) => (
                <div
                  key={q.id + idx}
                  className="bg-white p-5 rounded-2xl border border-slate-200 hover:border-slate-300 shadow-sm transition-all flex flex-col justify-between space-y-4"
                >
                  <div className="space-y-2">
                    <div className="flex items-center justify-between text-[11px] font-mono">
                      <span className="px-2 py-0.5 rounded bg-emerald-50 text-emerald-800 font-bold border border-emerald-200">
                        {q.topic} • {q.role}
                      </span>
                      <span className="text-slate-400">{q.difficulty}</span>
                    </div>

                    <h3 className="text-sm font-bold text-slate-900 leading-snug">
                      {idx + 1}. {q.question[lang]}
                    </h3>

                    <p className="text-xs text-slate-600 line-clamp-2">
                      {q.suggestedAnswer[lang]}
                    </p>
                  </div>

                  <div className="pt-3 border-t border-slate-100 flex items-center justify-between">
                    <span className="text-[11px] font-mono text-slate-500 truncate max-w-[200px]">
                      {q.context}
                    </span>

                    <button
                      onClick={() => setActiveTab('practice')}
                      className="text-xs font-bold text-emerald-700 hover:text-emerald-600 flex items-center gap-1 cursor-pointer"
                    >
                      <span>Latih Soal Ini</span>
                      <ChevronRight size={13} />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </main>
    </div>
  );
}
