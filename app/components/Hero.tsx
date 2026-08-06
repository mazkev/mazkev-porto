'use client';

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { MessageSquare, Cpu, Layers, Server, Database, Cloud, Code, Sparkles, Brain } from 'lucide-react';
import ResumeViewer from './ResumeViewer';
import CoverLetterViewer from './CoverLetterViewer';
import Image from 'next/image';
import { cn } from '@/app/lib/utils';

interface SkillItem {
  name: string;
  icon: string;
  category: 'frontend' | 'backend' | 'devops';
}

const skills: SkillItem[] = [
  { name: 'Next.js', icon: 'https://cdn.simpleicons.org/nextdotjs', category: 'frontend' },
  { name: 'React', icon: 'https://cdn.simpleicons.org/react', category: 'frontend' },
  { name: 'TypeScript', icon: 'https://cdn.simpleicons.org/typescript', category: 'frontend' },
  { name: 'Tailwind CSS', icon: 'https://cdn.simpleicons.org/tailwindcss', category: 'frontend' },
  { name: 'Vue', icon: 'https://cdn.simpleicons.org/vuedotjs', category: 'frontend' },
  { name: 'Angular', icon: 'https://cdn.simpleicons.org/angular', category: 'frontend' },
  { name: 'Java Spring Boot', icon: 'https://cdn.simpleicons.org/springboot', category: 'backend' },
  { name: 'Golang', icon: 'https://cdn.simpleicons.org/go', category: 'backend' },
  { name: 'Express.js', icon: 'https://cdn.simpleicons.org/express', category: 'backend' },
  { name: 'PostgreSQL', icon: 'https://cdn.simpleicons.org/postgresql', category: 'backend' },
  { name: 'MongoDB', icon: 'https://cdn.simpleicons.org/mongodb', category: 'backend' },
  { name: 'FastAPI', icon: 'https://cdn.simpleicons.org/fastapi', category: 'backend' },
  { name: 'Docker', icon: 'https://cdn.simpleicons.org/docker', category: 'devops' },
  { name: 'Git', icon: 'https://cdn.simpleicons.org/git', category: 'devops' },
  { name: 'Vercel', icon: 'https://cdn.simpleicons.org/vercel', category: 'devops' },
  { name: 'Firebase', icon: 'https://cdn.simpleicons.org/firebase', category: 'devops' },
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
      <div className="container-max grid lg:grid-cols-2 gap-12 lg:gap-16 items-center px-6 relative z-10 no-print">
        
        {/* Left Column: Bio & Intro */}
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
            Hi, I&apos;m Kevin. I&apos;m a Fullstack Engineer specializing in React, Next.js, Java Spring Boot, Golang, Express.js, and PostgreSQL. I focus on writing clean code and shipping fast, reliable products.
          </p>
          
          <div className="flex flex-col sm:flex-row flex-wrap gap-3">
            <a 
              href="#projects" 
              className="w-full sm:w-auto justify-center bg-slate-900 dark:bg-slate-800 text-white px-7 py-4 rounded-2xl font-black uppercase tracking-widest text-[10px] shadow-2xl hover:scale-105 transition-transform flex items-center gap-2"
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
              className="w-full sm:w-auto justify-center bg-emerald-600 text-white px-7 py-4 rounded-2xl font-black uppercase tracking-widest text-[10px] hover:bg-emerald-500 transition-all cursor-pointer shadow-lg shadow-emerald-600/20"
            >
              Surat Lamaran
            </button>
          </div>
        </motion.div>

        {/* Right Column: Technologies I Use Card */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
          className="tilt-card"
        >
          <div 
            className="tilt-inner p-6 sm:p-8 rounded-[32px] glass border border-slate-200/80 dark:border-slate-800/80 shadow-2xl bg-white/70 dark:bg-slate-950/70 backdrop-blur-xl"
            onMouseMove={(e) => {
              const card = e.currentTarget;
              const rect = card.getBoundingClientRect();
              const rx = ((e.clientY - rect.top) / rect.height - 0.5) * 12;
              const ry = ((e.clientX - rect.left) / rect.width - 0.5) * -12;
              card.style.transform = `rotateX(${rx}deg) rotateY(${ry}deg) scale3d(1.02, 1.02, 1.02)`;
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.transform = `rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)`;
            }}
          >
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
              <div>
                <h3 className="text-xs font-bold text-primary uppercase tracking-widest flex items-center gap-2 mb-1">
                  <Brain size={16} /> Tech Stack Showcase
                </h3>
                <h2 className="text-2xl font-black tracking-tight font-geist text-slate-900 dark:text-white">
                  Technologies I <span className="text-primary">Use.</span>
                </h2>
              </div>

              {/* Filter Tabs */}
              <div className="flex flex-wrap gap-1 p-1 bg-slate-100 dark:bg-slate-900/80 rounded-xl border border-slate-200 dark:border-slate-800">
                {(['all', 'frontend', 'backend', 'devops'] as const).map((tab) => (
                  <button
                    key={tab}
                    onClick={() => setActiveTab(tab)}
                    className={cn(
                      "px-3 py-1.5 text-[10px] font-bold uppercase tracking-wider rounded-lg transition-all duration-300 cursor-pointer",
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

            {/* Grid of Tech Stack Icons */}
            <motion.div 
              layout 
              className="grid grid-cols-2 sm:grid-cols-4 gap-3 max-h-[360px] overflow-y-auto pr-1"
            >
              <AnimatePresence mode="popLayout">
                {filteredSkills.map((skill) => (
                  <motion.div
                    layout
                    initial={{ scale: 0.8, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    exit={{ scale: 0.8, opacity: 0 }}
                    transition={{ duration: 0.3 }}
                    key={skill.name}
                    className="p-3 rounded-2xl glass border border-slate-200/60 dark:border-slate-800/60 hover:border-primary/50 transition-all flex flex-col items-center justify-center gap-2 group cursor-pointer hover:bg-primary/5"
                  >
                    <div className="w-8 h-8 relative flex items-center justify-center group-hover:scale-110 transition-transform">
                      {/* Using SimpleIcons via img */}
                      <img 
                        src={skill.icon} 
                        alt={skill.name} 
                        className="w-6 h-6 object-contain dark:invert-0 dark:brightness-100"
                        onError={(e) => {
                          (e.target as HTMLElement).style.display = 'none';
                        }}
                      />
                    </div>
                    <span className="text-[11px] font-bold font-geist text-slate-800 dark:text-slate-200 group-hover:text-primary transition-colors text-center">
                      {skill.name}
                    </span>
                  </motion.div>
                ))}
              </AnimatePresence>
            </motion.div>
          </div>
        </motion.div>
      </div>

      <ResumeViewer isOpen={isResumeOpen} onClose={() => setIsResumeOpen(false)} />
      <CoverLetterViewer isOpen={isCoverLetterOpen} onClose={() => setIsCoverLetterOpen(false)} />
    </section>
  );
}
