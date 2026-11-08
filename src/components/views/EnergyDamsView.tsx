'use client';

import React, { useState } from 'react';
import { TEHRAN_5_DAMS } from '@/src/data/tehranMasterData';
import { InPageAgentPanel } from '@/src/components/ai/InPageAgentPanel';
import { toPersianDigits, formatPersianNumber } from '@/src/utils/formatters';
import {
  Droplets,
  Zap,
  Sun,
  Activity,
  Sliders,
  CheckCircle2,
  AlertTriangle,
  RotateCcw,
  Sparkles,
} from 'lucide-react';
import { DomainScenarioAndPredictionEngine } from '@/src/components/shared/DomainScenarioAndPredictionEngine';

export function EnergyDamsView() {
  const [industrialShiftHour, setIndustrialShiftHour] = useState<number>(4); // 4 hours peak load shift
  const [solarCapacityMw, setSolarCapacityMw] = useState<number>(120);
  const [scadaNotice, setScadaNotice] = useState<string | null>(null);

  // Peak load: 12,450 MW total demand in peak summer; current recorded: 10,850 MW
  const currentLoadMw = 10850;
  const maxCapacityMw = 12000;
  const loadPercentage = Math.round((currentLoadMw / maxCapacityMw) * 100);

  const handleShiftCommand = () => {
    setScadaNotice(
      `دستور اسکادای برق منطقه‌ای: انتقال ${toPersianDigits(industrialShiftHour)} ساعت بار مصرفی ۲۲ شهرک صنعتی به شیفت شب (۲۳ الی ۶ صبح) با تخفیف ۵۰٪ تعرفه برق اعمال شد. ناترازی شبکه ۶۸۰ مگاوات کاهش یافت.`
    );
  };

  return (
    <div className="space-y-6">
      {/* 1. Header Bar */}
      <div className="flex flex-wrap items-center justify-between gap-3 border-b border-[var(--lg-border)] pb-3">
        <div>
          <div className="text-[11px] text-[var(--lg-muted)] flex items-center gap-1.5 font-medium mb-1">
            <span>آب، برق و تاب‌آوری زیرساخت</span>
            <span>/</span>
            <span className="text-[var(--lg-accent)]">اسکادای ۵ سد تامین آب و ناترازی شبکه برق تهران (Energy & Dams)</span>
          </div>
          <h1 className="text-xl md:text-2xl font-black text-[var(--lg-ink)] flex items-center gap-2">
            <span>سامانه اسکادای آب سدهای پنجگانه و پایش بار پیک برق منطقه‌ای استان تهران</span>
          </h1>
        </div>

        <span className="text-xs font-mono font-bold text-cyan-400 bg-cyan-500/15 px-3 py-1.5 rounded-xl border border-cyan-500/30">
          پایش برخط شرکت آب منطقه‌ای و برق تهران
        </span>
      </div>

      {/* 2. Resident AI Specialist Agent 10 (Energy & Hydro Grid AI) */}
      <InPageAgentPanel
        agentCode="AGT-10"
        pageTitle="میز کنترلگر تاب‌آوری شبکه آب و برق تهران"
      />

      {scadaNotice && (
        <div className="p-3.5 rounded-2xl bg-cyan-500/15 border border-cyan-500/30 text-xs text-cyan-200 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <CheckCircle2 className="w-4 h-4 text-cyan-400 shrink-0" />
            <span>{scadaNotice}</span>
          </div>
          <button
            onClick={() => setScadaNotice(null)}
            className="text-cyan-400 font-bold hover:underline"
          >
            بستن
          </button>
        </div>
      )}

      {/* 3. SCADA Dams First Row: 5 Animated Glassy Water Cylinders */}
      <div className="card space-y-4">
        <div className="flex items-center justify-between border-b border-[var(--lg-border)] pb-2.5">
          <div className="flex items-center gap-2">
            <Droplets className="w-4 h-4 text-sky-400" />
            <h3 className="text-sm font-black text-white">
              اسکادای ذخایر آبی سدهای پنجگانه تامین آب کلان‌شهر تهران (میلیون مترمکعب)
            </h3>
          </div>
          <span className="text-xs text-slate-400">حجم کل پرشدگی: ۳۴٪ مخازن</span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
          {TEHRAN_5_DAMS.map((dam) => {
            const isCritical = dam.status.includes('بحرانی');
            const isWarning = dam.status.includes('هشدار');
            const waveColor = isCritical ? '#f43f5e' : isWarning ? '#f59e0b' : '#38bdf8';

            return (
              <div
                key={dam.id}
                className="p-3.5 rounded-2xl border border-white/10 bg-white/5 flex flex-col items-center justify-between space-y-3 relative overflow-hidden"
              >
                {/* Status Pill */}
                <div className="w-full flex items-center justify-between text-[11px]">
                  <span className="font-bold text-white">{dam.name}</span>
                  <span
                    className={`px-2 py-0.5 rounded-full text-[9px] font-bold ${
                      isCritical
                        ? 'bg-rose-500/20 text-rose-300'
                        : isWarning
                        ? 'bg-amber-500/20 text-amber-300'
                        : 'bg-emerald-500/20 text-emerald-300'
                    }`}
                  >
                    {dam.status}
                  </span>
                </div>

                {/* Animated Glassy Water Cylinder */}
                <div className="relative w-20 h-36 rounded-2xl border-2 border-white/20 bg-slate-900/60 overflow-hidden shadow-inner flex flex-col justify-end">
                  {/* Fill Water */}
                  <div
                    className="w-full transition-all duration-1000 relative"
                    style={{
                      height: `${dam.fillPercent}%`,
                      background: `linear-gradient(to top, ${waveColor}90, ${waveColor}40)`,
                      boxShadow: `0 0 15px ${waveColor}80`,
                    }}
                  >
                    {/* Animated Wave Top Line */}
                    <div
                      className="absolute top-0 inset-x-0 h-1.5 opacity-80"
                      style={{ background: waveColor }}
                    />
                  </div>

                  {/* Percentage in Cylinder Center */}
                  <div className="absolute inset-0 flex items-center justify-center font-mono font-black text-sm text-white drop-shadow-md">
                    {toPersianDigits(dam.fillPercent)}٪
                  </div>
                </div>

                {/* Metrics */}
                <div className="w-full text-center space-y-1 text-xs">
                  <div className="text-[11px] text-slate-300">
                    <span className="text-slate-400">حجم فعلی: </span>
                    <strong className="text-white font-mono">{toPersianDigits(dam.currentVolume_MCM)}</strong> م۳
                  </div>
                  <div className="text-[10px] text-slate-500">
                    ظرفیت کل: {toPersianDigits(dam.totalCapacity_MCM)} م۳
                  </div>
                  <div className="text-[9.5px] text-slate-400 line-clamp-1 mt-1" title={dam.targetZones}>
                    {dam.targetZones}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* 4. Dedicated Energy & Hydro What-If Scenario Levers & 30-Day Predictive Engine */}
      <DomainScenarioAndPredictionEngine moduleId="energy" />

      {/* 5. Second Row: Power Peak Load & Industrial Shift Controller */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Power Grid Load Card */}
        <div className="lg:col-span-6 card space-y-3">
          <div className="flex items-center justify-between border-b border-[var(--lg-border)] pb-2">
            <div className="flex items-center gap-2">
              <Zap className="w-4 h-4 text-amber-400" />
              <h3 className="text-sm font-black text-white">پایش پیک بار مصرف برق منطقه‌ای استان تهران</h3>
            </div>
            <span className="text-xs font-mono font-bold text-amber-300">
              {formatPersianNumber(currentLoadMw)} مگاوات
            </span>
          </div>

          <div className="space-y-2">
            <div className="flex justify-between text-xs text-slate-300">
              <span>ضریب بار نسبت به سقف ایمن شبکه ({formatPersianNumber(maxCapacityMw)} MW):</span>
              <span className="font-mono font-bold text-amber-400">{toPersianDigits(loadPercentage)}٪</span>
            </div>
            <div className="w-full h-3 rounded-full bg-white/10 overflow-hidden">
              <div
                className={`h-full rounded-full transition-all ${
                  loadPercentage > 90 ? 'bg-rose-500' : 'bg-gradient-to-l from-amber-400 to-orange-500'
                }`}
                style={{ width: `${loadPercentage}%` }}
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-2 text-xs pt-2">
            <div className="p-2.5 rounded-xl bg-white/5 border border-white/10">
              <span className="text-[10px] text-slate-400">مصرف بخش خانگی و تجاری:</span>
              <div className="text-base font-bold text-white font-mono mt-0.5">۶۲٪</div>
            </div>
            <div className="p-2.5 rounded-xl bg-white/5 border border-white/10">
              <span className="text-[10px] text-slate-400">مصرف صنایع و کشاورزی:</span>
              <div className="text-base font-bold text-cyan-300 font-mono mt-0.5">۳۸٪</div>
            </div>
          </div>
        </div>

        {/* Industrial Shift Controller */}
        <div className="lg:col-span-6 card space-y-4">
          <div className="flex items-center justify-between border-b border-[var(--lg-border)] pb-2">
            <div className="flex items-center gap-2">
              <Sliders className="w-4 h-4 text-cyan-400" />
              <h3 className="text-sm font-black text-white">مدیریت هوشمند شیفت برق شهرک‌های صنعتی</h3>
            </div>
            <span className="text-xs text-slate-400">کاهش بار پیک</span>
          </div>

          <div className="space-y-3">
            <div>
              <div className="flex justify-between text-xs font-bold mb-1">
                <span>ساعات انتقال بار صنعتی به شب:</span>
                <span className="font-mono text-cyan-300">{toPersianDigits(industrialShiftHour)} ساعت</span>
              </div>
              <input
                type="range"
                min="0"
                max="8"
                step="1"
                value={industrialShiftHour}
                onChange={(e) => setIndustrialShiftHour(Number(e.target.value))}
                className="w-full accent-cyan-400 cursor-pointer"
              />
            </div>

            <div className="flex items-center justify-between text-xs text-slate-300">
              <span>پروژه ۱۲۰ مگاواتی خورشیدی شهرک‌های صنعتی:</span>
              <span className="font-mono text-emerald-400 font-bold">پیشرفت ۶۴٪</span>
            </div>

            <button
              onClick={handleShiftCommand}
              className="w-full py-2.5 rounded-xl bg-gradient-to-l from-cyan-600 via-indigo-600 to-sky-700 hover:from-cyan-500 text-white font-bold text-xs flex items-center justify-center gap-1.5 transition-all shadow-md"
            >
              <Zap className="w-4 h-4" />
              <span>ابلاغ دستور مدیریت بار به شرکت توزیع برق تهران</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default EnergyDamsView;
