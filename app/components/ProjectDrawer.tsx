'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { X, ExternalLink, Github, Layers, Terminal, Sparkles, AlertCircle, Database, ShieldCheck, Cpu, CheckCircle2 } from 'lucide-react';
import Image from 'next/image';

import { caseStudyMap, type ProjectData } from '../lib/data/projects';

interface ProjectDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  project: ProjectData | null;
}

export default function ProjectDrawer({ isOpen, onClose, project }: ProjectDrawerProps) {
  if (!isOpen || !project) return null;

  const study = caseStudyMap[project.title] || {
    challenge: 'Designing a maintainable frontend component architecture and optimizing page speed.',
    solution: 'Utilized Next.js components combined with Tailwind utility styles to ensure modularity and clean performance metrics.',
    contributions: ['Built reusable page sections.', 'Configured theme overrides.', 'Tested layout views.'],
    codeSnippet: `// Default utility component definition
export default function Component({ name }) {
  return <div className="p-4 bg-slate-100">{name}</div>;
}`,
    codeLang: 'typescript',
  };

  return (
    <div className="fixed inset-0 z-50 flex justify-end">
      {/* Backdrop */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={onClose}
        className="absolute inset-0 bg-black/60 backdrop-blur-sm"
      />

      {/* Drawer */}
      <motion.div
        initial={{ x: '100%' }}
        animate={{ x: 0 }}
        exit={{ x: '100%' }}
        transition={{ type: 'spring', damping: 25, stiffness: 200 }}
        className="relative w-full max-w-3xl h-full bg-white dark:bg-slate-900 border-l border-slate-200 dark:border-slate-800 shadow-2xl flex flex-col z-10"
      >
        {/* Header Actions */}
        <div className="px-4 sm:px-6 py-4 bg-slate-50 dark:bg-slate-950/40 border-b border-slate-200 dark:border-slate-800/80 flex items-center justify-between flex-shrink-0">
          <div className="flex items-center gap-1.5 sm:gap-2">
            <a
              href={project.live}
              target="_blank"
              rel="noopener noreferrer"
              className="px-3 py-1.5 sm:px-4 sm:py-2 bg-brand-600 hover:bg-brand-700 text-white text-[10px] sm:text-xs font-bold rounded-xl flex items-center gap-1.5 sm:gap-2 transition-all cursor-pointer shadow-md shadow-brand-600/10"
            >
              <ExternalLink size={14} /> Visit Site
            </a>
            {project.github !== '#' && (
              <a
                href={project.github}
                target="_blank"
                rel="noopener noreferrer"
                className="px-3 py-1.5 sm:px-4 sm:py-2 bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-300 text-[10px] sm:text-xs font-bold rounded-xl flex items-center gap-1.5 sm:gap-2 transition-all cursor-pointer border border-slate-200/40 dark:border-slate-700/60"
              >
                <Github size={14} /> View Code
              </a>
            )}
          </div>

          <button
            onClick={onClose}
            className="p-2 text-slate-400 hover:text-slate-600 dark:hover:text-white rounded-xl hover:bg-slate-100 dark:hover:bg-slate-800 transition-all cursor-pointer"
          >
            <X size={20} />
          </button>
        </div>

        {/* Content Body */}
        <div className="flex-grow overflow-y-auto p-5 sm:p-8 md:p-12 space-y-8 sm:space-y-10">
          {/* Cover & Title */}
          <div className="space-y-4">
            <div className="h-48 sm:h-64 rounded-3xl overflow-hidden border border-slate-100 dark:border-slate-800/60 shadow-md">
              <Image 
                src={project.image} 
                alt={project.title} 
                width={800}
                height={400}
                className="w-full h-full object-cover" 
              />
            </div>
            <div className="flex flex-wrap gap-2 pt-2 items-center">
              <span className="px-3 py-1 bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 text-xs font-bold rounded-xl border border-emerald-500/20 uppercase tracking-wider font-mono">
                {project.category}
              </span>
              {project.tech.map((t) => (
                <span
                  key={t}
                  className="px-3 py-1 bg-brand-50 dark:bg-brand-950/40 text-brand-600 dark:text-brand-400 text-xs font-bold rounded-xl border border-brand-100/50 dark:border-brand-900/50"
                >
                  {t}
                </span>
              ))}
            </div>
            <h1 className="text-3xl font-extrabold font-outfit text-slate-900 dark:text-white mt-2">
              {project.title}
            </h1>
            <p className="text-slate-600 dark:text-slate-400 leading-relaxed text-base">
              {project.description}
            </p>
          </div>

          {/* Architecture Flow / System Pipeline */}
          {study.architectureFlow && (
            <div className="space-y-3 p-5 sm:p-6 rounded-3xl bg-slate-900 text-slate-100 border border-slate-800 shadow-xl font-mono">
              <div className="flex items-center justify-between text-xs text-primary font-bold uppercase tracking-wider">
                <span className="flex items-center gap-2">
                  <Terminal size={15} /> System Architecture Flow
                </span>
                <span className="text-[10px] text-slate-400 font-normal">Layered Pipeline</span>
              </div>
              <div className="p-3.5 rounded-2xl bg-black/60 border border-slate-800/80 text-xs text-emerald-400 font-bold leading-relaxed overflow-x-auto whitespace-pre-wrap sm:whitespace-normal">
                {study.architectureFlow}
              </div>
            </div>
          )}

          {/* Quick Technical Specs Grid */}
          {study.specs && (
            <div className="space-y-3">
              <div className="flex items-center justify-between text-xs font-bold font-mono uppercase tracking-wider text-slate-500">
                <span className="flex items-center gap-1.5 text-slate-900 dark:text-white">
                  <Cpu size={14} className="text-primary" /> Engineering Specifications
                </span>
                <span className="text-[10px] text-slate-400">Key Parameters</span>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div className="p-3.5 rounded-2xl bg-slate-50 dark:bg-slate-950/40 border border-slate-200/80 dark:border-slate-800/80 space-y-1">
                  <div className="flex items-center gap-1.5 text-[10px] font-mono font-bold uppercase tracking-wider text-slate-400">
                    <Layers size={13} className="text-primary" /> Architecture
                  </div>
                  <div className="text-xs font-bold font-geist text-slate-900 dark:text-white">
                    {study.specs.architecture}
                  </div>
                </div>

                <div className="p-3.5 rounded-2xl bg-slate-50 dark:bg-slate-950/40 border border-slate-200/80 dark:border-slate-800/80 space-y-1">
                  <div className="flex items-center gap-1.5 text-[10px] font-mono font-bold uppercase tracking-wider text-slate-400">
                    <Database size={13} className="text-sky-400" /> Database & Storage
                  </div>
                  <div className="text-xs font-bold font-geist text-slate-900 dark:text-white">
                    {study.specs.database}
                  </div>
                </div>

                <div className="p-3.5 rounded-2xl bg-slate-50 dark:bg-slate-950/40 border border-slate-200/80 dark:border-slate-800/80 space-y-1">
                  <div className="flex items-center gap-1.5 text-[10px] font-mono font-bold uppercase tracking-wider text-slate-400">
                    <ShieldCheck size={13} className="text-emerald-400" /> Security & Auth
                  </div>
                  <div className="text-xs font-bold font-geist text-slate-900 dark:text-white">
                    {study.specs.auth}
                  </div>
                </div>

                <div className="p-3.5 rounded-2xl bg-slate-50 dark:bg-slate-950/40 border border-slate-200/80 dark:border-slate-800/80 space-y-1">
                  <div className="flex items-center gap-1.5 text-[10px] font-mono font-bold uppercase tracking-wider text-slate-400">
                    <Cpu size={13} className="text-amber-400" /> Quality & Testing
                  </div>
                  <div className="text-xs font-bold font-geist text-slate-900 dark:text-white">
                    {study.specs.devopsOrTesting || 'Containerized & Production Ready'}
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Key Features & Capabilities Checklist */}
          {study.features && study.features.length > 0 && (
            <div className="space-y-3 p-5 sm:p-6 rounded-3xl bg-slate-50 dark:bg-slate-950/40 border border-slate-200/80 dark:border-slate-800/80">
              <div className="flex items-center justify-between text-xs font-bold font-mono uppercase tracking-wider text-slate-500 mb-1">
                <span className="flex items-center gap-2 text-slate-900 dark:text-white">
                  <CheckCircle2 size={15} className="text-emerald-500" /> Key Features & Capabilities
                </span>
                <span className="text-[10px] text-emerald-500 font-bold bg-emerald-500/10 px-2.5 py-0.5 rounded-full border border-emerald-500/20">
                  {study.features.length} Features
                </span>
              </div>
              <div className="grid grid-cols-1 gap-2 pt-1">
                {study.features.map((feature, i) => (
                  <div key={i} className="flex items-start gap-2.5 text-xs text-slate-700 dark:text-slate-300 leading-relaxed font-medium">
                    <span className="text-emerald-500 flex-shrink-0 font-bold">✓</span>
                    <span>{feature}</span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Technical Challenge */}
          <div className="space-y-3 p-6 rounded-3xl bg-slate-50 dark:bg-slate-950/40 border border-slate-100 dark:border-slate-800/60">
            <h2 className="text-sm font-bold font-outfit uppercase tracking-wider text-slate-800 dark:text-slate-200 flex items-center gap-2">
              <AlertCircle size={16} className="text-amber-500" /> The Challenge
            </h2>
            <p className="text-slate-600 dark:text-slate-400 text-sm leading-relaxed">
              {study.challenge}
            </p>
          </div>

          {/* Technical Solution */}
          <div className="space-y-3 p-6 rounded-3xl bg-brand-50/30 dark:bg-brand-950/10 border border-brand-100/30 dark:border-brand-900/10">
            <h2 className="text-sm font-bold font-outfit uppercase tracking-wider text-slate-800 dark:text-slate-200 flex items-center gap-2">
              <Sparkles size={16} className="text-brand-500" /> The Engineering Solution
            </h2>
            <p className="text-slate-600 dark:text-slate-400 text-sm leading-relaxed">
              {study.solution}
            </p>
          </div>

          {/* Contributions */}
          <div className="space-y-4">
            <h2 className="text-sm font-bold font-outfit uppercase tracking-wider text-slate-800 dark:text-slate-200 border-b border-slate-100 dark:border-slate-800 pb-1.5 flex items-center gap-2">
              <Layers size={16} className="text-brand-500" /> Key Contributions
            </h2>
            <ul className="list-disc pl-5 text-slate-600 dark:text-slate-400 text-sm leading-relaxed space-y-2">
              {study.contributions.map((c, i) => (
                <li key={i}>{c}</li>
              ))}
            </ul>
          </div>
        </div>
      </motion.div>
    </div>
  );
}
