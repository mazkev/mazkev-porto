'use client';

import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import { projects, type ProjectData, type ProjectCategory } from '../lib/data/projects';
import ProjectDrawer from './ProjectDrawer';
import { motion, AnimatePresence } from 'framer-motion';
import { cn } from '@/app/lib/utils';

const CATEGORIES: ('All' | ProjectCategory)[] = ['All', 'Front End', 'Back End', 'Full Stack'];

export default function Projects() {
  const [selectedProject, setSelectedProject] = useState<ProjectData | null>(null);
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [mounted, setMounted] = useState(false);
  const [activeCategory, setActiveCategory] = useState<'All' | ProjectCategory>('All');

  const [currentPage, setCurrentPage] = useState(1);
  const projectsPerPage = 4;

  useEffect(() => {
    setMounted(true);
    const handleOpenProject = (e: Event) => {
      const customEvent = e as CustomEvent<string>;
      const projectTitle = customEvent.detail;
      const found = projects.find(p => p.title === projectTitle);
      if (found) {
        setSelectedProject(found);
        setIsDrawerOpen(true);
      }
    };
    window.addEventListener('open-project', handleOpenProject);
    return () => window.removeEventListener('open-project', handleOpenProject);
  }, []);

  const handleCategoryChange = (cat: 'All' | ProjectCategory) => {
    setActiveCategory(cat);
    setCurrentPage(1);
  };

  const handleOpenDrawer = (project: ProjectData) => {
    setSelectedProject(project);
    setIsDrawerOpen(true);
  };

  const handleTiltMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (window.matchMedia('(pointer: coarse)').matches) return;
    const card = e.currentTarget;
    const inner = card.querySelector('.tilt-inner') as HTMLElement;
    if (inner) {
      const rect = card.getBoundingClientRect();
      const rx = ((e.clientY - rect.top) / rect.height - 0.5) * 16;
      const ry = ((e.clientX - rect.left) / rect.width - 0.5) * -16;
      inner.style.transform = `rotateX(${rx}deg) rotateY(${ry}deg) scale3d(1.03, 1.03, 1.03)`;
    }
  };

  const handleTiltLeave = (e: React.MouseEvent<HTMLDivElement>) => {
    if (window.matchMedia('(pointer: coarse)').matches) return;
    const card = e.currentTarget;
    const inner = card.querySelector('.tilt-inner') as HTMLElement;
    if (inner) {
      inner.style.transform = `rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)`;
    }
  };

  if (!mounted) return null;

  const filteredProjects = activeCategory === 'All' 
    ? projects 
    : projects.filter(p => p.category === activeCategory);

  const indexOfLastProject = currentPage * projectsPerPage;
  const indexOfFirstProject = indexOfLastProject - projectsPerPage;
  const currentProjects = filteredProjects.slice(indexOfFirstProject, indexOfLastProject);
  const totalPages = Math.ceil(filteredProjects.length / projectsPerPage);

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
    document.getElementById('projects')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section id="projects" className="min-h-screen flex items-center justify-center py-20 px-6 print:hidden">
      <div className="container-max w-full">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.1 }}
          transition={{ duration: 0.5 }}
          className="mb-12 flex flex-col md:flex-row md:items-end justify-between gap-6"
        >
          <div>
            <h2 className="text-5xl font-black uppercase tracking-tighter font-geist">
              Work<span className="text-primary">.</span>
            </h2>
            <p className="text-slate-400 font-mono text-xs mt-2 uppercase tracking-widest">
              Selected Projects & Case Studies
            </p>
          </div>

          {/* Category Filter Tabs */}
          <div className="flex flex-wrap items-center gap-2 p-1.5 rounded-2xl glass border border-slate-200 dark:border-slate-800">
            {CATEGORIES.map((cat) => {
              const isActive = activeCategory === cat;
              return (
                <button
                  key={cat}
                  onClick={() => handleCategoryChange(cat)}
                  className={cn(
                    "px-4 py-2 rounded-xl text-xs font-bold uppercase tracking-wider transition-all cursor-pointer",
                    isActive
                      ? "bg-primary text-black shadow-md"
                      : "text-slate-500 hover:text-slate-900 dark:hover:text-white"
                  )}
                >
                  {cat}
                </button>
              );
            })}
          </div>
        </motion.div>
        
        <div className="grid md:grid-cols-2 gap-10 md:gap-12">
          {currentProjects.map((project, idx) => (
            <motion.div 
              key={`${project.title}-${currentPage}-${activeCategory}`}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.1 }}
              transition={{ duration: 0.5, delay: idx * 0.08 }}
              className="tilt-card cursor-pointer"
              onMouseMove={handleTiltMove}
              onMouseLeave={handleTiltLeave}
              onClick={() => handleOpenDrawer(project)}
            >
              <div className="tilt-inner group">
                <div className="relative aspect-[16/10] rounded-[32px] md:rounded-[40px] overflow-hidden glass mb-6 md:mb-8 shadow-xl">
                  <Image 
                    src={project.image} 
                    alt={project.title} 
                    width={800}
                    height={500}
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                    quality={75}
                    loading="lazy"
                    className="w-full h-full object-cover group-hover:scale-105 transition-all duration-700"
                  />
                  {/* Category Pill Tag Overlay */}
                  <div className="absolute top-4 right-4 z-10">
                    <span className={cn(
                      "px-3 py-1.5 rounded-full text-[10px] font-mono font-bold uppercase tracking-wider backdrop-blur-md border shadow-lg",
                      project.category === 'Front End' && "bg-emerald-500/20 text-emerald-300 border-emerald-500/30",
                      project.category === 'Back End' && "bg-sky-500/20 text-sky-300 border-sky-500/30",
                      project.category === 'Full Stack' && "bg-purple-500/20 text-purple-300 border-purple-500/30"
                    )}>
                      {project.category}
                    </span>
                  </div>
                </div>
                <h3 className="text-3xl font-black mb-2 group-hover:text-primary transition-colors font-geist flex items-center justify-between">
                  <span>{project.title}</span>
                </h3>
                <p className="font-mono text-[10px] text-slate-400 font-bold uppercase tracking-widest">
                  {project.tech.slice(0, 4).join(' • ')}
                </p>
              </div>
            </motion.div>
          ))}
        </div>

        {totalPages > 1 && (
          <div className="mt-20 flex flex-wrap justify-center items-center gap-2">
            <button
              onClick={() => handlePageChange(Math.max(1, currentPage - 1))}
              disabled={currentPage === 1}
              className="p-3 rounded-xl glass border border-slate-200 dark:border-slate-800 disabled:opacity-50 disabled:cursor-not-allowed hover:bg-slate-100 dark:hover:bg-slate-800 transition-all cursor-pointer"
              aria-label="Previous Page"
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m15 18-6-6 6-6"/></svg>
            </button>
            
            {[...Array(totalPages)].map((_, i) => (
              <button
                key={i}
                onClick={() => handlePageChange(i + 1)}
                className={cn(
                  "w-12 h-12 rounded-xl text-sm font-bold transition-all cursor-pointer",
                  currentPage === i + 1 
                    ? "bg-primary text-black shadow-[0_0_15px_rgba(5,150,105,0.4)]" 
                    : "glass border border-slate-200 dark:border-slate-800 text-slate-500 hover:text-primary hover:border-primary/50"
                )}
              >
                {i + 1}
              </button>
            ))}

            <button
              onClick={() => handlePageChange(Math.min(totalPages, currentPage + 1))}
              disabled={currentPage === totalPages}
              className="p-3 rounded-xl glass border border-slate-200 dark:border-slate-800 disabled:opacity-50 disabled:cursor-not-allowed hover:bg-slate-100 dark:hover:bg-slate-800 transition-all cursor-pointer"
              aria-label="Next Page"
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m9 18 6-6-6-6"/></svg>
            </button>
          </div>
        )}
      </div>

      <AnimatePresence>
        {isDrawerOpen && (
          <ProjectDrawer
            isOpen={isDrawerOpen}
            onClose={() => setIsDrawerOpen(false)}
            project={selectedProject}
          />
        )}
      </AnimatePresence>
    </section>
  );
}
