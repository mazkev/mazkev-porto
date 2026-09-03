'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { X, Printer, Download, Mail, Phone, MapPin, Code, Award, Briefcase, GraduationCap, LayoutGrid, Globe, Github, Layers, Server, Cpu, FileText, User } from 'lucide-react';
import Image from 'next/image';
import { projects } from '../lib/data/projects';

interface ResumeViewerProps {
  isOpen: boolean;
  onClose: () => void;
}

export type ResumeRole = 'fullstack' | 'frontend' | 'backend';
export type CVMode = 'bilingual' | 'en' | 'id';

const roleContent = {
  fullstack: {
    en: {
      title: 'Fullstack Developer',
      executiveSummaryTitle: 'Professional Summary',
      executiveSummary: 'Fullstack Developer with 3 years of professional experience in Application Support at PT PLN Icon+. Experienced in developing fullstack web applications using React, Next.js, and TypeScript on the frontend, combined with Go (Golang) and PostgreSQL on the backend. Brings practical operational background in database troubleshooting, SQL query analysis, and API integration.',
    },
    id: {
      title: 'Fullstack Developer',
      executiveSummaryTitle: 'Ringkasan Profesional',
      executiveSummary: 'Fullstack Developer dengan 3 tahun pengalaman profesional di bidang Application Support pada PT PLN Icon+. Berpengalaman mengembangkan aplikasi web menggunakan React, Next.js, dan TypeScript pada frontend, dipadukan dengan Go (Golang) dan PostgreSQL pada backend. Memiliki pemahaman praktis dalam troubleshooting database, analisis query SQL, dan integrasi REST API.',
    }
  },
  frontend: {
    en: {
      title: 'Frontend Developer',
      executiveSummaryTitle: 'Professional Summary',
      executiveSummary: 'Frontend Developer focused on building clean, responsive, and user-friendly web applications using React, Next.js, TypeScript, and Tailwind CSS. Experienced in state management, REST API integration, and component-driven UI development. Supported by 3 years of production Application Support experience in resolving user-facing issues and operational workflows.',
    },
    id: {
      title: 'Frontend Developer',
      executiveSummaryTitle: 'Ringkasan Profesional',
      executiveSummary: 'Frontend Developer yang berfokus membangun aplikasi web responsif dan ramah pengguna menggunakan React, Next.js, TypeScript, dan Tailwind CSS. Berpengalaman dalam manajemen state, integrasi REST API, dan pengembangan komponen UI. Didukung 3 tahun pengalaman Application Support dalam menangani alur kerja sistem operasional.',
    }
  },
  backend: {
    en: {
      title: 'Backend Developer (Go / Golang & REST API)',
      executiveSummaryTitle: 'Professional Summary',
      executiveSummary: 'Backend Developer working with Go (Golang), PostgreSQL, and RESTful API services. Experienced in designing relational database schemas, handling database transactions, and structuring modular code following Clean Architecture principles. Backed by 3 years of Application Support experience at PT PLN Icon+, with solid foundation in SQL query troubleshooting and system monitoring.',
    },
    id: {
      title: 'Backend Developer (Go / Golang & REST API)',
      executiveSummaryTitle: 'Ringkasan Profesional',
      executiveSummary: 'Backend Developer yang berfokus pada pengembangan layanan REST API menggunakan Go (Golang) dan PostgreSQL. Berpengalaman dalam merancang skema database relasional, menangani transaksi database, dan menyusun struktur kode modular berprinsip Clean Architecture. Diperkuat oleh 3 tahun pengalaman Application Support di PT PLN Icon+ dengan fondasi dalam troubleshooting query SQL dan pemantauan sistem.',
    }
  }
};

