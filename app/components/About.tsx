'use client';

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { User, Brain, Briefcase, Code, GraduationCap, Sparkles } from 'lucide-react';
import { cn } from '@/app/lib/utils';
import Image from 'next/image';

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
  { name: 'Laravel', icon: 'https://cdn.simpleicons.org/laravel', category: 'backend' },
  { name: 'PHP', icon: 'https://cdn.simpleicons.org/php', category: 'backend' },
  { name: 'Python', icon: 'https://cdn.simpleicons.org/python', category: 'backend' },
  { name: 'PostgreSQL', icon: 'https://cdn.simpleicons.org/postgresql', category: 'backend' },
  { name: 'MySQL', icon: 'https://cdn.simpleicons.org/mysql', category: 'backend' },
  { name: 'Docker', icon: 'https://cdn.simpleicons.org/docker', category: 'devops' },
  { name: 'AWS', icon: '/aws.svg', category: 'devops' },
  { name: 'Git', icon: 'https://cdn.simpleicons.org/git', category: 'devops' },
  { name: 'Vercel', icon: 'https://cdn.simpleicons.org/vercel', category: 'devops' },
  { name: 'Firebase', icon: 'https://cdn.simpleicons.org/firebase', category: 'devops' },
];

const timelineData = [
  {
    date: '2025 - Present',
    role: 'Junior Technical Support Grade 1',
    company: 'PT PLN Icon+',
    description: 'Providing advanced system operations support, troubleshooting enterprise network architectures, and maintaining internal database systems.',
    icon: Briefcase,
  },
  {
    date: '2023 - 2025',
    role: 'Freelance Fullstack Developer',
    company: 'Digital Solutions Lab',
    description: 'Designed and deployed high-performance web applications using React, Next.js, and Laravel. Specialized in customized database optimization and serverless configurations.',
    icon: Code,
  },
  {
    date: '2021 - 2023',
    role: 'Academic & Open Source Contributor',
    company: 'Informatics Studies',
    description: 'Studied core computer science foundations, built responsive portfolio works, and contributed to open-source UI libraries.',
    icon: GraduationCap,
  },
];

