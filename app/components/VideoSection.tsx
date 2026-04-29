'use client';

import React, { useState, useEffect } from 'react';
import dynamic from 'next/dynamic';
import { motion } from 'framer-motion';
import { Play, Video, Monitor, Laptop, Smartphone } from 'lucide-react';
import { cn } from '@/app/lib/utils';

// Dynamic import to avoid SSR issues with react-player
const ReactPlayer = dynamic(() => import('react-player/lazy'), { ssr: false });

export default function VideoSection() {
  const [mounted, setMounted] = useState(false);
  const [activeTab, setActiveTab] = useState('desktop');

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  return (
    <section id="videos" className="py-24 px-6 relative overflow-hidden">
      <div className="max-w-7xl mx-auto relative z-10">
        <div className="text-center mb-16">
          <h2 className="text-sm font-bold text-brand-600 dark:text-brand-400 uppercase tracking-widest mb-2 flex items-center justify-center gap-2">
            <Video size={18} /> Interactive Demos
          </h2>
          <h3 className="text-4xl md:text-5xl font-bold font-outfit mb-6">Experience the <span className="text-gradient">Dynamic</span> Interface</h3>
          <p className="text-slate-600 dark:text-slate-400 max-w-2xl mx-auto text-lg">
            A specialized look into how I handle media-heavy dashboards and complex UI interactions across different devices.
          </p>
        </div>

        <div className="flex flex-col items-center gap-8">
          {/* Device Toggle */}
          <div className="flex p-1 bg-slate-100 dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800">
            {[
              { id: 'desktop', icon: Monitor, label: 'Desktop' },
              { id: 'laptop', icon: Laptop, label: 'Laptop' },
              { id: 'mobile', icon: Smartphone, label: 'Mobile' },
            ].map((device) => (
              <button
                key={device.id}
                onClick={() => setActiveTab(device.id)}
                className={cn(
                  'flex items-center gap-2 px-6 py-3 rounded-xl text-sm font-bold transition-all',
                  activeTab === device.id
                    ? 'bg-white dark:bg-slate-800 text-brand-600 shadow-sm'
                    : 'text-slate-500 hover:text-slate-700 dark:hover:text-slate-300'
                )}
              >
                <device.icon size={18} />
                {device.label}
              </button>
            ))}
          </div>

          {/* Video Player Container */}
          <motion.div
            key={activeTab}
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
            className={cn(
              "relative transition-all duration-500 rounded-[2.5rem] bg-slate-900 shadow-2xl p-4 md:p-8 border-[12px] border-slate-800 dark:border-slate-950",
              activeTab === 'mobile' ? 'max-w-[340px] aspect-[9/19]' : 'w-full max-w-5xl aspect-video'
            )}
          >
            {/* Player Overlay for a more cinematic feel */}
            <div className="absolute inset-0 rounded-[1.5rem] overflow-hidden">
              <ReactPlayer
                url="https://www.youtube.com/watch?v=dQw4w9WgXcQ" // Placeholder for demo
                width="100%"
                height="100%"
                playing={false}
                controls={true}
                light={true} // Shows preview image
                playIcon={
                  <div className="w-20 h-20 bg-brand-600 rounded-full flex items-center justify-center text-white shadow-xl shadow-brand-600/40 hover:scale-110 transition-transform">
                    <Play size={32} fill="white" />
                  </div>
                }
              />
            </div>
            
            {/* Glossy Reflection */}
            <div className="absolute top-0 left-0 right-0 h-1/2 bg-gradient-to-b from-white/5 to-transparent pointer-events-none" />
          </motion.div>
        </div>
      </div>

      {/* Background decoration */}
      <div className="absolute top-1/2 left-0 -translate-y-1/2 w-64 h-64 bg-indigo-600/10 rounded-full blur-[100px] pointer-events-none" />
      <div className="absolute bottom-0 right-0 w-80 h-80 bg-brand-600/5 rounded-full blur-[120px] pointer-events-none" />
    </section>
  );
}