const commonText = {
  en: {
    downloadBtn: 'Download PDF',
    printBtn: 'Print / Save PDF',
    experienceTitle: 'Professional Experience',
    projectsTitle: 'Featured Repositories',
    skillsTitle: 'Technical Competencies',
    educationTitle: 'Education',
    job1Title: 'Application Support',
    job1Date: '2022 - Present',
    job1Bullet1: 'Monitored enterprise application workflows and handled operational incidents to ensure smooth daily production services.',
    job1Bullet2: 'Investigated database queries, identified data bottlenecks, and assisted in troubleshooting relational databases (PostgreSQL, Oracle, MySQL).',
    job1Bullet3: 'Documented system troubleshooting procedures and collaborated with engineering teams to report bugs and verify fixes.',
    job2Title: 'Software Development (Independent Projects)',
    job2Company: 'Hands-on Practice & Open Source',
    job2Date: '2024 - Present',
    job2Bullet1: 'Built 20+ fullstack and backend web applications using Go (Golang), React, Next.js, and Java Spring Boot to study modern software architecture.',
    job2Bullet2: 'Designed relational database schemas, implemented JWT authentication, and practiced safe database transaction handling in PostgreSQL.',
    job2Bullet3: 'Developed responsive frontend interfaces with React/TypeScript and containerized local development environments using Docker.',
    degree: 'Bachelor of Computer Science / Information Technology',
    university: 'Universitas Gunadarma • GPA: 3.48 / 4.00',
  },
  id: {
    downloadBtn: 'Unduh PDF',
    printBtn: 'Cetak / Simpan PDF',
    experienceTitle: 'Pengalaman Profesional',
    projectsTitle: 'Proyek Repositori Pilihan',
    skillsTitle: 'Kompetensi Teknis',
    educationTitle: 'Pendidikan',
    job1Title: 'Application Support',
    job1Date: '2022 - Sekarang',
    job1Bullet1: 'Memantau alur kerja aplikasi korporat dan menangani insiden operasional untuk memastikan kelancaran layanan sistem produksi harian.',
    job1Bullet2: 'Menganalisis query database, mengidentifikasi kendala data, dan membantu investigasi pada database relasional (PostgreSQL, Oracle, MySQL).',
    job1Bullet3: 'Menyusun dokumentasi penanganan kendala sistem dan berkoordinasi dengan tim developer untuk pelaporan bug dan verifikasi perbaikan.',
    job2Title: 'Pengembangan Perangkat Lunak (Proyek Mandiri)',
    job2Company: 'Eksplorasi Praktis & Open Source',
    job2Date: '2024 - Sekarang',
    job2Bullet1: 'Membangun 20+ aplikasi web fullstack dan backend menggunakan Go (Golang), React, Next.js, dan Java Spring Boot untuk memperdalam arsitektur perangkat lunak.',
    job2Bullet2: 'Merancang skema database relasional, menerapkan autentikasi JWT, dan mengimplementasikan penanganan transaksi database di PostgreSQL.',
    job2Bullet3: 'Mengembangkan antarmuka frontend responsif dengan React/TypeScript dan menyiapkan lingkungan pengembangan menggunakan Docker.',
    degree: 'Sarjana Ilmu Komputer / Teknologi Informasi',
    university: 'Universitas Gunadarma • IPK: 3.48 / 4.00',
  }
};

