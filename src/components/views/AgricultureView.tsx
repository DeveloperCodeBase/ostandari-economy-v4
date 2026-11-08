'use client';

import React, { useState } from 'react';
import { LiquidCharts } from '@/src/utils/liquidCharts';
import { InPageAgentPanel } from '@/src/components/ai/InPageAgentPanel';
import { toPersianDigits, formatPersianNumber } from '@/src/utils/formatters';
import {
  Sprout,
  Droplets,
  TrendingUp,
  Sliders,
  CheckCircle2,
  Layers,
  Sparkles,
  Wheat,
} from 'lucide-react';
import { DomainScenarioAndPredictionEngine } from '@/src/components/shared/DomainScenarioAndPredictionEngine';

export function AgricultureView() {
  const [soybeanMealAllocationTons, setSoybeanMealAllocationTons] = useState<number>(18500);
  const [cornAllocationTons, setCornAllocationTons] = useState<number>(24000);
  const [feedNotice, setFeedNotice] = useState<string | null>(null);

  // Cohort Dual Curve: Greenhouse Production (Series A) vs Traditional (Series B) over 6 months
  const greenhouseOutput = [140, 210, 320, 480, 590, 720]; // Tons per hectare efficiency index
  const traditionalOutput = [35, 42, 50, 68, 75, 82];
  const cohortLabels = ['فروردین', 'اردیبهشت', 'خرداد', 'تیر', 'مرداد', 'شهریور'];

  const handleFeedAllocation = () => {
    setFeedNotice(
      `حواله الکترونیکی توزیع ${formatPersianNumber(soybeanMealAllocationTons)} تن کنجاله سویا و ${formatPersianNumber(cornAllocationTons)} تن ذرت دامی در سامانه بازارگاه برای دامداری‌های شیری اسلامشهر، ری، ورامین و پاکدشت صادر شد.`
    );
  };

  return (
    <div className="space-y-6">
      {/* 1. Header Bar */}
      <div className="flex flex-wrap items-center justify-between gap-3 border-b border-[var(--lg-border)] pb-3">
        <div>
          <div className="text-[11px] text-[var(--lg-muted)] flex items-center gap-1.5 font-medium mb-1">
            <span>جهاد کشاورزی و امنیت غذایی</span>
            <span>/</span>
            <span className="text-[var(--lg-accent)]">قطب‌های گلخانه‌ای، دامپروری و نهاده‌های دامی (Agriculture)</span>
          </div>
          <h1 className="text-xl md:text-2xl font-black text-[var(--lg-ink)] flex items-center gap-2">
            <span>توسعه ۱,۲۵۸ هکتار گلخانه مدرن و تخصیص نهاده‌های دامی استان تهران</span>
          </h1>
        </div>

        <span className="text-xs font-mono font-bold text-emerald-400 bg-emerald-500/15 px-3 py-1.5 rounded-xl border border-emerald-500/30">
          رتبه ۱ گل و گیاه کشور (پاکدشت)
        </span>
      </div>

      {/* 2. Resident AI Specialist Agent 7 (Agri-Tech Advisor) */}
      <InPageAgentPanel
        agentCode="AGT-07"
        pageTitle="میز معمار کشاورزی مدرن و زنجیره پروتئین تهران"
      />

      {feedNotice && (
        <div className="p-3 rounded-2xl bg-emerald-500/15 border border-emerald-500/30 text-xs text-emerald-200 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
            <span>{feedNotice}</span>
          </div>
          <button
            onClick={() => setFeedNotice(null)}
            className="text-emerald-400 font-bold hover:underline"
          >
            بستن
          </button>
        </div>
      )}

      {/* 3. Agri-Cohort View: Dual Line Graph Comparing Greenhouse vs Traditional */}
      <div className="card space-y-3">
        <div className="flex flex-wrap items-center justify-between gap-2 border-b border-[var(--lg-border)] pb-2.5">
          <div>
            <h3 className="text-sm font-black text-white">
              نمودار مقایسه‌ای بازدهی و بهره‌وری مصرف آب: کشت گلخانه‌ای در برابر کشت سنتی
            </h3>
            <p className="text-[11px] text-[var(--lg-muted)] mt-0.5">
              خط سرمه‌ای نئونی: بهره‌وری کشت گلخانه‌ای مدرن | خط فیروزه‌ای: کشت سنتی غرقابی
            </p>
          </div>
          <span className="text-xs font-bold text-cyan-400">صرفه‌جویی ۹۰٪ آب در گلخانه‌ها</span>
        </div>

        <div
          className="w-full overflow-x-auto py-2"
          dangerouslySetInnerHTML={{
            __html: LiquidCharts.cohort(greenhouseOutput, traditionalOutput, cohortLabels),
          }}
        />

        <div className="pt-2 border-t border-[var(--lg-border)] flex items-center justify-between text-xs text-[var(--lg-muted)]">
          <span>تولید هر کیلوگرم محصول گلخانه‌ای تنها به ۱۵ لیتر آب نیاز دارد در مقایسه با ۲۵۰ لیتر در فضای باز.</span>
          <span className="text-emerald-400 font-bold">هدف‌گذاری: ۲۰۰۰ هکتار تا ۱۴۰۶</span>
        </div>
      </div>

      {/* 4. Dedicated Agriculture What-If Scenario Levers & 30-Day Predictive Engine */}
      <DomainScenarioAndPredictionEngine moduleId="agriculture" />

      {/* 5. Specialized Agri Poles Matrix */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {/* Pole 1: Pakdasht */}
        <div className="card space-y-2">
          <div className="flex items-center justify-between border-b border-white/10 pb-2">
            <span className="font-bold text-white">قطب پاکدشت</span>
            <span className="text-[10px] px-2 py-0.5 rounded-full bg-emerald-500/20 text-emerald-300 font-bold border border-emerald-500/30">
              رتبه ۱ کشور
            </span>
          </div>
          <div className="text-xs text-slate-300">
            <strong>۱,۰۱۳ هکتار گلخانه گل و گیاه:</strong> تولید سالانه ۹۸۰ میلیون گل شاخه‌بریده (رز، ژربرا، ارکیده) و صادرات به کشورهای اوراسیا.
          </div>
          <div className="pt-2 border-t border-white/5 flex justify-between text-[11px] text-cyan-300 font-mono">
            <span>اشتغال: ۱۸,۰۰۰ نفر</span>
            <span>ارزش صادرات: ۴۵M$</span>
          </div>
        </div>

        {/* Pole 2: Pishva & Varamin */}
        <div className="card space-y-2">
          <div className="flex items-center justify-between border-b border-white/10 pb-2">
            <span className="font-bold text-white">قطب پیشوا و ورامین</span>
            <span className="text-[10px] px-2 py-0.5 rounded-full bg-emerald-500/20 text-emerald-300 font-bold">
              سبزی و صیفی صادراتی
            </span>
          </div>
          <div className="text-xs text-slate-300">
            <strong>۳۴۰ هکتار گلخانه هیدروپونیک:</strong> قطب اصلی خیار، گوجه‌فرنگی و فلفل دلمه‌ای صادراتی به روسیه و حاشیه خلیج فارس.
          </div>
          <div className="pt-2 border-t border-white/5 flex justify-between text-[11px] text-emerald-400 font-mono">
            <span>تولید: ۴۲۰,۰۰۰ تن</span>
            <span>بیمه کشاورزی: ۸۲٪</span>
          </div>
        </div>

        {/* Pole 3: Eslamshahr & Rey */}
        <div className="card space-y-2">
          <div className="flex items-center justify-between border-b border-white/10 pb-2">
            <span className="font-bold text-white">قطب اسلامشهر و ری</span>
            <span className="text-[10px] px-2 py-0.5 rounded-full bg-amber-500/20 text-amber-300 font-bold">
              دامپروری و غلات
            </span>
          </div>
          <div className="text-xs text-slate-300">
            <strong>دامداری‌های شیری و پرواربندی:</strong> تامین روزانه ۱,۲۰۰ تن شیر خام و گوشت قرمز و کشت استراتژیک گندم و جو در اراضی جنوبی.
          </div>
          <div className="pt-2 border-t border-white/5 flex justify-between text-[11px] text-amber-300 font-mono">
            <span>دام مولد: ۱۶۵,۰۰۰ رأس</span>
            <span>خوراک روزانه: ۳,۲۰۰ تن</span>
          </div>
        </div>
      </div>

      {/* 5. Livestock Feed Allocation Terminal */}
      <div className="card space-y-4">
        <div className="flex items-center justify-between border-b border-[var(--lg-border)] pb-2">
          <div className="flex items-center gap-2">
            <Wheat className="w-4 h-4 text-amber-400" />
            <h3 className="text-sm font-black text-white">
              ترمینال تخصیص نهاده‌های دامی سامانه بازارگاه (کنجاله سویا و ذرت دامی)
            </h3>
          </div>
          <span className="text-xs text-slate-400">سامانه بازارگاه استان تهران</span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-center">
          <div className="space-y-3">
            <div>
              <div className="flex justify-between text-xs font-bold mb-1">
                <span>تخصیص ماهانه کنجاله سویا:</span>
                <span className="font-mono text-emerald-400">{formatPersianNumber(soybeanMealAllocationTons)} تن</span>
              </div>
              <input
                type="range"
                min="5000"
                max="35000"
                step="500"
                value={soybeanMealAllocationTons}
                onChange={(e) => setSoybeanMealAllocationTons(Number(e.target.value))}
                className="w-full accent-emerald-500 cursor-pointer"
              />
            </div>

            <div>
              <div className="flex justify-between text-xs font-bold mb-1">
                <span>تخصیص ماهانه ذرت دامی:</span>
                <span className="font-mono text-amber-400">{formatPersianNumber(cornAllocationTons)} تن</span>
              </div>
              <input
                type="range"
                min="10000"
                max="50000"
                step="1000"
                value={cornAllocationTons}
                onChange={(e) => setCornAllocationTons(Number(e.target.value))}
                className="w-full accent-amber-500 cursor-pointer"
              />
            </div>
          </div>

          <div className="space-y-3">
            <div className="p-3.5 rounded-2xl bg-white/5 border border-white/10 text-xs text-slate-300 leading-relaxed">
              تخصیص مستقیم نهاده‌ها با نرخ مصوب دولتی قیمت تمام‌شده شیر خام را در محدوده مصوب ۱۸,۵۰۰ تومان تثبیت نموده و از کشتار دام‌های مولد جلوگیری می‌کند.
            </div>
            <button
              onClick={handleFeedAllocation}
              className="w-full py-2.5 rounded-xl bg-gradient-to-l from-emerald-600 to-teal-600 hover:from-emerald-500 text-white font-bold text-xs flex items-center justify-center gap-1.5 transition-all shadow-md"
            >
              <CheckCircle2 className="w-4 h-4" />
              <span>صدور سهمیه سامانه بازارگاه برای دامداران تهران</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default AgricultureView;
