'use client';

import React from 'react';
import { useCommand } from '@/src/context/CommandContext';
import { formatPersianNumber } from '@/src/utils/formatters';
import { X, ShieldCheck, Database, Calendar, Award, ExternalLink } from 'lucide-react';

export function DataProvenanceModal() {
  const { provenanceItem, setProvenanceItem } = useCommand();

  if (!provenanceItem) return null;

  const handleClose = () => {
    setProvenanceItem(null);
  };

  const getLevelBadge = (level: 'A' | 'B' | 'C' | 'D') => {
    switch (level) {
      case 'A':
        return {
          title: 'سطح A — رسمی ملی و استانی',
          desc: 'داده‌های تاییدشده ثبتی و گزارش‌های رسمی مرکز آمار ایران، بانک مرکزی، وزارت اقتصاد و گمرکات.',
          color: 'bg-emerald-500/20 text-emerald-300 border-emerald-500/30',
        };
      case 'B':
        return {
          title: 'سطح B — گزارش رسمی دستگاهی و رسانه‌ای',
          desc: 'اطلاعیه‌های پورتال استانداری تهران، گزارش‌های فصلی مدیران کل و خبرگزاری رسمی ایرنا.',
          color: 'bg-cyan-500/20 text-cyan-300 border-cyan-500/30',
        };
      case 'C':
        return {
          title: 'سطح C — واکشی زنده وب توسط ایجنت هوش مصنوعی',
          desc: 'آمارهای لحظه‌ای واکشی‌شده توسط موتور Gemini AI با استناد به مراجع معتبر وب (Search Grounding).',
          color: 'bg-cyan-500/20 text-cyan-300 border-cyan-500/30',
        };
      case 'D':
        return {
          title: 'سطح D — شبیه‌سازی و برآورد هوش مصنوعی',
          desc: 'خروجی‌های الگوریتم شبیه‌ساز سناریو و آزمون تنش؛ جنبه تصمیم‌یاری دارد و آمار ثبتی محسوب نمی‌شود.',
          color: 'bg-amber-500/20 text-amber-300 border-amber-500/30',
        };
    }
  };

  const levelInfo = getLevelBadge(provenanceItem.provenanceLevel);

  return (
    <div className="fixed inset-0 bg-black/70 backdrop-blur-md z-50 flex items-center justify-center p-4">
      <div
        className="w-full max-w-md bg-[#0F1423] border border-cyan-500/30 rounded-2xl p-5 shadow-2xl relative animate-in fade-in zoom-in-95 duration-200 text-xs"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-center justify-between border-b border-slate-800 pb-3 mb-4">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 flex items-center justify-center">
              <ShieldCheck className="w-4 h-4" />
            </div>
            <div>
              <h3 className="text-sm font-bold text-white">شناسنامه و اصالت داده (Data Provenance)</h3>
              <p className="text-[11px] text-slate-400">راستی‌آزمایی مستندات و زنجیره اعتماد داده‌ها</p>
            </div>
          </div>
          <button
            onClick={handleClose}
            className="p-1 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition-colors"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        <div className="space-y-3.5">
          {/* KPI Title & Value */}
          <div className="bg-[#161D31] p-3 rounded-xl border border-slate-700/60">
            <div className="text-slate-400 text-[11px]">{provenanceItem.title}</div>
            <div className="text-xl font-bold text-white font-mono mt-1">
              {typeof provenanceItem.value === 'number' ? formatPersianNumber(provenanceItem.value) : provenanceItem.value}{' '}
              <span className="text-xs text-slate-400 font-normal">{provenanceItem.unit}</span>
            </div>
          </div>

          {/* Level Badge */}
          <div className={`p-3 rounded-xl border ${levelInfo.color}`}>
            <div className="font-bold flex items-center gap-1.5 mb-1">
              <Award className="w-4 h-4" />
              <span>{levelInfo.title}</span>
            </div>
            <p className="text-[11px] leading-relaxed opacity-90">{levelInfo.desc}</p>
          </div>

          {/* Source Details */}
          <div className="space-y-2 bg-[#161D31]/70 p-3 rounded-xl border border-slate-800">
            <div className="flex items-center justify-between text-slate-300">
              <span className="flex items-center gap-1.5 text-slate-400">
                <Database className="w-3.5 h-3.5 text-cyan-400" />
                مرجع رسمی داده:
              </span>
              <strong className="text-white">{provenanceItem.source}</strong>
            </div>

            <div className="flex items-center justify-between text-slate-300 border-t border-slate-800/80 pt-2">
              <span className="flex items-center gap-1.5 text-slate-400">
                <Calendar className="w-3.5 h-3.5 text-cyan-400" />
                دوره زمانی استخراج:
              </span>
              <strong className="text-white">{provenanceItem.period}</strong>
            </div>

            {provenanceItem.formula && (
              <div className="border-t border-slate-800/80 pt-2 text-[11px]">
                <div className="text-slate-400 mb-1">روش‌شناسی و فرمول محاسباتی:</div>
                <div className="font-mono text-cyan-300 bg-[#0F1423] p-1.5 rounded border border-slate-800">
                  {provenanceItem.formula}
                </div>
              </div>
            )}
          </div>
        </div>

        <div className="mt-5 pt-3 border-t border-slate-800 flex items-center justify-between">
          <a
            href="https://ostan-th.ir"
            target="_blank"
            rel="noopener noreferrer"
            className="text-[11px] text-cyan-400 hover:underline flex items-center gap-1"
          >
            <span>استعلام از پورتال استانداری تهران</span>
            <ExternalLink className="w-3 h-3" />
          </a>
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
