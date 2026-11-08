'use client';

import React, { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import {
  Sliders,
  Play,
  RotateCcw,
  Sparkles,
  TrendingUp,
  AlertTriangle,
  FileText,
  Copy,
  Check,
  Send,
  ShieldAlert,
  ArrowRight,
  Flame,
  ChevronDown,
  ChevronUp,
  Cpu,
  Layers,
  MapPin,
  Clock,
  Download
} from 'lucide-react';
import { useCommand } from '@/src/context/CommandContext';
import {
  DEFAULT_LEVERS,
  PRESET_SCENARIOS,
  calculateScenarioImpact,
  generateGovernorateDecree,
  LEVER_DEFINITIONS,
  type PolicyLevers,
  type ScenarioImpact
} from '@/src/services/scenarioEngine';
import { toPersianDigits, formatPersianNumber } from '@/src/utils/formatters';
import { CyberBarChart, CyberRadarChart } from '@/src/components/charts/InteractiveCharts';
import InPageAgentPanel from '@/src/components/ai/InPageAgentPanel';

export default function ScenarioWarRoomPage() {
  const { currentCounty, openCopilot } = useCommand();
  const [levers, setLevers] = useState<PolicyLevers>({ ...DEFAULT_LEVERS });
  const [activePreset, setActivePreset] = useState<string>('baseline');
  const [naturalQuery, setNaturalQuery] = useState<string>('');
  const [isSimulating, setIsSimulating] = useState<boolean>(false);
  const [copiedDecree, setCopiedDecree] = useState<boolean>(false);
  const [selectedPhase, setSelectedPhase] = useState<number>(0); // 0: 7-day, 1: 30-day, 2: 90-day, 3: 1-year
  const [filterCountyTab, setFilterCountyTab] = useState<'all' | 'high-risk'>('all');

  // Compute simulation impacts
  const impact: ScenarioImpact = useMemo(() => {
    return calculateScenarioImpact(levers);
  }, [levers]);

  // Handle preset selection
  const handleSelectPreset = (presetId: string) => {
    const preset = PRESET_SCENARIOS.find((p) => p.id === presetId);
    if (!preset) return;
    setActivePreset(presetId);
    setIsSimulating(true);
    setTimeout(() => {
      setLevers({ ...preset.levers });
      setIsSimulating(false);
    }, 250);
  };

  // Reset to baseline
  const handleReset = () => {
    setActivePreset('baseline');
    setLevers({ ...DEFAULT_LEVERS });
  };

  // Handle slider change
  const handleSliderChange = (leverKey: keyof PolicyLevers, value: number) => {
    setActivePreset('custom');
    setLevers((prev) => ({
      ...prev,
      [leverKey]: value,
    }));
  };

  // Handle natural language What-If trigger
  const handleNaturalSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!naturalQuery.trim()) return;

    setIsSimulating(true);
    setTimeout(() => {
      const q = naturalQuery.toLowerCase();
      const updated = { ...levers };

      if (q.includes('برق') || q.includes('قطعی')) {
        updated.powerCurtailmentPercent = Math.min(60, updated.powerCurtailmentPercent + 25);
      }
      if (q.includes('آرد') || q.includes('نان')) {
        updated.flourQuotaDeltaPercent = updated.flourQuotaDeltaPercent - 20;
      }
      if (q.includes('دلار') || q.includes('ارز')) {
        updated.fxShockPercent = Math.min(80, updated.fxShockPercent + 30);
      }
      if (q.includes('تنظیم بازار') || q.includes('مرغ') || q.includes('گوشت')) {
        updated.marketInjectionTons = Math.min(5000, updated.marketInjectionTons + 1000);
      }
      if (q.includes('تسهیلات') || q.includes('سرمایه در گردش')) {
        updated.workingCapitalCreditHemmat = Math.min(100, updated.workingCapitalCreditHemmat + 40);
      }
      if (q.includes('آب') || q.includes('خشکسالی')) {
        updated.waterStressPercent = Math.min(50, updated.waterStressPercent + 20);
      }

      setLevers(updated);
      setActivePreset('custom');
      setIsSimulating(false);
    }, 350);
  };

  // Generate official resolution
  const officialDecree = useMemo(() => {
    return generateGovernorateDecree(levers, impact);
  }, [levers, impact]);

  const handleCopyDecree = () => {
    navigator.clipboard.writeText(officialDecree);
    setCopiedDecree(true);
    setTimeout(() => setCopiedDecree(false), 2000);
  };

  // Radar metrics preparation
  const radarAxes = ['پایداری قیمت', 'رونق صنعتی', 'امنیت غذایی', 'ثبات اجتماعی', 'پایداری مالی', 'تراز اشتغال'];
  const radarSeries = useMemo(() => {
    return [
      {
        name: 'وضع مبنا',
        values: [60, 55, 65, 70, 58, 62],
        color: '#64748b',
      },
      {
        name: 'شبیه‌سازی',
        values: [
          Math.max(10, Math.min(100, Math.round(60 - impact.inflationDelta * 4))),
          Math.max(10, Math.min(100, Math.round(55 + impact.industryGdpDelta * 6))),
          Math.max(10, Math.min(100, Math.round(65 + impact.breadQueuingMinutes * -1.2))),
          Math.max(10, Math.min(100, Math.round(100 - impact.socialDiscontentScore))),
          Math.max(10, Math.min(100, Math.round(58 - (impact.fiscalCostBillionTomans / 200)))),
          Math.max(10, Math.min(100, Math.round(62 - (impact.jobLossRiskCount / 800)))),
        ],
        color: '#22d3ee',
      },
    ];
  }, [impact]);

  return (
    <div className="space-y-6">
      {/* Executive Agent Panel */}
      <InPageAgentPanel
        analyst={{
          id: 'AGT-09',
          name: 'شبیه‌ساز سناریو و دومینوی سیاستی',
          role: 'موتور پیش‌بینی آثار متقاطع ۱۲ اهرم اقتصادی',
          analysis: `تحلیل جاری مدل: حساسیت‌سنجی حاکی از آن است که هر ۱۰٪ کاهش در سهمیه آرد نانوایی‌های تهران، صف‌های دریافت را ۱.۴ برابر و شاخص تنش معیشتی در شهرستان‌های جنوب استان (به‌ویژه بهارستان و ملارد) را تا ۲۲٪ تشدید می‌کند. اعمال همزمان تزریق ذخایر راهبردی به میزان ۳۰٪ اثر تورمی شوک ارزی را تا حد ۶.۴٪ مهار می‌کند.`,
          recommendation: 'در صورت تصمیم به تحدید مصرف برق صنعتی، اولویت اعمال مشوق در صنایع دارویی و ریخته‌گری پاکدشت لحاظ گردد تا ریزش اشتغال کارگری رخ ندهد.',
          status: 'ready'
        }}
        kpiIds={['kpi-inflation', 'kpi-reserve', 'kpi-unemployment']}
      />

      {/* Hero Header */}
      <div className="relative overflow-hidden rounded-2xl bg-gradient-to-r from-[#0d1224] via-[#101b30] to-[#091528] border border-cyan-500/20 p-6 shadow-2xl">
        <div className="absolute top-0 right-0 w-96 h-96 bg-cyan-500/5 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-0 left-0 w-80 h-80 bg-sky-500/5 rounded-full blur-3xl pointer-events-none" />

        <div className="relative z-10 flex flex-col lg:flex-row items-start lg:items-center justify-between gap-6">
          <div>
            <div className="flex items-center gap-3 mb-2">
              <div className="p-2.5 rounded-xl bg-cyan-500/10 border border-cyan-500/30 text-cyan-400">
                <Sliders className="w-6 h-6 animate-pulse" />
              </div>
              <h1 className="text-2xl font-black text-white tracking-wide">
                اتاق جنگ اقتصادی و شبیه‌ساز اثرات متقاطع (What-If War Room)
              </h1>
            </div>
            <p className="text-sm text-slate-400 max-w-3xl leading-relaxed">
              دستکاری ۱۲ متغیر سیاستی کلیدی استان تهران، محاسبه آنلاین آثار دومینویی بر معیشت، صنایع، تراز بودجه استانی و تولید پیش‌نویس مصوبه استانداری با امضای محمدصادق معتمدیان.
            </p>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={handleReset}
              className="flex items-center gap-2 px-4 py-2.5 rounded-xl border border-slate-700 bg-slate-900/60 text-slate-300 hover:text-white hover:border-slate-500 text-xs font-medium transition-all"
            >
              <RotateCcw className="w-4 h-4" />
              بازنشانی به وضع مبنا
            </button>
            <button
              onClick={() => openCopilot('AGT-09')}
              className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-gradient-to-r from-cyan-600 to-blue-600 hover:from-cyan-500 hover:to-blue-500 text-white text-xs font-bold shadow-lg shadow-cyan-600/30 transition-all"
            >
              <Sparkles className="w-4 h-4" />
              مشاوره همزمان عامل AGT-09
            </button>
          </div>
        </div>

        {/* Natural Language Scenario Prompt Bar */}
        <form onSubmit={handleNaturalSubmit} className="mt-6 relative">
          <div className="relative flex items-center">
            <Cpu className="absolute right-4 w-5 h-5 text-cyan-400 pointer-events-none" />
            <input
              type="text"
              value={naturalQuery}
              onChange={(e) => setNaturalQuery(e.target.value)}
              placeholder="شبیه‌سازی با زبان طبیعی: مثلاً «اگر نرخ ارز ۳۰٪ جهش کند و سهمیه آرد ۲۰٪ کاهش یابد چه بر سر صف نان و تورم می‌آید؟»"
              className="w-full bg-[#080c18]/90 border border-cyan-500/30 rounded-xl pr-12 pl-36 py-3.5 text-xs text-slate-200 placeholder-slate-500 focus:outline-none focus:border-cyan-400 focus:ring-1 focus:ring-cyan-400 transition-all"
            />
            <button
              type="submit"
              disabled={isSimulating}
              className="absolute left-2 flex items-center gap-1.5 px-4 py-2 bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-bold rounded-lg text-xs transition-all shadow-md"
            >
              <Play className="w-3.5 h-3.5 fill-current" />
              اجرای سناریو
            </button>
          </div>
        </form>

        {/* Presets Bar */}
        <div className="mt-4 flex flex-wrap items-center gap-2">
          <span className="text-xs text-slate-400 ml-2 font-medium">بسته‌های پیش‌فرض سیاستی:</span>
          {PRESET_SCENARIOS.map((preset) => {
            const isSelected = activePreset === preset.id;
            return (
              <button
                key={preset.id}
                onClick={() => handleSelectPreset(preset.id)}
                className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium border transition-all ${
                  isSelected
                    ? 'bg-cyan-500/20 border-cyan-400 text-cyan-300 shadow-sm shadow-cyan-500/20'
                    : 'bg-slate-900/60 border-slate-800 text-slate-400 hover:text-slate-200 hover:border-slate-700'
                }`}
              >
                <span className="text-[10px] bg-slate-800 px-1.5 py-0.2 rounded font-mono">{preset.badge}</span>
                <span>{preset.title}</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Main Grid: Left 12 Sliders / Right Impact Dashboard */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left Column: 12 Policy Sliders (5 cols) */}
        <div className="lg:col-span-5 space-y-4">
          <div className="rounded-2xl border border-slate-800/80 bg-[#0F1423]/95 backdrop-blur-md p-5 shadow-xl">
            <div className="flex items-center justify-between pb-3 mb-4 border-b border-slate-800">
              <div className="flex items-center gap-2 text-[var(--lg-ink)] font-bold text-sm">
                <Sliders className="w-4 h-4 text-cyan-400" />
                <span>۱۲ اهرم تصمیم‌یار استانی</span>
              </div>
              <span className="text-[11px] text-slate-400 bg-slate-900 px-2 py-0.5 rounded border border-slate-800">
                {activePreset === 'custom' ? 'تنظیمات دستی' : 'بسته آماده'}
              </span>
            </div>

            <div className="space-y-4 max-h-[720px] overflow-y-auto pr-1 pl-1">
              {LEVER_DEFINITIONS.map((def) => {
                const val = (typeof levers[def.key] === 'number' ? (levers[def.key] as number) : 0);
                const isChanged = val !== DEFAULT_LEVERS[def.key];

                return (
                  <div
                    key={def.key}
                    className={`p-3 rounded-xl border transition-all ${
                      isChanged
                        ? 'border-cyan-500/40 bg-cyan-950/10'
                        : 'border-slate-800/80 bg-slate-900/40 hover:border-slate-700'
                    }`}
                  >
                    <div className="flex items-center justify-between mb-1.5">
                      <div className="flex items-center gap-1.5">
                        <span className="text-sm">{def.icon}</span>
                        <span className="text-xs font-bold text-slate-200">{def.label}</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <span
                          className={`text-xs font-mono font-bold px-2 py-0.5 rounded ${
                            isChanged
                              ? 'bg-cyan-500/20 text-cyan-300 border border-cyan-500/40'
                              : 'bg-slate-800 text-slate-300'
                          }`}
                        >
                          {val > 0 && def.min < 0 ? `+${toPersianDigits(val)}` : toPersianDigits(val)} {def.unit}
                        </span>
                      </div>
                    </div>

                    <p className="text-[10px] text-slate-400 mb-2 leading-relaxed">
                      {def.description}
                    </p>

                    <div className="relative flex items-center">
                      <input
                        type="range"
                        min={def.min}
                        max={def.max}
                        step={def.step}
                        value={val}
                        onChange={(e) => handleSliderChange(def.key, Number(e.target.value))}
                        className="w-full h-1.5 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-cyan-400 focus:outline-none"
                      />
                    </div>

                    <div className="flex justify-between items-center mt-1 text-[9px] text-slate-500 font-mono">
                      <span>{toPersianDigits(def.min)} {def.unit}</span>
                      <span>مبنا: {toPersianDigits(DEFAULT_LEVERS[def.key])} {def.unit}</span>
                      <span>{toPersianDigits(def.max)} {def.unit}</span>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        {/* Right Column: Dynamic Impacts & Resolution (7 cols) */}
        <div className="lg:col-span-7 space-y-6">
          {/* Top KPI Impact Cards */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
            {/* Inflation Delta */}
            <div className="rounded-xl border border-slate-800 bg-[#0F1423]/90 p-3.5 relative overflow-hidden">
              <div className="text-[11px] text-slate-400 mb-1">تغییر تورم استانی</div>
              <div
                className={`text-lg font-black font-mono ${
                  impact.inflationDelta > 0 ? 'text-rose-400' : 'text-emerald-400'
                }`}
              >
                {impact.inflationDelta > 0 ? `+${toPersianDigits(impact.inflationDelta)}٪` : `${toPersianDigits(impact.inflationDelta)}٪`}
              </div>
              <div className="text-[10px] text-slate-500 mt-1">
                نرخ پایه: {toPersianDigits(38.6)}٪
              </div>
            </div>

            {/* Industrial GDP Delta */}
            <div className="rounded-xl border border-slate-800 bg-[#0F1423]/90 p-3.5 relative overflow-hidden">
              <div className="text-[11px] text-slate-400 mb-1">رشد تولید صنعتی</div>
              <div
                className={`text-lg font-black font-mono ${
                  impact.industryGdpDelta >= 0 ? 'text-emerald-400' : 'text-rose-400'
                }`}
              >
                {impact.industryGdpDelta >= 0 ? `+${toPersianDigits(impact.industryGdpDelta)}٪` : `${toPersianDigits(impact.industryGdpDelta)}٪`}
              </div>
              <div className="text-[10px] text-slate-500 mt-1">
                سهم تهران: {toPersianDigits(20.94)}٪
              </div>
            </div>

            {/* Bread Queuing Minutes */}
            <div className="rounded-xl border border-slate-800 bg-[#0F1423]/90 p-3.5 relative overflow-hidden">
              <div className="text-[11px] text-slate-400 mb-1">متوسط صف نان تهران</div>
              <div
                className={`text-lg font-black font-mono ${
                  impact.breadQueuingMinutes > 25 ? 'text-amber-400' : 'text-cyan-400'
                }`}
              >
                {toPersianDigits(impact.breadQueuingMinutes)} دقیقه
              </div>
              <div className="text-[10px] text-slate-500 mt-1">
                مبنا: {toPersianDigits(22)} دقیقه
              </div>
            </div>

            {/* Social Tension Score */}
            <div className="rounded-xl border border-slate-800 bg-[#0F1423]/90 p-3.5 relative overflow-hidden">
              <div className="text-[11px] text-slate-400 mb-1">شاخص تنش اجتماعی</div>
              <div
                className={`text-lg font-black font-mono ${
                  impact.socialDiscontentScore > 65
                    ? 'text-rose-400'
                    : impact.socialDiscontentScore > 40
                    ? 'text-amber-400'
                    : 'text-emerald-400'
                }`}
              >
                {toPersianDigits(impact.socialDiscontentScore)} از ۱۰۰
              </div>
              <div className="text-[10px] text-slate-500 mt-1">
                سطح ریسک: {impact.riskLevel === 'critical' ? 'بحرانی' : impact.riskLevel === 'high' ? 'بالا' : impact.riskLevel === 'medium' ? 'متوسط' : 'پایین'}
              </div>
            </div>
          </div>

          {/* Radar & Fiscal Bar Impact */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* Spider Radar: Baseline vs Simulated */}
            <div className="rounded-2xl border border-slate-800 bg-[#0F1423]/95 p-4 flex flex-col">
              <div className="flex items-center justify-between mb-2">
                <span className="text-xs font-bold text-white">رادار ۶ گانه پایداری کلان</span>
                <div className="flex items-center gap-3 text-[10px]">
                  <span className="flex items-center gap-1 text-slate-400">
                    <span className="w-2 h-2 rounded-full bg-slate-600" /> وضع مبنا
                  </span>
                  <span className="flex items-center gap-1 text-cyan-400">
                    <span className="w-2 h-2 rounded-full bg-cyan-400" /> شبیه‌سازی
                  </span>
                </div>
              </div>
              <div className="h-56 flex items-center justify-center">
                <CyberRadarChart axes={radarAxes} series={radarSeries} size={220} />
              </div>
            </div>

            {/* Fiscal Cost & Job Impact */}
            <div className="rounded-2xl border border-slate-800 bg-[#0F1423]/95 p-4 flex flex-col justify-between">
              <div>
                <span className="text-xs font-bold text-white mb-3 block">تراز مالی و ریسک کارگری</span>
                
                <div className="space-y-3 mt-2">
                  <div className="p-3 rounded-xl bg-slate-900/60 border border-slate-800">
                    <div className="flex justify-between text-xs text-slate-400 mb-1">
                      <span>بار مالی بودجه استانی</span>
                      <span className="font-mono text-cyan-300 font-bold">
                        {toPersianDigits(formatPersianNumber(impact.fiscalCostBillionTomans))} میلیارد تومان
                      </span>
                    </div>
                    <div className="w-full bg-slate-800 h-2 rounded-full overflow-hidden">
                      <div
                        className="bg-gradient-to-r from-cyan-500 to-indigo-500 h-full rounded-full transition-all duration-500"
                        style={{ width: `${Math.min(100, Math.max(5, (impact.fiscalCostBillionTomans / 10000) * 100))}%` }}
                      />
                    </div>
                  </div>

                  <div className="p-3 rounded-xl bg-slate-900/60 border border-slate-800">
                    <div className="flex justify-between text-xs text-slate-400 mb-1">
                      <span>ریسک ریزش اشتغال مستقیم</span>
                      <span className="font-mono text-amber-300 font-bold">
                        {toPersianDigits(formatPersianNumber(impact.jobLossRiskCount))} نفر
                      </span>
                    </div>
                    <div className="w-full bg-slate-800 h-2 rounded-full overflow-hidden">
                      <div
                        className="bg-gradient-to-r from-amber-500 to-rose-500 h-full rounded-full transition-all duration-500"
                        style={{ width: `${Math.min(100, (impact.jobLossRiskCount / 50000) * 100)}%` }}
                      />
                    </div>
                  </div>

                  <div className="p-3 rounded-xl bg-slate-900/60 border border-slate-800">
                    <div className="flex justify-between text-xs text-slate-400 mb-1">
                      <span>درجه ریسک تجمیعی</span>
                      <span className={`text-xs font-bold px-2 py-0.5 rounded ${
                        impact.riskLevel === 'critical' ? 'bg-rose-500/20 text-rose-300 border border-rose-500/40' :
                        impact.riskLevel === 'high' ? 'bg-amber-500/20 text-amber-300 border border-amber-500/40' :
                        'bg-emerald-500/20 text-emerald-300 border border-emerald-500/40'
                      }`}>
                        {impact.riskLevel === 'critical' ? 'بحرانی' : impact.riskLevel === 'high' ? 'بالا' : 'متعادل'}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Domino Effect Tree (7d, 30d, 90d, 1y) */}
          <div className="rounded-2xl border border-slate-800 bg-[#0F1423]/95 p-5 shadow-xl">
            <div className="flex items-center justify-between mb-4 pb-3 border-b border-slate-800">
              <div className="flex items-center gap-2">
                <Flame className="w-4 h-4 text-amber-400" />
                <span className="text-xs font-bold text-white">دومینوی متوالی اثرات زمانی (Cascading Domino Timeline)</span>
              </div>
              <div className="flex items-center gap-1 bg-slate-900 p-1 rounded-xl border border-slate-800">
                {impact.dominoPhases.map((phase, idx) => (
                  <button
                    key={phase.phase}
                    onClick={() => setSelectedPhase(idx)}
                    className={`px-3 py-1 rounded-lg text-xs font-medium transition-all ${
                      selectedPhase === idx
                        ? 'bg-cyan-500 text-slate-950 font-bold shadow'
                        : 'text-slate-400 hover:text-slate-200'
                    }`}
                  >
                    {phase.timeframe}
                  </button>
                ))}
              </div>
            </div>

            <AnimatePresence mode="wait">
              <motion.div
                key={selectedPhase}
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -8 }}
                className="space-y-3"
              >
                <div className="flex items-center gap-2 text-xs font-bold text-cyan-300">
                  <Clock className="w-3.5 h-3.5" />
                  <span>{impact.dominoPhases[selectedPhase].timeframe} - {impact.dominoPhases[selectedPhase].summary}</span>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                  {impact.dominoPhases[selectedPhase].effects.map((eff, i) => (
                    <div
                      key={i}
                      className="p-3 rounded-xl bg-slate-900/60 border border-slate-800/80 text-xs text-slate-300 flex items-start gap-2.5"
                    >
                      <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 mt-1.5 shrink-0" />
                      <span className="leading-relaxed">{eff}</span>
                    </div>
                  ))}
                </div>
              </motion.div>
            </AnimatePresence>
          </div>

          {/* 16 County Differential Heatmap */}
          <div className="rounded-2xl border border-slate-800 bg-[#0F1423]/95 p-5 shadow-xl">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-2">
                <MapPin className="w-4 h-4 text-emerald-400" />
                <span className="text-xs font-bold text-white">پراکندگی اثر بر ۱۶ شهرستان استان تهران</span>
              </div>
              <div className="flex items-center gap-2 text-xs">
                <button
                  onClick={() => setFilterCountyTab('all')}
                  className={`px-2.5 py-1 rounded-lg ${filterCountyTab === 'all' ? 'bg-slate-800 text-cyan-300 font-bold' : 'text-slate-400'}`}
                >
                  همه ۱۶ شهرستان
                </button>
                <button
                  onClick={() => setFilterCountyTab('high-risk')}
                  className={`px-2.5 py-1 rounded-lg ${filterCountyTab === 'high-risk' ? 'bg-rose-950/40 text-rose-300 border border-rose-800/40 font-bold' : 'text-slate-400'}`}
                >
                  فقط مناطق پرریسک
                </button>
              </div>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5">
              {impact.countyImpacts
                .filter((c) => (filterCountyTab === 'high-risk' ? c.riskStatus === 'high' || c.riskStatus === 'critical' : true))
                .map((c) => (
                  <div
                    key={c.countyId}
                    className={`p-2.5 rounded-xl border transition-all ${
                      c.riskStatus === 'critical'
                        ? 'bg-rose-950/20 border-rose-500/40'
                        : c.riskStatus === 'high'
                        ? 'bg-amber-950/20 border-amber-500/40'
                        : 'bg-slate-900/40 border-slate-800'
                    }`}
                  >
                    <div className="flex justify-between items-center mb-1">
                      <span className="text-xs font-bold text-white">{c.name}</span>
                      <span
                        className={`w-2 h-2 rounded-full ${
                          c.riskStatus === 'critical'
                            ? 'bg-rose-400 animate-ping'
                            : c.riskStatus === 'high'
                            ? 'bg-amber-400'
                            : 'bg-emerald-400'
                        }`}
                      />
                    </div>
                    <div className="text-[10px] text-slate-400 flex justify-between">
                      <span>تغییر صف نان:</span>
                      <span className="font-mono text-cyan-300">
                        {c.breadQueuingMinutesDelta > 0 ? `+${toPersianDigits(c.breadQueuingMinutesDelta)}` : toPersianDigits(c.breadQueuingMinutesDelta)} د
                      </span>
                    </div>
                    <div className="text-[10px] text-slate-400 flex justify-between mt-0.5">
                      <span>ریسک اشتغال:</span>
                      <span className="font-mono text-rose-300">
                        {toPersianDigits(formatPersianNumber(c.jobLossRisk))} نفر
                      </span>
                    </div>
                  </div>
                ))}
            </div>
          </div>

          {/* Generated Official Governorate Resolution */}
          <div className="rounded-2xl border border-cyan-500/30 bg-[#0A0E1A] p-5 shadow-2xl relative">
            <div className="flex items-center justify-between pb-3 mb-3 border-b border-cyan-500/20">
              <div className="flex items-center gap-2">
                <FileText className="w-5 h-5 text-cyan-400" />
                <span className="text-sm font-bold text-white">پیش‌نویس مصوبه استانداری تهران (مبتنی بر خروجی مدل)</span>
              </div>
              <button
                onClick={handleCopyDecree}
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-cyan-500/20 hover:bg-cyan-500/30 border border-cyan-500/40 text-cyan-300 text-xs font-medium transition-all"
              >
                {copiedDecree ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                <span>{copiedDecree ? 'کپی شد' : 'کپی متن ابلاغیه'}</span>
              </button>
            </div>

            <div className="bg-[#060810] rounded-xl p-4 border border-slate-800 text-xs text-slate-300 font-mono leading-relaxed whitespace-pre-wrap max-h-64 overflow-y-auto">
              {officialDecree}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
