'use client';

import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import dynamic from 'next/dynamic';
import { projects, type ProjectData, type ProjectCategory } from '../lib/data/projects';
import { motion, AnimatePresence } from 'framer-motion';

const ProjectDrawer = dynamic(() => import('./ProjectDrawer'), { ssr: false });
import { cn } from '@/app/lib/utils';
import { Search, X, Layers, Code } from 'lucide-react';

const CATEGORIES: ('All' | ProjectCategory)[] = ['All', 'Front End', 'Back End', 'Full Stack'];

export default function Projects() {
  const [selectedProject, setSelectedProject] = useState<ProjectData | null>(null);
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [mounted, setMounted] = useState(false);
  const [activeCategory, setActiveCategory] = useState<'All' | ProjectCategory>('All');
  const [searchQuery, setSearchQuery] = useState('');

  const [currentPage, setCurrentPage] = useState(1);
  const projectsPerPage = 6;

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

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value);
    setCurrentPage(1);
  };

  const handleClearSearch = () => {
    setSearchQuery('');
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

  const filteredProjects = projects.filter(p => {
    const matchesCategory = activeCategory === 'All' || p.category === activeCategory;
    const q = searchQuery.toLowerCase().trim();
    const matchesSearch = !q || 
      p.title.toLowerCase().includes(q) || 
      p.description.toLowerCase().includes(q) || 
      p.tech.some(t => t.toLowerCase().includes(q));
    return matchesCategory && matchesSearch;
  });

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
          className="mb-10 flex flex-col gap-6"
        >
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
            <div>
              <h2 className="text-5xl font-black uppercase tracking-tighter font-geist">
                Work<span className="text-primary">.</span>
              </h2>
              <p className="text-slate-400 font-mono text-xs mt-2 uppercase tracking-widest flex items-center gap-2">
                Selected Projects & Case Studies • <span className="text-primary font-bold">{projects.length} Total Repositories</span>
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
          </div>

          {/* Real-time Search Bar Input */}
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4 p-2 rounded-2xl glass border border-slate-200 dark:border-slate-800">
            <div className="relative w-full sm:max-w-md flex items-center">
              <Search size={16} className="absolute left-4 text-slate-400 pointer-events-none" />
              <input
                type="text"
                value={searchQuery}
                onChange={handleSearchChange}
                placeholder="Search projects (e.g. Java, Golang, React Native, Spring Boot, AI)..."
                className="w-full pl-11 pr-10 py-2.5 bg-slate-100/60 dark:bg-slate-900/60 rounded-xl text-xs font-semibold text-slate-800 dark:text-slate-200 placeholder-slate-400 outline-none border border-transparent focus:border-primary/50 transition-all font-mono"
              />
              {searchQuery && (
                <button
                  onClick={handleClearSearch}
                  className="absolute right-3 p-1 text-slate-400 hover:text-slate-900 dark:hover:text-white rounded-lg transition-colors cursor-pointer"
                  aria-label="Clear search"
                >
                  <X size={14} />
                </button>
              )}
            </div>

            {/* Results Count Badge */}
            <div className="text-[11px] font-mono font-bold uppercase text-slate-500 dark:text-slate-400 px-3 py-1 flex items-center gap-1.5 self-end sm:self-center">
              <Layers size={13} className="text-primary" />
              Showing <span className="text-slate-900 dark:text-white font-extrabold">{filteredProjects.length}</span> matching projects
            </div>
          </div>
        </motion.div>
        
        {currentProjects.length > 0 ? (
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {currentProjects.map((project, idx) => (
            <motion.div 
              key={`${project.title}-${currentPage}-${activeCategory}`}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.1 }}
              transition={{ duration: 0.5, delay: idx * 0.05 }}
              className="tilt-card cursor-pointer h-full"
              onMouseMove={handleTiltMove}
              onMouseLeave={handleTiltLeave}
              onClick={() => handleOpenDrawer(project)}
            >
              <div className="tilt-inner group glass p-4 md:p-5 rounded-2xl border border-slate-200/80 dark:border-slate-800/80 hover:border-primary/50 transition-all flex flex-col justify-between h-full shadow-md">
                <div>
                  {/* Compact Small Image Container */}
                  <div className="relative h-36 sm:h-40 rounded-xl overflow-hidden glass mb-3.5 shadow-sm">
                    <Image 
                      src={project.image} 
                      alt={project.title} 
                      width={600}
                      height={350}
                      sizes="(max-width: 768px) 100vw, (max-width: 1200px) 33vw, 25vw"
                      quality={75}
                      loading="lazy"
                      className="w-full h-full object-cover group-hover:scale-105 transition-all duration-500"
                    />
                    {/* Category Pill Tag Overlay */}
                    <div className="absolute top-2.5 right-2.5 z-10">
                      <span className={cn(
                        "px-2 py-0.5 rounded-full text-[8.5px] font-mono font-extrabold uppercase tracking-wider backdrop-blur-md border shadow-sm",
                        project.category === 'Front End' && "bg-emerald-500/20 text-emerald-300 border-emerald-500/30",
                        project.category === 'Back End' && "bg-sky-500/20 text-sky-300 border-sky-500/30",
                        project.category === 'Full Stack' && "bg-purple-500/20 text-purple-300 border-purple-500/30"
                      )}>
                        {project.category}
                      </span>
                    </div>
                  </div>

                  {/* Title */}
                  <h3 className="text-base md:text-lg font-black mb-1.5 group-hover:text-primary transition-colors font-geist line-clamp-1">
                    {project.title}
                  </h3>

                  {/* Description Preview */}
                  <p className="text-xs text-slate-500 dark:text-slate-400 font-medium leading-relaxed mb-3 line-clamp-2">
                    {project.description}
                  </p>
                </div>

                {/* Tech Stack & Details Action Footer */}
                <div className="pt-2.5 border-t border-slate-200/60 dark:border-slate-800/60 flex items-center justify-between gap-2">
                  <span className="font-mono text-[9px] text-slate-400 font-bold uppercase tracking-wider truncate">
                    {project.tech.slice(0, 3).join(' • ')}
                  </span>
                  <span className="text-[9px] font-mono font-extrabold text-primary uppercase group-hover:translate-x-0.5 transition-transform flex-shrink-0">
                    Details &rarr;
                  </span>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
        ) : (
          <div className="py-16 text-center rounded-3xl glass border border-slate-200 dark:border-slate-800 flex flex-col items-center justify-center gap-3">
            <Search size={36} className="text-slate-400 opacity-50" />
            <h3 className="text-xl font-bold font-geist text-slate-800 dark:text-slate-200">
              No projects found
            </h3>
            <p className="text-xs font-mono text-slate-500 max-w-sm">
              We couldn&apos;t find any repository matching &quot;{searchQuery}&quot; under {activeCategory} category.
            </p>
            <button
              onClick={handleClearSearch}
              className="mt-2 px-5 py-2.5 bg-primary text-black font-extrabold text-xs uppercase tracking-wider rounded-xl hover:opacity-90 transition-all cursor-pointer shadow-md"
            >
              Reset Search Filter
            </button>
          </div>
        )}

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
