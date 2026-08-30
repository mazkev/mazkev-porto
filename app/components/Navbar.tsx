'use client';

import React, { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import { useTheme } from 'next-themes';
import { Moon, Sun, Menu, X, Terminal } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const navLinks = [
  { name: 'About', href: '#about' },
  { name: 'Exp', href: '#experience' },
  { name: 'Work', href: '#projects' },
  { name: 'Activity', href: '#github-activity' },
  { name: 'Contact', href: '#contact' },
];

export default function Navbar() {
  const [mounted, setMounted] = useState(false);
  const { setTheme, resolvedTheme } = useTheme();
  const [isOpen, setIsOpen] = useState(false);
  
  useEffect(() => {
    setMounted(true);
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

  const handleMagneticMove = (e: React.MouseEvent<HTMLElement>) => {
    const btn = e.currentTarget;
    const rect = btn.getBoundingClientRect();
    const mx = (e.clientX - rect.left - rect.width / 2) * 0.4;
    const my = (e.clientY - rect.top - rect.height / 2) * 0.4;
    btn.style.transition = 'none';
    btn.style.transform = `translate3d(${mx}px, ${my}px, 0)`;
  };

  const handleMagneticLeave = (e: React.MouseEvent<HTMLElement>) => {
    const btn = e.currentTarget;
    btn.style.transition = 'transform 0.3s cubic-bezier(0.16, 1, 0.3, 1)';
    btn.style.transform = `translate3d(0, 0, 0)`;
  };

  if (!mounted) return null;

  return (
    <header className="fixed top-0 w-full z-50 glass h-20 no-print print:hidden">
      <div className="container-max flex justify-between items-center h-full px-6">
        <Link href="#hero" className="text-xl font-black text-primary tracking-tighter flex items-center gap-2">
          <Terminal size={24} /> MAZKEV
        </Link>

        <nav className="hidden md:flex items-center gap-10">
          {navLinks.map((link) => (
            <Link
              key={link.name}
              href={link.href}
              className="nav-link text-xs font-bold uppercase tracking-widest text-slate-500 hover:text-primary transition-all"
            >
              {link.name}
            </Link>
          ))}
        </nav>

        <div className="hidden md:flex items-center gap-4">
          <button
            onClick={toggleTheme}
            onMouseMove={handleMagneticMove}
            onMouseLeave={handleMagneticLeave}
            className="m-btn p-2 rounded-full hover:bg-slate-100 dark:hover:bg-white/10 transition-all cursor-pointer"
            aria-label="Toggle theme"
          >
            {resolvedTheme === 'dark' ? (
              <Sun size={20} className="text-gray-300" />
            ) : (
              <Moon size={20} className="text-gray-500" />
            )}
          </button>

          <button
            onMouseMove={handleMagneticMove}
            onMouseLeave={handleMagneticLeave}
            onClick={() => window.dispatchEvent(new CustomEvent('open-resume'))}
            className="m-btn border-2 border-primary/20 hover:border-primary text-primary px-7 py-2.5 rounded-full text-xs font-black uppercase transition-all cursor-pointer"
          >
            Resume
          </button>
        </div>

        {/* Mobile Nav Toggle */}
        <div className="md:hidden flex items-center gap-4">
          <button
            onClick={toggleTheme}
            className="p-2 rounded-full hover:bg-slate-100 dark:hover:bg-white/10 transition-all cursor-pointer"
          >
            {resolvedTheme === 'dark' ? <Sun size={20} className="text-gray-300"/> : <Moon size={20} className="text-gray-500"/>}
          </button>
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="text-slate-600 dark:text-slate-300"
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
            className="absolute top-full left-0 right-0 bg-white dark:bg-slate-900 border-b border-slate-200 dark:border-slate-800 p-6 md:hidden glass"
          >
            <div className="flex flex-col gap-4">
              {navLinks.map((link) => (
                <Link
                  key={link.name}
                  href={link.href}
                  onClick={() => setIsOpen(false)}
                  className="text-sm font-bold uppercase tracking-widest py-2 border-b border-slate-100 dark:border-slate-800 text-slate-500 hover:text-primary transition-all"
                >
                  {link.name}
                </Link>
              ))}
              <button
                onClick={() => {
                  setIsOpen(false);
                  window.dispatchEvent(new CustomEvent('open-resume'));
                }}
                className="text-sm font-bold uppercase tracking-widest py-2 text-primary text-left"
              >
                Resume
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
