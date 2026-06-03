'use client';

import React, { useEffect, useState, useRef } from 'react';
import { cn } from '@/app/lib/utils';

export default function CustomCursor() {
  const [mounted, setMounted] = useState(false);

  const dotRef = useRef<HTMLDivElement>(null);
  const ringRef = useRef<HTMLDivElement>(null);
  const ringInnerRef = useRef<HTMLDivElement>(null);
  const spotlightRef = useRef<HTMLDivElement>(null);
  const pBarRef = useRef<HTMLDivElement>(null);

  const state = useRef({ x: 0, y: 0, fx: 0, fy: 0 });

  useEffect(() => {
    // Only activate custom effects on devices that support hover (fine pointer)
    const mediaQuery = window.matchMedia('(pointer: fine)');
    if (mediaQuery.matches) {
      setMounted(true);
    }
  }, []);

  useEffect(() => {
    if (!mounted) return;

    const handleMouseMove = (e: MouseEvent) => {
      state.current.x = e.clientX;
      state.current.y = e.clientY;
    };

    const handleMouseOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      const interactive = target.closest('a, button, [role="button"], input, .nav-link, #term-input');
      
      if (interactive) {
        if (ringInnerRef.current && dotRef.current) {
          ringInnerRef.current.style.transform = 'scale(1.66)';
          ringInnerRef.current.style.backgroundColor = 'rgba(255, 255, 255, 0.1)';
          dotRef.current.style.opacity = '0';
        }
      }
    };

    const handleMouseOut = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      const interactive = target.closest('a, button, [role="button"], input, .nav-link, #term-input');
      
      if (interactive) {
        if (ringInnerRef.current && dotRef.current) {
          ringInnerRef.current.style.transform = 'scale(1)';
          ringInnerRef.current.style.backgroundColor = 'transparent';
          dotRef.current.style.opacity = '1';
        }
      }
    };

    window.addEventListener('mousemove', handleMouseMove, { passive: true });
    document.addEventListener('mouseover', handleMouseOver);
    document.addEventListener('mouseout', handleMouseOut);

    let animationFrameId: number;
    const animate = () => {
      state.current.fx += (state.current.x - state.current.fx) * 0.15;
      state.current.fy += (state.current.y - state.current.fy) * 0.15;

      if (dotRef.current) {
        dotRef.current.style.transform = `translate3d(${state.current.x - 4}px, ${state.current.y - 4}px, 0)`;
      }

      if (ringRef.current) {
        ringRef.current.style.transform = `translate3d(${state.current.fx - 18}px, ${state.current.fy - 18}px, 0)`;
      }

      if (spotlightRef.current) {
        spotlightRef.current.style.setProperty('--x', `${state.current.x}px`);
        spotlightRef.current.style.setProperty('--y', `${state.current.y}px`);
      }

      if (pBarRef.current) {
        const maxScroll = document.documentElement.scrollHeight - window.innerHeight;
        const scrollPercent = maxScroll > 0 ? (window.scrollY / maxScroll) * 100 : 0;
        pBarRef.current.style.width = scrollPercent + '%';
      }

      animationFrameId = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseover', handleMouseOver);
      document.removeEventListener('mouseout', handleMouseOut);
      cancelAnimationFrame(animationFrameId);
    };
  }, [mounted]);

  if (!mounted) return null;

  return (
    <>
      <div className="progress-bar" id="p-bar" ref={pBarRef} style={{ position: 'fixed', top: 0, left: 0, height: '3px', background: 'var(--primary)', zIndex: 10001, transition: 'width 0.1s' }}></div>
      <div className="noise"></div>
      
      <div
        id="cursor"
        ref={dotRef}
        style={{ position: 'fixed', left: 0, top: 0, pointerEvents: 'none', zIndex: 10000, borderRadius: '50%', width: '8px', height: '8px', background: 'white', boxShadow: '0 0 4px rgba(0,0,0,0.5)' }}
      />
      <div
        id="cursor-f"
        ref={ringRef}
        style={{ position: 'fixed', left: 0, top: 0, pointerEvents: 'none', zIndex: 10000 }}
      >
        <div 
          ref={ringInnerRef}
          style={{ width: '36px', height: '36px', borderRadius: '50%', border: '1.5px solid var(--primary)', transition: 'transform 0.3s, background-color 0.3s', boxShadow: '0 0 10px rgba(5, 150, 105, 0.3)' }}
        />
      </div>
      
      <div className="spotlight" id="spotlight" ref={spotlightRef}></div>
    </>
  );
}
