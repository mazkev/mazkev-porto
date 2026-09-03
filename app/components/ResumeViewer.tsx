'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { X, Printer, Download, Mail, Phone, MapPin, Code, Award, Briefcase, GraduationCap, LayoutGrid, Globe, Github, Layers, Server, Cpu, FileText } from 'lucide-react';
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
    job2Company: 'Open Source & Practical Systems',
    job2Date: '2022 - Present',
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
    job2Company: 'Open Source & Proyek Mandiri',
    job2Date: '2022 - Sekarang',
    job2Bullet1: 'Membangun 20+ aplikasi web fullstack dan backend menggunakan Go (Golang), React, Next.js, dan Java Spring Boot untuk memperdalam arsitektur perangkat lunak.',
    job2Bullet2: 'Merancang skema database relasional, menerapkan autentikasi JWT, dan mengimplementasikan penanganan transaksi database di PostgreSQL.',
    job2Bullet3: 'Mengembangkan antarmuka frontend responsif dengan React/TypeScript dan menyiapkan lingkungan pengembangan menggunakan Docker.',
    degree: 'Sarjana Ilmu Komputer / Teknologi Informasi',
    university: 'Universitas Gunadarma • IPK: 3.48 / 4.00',
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

      <div className="space-y-1.5 print:space-y-0.5">
        <h2 className="text-sm print:text-xs font-bold uppercase tracking-wider text-slate-900 border-b border-slate-800 pb-1 flex items-center justify-between">
          <span className="flex items-center gap-2">
            <Award size={16} className="text-slate-900 print:w-3 print:h-3" /> {currentRoleContent.executiveSummaryTitle}
          </span>
          {pageNumber && (
            <span className="text-[10px] font-mono text-slate-600 font-bold uppercase">
              {lang === 'en' ? 'Page 1: English (ATS)' : 'Halaman 2: Bahasa Indonesia (ATS)'}
            </span>
          )}
        </h2>
        <p className="text-slate-800 leading-relaxed text-xs md:text-sm print:text-[10.5px] print:leading-normal font-medium">
          {currentRoleContent.executiveSummary}
        </p>
      </div>

      <div className="space-y-3.5 print:space-y-2">
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
          {roleProjects.slice(0, 6).map((project, idx) => (
            <div key={idx} className="space-y-0.5 border-b border-slate-200 pb-1.5 print:pb-1 last:border-none print:break-inside-avoid">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1">
                <div className="font-extrabold text-slate-900 text-xs md:text-sm print:text-[10.5px]">
                  • {project.title}
                </div>
                <div className="text-[10px] print:text-[8px] font-mono text-slate-700 font-bold uppercase">
                  {project.tech.join(' • ')}
                </div>
              </div>
              <p className="text-[11px] print:text-[9px] text-slate-700 font-medium pl-3 leading-snug">
                {project.description}
              </p>
            </div>
          ))}
        </div>
      </div>

      <div className="space-y-1 print:space-y-0.5">
        <h2 className="text-sm print:text-xs font-bold uppercase tracking-wider text-slate-900 border-b border-slate-800 pb-1 flex items-center gap-2">
          <Code size={16} className="text-slate-900 print:w-3 print:h-3" /> {t.skillsTitle}
        </h2>
        
        <div className="space-y-0.5 text-xs print:text-[9.5px] text-slate-800 leading-relaxed font-medium">
          <p>
            <strong>Engineering & Frameworks:</strong> Next.js, React.js, Java Spring Boot, Golang, Express.js, Node.js, Vue 3, Angular, Python (FastAPI), TypeScript, Tailwind CSS
          </p>
          <p>
            <strong>Databases & Cloud Tools:</strong> PostgreSQL, MongoDB, Redis, Prisma ORM, Docker, AWS, Vercel Edge, Firebase, Git & GitHub, Postman
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

