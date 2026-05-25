'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Sparkles, Sliders, Code, Play } from 'lucide-react';

export default function CodePlayground() {
  const [stiffness, setStiffness] = useState(260);
  const [damping, setDamping] = useState(15);
  const [scale, setScale] = useState(1.15);
  const [borderRadius, setBorderRadius] = useState(16);
  const [glow, setGlow] = useState(10);
  const [triggerKey, setTriggerKey] = useState(0);

  // Generate code string dynamically
  const codeText = `import { motion } from 'framer-motion';

export default function CustomButton() {
  return (
    <motion.button
      whileHover={{ scale: ${scale.toFixed(2)} }}
      whileTap={{ scale: 0.95 }}
      transition={{
        type: 'spring',
        stiffness: ${stiffness},
        damping: ${damping}
      }}
      style={{
        borderRadius: '${borderRadius}px',
        boxShadow: '0 0 ${glow}px rgba(87, 93, 231, ${(glow / 20).toFixed(2)})'
      }}
      className="px-8 py-4 bg-brand-600 text-white font-bold"
    >
      Hover or Click Me
    </motion.button>
  );
}`;

  // Custom highlights helper
  const renderHighlightedCode = () => {
    // Basic tokens parsing for display
    const lines = codeText.split('\n');
    return lines.map((line, idx) => {
      // Highlight keywords
      let html = line
        .replace(/</g, '&lt;')
        .replace(/>/g, '&gt;');
      
      let stringTokens: string[] = [];
      html = html.replace(/(['"].*?['"])/g, (match) => {
        stringTokens.push(match);
        return `__STR${stringTokens.length - 1}__`;
      });

      let numTokens: string[] = [];
      html = html.replace(/\b(\d+(\.\d+)?)\b/g, (match) => {
        numTokens.push(match);
        return `__NUM${numTokens.length - 1}__`;
      });

      html = html
        .replace(/\b(import|export|default|function|return)\b/g, '<span class="text-pink-500 font-bold">$1</span>')
        .replace(/\b(from)\b/g, '<span class="text-pink-400">$1</span>')
        .replace(/(&lt;motion\.button|&lt;\/motion\.button&gt;)/g, '<span class="text-indigo-400">$1</span>')
        .replace(/\b(whileHover|whileTap|transition|type|stiffness|damping|style|className)\b/g, '<span class="text-blue-400">$1</span>');

      html = html.replace(/__NUM(\d+)__/g, (_, idx) => `<span class="text-amber-500">${numTokens[parseInt(idx)]}</span>`);
      html = html.replace(/__STR(\d+)__/g, (_, idx) => `<span class="text-emerald-400">${stringTokens[parseInt(idx)]}</span>`);
      
      const lineHtml = html;

      return (
        <div key={idx} className="table-row">
          <span className="table-cell text-right pr-4 text-slate-600 select-none text-[10px] w-6">{idx + 1}</span>
          <span className="table-cell whitespace-pre font-mono text-[11px] leading-relaxed" dangerouslySetInnerHTML={{ __html: lineHtml }} />
        </div>
      );
    });
  };

  return (
    <section className="py-24 px-6 bg-slate-50 dark:bg-slate-900/40 relative overflow-hidden">
      {/* Decorative background grids */}
      <div className="absolute inset-0 bg-grid opacity-30 pointer-events-none" />
      
      <div className="max-w-7xl mx-auto relative z-10">
        <div className="text-center mb-16">
          <h2 className="text-sm font-bold text-brand-600 dark:text-brand-400 uppercase tracking-widest mb-2 flex items-center justify-center gap-2">
            <Sparkles size={18} /> Interactive Lab
          </h2>
          <h3 className="text-3xl md:text-4xl font-bold font-outfit">The Motion <span className="text-gradient">Sandbox</span></h3>
          <p className="text-slate-600 dark:text-slate-400 max-w-lg mx-auto mt-4 text-sm leading-relaxed">
            Customize the physical spring constants, scale offsets, and border styling to see the spring physics change in real-time.
          </p>
        </div>

        <div className="grid lg:grid-cols-12 gap-12 items-stretch">
          {/* Left Controls & Sandbox Preview (7 columns) */}
          <div className="lg:col-span-7 flex flex-col gap-6">
            <div className="glass p-8 rounded-[2.5rem] border border-slate-200/50 dark:border-slate-800/80 shadow-md flex flex-col md:flex-row items-center gap-12 min-h-[300px] justify-between relative">
              {/* Reset action key indicator */}
              <div className="absolute top-4 left-4 text-[9px] font-bold font-mono text-slate-400 uppercase tracking-wider flex items-center gap-1">
                <Play size={10} className="text-brand-500" />
                Live sandbox area
              </div>

              {/* Sliders Controls Panel */}
              <div className="w-full md:w-3/5 space-y-6">
                <span className="text-xs font-bold uppercase tracking-wider text-slate-500 flex items-center gap-2 mb-2">
                  <Sliders size={14} className="text-brand-500" /> Parameters Control
                </span>

                {/* Stiffness */}
                <div className="space-y-1.5">
                  <div className="flex justify-between text-xs font-mono">
                    <span className="font-bold text-slate-500">Stiffness</span>
                    <span className="text-brand-600 font-bold">{stiffness}</span>
                  </div>
                  <input
                    type="range"
                    min="50"
                    max="500"
                    value={stiffness}
                    onChange={(e) => setStiffness(Number(e.target.value))}
                    className="w-full h-1.5 bg-slate-200 dark:bg-slate-800 rounded-lg appearance-none cursor-pointer accent-brand-600"
                  />
                </div>

                {/* Damping */}
                <div className="space-y-1.5">
                  <div className="flex justify-between text-xs font-mono">
                    <span className="font-bold text-slate-500">Damping</span>
                    <span className="text-brand-600 font-bold">{damping}</span>
                  </div>
                  <input
                    type="range"
                    min="2"
                    max="45"
                    value={damping}
                    onChange={(e) => setDamping(Number(e.target.value))}
                    className="w-full h-1.5 bg-slate-200 dark:bg-slate-800 rounded-lg appearance-none cursor-pointer accent-brand-600"
                  />
                </div>

                {/* Hover Scale */}
                <div className="space-y-1.5">
                  <div className="flex justify-between text-xs font-mono">
                    <span className="font-bold text-slate-500">Hover Scale</span>
                    <span className="text-brand-600 font-bold">{scale.toFixed(2)}x</span>
                  </div>
                  <input
                    type="range"
                    min="1.0"
                    max="1.4"
                    step="0.05"
                    value={scale}
                    onChange={(e) => setScale(Number(e.target.value))}
                    className="w-full h-1.5 bg-slate-200 dark:bg-slate-800 rounded-lg appearance-none cursor-pointer accent-brand-600"
                  />
                </div>

                {/* Border Radius */}
                <div className="space-y-1.5">
                  <div className="flex justify-between text-xs font-mono">
                    <span className="font-bold text-slate-500">Border Radius</span>
                    <span className="text-brand-600 font-bold">{borderRadius}px</span>
                  </div>
                  <input
                    type="range"
                    min="0"
                    max="32"
                    value={borderRadius}
                    onChange={(e) => setBorderRadius(Number(e.target.value))}
                    className="w-full h-1.5 bg-slate-200 dark:bg-slate-800 rounded-lg appearance-none cursor-pointer accent-brand-600"
                  />
                </div>

                {/* Glow Intensity */}
                <div className="space-y-1.5">
                  <div className="flex justify-between text-xs font-mono">
                    <span className="font-bold text-slate-500">Glow Intensity</span>
                    <span className="text-brand-600 font-bold">{glow}px</span>
                  </div>
                  <input
                    type="range"
                    min="0"
                    max="20"
                    value={glow}
                    onChange={(e) => setGlow(Number(e.target.value))}
                    className="w-full h-1.5 bg-slate-200 dark:bg-slate-800 rounded-lg appearance-none cursor-pointer accent-brand-600"
                  />
                </div>
              </div>

              {/* Dynamic Button Preview Container */}
              <div className="w-full md:w-2/5 flex items-center justify-center py-6 border-t md:border-t-0 md:border-l border-slate-200/50 dark:border-slate-800/80 min-h-[160px]">
                <motion.button
                  key={triggerKey}
                  whileHover={{ scale }}
                  whileTap={{ scale: 0.95 }}
                  transition={{
                    type: 'spring',
                    stiffness,
                    damping,
                  }}
                  style={{
                    borderRadius: `${borderRadius}px`,
                    boxShadow: `0 0 ${glow}px rgba(87, 93, 231, ${glow / 20})`,
                  }}
                  onClick={() => setTriggerKey(prev => prev + 1)}
                  className="px-8 py-4 bg-brand-600 hover:bg-brand-700 text-white font-bold text-sm shadow-lg shadow-brand-600/10 cursor-pointer select-none border border-brand-500/10"
                >
                  Click & Bounce
                </motion.button>
              </div>
            </div>
          </div>

          {/* Right Live Code Showcase (5 columns) */}
          <div className="lg:col-span-5 flex flex-col">
            <div className="rounded-[2.5rem] border border-slate-200 dark:border-slate-800 bg-slate-900 dark:bg-slate-950/80 flex flex-col flex-grow overflow-hidden shadow-lg min-h-[300px]">
              {/* Code editor top bar */}
              <div className="bg-slate-950 px-6 py-3 border-b border-slate-800/80 flex items-center justify-between text-[10px] font-mono text-slate-500">
                <span className="flex items-center gap-1.5">
                  <Code size={12} className="text-brand-500" />
                  InteractiveButton.tsx
                </span>
                <span className="uppercase text-[9px] font-bold text-brand-500 tracking-wider">React TSX</span>
              </div>

              {/* Code Body */}
              <div className="flex-grow p-6 overflow-x-auto text-slate-300 font-mono text-[11px] select-text">
                <div className="table w-full">
                  {renderHighlightedCode()}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
