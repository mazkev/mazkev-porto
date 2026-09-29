'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import {
  X, Printer, Download, Mail, Phone, MapPin, Code, Briefcase,
  GraduationCap, LayoutGrid, Globe, Github, Layers, Server, Cpu,
  FileText, User, Smartphone, FlaskConical, ExternalLink, Star
} from 'lucide-react';
import Image from 'next/image';
import { ALL_REPOSITORIES, DOMAIN_META, RepoItem } from '../lib/data/allRepositories';
import { projects } from '../lib/data/projects';

interface ResumeViewerProps {
  isOpen: boolean;
  onClose: () => void;
}

export type ResumeRole = 'fullstack' | 'frontend' | 'backend';
export type CVMode = 'bilingual' | 'en' | 'id';
export type DomainFilter = 'all' | 'backend' | 'fullstack' | 'frontend' | 'mobile' | 'exploration';

const roleContent = {
  fullstack: {
    en: {
      title: 'Fullstack Software Engineer',
      executiveSummaryTitle: 'Executive Summary',
      executiveSummary: 'Fullstack Software Engineer with 2+ years of professional experience in Application Support at PT PLN Icon+. Proven track record of independently designing, building, and deploying 93 software repositories across distributed backend systems (Go, Java Spring Boot, Bun/Hono, Express.js), fullstack web platforms (Next.js 16, React 19, Laravel 12, FastAPI), modern frontend clients, and cross-platform mobile apps (React Native, Flutter). Strong foundation in database architecture, relational schema optimization (PostgreSQL, MySQL), NoSQL (MongoDB), ACID transactions, Clean Architecture, and containerized deployment.',
    },
    id: {
      title: 'Fullstack Software Engineer',
      executiveSummaryTitle: 'Ringkasan Eksekutif',
      executiveSummary: 'Fullstack Software Engineer dengan 2+ tahun pengalaman profesional di bidang Application Support pada PT PLN Icon+. Memiliki rekam jejak terverifikasi dalam merancang, membangun, dan mendokumentasikan 93 repositori perangkat lunak secara mandiri mencakup sistem backend terdistribusi (Go, Java Spring Boot, Bun/Hono, Express.js), platform web fullstack (Next.js 16, React 19, Laravel 12, FastAPI), aplikasi frontend modern, serta mobile cross-platform (React Native, Flutter). Menguasai arsitektur database relasional (PostgreSQL, MySQL), NoSQL (MongoDB), transaksi ACID, Clean Architecture, dan containerization Docker.',
    }
  },
  frontend: {
    en: {
      title: 'Frontend & Mobile Engineer',
      executiveSummaryTitle: 'Executive Summary',
      executiveSummary: 'Frontend & Mobile Engineer specializing in high-performance, user-centric web and mobile platforms with React 19, Next.js 16, TypeScript, Vue 3, Angular 19, and React Native (Expo SDK 56). Creator of 48+ production-grade frontend and mobile applications featuring complex client state management (Zustand, Redux Toolkit, Signals), interactive canvas/3D graphics (React-Konva, Three.js), GIS mapping (Leaflet, OSRM), and real-time WebSockets. Backed by 2+ years of enterprise Application Support experience ensuring system reliability and user operational excellence.',
    },
    id: {
      title: 'Frontend & Mobile Engineer',
      executiveSummaryTitle: 'Ringkasan Eksekutif',
      executiveSummary: 'Frontend & Mobile Engineer dengan spesialisasi pengembangan antarmuka web dan mobile performa tinggi berbasis React 19, Next.js 16, TypeScript, Vue 3, Angular 19, dan React Native (Expo SDK 56). Membangun 48+ aplikasi frontend dan mobile dengan arsitektur state management kompleks (Zustand, Redux Toolkit, Signals), kanvas grafis 2D/3D (React-Konva, Three.js), pemetaan GIS (Leaflet, OSRM), serta real-time WebSockets. Didukung 2+ tahun pengalaman Application Support enterprise dalam menjamin keandalan sistem dan alur kerja operasional.',
    }
  },
  backend: {
    en: {
      title: 'Backend & Cloud Systems Engineer (Go / Java / Node.js)',
      executiveSummaryTitle: 'Executive Summary',
      executiveSummary: 'Backend & Cloud Systems Engineer specializing in Go (Golang), Java Spring Boot, Bun/Hono, and Node.js RESTful/gRPC microservices. Architect of 32+ backend and fullstack platforms implementing Clean Architecture, ACID transactional ledgers, Redis cache-aside, RabbitMQ message brokers, and database connection pooling (PostgreSQL, MongoDB, MySQL). Backed by 2+ years of Application Support at PT PLN Icon+, with rigorous practical mastery in database query optimization, production log troubleshooting, and high-availability operations.',
    },
    id: {
      title: 'Backend & Cloud Systems Engineer (Go / Java / Node.js)',
      executiveSummaryTitle: 'Ringkasan Eksekutif',
      executiveSummary: 'Backend & Cloud Systems Engineer dengan spesialisasi pengembangan layanan mikro RESTful/gRPC berkinerja tinggi menggunakan Go (Golang), Java Spring Boot, Bun/Hono, dan Node.js. Mengembangkan 32+ sistem backend dan fullstack berprinsip Clean Architecture, transaksi buku besar ACID, Redis cache-aside, message broker RabbitMQ, serta connection pooling database (PostgreSQL, MongoDB, MySQL). Diperkuat oleh 2+ tahun pengalaman Application Support di PT PLN Icon+ dengan kemahiran praktis dalam optimasi query SQL, investigasi log produksi, dan keandalan sistem berstandar enterprise.',
    }
  }
};

