'use client';

import React from 'react';
import { TEHRAN_AI_AGENTS } from '@/src/data/tehranMasterData';
import { useCommand } from '@/src/context/CommandContext';
import { Sparkles, BrainCircuit, ArrowUpRight, CheckCircle2, AlertTriangle, Play } from 'lucide-react';
import Link from 'next/link';

interface InsightCard {
  title: string;
  badge: string;
  status: 'safe' | 'warning' | 'danger';
  rootCause: string;
  forecast90d: string;
  actionText: string;
}

export interface InPageAgentPanelProps {
  agentCode?: string;
  pageTitle?: string;
  customInsights?: InsightCard[];
  analyst?: {
    id: string;
    name: string;
    role: string;
    analysis: string;
    recommendation?: string;
    status?: string;
  };
  kpiIds?: string[];
}

export function InPageAgentPanel({
  agentCode = 'AGT-01',
  pageTitle = 'داشبورد فرماندهی',
  customInsights,
  analyst,
}: InPageAgentPanelProps) {
  const { selectedCounty, activeRole } = useCommand();
  const targetCode = analyst?.id || agentCode;
  const agent = TEHRAN_AI_AGENTS.find((a) => a.code === targetCode || a.id === targetCode) || TEHRAN_AI_AGENTS[0];

  const defaultInsights: InsightCard[] = analyst
    ? [
        {
          title: `تحلیل مستقیم ${analyst.name}`,
          badge: analyst.role || 'تحلیلگر هوشمند',
          status: 'safe',
          rootCause: analyst.analysis,
          forecast90d: analyst.recommendation || 'پیش‌بینی مهار نوسان و پایش برخط متغیرهای استان تهران.',
          actionText: 'انتقال فرضیه به اتاق جنگ سناریو',
        },
        {
          title: selectedCounty
            ? `ارزیابی میدانی شهرستان ${selectedCounty.nameFa}`
            : 'ارزیابی ریسک متقاطع در ۱۶ شهرستان تهران',
          badge: 'پایش میدانی',
          status: selectedCounty?.riskLevel === 'critical' ? 'danger' : selectedCounty?.riskLevel === 'warning' ? 'warning' : 'safe',
          rootCause: selectedCounty
            ? `کانون اصلی پایش: ${selectedCounty.topRiskFactor}`
            : 'انحراف نرخ در میادین و بازارهای روزانه در محدوده تاب‌آوری کنترل شده است.',
          forecast90d: 'تداوم پایداری شاخص‌ها در افق ۹۰ روزه با اعمال تدابیر ستاد تنظیم بازار.',
          actionText: 'مشاهده جزئیات GIS شهرستان‌ها',
        },
        {
          title: 'تراز راهبردی و مصوبات حاکمیتی',
          badge: 'مصوبه استانداری',
          status: 'safe',
          rootCause: 'دستور استاندار محترم مبنی بر بازرسی ضربتی و تامین مالی خطوط زنجیره تامین.',
          forecast90d: 'تحقق هدف‌گذاری رشد اقتصادی ۲۱٪ سهم استان تهران در تولید ناخالص ملی.',
          actionText: 'بررسی مصوبات در کارتابل پیگیری',
        },
      ]
    : [
  {
    title: selectedCounty
      ? `تحلیل تعادل عرضه و تقاضا در شهرستان ${selectedCounty.nameFa}`
      : 'تحلیل همبستگی تورم نقطه‌ای و جریان کالاهای اساسی تهران',
    badge: 'پایش زنده ایجنت',
    status: selectedCounty?.riskLevel === 'critical' ? 'danger' : selectedCounty?.riskLevel === 'warning' ? 'warning' : 'safe',
    rootCause: selectedCounty
      ? `عامل اصلی ریسک: ${selectedCounty.topRiskFactor}`
      : 'شکاف قیمتی ۴۰٪ در برنج ایرانی و گوشت قرمز به دلیل رسوب برخی نهاده‌ها در مبادی حمل به تهران پایش شده است.',
    forecast90d: 'پیش‌بینی مهار نوسان تا ۳.۲٪ در صورت استمرار تزریق سهمیه‌های تنظیم بازاری در شهرستان‌های هدف.',
    actionText: 'شبیه‌سازی افزایش ۲۰٪ سهمیه آرد و نهاده در سناریوساز',
  },
  {
    title: 'ارزیابی اثربخشی اعتبارات و جریان نقدینگی تولید',
    badge: 'پیش‌بینی مدل هوشمند',
    status: 'safe',
    rootCause: 'سهم ۶۰.۵٪ سپرده‌های کشور در پایتخت فرصت مناسبی برای هدایت اوراق گام به صنایع شمس‌آباد و عباس‌آباد فراهم نموده است.',
    forecast90d: 'برآورد افزایش راندمان کارخانجات احیاشده به میزان ۱۲٪ در صورت تسریع در استعلام‌های درگاه ملی.',
    actionText: 'انتقال بسته نجات مالی به کارتابل تسهیل و رفع موانع تولید',
  },
  {
    title: 'سنجش تاب‌آوری پدافندی در شرایط پیک مصرف انرژی',
    badge: 'هشدار زودهنگام پدافند',
    status: 'warning',
    rootCause: 'ناترازی بالقوه برق صنایع در روزهای اوج، نیازمند توافق بر برنامه زمان‌بندی جابجایی بار شهرک‌هاست.',
    forecast90d: 'کاهش خسارت عدم‌النفع با اتصال ۱۰ مگاوات نیروگاه خورشیدی شهرک‌های صنعتی پیشوا و قرچک.',
    actionText: 'بررسی اثر سناریوی قطعی بار در آزمایشگاه شبیه‌ساز',
  },
];

  const insights = customInsights || defaultInsights;

  return (
    <div className="bg-gradient-to-r from-[#0a1829]/95 via-[#0F1423]/95 to-[#0b1b30]/90 border border-cyan-500/30 rounded-2xl p-4 md:p-5 backdrop-blur-xl mb-6 shadow-2xl">
      {/* Header bar of the in-page agent */}
      <div className="flex flex-wrap items-center justify-between gap-3 border-b border-cyan-500/20 pb-3 mb-4">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-cyan-600/20 border border-cyan-500/40 flex items-center justify-center text-cyan-400 shadow-inner">
            <BrainCircuit className="w-5 h-5 radar-glow" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="text-sm font-bold text-white">{agent.nameFa}</span>
              <span className="text-[10px] font-mono bg-cyan-500/20 text-cyan-300 px-2 py-0.5 rounded border border-cyan-500/30">
                {agent.code}
              </span>
              <span className="text-xs text-slate-400">· تحلیلگر اختصاصی {pageTitle}</span>
            </div>
            <div className="text-xs text-slate-400 flex items-center gap-2 mt-0.5">
              <span>گزارش ویژه: {activeRole.title} ({activeRole.officialName})</span>
              <span>·</span>
              <span className="text-cyan-400 font-medium">
                حوزه: {selectedCounty ? `شهرستان ${selectedCounty.nameFa}` : 'کلان‌شهر و استان تهران'}
              </span>
            </div>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <Link
            href="/ai-center/scenario-war-room"
            className="text-xs font-semibold px-3 py-1.5 rounded-lg bg-cyan-600 hover:bg-cyan-500 text-white flex items-center gap-1.5 transition-colors shadow-md shadow-cyan-950/50"
          >
            <Play className="w-3.5 h-3.5" />
            <span>اجرای سناریو در اتاق جنگ</span>
          </Link>
        </div>
      </div>

      {/* 3 Executive Insight Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
        {insights.map((item, idx) => (
          <div
            key={idx}
            className={`bg-[#161D31]/80 rounded-xl p-3.5 border transition-all duration-300 flex flex-col justify-between ${
              item.status === 'danger'
                ? 'border-rose-500/30 hover:border-rose-500/50'
                : item.status === 'warning'
                ? 'border-amber-500/30 hover:border-amber-500/50'
                : 'border-slate-700/60 hover:border-cyan-500/40'
            }`}
          >
            <div>
              <div className="flex items-center justify-between gap-2 mb-2">
                <span
                  className={`text-[10px] font-semibold px-2 py-0.5 rounded ${
                    item.status === 'danger'
                      ? 'bg-rose-500/20 text-rose-300'
                      : item.status === 'warning'
                      ? 'bg-amber-500/20 text-amber-300'
                      : 'bg-emerald-500/20 text-emerald-300'
                  }`}
                >
                  {item.badge}
                </span>
                <span className="text-slate-500 text-xs">
                  {item.status === 'danger' ? (
                    <AlertTriangle className="w-3.5 h-3.5 text-rose-400" />
                  ) : item.status === 'warning' ? (
                    <AlertTriangle className="w-3.5 h-3.5 text-amber-400" />
                  ) : (
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
                  )}
                </span>
              </div>

              <h4 className="text-xs font-bold text-slate-100 leading-snug mb-2">{item.title}</h4>

              <div className="text-[11px] text-slate-300 leading-relaxed mb-2 bg-[#0F1423]/70 p-2 rounded-lg border border-slate-800">
                <span className="text-slate-400 font-medium">ریشه‌یابی علّی: </span>
                {item.rootCause}
              </div>

              <div className="text-[11px] text-cyan-300/90 leading-relaxed mb-3">
                <span className="text-slate-400 font-medium">پیش‌بینی ۹۰ روزه: </span>
                {item.forecast90d}
              </div>
            </div>

            <Link
              href="/ai-center/scenario-war-room"
              className="text-[11px] text-cyan-300 hover:text-white flex items-center justify-between pt-2 border-t border-slate-700/50 transition-colors group"
            >
              <span className="truncate">{item.actionText}</span>
              <ArrowUpRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform shrink-0" />
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
}

export default InPageAgentPanel;
