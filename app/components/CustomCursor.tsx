'use client';

import React, { useEffect, useState, useRef } from 'react';
import { cn } from '@/app/lib/utils';

export default function CustomCursor() {
  const [mounted, setMounted] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const [isClicked, setIsClicked] = useState(false);
  const [magneticElement, setMagneticElement] = useState<HTMLElement | null>(null);

  const dotRef = useRef<HTMLDivElement>(null);
  const ringRef = useRef<HTMLDivElement>(null);

  const mouseX = useRef(0);
  const mouseY = useRef(0);
  const ringX = useRef(0);
  const ringY = useRef(0);

  useEffect(() => {
    // Only activate custom cursor on devices that support hover (fine pointer)
    const mediaQuery = window.matchMedia('(pointer: fine)');
    if (mediaQuery.matches) {
      const handle = requestAnimationFrame(() => {
        setMounted(true);
      });
      return () => cancelAnimationFrame(handle);
    }
  }, []);

  useEffect(() => {
    if (!mounted) return;

    // Enable cursor hiding in CSS
    document.documentElement.classList.add('custom-cursor-active');

    const handleMouseMove = (e: MouseEvent) => {
      setIsVisible(true);

      mouseX.current = e.clientX;
      mouseY.current = e.clientY;

      // Check if hovering over interactive elements
      const target = e.target as HTMLElement;
      const interactive = target.closest('a, button, [role="button"], input[type="submit"], input[type="button"]');
      
      if (interactive) {
        setIsHovered(true);
        // If it has a specific magnetic attribute, lock cursor onto it
        if (interactive.classList.contains('cursor-pointer') || interactive.tagName === 'BUTTON' || interactive.tagName === 'A') {
          setMagneticElement(interactive as HTMLElement);
        } else {
          setMagneticElement(null);
        }
      } else {
        setIsHovered(false);
        setMagneticElement(null);
      }
    };

    const handleMouseDown = () => setIsClicked(true);
    const handleMouseUp = () => setIsClicked(false);
    const handleMouseLeave = () => setIsVisible(false);
    const handleMouseEnter = () => setIsVisible(true);

    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('mousedown', handleMouseDown);
    window.addEventListener('mouseup', handleMouseUp);
    document.addEventListener('mouseleave', handleMouseLeave);
    document.addEventListener('mouseenter', handleMouseEnter);

    // Physics loop to animate the ring trailing behind the dot
    let animationFrameId: number;
    const animate = () => {
      // Direct DOM mutation for high performance (60+ FPS)
      if (dotRef.current) {
        dotRef.current.style.transform = `translate3d(${mouseX.current}px, ${mouseY.current}px, 0)`;
      }

      if (ringRef.current) {
        if (magneticElement) {
          const rect = magneticElement.getBoundingClientRect();
          const targetX = rect.left + rect.width / 2;
          const targetY = rect.top + rect.height / 2;

          // Faster snapping onto magnetic targets
          ringX.current += (targetX - ringX.current) * 0.25;
          ringY.current += (targetY - ringY.current) * 0.25;
          
          // Size ring to fit the button
          const pad = 12;
          ringRef.current.style.width = `${rect.width + pad}px`;
          ringRef.current.style.height = `${rect.height + pad}px`;
          ringRef.current.style.borderRadius = window.getComputedStyle(magneticElement).borderRadius;
        } else {
          // Standard fluid trailing effect (lerp lag)
          ringX.current += (mouseX.current - ringX.current) * 0.15;
          ringY.current += (mouseY.current - ringY.current) * 0.15;

          // Return to default round shape and size
          ringRef.current.style.width = isHovered ? '48px' : '24px';
          ringRef.current.style.height = isHovered ? '48px' : '24px';
          ringRef.current.style.borderRadius = '50%';
        }

        // Apply translation
        ringRef.current.style.transform = `translate3d(${ringX.current}px, ${ringY.current}px, 0)`;
      }

      animationFrameId = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      document.documentElement.classList.remove('custom-cursor-active');
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mousedown', handleMouseDown);
      window.removeEventListener('mouseup', handleMouseUp);
      document.removeEventListener('mouseleave', handleMouseLeave);
      document.removeEventListener('mouseenter', handleMouseEnter);
      cancelAnimationFrame(animationFrameId);
    };
  }, [mounted, isHovered, magneticElement]);

  if (!mounted) return null;

  return (
    <>
      {/* Global CSS override for cursor none, scoped to fine pointer desktop systems */}
      <style jsx global>{`
        @media (pointer: fine) {
          .custom-cursor-active,
          .custom-cursor-active * {
            cursor: none !important;
          }
        }
      `}</style>

      {/* Center Dot */}
      <div
        ref={dotRef}
        className={cn(
          "fixed top-0 left-0 w-2 h-2 -translate-x-1/2 -translate-y-1/2 bg-brand-600 dark:bg-brand-400 rounded-full pointer-events-none z-9999 transition-opacity duration-300",
          isVisible ? "opacity-100" : "opacity-0"
        )}
      />

      {/* Lagging Outer Ring */}
      <div
        ref={ringRef}
        className={cn(
          "fixed top-0 left-0 w-6 h-6 -translate-x-1/2 -translate-y-1/2 border border-brand-500/50 dark:border-brand-400/50 rounded-full pointer-events-none z-9998 transition-all duration-150 ease-out",
          isVisible ? "opacity-100" : "opacity-0",
          isClicked && "scale-75 border-brand-700 bg-brand-500/10",
          magneticElement && "border-brand-600 bg-brand-600/5 duration-75"
        )}
      />
    </>
  );
}
