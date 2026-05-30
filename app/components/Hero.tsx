'use client';

import React, { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, Download, Terminal as TerminalIcon, Send } from 'lucide-react';
import { cn } from '@/app/lib/utils';
import Image from 'next/image';
import InteractiveMesh from './InteractiveMesh';
import ResumeViewer from './ResumeViewer';

interface TerminalLine {
  text: string;
  type: 'input' | 'output' | 'error' | 'success';
}

function HeroTerminal() {
  const [mounted, setMounted] = useState(false);
  const [history, setHistory] = useState<TerminalLine[]>([
    { text: 'guest-login', type: 'input' },
    { text: 'Access Granted! Secure session initialized.', type: 'success' },
    { text: "Welcome to Mazkev CLI. Type 'help' to see list of active commands.", type: 'output' },
  ]);
  const [inputValue, setInputValue] = useState('');
  const historyRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handle = requestAnimationFrame(() => {
      setMounted(true);
    });
    return () => cancelAnimationFrame(handle);
  }, []);

  useEffect(() => {
    if (historyRef.current) {
      historyRef.current.scrollTop = historyRef.current.scrollHeight;
    }
  }, [history]);

  if (!mounted) {
    return (
      <div className="glass bg-slate-950/90 text-slate-400 font-mono text-xs rounded-2xl overflow-hidden shadow-2xl border border-slate-800/80 h-96 flex items-center justify-center">
        <div className="w-6 h-6 border-2 border-brand-600/30 border-t-brand-600 rounded-full animate-spin" />
      </div>
    );
  }

  const handleCommand = (e: React.FormEvent) => {
    e.preventDefault();
    const command = inputValue.trim();
    if (!command) return;

    const newHistory = [...history, { text: `guest@mazkev-terminal:~$ ${command}`, type: 'input' as const }];
    const cmdLower = command.toLowerCase();

    let replyText = '';
    let replyType: 'output' | 'error' | 'success' = 'output';

    if (cmdLower === 'help') {
      replyText = `Available commands:
  • about    - Professional overview
  • skills   - Technical stacks
  • projects - Core project works
  • contact  - Email, LinkedIn and GitHub handles
  • clear    - Clear terminal history
  • sudo     - System admin override
  (Try 'projects go [name]' to open a project live demo!)`;
    } else if (cmdLower === 'about') {
      replyText = `Kevin Eka Pratama is a Front end Engineer with fullstack experience. Specializes in React, Next.js, and writing clean, maintainable code.`;
      replyType = 'success';
    } else if (cmdLower === 'skills') {
      replyText = `--- TECHNICAL MATRIX ---
  • Frontend: Next.js, React, TypeScript, Tailwind CSS, Vue
  • Backend:  Laravel, Node.js, PHP, PostgreSQL, MySQL
  • DevOps:   Docker, AWS, Vercel, Firebase`;
    } else if (cmdLower === 'projects') {
      replyText = `--- FEATURED PROJECTS ---
  • semarketplace - E-commerce transaction engine
  • indofooty     - Sports statistics dashboard
  • streamx       - Video-on-demand platform mockup
  • twitter       - Social media dashboard clone
  • airbnb        - Travel rental platform mockup
  • maztube       - Video sharing platform demo
  (Type e.g., 'projects go semarketplace' to visit live site!)`;
    } else if (cmdLower.startsWith('projects go ')) {
      const proj = cmdLower.substring(12).trim();
      const urls: Record<string, string> = {
        semarketplace: 'https://semarketplace.vercel.app/',
        indofooty: 'https://indofooty.vercel.app/',
        streamx: 'https://netflix-asli.vercel.app/',
        twitter: 'https://twitter-clonex1.vercel.app/',
        airbnb: 'https://airbnb-clonex.vercel.app/',
        maztube: 'https://maztube.vercel.app/',
      };
      if (urls[proj]) {
        try {
          window.open(urls[proj], '_blank');
          replyText = `Redirecting to ${proj} live demo in a new tab...`;
          replyType = 'success';
        } catch {
          replyText = `Browser blocked popup. URL: ${urls[proj]}`;
          replyType = 'error';
        }
      } else {
        replyText = `Unknown project '${proj}'. Available: semarketplace, indofooty, streamx, twitter, airbnb, maztube`;
        replyType = 'error';
      }
    } else if (cmdLower === 'contact') {
      replyText = `--- CONNECT CHANNELS ---
  • Email:    kevinekapratama@gmail.com
  • GitHub:   github.com/mazkev
  • LinkedIn: linkedin.com/in/mazkev`;
    } else if (cmdLower === 'clear') {
      setHistory([]);
      setInputValue('');
      return;
    } else if (cmdLower.startsWith('sudo')) {
      if (cmdLower === 'sudo rm -rf /') {
        replyText = `Permission Denied: System protection active. This incident has been logged and reported to the system administrator.`;
        replyType = 'error';
      } else {
        replyText = `sudo: password required for guest. Authorization failed.`;
        replyType = 'error';
      }
    } else {
      replyText = `Command not found: '${command}'. Type 'help' to see list of valid commands.`;
      replyType = 'error';
    }

    setHistory([...newHistory, { text: replyText, type: replyType }]);
    setInputValue('');
  };

  return (
    <div className="glass bg-slate-950/90 text-slate-300 font-mono text-[11px] rounded-2xl overflow-hidden shadow-2xl border border-slate-800/80 h-96 flex flex-col">
      {/* Terminal Titlebar */}
      <div className="bg-slate-900 px-4 py-3 flex items-center justify-between border-b border-slate-800/60 select-none flex-shrink-0">
        <div className="flex items-center gap-2">
          <div className="w-3.5 h-3.5 rounded-full bg-[#ff5f56] flex items-center justify-center text-[8px]" />
          <div className="w-3.5 h-3.5 rounded-full bg-[#ffbd2e]" />
          <div className="w-3.5 h-3.5 rounded-full bg-[#27c93f]" />
        </div>
        <span className="text-slate-500 font-bold text-[9px] flex items-center gap-1.5">
          <TerminalIcon size={12} className="text-slate-600" />
          guest@mazkev-terminal: ~
        </span>
        <div className="w-10 h-1" />
      </div>

      {/* Terminal Screen History */}
      <div 
        ref={historyRef}
        className="flex-grow p-4 overflow-y-auto space-y-2.5 scrollbar-thin scrollbar-thumb-slate-800 scrollbar-track-transparent leading-relaxed"
      >
        {history.map((line, idx) => (
          <div 
            key={idx} 
            className={cn(
              "whitespace-pre-wrap break-all",
              line.type === 'input' && "text-brand-400 font-bold",
              line.type === 'success' && "text-emerald-400",
              line.type === 'error' && "text-rose-400 font-medium"
            )}
          >
            {line.text}
          </div>
        ))}
      </div>

      {/* Terminal Input Form */}
      <form 
        onSubmit={handleCommand}
        className="bg-slate-900/60 border-t border-slate-800/60 px-4 py-3 flex items-center gap-2 flex-shrink-0"
      >
        <span className="text-brand-500 font-extrabold select-none">$</span>
        <input
          type="text"
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          placeholder="Type a command (e.g. 'help')..."
          className="flex-grow bg-transparent border-0 outline-none text-slate-200 placeholder-slate-600 focus:ring-0 focus:outline-none py-0.5"
          autoFocus
        />
        <button 
          type="submit" 
          className="p-1.5 rounded-lg bg-slate-800 text-slate-400 hover:text-white hover:bg-slate-700 transition-colors cursor-pointer"
        >
          <Send size={12} />
        </button>
      </form>
    </div>
  );
}

