'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { useTheme } from 'next-themes';
import { Moon, Sun, Menu, X, Terminal, Search } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { cn } from '@/app/lib/utils';

const navLinks = [
  { name: 'About', href: '#about' },
  { name: 'Projects', href: '#projects' },
  { name: 'Contact', href: '#contact' },
];

export default function Navbar() {
  const [mounted, setMounted] = useState(false);
  const { setTheme, resolvedTheme } = useTheme();
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handle = requestAnimationFrame(() => {
      setMounted(true);
    });
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => {
      cancelAnimationFrame(handle);
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  const toggleTheme = (e: React.MouseEvent) => {
    const nextTheme = resolvedTheme === 'dark' ? 'light' : 'dark';
    
    document.documentElement.style.setProperty('--click-x', `${e.clientX}px`);
    document.documentElement.style.setProperty('--click-y', `${e.clientY}px`);
    
    if ('startViewTransition' in document) {
      (document as unknown as { startViewTransition: (cb: () => void) => void }).startViewTransition(() => {
        setTheme(nextTheme);
      });
    } else {
      setTheme(nextTheme);
    }
  };

  if (!mounted) return null;

  return (
    <nav
      className={cn(
        'fixed top-0 left-0 right-0 z-50 transition-all duration-300 px-6 py-4',
        scrolled ? 'bg-white/80 dark:bg-slate-950/80 backdrop-blur-lg shadow-md' : 'bg-transparent'
      )}
    >
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        <Link href="/" className="flex items-center gap-2 group">
          <div className="w-10 h-10 bg-brand-600 rounded-xl flex items-center justify-center text-white group-hover:rotate-12 transition-transform duration-300">
            <Terminal size={24} />
          </div>
          <span className="text-xl font-bold font-outfit tracking-tight">
            Mazkev<span className="text-brand-600">.</span>
          </span>
        </Link>

        {/* Desktop Nav */}
        <div className="hidden md:flex items-center gap-8">
          {navLinks.map((link) => (
            <Link
              key={link.name}
              href={link.href}
              className="text-sm font-medium hover:text-brand-600 transition-colors"
            >
              {link.name}
            </Link>
          ))}
          <button
            onClick={() => window.dispatchEvent(new CustomEvent('toggle-command-palette'))}
            className="p-2 rounded-lg bg-slate-100 dark:bg-slate-800 hover:ring-2 ring-brand-500 transition-all cursor-pointer text-slate-500 dark:text-slate-400 hover:text-brand-600 dark:hover:text-brand-400 mr-1"
            title="Command Palette (Ctrl+K)"
          >
            <Search size={20} />
          </button>
          <button
            onClick={toggleTheme}
            className="p-2 rounded-lg bg-slate-100 dark:bg-slate-800 hover:ring-2 ring-brand-500 transition-all cursor-pointer"
          >
            {resolvedTheme === 'dark' ? <Sun size={20} /> : <Moon size={20} />}
          </button>
        </div>

        {/* Mobile Nav Toggle */}
        <div className="md:hidden flex items-center gap-2">
          <button
            onClick={() => window.dispatchEvent(new CustomEvent('toggle-command-palette'))}
            className="p-2 rounded-lg bg-slate-100 dark:bg-slate-800 cursor-pointer text-slate-500 dark:text-slate-400"
            title="Command Palette"
          >
            <Search size={20} />
          </button>
          <button
            onClick={toggleTheme}
            className="p-2 rounded-lg bg-slate-100 dark:bg-slate-800 cursor-pointer"
          >
            {resolvedTheme === 'dark' ? <Sun size={20} /> : <Moon size={20} />}
          </button>
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="p-2 text-slate-600 dark:text-slate-300"
          >
            {isOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="absolute top-full left-0 right-0 bg-white dark:bg-slate-900 border-b border-slate-200 dark:border-slate-800 p-6 md:hidden"
          >
            <div className="flex flex-col gap-4">
              {navLinks.map((link) => (
                <Link
                  key={link.name}
                  href={link.href}
                  onClick={() => setIsOpen(false)}
                  className="text-lg font-medium py-2 border-b border-slate-100 dark:border-slate-800"
                >
                  {link.name}
                </Link>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}
