'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, Download, Code, Cpu, Globe } from 'lucide-react';
import { cn } from '@/app/lib/utils';

export default function Hero() {
  return (
    <section className="relative min-h-screen flex items-center justify-center pt-20 overflow-hidden bg-grid">
      {/* Decorative Blur Orbs */}
      <div className="absolute top-1/4 -left-20 w-72 h-72 bg-brand-600/30 rounded-full blur-[128px] animate-pulse" />
      <div className="absolute bottom-1/4 -right-20 w-96 h-96 bg-indigo-600/20 rounded-full blur-[128px] animate-pulse delay-1000" />

      <div className="max-w-7xl mx-auto px-6 grid md:grid-cols-2 gap-12 items-center relative z-10">
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
          
          <h1 className="text-5xl md:text-7xl font-bold font-outfit leading-tight mb-6">
            Crafting <span className="text-gradient">Digital</span> Experiences
          </h1>
          
          <p className="text-lg md:text-xl text-slate-600 dark:text-slate-400 mb-10 max-w-lg leading-relaxed">
            Fullstack Developer specializing in React, Next.js, and Scalable Backend Solutions. I turn complex problems into elegant, high-performance web applications.
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
            
            <motion.a
              href="/cv.pdf"
              target="_blank"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="px-8 py-4 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl font-bold flex items-center gap-2 hover:bg-slate-50 dark:hover:bg-slate-800 transition-all shadow-sm cursor-pointer"
            >
              Download CV <Download size={20} />
            </motion.a>
          </div>

          <div className="flex items-center gap-6 pt-4 border-t border-slate-100 dark:border-slate-800">
            <span className="text-xs font-bold uppercase tracking-widest text-slate-400">Tech Stack |</span>
            <div className="flex gap-4 items-center">
              {['nextdotjs', 'react', 'laravel', 'tailwindcss', 'typescript'].map((icon) => (
                <img 
                  key={icon} 
                  src={`https://cdn.simpleicons.org/${icon}`} 
                  alt={icon} 
                  className="h-5 w-5 opacity-40 hover:opacity-100 transition-opacity grayscale hover:grayscale-0" 
                />
              ))}
            </div>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.8, rotate: 5 }}
          animate={{ opacity: 1, scale: 1, rotate: 0 }}
          transition={{ duration: 1, delay: 0.2 }}
          className="relative hidden md:block"
        >
          {/* Glass Card Interface Mockup */}
          <div className="glass p-8 rounded-3xl shadow-2xl relative overflow-hidden group">
            <div className="flex items-center gap-2 mb-6">
              <div className="w-3 h-3 rounded-full bg-red-500" />
              <div className="w-3 h-3 rounded-full bg-amber-500" />
              <div className="w-3 h-3 rounded-full bg-emerald-500" />
            </div>
            
            <div className="space-y-4">
              <div className="flex items-center gap-4 p-4 rounded-xl bg-slate-50 dark:bg-slate-800/50 border border-slate-100 dark:border-slate-700/50">
                <div className="w-12 h-12 rounded-lg bg-indigo-500/10 flex items-center justify-center text-indigo-500">
                  <Code size={24} />
                </div>
                <div>
                  <div className="text-sm font-bold">Frontend Architecture</div>
                  <div className="text-xs text-slate-500">React, Next.js, Framer Motion</div>
                </div>
              </div>
              
              <div className="flex items-center gap-4 p-4 rounded-xl bg-slate-50 dark:bg-slate-800/50 border border-slate-100 dark:border-slate-700/50 transform translate-x-4">
                <div className="w-12 h-12 rounded-lg bg-emerald-500/10 flex items-center justify-center text-emerald-500">
                  <Cpu size={24} />
                </div>
                <div>
                  <div className="text-sm font-bold">Backend Mastery</div>
                  <div className="text-xs text-slate-500">Node.js, Laravel, PostgreSQL</div>
                </div>
              </div>
              
              <div className="flex items-center gap-4 p-4 rounded-xl bg-slate-50 dark:bg-slate-800/50 border border-slate-100 dark:border-slate-700/50">
                <div className="w-12 h-12 rounded-lg bg-amber-500/10 flex items-center justify-center text-amber-500">
                  <Globe size={24} />
                </div>
                <div>
                  <div className="text-sm font-bold">Scalable Deployment</div>
                  <div className="text-xs text-slate-500">AWS, Docker, Vercel</div>
                </div>
              </div>
            </div>

            {/* Background elements */}
            <div className="absolute -top-10 -right-10 w-40 h-40 bg-brand-500/10 rounded-full blur-3xl group-hover:bg-brand-500/20 transition-colors" />
          </div>
        </motion.div>
      </div>
    </section>
  );
}
