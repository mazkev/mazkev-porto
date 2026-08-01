'use client';

import React, { useState, useEffect } from 'react';
import { Cloud, Code, GraduationCap, Brain, User, Sparkles } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
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
    date: '2023 — PRESENT',
    role: 'Technical Support Specialist',
    company: 'PT PLN Icon+',
    description: 'Provide operational and technical support for enterprise systems. Ensure high availability and performance of critical applications through proactive monitoring and rapid issue resolution.',
    icon: Cloud,
  },
  {
    date: '2023 — 2026',
    role: 'Freelance Fullstack Developer',
    company: 'Personal',
    description: 'Designed and built customized and scalable fullstack applications for clients using modern web technologies.',
    icon: Code,
  },
  {
    date: '2017 — 2022',
    role: 'Students of Informatics Studies ',
    company: 'Universitas Amikom Yogyakarta',
    description: 'Focus on fundamental computer science concepts, software engineering methodologies, and building scalable web applications.',
    icon: GraduationCap,
  },
];

export default function About() {
  const [mounted, setMounted] = useState(false);
  const [activeTab, setActiveTab] = useState<'all' | 'frontend' | 'backend' | 'devops'>('all');

  useEffect(() => {
    setMounted(true);
  }, []);

  const filteredSkills = activeTab === 'all' 
    ? skills 
    : skills.filter(skill => skill.category === activeTab);

  if (!mounted) return null;

  return (
    <>
      <section id="about" className="min-h-screen flex items-center justify-center py-20 px-6 print:hidden">
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="container-max"
        >
          <div className="grid md:grid-cols-2 gap-16 items-center">
            <div className="relative">
              <div className="aspect-square rounded-[40px] overflow-hidden glass shadow-2xl">
                <Image 
                  src="/profile/kev.png" 
                  alt="Kevin Eka Pratama"
                  width={800}
                  height={800}
                  className="w-full h-full object-cover grayscale hover:grayscale-0 transition-all duration-700"
                />
              </div>
            </div>
            <div className="space-y-6">
              <h2 className="text-sm font-bold text-primary uppercase tracking-widest mb-2 flex items-center gap-2">
                <User size={18} /> Background
              </h2>
              <h3 className="text-5xl font-black tracking-tighter uppercase font-geist">
                How I got <span className="text-primary">here.</span>
              </h3>
              <p className="text-slate-500 dark:text-slate-400 text-lg leading-relaxed">
                I&apos;m a Fullstack Engineer with 3 years of experience building high-fidelity consumer applications and robust enterprise systems. My expertise spans across modern frontend frameworks like Next.js, Vue 3, and Angular, paired with scalable backend solutions using PostgreSQL, Firebase, and FastAPI.
              </p>
              <p className="text-slate-500 dark:text-slate-400 text-lg leading-relaxed">
                I am a detail-oriented and innovative individual with a strong foundation in computer science and a passion for building high-quality, scalable, and efficient software solutions. I have experience working with various technologies and frameworks and enjoy solving complex problems. My goal is to continuously improve my skills and contribute to meaningful projects that make a positive impact.
              </p>
            </div>
          </div>
          
          {/* Skills Grid */}
          <div className="mt-32">
            <div className="mb-12">
              <h2 className="text-sm font-bold text-primary uppercase tracking-widest mb-2 flex items-center gap-2">
                <Brain size={18} /> Skills
              </h2>
              <h3 className="text-3xl md:text-4xl font-bold font-geist">Technologies I <span className="text-primary">Use.</span></h3>
            </div>

            <div className="w-full space-y-8">
              {/* Filter Tabs */}
              <div className="flex flex-wrap gap-2 p-1 bg-slate-50 dark:bg-slate-900/60 rounded-2xl border border-slate-200 dark:border-slate-800/80 max-w-max glass">
                {(['all', 'frontend', 'backend', 'devops'] as const).map((tab) => (
                  <button
                    key={tab}
                    onClick={() => setActiveTab(tab)}
                    className={cn(
                      "px-4 py-2 text-xs font-bold uppercase tracking-wider rounded-xl transition-all duration-300 cursor-pointer",
                      activeTab === tab 
                        ? "bg-primary text-black shadow-md" 
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
                      className="flex items-center gap-3 p-4 rounded-2xl glass border border-slate-200 dark:border-slate-800 shadow-sm hover:shadow-md transition-all group cursor-default"
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
                      <span className="text-xs font-bold text-slate-700 dark:text-slate-300 group-hover:text-primary transition-colors truncate">
                        {skill.name}
                      </span>
                    </motion.div>
                  ))}
                </AnimatePresence>
              </motion.div>
            </div>
          </div>
        </motion.div>
      </section>

      <section id="experience" className="bg-slate-50/50 dark:bg-slate-950/20 min-h-screen flex flex-col justify-center py-20 px-6 print:hidden">
        <div className="container-max">
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="mb-20"
          >
            <h2 className="text-7xl md:text-[150px] font-black uppercase tracking-tighter leading-[0.8] mix-blend-overlay opacity-5 pointer-events-none absolute -left-10 top-20">
              EXPERIENCE
            </h2>
            <h2 className="text-5xl font-black uppercase tracking-tighter font-geist">
              Experience<span className="text-primary">.</span>
            </h2>
          </motion.div>
          
          <div className="grid gap-px bg-slate-100 dark:bg-slate-800 rounded-[40px] overflow-hidden shadow-sm">
            {timelineData.map((item, index) => (
              <motion.div 
                key={index} 
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, delay: index * 0.1 }}
                className="glass p-12 group"
              >
                <div className="grid md:grid-cols-12 gap-8 items-center">
                  <div className="md:col-span-3 font-mono text-[10px] text-slate-400 font-bold uppercase tracking-widest">
                    {item.date}
                  </div>
                  <div className="md:col-span-6">
                    <h3 className="text-3xl font-black mb-3 group-hover:text-primary transition-all font-geist">
                      {item.role}
                    </h3>
                    <p className="text-slate-500 dark:text-slate-400 font-medium">
                      {item.description}
                      <br/>
                      <span className="text-primary font-bold italic mt-2 block">{item.company}</span>
                    </p>
                  </div>
                  <div className="md:col-span-3 text-right flex justify-end">
                    <item.icon className="text-primary" size={48} />
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