export default function About() {
  const [activeTab, setActiveTab] = useState<'all' | 'frontend' | 'backend' | 'devops'>('all');
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    const handle = requestAnimationFrame(() => {
      setMounted(true);
    });
    return () => cancelAnimationFrame(handle);
  }, []);

  const filteredSkills = activeTab === 'all' 
    ? skills 
    : skills.filter(skill => skill.category === activeTab);

  if (!mounted) return null;

  return (
    <section id="about" className="py-24 px-6 relative bg-white dark:bg-slate-950 no-print">
      {/* Narrative Bio & Profile Card */}
      <div className="max-w-7xl mx-auto grid md:grid-cols-2 gap-16 items-center mb-28">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="relative group"
        >
          <div className="relative rounded-[2.5rem] overflow-hidden aspect-square shadow-2xl">
            <Image
              src="/profile/avatar-nobeard.png"
              alt="Profile"
              width={500}
              height={500}
              priority
              className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-700"
            />
            <div className="absolute inset-0 bg-brand-600/20 group-hover:bg-transparent transition-colors duration-700" />
          </div>
          
          {/* Floating stats */}
          <div className="absolute -bottom-6 -right-6 glass p-6 rounded-3xl shadow-xl animate-float">
            <div className="text-3xl font-bold text-brand-600">3+</div>
            <div className="text-xs font-bold uppercase tracking-widest text-slate-500">Years Exp</div>
          </div>
          
          <div className="absolute -top-6 -left-6 glass p-6 rounded-3xl shadow-xl animate-float delay-700">
            <div className="text-3xl font-bold text-sky-500">10+</div>
            <div className="text-xs font-bold uppercase tracking-widest text-slate-500">Projects</div>
          </div>
        </motion.div>

        <div>
          <h2 className="text-sm font-bold text-brand-600 dark:text-brand-400 uppercase tracking-widest mb-2 flex items-center gap-2">
            <User size={18} /> Background
          </h2>
          <h3 className="text-4xl md:text-5xl font-bold font-outfit mb-8">How I got <span className="text-gradient">here</span></h3>
          
          <div className="space-y-6 text-slate-600 dark:text-slate-400 text-lg leading-relaxed max-w-xl">
            <p>
              I&apos;m a versatile Fullstack Engineer with over 3 years of experience building both high-fidelity consumer applications and robust enterprise systems. My expertise spans across modern frontend frameworks like Next.js, Vue 3, and Angular, paired with scalable backend solutions using PostgreSQL, Firebase, and FastAPI.
            </p>
            <p>
              From engineering real-time WebSocket pipelines capable of broadcasting to thousands of users, to managing complex browser state for infinite canvas editors, I thrive on solving hard technical challenges without sacrificing premium UI/UX aesthetics. Currently, I bring this systematic approach to my role in Technical Support at PT PLN Icon+, where I maintain enterprise network architectures and database systems.
            </p>
          </div>
        </div>
      </div>

      {/* Skills Grid & SVG Radar Chart Section */}
      <div className="max-w-7xl mx-auto mb-28">
        <div className="mb-12">
          <h2 className="text-sm font-bold text-brand-600 dark:text-brand-400 uppercase tracking-widest mb-2 flex items-center gap-2">
            <Brain size={18} /> Skills
          </h2>
          <h3 className="text-3xl md:text-4xl font-bold font-outfit">Technologies I <span className="text-gradient">Use</span></h3>
        </div>

        <div className="w-full space-y-8">
          {/* Filter Tabs */}
          <div className="flex flex-wrap gap-2 p-1 bg-slate-50 dark:bg-slate-900/60 rounded-2xl border border-slate-100 dark:border-slate-800/80 max-w-max">
            {(['all', 'frontend', 'backend', 'devops'] as const).map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={cn(
                  "px-4 py-2 text-xs font-bold uppercase tracking-wider rounded-xl transition-all duration-300 cursor-pointer",
                  activeTab === tab 
                    ? "bg-brand-600 text-white shadow-md shadow-brand-600/10" 
                    : "text-slate-500 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white"
                )}
              >
                {tab}
              </button>
            ))}
          </div>

          {/* Grid display with Framer Motion layout animations */}
          <motion.div 
            layout 
            className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4"
          >
            <AnimatePresence mode="popLayout">
              {filteredSkills.map((skill) => (
                <motion.div
                  layout
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  transition={{ duration: 0.2 }}
                  key={skill.name}
                  whileHover={{ scale: 1.05, y: -2 }}
                  className="flex items-center gap-3 p-4 rounded-2xl bg-white dark:bg-slate-900 border border-slate-100 dark:border-slate-800 shadow-sm hover:shadow-md transition-all group cursor-default"
                >
                  <div className="w-8 h-8 flex items-center justify-center flex-shrink-0">
                    <Image 
                      src={skill.icon} 
                      alt={skill.name} 
                      width={28}
                      height={28}
                      unoptimized
                      className="w-7 h-7 grayscale group-hover:grayscale-0 group-hover:scale-110 transition-all duration-300" 
                    />
                  </div>
                  <span className="text-xs font-bold text-slate-700 dark:text-slate-300 group-hover:text-brand-600 transition-colors truncate">
                    {skill.name}
                  </span>
                </motion.div>
              ))}
            </AnimatePresence>
          </motion.div>
        </div>
      </div>

      {/* Career Timeline Section */}
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-sm font-bold text-brand-600 dark:text-brand-400 uppercase tracking-widest mb-2 flex items-center justify-center gap-2">
            <Sparkles size={18} /> Timeline
          </h2>
          <h3 className="text-3xl md:text-4xl font-bold font-outfit">Work <span className="text-gradient">Experience</span></h3>
        </div>

        {/* Timeline body */}
        <div className="relative border-l-2 border-slate-100 dark:border-slate-800 ml-4 md:ml-32 space-y-12">
          {timelineData.map((item, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: index * 0.15 }}
              viewport={{ once: true, margin: '-100px' }}
              className="relative pl-8 md:pl-12 group"
            >
              {/* Timeline dot & icon */}
              <div className="absolute -left-[19px] top-1 w-9 h-9 rounded-full bg-white dark:bg-slate-900 border-2 border-slate-200 dark:border-slate-700 flex items-center justify-center text-slate-400 group-hover:text-brand-600 group-hover:border-brand-600 transition-colors duration-300 shadow-sm">
                <item.icon size={16} />
              </div>

              {/* Mobile date badge */}
              <div className="md:hidden text-xs font-mono font-bold text-brand-600 dark:text-brand-400 mb-1">
                {item.date}
              </div>

              {/* Desktop date sidebar (positioned left absolute) */}
              <div className="hidden md:block absolute -left-32 top-1.5 w-24 text-right text-sm font-mono font-bold text-slate-400 group-hover:text-brand-600 transition-colors duration-300">
                {item.date}
              </div>

              {/* Content Card */}
              <div className="glass p-6 rounded-3xl border border-slate-100 dark:border-slate-800 shadow-sm hover:shadow-md transition-all duration-300 group-hover:-translate-y-0.5">
                <h4 className="text-lg font-bold text-slate-800 dark:text-white leading-snug group-hover:text-brand-600 transition-colors">
                  {item.role}
                </h4>
                <h5 className="text-sm font-semibold text-slate-400 dark:text-slate-500 mt-0.5 mb-3">
                  {item.company}
                </h5>
                <p className="text-slate-600 dark:text-slate-400 text-sm leading-relaxed">
                  {item.description}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
