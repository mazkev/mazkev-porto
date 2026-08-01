'use client';

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Send, Mail, MapPin, Phone, Github, Linkedin, Twitter, MessageSquare } from 'lucide-react';
import { cn } from '@/app/lib/utils';

const Confetti = () => {
  const [particles, setParticles] = useState<{
    id: number;
    targetX: number;
    targetY: number;
    color: string;
    size: number;
    shape: 'circle' | 'square';
    delay: number;
    rotate: number;
    duration: number;
  }[]>([]);

  useEffect(() => {
    const colors = ['#ef4444', '#f97316', '#f59e0b', '#10b981', '#3b82f6', '#6366f1', '#8b5cf6', '#ec4899'];
    const generated = Array.from({ length: 60 }).map((_, i) => {
      const angle = (Math.random() * 360 * Math.PI) / 180;
      const velocity = 100 + Math.random() * 220;
      return {
        id: i,
        targetX: Math.cos(angle) * velocity,
        targetY: -120 - Math.random() * 220, // Shoot upwards
        color: colors[Math.floor(Math.random() * colors.length)],
        size: Math.random() * 8 + 6, // 6px to 14px
        shape: (Math.random() > 0.5 ? 'circle' : 'square') as 'circle' | 'square',
        delay: Math.random() * 0.25, // staggered start
        rotate: Math.random() * 1080,
        duration: 1.2 + Math.random() * 0.8,
      };
    });
    const handle = requestAnimationFrame(() => {
      setParticles(generated);
    });
    return () => cancelAnimationFrame(handle);
  }, []);

  return (
    <div className="absolute inset-0 pointer-events-none overflow-visible z-50">
      {particles.map((p) => (
        <motion.div
          key={p.id}
          initial={{ 
            x: 'calc(50% - 0px)', 
            y: 'calc(92% - 0px)', 
            scale: 0, 
            rotate: 0, 
            opacity: 1 
          }}
          animate={{
            x: `calc(50% + ${p.targetX}px)`,
            y: `calc(92% + ${p.targetY}px)`,
            scale: [0, 1, 1, 0.8, 0],
            rotate: p.rotate,
            opacity: [1, 1, 1, 0.6, 0],
          }}
          transition={{
            duration: p.duration,
            ease: "easeOut",
            delay: p.delay,
          }}
          style={{
            position: 'absolute',
            width: p.size,
            height: p.shape === 'circle' ? p.size : p.size * 0.5,
            backgroundColor: p.color,
            borderRadius: p.shape === 'circle' ? '50%' : '2px',
            transformOrigin: 'center',
          }}
        />
      ))}
    </div>
  );
};

