'use client';

import React, { useState } from 'react';
import { LiquidCharts } from '@/src/utils/liquidCharts';
import { InPageAgentPanel } from '@/src/components/ai/InPageAgentPanel';
import { toPersianDigits, formatPersianNumber } from '@/src/utils/formatters';
import {
  Wheat,
  Activity,
  AlertTriangle,
  CheckCircle2,
  Sliders,
  Filter,
  Flame,
  PlusCircle,
  Database,
  Building,
} from 'lucide-react';
import { DomainScenarioAndPredictionEngine } from '@/src/components/shared/DomainScenarioAndPredictionEngine';

interface BakeryRecord {
  id: string;
  name: string;
  county: string;
  type: 'بربری' | 'سنگک' | 'لواش' | 'تافتون';
  flourCategory: 'نوع ۱ (یارانه‌ای)' | 'نوع ۲ (نیمه‌یارانه‌ای)';
  dailyQuotaSacks: number;
  naninoTransactionsDaily: number;
  anomalyScore: number; // 0 to 100
  status: 'عادی' | 'مشکوک به فروش آزاد' | 'نیازمند سهمیه فوق‌العاده';
}

const SAMPLE_BAKERIES: BakeryRecord[] = [
  { id: 'b1', name: 'نانوایی سنگک سنتی بهار', county: 'تهران (منطقه ۱۲)', type: 'سنگک', flourCategory: 'نوع ۱ (یارانه‌ای)', dailyQuotaSacks: 18, naninoTransactionsDaily: 840, anomalyScore: 4, status: 'عادی' },
  { id: 'b2', name: 'مجتمع پخت بربری نسیم', county: 'بهارستان (نسیم‌شهر)', type: 'بربری', flourCategory: 'نوع ۱ (یارانه‌ای)', dailyQuotaSacks: 22, naninoTransactionsDaily: 1420, anomalyScore: 12, status: 'نیازمند سهمیه فوق‌العاده' },
  { id: 'b3', name: 'نانوایی لواش پرند فاز ۵', county: 'رباط‌کریم (پرند)', type: 'لواش', flourCategory: 'نوع ۲ (نیمه‌یارانه‌ای)', dailyQuotaSacks: 25, naninoTransactionsDaily: 1950, anomalyScore: 8, status: 'نیازمند سهمیه فوق‌العاده' },
  { id: 'b4', name: 'لواش ماشینی ولیعصر', county: 'شهریار (فردوسیه)', type: 'لواش', flourCategory: 'نوع ۱ (یارانه‌ای)', dailyQuotaSacks: 16, naninoTransactionsDaily: 310, anomalyScore: 78, status: 'مشکوک به فروش آزاد' },
  { id: 'b5', name: 'تافتون تنوری پاکدشت', county: 'پاکدشت (شریف‌آباد)', type: 'تافتون', flourCategory: 'نوع ۲ (نیمه‌یارانه‌ای)', dailyQuotaSacks: 14, naninoTransactionsDaily: 620, anomalyScore: 9, status: 'عادی' },
  { id: 'b6', name: 'نانوایی بربری فاز ۱۱ پردیس', county: 'پردیس', type: 'بربری', flourCategory: 'نوع ۱ (یارانه‌ای)', dailyQuotaSacks: 20, naninoTransactionsDaily: 1650, anomalyScore: 6, status: 'نیازمند سهمیه فوق‌العاده' },
  { id: 'b7', name: 'سنگک ری میدان حرم', county: 'ری', type: 'سنگک', flourCategory: 'نوع ۱ (یارانه‌ای)', dailyQuotaSacks: 24, naninoTransactionsDaily: 1100, anomalyScore: 5, status: 'عادی' },
];

