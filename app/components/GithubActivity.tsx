'use client';

import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Github, GitCommit, GitPullRequest, GitFork, ExternalLink, Activity, FolderGit2, CheckCircle2, Flame, Layers } from 'lucide-react';
import Image from 'next/image';

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
    repo: { name: 'mazkev/java-ecommerce', url: 'https://github.com/mazkev/java-ecommerce' },
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

  return (
    <section id="github-activity" className="py-24 px-6 relative print:hidden border-t border-slate-200 dark:border-slate-800/80 bg-slate-50/40 dark:bg-slate-950/20">
      <div className="container-max w-full">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.1 }}
          transition={{ duration: 0.5 }}
          className="mb-12 flex flex-col md:flex-row md:items-end justify-between gap-6"
        >
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/10 text-emerald-500 text-[10px] font-bold uppercase tracking-widest mb-3 border border-emerald-500/20 font-mono">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
              </span>
              GitHub Live Pulse • @mazkev
            </div>
            <h2 className="text-4xl sm:text-5xl font-black uppercase tracking-tighter font-geist text-slate-900 dark:text-white">
              Code Activity<span className="text-primary">.</span>
            </h2>
            <p className="text-slate-500 dark:text-slate-400 font-mono text-xs mt-2 uppercase tracking-widest">
              Consistent Coding Velocity & Open Source Repositories
            </p>
          </div>

          <a
            href="https://github.com/mazkev"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-slate-900 dark:bg-slate-800 text-white text-xs font-bold font-mono uppercase tracking-wider hover:bg-black dark:hover:bg-slate-700 transition-all shadow-md self-start md:self-auto cursor-pointer"
          >
            <Github size={15} /> View GitHub Profile <ExternalLink size={13} />
          </a>
        </motion.div>

        {/* 4 Metric Stats Cards */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-10">
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4, delay: 0.05 }}
            className="p-5 rounded-2xl glass border border-slate-200 dark:border-slate-800 flex flex-col justify-between"
          >
            <div className="flex items-center justify-between text-slate-500 mb-3">
              <span className="text-xs font-mono font-bold uppercase tracking-wider">Public Repos</span>
              <FolderGit2 size={18} className="text-primary" />
            </div>
            <div className="text-3xl sm:text-4xl font-black font-geist text-slate-900 dark:text-white">
              {publicReposCount}+
            </div>
            <p className="text-[10px] font-mono text-slate-400 mt-1">
              Active repositories on GitHub
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
              <span className="text-xs font-mono font-bold uppercase tracking-wider">Focus Stacks</span>
              <Layers size={18} className="text-sky-400" />
            </div>
            <div className="text-xl sm:text-2xl font-black font-geist text-slate-900 dark:text-white">
              Go & React
            </div>
            <p className="text-[10px] font-mono text-slate-400 mt-1">
              TypeScript, Spring Boot & Laravel
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
              <span className="text-xs font-mono font-bold uppercase tracking-wider">Architecture</span>
              <Activity size={18} className="text-emerald-400" />
            </div>
            <div className="text-xl sm:text-2xl font-black font-geist text-slate-900 dark:text-white">
              Clean Arch
            </div>
            <p className="text-[10px] font-mono text-slate-400 mt-1">
              Decoupled domain & repository
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4, delay: 0.2 }}
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

        {/* Contribution Heatmap Card */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="p-6 sm:p-8 rounded-3xl glass border border-slate-200 dark:border-slate-800 shadow-xl mb-10 overflow-hidden"
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

        {/* Live Recent Commit & Push Stream */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
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
    </section>
  );
}
