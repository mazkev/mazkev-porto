'use client';

import React, { useEffect, useRef, useState } from 'react';
import { useTheme } from 'next-themes';
import { Cpu } from 'lucide-react';

interface PhysicsSkill {
  name: string;
  icon: string;
  category: 'frontend' | 'backend' | 'devops';
  x: number;
  y: number;
  vx: number;
  vy: number;
  radius: number;
  imgElement: HTMLImageElement | null;
  loaded: boolean;
}

const skillsData = [
  { name: 'Next.js', icon: 'https://cdn.simpleicons.org/nextdotjs', category: 'frontend' },
  { name: 'React', icon: 'https://cdn.simpleicons.org/react', category: 'frontend' },
  { name: 'TypeScript', icon: 'https://cdn.simpleicons.org/typescript', category: 'frontend' },
  { name: 'Tailwind CSS', icon: 'https://cdn.simpleicons.org/tailwindcss', category: 'frontend' },
  { name: 'Vue', icon: 'https://cdn.simpleicons.org/vuedotjs', category: 'frontend' },
  { name: 'Angular', icon: 'https://cdn.simpleicons.org/angular', category: 'frontend' },
  { name: 'Laravel', icon: 'https://cdn.simpleicons.org/laravel', category: 'backend' },
  { name: 'PHP', icon: 'https://cdn.simpleicons.org/php', category: 'backend' },
  { name: 'Python', icon: 'https://cdn.simpleicons.org/python', category: 'backend' },
  { name: 'PostgreSQL', icon: 'https://cdn.simpleicons.org/postgresql', category: 'backend' },
  { name: 'MySQL', icon: 'https://cdn.simpleicons.org/mysql', category: 'backend' },
  { name: 'AWS', icon: 'https://cdn.simpleicons.org/amazonwebservices', category: 'devops' },
  { name: 'Docker', icon: 'https://cdn.simpleicons.org/docker', category: 'devops' },
  { name: 'Vercel', icon: 'https://cdn.simpleicons.org/vercel', category: 'devops' },
  { name: 'Firebase', icon: 'https://cdn.simpleicons.org/firebase', category: 'devops' },
];

