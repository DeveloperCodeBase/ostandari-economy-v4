'use client';

import React, { useState } from 'react';
import { LiquidCharts } from '@/src/utils/liquidCharts';
import { InPageAgentPanel } from '@/src/components/ai/InPageAgentPanel';
import { toPersianDigits, formatPersianNumber } from '@/src/utils/formatters';
import {
  Building2,
  TrendingUp,
  Sliders,
  Search,
  CheckCircle2,
  AlertTriangle,
  ArrowUpRight,
  ShieldAlert,
  Percent,
} from 'lucide-react';
import { DomainScenarioAndPredictionEngine } from '@/src/components/shared/DomainScenarioAndPredictionEngine';

interface BankRecord {
  id: string;
  name: string;
  type: 'دولتی تجاری' | 'تخصصی دولتی' | 'خصوصی' | 'قرض‌الحسنه';
  depositsHemmat: number;
  loansHemmat: number;
  loanToDepositRatio: number;
  nplRatePercent: number;
  productionSharePercent: number;
  branchesInTehran: number;
  healthStatus: 'عالی' | 'مطلوب' | 'هشدار ناترازی';
}

const TEHRAN_28_BANKS: BankRecord[] = [
  { id: 'mellat', name: 'بانک ملت', type: 'دولتی تجاری', depositsHemmat: 1820, loansHemmat: 1380, loanToDepositRatio: 75.8, nplRatePercent: 3.8, productionSharePercent: 54, branchesInTehran: 380, healthStatus: 'عالی' },
  { id: 'melli', name: 'بانک ملی ایران', type: 'دولتی تجاری', depositsHemmat: 2150, loansHemmat: 1590, loanToDepositRatio: 73.9, nplRatePercent: 4.5, productionSharePercent: 48, branchesInTehran: 490, healthStatus: 'مطلوب' },
  { id: 'tejarat', name: 'بانک تجارت', type: 'دولتی تجاری', depositsHemmat: 1240, loansHemmat: 920, loanToDepositRatio: 74.1, nplRatePercent: 4.1, productionSharePercent: 52, branchesInTehran: 290, healthStatus: 'عالی' },
  { id: 'saderat', name: 'بانک صادرات ایران', type: 'دولتی تجاری', depositsHemmat: 1310, loansHemmat: 880, loanToDepositRatio: 67.2, nplRatePercent: 5.2, productionSharePercent: 42, branchesInTehran: 340, healthStatus: 'مطلوب' },
  { id: 'sepah', name: 'بانک سپه', type: 'دولتی تجاری', depositsHemmat: 1480, loansHemmat: 980, loanToDepositRatio: 66.2, nplRatePercent: 5.6, productionSharePercent: 39, branchesInTehran: 410, healthStatus: 'مطلوب' },
  { id: 'keshavarzi', name: 'بانک کشاورزی', type: 'تخصصی دولتی', depositsHemmat: 420, loansHemmat: 395, loanToDepositRatio: 94.0, nplRatePercent: 3.2, productionSharePercent: 88, branchesInTehran: 95, healthStatus: 'عالی' },
  { id: 'sanat_madan', name: 'بانک صنعت و معدن', type: 'تخصصی دولتی', depositsHemmat: 380, loansHemmat: 360, loanToDepositRatio: 94.7, nplRatePercent: 3.9, productionSharePercent: 95, branchesInTehran: 45, healthStatus: 'عالی' },
  { id: 'maskan', name: 'بانک مسکن', type: 'تخصصی دولتی', depositsHemmat: 610, loansHemmat: 590, loanToDepositRatio: 96.7, nplRatePercent: 2.8, productionSharePercent: 91, branchesInTehran: 140, healthStatus: 'عالی' },
  { id: 'parsian', name: 'بانک پارسیان', type: 'خصوصی', depositsHemmat: 790, loansHemmat: 510, loanToDepositRatio: 64.5, nplRatePercent: 6.8, productionSharePercent: 35, branchesInTehran: 160, healthStatus: 'هشدار ناترازی' },
  { id: 'pasargad', name: 'بانک پاسارگاد', type: 'خصوصی', depositsHemmat: 950, loansHemmat: 720, loanToDepositRatio: 75.7, nplRatePercent: 3.4, productionSharePercent: 62, branchesInTehran: 175, healthStatus: 'عالی' },
  { id: 'saman', name: 'بانک سامان', type: 'خصوصی', depositsHemmat: 490, loansHemmat: 340, loanToDepositRatio: 69.3, nplRatePercent: 3.7, productionSharePercent: 44, branchesInTehran: 85, healthStatus: 'عالی' },
  { id: 'resalat', name: 'بانک قرض‌الحسنه رسالت', type: 'قرض‌الحسنه', depositsHemmat: 320, loansHemmat: 305, loanToDepositRatio: 95.3, nplRatePercent: 1.1, productionSharePercent: 28, branchesInTehran: 40, healthStatus: 'عالی' },
];

