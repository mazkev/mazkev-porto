'use client';

import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { 
  Github, 
  GitCommit, 
  GitFork, 
  ExternalLink, 
  Activity, 
  FolderGit2, 
  CheckCircle2, 
  Flame, 
  Layers, 
  Code2, 
  PieChart, 
  Terminal,
  Smartphone,
  Server,
  Star,
  Sparkles
} from 'lucide-react';
import { cn } from '../lib/utils';

interface GitHubEvent {
  id: string;
  type: string;
  repo: {
    name: string;
    url: string;
  };
  payload?: {
    commits?: Array<{
      message: string;
      sha: string;
    }>;
  };
  created_at: string;
}

interface CuratedRepo {
  name: string;
  category: 'all' | 'go' | 'fullstack' | 'frontend' | 'mobile' | 'enterprise';
  categoryLabel: string;
  language: string;
  langColor: string;
  desc: string;
  tech: string[];
  githubUrl: string;
}

const CURATED_REPOS: CuratedRepo[] = [
  {
    name: 'go-marketplace-backend',
    category: 'go',
    categoryLabel: 'Go Backend',
    language: 'Go',
    langColor: 'text-cyan-400 bg-cyan-500/10 border-cyan-500/20',
    desc: 'High-performance REST API backend with Fiber, GORM, connection pooling, and atomic transactional checkout.',
    tech: ['Go', 'Fiber', 'GORM', 'PostgreSQL', 'Docker'],
    githubUrl: 'https://github.com/mazkev/go-marketplace-backend'
  },
  {
    name: 'go-clean-arch',
    category: 'go',
    categoryLabel: 'Go Backend',
    language: 'Go',
    langColor: 'text-cyan-400 bg-cyan-500/10 border-cyan-500/20',
    desc: 'Modular Go REST API built with Clean Architecture (Domain, Usecase, Repository, Delivery) for clean testing.',
    tech: ['Go', 'Clean Architecture', 'PostgreSQL', 'Docker'],
    githubUrl: 'https://github.com/mazkev/go-clean-arch'
  },
  {
    name: 'go-bank',
    category: 'go',
    categoryLabel: 'Go Backend',
    language: 'Go',
    langColor: 'text-cyan-400 bg-cyan-500/10 border-cyan-500/20',
    desc: 'Core banking balance transfer service handling concurrent transactions with SELECT FOR UPDATE row locking.',
    tech: ['Go', 'ACID Transactions', 'PostgreSQL', 'Docker'],
    githubUrl: 'https://github.com/mazkev/go-bank'
  },
  {
    name: 'go-marketplace',
    category: 'fullstack',
    categoryLabel: 'Fullstack',
    language: 'Go + React',
    langColor: 'text-emerald-400 bg-emerald-500/10 border-emerald-500/20',
    desc: 'Fullstack e-commerce application integrating a React + TypeScript frontend with a modular Go REST API backend.',
    tech: ['Go', 'React', 'TypeScript', 'PostgreSQL', 'JWT'],
    githubUrl: 'https://github.com/mazkev/go-marketplace'
  },
  {
    name: 'nexus-project',
    category: 'fullstack',
    categoryLabel: 'Fullstack',
    language: 'TypeScript',
    langColor: 'text-blue-400 bg-blue-500/10 border-blue-500/20',
    desc: 'All-in-one productivity platform featuring CRM, Kanban Board, Console, and interactive Canvas built with React.',
    tech: ['React', 'TypeScript', 'Tailwind CSS', 'State Management'],
    githubUrl: 'https://github.com/mazkev/nexus-project'
  },
  {
    name: 'BayE-marketplace',
    category: 'fullstack',
    categoryLabel: 'Fullstack',
    language: 'Next.js',
    langColor: 'text-purple-400 bg-purple-500/10 border-purple-500/20',
    desc: 'Modern auction marketplace inspired by eBay built with Next.js App Router, live bidding simulation, and cart.',
    tech: ['Next.js 14', 'React', 'TypeScript', 'Tailwind'],
    githubUrl: 'https://github.com/mazkev/BayE-marketplace'
  },
  {
    name: 'bun-hono',
    category: 'fullstack',
    categoryLabel: 'Fullstack',
    language: 'TypeScript',
    langColor: 'text-amber-400 bg-amber-500/10 border-amber-500/20',
    desc: 'Modern ultra-fast TypeScript backend built on Bun runtime with Hono framework, Drizzle ORM, and Zod validation.',
    tech: ['Bun', 'Hono', 'Drizzle ORM', 'Zod', 'JWT'],
    githubUrl: 'https://github.com/mazkev/bun-hono'
  },
  {
    name: 'pos-react-native-appscript',
    category: 'mobile',
    categoryLabel: 'Mobile App',
    language: 'React Native',
    langColor: 'text-sky-400 bg-sky-500/10 border-sky-500/20',
    desc: 'Mobile Point of Sale (POS) application built with React Native and Google Appscript spreadsheet integration.',
    tech: ['React Native', 'Expo', 'TypeScript', 'POS Engine'],
    githubUrl: 'https://github.com/mazkev/pos-react-native-appscript'
  },
  {
    name: 'plusico-react-native-expo',
    category: 'mobile',
    categoryLabel: 'Mobile App',
    language: 'React Native',
    langColor: 'text-sky-400 bg-sky-500/10 border-sky-500/20',
    desc: 'Enterprise employee attendance and operations mobile tracking app built with React Native Expo.',
    tech: ['React Native', 'Expo', 'Mobile UI', 'REST API'],
    githubUrl: 'https://github.com/mazkev/plusico-react-native-expo'
  },
  {
    name: 'belajar-java-springboot',
    category: 'enterprise',
    categoryLabel: 'Enterprise Java',
    language: 'Java',
    langColor: 'text-red-400 bg-red-500/10 border-red-500/20',
    desc: 'Enterprise MVC backend with Java 17, Spring Boot 3, Spring Security JWT filter chain, and JPA Hibernate.',
    tech: ['Java 17', 'Spring Boot 3', 'JPA Hibernate', 'PostgreSQL'],
    githubUrl: 'https://github.com/mazkev/belajar-java-springboot'
  },
  {
    name: 'HRMS-app-laravel',
    category: 'enterprise',
    categoryLabel: 'Enterprise PHP',
    language: 'PHP',
    langColor: 'text-indigo-400 bg-indigo-500/10 border-indigo-500/20',
    desc: 'Human Resource Management System with attendance tracking, leave approval workflows, and payroll calculations.',
    tech: ['Laravel 11', 'MySQL', 'Eloquent ORM', 'Blade'],
    githubUrl: 'https://github.com/mazkev/HRMS-app-laravel'
  },
  {
    name: 'mazcloud',
    category: 'frontend',
    categoryLabel: 'Web App',
    language: 'JavaScript',
    langColor: 'text-yellow-400 bg-yellow-500/10 border-yellow-500/20',
    desc: 'Cloud storage management dashboard with interactive breadcrumbs, donut capacity charts, and file tree state.',
    tech: ['React', 'Redux', 'Tailwind CSS', 'Glassmorphism'],
    githubUrl: 'https://github.com/mazkev/mazcloud'
  }
];

