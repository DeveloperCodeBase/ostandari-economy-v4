'use client';

import React, { useState } from 'react';
import { TEHRAN_COUNTY_PROFILES } from '@/src/data/tehranMasterData';
import { LiquidCharts } from '@/src/utils/liquidCharts';
import { InPageAgentPanel } from '@/src/components/ai/InPageAgentPanel';
import { toPersianDigits, formatPersianNumber } from '@/src/utils/formatters';
import {
  Coins,
  Receipt,
  FileCheck2,
  Building,
  Sliders,
  Download,
  CheckCircle2,
  AlertCircle,
  Sparkles,
  Calculator,
} from 'lucide-react';
import { DomainScenarioAndPredictionEngine } from '@/src/components/shared/DomainScenarioAndPredictionEngine';

export function TreasuryView() {
  const [selectedQuarter, setSelectedQuarter] = useState<'Q1' | 'Q2' | 'Q3' | 'Q4'>('Q2');
  const [vatRedistributionPercent, setVatRedistributionPercent] = useState<number>(35); // 35% to less developed counties
  const [article100MarkedToman, setArticle100MarkedToman] = useState<number>(114); // 114 billion Toman baseline

  // Capsules chart data: Quarterly target vs actual realization
  const quarterData = {
    Q1: { values: [52, 114, 198], labels: ['فروردین', 'اردیبهشت', 'خرداد'] },
    Q2: { values: [295, 393, 485], labels: ['تیر', 'مرداد', 'شهریور'] },
    Q3: { values: [580, 690, 810], labels: ['مهر', 'آبان', 'آذر'] },
    Q4: { values: [920, 1050, 1200], labels: ['دی', 'بهمن', 'اسفند'] },
  };

  const currentCapsules = quarterData[selectedQuarter];

  // Calculate redistributed VAT across 16 counties
  const totalVATBillion = 73000; // 73 Hemmat = 73,000 Billion Toman
  const poolBillion = (totalVATBillion * vatRedistributionPercent) / 100;

  return (
    <div className="space-y-6">
      {/* 1. Header with Quarter Selector & Export */}
      <div className="flex flex-wrap items-center justify-between gap-3 border-b border-[var(--lg-border)] pb-3">
        <div>
          <div className="text-[11px] text-[var(--lg-muted)] flex items-center gap-1.5 font-medium mb-1">
            <span>مدیریت مالی و دارایی</span>
            <span>/</span>
            <span className="text-[var(--lg-accent)]">خزانه‌داری، مالیات، بودجه و مولدسازی (Treasury)</span>
          </div>
          <h1 className="text-xl md:text-2xl font-black text-[var(--lg-ink)] flex items-center gap-2">
            <span>ماتریس خزانه‌داری معین و مولدسازی دارایی‌های دولت در استان تهران</span>
          </h1>
        </div>

        {/* Quarter Switcher & Export */}
        <div className="flex items-center gap-2">
          <div className="flex items-center rounded-xl p-1 bg-[var(--lg-inner)] border border-[var(--lg-border)]">
            {(['Q1', 'Q2', 'Q3', 'Q4'] as const).map((q) => (
              <button
                key={q}
                onClick={() => setSelectedQuarter(q)}
                className={`px-3 py-1 rounded-lg text-xs font-bold font-mono transition-all ${
                  selectedQuarter === q
                    ? 'bg-cyan-600 text-white shadow-md'
                    : 'text-[var(--lg-secondary)] hover:text-[var(--lg-ink)]'
                }`}
              >
                {q}
              </button>
            ))}
          </div>

          <button
            onClick={() => {
              window.print();
            }}
            className="px-3 py-1.5 rounded-xl border border-[var(--lg-border)] text-xs font-bold text-[var(--lg-secondary)] hover:text-[var(--lg-ink)] flex items-center gap-1.5 transition-colors glass"
          >
            <Download className="w-3.5 h-3.5" />
            <span>خروجی گزارش رسمی خزانه</span>
          </button>
        </div>
      </div>

      {/* 2. Resident AI Specialist Agent 2 (Fiscal Auditor) */}
      <InPageAgentPanel
        agentCode="AGT-02"
        pageTitle="میز تحلیلی ممیز هوشمند مالیاتی و خزانه‌داری"
      />

      {/* 3. Four Treasury Macro KPIs */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="card">
          <div className="flex items-center justify-between text-xs text-[var(--lg-muted)] mb-2">
            <span>درآمد عمومی ۵ماهه کل استان</span>
            <span className="px-2 py-0.5 rounded-full bg-emerald-500/20 text-emerald-400 font-bold border border-emerald-500/30">
              تحقق ۱۱۷٪
            </span>
          </div>
          <div className="text-3xl font-black font-mono text-[var(--lg-ink)]">
            ۳۹۳.۰ <span className="text-xs font-normal text-[var(--lg-muted)]">همت</span>
          </div>
          <div className="text-xs text-[var(--lg-secondary)] mt-2">
            رشد ۷۷ درصدی نسبت به دوره مشابه؛ اداره کل امور اقتصادی و دارایی.
          </div>
        </div>

        <div className="card">
          <div className="flex items-center justify-between text-xs text-[var(--lg-muted)] mb-2">
            <span>عوارض مالیات ارزش افزوده</span>
            <span className="px-2 py-0.5 rounded-full bg-cyan-500/20 text-cyan-400 font-bold border border-cyan-500/30">
              بازتوزیع ۱۶ شهرستان
            </span>
          </div>
          <div className="text-3xl font-black font-mono text-cyan-400">
            ۷۳.۰ <span className="text-xs font-normal text-[var(--lg-muted)]">همت</span>
          </div>
          <div className="text-xs text-[var(--lg-secondary)] mt-2">
            واریزی به شهرداری‌ها و دهیاری‌ها جهت توسعه زیرساخت‌های شهری و روستایی.
          </div>
        </div>

        <div className="card">
          <div className="flex items-center justify-between text-xs text-[var(--lg-muted)] mb-2">
            <span>مالیات نشان‌دار ماده ۱۰۰</span>
            <span className="px-2 py-0.5 rounded-full bg-emerald-500/20 text-emerald-300 font-bold border border-emerald-500/30">
              سیمان فیروزکوه
            </span>
          </div>
          <div className="text-3xl font-black font-mono text-emerald-400">
            ۱۱۴ <span className="text-xs font-normal text-[var(--lg-muted)]">میلیارد تومان</span>
          </div>
          <div className="text-xs text-[var(--lg-secondary)] mt-2">
            تخصیص ۱۰۰٪ به پروژه تکمیل بیمارستان فیروزکوه و شبکه بهداشت شرق استان.
          </div>
        </div>

        <div className="card">
          <div className="flex items-center justify-between text-xs text-[var(--lg-muted)] mb-2">
            <span>املاک در طرح مولدسازی</span>
            <span className="px-2 py-0.5 rounded-full bg-amber-500/20 text-amber-400 font-bold border border-amber-500/30">
              مصوب کارگروه
            </span>
          </div>
          <div className="text-3xl font-black font-mono text-amber-400">
            ۷۸ <span className="text-xs font-normal text-[var(--lg-muted)]">رقبه ملک</span>
          </div>
          <div className="text-xs text-[var(--lg-secondary)] mt-2">
            ارزش برآوردی ۱۸.۵ همت؛ با اولویت تکمیل پروژه‌های نیمه‌تمام راه و آب.
          </div>
        </div>
      </div>

      {/* 4. Dedicated Treasury What-If Scenario Levers & 30-Day Predictive Engine */}
      <DomainScenarioAndPredictionEngine moduleId="treasury" />

      {/* 5. Performance View Matrix: Capsules Chart + Ledger Card */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Right: Glowing Capsules Target Chart */}
        <div className="lg:col-span-7 card">
          <div className="flex items-center justify-between mb-3 border-b border-[var(--lg-border)] pb-2.5">
            <div>
              <h3 className="text-sm font-black text-[var(--lg-ink)]">
                ماتریس کپسولی هدف‌گذاری و انطباق فصلی درآمدهای مالیاتی ({selectedQuarter})
              </h3>
              <p className="text-[11px] text-[var(--lg-muted)] mt-0.5">
                تولیدشده توسط موتور نئونی LiquidCharts.capsules بر اساس اهداف قانون بودجه
              </p>
            </div>
            <span className="text-xs font-mono font-bold text-cyan-300 bg-cyan-950/60 px-2 py-0.5 rounded border border-cyan-500/30">
              فصل {selectedQuarter}
            </span>
          </div>

          <div
            className="w-full overflow-x-auto py-3"
            dangerouslySetInnerHTML={{
              __html: LiquidCharts.capsules(selectedQuarter, currentCapsules.values, currentCapsules.labels),
            }}
          />

          <div className="mt-4 pt-3 border-t border-[var(--lg-border)] flex items-center justify-between text-xs text-[var(--lg-muted)]">
            <div className="flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-cyan-500 inline-block" />
              <span>نقطه تحقق هدف (Hit Rate)</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 inline-block" />
              <span>پیش‌بینی هوش مصنوعی (AI Projected)</span>
            </div>
          </div>
        </div>

        {/* Left: General Ledger Card with Progress Bars */}
        <div className="lg:col-span-5 card space-y-4">
          <div className="flex items-center justify-between border-b border-[var(--lg-border)] pb-2">
            <h3 className="text-sm font-black text-[var(--lg-ink)]">
              دفتر کل تراز بودجه و تملک دارایی‌های سرمایه‌ای
            </h3>
            <span className="text-[11px] text-emerald-400 font-bold">تراز مثبت</span>
          </div>

          {/* Progress Ledger Rows */}
          <div className="space-y-3">
            <div>
              <div className="flex justify-between text-xs mb-1">
                <span className="text-[var(--lg-secondary)]">اعتبارات عمرانی مصوب (تملک دارایی):</span>
                <span className="font-mono font-bold text-[var(--lg-ink)]">۱۴.۸ همت / ۲۲ همت (۶۷٪)</span>
              </div>
              <div className="w-full h-2 rounded-full bg-white/10 overflow-hidden">
                <div className="h-full bg-gradient-to-l from-cyan-500 to-sky-600 rounded-full w-[67%]" />
              </div>
            </div>

            <div>
              <div className="flex justify-between text-xs mb-1">
                <span className="text-[var(--lg-secondary)]">واریز عوارض آلایندگی به شهرداری‌ها:</span>
                <span className="font-mono font-bold text-cyan-400">۳.۲ همت / ۴ همت (۸۰٪)</span>
              </div>
              <div className="w-full h-2 rounded-full bg-white/10 overflow-hidden">
                <div className="h-full bg-gradient-to-l from-cyan-400 to-blue-500 rounded-full w-[80%]" />
              </div>
            </div>

            <div>
              <div className="flex justify-between text-xs mb-1">
                <span className="text-[var(--lg-secondary)]">اعتبارات هزینه‌ای دستگاه‌های استانی:</span>
                <span className="font-mono font-bold text-emerald-400">۱۸.۲ همت / ۱۹ همت (۹۵٪)</span>
              </div>
              <div className="w-full h-2 rounded-full bg-white/10 overflow-hidden">
                <div className="h-full bg-gradient-to-l from-emerald-400 to-teal-500 rounded-full w-[95%]" />
              </div>
            </div>

            <div>
              <div className="flex justify-between text-xs mb-1">
                <span className="text-[var(--lg-secondary)]">منابع حاصل از مولدسازی دارایی‌های مازاد:</span>
                <span className="font-mono font-bold text-amber-400">۴.۱ همت / ۱۰ همت (۴۱٪)</span>
              </div>
              <div className="w-full h-2 rounded-full bg-white/10 overflow-hidden">
                <div className="h-full bg-gradient-to-l from-amber-400 to-orange-500 rounded-full w-[41%]" />
              </div>
            </div>
          </div>

          <div className="p-3 rounded-2xl bg-white/5 border border-white/10 text-xs text-[var(--lg-secondary)] space-y-1">
            <div className="font-bold text-[var(--lg-ink)] flex items-center gap-1.5">
              <Sparkles className="w-3.5 h-3.5 text-cyan-400" />
              <span>تحلیل حسابرسی هوش مصنوعی خزانه:</span>
            </div>
            <p className="leading-relaxed text-[11px]">
              رشد ۷۷ درصدی درآمدهای ۵ ماهه به واسطه اتصال سامانه‌های پایانه فروشگاهی و پایش تراکنش‌های عمده حاصل شده و کسری بودجه استانی را به صفر رسانده است.
            </p>
          </div>
        </div>
      </div>

      {/* 5. Interactive Simulator: Article 100 & VAT Redistribution Calculator */}
      <div className="card space-y-4">
        <div className="flex flex-wrap items-center justify-between gap-2 border-b border-[var(--lg-border)] pb-2.5">
          <div className="flex items-center gap-2">
            <Calculator className="w-4 h-4 text-[var(--lg-accent)]" />
            <h3 className="text-sm font-black text-[var(--lg-ink)]">
              ماشین‌حساب تعاملی بازتوزیع ۷۳ همت مالیات ارزش افزوده و نشان‌دار کردن ماده ۱۰۰
            </h3>
          </div>
          <span className="text-xs text-[var(--lg-muted)]">
            اهرم سیاستی استاندار جهت توازن منطقه‌ای بین شمال، مرکز و شهرستان‌های محروم جنوب و شرق
          </span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-center">
          {/* Controls Sliders */}
          <div className="md:col-span-5 space-y-4">
            <div>
              <div className="flex justify-between text-xs font-bold mb-1.5">
                <span>سهم صندوق توازن شهرستان‌های کمتربرخوردار:</span>
                <span className="font-mono text-cyan-400">{toPersianDigits(vatRedistributionPercent)}٪</span>
              </div>
              <input
                type="range"
                min="10"
                max="60"
                step="5"
                value={vatRedistributionPercent}
                onChange={(e) => setVatRedistributionPercent(Number(e.target.value))}
                className="w-full accent-cyan-500 cursor-pointer"
              />
              <div className="flex justify-between text-[10px] text-[var(--lg-muted)] mt-1">
                <span>۱۰٪ (توزیع جمعیتی محض)</span>
                <span>۶۰٪ (توازن حداکثری محرومیت)</span>
              </div>
            </div>

            <div>
              <div className="flex justify-between text-xs font-bold mb-1.5">
                <span>مالیات نشان‌دار ماده ۱۰۰ برای بهداشت و درمان:</span>
                <span className="font-mono text-emerald-400">{toPersianDigits(article100MarkedToman)} میلیارد تومان</span>
              </div>
              <input
                type="range"
                min="50"
                max="500"
                step="10"
                value={article100MarkedToman}
                onChange={(e) => setArticle100MarkedToman(Number(e.target.value))}
                className="w-full accent-emerald-500 cursor-pointer"
              />
            </div>
          </div>

          {/* Results Summary Cards */}
          <div className="md:col-span-7 grid grid-cols-2 sm:grid-cols-3 gap-3">
            <div className="p-3 rounded-2xl bg-white/5 border border-white/10 text-right">
              <div className="text-[10px] text-[var(--lg-muted)]">صندوق توازن ۱۶ شهرستان</div>
              <div className="text-lg font-black text-cyan-300 font-mono mt-1">
                {formatPersianNumber(poolBillion)}
                <span className="text-[10px] font-normal text-[var(--lg-muted)] mr-1">میلیارد تومان</span>
              </div>
              <div className="text-[10px] text-[var(--lg-secondary)] mt-1">
                سهم فیروزکوه، پیشوا، قرچک و ملارد
              </div>
            </div>

            <div className="p-3 rounded-2xl bg-white/5 border border-white/10 text-right">
              <div className="text-[10px] text-[var(--lg-muted)]">سهم عمران شهری کلان‌شهر تهران</div>
              <div className="text-lg font-black text-cyan-300 font-mono mt-1">
                {formatPersianNumber(totalVATBillion - poolBillion)}
                <span className="text-[10px] font-normal text-[var(--lg-muted)] mr-1">میلیارد تومان</span>
              </div>
              <div className="text-[10px] text-[var(--lg-secondary)] mt-1">
                مترو و اتوبوسرانی پایتخت
              </div>
            </div>

            <div className="p-3 rounded-2xl bg-white/5 border border-white/10 text-right col-span-2 sm:col-span-1">
              <div className="text-[10px] text-[var(--lg-muted)]">پروژه‌های درمانی تکمیل‌شده</div>
              <div className="text-lg font-black text-emerald-300 font-mono mt-1">
                {toPersianDigits(Math.round(article100MarkedToman / 40))}
                <span className="text-[10px] font-normal text-[var(--lg-muted)] mr-1">مرکز درمانی</span>
              </div>
              <div className="text-[10px] text-[var(--lg-secondary)] mt-1">
                با منابع مستقیم مالیات نشان‌دار
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default TreasuryView;