export function BankingView() {
  const [searchTerm, setSearchTerm] = useState('');
  const [nplStressShockPercent, setNplStressShockPercent] = useState<number>(0);
  const [productionCreditShiftPercent, setProductionCreditShiftPercent] = useState<number>(15);

  // 3 Concentric Telemetry Rings:
  // Ring 1: National Deposits Share 60.5%
  // Ring 2: Loan-to-Deposit Ratio 68.9%
  // Ring 3: NPL Ratio 4.2% (with shock adjustment)
  const effectiveNpl = 4.2 + (nplStressShockPercent * 0.08);

  const telemetryLabels = ['سهم سپرده‌ها (۶۰.۵٪)', 'نسبت مصارف/منابع (۶۸.۹٪)', `نرخ مطالبات (${effectiveNpl.toFixed(1)}٪)`];

  // Throughput: Deposit Inflow vs Loan Outflow for Top 6 Banks (Hemmat)
  const throughputPairs: [number, number][] = [
    [2150, 1590], // Melli
    [1820, 1380], // Mellat
    [1480, 980],  // Sepah
    [1310, 880],  // Saderat
    [1240, 920],  // Tejarat
    [950, 720],   // Pasargad
  ];
  const throughputLabels = ['ملی', 'ملت', 'سپه', 'صادرات', 'تجارت', 'پاسارگاد'];

  // Filtered banks
  const filteredBanks = TEHRAN_28_BANKS.filter(
    (b) => b.name.includes(searchTerm) || b.type.includes(searchTerm)
  );

  return (
    <div className="space-y-6">
      {/* 1. Header Bar */}
      <div className="flex flex-wrap items-center justify-between gap-3 border-b border-[var(--lg-border)] pb-3">
        <div>
          <div className="text-[11px] text-[var(--lg-muted)] flex items-center gap-1.5 font-medium mb-1">
            <span>نظام پولی و بانکی</span>
            <span>/</span>
            <span className="text-[var(--lg-accent)]">شبکه بانکی، تسهیلات و هدایت اعتبار (Banking)</span>
          </div>
          <h1 className="text-xl md:text-2xl font-black text-[var(--lg-ink)] flex items-center gap-2">
            <span>رصد تله‌متری ۱۱,۴۵۰ همت سپرده بانکی و هدایت اعتبار به تولید استان تهران</span>
          </h1>
        </div>

        <div className="text-xs font-mono font-bold text-cyan-400 bg-cyan-500/15 px-3 py-1.5 rounded-xl border border-cyan-500/30">
          سهم تهران: ۶۰.۵٪ سپرده‌های کشور
        </div>
      </div>

      {/* 2. Resident AI Specialist Agent 3 (Credit Inspector) */}
      <InPageAgentPanel
        agentCode="AGT-03"
        pageTitle="میز نظارتی بازرس شبکه بانکی و اعتبارات تهران"
      />

      {/* 3. Telemetry Matrix Grid: 3 Rings + Inflow/Outflow Dual Bars */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Right: 3 Concentric Telemetry Rings */}
        <div className="lg:col-span-5 card flex flex-col justify-between">
          <div className="flex items-center justify-between border-b border-[var(--lg-border)] pb-2 mb-2">
            <h3 className="text-sm font-black text-[var(--lg-ink)]">
              حلقه‌های تله‌متری شاخص‌های سلامت پولی تهران
            </h3>
            <span className="text-[11px] text-[var(--lg-accent)] font-bold">زنده</span>
          </div>

          <div
            className="w-full flex justify-center py-2"
            dangerouslySetInnerHTML={{
              __html: LiquidCharts.telemetry(60.5, 68.9, Math.min(100, effectiveNpl * 10), telemetryLabels),
            }}
          />

          <div className="pt-3 border-t border-[var(--lg-border)] space-y-1.5 text-xs text-[var(--lg-secondary)]">
            <div className="flex justify-between items-center">
              <span className="flex items-center gap-1.5">
                <span className="w-2.5 h-2.5 rounded-full bg-[var(--lg-accent)] inline-block" />
                سهم از سپرده‌های کل کشور:
              </span>
              <span className="font-bold text-[var(--lg-ink)] font-mono">۶۰.۵٪ (۱۱,۴۵۰ همت)</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="flex items-center gap-1.5">
                <span className="w-2.5 h-2.5 rounded-full bg-cyan-400 inline-block" />
                نسبت مصارف به منابع:
              </span>
              <span className="font-bold text-cyan-300 font-mono">۶۸.۹٪ (۷,۸۹۰ همت تسهیلات)</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="flex items-center gap-1.5">
                <span className="w-2.5 h-2.5 rounded-full bg-rose-400 inline-block" />
                نرخ مطالبات مشکوک‌الوصول (NPL):
              </span>
              <span className="font-bold text-rose-300 font-mono">{toPersianDigits(effectiveNpl.toFixed(1))}٪</span>
            </div>
          </div>
        </div>

        {/* Left: Throughput Dual-Bar Chart */}
        <div className="lg:col-span-7 card">
          <div className="flex items-center justify-between border-b border-[var(--lg-border)] pb-2.5 mb-3">
            <div>
              <h3 className="text-sm font-black text-[var(--lg-ink)]">
                تراز منابع و مصارف ۶ بانک اصلی استان تهران (همت)
              </h3>
              <p className="text-[11px] text-[var(--lg-muted)] mt-0.5">
                میله آبی سرمه‌ای: ورودی سپرده‌ها | میله فیروزه‌ای: خروجی تسهیلات پرداختی
              </p>
            </div>
            <span className="text-xs text-[var(--lg-muted)] font-mono">بانک مرکزی ۱۴۰۵</span>
          </div>

          <div
            className="w-full overflow-x-auto py-2"
            dangerouslySetInnerHTML={{
              __html: LiquidCharts.throughput(throughputPairs, throughputLabels),
            }}
          />

          <div className="mt-3 pt-2.5 border-t border-[var(--lg-border)] flex items-center justify-between text-xs text-[var(--lg-muted)]">
            <span>اختلاف منابع/مصارف در تهران مازاد نقدینگی ۳,۵۶۰ همت را نشان می‌دهد.</span>
            <span className="text-emerald-400 font-bold">ظرفیت بالای تامین مالی</span>
          </div>
        </div>
      </div>

      {/* 4. Dedicated Banking What-If Scenario Levers & 30-Day Predictive Engine */}
      <DomainScenarioAndPredictionEngine moduleId="banking" />

      {/* 5. Interactive Widget: NPL Stress Tester & Credit Direction Levers */}
      <div className="card space-y-4">
        <div className="flex items-center justify-between border-b border-[var(--lg-border)] pb-2">
          <div className="flex items-center gap-2">
            <Sliders className="w-4 h-4 text-cyan-400" />
            <h3 className="text-sm font-black text-[var(--lg-ink)]">
              شبیه‌ساز تست استرس NPL و اهرم انتقال خط اعتباری به شهرک‌های صنعتی
            </h3>
          </div>
          <span className="text-xs text-[var(--lg-muted)]">فرمانِ اقتصاد تهران</span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-center">
          <div className="space-y-3">
            <div>
              <div className="flex justify-between text-xs font-bold mb-1">
                <span>شوک نکول مطالبات غیرجاری (Stress Shock):</span>
                <span className="font-mono text-rose-400">+{toPersianDigits(nplStressShockPercent)}٪</span>
              </div>
              <input
                type="range"
                min="0"
                max="50"
                step="5"
                value={nplStressShockPercent}
                onChange={(e) => setNplStressShockPercent(Number(e.target.value))}
                className="w-full accent-rose-500 cursor-pointer"
              />
              <div className="flex justify-between text-[10px] text-[var(--lg-muted)]">
                <span>شرایط پایدار (NPL = ۴.۲٪)</span>
                <span>بحران بانکی (NPL = ۸.۲٪)</span>
              </div>
            </div>

            <div>
              <div className="flex justify-between text-xs font-bold mb-1">
                <span>انتقال تسهیلات از بخش بازرگانی غیرمولد به صنعت و تولید:</span>
                <span className="font-mono text-emerald-400">+{toPersianDigits(productionCreditShiftPercent)}٪</span>
              </div>
              <input
                type="range"
                min="0"
                max="35"
                step="5"
                value={productionCreditShiftPercent}
                onChange={(e) => setProductionCreditShiftPercent(Number(e.target.value))}
                className="w-full accent-emerald-500 cursor-pointer"
              />
            </div>
          </div>

          <div className="p-4 rounded-2xl bg-white/5 border border-white/10 text-xs space-y-2">
            <div className="font-bold text-white flex items-center gap-1.5">
              <CheckCircle2 className="w-4 h-4 text-emerald-400" />
              <span>نتیجه شبیه‌سازی هدایت اعتبار استانی:</span>
            </div>
            <p className="text-[11px] text-[var(--lg-secondary)] leading-relaxed">
              با فعال‌سازی اهرم انتقال ۱۵ درصدی اعتبار، معادل <strong className="text-emerald-300">۱,۱۸۰ همت</strong> نقدینگی جدید به عنوان سرمایه در گردش به ۲۲ شهرک صنعتی (به‌ویژه شمس‌آباد و عباس‌آباد) تزریق می‌شود و نیاز به اخذ تسهیلات گران‌قیمت بازار آزاد را مرتفع می‌سازد.
            </p>
          </div>
        </div>
      </div>

      {/* 5. Live Table of Operating Banks */}
      <div className="card space-y-3">
        <div className="flex flex-wrap items-center justify-between gap-3 border-b border-[var(--lg-border)] pb-2.5">
          <div className="flex items-center gap-2">
            <Building2 className="w-4 h-4 text-[var(--lg-accent)]" />
            <h3 className="text-sm font-black text-[var(--lg-ink)]">
              پایش زنده بانک‌های عامل فعال در استان تهران ({toPersianDigits(TEHRAN_28_BANKS.length)} بانک منتخب)
            </h3>
          </div>

          <div className="relative">
            <input
              type="text"
              placeholder="جستجوی نام یا نوع بانک..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="px-3 py-1.5 pr-8 rounded-xl text-xs bg-[var(--lg-inner)] border border-[var(--lg-border)] text-[var(--lg-ink)] focus:outline-none focus:border-[var(--lg-accent)] w-60"
            />
            <Search className="w-3.5 h-3.5 text-[var(--lg-muted)] absolute right-2.5 top-2.5" />
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-right text-xs">
            <thead>
              <tr className="border-b border-[var(--lg-border)] text-[var(--lg-muted)]">
                <th className="py-2 px-3">نام بانک</th>
                <th className="py-2 px-3">دسته‌بندی</th>
                <th className="py-2 px-3">مانده سپرده (همت)</th>
                <th className="py-2 px-3">تسهیلات پرداختی (همت)</th>
                <th className="py-2 px-3">نسبت مصارف/منابع</th>
                <th className="py-2 px-3">سهم تسهیلات به تولید</th>
                <th className="py-2 px-3">شعب استان تهران</th>
                <th className="py-2 px-3">وضعیت سلامت</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[var(--lg-border)] text-[var(--lg-secondary)]">
              {filteredBanks.map((bank) => (
                <tr key={bank.id} className="hover:bg-white/5 transition-colors">
                  <td className="py-2.5 px-3 font-bold text-[var(--lg-ink)]">{bank.name}</td>
                  <td className="py-2.5 px-3 text-[11px] text-[var(--lg-muted)]">{bank.type}</td>
                  <td className="py-2.5 px-3 font-mono font-bold text-[var(--lg-ink)]">
                    {toPersianDigits(bank.depositsHemmat)}
                  </td>
                  <td className="py-2.5 px-3 font-mono font-bold text-cyan-400">
                    {toPersianDigits(bank.loansHemmat)}
                  </td>
                  <td className="py-2.5 px-3 font-mono">
                    {toPersianDigits(bank.loanToDepositRatio)}٪
                  </td>
                  <td className="py-2.5 px-3 font-mono text-emerald-400 font-bold">
                    {toPersianDigits(bank.productionSharePercent)}٪
                  </td>
                  <td className="py-2.5 px-3 font-mono">{toPersianDigits(bank.branchesInTehran)}</td>
                  <td className="py-2.5 px-3">
                    <span
                      className={`px-2 py-0.5 rounded-full text-[10px] font-bold ${
                        bank.healthStatus === 'عالی'
                          ? 'bg-emerald-500/15 text-emerald-400 border border-emerald-500/30'
                          : bank.healthStatus === 'مطلوب'
                          ? 'bg-blue-500/15 text-blue-400 border border-blue-500/30'
                          : 'bg-rose-500/15 text-rose-400 border border-rose-500/30'
                      }`}
                    >
                      {bank.healthStatus}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

export default BankingView;
