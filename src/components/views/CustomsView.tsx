'use client';

import React, { useState } from 'react';
import { TEHRAN_6_CUSTOMS } from '@/src/data/tehranMasterData';
import { InPageAgentPanel } from '@/src/components/ai/InPageAgentPanel';
import { toPersianDigits, formatPersianNumber } from '@/src/utils/formatters';
import {
  Truck,
  Plane,
  Train,
  CheckCircle2,
  Clock,
  Layers,
  Sparkles,
  Zap,
  ShieldCheck,
  AlertTriangle,
} from 'lucide-react';
import { DomainScenarioAndPredictionEngine } from '@/src/components/shared/DomainScenarioAndPredictionEngine';

export function CustomsView() {
  const [customsList, setCustomsList] = useState(TEHRAN_6_CUSTOMS);
  const [greenChannelNotice, setGreenChannelNotice] = useState<string | null>(null);

  const activateGreenChannel = (customsId: string, customsName: string) => {
    setCustomsList((prev) =>
      prev.map((c) =>
        c.id === customsId
          ? {
              ...c,
              clearanceTime_Days: Math.max(0.8, Number((c.clearanceTime_Days * 0.45).toFixed(1))),
              containersInQueue: Math.max(120, Math.round(c.containersInQueue * 0.5)),
            }
          : c
      )
    );
    setGreenChannelNotice(
      `مسیر سبز گمرکی (Green Channel) در «${customsName}» برای مواد اولیه کارخانجات تولیدی و دارو با موفقیت فعال شد. زمان ترخیص به کمتر از ۲۴ ساعت کاهش یافت.`
    );
  };

  return (
    <div className="space-y-6">
      {/* 1. Header Bar */}
      <div className="flex flex-wrap items-center justify-between gap-3 border-b border-[var(--lg-border)] pb-3">
        <div>
          <div className="text-[11px] text-[var(--lg-muted)] flex items-center gap-1.5 font-medium mb-1">
            <span>تجارت خارجی و لجستیک</span>
            <span>/</span>
            <span className="text-[var(--lg-accent)]">گمرکات ۶گانه، صادرات، واردات و ترانزیت (Customs)</span>
          </div>
          <h1 className="text-xl md:text-2xl font-black text-[var(--lg-ink)] flex items-center gap-2">
            <span>مرکز فرماندهی گمرکات ۶گانه استان تهران و هاب ریلی-لجستیکی بندر خشک آپرین</span>
          </h1>
        </div>

        <span className="text-xs font-mono font-bold text-amber-400 bg-amber-500/15 px-3 py-1.5 rounded-xl border border-amber-500/30">
          ۹۰٪ کارگو هوایی و بزرگ‌ترین گمرک زمینی کشور
        </span>
      </div>

      {/* 2. Resident AI Specialist Agent 8 (Customs Navigator) */}
      <InPageAgentPanel
        agentCode="AGT-08"
        pageTitle="میز فرمانده لجستیک و ترخیص گمرکات تهران"
      />

      {greenChannelNotice && (
        <div className="p-3.5 rounded-2xl bg-emerald-500/15 border border-emerald-500/30 text-xs text-emerald-200 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
            <span>{greenChannelNotice}</span>
          </div>
          <button
            onClick={() => setGreenChannelNotice(null)}
            className="text-emerald-400 font-bold hover:underline"
          >
            بستن
          </button>
        </div>
      )}

      {/* 3. Top Macro Strip */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
        <div className="card p-3.5">
          <div className="text-[10px] text-slate-400">مجموع ارزش واردات ماهانه</div>
          <div className="text-2xl font-black text-white font-mono mt-0.5">۲,۵۶۳ <span className="text-xs font-normal">میلیون دلار</span></div>
          <div className="text-[10px] text-cyan-400 mt-1">عمدتاً مواد اولیه و ماشین‌آلات</div>
        </div>

        <div className="card p-3.5">
          <div className="text-[10px] text-slate-400">مجموع ارزش صادرات غیرنفتی</div>
          <div className="text-2xl font-black text-emerald-400 font-mono mt-0.5">۹۵۷ <span className="text-xs font-normal">میلیون دلار</span></div>
          <div className="text-[10px] text-emerald-300 mt-1">صنایع پلیمری، دارو و مواد غذایی</div>
        </div>

        <div className="card p-3.5">
          <div className="text-[10px] text-slate-400">کل کانتینرهای در صف ترخیص</div>
          <div className="text-2xl font-black text-amber-400 font-mono mt-0.5">۴,۱۱۵ <span className="text-xs font-normal">دستگاه</span></div>
          <div className="text-[10px] text-amber-300 mt-1">در ۶ گمرک و انبارهای عمومی</div>
        </div>

        <div className="card p-3.5">
          <div className="text-[10px] text-slate-400">میانگین زمان ترخیص استان</div>
          <div className="text-2xl font-black text-cyan-300 font-mono mt-0.5">۲.۸ <span className="text-xs font-normal">روز</span></div>
          <div className="text-[10px] text-cyan-200 mt-1">کاهش ۱.۲ روزی با مسیر سبز</div>
        </div>
      </div>

      {/* 4. Dedicated Customs What-If Scenario Levers & 30-Day Predictive Engine */}
      <DomainScenarioAndPredictionEngine moduleId="customs" />

      {/* 5. Customs Hub View: 6 Dedicated Glassy Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {customsList.map((hub) => (
          <div
            key={hub.id}
            className="card relative flex flex-col justify-between space-y-4 hover:border-[var(--lg-accent)] transition-all"
          >
            <div>
              {/* Header */}
              <div className="flex items-center justify-between border-b border-white/10 pb-2 mb-2.5">
                <div>
                  <h3 className="text-sm font-black text-white">{hub.name}</h3>
                  <div className="text-[10px] text-slate-400 mt-0.5">
                    نوع پایانه: {hub.type}
                  </div>
                </div>
                <div className="w-7 h-7 rounded-lg bg-white/5 border border-white/10 flex items-center justify-center text-cyan-300">
                  {hub.type.includes('هوایی') ? (
                    <Plane className="w-3.5 h-3.5" />
                  ) : hub.type.includes('ریلی') ? (
                    <Train className="w-3.5 h-3.5" />
                  ) : (
                    <Truck className="w-3.5 h-3.5" />
                  )}
                </div>
              </div>

              {/* Warehouse Capacity Bar */}
              <div className="space-y-1 mb-3">
                <div className="flex justify-between text-xs">
                  <span className="text-slate-400">ضریب اشغال انبارهای گمرکی:</span>
                  <span className="font-mono font-bold text-amber-300">{toPersianDigits(hub.capacityPercent)}٪</span>
                </div>
                <div className="w-full h-2 rounded-full bg-white/10 overflow-hidden">
                  <div
                    className={`h-full rounded-full ${
                      hub.capacityPercent > 85 ? 'bg-rose-500' : hub.capacityPercent > 70 ? 'bg-amber-400' : 'bg-emerald-400'
                    }`}
                    style={{ width: `${hub.capacityPercent}%` }}
                  />
                </div>
              </div>

              {/* Metrics */}
              <div className="grid grid-cols-2 gap-2 text-xs mb-3">
                <div className="p-2 rounded-xl bg-white/5 border border-white/10 text-right">
                  <span className="text-[10px] text-slate-400">زمان ترخیص:</span>
                  <div className="text-base font-bold text-cyan-300 font-mono mt-0.5">
                    {toPersianDigits(hub.clearanceTime_Days)} روز
                  </div>
                </div>
                <div className="p-2 rounded-xl bg-white/5 border border-white/10 text-right">
                  <span className="text-[10px] text-slate-400">صف کانتینرها:</span>
                  <div className="text-base font-bold text-amber-400 font-mono mt-0.5">
                    {toPersianDigits(hub.containersInQueue)}
                  </div>
                </div>
              </div>

              {/* Monthly Flow */}
              <div className="text-[11px] text-slate-300 space-y-1 mb-2">
                <div className="flex justify-between">
                  <span className="text-slate-400">واردات ماهانه:</span>
                  <span className="font-mono text-cyan-300 font-bold">{toPersianDigits(hub.monthlyImport_MUSD)} میلیون دلار</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-400">صادرات ماهانه:</span>
                  <span className="font-mono text-emerald-300 font-bold">{toPersianDigits(hub.monthlyExport_MUSD)} میلیون دلار</span>
                </div>
              </div>

              {/* Goods info */}
              <div className="text-[11px] text-slate-400 pt-2 border-t border-white/5">
                <strong className="text-white">اقلام اصلی: </strong>
                {hub.mainGoods}
              </div>
            </div>

            {/* Action: Trigger Green Channel */}
            <button
              onClick={() => activateGreenChannel(hub.id, hub.name)}
              className="w-full py-2 rounded-xl bg-gradient-to-l from-emerald-600 to-teal-600 hover:from-emerald-500 text-white font-bold text-xs flex items-center justify-center gap-1.5 transition-all shadow-md"
            >
              <Zap className="w-3.5 h-3.5 text-amber-300" />
              <span>فعال‌سازی مسیر سبز ترخیص فوری (۲۴ ساعته)</span>
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}

export default CustomsView;
