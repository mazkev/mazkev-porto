'use client';

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { MessageSquare, Cpu, Layers, Server, Database, Cloud, Code, Sparkles, Brain, Wrench, Terminal, Zap } from 'lucide-react';
import ResumeViewer from './ResumeViewer';
import CoverLetterViewer from './CoverLetterViewer';
import { cn } from '@/app/lib/utils';

interface SkillItem {
  name: string;
  category: 'frontend' | 'backend' | 'devops';
  tag: string;
  icon: React.ComponentType<{ size?: number; className?: string }>;
  color: string;
}

const skills: SkillItem[] = [
  { name: 'Next.js 16', category: 'frontend', tag: 'Framework', icon: Layers, color: 'text-slate-100 bg-slate-800/80 border-slate-700' },
  { name: 'React 19', category: 'frontend', tag: 'UI Library', icon: Cpu, color: 'text-sky-400 bg-sky-500/10 border-sky-500/20' },
  { name: 'TypeScript', category: 'frontend', tag: 'Language', icon: Code, color: 'text-blue-400 bg-blue-500/10 border-blue-500/20' },
  { name: 'Tailwind CSS', category: 'frontend', tag: 'Styling', icon: Sparkles, color: 'text-teal-400 bg-teal-500/10 border-teal-500/20' },
  { name: 'Vue.js 3', category: 'frontend', tag: 'Framework', icon: Cpu, color: 'text-emerald-400 bg-emerald-500/10 border-emerald-500/20' },
  { name: 'Angular', category: 'frontend', tag: 'Framework', icon: Cpu, color: 'text-red-400 bg-red-500/10 border-red-500/20' },
  
  { name: 'Spring Boot', category: 'backend', tag: 'Java MVC', icon: Server, color: 'text-emerald-500 bg-emerald-500/10 border-emerald-500/20' },
  { name: 'Golang', category: 'backend', tag: 'Go Microservice', icon: Server, color: 'text-cyan-400 bg-cyan-500/10 border-cyan-500/20' },
  { name: 'Express.js', category: 'backend', tag: 'Node Runtime', icon: Server, color: 'text-green-400 bg-green-500/10 border-green-500/20' },
  { name: 'PostgreSQL', category: 'backend', tag: 'SQL DB', icon: Database, color: 'text-blue-500 bg-blue-500/10 border-blue-500/20' },
  { name: 'MongoDB', category: 'backend', tag: 'NoSQL DB', icon: Database, color: 'text-emerald-400 bg-emerald-500/10 border-emerald-500/20' },
  { name: 'FastAPI', category: 'backend', tag: 'Python REST', icon: Server, color: 'text-teal-400 bg-teal-500/10 border-teal-500/20' },
  
  { name: 'Docker', category: 'devops', tag: 'Containers', icon: Wrench, color: 'text-sky-500 bg-sky-500/10 border-sky-500/20' },
  { name: 'Git & GitHub', category: 'devops', tag: 'VCS', icon: Terminal, color: 'text-orange-400 bg-orange-500/10 border-orange-500/20' },
  { name: 'Vercel Edge', category: 'devops', tag: 'Deployment', icon: Cloud, color: 'text-slate-300 bg-slate-800/80 border-slate-700' },
  { name: 'Firebase', category: 'devops', tag: 'Cloud NoSQL', icon: Zap, color: 'text-amber-400 bg-amber-500/10 border-amber-500/20' },
];

