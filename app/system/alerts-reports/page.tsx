'use client';

import React, { useState } from 'react';
import { motion } from 'motion/react';
import {
  Bell,
  AlertTriangle,
  ShieldAlert,
  FileText,
  Printer,
  Download,
  Filter,
  CheckCircle,
  Eye,
  Building2,
  Calendar,
  Layers,
  MapPin,
  Sparkles,
  FileSpreadsheet
} from 'lucide-react';
import Link from 'next/link';
import { useCommand } from '@/src/context/CommandContext';
import { TEHRAN_COUNTIES, TEHRAN_PROVINCE_BASELINE } from '@/src/data/tehranMasterData';
import { toPersianDigits, formatPersianNumber } from '@/src/utils/formatters';
import InPageAgentPanel from '@/src/components/ai/InPageAgentPanel';

interface ReportTemplate {
  id: string;
  title: string;
  classification: 'محرمانه' | 'خیلی محرمانه' | 'عادی';
  targetAudience: string;
  summary: string;
}

const REPORT_TEMPLATES: ReportTemplate[] = [
  {
    id: 'morning-intel',
    title: 'بولتن صبحگاهی فرماندهی اقتصادی استاندار (Daily Executive Brief)',
    classification: 'خیلی محرمانه',
    targetAudience: 'محمدصادق معتمدیان (استاندار تهران)',
    summary: 'خلاصه آخرین وضعیت قیمت ۲۰ قلم کالای اساسی، تراز نانینو، مصرف دیماند شهرک‌های صنعتی و پیش‌بینی تقاضای ۷۲ ساعت آینده استان تهران.'
  },
  {
    id: 'facilitation-council',
    title: 'صورتجلسه و مصوبات کارگروه تسهیل و رفع موانع تولید استان',
    classification: 'محرمانه',
    targetAudience: 'معاونت هماهنگی امور اقتصادی و مدیران کل صمت و جهاد',
    summary: 'رسیدگی به وضعیت ۲۴ واحد صنعتی بحرانی در شهرک‌های شمس‌آباد و عباس‌آباد و امهال بدهی‌های مالیاتی و تامین اجتماعی.'
  },
  {
    id: 'counties-ranking',
    title: 'کارنامه فصلی و ارزیابی عملکرد اقتصادی ۱۶ فرمانداری',
    classification: 'محرمانه',
    targetAudience: 'فرمانداران ۱۶ شهرستان استان تهران',
    summary: 'رتبه‌بندی عملکرد در اشتغال‌زایی سامانه رصد، احیای واحدهای راکد، تنظیم بازار محلی و رضایتمندی توزیع آرد و نان.'
  },
  {
    id: 'strategic-reserves',
    title: 'گزارش موازنه ذخایر استراتژیک و جریان لجستیک کالاهای اساسی',
    classification: 'خیلی محرمانه',
    targetAudience: 'مدیرکل غله و پشتیبانی امور دام استان تهران',
    summary: 'روزهای پوشش ذخیره گندم، روغن خام، شکر، مرغ و گوشت منجمد در سیلوهای ری، تهرانسر و شهریار.'
  }
];

