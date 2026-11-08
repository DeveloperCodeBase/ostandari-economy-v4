'use client';

import React, { useState } from 'react';
import { InPageAgentPanel } from '@/src/components/ai/InPageAgentPanel';
import { ESSENTIAL_GOODS_20, TEHRAN_16_COUNTIES } from '@/src/data/tehranMasterData';
import { toPersianDigits, formatPersianNumber } from '@/src/utils/formatters';
import { useCommand } from '@/src/context/CommandContext';
import {
  ShoppingBag,
  TrendingUp,
  AlertTriangle,
  Flame,
  Search,
  CheckCircle2,
  Clock,
  Building,
} from 'lucide-react';

export default function LiveMarketPulsePage() {
  const { selectedCounty } = useCommand();
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [searchFilter, setSearchFilter] = useState('');

  const categories = ['all', 'غلات و نان', 'پروتئین', 'روغن و قند', 'لبنیات', 'میوه و صیفی'];

  const filteredGoods = ESSENTIAL_GOODS_20.filter((item) => {
    const matchesCategory = selectedCategory === 'all' || item.category === selectedCategory;
    const matchesSearch = item.name.includes(searchFilter) || item.category.includes(searchFilter);
    return matchesCategory && matchesSearch;
  });

  const highSpreadGoods = ESSENTIAL_GOODS_20.filter((g) => g.spreadPercent > 35);

  return (
    <div className="space-y-6">
        {/* Breadcrumb & Header */}
        <div className="flex flex-wrap items-center justify-between gap-3 border-b border-slate-800 pb-3">
          <div>
            <div className="text-[11px] text-slate-400 flex items-center gap-1.5 font-medium mb-1">
              <span>سکوی تصمیم‌یار کلان</span>
              <span>/</span>
              <span className="text-cyan-400">نبض لحظه‌ای بازار و معیشت امروز</span>
            </div>
            <h1 className="text-xl md:text-2xl font-black text-white flex items-center gap-2">
              <Flame className="w-6 h-6 text-amber-400 radar-glow" />
              <span>تابلوی برخط نرخ ۲۰ کالای اساسی پایتخت</span>
              {selectedCounty && (
                <span className="text-xs font-bold bg-cyan-600/30 text-cyan-300 px-2.5 py-1 rounded-lg border border-cyan-500/40">
                  شهرستان {selectedCounty.nameFa}
                </span>
              )}
            </h1>
          </div>

          <div className="flex items-center gap-2 text-xs font-mono text-slate-400 bg-[#161D31] px-3 py-1.5 rounded-xl border border-slate-700">
            <Clock className="w-3.5 h-3.5 text-cyan-400" />
            <span>بروزرسانی لحظه‌ای میادین و بازار</span>
          </div>
        </div>

        {/* In-Page AI Executive Analyst (AGT-05 Market Watch AI) */}
        <InPageAgentPanel
          agentCode="AGT-05"
          pageTitle="پایش لحظه‌ای بازار و معیشت"
        />

        {/* 4 Summary Metric Strips */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
          <div className="bg-[#0F1423] border border-cyan-500/20 p-4 rounded-2xl">
            <div className="text-[11px] text-slate-400">کالاهای تحت رصد زنده</div>
            <div className="text-2xl font-black text-white font-mono mt-1">{toPersianDigits(20)} قلم</div>
            <div className="text-[10px] text-emerald-400 mt-1">تطبیق نرخ مصوب، میادین و بازار</div>
          </div>

          <div className="bg-[#0F1423] border border-cyan-500/20 p-4 rounded-2xl">
            <div className="text-[11px] text-slate-400">میانگین تخفیف میادین تره‌بار</div>
            <div className="text-2xl font-black text-cyan-400 font-mono mt-1">{toPersianDigits(32.4)}٪</div>
            <div className="text-[10px] text-slate-400 mt-1">نسبت به متوسط قیمت سطح شهر</div>
          </div>

          <div className="bg-[#0F1423] border border-cyan-500/20 p-4 rounded-2xl">
            <div className="text-[11px] text-slate-400">کالاهای در محدوده هشدار قیمتی</div>
            <div className="text-2xl font-black text-rose-400 font-mono mt-1">
              {toPersianDigits(highSpreadGoods.length)} قلم
            </div>
            <div className="text-[10px] text-rose-300 mt-1">اسپرد بالای ۳۵٪ نرخ مصوب و آزاد</div>
          </div>

          <div className="bg-[#0F1423] border border-cyan-500/20 p-4 rounded-2xl">
            <div className="text-[11px] text-slate-400">توزیع روزانه مرغ و گوشت گرم</div>
            <div className="text-2xl font-black text-amber-400 font-mono mt-1">{toPersianDigits(1680)} تن</div>
            <div className="text-[10px] text-slate-400 mt-1">در ۳۰۰+ بازار روز شهرداری</div>
          </div>
        </div>

        {/* Filter bar: Category Tabs & Search */}
        <div className="flex flex-wrap items-center justify-between gap-3 bg-[#0F1423] p-3 rounded-2xl border border-slate-800">
          <div className="flex items-center gap-1.5 overflow-x-auto text-xs">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-3 py-1.5 rounded-xl font-medium transition-colors whitespace-nowrap ${
                  selectedCategory === cat
                    ? 'bg-cyan-600 text-white font-bold shadow-md shadow-cyan-950/50'
                    : 'bg-[#161D31] text-slate-400 hover:text-white hover:bg-slate-800'
                }`}
              >
                {cat === 'all' ? 'همه ۲۰ قلم کالا' : cat}
              </button>
            ))}
          </div>

          <div className="relative w-full sm:w-64">
            <Search className="w-3.5 h-3.5 text-slate-400 absolute right-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={searchFilter}
              onChange={(e) => setSearchFilter(e.target.value)}
              placeholder="جستجوی نام کالا..."
              className="w-full bg-[#161D31] border border-slate-700 rounded-xl pr-9 pl-3 py-1.5 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-cyan-500"
            />
          </div>
        </div>

        {/* 20 Commodities Real-Time Price Matrix Table */}
        <div className="bg-[#0F1423]/95 backdrop-blur-xl border border-cyan-500/20 rounded-2xl p-5 overflow-hidden">
          <div className="flex items-center justify-between border-b border-slate-800 pb-3 mb-4">
            <div>
              <h3 className="font-bold text-sm text-white">جدول مقایسه‌ای نرخ مصوب، نرخ میادین شهرداری و بازار آزاد تهران</h3>
              <p className="text-[11px] text-slate-400">محاسبه برخط شکاف قیمتی (Spread) و روزهای پوشش ذخایر انبارها</p>
            </div>
            <span className="text-xs text-slate-400 font-mono">واحد ارقام: ریال</span>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-xs text-right select-none">
              <thead>
                <tr className="text-slate-400 border-b border-slate-800 text-[11px]">
                  <th className="py-2.5 px-3 font-semibold">ردیف</th>
                  <th className="py-2.5 px-3 font-semibold">عنوان کالا</th>
                  <th className="py-2.5 px-3 font-semibold">گروه</th>
                  <th className="py-2.5 px-3 font-semibold font-mono text-left">نرخ مصوب دولتی</th>
                  <th className="py-2.5 px-3 font-semibold font-mono text-left">نرخ میادین شهرداری</th>
                  <th className="py-2.5 px-3 font-semibold font-mono text-left">نرخ بازار آزاد سطح شهر</th>
                  <th className="py-2.5 px-3 font-semibold font-mono text-center">شکاف قیمتی (اسپرد)</th>
                  <th className="py-2.5 px-3 font-semibold font-mono text-center">ذخیره مطمئن</th>
                  <th className="py-2.5 px-3 font-semibold text-center">وضعیت</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800/60">
                {filteredGoods.map((item, idx) => (
                  <tr key={item.id} className="hover:bg-[#161D31]/80 transition-colors">
                    <td className="py-3 px-3 text-slate-500 font-mono text-xs">{toPersianDigits(idx + 1)}</td>
                    <td className="py-3 px-3 font-bold text-white">
                      <div>{item.name}</div>
                      <div className="text-[10px] text-slate-400 font-normal">{item.unit}</div>
                    </td>
                    <td className="py-3 px-3 text-slate-400">{item.category}</td>
                    <td className="py-3 px-3 font-mono text-left text-slate-200">
                      {formatPersianNumber(item.regulatedPrice)}
                    </td>
                    <td className="py-3 px-3 font-mono text-left text-cyan-300 font-bold">
                      {formatPersianNumber(item.mayadinPrice)}
                    </td>
                    <td className="py-3 px-3 font-mono text-left text-white font-bold">
                      {formatPersianNumber(item.openMarketPrice)}
                    </td>
                    <td className="py-3 px-3 text-center">
                      <span
                        className={`px-2 py-0.5 rounded font-mono font-bold text-[11px] ${
                          item.spreadPercent > 40
                            ? 'bg-rose-500/20 text-rose-300 border border-rose-500/30'
                            : item.spreadPercent > 20
                            ? 'bg-amber-500/20 text-amber-300 border border-amber-500/30'
                            : 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/30'
                        }`}
                      >
                        +{toPersianDigits(item.spreadPercent)}٪
                      </span>
                    </td>
                    <td className="py-3 px-3 text-center font-mono text-slate-300">
                      {toPersianDigits(item.stockDays)} روز
                    </td>
                    <td className="py-3 px-3 text-center">
                      <span
                        className={`px-2 py-0.5 rounded text-[10px] font-semibold ${
                          item.status === 'critical'
                            ? 'bg-rose-500/20 text-rose-300'
                            : item.status === 'warning'
                            ? 'bg-amber-500/20 text-amber-300'
                            : 'bg-emerald-500/20 text-emerald-300'
                        }`}
                      >
                        {item.status === 'critical' ? 'بحرانی' : item.status === 'warning' ? 'هشدار' : 'عادی'}
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