export default function Hero() {
  const [isResumeOpen, setIsResumeOpen] = useState(false);
  const [isCoverLetterOpen, setIsCoverLetterOpen] = useState(false);
  const [activeTab, setActiveTab] = useState<'all' | 'frontend' | 'backend' | 'devops'>('all');

  useEffect(() => {
    const handleOpenResume = () => setIsResumeOpen(true);
    const handleOpenLetter = () => setIsCoverLetterOpen(true);
    window.addEventListener('open-resume', handleOpenResume);
    window.addEventListener('open-cover-letter', handleOpenLetter);
    return () => {
      window.removeEventListener('open-resume', handleOpenResume);
      window.removeEventListener('open-cover-letter', handleOpenLetter);
    };
  }, []);

  const filteredSkills = activeTab === 'all' 
    ? skills 
    : skills.filter(skill => skill.category === activeTab);

  return (
    <section id="hero" className="min-h-screen flex items-center justify-center pt-20 print:min-h-0 print:p-0 print:block">
      <div className="container-max grid lg:grid-cols-2 gap-10 lg:gap-14 items-center px-6 relative z-10 no-print">
        
        {/* Left Column: Bio & Intro */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
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
            Hi, I&apos;m Kevin. I&apos;m a Fullstack Engineer specializing in React, Next.js, Java Spring Boot, Golang, Express.js, and PostgreSQL. I focus on writing clean code and shipping fast, reliable products.
          </p>
          
          <div className="flex flex-col sm:flex-row flex-wrap gap-3">
            <a 
              href="#projects" 
              className="w-full sm:w-auto justify-center bg-slate-900 dark:bg-slate-800 text-white px-7 py-4 rounded-2xl font-black uppercase tracking-widest text-[10px] shadow-xl hover:bg-black dark:hover:bg-slate-700 transition-all flex items-center gap-2"
            >
              View Projects <MessageSquare size={14} />
            </a>
            <button 
              onClick={() => setIsResumeOpen(true)}
              className="w-full sm:w-auto justify-center border-2 border-slate-200 dark:border-slate-800 px-7 py-4 rounded-2xl font-black uppercase tracking-widest text-[10px] hover:bg-slate-50 dark:hover:bg-slate-900 transition-all text-slate-700 dark:text-slate-300 cursor-pointer"
            >
              View Resume
            </button>
            <button 
              onClick={() => setIsCoverLetterOpen(true)}
              className="w-full sm:w-auto justify-center bg-emerald-600 text-white px-7 py-4 rounded-2xl font-black uppercase tracking-widest text-[10px] hover:bg-emerald-500 transition-all cursor-pointer shadow-md shadow-emerald-600/20"
            >
              Surat Lamaran
            </button>
          </div>
        </motion.div>

        {/* Right Column: Lightweight Tech Stack Showcase */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
          className="p-6 sm:p-7 rounded-3xl bg-white/80 dark:bg-slate-950/80 border border-slate-200 dark:border-slate-800 shadow-xl backdrop-blur-md"
        >
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-5">
            <div>
              <h3 className="text-[11px] font-bold text-primary uppercase tracking-widest flex items-center gap-1.5 mb-1 font-mono">
                <Brain size={15} /> Tech Stack Overview
              </h3>
              <h2 className="text-xl font-black tracking-tight font-geist text-slate-900 dark:text-white">
                Technologies I <span className="text-primary">Use.</span>
              </h2>
            </div>

            {/* Filter Tabs */}
            <div className="flex flex-wrap gap-1 p-1 bg-slate-100 dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800">
              {(['all', 'frontend', 'backend', 'devops'] as const).map((tab) => (
                <button
                  key={tab}
                  onClick={() => setActiveTab(tab)}
                  className={cn(
                    "px-3 py-1 text-[10px] font-bold uppercase tracking-wider rounded-lg transition-colors cursor-pointer",
                    activeTab === tab 
                      ? "bg-primary text-black shadow-sm font-extrabold" 
                      : "text-slate-500 hover:text-slate-900 dark:hover:text-white"
                  )}
                >
                  {tab}
                </button>
              ))}
            </div>
          </div>

          {/* Grid of Lightweight Skill Badges */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5 max-h-[320px] overflow-y-auto pr-1">
            {filteredSkills.map((skill) => {
              const IconComp = skill.icon;
              return (
                <div
                  key={skill.name}
                  className="p-3 rounded-2xl bg-slate-50 dark:bg-slate-900/60 border border-slate-200/80 dark:border-slate-800/80 hover:border-primary/50 transition-all flex flex-col gap-1.5 group cursor-default"
                >
                  <div className="flex items-center justify-between">
                    <div className={cn("w-7 h-7 rounded-lg flex items-center justify-center border", skill.color)}>
                      <IconComp size={14} />
                    </div>
                    <span className="text-[9px] font-mono text-slate-400 font-semibold uppercase">
                      {skill.tag}
                    </span>
                  </div>
                  <span className="text-xs font-bold font-geist text-slate-800 dark:text-slate-200 group-hover:text-primary transition-colors truncate">
                    {skill.name}
                  </span>
                </div>
              );
            })}
          </div>
        </motion.div>
      </div>

      <ResumeViewer isOpen={isResumeOpen} onClose={() => setIsResumeOpen(false)} />
      <CoverLetterViewer isOpen={isCoverLetterOpen} onClose={() => setIsCoverLetterOpen(false)} />
    </section>
  );
}
