'use client';

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ExternalLink, Github, Layers, ArrowLeft, ArrowRight } from 'lucide-react';
import Image from 'next/image';
import ProjectDrawer from './ProjectDrawer';
import { projects, type ProjectData } from '../lib/data/projects';

export default function Projects() {
  const [selectedProject, setSelectedProject] = useState<ProjectData | null>(null);
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [currentPage, setCurrentPage] = useState(0);
  const PROJECTS_PER_PAGE = 6;
  const totalPages = Math.ceil(projects.length / PROJECTS_PER_PAGE);

  const visibleProjects = projects.slice(
    currentPage * PROJECTS_PER_PAGE,
    (currentPage + 1) * PROJECTS_PER_PAGE
  );

  const handleOpenDrawer = (project: ProjectData) => {
    setSelectedProject(project);
    setIsDrawerOpen(true);
  };

  useEffect(() => {
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

  return (
    <section id="projects" className="py-24 px-6 bg-slate-50 dark:bg-slate-900/50 no-print">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6">
          <div>
            <h2 className="text-sm font-bold text-brand-600 dark:text-brand-400 uppercase tracking-widest mb-2 flex items-center gap-2">
              <Layers size={18} /> Selected Work
            </h2>
            <h3 className="text-4xl md:text-5xl font-bold font-outfit">Featured <span className="text-gradient">Projects</span></h3>
          </div>
          <p className="text-slate-600 dark:text-slate-400 max-w-md">
            Explore a showcase of high-impact digital solutions where cutting-edge technology meets intuitive design. Each project is a testament to technical precision and user-centric problem solving.
          </p>
        </div>

        <div className="relative min-h-[500px]">
          <AnimatePresence mode="wait">
            <motion.div
              key={currentPage}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.4 }}
              className="grid md:grid-cols-2 lg:grid-cols-3 gap-8"
            >
              {visibleProjects.map((project) => (
                <motion.div
                  key={project.title}
                  whileHover={{ y: -10 }}
                  onClick={() => handleOpenDrawer(project)}
                  className="group glass rounded-3xl overflow-hidden flex flex-col h-full shadow-xl shadow-slate-200/50 dark:shadow-none cursor-pointer"
                >
                  <div className="relative h-56 overflow-hidden">
                    <Image
                      src={project.image}
                      alt={project.title}
                      width={400}
                      height={250}
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center gap-4">
                      <a
                        href={project.live}
                        target="_blank"
                        rel="noopener noreferrer"
                        onClick={(e) => e.stopPropagation()}
                        className="p-3 bg-white text-slate-900 rounded-full hover:bg-brand-500 hover:text-white transition-colors"
                      >
                        <ExternalLink size={20} />
                      </a>
                      {project.github !== '#' && (
                        <a
                          href={project.github}
                          target="_blank"
                          rel="noopener noreferrer"
                          onClick={(e) => e.stopPropagation()}
                          className="p-3 bg-white text-slate-900 rounded-full hover:bg-brand-500 hover:text-white transition-colors"
                        >
                          <Github size={20} />
                        </a>
                      )}
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
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          handleOpenDrawer(project);
                        }}
                        className="text-sm font-bold flex items-center gap-2 text-brand-600 hover:gap-3 transition-all cursor-pointer bg-transparent border-none p-0 text-left"
                      >
                        View Case Study <ExternalLink size={16} />
                      </button>
                    </div>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Pagination Page Slider Controls */}
        {totalPages > 1 && (
          <div className="flex items-center justify-center gap-4 mt-12">
            <button
              onClick={() => setCurrentPage(prev => Math.max(prev - 1, 0))}
              disabled={currentPage === 0}
              className="p-3 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl text-slate-600 dark:text-slate-400 hover:text-brand-600 dark:hover:text-brand-400 disabled:opacity-40 disabled:hover:text-slate-400 transition-all cursor-pointer shadow-sm"
              title="Previous Page"
            >
              <ArrowLeft size={20} />
            </button>
            
            <div className="flex gap-2">
              {Array.from({ length: totalPages }).map((_, i) => (
                <button
                  key={i}
                  onClick={() => setCurrentPage(i)}
                  className={`w-10 h-10 rounded-2xl font-bold transition-all cursor-pointer text-sm ${
                    currentPage === i
                      ? 'bg-brand-600 text-white shadow-md shadow-brand-600/20'
                      : 'bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-slate-600 dark:text-slate-400 hover:text-brand-600 dark:hover:text-brand-400'
                  }`}
                >
                  {i + 1}
                </button>
              ))}
            </div>

            <button
              onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages - 1))}
              disabled={currentPage === totalPages - 1}
              className="p-3 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl text-slate-600 dark:text-slate-400 hover:text-brand-600 dark:hover:text-brand-400 disabled:opacity-40 disabled:hover:text-slate-400 transition-all cursor-pointer shadow-sm"
              title="Next Page"
            >
              <ArrowRight size={20} />
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
