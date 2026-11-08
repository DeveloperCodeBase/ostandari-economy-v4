'use client';

import React, { useState } from 'react';
import { InPageAgentPanel } from '@/src/components/ai/InPageAgentPanel';
import { toPersianDigits, formatPersianNumber } from '@/src/utils/formatters';
import {
  Factory,
  Zap,
  Droplets,
  Flame,
  ShieldCheck,
  AlertTriangle,
  RotateCcw,
  Sparkles,
  Sliders,
  CheckCircle2,
} from 'lucide-react';
import { DomainScenarioAndPredictionEngine } from '@/src/components/shared/DomainScenarioAndPredictionEngine';

interface EstateStatus {
  id: string;
  name: string;
  countyName: string;
  areaHectares: number;
  activeUnits: number;
  stagnantUnits: number;
  powerStability: boolean;
  waterSupply: boolean;
  gasNetwork: boolean;
  treatmentPlant: boolean;
  powerDeficitMw: number;
  topProduct: string;
}

const INITIAL_ESTATES: EstateStatus[] = [
  {
    id: 'shamsabad',
    name: 'شهرک صنعتی شمس‌آباد',
    countyName: 'ری (بخش حسن‌آباد)',
    areaHectares: 3000,
    activeUnits: 1420,
    stagnantUnits: 140,
    powerStability: false, // Power deficit in summer
    waterSupply: true,
    gasNetwork: true,
    treatmentPlant: true,
    powerDeficitMw: 240,
    topProduct: 'سنگبری، صنایع فلزی، شیمیایی و ماشین‌آلات',
  },
  {
    id: 'abbasabad',
    name: 'شهرک صنعتی عباس‌آباد',
    countyName: 'پاکدشت',
    areaHectares: 1020,
    activeUnits: 1510,
    stagnantUnits: 165,
    powerStability: false,
    waterSupply: false,
    gasNetwork: true,
    treatmentPlant: true,
    powerDeficitMw: 180,
    topProduct: 'ریخته‌گری، قالب‌سازی، قطعات خودرو و لوازم خانگی',
  },
  {
    id: 'safadasht',
    name: 'شهرک صنعتی غیردولتی صفادشت',
    countyName: 'ملارد',
    areaHectares: 500,
    activeUnits: 562,
    stagnantUnits: 84,
    powerStability: true,
    waterSupply: true,
    gasNetwork: false,
    treatmentPlant: true,
    powerDeficitMw: 65,
    topProduct: 'صنایع دارویی، غذایی و آرایشی-بهداشتی',
  },
  {
    id: 'parand',
    name: 'شهرک صنعتی پرند',
    countyName: 'رباط‌کریم',
    areaHectares: 358,
    activeUnits: 345,
    stagnantUnits: 70,
    powerStability: true,
    waterSupply: true,
    gasNetwork: true,
    treatmentPlant: true,
    powerDeficitMw: 45,
    topProduct: 'تجهیزات الکترونیکی، ماشین‌آلات دقیق و نساجی',
  },
  {
    id: 'paytakht',
    name: 'شهرک صنعتی پایتخت (علی‌آباد)',
    countyName: 'پاکدشت',
    areaHectares: 480,
    activeUnits: 380,
    stagnantUnits: 58,
    powerStability: false,
    waterSupply: true,
    gasNetwork: true,
    treatmentPlant: false,
    powerDeficitMw: 85,
    topProduct: 'صنایع پلاستیک، لاستیک و فلزات سنگین',
  },
  {
    id: 'charmshahr',
    name: 'شهرک صنعتی چرمشهر و سالاریه',
    countyName: 'ورامین',
    areaHectares: 400,
    activeUnits: 280,
    stagnantUnits: 95,
    powerStability: true,
    waterSupply: false,
    gasNetwork: true,
    treatmentPlant: false, // Critical issue with tannery effluent
    powerDeficitMw: 35,
    topProduct: 'دباغی چرم طبیعی، سالامبور و ژلاتین',
  },
];

