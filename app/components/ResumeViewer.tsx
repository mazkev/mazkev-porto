'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import {
  X, Printer, Download, Mail, Phone, MapPin, Code, Briefcase,
  GraduationCap, LayoutGrid, Globe, Github, Layers, Server, Cpu,
  FileText, User, ExternalLink
} from 'lucide-react';
import Image from 'next/image';

interface ResumeViewerProps {
  isOpen: boolean;
  onClose: () => void;
}

export type ResumeRole = 'fullstack' | 'frontend' | 'backend';
export type CVLang = 'en' | 'id';

const roleContent = {
  fullstack: {
    en: {
      title: 'Fullstack Software Engineer',
      executiveSummaryTitle: 'Executive Summary',
      executiveSummary: 'Fullstack Software Engineer with 2+ years of enterprise Application Support experience at PT PLN Icon+. Proven track record maintaining 100% SLA compliance for production operational tickets, authoring structured SQL queries (PostgreSQL, Oracle, MySQL) for transaction verification and data reporting, and monitoring high-availability system workflows 24/7. Concurrently architected and deployed 82 verified software repositories spanning distributed Go & Java Spring Boot microservices, modern Next.js 16 & React 19 web platforms, and mobile apps. Strong foundation in Clean Architecture (DDD), ACID transactional ledgers, Redis caching, RabbitMQ message brokers, and Docker containerization.',
    },
    id: {
      title: 'Fullstack Software Engineer',
      executiveSummaryTitle: 'Ringkasan Eksekutif',
      executiveSummary: 'Fullstack Software Engineer dengan 2+ tahun pengalaman profesional di bidang Application Support Sistem Enterprise pada PT PLN Icon+. Memiliki keahlian teruji dalam penanganan tiket operasional produksi dengan kepatuhan SLA 100%, penulisan query SQL terstruktur (PostgreSQL, Oracle, MySQL) untuk validasi data transaksi dan pelaporan, serta pemantauan kestabilan sistem 24/7. Secara mandiri merancang dan membangun 82 repositori perangkat lunak terverifikasi mencakup microservices Go & Java Spring Boot, platform web modern Next.js 16 & React 19, serta aplikasi mobile. Menguasai Clean Architecture (DDD), transaksi atomik ACID, caching Redis, RabbitMQ, dan kontainerisasi Docker.',
    }
  },
  frontend: {
    en: {
      title: 'Frontend & Mobile Engineer',
      executiveSummaryTitle: 'Executive Summary',
      executiveSummary: 'Frontend & Mobile Engineer specializing in high-performance web and mobile platforms with Next.js 16, React 19, TypeScript, Vue 3, Angular 19, and React Native (Expo SDK 56). Creator of 48+ client applications featuring complex state management (Zustand, Redux Toolkit, Signals), interactive 2D/3D graphics (React-Konva, Canvas), and responsive real-time WebSockets. Backed by 2+ years of enterprise Application Support experience at PT PLN Icon+ ensuring production reliability and user operational excellence.',
    },
    id: {
      title: 'Frontend & Mobile Engineer',
      executiveSummaryTitle: 'Ringkasan Eksekutif',
      executiveSummary: 'Frontend & Mobile Engineer dengan spesialisasi pengembangan antarmuka web dan mobile performa tinggi berbasis Next.js 16, React 19, TypeScript, Vue 3, Angular 19, dan React Native (Expo SDK 56). Membangun 48+ aplikasi frontend dan mobile dengan arsitektur state management kompleks (Zustand, Redux Toolkit, Signals), kanvas grafis interaktif (React-Konva, Canvas), serta real-time WebSockets. Didukung 2+ tahun pengalaman Application Support enterprise di PT PLN Icon+ dalam menjamin keandalan sistem dan alur kerja operasional.',
    }
  },
  backend: {
    en: {
      title: 'Backend & Cloud Systems Engineer (Go / Java / Node.js)',
      executiveSummaryTitle: 'Executive Summary',
      executiveSummary: 'Backend & Cloud Systems Engineer specializing in Go (Golang), Java Spring Boot, Bun/Hono, and Node.js RESTful/gRPC microservices. Architect of 32+ backend and fullstack platforms implementing Clean Architecture, ACID transactional ledgers, Redis cache-aside, RabbitMQ message brokers, and database connection pooling (PostgreSQL, MongoDB, MySQL). Backed by 2+ years of Application Support at PT PLN Icon+, with rigorous practical mastery in database query authoring, production log troubleshooting, and high-availability operations.',
    },
    id: {
      title: 'Backend & Cloud Systems Engineer (Go / Java / Node.js)',
      executiveSummaryTitle: 'Ringkasan Eksekutif',
      executiveSummary: 'Backend & Cloud Systems Engineer dengan spesialisasi pengembangan layanan mikro RESTful/gRPC berkinerja tinggi menggunakan Go (Golang), Java Spring Boot, Bun/Hono, dan Node.js. Mengembangkan 32+ sistem backend dan fullstack berprinsip Clean Architecture, transaksi buku besar ACID, Redis cache-aside, message broker RabbitMQ, serta connection pooling database (PostgreSQL, MongoDB, MySQL). Diperkuat oleh 2+ tahun pengalaman Application Support di PT PLN Icon+ dengan kemahiran praktis dalam penulisan query SQL, investigasi log produksi, dan keandalan sistem berstandar enterprise.',
    }
  }
};

