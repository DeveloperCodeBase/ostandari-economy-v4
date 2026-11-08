'use client';

import React, { useState, useEffect, useRef, useCallback } from 'react';
import { ChevronRight, ChevronLeft, Maximize2, X, Sparkles, TrendingUp, AlertTriangle, ArrowUpRight } from 'lucide-react';
import { toPersianDigits, formatPersianNumber } from '@/src/utils/formatters';

export interface GlassyCarouselItem {
  id: string;
  title: string;
  subtitle?: string;
  badge?: string;
  badgeColor?: string;
  metricLabel?: string;
  metricValue?: string | number;
  secondaryLabel?: string;
  secondaryValue?: string | number;
  highlightText?: string;
  glowColor?: string;
  washColor?: string;
  icon?: React.ReactNode;
  details?: {
    population?: number;
    gdpShare?: number;
    taxRevenue?: number;
    unemployment?: number;
    activeUnits?: number;
    stagnantUnits?: number;
    bakeries?: number;
    powerImbalance?: number;
    topAlert?: string;
    keyPoles?: string[];
  };
  onSelectAction?: (id: string) => void;
}

export function computeGlassyCardPose(distance: number, scale = 1, gathered = false) {
  const depth = Math.abs(distance);
  const side = Math.sign(distance);

  if (gathered && depth > 0) {
    return {
      transform: `translate(-50%, -50%) translate3d(${side * 9 * scale}px, 0px, ${-60 * scale}px) rotateY(${side * -3}deg) scale(0.88)`,
      opacity: 0,
      filter: 'brightness(0.75)',
      zIndex: 10 - depth,
      pointerEvents: 'none' as const,
    };
  }

  const x = side * (depth === 1 ? 156 : 156 + (depth - 1) * 98) * scale;
  const y = (depth ? 8 : 0) * scale;
  const z = -Math.min(depth, 5) * 78 * scale;
  const rotateY = side * -Math.min(27, 19 + depth * 3);
  const cardScale = depth ? Math.max(0.48, 1 - depth * 0.095) : 1;
  const opacity = depth > 3 ? 0 : depth === 0 ? 1 : depth === 1 ? 0.76 : depth === 2 ? 0.44 : 0.2;
  const brightness = depth === 0 ? 1 : depth === 1 ? 0.88 : 0.75;

  return {
    transform: `translate(-50%, -50%) translate3d(${x}px, ${y}px, ${z}px) rotateY(${rotateY}deg) scale(${cardScale})`,
    opacity,
    filter: `brightness(${brightness})`,
    zIndex: 20 - Math.ceil(depth),
    pointerEvents: depth > 3 ? ('none' as const) : ('auto' as const),
  };
}

interface Glassy3DCarouselProps {
  items: GlassyCarouselItem[];
  selectedIndex?: number;
  onItemSelect?: (item: GlassyCarouselItem, index: number) => void;
  title?: string;
  badge?: string;
}

