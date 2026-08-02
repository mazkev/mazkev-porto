'use client';

import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, MessageSquare } from 'lucide-react';
import Terminal from './Terminal';
import ResumeViewer from './ResumeViewer';

export default function Hero() {
  const [isResumeOpen, setIsResumeOpen] = useState(false);

  useEffect(() => {
    const handleOpenResume = () => setIsResumeOpen(true);
    window.addEventListener('open-resume', handleOpenResume);
    return () => window.removeEventListener('open-resume', handleOpenResume);
  }, []);

  return (
    <section id="hero" className="min-h-screen flex items-center justify-center pt-20 print:min-h-0 print:p-0 print:block">
      <div className="container-max grid lg:grid-cols-2 gap-16 items-center px-6 relative z-10 no-print">
        
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="reveal active"
        >
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/10 text-emerald-400 text-[10px] font-bold uppercase tracking-widest mb-6 border border-emerald-500/20">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
            </span>
            Available for freelance projects
          </div>
          <span className="text-primary font-mono text-[10px] font-bold uppercase tracking-[0.4em] mb-4 block">
            Kevin Eka Pratama — Fullstack Engineer
          </span>
          <h1 className="text-3xl sm:text-5xl md:text-7xl font-black tracking-tighter leading-[1.1] mb-8 font-geist">
            Creating seamless<br/>
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-600 to-blue-600 dark:from-emerald-400 dark:to-blue-400">digital experiences.</span>
          </h1>
          <p className="text-base sm:text-lg text-slate-500 dark:text-slate-400 max-w-md mb-10 leading-relaxed font-medium">
            Hi, I&apos;m Kevin. I&apos;m a Fullstack Engineer specializing in React, Next.js, Java Spring Boot, Golang, Express.js, and MongoDB. I focus on writing clean code and shipping fast, reliable products.
          </p>
          
          <div className="flex flex-col sm:flex-row flex-wrap gap-4">
            <a 
              href="#projects" 
              className="w-full sm:w-auto justify-center bg-slate-900 dark:bg-slate-800 text-white px-8 py-4 sm:px-9 sm:py-5 rounded-2xl font-black uppercase tracking-widest text-[10px] shadow-2xl hover:scale-105 transition-transform flex items-center gap-2"
            >
              View Projects <MessageSquare size={14} />
            </a>
            <button 
              onClick={() => setIsResumeOpen(true)}
              className="w-full sm:w-auto justify-center border-2 border-slate-200 dark:border-slate-800 px-8 py-4 sm:px-9 sm:py-5 rounded-2xl font-black uppercase tracking-widest text-[10px] hover:bg-slate-50 dark:hover:bg-slate-900 transition-all text-slate-700 dark:text-slate-300 cursor-pointer"
            >
              View Resume
            </button>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
        >
          <Terminal />
        </motion.div>
      </div>

      <ResumeViewer isOpen={isResumeOpen} onClose={() => setIsResumeOpen(false)} />
    </section>
  );
}
