'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { X, Printer, Download, Mail, Phone, MapPin, Code, Award, Briefcase, GraduationCap, LayoutGrid, Globe, Github, Layers, Server, Cpu } from 'lucide-react';
import Image from 'next/image';
import { projects } from '../lib/data/projects';

interface ResumeViewerProps {
  isOpen: boolean;
  onClose: () => void;
}

export type ResumeRole = 'fullstack' | 'frontend' | 'backend';

const roleContent = {
  fullstack: {
    en: {
      title: 'Fullstack Developer & Application Support Specialist',
      executiveSummaryTitle: 'Professional Summary',
      executiveSummary: 'Fullstack Developer with 3 years of professional experience in Application Support, transitioning into Software Development. Skilled in building responsive web applications using React, Next.js, and TypeScript on the frontend, paired with Go (Golang), Java Spring Boot, and PostgreSQL on the backend. Strong background in production database troubleshooting, SQL query optimization, and Clean Architecture API design.',
    },
    id: {
      title: 'Fullstack Developer & Application Support Specialist',
      executiveSummaryTitle: 'Ringkasan Profesional',
      executiveSummary: 'Fullstack Developer dengan 3 tahun pengalaman profesional di bidang Application Support, bertransisi ke Software Development. Terampil membangun aplikasi web responsif menggunakan React, Next.js, dan TypeScript pada frontend, dipadukan dengan Go (Golang), Java Spring Boot, dan PostgreSQL pada backend. Memiliki fondasi kuat dalam troubleshooting database produksi, query SQL, serta perancangan API Clean Architecture.',
    }
  },
  frontend: {
    en: {
      title: 'Front End Developer & UI Specialist',
      executiveSummaryTitle: 'Professional Summary',
      executiveSummary: 'Front End Developer specializing in React, Next.js 16, TypeScript, and Tailwind CSS. Experienced in developing responsive, accessible user interfaces, component-driven UI architectures, and client-side state management (Redux, Zustand) for dynamic e-commerce and dashboard applications.',
    },
    id: {
      title: 'Front End Developer & UI Specialist',
      executiveSummaryTitle: 'Ringkasan Profesional',
      executiveSummary: 'Front End Developer dengan spesialisasi pada React, Next.js 16, TypeScript, dan Tailwind CSS. Berpengalaman membangun antarmuka web responsif, arsitektur UI berbasis komponen, dan manajemen state (Redux, Zustand) untuk aplikasi e-commerce dan dashboard operasional.',
    }
  },
  backend: {
    en: {
      title: 'Back End Developer & Go Specialist',
      executiveSummaryTitle: 'Professional Summary',
      executiveSummary: 'Back End Developer building reliable RESTful APIs and backend services using Go (Golang) and Java Spring Boot. Practicing Clean Architecture principles, relational database design (PostgreSQL, MySQL), SQL query troubleshooting, JWT authentication, and Docker containerization.',
    },
    id: {
      title: 'Back End Developer & Go Specialist',
      executiveSummaryTitle: 'Ringkasan Profesional',
      executiveSummary: 'Back End Developer yang berfokus membangun RESTful API dan layanan backend menggunakan Go (Golang) dan Java Spring Boot. Mengimplementasikan Clean Architecture, pemodelan database relasional (PostgreSQL, MySQL), optimasi query SQL, autentikasi JWT, dan kontainerisasi Docker.',
    }
  }
};

