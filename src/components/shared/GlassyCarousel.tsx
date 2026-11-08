'use client';

import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ChevronRight, ChevronLeft, Sparkles, ExternalLink, ArrowLeft } from 'lucide-react';
import Link from 'next/link';
import { toPersianDigits } from '@/src/utils/formatters';

export interface GlassyCarouselItem {
  id: string;
  badge?: string;
  badgeColor?: 'cyan' | 'blue' | 'emerald' | 'amber' | 'rose';
  title: string;
  subtitle?: string;
  description: string;
  metric?: string;
  metricLabel?: string;
  category?: string;
  actionUrl?: string;
  actionLabel?: string;
  icon?: string;
  glowColor?: string;
}

interface GlassyCarouselProps {
  items: GlassyCarouselItem[];
  title?: string;
  subtitle?: string;
  autoPlayInterval?: number;
  className?: string;
}

export function GlassyCarousel({
  items,
  title,
  subtitle,
  autoPlayInterval = 6000,
  className = '',
}: GlassyCarouselProps) {
  const [activeIndex, setActiveIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const touchStartX = useRef<number | null>(null);

  const total = items.length;

  useEffect(() => {
    if (isPaused || total <= 1) return;
    const timer = setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % total);
    }, autoPlayInterval);
    return () => clearInterval(timer);
  }, [isPaused, total, autoPlayInterval]);

  const handleNext = () => {
    setActiveIndex((prev) => (prev + 1) % total);
  };

  const handlePrev = () => {
    setActiveIndex((prev) => (prev - 1 + total) % total);
  };

  if (!items || items.length === 0) return null;

  const current = items[activeIndex];

  const badgeColorClasses = {
    cyan: 'bg-cyan-500/20 text-cyan-300 border-cyan-500/40',
    blue: 'bg-blue-500/20 text-blue-300 border-blue-500/40',
    purple: 'bg-sky-500/20 text-sky-300 border-sky-500/40',
    emerald: 'bg-emerald-500/20 text-emerald-300 border-emerald-500/40',
    amber: 'bg-amber-500/20 text-amber-300 border-amber-500/40',
    rose: 'bg-rose-500/20 text-rose-300 border-rose-500/40',
  }[current.badgeColor || 'cyan'];

  return (
    <div
      className={`glass-panel p-5 sm:p-6 relative overflow-hidden ${className}`}
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
      onTouchStart={(e) => {
        touchStartX.current = e.touches[0].clientX;
      }}
      onTouchEnd={(e) => {
        if (touchStartX.current === null) return;
        const diff = touchStartX.current - e.changedTouches[0].clientX;
        if (diff > 40) handleNext();
        else if (diff < -40) handlePrev();
        touchStartX.current = null;
      }}
    >
      {/* Background Ambient Colored Spotlight */}
      <div
        className="absolute -top-20 -left-20 w-72 h-72 rounded-full opacity-30 filter blur-3xl pointer-events-none transition-all duration-700"
        style={{
          background: current.glowColor || 'radial-gradient(circle, #38bdf8, #0284c7)',
        }}
      />
      <div
        className="absolute -bottom-20 -right-20 w-80 h-80 rounded-full opacity-20 filter blur-3xl pointer-events-none transition-all duration-700"
        style={{
          background: current.glowColor || 'radial-gradient(circle, #0284c7, #34d399)',
        }}
      />

      {/* Header bar */}
      <div className="flex items-center justify-between gap-4 mb-4 relative z-10">
        <div>
          {title && (
            <h3 className="text-sm font-black text-white flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-cyan-400 radar-glow inline-block" />
              <span>{title}</span>
            </h3>
          )}
          {subtitle && <p className="text-[11px] text-slate-400 mt-0.5">{subtitle}</p>}
        </div>

        {/* Carousel controls */}
        <div className="flex items-center gap-2">
          <span className="text-[11px] font-mono text-slate-400 px-2 py-0.5 rounded-lg bg-slate-900/40 border border-slate-800">
            {toPersianDigits(activeIndex + 1)} / {toPersianDigits(total)}
          </span>
          <button
            onClick={handlePrev}
            aria-label="اسلاید قبلی"
            className="w-8 h-8 rounded-xl glass-button flex items-center justify-center text-slate-300 hover:text-white"
          >
            <ChevronRight className="w-4 h-4" />
          </button>
          <button
            onClick={handleNext}
            aria-label="اسلاید بعدی"
            className="w-8 h-8 rounded-xl glass-button flex items-center justify-center text-slate-300 hover:text-white"
          >
            <ChevronLeft className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Slide Content with Layered Glass Effect */}
      <div className="relative min-h-[170px] z-10">
        <AnimatePresence mode="wait">
          <motion.div
            key={current.id}
            initial={{ opacity: 0, x: -20, scale: 0.98 }}
            animate={{ opacity: 1, x: 0, scale: 1 }}
            exit={{ opacity: 0, x: 20, scale: 0.98 }}
            transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
            className="glass-card p-5 relative overflow-hidden"
          >
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
              <div className="space-y-2 flex-1">
                <div className="flex items-center gap-2 flex-wrap">
                  {current.badge && (
                    <span className={`text-[10px] font-bold px-2.5 py-1 rounded-full border ${badgeColorClasses}`}>
                      {current.badge}
                    </span>
                  )}
                  {current.category && (
                    <span className="text-[10px] text-slate-400 font-medium">
                      حوزه: {current.category}
                    </span>
                  )}
                </div>

                <h4 className="text-base sm:text-lg font-black text-white flex items-center gap-2">
                  {current.icon && <span>{current.icon}</span>}
                  <span>{current.title}</span>
                </h4>

                {current.subtitle && (
                  <p className="text-xs text-cyan-300 font-medium">{current.subtitle}</p>
                )}

                <p className="text-xs text-slate-300 leading-relaxed max-w-3xl">
                  {current.description}
                </p>
              </div>

              {/* Right side metric or action */}
              <div className="flex flex-row md:flex-col items-center md:items-end justify-between md:justify-center gap-3 pt-3 md:pt-0 border-t md:border-t-0 md:border-r border-slate-800/80 md:pr-5">
                {current.metric && (
                  <div className="text-right">
                    <span className="text-xs text-slate-400 block mb-0.5">{current.metricLabel || 'مقدار شاخص'}</span>
                    <span className="text-xl sm:text-2xl font-black font-mono text-cyan-300 tracking-tight">
                      {current.metric}
                    </span>
                  </div>
                )}

                {current.actionUrl && (
                  <Link
                    href={current.actionUrl}
                    className="flex items-center gap-1.5 px-4 py-2 rounded-xl bg-gradient-to-l from-cyan-600/30 to-cyan-600/30 hover:from-cyan-600/50 hover:to-cyan-600/50 border border-cyan-500/40 text-cyan-200 text-xs font-bold transition-all shadow-md shadow-cyan-950/40"
                  >
                    <span>{current.actionLabel || 'مشاهده تحلیل کامل'}</span>
                    <ArrowLeft className="w-3.5 h-3.5" />
                  </Link>
                )}
              </div>
            </div>
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Pagination dots below */}
      <div className="flex items-center justify-center gap-1.5 mt-4 relative z-10">
        {items.map((it, idx) => (
          <button
            key={it.id}
            onClick={() => setActiveIndex(idx)}
            aria-label={`رفتن به اسلاید ${idx + 1}`}
            className={`h-1.5 rounded-full transition-all duration-300 ${
              idx === activeIndex
                ? 'w-7 bg-gradient-to-r from-cyan-400 to-cyan-400 shadow-sm shadow-cyan-400/50'
                : 'w-2 bg-slate-700 hover:bg-slate-500'
            }`}
          />
        ))}
      </div>
    </div>
  );
}

export default GlassyCarousel;
