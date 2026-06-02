'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { X, Printer, Download, Mail, Phone, MapPin, Code, Award, Briefcase, GraduationCap } from 'lucide-react';
import Image from 'next/image';

interface ResumeViewerProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function ResumeViewer({ isOpen, onClose }: ResumeViewerProps) {
  const handlePrint = () => {
    window.print();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex justify-end">
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
          /* Ensure text colors are dark for high-contrast printing */
          #print-area h1, #print-area h2, #print-area h3, #print-area h4 {
            color: #000000 !important;
          }
          #print-area p, #print-area span, #print-area li {
            color: #333333 !important;
          }
          #print-area .pill {
            border: 1px solid #cccccc !important;
            background: transparent !important;
            color: #000000 !important;
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
        className="relative w-full max-w-3xl h-full bg-white dark:bg-slate-900 border-l border-slate-200 dark:border-slate-800 shadow-2xl flex flex-col z-10"
      >
        {/* Actions Bar (Top) */}
        <div className="px-6 py-4 bg-slate-50 dark:bg-slate-950/40 border-b border-slate-200 dark:border-slate-800/80 flex items-center justify-between no-print flex-shrink-0">
          <div className="flex items-center gap-2">
            <button
              onClick={handlePrint}
              className="px-4 py-2 bg-brand-600 hover:bg-brand-700 text-white text-xs font-bold rounded-xl flex items-center gap-2 transition-all cursor-pointer shadow-md shadow-brand-600/10"
            >
              <Printer size={14} /> Print Resume
            </button>
            <a
              href="/resume.pdf"
              target="_blank"
              download="resume.pdf"
              className="px-4 py-2 bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-300 text-xs font-bold rounded-xl flex items-center gap-2 transition-all cursor-pointer border border-slate-200/40 dark:border-slate-700/60"
            >
              <Download size={14} /> Download PDF
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
        <div className="flex-grow overflow-y-auto p-6 md:p-8 print:p-0 print:overflow-hidden" id="print-area">
          <div className="max-w-2xl mx-auto space-y-8 print:space-y-4">
            {/* Header info */}
            <div className="border-b border-slate-100 dark:border-slate-800/80 pb-6 print:pb-4 flex flex-row items-center justify-between gap-6">
              {/* Profile Photo */}
              <div className="w-20 h-20 md:w-24 md:h-24 print:w-20 print:h-20 flex-shrink-0 rounded-2xl overflow-hidden border-4 border-slate-100 dark:border-slate-800 shadow-lg bg-slate-50 dark:bg-slate-900 print:border-none print:shadow-none print:rounded-lg">
                <Image
                  src="/profile/avatar-nobeard.png"
                  alt="Kevin Eka Pratama"
                  width={96}
                  height={96}
                  className="w-full h-full object-cover"
                />
              </div>

              <div className="flex-grow text-right space-y-1">
                <h1 className="text-3xl md:text-4xl print:text-3xl font-extrabold font-outfit text-slate-900 dark:text-white leading-none">
                  Kevin Eka Pratama
                </h1>
                <p className="text-xs md:text-sm font-bold text-brand-600 dark:text-brand-400 font-outfit uppercase tracking-widest pt-1">
                  Fullstack Developer & Digital Craftsman
                </p>
                <div className="pt-2 flex flex-col sm:flex-row items-end sm:items-center justify-end gap-y-1 gap-x-4 text-xs text-slate-500 dark:text-slate-400 font-medium">
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
            <div className="space-y-3">
              <h2 className="text-lg font-bold font-outfit uppercase tracking-wider text-slate-800 dark:text-slate-200 border-b border-slate-100 dark:border-slate-800 pb-1.5 flex items-center gap-2">
                <Award size={18} className="text-brand-500" /> Executive Summary
              </h2>
              <p className="text-slate-600 dark:text-slate-400 leading-relaxed text-sm">
                Versatile Fullstack Engineer with 3+ years of experience building high-fidelity consumer applications and robust enterprise systems. Expertise spans across modern frontend frameworks (Next.js, Vue, Angular) and scalable backend architectures (PostgreSQL, Firebase, FastAPI). Proven track record in real-time engineering, complex state management, and delivering premium UI/UX aesthetics while maintaining enterprise system operations.
              </p>
            </div>

            {/* Work experience */}
            <div className="space-y-6">
              <h2 className="text-lg font-bold font-outfit uppercase tracking-wider text-slate-800 dark:text-slate-200 border-b border-slate-100 dark:border-slate-800 pb-1.5 flex items-center gap-2">
                <Briefcase size={18} className="text-brand-500" /> Professional Experience
              </h2>

              <div className="space-y-6">
                {/* Job 1 */}
                <div className="space-y-2">
                  <div className="flex justify-between items-start flex-wrap gap-2">
                    <div>
                      <h3 className="font-extrabold text-slate-800 dark:text-white text-base">
                        Junior Technical Support Grade 1
                      </h3>
                      <p className="text-sm font-semibold text-slate-400 dark:text-slate-500">
                        PT PLN Icon+
                      </p>
                    </div>
                    <span className="text-xs font-mono font-bold text-brand-600 dark:text-brand-400 bg-brand-50 dark:bg-brand-950/40 px-2.5 py-1 rounded-lg border border-brand-100/50 dark:border-brand-900/50 pill">
                      2025 - Present
                    </span>
                  </div>
                  <ul className="list-disc pl-4 text-slate-600 dark:text-slate-400 text-xs leading-relaxed space-y-1.5">
                    <li>Deliver operational technical support for enterprise network integrations and system dashboards.</li>
                    <li>Perform SQL query optimization and database troubleshooting to ensure high uptime.</li>
                    <li>Maintain internal leave synchronization systems and attendance verification frameworks.</li>
                  </ul>
                </div>

                {/* Job 2 */}
                <div className="space-y-2">
                  <div className="flex justify-between items-start flex-wrap gap-2">
                    <div>
                      <h3 className="font-extrabold text-slate-800 dark:text-white text-base">
                        Freelance Fullstack Developer
                      </h3>
                      <p className="text-sm font-semibold text-slate-400 dark:text-slate-500">
                        Digital Solutions Lab
                      </p>
                    </div>
                    <span className="text-xs font-mono font-bold text-brand-600 dark:text-brand-400 bg-brand-50 dark:bg-brand-950/40 px-2.5 py-1 rounded-lg border border-brand-100/50 dark:border-brand-900/50 pill">
                      2023 - 2025
                    </span>
                  </div>
                  <ul className="list-disc pl-4 text-slate-600 dark:text-slate-400 text-xs leading-relaxed space-y-1.5">
                    <li>Designed and deployed 20+ custom web apps and enterprise dashboards using Next.js, Vue 3, Angular, and React.</li>
                    <li>Engineered real-time WebSocket pipelines in FastAPI and Firebase, capable of broadcasting data in &lt;30ms.</li>
                    <li>Implemented complex browser state architectures using Redux, Zustand, and RxJS for infinite canvas and e-commerce platforms.</li>
                  </ul>
                </div>
              </div>
            </div>

            {/* Core Tech stack */}
            <div className="space-y-3">
              <h2 className="text-lg font-bold font-outfit uppercase tracking-wider text-slate-800 dark:text-slate-200 border-b border-slate-100 dark:border-slate-800 pb-1.5 flex items-center gap-2">
                <Code size={18} className="text-brand-500" /> Technical Skills
              </h2>
              
              <div className="grid md:grid-cols-3 gap-4 text-xs">
                <div>
                  <h4 className="font-bold text-slate-800 dark:text-white mb-2 uppercase tracking-wide">Frontend</h4>
                  <div className="flex flex-wrap gap-1.5">
                    {['Next.js', 'React.js', 'Vue 3', 'Angular', 'TypeScript', 'Tailwind'].map((s) => (
                      <span key={s} className="px-2 py-1 bg-slate-50 dark:bg-slate-800/60 rounded-md border border-slate-100 dark:border-slate-700/50 text-slate-600 dark:text-slate-300 font-semibold pill">{s}</span>
                    ))}
                  </div>
                </div>
                <div>
                  <h4 className="font-bold text-slate-800 dark:text-white mb-2 uppercase tracking-wide">Backend</h4>
                  <div className="flex flex-wrap gap-1.5">
                    {['Node.js', 'FastAPI', 'Python', 'PostgreSQL', 'MySQL'].map((s) => (
                      <span key={s} className="px-2 py-1 bg-slate-50 dark:bg-slate-800/60 rounded-md border border-slate-100 dark:border-slate-700/50 text-slate-600 dark:text-slate-300 font-semibold pill">{s}</span>
                    ))}
                  </div>
                </div>
                <div>
                  <h4 className="font-bold text-slate-800 dark:text-white mb-2 uppercase tracking-wide">DevOps & Tools</h4>
                  <div className="flex flex-wrap gap-1.5">
                    {['Docker', 'AWS', 'Vercel', 'Git', 'Firebase'].map((s) => (
                      <span key={s} className="px-2 py-1 bg-slate-50 dark:bg-slate-800/60 rounded-md border border-slate-100 dark:border-slate-700/50 text-slate-600 dark:text-slate-300 font-semibold pill">{s}</span>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            {/* Education */}
            <div className="space-y-3">
              <h2 className="text-lg font-bold font-outfit uppercase tracking-wider text-slate-800 dark:text-slate-200 border-b border-slate-100 dark:border-slate-800 pb-1.5 flex items-center gap-2">
                <GraduationCap size={18} className="text-brand-500" /> Education
              </h2>
              <div className="flex justify-between items-start flex-wrap gap-2 text-sm">
                <div>
                  <h3 className="font-extrabold text-slate-800 dark:text-white">
                    Bachelor of Science in Computer Science
                  </h3>
                  <p className="text-xs font-semibold text-slate-400 dark:text-slate-500">
                    State Informatics Institute
                  </p>
                </div>
                <span className="text-xs font-mono font-bold text-brand-600 dark:text-brand-400 bg-brand-50 dark:bg-brand-950/40 px-2.5 py-1 rounded-lg border border-brand-100/50 dark:border-brand-900/50 pill">
                  2019 - 2023
                </span>
              </div>
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
}