const commonText = {
  en: {
    experienceTitle: 'Professional Experience',
    job1Title: 'Technical Support Specialist',
    job1Date: '2023 - Present',
    job1Bullet1: 'Handle user issue triage, operational incident resolution, and system service availability for enterprise applications.',
    job1Bullet2: 'Write, analyze, and optimize SQL queries for database troubleshooting, reporting, and data extraction.',
    job1Bullet3: 'Perform application debugging and error log tracing to isolate and resolve software bugs across production environments.',
    job2Title: 'Software Development & Projects',
    job2Company: 'Personal & Client Engagements',
    job2Date: '2023 - Present',
    job2Bullet1: 'Built fullstack e-commerce marketplaces and web applications using Go (Golang), React, Next.js, and Java Spring Boot.',
    job2Bullet2: 'Implemented Go RESTful microservices with Clean Architecture layers (domain, usecase, repository), GORM, and PostgreSQL.',
    job2Bullet3: 'Designed responsive user interfaces and state management pipelines with React, TypeScript, Redux Toolkit, and Tailwind CSS.',
    projectsTitle: 'Key Projects',
    skillsTitle: 'Skill Highlights',
    educationTitle: 'Education Background',
    degree: 'Bachelor of Information Technology (S.Kom)',
    university: 'Universitas Amikom Yogyakarta',
    printBtn: 'Print Resume (ATS)',
    downloadBtn: 'Download PDF',
  },
  id: {
    experienceTitle: 'Pengalaman Kerja',
    job1Title: 'Technical Support Specialist',
    job1Date: '2023 - Sekarang',
    job1Bullet1: 'Menangani eskalasi kendala pengguna, penyelesaian insiden operasional, dan pemantauan sistem enterprise.',
    job1Bullet2: 'Membuat, menganalisis, dan mengoptimalkan query SQL untuk investigasi database dan ekstraksi data.',
    job1Bullet3: 'Melakukan debugging aplikasi dan pelacakan log error untuk menemukan serta mengisolasi bug pada sistem produksi.',
    job2Title: 'Software Development & Proyek',
    job2Company: 'Pengembangan Personal & Klien',
    job2Date: '2023 - Sekarang',
    job2Bullet1: 'Membangun aplikasi marketplace dan web fullstack menggunakan Go (Golang), React, Next.js, dan Java Spring Boot.',
    job2Bullet2: 'Mengembangkan RESTful API Go dengan Clean Architecture (domain, usecase, repository), GORM, dan database PostgreSQL.',
    job2Bullet3: 'Merancang antarmuka pengguna responsif dan manajemen state dengan React, TypeScript, Redux Toolkit, dan Tailwind CSS.',
    projectsTitle: 'Proyek Utama',
    skillsTitle: 'Keahlian Utama',
    educationTitle: 'Riwayat Pendidikan',
    degree: 'Sarjana Teknologi Informasi (S.Kom)',
    university: 'Universitas Amikom Yogyakarta',
    printBtn: 'Cetak CV (ATS)',
    downloadBtn: 'Unduh PDF',
  }
};