export default function TechPhysicsPool() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const { resolvedTheme } = useTheme();
  
  // Interactive stats
  const [activeTab, setActiveTab] = useState<'all' | 'frontend' | 'backend' | 'devops'>('all');
  const [skills, setSkills] = useState<PhysicsSkill[]>([]);

  // Physics constants
  const gravity = 0.22;
  const friction = 0.985;
  const bounce = 0.58;
  
  // Mouse state
  const mouseRef = useRef({ x: -1000, y: -1000, lastX: 0, lastY: 0, vx: 0, vy: 0, isDown: false, draggedIdx: -1 });

  // Initialize skills positions
  useEffect(() => {
    const initialized: PhysicsSkill[] = skillsData.map((s, index) => {
      const img = new Image();
      img.src = s.icon;
      
      const skillObj: PhysicsSkill = {
        ...s,
        category: s.category as 'frontend' | 'backend' | 'devops',
        x: 100 + (index % 4) * 80 + Math.random() * 20,
        y: 60 + Math.floor(index / 4) * 60 + Math.random() * 20,
        vx: (Math.random() - 0.5) * 3,
        vy: (Math.random() - 0.5) * 3,
        radius: 46, // fits the badge text and icon
        imgElement: img,
        loaded: false,
      };

      img.onload = () => {
        skillObj.loaded = true;
      };

      return skillObj;
    });

    const handle = requestAnimationFrame(() => {
      setSkills(initialized);
    });
    return () => cancelAnimationFrame(handle);
  }, []);

  // Main Canvas Loop
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationId: number;

    const resizeCanvas = () => {
      if (containerRef.current && canvasRef.current) {
        canvasRef.current.width = containerRef.current.clientWidth;
        canvasRef.current.height = 360; // Locked height for skill section container
      }
    };

    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);

    // Main animation frames
    const tick = () => {
      const width = canvas.width;
      const height = canvas.height;

      // Clear with dark/light transparency
      ctx.clearRect(0, 0, width, height);

      // Filter skills based on tab selection
      const activeSkills = skills.filter(
        (s) => activeTab === 'all' || s.category === activeTab
      );

      // Mouse drag logic
      const mouse = mouseRef.current;
      if (mouse.isDown && mouse.draggedIdx !== -1) {
        const dragged = activeSkills[mouse.draggedIdx];
        if (dragged) {
          dragged.x = mouse.x;
          dragged.y = mouse.y;
          dragged.vx = mouse.x - mouse.lastX;
          dragged.vy = mouse.y - mouse.lastY;
        }
      }

      // Update positions & Physics
      for (let i = 0; i < activeSkills.length; i++) {
        const b = activeSkills[i];

        if (i !== mouse.draggedIdx) {
          // Apply gravity
          b.vy += gravity;
          
          // Apply friction
          b.vx *= friction;
          b.vy *= friction;

          // Update position
          b.x += b.vx;
          b.y += b.vy;

          // Wall Collisions
          if (b.x < b.radius) {
            b.x = b.radius;
            b.vx = -b.vx * bounce;
          } else if (b.x > width - b.radius) {
            b.x = width - b.radius;
            b.vx = -b.vx * bounce;
          }

          if (b.y < b.radius) {
            b.y = b.radius;
            b.vy = -b.vy * bounce;
          } else if (b.y > height - b.radius) {
            b.y = height - b.radius;
            b.vy = -b.vy * bounce;
            // Floor friction slows lateral slide
            b.vx *= 0.94;
          }

          // Mouse push repulsion
          if (!mouse.isDown) {
            const dx = b.x - mouse.x;
            const dy = b.y - mouse.y;
            const dist = Math.hypot(dx, dy);
            if (dist < 130) {
              const force = (130 - dist) * 0.05;
              b.vx += (dx / dist) * force;
              b.vy += (dy / dist) * force;
            }
          }
        }
      }

      // Collisions between badges (Elastic Resolving)
      for (let i = 0; i < activeSkills.length; i++) {
        for (let j = i + 1; j < activeSkills.length; j++) {
          const b1 = activeSkills[i];
          const b2 = activeSkills[j];

          const dx = b2.x - b1.x;
          const dy = b2.y - b1.y;
          const dist = Math.hypot(dx, dy);
          const minDist = b1.radius + b2.radius - 8; // Slight overlap threshold feels softer

          if (dist < minDist) {
            const nx = dx / dist;
            const ny = dy / dist;

            // Displace overlapping badges
            const overlap = minDist - dist;
            
            if (i === mouse.draggedIdx) {
              b2.x += nx * overlap;
              b2.y += ny * overlap;
            } else if (j === mouse.draggedIdx) {
              b1.x -= nx * overlap;
              b1.y -= ny * overlap;
            } else {
              b1.x -= nx * (overlap * 0.5);
              b1.y -= ny * (overlap * 0.5);
              b2.x += nx * (overlap * 0.5);
              b2.y += ny * (overlap * 0.5);
            }

            // Elastic bounce velocities
            const kx = b1.vx - b2.vx;
            const ky = b1.vy - b2.vy;
            const relativeVelocity = kx * nx + ky * ny;

            if (relativeVelocity > 0) {
              // impulse calculation
              const impulse = (2 * relativeVelocity) / 2; // Equal mass assumption
              const impulseCoeff = impulse * bounce;

              if (i !== mouse.draggedIdx) {
                b1.vx -= impulseCoeff * nx;
                b1.vy -= impulseCoeff * ny;
              }
              if (j !== mouse.draggedIdx) {
                b2.vx += impulseCoeff * nx;
                b2.vy += impulseCoeff * ny;
              }
            }
          }
        }
      }

      // Render Loop
      for (let i = 0; i < activeSkills.length; i++) {
        const b = activeSkills[i];
        
        ctx.save();
        ctx.translate(b.x, b.y);

        // Draw dynamic themed badge box (shadow + pill border)
        const isDark = resolvedTheme === 'dark';
        
        // Badge dimensions
        const w = 82;
        const h = 32;

        // Fake drop shadow for high performance
        ctx.fillStyle = isDark ? 'rgba(0, 0, 0, 0.4)' : 'rgba(148, 163, 184, 0.2)';
        ctx.beginPath();
        ctx.roundRect(-w / 2, -h / 2 + 3, w, h, 14);
        ctx.fill();

        // Badge pill shape
        ctx.beginPath();
        ctx.roundRect(-w / 2, -h / 2, w, h, 14);

        // Card Fill
        ctx.fillStyle = isDark ? 'rgba(15, 23, 42, 0.9)' : 'rgba(255, 255, 255, 0.9)';
        ctx.fill();

        // Border colored by category
        let categoryColor = '#6366f1';
        if (b.category === 'backend') categoryColor = '#10b981';
        if (b.category === 'devops') categoryColor = '#f59e0b';

        ctx.strokeStyle = isDark ? 'rgba(255, 255, 255, 0.08)' : 'rgba(148, 163, 184, 0.15)';
        if (mouse.draggedIdx === i) {
          ctx.strokeStyle = categoryColor;
        }
        ctx.lineWidth = mouse.draggedIdx === i ? 2 : 1.2;
        ctx.stroke();

        // Draw Icon image
        if (b.imgElement && b.loaded) {
          try {
            ctx.drawImage(b.imgElement, -w / 2 + 10, -8, 16, 16);
          } catch {
            // Fallback if image fails to render
          }
        }

        // Draw Text
        ctx.font = 'bold 11px Inter, sans-serif';
        ctx.fillStyle = isDark ? '#e2e8f0' : '#334155';
        ctx.textAlign = 'left';
        ctx.textBaseline = 'middle';
        ctx.fillText(b.name, -w / 2 + 32, 1);

        ctx.restore();
      }

      // Record mouse trailing values
      mouse.lastX = mouse.x;
      mouse.lastY = mouse.y;

      animationId = requestAnimationFrame(tick);
    };

    tick();

    return () => {
      cancelAnimationFrame(animationId);
      window.removeEventListener('resize', resizeCanvas);
    };
  }, [skills, activeTab, resolvedTheme]);

  // Bind mouse / touch events
  const handleMouseMove = (e: React.MouseEvent<HTMLCanvasElement>) => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const rect = canvas.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    
    mouseRef.current.x = x;
    mouseRef.current.y = y;
  };

  const handleMouseDown = (e: React.MouseEvent<HTMLCanvasElement>) => {
    mouseRef.current.isDown = true;
    const canvas = canvasRef.current;
    if (!canvas) return;
    const rect = canvas.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    const activeSkills = skills.filter(
      (s) => activeTab === 'all' || s.category === activeTab
    );

    // Find if clicked inside any badge bounding radius
    let foundIdx = -1;
    for (let i = 0; i < activeSkills.length; i++) {
      const b = activeSkills[i];
      const dist = Math.hypot(b.x - x, b.y - y);
      if (dist < b.radius) {
        foundIdx = i;
        break;
      }
    }

    mouseRef.current.draggedIdx = foundIdx;
    mouseRef.current.lastX = x;
    mouseRef.current.lastY = y;
  };

  const handleMouseUpOrLeave = () => {
    mouseRef.current.isDown = false;
    mouseRef.current.draggedIdx = -1;
  };

  // Touch handlers for mobile compatibility
  const handleTouchMove = (e: React.TouchEvent<HTMLCanvasElement>) => {
    const canvas = canvasRef.current;
    if (!canvas || e.touches.length === 0) return;
    const rect = canvas.getBoundingClientRect();
    const x = e.touches[0].clientX - rect.left;
    const y = e.touches[0].clientY - rect.top;
    mouseRef.current.x = x;
    mouseRef.current.y = y;
  };

  const handleTouchStart = (e: React.TouchEvent<HTMLCanvasElement>) => {
    mouseRef.current.isDown = true;
    const canvas = canvasRef.current;
    if (!canvas || e.touches.length === 0) return;
    const rect = canvas.getBoundingClientRect();
    const x = e.touches[0].clientX - rect.left;
    const y = e.touches[0].clientY - rect.top;

    const activeSkills = skills.filter(
      (s) => activeTab === 'all' || s.category === activeTab
    );

    let foundIdx = -1;
    for (let i = 0; i < activeSkills.length; i++) {
      const b = activeSkills[i];
      const dist = Math.hypot(b.x - x, b.y - y);
      if (dist < b.radius) {
        foundIdx = i;
        break;
      }
    }

    mouseRef.current.draggedIdx = foundIdx;
    mouseRef.current.lastX = x;
    mouseRef.current.lastY = y;
  };

  return (
    <div ref={containerRef} className="w-full flex flex-col gap-6">
      {/* Category selector */}
      <div className="flex flex-wrap gap-2 p-1 bg-slate-50 dark:bg-slate-900/60 rounded-2xl border border-slate-100 dark:border-slate-800/80 max-w-max">
        {(['all', 'frontend', 'backend', 'devops'] as const).map((tab) => (
          <button
            key={tab}
            onClick={() => {
              setActiveTab(tab);
              // Small burst push to badges to mix them up on tab change
              skills.forEach(s => {
                s.vx = (Math.random() - 0.5) * 8;
                s.vy = -Math.random() * 6;
              });
            }}
            className={`px-4 py-2 text-xs font-bold uppercase tracking-wider rounded-xl transition-all duration-300 cursor-pointer ${
              activeTab === tab
                ? 'bg-brand-600 text-white shadow-md shadow-brand-600/10'
                : 'text-slate-500 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
            }`}
          >
            {tab}
          </button>
        ))}
      </div>

      {/* Physics Pool Canvas wrapper */}
      <div className="relative w-full rounded-[2rem] overflow-hidden border border-slate-200/50 dark:border-slate-800/80 bg-slate-100/30 dark:bg-slate-950/20 backdrop-blur-sm shadow-inner min-h-[360px]">
        {/* HUD Indicator */}
        <div className="absolute top-4 left-4 pointer-events-none select-none text-[9px] font-bold font-mono uppercase tracking-widest text-slate-400/80 flex items-center gap-1.5 z-10">
          <Cpu size={10} className="text-brand-500" />
          Interactive physics pool: grab & throw badges
        </div>

        <canvas
          ref={canvasRef}
          onMouseMove={handleMouseMove}
          onMouseDown={handleMouseDown}
          onMouseUp={handleMouseUpOrLeave}
          onMouseLeave={handleMouseUpOrLeave}
          onTouchMove={handleTouchMove}
          onTouchStart={handleTouchStart}
          onTouchEnd={handleMouseUpOrLeave}
          className="w-full h-[360px] block cursor-grab active:cursor-grabbing"
        />
      </div>
    </div>
  );
}
