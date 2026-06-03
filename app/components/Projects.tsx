'use client';

import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import { projects, type ProjectData } from '../lib/data/projects';
import ProjectDrawer from './ProjectDrawer';
import { motion, AnimatePresence } from 'framer-motion';
import { cn } from '@/app/lib/utils';

export default function Projects() {
  const [selectedProject, setSelectedProject] = useState<ProjectData | null>(null);
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [mounted, setMounted] = useState(false);

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

  const handleOpenDrawer = (project: ProjectData) => {
    setSelectedProject(project);
    setIsDrawerOpen(true);
  };

  const handleTiltMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const card = e.currentTarget;
    const inner = card.querySelector('.tilt-inner') as HTMLElement;
    if (inner) {
      const rect = card.getBoundingClientRect();
      const rx = ((e.clientY - rect.top) / rect.height - 0.5) * 20;
      const ry = ((e.clientX - rect.left) / rect.width - 0.5) * -20;
      inner.style.transform = `rotateX(${rx}deg) rotateY(${ry}deg) scale3d(1.05, 1.05, 1.05)`;
    }
  };

  const handleTiltLeave = (e: React.MouseEvent<HTMLDivElement>) => {
    const card = e.currentTarget;
    const inner = card.querySelector('.tilt-inner') as HTMLElement;
    if (inner) {
      inner.style.transform = `rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)`;
    }
  };

  if (!mounted) return null;

  const indexOfLastProject = currentPage * projectsPerPage;
  const indexOfFirstProject = indexOfLastProject - projectsPerPage;
  const currentProjects = projects.slice(indexOfFirstProject, indexOfLastProject);
  const totalPages = Math.ceil(projects.length / projectsPerPage);

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
    document.getElementById('projects')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section id="projects" className="min-h-screen flex items-center justify-center py-20 px-6 print:hidden">
      <div className="container-max">
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="mb-20"
        >
          <h2 className="text-5xl font-black uppercase tracking-tighter font-geist">
            Work<span className="text-primary">.</span>
          </h2>
        </motion.div>
        
        <div className="grid md:grid-cols-2 gap-12">
          {currentProjects.map((project, idx) => (
            <motion.div 
              key={`${project.title}-${currentPage}`}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: idx * 0.1 }}
              className="tilt-card cursor-pointer"
              onMouseMove={handleTiltMove}
              onMouseLeave={handleTiltLeave}
              onClick={() => handleOpenDrawer(project)}
            >
              <div className="tilt-inner group">
                <div className="relative aspect-[16/10] rounded-[40px] overflow-hidden glass mb-8 shadow-2xl">
                  <Image 
                    src={project.image} 
                    alt={project.title} 
                    width={800}
                    height={500}
                    className="w-full h-full object-cover group-hover:scale-105 transition-all duration-1000"
                  />
                </div>
                <h3 className="text-3xl font-black mb-2 group-hover:text-primary transition-colors font-geist">
                  {project.title}
                </h3>
                <p className="font-mono text-[10px] text-slate-400 font-bold uppercase tracking-widest">
                  {project.tech.slice(0, 3).join(' • ')}
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
