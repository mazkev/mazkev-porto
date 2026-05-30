'use client';

import React from 'react';
import { motion } from 'framer-motion';
import Image from 'next/image';

const techLogos = [
  { name: 'Next.js', icon: 'nextdotjs' },
  { name: 'React', icon: 'react' },
  { name: 'TypeScript', icon: 'typescript' },
  { name: 'Tailwind', icon: 'tailwindcss' },
  { name: 'Laravel', icon: 'laravel' },
  { name: 'PostgreSQL', icon: 'postgresql' },
  { name: 'Docker', icon: 'docker' },
  { name: 'AWS', icon: '/aws.svg' },
  { name: 'Framer', icon: 'framer' },
  { name: 'Node.js', icon: 'nodedotjs' },
  { name: 'Prisma', icon: 'prisma' },
  { name: 'Redis', icon: 'redis' },
];

export default function LogoMarquee() {
  // Duplicate the list to create a seamless loop
  const duplicatedLogos = [...techLogos, ...techLogos];

  return (
    <section className="py-12 bg-white dark:bg-slate-950 overflow-hidden relative border-y border-slate-100 dark:border-slate-900 no-print">
      {/* Masking for fading edges */}
      <div className="absolute inset-y-0 left-0 w-32 bg-gradient-to-r from-white dark:from-slate-950 to-transparent z-10" />
      <div className="absolute inset-y-0 right-0 w-32 bg-gradient-to-l from-white dark:from-slate-950 to-transparent z-10" />

      <div className="max-w-7xl mx-auto px-6 mb-8 text-center">
        <span className="text-[10px] font-bold uppercase tracking-[0.3em] text-slate-400 dark:text-slate-500">
          Empowering digital experiences with modern technologies
        </span>
      </div>

      <div className="flex select-none">
        <motion.div
          animate={{
            x: [0, -100 * techLogos.length],
          }}
          transition={{
            duration: 30,
            repeat: Infinity,
            ease: "linear",
          }}
          className="flex gap-12 md:gap-24 items-center"
        >
          {duplicatedLogos.map((logo, index) => (
            <div
              key={`${logo.name}-${index}`}
              className="flex items-center gap-3 group transition-all duration-300"
            >
              <Image
                src={logo.icon.startsWith('/') ? logo.icon : `https://cdn.simpleicons.org/${logo.icon}`}
                alt={logo.name}
                width={40}
                height={40}
                priority={index < 8}
                unoptimized
                className="h-8 w-8 md:h-10 md:w-10 grayscale opacity-40 group-hover:grayscale-0 group-hover:opacity-100 transition-all duration-300"
              />
              <span className="text-sm md:text-base font-bold text-slate-400 dark:text-slate-600 group-hover:text-slate-900 dark:group-hover:text-slate-100 transition-colors">
                {logo.name}
              </span>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