const commonText = {
  en: {
    downloadBtn: 'Download PDF (3 Pages)',
    printBtn: 'Print / PDF',
    page1Title: 'Executive Profile',
    page2Title: 'Technical Projects & Engineering Repositories (82 Repositories)',
    page3Title: 'Visual Case Studies & Technical Project Annex',
    experienceTitle: 'Professional Experience',
    skillsTitle: 'Technical Competencies & Core Stack',
    educationTitle: 'Education',
    job1Title: 'Application Support Engineer',
    job1Company: 'PT PLN Icon+',
    job1Date: '2023 - Present',
    job1Bullet1: 'Investigated and resolved technical operational tickets with a 100% SLA compliance rate, ensuring timely resolution of customer transaction issues.',
    job1Bullet2: 'Authored and executed complex SQL queries across PostgreSQL, Oracle, and MySQL for operational data validation, transaction auditing, and business reporting.',
    job1Bullet3: 'Monitored nationwide enterprise system workflows 24/7, analyzed application error logs (HTTP 5xx/4xx), and coordinated directly with core developers for bug/API fixes.',
    job2Title: 'Software Engineering & Open Source Research',
    job2Company: 'Independent Engineering & Open Source Projects',
    job2Date: '2023 - Present',
    job2Bullet1: 'Architected, built, and audited 82 production-grade repositories across Backend Microservices (Go, Java Spring Boot, Bun/Hono), Fullstack Web (Next.js 16, React 19), and Mobile.',
    job2Bullet2: 'Designed ACID transactional schemas, implemented JWT/RBAC security pipelines, Redis cache-aside patterns, RabbitMQ brokers, and Docker Compose orchestration.',
    job2Bullet3: 'Shipped and maintained 12 live cloud applications on Vercel with serverless databases, custom domain routing, and responsive UI architecture.',
    degree: 'Bachelor of Computer Science / Information Technology (S.Kom)',
    university: 'Universitas AMIKOM • GPA: 3.42 / 4.00',
    eduDate: '2017 - 2023',
    eduNote: '(Thesis Defense: Dec 2022 | Official Degree / Graduation: 2023)',
    allReposCount: '82 Curated Open-Source Repositories • 12 Live Deployments',
  },
  id: {
    downloadBtn: 'Unduh PDF (3 Halaman)',
    printBtn: 'Cetak / PDF',
    page1Title: 'Profil Eksekutif',
    page2Title: 'Proyek Teknis & Repositori Rekayasa Perangkat Lunak (82 Repositori)',
    page3Title: 'Lampiran Visual Proyek & Studi Kasus Rekayasa Perangkat Lunak',
    experienceTitle: 'Pengalaman Profesional',
    skillsTitle: 'Kompetensi Teknis & Core Stack',
    educationTitle: 'Pendidikan',
    job1Title: 'Application Support Engineer',
    job1Company: 'PT PLN Icon+',
    job1Date: '2023 - Sekarang',
    job1Bullet1: 'Menginvestigasi dan menyelesaikan tiket insiden teknis serta permintaan operasional produksi dengan tingkat kepatuhan SLA mencapai 100% tepat waktu.',
    job1Bullet2: 'Merancang dan mengeksekusi query SQL terstruktur pada database PostgreSQL, Oracle, dan MySQL untuk validasi data transaksi, pelaporan operasional, dan pengecekan konsistensi data.',
    job1Bullet3: 'Memantau operasional alur sistem digital enterprise 24/7, menganalisis log error sistem (HTTP 5xx/4xx), dan berkoordinasi langsung dengan tim pengembang inti untuk verifikasi perbaikan API.',
    job2Title: 'Rekayasa Perangkat Lunak & Riset Open Source',
    job2Company: 'Pengembangan Mandiri & Proyek Open Source',
    job2Date: '2023 - Sekarang',
    job2Bullet1: 'Merancang, membangun, dan mengaudit 82 repositori perangkat lunak mencakup Backend Microservices (Go, Java Spring Boot, Bun/Hono), Fullstack Web (Next.js 16, React 19), dan Mobile.',
    job2Bullet2: 'Merancang skema database transaksional ACID, pipa keamanan JWT/RBAC, pola Redis cache-aside, message broker RabbitMQ, dan orkestrasi Docker Compose.',
    job2Bullet3: 'Men-deploy dan mengelola 12 aplikasi produksi aktif di cloud Vercel dengan integrasi database serverless dan antarmuka reaktif modern.',
    degree: 'Sarjana Ilmu Komputer / Teknik Informatika (S.Kom)',
    university: 'Universitas AMIKOM • IPK: 3.42 / 4.00',
    eduDate: '2017 - 2023',
    eduNote: '(Selesai Ujian Sidang: Des 2022 | Ijazah / Wisuda Resmi: 2023)',
    allReposCount: '82 Repositori Terverifikasi • 12 Aplikasi Aktif',
  }
};

const visualProjects = [
  {
    id: 'gofinance',
    title: 'GoFinance Banking Core API',
    category: 'Backend',
    catColor: 'bg-sky-100 text-sky-800 dark:bg-sky-950 dark:text-sky-300',
    tech: 'Go • Echo • PostgreSQL • Redis • RabbitMQ • Docker',
    desc: {
      en: 'High-concurrency banking engine with ACID transactional account transfers, Redis cache-aside ledger, RabbitMQ message brokers, and Bcrypt security.',
      id: 'Engine core banking dengan transaksi transfer akun atomik berstandar ACID, Redis cache-aside, message broker RabbitMQ, dan pengamanan Bcrypt.'
    },
    image: '/projects/gofinance.png',
    link: 'https://github.com/mazkev/go-banking-core-system',
    linkLabel: 'github.com/mazkev/go-banking-core-system',
    isLive: false,
  },
  {
    id: 'nexus',
    title: 'Nexus Enterprise Microservices',
    category: 'Fullstack',
    catColor: 'bg-indigo-100 text-indigo-800 dark:bg-indigo-950 dark:text-indigo-300',
    tech: 'Next.js 16 • Java Spring Boot • Resilience4j • PostgreSQL',
    desc: {
      en: 'Distributed enterprise platform featuring Spring Cloud service discovery, circuit-breaker failover protection, and reactive Next.js workspace client.',
      id: 'Platform enterprise terdistribusi dengan service discovery Spring Cloud, proteksi circuit breaker Resilience4j, dan klien workspace Next.js 16.'
    },
    image: '/projects/nexus.png',
    link: 'https://nexus-project-mu.vercel.app',
    linkLabel: 'nexus-project-mu.vercel.app',
    isLive: true,
  },
  {
    id: 'tokopedia',
    title: 'Tokopedia Fullstack Commerce',
    category: 'Fullstack',
    catColor: 'bg-amber-100 text-amber-800 dark:bg-amber-950 dark:text-amber-300',
    tech: 'Go REST API • React 19 • PostgreSQL • Tailwind CSS v4',
    desc: {
      en: 'Commercial e-commerce platform pairing a Go REST API with React 19. Features optimistic cart updates, category filtering chips, and checkout transactions.',
      id: 'Platform e-commerce mengintegrasikan Go REST API dengan React 19. Dilengkapi sinkronisasi keranjang optimistik dan checkout transaksi PostgreSQL.'
    },
    image: '/projects/tokopedia.png',
    link: 'https://tokopedia-react.vercel.app',
    linkLabel: 'tokopedia-react.vercel.app',
    isLive: true,
  },
  {
    id: 'canvass',
    title: 'Canvass Visual Graphic Studio',
    category: 'Frontend',
    catColor: 'bg-purple-100 text-purple-800 dark:bg-purple-950 dark:text-purple-300',
    tech: 'React 19 • React-Konva • Zustand • Tailwind CSS v4',
    desc: {
      en: 'Browser-based vector graphic publishing workspace with dual-layer 60 FPS canvas, multi-element transform matrices, and high-resolution PNG export.',
      id: 'Workstation desain vektor grafis berbasis web dengan dual-layer kanvas 60 FPS, manipulasi transform matriks elemen, dan ekspor multi-format.'
    },
    image: '/projects/canvass.png',
    link: 'https://canva-clone-fawn.vercel.app',
    linkLabel: 'canva-clone-fawn.vercel.app',
    isLive: true,
  },
  {
    id: 'marketx',
    title: 'MarketX Angular E-Commerce',
    category: 'Frontend',
    catColor: 'bg-rose-100 text-rose-800 dark:bg-rose-950 dark:text-rose-300',
    tech: 'Angular 19 • Angular Signals • RxJS • Responsive Dash',
    desc: {
      en: 'Enterprise storefront powered by Angular 19 reactive Signals and RxJS event streams. Features live order tracking and merchant back-office management.',
      id: 'Storefront enterprise menggunakan reaktivitas Angular Signals dan RxJS event streams. Dilengkapi pelacak status pesanan live dan back-office penjual.'
    },
    image: '/projects/marketx.png',
    link: 'https://market-x-angular.vercel.app',
    linkLabel: 'market-x-angular.vercel.app',
    isLive: true,
  },
  {
    id: 'spotify',
    title: 'Spotify Web Player & Visualizer',
    category: 'Frontend',
    catColor: 'bg-emerald-100 text-emerald-800 dark:bg-emerald-950 dark:text-emerald-300',
    tech: 'Next.js 16 • Web Audio API • Frequency Visualizer • Tailwind',
    desc: {
      en: 'High-fidelity audio streaming client with real-time Web Audio API frequency analysis canvas visualizer, dynamic album color palette extraction, and lyrics.',
      id: 'Klien streaming audio dengan visualisasi frekuensi real-time Web Audio API pada kanvas, ekstraksi warna cover album dinamis, dan sinkronisasi lirik.'
    },
    image: '/projects/spotify.png',
    link: 'https://spotify-clonez.vercel.app',
    linkLabel: 'spotify-clonez.vercel.app',
    isLive: true,
  },
];

