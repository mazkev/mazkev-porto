'use client';

import React, { useEffect, useState, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Terminal, Sun, Moon, FileText, ArrowRight, CornerDownLeft, Layers, Mail, User, ShieldAlert } from 'lucide-react';
import { useTheme } from 'next-themes';

interface CommandItem {
  id: string;
  name: string;
  category: string;
  description: string;
  icon: React.ComponentType<{ size?: number; className?: string }>;
  action: () => void;
  shortcut?: string[];
}

export default function CommandPalette() {
  const [mounted, setMounted] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [search, setSearch] = useState('');
  const [selectedIndex, setSelectedIndex] = useState(0);
  const { resolvedTheme, setTheme } = useTheme();
  const inputRef = useRef<HTMLInputElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handle = requestAnimationFrame(() => {
      setMounted(true);
    });
    return () => cancelAnimationFrame(handle);
  }, []);

  // Toggle Command Palette visibility
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault();
        setIsOpen((prev) => !prev);
      } else if (e.key === 'Escape') {
        setIsOpen(false);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  // Listen to custom toggle events from Navbar or CLI
  useEffect(() => {
    const handleToggle = () => setIsOpen((prev) => !prev);
    window.addEventListener('toggle-command-palette', handleToggle);
    return () => window.removeEventListener('toggle-command-palette', handleToggle);
  }, []);

  // Focus input when opened
  useEffect(() => {
    if (isOpen) {
      const handle = requestAnimationFrame(() => {
        setSearch('');
        setSelectedIndex(0);
      });
      // Short delay for animation to complete before focus
      const timer = setTimeout(() => {
        inputRef.current?.focus();
      }, 100);
      return () => {
        cancelAnimationFrame(handle);
        clearTimeout(timer);
      };
    }
  }, [isOpen]);

  const handleScrollTo = (id: string) => {
    setIsOpen(false);
    // Short timeout to let palette close animation finish
    setTimeout(() => {
      const el = document.getElementById(id);
      if (el) {
        el.scrollIntoView({ behavior: 'smooth' });
      }
    }, 150);
  };

  const triggerCustomEvent = (eventName: string, detail?: string) => {
    setIsOpen(false);
    setTimeout(() => {
      window.dispatchEvent(detail ? new CustomEvent(eventName, { detail }) : new CustomEvent(eventName));
    }, 150);
  };

  const commands: CommandItem[] = [
    {
      id: 'theme',
      name: 'Toggle Dark/Light Theme',
      category: 'System',
      description: 'Switch between light and dark modes instantly.',
      icon: resolvedTheme === 'dark' ? Sun : Moon,
      action: () => setTheme(resolvedTheme === 'dark' ? 'light' : 'dark'),
      shortcut: ['T'],
    },
    {
      id: 'resume',
      name: 'Open Resume / CV Drawer',
      category: 'Resume',
      description: 'Slide open work history, skills matrix and print layouts.',
      icon: FileText,
      action: () => triggerCustomEvent('open-resume'),
      shortcut: ['R'],
    },
    {
      id: 'nav-about',
      name: 'Go to About / Journey',
      category: 'Navigation',
      description: 'Scroll to education, profile stats, and history.',
      icon: User,
      action: () => handleScrollTo('about'),
    },
    {
      id: 'nav-projects',
      name: 'Go to Selected Projects',
      category: 'Navigation',
      description: 'Scroll to development highlights.',
      icon: Layers,
      action: () => handleScrollTo('projects'),
    },
    {
      id: 'nav-contact',
      name: 'Go to Contact Form',
      category: 'Navigation',
      description: 'Scroll to the Formspree connection box.',
      icon: Mail,
      action: () => handleScrollTo('contact'),
    },
    {
      id: 'project-semarketplace',
      name: 'Semarketplace Pro Case Study',
      category: 'Projects',
      description: 'Open technical details for e-commerce checkouts.',
      icon: ArrowRight,
      action: () => triggerCustomEvent('open-project', 'Semarketplace Pro'),
    },
    {
      id: 'project-indofooty',
      name: 'Indofooty Hub Case Study',
      category: 'Projects',
      description: 'Open details for live WebSockets feeds.',
      icon: ArrowRight,
      action: () => triggerCustomEvent('open-project', 'Indofooty Hub'),
    },
    {
      id: 'project-streamx',
      name: 'StreamX Cinema Case Study',
      category: 'Projects',
      description: 'Open structural breakdown for VOD backdrop blur.',
      icon: ArrowRight,
      action: () => triggerCustomEvent('open-project', 'StreamX: Cinema Reimagined'),
    },
    {
      id: 'project-mazchat',
      name: 'MazChat Real-time Case Study',
      category: 'Projects',
      description: 'Open snapshot connection logic details.',
      icon: ArrowRight,
      action: () => triggerCustomEvent('open-project', 'MazChat: Real-time Messaging'),
    },
    {
      id: 'project-instavision',
      name: 'Instavision Social Case Study',
      category: 'Projects',
      description: 'Open image compression and security configurations.',
      icon: ArrowRight,
      action: () => triggerCustomEvent('open-project', 'Instavision: Social Media Clone'),
    },
    {
      id: 'project-insightflow',
      name: 'InsightFlow Publishing Case Study',
      category: 'Projects',
      description: 'Open details on static parameter routing layouts.',
      icon: ArrowRight,
      action: () => triggerCustomEvent('open-project', 'InsightFlow: Modern Publishing'),
    },
  ];

  // Filter commands based on search
  const filteredCommands = commands.filter((cmd) => {
    const searchLower = search.toLowerCase();
    return (
      cmd.name.toLowerCase().includes(searchLower) ||
      cmd.category.toLowerCase().includes(searchLower) ||
      cmd.description.toLowerCase().includes(searchLower)
    );
  });

  // Handle keyboard navigation inside the palette
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (!isOpen) return;

      if (e.key === 'ArrowDown') {
        e.preventDefault();
        setSelectedIndex((prev) => (prev + 1) % filteredCommands.length);
      } else if (e.key === 'ArrowUp') {
        e.preventDefault();
        setSelectedIndex((prev) => (prev - 1 + filteredCommands.length) % filteredCommands.length);
      } else if (e.key === 'Enter') {
        e.preventDefault();
        if (filteredCommands[selectedIndex]) {
          filteredCommands[selectedIndex].action();
        }
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, selectedIndex, filteredCommands]);

  // Click outside listener
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(e.target as Node)) {
        setIsOpen(false);
      }
    };
    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [isOpen]);

  if (!mounted) return null;

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 bg-slate-950/60 backdrop-blur-sm z-9999 flex items-start justify-center pt-24 px-4 select-none">
          <motion.div
            ref={containerRef}
            initial={{ opacity: 0, scale: 0.95, y: -20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: -20 }}
            transition={{ type: 'spring', damping: 25, stiffness: 350 }}
            className="glass max-w-xl w-full rounded-3xl border border-slate-200/60 dark:border-slate-800/80 shadow-2xl overflow-hidden flex flex-col"
          >
            {/* Header search bar */}
            <div className="flex items-center gap-3 px-6 py-4 border-b border-slate-200/60 dark:border-slate-800/50 bg-slate-50/50 dark:bg-slate-950/30">
              <Terminal size={18} className="text-brand-500" />
              <input
                ref={inputRef}
                type="text"
                value={search}
                onChange={(e) => {
                  setSearch(e.target.value);
                  setSelectedIndex(0);
                }}
                placeholder="Type a command or search..."
                className="flex-grow bg-transparent border-none outline-none font-mono text-sm text-slate-800 dark:text-slate-200 placeholder-slate-400 dark:placeholder-slate-500"
              />
              <div className="px-2 py-1 rounded bg-slate-100 dark:bg-slate-800 text-[10px] font-mono font-bold text-slate-400 border border-slate-200/40 dark:border-slate-700/40">
                ESC
              </div>
            </div>

            {/* List items */}
            <div className="max-h-[360px] overflow-y-auto p-2 space-y-1">
              {filteredCommands.length > 0 ? (
                filteredCommands.map((cmd, idx) => {
                  const isSelected = idx === selectedIndex;
                  const Icon = cmd.icon;
                  return (
                    <button
                      key={cmd.id}
                      onClick={() => cmd.action()}
                      onMouseEnter={() => setSelectedIndex(idx)}
                      className={`w-full p-3 rounded-2xl flex items-center justify-between text-left transition-all duration-150 border cursor-pointer ${
                        isSelected
                          ? 'bg-brand-600/10 border-brand-500/30 dark:bg-brand-500/10 text-brand-600 dark:text-brand-400'
                          : 'bg-transparent border-transparent text-slate-700 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-900/50'
                      }`}
                    >
                      <div className="flex items-center gap-3 min-w-0">
                        <div className={`p-2 rounded-xl border flex-shrink-0 transition-colors ${
                          isSelected 
                            ? 'bg-brand-600 dark:bg-brand-500 text-white border-transparent' 
                            : 'bg-slate-50 dark:bg-slate-900 border-slate-200/40 dark:border-slate-800/40 text-slate-400'
                        }`}>
                          <Icon size={16} />
                        </div>
                        <div className="min-w-0">
                          <div className="text-xs font-bold font-outfit truncate">{cmd.name}</div>
                          <div className="text-[10px] text-slate-400 dark:text-slate-500 truncate mt-0.5">{cmd.description}</div>
                        </div>
                      </div>

                      <div className="flex items-center gap-2 flex-shrink-0">
                        <span className="text-[9px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-md bg-slate-100 dark:bg-slate-900 border border-slate-200/40 dark:border-slate-800/60 text-slate-400 font-mono">
                          {cmd.category}
                        </span>
                        {isSelected && (
                          <CornerDownLeft size={12} className="text-brand-500 animate-pulse" />
                        )}
                      </div>
                    </button>
                  );
                })
              ) : (
                <div className="p-8 text-center text-slate-400 flex flex-col items-center gap-2">
                  <ShieldAlert size={24} className="text-amber-500" />
                  <span className="text-xs font-mono">No matching commands found.</span>
                </div>
              )}
            </div>

            {/* Footer */}
            <div className="px-6 py-3 border-t border-slate-200/40 dark:border-slate-800/40 bg-slate-50/20 dark:bg-slate-950/20 flex items-center justify-between text-[10px] text-slate-400 font-mono">
              <div className="flex items-center gap-4">
                <span>↑↓ to navigate</span>
                <span>Enter to select</span>
              </div>
              <div className="flex items-center gap-1.5">
                <span>Toggle with</span>
                <kbd className="px-1.5 py-0.5 rounded bg-slate-100 dark:bg-slate-900 border border-slate-200/50 dark:border-slate-800/60 font-bold text-[9px]">Ctrl+K</kbd>
              </div>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
