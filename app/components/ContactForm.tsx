'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Send, Mail, MapPin, Phone, Github, Linkedin, Twitter, MessageSquare } from 'lucide-react';
import { cn } from '@/app/lib/utils';

export default function ContactForm() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    // Simulate form submission
    setTimeout(() => {
      setIsSubmitting(false);
      setSubmitted(true);
    }, 2000);
  };

  return (
    <section id="contact" className="py-24 px-6 relative overflow-hidden bg-white dark:bg-slate-950">
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
            {[Github, Linkedin, Twitter].map((Icon, i) => (
              <a
                key={i}
                href="#"
                className="w-10 h-10 rounded-lg bg-slate-100 dark:bg-slate-900 flex items-center justify-center hover:bg-brand-600 hover:text-white transition-all"
              >
                <Icon size={20} />
              </a>
            ))}
          </div>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
          className="glass p-8 rounded-[2.5rem] shadow-2xl relative"
        >
          {submitted ? (
            <div className="h-full flex flex-col items-center justify-center text-center py-12">
              <div className="w-20 h-20 bg-emerald-500/10 text-emerald-500 rounded-full flex items-center justify-center mb-6 animate-bounce">
                <Send size={32} />
              </div>
              <h4 className="text-2xl font-bold mb-2">Message Sent!</h4>
              <p className="text-slate-600 dark:text-slate-400">Thanks for reaching out. I&apos;ll get back to you shortly.</p>
              <button
                onClick={() => setSubmitted(false)}
                className="mt-8 text-sm font-bold text-brand-600 hover:underline"
              >
                Send another message
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="text-sm font-bold ml-1">Full Name</label>
                  <input
                    required
                    type="text"
                    placeholder="John Doe"
                    className="w-full px-6 py-4 rounded-2xl bg-slate-50 dark:bg-slate-900/50 border border-slate-100 dark:border-slate-800 focus:ring-2 ring-brand-500 transition-all outline-none"
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-bold ml-1">Email Address</label>
                  <input
                    required
                    type="email"
                    placeholder="john@example.com"
                    className="w-full px-6 py-4 rounded-2xl bg-slate-50 dark:bg-slate-900/50 border border-slate-100 dark:border-slate-800 focus:ring-2 ring-brand-500 transition-all outline-none"
                  />
                </div>
              </div>
              <div className="space-y-2">
                <label className="text-sm font-bold ml-1">Message</label>
                <textarea
                  required
                  rows={5}
                  placeholder="Tell me about your project..."
                  className="w-full px-6 py-4 rounded-2xl bg-slate-50 dark:bg-slate-900/50 border border-slate-100 dark:border-slate-800 focus:ring-2 ring-brand-500 transition-all outline-none resize-none"
                />
              </div>
              <button
                type="submit"
                disabled={isSubmitting}
                className={cn(
                  "w-full py-4 bg-brand-600 text-white rounded-2xl font-bold flex items-center justify-center gap-2 shadow-lg shadow-brand-600/20 hover:bg-brand-700 transition-all",
                  isSubmitting && "opacity-70 cursor-not-allowed"
                )}
              >
                {isSubmitting ? "Sending..." : "Send Message"}
                {!isSubmitting && <Send size={20} />}
              </button>
            </form>
          )}
        </motion.div>
      </div>
    </section>
  );
}
