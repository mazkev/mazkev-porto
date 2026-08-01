'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { X, Printer, Download, Mail, Phone, MapPin, Code, Award, Briefcase, GraduationCap, LayoutGrid, Globe, Github } from 'lucide-react';
import Image from 'next/image';
import { projects } from '../lib/data/projects';

interface ResumeViewerProps {
  isOpen: boolean;
  onClose: () => void;
}

const content = {
  en: {
    title: 'Fullstack Developer & Technical Support Specialist',
    executiveSummaryTitle: 'Professional Summary',
    executiveSummary: 'Fullstack Engineer with over 3+ years of experience building high-fidelity consumer applications and robust enterprise systems. Expertise spans across modern frontend frameworks (Next.js, Vue, Angular) and scalable backend architectures (Java Spring Boot, Golang, Express.js, Node.js, MongoDB, PostgreSQL, and FastAPI). Proven track record in real-time engineering, complex state management, and delivering premium UI/UX aesthetics while maintaining enterprise system operations.',
    experienceTitle: 'Professional Experience',
    job1Title: 'Technical Support Specialist',
    job1Date: '2023 - Present',
    job1Bullet1: 'Listen to and resolve user complaints, technical issues, and system operational requests.',
    job1Bullet2: 'Write, optimize, and execute SQL queries for database troubleshooting and data extraction.',
    job1Bullet3: 'Perform application debugging to trace and fix software bugs across production environments.',
    job2Title: 'Freelance Fullstack Developer',
    job2Company: 'Various Clients',
    job2Date: '2023 - Present',
    job2Bullet1: 'Designed and deployed custom web apps and enterprise dashboards using Next.js, Vue 3, Angular, and React.',
    job2Bullet2: 'Engineered real-time WebSocket pipelines in Express and Node.js, capable of broadcasting data in <30ms.',
    job2Bullet3: 'Implemented complex browser state architectures using Redux, Zustand, and RxJS for infinite canvas and e-commerce platforms.',
    projectsTitle: 'Key Projects',
    skillsTitle: 'Skill Highlights',
    educationTitle: 'Education Background',
    degree: 'Bachelor of Information Technology',
    university: 'Universitas Amikom Yogyakarta',
    printBtn: 'Print Resume (ATS)',
    downloadBtn: 'Download PDF',
  },
  id: {
    title: 'Fullstack Developer & Technical Support Specialist',
    executiveSummaryTitle: 'Ringkasan Profesional',
    executiveSummary: 'Fullstack Engineer berpengalaman 3+ tahun dalam membangun aplikasi konsumen berkualitas tinggi dan sistem enterprise yang tangguh. Keahlian mencakup framework frontend modern (Next.js, Vue, Angular) dan arsitektur backend yang scalable (Java Spring Boot, Golang, Express.js, Node.js, MongoDB, PostgreSQL, dan FastAPI). Terbukti berpengalaman dalam engineering real-time, manajemen state kompleks, dan menyajikan estetika UI/UX premium.',
    experienceTitle: 'Pengalaman Kerja',
    job1Title: 'Technical Support Specialist',
    job1Date: '2023 - Sekarang',
    job1Bullet1: 'Mendengarkan dan menangani keluhan pengguna serta menyelesaikan kendala operasional sistem.',
    job1Bullet2: 'Membuat, mengoptimalkan, dan mengeksekusi query SQL untuk analisis data dan penanganan database.',
    job1Bullet3: 'Melakukan debugging aplikasi untuk melacak serta menemukan bug pada perangkat lunak.',
    job2Title: 'Freelance Fullstack Developer',
    job2Company: 'Berbagai Klien',
    job2Date: '2023 - Sekarang',
    job2Bullet1: 'Merancang dan mengimplementasi aplikasi web kustom dan dashboard enterprise menggunakan Next.js, Vue 3, Angular, dan React.',
    job2Bullet2: 'Membangun pipeline WebSocket real-time pada Express, Node.js, dan Firebase dengan kecepatan data <30ms.',
    job2Bullet3: 'Mengembangkan arsitektur state browser kompleks menggunakan Redux, Zustand, dan RxJS untuk platform e-commerce dan canvas.',
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
  const t = content[lang];

  const handlePrint = () => {
    window.print();
  };

  if (!isOpen) return null;

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
          <div className="flex items-center gap-2 flex-wrap">
            {/* TOGGLE BAHASA / TRANSLATE CV */}
            <div className="flex items-center bg-slate-200 dark:bg-slate-800 p-1 rounded-xl border border-slate-400 dark:border-slate-700">
              <button
                onClick={() => setLang('en')}
                className={`px-3 py-1 text-xs font-bold rounded-lg transition-all flex items-center gap-1 cursor-pointer ${
                  lang === 'en'
                    ? 'bg-black text-white dark:bg-white dark:text-black shadow'
                    : 'text-slate-700 dark:text-slate-300 hover:text-black dark:hover:text-white'
                }`}
              >
                🇬🇧 English
              </button>
              <button
                onClick={() => setLang('id')}
                className={`px-3 py-1 text-xs font-bold rounded-lg transition-all flex items-center gap-1 cursor-pointer ${
                  lang === 'id'
                    ? 'bg-black text-white dark:bg-white dark:text-black shadow'
                    : 'text-slate-700 dark:text-slate-300 hover:text-black dark:hover:text-white'
                }`}
              >
                🇮🇩 Indonesia
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
                <h1 className="text-3xl md:text-4xl print:text-2xl font-extrabold text-slate-900 leading-none uppercase tracking-tight">
                  Kevin Eka Pratama
                </h1>
                <p className="text-xs md:text-sm print:text-[10px] font-bold text-slate-800 uppercase tracking-widest pt-1 print:pt-0">
                  {t.title}
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
                <Award size={16} className="text-slate-900 print:w-3 print:h-3" /> {t.executiveSummaryTitle}
              </h2>
              <p className="text-slate-800 leading-relaxed text-xs md:text-sm print:text-[11px] print:leading-normal font-medium">
                {t.executiveSummary}
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

            {/* Selected / Key Projects - Clean ATS List */}
            <div className="space-y-2 print:space-y-1">
              <h2 className="text-sm print:text-xs font-bold uppercase tracking-wider text-slate-900 border-b border-slate-800 pb-1 flex items-center gap-2">
                <LayoutGrid size={16} className="text-slate-900 print:w-3 print:h-3" /> {t.projectsTitle}
              </h2>
              <div className="space-y-2 print:space-y-1 text-xs print:text-[10.5px]">
                {projects.slice(0, 10).map((project, idx) => (
                  <div key={idx} className="flex flex-col sm:flex-row sm:items-center justify-between gap-1 border-b border-slate-200 pb-1.5 print:pb-1 last:border-none print:break-inside-avoid">
                    <div className="font-bold text-slate-900">
                      • {project.title}
                    </div>
                    <div className="flex flex-wrap gap-1">
                      {project.tech.map((tItem, i) => (
                        <span key={i} className="text-[9px] print:text-[8px] font-mono font-bold uppercase text-slate-900 bg-slate-100 border border-slate-300 px-1.5 py-0.5 rounded pill">
                          {tItem}
                        </span>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Core Tech stack */}
            <div className="space-y-2.5 print:space-y-1.5">
              <h2 className="text-sm print:text-xs font-bold uppercase tracking-wider text-slate-900 border-b border-slate-800 pb-1 flex items-center gap-2">
                <Code size={16} className="text-slate-900 print:w-3 print:h-3" /> {t.skillsTitle}
              </h2>
              
              <div className="grid md:grid-cols-3 gap-3 print:gap-2 text-xs print:text-[10px]">
                <div>
                  <h4 className="font-bold text-slate-900 mb-1.5 print:mb-1 uppercase tracking-wide">Frontend</h4>
                  <div className="flex flex-wrap gap-1 print:gap-1">
                    {['Next.js', 'React.js', 'Vue 3', 'Angular', 'TypeScript', 'Tailwind'].map((s) => (
                      <span key={s} className="px-2 py-0.5 bg-slate-100 rounded border border-slate-300 text-slate-900 font-bold pill">{s}</span>
                    ))}
                  </div>
                </div>
                <div>
                  <h4 className="font-bold text-slate-900 mb-1.5 print:mb-1 uppercase tracking-wide">Backend</h4>
                  <div className="flex flex-wrap gap-1 print:gap-1">
                    {['Java Spring Boot', 'Golang', 'Express.js', 'Node.js', 'MongoDB', 'PostgreSQL', 'MySQL', 'FastAPI'].map((s) => (
                      <span key={s} className="px-2 py-0.5 bg-slate-100 rounded border border-slate-300 text-slate-900 font-bold pill">{s}</span>
                    ))}
                  </div>
                </div>
                <div>
                  <h4 className="font-bold text-slate-900 mb-1.5 print:mb-1 uppercase tracking-wide">DevOps & Tools</h4>
                  <div className="flex flex-wrap gap-1 print:gap-1">
                    {['Docker', 'AWS', 'Vercel', 'Git', 'Firebase'].map((s) => (
                      <span key={s} className="px-2 py-0.5 bg-slate-100 rounded border border-slate-300 text-slate-900 font-bold pill">{s}</span>
                    ))}
                  </div>
                </div>
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
