'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { User, Cpu, Sparkles, Terminal } from 'lucide-react';

const skills = [
  { name: 'Next.js', icon: 'https://cdn.simpleicons.org/nextdotjs' },
  { name: 'React', icon: 'https://cdn.simpleicons.org/react' },
  { name: 'Laravel', icon: 'https://cdn.simpleicons.org/laravel' },
  { name: 'PHP', icon: 'https://cdn.simpleicons.org/php' },
  { name: 'Python', icon: 'https://cdn.simpleicons.org/python' },
  { name: 'Vue', icon: 'https://cdn.simpleicons.org/vuedotjs' },
  { name: 'Angular', icon: 'https://cdn.simpleicons.org/angular' },
  { name: 'Firebase', icon: 'https://cdn.simpleicons.org/firebase' },
  { name: 'PostgreSQL', icon: 'https://cdn.simpleicons.org/postgresql' },
  { name: 'MySQL', icon: 'https://cdn.simpleicons.org/mysql' },
  { name: 'TypeScript', icon: 'https://cdn.simpleicons.org/typescript' },
  { name: 'AWS', icon: 'https://cdn.simpleicons.org/amazonaws' },
  { name: 'Docker', icon: 'https://cdn.simpleicons.org/docker' },
  { name: 'Vercel', icon: 'https://cdn.simpleicons.org/vercel' },
];

export default function About() {
  return (
    <section id="about" className="py-24 px-6 relative">
      <div className="max-w-7xl mx-auto grid md:grid-cols-2 gap-16 items-center">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="relative group"
        >
          <div className="relative rounded-[2.5rem] overflow-hidden aspect-square shadow-2xl">
            <img
              src="/profile/me.jpg"
              alt="Profile"
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
            <div className="text-3xl font-bold text-indigo-500">10+</div>
            <div className="text-xs font-bold uppercase tracking-widest text-slate-500">Projects</div>
          </div>
        </motion.div>

        <div>
          <h2 className="text-sm font-bold text-brand-600 dark:text-brand-400 uppercase tracking-widest mb-2 flex items-center gap-2">
            <User size={18} /> My Journey
          </h2>
          <h3 className="text-4xl md:text-5xl font-bold font-outfit mb-8">Passionate about <span className="text-gradient">Problem Solving</span></h3>
          
          <div className="space-y-6 text-slate-600 dark:text-slate-400 text-lg leading-relaxed mb-10">
            <p>
              I&apos;m a digital craftsman with over 3 years of experience in building scalable web applications. My dual expertise in high-performance frontend frameworks and robust backend architectures allows me to bridge the gap between design and functionality.
            </p>
            <p>
              From architecting complex Laravel backends to crafting pixel-perfect React interfaces, I thrive on the challenge of turning visionary ideas into tangible digital experiences.
            </p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {skills.map((skill, index) => (
              <motion.div
                key={skill.name}
                whileHover={{ scale: 1.05, y: -5 }}
                className="flex flex-col items-center gap-3 p-4 rounded-2xl bg-white dark:bg-slate-900 border border-slate-100 dark:border-slate-800 shadow-sm hover:shadow-md transition-all group"
              >
                <div className="w-12 h-12 flex items-center justify-center transition-all">
                   <img src={skill.icon} alt={skill.name} className="w-10 h-10 group-hover:scale-110 transition-transform" />
                </div>
                <span className="text-xs font-bold text-slate-600 dark:text-slate-400 group-hover:text-brand-600 transition-colors">{skill.name}</span>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
