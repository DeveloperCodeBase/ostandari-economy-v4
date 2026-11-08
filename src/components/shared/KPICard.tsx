'use client';

import React from 'react';
import { KPICardData } from '@/src/types/economy';
import { toPersianDigits, formatPersianNumber } from '@/src/utils/formatters';
import { useCommand } from '@/src/context/CommandContext';
import { Sparkles, TrendingUp, Sliders, Pin, Info } from 'lucide-react';

export function KPICard({ data }: { data: KPICardData }) {
  const { setProvenanceItem, setMicroAgentItem, pinnedKpiIds, togglePinKpi } = useCommand();

  const isPinned = pinnedKpiIds.includes(data.id);
  const isPositive = data.changeRate >= 0;

  const handleAction = (mode: 'why' | 'forecast' | 'simulate', e: React.MouseEvent) => {
    e.stopPropagation();
    setMicroAgentItem({ kpi: data, mode });
  };

  const handleInfo = (e: React.MouseEvent) => {
    e.stopPropagation();
    setProvenanceItem(data);
  };

  const handlePin = (e: React.MouseEvent) => {
    e.stopPropagation();
    togglePinKpi(data.id);
  };

  return (
    <div
      onClick={handleInfo}
      className="group relative bg-[#0F1423]/90 backdrop-blur-xl border border-cyan-500/20 hover:border-cyan-500/40 rounded-2xl p-4 transition-all duration-300 hover:shadow-xl hover:shadow-cyan-950/20 cursor-pointer flex flex-col justify-between"
    >
      {/* Top Header: Title, Micro-Agent Action Icons & Pin */}
      <div className="flex items-start justify-between gap-2 mb-2">
        <div className="flex-1">
          <div className="flex items-center gap-2">
            <span className="text-xs text-slate-400 font-medium leading-relaxed group-hover:text-slate-200 transition-colors">
              {data.title}
            </span>
            {data.isSimulated && (
              <span className="text-[10px] bg-amber-500/20 text-amber-300 px-1.5 py-0.2 rounded border border-amber-500/30">
                شبیه‌سازی
              </span>
            )}
          </div>
          <div className="flex items-center gap-1.5 text-[11px] text-slate-500 mt-0.5">
            <span>{data.period}</span>
            <span>·</span>
            <span className="truncate max-w-[150px]">{data.source}</span>
          </div>
        </div>

        {/* 3 Micro-Agent Buttons + Pin */}
        <div className="flex items-center gap-1 bg-[#161D31]/80 rounded-lg p-1 border border-slate-700/50">
          <button
            onClick={(e) => handleAction('why', e)}
            title="ریشه‌یابی علّی توسط ایجنت هوشمند"
            className="p-1 text-slate-400 hover:text-cyan-400 hover:bg-cyan-900/30 rounded transition-colors"
          >
            <Sparkles className="w-3.5 h-3.5" />
          </button>
          <button
            onClick={(e) => handleAction('forecast', e)}
            title="پیش‌بینی ۹۰ روزه و باند اطمینان"
            className="p-1 text-slate-400 hover:text-cyan-400 hover:bg-cyan-900/30 rounded transition-colors"
          >
            <TrendingUp className="w-3.5 h-3.5" />
          </button>
          <button
            onClick={(e) => handleAction('simulate', e)}
            title="ارسال مستقیم به موتور سناریوساز"
            className="p-1 text-slate-400 hover:text-amber-400 hover:bg-amber-900/30 rounded transition-colors"
          >
            <Sliders className="w-3.5 h-3.5" />
          </button>
          <button
            onClick={handlePin}
            title={isPinned ? 'حذف از پیشخوان سنجاق‌شده' : 'سنجاق به بالای پیشخوان من'}
            className={`p-1 rounded transition-colors ${
              isPinned ? 'text-cyan-400 bg-cyan-950/50' : 'text-slate-500 hover:text-slate-300'
            }`}
          >
            <Pin className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>

      {/* Main KPI Value */}
      <div className="flex items-baseline justify-between gap-3 my-2">
        <div className="flex items-baseline gap-1.5">
          <span className="text-2xl md:text-3xl font-extrabold text-white font-mono tracking-tight drop-shadow-sm">
            {typeof data.value === 'number' ? formatPersianNumber(data.value) : data.value}
          </span>
          <span className="text-xs text-slate-400 font-medium">{data.unit}</span>
        </div>

        {/* Trend Indicator */}
        <div
          className={`text-xs font-semibold px-2 py-0.5 rounded-md flex items-center gap-1 font-mono ${
            data.status === 'danger'
              ? 'bg-rose-500/20 text-rose-300 border border-rose-500/30'
              : data.status === 'warning'
              ? 'bg-amber-500/20 text-amber-300 border border-amber-500/30'
              : 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/30'
          }`}
        >
          <span>{isPositive ? '↑' : '↓'}</span>
          <span>{toPersianDigits(Math.abs(data.changeRate))}٪</span>
        </div>
      </div>

      {/* Sparkline & Footer Provenance Badge */}
      <div className="flex items-center justify-between pt-2 border-t border-slate-800/80 mt-1">
        <div className="flex items-center gap-1.5">
          <span
            className={`text-[10px] px-1.5 py-0.5 rounded font-mono font-semibold ${
              data.provenanceLevel === 'A'
                ? 'bg-emerald-950/60 text-emerald-300 border border-emerald-800/50'
                : data.provenanceLevel === 'B'
                ? 'bg-cyan-950/60 text-cyan-300 border border-cyan-800/50'
                : data.provenanceLevel === 'C'
                ? 'bg-cyan-950/60 text-cyan-300 border border-cyan-800/50'
                : 'bg-amber-950/60 text-amber-300 border border-amber-800/50'
            }`}
          >
            سطح {data.provenanceLevel}
          </span>
          <button
            onClick={handleInfo}
            className="text-[11px] text-slate-400 hover:text-cyan-300 flex items-center gap-0.5 transition-colors"
          >
            <Info className="w-3 h-3" />
            <span>شناسنامه داده</span>
          </button>
        </div>

        {/* Sparkline SVG */}
        {data.sparkline && data.sparkline.length > 1 && (
          <div className="w-20 h-5">
            <svg viewBox="0 0 80 24" className="w-full h-full overflow-visible">
              <polyline
                fill="none"
                stroke={data.status === 'danger' ? '#F43F5E' : data.status === 'warning' ? '#F59E0B' : '#10B981'}
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                points={data.sparkline
                  .map((val, idx) => {
                    const min = Math.min(...data.sparkline!);
                    const max = Math.max(...data.sparkline!) || 1;
                    const x = (idx / (data.sparkline!.length - 1)) * 76 + 2;
                    const y = 22 - ((val - min) / (max - min || 1)) * 18;
                    return `${x},${y}`;
                  })
                  .join(' ')}
              />
            </svg>
          </div>
        )}
      </div>
    </div>
  );
}

export default KPICard;
