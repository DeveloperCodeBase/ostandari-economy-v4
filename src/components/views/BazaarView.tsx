'use client';

import React, { useState } from 'react';
import { TEHRAN_ESSENTIAL_GOODS_BAZAAR } from '@/src/data/tehranMasterData';
import { LiquidCharts } from '@/src/utils/liquidCharts';
import { InPageAgentPanel } from '@/src/components/ai/InPageAgentPanel';
import { toPersianDigits, formatPersianNumber } from '@/src/utils/formatters';
import {
  ShoppingBag,
  TrendingDown,
  TrendingUp,
  AlertTriangle,
  CheckCircle2,
  Truck,
  ShieldAlert,
  Search,
  Sparkles,
  Layers,
} from 'lucide-react';
import { DomainScenarioAndPredictionEngine } from '@/src/components/shared/DomainScenarioAndPredictionEngine';

export function BazaarView() {
  const [searchTerm, setSearchTerm] = useState('');
  const [marketInterventionNotice, setMarketInterventionNotice] = useState<string | null>(null);
  const [injectedColdReserveTons, setInjectedColdReserveTons] = useState<number>(450);

  // Market Stability Score (0 to 100) -> 78 = Stable
  const marketStabilityScore = 78;

  const filteredGoods = TEHRAN_ESSENTIAL_GOODS_BAZAAR.filter((g) =>
    g.name.includes(searchTerm) || g.status.includes(searchTerm)
  );

  const handleIntervention = () => {
    setMarketInterventionNotice(
      `دستور فوری تزریق ${injectedColdReserveTons} تن گوشت و مرغ منجمد از ذخایر سردخانه‌ای به ۳۰۵ میدان میوه و تره‌بار و اعزام ۲۴ گشت مشترک تعزیرات صادر شد.`
    );
  };

  return (
    <div className="space-y-6">
      {/* 1. Header Bar */}
      <div className="flex flex-wrap items-center justify-between gap-3 border-b border-[var(--lg-border)] pb-3">
        <div>
          <div className="text-[11px] text-[var(--lg-muted)] flex items-center gap-1.5 font-medium mb-1">
            <span>تنظیم بازار و اصناف</span>
            <span>/</span>
            <span className="text-[var(--lg-accent)]">تنظیم بازار، میادین تره‌بار و نظارت بر قیمت‌ها (Bazaar)</span>
          </div>
          <h1 className="text-xl md:text-2xl font-black text-[var(--lg-ink)] flex items-center gap-2">
            <span>تابلوی نرخنامه زنده ۱۸ کالای اساسی و آرامش بازار استان تهران</span>
          </h1>
        </div>

        <button
          onClick={handleIntervention}
          className="px-4 py-2 rounded-xl bg-gradient-to-l from-rose-600 via-pink-600 to-rose-700 hover:from-rose-500 text-white font-bold text-xs flex items-center gap-1.5 shadow-lg shadow-rose-950/60 transition-all"
        >
          <ShieldAlert className="w-3.5 h-3.5" />
          <span>تزریق ذخایر سردخانه‌ای و گشت تعزیرات</span>
        </button>
      </div>

      {/* 2. Resident AI Specialist Agent 6 (Market Stabilizer) */}
      <InPageAgentPanel
        agentCode="AGT-06"
        pageTitle="میز رادار ضداحتکار و پایش قیمت کالاهای اساسی تهران"
      />

      {marketInterventionNotice && (
        <div className="p-3 rounded-2xl bg-rose-500/15 border border-rose-500/30 text-xs text-rose-200 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <CheckCircle2 className="w-4 h-4 text-rose-400 shrink-0" />
            <span>{marketInterventionNotice}</span>
          </div>
          <button
            onClick={() => setMarketInterventionNotice(null)}
            className="text-rose-400 font-bold hover:underline"
          >
            بستن
          </button>
        </div>
      )}

      {/* 3. Dedicated Market What-If Scenario Levers & 30-Day Predictive Engine */}
      <DomainScenarioAndPredictionEngine moduleId="bazaar" />

      {/* 4. Customers View Grid: Central Tarabar Hub + 180° Gauge */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Right Column: Central Fruit & Veg Market Terminal (305 Mayadin) */}
        <div className="lg:col-span-8 card space-y-4">
          <div className="flex flex-wrap items-center justify-between gap-2 border-b border-[var(--lg-border)] pb-2.5">
            <div>
              <h3 className="text-sm font-black text-white">
                پایش سازمان میادین میوه و تره‌بار شهرداری تهران
              </h3>
              <div className="text-[10px] text-[var(--lg-muted)] mt-0.5">
                ورود روزانه ۱۷,۰۰۰ تن محصول به میدان مرکزی جنوب و توزیع مویرگی در ۳۰۵ میدان تره‌بار
              </div>
            </div>
            <span className="text-xs font-mono font-bold text-emerald-400 bg-emerald-500/15 px-2.5 py-1 rounded-lg border border-emerald-500/30">
              ۱,۱۰۰,۰۰۰ تراکنش روزانه
            </span>
          </div>

          {/* Quick Metrics */}
          <div className="grid grid-cols-3 gap-2.5 text-xs">
            <div className="p-2.5 rounded-xl bg-white/5 border border-white/10 text-right">
              <span className="text-[10px] text-slate-400">میادین و بازارهای فعال:</span>
              <div className="text-lg font-black text-white font-mono mt-0.5">۳۰۵ <span className="text-xs font-normal">میدان</span></div>
            </div>
            <div className="p-2.5 rounded-xl bg-white/5 border border-white/10 text-right">
              <span className="text-[10px] text-slate-400">اختلاف قیمت با بازار آزاد:</span>
              <div className="text-lg font-black text-cyan-300 font-mono mt-0.5">۳۸٪ <span className="text-xs font-normal">ارزان‌تر</span></div>
            </div>
            <div className="p-2.5 rounded-xl bg-white/5 border border-white/10 text-right">
              <span className="text-[10px] text-slate-400">ورودی بار روزانه:</span>
              <div className="text-lg font-black text-emerald-300 font-mono mt-0.5">۱۷,۰۰۰ <span className="text-xs font-normal">تن</span></div>
            </div>
          </div>

          {/* 18 Goods Live Price Table */}
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-white">جدول نرخنامه مصوب، میادین و بازار آزاد:</span>
              <input
                type="text"
                placeholder="جستجوی کالا..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="px-2.5 py-1 rounded-lg text-xs bg-[var(--lg-inner)] border border-[var(--lg-border)] text-white w-44"
              />
            </div>

            <div className="overflow-x-auto max-h-[300px]">
              <table className="w-full text-right text-xs">
                <thead>
                  <tr className="border-b border-white/10 text-slate-400 text-[11px]">
                    <th className="py-2 px-2">نام کالا</th>
                    <th className="py-2 px-2">نرخ مصوب (تومان)</th>
                    <th className="py-2 px-2">نرخ میدان تره‌بار</th>
                    <th className="py-2 px-2">نرخ بازار آزاد</th>
                    <th className="py-2 px-2">عرضه روزانه</th>
                    <th className="py-2 px-2">ذخیره (روز)</th>
                    <th className="py-2 px-2">وضعیت بازار</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-white/5 text-slate-300">
                  {filteredGoods.map((item) => {
                    const diffPercent = Math.round(
                      ((item.freeMarketPrice_Toman - item.tarabarPrice_Toman) / item.tarabarPrice_Toman) * 100
                    );
                    return (
                      <tr key={item.id} className="hover:bg-white/5">
                        <td className="py-2 px-2 font-bold text-white">{item.name}</td>
                        <td className="py-2 px-2 font-mono">{formatPersianNumber(item.govApprovedPrice_Toman)}</td>
                        <td className="py-2 px-2 font-mono text-emerald-300 font-bold">
                          {formatPersianNumber(item.tarabarPrice_Toman)}
                        </td>
                        <td className="py-2 px-2 font-mono text-rose-300 font-bold">
                          {formatPersianNumber(item.freeMarketPrice_Toman)}
                        </td>
                        <td className="py-2 px-2 font-mono">{toPersianDigits(item.dailySupply_Tons)} تن</td>
                        <td className="py-2 px-2 font-mono text-cyan-300">{toPersianDigits(item.strategicReserve_Days)} روز</td>
                        <td className="py-2 px-2">
                          <span
                            className={`px-2 py-0.5 rounded-full text-[10px] font-bold ${
                              item.status.includes('تعادل') || item.status.includes('کامل') || item.status.includes('عالی')
                                ? 'bg-emerald-500/20 text-emerald-300'
                                : 'bg-rose-500/20 text-rose-300'
                            }`}
                          >
                            {item.status}
                          </span>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </div>
        </div>

        {/* Left Column: 180° Market Peace Gauge & Cold Storage Release Controller */}
        <div className="lg:col-span-4 card flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between border-b border-[var(--lg-border)] pb-2 mb-2">
              <h3 className="text-sm font-black text-white">گیج آرامش و تعادل بازار</h3>
              <span className="text-xs font-mono font-bold text-emerald-400">۷۸ از ۱۰۰</span>
            </div>
            <p className="text-[11px] text-[var(--lg-muted)] mb-3">
              شاخص ترکیبی رضایت شهروندان، انطباق با نرخ مصوب و ضریب فراوانی کالاها
            </p>

            <div
              className="w-full flex justify-center py-2"
              dangerouslySetInnerHTML={{
                __html: LiquidCharts.gauge(marketStabilityScore, 'شاخص آرامش بازار'),
              }}
            />
          </div>

          {/* Cold Storage Intervention Form */}
          <div className="pt-3 border-t border-[var(--lg-border)] space-y-3">
            <div className="text-xs font-bold text-white flex items-center gap-1.5">
              <Truck className="w-3.5 h-3.5 text-cyan-400" />
              <span>تنظیم میزان تزریق ذخایر پروتئینی:</span>
            </div>

            <div>
              <div className="flex justify-between text-xs mb-1">
                <span className="text-slate-400">حجم تزریق سردخانه‌ای:</span>
                <span className="font-mono font-bold text-cyan-300">{toPersianDigits(injectedColdReserveTons)} تن</span>
              </div>
              <input
                type="range"
                min="100"
                max="1200"
                step="50"
                value={injectedColdReserveTons}
                onChange={(e) => setInjectedColdReserveTons(Number(e.target.value))}
                className="w-full accent-cyan-400 cursor-pointer"
              />
            </div>

            <button
              onClick={handleIntervention}
              className="w-full py-2 rounded-xl bg-gradient-to-l from-emerald-600 to-teal-600 hover:from-emerald-500 text-white font-bold text-xs flex items-center justify-center gap-1.5 transition-all shadow-md"
            >
              <CheckCircle2 className="w-3.5 h-3.5" />
              <span>اعمال سهمیه در سامانه میادین تره‌بار</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default BazaarView;