export function IndustryView() {
  const [estates, setEstates] = useState<EstateStatus[]>(INITIAL_ESTATES);
  const [clinicFilter, setClinicFilter] = useState<'all' | 'stagnant' | 'power_issue'>('all');
  const [revivalActionNotice, setRevivalActionNotice] = useState<string | null>(null);

  // Toggle switch handler for an estate's infrastructure component
  const toggleSwitch = (estateId: string, prop: 'powerStability' | 'waterSupply' | 'gasNetwork' | 'treatmentPlant') => {
    setEstates((prev) =>
      prev.map((e) => {
        if (e.id === estateId) {
          const updated = { ...e, [prop]: !e[prop] };
          setRevivalActionNotice(`وضعیت زیرساخت «${prop === 'powerStability' ? 'برق' : prop === 'waterSupply' ? 'آب' : prop === 'gasNetwork' ? 'گاز' : 'تصفیه‌خانه'}» در ${e.name} تغییر یافت.`);
          return updated;
        }
        return e;
      })
    );
  };

  const filteredEstates = estates.filter((e) => {
    if (clinicFilter === 'stagnant') return e.stagnantUnits > 80;
    if (clinicFilter === 'power_issue') return !e.powerStability;
    return true;
  });

  return (
    <div className="space-y-6">
      {/* 1. Header Bar */}
      <div className="flex flex-wrap items-center justify-between gap-3 border-b border-[var(--lg-border)] pb-3">
        <div>
          <div className="text-[11px] text-[var(--lg-muted)] flex items-center gap-1.5 font-medium mb-1">
            <span>صنعت، معدن و تجارت (صمت)</span>
            <span>/</span>
            <span className="text-[var(--lg-accent)]">شهرک‌های صنعتی، معادن و احیای تولید (Industry)</span>
          </div>
          <h1 className="text-xl md:text-2xl font-black text-[var(--lg-ink)] flex items-center gap-2">
            <span>پایش اکوسیستم ۲۲ شهرک صنعتی و کلینیک احیای واحدهای راکد استان تهران</span>
          </h1>
        </div>

        {/* Filter Pills */}
        <div className="flex items-center gap-1.5">
          <button
            onClick={() => setClinicFilter('all')}
            className={`px-3 py-1.5 rounded-xl text-xs font-bold border transition-colors ${
              clinicFilter === 'all'
                ? 'bg-cyan-600 text-white border-cyan-400 shadow-sm'
                : 'bg-white/5 text-[var(--lg-muted)] border-white/10 hover:text-[var(--lg-ink)]'
            }`}
          >
            همه شهرک‌ها
          </button>
          <button
            onClick={() => setClinicFilter('power_issue')}
            className={`px-3 py-1.5 rounded-xl text-xs font-bold border transition-colors ${
              clinicFilter === 'power_issue'
                ? 'bg-amber-600 text-white border-amber-400 shadow-sm'
                : 'bg-white/5 text-[var(--lg-muted)] border-white/10 hover:text-[var(--lg-ink)]'
            }`}
          >
            دارای ناترازی برق
          </button>
          <button
            onClick={() => setClinicFilter('stagnant')}
            className={`px-3 py-1.5 rounded-xl text-xs font-bold border transition-colors ${
              clinicFilter === 'stagnant'
                ? 'bg-rose-600 text-white border-rose-400 shadow-sm'
                : 'bg-white/5 text-[var(--lg-muted)] border-white/10 hover:text-[var(--lg-ink)]'
            }`}
          >
            اولویت کلینیک احیا
          </button>
        </div>
      </div>

      {/* 2. Resident AI Specialist Agent 4 (Industrial Reviver) */}
      <InPageAgentPanel
        agentCode="AGT-04"
        pageTitle="میز دیده‌بان احیای تولید و پایش شهرک‌های صنعتی"
      />

      {/* Notice Banner */}
      {revivalActionNotice && (
        <div className="p-3 rounded-2xl bg-cyan-500/15 border border-cyan-500/30 text-xs text-cyan-200 flex items-center justify-between">
          <span>{revivalActionNotice}</span>
          <button
            onClick={() => setRevivalActionNotice(null)}
            className="text-cyan-400 font-bold hover:underline"
          >
            بستن
          </button>
        </div>
      )}

      {/* 3. Top Macro Strip: 22 Estates Overview */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
        <div className="card p-3.5">
          <div className="text-[10px] text-[var(--lg-muted)]">شهرک‌ها و نواحی صنعتی</div>
          <div className="text-2xl font-black text-white font-mono mt-0.5">۲۲ <span className="text-xs font-normal">شهرک</span></div>
          <div className="text-[10px] text-cyan-400 mt-1">مساحت کل: ۱۲,۴۰۰ هکتار</div>
        </div>

        <div className="card p-3.5">
          <div className="text-[10px] text-[var(--lg-muted)]">واحدهای بهره‌بردار فعال</div>
          <div className="text-2xl font-black text-emerald-400 font-mono mt-0.5">۴,۴۹۷ <span className="text-xs font-normal">کارخانه</span></div>
          <div className="text-[10px] text-emerald-300 mt-1">اشتغال مستقیم: ۱۹۸,۰۰۰ نفر</div>
        </div>

        <div className="card p-3.5">
          <div className="text-[10px] text-[var(--lg-muted)]">واحدهای راکد کاندیدای احیا</div>
          <div className="text-2xl font-black text-rose-400 font-mono mt-0.5">۶۱۲ <span className="text-xs font-normal">واحد</span></div>
          <div className="text-[10px] text-rose-300 mt-1">در کارگروه تسهیل و رفع موانع</div>
        </div>

        <div className="card p-3.5">
          <div className="text-[10px] text-[var(--lg-muted)]">ناترازی مجموع برق شهرک‌ها</div>
          <div className="text-2xl font-black text-amber-400 font-mono mt-0.5">۶۴۰ <span className="text-xs font-normal">مگاوات</span></div>
          <div className="text-[10px] text-amber-300 mt-1">در پیک بار تابستان</div>
        </div>
      </div>

      {/* 4. Dedicated Industry What-If Scenario Levers & 30-Day Predictive Engine */}
      <DomainScenarioAndPredictionEngine moduleId="industry" />

      {/* 5. Ecosystem View Grid: Cards with Interactive Live Switches (`role="switch"`) */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {filteredEstates.map((estate) => (
          <div
            key={estate.id}
            className="card relative flex flex-col justify-between space-y-4 hover:border-[var(--lg-accent)] transition-all"
          >
            <div>
              <div className="flex items-center justify-between border-b border-[var(--lg-border)] pb-2 mb-2.5">
                <div>
                  <h3 className="text-sm font-black text-white">{estate.name}</h3>
                  <div className="text-[10px] text-[var(--lg-muted)] mt-0.5">
                    شهرستان {estate.countyName} ({toPersianDigits(estate.areaHectares)} هکتار)
                  </div>
                </div>
                <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 radar-glow inline-block" />
              </div>

              {/* Units count */}
              <div className="grid grid-cols-2 gap-2 text-xs mb-3">
                <div className="p-2 rounded-xl bg-white/5 border border-white/10 text-right">
                  <span className="text-[10px] text-[var(--lg-muted)]">واحدهای فعال:</span>
                  <div className="text-base font-bold text-emerald-400 font-mono mt-0.5">
                    {toPersianDigits(estate.activeUnits)}
                  </div>
                </div>
                <div className="p-2 rounded-xl bg-white/5 border border-white/10 text-right">
                  <span className="text-[10px] text-[var(--lg-muted)]">واحدهای راکد:</span>
                  <div className="text-base font-bold text-rose-400 font-mono mt-0.5">
                    {toPersianDigits(estate.stagnantUnits)}
                  </div>
                </div>
              </div>

              {/* Top product */}
              <div className="text-[11px] text-[var(--lg-secondary)] mb-3">
                <strong className="text-[var(--lg-ink)]">خوشه غالب: </strong>
                {estate.topProduct}
              </div>
            </div>

            {/* Interactive Switches for Infrastructure Monitoring */}
            <div className="pt-3 border-t border-[var(--lg-border)] space-y-2">
              <div className="text-[11px] font-bold text-[var(--lg-muted)] mb-1">
                وضعیت زیرساخت‌های پایدار (کلیدهای نظارتی زنده):
              </div>

              <div className="grid grid-cols-2 gap-2">
                {/* Power Switch */}
                <div
                  onClick={() => toggleSwitch(estate.id, 'powerStability')}
                  role="switch"
                  aria-checked={estate.powerStability}
                  className={`p-2 rounded-xl border flex items-center justify-between cursor-pointer transition-all ${
                    estate.powerStability
                      ? 'bg-emerald-500/15 border-emerald-500/30 text-emerald-300'
                      : 'bg-rose-500/15 border-rose-500/30 text-rose-300'
                  }`}
                >
                  <div className="flex items-center gap-1.5 text-xs">
                    <Zap className="w-3.5 h-3.5" />
                    <span>برق پایدار</span>
                  </div>
                  <span className="text-[10px] font-bold font-mono">
                    {estate.powerStability ? 'وصل' : 'ناتراز'}
                  </span>
                </div>

                {/* Water Switch */}
                <div
                  onClick={() => toggleSwitch(estate.id, 'waterSupply')}
                  role="switch"
                  aria-checked={estate.waterSupply}
                  className={`p-2 rounded-xl border flex items-center justify-between cursor-pointer transition-all ${
                    estate.waterSupply
                      ? 'bg-cyan-500/15 border-cyan-500/30 text-cyan-300'
                      : 'bg-amber-500/15 border-amber-500/30 text-amber-300'
                  }`}
                >
                  <div className="flex items-center gap-1.5 text-xs">
                    <Droplets className="w-3.5 h-3.5" />
                    <span>آب صنعتی</span>
                  </div>
                  <span className="text-[10px] font-bold font-mono">
                    {estate.waterSupply ? 'عادی' : 'تنش'}
                  </span>
                </div>

                {/* Gas Switch */}
                <div
                  onClick={() => toggleSwitch(estate.id, 'gasNetwork')}
                  role="switch"
                  aria-checked={estate.gasNetwork}
                  className={`p-2 rounded-xl border flex items-center justify-between cursor-pointer transition-all ${
                    estate.gasNetwork
                      ? 'bg-indigo-500/15 border-indigo-500/30 text-indigo-300'
                      : 'bg-orange-500/15 border-orange-500/30 text-orange-300'
                  }`}
                >
                  <div className="flex items-center gap-1.5 text-xs">
                    <Flame className="w-3.5 h-3.5" />
                    <span>گازرسانی</span>
                  </div>
                  <span className="text-[10px] font-bold font-mono">
                    {estate.gasNetwork ? 'کامل' : 'افت'}
                  </span>
                </div>

                {/* Treatment Plant Switch */}
                <div
                  onClick={() => toggleSwitch(estate.id, 'treatmentPlant')}
                  role="switch"
                  aria-checked={estate.treatmentPlant}
                  className={`p-2 rounded-xl border flex items-center justify-between cursor-pointer transition-all ${
                    estate.treatmentPlant
                      ? 'bg-teal-500/15 border-teal-500/30 text-teal-300'
                      : 'bg-rose-500/15 border-rose-500/30 text-rose-300'
                  }`}
                >
                  <div className="flex items-center gap-1.5 text-xs">
                    <ShieldCheck className="w-3.5 h-3.5" />
                    <span>تصفیه‌خانه</span>
                  </div>
                  <span className="text-[10px] font-bold font-mono">
                    {estate.treatmentPlant ? 'فعال' : 'نقص'}
                  </span>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default IndustryView;
