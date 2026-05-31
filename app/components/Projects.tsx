'use client';

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ExternalLink, Github, Layers, ArrowLeft, ArrowRight } from 'lucide-react';
import Image from 'next/image';
import ProjectDrawer, { ProjectData } from './ProjectDrawer';

const projects: ProjectData[] = [
  {
    title: 'MazCloud Dashboard',
    description: 'A premium cloud storage and file management dashboard. Features interactive capacity charts, secure folder management, and a sleek file browser interface.',
    tech: ['React', 'Tailwind CSS', 'Redux'],
    image: '/projects/mazcloud.png',
    live: 'https://mazcloud.vercel.app/',
    github: '#',
  },
  {
    title: 'Enterprise Operations Dashboard',
    description: 'A modern enterprise dashboard and system operations interface. Features real-time activity graphs, scalable data grids, and complex data visualizations.',
    tech: ['Next.js', 'TypeScript', 'Recharts'],
    image: '/projects/nexus.png',
    live: 'https://nexus-project-mu.vercel.app/',
    github: '#',
  },
  {
    title: 'Grab Super-App Clone',
    description: 'A high-fidelity clone of the Grab application, featuring real-time map integration, interactive food delivery menus, and ride-hailing simulations.',
    tech: ['Next.js', 'Tailwind CSS', 'Framer Motion'],
    image: '/projects/grab.png',
    live: 'https://grab-clone-three.vercel.app/',
    github: '#',
  },
  {
    title: 'HubSpot CRM Clone',
    description: 'A premium marketing and CRM dashboard clone of HubSpot. Features dynamic analytics charts, contact list management, and sleek marketing campaign interfaces.',
    tech: ['React', 'TypeScript', 'Tailwind CSS'],
    image: '/projects/hubspot.png',
    live: 'https://hub-spot-clone-five.vercel.app/',
    github: '#',
  },
  {
    title: 'Miro Infinite Canvas Clone',
    description: 'A collaborative whiteboard application replicating Miro. Features an infinite canvas, drag-and-drop sticky notes, flowchart components, and real-time cursor simulations.',
    tech: ['Next.js', 'React', 'Zustand'],
    image: '/projects/miro.png',
    live: 'https://miro-clone-kappa-livid.vercel.app/',
    github: '#',
  },
  {
    title: 'Semarketplace Pro',
    description: 'An enterprise-grade e-commerce ecosystem engineered for high-velocity transactions, featuring optimized checkout flows and real-time inventory synchronization.',
    tech: ['Next.js', 'Tailwind CSS', 'Redux'],
    image: '/projects/semarketplace.jpg',
    live: 'https://semarketplace.vercel.app/',
    github: '#',
  },
  {
    title: 'Indofooty Hub',
    description: 'A dynamic sports journalism platform delivering lightning-fast football updates, interactive match statistics, and a seamless multimedia experience for global fans.',
    tech: ['React', 'FastAPI', 'PostgreSQL'],
    image: '/projects/indofooty.jpg',
    live: 'https://indofooty.vercel.app/',
    github: '#',
  },
  {
    title: 'StreamX: Cinema Reimagined',
    description: 'A premium video-on-demand architectural demonstration featuring advanced content delivery, fluid glassmorphism UI, and ultra-responsive interaction patterns.',
    tech: ['TypeScript', 'React Js', 'Framer Motion'],
    image: '/projects/netflix.jpg',
    live: 'https://netflix-asli.vercel.app/',
    github: '#',
  },
  {
    title: 'Twitter Clonex',
    description: 'A high-fidelity social media clone featuring real-time feed updates, customizable dark-theme configurations, global user profile management, and interactive media sharing.',
    tech: ['Next.js', 'Firebase', 'Tailwind CSS'],
    image: '/projects/twitter.png',
    live: 'https://twitter-clonex1.vercel.app/',
    github: '#',
  },
  {
    title: 'Airbnb Clonex',
    description: 'A premium travel rental platform featuring dynamic accommodation grid listings, interactive category filter tabs, high-performance checkout simulation, and responsive map visualizations.',
    tech: ['React', 'Next.js', 'PostgreSQL'],
    image: '/projects/airbnb.png',
    live: 'https://airbnb-clonex.vercel.app/',
    github: '#',
  },
  {
    title: 'MazTube: Video Sharing',
    description: 'A sleek, state-of-the-art video sharing ecosystem featuring responsive custom playback overlays, interactive grid queries, sidebar controls, and GPU-accelerated backdrop blur transitions.',
    tech: ['TypeScript', 'React', 'Framer Motion'],
    image: '/projects/maztube.png',
    live: 'https://maztube.vercel.app/',
    github: '#',
  },
  {
    title: 'MazChat: Real-time Messaging',
    description: 'A high-fidelity communication platform featuring a personalized "Mulai Percakapan" onboarding flow, secure unique ID authentication, and a pixel-perfect conversational interface.',
    tech: ['React', 'Firebase', 'Tailwind CSS'],
    image: '/projects/whatsapp.png',
    live: 'https://whatsapp-rect.vercel.app/',
    github: '#',
  },
  {
    title: 'Instavision: Social Media Clone',
    description: 'A sleek, dark-mode social networking demonstration featuring an elegant login ecosystem, cross-platform authentication patterns, and high-fidelity UI components.',
    tech: ['React', 'Next.js', 'PostgreSQL'],
    image: '/projects/instagram.png',
    live: 'https://instgram1.vercel.app/',
    github: '#',
  },
  {
    title: 'InsightFlow: Modern Publishing',
    description: 'A vibrant publishing platform where "good ideas find you." Features a sophisticated Bootstrap-powered interface designed for maximum readability and engagement.',
    tech: ['React', 'Bootstrap', 'Node.js'],
    image: '/projects/medium.png',
    live: 'https://small-medium1.vercel.app/',
    github: '#',
  },
  {
    title: 'MazMarket: Premium Marketplace',
    description: 'A high-performance modern e-commerce platform built with Vue 3, featuring real-time product queries, high-speed filtering, and fluid reactive interface patterns.',
    tech: ['Vue.js', 'Vite', 'Tailwind CSS'],
    image: '/projects/mazmarket.png',
    live: 'https://aplikasi-vue.vercel.app/',
    github: '#',
  },
  {
    title: 'MarketX: Angular E-Commerce',
    description: 'An enterprise-grade marketplace powered by Angular, featuring reactive form controls, RxJS data stream management, and deep theme customization.',
    tech: ['Angular', 'TypeScript', 'RxJS'],
    image: '/projects/marketx.png',
    live: 'https://market-x-angular.vercel.app/',
    github: '#',
  },
  {
    title: 'MarketInvent: Inventory Control',
    description: 'A robust warehouse and inventory control system built with Vue, featuring real-time stock dashboards, analytical summaries, and tabular control views.',
    tech: ['Vue.js', 'Bootstrap', 'jQuery'],
    image: '/projects/marketinvent.png',
    live: 'https://vue-market-invent.vercel.app/',
    github: '#',
  },
  {
    title: 'Gojek Super-App Clone',
    description: 'A high-fidelity clone of the Gojek Super-App built with Vue 3, featuring animated service shortcuts, booking simulation sheets, and dynamic layout scaling.',
    tech: ['Vue.js', 'Vite', 'Tailwind CSS'],
    image: '/projects/gojek.png',
    live: 'https://gojek-clone-vue.vercel.app/',
    github: '#',
  },
  {
    title: 'Tokopedia Commerce Clone',
    description: 'A premium frontend recreation of Tokopedia, built with React, featuring product search matching, tab categories, carousel promos, and a responsive navigation bar.',
    tech: ['React', 'Vite', 'Tailwind CSS'],
    image: '/projects/tokopedia.png',
    live: 'https://tokopedia-react.vercel.app/',
    github: '#',
  },
  {
    title: 'Spotify Web Player Clone',
    description: 'A sleek, high-fidelity Spotify Web Player clone built with Next.js, featuring responsive glassmorphism sidebars, dynamic gradient headers, and player controls.',
    tech: ['Next.js', 'React', 'Tailwind CSS'],
    image: '/projects/spotify.png',
    live: 'https://spotify-clonez.vercel.app/',
    github: '#',
  },
  {
    title: 'CryptoDash: Elite Fintech Dashboard',
    description: 'A premium real-time cryptocurrency trading and analysis dashboard built with React, featuring dynamic candlestick charts, asset holdings grids, and smooth theme configurations.',
    tech: ['React', 'Vite', 'Recharts'],
    image: '/projects/cryptodash.png',
    live: 'https://crypto-dashboardz.vercel.app/',
    github: '#',
  },
  {
    title: 'Trello Kanban Workspace',
    description: 'A high-fidelity Kanban project management board built with React, featuring smooth drag-and-drop column sorting, card detail edits, and state persistence.',
    tech: ['React', 'Vite', 'Tailwind CSS'],
    image: '/projects/trello.png',
    live: 'https://trello-azure-five.vercel.app/',
    github: '#',
  },
  {
    title: 'Canvass: Premium Design Studio',
    description: 'A premium graphic design and layout editor application built with React, featuring drag-and-drop visual canvases, layer hierarchies, custom text properties, and image exports.',
    tech: ['React', 'Tailwind CSS', 'Zustand'],
    image: '/projects/canvass.png',
    live: 'https://canva-clone-fawn.vercel.app/',
    github: '#',
  },
];

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