const commonText = {
  en: {
    downloadBtn: 'Download PDF',
    printBtn: 'Print Document',
    experienceTitle: 'Professional Experience',
    projectsTitle: 'Verified Technical Portfolio Directory (All 93 Repositories)',
    skillsTitle: 'Technical Competencies & Core Stack',
    educationTitle: 'Education',
    job1Title: 'Application Support',
    job1Company: 'PT PLN Icon+',
    job1Date: '2023 - Present',
    job1Bullet1: 'Monitored critical enterprise system workflows and resolved production incidents to guarantee uninterrupted 24/7 public utility operations.',
    job1Bullet2: 'Investigated complex database queries, diagnosed performance bottlenecks, and executed SQL query optimization across PostgreSQL, Oracle, and MySQL clusters.',
    job1Bullet3: 'Authored standard operating procedures (SOP), incident post-mortems, and coordinated with core development teams to verify defect fixes and API updates.',
    job2Title: 'Software Engineering & Open Source Development',
    job2Company: 'Independent Engineering & Technical Research',
    job2Date: '2024 - Present',
    job2Bullet1: 'Engineered and audited 93 production-grade repositories spanning Backend Microservices, Fullstack Monorepos, Modern Frontend, and Cross-Platform Mobile Apps.',
    job2Bullet2: 'Designed ACID transactional schemas, implemented JWT/RBAC security pipelines, and orchestrated multi-container environments using Docker Compose.',
    job2Bullet3: 'Maintained strict software craftsmanship: Clean Architecture domain-usecase-repository decoupling, automated CI/CD unit testing, and OpenAPI/Swagger documentation.',
    degree: 'Bachelor of Computer Science / Information Technology',
    university: 'Universitas AMIKOM • GPA: 3.42 / 4.00',
    allReposCount: '93 Audited Repositories (63 Tier 1 Flagships, 16 Tier 2 Supporting, 14 Concept Labs)',
  },
  id: {
    downloadBtn: 'Unduh PDF',
    printBtn: 'Cetak Dokumen',
    experienceTitle: 'Pengalaman Profesional',
    projectsTitle: 'Direktori Portofolio Teknis Terverifikasi (Seluruh 93 Repositori)',
    skillsTitle: 'Kompetensi Teknis & Core Stack',
    educationTitle: 'Pendidikan',
    job1Title: 'Application Support',
    job1Company: 'PT PLN Icon+',
    job1Date: '2023 - Sekarang',
    job1Bullet1: 'Memantau alur operasional sistem enterprise kritis dan menangani insiden produksi untuk menjamin kelancaran layanan utilitas publik secara 24/7.',
    job1Bullet2: 'Menganalisis query database kompleks, mendiagnosis hambatan performa, dan melakukan investigasi teknis pada cluster database PostgreSQL, Oracle, dan MySQL.',
    job1Bullet3: 'Menyusun dokumentasi SOP troubleshooting sistem operasional dan berkoordinasi erat dengan tim developer inti untuk pelaporan bug serta verifikasi perbaikan API.',
    job2Title: 'Rekayasa Perangkat Lunak & Pengembangan Open Source',
    job2Company: 'Pengembangan Mandiri & Riset Arsitektur',
    job2Date: '2024 - Sekarang',
    job2Bullet1: 'Membangun dan mengaudit 93 repositori perangkat lunak mencakup Backend Microservices, Fullstack Monorepo, Frontend Modern, dan Mobile Cross-Platform.',
    job2Bullet2: 'Merancang skema database transaksional ACID, menerapkan pipa keamanan JWT/RBAC, dan mengorkestrasikan lingkungan multi-container dengan Docker Compose.',
    job2Bullet3: 'Menerapkan standar rekayasa perangkat lunak: Clean Architecture decoupling (Domain, Usecase, Repository), unit testing otomatis, dan dokumentasi OpenAPI Swagger.',
    degree: 'Sarjana Ilmu Komputer / Teknologi Informasi',
    university: 'Universitas AMIKOM • IPK: 3.42 / 4.00',
    allReposCount: '93 Repositori Terverifikasi (63 Flagship Tier 1, 16 Supporting Tier 2, 14 Lab Konsep)',
  }
};

