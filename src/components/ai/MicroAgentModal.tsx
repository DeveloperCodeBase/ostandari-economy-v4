'use client';

import React from 'react';
import { useCommand } from '@/src/context/CommandContext';
import { toPersianDigits, formatPersianNumber } from '@/src/utils/formatters';
import { X, Sparkles, TrendingUp, Sliders, ArrowLeft, BrainCircuit } from 'lucide-react';
import Link from 'next/link';

export function MicroAgentModal() {
  const { microAgentItem, setMicroAgentItem, selectedCounty } = useCommand();

  if (!microAgentItem) return null;

  const { kpi, mode } = microAgentItem;

  const handleClose = () => {
    setMicroAgentItem(null);
  };

  return (
    <div className="fixed inset-0 bg-black/70 backdrop-blur-md z-50 flex items-center justify-center p-4">
      <div
        className="w-full max-w-lg bg-[#0F1423] border border-cyan-500/30 rounded-2xl p-5 shadow-2xl relative animate-in fade-in zoom-in-95 duration-200"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-center justify-between border-b border-slate-800 pb-3 mb-4">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-cyan-600/20 text-cyan-400 border border-cyan-500/30 flex items-center justify-center">
              {mode === 'why' ? <Sparkles className="w-4 h-4" /> : mode === 'forecast' ? <TrendingUp className="w-4 h-4" /> : <Sliders className="w-4 h-4" />}
            </div>
            <div>
              <h3 className="text-sm font-bold text-white">
                {mode === 'why' && 'تحلیل علّی و ریشه‌یابی ایجنت هوشمند'}
                {mode === 'forecast' && 'پیش‌بینی ۹۰ روزه و باند اطمینان مدل'}
                {mode === 'simulate' && 'شبیه‌سازی اثر شوک شاخص در سناریوساز'}
              </h3>
              <p className="text-xs text-slate-400">
                شاخص: {kpi.title} {selectedCounty ? `(مربوط به شهرستان ${selectedCounty.nameFa})` : '(کل استان تهران)'}
              </p>
            </div>
          </div>
          <button
            onClick={handleClose}
            className="p-1 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition-colors"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Content body based on mode */}
        <div className="space-y-4 text-xs">
          {/* Current value display */}
          <div className="bg-[#161D31] p-3 rounded-xl border border-slate-700/60 flex items-center justify-between">
            <div>
              <span className="text-slate-400 block text-[11px]">مقدار فعلی ثبت‌شده:</span>
              <span className="text-xl font-bold text-white font-mono">
                {typeof kpi.value === 'number' ? formatPersianNumber(kpi.value) : kpi.value} {kpi.unit}
              </span>
            </div>
            <div className="text-left text-[11px] text-slate-400">
              <div>دوره: {kpi.period}</div>
              <div>منبع: {kpi.source}</div>
            </div>
          </div>

          {mode === 'why' && (
            <div className="space-y-3">
              <div className="bg-cyan-950/20 border border-cyan-500/30 p-3 rounded-xl">
                <div className="font-semibold text-cyan-300 mb-1 flex items-center gap-1.5">
                  <BrainCircuit className="w-3.5 h-3.5" />
                  <span>ریشه‌یابی و متغیرهای مداخله‌گر:</span>
                </div>
                <p className="text-slate-200 leading-relaxed text-[11px]">
                  {kpi.agentInsight || 'روند این شاخص به طور مستقیم از تراز منابع بانکی، جریان ورود کالاهای اساسی و سیاست‌های تنظیم بازار استان تهران اثر می‌پذیرد.'}
                </p>
              </div>

              {kpi.formula && (
                <div className="bg-[#161D31] p-2.5 rounded-lg border border-slate-800 text-[11px] text-slate-400">
                  <span className="text-slate-300 font-medium">فرمول محاسباتی: </span>
                  <span className="font-mono text-cyan-300">{kpi.formula}</span>
                </div>
              )}
            </div>
          )}

          {mode === 'forecast' && (
            <div className="space-y-3">
              <div className="bg-cyan-950/20 border border-cyan-500/30 p-3 rounded-xl">
                <div className="font-semibold text-cyan-300 mb-1 flex items-center gap-1.5">
                  <TrendingUp className="w-3.5 h-3.5" />
                  <span>برآورد ۹۰ روز آینده (افق سه‌ماهه):</span>
                </div>
                <p className="text-slate-200 leading-relaxed text-[11px]">
                  {kpi.prediction90d || 'بر اساس الگوی سری زمانی فصلی استان تهران، انتظار می‌رود روند فعلی با دامنه نوسان حداکثر ۳.۵٪ به سمت نقطه بهینه حرکت کند.'}
                </p>
              </div>

              <div className="bg-[#161D31] p-3 rounded-xl border border-slate-700/60">
                <div className="text-slate-400 text-[11px] mb-2 font-medium">باند اطمینان پیش‌بینی (۹۵٪):</div>
                <div className="w-full h-3 bg-slate-800 rounded-full overflow-hidden flex items-center">
                  <div className="h-full bg-cyan-500/80 rounded-full" style={{ width: '68%' }} />
                </div>
                <div className="flex justify-between text-[10px] text-slate-500 font-mono mt-1">
                  <span>حد پایین: {toPersianDigits(92)}٪</span>
                  <span className="text-cyan-400 font-bold">محتمل‌ترین سناریو</span>
                  <span>حد بالا: {toPersianDigits(108)}٪</span>
                </div>
              </div>
            </div>
          )}

          {mode === 'simulate' && (
            <div className="space-y-3">
              <div className="bg-amber-950/20 border border-amber-500/30 p-3 rounded-xl">
                <div className="font-semibold text-amber-300 mb-1 flex items-center gap-1.5">
                  <Sliders className="w-3.5 h-3.5" />
                  <span>انتقال مستقیم شاخص به اتاق جنگ اقتصادی:</span>
                </div>
                <p className="text-slate-200 leading-relaxed text-[11px]">
                  این شاخص می‌تواند به عنوان متغیر شوک یا هدف در آزمایشگاه سناریوسازی استانداری تهران شبیه‌سازی شود تا اثرات متقاطع آن بر ۱۶ شهرستان محاسبه گردد.
                </p>
              </div>

              <Link
                href="/ai-center/scenario-war-room"
                onClick={handleClose}
                className="w-full py-2.5 px-4 bg-gradient-to-l from-cyan-600 to-indigo-600 hover:from-cyan-500 hover:to-indigo-500 text-white font-semibold rounded-xl flex items-center justify-center gap-2 shadow-lg shadow-cyan-950/50 transition-all text-xs"
              >
                <span>باز کردن سناریوساز با این متغیر</span>
                <ArrowLeft className="w-4 h-4" />
              </Link>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="mt-5 pt-3 border-t border-slate-800 flex justify-end">
          <button
            onClick={handleClose}
            className="px-4 py-1.5 bg-slate-800 hover:bg-slate-700 text-slate-300 rounded-lg text-xs transition-colors"
          >
            بستن
          </button>
        </div>
      </div>
    </div>
  );
}