export default function ResumeViewer({ isOpen, onClose }: ResumeViewerProps) {
  const [lang, setLang] = useState<CVLang>('id');
  const [activeRole, setActiveRole] = useState<ResumeRole>('fullstack');

  const handlePrint = () => window.print();

  if (!isOpen) return null;

  const currentRole = roleContent[activeRole][lang];
  const t = commonText[lang];

  return (
    <div className="fixed inset-0 z-50 flex justify-end print:absolute print:inset-auto print:w-full print:h-auto print:block">
      <style jsx global>{`
        @page { size: A4; margin: 8mm 10mm; }
        @media print {
          .no-print { display: none !important; }
          html, body { height: auto !important; overflow: visible !important; margin: 0 !important; background: white !important; }
          body * { visibility: hidden; }
          #print-area, #print-area * { visibility: visible; }
          #print-area { position: absolute; left: 0; top: 0; width: 100%; background: white; color: black; }
          .page-break { display: block !important; page-break-before: always !important; break-before: page !important; height: 0 !important; margin: 0 !important; }
          #print-area * { color: black !important; border-color: #000000 !important; }
        }
      `}</style>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={onClose}
        className="absolute inset-0 bg-black/60 backdrop-blur-sm no-print"
      />

      <motion.div
        initial={{ x: '100%' }}
        animate={{ x: 0 }}
        exit={{ x: '100%' }}
        transition={{ type: 'spring', damping: 25, stiffness: 200 }}
        className="relative w-full max-w-5xl h-full print:h-auto bg-white text-slate-900 border-l border-slate-300 shadow-2xl flex flex-col z-10 font-sans"
      >
        {/* CONTROL HEADER (NO-PRINT) */}
        <div className="px-5 py-3.5 bg-slate-100 dark:bg-slate-900 border-b border-slate-300 dark:border-slate-800 flex items-center justify-between no-print flex-shrink-0 flex-wrap gap-2.5">
          <div className="flex items-center gap-2 flex-wrap">
            {/* ROLE SELECTOR TABS */}
            <div className="flex items-center bg-slate-200 dark:bg-slate-800 p-1 rounded-xl border border-slate-300 dark:border-slate-700">
              <button
                onClick={() => setActiveRole('fullstack')}
                className={`px-3 py-1 text-xs font-bold rounded-lg transition-all flex items-center gap-1 cursor-pointer ${
                  activeRole === 'fullstack'
                    ? 'bg-slate-900 text-white dark:bg-white dark:text-black shadow'
                    : 'text-slate-700 dark:text-slate-300 hover:text-black dark:hover:text-white'
                }`}
                title="Tampilkan seluruh kompetensi Fullstack"
              >
                <Layers size={13} /> Fullstack
              </button>
              <button
                onClick={() => setActiveRole('backend')}
                className={`px-3 py-1 text-xs font-bold rounded-lg transition-all flex items-center gap-1 cursor-pointer ${
                  activeRole === 'backend'
                    ? 'bg-sky-600 text-white shadow'
                    : 'text-slate-700 dark:text-slate-300 hover:text-black dark:hover:text-white'
                }`}
                title="Prioritaskan sistem Backend & Cloud"
              >
                <Server size={13} /> Back End
              </button>
              <button
                onClick={() => setActiveRole('frontend')}
                className={`px-3 py-1 text-xs font-bold rounded-lg transition-all flex items-center gap-1 cursor-pointer ${
                  activeRole === 'frontend'
                    ? 'bg-emerald-600 text-white shadow'
                    : 'text-slate-700 dark:text-slate-300 hover:text-black dark:hover:text-white'
                }`}
                title="Prioritaskan Frontend & Mobile"
              >
                <Cpu size={13} /> Front End & Mobile
              </button>
            </div>

            {/* LANGUAGE TOGGLE (3-PAGE STRICT) */}
            <div className="flex items-center bg-slate-200 dark:bg-slate-800 p-1 rounded-xl border border-slate-300 dark:border-slate-700">
              <button
                onClick={() => setLang('id')}
                className={`px-2.5 py-1 text-xs font-bold rounded-lg transition-all flex items-center gap-1 cursor-pointer ${
                  lang === 'id'
                    ? 'bg-slate-900 text-white dark:bg-white dark:text-black shadow'
                    : 'text-slate-700 dark:text-slate-300 hover:text-black dark:hover:text-white'
                }`}
                title="Versi Bahasa Indonesia (Tepat 3 Halaman ATS)"
              >
                🇮🇩 Indonesia (3 Hlm)
              </button>
              <button
                onClick={() => setLang('en')}
                className={`px-2.5 py-1 text-xs font-bold rounded-lg transition-all flex items-center gap-1 cursor-pointer ${
                  lang === 'en'
                    ? 'bg-slate-900 text-white dark:bg-white dark:text-black shadow'
                    : 'text-slate-700 dark:text-slate-300 hover:text-black dark:hover:text-white'
                }`}
                title="English Version (Strict 3-Page ATS)"
              >
                🇬🇧 English (3 Pages)
              </button>
            </div>

            {/* ACTION BUTTONS */}
            <button
              onClick={handlePrint}
              className="px-4 py-2 bg-slate-900 dark:bg-white text-white dark:text-black hover:bg-black text-xs font-bold rounded-xl flex items-center gap-2 transition-all cursor-pointer shadow-md"
            >
              <Printer size={14} /> {t.printBtn}
            </button>
            <a
              href={lang === 'id' ? "/resume-id.pdf" : "/resume.pdf"}
              target="_blank"
              download={lang === 'id' ? "resume-kevin-eka-pratama-id.pdf" : "resume-kevin-eka-pratama.pdf"}
              className="px-3.5 py-2 bg-slate-200 dark:bg-slate-800 hover:bg-slate-300 dark:hover:bg-slate-700 text-slate-900 dark:text-white text-xs font-bold rounded-xl flex items-center gap-1.5 transition-all cursor-pointer border border-slate-400 dark:border-slate-700"
            >
              <Download size={14} /> {t.downloadBtn}
            </a>
          </div>

          <button
            onClick={onClose}
            aria-label="Close resume"
            className="p-2 text-slate-500 hover:text-black dark:hover:text-white rounded-xl hover:bg-slate-200 dark:hover:bg-slate-800 transition-all cursor-pointer"
          >
            <X size={20} />
          </button>
        </div>

        {/* PRINTABLE STRICT 3-PAGE BODY */}
        <div className="flex-grow overflow-y-auto p-6 md:p-8 bg-white text-slate-900 print:p-0" id="print-area">
          <div className="max-w-4xl mx-auto font-sans">
            
            {/* ========================================================= */}
            {/* PAGE 1: EXECUTIVE PROFILE, EXPERIENCE & EDUCATION         */}
            {/* ========================================================= */}
            <div className="space-y-4 print:space-y-2.5 pb-4 print:pb-0">
              {/* HEADER */}
              <div className="border-b-2 border-slate-900 pb-3 print:pb-2 flex flex-row items-center justify-between gap-4 print:gap-2.5">
                <div className="w-16 h-16 md:w-20 md:h-20 print:w-14 print:h-14 flex-shrink-0 rounded-xl overflow-hidden border-2 border-slate-900 shadow-sm bg-white print:border-none print:shadow-none">
                  <Image
                    src="/profile/kev.png"
                    alt="Kevin Eka Pratama"
                    width={80}
                    height={80}
                    className="w-full h-full object-cover"
                    priority
                  />
                </div>

                <div className="flex-grow space-y-0.5">
                  <h1 className="text-xl sm:text-2xl md:text-3xl print:text-lg font-black text-slate-900 uppercase tracking-tight">
                    Kevin Eka Pratama
                  </h1>
                  <p className="text-xs sm:text-sm print:text-[10px] font-extrabold text-slate-800 uppercase tracking-wide">
                    {currentRole.title}
                  </p>
                  <div className="flex flex-wrap items-center gap-x-2.5 gap-y-0.5 text-xs print:text-[8.5px] text-slate-700 font-medium">
                    <span className="flex items-center gap-1 font-mono">
                      <Mail size={11} className="text-slate-900 print:w-2.5 print:h-2.5" /> kevinekapratama@gmail.com
                    </span>
                    <span className="hidden sm:inline print:inline">•</span>
                    <span className="flex items-center gap-1 font-mono">
                      <Phone size={11} className="text-slate-900 print:w-2.5 print:h-2.5" /> +62 (813) 2661-2344
                    </span>
                    <span className="hidden sm:inline print:inline">•</span>
                    <a href="https://mazkev.vercel.app" target="_blank" rel="noreferrer" className="flex items-center gap-1 font-mono text-slate-900 hover:underline">
                      <Globe size={11} className="text-slate-900 print:w-2.5 print:h-2.5" /> mazkev.vercel.app
                    </a>
                    <span className="hidden sm:inline print:inline">•</span>
                    <a href="https://github.com/mazkev" target="_blank" rel="noreferrer" className="flex items-center gap-1 font-mono text-slate-900 hover:underline">
                      <Github size={11} className="text-slate-900 print:w-2.5 print:h-2.5" /> github.com/mazkev
                    </a>
                    <span className="hidden sm:inline print:inline">•</span>
                    <span className="flex items-center gap-1 font-mono">
                      <MapPin size={11} className="text-slate-900 print:w-2.5 print:h-2.5" /> Jakarta, Indonesia
                    </span>
                  </div>
                </div>
              </div>

              {/* EXECUTIVE SUMMARY */}
              <div className="space-y-1 print:space-y-0.5 print:break-inside-avoid">
                <div className="flex items-center justify-between border-b border-slate-800 pb-0.5">
                  <h2 className="text-xs sm:text-sm print:text-[10px] font-extrabold uppercase tracking-wider text-slate-900 flex items-center gap-1.5">
                    <User size={14} className="text-slate-900 print:w-3 print:h-3" /> {currentRole.executiveSummaryTitle}
                  </h2>
                  <span className="text-[10px] print:text-[7.5px] font-mono font-bold text-slate-500 uppercase">
                    {lang === 'en' ? 'Executive Profile (Page 1 of 3)' : 'Profil Eksekutif (Halaman 1 dari 3)'}
                  </span>
                </div>
                <p className="text-slate-800 text-xs sm:text-sm print:text-[9.5px] leading-relaxed print:leading-normal font-medium text-justify">
                  {currentRole.executiveSummary}
                </p>
              </div>

              {/* PROFESSIONAL EXPERIENCE */}
              <div className="space-y-1.5 print:space-y-1 print:break-inside-avoid">
                <h2 className="text-xs sm:text-sm print:text-[10px] font-extrabold uppercase tracking-wider text-slate-900 border-b border-slate-800 pb-0.5 flex items-center gap-1.5">
                  <Briefcase size={14} className="text-slate-900 print:w-3 print:h-3" /> {t.experienceTitle}
                </h2>

                <div className="space-y-2 print:space-y-1">
                  <div className="space-y-0.5 print:break-inside-avoid">
                    <div className="flex justify-between items-start flex-wrap gap-1">
                      <div>
                        <span className="font-extrabold text-slate-900 text-xs sm:text-sm print:text-[10px]">
                          {t.job1Title}
                        </span>
                        <span className="text-slate-500 text-xs print:text-[9px]"> • </span>
                        <span className="text-xs print:text-[9.5px] font-bold text-slate-700">
                          {t.job1Company}
                        </span>
                      </div>
                      <span className="text-[10px] print:text-[8px] font-mono font-bold text-slate-900 bg-slate-100 px-1.5 py-0.5 rounded border border-slate-300">
                        {t.job1Date}
                      </span>
                    </div>
                    <ul className="list-disc pl-4 text-slate-800 text-xs print:text-[9.5px] leading-relaxed print:leading-normal space-y-0.5 font-medium">
                      <li>{t.job1Bullet1}</li>
                      <li>{t.job1Bullet2}</li>
                      <li>{t.job1Bullet3}</li>
                    </ul>
                  </div>

                  <div className="space-y-0.5 print:break-inside-avoid">
                    <div className="flex justify-between items-start flex-wrap gap-1">
                      <div>
                        <span className="font-extrabold text-slate-900 text-xs sm:text-sm print:text-[10px]">
                          {t.job2Title}
                        </span>
                        <span className="text-slate-500 text-xs print:text-[9px]"> • </span>
                        <span className="text-xs print:text-[9.5px] font-bold text-slate-700">
                          {t.job2Company}
                        </span>
                      </div>
                      <span className="text-[10px] print:text-[8px] font-mono font-bold text-slate-900 bg-slate-100 px-1.5 py-0.5 rounded border border-slate-300">
                        {t.job2Date}
                      </span>
                    </div>
                    <ul className="list-disc pl-4 text-slate-800 text-xs print:text-[9.5px] leading-relaxed print:leading-normal space-y-0.5 font-medium">
                      <li>{t.job2Bullet1}</li>
                      <li>{t.job2Bullet2}</li>
                      <li>{t.job2Bullet3}</li>
                    </ul>
                  </div>
                </div>
              </div>

              {/* TECHNICAL COMPETENCIES */}
              <div className="space-y-1 print:space-y-0.5 print:break-inside-avoid">
                <h2 className="text-xs sm:text-sm print:text-[10px] font-extrabold uppercase tracking-wider text-slate-900 border-b border-slate-800 pb-0.5 flex items-center gap-1.5">
                  <Code size={14} className="text-slate-900 print:w-3 print:h-3" /> {t.skillsTitle}
                </h2>
                
                <div className="space-y-1 text-xs print:text-[9px] text-slate-800 leading-relaxed font-medium">
                  <p>
                    <strong>{lang === 'id' ? 'Bahasa Pemrograman:' : 'Programming Languages:'}</strong> Go (Golang), Java (JDK 17/21), TypeScript, JavaScript (Node.js/Bun), Python 3, PHP 8, Dart, SQL, HTML5/CSS3
                  </p>
                  <p>
                    <strong>{lang === 'id' ? 'Backend & Cloud:' : 'Backend & Cloud:'}</strong> Java Spring Boot 3.3, Go (Gin/Fiber/Echo), Bun + Hono, Express.js, FastAPI, Laravel 12, Clean Architecture (DDD), RESTful APIs, gRPC (Protobuf), Microservices, WebSocket
                  </p>
                  <p>
                    <strong>{lang === 'id' ? 'Frontend & Mobile:' : 'Frontend & Mobile:'}</strong> Next.js 16 (App Router), React 19, TypeScript, Vue 3 (Pinia), Angular 19 (Signals), React Native (Expo SDK 56), Flutter (Riverpod 3), Tailwind CSS v4, Zustand, Redux Toolkit
                  </p>
                  <p>
                    <strong>{lang === 'id' ? 'Database & Messaging:' : 'Databases & Messaging:'}</strong> PostgreSQL (GORM, Prisma, ACID Transactions, Connection Pooling), MySQL, MongoDB, SQLite (LibSQL), Redis (Cache-Aside, Rate Limiting), RabbitMQ (Message Broker)
                  </p>
                  <p>
                    <strong>{lang === 'id' ? 'DevOps, Tooling & Testing:' : 'DevOps & Tooling:'}</strong> Docker, Docker Compose, Git & GitHub, Postman, Swagger / OpenAPI, Vite, Webpack 5, Linux Bash, Vercel Edge Runtime
                  </p>
                </div>
              </div>

              {/* EDUCATION */}
              <div className="space-y-1 print:space-y-0.5 print:break-inside-avoid">
                <h2 className="text-xs sm:text-sm print:text-[10px] font-extrabold uppercase tracking-wider text-slate-900 border-b border-slate-800 pb-0.5 flex items-center gap-1.5">
                  <GraduationCap size={14} className="text-slate-900 print:w-3 print:h-3" /> {t.educationTitle}
                </h2>
                <div className="flex justify-between items-start flex-wrap gap-1 text-xs print:text-[9.5px]">
                  <div>
                    <span className="font-extrabold text-slate-900">
                      {t.degree}
                    </span>
                    <span className="text-slate-500"> • </span>
                    <span className="font-bold text-slate-700">
                      {t.university}
                    </span>
                    <span className="text-slate-500 text-[10px] print:text-[8px] font-mono"> {t.eduNote}</span>
                  </div>
                  <span className="text-[10px] print:text-[8px] font-mono font-bold text-slate-900 bg-slate-100 px-1.5 py-0.5 rounded border border-slate-300">
                    {t.eduDate}
                  </span>
                </div>
              </div>

              {/* FOOTER PAGE 1 */}
              <div className="border-t border-slate-300 pt-1.5 flex justify-between items-center text-[10px] print:text-[7.5px] font-mono text-slate-500">
                <span>Kevin Eka Pratama • Software Engineer</span>
                <span>kevinekapratama@gmail.com • +62 (813) 2661-2344</span>
                <span className="font-bold">Page 1 of 3</span>
              </div>
            </div>

            {/* SCREEN DIVIDER */}
            <div className="no-print my-8 py-3 border-y-2 border-dashed border-slate-300 dark:border-slate-700 flex items-center justify-between text-xs font-mono text-slate-500">
              <span className="font-bold uppercase tracking-wider flex items-center gap-2 text-slate-900 dark:text-white">
                <LayoutGrid size={15} className="text-sky-600 dark:text-sky-400" />
                {lang === 'id' ? 'Halaman 2: Proyek Teknis & 82 Repositori Rekayasa Perangkat Lunak' : 'Page 2: Technical Projects & 82 Engineering Repositories'}
              </span>
              <span className="bg-slate-200 dark:bg-slate-800 px-2 py-0.5 rounded text-[10px] font-bold text-slate-700 dark:text-slate-300">
                Page 2 of 3
              </span>
            </div>

            <div className="page-break" />

            {/* ========================================================= */}
            {/* PAGE 2: PROJECTS & ENGINEERING REPOSITORIES (82 REPOS)    */}
            {/* ========================================================= */}
            <div className="space-y-4 print:space-y-2.5 pt-2 print:pt-0 pb-4 print:pb-0">
              {/* PAGE 2 HEADER */}
              <div className="border-b-2 border-slate-900 pb-2 print:pb-1.5 flex justify-between items-baseline gap-2">
                <div>
                  <h2 className="text-sm md:text-base print:text-xs font-black uppercase tracking-wider text-slate-900 flex items-center gap-1.5">
                    <LayoutGrid size={16} className="text-slate-900 print:w-3 print:h-3" />
                    {t.page2Title}
                  </h2>
                  <p className="text-[11px] print:text-[8px] font-bold text-slate-600">
                    {t.allReposCount}
                  </p>
                </div>
                <span className="text-[10px] print:text-[7.5px] font-mono font-bold text-slate-500 uppercase">
                  mazkev.vercel.app
                </span>
              </div>

              {/* EXECUTIVE METRICS BAR */}
              <div className="grid grid-cols-4 gap-2 print:gap-1 p-2 print:p-1.5 bg-slate-50 print:bg-slate-100 rounded-lg border border-slate-300 print:break-inside-avoid">
                <div className="text-center p-1 bg-white print:bg-transparent rounded border border-slate-200 print:border-none">
                  <div className="font-extrabold text-slate-900 text-xs md:text-sm print:text-[10px]">19 Repos</div>
                  <div className="text-[8px] print:text-[6.5px] font-mono font-bold text-slate-600 uppercase">Backend & Cloud</div>
                </div>
                <div className="text-center p-1 bg-white print:bg-transparent rounded border border-slate-200 print:border-none">
                  <div className="font-extrabold text-slate-900 text-xs md:text-sm print:text-[10px]">22 Repos</div>
                  <div className="text-[8px] print:text-[6.5px] font-mono font-bold text-slate-600 uppercase">Fullstack & Mobile</div>
                </div>
                <div className="text-center p-1 bg-white print:bg-transparent rounded border border-slate-200 print:border-none">
                  <div className="font-extrabold text-slate-900 text-xs md:text-sm print:text-[10px]">41 Repos</div>
                  <div className="text-[8px] print:text-[6.5px] font-mono font-bold text-slate-600 uppercase">Frontend Web</div>
                </div>
                <div className="text-center p-1 bg-emerald-50 print:bg-transparent rounded border border-emerald-300 print:border-none">
                  <div className="font-extrabold text-emerald-800 text-xs md:text-sm print:text-[10px]">12 Live Apps</div>
                  <div className="text-[8px] print:text-[6.5px] font-mono font-bold text-emerald-600 uppercase">Active Vercel URLs</div>
                </div>
              </div>

              {/* 4 FEATURED CASE STUDIES */}
              <div className="space-y-2 print:space-y-1">
                <div className="flex items-center justify-between border-b border-slate-800 pb-0.5">
                  <h3 className="text-xs print:text-[9.5px] font-extrabold uppercase tracking-wide text-slate-900">
                    {lang === 'en' ? '4 Featured Engineering Case Studies' : '4 Studi Kasus Rekayasa Arsitektur Utama'}
                  </h3>
                  <span className="text-[9px] print:text-[7px] font-mono font-bold text-slate-500 uppercase">
                    {lang === 'en' ? 'Architectural Highlights' : 'Sorotan Arsitektur Mendalam'}
                  </span>
                </div>

                {/* Case 1 */}
                <div className="p-2 print:p-1.5 rounded bg-slate-50 border border-slate-300 border-l-4 border-l-slate-900 space-y-0.5 print:break-inside-avoid">
                  <div className="flex justify-between items-baseline">
                    <span className="font-extrabold text-slate-900 text-xs print:text-[9.5px]">
                      1. Distributed Microservices & Concurrency Lab
                    </span>
                    <a href="https://github.com/mazkev/go-distributed-microservices-lab" target="_blank" rel="noreferrer" className="text-[9.5px] print:text-[7.5px] font-mono text-sky-700 hover:underline">
                      gh/go-distributed-microservices-lab
                    </a>
                  </div>
                  <div className="text-[9px] print:text-[7px] font-mono font-bold text-slate-600 uppercase">
                    GO • GRPC • PROTOCOL BUFFERS • RABBITMQ • REDIS • CLEAN ARCHITECTURE • DOCKER
                  </div>
                  <p className="text-[11px] print:text-[8px] text-slate-700 font-medium leading-tight">
                    {lang === 'en'
                      ? 'High-throughput microservices architecture with binary gRPC inter-service communication and RabbitMQ asynchronous message queues. Implemented Redis Cache-Aside pattern reducing read latency to sub-milliseconds, worker pool concurrency, and strict Domain-Usecase-Repository decoupling.'
                      : 'Arsitektur microservices performa tinggi dengan komunikasi biner gRPC dan antrean pesan asinkron RabbitMQ. Menerapkan pola Redis Cache-Aside yang mereduksi latensi baca ke sub-milidetik, worker pool concurrency, dan pemisahan lapisan Domain, Usecase, dan Repository.'}
                  </p>
                </div>

                {/* Case 2 */}
                <div className="p-2 print:p-1.5 rounded bg-slate-50 border border-slate-300 border-l-4 border-l-slate-900 space-y-0.5 print:break-inside-avoid">
                  <div className="flex justify-between items-baseline">
                    <span className="font-extrabold text-slate-900 text-xs print:text-[9.5px]">
                      2. BayE Modern E-Commerce & Real-Time Auction Platform
                    </span>
                    <div className="text-[9.5px] print:text-[7.5px] font-mono space-x-1.5">
                      <a href="https://baye-ecommerce-marketplace.vercel.app" target="_blank" rel="noreferrer" className="text-emerald-700 font-bold hover:underline">Live Demo</a>
                      <span>•</span>
                      <a href="https://github.com/mazkev/baye-ecommerce-marketplace" target="_blank" rel="noreferrer" className="text-sky-700 hover:underline">gh/baye-ecommerce-marketplace</a>
                    </div>
                  </div>
                  <div className="text-[9px] print:text-[7px] font-mono font-bold text-slate-600 uppercase">
                    NEXT.JS 16 (APP ROUTER) • REACT 19 • PRISMA 7 • LIBSQL • SERVER COMPONENTS • INVOICE QR
                  </div>
                  <p className="text-[11px] print:text-[8px] text-slate-700 font-medium leading-tight">
                    {lang === 'en'
                      ? 'Production auction marketplace built with Next.js 16 and Prisma 7 LibSQL adapter. Features server-rendered initial hydration for instant load, responsive live bidding simulation, multi-product spec comparisons, and digital QR invoice generation.'
                      : 'Platform e-commerce lelang produksi dengan Next.js 16 dan adapter Prisma 7 LibSQL. Menampilkan server-rendered hydration untuk waktu muat instan, simulasi live bidding interaktif, perbandingan spesifikasi produk, dan generator invoice QR digital.'}
                  </p>
                </div>

                {/* Case 3 */}
                <div className="p-2 print:p-1.5 rounded bg-slate-50 border border-slate-300 border-l-4 border-l-slate-900 space-y-0.5 print:break-inside-avoid">
                  <div className="flex justify-between items-baseline">
                    <span className="font-extrabold text-slate-900 text-xs print:text-[9.5px]">
                      3. Digital Wallet & Transactional Balance Transfer Engine
                    </span>
                    <a href="https://github.com/mazkev/go-banking-core-system" target="_blank" rel="noreferrer" className="text-[9.5px] print:text-[7.5px] font-mono text-sky-700 hover:underline">
                      gh/go-banking-core-system
                    </a>
                  </div>
                  <div className="text-[9px] print:text-[7px] font-mono font-bold text-slate-600 uppercase">
                    GO • POSTGRESQL • GORM • ACID TRANSACTION ISOLATION • BCRYPT PIN • SWAGGER OPENAPI
                  </div>
                  <p className="text-[11px] print:text-[8px] text-slate-700 font-medium leading-tight">
                    {lang === 'en'
                      ? 'Financial balance transfer engine implementing atomic account-to-account transfers with ACID transaction isolation and row-level locking in PostgreSQL, preventing race conditions and double-spending. Features Bcrypt PIN validation and structured audit ledger logging.'
                      : 'Engine transfer saldo dompet digital yang menerapkan transfer akun atomik dengan isolasi transaksi ACID dan row-level locking di PostgreSQL untuk mencegah race condition. Dilengkapi validasi PIN Bcrypt dan structured audit ledger logging.'}
                  </p>
                </div>

                {/* Case 4 */}
                <div className="p-2 print:p-1.5 rounded bg-slate-50 border border-slate-300 border-l-4 border-l-slate-900 space-y-0.5 print:break-inside-avoid">
                  <div className="flex justify-between items-baseline">
                    <span className="font-extrabold text-slate-900 text-xs print:text-[9.5px]">
                      4. Canvass Visual Graphic Design & Publishing Workstation
                    </span>
                    <div className="text-[9.5px] print:text-[7.5px] font-mono space-x-1.5">
                      <a href="https://canva-clone-fawn.vercel.app" target="_blank" rel="noreferrer" className="text-emerald-700 font-bold hover:underline">Live Demo</a>
                      <span>•</span>
                      <a href="https://github.com/mazkev/react-canva-design-studio" target="_blank" rel="noreferrer" className="text-sky-700 hover:underline">gh/react-canva-design-studio</a>
                    </div>
                  </div>
                  <div className="text-[9px] print:text-[7px] font-mono font-bold text-slate-600 uppercase">
                    REACT 19 • REACT-KONVA • DUAL-LAYER 60 FPS CANVAS • ZUSTAND • TAILWIND CSS V4
                  </div>
                  <p className="text-[11px] print:text-[8px] text-slate-700 font-medium leading-tight">
                    {lang === 'en'
                      ? 'Interactive vector publishing workspace built on React 19 and React-Konva. Utilizes dual-layer canvas architecture isolating transformation matrices from main UI rendering tree, reactive Zustand state, and high-resolution export pipelines.'
                      : 'Workstation desain vektor interaktif berbasis React 19 dan React-Konva. Menggunakan arsitektur dual-layer kanvas 60 FPS untuk mengisolasi transformasi grafis dari UI utama, state reaktif Zustand, dan pipeline ekspor multi-format resolusi tinggi.'}
                  </p>
                </div>
              </div>

              {/* 12 LIVE DEPLOYMENTS TABLE */}
              <div className="space-y-1 print:space-y-0.5 print:break-inside-avoid">
                <div className="flex items-center justify-between border-b border-slate-800 pb-0.5">
                  <h3 className="text-xs print:text-[9.5px] font-extrabold uppercase tracking-wide text-slate-900">
                    {lang === 'en' ? '12 Verified Cloud Deployments (HTTP 200 OK on Vercel)' : '12 Aplikasi Aktif Terverifikasi di Cloud (Vercel)'}
                  </h3>
                  <span className="text-[9px] print:text-[7px] font-mono font-bold text-emerald-700 uppercase">
                    {lang === 'en' ? 'Clickable Live Demos' : 'Dapat Diuji Langsung'}
                  </span>
                </div>
                <div className="grid grid-cols-2 gap-1 text-[10px] print:text-[7.5px] font-mono">
                  <div className="p-1 rounded bg-slate-50 border border-slate-200 flex justify-between items-center">
                    <strong>1. BayE Auction Store:</strong>
                    <a href="https://baye-ecommerce-marketplace.vercel.app" target="_blank" rel="noreferrer" className="text-emerald-700 hover:underline">baye-ecommerce-marketplace.vercel.app</a>
                  </div>
                  <div className="p-1 rounded bg-slate-50 border border-slate-200 flex justify-between items-center">
                    <strong>2. Nexus Workspace:</strong>
                    <a href="https://nexus-project-mu.vercel.app" target="_blank" rel="noreferrer" className="text-emerald-700 hover:underline">nexus-project-mu.vercel.app</a>
                  </div>
                  <div className="p-1 rounded bg-slate-50 border border-slate-200 flex justify-between items-center">
                    <strong>3. Spotify Web Player:</strong>
                    <a href="https://spotify-clonez.vercel.app" target="_blank" rel="noreferrer" className="text-emerald-700 hover:underline">spotify-clonez.vercel.app</a>
                  </div>
                  <div className="p-1 rounded bg-slate-50 border border-slate-200 flex justify-between items-center">
                    <strong>4. Indofooty Match Hub:</strong>
                    <a href="https://indofooty.vercel.app" target="_blank" rel="noreferrer" className="text-emerald-700 hover:underline">indofooty.vercel.app</a>
                  </div>
                  <div className="p-1 rounded bg-slate-50 border border-slate-200 flex justify-between items-center">
                    <strong>5. AI Wireframer Lab:</strong>
                    <a href="https://ai-component-wireframer.vercel.app" target="_blank" rel="noreferrer" className="text-emerald-700 hover:underline">ai-component-wireframer.vercel.app</a>
                  </div>
                  <div className="p-1 rounded bg-slate-50 border border-slate-200 flex justify-between items-center">
                    <strong>6. Umrah Travel Portal:</strong>
                    <a href="https://umrah-travel-landing.vercel.app" target="_blank" rel="noreferrer" className="text-emerald-700 hover:underline">umrah-travel-landing.vercel.app</a>
                  </div>
                  <div className="p-1 rounded bg-slate-50 border border-slate-200 flex justify-between items-center">
                    <strong>7. Cloud Simulator:</strong>
                    <a href="https://cloud-console-simulator.vercel.app" target="_blank" rel="noreferrer" className="text-emerald-700 hover:underline">cloud-console-simulator.vercel.app</a>
                  </div>
                  <div className="p-1 rounded bg-slate-50 border border-slate-200 flex justify-between items-center">
                    <strong>8. Snake AI Pathfinding:</strong>
                    <a href="https://snake-ai-pathfinding.vercel.app" target="_blank" rel="noreferrer" className="text-emerald-700 hover:underline">snake-ai-pathfinding.vercel.app</a>
                  </div>
                  <div className="p-1 rounded bg-slate-50 border border-slate-200 flex justify-between items-center">
                    <strong>9. Canvass Design Studio:</strong>
                    <a href="https://canva-clone-fawn.vercel.app" target="_blank" rel="noreferrer" className="text-emerald-700 hover:underline">canva-clone-fawn.vercel.app</a>
                  </div>
                  <div className="p-1 rounded bg-slate-50 border border-slate-200 flex justify-between items-center">
                    <strong>10. Trello Kanban Suite:</strong>
                    <a href="https://trello-azure-five.vercel.app" target="_blank" rel="noreferrer" className="text-emerald-700 hover:underline">trello-azure-five.vercel.app</a>
                  </div>
                  <div className="p-1 rounded bg-slate-50 border border-slate-200 flex justify-between items-center">
                    <strong>11. MarketX Angular Store:</strong>
                    <a href="https://market-x-angular.vercel.app" target="_blank" rel="noreferrer" className="text-emerald-700 hover:underline">market-x-angular.vercel.app</a>
                  </div>
                  <div className="p-1 rounded bg-slate-50 border border-slate-200 flex justify-between items-center">
                    <strong>12. HubSpot CRM Platform:</strong>
                    <a href="https://hub-spot-clone-five.vercel.app" target="_blank" rel="noreferrer" className="text-emerald-700 hover:underline">hub-spot-clone-five.vercel.app</a>
                  </div>
                </div>
              </div>

              {/* AUDIT NOTE */}
              <div className="p-2 print:p-1.5 rounded bg-slate-100 border border-slate-300 text-[10px] print:text-[7.5px] text-slate-800 font-medium leading-tight">
                <strong>{lang === 'en' ? 'Complete 82-Repository Directory: ' : 'Katalog Lengkap 82 Repositori: '}</strong>
                {lang === 'en' 
                  ? 'Source code for all 82 audited repositories across Backend (19), Fullstack & Mobile (22), and Frontend (41) is publicly available at github.com/mazkev and interactive web workstation at mazkev.vercel.app.'
                  : 'Seluruh source code 82 repositori terverifikasi (19 Backend, 22 Fullstack & Mobile, 41 Frontend) dapat diakses publik pada profil GitHub github.com/mazkev dan web workstation interaktif mazkev.vercel.app.'}
              </div>

              {/* FOOTER PAGE 2 */}
              <div className="border-t border-slate-300 pt-1.5 flex justify-between items-center text-[10px] print:text-[7.5px] font-mono text-slate-500">
                <span>Kevin Eka Pratama • Software Engineer</span>
                <span>mazkev.vercel.app • github.com/mazkev</span>
                <span className="font-bold">Page 2 of 3</span>
              </div>
            </div>

            {/* SCREEN DIVIDER */}
            <div className="no-print my-8 py-3 border-y-2 border-dashed border-slate-300 dark:border-slate-700 flex items-center justify-between text-xs font-mono text-slate-500">
              <span className="font-bold uppercase tracking-wider flex items-center gap-2 text-slate-900 dark:text-white">
                <FileText size={15} className="text-emerald-600 dark:text-emerald-400" />
                {lang === 'id' ? 'Halaman 3: Lampiran Visual Proyek & Studi Kasus' : 'Page 3: Visual Case Studies & Technical Project Annex'}
              </span>
              <span className="bg-slate-200 dark:bg-slate-800 px-2 py-0.5 rounded text-[10px] font-bold text-slate-700 dark:text-slate-300">
                Page 3 of 3
              </span>
            </div>

            <div className="page-break" />

            {/* ========================================================= */}
            {/* PAGE 3: VISUAL PROJECT CASE STUDIES & ARCHITECTURE ANNEX  */}
            {/* ========================================================= */}
            <div className="space-y-3 print:space-y-2 pt-2 print:pt-0">
              {/* PAGE 3 HEADER */}
              <div className="border-b-2 border-slate-900 pb-2 print:pb-1.5 flex justify-between items-baseline gap-2">
                <div>
                  <h2 className="text-sm md:text-base print:text-xs font-black uppercase tracking-wider text-slate-900 flex items-center gap-1.5">
                    <FileText size={16} className="text-slate-900 print:w-3 print:h-3" />
                    {t.page3Title}
                  </h2>
                  <p className="text-[11px] print:text-[8px] font-bold text-slate-600">
                    {lang === 'en'
                      ? 'Architectural Screenshots, System Flows & Production Interfaces'
                      : 'Tangkapan Layar Arsitektur, Alur Sistem & Tampilan Antarmuka Produksi'}
                  </p>
                </div>
                <span className="text-[10px] print:text-[7.5px] font-mono font-bold text-slate-500 uppercase">
                  mazkev.vercel.app
                </span>
              </div>

              {/* 6 VISUAL CARDS GRID (2 cols x 3 rows) */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 print:gap-1.5">
                {visualProjects.map((p, idx) => (
                  <div
                    key={p.id}
                    className="border border-slate-300 rounded-lg overflow-hidden bg-white flex flex-col justify-between print:break-inside-avoid shadow-sm print:shadow-none"
                  >
                    <div className="h-24 sm:h-28 print:h-16 w-full bg-slate-100 border-b border-slate-200 relative overflow-hidden">
                      <Image
                        src={p.image}
                        alt={p.title}
                        width={280}
                        height={120}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <div className="p-2 print:p-1.5 space-y-1">
                      <div className="flex justify-between items-center gap-1">
                        <span className="font-extrabold text-slate-900 text-xs print:text-[9px] leading-tight">
                          {idx + 1}. {p.title}
                        </span>
                        <span className={`text-[8.5px] print:text-[6.5px] font-mono font-bold px-1.5 py-0.5 rounded uppercase flex-shrink-0 ${p.catColor}`}>
                          {p.category}
                        </span>
                      </div>
                      <div className="text-[9px] print:text-[7px] font-mono font-bold text-slate-600 truncate">
                        {p.tech}
                      </div>
                      <p className="text-[10.5px] print:text-[7.5px] text-slate-700 font-medium leading-snug">
                        {p.desc[lang]}
                      </p>
                      <div className="pt-1 border-t border-slate-100 flex items-center gap-1 text-[9.5px] print:text-[7px] font-mono">
                        <a
                          href={p.link}
                          target="_blank"
                          rel="noreferrer"
                          className="text-sky-700 hover:underline flex items-center gap-0.5"
                        >
                          <span>{p.linkLabel}</span>
                          <ExternalLink size={9} className="opacity-70" />
                        </a>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {/* AUDIT NOTICE */}
              <div className="p-2 print:p-1.5 rounded bg-slate-100 border border-slate-300 text-[10px] print:text-[7.5px] text-slate-800 font-medium leading-tight">
                <strong>{lang === 'en' ? 'Interactive Demonstration & Source Code Audit: ' : 'Demonstrasi Interaktif & Audit Kode Sumber: '}</strong>
                {lang === 'en'
                  ? 'Live deployments, interactive case studies, architectural documentation, and full source code for all 82 projects are accessible at mazkev.vercel.app and github.com/mazkev.'
                  : 'Seluruh demo aplikasi langsung, studi kasus interaktif, dokumentasi arsitektur, dan kode sumber untuk 82 repositori dapat diakses publik pada mazkev.vercel.app dan github.com/mazkev.'}
              </div>

              {/* FOOTER PAGE 3 */}
              <div className="border-t border-slate-300 pt-1.5 flex justify-between items-center text-[10px] print:text-[7.5px] font-mono text-slate-500">
                <span>Kevin Eka Pratama • Software Engineer</span>
                <span>mazkev.vercel.app • github.com/mazkev</span>
                <span className="font-bold">Page 3 of 3</span>
              </div>
            </div>

          </div>
        </div>
      </motion.div>
    </div>
  );
}