export default function ResumeViewer({ isOpen, onClose }: ResumeViewerProps) {
  const [cvMode, setCvMode] = useState<CVMode>('bilingual');
  const [activeRole, setActiveRole] = useState<ResumeRole>('fullstack');

  const handlePrint = () => window.print();

  if (!isOpen) return null;

  const frontendTop6Titles = ['Enterprise Operations Dashboard', 'MazCloud File Storage Dashboard', 'React Shopping Cart Application', 'Canvass Graphic Design Studio', 'Trello Kanban Workspace', 'Spotify Web Player Clone'];
  const fullstackTop6Titles = ['Go Marketplace (Fullstack Go & React)', 'BayE Marketplace (Fullstack Next.js)', 'Semarketplace Pro (React & Express)', 'AliExpress Choice E-Commerce (Java Spring Boot)', 'HRMS Enterprise Management (Laravel 11)', 'Bun & Hono E-Commerce Backend (Drizzle ORM)'];
  const backendTop6Titles = ['Go Marketplace Backend (GORM & REST API)', 'Go Clean Architecture REST API', 'Go Banking Core Engine', 'Bun & Hono E-Commerce Backend (Drizzle ORM)', 'HRMS Enterprise Management (Laravel 11)', 'AliExpress Choice E-Commerce (Java Spring Boot)'];

  const roleProjects = (activeRole === 'frontend' ? frontendTop6Titles : activeRole === 'backend' ? backendTop6Titles : fullstackTop6Titles)
    .map(title => projects.find(p => p.title === title))
    .filter(Boolean) as typeof projects;

  return (
    <div className="fixed inset-0 z-50 flex justify-end print:absolute print:inset-auto print:w-full print:h-auto print:block">
      <style jsx global>{`
        @page { size: A4; margin: 12mm 15mm; }
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

            {/* TOGGLE CV FORMAT: 2 HALAMAN (BILINGUAL) vs SINGLE PAGE */}
            <div className="flex items-center bg-slate-200 dark:bg-slate-800 p-1 rounded-xl border border-slate-300 dark:border-slate-700">
              <button
                onClick={() => setCvMode('bilingual')}
                className={`px-3 py-1 text-xs font-bold rounded-lg transition-all flex items-center gap-1.5 cursor-pointer ${
                  cvMode === 'bilingual'
                    ? 'bg-slate-900 text-white dark:bg-white dark:text-black shadow'
                    : 'text-slate-700 dark:text-slate-300 hover:text-black dark:hover:text-white'
                }`}
                title="Gabung 2 Halaman (Halaman 1 English, Halaman 2 Bahasa Indonesia)"
              >
                <FileText size={13} /> 2 Hal (EN + ID)
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
              <Printer size={14} /> {cvMode === 'bilingual' ? 'Cetak CV (2 Halaman ATS)' : 'Cetak CV (1 Halaman ATS)'}
            </button>
            <a
              href="/resume.pdf"
              target="_blank"
              download="resume.pdf"
              className="px-4 py-2 bg-slate-200 dark:bg-slate-800 hover:bg-slate-300 dark:hover:bg-slate-700 text-slate-900 dark:text-white text-xs font-bold rounded-xl flex items-center gap-2 transition-all cursor-pointer border border-slate-400 dark:border-slate-700"
            >
              <Download size={14} /> PDF
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
                <CVContent lang="en" activeRole={activeRole} roleProjects={roleProjects} pageNumber={1} totalPages={2} />
              </div>

              {/* Visual Screen Divider */}
              <div className="no-print my-10 py-4 border-y-2 border-dashed border-slate-300 dark:border-slate-700 flex items-center justify-between text-xs font-mono text-slate-500">
                <span className="font-bold uppercase tracking-wider flex items-center gap-2 text-slate-900 dark:text-white">
                  <FileText size={15} className="text-emerald-600 dark:text-emerald-400" /> Halaman 2: Versi Bahasa Indonesia (ATS Standard)
                </span>
                <span className="bg-slate-200 dark:bg-slate-800 px-2.5 py-1 rounded-md text-[10px] font-bold text-slate-700 dark:text-slate-300">
                  Page 2 of 2
                </span>
              </div>

              <div className="page-break" />

              {/* PAGE 2: INDONESIAN VERSION */}
              <div className="relative">
                <CVContent lang="id" activeRole={activeRole} roleProjects={roleProjects} pageNumber={2} totalPages={2} />
              </div>
            </>
          ) : (
            <CVContent lang={cvMode} activeRole={activeRole} roleProjects={roleProjects} pageNumber={1} totalPages={1} />
          )}
        </div>
      </motion.div>
    </div>
  );
}