export default function Hero() {
  const [isResumeOpen, setIsResumeOpen] = useState(false);

  useEffect(() => {
    const handleOpenResume = () => setIsResumeOpen(true);
    window.addEventListener('open-resume', handleOpenResume);
    return () => window.removeEventListener('open-resume', handleOpenResume);
  }, []);

  return (
    <section className="relative min-h-screen flex items-center justify-center pt-20 overflow-hidden bg-grid">
      {/* Dynamic Interactive Mesh Background & Decorative Blur Orbs */}
      <div className="no-print">
        <InteractiveMesh />
        <div className="absolute top-1/4 -left-20 w-72 h-72 bg-brand-600/30 rounded-full blur-[128px]" />
        <div className="absolute bottom-1/4 -right-20 w-96 h-96 bg-sky-600/20 rounded-full blur-[128px]" />
      </div>

      <div className="max-w-7xl mx-auto px-6 grid md:grid-cols-2 gap-12 items-center relative z-10 no-print">
        <motion.div
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8 }}
        >
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-brand-100 dark:bg-brand-900/30 text-brand-600 dark:text-brand-400 text-sm font-semibold mb-6 border border-brand-200 dark:border-brand-800">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-brand-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-brand-500"></span>
            </span>
            Available for new projects
          </div>
          
          <h1 className="text-4xl sm:text-5xl md:text-7xl font-bold font-outfit leading-tight mb-6">
            Building web apps that <span className="text-gradient">just work.</span>
          </h1>
          
          <p className="text-lg md:text-xl text-slate-600 dark:text-slate-400 mb-10 max-w-lg leading-relaxed">
            Hi, I'm Kevin. I'm a Front end Engineer specializing in React, Next.js, and Laravel. I focus on writing clean code and shipping fast, reliable products.
          </p>
          
          <div className="flex flex-wrap gap-4 mb-10">
            <motion.a
              href="#projects"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="px-8 py-4 bg-brand-600 text-white rounded-2xl font-bold flex items-center gap-2 shadow-lg shadow-brand-600/20 hover:bg-brand-700 transition-all cursor-pointer"
            >
              View Projects <ArrowRight size={20} />
            </motion.a>
            
            <motion.button
              onClick={() => setIsResumeOpen(true)}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="px-8 py-4 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl font-bold flex items-center gap-2 hover:bg-slate-50 dark:hover:bg-slate-800 transition-all shadow-sm cursor-pointer text-slate-800 dark:text-slate-200"
            >
              View Resume / CV <Download size={20} />
            </motion.button>
          </div>

          <div className="flex items-center gap-6 pt-4 border-t border-slate-100 dark:border-slate-800">
            <span className="text-xs font-bold uppercase tracking-widest text-slate-400">Tech Stack |</span>
            <div className="flex gap-4 items-center">
              {['nextdotjs', 'react', 'laravel', 'tailwindcss', 'typescript'].map((icon) => (
                <Image 
                  key={icon} 
                  src={`https://cdn.simpleicons.org/${icon}`} 
                  alt={icon} 
                  width={20}
                  height={20}
                  priority
                  unoptimized
                  className="h-5 w-5 opacity-40 hover:opacity-100 transition-opacity grayscale hover:grayscale-0" 
                />
              ))}
            </div>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.8, rotate: 5 }}
          animate={{ opacity: 1, scale: 1, rotate: 0 }}
          transition={{ duration: 1, delay: 0.2 }}
          className="relative hidden md:block"
        >
          <HeroTerminal />
          
          {/* Decorative absolute element */}
          <div className="absolute -bottom-6 -right-6 w-32 h-32 bg-sky-500/10 rounded-full blur-2xl pointer-events-none" />
        </motion.div>
      </div>

      <ResumeViewer isOpen={isResumeOpen} onClose={() => setIsResumeOpen(false)} />
    </section>
  );
}
