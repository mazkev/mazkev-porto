'use client';

import React from 'react';
import { Cloud, Code, GraduationCap, User, Database, Layers, ShieldCheck } from 'lucide-react';
import { motion } from 'framer-motion';
import Image from 'next/image';

const timelineData = [
  {
    date: '2023 — PRESENT',
    role: 'Application Support',
    company: 'PT PLN Icon+',
    description: 'Monitoring production application workflows, analyzing SQL database queries, and assisting in system bug investigations.',
    icon: Cloud,
  },
  {
    date: '2024 — PRESENT',
    role: 'Software Development',
    company: 'Independent & Open Source',
    description: 'Building fullstack web applications and backend REST APIs using Go, React, Next.js, and PostgreSQL.',
    icon: Code,
  },
  {
    date: '2017 — 2022',
    role: 'Bachelor of Computer Science / IT',
    company: 'Universitas AMIKOM',
    description: 'Studied algorithms, relational databases, software engineering, and web development fundamentals. GPA: 3.42 / 4.00.',
    icon: GraduationCap,
  },
];

export default function About() {

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
                  width={500}
                  height={500}
                  sizes="(max-width: 768px) 100vw, 500px"
                  quality={80}
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
              <p className="text-slate-600 dark:text-slate-300 text-base md:text-lg leading-relaxed">
                I bring <strong>2+ years of professional experience in Application Support at PT PLN Icon+</strong>, monitoring production system health, analyzing SQL queries, and troubleshooting application issues. This hands-on operational background gives me a practical understanding of how real-world software operates in production.
              </p>
              <p className="text-slate-600 dark:text-slate-300 text-base md:text-lg leading-relaxed">
                I am actively developing software as a <strong>Fullstack Developer</strong>, utilizing <strong>React & TypeScript</strong> for interactive web interfaces, and building backend services with <strong>Go (Golang)</strong> and PostgreSQL using modular, maintainable structures.
              </p>

              {/* 3 Engineering Principles */}
              <div className="grid sm:grid-cols-3 gap-3 pt-3">
                <div className="p-4 rounded-2xl bg-white/70 dark:bg-slate-900/60 border border-slate-200 dark:border-slate-800 shadow-sm space-y-2">
                  <div className="w-8 h-8 rounded-xl bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center text-emerald-500">
                    <Database size={16} />
                  </div>
                  <h4 className="text-xs font-bold font-geist uppercase tracking-wider text-slate-900 dark:text-white">
                    Operational & SQL Discipline
                  </h4>
                  <p className="text-[11px] text-slate-500 dark:text-slate-400 leading-relaxed font-medium">
                    Practical experience in analyzing SQL queries, resolving data bottlenecks, and investigating production issues.
                  </p>
                </div>

                <div className="p-4 rounded-2xl bg-white/70 dark:bg-slate-900/60 border border-slate-200 dark:border-slate-800 shadow-sm space-y-2">
                  <div className="w-8 h-8 rounded-xl bg-sky-500/10 border border-sky-500/20 flex items-center justify-center text-sky-400">
                    <Layers size={16} />
                  </div>
                  <h4 className="text-xs font-bold font-geist uppercase tracking-wider text-slate-900 dark:text-white">
                    Modular Code Structure
                  </h4>
                  <p className="text-[11px] text-slate-500 dark:text-slate-400 leading-relaxed font-medium">
                    Structuring Go backend services with clear separation between business logic, database access, and HTTP handlers.
                  </p>
                </div>

                <div className="p-4 rounded-2xl bg-white/70 dark:bg-slate-900/60 border border-slate-200 dark:border-slate-800 shadow-sm space-y-2">
                  <div className="w-8 h-8 rounded-xl bg-indigo-500/10 border border-indigo-500/20 flex items-center justify-center text-indigo-400">
                    <ShieldCheck size={16} />
                  </div>
                  <h4 className="text-xs font-bold font-geist uppercase tracking-wider text-slate-900 dark:text-white">
                    Type Safety & Reliability
                  </h4>
                  <p className="text-[11px] text-slate-500 dark:text-slate-400 leading-relaxed font-medium">
                    Leveraging TypeScript on frontend and structured schema validation on backend for predictable data flow.
                  </p>
                </div>
              </div>
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