const projectTranslations: Record<string, { id: string; en: string }> = {
  'Go Marketplace (Fullstack Go & React)': {
    en: 'Fullstack e-commerce marketplace built with Go and React. Features REST API, JWT auth, product catalog management, and transactional PostgreSQL integration.',
    id: 'Marketplace e-commerce fullstack dengan Go dan React. Dilengkapi REST API, autentikasi JWT, manajemen katalog produk, dan integrasi database PostgreSQL transaksional.'
  },
  'Go Marketplace Backend (GORM & REST API)': {
    en: 'High-performance REST API backend for e-commerce with Go, GORM ORM, and PostgreSQL. Handles atomic checkout transactions and connection pooling.',
    id: 'Layanan backend REST API untuk marketplace e-commerce dengan Go, GORM ORM, dan PostgreSQL. Mengelola transaksi checkout dan connection pooling.'
  },
  'Go Clean Architecture REST API': {
    en: 'Modular Go REST API built with Clean Architecture principles, decoupling domain entities, usecase logic, and database repositories for unit testing.',
    id: 'REST API modular di Go yang menerapkan prinsip Clean Architecture, memisahkan entitas domain, logika usecase, dan repository database untuk kemudahan unit testing.'
  },
  'BayE Marketplace (Fullstack Next.js)': {
    en: 'Modern e-commerce and auction platform inspired by eBay. Features server-rendered product hydration, dynamic bidding simulation, and responsive cart.',
    id: 'Platform lelang dan belanja modern terinspirasi eBay. Menampilkan hidrasi katalog produk server-rendered, simulasi lelang harga langsung, dan keranjang responsif.'
  },
  'Go Banking Core Engine': {
    en: 'Core financial banking API in Go handling user balance transfers with strict ACID compliance, row-level locking (SELECT FOR UPDATE), and audit logging.',
    id: 'Layanan transaksi perbankan di Go yang menangani transfer saldo akun dengan kepatuhan ACID, row-level locking (SELECT FOR UPDATE), dan pencatatan audit trail.'
  },
  'Bun & Hono E-Commerce Backend (Drizzle ORM)': {
    en: 'Modern ultra-fast TypeScript backend built on Bun runtime with Hono, Drizzle ORM type-safe SQL queries, Zod schema validation, and RBAC auth.',
    id: 'Backend TypeScript di atas runtime Bun dengan framework Hono, query database type-safe Drizzle ORM, validasi skema Zod, dan kontrol akses RBAC.'
  },
  'Semarketplace Pro (React & Express)': {
    en: 'Fullstack e-commerce application built with React, Redux Toolkit, and Express.js with optimistic cart updates and inventory synchronization.',
    id: 'Aplikasi e-commerce fullstack dengan React, Redux Toolkit, dan Express.js yang dilengkapi pembaruan keranjang belanja dan sinkronisasi stok.'
  },
  'AliExpress Choice E-Commerce (Java Spring Boot)': {
    en: 'Enterprise fullstack e-commerce platform built with Java 17, Spring Boot 3, and Vue 3 with Spring Security JWT auth and PostgreSQL.',
    id: 'Platform e-commerce enterprise dengan Java 17, Spring Boot 3, dan Vue 3 yang dilengkapi keamanan Spring Security JWT dan database PostgreSQL.'
  },
  'HRMS Enterprise Management (Laravel 11)': {
    en: 'Human Resource Management System with attendance tracking, payroll calculation, department management, and automated leave request workflows.',
    id: 'Sistem manajemen SDM (HRMS) dengan absensi, cuti karyawan, struktur departemen, dan penghitungan slip gaji otomatis berbasis Laravel 11.'
  },
  'Enterprise Operations Dashboard': {
    en: 'System operations monitoring interface built with Next.js 16, TypeScript, and Recharts with real-time server activity metrics and tabular log viewer.',
    id: 'Antarmuka pemantauan operasional sistem dengan Next.js 16, TypeScript, dan Recharts yang dilengkapi metrik aktivitas server dan filter log insiden.'
  },
  'MazCloud File Storage Dashboard': {
    en: 'Cloud storage management dashboard built with React, Redux, and Tailwind CSS with interactive storage capacity charts and folder navigation.',
    id: 'Dashboard manajemen penyimpanan file berbasis React, Redux, dan Tailwind CSS dengan grafik kapasitas penyimpanan dan navigasi struktur folder.'
  },
  'React Shopping Cart Application': {
    en: 'Interactive e-commerce shopping cart built with React and TypeScript with dynamic item quantity adjustments and price calculations.',
    id: 'Aplikasi keranjang belanja e-commerce interaktif dengan React dan TypeScript yang dilengkapi penghitungan harga dan filter kategori dinamis.'
  },
  'Canvass Graphic Design Studio': {
    en: 'Browser-based graphic design tool with interactive canvas manipulation, multi-layer rendering, and asset export in React and TypeScript.',
    id: 'Aplikasi studio desain grafis berbasis web dengan manipulasi kanvas interaktif, manajemen multi-layer, dan ekspor aset dengan React & TypeScript.'
  },
  'Trello Kanban Workspace': {
    en: 'Collaborative task management dashboard with drag-and-drop Kanban boards, column customization, and local state persistence.',
    id: 'Dashboard manajemen tugas kolaboratif dengan papan Kanban drag-and-drop, kustomisasi kolom, dan penyimpanan status lokal.'
  },
  'Spotify Web Player Clone': {
    en: 'Modern music streaming web player interface with playlist navigation, audio playback simulation, and responsive dark glassmorphism UI.',
    id: 'Antarmuka pemutar musik web streaming dengan navigasi playlist, simulasi pemutaran audio, dan desain dark glassmorphism responsif.'
  }
};

interface CVContentProps {
  lang: 'en' | 'id';
  activeRole: ResumeRole;
  roleProjects: typeof projects;
  pageNumber?: number;
  totalPages?: number;
}

