'use client';

import React, { useState } from 'react';
import { Glassy3DCarousel, GlassyCarouselItem } from '@/src/components/common/Glassy3DCarousel';
import { TEHRAN_COUNTY_PROFILES, TEHRAN_PROVINCE_BASELINE } from '@/src/data/tehranMasterData';
import { LiquidCharts } from '@/src/utils/liquidCharts';
import { InPageAgentPanel } from '@/src/components/ai/InPageAgentPanel';
import { toPersianDigits, formatPersianNumber } from '@/src/utils/formatters';
import { useCommand } from '@/src/context/CommandContext';
import {
  TrendingUp,
  Flame,
  ShieldCheck,
  Building,
  Coins,
  FileCheck,
  ArrowUpRight,
  Filter,
  Layers,
  Sparkles,
} from 'lucide-react';
import Link from 'next/link';
import { DomainScenarioAndPredictionEngine } from '@/src/components/shared/DomainScenarioAndPredictionEngine';

export function OverviewView() {
  const { selectedCounty, selectedCountyId, setSelectedCountyId } = useCommand();

  // 12-month public revenue & economic growth data
  const revenueValues = [52, 114, 198, 295, 393, 485];
  const revenueLabels = ['فروردین', 'اردیبهشت', 'خرداد', 'تیر', 'مرداد', 'شهریور'];

  // Donut values: Services 68%, Industry 21.1%, Agriculture 4.1%, Other 6.8%
  const donutValues = [68, 21.1, 4.1, 6.8];
  const donutLabels = ['خدمات و بازرگانی (۶۸٪)', 'صنعت و معدن (۲۱.۱٪)', 'کشاورزی (۴.۱٪)', 'سایر'];

  // Convert 16 counties to GlassyCarouselItem format
  const carouselItems: GlassyCarouselItem[] = TEHRAN_COUNTY_PROFILES.map((c) => ({
    id: c.id,
    title: c.name,
    subtitle: c.governorRoleTitle,
    badge: `سهم GDP: ${toPersianDigits(c.gdpSharePercent)}٪`,
    metricLabel: 'درآمد مالیاتی ۵ماهه',
    metricValue: `${c.taxRevenue5M_Hemmat} همت`,
    secondaryLabel: 'واحدهای صنعتی فعال',
    secondaryValue: c.activeIndustrialUnits,
    glowColor: c.glowColor,
    washColor: c.washColor,
    details: {
      population: c.estimatedPopulation1405,
      gdpShare: c.gdpSharePercent,
      taxRevenue: c.taxRevenue5M_Hemmat,
      unemployment: c.unemploymentRate,
      activeUnits: c.activeIndustrialUnits,
      stagnantUnits: c.stagnantIndustrialUnits,
      bakeries: c.bakeriesCount,
      powerImbalance: c.powerImbalance_MW,
      topAlert: c.topCrisisAlert,
      keyPoles: c.keyEconomicPoles,
    },
    onSelectAction: (id) => setSelectedCountyId(id),
  }));

  return (
    <div className="space-y-6">
      {/* 1. Header Bar with Status & Filter Indicator */}
      <div className="flex flex-wrap items-center justify-between gap-3 border-b border-[var(--lg-border)] pb-3">
        <div>
          <div className="text-[11px] text-[var(--lg-muted)] flex items-center gap-1.5 font-medium mb-1">
            <span>سکوی تصمیم‌یار کلان</span>
            <span>/</span>
            <span className="text-[var(--lg-accent)]">پیشخوان ۳۶۰ درجه اقتصاد تهران (Overview)</span>
          </div>
          <h1 className="text-xl md:text-2xl font-black text-[var(--lg-ink)] flex items-center gap-2">
            <span>سکوی تصمیم‌یار اقتصادی استاندار تهران</span>
            {selectedCounty && (
              <span className="text-xs font-bold bg-cyan-500/20 text-cyan-300 px-3 py-1 rounded-xl border border-cyan-500/30">
                تمرکز: {selectedCounty.nameFa}
              </span>
            )}
          </h1>
        </div>

        <div className="flex items-center gap-2">
          {selectedCountyId && (
            <button
              onClick={() => setSelectedCountyId(null)}
              className="px-3 py-1.5 rounded-xl text-[var(--lg-secondary)] hover:text-[var(--lg-ink)] text-xs transition-colors flex items-center gap-1 border border-[var(--lg-border)] glass"
            >
              <Filter className="w-3.5 h-3.5" />
              <span>حذف فیلتر شهرستان</span>
            </button>
          )}

          <Link
            href="/dashboard/live-pulse"
            className="px-3.5 py-1.5 rounded-xl bg-gradient-to-l from-cyan-500/20 to-sky-500/20 hover:from-cyan-500/30 hover:to-sky-500/30 text-[var(--lg-ink)] border border-cyan-400/40 text-xs font-semibold flex items-center gap-1.5 transition-all shadow-sm"
          >
            <Flame className="w-3.5 h-3.5 text-cyan-400" />
            <span>نبض زنده قیمت ۲۰ کالا</span>
          </Link>
        </div>
      </div>

      {/* 2. Resident AI Specialist Agent 1 (Macro Strategist) */}
      <InPageAgentPanel
        agentCode="AGT-01"
        pageTitle="پیشخوان استراتژیست کلان اقتصاد تهران"
      />

      {/* 3. Top Metrics Strip (4 Cards, First is .card.featured) */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {/* Card 1: Featured Hero Lens Card */}
        <div className="card featured">
          <div className="flex items-center justify-between text-xs opacity-90 mb-2">
            <span>سهم از تولید ناخالص داخلی (GDP)</span>
            <span className="px-2 py-0.5 rounded-full bg-white/20 font-mono font-bold">
              رتبه ۱ کشور
            </span>
          </div>
          <div className="text-3xl md:text-4xl font-black font-mono tracking-tight mt-1 text-white">
            {toPersianDigits(TEHRAN_PROVINCE_BASELINE.gdpNationalSharePercent)}٪
          </div>
          <p className="text-xs text-white/80 mt-2 leading-relaxed">
            تهران بزرگ‌ترین موتور اقتصادی ایران؛ بیش از ۵ برابر استان رتبه دوم کشور در تولید ثروت ناخالص.
          </p>
          <div className="mt-3 pt-2 border-t border-white/20 flex items-center justify-between text-[11px] text-white/90">
            <span>رشد اقتصادی ۶ماهه:</span>
            <span className="font-bold font-mono">+۴.۲٪</span>
          </div>
        </div>

        {/* Card 2: Public Revenue 393 Hemmat */}
        <div className="card">
          <div className="flex items-center justify-between text-xs text-[var(--lg-muted)] mb-2">
            <span>درآمدهای عمومی محقق‌شده (۵ماهه)</span>
            <span className="px-2 py-0.5 rounded-full bg-emerald-500/20 text-emerald-400 font-bold border border-emerald-500/30">
              +۷۷٪ رشد
            </span>
          </div>
          <div className="text-3xl font-black font-mono tracking-tight text-[var(--lg-ink)]">
            {formatPersianNumber(TEHRAN_PROVINCE_BASELINE.publicRevenue5Months1405Hemmat)}
            <span className="text-xs font-normal text-[var(--lg-muted)] mr-1.5">همت</span>
          </div>
          <p className="text-xs text-[var(--lg-secondary)] mt-2 leading-relaxed">
            تحقق ۳۹۳ همت درآمد و وصول ۷۳ همت مالیات بر ارزش افزوده در استان تهران.
          </p>
          <div className="mt-3 pt-2 border-t border-[var(--lg-border)] flex items-center justify-between text-[11px] text-[var(--lg-faint)]">
            <span>سهم ارزش افزوده:</span>
            <span className="font-bold text-emerald-400 font-mono">۷۳ همت</span>
          </div>
        </div>

        {/* Card 3: Banking Deposits 60.5% */}
        <div className="card">
          <div className="flex items-center justify-between text-xs text-[var(--lg-muted)] mb-2">
            <span>سهم از سپرده‌های بانکی کشور</span>
            <span className="px-2 py-0.5 rounded-full bg-cyan-500/20 text-cyan-400 font-bold border border-cyan-500/30">
              ۱۱,۴۵۰ همت
            </span>
          </div>
          <div className="text-3xl font-black font-mono tracking-tight text-cyan-400">
            {toPersianDigits(TEHRAN_PROVINCE_BASELINE.bankingDepositsNationalSharePercent)}٪
          </div>
          <p className="text-xs text-[var(--lg-secondary)] mt-2 leading-relaxed">
            تمرکز ۶۰.۵٪ سپرده‌ها و ۶۳٪ کل تسهیلات بانکی کشور در شبکه بانکی استان تهران.
          </p>
          <div className="mt-3 pt-2 border-t border-[var(--lg-border)] flex items-center justify-between text-[11px] text-[var(--lg-faint)]">
            <span>نسبت مصارف به منابع:</span>
            <span className="font-bold text-cyan-300 font-mono">۶۸.۹٪</span>
          </div>
        </div>

        {/* Card 4: Unemployment & Jobs */}
        <div className="card">
          <div className="flex items-center justify-between text-xs text-[var(--lg-muted)] mb-2">
            <span>نرخ بیکاری رسمی استان</span>
            <span className="px-2 py-0.5 rounded-full bg-sky-500/20 text-sky-300 font-bold border border-sky-500/30">
              تعهد ۱۸۰ هزار شغل
            </span>
          </div>
          <div className="text-3xl font-black font-mono tracking-tight text-[var(--lg-ink)]">
            {toPersianDigits(4.8)}٪
          </div>
          <p className="text-xs text-[var(--lg-secondary)] mt-2 leading-relaxed">
            پایین‌ترین نرخ بیکاری سال‌های اخیر؛ تحقق ۷۶٪ تعهد اشتغال ۱۸۰,۰۰۰ نفری سال ۱۴۰۵.
          </p>
          <div className="mt-3 pt-2 border-t border-[var(--lg-border)] flex items-center justify-between text-[11px] text-[var(--lg-faint)]">
            <span>بیمه‌شدگان جدید:</span>
            <span className="font-bold text-sky-300 font-mono">۱۳۸,۲۰۰ نفر</span>
          </div>
        </div>
      </div>

      {/* 4. Dedicated Macro What-If Scenario Levers & 30-Day Predictive Engine */}
      <DomainScenarioAndPredictionEngine moduleId="overview" />

      {/* 5. Glassy 3D Carousel of 16 Tehran Counties */}
      <Glassy3DCarousel
        items={carouselItems}
        title="رصد سه‌بعدی ۱۶ شهرستان استان تهران و قطب‌های اقتصادی"
        badge="چرخش سه‌بعدی پروانه‌ای"
      />

      {/* 5. Middle Grid: Revenue Bar Chart + Sector Donut Chart */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left Column: Revenue Neon Bar Chart */}
        <div className="lg:col-span-8 card">
          <div className="flex items-center justify-between mb-4 border-b border-[var(--lg-border)] pb-2.5">
            <div>
              <h3 className="text-sm font-black text-[var(--lg-ink)]">
                روند تحقق ماهانه درآمدهای عمومی استان تهران (سال ۱۴۰۵)
              </h3>
              <p className="text-[11px] text-[var(--lg-muted)] mt-0.5">
                نمودار میله‌ای درخشان نئونی بر اساس داده‌های خزانه معین استان تهران
              </p>
            </div>
            <span className="text-xs font-mono font-bold text-emerald-400 bg-emerald-500/15 px-2.5 py-1 rounded-lg border border-emerald-500/30">
              مجموع: ۳۹۳ همت (۵ ماهه)
            </span>
          </div>

          <div
            className="w-full overflow-x-auto"
            dangerouslySetInnerHTML={{
              __html: LiquidCharts.revenue(revenueValues, revenueLabels, 'همت'),
            }}
          />
        </div>

        {/* Right Column: Donut Sector Share */}
        <div className="lg:col-span-4 card flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between mb-3 border-b border-[var(--lg-border)] pb-2">
              <h3 className="text-sm font-black text-[var(--lg-ink)]">
                ترکیب سهم بخش‌ها از GDP استان
              </h3>
              <span className="text-[11px] text-[var(--lg-muted)] font-mono">تهران ۱۴۰۵</span>
            </div>
            <div
              className="w-full flex justify-center py-2"
              dangerouslySetInnerHTML={{
                __html: LiquidCharts.donut(donutValues, donutLabels),
              }}
            />
          </div>

          <div className="pt-3 border-t border-[var(--lg-border)] text-[11px] text-[var(--lg-muted)] space-y-1">
            <div className="flex justify-between">
              <span>خدمات و بازرگانی:</span>
              <span className="font-bold text-[var(--lg-ink)]">۶۸٪ (رتبه ۱)</span>
            </div>
            <div className="flex justify-between">
              <span>صنعت و قطعه‌سازی:</span>
              <span className="font-bold text-cyan-400">۲۱.۱٪ (رتبه ۲)</span>
            </div>
            <div className="flex justify-between">
              <span>کشاورزی و گلخانه:</span>
              <span className="font-bold text-emerald-400">۴.۱٪</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default OverviewView;