export default function ResumeViewer({ isOpen, onClose }: ResumeViewerProps) {
  const [lang, setLang] = useState<'en' | 'id'>('en');
  const [activeRole, setActiveRole] = useState<ResumeRole>('fullstack');

  const currentRoleContent = roleContent[activeRole][lang];
  const t = commonText[lang];

  const handlePrint = () => {
    window.print();
  };

  if (!isOpen) return null;

  // Filter projects dynamically based on selected role profile
  const roleProjects = activeRole === 'frontend'
    ? projects.filter(p => 
        p.category === 'Front End' && 
        !p.title.toLowerCase().includes('ai') && 
        !p.tech.some(t => t.toLowerCase().includes('ai'))
      )
    : activeRole === 'backend'
    ? projects.filter(p => p.category === 'Back End')
    : projects.filter(p => 
        p.category === 'Full Stack' && 
        !p.title.toLowerCase().includes('ai') && 
        !p.tech.some(t => t.toLowerCase().includes('ai'))
      );

  return (
    <div className="fixed inset-0 z-50 flex justify-end print:absolute print:inset-auto print:w-full print:h-auto print:block">
      {/* Print-specific style override - Ultra ATS High Contrast Black & White */}
      <style jsx global>{`
        @page {
          size: A4;
          margin: 15mm;
        }
        @media print {
          .no-print {
            display: none !important;
          }
          html, body {
            height: auto !important;
            overflow: visible !important;
            margin: 0 !important;
            padding: 0 !important;
            background: white !important;
            color: black !important;
          }
          body * {
            visibility: hidden;
          }
          #print-area, #print-area * {
            visibility: visible;
          }
          #print-area {
            position: absolute;
            left: 0;
            top: 0;
            width: 100%;
            padding: 0 !important;
            margin: 0 !important;
            background: white !important;
            color: black !important;
            box-shadow: none !important;
            border: none !important;
          }
          #print-area * {
            color: black !important;
            border-color: #000000 !important;
          }
          #print-area .pill {
            border: 1px solid #000000 !important;
            background: transparent !important;
            color: black !important;
          }
        }
      `}</style>

      {/* Backdrop */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={onClose}
        className="absolute inset-0 bg-black/60 backdrop-blur-sm no-print"
      />

      {/* Drawer Panel */}
      <motion.div
        initial={{ x: '100%' }}
        animate={{ x: 0 }}
        exit={{ x: '100%' }}
        transition={{ type: 'spring', damping: 25, stiffness: 200 }}
        className="relative w-full max-w-5xl h-full print:h-auto bg-white text-slate-900 border-l border-slate-300 shadow-2xl flex flex-col z-10 font-sans"
      >
        {/* Actions Bar (Top) */}
        <div className="px-6 py-4 bg-slate-100 dark:bg-slate-900 border-b border-slate-300 dark:border-slate-800 flex items-center justify-between no-print flex-shrink-0 flex-wrap gap-3">
          <div className="flex items-center gap-3 flex-wrap">
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

            {/* TOGGLE BAHASA / TRANSLATE CV */}
            <div className="flex items-center bg-slate-200 dark:bg-slate-800 p-1 rounded-xl border border-slate-300 dark:border-slate-700">
              <button
                onClick={() => setLang('en')}
                className={`px-3 py-1 text-xs font-bold rounded-lg transition-all flex items-center gap-1 cursor-pointer ${
                  lang === 'en'
                    ? 'bg-black text-white dark:bg-white dark:text-black shadow'
                    : 'text-slate-700 dark:text-slate-300 hover:text-black dark:hover:text-white'
                }`}
              >
                🇬🇧 EN
              </button>
              <button
                onClick={() => setLang('id')}
                className={`px-3 py-1 text-xs font-bold rounded-lg transition-all flex items-center gap-1 cursor-pointer ${
                  lang === 'id'
                    ? 'bg-black text-white dark:bg-white dark:text-black shadow'
                    : 'text-slate-700 dark:text-slate-300 hover:text-black dark:hover:text-white'
                }`}
              >
                🇮🇩 ID
              </button>
            </div>

            <button
              onClick={handlePrint}
              className="px-4 py-2 bg-slate-900 dark:bg-white text-white dark:text-black hover:bg-black text-xs font-bold rounded-xl flex items-center gap-2 transition-all cursor-pointer shadow-md"
            >
              <Printer size={14} /> {t.printBtn}
            </button>
            <a
              href="/resume.pdf"
              target="_blank"
              download="resume.pdf"
              className="px-4 py-2 bg-slate-200 dark:bg-slate-800 hover:bg-slate-300 dark:hover:bg-slate-700 text-slate-900 dark:text-white text-xs font-bold rounded-xl flex items-center gap-2 transition-all cursor-pointer border border-slate-400 dark:border-slate-700"
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

        {/* Resume Scrollable Content - ATS Format (High Contrast Black & White) */}
        <div className="flex-grow overflow-y-auto p-6 md:p-10 bg-white text-slate-900 print:p-0 print:overflow-visible" id="print-area">
          <div className="max-w-4xl mx-auto space-y-7 print:space-y-3 font-sans">
            {/* Header info */}
            <div className="border-b-2 border-slate-900 pb-5 print:pb-3 flex flex-row items-center justify-between gap-6 print:gap-4">
              {/* Profile Photo - Full Color */}
              <div className="w-20 h-20 md:w-24 md:h-24 print:w-16 print:h-16 flex-shrink-0 rounded-xl overflow-hidden border-2 border-slate-900 shadow-md bg-white print:border-none print:shadow-none">
                <Image
                  src="/profile/kev.png"
                  alt="Kevin Eka Pratama"
                  width={96}
                  height={96}
                  className="w-full h-full object-cover"
                />
              </div>

              <div className="flex-grow text-right space-y-1 print:space-y-0.5">
                <h1 className="text-2xl sm:text-3xl md:text-4xl print:text-2xl font-extrabold text-slate-900 leading-none uppercase tracking-tight">
                  Kevin Eka Pratama
                </h1>
                <p className="text-xs md:text-sm print:text-[10px] font-bold text-slate-800 uppercase tracking-widest pt-1 print:pt-0">
                  {currentRoleContent.title}
                </p>
                <div className="pt-2 print:pt-1 flex flex-wrap items-end sm:items-center justify-end gap-y-1 gap-x-4 print:gap-x-3 text-xs print:text-[10px] text-slate-800 font-semibold">
                  <a href="mailto:kevinekapratama@gmail.com" className="flex items-center gap-1.5 hover:underline">
                    <span>kevinekapratama@gmail.com</span>
                    <Mail size={12} className="text-slate-900" />
                  </a>
                  <a href="tel:+6281326612344" className="flex items-center gap-1.5 hover:underline">
                    <span>+62 (813) 2661-2344</span>
                    <Phone size={12} className="text-slate-900" />
                  </a>
                  <a href="https://mazkev.vercel.app" target="_blank" rel="noopener noreferrer" className="flex items-center gap-1.5 hover:underline">
                    <span>mazkev.vercel.app</span>
                    <Globe size={12} className="text-slate-900" />
                  </a>
                  <a href="https://github.com/mazkev" target="_blank" rel="noopener noreferrer" className="flex items-center gap-1.5 hover:underline">
                    <span>github.com/mazkev</span>
                    <Github size={12} className="text-slate-900" />
                  </a>
                  <div className="flex items-center gap-1.5">
                    <span>Jakarta, Indonesia</span>
                    <MapPin size={12} className="text-slate-900" />
                  </div>
                </div>
              </div>
            </div>

            {/* Profile summary */}
            <div className="space-y-2 print:space-y-1">
              <h2 className="text-sm print:text-xs font-bold uppercase tracking-wider text-slate-900 border-b border-slate-800 pb-1 flex items-center gap-2">
                <Award size={16} className="text-slate-900 print:w-3 print:h-3" /> {currentRoleContent.executiveSummaryTitle}
              </h2>
              <p className="text-slate-800 leading-relaxed text-xs md:text-sm print:text-[11px] print:leading-normal font-medium">
                {currentRoleContent.executiveSummary}
              </p>
            </div>

            {/* Work experience */}
            <div className="space-y-5 print:space-y-3">
              <h2 className="text-sm print:text-xs font-bold uppercase tracking-wider text-slate-900 border-b border-slate-800 pb-1 flex items-center gap-2">
                <Briefcase size={16} className="text-slate-900 print:w-3 print:h-3" /> {t.experienceTitle}
              </h2>

              <div className="space-y-5 print:space-y-2.5">
                {/* Job 1 */}
                <div className="space-y-1.5 print:space-y-0.5 print:break-inside-avoid">
                  <div className="flex justify-between items-start flex-wrap gap-2 print:gap-1">
                    <div>
                      <h3 className="font-extrabold text-slate-900 text-sm md:text-base print:text-[12px]">
                        {t.job1Title}
                      </h3>
                      <p className="text-xs print:text-[10px] font-bold text-slate-700">
                        PT PLN Icon+
                      </p>
                    </div>
                    <span className="text-xs print:text-[10px] font-mono font-bold text-slate-900 bg-slate-100 px-2 py-0.5 rounded border border-slate-400 pill">
                      {t.job1Date}
                    </span>
                  </div>
                  <ul className="list-disc pl-4 text-slate-800 text-xs print:text-[10.5px] leading-relaxed print:leading-normal space-y-1 print:space-y-0.5 font-medium">
                    <li>{t.job1Bullet1}</li>
                    <li>{t.job1Bullet2}</li>
                    <li>{t.job1Bullet3}</li>
                  </ul>
                </div>

                {/* Job 2 */}
                <div className="space-y-1.5 print:space-y-0.5 print:break-inside-avoid">
                  <div className="flex justify-between items-start flex-wrap gap-2 print:gap-1">
                    <div>
                      <h3 className="font-extrabold text-slate-900 text-sm md:text-base print:text-[12px]">
                        {t.job2Title}
                      </h3>
                      <p className="text-xs print:text-[10px] font-bold text-slate-700">
                        {t.job2Company}
                      </p>
                    </div>
                    <span className="text-xs print:text-[10px] font-mono font-bold text-slate-900 bg-slate-100 px-2 py-0.5 rounded border border-slate-400 pill">
                      {t.job2Date}
                    </span>
                  </div>
                  <ul className="list-disc pl-4 text-slate-800 text-xs print:text-[10.5px] leading-relaxed print:leading-normal space-y-1 print:space-y-0.5 font-medium">
                    <li>{t.job2Bullet1}</li>
                    <li>{t.job2Bullet2}</li>
                    <li>{t.job2Bullet3}</li>
                  </ul>
                </div>
              </div>
            </div>

            {/* Key Projects Filtered By Active Role */}
            <div className="space-y-2 print:space-y-1">
              <h2 className="text-sm print:text-xs font-bold uppercase tracking-wider text-slate-900 border-b border-slate-800 pb-1 flex items-center justify-between">
                <span className="flex items-center gap-2">
                  <LayoutGrid size={16} className="text-slate-900 print:w-3 print:h-3" /> {t.projectsTitle} ({activeRole.toUpperCase()})
                </span>
                <span className="text-[10px] font-mono font-normal uppercase text-slate-600 no-print">
                  {roleProjects.length} Projects Selected
                </span>
              </h2>
              <div className="space-y-2.5 print:space-y-1.5 text-xs print:text-[10.5px]">
                {roleProjects.slice(0, 7).map((project, idx) => (
                  <div key={idx} className="space-y-0.5 border-b border-slate-200 pb-2 print:pb-1.5 last:border-none print:break-inside-avoid">
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1">
                      <div className="font-extrabold text-slate-900 text-xs md:text-sm print:text-[11px]">
                        • {project.title}
                      </div>
                      <div className="text-[10px] print:text-[8.5px] font-mono text-slate-700 font-bold uppercase">
                        {project.tech.join(' • ')}
                      </div>
                    </div>
                    <p className="text-[11px] print:text-[9.5px] text-slate-700 font-medium pl-3 leading-snug">
                      {project.description}
                    </p>
                  </div>
                ))}
              </div>
            </div>

            {/* Core Tech stack */}
            <div className="space-y-1.5 print:space-y-1">
              <h2 className="text-sm print:text-xs font-bold uppercase tracking-wider text-slate-900 border-b border-slate-800 pb-1 flex items-center gap-2">
                <Code size={16} className="text-slate-900 print:w-3 print:h-3" /> {t.skillsTitle}
              </h2>
              
              <div className="space-y-1 text-xs print:text-[10px] text-slate-800 leading-relaxed font-medium">
                <p>
                  <strong>Engineering & Frameworks:</strong> Next.js, React.js, Java Spring Boot, Golang, Express.js, Node.js, Vue 3, Angular, Python (FastAPI), TypeScript, Tailwind CSS
                </p>
                <p>
                  <strong>Databases & Cloud Tools:</strong> PostgreSQL, MongoDB, Redis, Prisma ORM, Docker, AWS, Vercel Edge, Firebase, Git & GitHub, Postman
                </p>
              </div>
            </div>

            {/* Education */}
            <div className="space-y-2 print:space-y-1">
              <h2 className="text-sm print:text-xs font-bold uppercase tracking-wider text-slate-900 border-b border-slate-800 pb-1 flex items-center gap-2">
                <GraduationCap size={16} className="text-slate-900 print:w-3 print:h-3" /> {t.educationTitle}
              </h2>
              <div className="flex justify-between items-start flex-wrap gap-2 print:gap-1 text-xs md:text-sm print:text-[11px]">
                <div>
                  <h3 className="font-extrabold text-slate-900">
                    {t.degree}
                  </h3>
                  <p className="text-xs print:text-[10px] font-bold text-slate-700">
                    {t.university}
                  </p>
                </div>
                <span className="text-xs print:text-[10px] font-mono font-bold text-slate-900 bg-slate-100 px-2 py-0.5 rounded border border-slate-400 pill">
                  2017 - 2022
                </span>
              </div>
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
}