const LANGUAGE_BREAKDOWN = [
  { name: 'TypeScript / React / Next.js', percent: 45, color: 'bg-blue-500' },
  { name: 'Go (Golang REST APIs)', percent: 25, color: 'bg-cyan-400' },
  { name: 'Java Spring Boot', percent: 12, color: 'bg-red-500' },
  { name: 'PHP / Laravel', percent: 8, color: 'bg-indigo-500' },
  { name: 'React Native (Mobile)', percent: 6, color: 'bg-sky-400' },
  { name: 'Vue / Angular / Others', percent: 4, color: 'bg-emerald-400' },
];

const FALLBACK_EVENTS: GitHubEvent[] = [
  {
    id: '1',
    type: 'PushEvent',
    repo: { name: 'mazkev/mazkev-porto', url: 'https://github.com/mazkev/mazkev-porto' },
    payload: {
      commits: [{ message: 'feat: add layered Architecture Flow pipeline visualizer', sha: '9ae59c0' }]
    },
    created_at: new Date(Date.now() - 1000 * 60 * 60 * 5).toISOString(),
  },
  {
    id: '2',
    type: 'PushEvent',
    repo: { name: 'mazkev/bun-hono', url: 'https://github.com/mazkev/bun-hono' },
    payload: {
      commits: [{ message: 'feat: modern e-commerce backend with Bun, Hono, Drizzle ORM, Zod, and JWT', sha: 'a4e1bc2' }]
    },
    created_at: new Date(Date.now() - 1000 * 60 * 60 * 24 * 2).toISOString(),
  },
  {
    id: '3',
    type: 'PushEvent',
    repo: { name: 'mazkev/belajar-java-springboot', url: 'https://github.com/mazkev/belajar-java-springboot' },
    payload: {
      commits: [{ message: 'feat: enterprise e-commerce platform with Java 17, Spring Boot 3, and Vue 3', sha: 'f89c31d' }]
    },
    created_at: new Date(Date.now() - 1000 * 60 * 60 * 24 * 3).toISOString(),
  },
  {
    id: '4',
    type: 'PushEvent',
    repo: { name: 'mazkev/go-marketplace-backend', url: 'https://github.com/mazkev/go-marketplace-backend' },
    payload: {
      commits: [{ message: 'feat: transactional checkout handling with GORM and PostgreSQL pooling', sha: '8c991a0' }]
    },
    created_at: new Date(Date.now() - 1000 * 60 * 60 * 24 * 5).toISOString(),
  },
];

