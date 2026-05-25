'use client';

import React, { useEffect, useRef, useState } from 'react';
import { useTheme } from 'next-themes';

interface Point {
  x: number;
  y: number;
  anchorX: number;
  anchorY: number;
  vx: number;
  vy: number;
}

export default function InteractiveMesh() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const { resolvedTheme } = useTheme();
  const [mounted, setMounted] = useState(false);
  const mouseRef = useRef<{ x: number; y: number; active: boolean }>({ x: 0, y: 0, active: false });
  const pointsRef = useRef<Point[][]>([]);

  useEffect(() => {
    const handle = requestAnimationFrame(() => {
      setMounted(true);
    });
    return () => cancelAnimationFrame(handle);
  }, []);

  useEffect(() => {
    if (!mounted) return;

    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationFrameId: number;
    let width = 0;
    let height = 0;
    const spacing = 45; // Grid spacing in pixels
    const mouseRadius = 120; // Mouse influence radius
    const forceFactor = 25; // Displacement strength
    const damping = 0.85;
    const tension = 0.08;

    const initGrid = () => {
      const parent = containerRef.current;
      if (!parent) return;
      
      width = parent.clientWidth;
      height = parent.clientHeight;
      
      // Handle high-DPI displays
      const dpr = window.devicePixelRatio || 1;
      canvas.width = width * dpr;
      canvas.height = height * dpr;
      canvas.style.width = `${width}px`;
      canvas.style.height = `${height}px`;
      ctx.scale(dpr, dpr);

      const rows = Math.ceil(height / spacing) + 1;
      const cols = Math.ceil(width / spacing) + 1;
      
      const grid: Point[][] = [];
      for (let r = 0; r < rows; r++) {
        const row: Point[] = [];
        for (let c = 0; c < cols; c++) {
          const x = c * spacing;
          const y = r * spacing;
          row.push({
            x,
            y,
            anchorX: x,
            anchorY: y,
            vx: 0,
            vy: 0,
          });
        }
        grid.push(row);
      }
      pointsRef.current = grid;
    };

    initGrid();

    // Resize Observer to handle container dimensions dynamically
    const resizeObserver = new ResizeObserver(() => {
      initGrid();
    });
    if (containerRef.current) {
      resizeObserver.observe(containerRef.current);
    }

    const handleMouseMove = (e: MouseEvent) => {
      const rect = canvas.getBoundingClientRect();
      mouseRef.current = {
        x: e.clientX - rect.left,
        y: e.clientY - rect.top,
        active: true,
      };
    };

    const handleMouseLeave = () => {
      mouseRef.current.active = false;
    };

    window.addEventListener('mousemove', handleMouseMove);
    canvas.addEventListener('mouseleave', handleMouseLeave);

    // Animation Loop
    const draw = () => {
      ctx.clearRect(0, 0, width, height);

      const grid = pointsRef.current;
      const mouse = mouseRef.current;
      if (!grid.length) return;

      const strokeColor = resolvedTheme === 'dark' 
        ? 'rgba(99, 102, 241, 0.06)' 
        : 'rgba(99, 102, 241, 0.04)';
      const dotColor = resolvedTheme === 'dark'
        ? 'rgba(99, 102, 241, 0.12)'
        : 'rgba(99, 102, 241, 0.08)';

      ctx.strokeStyle = strokeColor;
      ctx.lineWidth = 1;
      ctx.fillStyle = dotColor;

      // Update Point Physics
      for (let r = 0; r < grid.length; r++) {
        for (let c = 0; c < grid[r].length; c++) {
          const pt = grid[r][c];

          // Spring physics back to anchor
          const ax = pt.anchorX - pt.x;
          const ay = pt.anchorY - pt.y;
          
          pt.vx += ax * tension;
          pt.vy += ay * tension;

          // Mouse interaction forces
          if (mouse.active) {
            const dx = mouse.x - pt.x;
            const dy = mouse.y - pt.y;
            const dist = Math.sqrt(dx * dx + dy * dy);

            if (dist < mouseRadius) {
              const force = (mouseRadius - dist) / mouseRadius;
              const angle = Math.atan2(dy, dx);
              
              // Repel force
              const targetX = pt.anchorX - Math.cos(angle) * force * forceFactor;
              const targetY = pt.anchorY - Math.sin(angle) * force * forceFactor;

              pt.vx += (targetX - pt.x) * 0.1;
              pt.vy += (targetY - pt.y) * 0.1;
            }
          }

          pt.vx *= damping;
          pt.vy *= damping;
          pt.x += pt.vx;
          pt.y += pt.vy;
        }
      }

      // Render Mesh Connections (Batched)
      ctx.beginPath();
      for (let r = 0; r < grid.length; r++) {
        for (let c = 0; c < grid[r].length; c++) {
          const pt = grid[r][c];

          // Connect to right neighbor
          if (c < grid[r].length - 1) {
            ctx.moveTo(pt.x, pt.y);
            ctx.lineTo(grid[r][c + 1].x, grid[r][c + 1].y);
          }
          // Connect to bottom neighbor
          if (r < grid.length - 1) {
            ctx.moveTo(pt.x, pt.y);
            ctx.lineTo(grid[r + 1][c].x, grid[r + 1][c].y);
          }
        }
      }
      ctx.stroke();

      // Render small node dots (Batched)
      ctx.beginPath();
      for (let r = 0; r < grid.length; r++) {
        for (let c = 0; c < grid[r].length; c++) {
          const pt = grid[r][c];
          ctx.moveTo(pt.x + 1.5, pt.y);
          ctx.arc(pt.x, pt.y, 1.5, 0, Math.PI * 2);
        }
      }
      ctx.fill();

      animationFrameId = requestAnimationFrame(draw);
    };

    draw();

    return () => {
      cancelAnimationFrame(animationFrameId);
      resizeObserver.disconnect();
      window.removeEventListener('mousemove', handleMouseMove);
      if (canvas) {
        canvas.removeEventListener('mouseleave', handleMouseLeave);
      }
    };
  }, [mounted, resolvedTheme]);

  if (!mounted) return null;

  return (
    <div 
      ref={containerRef} 
      className="absolute inset-0 w-full h-full pointer-events-none overflow-hidden select-none z-0"
    >
      <canvas ref={canvasRef} className="absolute inset-0" />
    </div>
  );
}
