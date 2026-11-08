'use client';

import React, { useState } from 'react';
import { TEHRAN_COUNTY_PROFILES } from '@/src/data/tehranMasterData';
import { InPageAgentPanel } from '@/src/components/ai/InPageAgentPanel';
import { toPersianDigits, formatPersianNumber } from '@/src/utils/formatters';
import {
  Users,
  Briefcase,
  Home,
  CheckCircle2,
  Sliders,
  TrendingDown,
  Building,
  GraduationCap,
  Sparkles,
} from 'lucide-react';
import { DomainScenarioAndPredictionEngine } from '@/src/components/shared/DomainScenarioAndPredictionEngine';

export function LaborWelfareView() {
  const [note18CreditHemmat, setNote18CreditHemmat] = useState<number>(14.5);
  const [allocationNotice, setAllocationNotice] = useState<string | null>(null);

  // 180,000 jobs target: 138,200 verified registered so far (76.7%)
  const totalTarget = 180000;
  const realizedJobs = 138200;
  const realizationPercent = Math.round((realizedJobs / totalTarget) * 100);

  const handleAllocate = () => {
    setAllocationNotice(
      `مبلغ ${toPersianDigits(note18CreditHemmat)} همت تسهیلات اشتغال‌زایی تبصره ۱۸ با نرخ ترجیحی به طرح‌های اشتغال پاکدشت، بهارستان، ملارد، ورامین و پردیس ابلاغ شد.`
    );
  };

  return (
    <div className="space-y-6">
      {/* 1. Header Bar */}
      <div className="flex flex-wrap items-center justify-between gap-3 border-b border-[var(--lg-border)] pb-3">
        <div>
          <div className="text-[11px] text-[var(--lg-muted)] flex items-center gap-1.5 font-medium mb-1">
            <span>بازار کار، تعاون و رفاه اجتماعی</span>
            <span>/</span>
            <span className="text-[var(--lg-accent)]">سامانه رصد اشتغال، نرخ بیکاری و مسکن کارگری (Labor)</span>
          </div>
          <h1 className="text-xl md:text-2xl font-black text-[var(--lg-ink)] flex items-center gap-2">
            <span>داشبورد رصد ۱۸۰,۰۰۰ فرصت شغلی جدید و رفاه کارگران استان تهران</span>
          </h1>
        </div>

        <span className="text-xs font-mono font-bold text-emerald-400 bg-emerald-500/15 px-3 py-1.5 rounded-xl border border-emerald-500/30">
          نرخ بیکاری: ۴.۸٪ (پایین‌ترین سطح تاریخی)
        </span>
      </div>

      {/* 2. Resident AI Specialist Agent 9 (Labor Economist) */}
      <InPageAgentPanel
        agentCode="AGT-09"
        pageTitle="میز تحلیلگر اشتغال، بیمه و مسکن کارگری تهران"
      />

      {allocationNotice && (
        <div className="p-3.5 rounded-2xl bg-emerald-500/15 border border-emerald-500/30 text-xs text-emerald-200 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
            <span>{allocationNotice}</span>
          </div>
          <button
            onClick={() => setAllocationNotice(null)}
            className="text-emerald-400 font-bold hover:underline"
          >
            بستن
          </button>
        </div>
      )}

      {/* 3. Top Macro Strip */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {/* Card 1: 180k Target Progress */}
        <div className="card">
          <div className="flex justify-between text-xs text-slate-400 mb-1">
            <span>تعهد اشتغال استان (سال ۱۴۰۵)</span>
            <span className="font-mono text-emerald-400 font-bold">{toPersianDigits(realizationPercent)}٪</span>
          </div>
          <div className="text-2xl font-black text-white font-mono">
            {formatPersianNumber(realizedJobs)} / {formatPersianNumber(totalTarget)}
          </div>
          <div className="w-full h-2 rounded-full bg-white/10 overflow-hidden mt-2">
            <div
              className="h-full bg-gradient-to-l from-emerald-400 to-teal-500 rounded-full"
              style={{ width: `${realizationPercent}%` }}
            />
          </div>
          <div className="text-[10px] text-slate-400 mt-1.5">
            ثبت در سامانه ملی رصد اشتغال وزارت کار
          </div>
        </div>

        {/* Card 2: Unemployment */}
        <div className="card">
          <div className="text-xs text-slate-400 mb-1">نرخ بیکاری کل استان</div>
          <div className="text-2xl font-black text-emerald-400 font-mono">۴.۸٪</div>
          <div className="text-[11px] text-slate-300 mt-1">
            کاهش ۰.۸ درصدی نسبت به سال گذشته
          </div>
          <div className="text-[10px] text-slate-400 mt-1">
            بیکاری فارغ‌التحصیلان: ۹.۴٪
          </div>
        </div>

        {/* Card 3: Social Security Insured */}
        <div className="card">
          <div className="text-xs text-slate-400 mb-1">بیمه‌شدگان اصلی تامین اجتماعی</div>
          <div className="text-2xl font-black text-cyan-300 font-mono">۳,۴۸۰,۰۰۰ <span className="text-xs font-normal">نفر</span></div>
          <div className="text-[11px] text-slate-300 mt-1">
            پوشش ۶۸٪ جمعیت فعال استان
          </div>
          <div className="text-[10px] text-emerald-400 mt-1">
            +۷۴,۰۰۰ بیمه‌شده جدید در صنعت
          </div>
        </div>

        {/* Card 4: Worker Housing */}
        <div className="card">
          <div className="text-xs text-slate-400 mb-1">واحدهای مسکن کارگری فعال</div>
          <div className="text-2xl font-black text-sky-300 font-mono">۲۸,۵۰۰ <span className="text-xs font-normal">واحد</span></div>
          <div className="text-[11px] text-slate-300 mt-1">
            در شهرهای پرند، پردیس و ایوانکی
          </div>
          <div className="text-[10px] text-sky-400 mt-1">
            تسهیلات ۵۵۰ میلیون تومانی نهضت ملی
          </div>
        </div>
      </div>

      {/* 4. Dedicated Labor What-If Scenario Levers & 30-Day Predictive Engine */}
      <DomainScenarioAndPredictionEngine moduleId="labor" />

      {/* 5. County Employment Realization Table */}
      <div className="card space-y-3">
        <div className="flex items-center justify-between border-b border-[var(--lg-border)] pb-2.5">
          <div className="flex items-center gap-2">
            <Briefcase className="w-4 h-4 text-cyan-400" />
            <h3 className="text-sm font-black text-white">
              جدول برش شهرستانی تعهد و تحقق اشتغال سال ۱۴۰۵ در ۱۶ فرمانداری استان تهران
            </h3>
          </div>
          <span className="text-xs text-slate-400 font-mono">سامانه رصد اشتغال</span>
        </div>

        <div className="overflow-x-auto max-h-[320px]">
          <table className="w-full text-right text-xs">
            <thead>
              <tr className="border-b border-white/10 text-slate-400 text-[11px]">
                <th className="py-2 px-3">شهرستان</th>
                <th className="py-2 px-3">فرمانداری</th>
                <th className="py-2 px-3">تعهد اشتغال ۱۴۰۵</th>
                <th className="py-2 px-3">تحقق یافته (نفر)</th>
                <th className="py-2 px-3">درصد تحقق</th>
                <th className="py-2 px-3">نرخ بیکاری</th>
                <th className="py-2 px-3">بخش غالب اشتغال</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/5 text-slate-300">
              {TEHRAN_COUNTY_PROFILES.map((c) => {
                const realized = Math.round((c.employmentTarget1405 * c.employmentRealizedPercent) / 100);
                return (
                  <tr key={c.id} className="hover:bg-white/5">
                    <td className="py-2 px-3 font-bold text-white">{c.name}</td>
                    <td className="py-2 px-3 text-[11px] text-slate-400">{c.governorateType}</td>
                    <td className="py-2 px-3 font-mono font-bold text-white">
                      {formatPersianNumber(c.employmentTarget1405)}
                    </td>
                    <td className="py-2 px-3 font-mono text-cyan-300 font-bold">
                      {formatPersianNumber(realized)}
                    </td>
                    <td className="py-2 px-3 font-mono">
                      <span className="px-2 py-0.5 rounded-full bg-emerald-500/15 text-emerald-300 font-bold text-[10px]">
                        {toPersianDigits(c.employmentRealizedPercent)}٪
                      </span>
                    </td>
                    <td className="py-2 px-3 font-mono text-amber-300 font-bold">
                      {toPersianDigits(c.unemploymentRate)}٪
                    </td>
                    <td className="py-2 px-3 text-[11px] text-slate-400">
                      {c.keyEconomicPoles[0] || 'صنعت و خدمات'}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>

      {/* 5. Interactive Note 18 Employment Credit Allocator */}
      <div className="card space-y-4">
        <div className="flex items-center justify-between border-b border-[var(--lg-border)] pb-2">
          <div className="flex items-center gap-2">
            <Sliders className="w-4 h-4 text-emerald-400" />
            <h3 className="text-sm font-black text-white">
              اهرم تخصیص تسهیلات اشتغال‌زایی تبصره ۱۸ قانون بودجه (نرخ ترجیحی ۱۰٪)
            </h3>
          </div>
          <span className="text-xs text-slate-400">کارگروه اشتغال و سرمایه‌گذاری استان</span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-center">
          <div className="space-y-3">
            <div>
              <div className="flex justify-between text-xs font-bold mb-1">
                <span>مبلغ کل اعتبار تبصره ۱۸ استان تهران:</span>
                <span className="font-mono text-emerald-400">{toPersianDigits(note18CreditHemmat)} همت</span>
              </div>
              <input
                type="range"
                min="5"
                max="30"
                step="0.5"
                value={note18CreditHemmat}
                onChange={(e) => setNote18CreditHemmat(Number(e.target.value))}
                className="w-full accent-emerald-500 cursor-pointer"
              />
              <div className="flex justify-between text-[10px] text-slate-400 mt-1">
                <span>حداقل: ۵ همت</span>
                <span>حداکثر مصوب: ۳۰ همت</span>
              </div>
            </div>

            <div className="text-xs text-slate-300">
              با اولویت حمایت از کارگاه‌های دانش‌بنیان پردیس، تولید کفش بهارستان، پوشاک قرچک و گلخانه‌های پاکدشت و پیشوا.
            </div>
          </div>

          <div className="space-y-3">
            <button
              onClick={handleAllocate}
              className="w-full py-2.5 rounded-xl bg-gradient-to-l from-cyan-600 via-indigo-600 to-sky-700 hover:from-cyan-500 text-white font-bold text-xs flex items-center justify-center gap-1.5 transition-all shadow-md"
            >
              <CheckCircle2 className="w-4 h-4" />
              <span>ابلاغ سهمیه اعتباری تبصره ۱۸ به بانک‌های عامل</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default LaborWelfareView;
