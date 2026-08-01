'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { X, Printer, Download, Mail, Phone, MapPin, Code, Award, Briefcase, GraduationCap, LayoutGrid, Globe } from 'lucide-react';
import Image from 'next/image';
import { projects } from '../lib/data/projects';

interface ResumeViewerProps {
  isOpen: boolean;
  onClose: () => void;
}

const content = {
  en: {
    title: 'Fullstack Developer & Digital Craftsman',
    executiveSummaryTitle: 'Executive Summary',
    executiveSummary: 'Versatile Fullstack Engineer with 3+ years of experience building high-fidelity consumer applications and robust enterprise systems. Expertise spans across modern frontend frameworks (Next.js, Vue, Angular) and scalable backend architectures (PostgreSQL, Firebase, FastAPI). Proven track record in real-time engineering, complex state management, and delivering premium UI/UX aesthetics while maintaining enterprise system operations.',
    experienceTitle: 'Professional Experience',
    job1Title: 'Junior Technical Support',
    job1Date: '2023 - Present',
    job1Bullet1: 'Deliver operational technical support for enterprise network integrations and system dashboards.',
    job1Bullet2: 'Perform SQL query optimization and database troubleshooting to ensure high uptime.',
    job1Bullet3: 'Maintain internal leave synchronization systems and attendance verification frameworks.',
    job2Title: 'Freelance Fullstack Developer',
    job2Company: 'Digital Solutions Lab',
    job2Date: '2023 - 2025',
    job2Bullet1: 'Designed and deployed 20+ custom web apps and enterprise dashboards using Next.js, Vue 3, Angular, and React.',
    job2Bullet2: 'Engineered real-time WebSocket pipelines in FastAPI and Firebase, capable of broadcasting data in <30ms.',
    job2Bullet3: 'Implemented complex browser state architectures using Redux, Zustand, and RxJS for infinite canvas and e-commerce platforms.',
    projectsTitle: 'Selected Projects',
    skillsTitle: 'Technical Skills',
    educationTitle: 'Education',
    degree: 'Bachelor of Computer Science',
    university: 'Amikom University',
    printBtn: 'Print Resume',
    downloadBtn: 'Download PDF',
  },
  id: {
    title: 'Pengembang Fullstack & Digital Craftsman',
    executiveSummaryTitle: 'Ringkasan Eksekutif',
    executiveSummary: 'Fullstack Engineer berpengalaman 3+ tahun dalam membangun aplikasi konsumen berkualitas tinggi dan sistem enterprise yang tangguh. Keahlian mencakup framework frontend modern (Next.js, Vue, Angular) dan arsitektur backend yang scalable (PostgreSQL, Firebase, FastAPI). Terbukti berpengalaman dalam engineering real-time, manajemen state kompleks, dan menyajikan estetika UI/UX premium.',
    experienceTitle: 'Pengalaman Kerja',
    job1Title: 'Junior Technical Support',
    job1Date: '2023 - Sekarang',
    job1Bullet1: 'Memberikan dukungan teknis operasional untuk integrasi jaringan enterprise dan dashboard sistem.',
    job1Bullet2: 'Melakukan optimasi query SQL dan penanganan masalah database untuk menjamin uptime tinggi.',
    job1Bullet3: 'Mengelola sistem sinkronisasi cuti internal dan framework verifikasi kehadiran karyawan.',
    job2Title: 'Freelance Fullstack Developer',
    job2Company: 'Digital Solutions Lab',
    job2Date: '2023 - 2025',
    job2Bullet1: 'Merancang dan mengimplementasi 20+ aplikasi web kustom dan dashboard enterprise menggunakan Next.js, Vue 3, Angular, dan React.',
    job2Bullet2: 'Membangun pipeline WebSocket real-time pada FastAPI dan Firebase dengan kecepatan data <30ms.',
    job2Bullet3: 'Mengembangkan arsitektur state browser kompleks menggunakan Redux, Zustand, dan RxJS untuk platform e-commerce dan canvas.',
    projectsTitle: 'Proyek Pilihan',
    skillsTitle: 'Keahlian Teknis',
    educationTitle: 'Pendidikan',
    degree: 'Sarjana Ilmu Komputer (S.Kom)',
    university: 'Universitas Amikom',
    printBtn: 'Cetak CV',
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
      {/* Print-specific style override */}
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
          /* Ensure ALL text is dark for high-contrast printing */
          #print-area * {
            color: black !important;
            border-color: #cccccc !important;
          }
          #print-area .pill {
            border: 1px solid #cccccc !important;
            background: transparent !important;
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
        className="relative w-full max-w-5xl h-full print:h-auto bg-white dark:bg-slate-900 border-l border-slate-200 dark:border-slate-800 shadow-2xl flex flex-col z-10"
      >
        {/* Actions Bar (Top) */}
        <div className="px-6 py-4 bg-slate-50 dark:bg-slate-950/40 border-b border-slate-200 dark:border-slate-800/80 flex items-center justify-between no-print flex-shrink-0 flex-wrap gap-3">
          <div className="flex items-center gap-2 flex-wrap">
            {/* TOGGLE BAHASA / TRANSLATE CV */}
            <div className="flex items-center bg-slate-200 dark:bg-slate-800 p-1 rounded-xl border border-slate-300 dark:border-slate-700">
              <button
                onClick={() => setLang('en')}
                className={`px-3 py-1 text-xs font-bold rounded-lg transition-all flex items-center gap-1 cursor-pointer ${
                  lang === 'en'
                    ? 'bg-brand-600 text-white shadow'
                    : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
                }`}
              >
                🇬🇧 English
              </button>
              <button
                onClick={() => setLang('id')}
                className={`px-3 py-1 text-xs font-bold rounded-lg transition-all flex items-center gap-1 cursor-pointer ${
                  lang === 'id'
                    ? 'bg-brand-600 text-white shadow'
                    : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
                }`}
              >
                🇮🇩 Indonesia
              </button>
            </div>

            <button
              onClick={handlePrint}
              className="px-4 py-2 bg-brand-600 hover:bg-brand-700 text-white text-xs font-bold rounded-xl flex items-center gap-2 transition-all cursor-pointer shadow-md shadow-brand-600/10"
            >
              <Printer size={14} /> {t.printBtn}
            </button>
            <a
              href="/resume.pdf"
              target="_blank"
              download="resume.pdf"
              className="px-4 py-2 bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-300 text-xs font-bold rounded-xl flex items-center gap-2 transition-all cursor-pointer border border-slate-200/40 dark:border-slate-700/60"
            >
              <Download size={14} /> {t.downloadBtn}
            </a>
          </div>

          <button
            onClick={onClose}
            aria-label="Close resume"
            className="p-2 text-slate-400 hover:text-slate-600 dark:hover:text-white rounded-xl hover:bg-slate-100 dark:hover:bg-slate-800 transition-all cursor-pointer"
          >
            <X size={20} />
          </button>
        </div>

        {/* Resume Scrollable Content */}
        <div className="flex-grow overflow-y-auto p-6 md:p-8 print:p-0 print:overflow-visible" id="print-area">
          <div className="max-w-4xl mx-auto space-y-8 print:space-y-3">
            {/* Header info */}
            <div className="border-b border-slate-100 dark:border-slate-800/80 pb-6 print:pb-3 flex flex-row items-center justify-between gap-6 print:gap-4">
              {/* Profile Photo */}
              <div className="w-20 h-20 md:w-24 md:h-24 print:w-16 print:h-16 flex-shrink-0 rounded-2xl overflow-hidden border-4 border-slate-100 dark:border-slate-800 shadow-lg bg-slate-50 dark:bg-slate-900 print:border-none print:shadow-none print:rounded-lg">
                <Image
                  src="/profile/kev.png"
                  alt="Kevin Eka Pratama"
                  width={96}
                  height={96}
                  className="w-full h-full object-cover"
                />
              </div>

              <div className="flex-grow text-right space-y-1 print:space-y-0.5">
                <h1 className="text-3xl md:text-4xl print:text-2xl font-extrabold font-outfit text-slate-900 dark:text-white leading-none">
                  Kevin Eka Pratama
                </h1>
                <p className="text-xs md:text-sm print:text-[10px] font-bold text-brand-600 dark:text-brand-400 font-outfit uppercase tracking-widest pt-1 print:pt-0">
                  {t.title}
                </p>
                <div className="pt-2 print:pt-1 flex flex-col sm:flex-row items-end sm:items-center justify-end gap-y-1 gap-x-4 print:gap-x-3 text-xs print:text-[10px] text-slate-500 dark:text-slate-400 font-medium">
                  <div className="flex items-center gap-1.5">
                    <span>kevinekapratama@gmail.com</span>
                    <Mail size={12} className="text-slate-400" />
                  </div>
                  <div className="flex items-center gap-1.5">
                    <span>+62 (813) 000-0000</span>
                    <Phone size={12} className="text-slate-400" />
                  </div>
                  <div className="flex items-center gap-1.5">
                    <span>Jakarta, Indonesia</span>
                    <MapPin size={12} className="text-slate-400" />
                  </div>
                </div>
              </div>
            </div>

            {/* Profile summary */}
            <div className="space-y-3 print:space-y-1.5">
              <h2 className="text-lg print:text-sm font-bold font-outfit uppercase tracking-wider text-slate-800 dark:text-slate-200 border-b border-slate-100 dark:border-slate-800 pb-1.5 flex items-center gap-2">
                <Award size={18} className="text-brand-500 print:w-3.5 print:h-3.5" /> {t.executiveSummaryTitle}
              </h2>
              <p className="text-slate-600 dark:text-slate-400 leading-relaxed text-sm print:text-[11px] print:leading-normal">
                {t.executiveSummary}
              </p>
            </div>

            {/* Work experience */}
            <div className="space-y-6 print:space-y-3">
              <h2 className="text-lg print:text-sm font-bold font-outfit uppercase tracking-wider text-slate-800 dark:text-slate-200 border-b border-slate-100 dark:border-slate-800 pb-1.5 flex items-center gap-2">
                <Briefcase size={18} className="text-brand-500 print:w-3.5 print:h-3.5" /> {t.experienceTitle}
              </h2>

              <div className="space-y-6 print:space-y-3">
                {/* Job 1 */}
                <div className="space-y-2 print:space-y-1 print:break-inside-avoid">
                  <div className="flex justify-between items-start flex-wrap gap-2 print:gap-1">
                    <div>
                      <h3 className="font-extrabold text-slate-800 dark:text-white text-base print:text-[13px]">
                        {t.job1Title}
                      </h3>
                      <p className="text-sm print:text-[11px] font-semibold text-slate-400 dark:text-slate-500">
                        PT PLN Icon+
                      </p>
                    </div>
                    <span className="text-xs print:text-[10px] print:py-0 print:px-1.5 font-mono font-bold text-brand-600 dark:text-brand-400 bg-brand-50 dark:bg-brand-950/40 px-2.5 py-1 rounded-lg border border-brand-100/50 dark:border-brand-900/50 pill">
                      {t.job1Date}
                    </span>
                  </div>
                  <ul className="list-disc pl-4 text-slate-600 dark:text-slate-400 text-xs print:text-[11px] leading-relaxed print:leading-normal space-y-1.5 print:space-y-0.5">
                    <li>{t.job1Bullet1}</li>
                    <li>{t.job1Bullet2}</li>
                    <li>{t.job1Bullet3}</li>
                  </ul>
                </div>

                {/* Job 2 */}
                <div className="space-y-2 print:space-y-1 print:break-inside-avoid">
                  <div className="flex justify-between items-start flex-wrap gap-2 print:gap-1">
                    <div>
                      <h3 className="font-extrabold text-slate-800 dark:text-white text-base print:text-[13px]">
                        {t.job2Title}
                      </h3>
                      <p className="text-sm print:text-[11px] font-semibold text-slate-400 dark:text-slate-500">
                        {t.job2Company}
                      </p>
                    </div>
                    <span className="text-xs print:text-[10px] print:py-0 print:px-1.5 font-mono font-bold text-brand-600 dark:text-brand-400 bg-brand-50 dark:bg-brand-950/40 px-2.5 py-1 rounded-lg border border-brand-100/50 dark:border-brand-900/50 pill">
                      {t.job2Date}
                    </span>
                  </div>
                  <ul className="list-disc pl-4 text-slate-600 dark:text-slate-400 text-xs print:text-[11px] leading-relaxed print:leading-normal space-y-1.5 print:space-y-0.5">
                    <li>{t.job2Bullet1}</li>
                    <li>{t.job2Bullet2}</li>
                    <li>{t.job2Bullet3}</li>
                  </ul>
                </div>
              </div>
            </div>

            {/* Selected Projects */}
            <div className="space-y-4 print:space-y-2">
              <h2 className="text-lg print:text-sm font-bold font-outfit uppercase tracking-wider text-slate-800 dark:text-slate-200 border-b border-slate-100 dark:border-slate-800 pb-1.5 flex items-center gap-2">
                <LayoutGrid size={18} className="text-brand-500 print:w-3.5 print:h-3.5" /> {t.projectsTitle}
              </h2>
              <div className="grid sm:grid-cols-2 gap-4 print:gap-3">
                {projects.slice(0, 4).map((project, idx) => (
                  <div key={idx} className="p-4 print:p-3 rounded-2xl bg-slate-50 dark:bg-slate-800/40 border border-slate-100 dark:border-slate-800/80 print:break-inside-avoid">
                    <h3 className="font-extrabold text-slate-800 dark:text-white text-sm print:text-[12px] mb-1">{project.title}</h3>
                    <div className="flex flex-wrap gap-1 mb-2.5 print:mb-1.5">
                      {project.tech.slice(0, 3).map((tItem, i) => (
                        <span key={i} className="text-[9px] print:text-[8px] font-bold uppercase tracking-wider text-brand-600 dark:text-brand-400 bg-brand-50 dark:bg-brand-900/30 px-1.5 py-0.5 rounded pill">
                          {tItem}
                        </span>
                      ))}
                    </div>
                    <p className="text-xs print:text-[10px] text-slate-600 dark:text-slate-400 leading-relaxed print:leading-normal">
                      {project.description}
                    </p>
                  </div>
                ))}
              </div>
            </div>

            {/* Core Tech stack */}
            <div className="space-y-3 print:space-y-1.5">
              <h2 className="text-lg print:text-sm font-bold font-outfit uppercase tracking-wider text-slate-800 dark:text-slate-200 border-b border-slate-100 dark:border-slate-800 pb-1.5 flex items-center gap-2">
                <Code size={18} className="text-brand-500 print:w-3.5 print:h-3.5" /> {t.skillsTitle}
              </h2>
              
              <div className="grid md:grid-cols-3 gap-4 print:gap-2 text-xs print:text-[10px]">
                <div>
                  <h4 className="font-bold text-slate-800 dark:text-white mb-2 print:mb-1 uppercase tracking-wide">Frontend</h4>
                  <div className="flex flex-wrap gap-1.5 print:gap-1">
                    {['Next.js', 'React.js', 'Vue 3', 'Angular', 'TypeScript', 'Tailwind'].map((s) => (
                      <span key={s} className="px-2 py-1 print:px-1.5 print:py-0 bg-slate-50 dark:bg-slate-800/60 rounded-md border border-slate-100 dark:border-slate-700/50 text-slate-600 dark:text-slate-300 font-semibold pill">{s}</span>
                    ))}
                  </div>
                </div>
                <div>
                  <h4 className="font-bold text-slate-800 dark:text-white mb-2 print:mb-1 uppercase tracking-wide">Backend</h4>
                  <div className="flex flex-wrap gap-1.5 print:gap-1">
                    {['Node.js', 'FastAPI', 'Python', 'PostgreSQL', 'MySQL'].map((s) => (
                      <span key={s} className="px-2 py-1 print:px-1.5 print:py-0 bg-slate-50 dark:bg-slate-800/60 rounded-md border border-slate-100 dark:border-slate-700/50 text-slate-600 dark:text-slate-300 font-semibold pill">{s}</span>
                    ))}
                  </div>
                </div>
                <div>
                  <h4 className="font-bold text-slate-800 dark:text-white mb-2 print:mb-1 uppercase tracking-wide">DevOps & Tools</h4>
                  <div className="flex flex-wrap gap-1.5 print:gap-1">
                    {['Docker', 'AWS', 'Vercel', 'Git', 'Firebase'].map((s) => (
                      <span key={s} className="px-2 py-1 print:px-1.5 print:py-0 bg-slate-50 dark:bg-slate-800/60 rounded-md border border-slate-100 dark:border-slate-700/50 text-slate-600 dark:text-slate-300 font-semibold pill">{s}</span>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            {/* Education */}
            <div className="space-y-3 print:space-y-1.5">
              <h2 className="text-lg print:text-sm font-bold font-outfit uppercase tracking-wider text-slate-800 dark:text-slate-200 border-b border-slate-100 dark:border-slate-800 pb-1.5 flex items-center gap-2">
                <GraduationCap size={18} className="text-brand-500 print:w-3.5 print:h-3.5" /> {t.educationTitle}
              </h2>
              <div className="flex justify-between items-start flex-wrap gap-2 print:gap-1 text-sm print:text-[11px]">
                <div>
                  <h3 className="font-extrabold text-slate-800 dark:text-white">
                    {t.degree}
                  </h3>
                  <p className="text-xs print:text-[10px] font-semibold text-slate-400 dark:text-slate-500">
                    {t.university}
                  </p>
                </div>
                <span className="text-xs print:text-[10px] print:py-0 print:px-1.5 font-mono font-bold text-brand-600 dark:text-brand-400 bg-brand-50 dark:bg-brand-950/40 px-2.5 py-1 rounded-lg border border-brand-100/50 dark:border-brand-900/50 pill">
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