function CVContent({ lang, activeRole, roleProjects, pageNumber, totalPages }: CVContentProps) {
  const currentRoleContent = roleContent[activeRole][lang];
  const t = commonText[lang];

  return (
    <div className="max-w-4xl mx-auto space-y-6 print:space-y-2.5 font-sans">
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
            <span className="flex items-center gap-1 font-mono">
              <Globe size={12} className="text-slate-900 print:w-2.5 print:h-2.5" /> mazkev.vercel.app
            </span>
            <span className="hidden sm:inline print:inline">•</span>
            <span className="flex items-center gap-1 font-mono">
              <Github size={12} className="text-slate-900 print:w-2.5 print:h-2.5" /> github.com/mazkev
            </span>
            <span className="hidden sm:inline print:inline">•</span>
            <span className="flex items-center gap-1 font-mono">
              <MapPin size={12} className="text-slate-900 print:w-2.5 print:h-2.5" /> Jakarta, ID
            </span>
          </div>
        </div>
      </div>

      <div className="space-y-1.5 print:space-y-0.5">
        <div className="flex items-center justify-between border-b border-slate-800 pb-1">
          <h2 className="text-sm print:text-xs font-bold uppercase tracking-wider text-slate-900 flex items-center gap-2">
            <User size={16} className="text-slate-900 print:w-3 print:h-3" /> {currentRoleContent.executiveSummaryTitle}
          </h2>
          {pageNumber && totalPages && (
            <span className="text-[10px] print:text-[8px] font-mono font-bold text-slate-500 uppercase">
              {lang === 'en' ? 'Page 1: English (ATS)' : 'Halaman 2: Bahasa Indonesia'}
            </span>
          )}
        </div>
        <p className="text-slate-800 text-xs sm:text-sm print:text-[10px] leading-relaxed print:leading-normal font-medium text-justify">
          {currentRoleContent.executiveSummary}
        </p>
      </div>

      <div className="space-y-2 print:space-y-1">
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
                  PT PLN Icon+
                </p>
              </div>
              <span className="text-xs print:text-[9.5px] font-mono font-bold text-slate-900 bg-slate-100 px-2 py-0.5 rounded border border-slate-400 pill">
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
              <span className="text-xs print:text-[9.5px] font-mono font-bold text-slate-900 bg-slate-100 px-2 py-0.5 rounded border border-slate-400 pill">
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

      <div className="space-y-1.5 print:space-y-1">
        <h2 className="text-sm print:text-xs font-bold uppercase tracking-wider text-slate-900 border-b border-slate-800 pb-1 flex items-center justify-between">
          <span className="flex items-center gap-2">
            <LayoutGrid size={16} className="text-slate-900 print:w-3 print:h-3" /> {t.projectsTitle} ({activeRole.toUpperCase()})
          </span>
        </h2>
        <div className="space-y-2 print:space-y-1 text-xs print:text-[10px]">
          {roleProjects.slice(0, 6).map((project, idx) => {
            const projectDesc = projectTranslations[project.title]?.[lang] || project.description;
            return (
              <div key={idx} className="space-y-0.5 border-b border-slate-200 pb-1.5 print:pb-1 last:border-none print:break-inside-avoid">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1">
                  <div className="font-extrabold text-slate-900 text-xs md:text-sm print:text-[10.5px] flex items-center gap-2 flex-wrap">
                    <span>• {project.title}</span>
                    {project.live && (
                      <a href={project.live} target="_blank" rel="noopener noreferrer" className="no-print text-[9px] font-mono font-bold text-sky-600 hover:text-sky-800 hover:underline inline-flex items-center gap-0.5">
                        <Globe size={10} /> Live Demo
                      </a>
                    )}
                    {project.github && (
                      <a href={project.github} target="_blank" rel="noopener noreferrer" className="no-print text-[9px] font-mono font-bold text-slate-600 hover:text-black dark:hover:text-white hover:underline inline-flex items-center gap-0.5">
                        <Github size={10} /> Source Code
                      </a>
                    )}
                  </div>
                  <div className="text-[10px] print:text-[8px] font-mono text-slate-700 font-bold uppercase">
                    {project.tech.join(' • ')}
                  </div>
                </div>
                <p className="text-[11px] print:text-[9px] text-slate-700 font-medium pl-3 leading-snug">
                  {projectDesc}
                </p>
              </div>
            );
          })}
        </div>
      </div>

      <div className="space-y-1 print:space-y-0.5">
        <h2 className="text-sm print:text-xs font-bold uppercase tracking-wider text-slate-900 border-b border-slate-800 pb-1 flex items-center gap-2">
          <Code size={16} className="text-slate-900 print:w-3 print:h-3" /> {t.skillsTitle}
        </h2>
        
        <div className="space-y-0.5 text-xs print:text-[9.5px] text-slate-800 leading-relaxed font-medium">
          <p>
            <strong>{lang === 'id' ? 'Framework & Bahasa:' : 'Engineering & Frameworks:'}</strong> Next.js, React.js, Go (Golang), Java Spring Boot, Express.js, Node.js, Vue 3, Angular, Python (FastAPI), TypeScript, Tailwind CSS
          </p>
          <p>
            <strong>{lang === 'id' ? 'Database & Alat Cloud:' : 'Databases & Cloud Tools:'}</strong> PostgreSQL, MySQL, MongoDB, Redis, Docker, GORM, Prisma ORM, AWS, Vercel Edge, Git & GitHub, Postman
          </p>
        </div>
      </div>

      <div className="space-y-1.5 print:space-y-0.5">
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
          <span className="text-xs print:text-[9.5px] font-mono font-bold text-slate-900 bg-slate-100 px-2 py-0.5 rounded border border-slate-400 pill">
            2017 - 2022
          </span>
        </div>
      </div>
    </div>
  );
}

