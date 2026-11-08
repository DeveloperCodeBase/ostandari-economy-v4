'use client';

import React, { useState } from 'react';
import { TehranSatellite3DGIS } from '@/src/components/gis/TehranSatellite3DGIS';
import { InPageAgentPanel } from '@/src/components/ai/InPageAgentPanel';
import { TEHRAN_16_COUNTIES, TEHRAN_COUNTY_PROFILES } from '@/src/data/tehranMasterData';
import { toPersianDigits, formatPersianNumber } from '@/src/utils/formatters';
import { useCommand } from '@/src/context/CommandContext';
import {
  Globe,
  Sliders,
  AlertTriangle,
  Sparkles,
  Bot,
  Play,
  RotateCcw,
  CheckCircle2,
  TrendingDown,
  TrendingUp,
  Activity,
  Layers,
} from 'lucide-react';
import { DomainScenarioAndPredictionEngine } from '@/src/components/shared/DomainScenarioAndPredictionEngine';

export function GisWarRoomView() {
  const { selectedCountyId, setSelectedCountyId } = useCommand();

  // 12 Policy Levers State
  const [levers, setLevers] = useState({
    flourQuota: 0, // -30 to +50%
    marketInjection: 2500, // 0 to 10,000 tons
    powerCurtailment: 15, // 0 to 60%
    fxShock: 10, // -20 to +80%
    workingCapital: 65, // 0 to 200 Hemmat
    inspectionIntensity: 'intensified', // normal, intensified, strike
    customsFastTrack: 40, // -50 to +100%
    waterStress: -15, // 0 to -50%
    kalabargCredit: 30, // 0 to 100%
    assetMonetization: 18, // 0 to 100 Hemmat
    seasonalSpike: 15, // -10 to +40%
    freightTariff: 10, // 0 to 60%
  });

  const [simulationRun, setSimulationRun] = useState(false);

  const resetLevers = () => {
    setLevers({
      flourQuota: 0,
      marketInjection: 2500,
      powerCurtailment: 15,
      fxShock: 10,
      workingCapital: 65,
      inspectionIntensity: 'intensified',
      customsFastTrack: 40,
      waterStress: -15,
      kalabargCredit: 30,
      assetMonetization: 18,
      seasonalSpike: 15,
      freightTariff: 10,
    });
    setSimulationRun(false);
  };

  // Calculated Domino Cascade Impacts
  const inflationImpact = ((levers.fxShock * 0.45) - (levers.marketInjection * 0.0018) + (levers.freightTariff * 0.2)).toFixed(1);
  const breadLineImpact = Math.max(2, Math.round(15 - (levers.flourQuota * 0.4)));
  const industryGdpImpact = ((levers.workingCapital * 0.12) - (levers.powerCurtailment * 0.35)).toFixed(1);
  const socialSatisfaction = Math.min(95, Math.max(30, Math.round(75 + (levers.kalabargCredit * 0.25) - (Number(inflationImpact) * 0.3))));

  return (
    <div className="space-y-6">
      {/* 1. Header Bar */}
      <div className="flex flex-wrap items-center justify-between gap-3 border-b border-[var(--lg-border)] pb-3">
        <div>
          <div className="text-[11px] text-[var(--lg-muted)] flex items-center gap-1.5 font-medium mb-1">
            <span>تحلیل فضایی و شبیه‌سازی سناریو</span>
            <span>/</span>
            <span className="text-[var(--lg-accent)]">نقشه ماهواره‌ای ۳ بعدی و اتاق جنگ اقتصادی (GIS & War Room)</span>
          </div>
          <h1 className="text-xl md:text-2xl font-black text-[var(--lg-ink)] flex items-center gap-2">
            <span>کابین شبیه‌سازی ۱۲ اهرم سیاستی و شورای ۱۰ ایجنت تخصصی استان تهران</span>
          </h1>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={resetLevers}
            className="px-3 py-1.5 rounded-xl border border-white/10 text-xs font-bold text-slate-300 hover:text-white flex items-center gap-1.5 transition-colors glass"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            <span>بازنشانی اهرم‌ها</span>
          </button>
          <button
            onClick={() => setSimulationRun(true)}
            className="px-4 py-2 rounded-xl bg-gradient-to-l from-cyan-600 to-sky-700 hover:from-cyan-500 text-white font-bold text-xs flex items-center gap-1.5 shadow-lg shadow-cyan-950/60 transition-all"
          >
            <Play className="w-3.5 h-3.5" />
            <span>اجرای شبیه‌سازی سناریو در اتاق جنگ</span>
          </button>
        </div>
      </div>

      {/* 2. Resident AI Specialist Agent 11: Council of 10 Agents */}
      <InPageAgentPanel
        agentCode="AGT-10"
        pageTitle="شورای عالی ۱۰ ایجنت هوش مصنوعی اتاق جنگ تهران"
      />

      {/* 3. High-Resolution Google Earth 3D GIS Map */}
      <div className="space-y-2">
        <div className="flex items-center justify-between px-1">
          <div className="flex items-center gap-2">
            <Globe className="w-4 h-4 text-cyan-400" />
            <h3 className="text-sm font-black text-white">
              دید فضایی ۳ بعدی ماهواره‌ای استان تهران (Esri World Imagery + برچسب‌های فارسی)
            </h3>
          </div>
          <span className="text-xs text-slate-400">
            با قابلیت چرخش زاویه دید سه‌بعدی و نمایش لایه‌های ۵ سد، ۶ گمرک و ۲۲ شهرک صنعتی
          </span>
        </div>

        <TehranSatellite3DGIS
          height="520px"
          onCountySelect={(id) => setSelectedCountyId(id)}
        />
      </div>

      {/* 4. Dedicated GIS & Spatial Policy Scenario Levers & 30-Day Predictive Engine */}
      <DomainScenarioAndPredictionEngine moduleId="gis" />

      {/* 5. 12 Policy Levers Cabin */}
      <div className="card space-y-4">
        <div className="flex items-center justify-between border-b border-[var(--lg-border)] pb-2">
          <div className="flex items-center gap-2">
            <Sliders className="w-4 h-4 text-[var(--lg-accent)]" />
            <h3 className="text-sm font-black text-white">
              کابین ۱۲ اهرم سیاستی استاندار و شوک‌های اقتصادی («اگر چنین کنیم چه می‌شود؟»)
            </h3>
          </div>
          <span className="text-xs text-slate-400">موتور دینامیک سیستم‌های کلان</span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {/* Lever 1: Flour Quota */}
          <div className="p-3 rounded-xl bg-white/5 border border-white/10 space-y-1.5 text-xs">
            <div className="flex justify-between font-bold">
              <span>۱. تغییر سهمیه آرد نانینو:</span>
              <span className="font-mono text-cyan-300">{levers.flourQuota > 0 ? `+${levers.flourQuota}` : levers.flourQuota}٪</span>
            </div>
            <input
              type="range"
              min="-30"
              max="50"
              step="5"
              value={levers.flourQuota}
              onChange={(e) => setLevers({ ...levers, flourQuota: Number(e.target.value) })}
              className="w-full accent-cyan-400 cursor-pointer"
            />
          </div>

          {/* Lever 2: Market Injection */}
          <div className="p-3 rounded-xl bg-white/5 border border-white/10 space-y-1.5 text-xs">
            <div className="flex justify-between font-bold">
              <span>۲. تزریق ذخایر سردخانه‌ای میادین:</span>
              <span className="font-mono text-emerald-300">{formatPersianNumber(levers.marketInjection)} تن</span>
            </div>
            <input
              type="range"
              min="0"
              max="10000"
              step="500"
              value={levers.marketInjection}
              onChange={(e) => setLevers({ ...levers, marketInjection: Number(e.target.value) })}
              className="w-full accent-emerald-400 cursor-pointer"
            />
          </div>

          {/* Lever 3: Industrial Power Curtailment */}
          <div className="p-3 rounded-xl bg-white/5 border border-white/10 space-y-1.5 text-xs">
            <div className="flex justify-between font-bold">
              <span>۳. مدیریت بار برق صنایع:</span>
              <span className="font-mono text-amber-300">{toPersianDigits(levers.powerCurtailment)}٪</span>
            </div>
            <input
              type="range"
              min="0"
              max="60"
              step="5"
              value={levers.powerCurtailment}
              onChange={(e) => setLevers({ ...levers, powerCurtailment: Number(e.target.value) })}
              className="w-full accent-amber-400 cursor-pointer"
            />
          </div>

          {/* Lever 4: FX Shock */}
          <div className="p-3 rounded-xl bg-white/5 border border-white/10 space-y-1.5 text-xs">
            <div className="flex justify-between font-bold">
              <span>۴. شوک نوسان نرخ ارز:</span>
              <span className="font-mono text-rose-300">+{toPersianDigits(levers.fxShock)}٪</span>
            </div>
            <input
              type="range"
              min="-20"
              max="80"
              step="5"
              value={levers.fxShock}
              onChange={(e) => setLevers({ ...levers, fxShock: Number(e.target.value) })}
              className="w-full accent-rose-500 cursor-pointer"
            />
          </div>

          {/* Lever 5: Working Capital Credit */}
          <div className="p-3 rounded-xl bg-white/5 border border-white/10 space-y-1.5 text-xs">
            <div className="flex justify-between font-bold">
              <span>۵. خط اعتباری سرمایه در گردش:</span>
              <span className="font-mono text-cyan-300">{toPersianDigits(levers.workingCapital)} همت</span>
            </div>
            <input
              type="range"
              min="0"
              max="200"
              step="5"
              value={levers.workingCapital}
              onChange={(e) => setLevers({ ...levers, workingCapital: Number(e.target.value) })}
              className="w-full accent-cyan-400 cursor-pointer"
            />
          </div>

          {/* Lever 6: Customs Fast-Track */}
          <div className="p-3 rounded-xl bg-white/5 border border-white/10 space-y-1.5 text-xs">
            <div className="flex justify-between font-bold">
              <span>۶. سرعت ترخیص گمرکات (مسیر سبز):</span>
              <span className="font-mono text-cyan-300">+{toPersianDigits(levers.customsFastTrack)}٪</span>
            </div>
            <input
              type="range"
              min="-50"
              max="100"
              step="10"
              value={levers.customsFastTrack}
              onChange={(e) => setLevers({ ...levers, customsFastTrack: Number(e.target.value) })}
              className="w-full accent-cyan-400 cursor-pointer"
            />
          </div>
        </div>
      </div>

      {/* 5. Simulation Domino Result & Multi-Agent Council Debate */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Domino Shock Wave Impacts */}
        <div className="lg:col-span-5 card space-y-3">
          <div className="flex items-center justify-between border-b border-white/10 pb-2">
            <h3 className="text-sm font-black text-white">موج‌های پیش‌بینی ضربه‌ای (Domino Phases)</h3>
            <span className="text-[10px] text-cyan-300 font-bold">خروجی سناریو</span>
          </div>

          <div className="space-y-2.5 text-xs">
            <div className="p-3 rounded-xl bg-white/5 border border-white/10">
              <div className="flex justify-between font-bold text-white mb-1">
                <span>تغییر نرخ تورم اقلام خوراکی:</span>
                <span className={`font-mono ${Number(inflationImpact) > 0 ? 'text-rose-400' : 'text-emerald-400'}`}>
                  {Number(inflationImpact) > 0 ? `+${inflationImpact}` : inflationImpact}٪
                </span>
              </div>
              <div className="text-[11px] text-slate-400">
                برآیند اثر شوک ارزی و تزریق ذخایر پروتئینی در میادین تره‌بار
              </div>
            </div>

            <div className="p-3 rounded-xl bg-white/5 border border-white/10">
              <div className="flex justify-between font-bold text-white mb-1">
                <span>میانگین صف نانوایی‌ها در مناطق حاشیه‌ای:</span>
                <span className="font-mono text-cyan-300">{toPersianDigits(breadLineImpact)} دقیقه</span>
              </div>
              <div className="text-[11px] text-slate-400">
                با تخصیص سهمیه هوشمند به شهرستان‌های بهارستان، پرند و پردیس
              </div>
            </div>

            <div className="p-3 rounded-xl bg-white/5 border border-white/10">
              <div className="flex justify-between font-bold text-white mb-1">
                <span>شاخص رضایت و آرامش عمومی:</span>
                <span className="font-mono text-emerald-400 font-bold">{toPersianDigits(socialSatisfaction)} از ۱۰۰</span>
              </div>
              <div className="w-full h-2 rounded-full bg-white/10 overflow-hidden mt-1">
                <div
                  className="h-full bg-gradient-to-l from-emerald-400 to-teal-500 rounded-full"
                  style={{ width: `${socialSatisfaction}%` }}
                />
              </div>
            </div>
          </div>
        </div>

        {/* Live Multi-Agent Council Debate Panel */}
        <div className="lg:col-span-7 card space-y-3">
          <div className="flex items-center justify-between border-b border-white/10 pb-2">
            <div className="flex items-center gap-2">
              <Bot className="w-4 h-4 text-cyan-400" />
              <h3 className="text-sm font-black text-white">
                میزگرد و مناظره زنده شورای ۱۰ ایجنت اتاق جنگ اقتصادی تهران
              </h3>
            </div>
            <span className="text-[10px] text-emerald-400 font-mono font-bold">Live AI Council</span>
          </div>

          <div className="space-y-2.5 max-h-[300px] overflow-y-auto pr-1 text-xs">
            <div className="p-2.5 rounded-xl bg-cyan-950/40 border border-cyan-500/30">
              <div className="font-bold text-cyan-300 mb-0.5">ایجنت استراتژیست کلان (MACRO-AI):</div>
              <p className="text-slate-300 text-[11px] leading-relaxed">
                «تمرکز فعلی سناریو بر تزریق {formatPersianNumber(levers.marketInjection)} تن کالا اقدام صحیحی برای کنترل نوسان کوتاه‌مدت است، اما پایداری آن مشروط به تامین پایدار خوراک دامداری‌های ری و اسلامشهر است.»
              </p>
            </div>

            <div className="p-2.5 rounded-xl bg-cyan-950/40 border border-cyan-500/30">
              <div className="font-bold text-cyan-300 mb-0.5">ایجنت شبکه بانکی (BANK-AI):</div>
              <p className="text-slate-300 text-[11px] leading-relaxed">
                «تخصیص {toPersianDigits(levers.workingCapital)} همت تسهیلات در قالب اوراق گام زنجیره‌ای بدون افزایش پایه پولی، ناترازی نقدینگی کارخانجات شمس‌آباد و عباس‌آباد را مهار خواهد کرد.»
              </p>
            </div>

            <div className="p-2.5 rounded-xl bg-amber-950/40 border border-amber-500/30">
              <div className="font-bold text-amber-300 mb-0.5">ایجنت امنیت غذایی و نانینو (BREAD-AI):</div>
              <p className="text-slate-300 text-[11px] leading-relaxed">
                «با رساندن ذخایر سیلوها به ۴۲ روز، هیچ‌گونه نگرانی در تامین آرد استان وجود ندارد؛ اولویت اصلی جلوگیری از تشکیل صف در فازهای جدید مسکن مهر پرند و پردیس است.»
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default GisWarRoomView;