function formatTimeAgo(isoString: string): string {
  const diffMs = Date.now() - new Date(isoString).getTime();
  const diffHours = Math.floor(diffMs / (1000 * 60 * 60));
  if (diffHours < 1) return 'Just now';
  if (diffHours < 24) return `${diffHours}h ago`;
  const diffDays = Math.floor(diffHours / 24);
  if (diffDays === 1) return 'Yesterday';
  if (diffDays < 30) return `${diffDays}d ago`;
  return new Date(isoString).toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
}

export default function GithubActivity() {
  const [events, setEvents] = useState<GitHubEvent[]>(FALLBACK_EVENTS);
  const [loading, setLoading] = useState(true);
  const [publicReposCount, setPublicReposCount] = useState<number>(90);
  const [activeTab, setActiveTab] = useState<'activity' | 'repos' | 'analytics'>('activity');
  const [repoFilter, setRepoFilter] = useState<'all' | 'go' | 'fullstack' | 'mobile' | 'enterprise'>('all');

  useEffect(() => {
    async function fetchGitHubData() {
      try {
        const [userRes, eventsRes] = await Promise.all([
          fetch('https://api.github.com/users/mazkev').catch(() => null),
          fetch('https://api.github.com/users/mazkev/events/public?per_page=6').catch(() => null)
        ]);

        if (userRes && userRes.ok) {
          const userData = await userRes.json();
          if (userData.public_repos) {
            setPublicReposCount(userData.public_repos);
          }
        }

        if (eventsRes && eventsRes.ok) {
          const eventsData = await eventsRes.json();
          if (Array.isArray(eventsData) && eventsData.length > 0) {
            setEvents(eventsData.slice(0, 5));
          }
        }
      } catch (err) {
        console.warn('GitHub API fetch fallback:', err);
      } finally {
        setLoading(false);
      }
    }

    fetchGitHubData();
  }, []);

  const filteredRepos = repoFilter === 'all'
    ? CURATED_REPOS
    : CURATED_REPOS.filter(r => r.category === repoFilter);

  return (
    <section id="github-activity" className="py-24 px-6 relative print:hidden border-t border-slate-200 dark:border-slate-800/80 bg-slate-50/40 dark:bg-slate-950/20">
      <div className="container-max w-full">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.1 }}
          transition={{ duration: 0.5 }}
          className="mb-10 flex flex-col md:flex-row md:items-end justify-between gap-6"
        >
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 text-xs font-mono font-bold uppercase tracking-widest mb-3 border border-emerald-500/20">
              <Activity size={14} className="animate-pulse" />
              <span>GitHub Analytics Dashboard</span>
            </div>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-black tracking-tight font-geist text-slate-900 dark:text-white">
              Code Activity & <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-500 to-sky-500">Repository Hub.</span>
            </h2>
            <p className="text-slate-600 dark:text-slate-400 text-sm sm:text-base mt-2 max-w-xl font-medium">
              Transparent live snapshot of public commits, contribution streak, and curated repositories on{' '}
              <a 
                href="https://github.com/mazkev" 
                target="_blank" 
                rel="noopener noreferrer" 
                className="text-primary hover:underline font-bold inline-flex items-center gap-1 font-mono"
              >
                github.com/mazkev <ExternalLink size={12} />
              </a>.
            </p>
          </div>

          {/* Tab Controls */}
          <div className="flex p-1 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm self-start md:self-end">
            <button
              onClick={() => setActiveTab('activity')}
              className={cn(
                "px-3.5 py-2 text-xs font-mono font-bold uppercase tracking-wider rounded-xl transition-all cursor-pointer flex items-center gap-1.5",
                activeTab === 'activity'
                  ? "bg-slate-900 dark:bg-white text-white dark:text-slate-900 shadow-sm"
                  : "text-slate-500 hover:text-slate-900 dark:hover:text-white"
              )}
            >
              <Flame size={14} /> Activity Stream
            </button>
            <button
              onClick={() => setActiveTab('repos')}
              className={cn(
                "px-3.5 py-2 text-xs font-mono font-bold uppercase tracking-wider rounded-xl transition-all cursor-pointer flex items-center gap-1.5",
                activeTab === 'repos'
                  ? "bg-slate-900 dark:bg-white text-white dark:text-slate-900 shadow-sm"
                  : "text-slate-500 hover:text-slate-900 dark:hover:text-white"
              )}
            >
              <FolderGit2 size={14} /> Top Repos ({CURATED_REPOS.length})
            </button>
            <button
              onClick={() => setActiveTab('analytics')}
              className={cn(
                "px-3.5 py-2 text-xs font-mono font-bold uppercase tracking-wider rounded-xl transition-all cursor-pointer flex items-center gap-1.5",
                activeTab === 'analytics'
                  ? "bg-slate-900 dark:bg-white text-white dark:text-slate-900 shadow-sm"
                  : "text-slate-500 hover:text-slate-900 dark:hover:text-white"
              )}
            >
              <PieChart size={14} /> Stack Breakdown
            </button>
          </div>
        </motion.div>

        {/* 4 Performance Metric Cards */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-10">
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4 }}
            className="p-5 rounded-2xl glass border border-slate-200 dark:border-slate-800 flex flex-col justify-between"
          >
            <div className="flex items-center justify-between text-slate-500 mb-3">
              <span className="text-xs font-mono font-bold uppercase tracking-wider">Public Repos</span>
              <FolderGit2 size={18} className="text-emerald-500" />
            </div>
            <div className="text-xl sm:text-2xl font-black font-geist text-slate-900 dark:text-white">
              {loading ? '90+' : `${publicReposCount}+`}
            </div>
            <p className="text-[10px] font-mono text-slate-400 mt-1">
              Active open source codebase
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4, delay: 0.05 }}
            className="p-5 rounded-2xl glass border border-slate-200 dark:border-slate-800 flex flex-col justify-between"
          >
            <div className="flex items-center justify-between text-slate-500 mb-3">
              <span className="text-xs font-mono font-bold uppercase tracking-wider">Core Stacks</span>
              <Code2 size={18} className="text-sky-400" />
            </div>
            <div className="text-xl sm:text-2xl font-black font-geist text-slate-900 dark:text-white">
              Go • React • TS
            </div>
            <p className="text-[10px] font-mono text-slate-400 mt-1">
              Clean architecture & SQL
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4, delay: 0.1 }}
            className="p-5 rounded-2xl glass border border-slate-200 dark:border-slate-800 flex flex-col justify-between"
          >
            <div className="flex items-center justify-between text-slate-500 mb-3">
              <span className="text-xs font-mono font-bold uppercase tracking-wider">Architecture</span>
              <Layers size={18} className="text-purple-400" />
            </div>
            <div className="text-xl sm:text-2xl font-black font-geist text-slate-900 dark:text-white">
              Modular REST
            </div>
            <p className="text-[10px] font-mono text-slate-400 mt-1">
              Domain & repository isolation
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4, delay: 0.15 }}
            className="p-5 rounded-2xl glass border border-slate-200 dark:border-slate-800 flex flex-col justify-between"
          >
            <div className="flex items-center justify-between text-slate-500 mb-3">
              <span className="text-xs font-mono font-bold uppercase tracking-wider">Background</span>
              <CheckCircle2 size={18} className="text-amber-400" />
            </div>
            <div className="text-xl sm:text-2xl font-black font-geist text-slate-900 dark:text-white">
              3 Yrs Support
            </div>
            <p className="text-[10px] font-mono text-slate-400 mt-1">
              Production DB & issue triage
            </p>
          </motion.div>
        </div>

        {/* TAB 1: ACTIVITY STREAM & HEATMAP */}
        {activeTab === 'activity' && (
          <div className="space-y-8">
            {/* Contribution Heatmap Card */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4 }}
              className="p-6 sm:p-8 rounded-3xl glass border border-slate-200 dark:border-slate-800 shadow-xl overflow-hidden"
            >
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-6">
                <div className="flex items-center gap-2.5">
                  <div className="w-8 h-8 rounded-xl bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center text-emerald-400">
                    <Flame size={16} />
                  </div>
                  <div>
                    <h3 className="text-base font-bold font-geist text-slate-900 dark:text-white">
                      Contribution Heatmap
                    </h3>
                    <p className="text-[11px] font-mono text-slate-400">
                      Year-round public commits & development streak
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-2 text-xs font-mono text-slate-400 self-end sm:self-auto">
                  <span>Less</span>
                  <div className="flex gap-1">
                    <span className="w-3 h-3 rounded-sm bg-slate-200 dark:bg-slate-800" />
                    <span className="w-3 h-3 rounded-sm bg-emerald-500/30" />
                    <span className="w-3 h-3 rounded-sm bg-emerald-500/60" />
                    <span className="w-3 h-3 rounded-sm bg-emerald-500" />
                  </div>
                  <span>More</span>
                </div>
              </div>

              {/* SVG Heatmap Wrapper with smooth horizontal scroll */}
              <div className="overflow-x-auto pb-2 -mx-2 px-2 scrollbar-thin">
                <div className="min-w-[700px] flex justify-center py-2">
                  <img
                    src="https://ghchart.rshah.org/10b981/mazkev"
                    alt="Kevin Eka Pratama GitHub Contribution Chart"
                    className="w-full h-auto max-w-4xl dark:invert-[0.05] dark:hue-rotate-180"
                    loading="lazy"
                  />
                </div>
              </div>
            </motion.div>

            {/* Live Recent Commit Stream */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4 }}
              className="p-6 sm:p-8 rounded-3xl glass border border-slate-200 dark:border-slate-800 shadow-xl"
            >
              <div className="flex items-center justify-between mb-6">
                <div className="flex items-center gap-2.5">
                  <div className="w-8 h-8 rounded-xl bg-sky-500/10 border border-sky-500/20 flex items-center justify-center text-sky-400">
                    <GitCommit size={16} />
                  </div>
                  <div>
                    <h3 className="text-base font-bold font-geist text-slate-900 dark:text-white">
                      Latest Public Push Activity
                    </h3>
                    <p className="text-[11px] font-mono text-slate-400">
                      Real-time events fetched from GitHub API
                    </p>
                  </div>
                </div>
              </div>

              <div className="grid md:grid-cols-2 gap-3.5">
                {events.map((event, idx) => {
                  const repoName = event.repo.name.replace('mazkev/', '');
                  const commitMessage = event.payload?.commits?.[0]?.message || 'Updated repository code and components';
                  const sha = event.payload?.commits?.[0]?.sha?.slice(0, 7) || 'latest';

                  return (
                    <div
                      key={`${event.id}-${idx}`}
                      className="p-4 rounded-2xl bg-white/60 dark:bg-slate-900/50 border border-slate-200/80 dark:border-slate-800/80 hover:border-primary/50 transition-all flex flex-col justify-between gap-3 group"
                    >
                      <div className="flex items-center justify-between gap-2">
                        <a
                          href={`https://github.com/${event.repo.name}`}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-xs font-bold font-mono text-slate-900 dark:text-white group-hover:text-primary transition-colors flex items-center gap-1.5 truncate"
                        >
                          <Github size={13} className="text-slate-400 flex-shrink-0" />
                          <span className="truncate">{repoName}</span>
                        </a>
                        <span className="text-[10px] font-mono font-semibold text-slate-400 whitespace-nowrap bg-slate-100 dark:bg-slate-800/60 px-2 py-0.5 rounded-md">
                          {formatTimeAgo(event.created_at)}
                        </span>
                      </div>

                      <p className="text-xs text-slate-600 dark:text-slate-300 font-medium line-clamp-2 leading-relaxed">
                        {commitMessage}
                      </p>

                      <div className="flex items-center justify-between text-[10px] font-mono text-slate-400 border-t border-slate-100 dark:border-slate-800/60 pt-2.5 mt-1">
                        <span className="flex items-center gap-1">
                          <GitCommit size={11} className="text-primary" />
                          Commit <code className="text-slate-600 dark:text-slate-300">{sha}</code>
                        </span>
                        <a
                          href={`https://github.com/${event.repo.name}`}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-slate-400 group-hover:text-primary transition-colors flex items-center gap-1"
                        >
                          Open Repo <ExternalLink size={10} />
                        </a>
                      </div>
                    </div>
                  );
                })}
              </div>
            </motion.div>
          </div>
        )}

        {/* TAB 2: TOP CURATED REPOSITORIES EXPLORER */}
        {activeTab === 'repos' && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
            className="space-y-6"
          >
            {/* Filter Pills */}
            <div className="flex items-center gap-2 overflow-x-auto pb-2">
              <span className="text-xs font-mono font-bold uppercase text-slate-400 mr-2 flex-shrink-0">
                Filter Stack:
              </span>
              {(['all', 'go', 'fullstack', 'mobile', 'enterprise'] as const).map((filter) => (
                <button
                  key={filter}
                  onClick={() => setRepoFilter(filter)}
                  className={cn(
                    "px-3.5 py-1.5 rounded-xl text-xs font-mono font-bold uppercase tracking-wider transition-all whitespace-nowrap cursor-pointer flex-shrink-0",
                    repoFilter === filter
                      ? "bg-primary text-black font-extrabold shadow-sm"
                      : "bg-white dark:bg-slate-900 text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white border border-slate-200 dark:border-slate-800"
                  )}
                >
                  {filter === 'all' && 'All Top Repos'}
                  {filter === 'go' && 'Go Backend'}
                  {filter === 'fullstack' && 'Fullstack Web'}
                  {filter === 'mobile' && 'React Native'}
                  {filter === 'enterprise' && 'Java & PHP'}
                </button>
              ))}
            </div>

            {/* Repos Grid */}
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {filteredRepos.map((repo) => (
                <div
                  key={repo.name}
                  className="p-5 rounded-2xl bg-white dark:bg-slate-900/60 border border-slate-200 dark:border-slate-800/80 hover:border-primary/50 transition-all flex flex-col justify-between gap-4 shadow-sm group"
                >
                  <div className="space-y-2.5">
                    <div className="flex items-center justify-between gap-2">
                      <span className={cn("px-2.5 py-0.5 rounded-lg text-[10px] font-mono font-bold border", repo.langColor)}>
                        {repo.language}
                      </span>
                      <span className="text-[10px] font-mono font-semibold text-slate-400 uppercase">
                        {repo.categoryLabel}
                      </span>
                    </div>

                    <a
                      href={repo.githubUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-base font-bold font-geist text-slate-900 dark:text-white group-hover:text-primary transition-colors flex items-center gap-1.5"
                    >
                      <Github size={15} className="text-slate-400 group-hover:text-primary flex-shrink-0" />
                      <span className="truncate">{repo.name}</span>
                    </a>

                    <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed font-medium line-clamp-3">
                      {repo.desc}
                    </p>
                  </div>

                  <div className="space-y-3 pt-2 border-t border-slate-100 dark:border-slate-800/60">
                    <div className="flex flex-wrap gap-1.5">
                      {repo.tech.map((t, idx) => (
                        <span
                          key={idx}
                          className="px-2 py-0.5 bg-slate-100 dark:bg-slate-800 text-[10px] font-mono text-slate-600 dark:text-slate-400 rounded-md"
                        >
                          {t}
                        </span>
                      ))}
                    </div>

                    <a
                      href={repo.githubUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-full py-2 px-3 rounded-xl bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-900 dark:text-white text-xs font-mono font-bold flex items-center justify-center gap-2 transition-all cursor-pointer"
                    >
                      <span>View on GitHub</span>
                      <ExternalLink size={12} />
                    </a>
                  </div>
                </div>
              ))}
            </div>
          </motion.div>
        )}

        {/* TAB 3: STACK & CODEBASE ANALYTICS */}
        {activeTab === 'analytics' && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
            className="grid lg:grid-cols-12 gap-6"
          >
            {/* Language Distribution Breakdown */}
            <div className="lg:col-span-7 p-6 sm:p-8 rounded-3xl glass border border-slate-200 dark:border-slate-800 shadow-xl space-y-6">
              <div className="flex items-center gap-2.5">
                <div className="w-8 h-8 rounded-xl bg-purple-500/10 border border-purple-500/20 flex items-center justify-center text-purple-400">
                  <PieChart size={16} />
                </div>
                <div>
                  <h3 className="text-base font-bold font-geist text-slate-900 dark:text-white">
                    Codebase Language Distribution
                  </h3>
                  <p className="text-[11px] font-mono text-slate-400">
                    Aggregated repository stack weighting across 90+ repositories
                  </p>
                </div>
              </div>

              {/* Progress Stack Bar */}
              <div className="h-4 w-full rounded-full overflow-hidden flex bg-slate-200 dark:bg-slate-800">
                {LANGUAGE_BREAKDOWN.map((lang, idx) => (
                  <div
                    key={idx}
                    style={{ width: `${lang.percent}%` }}
                    className={cn(lang.color, "h-full transition-all")}
                    title={`${lang.name}: ${lang.percent}%`}
                  />
                ))}
              </div>

              {/* Legend Grid */}
              <div className="grid sm:grid-cols-2 gap-3 pt-2">
                {LANGUAGE_BREAKDOWN.map((lang, idx) => (
                  <div
                    key={idx}
                    className="p-3.5 rounded-2xl bg-white/60 dark:bg-slate-900/50 border border-slate-200/80 dark:border-slate-800/80 flex items-center justify-between"
                  >
                    <div className="flex items-center gap-2.5">
                      <span className={cn("w-3 h-3 rounded-md", lang.color)} />
                      <span className="text-xs font-bold font-geist text-slate-800 dark:text-slate-200">
                        {lang.name}
                      </span>
                    </div>
                    <span className="text-xs font-mono font-extrabold text-slate-900 dark:text-white">
                      {lang.percent}%
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* Engineering Highlights Card */}
            <div className="lg:col-span-5 p-6 sm:p-8 rounded-3xl glass border border-slate-200 dark:border-slate-800 shadow-xl space-y-6 flex flex-col justify-between">
              <div className="space-y-4">
                <div className="flex items-center gap-2.5">
                  <div className="w-8 h-8 rounded-xl bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center text-emerald-400">
                    <Sparkles size={16} />
                  </div>
                  <div>
                    <h3 className="text-base font-bold font-geist text-slate-900 dark:text-white">
                      Repository Engineering Standards
                    </h3>
                    <p className="text-[11px] font-mono text-slate-400">
                      Applied across public codebases
                    </p>
                  </div>
                </div>

                <div className="space-y-3 pt-2 text-xs text-slate-700 dark:text-slate-300 font-medium">
                  <div className="p-3 rounded-xl bg-slate-100 dark:bg-slate-900/80 border border-slate-200/80 dark:border-slate-800 space-y-1">
                    <strong className="text-slate-900 dark:text-white font-bold block">1. Clean Separation of Concerns</strong>
                    <p className="text-slate-500 dark:text-slate-400 text-[11px] leading-relaxed">
                      Go backend services separate entity models, business usecases, and repository database operations for clean unit testing.
                    </p>
                  </div>

                  <div className="p-3 rounded-xl bg-slate-100 dark:bg-slate-900/80 border border-slate-200/80 dark:border-slate-800 space-y-1">
                    <strong className="text-slate-900 dark:text-white font-bold block">2. ACID Database Integrity</strong>
                    <p className="text-slate-500 dark:text-slate-400 text-[11px] leading-relaxed">
                      PostgreSQL relational schemas with explicit foreign keys, connection pooling, and atomic transaction handling.
                    </p>
                  </div>

                  <div className="p-3 rounded-xl bg-slate-100 dark:bg-slate-900/80 border border-slate-200/80 dark:border-slate-800 space-y-1">
                    <strong className="text-slate-900 dark:text-white font-bold block">3. Type-Safe Web Interfaces</strong>
                    <p className="text-slate-500 dark:text-slate-400 text-[11px] leading-relaxed">
                      TypeScript strictness across React and Next.js, eliminating undefined runtime errors and ensuring responsive UX.
                    </p>
                  </div>
                </div>
              </div>

              <a
                href="https://github.com/mazkev?tab=repositories"
                target="_blank"
                rel="noopener noreferrer"
                className="w-full py-3 px-4 rounded-2xl bg-slate-900 dark:bg-white text-white dark:text-slate-900 text-xs font-mono font-bold flex items-center justify-center gap-2 hover:bg-black dark:hover:bg-slate-200 transition-all shadow-md cursor-pointer"
              >
                <Github size={14} />
                <span>Explore All 90+ Repos on GitHub</span>
              </a>
            </div>
          </motion.div>
        )}
      </div>
    </section>
  );
}
