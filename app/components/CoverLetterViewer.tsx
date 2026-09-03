'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { X, Printer, Download, Mail, Phone, MapPin, Globe, Github, Building, Briefcase } from 'lucide-react';

interface CoverLetterViewerProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function CoverLetterViewer({ isOpen, onClose }: CoverLetterViewerProps) {
  const [lang, setLang] = useState<'id' | 'en'>('id');
  const [companyName, setCompanyName] = useState('PT Innovation Technology');
  const [jobPosition, setJobPosition] = useState('Fullstack Engineer');

  const handlePrint = () => {
    window.print();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex justify-end print:absolute print:inset-auto print:w-full print:h-auto print:block">
      {/* Print-specific style override - ATS Single Page A4 */}
      <style jsx global>{`
        @page {
          size: A4;
          margin: 20mm;
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
          #print-letter-area, #print-letter-area * {
            visibility: visible;
          }
          #print-letter-area {
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
          #print-letter-area * {
            color: black !important;
            border-color: #000000 !important;
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
        className="relative w-full max-w-4xl h-full print:h-auto bg-white text-slate-900 border-l border-slate-300 shadow-2xl flex flex-col z-10 font-sans"
      >
        {/* Top Control Bar */}
        <div className="px-6 py-4 bg-slate-100 dark:bg-slate-900 border-b border-slate-300 dark:border-slate-800 flex items-center justify-between no-print flex-shrink-0 flex-wrap gap-3">
          <div className="flex items-center gap-2 flex-wrap">
            {/* TOGGLE BAHASA */}
            <div className="flex items-center bg-slate-200 dark:bg-slate-800 p-1 rounded-xl border border-slate-400 dark:border-slate-700">
              <button
                onClick={() => setLang('id')}
                className={`px-3 py-1 text-xs font-bold rounded-lg transition-all flex items-center gap-1 cursor-pointer ${
                  lang === 'id'
                    ? 'bg-black text-white dark:bg-white dark:text-black shadow'
                    : 'text-slate-700 dark:text-slate-300 hover:text-black dark:hover:text-white'
                }`}
              >
                🇮🇩 Surat Lamaran
              </button>
              <button
                onClick={() => setLang('en')}
                className={`px-3 py-1 text-xs font-bold rounded-lg transition-all flex items-center gap-1 cursor-pointer ${
                  lang === 'en'
                    ? 'bg-black text-white dark:bg-white dark:text-black shadow'
                    : 'text-slate-700 dark:text-slate-300 hover:text-black dark:hover:text-white'
                }`}
              >
                🇬🇧 Cover Letter
              </button>
            </div>

            <button
              onClick={handlePrint}
              className="px-4 py-2 bg-slate-900 dark:bg-white text-white dark:text-black hover:bg-black text-xs font-bold rounded-xl flex items-center gap-2 transition-all cursor-pointer shadow-md"
            >
              <Printer size={14} /> {lang === 'id' ? 'Cetak / Simpan PDF' : 'Print / Save PDF'}
            </button>
          </div>

          <button
            onClick={onClose}
            aria-label="Close letter"
            className="p-2 text-slate-500 hover:text-black dark:hover:text-white rounded-xl hover:bg-slate-200 dark:hover:bg-slate-800 transition-all cursor-pointer"
          >
            <X size={20} />
          </button>
        </div>

        {/* Live Customization Form (No Print) */}
        <div className="px-6 py-3 bg-slate-50 dark:bg-slate-950 border-b border-slate-200 dark:border-slate-800/80 no-print grid sm:grid-cols-2 gap-3 text-xs">
          <div className="flex items-center gap-2">
            <Building size={14} className="text-slate-500 flex-shrink-0" />
            <input
              type="text"
              value={companyName}
              onChange={(e) => setCompanyName(e.target.value)}
              placeholder="Nama Perusahaan Target..."
              className="w-full px-3 py-1.5 bg-white dark:bg-slate-900 border border-slate-300 dark:border-slate-700 rounded-lg text-slate-900 dark:text-white outline-none focus:border-black font-semibold"
            />
          </div>
          <div className="flex items-center gap-2">
            <Briefcase size={14} className="text-slate-500 flex-shrink-0" />
            <input
              type="text"
              value={jobPosition}
              onChange={(e) => setJobPosition(e.target.value)}
              placeholder="Posisi Pekerjaan Target..."
              className="w-full px-3 py-1.5 bg-white dark:bg-slate-900 border border-slate-300 dark:border-slate-700 rounded-lg text-slate-900 dark:text-white outline-none focus:border-black font-semibold"
            />
          </div>
        </div>

        {/* Document Printable View */}
        <div className="flex-grow overflow-y-auto p-8 md:p-12 bg-white text-slate-900 print:p-0 print:overflow-visible" id="print-letter-area">
          <div className="max-w-3xl mx-auto space-y-6 text-slate-900 text-xs sm:text-sm leading-relaxed font-sans">
            {/* Header Applicant Info */}
            <div className="border-b-2 border-slate-900 pb-4 flex flex-col sm:flex-row justify-between items-start sm:items-end gap-2">
              <div>
                <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 uppercase tracking-tight">
                  Kevin Eka Pratama
                </h1>
                <p className="text-xs font-bold text-slate-700 uppercase tracking-widest pt-0.5">
                  Fullstack Developer
                </p>
              </div>
              <div className="text-left sm:text-right text-xs text-slate-800 space-y-0.5 font-medium">
                <div className="flex items-center sm:justify-end gap-1.5">
                  <Mail size={12} /> kevinekapratama@gmail.com
                </div>
                <div className="flex items-center sm:justify-end gap-1.5">
                  <Phone size={12} /> +62 (813) 2661-2344
                </div>
                <div className="flex items-center sm:justify-end gap-1.5">
                  <Globe size={12} /> mazkev.vercel.app | <Github size={12} /> github.com/mazkev
                </div>
              </div>
            </div>

            {/* Date & Destination */}
            <div className="space-y-3 pt-2">
              <p className="font-semibold text-slate-700">
                {new Date().toLocaleDateString(lang === 'id' ? 'id-ID' : 'en-US', {
                  day: 'numeric',
                  month: 'long',
                  year: 'numeric',
                })}
              </p>

              <div>
                <p className="font-bold text-slate-900">
                  {lang === 'id' ? 'Yth. HRD / Hiring Manager' : 'Dear Hiring Manager,'}
                </p>
                <p className="font-bold text-slate-900 text-base">{companyName}</p>
              </div>
            </div>

            {/* Content Body */}
            {lang === 'id' ? (
              <div className="space-y-4 text-slate-800">
                <p>
                  <strong>Hal: Lamaran Pekerjaan — {jobPosition}</strong>
                </p>

                <p>Dengan hormat,</p>

                <p>
                  Sehubungan dengan informasi lowongan pekerjaan yang saya dapatkan untuk posisi <strong>{jobPosition}</strong> di <strong>{companyName}</strong>, melalui surat ini saya bermaksud untuk mengajukan diri bergabung dengan tim pengembang profesional di perusahaan yang Bapak/Ibu pimpin.
                </p>

                <p>
                  Saya merupakan lulusan Sarjana Ilmu Komputer / Teknologi Informasi dari Universitas AMIKOM dengan pengalaman kerja 2+ tahun di bidang pengembangan perangkat lunak dan operasional sistem. Saat ini saya bertugas di PT PLN Icon+ sebagai <em>Application Support</em>, di mana saya terbiasa menangani alur operasional aplikasi, menganalisis query SQL untuk investigasi database, serta berkoordinasi dengan tim developer untuk pelaporan dan verifikasi bug.
                </p>

                <p>
                  Selain itu, sebagai pengembang web fullstack, saya berpengalaman membangun aplikasi web menggunakan teknologi modern seperti <strong>React.js, Next.js, Golang, Java Spring Boot, Express.js, Node.js, serta PostgreSQL dan MongoDB</strong>.
                </p>

                <div className="pl-4 border-l-2 border-slate-900 space-y-1 my-3 font-medium">
                  <p>• <strong>Pengembangan Fullstack</strong>: Mampu membangun aplikasi web dari antarmuka frontend interaktif hingga layanan REST API backend yang rapi dan terstruktur.</p>
                  <p>• <strong>Troubleshooting & Query SQL</strong>: Terbiasa melakukan analisis bug aplikasi dan investigasi database dalam lingkungan operasional produksi.</p>
                  <p>• <strong>Portofolio & Kode Terverifikasi</strong>: Seluruh proyek dan hasil kodingan saya dapat diakses langsung melalui portofolio digital saya di <strong>https://mazkev.vercel.app</strong> dan GitHub <strong>https://github.com/mazkev</strong>.</p>
                </div>

                <p>
                  Saya meyakini bahwa kombinasi keahlian teknis fullstack, pemahaman operasional sistem, serta kemampuan penanganan masalah teknis yang saya miliki dapat memberikan kontribusi nyata bagi <strong>{companyName}</strong>.
                </p>

                <p>
                  Besar harapan saya untuk diberikan kesempatan wawancara agar dapat menjelaskan lebih mendalam mengenai kualifikasi dan pengalaman saya. Atas perhatian dan kesempatan yang Bapak/Ibu berikan, saya ucapkan terima kasih.
                </p>

                <div className="pt-6">
                  <p>Hormat saya,</p>
                  <p className="font-extrabold text-slate-900 text-base pt-10">Kevin Eka Pratama, S.Kom.</p>
                </div>
              </div>
            ) : (
              <div className="space-y-4 text-slate-800">
                <p>
                  <strong>Subject: Application for {jobPosition} — Kevin Eka Pratama</strong>
                </p>

                <p>
                  I am writing to express my strong interest in the <strong>{jobPosition}</strong> role at <strong>{companyName}</strong>. With over 2 years of hands-on experience in software development and Application Support, coupled with a Bachelor&apos;s Degree in Computer Science / Information Technology from Universitas AMIKOM, I am eager to contribute to your engineering team.
                </p>

                <p>
                  In my current role at PT PLN Icon+ as <em>Application Support</em>, I monitor production application workflows, analyze SQL queries, and perform root-cause debugging across production systems. In addition, I have built fullstack web applications and REST API services utilizing <strong>React, Next.js, Go (Golang), Java Spring Boot, Express.js, PostgreSQL, and MongoDB</strong>.
                </p>

                <div className="pl-4 border-l-2 border-slate-900 space-y-1 my-3 font-medium">
                  <p>• <strong>Fullstack Development</strong>: Experience building responsive frontend user interfaces and structured backend REST APIs.</p>
                  <p>• <strong>Operational Support & SQL Analysis</strong>: Practical background in analyzing SQL queries and investigating production software issues.</p>
                  <p>• <strong>Verified Portfolio & Repositories</strong>: Live interactive demonstrations of my work and source code are available at <strong>https://mazkev.vercel.app</strong> and <strong>https://github.com/mazkev</strong>.</p>
                </div>

                <p>
                  I admire <strong>{companyName}</strong>&apos;s work and would welcome the opportunity to discuss how my technical skills and practical mindset align with your engineering goals.
                </p>

                <p>
                  Thank you for your time and consideration. I look forward to hearing from you soon.
                </p>

                <div className="pt-6">
                  <p>Sincerely,</p>
                  <p className="font-extrabold text-slate-900 text-base pt-10">Kevin Eka Pratama</p>
                </div>
              </div>
            )}
          </div>
        </div>
      </motion.div>
    </div>
  );
}