export function BreadChainView() {
  const [bakeriesFilter, setBakeriesFilter] = useState<'all' | 'suspicious' | 'emergency'>('all');
  const [emergencyQuotaHemmat, setEmergencyQuotaHemmat] = useState<number>(15);
  const [allocationNotice, setAllocationNotice] = useState<string | null>(null);

  // Hourly baking fulfillment spline (6 AM to 10 PM in thousands of loaves)
  const fulfillmentValues = [120, 480, 890, 1250, 940, 680, 1150, 1480, 820];
  const fulfillmentLabels = ['۶ صبح', '۸ صبح', '۱۰ صبح', '۱۲ ظهر', '۲ بعدازظهر', '۴ عصر', '۶ غروب', '۸ شب', '۱۰ شب'];

  const filteredBakeries = SAMPLE_BAKERIES.filter((b) => {
    if (bakeriesFilter === 'suspicious') return b.status === 'مشکوک به فروش آزاد';
    if (bakeriesFilter === 'emergency') return b.status === 'نیازمند سهمیه فوق‌العاده';
    return true;
  });

  const handleEmergencyRelease = () => {
    setAllocationNotice(`سهمیه فوق‌العاده ${emergencyQuotaHemmat} کیسه آرد اضطراری به مناطق پرجمعیت (پرند، بهارستان، پردیس و شهریار) تزریق شد.`);
  };

  return (
    <div className="space-y-6">
      {/* 1. Header Bar */}
      <div className="flex flex-wrap items-center justify-between gap-3 border-b border-[var(--lg-border)] pb-3">
        <div>
          <div className="text-[11px] text-[var(--lg-muted)] flex items-center gap-1.5 font-medium mb-1">
            <span>امنیت غذایی و خدمات بازرگانی</span>
            <span>/</span>
            <span className="text-[var(--lg-accent)]">زنجیره گندم، سیلوها، آرد و نان (Bread Chain / Nanino)</span>
          </div>
          <h1 className="text-xl md:text-2xl font-black text-[var(--lg-ink)] flex items-center gap-2">
            <span>ترمینال زنده پایش ۱۰,۴۲۰ نانوایی استان تهران و هوشمندسازی سامانه نانینو</span>
          </h1>
        </div>

        <div className="flex items-center gap-2">
          <span className="text-xs font-mono font-bold text-emerald-400 bg-emerald-500/15 px-3 py-1.5 rounded-xl border border-emerald-500/30">
            پوشش ذخایر گندم: ۴۲ روز مطمئن
          </span>
        </div>
      </div>

      {/* 2. Resident AI Specialist Agent 5 (Bread Chain Guardian) */}
      <InPageAgentPanel
        agentCode="AGT-05"
        pageTitle="میز نظارتی نگهبان امنیت غذایی و آرد و نان تهران"
      />

      {allocationNotice && (
        <div className="p-3 rounded-2xl bg-emerald-500/15 border border-emerald-500/30 text-xs text-emerald-200 flex items-center justify-between">
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

      {/* 3. Dedicated Bread Chain What-If Scenario Levers & 30-Day Predictive Engine */}
      <DomainScenarioAndPredictionEngine moduleId="bread" />

      {/* 4. Orders View Layout: 3 Columns Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Right Column: 10,420 Bakeries Live Monitoring Terminal */}
        <div className="lg:col-span-5 card space-y-3">
          <div className="flex items-center justify-between border-b border-[var(--lg-border)] pb-2.5">
            <div>
              <h3 className="text-sm font-black text-white">ترمینال نانوایی‌های سامانه نانینو</h3>
              <div className="text-[10px] text-[var(--lg-muted)] mt-0.5">
                پایش کارتخوان‌های هوشمند و مصرف روزانه کیسه‌های آرد
              </div>
            </div>
            <span className="text-[11px] font-mono text-cyan-400 font-bold">۱۰,۴۲۰ واحد</span>
          </div>

          {/* Filter Tabs */}
          <div className="flex items-center gap-1.5">
            <button
              onClick={() => setBakeriesFilter('all')}
              className={`px-2.5 py-1 rounded-lg text-[11px] font-bold border transition-colors ${
                bakeriesFilter === 'all'
                  ? 'bg-cyan-600 text-white border-cyan-400 shadow-sm'
                  : 'bg-white/5 text-[var(--lg-muted)] border-white/10 hover:text-white'
              }`}
            >
              همه
            </button>
            <button
              onClick={() => setBakeriesFilter('emergency')}
              className={`px-2.5 py-1 rounded-lg text-[11px] font-bold border transition-colors ${
                bakeriesFilter === 'emergency'
                  ? 'bg-amber-600 text-white border-amber-400'
                  : 'bg-white/5 text-[var(--lg-muted)] border-white/10 hover:text-white'
              }`}
            >
              تقاضای فوق‌العاده
            </button>
            <button
              onClick={() => setBakeriesFilter('suspicious')}
              className={`px-2.5 py-1 rounded-lg text-[11px] font-bold border transition-colors ${
                bakeriesFilter === 'suspicious'
                  ? 'bg-rose-600 text-white border-rose-400'
                  : 'bg-white/5 text-[var(--lg-muted)] border-white/10 hover:text-white'
              }`}
            >
              هشدار تراکنش نانینو
            </button>
          </div>

          {/* Bakeries List */}
          <div className="space-y-2 max-h-[360px] overflow-y-auto pr-1">
            {filteredBakeries.map((b) => (
              <div
                key={b.id}
                className="p-3 rounded-2xl bg-white/5 border border-white/10 hover:border-white/20 transition-all text-xs"
              >
                <div className="flex items-center justify-between mb-1">
                  <span className="font-bold text-white">{b.name}</span>
                  <span
                    className={`px-2 py-0.5 rounded-full text-[10px] font-bold ${
                      b.status === 'عادی'
                        ? 'bg-emerald-500/15 text-emerald-400'
                        : b.status === 'نیازمند سهمیه فوق‌العاده'
                        ? 'bg-amber-500/15 text-amber-300'
                        : 'bg-rose-500/15 text-rose-400'
                    }`}
                  >
                    {b.status}
                  </span>
                </div>
                <div className="text-[11px] text-[var(--lg-muted)] flex items-center justify-between">
                  <span>{b.county} · {b.type}</span>
                  <span className="font-mono text-cyan-300">
                    تراکنش: {toPersianDigits(b.naninoTransactionsDaily)}
                  </span>
                </div>
                <div className="mt-2 flex items-center justify-between text-[11px] pt-1.5 border-t border-white/5">
                  <span className="text-slate-400">سهمیه روزانه: {toPersianDigits(b.dailyQuotaSacks)} کیسه</span>
                  {b.status === 'نیازمند سهمیه فوق‌العاده' && (
                    <button
                      onClick={handleEmergencyRelease}
                      className="px-2 py-0.5 rounded bg-amber-500/20 text-amber-300 hover:bg-amber-500/30 text-[10px] font-bold"
                    >
                      تخصیص فوری +۲ کیسه
                    </button>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Middle Column: Daily Baking Speed Spline */}
        <div className="lg:col-span-4 card flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between border-b border-[var(--lg-border)] pb-2 mb-2">
              <h3 className="text-sm font-black text-white">منحنی مصرف و پخت روزانه نان</h3>
              <span className="text-[11px] text-cyan-400 font-mono font-bold">هزار قرص</span>
            </div>
            <p className="text-[11px] text-[var(--lg-muted)] mb-3">
              الگوی ساعتی سرعت پخت و ساعات اوج مصرف در نانوایی‌های تهران
            </p>

            <div
              className="w-full overflow-x-auto py-2"
              dangerouslySetInnerHTML={{
                __html: LiquidCharts.fulfillment(fulfillmentValues, fulfillmentLabels, '#8bd9ff'),
              }}
            />
          </div>

          {/* Interactive Allocator Slider */}
          <div className="pt-3 border-t border-[var(--lg-border)] space-y-2">
            <div className="flex justify-between text-xs font-bold">
              <span>درصد افزایش سهمیه در پیک غروب:</span>
              <span className="font-mono text-cyan-300">+{toPersianDigits(emergencyQuotaHemmat)}٪</span>
            </div>
            <input
              type="range"
              min="0"
              max="40"
              step="5"
              value={emergencyQuotaHemmat}
              onChange={(e) => setEmergencyQuotaHemmat(Number(e.target.value))}
              className="w-full accent-cyan-400 cursor-pointer"
            />
            <button
              onClick={handleEmergencyRelease}
              className="w-full py-2 rounded-xl bg-gradient-to-l from-cyan-600 to-indigo-600 hover:from-cyan-500 text-white font-bold text-xs flex items-center justify-center gap-1.5 transition-all shadow-md"
            >
              <PlusCircle className="w-3.5 h-3.5" />
              <span>دستور آزادسازی سهمیه آرد احتیاطی</span>
            </button>
          </div>
        </div>

        {/* Left Column: 17 Wheat Silos Storage Capacity */}
        <div className="lg:col-span-3 card space-y-3">
          <div className="flex items-center justify-between border-b border-[var(--lg-border)] pb-2">
            <h3 className="text-sm font-black text-white">سیلوهای استراتژیک استان</h3>
            <span className="text-[11px] text-emerald-400 font-mono font-bold">۱۷ سیلو</span>
          </div>

          <div className="space-y-3 text-xs">
            {/* Silo 1 */}
            <div className="p-2.5 rounded-xl bg-white/5 border border-white/10">
              <div className="flex justify-between font-bold text-white mb-1">
                <span>سیلوی بزرگ گندم ری</span>
                <span className="font-mono text-emerald-400">۸۸٪</span>
              </div>
              <div className="w-full h-2 rounded-full bg-white/10 overflow-hidden mb-1">
                <div className="h-full bg-emerald-400 rounded-full w-[88%]" />
              </div>
              <div className="text-[10px] text-slate-400 flex justify-between">
                <span>موجودی: ۱۰۵,۰۰۰ تن</span>
                <span>ظرفیت: ۱۲۰,۰۰۰ تن</span>
              </div>
            </div>

            {/* Silo 2 */}
            <div className="p-2.5 rounded-xl bg-white/5 border border-white/10">
              <div className="flex justify-between font-bold text-white mb-1">
                <span>سیلوی ۴۰ هزار تنی شریف‌آباد پاکدشت</span>
                <span className="font-mono text-cyan-400">۹۲٪</span>
              </div>
              <div className="w-full h-2 rounded-full bg-white/10 overflow-hidden mb-1">
                <div className="h-full bg-cyan-400 rounded-full w-[92%]" />
              </div>
              <div className="text-[10px] text-slate-400 flex justify-between">
                <span>موجودی: ۳۶,۸۰۰ تن</span>
                <span>ظرفیت: ۴۰,۰۰۰ تن</span>
              </div>
            </div>

            {/* Silo 3 */}
            <div className="p-2.5 rounded-xl bg-white/5 border border-white/10">
              <div className="flex justify-between font-bold text-white mb-1">
                <span>سیلوی بتنی ورامین</span>
                <span className="font-mono text-emerald-400">۷۵٪</span>
              </div>
              <div className="w-full h-2 rounded-full bg-white/10 overflow-hidden mb-1">
                <div className="h-full bg-emerald-400 rounded-full w-[75%]" />
              </div>
              <div className="text-[10px] text-slate-400 flex justify-between">
                <span>موجودی: ۳۰,۰۰۰ تن</span>
                <span>ظرفیت: ۴۰,۰۰۰ تن</span>
              </div>
            </div>

            {/* Silo 4 */}
            <div className="p-2.5 rounded-xl bg-white/5 border border-white/10">
              <div className="flex justify-between font-bold text-white mb-1">
                <span>سیلوی فلزی شهریار</span>
                <span className="font-mono text-amber-400">۶۱٪</span>
              </div>
              <div className="w-full h-2 rounded-full bg-white/10 overflow-hidden mb-1">
                <div className="h-full bg-amber-400 rounded-full w-[61%]" />
              </div>
              <div className="text-[10px] text-slate-400 flex justify-between">
                <span>موجودی: ۱۵,۲۰۰ تن</span>
                <span>ظرفیت: ۲۵,۰۰۰ تن</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default BreadChainView;