function PortfolioPage({ roleProjects, totalPages }: { roleProjects: typeof projects; totalPages?: number }) {
  return (
    <div className="max-w-4xl mx-auto space-y-4 print:space-y-2.5 font-sans">
      <div className="border-b-2 border-slate-900 pb-3 print:pb-2 flex flex-row items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <h1 className="text-xl sm:text-2xl print:text-base font-extrabold text-slate-900 uppercase tracking-tight">
              Kevin Eka Pratama
            </h1>
            <span className="text-[10px] print:text-[8px] font-mono font-bold px-2 py-0.5 rounded bg-slate-900 text-white uppercase">
              Portfolio Showcase
            </span>
          </div>
          <p className="text-xs print:text-[9.5px] font-bold text-slate-700 uppercase tracking-wider pt-0.5">
            Lampiran Portofolio Proyek & Studi Kasus Rekayasa Perangkat Lunak
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
        {roleProjects.slice(0, 6).map((proj, idx) => (
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

            <div className="pt-1.5 border-t border-slate-200 flex items-center justify-between text-[10px] print:text-[8px] font-mono font-bold gap-2">
              {proj.live ? (
                <a
                  href={proj.live}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-sky-700 hover:underline flex items-center gap-1 truncate"
                >
                  <Globe size={11} /> {proj.live.replace('https://', '').replace(/\/$/, '')}
                </a>
              ) : <span />}
              {proj.github && (
                <a
                  href={proj.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-slate-800 hover:underline flex items-center gap-1 flex-shrink-0"
                >
                  <Github size={11} /> {proj.github.replace('https://github.com/', 'gh/')}
                </a>
              )}
            </div>
          </div>
        ))}
      </div>

      <div className="p-2.5 print:p-1.5 rounded-lg border border-slate-300 bg-slate-100 text-[11px] print:text-[8.5px] text-slate-800 font-medium flex items-center justify-between">
        <span>
          <strong>Catatan:</strong> Seluruh source code proyek dapat diverifikasi langsung pada profil GitHub resmi <strong>github.com/mazkev</strong>.
        </span>
        {totalPages && (
          <span className="text-[9px] print:text-[7.5px] font-mono font-bold text-slate-500 uppercase">
            Halaman 3: Lampiran Portofolio
          </span>
        )}
      </div>
    </div>
  );
}

export default function ResumeViewer({ isOpen, onClose }: ResumeViewerProps) {
  const [cvMode, setCvMode] = useState<CVMode>('bilingual');
  const [activeRole, setActiveRole] = useState<ResumeRole>('fullstack');

  const handlePrint = () => window.print();

  if (!isOpen) return null;

  const frontendTop6Titles = ['BayE Marketplace (Fullstack Next.js)', 'Enterprise Operations Dashboard', 'MazCloud File Storage Dashboard', 'React Shopping Cart Application', 'Canvass Graphic Design Studio', 'Spotify Web Player Clone'];
  const fullstackTop6Titles = ['Go Marketplace (Fullstack Go & React)', 'BayE Marketplace (Fullstack Next.js)', 'AliExpress Choice E-Commerce (Java Spring Boot)', 'HRMS Enterprise Management (Laravel 11)', 'Go Clean Architecture REST API', 'Enterprise Operations Dashboard'];
  const backendTop6Titles = ['Go Clean Architecture REST API', 'Go Banking Core Engine', 'AliExpress Choice E-Commerce (Java Spring Boot)', 'HRMS Enterprise Management (Laravel 11)', 'Go Marketplace Backend (GORM & REST API)', 'Bun & Hono E-Commerce Backend (Drizzle ORM)'];

  const roleProjects = (activeRole === 'frontend' ? frontendTop6Titles : activeRole === 'backend' ? backendTop6Titles : fullstackTop6Titles)
    .map(title => projects.find(p => p.title === title))
    .filter(Boolean) as typeof projects;

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

      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={onClose} className="absolute inset-0 bg-black/60 backdrop-blur-sm no-print" />

      <motion.div
        initial={{ x: '100%' }} animate={{ x: 0 }} exit={{ x: '100%' }} transition={{ type: 'spring', damping: 25, stiffness: 200 }}
        className="relative w-full max-w-5xl h-full print:h-auto bg-white text-slate-900 border-l border-slate-300 shadow-2xl flex flex-col z-10 font-sans"
      >
        <div className="px-6 py-4 bg-slate-100 dark:bg-slate-900 border-b border-slate-300 dark:border-slate-800 flex items-center justify-between no-print flex-shrink-0 flex-wrap gap-3">
          <div className="flex items-center gap-2.5 flex-wrap">
            {/* ROLE SELECTOR TABS */}
            <div className="flex items-center bg-slate-200 dark:bg-slate-800 p-1 rounded-xl border border-slate-300 dark:border-slate-700">
              <button
                onClick={() => setActiveRole('fullstack')}
                className={`px-3 py-1 text-xs font-bold rounded-lg transition-all flex items-center gap-1 cursor-pointer ${
                  activeRole === 'fullstack'
                    ? 'bg-slate-900 text-white dark:bg-white dark:text-black shadow'
                    : 'text-slate-700 dark:text-slate-300 hover:text-black dark:hover:text-white'
                }`}
              >
                <Layers size={13} /> Fullstack
              </button>
              <button
                onClick={() => setActiveRole('frontend')}
                className={`px-3 py-1 text-xs font-bold rounded-lg transition-all flex items-center gap-1 cursor-pointer ${
                  activeRole === 'frontend'
                    ? 'bg-emerald-600 text-white shadow'
                    : 'text-slate-700 dark:text-slate-300 hover:text-black dark:hover:text-white'
                }`}
              >
                <Cpu size={13} /> Front End
              </button>
              <button
                onClick={() => setActiveRole('backend')}
                className={`px-3 py-1 text-xs font-bold rounded-lg transition-all flex items-center gap-1 cursor-pointer ${
                  activeRole === 'backend'
                    ? 'bg-sky-600 text-white shadow'
                    : 'text-slate-700 dark:text-slate-300 hover:text-black dark:hover:text-white'
                }`}
              >
                <Server size={13} /> Back End
              </button>
            </div>

            {/* TOGGLE CV FORMAT: 3 HALAMAN (BILINGUAL + PORTOFOLIO) vs SINGLE PAGE */}
            <div className="flex items-center bg-slate-200 dark:bg-slate-800 p-1 rounded-xl border border-slate-300 dark:border-slate-700">
              <button
                onClick={() => setCvMode('bilingual')}
                className={`px-3 py-1 text-xs font-bold rounded-lg transition-all flex items-center gap-1.5 cursor-pointer ${
                  cvMode === 'bilingual'
                    ? 'bg-slate-900 text-white dark:bg-white dark:text-black shadow'
                    : 'text-slate-700 dark:text-slate-300 hover:text-black dark:hover:text-white'
                }`}
                title="Lengkap: Halaman 1 English, Halaman 2 Bahasa Indonesia, Halaman 3 Lampiran Portofolio"
              >
                <FileText size={13} /> Lengkap (EN + ID + Porto)
              </button>
              <button
                onClick={() => setCvMode('en')}
                className={`px-2.5 py-1 text-xs font-bold rounded-lg transition-all flex items-center gap-1 cursor-pointer ${
                  cvMode === 'en'
                    ? 'bg-slate-900 text-white dark:bg-white dark:text-black shadow'
                    : 'text-slate-700 dark:text-slate-300 hover:text-black dark:hover:text-white'
                }`}
                title="Hanya 1 Halaman English"
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
                title="Hanya 1 Halaman Bahasa Indonesia"
              >
                🇮🇩 ID
              </button>
            </div>

            <button
              onClick={handlePrint}
              className="px-4 py-2 bg-slate-900 dark:bg-white text-white dark:text-black hover:bg-black text-xs font-bold rounded-xl flex items-center gap-2 transition-all cursor-pointer shadow-md"
            >
              <Printer size={14} /> Cetak Dokumen
            </button>
            <a
              href="/resume.pdf"
              target="_blank"
              download="resume.pdf"
              className="px-4 py-2 bg-slate-200 dark:bg-slate-800 hover:bg-slate-300 dark:hover:bg-slate-700 text-slate-900 dark:text-white text-xs font-bold rounded-xl flex items-center gap-2 transition-all cursor-pointer border border-slate-400 dark:border-slate-700"
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

        <div className="flex-grow overflow-y-auto p-6 md:p-10 bg-white text-slate-900 print:p-0" id="print-area">
          {cvMode === 'bilingual' ? (
            <>
              {/* PAGE 1: ENGLISH VERSION */}
              <div className="relative">
                <CVContent lang="en" activeRole={activeRole} roleProjects={roleProjects} pageNumber={1} totalPages={3} />
              </div>

              {/* Visual Screen Divider 1 -> 2 */}
              <div className="no-print my-10 py-4 border-y-2 border-dashed border-slate-300 dark:border-slate-700 flex items-center justify-between text-xs font-mono text-slate-500">
                <span className="font-bold uppercase tracking-wider flex items-center gap-2 text-slate-900 dark:text-white">
                  <FileText size={15} className="text-emerald-600 dark:text-emerald-400" /> Halaman 2: Versi Bahasa Indonesia (Standar ATS)
                </span>
                <span className="bg-slate-200 dark:bg-slate-800 px-2.5 py-1 rounded-md text-[10px] font-bold text-slate-700 dark:text-slate-300">
                  Page 2 of 3
                </span>
              </div>

              <div className="page-break" />

              {/* PAGE 2: INDONESIAN VERSION */}
              <div className="relative">
                <CVContent lang="id" activeRole={activeRole} roleProjects={roleProjects} pageNumber={2} totalPages={3} />
              </div>

              {/* Visual Screen Divider 2 -> 3 */}
              <div className="no-print my-10 py-4 border-y-2 border-dashed border-slate-300 dark:border-slate-700 flex items-center justify-between text-xs font-mono text-slate-500">
                <span className="font-bold uppercase tracking-wider flex items-center gap-2 text-slate-900 dark:text-white">
                  <LayoutGrid size={15} className="text-sky-600 dark:text-sky-400" /> Halaman 3: Lampiran Portofolio & Showcase Proyek Terpilih
                </span>
                <span className="bg-slate-200 dark:bg-slate-800 px-2.5 py-1 rounded-md text-[10px] font-bold text-slate-700 dark:text-slate-300">
                  Page 3 of 3
                </span>
              </div>

              <div className="page-break" />

              {/* PAGE 3: PORTFOLIO SHOWCASE PAGE */}
              <div className="relative">
                <PortfolioPage roleProjects={roleProjects} totalPages={3} />
              </div>
            </>
          ) : (
            <>
              <CVContent lang={cvMode} activeRole={activeRole} roleProjects={roleProjects} pageNumber={1} totalPages={2} />
              <div className="page-break" />
              <div className="no-print my-8 py-3 border-y border-dashed border-slate-300 dark:border-slate-700 flex items-center justify-between text-xs font-mono text-slate-500">
                <span className="font-bold uppercase tracking-wider flex items-center gap-2 text-slate-900 dark:text-white">
                  <LayoutGrid size={15} className="text-sky-600 dark:text-sky-400" /> Halaman 2: Lampiran Portofolio Proyek
                </span>
                <span className="bg-slate-200 dark:bg-slate-800 px-2.5 py-1 rounded-md text-[10px] font-bold text-slate-700 dark:text-slate-300">
                  Page 2 of 2
                </span>
              </div>
              <PortfolioPage roleProjects={roleProjects} totalPages={2} />
            </>
          )}
        </div>
      </motion.div>
    </div>
  );
}