export default function AlertsAndReportsPage() {
  const { alerts, currentCounty, setAlerts, openCopilot } = useCommand();
  const [activeTab, setActiveTab] = useState<'alerts' | 'report-builder'>('alerts');
  const [filterLevel, setFilterLevel] = useState<number | 'all'>('all');
  const [filterCategory, setFilterCategory] = useState<string>('all');
  const [selectedTemplate, setSelectedTemplate] = useState<ReportTemplate>(REPORT_TEMPLATES[0]);
  const [isPrinting, setIsPrinting] = useState<boolean>(false);

  // Filter alerts
  const filteredAlerts = alerts.filter((alert) => {
    if (filterLevel !== 'all' && alert.level !== filterLevel) return false;
    if (filterCategory !== 'all' && alert.category !== filterCategory) return false;
    if (currentCounty !== 'all' && alert.countyId !== currentCounty && alert.countyId !== 'all') return false;
    return true;
  });

  const handleResolveAlert = (id: string) => {
    setAlerts((prev) =>
      prev.map((a) => (a.id === id ? { ...a, status: 'resolved' as const } : a))
    );
  };

  const handlePrint = () => {
    setIsPrinting(true);
    setTimeout(() => {
      window.print();
      setIsPrinting(false);
    }, 300);
  };

  return (
    <div className="space-y-6">
      {/* Executive Agent Panel */}
      <InPageAgentPanel
        analyst={{
          id: 'AGT-10',
          name: 'سنتزکننده ارشد تصمیم و هماهنگ‌ساز عاملی',
          role: 'رصدخانه هشدارهای راهبردی و تهیه مکاتبات حاکمیتی',
          analysis: `سامانه پایش هوشمند تاکنون ${toPersianDigits(alerts.length)} فقره رویداد فعال ثبت نموده است. بیشترین حساسیت مربوط به انحراف توزیع مرغ در میدان بهمن و افت فشار آب در مزارع گلخانه‌ای پیشوا است.`,
          recommendation: 'گزارش بولتن صبحگاهی استاندار به‌صورت خودکار هر روز ساعت ۰۶:۳۰ بر اساس شاخص‌های قطعی ۲۴ ساعت گذشته تدوین می‌گردد.',
          status: 'ready'
        }}
        kpiIds={['kpi-inflation', 'kpi-reserve', 'kpi-industry']}
      />

      {/* Header & Tabs */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 p-5 rounded-2xl border border-slate-800 bg-[#0F1423]/90 shadow-xl">
        <div className="flex items-center gap-3">
          <div className="p-2.5 rounded-xl bg-cyan-500/10 border border-cyan-500/30 text-cyan-400">
            <Bell className="w-6 h-6 animate-pulse" />
          </div>
          <div>
            <h1 className="text-xl font-bold text-white">مرکز هشدارها و تولید گزارش‌های حاکمیتی</h1>
            <p className="text-xs text-slate-400">
              مدیریت آلارم‌های اقتصادی ۳ سطحی استان تهران و صدور اسناد رسمی با سربرگ استانداری
            </p>
          </div>
        </div>

        <div className="flex flex-wrap items-center gap-2 glass-panel p-1.5 rounded-xl border border-[var(--lg-border-strong)]">
          <button
            onClick={() => setActiveTab('alerts')}
            className={`flex items-center gap-2 px-3.5 py-1.5 rounded-lg text-xs font-bold transition-all ${
              activeTab === 'alerts'
                ? 'bg-cyan-600 text-white shadow-md'
                : 'text-[var(--lg-muted)] hover:text-[var(--lg-ink)]'
            }`}
          >
            <ShieldAlert className="w-4 h-4" />
            <span>میز هشدارهای فعال ({toPersianDigits(alerts.filter(a => a.status === 'active').length)})</span>
          </button>
          <button
            onClick={() => setActiveTab('report-builder')}
            className={`flex items-center gap-2 px-3.5 py-1.5 rounded-lg text-xs font-bold transition-all ${
              activeTab === 'report-builder'
                ? 'bg-cyan-600 text-white shadow-md'
                : 'text-[var(--lg-muted)] hover:text-[var(--lg-ink)]'
            }`}
          >
            <FileText className="w-4 h-4" />
            <span>بولتن‌های صبحگاهی استاندار</span>
          </button>
          <Link
            href="/dashboard/monthly-reports"
            className="flex items-center gap-2 px-3.5 py-1.5 rounded-lg text-xs font-bold transition-all bg-cyan-600/10 text-cyan-600 dark:text-cyan-400 hover:bg-cyan-600 hover:text-white border border-cyan-500/30"
          >
            <FileSpreadsheet className="w-4 h-4" />
            <span>گزارش جامع ماهانه فرمانداران (۱۶ شهرستان)</span>
          </Link>
        </div>
      </div>

      {activeTab === 'alerts' ? (
        /* Alerts Feed View */
        <div className="space-y-4">
          {/* Filter Bar */}
          <div className="flex flex-wrap items-center justify-between gap-3 p-4 rounded-xl border border-slate-800 bg-[#0A0E1A]">
            <div className="flex items-center gap-2 text-xs">
              <span className="text-slate-400 font-medium">سطح هشدار:</span>
              <button
                onClick={() => setFilterLevel('all')}
                className={`px-2.5 py-1 rounded-md text-xs transition-all ${
                  filterLevel === 'all' ? 'bg-slate-800 text-cyan-300 font-bold' : 'text-slate-400'
                }`}
              >
                همه سطوح
              </button>
              <button
                onClick={() => setFilterLevel(3)}
                className={`px-2.5 py-1 rounded-md text-xs font-bold transition-all ${
                  filterLevel === 3 ? 'bg-rose-950/80 text-rose-300 border border-rose-800' : 'text-rose-400 hover:bg-rose-950/30'
                }`}
              >
                سطح ۳ (قرمز - بحرانی)
              </button>
              <button
                onClick={() => setFilterLevel(2)}
                className={`px-2.5 py-1 rounded-md text-xs font-bold transition-all ${
                  filterLevel === 2 ? 'bg-amber-950/80 text-amber-300 border border-amber-800' : 'text-amber-400 hover:bg-amber-950/30'
                }`}
              >
                سطح ۲ (نارنجی - هشدار)
              </button>
              <button
                onClick={() => setFilterLevel(1)}
                className={`px-2.5 py-1 rounded-md text-xs font-bold transition-all ${
                  filterLevel === 1 ? 'bg-yellow-950/80 text-yellow-300 border border-yellow-800' : 'text-yellow-400 hover:bg-yellow-950/30'
                }`}
              >
                سطح ۱ (زرد - پایش)
              </button>
            </div>

            <div className="flex items-center gap-2 text-xs">
              <span className="text-slate-400 font-medium">حوزه تخصصی:</span>
              <select
                value={filterCategory}
                onChange={(e) => setFilterCategory(e.target.value)}
                className="bg-slate-900 border border-slate-700 rounded-lg px-2.5 py-1 text-slate-300 text-xs focus:outline-none"
              >
                <option value="all">تمام حوزه‌ها</option>
                <option value="نان و آرد">نان و آرد</option>
                <option value="کالاهای اساسی">کالاهای اساسی</option>
                <option value="صنعت و انرژی">صنعت و انرژی</option>
                <option value="بودجه و مالی">بودجه و مالی</option>
                <option value="اشتغال">اشتغال</option>
              </select>
            </div>
          </div>

          {/* Alerts List */}
          <div className="space-y-3">
            {filteredAlerts.length === 0 ? (
              <div className="text-center py-12 border border-slate-800 rounded-2xl bg-[#0F1423]/50 text-slate-400 text-xs">
                هیچ هشداری با فیلترهای انتخابی یافت نشد. وضعیت در محدوده امن ارزیابی می‌شود.
              </div>
            ) : (
              filteredAlerts.map((alert) => (
                <div
                  key={alert.id}
                  className={`p-4 rounded-xl border transition-all ${
                    alert.status === 'resolved'
                      ? 'border-slate-800 bg-slate-950/40 opacity-60'
                      : alert.level === 3
                      ? 'border-rose-500/40 bg-[#160B12]/80 hover:border-rose-500/60 shadow-lg shadow-rose-950/30'
                      : alert.level === 2
                      ? 'border-amber-500/40 bg-[#17110C]/80 hover:border-amber-500/60 shadow-lg shadow-amber-950/30'
                      : 'border-yellow-500/30 bg-[#17140B]/80 hover:border-yellow-500/50'
                  }`}
                >
                  <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-3">
                    <div className="flex items-start gap-3">
                      <div
                        className={`p-2 rounded-lg mt-0.5 ${
                          alert.level === 3
                            ? 'bg-rose-500/20 text-rose-400'
                            : alert.level === 2
                            ? 'bg-amber-500/20 text-amber-400'
                            : 'bg-yellow-500/20 text-yellow-400'
                        }`}
                      >
                        <AlertTriangle className="w-4 h-4" />
                      </div>
                      <div>
                        <div className="flex items-center gap-2">
                          <h3 className="text-xs font-bold text-white">{alert.title}</h3>
                          <span
                            className={`text-[10px] font-mono px-2 py-0.2 rounded-full ${
                              alert.level === 3
                                ? 'bg-rose-500/20 text-rose-300'
                                : alert.level === 2
                                ? 'bg-amber-500/20 text-amber-300'
                                : 'bg-yellow-500/20 text-yellow-300'
                            }`}
                          >
                            سطح {toPersianDigits(alert.level)}
                          </span>
                          <span className="text-[10px] text-slate-400 bg-slate-900 px-2 py-0.2 rounded border border-slate-800">
                            {alert.category}
                          </span>
                          <span className="text-[10px] text-cyan-400 font-mono">
                            {alert.timestamp}
                          </span>
                        </div>
                        <p className="text-xs text-slate-300 mt-1.5 leading-relaxed">
                          {alert.description}
                        </p>
                      </div>
                    </div>

                    <div className="flex items-center gap-2 self-end md:self-center shrink-0">
                      {alert.status === 'active' ? (
                        <>
                          <button
                            onClick={() => openCopilot('AGT-10')}
                            className="px-3 py-1.5 rounded-lg border border-cyan-500/40 bg-cyan-950/30 text-cyan-300 hover:bg-cyan-900/40 text-xs font-medium transition-all"
                          >
                            اقدام فوری عاملی
                          </button>
                          <button
                            onClick={() => handleResolveAlert(alert.id)}
                            className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-emerald-500/40 bg-emerald-950/30 text-emerald-300 hover:bg-emerald-900/40 text-xs font-medium transition-all"
                          >
                            <CheckCircle className="w-3.5 h-3.5" />
                            <span>ثبت اقدام / مختومه</span>
                          </button>
                        </>
                      ) : (
                        <span className="text-xs text-emerald-400 font-bold bg-emerald-950/40 px-3 py-1 rounded-lg border border-emerald-800/40">
                          رسیدگی و مختومه شد
                        </span>
                      )}
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      ) : (
        /* Official Report Builder */
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          {/* Templates Selector (4 cols) */}
          <div className="lg:col-span-4 space-y-3">
            <span className="text-xs font-bold text-white block">قالب‌های سند رسمی استانداری</span>
            {REPORT_TEMPLATES.map((tmpl) => (
              <div
                key={tmpl.id}
                onClick={() => setSelectedTemplate(tmpl)}
                className={`p-4 rounded-xl border cursor-pointer transition-all ${
                  selectedTemplate.id === tmpl.id
                    ? 'border-cyan-400 bg-cyan-950/20 shadow-lg shadow-cyan-950/40'
                    : 'border-slate-800 bg-[#0F1423]/90 hover:border-slate-700'
                }`}
              >
                <div className="flex items-center justify-between mb-1.5">
                  <span className="text-xs font-bold text-white">{tmpl.title}</span>
                  <span
                    className={`text-[10px] font-mono px-2 py-0.5 rounded ${
                      tmpl.classification === 'خیلی محرمانه'
                        ? 'bg-rose-500/20 text-rose-300'
                        : 'bg-amber-500/20 text-amber-300'
                    }`}
                  >
                    {tmpl.classification}
                  </span>
                </div>
                <div className="text-[11px] text-cyan-400 mb-1.5">مخاطب: {tmpl.targetAudience}</div>
                <p className="text-[11px] text-slate-400 leading-relaxed">{tmpl.summary}</p>
              </div>
            ))}
          </div>

          {/* Letterhead & Printable Document (8 cols) */}
          <div className="lg:col-span-8 space-y-4">
            <div className="flex justify-end gap-2">
              <button
                onClick={handlePrint}
                className="flex items-center gap-1.5 px-4 py-2 rounded-xl bg-cyan-500 hover:bg-cyan-400 text-slate-950 text-xs font-bold shadow-lg transition-all"
              >
                <Printer className="w-4 h-4" />
                <span>چاپ سربرگ رسمی / دریافت PDF</span>
              </button>
            </div>

            {/* Official Tehran Governorate Paper */}
            <div className="rounded-2xl border-2 border-slate-700 bg-[#FAF9F5] text-slate-900 p-8 shadow-2xl space-y-6 min-h-[600px] font-serif">
              {/* Official Header */}
              <div className="flex justify-between items-start border-b-2 border-slate-800 pb-4">
                <div className="text-right space-y-0.5 text-xs text-slate-700">
                  <div className="font-bold text-slate-950">جمهوری اسلامی ایران</div>
                  <div>وزارت کشور</div>
                  <div className="font-black text-slate-950 text-sm">استانداری تهران</div>
                  <div>مرکز فرماندهی و تصمیم‌یار هوشمند اقتصادی</div>
                </div>

                <div className="text-center">
                  <div className="w-12 h-12 mx-auto rounded-full border border-slate-400 flex items-center justify-center font-bold text-xs text-slate-800 mb-1">
                    نشانه
                  </div>
                  <div className="text-[11px] text-slate-600 font-bold">«بسمه‌تعالی»</div>
                </div>

                <div className="text-left space-y-1 text-xs text-slate-700 font-mono">
                  <div>تاریخ: ۱۴۰۳/۰۸/۲۲</div>
                  <div>شماره: ۱۴۰۳/۹۸۲/ا.ت</div>
                  <div>پیوست: دارد (نمودارهای تحلیلی)</div>
                  <div className="text-rose-700 font-black">طبقه‌بندی: {selectedTemplate.classification}</div>
                </div>
              </div>

              {/* Title */}
              <div className="text-center py-2">
                <h2 className="text-base font-black text-slate-950 tracking-wide">
                  {selectedTemplate.title}
                </h2>
                <div className="text-xs text-slate-600 mt-1">
                  مخاطب: جناب آقای {selectedTemplate.targetAudience}
                </div>
              </div>

              {/* Body Content */}
              <div className="text-xs text-slate-800 leading-loose space-y-3 font-sans">
                <p>
                  احتراماً، پیرو رصد برخط متغیرهای اقتصادی استان تهران از طریق درگاه فرمانِ اقتصاد، خلاصه مهم‌ترین شاخص‌ها و احکام پیشنهادی به شرح ذیل ایفاد می‌گردد:
                </p>

                <div className="p-3 bg-slate-100 rounded-lg border border-slate-300 font-mono text-[11px] space-y-1">
                  <div>۱. سهم تولید ناخالص داخلی استان تهران از کشور: <strong>{toPersianDigits(TEHRAN_PROVINCE_BASELINE.gdpNationalSharePercent)}٪</strong></div>
                  <div>۲. درآمدهای مالیاتی ۵ ماهه محقق‌شده: <strong>{toPersianDigits(TEHRAN_PROVINCE_BASELINE.publicRevenue5Months1405Hemmat)} همت</strong> (رشد ۷۷٪ نسبت به دوره مشابه)</div>
                  <div>۳. ذخایر کالاهای اساسی و استراتژیک استان: <strong>{toPersianDigits(TEHRAN_PROVINCE_BASELINE.strategicWheatReserveDays)} روز</strong> پوشش پایدار</div>
                  <div>۴. نرخ بیکاری فصلی استان: <strong>{toPersianDigits(TEHRAN_PROVINCE_BASELINE.unemploymentRatePercent)}٪</strong></div>
                </div>

                <p>
                  <strong>مصوبات و تدابیر اجرایی پیشنهادی شورا:</strong>
                  <br />
                  الف) تثبیت عرضه مرغ گرم به میزان روزانه ۶۸۰ تن در میادین میوه و تره‌بار با نرخ مصوب ۷۸ هزار تومان.
                  <br />
                  ب) اولویت‌بخشی به ترخیص ماشین‌آلات خطوط دانش‌بنیان در گمرکات فرودگاه امام خمینی (ره) و شهریار با پنجره واحد گمرکی زیر ۲۴ ساعت.
                  <br />
                  ج) ارزیابی عملکرد هفتگی ۱۶ فرمانداری استان بر اساس شاخص رفع موانع کارگاه‌های تولیدی زیر ۱۰۰ نفر.
                </p>
              </div>

              {/* Signature Block */}
              <div className="pt-8 flex justify-between items-end text-xs text-slate-800">
                <div>
                  <div className="text-[10px] text-slate-500 font-mono">شناسه اصالت سند: TEH-ECON-2024-X992</div>
                  <div className="text-[10px] text-slate-500 font-mono">امضای دیجیتال معتبر در شبکه دولت</div>
                </div>
                <div className="text-center space-y-1">
                  <div className="font-bold">دکتر حشمت‌الله عسگری</div>
                  <div className="text-[11px] text-slate-600">معاون هماهنگی امور اقتصادی استانداری تهران</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
