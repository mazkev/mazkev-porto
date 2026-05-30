'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { Home, User, Briefcase, Mail } from 'lucide-react';
import { cn } from '@/app/lib/utils';

const navItems = [
  { name: 'Home', href: '#', icon: Home },
  { name: 'About', href: '#about', icon: User },
  { name: 'Projects', href: '#projects', icon: Briefcase },
  { name: 'Contact', href: '#contact', icon: Mail },
];

export default function MobileNav() {
  const [active, setActive] = useState('Home');
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    
    const handleScroll = () => {
      const sections = navItems.map(item => item.href.replace('#', ''));
      const scrollPosition = window.scrollY + 200;

      for (let i = sections.length - 1; i >= 0; i--) {
        const sectionId = sections[i];
        if (!sectionId) continue;
        
        const section = document.getElementById(sectionId);
        if (section && section.offsetTop <= scrollPosition) {
          setActive(navItems[i].name);
          return;
        }
      }
      if (window.scrollY < 200) {
        setActive('Home');
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  if (!mounted) return null;

  return (
    <div className="fixed bottom-6 left-1/2 -translate-x-1/2 z-50 md:hidden no-print w-[calc(100%-3rem)] max-w-[24rem]">
      <div className="glass flex items-center justify-between px-6 py-2.5 rounded-3xl shadow-2xl shadow-brand-600/10 border border-slate-200/50 dark:border-slate-800/60 bg-white/80 dark:bg-slate-900/80 backdrop-blur-xl">
        {navItems.map((item) => {
          const isActive = active === item.name;
          return (
            <Link
              key={item.name}
              href={item.href}
              onClick={() => setActive(item.name)}
              className={cn(
                "flex flex-col items-center gap-1 p-2 transition-all duration-300 relative",
                isActive ? "text-brand-600 dark:text-brand-400 scale-110" : "text-slate-500 hover:text-slate-900 dark:hover:text-slate-300"
              )}
            >
              <item.icon size={20} strokeWidth={isActive ? 2.5 : 2} />
              <span className="text-[10px] font-bold tracking-wide">{item.name}</span>
              {isActive && (
                <span className="absolute -bottom-1.5 w-1 h-1 rounded-full bg-brand-600 dark:bg-brand-400" />
              )}
            </Link>
          );
        })}
      </div>
    </div>
  );
}