interface CVContentProps {
  lang: 'en' | 'id';
  activeRole: ResumeRole;
  domainFilter: DomainFilter;
  pageNumber?: number;
  totalPages?: number;
}

function CVContent({ lang, activeRole, domainFilter, pageNumber, totalPages }: CVContentProps) {
  const currentRoleContent = roleContent[activeRole][lang];
  const t = commonText[lang];

  // Organize domains according to active role preference
  let domainOrder: ('backend' | 'fullstack' | 'frontend' | 'mobile' | 'exploration')[] = [
    'fullstack', 'backend', 'frontend', 'mobile', 'exploration'
  ];

  if (activeRole === 'backend') {
    domainOrder = ['backend', 'fullstack', 'frontend', 'mobile', 'exploration'];
  } else if (activeRole === 'frontend') {
    domainOrder = ['frontend', 'mobile', 'fullstack', 'backend', 'exploration'];
  }

  return (
    <div className="max-w-4xl mx-auto space-y-6 print:space-y-3 font-sans">
      {/* HEADER SECTION */}
      <div className="border-b-2 border-slate-900 pb-4 print:pb-2.5 flex flex-row items-center justify-between gap-5 print:gap-3">
        <div className="w-20 h-20 md:w-24 md:h-24 print:w-16 print:h-16 flex-shrink-0 rounded-xl overflow-hidden border-2 border-slate-900 shadow-md bg-white print:border-none print:shadow-none">
          <Image
            src="/profile/kev.png"
            alt="Kevin Eka Pratama"
            width={96}
            height={96}
            className="w-full h-full object-cover"
            priority
          />
        </div>

        <div className="flex-grow space-y-1 print:space-y-0.5">
          <h1 className="text-2xl sm:text-3xl md:text-4xl print:text-xl font-extrabold text-slate-900 uppercase tracking-tight">
            Kevin Eka Pratama
          </h1>
          <p className="text-xs sm:text-sm md:text-base print:text-[11px] font-bold text-slate-800 uppercase tracking-wider">
            {currentRoleContent.title}
          </p>
          <div className="flex flex-wrap items-center gap-x-3 gap-y-1 text-xs print:text-[9px] text-slate-700 pt-1 print:pt-0 font-medium">
            <span className="flex items-center gap-1 font-mono">
              <Mail size={12} className="text-slate-900 print:w-2.5 print:h-2.5" /> kevinekapratama@gmail.com
            </span>
            <span className="hidden sm:inline print:inline">•</span>
            <span className="flex items-center gap-1 font-mono">
              <Phone size={12} className="text-slate-900 print:w-2.5 print:h-2.5" /> +62 (813) 2661-2344
            </span>
            <span className="hidden sm:inline print:inline">•</span>
            <a href="https://mazkev.vercel.app" target="_blank" rel="noreferrer" className="flex items-center gap-1 font-mono text-slate-900 hover:underline">
              <Globe size={12} className="text-slate-900 print:w-2.5 print:h-2.5" /> mazkev.vercel.app
            </a>
            <span className="hidden sm:inline print:inline">•</span>
            <a href="https://github.com/mazkev" target="_blank" rel="noreferrer" className="flex items-center gap-1 font-mono text-slate-900 hover:underline">
              <Github size={12} className="text-slate-900 print:w-2.5 print:h-2.5" /> github.com/mazkev
            </a>
            <span className="hidden sm:inline print:inline">•</span>
            <span className="flex items-center gap-1 font-mono">
              <MapPin size={12} className="text-slate-900 print:w-2.5 print:h-2.5" /> Jakarta, ID
            </span>
          </div>
        </div>
      </div>

      {/* EXECUTIVE SUMMARY */}
      <div className="space-y-1.5 print:space-y-0.5 print:break-inside-avoid">
        <div className="flex items-center justify-between border-b border-slate-800 pb-1">
          <h2 className="text-sm print:text-xs font-bold uppercase tracking-wider text-slate-900 flex items-center gap-2">
            <User size={16} className="text-slate-900 print:w-3 print:h-3" /> {currentRoleContent.executiveSummaryTitle}
          </h2>
          {pageNumber && totalPages && (
            <span className="text-[10px] print:text-[8px] font-mono font-bold text-slate-500 uppercase">
              {lang === 'en' ? 'English (ATS Standard)' : 'Bahasa Indonesia (Standar ATS)'}
            </span>
          )}
        </div>
        <p className="text-slate-800 text-xs sm:text-sm print:text-[10px] leading-relaxed print:leading-normal font-medium text-justify">
          {currentRoleContent.executiveSummary}
        </p>
      </div>

      {/* PROFESSIONAL EXPERIENCE */}
      <div className="space-y-2 print:space-y-1 print:break-inside-avoid">
        <h2 className="text-sm print:text-xs font-bold uppercase tracking-wider text-slate-900 border-b border-slate-800 pb-1 flex items-center gap-2">
          <Briefcase size={16} className="text-slate-900 print:w-3 print:h-3" /> {t.experienceTitle}
        </h2>

        <div className="space-y-3 print:space-y-1.5">
          <div className="space-y-1 print:space-y-0.5 print:break-inside-avoid">
            <div className="flex justify-between items-start flex-wrap gap-2 print:gap-1">
              <div>
                <h3 className="font-extrabold text-slate-900 text-sm md:text-base print:text-[11.5px]">
                  {t.job1Title}
                </h3>
                <p className="text-xs print:text-[9.5px] font-bold text-slate-700">
                  {t.job1Company}
                </p>
              </div>
              <span className="text-xs print:text-[9.5px] font-mono font-bold text-slate-900 bg-slate-100 px-2 py-0.5 rounded border border-slate-400">
                {t.job1Date}
              </span>
            </div>
            <ul className="list-disc pl-4 text-slate-800 text-xs print:text-[10px] leading-relaxed print:leading-normal space-y-0.5 font-medium">
              <li>{t.job1Bullet1}</li>
              <li>{t.job1Bullet2}</li>
              <li>{t.job1Bullet3}</li>
            </ul>
          </div>

          <div className="space-y-1 print:space-y-0.5 print:break-inside-avoid">
            <div className="flex justify-between items-start flex-wrap gap-2 print:gap-1">
              <div>
                <h3 className="font-extrabold text-slate-900 text-sm md:text-base print:text-[11.5px]">
                  {t.job2Title}
                </h3>
                <p className="text-xs print:text-[9.5px] font-bold text-slate-700">
                  {t.job2Company}
                </p>
              </div>
              <span className="text-xs print:text-[9.5px] font-mono font-bold text-slate-900 bg-slate-100 px-2 py-0.5 rounded border border-slate-400">
                {t.job2Date}
              </span>
            </div>
            <ul className="list-disc pl-4 text-slate-800 text-xs print:text-[10px] leading-relaxed print:leading-normal space-y-0.5 font-medium">
              <li>{t.job2Bullet1}</li>
              <li>{t.job2Bullet2}</li>
              <li>{t.job2Bullet3}</li>
            </ul>
          </div>
        </div>
      </div>

      {/* TECHNICAL COMPETENCIES */}
      <div className="space-y-1.5 print:space-y-0.5 print:break-inside-avoid">
        <h2 className="text-sm print:text-xs font-bold uppercase tracking-wider text-slate-900 border-b border-slate-800 pb-1 flex items-center gap-2">
          <Code size={16} className="text-slate-900 print:w-3 print:h-3" /> {t.skillsTitle}
        </h2>
        
        <div className="space-y-1 text-xs print:text-[9.5px] text-slate-800 leading-relaxed font-medium">
          <p>
            <strong>{lang === 'id' ? 'Bahasa Pemrograman:' : 'Programming Languages:'}</strong> Go (Golang), Java (JDK 17/21), TypeScript, JavaScript (Node.js/Bun), Python 3, PHP 8, Dart, SQL, HTML5/CSS3
          </p>
          <p>
            <strong>{lang === 'id' ? 'Framework & Arsitektur:' : 'Frameworks & Architecture:'}</strong> Next.js 16, React 19, Java Spring Boot 3.3, Gin, Fiber, Bun + Hono, Express.js, Laravel 12, FastAPI, Vue 3, Angular 19, React Native (Expo SDK 56), Flutter (Riverpod 3), Clean Architecture, Domain-Driven Design (DDD), Microservices
          </p>
          <p>
            <strong>{lang === 'id' ? 'Database & Message Broker:' : 'Databases & Messaging:'}</strong> PostgreSQL (GORM, Prisma, ACID Transactions, Connection Pooling), MySQL, MongoDB (NoSQL), SQLite (LibSQL), Redis (Cache-Aside, Rate Limiting), RabbitMQ (AMQP Message Broker)
          </p>
          <p>
            <strong>{lang === 'id' ? 'DevOps & Alat Rekayasa:' : 'DevOps, Cloud & Tooling:'}</strong> Docker, Docker Compose, Git & GitHub, Postman, Swagger / OpenAPI, Vite, Webpack 5, TanStack Query/Table, Zustand, Redux Toolkit, WebSockets, Linux Bash, Vercel Edge
          </p>
        </div>
      </div>

      {/* EDUCATION */}
      <div className="space-y-1.5 print:space-y-0.5 print:break-inside-avoid">
        <h2 className="text-sm print:text-xs font-bold uppercase tracking-wider text-slate-900 border-b border-slate-800 pb-1 flex items-center gap-2">
          <GraduationCap size={16} className="text-slate-900 print:w-3 print:h-3" /> {t.educationTitle}
        </h2>
        <div className="flex justify-between items-start flex-wrap gap-2 print:gap-1 text-xs md:text-sm print:text-[10.5px]">
          <div>
            <h3 className="font-extrabold text-slate-900">
              {t.degree}
            </h3>
            <p className="text-xs print:text-[9.5px] font-bold text-slate-700">
              {t.university}
            </p>
          </div>
          <span className="text-xs print:text-[9.5px] font-mono font-bold text-slate-900 bg-slate-100 px-2 py-0.5 rounded border border-slate-400">
            2017 - 2022
          </span>
        </div>
      </div>

      {/* COMPREHENSIVE VERIFIED REPOSITORY DIRECTORY (ALL 93 REPOSITORIES) */}
      <div className="space-y-3 print:space-y-2 pt-2">
        <div className="border-b-2 border-slate-900 pb-1.5 flex flex-wrap items-center justify-between gap-2">
          <h2 className="text-sm md:text-base print:text-xs font-extrabold uppercase tracking-wider text-slate-900 flex items-center gap-2">
            <LayoutGrid size={18} className="text-slate-900 print:w-3.5 print:h-3.5" />
            {t.projectsTitle}
          </h2>
          <span className="text-[10.5px] print:text-[8px] font-mono font-bold text-slate-700 bg-slate-100 px-2 py-0.5 rounded border border-slate-300">
            {t.allReposCount}
          </span>
        </div>

        {domainOrder.map((domainKey) => {
          // If on screen with a specific domain filter active (and not 'all'), check filter
          const isFilteredOutScreen = domainFilter !== 'all' && domainFilter !== domainKey;
          const reposInDomain = ALL_REPOSITORIES.filter(r => r.domain === domainKey);
          const meta = DOMAIN_META[domainKey];

          return (
            <div
              key={domainKey}
              className={`space-y-2 print:space-y-1.5 ${isFilteredOutScreen ? 'hidden print:block' : ''}`}
            >
              {/* DOMAIN SECTION HEADER */}
              <div className="bg-slate-100 print:bg-transparent border-l-4 border-slate-900 px-3 py-1.5 print:px-1 print:py-0.5 flex items-center justify-between print:border-l-2 print:border-slate-800 print:break-inside-avoid">
                <div className="flex items-center gap-2">
                  <span className="font-extrabold text-slate-900 text-xs md:text-sm print:text-[10.5px] uppercase tracking-wide">
                    {meta.label[lang]} ({reposInDomain.length} Repos)
                  </span>
                </div>
                <span className="text-[9.5px] print:text-[7.5px] font-mono font-bold text-slate-600 uppercase">
                  {meta.tier1Count > 0 ? `${meta.tier1Count} Flagships (Tier 1)` : 'Labs & Explorations'}
                </span>
              </div>

              {/* REPOSITORIES LIST */}
              <div className="space-y-2 print:space-y-1 text-xs print:text-[9.5px]">
                {reposInDomain.map((repo, idx) => {
                  const isTier1 = repo.tier === 1;
                  const isTier2 = repo.tier === 2;
                  const description = repo.desc[lang];

                  return (
                    <div
                      key={repo.id}
                      className="space-y-0.5 border-b border-slate-200 pb-1.5 print:pb-1 last:border-none print:break-inside-avoid"
                    >
                      <div className="flex flex-col sm:flex-row sm:items-baseline justify-between gap-1">
                        <div className="flex items-baseline flex-wrap gap-1.5">
                          <span className="font-mono text-slate-500 font-bold text-[10px] print:text-[8px]">
                            {idx + 1}.
                          </span>
                          <a
                            href={repo.githubUrl}
                            target="_blank"
                            rel="noreferrer"
                            className="font-extrabold text-slate-900 text-xs md:text-sm print:text-[10px] hover:text-sky-700 hover:underline inline-flex items-center gap-1"
                          >
                            {repo.name}
                            <ExternalLink size={10} className="no-print opacity-60" />
                          </a>
                          {repo.liveUrl && (
                            <a
                              href={repo.liveUrl}
                              target="_blank"
                              rel="noreferrer"
                              className="text-[9px] print:text-[7.5px] font-mono font-bold text-emerald-700 hover:underline bg-emerald-50 px-1 py-0.2 rounded border border-emerald-300"
                            >
                              [Live Demo]
                            </a>
                          )}
                          <span
                            className={`text-[8.5px] print:text-[7px] font-mono font-bold px-1.5 py-0.2 rounded uppercase ${
                              isTier1
                                ? 'bg-amber-100 text-amber-900 border border-amber-300'
                                : isTier2
                                ? 'bg-sky-100 text-sky-900 border border-sky-300'
                                : 'bg-slate-100 text-slate-700 border border-slate-300'
                            }`}
                          >
                            {isTier1 ? '🌟 Tier 1' : isTier2 ? '⚡ Tier 2' : repo.tier === 3 ? '🧪 Tier 3' : '📦 Tier 4'}
                          </span>
                        </div>

                        <div className="text-[9.5px] print:text-[7.5px] font-mono text-slate-700 font-bold uppercase tracking-tight flex-shrink-0">
                          {repo.tech.join(' • ')}
                        </div>
                      </div>

                      <p className="text-[11px] print:text-[8.5px] text-slate-700 font-medium pl-4 leading-snug">
                        {description}
                      </p>
                    </div>
                  );
                })}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

function PortfolioGalleryPage({ roleProjects }: { roleProjects: typeof projects }) {
  return (
    <div className="max-w-4xl mx-auto space-y-4 print:space-y-2.5 font-sans">
      <div className="border-b-2 border-slate-900 pb-3 print:pb-2 flex flex-row items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <h1 className="text-xl sm:text-2xl print:text-base font-extrabold text-slate-900 uppercase tracking-tight">
              Kevin Eka Pratama
            </h1>
            <span className="text-[10px] print:text-[8px] font-mono font-bold px-2 py-0.5 rounded bg-slate-900 text-white uppercase">
              Visual Case Studies
            </span>
          </div>
          <p className="text-xs print:text-[9.5px] font-bold text-slate-700 uppercase tracking-wider pt-0.5">
            Lampiran Visual Proyek & Studi Kasus Rekayasa Perangkat Lunak
          </p>
        </div>

        <div className="text-right text-xs print:text-[8.5px] font-mono font-medium text-slate-700 space-y-0.5">
          <div className="flex items-center justify-end gap-1 font-bold">
            <Globe size={11} className="text-slate-900" /> mazkev.vercel.app
          </div>
          <div className="flex items-center justify-end gap-1">
            <Github size={11} className="text-slate-900" /> github.com/mazkev
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-3 print:gap-1.5">
        {roleProjects.map((proj, idx) => (
          <div
            key={idx}
            className="p-3 print:p-2 rounded-xl border border-slate-300 bg-slate-50/70 print:bg-white flex flex-col justify-between space-y-2 print:space-y-1 print:break-inside-avoid shadow-sm print:shadow-none"
          >
            <div className="flex gap-3 items-start">
              <div className="w-20 h-14 sm:w-24 sm:h-16 print:w-16 print:h-12 flex-shrink-0 rounded-lg overflow-hidden border border-slate-300 relative bg-slate-200 shadow-inner">
                <Image
                  src={proj.image}
                  alt={proj.title}
                  width={100}
                  height={65}
                  className="w-full h-full object-cover"
                />
              </div>

              <div className="flex-grow min-w-0 space-y-0.5">
                <div className="flex justify-between items-start gap-1">
                  <h3 className="font-extrabold text-slate-900 text-xs md:text-sm print:text-[10px] leading-tight truncate">
                    {idx + 1}. {proj.title}
                  </h3>
                  <span className="text-[8.5px] print:text-[7px] font-mono font-bold px-1.5 py-0.5 rounded bg-slate-200 text-slate-800 uppercase flex-shrink-0">
                    {proj.category}
                  </span>
                </div>

                <div className="text-[9px] print:text-[7.5px] font-mono font-bold text-slate-600 truncate">
                  {proj.tech.join(' • ')}
                </div>

                <p className="text-[10.5px] print:text-[8px] text-slate-700 font-medium leading-snug">
                  {proj.description}
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="p-2.5 print:p-1.5 rounded-lg border border-slate-300 bg-slate-100 text-[11px] print:text-[8.5px] text-slate-800 font-medium flex items-center justify-between print:break-inside-avoid">
        <span>
          <strong>Catatan:</strong> Seluruh 93 source code repositori dan live demo dapat diakses dan diverifikasi langsung melalui <strong>mazkev.vercel.app</strong> dan <strong>github.com/mazkev</strong>.
        </span>
        <span className="text-[9px] print:text-[7.5px] font-mono font-bold text-slate-500 uppercase">
          Lampiran Visual Showcase
        </span>
      </div>
    </div>
  );
}

export default function ResumeViewer({ isOpen, onClose }: ResumeViewerProps) {
  const [cvMode, setCvMode] = useState<CVMode>('bilingual');
  const [activeRole, setActiveRole] = useState<ResumeRole>('fullstack');
  const [domainFilter, setDomainFilter] = useState<DomainFilter>('all');

  const handlePrint = () => window.print();

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex justify-end print:absolute print:inset-auto print:w-full print:h-auto print:block">
      <style jsx global>{`
        @page { size: A4; margin: 10mm 12mm; }
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

            {/* TOGGLE CV FORMAT */}
            <div className="flex items-center bg-slate-200 dark:bg-slate-800 p-1 rounded-xl border border-slate-300 dark:border-slate-700">
              <button
                onClick={() => setCvMode('bilingual')}
                className={`px-3 py-1 text-xs font-bold rounded-lg transition-all flex items-center gap-1.5 cursor-pointer ${
                  cvMode === 'bilingual'
                    ? 'bg-slate-900 text-white dark:bg-white dark:text-black shadow'
                    : 'text-slate-700 dark:text-slate-300 hover:text-black dark:hover:text-white'
                }`}
                title="Lengkap: Versi English ATS + Versi Bahasa Indonesia ATS + Lampiran Showcase"
              >
                <FileText size={13} /> Dokumen Lengkap (EN + ID + Visual)
              </button>
              <button
                onClick={() => setCvMode('en')}
                className={`px-2.5 py-1 text-xs font-bold rounded-lg transition-all flex items-center gap-1 cursor-pointer ${
                  cvMode === 'en'
                    ? 'bg-slate-900 text-white dark:bg-white dark:text-black shadow'
                    : 'text-slate-700 dark:text-slate-300 hover:text-black dark:hover:text-white'
                }`}
                title="Hanya Bahasa Inggris (English ATS)"
              >
                🇬🇧 EN
              </button>
              <button
                onClick={() => setCvMode('id')}
                className={`px-2.5 py-1 text-xs font-bold rounded-lg transition-all flex items-center gap-1 cursor-pointer ${
                  cvMode === 'id'
                    ? 'bg-slate-900 text-white dark:bg-white dark:text-black shadow'
                    : 'text-slate-700 dark:text-slate-300 hover:text-black dark:hover:text-white'
                }`}
                title="Hanya Bahasa Indonesia (ATS)"
              >
                🇮🇩 ID
              </button>
            </div>

            {/* DOMAIN ON-SCREEN QUICK JUMP (SCREEN ONLY) */}
            <div className="hidden xl:flex items-center bg-slate-200 dark:bg-slate-800 p-1 rounded-xl border border-slate-300 dark:border-slate-700 text-xs">
              <button
                onClick={() => setDomainFilter('all')}
                className={`px-2.5 py-1 font-bold rounded-lg transition-all cursor-pointer ${
                  domainFilter === 'all'
                    ? 'bg-slate-900 text-white dark:bg-white dark:text-black shadow'
                    : 'text-slate-700 dark:text-slate-300 hover:text-black dark:hover:text-white'
                }`}
              >
                Semua (93)
              </button>
              <button
                onClick={() => setDomainFilter('backend')}
                className={`px-2 py-1 font-bold rounded-lg transition-all cursor-pointer ${
                  domainFilter === 'backend'
                    ? 'bg-sky-600 text-white shadow'
                    : 'text-slate-700 dark:text-slate-300 hover:text-black dark:hover:text-white'
                }`}
              >
                Backend (19)
              </button>
              <button
                onClick={() => setDomainFilter('fullstack')}
                className={`px-2 py-1 font-bold rounded-lg transition-all cursor-pointer ${
                  domainFilter === 'fullstack'
                    ? 'bg-indigo-600 text-white shadow'
                    : 'text-slate-700 dark:text-slate-300 hover:text-black dark:hover:text-white'
                }`}
              >
                Fullstack (13)
              </button>
              <button
                onClick={() => setDomainFilter('frontend')}
                className={`px-2 py-1 font-bold rounded-lg transition-all cursor-pointer ${
                  domainFilter === 'frontend'
                    ? 'bg-emerald-600 text-white shadow'
                    : 'text-slate-700 dark:text-slate-300 hover:text-black dark:hover:text-white'
                }`}
              >
                Frontend (38)
              </button>
              <button
                onClick={() => setDomainFilter('mobile')}
                className={`px-2 py-1 font-bold rounded-lg transition-all cursor-pointer ${
                  domainFilter === 'mobile'
                    ? 'bg-purple-600 text-white shadow'
                    : 'text-slate-700 dark:text-slate-300 hover:text-black dark:hover:text-white'
                }`}
              >
                Mobile (10)
              </button>
            </div>

            {/* ACTION BUTTONS */}
            <button
              onClick={handlePrint}
              className="px-4 py-2 bg-slate-900 dark:bg-white text-white dark:text-black hover:bg-black text-xs font-bold rounded-xl flex items-center gap-2 transition-all cursor-pointer shadow-md"
            >
              <Printer size={14} /> Cetak / PDF
            </button>
            <a
              href="/resume.pdf"
              target="_blank"
              download="resume-kevin-eka-pratama.pdf"
              className="px-3.5 py-2 bg-slate-200 dark:bg-slate-800 hover:bg-slate-300 dark:hover:bg-slate-700 text-slate-900 dark:text-white text-xs font-bold rounded-xl flex items-center gap-1.5 transition-all cursor-pointer border border-slate-400 dark:border-slate-700"
            >
              <Download size={14} /> Unduh PDF
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

        {/* PRINTABLE MULTI-PAGE BODY */}
        <div className="flex-grow overflow-y-auto p-6 md:p-10 bg-white text-slate-900 print:p-0" id="print-area">
          {cvMode === 'bilingual' ? (
            <>
              {/* SECTION 1: ENGLISH ATS FULL DIRECTORY */}
              <div className="relative">
                <CVContent
                  lang="en"
                  activeRole={activeRole}
                  domainFilter={domainFilter}
                  pageNumber={1}
                  totalPages={3}
                />
              </div>

              {/* Visual Divider in screen */}
              <div className="no-print my-10 py-4 border-y-2 border-dashed border-slate-300 dark:border-slate-700 flex items-center justify-between text-xs font-mono text-slate-500">
                <span className="font-bold uppercase tracking-wider flex items-center gap-2 text-slate-900 dark:text-white">
                  <FileText size={16} className="text-emerald-600 dark:text-emerald-400" />
                  Bagian 2: Versi Bahasa Indonesia Lengkap (Standar ATS)
                </span>
                <span className="bg-slate-200 dark:bg-slate-800 px-2.5 py-1 rounded-md text-[10px] font-bold text-slate-700 dark:text-slate-300">
                  93 Repositori Terverifikasi
                </span>
              </div>

              <div className="page-break" />

              {/* SECTION 2: INDONESIAN ATS FULL DIRECTORY */}
              <div className="relative">
                <CVContent
                  lang="id"
                  activeRole={activeRole}
                  domainFilter={domainFilter}
                  pageNumber={2}
                  totalPages={3}
                />
              </div>

              {/* Visual Divider in screen */}
              <div className="no-print my-10 py-4 border-y-2 border-dashed border-slate-300 dark:border-slate-700 flex items-center justify-between text-xs font-mono text-slate-500">
                <span className="font-bold uppercase tracking-wider flex items-center gap-2 text-slate-900 dark:text-white">
                  <LayoutGrid size={16} className="text-sky-600 dark:text-sky-400" />
                  Bagian 3: Lampiran Visual Studi Kasus & Screenshot Proyek
                </span>
                <span className="bg-slate-200 dark:bg-slate-800 px-2.5 py-1 rounded-md text-[10px] font-bold text-slate-700 dark:text-slate-300">
                  Visual Case Studies
                </span>
              </div>

              <div className="page-break" />

              {/* SECTION 3: VISUAL PORTFOLIO SHOWCASE GALLERY */}
              <div className="relative">
                <PortfolioGalleryPage roleProjects={projects} />
              </div>
            </>
          ) : (
            <>
              <CVContent
                lang={cvMode}
                activeRole={activeRole}
                domainFilter={domainFilter}
                pageNumber={1}
                totalPages={2}
              />
              <div className="page-break" />
              <div className="no-print my-8 py-3 border-y border-dashed border-slate-300 dark:border-slate-700 flex items-center justify-between text-xs font-mono text-slate-500">
                <span className="font-bold uppercase tracking-wider flex items-center gap-2 text-slate-900 dark:text-white">
                  <LayoutGrid size={15} className="text-sky-600 dark:text-sky-400" />
                  Lampiran Visual Portofolio Proyek
                </span>
                <span className="bg-slate-200 dark:bg-slate-800 px-2.5 py-1 rounded-md text-[10px] font-bold text-slate-700 dark:text-slate-300">
                  Visual Case Studies
                </span>
              </div>
              <PortfolioGalleryPage roleProjects={projects} />
            </>
          )}
        </div>
      </motion.div>
    </div>
  );
}