export function Glassy3DCarousel({
  items,
  selectedIndex = 0,
  onItemSelect,
  title = 'رصد سه‌بعدی ۱۶ شهرستان و قطب‌های اقتصادی استان تهران',
  badge = 'کروسل ۳ بعدی شیشه‌ای',
}: Glassy3DCarouselProps) {
  const [currentIndex, setCurrentIndex] = useState(selectedIndex);
  const [isExpanded, setIsExpanded] = useState(false);
  const [isGathered, setIsGathered] = useState(false);
  const stageRef = useRef<HTMLDivElement>(null);
  const startXRef = useRef<number | null>(null);

  const activeItem = items[currentIndex] || items[0];

  const goNext = useCallback(() => {
    setCurrentIndex((prev) => (prev + 1) % items.length);
  }, [items.length]);

  const goPrev = useCallback(() => {
    setCurrentIndex((prev) => (prev - 1 + items.length) % items.length);
  }, [items.length]);

  const selectCard = (index: number) => {
    if (index === currentIndex) {
      setIsExpanded(true);
    } else {
      setCurrentIndex(index);
    }
    if (onItemSelect && items[index]) {
      onItemSelect(items[index], index);
    }
  };

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (isExpanded) {
        if (e.key === 'Escape') setIsExpanded(false);
        return;
      }
      if (e.key === 'ArrowRight' || e.key === 'ArrowDown') {
        goNext();
      } else if (e.key === 'ArrowLeft' || e.key === 'ArrowUp') {
        goPrev();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [goNext, goPrev, isExpanded]);

  // Touch / Pointer swipe
  const handlePointerDown = (e: React.PointerEvent) => {
    startXRef.current = e.clientX;
  };

  const handlePointerUp = (e: React.PointerEvent) => {
    if (startXRef.current === null) return;
    const diff = e.clientX - startXRef.current;
    if (Math.abs(diff) > 40) {
      if (diff < 0) {
        goNext();
      } else {
        goPrev();
      }
    }
    startXRef.current = null;
  };

  const glowColor = activeItem?.glowColor || 'var(--lg-accent)';
  const washColor = activeItem?.washColor || 'var(--lg-panel)';

  return (
    <div className="relative w-full overflow-hidden rounded-[28px] border border-[var(--lg-border)] bg-[var(--lg-inner)] p-4 sm:p-6 shadow-2xl">
      {/* Dynamic Background Glow */}
      <div
        className="gc-glow"
        style={
          {
            position: 'absolute',
            inset: 0,
            pointerEvents: 'none',
            background: `radial-gradient(circle at 50% 50%, ${glowColor}25 0%, ${washColor}15 50%, transparent 80%)`,
            filter: 'blur(50px)',
            transition: 'background 0.6s ease',
          } as React.CSSProperties
        }
      />

      {/* Top Header Strip */}
      <div className="relative z-10 flex flex-wrap items-center justify-between gap-3 border-b border-[var(--lg-border)] pb-3 mb-4">
        <div className="flex items-center gap-2.5">
          <span className="w-2.5 h-2.5 rounded-full bg-cyan-400 radar-glow inline-block" />
          <h3 className="text-sm md:text-base font-black text-[var(--lg-ink)] tracking-tight">
            {title}
          </h3>
          <span className="vista-badge text-[11px] px-2 py-0.5">
            {badge}
          </span>
        </div>

        {/* Carousel Controls */}
        <div className="flex items-center gap-2">
          <button
            onClick={() => setIsGathered((prev) => !prev)}
            title="حالت جمع‌شده / باز"
            className="px-2.5 py-1 text-[11px] font-medium rounded-lg border border-[var(--lg-border)] text-[var(--lg-secondary)] hover:text-[var(--lg-ink)] transition-colors glass-button"
          >
            {isGathered ? 'نمایش پروانه‌ای' : 'تمرکز روی مرکز'}
          </button>

          <button
            onClick={goPrev}
            aria-label="کارت قبلی"
            className="w-8 h-8 rounded-full border border-[var(--lg-border)] flex items-center justify-center text-[var(--lg-secondary)] hover:text-[var(--lg-ink)] hover:border-[var(--lg-accent)] transition-all glass"
          >
            <ChevronRight className="w-4 h-4" />
          </button>

          <span className="font-mono text-xs text-[var(--lg-muted)] px-1">
            {toPersianDigits(currentIndex + 1)} / {toPersianDigits(items.length)}
          </span>

          <button
            onClick={goNext}
            aria-label="کارت بعدی"
            className="w-8 h-8 rounded-full border border-[var(--lg-border)] flex items-center justify-center text-[var(--lg-secondary)] hover:text-[var(--lg-ink)] hover:border-[var(--lg-accent)] transition-all glass"
          >
            <ChevronLeft className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* 3D Stage Viewport */}
      <div
        ref={stageRef}
        onPointerDown={handlePointerDown}
        onPointerUp={handlePointerUp}
        className="gc-stage relative select-none touch-pan-y"
        style={{ height: '390px' }}
      >
        <div className="gc-deck">
          {items.map((item, idx) => {
            const distance = idx - currentIndex;
            const pose = computeGlassyCardPose(distance, 1, isGathered);
            const isActive = idx === currentIndex;

            return (
              <div
                key={item.id}
                onClick={() => selectCard(idx)}
                className={`gc-card ${isActive ? 'is-active' : ''}`}
                style={{
                  ...pose,
                  borderColor: isActive ? item.glowColor || 'var(--lg-accent)' : undefined,
                  boxShadow: isActive
                    ? `0 0 24px ${item.glowColor || 'var(--lg-accent)'}40, 0 20px 40px -15px rgba(0,0,0,0.7)`
                    : undefined,
                }}
              >
                {/* Card Head */}
                <div className="p-4 flex flex-col justify-between h-full text-right relative overflow-hidden">
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <span
                        className="text-[10px] px-2 py-0.5 rounded-full font-bold border"
                        style={{
                          backgroundColor: `${item.glowColor || 'var(--lg-accent)'}20`,
                          color: item.glowColor || 'var(--lg-accent)',
                          borderColor: `${item.glowColor || 'var(--lg-accent)'}40`,
                        }}
                      >
                        {item.badge || 'استان تهران'}
                      </span>
                      {isActive && (
                        <span className="w-2 h-2 rounded-full bg-emerald-400 radar-glow inline-block" />
                      )}
                    </div>

                    <h4 className="text-base font-black text-white tracking-tight mt-1">
                      {item.title}
                    </h4>

                    {item.subtitle && (
                      <p className="text-[11px] text-[var(--lg-muted)] line-clamp-1">
                        {item.subtitle}
                      </p>
                    )}
                  </div>

                  {/* Card Center Metrics */}
                  <div className="my-auto py-2 space-y-2">
                    {item.metricValue !== undefined && (
                      <div className="rounded-xl p-2.5 border border-white/10 bg-white/5">
                        <div className="text-[10px] text-[var(--lg-faint)]">
                          {item.metricLabel || 'شاخص اصلی'}
                        </div>
                        <div className="text-xl font-black text-white font-mono mt-0.5">
                          {typeof item.metricValue === 'number'
                            ? formatPersianNumber(item.metricValue)
                            : toPersianDigits(item.metricValue)}
                        </div>
                      </div>
                    )}

                    {item.secondaryValue !== undefined && (
                      <div className="flex items-center justify-between text-[11px] px-1 text-[var(--lg-secondary)]">
                        <span>{item.secondaryLabel}</span>
                        <span className="font-bold text-cyan-300 font-mono">
                          {toPersianDigits(item.secondaryValue)}
                        </span>
                      </div>
                    )}
                  </div>

                  {/* Card Footer: Click Prompt / Morph Action */}
                  <div className="pt-2 border-t border-white/10 flex items-center justify-between text-[11px]">
                    <span className="text-[var(--lg-muted)] text-[10px]">
                      {isActive ? 'کلیک جهت باز کردن شناسنامه' : 'کلیک جهت چرخش'}
                    </span>
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        selectCard(idx);
                        setIsExpanded(true);
                      }}
                      className="p-1 rounded-lg hover:bg-white/10 text-white/80 transition-colors"
                      title="مشاهده جزئیات کامل"
                    >
                      <Maximize2 className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Navigation Bullets Track */}
      <div className="flex items-center justify-center gap-1.5 pt-3">
        {items.map((item, idx) => (
          <button
            key={item.id}
            onClick={() => setCurrentIndex(idx)}
            title={item.title}
            aria-label={`رفتن به ${item.title}`}
            className={`transition-all duration-300 rounded-full ${
              idx === currentIndex
                ? 'w-6 h-2 bg-[var(--lg-accent)] shadow-lg shadow-[var(--lg-accent)]/50'
                : 'w-2 h-2 bg-white/20 hover:bg-white/40'
            }`}
          />
        ))}
      </div>

      {/* Morph Modal / Detailed Drawer (.gc-morph) */}
      {isExpanded && activeItem && (
        <div
          role="dialog"
          aria-modal="true"
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-md animate-in fade-in duration-200"
          onClick={() => setIsExpanded(false)}
        >
          <div
            onClick={(e) => e.stopPropagation()}
            className="relative w-full max-w-2xl rounded-3xl border border-[var(--lg-border-strong)] bg-[var(--lg-popup)] p-6 shadow-2xl text-right overflow-hidden text-[var(--lg-ink)]"
            style={{
              boxShadow: `0 25px 60px -15px ${glowColor}40, inset 0 1px 0 var(--lg-edge)`,
            }}
          >
            {/* Top Close Button */}
            <div className="flex items-center justify-between border-b border-[var(--lg-border)] pb-3 mb-4">
              <div className="flex items-center gap-2">
                <span className="w-3 h-3 rounded-full bg-emerald-400 radar-glow inline-block" />
                <h3 className="text-lg font-black text-white">
                  شناسنامه تفصیلی و تحلیلی: {activeItem.title}
                </h3>
              </div>
              <button
                onClick={() => setIsExpanded(false)}
                className="w-8 h-8 rounded-full border border-[var(--lg-border)] flex items-center justify-center text-[var(--lg-secondary)] hover:text-white transition-colors glass"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* Quick Stats Grid */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5 mb-4">
              {activeItem.details?.population && (
                <div className="p-3 rounded-xl bg-white/5 border border-white/10">
                  <div className="text-[10px] text-[var(--lg-muted)]">جمعیت برآوردی</div>
                  <div className="text-base font-black text-white font-mono mt-0.5">
                    {toPersianDigits(activeItem.details.population.toLocaleString('fa-IR'))}
                  </div>
                </div>
              )}
              {activeItem.details?.gdpShare !== undefined && (
                <div className="p-3 rounded-xl bg-white/5 border border-white/10">
                  <div className="text-[10px] text-[var(--lg-muted)]">سهم GDP استانی</div>
                  <div className="text-base font-black text-cyan-400 font-mono mt-0.5">
                    {toPersianDigits(activeItem.details.gdpShare)}٪
                  </div>
                </div>
              )}
              {activeItem.details?.taxRevenue !== undefined && (
                <div className="p-3 rounded-xl bg-white/5 border border-white/10">
                  <div className="text-[10px] text-[var(--lg-muted)]">درآمد مالیاتی ۵ماهه</div>
                  <div className="text-base font-black text-emerald-400 font-mono mt-0.5">
                    {toPersianDigits(activeItem.details.taxRevenue)} همت
                  </div>
                </div>
              )}
              {activeItem.details?.unemployment !== undefined && (
                <div className="p-3 rounded-xl bg-white/5 border border-white/10">
                  <div className="text-[10px] text-[var(--lg-muted)]">نرخ بیکاری</div>
                  <div className="text-base font-black text-amber-400 font-mono mt-0.5">
                    {toPersianDigits(activeItem.details.unemployment)}٪
                  </div>
                </div>
              )}
            </div>

            {/* Crisis Alert Banner */}
            {activeItem.details?.topAlert && (
              <div className="p-3 rounded-xl bg-rose-500/15 border border-rose-500/30 flex items-start gap-2.5 text-xs text-rose-200 mb-4">
                <AlertTriangle className="w-4 h-4 text-rose-400 shrink-0 mt-0.5" />
                <div>
                  <span className="font-bold">هشدار اولویت‌دار هوش مصنوعی: </span>
                  {activeItem.details.topAlert}
                </div>
              </div>
            )}

            {/* Key Poles List */}
            {activeItem.details?.keyPoles && (
              <div className="space-y-1.5 mb-4">
                <div className="text-xs font-bold text-[var(--lg-secondary)]">قطب‌های اقتصادی و زیرساخت‌های کلیدی:</div>
                <div className="flex flex-wrap gap-1.5">
                  {activeItem.details.keyPoles.map((pole, pIdx) => (
                    <span
                      key={pIdx}
                      className="px-2.5 py-1 rounded-lg text-xs font-medium border border-white/10 bg-white/5 text-slate-200"
                    >
                      {pole}
                    </span>
                  ))}
                </div>
              </div>
            )}

            {/* Action Buttons */}
            <div className="flex items-center justify-end gap-2.5 pt-3 border-t border-[var(--lg-border)]">
              <button
                onClick={() => {
                  setIsExpanded(false);
                  if (activeItem.onSelectAction) {
                    activeItem.onSelectAction(activeItem.id);
                  }
                }}
                className="px-4 py-2 rounded-xl bg-gradient-to-l from-cyan-600 to-indigo-600 hover:from-cyan-500 hover:to-indigo-500 text-white font-bold text-xs flex items-center gap-1.5 shadow-lg shadow-cyan-950/60 transition-all"
              >
                <span>اعمال تمرکز روی این شهرستان</span>
                <ArrowUpRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default Glassy3DCarousel;
