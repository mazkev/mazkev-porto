'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { ExternalLink, Github, Layers } from 'lucide-react';
import Image from 'next/image';
import { cn } from '@/app/lib/utils';

const projects = [
  {
    title: 'Semarketplace',
    description: 'A high-performance marketplace with fast payment.',
    tech: ['Next.js', 'Tailwind'],
    image: '/projects/semarketplace.jpg',
    live: 'https://semarketplace.vercel.app/',
    github: '#',
  },
  {
    title: 'Indofooty',
    description: 'A Portal News with specific to Football.',
    tech: ['React', 'FastAPI'],
    image: '/projects/indofooty.jpg',
    live: 'https://indofooty.vercel.app/',
    github: '#',
  },
  {
    title: 'Netflix Clone App',
    description: 'A Clone netflix App with clean UI and smooth animation.',
    tech: ['TypeScript', 'React Js'],
    image: '/projects/netflix.jpg',
    live: 'https://netflix-asli.vercel.app/',
    github: '#',
  },
];

export default function Projects() {
  return (
    <section id="projects" className="py-24 px-6 bg-slate-50 dark:bg-slate-900/50">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6">
          <div>
            <h2 className="text-sm font-bold text-brand-600 dark:text-brand-400 uppercase tracking-widest mb-2 flex items-center gap-2">
              <Layers size={18} /> Selected Work
            </h2>
            <h3 className="text-4xl md:text-5xl font-bold font-outfit">Featured <span className="text-gradient">Projects</span></h3>
          </div>
          <p className="text-slate-600 dark:text-slate-400 max-w-md">
            A curated selection of digital products I've built from the ground up, focusing on performance, scalability, and UX.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {projects.map((project, index) => (
            <motion.div
              key={project.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              viewport={{ once: true }}
              whileHover={{ y: -10 }}
              className="group glass rounded-3xl overflow-hidden flex flex-col h-full shadow-xl shadow-slate-200/50 dark:shadow-none"
            >
              <div className="relative h-56 overflow-hidden">
                <img
                  src={project.image}
                  alt={project.title}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center gap-4">
                  <a href={project.live} className="p-3 bg-white text-slate-900 rounded-full hover:bg-brand-500 hover:text-white transition-colors">
                    <ExternalLink size={20} />
                  </a>
                  <a href={project.github} className="p-3 bg-white text-slate-900 rounded-full hover:bg-brand-500 hover:text-white transition-colors">
                    <Github size={20} />
                  </a>
                </div>
              </div>

              <div className="p-6 flex flex-col flex-grow">
                <div className="flex flex-wrap gap-2 mb-4">
                  {project.tech.map((t) => (
                    <span key={t} className="px-2 py-1 bg-brand-50 dark:bg-brand-950/50 text-brand-600 dark:text-brand-400 text-xs font-bold rounded-lg border border-brand-100 dark:border-brand-900/50">
                      {t}
                    </span>
                  ))}
                </div>
                <h4 className="text-xl font-bold mb-2 group-hover:text-brand-600 transition-colors">{project.title}</h4>
                <p className="text-slate-600 dark:text-slate-400 text-sm leading-relaxed mb-6">
                  {project.description}
                </p>
                <div className="mt-auto pt-6 border-t border-slate-100 dark:border-slate-800">
                  <a href={project.live} className="text-sm font-bold flex items-center gap-2 text-brand-600 hover:gap-3 transition-all">
                    View Case Study <ExternalLink size={16} />
                  </a>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
