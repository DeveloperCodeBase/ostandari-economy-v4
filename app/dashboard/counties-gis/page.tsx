'use client';

import React, { useState } from 'react';
import { InPageAgentPanel } from '@/src/components/ai/InPageAgentPanel';
import { TEHRAN_16_COUNTIES } from '@/src/data/tehranMasterData';
import { TehranInteractiveMap } from '@/src/components/map/TehranInteractiveMap';
import { CyberRadarChart } from '@/src/components/charts/InteractiveCharts';
import { toPersianDigits, formatPersianNumber } from '@/src/utils/formatters';
import { useCommand } from '@/src/context/CommandContext';
import {
  MapPin,
  Check,
  RotateCcw,
  Sparkles,
} from 'lucide-react';

export default function CountiesGisWorkbenchPage() {
  const { selectedCountyId, setSelectedCountyId } = useCommand();

  // Multi-select for radar comparison (default 3 counties: Tehran, Rey, Pakdasht)
  const [comparedCountyIds, setComparedCountyIds] = useState<string[]>(['tehran', 'rey', 'pakdasht']);
  const [activeZoneFilter, setActiveZoneFilter] = useState<string>('all');

  const zones = ['all', 'پهنه مرکزی', 'پهنه غرب', 'پهنه جنوب‌غرب', 'پهنه جنوب‌شرق', 'پهنه شمال‌شرق و شمال'];

  const toggleCompared = (id: string) => {
    if (comparedCountyIds.includes(id)) {
      if (comparedCountyIds.length > 1) {
        setComparedCountyIds((prev) => prev.filter((item) => item !== id));
      }
    } else {
      if (comparedCountyIds.length < 4) {
        setComparedCountyIds((prev) => [...prev, id]);
      }
    }
  };

  const filteredCounties = TEHRAN_16_COUNTIES.filter(
    (c) => activeZoneFilter === 'all' || c.zone === activeZoneFilter
  );

  // Radar axes & series
  const radarAxes = ['صنعت و تولید', 'کشاورزی و غله', 'منابع بانکی', 'تراکم جمعیت', 'سهمیه آرد', 'ثبات بازار'];
  const palette = ['#8B5CF6', '#06B6D4', '#10B981', '#F59E0B'];

  const radarSeries = comparedCountyIds.map((cid, idx) => {
    const c = TEHRAN_16_COUNTIES.find((item) => item.id === cid)!;
    return {
      name: c.nameFa,
      color: palette[idx % palette.length],
      values: [
        Math.min(100, Math.round((c.activeIndustrialUnits / 3420) * 100)),
        Math.min(100, Math.round((c.wheatProductionTons / 68500) * 100)),
        Math.min(100, Math.round(c.loanToDepositRatio)),
        Math.min(100, Math.round((c.population1405Est / 9450000) * 100)),
        Math.min(100, Math.round((c.dailyFlourQuotaTons / 2850) * 100)),
        c.riskLevel === 'safe' ? 90 : c.riskLevel === 'warning' ? 65 : 40,
      ],
    };
  });

  return (
    <div className="space-y-6">
      {/* Breadcrumb & Header */}
      <div className="flex flex-wrap items-center justify-between gap-3 border-b border-[var(--lg-border)] pb-3">
        <div>
          <div className="text-[11px] text-[var(--lg-muted)] flex items-center gap-1.5 font-medium mb-1">
            <span>سکوی تصمیم‌یار کلان</span>
            <span>/</span>
            <span className="text-[var(--lg-accent)]">نقشه جامع GIS و مقایسه ۱۶ شهرستان</span>
          </div>
          <h1 className="text-xl md:text-2xl font-black text-[var(--lg-ink)] flex items-center gap-2">
            <MapPin className="w-6 h-6 text-cyan-400" />
            <span>میز کار مقایسه چندجانبه ۱۶ شهرستان استان تهران</span>
          </h1>
        </div>

        <div className="flex items-center gap-2 text-xs text-[var(--lg-muted)] glass-panel px-3 py-1.5 border border-[var(--lg-border)]">
          <span>انتخاب حداکثر ۴ شهرستان جهت مقایسه راداری عنکبوتی</span>
        </div>
      </div>

      {/* In-Page AI Executive Analyst (AGT-01 Chief Orchestrator) */}
      <InPageAgentPanel
        agentCode="AGT-01"
        pageTitle="مقایسه جامع ۱۶ شهرستان تهران"
      />

      {/* Zone Selector Strip */}
      <div className="flex flex-wrap items-center justify-between gap-3 glass-panel p-3 border border-[var(--lg-border)] text-xs">
        <div className="flex items-center gap-1.5 overflow-x-auto">
          <span className="text-[var(--lg-muted)] font-semibold pl-2">فیلتر پهنه استانی:</span>
          {zones.map((z) => (
            <button
              key={z}
              onClick={() => setActiveZoneFilter(z)}
              className={`px-3 py-1.5 rounded-xl font-medium transition-colors whitespace-nowrap ${
                activeZoneFilter === z
                  ? 'bg-cyan-600 text-white font-bold shadow-md'
                  : 'glass-button text-[var(--lg-muted)] hover:text-[var(--lg-ink)]'
              }`}
            >
              {z === 'all' ? 'همه ۱۶ شهرستان' : z}
            </button>
          ))}
        </div>

        <div className="text-[11px] text-[var(--lg-muted)]">
          در حال مقایسه: <strong className="text-[var(--lg-ink)] font-bold">{comparedCountyIds.map(id => TEHRAN_16_COUNTIES.find(c => c.id === id)?.nameFa).join('، ')}</strong>
        </div>
      </div>

      {/* 16 County Badges Selection Ribbon */}
      <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-8 gap-2">
        {filteredCounties.map((c) => {
          const isSelected = comparedCountyIds.includes(c.id);

          return (
            <button
              key={c.id}
              onClick={() => toggleCompared(c.id)}
              className={`p-2.5 rounded-xl border text-right transition-all flex flex-col justify-between ${
                isSelected
                  ? 'bg-cyan-600/20 border-cyan-500 text-[var(--lg-ink)] shadow-md font-bold'
                  : 'glass-card border-[var(--lg-border)] text-[var(--lg-secondary)] hover:border-[var(--lg-border-strong)]'
              }`}
            >
              <div className="flex items-center justify-between">
                <span className="font-bold text-xs truncate">{c.nameFa}</span>
                {isSelected && <Check className="w-3.5 h-3.5 text-cyan-400 shrink-0" />}
              </div>
              <div className="text-[10px] text-[var(--lg-muted)] font-mono mt-1">
                {formatPersianNumber(c.population1405Est)}
              </div>
            </button>
          );
        })}
      </div>

      {/* Dual Visual: Radar Spider Chart + Interactive GIS Satellite Map */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-stretch">
        {/* Radar Spider Comparison */}
        <div className="lg:col-span-5 glass-panel p-5 border border-[var(--lg-border)] flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between border-b border-[var(--lg-border)] pb-2.5 mb-4">
              <div>
                <h3 className="font-bold text-sm text-[var(--lg-ink)]">
                  رادار مقایسه‌ای ۶بعدی شهرستان‌های انتخابی
                </h3>
                <p className="text-[11px] text-[var(--lg-muted)]">
                  سنجش متوازن ظرفیت صنعتی، کشاورزی، بانکی و پایداری
                </p>
              </div>
              <button
                onClick={() => setComparedCountyIds(['tehran', 'rey', 'pakdasht'])}
                title="بازنشانی به حالت پیش‌فرض"
                className="p-1.5 rounded-lg glass-button text-[var(--lg-muted)] hover:text-[var(--lg-ink)]"
              >
                <RotateCcw className="w-3.5 h-3.5" />
              </button>
            </div>

            <CyberRadarChart
              axes={radarAxes}
              series={radarSeries}
              size={300}
            />
          </div>

          <div className="pt-3 border-t border-[var(--lg-border)] text-[11px] text-[var(--lg-muted)]">
            شاخص‌ها از صفر تا ۱۰۰ بر پایه نسبت به قطب استانی نرمال‌سازی شده‌اند.
          </div>
        </div>

        {/* Interactive Satellite GIS Map */}
        <div className="lg:col-span-7 h-[480px]">
          <TehranInteractiveMap
            showLayerControls={true}
            interactive={true}
          />
        </div>
      </div>

      {/* Detailed Comparison Table of Selected Counties */}
      <div className="glass-panel p-5 border border-[var(--lg-border)] overflow-hidden">
        <h3 className="font-bold text-sm text-[var(--lg-ink)] mb-1">
          جدول شاخص‌های تفصیلی شهرستان‌های در حال مقایسه
        </h3>
        <p className="text-[11px] text-[var(--lg-muted)] mb-4">
          بررسی دقیق سرانه‌ها، پتانسیل‌های تولیدی و آسیب‌پذیری‌ها
        </p>

        <div className="overflow-x-auto">
          <table className="w-full text-xs text-right select-none">
            <thead>
              <tr className="text-[var(--lg-muted)] border-b border-[var(--lg-border)] text-[11px]">
                <th className="py-2.5 px-3">شاخص کلیدی</th>
                {comparedCountyIds.map((cid) => {
                  const c = TEHRAN_16_COUNTIES.find((item) => item.id === cid)!;
                  return (
                    <th key={cid} className="py-2.5 px-3 font-bold text-[var(--lg-ink)] text-center">
                      {c.nameFa} ({c.governorateType})
                    </th>
                  );
                })}
              </tr>
            </thead>
            <tbody className="divide-y divide-[var(--lg-border)]">
              <tr>
                <td className="py-2.5 px-3 font-semibold text-[var(--lg-secondary)]">جمعیت رسمی برآورد ۱۴۰۵</td>
                {comparedCountyIds.map((cid) => {
                  const c = TEHRAN_16_COUNTIES.find((item) => item.id === cid)!;
                  return (
                    <td key={cid} className="py-2.5 px-3 text-center font-mono text-[var(--lg-ink)]">
                      {formatPersianNumber(c.population1405Est)} نفر
                    </td>
                  );
                })}
              </tr>
              <tr>
                <td className="py-2.5 px-3 font-semibold text-[var(--lg-secondary)]">سهم از اقتصاد استان (GDP)</td>
                {comparedCountyIds.map((cid) => {
                  const c = TEHRAN_16_COUNTIES.find((item) => item.id === cid)!;
                  return (
                    <td key={cid} className="py-2.5 px-3 text-center font-mono text-cyan-400 font-bold">
                      {toPersianDigits(c.gdpShareInProvince)}٪
                    </td>
                  );
                })}
              </tr>
              <tr>
                <td className="py-2.5 px-3 font-semibold text-[var(--lg-secondary)]">سهمیه روزانه آرد یارانه‌ای</td>
                {comparedCountyIds.map((cid) => {
                  const c = TEHRAN_16_COUNTIES.find((item) => item.id === cid)!;
                  return (
                    <td key={cid} className="py-2.5 px-3 text-center font-mono text-amber-500 font-semibold">
                      {toPersianDigits(c.dailyFlourQuotaTons)} تن/روز
                    </td>
                  );
                })}
              </tr>
              <tr>
                <td className="py-2.5 px-3 font-semibold text-[var(--lg-secondary)]">تولید سالانه گندم</td>
                {comparedCountyIds.map((cid) => {
                  const c = TEHRAN_16_COUNTIES.find((item) => item.id === cid)!;
                  return (
                    <td key={cid} className="py-2.5 px-3 text-center font-mono text-emerald-500 font-bold">
                      {toPersianDigits(Math.round(c.wheatProductionTons / 1000))} هزار تن
                    </td>
                  );
                })}
              </tr>
              <tr>
                <td className="py-2.5 px-3 font-semibold text-[var(--lg-secondary)]">مساحت گلخانه‌ها (هکتار)</td>
                {comparedCountyIds.map((cid) => {
                  const c = TEHRAN_16_COUNTIES.find((item) => item.id === cid)!;
                  return (
                    <td key={cid} className="py-2.5 px-3 text-center font-mono text-[var(--lg-ink)]">
                      {toPersianDigits(c.greenhouseAreaHectares)} هکتار
                    </td>
                  );
                })}
              </tr>
              <tr>
                <td className="py-2.5 px-3 font-semibold text-[var(--lg-secondary)]">واحدهای صنعتی فعال</td>
                {comparedCountyIds.map((cid) => {
                  const c = TEHRAN_16_COUNTIES.find((item) => item.id === cid)!;
                  return (
                    <td key={cid} className="py-2.5 px-3 text-center font-mono text-[var(--lg-accent)] font-bold">
                      {formatPersianNumber(c.activeIndustrialUnits)} واحد
                    </td>
                  );
                })}
              </tr>
              <tr>
                <td className="py-2.5 px-3 font-semibold text-[var(--lg-secondary)]">مهم‌ترین عامل ریسک و چالش</td>
                {comparedCountyIds.map((cid) => {
                  const c = TEHRAN_16_COUNTIES.find((item) => item.id === cid)!;
                  return (
                    <td key={cid} className="py-2.5 px-3 text-center text-[11px] text-[var(--lg-muted)]">
                      {c.topRiskFactor}
                    </td>
                  );
                })}
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