export default function ContactForm() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccessAnimating, setIsSuccessAnimating] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError(null);

    const formData = new FormData(e.currentTarget);
    const name = formData.get('name') as string;
    const email = formData.get('email') as string;
    const message = formData.get('message') as string;
    
    // Format the message for WhatsApp
    const phoneNumber = '6281326612344';
    const text = `Hello Kevin! My name is ${name} (${email}).\n\n${message}`;
    const whatsappUrl = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(text)}`;
    
    window.open(whatsappUrl, '_blank');

    setIsSubmitting(false);
    setIsSuccessAnimating(true);
    
    // Wait for paper airplane and confetti burst animations to finish
    setTimeout(() => {
      setShowSuccess(true);
      setIsSuccessAnimating(false);
    }, 1500);
  };

  return (
    <section id="contact" className="py-24 px-6 relative overflow-hidden bg-white dark:bg-slate-950 no-print print:hidden">
      <div className="max-w-7xl mx-auto grid md:grid-cols-2 gap-16">
        <div>
          <h2 className="text-sm font-bold text-brand-600 dark:text-brand-400 uppercase tracking-widest mb-2 flex items-center gap-2">
            <MessageSquare size={18} /> Let&apos;s Connect
          </h2>
          <h3 className="text-4xl md:text-5xl font-bold font-outfit mb-8">Ready to <span className="text-gradient">Collaborate</span>?</h3>
          <p className="text-slate-600 dark:text-slate-400 text-lg mb-10 leading-relaxed">
            Whether you have a project in mind or just want to chat about development, I&apos;m always open to new opportunities.
          </p>

          <div className="space-y-6 mb-12">
            {[
              { icon: Mail, label: 'Email', value: 'kevinekapratama@gmail.com' },
              { icon: Phone, label: 'Phone', value: '+62 (813) 000-0000' },
              { icon: MapPin, label: 'Location', value: 'Jakarta, INDONESIA' },
            ].map((item) => (
              <div key={item.label} className="flex items-center gap-4 group">
                <div className="w-12 h-12 rounded-xl bg-slate-50 dark:bg-slate-900 border border-slate-100 dark:border-slate-800 flex items-center justify-center text-brand-600 group-hover:bg-brand-600 group-hover:text-white transition-all">
                  <item.icon size={20} />
                </div>
                <div>
                  <div className="text-xs text-slate-500 font-bold uppercase tracking-wider">{item.label}</div>
                  <div className="font-semibold">{item.value}</div>
                </div>
              </div>
            ))}
          </div>

<div className="flex gap-4">
  <a href="https://github.com/mazkev" target="_blank" rel="noopener noreferrer" className="w-10 h-10 rounded-lg bg-slate-100 dark:bg-slate-900 flex items-center justify-center hover:bg-brand-600 hover:text-white transition-all">
    <Github size={20} />
  </a>
  <a href="https://www.linkedin.com/in/kevin-eka-pratama-a75024166/" target="_blank" rel="noopener noreferrer" className="w-10 h-10 rounded-lg bg-slate-100 dark:bg-slate-900 flex items-center justify-center hover:bg-brand-600 hover:text-white transition-all">
    <Linkedin size={20} />
  </a>
</div>

        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
          className="glass p-8 rounded-[2.5rem] shadow-2xl relative overflow-visible"
        >
          {isSuccessAnimating && <Confetti />}

          {showSuccess ? (
            <div className="h-full flex flex-col items-center justify-center text-center py-12">
              <div className="w-20 h-20 bg-emerald-500/10 text-emerald-500 rounded-full flex items-center justify-center mb-6 animate-bounce">
                <Send size={32} />
              </div>
              <h4 className="text-2xl font-bold mb-2">Message Sent!</h4>
              <p className="text-slate-600 dark:text-slate-400">Thanks for reaching out. I&apos;ll get back to you shortly.</p>
              <button
                onClick={() => {
                  setShowSuccess(false);
                }}
                className="mt-8 text-sm font-bold text-brand-600 hover:underline cursor-pointer"
              >
                Send another message
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label htmlFor="name" className="text-sm font-bold ml-1">Full Name</label>
                  <input
                    id="name"
                    required
                    name="name"
                    type="text"
                    placeholder="John Doe"
                    className="w-full px-6 py-4 rounded-2xl bg-slate-50 dark:bg-slate-900/50 border border-slate-100 dark:border-slate-800 focus:ring-2 ring-brand-500 transition-all outline-none"
                  />
                </div>
                <div className="space-y-2">
                  <label htmlFor="email" className="text-sm font-bold ml-1">Email Address</label>
                  <input
                    id="email"
                    required
                    name="email"
                    type="email"
                    placeholder="john@example.com"
                    className="w-full px-6 py-4 rounded-2xl bg-slate-50 dark:bg-slate-900/50 border border-slate-100 dark:border-slate-800 focus:ring-2 ring-brand-500 transition-all outline-none"
                  />
                </div>
              </div>
              <div className="space-y-2">
                <label htmlFor="message" className="text-sm font-bold ml-1">Message</label>
                <textarea
                  id="message"
                  required
                  name="message"
                  rows={5}
                  placeholder="Tell me about your project..."
                  className="w-full px-6 py-4 rounded-2xl bg-slate-50 dark:bg-slate-900/50 border border-slate-100 dark:border-slate-800 focus:ring-2 ring-brand-500 transition-all outline-none resize-none"
                />
              </div>
              {error && (
                <div className="p-4 rounded-xl bg-red-500/10 border border-red-500/20 text-red-500 text-sm font-medium">
                  {error}
                </div>
              )}
              <button
                type="submit"
                disabled={isSubmitting || isSuccessAnimating}
                className={cn(
                  "w-full py-4 bg-brand-600 text-white rounded-2xl font-bold flex items-center justify-center gap-2 shadow-lg shadow-brand-600/20 hover:bg-brand-700 transition-all overflow-hidden relative min-h-[56px]",
                  (isSubmitting || isSuccessAnimating) && "opacity-80 cursor-not-allowed"
                )}
              >
                <AnimatePresence mode="wait">
                  {!isSubmitting && !isSuccessAnimating ? (
                    <motion.span
                      key="default"
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -10 }}
                      className="flex items-center gap-2"
                    >
                      Send Message
                      <Send size={20} />
                    </motion.span>
                  ) : isSubmitting ? (
                    <motion.span
                      key="submitting"
                      initial={{ opacity: 0, scale: 0.8 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0, scale: 0.8 }}
                      className="flex items-center gap-2"
                    >
                      <motion.div
                        animate={{
                          x: [0, -2, 2, -2, 0],
                          y: [0, -1, 1, -1, 0],
                        }}
                        transition={{
                          repeat: Infinity,
                          duration: 0.5,
                          ease: "linear"
                        }}
                      >
                        <Send size={20} />
                      </motion.div>
                      Sending...
                    </motion.span>
                  ) : (
                    <motion.span
                      key="launching"
                      initial={{ opacity: 1, scale: 1, x: 0, y: 0 }}
                      animate={{
                        x: 500,
                        y: -400,
                        scale: 0.3,
                        opacity: 0,
                      }}
                      transition={{
                        duration: 1.0,
                        ease: [0.4, 0, 0.2, 1]
                      }}
                      className="absolute"
                    >
                      <Send size={24} />
                    </motion.span>
                  )}
                </AnimatePresence>
              </button>
            </form>
          )}
        </motion.div>
      </div>
    </section>
  );
}
