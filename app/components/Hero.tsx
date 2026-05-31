'use client';

import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, Download, Code, Star, CheckCircle } from 'lucide-react';
import { cn } from '@/app/lib/utils';
import Image from 'next/image';
import ResumeViewer from './ResumeViewer';

function ProfileCard() {
  return (
    <div className="glass bg-white/50 dark:bg-slate-900/50 p-8 rounded-[2.5rem] shadow-2xl border border-slate-200/60 dark:border-slate-800/60 relative overflow-hidden">
      {/* Subtle backdrop gradient instead of neon glow */}
      <div className="absolute top-0 right-0 w-64 h-64 bg-brand-500/5 rounded-full blur-3xl" />
      
      <div className="relative z-10 flex flex-col items-center text-center">
        <div className="w-24 h-24 rounded-full border-4 border-white dark:border-slate-800 overflow-hidden mb-6 shadow-lg bg-slate-100 dark:bg-slate-900">
          <Image
            src="/profile/avatar-nobeard.png"
            alt="Kevin Eka Pratama"
            width={96}
            height={96}
            className="w-full h-full object-cover"
          />
        </div>
        
        <h3 className="text-2xl font-bold font-outfit text-slate-800 dark:text-white mb-2">
          Kevin Eka Pratama
        </h3>
        <p className="text-sm font-semibold text-brand-600 dark:text-brand-400 mb-6 uppercase tracking-wider">
          Front end Engineer
        </p>

        <div className="w-full grid grid-cols-2 gap-4">
          <div className="bg-white/60 dark:bg-slate-950/60 p-4 rounded-2xl border border-slate-100 dark:border-slate-800 flex flex-col items-center transition-transform hover:scale-105 cursor-default">
            <Code className="text-brand-500 mb-2" size={24} />
            <span className="text-xl font-bold text-slate-800 dark:text-white">10+</span>
            <span className="text-[10px] text-slate-500 font-bold uppercase tracking-widest mt-1">Projects</span>
          </div>
          <div className="bg-white/60 dark:bg-slate-950/60 p-4 rounded-2xl border border-slate-100 dark:border-slate-800 flex flex-col items-center transition-transform hover:scale-105 cursor-default">
            <Star className="text-amber-500 mb-2" size={24} />
            <span className="text-xl font-bold text-slate-800 dark:text-white">3+</span>
            <span className="text-[10px] text-slate-500 font-bold uppercase tracking-widest mt-1">Years Exp</span>
          </div>
        </div>
        
        <div className="w-full mt-6 flex items-center justify-center gap-3 bg-white/60 dark:bg-slate-950/60 py-3 px-4 rounded-xl border border-slate-100 dark:border-slate-800">
          <CheckCircle className="text-emerald-500" size={16} />
          <span className="text-xs font-bold text-slate-600 dark:text-slate-300">Clean code & architecture</span>
        </div>
      </div>
    </div>
  );
}

export default function Hero() {
  const [isResumeOpen, setIsResumeOpen] = useState(false);

  useEffect(() => {
    const handleOpenResume = () => setIsResumeOpen(true);
    window.addEventListener('open-resume', handleOpenResume);
    return () => window.removeEventListener('open-resume', handleOpenResume);
  }, []);

  return (
    <section className="relative min-h-screen flex items-center justify-center pt-20 overflow-hidden bg-grid">
      {/* Removed Interactive Mesh & Blur Orbs for cleaner design */}

      <div className="max-w-7xl mx-auto px-6 grid md:grid-cols-2 gap-12 items-center relative z-10 no-print">
        <motion.div
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8 }}
        >
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-brand-100 dark:bg-brand-900/30 text-brand-600 dark:text-brand-400 text-sm font-semibold mb-6 border border-brand-200 dark:border-brand-800">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-brand-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-brand-500"></span>
            </span>
            Available for new projects
          </div>
          
          <h1 className="text-4xl sm:text-5xl md:text-7xl font-bold font-outfit leading-tight mb-6">
            Building web apps that <span className="text-gradient">just work.</span>
          </h1>
          
          <p className="text-lg md:text-xl text-slate-600 dark:text-slate-400 mb-10 max-w-lg leading-relaxed">
            Hi, I'm Kevin. I'm a Front end Engineer specializing in React, Next.js, and Laravel. I focus on writing clean code and shipping fast, reliable products.
          </p>
          
          <div className="flex flex-wrap gap-4 mb-10">
            <motion.a
              href="#projects"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="px-8 py-4 bg-brand-600 text-white rounded-2xl font-bold flex items-center gap-2 shadow-lg shadow-brand-600/20 hover:bg-brand-700 transition-all cursor-pointer"
            >
              View Projects <ArrowRight size={20} />
            </motion.a>
            
            <motion.button
              onClick={() => setIsResumeOpen(true)}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="px-8 py-4 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl font-bold flex items-center gap-2 hover:bg-slate-50 dark:hover:bg-slate-800 transition-all shadow-sm cursor-pointer text-slate-800 dark:text-slate-200"
            >
              View Resume <Download size={20} />
            </motion.button>
          </div>

          <div className="flex items-center gap-6 pt-4 border-t border-slate-100 dark:border-slate-800">
            <span className="text-xs font-bold uppercase tracking-widest text-slate-400">Tech Stack |</span>
            <div className="flex gap-4 items-center">
              {['nextdotjs', 'react', 'laravel', 'tailwindcss', 'typescript'].map((icon) => (
                <Image 
                  key={icon} 
                  src={`https://cdn.simpleicons.org/${icon}`} 
                  alt={icon} 
                  width={20}
                  height={20}
                  priority
                  unoptimized
                  className="h-5 w-5 opacity-40 hover:opacity-100 transition-opacity grayscale hover:grayscale-0" 
                />
              ))}
            </div>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.9, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="relative hidden md:block"
        >
          <ProfileCard />
        </motion.div>
      </div>

      <ResumeViewer isOpen={isResumeOpen} onClose={() => setIsResumeOpen(false)} />
    </section>
  );
}
