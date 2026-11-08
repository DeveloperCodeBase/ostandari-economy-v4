'use client';

import React, { useState } from 'react';
import { InPageAgentPanel } from '@/src/components/ai/InPageAgentPanel';
import { DirectiveItem } from '@/src/types/economy';
import { toPersianDigits } from '@/src/utils/formatters';
import {
  FileText,
  Clock,
  CheckCircle2,
  AlertCircle,
  Sparkles,
  Send,
  Building,
  UserCheck,
  Plus,
} from 'lucide-react';

const INITIAL_DIRECTIVES: DirectiveItem[] = [
  {
    id: 'DIR-101',
    subject: 'تثبیت و نظارت بر سهمیه آرد نانوایی‌های شهرستان‌های بهارستان و قرچک',
    committee: 'ستاد تنظیم بازار',
    assignedAuthority: 'اداره کل غله و خدمات بازرگانی / فرمانداران بهارستان و قرچک',
    dueDate: '۲۵ آبان ۱۴۰۵',
    status: 'in_progress',
    progressPercent: 75,
    lastAction: 'نصب کارتخوان‌های نسخه جدید نانینو در ۴۱۰ واحد نانوایی متراکم',
  },
  {
    id: 'DIR-102',
    subject: 'تسریع در اتصال پست ۴۰۰ کیلوولت به شهرک صنعتی شمس‌آباد ری',
    committee: 'کارگروه تسهیل و رفع موانع تولید',
    assignedAuthority: 'شرکت برق منطقه‌ای تهران / شرکت شهرک‌های صنعتی',
    dueDate: '۳۰ آبان ۱۴۰۵',
    status: 'delayed',
    progressPercent: 40,
    lastAction: 'صدور اخطار تاخیر ۱۰ روزه به پیمانکار خط انتقال فیدر شرقی',
  },
  {
    id: 'DIR-103',
    subject: 'ترخیص فوری محموله‌های گوشت منجمد و کنجاله در گمرک شهریار',
    committee: 'ستاد تنظیم بازار',
    assignedAuthority: 'ناظر گمرکات استان تهران / اداره کل دامپزشکی',
    dueDate: '۲۰ آبان ۱۴۰۵',
    status: 'in_progress',
    progressPercent: 85,
    lastAction: 'ترخیص ۱۸ کانتینر کنجاله با اخذ ضمانت آزمایشگاهی ۷۲ساعته',
  },
  {
    id: 'DIR-104',
    subject: 'تخصیص ۲۰ همت سرمایه در گردش تبصره ۱۸ به قطعه‌سازان قدس و زاگرس',
    committee: 'شورای برنامه‌ریزی و توسعه',
    assignedAuthority: 'شورای هماهنگی بانک‌ها / اداره کل صمت تهران',
    dueDate: '۱۰ آبان ۱۴۰۵',
    status: 'completed',
    progressPercent: 100,
    lastAction: 'انعقاد قرارداد عاملیت با ۳ بانک عامل و واریز به ۲۲ واحد تولیدی',
  },
  {
    id: 'DIR-105',
    subject: 'مزایده واگذاری ۳ ملک مازاد دولتی در منطقه ۶ و ۱۲ تهران',
    committee: 'شورای برنامه‌ریزی و توسعه',
    assignedAuthority: 'اداره کل امور اقتصادی و دارایی استان تهران (طبرسا)',
    dueDate: '۵ آذر ۱۴۰۵',
    status: 'pending',
    progressPercent: 20,
    lastAction: 'اخذ تاییدیه ارزش کارشناسی کانون کارشناسان رسمی دادگستری',
  },
  {
    id: 'DIR-106',
    subject: 'ساماندهی تصفیه‌خانه مرکزی شهرک صنعتی چرمشهر ورامین',
    committee: 'کارگروه تسهیل و رفع موانع تولید',
    assignedAuthority: 'فرمانداری ویژه ورامین / اداره کل حفاظت محیط‌زیست',
    dueDate: '۱۵ آذر ۱۴۰۵',
    status: 'in_progress',
    progressPercent: 60,
    lastAction: 'بهره‌برداری آزمایشی از مرحله بیولوژیکی تصفیه پساب صنعتی',
  },
];

export default function DirectivesDeskPage() {
  const [directives, setDirectives] = useState<DirectiveItem[]>(INITIAL_DIRECTIVES);
  const [generatedLetter, setGeneratedLetter] = useState<string | null>(null);
  const [selectedDirective, setSelectedDirective] = useState<DirectiveItem | null>(null);

  const pendingList = directives.filter((d) => d.status === 'pending');
  const inProgressList = directives.filter((d) => d.status === 'in_progress');
  const delayedList = directives.filter((d) => d.status === 'delayed');
  const completedList = directives.filter((d) => d.status === 'completed');

  const handleGenerateFollowUp = (d: DirectiveItem) => {
    setSelectedDirective(d);
    const letter = `بسمه‌تعالی
استانداری تهران — دفتر معاونت هماهنگی امور اقتصادی
شماره نامه: الف-ت/۱۰۸۴۲
تاریخ: آبان ۱۴۰۵
طبقهبندی: آنی / محرمانه

به: ${d.assignedAuthority}
موضوع: اخطار پیگیری و تسریع در اجرای مصوبه «${d.subject}»

سلام علیکم؛
پیرو مصوبه شماره ${d.id} در «${d.committee}» و پایش لحظه‌ای سامانه مرکز فرماندهی اقتصاد استان تهران، به استحضار می‌رساند پیشرفت فیزیکی این مصوبه با موعد تحویل ${d.dueDate} در سطح ${toPersianDigits(d.progressPercent)}٪ ارزیابی گردیده است.

با توجه به تاکید مؤکد استاندار محترم تهران (جناب آقای معتمدیان) و این معاونت، مقتضی است حداکثر ظرف مدت ۴۸ ساعت نسبت به رفع موانع و ارائه گزارش اقدام نهایی اقدام فرمایید.

دکتر حشمت‌الله عسگری
معاون هماهنگی امور اقتصادی استانداری تهران`;

    setGeneratedLetter(letter);
  };

  return (
    <div className="space-y-6">
        {/* Header */}
        <div className="flex flex-wrap items-center justify-between gap-3 border-b border-slate-800 pb-3">
          <div>
            <div className="text-[11px] text-slate-400 flex items-center gap-1.5 font-medium mb-1">
              <span>سکوی تصمیم‌یار کلان</span>
              <span>/</span>
              <span className="text-cyan-400">کارتابل پیگیری مصوبات و دستورات اقتصادی</span>
            </div>
            <h1 className="text-xl md:text-2xl font-black text-white flex items-center gap-2">
              <FileText className="w-6 h-6 text-cyan-400" />
              <span>کارتابل مصوبات ستاد تنظیم بازار و تسهیل تولید استان تهران</span>
            </h1>
          </div>

          <div className="flex items-center gap-2 text-xs">
            <span className="bg-[#161D31] text-slate-300 px-3 py-1.5 rounded-xl border border-slate-700 font-mono">
              کل مصوبات: {toPersianDigits(directives.length)} مورد
            </span>
          </div>
        </div>

        {/* In-Page AI Executive Analyst (Chief Orchestrator AGT-01) */}
        <InPageAgentPanel
          agentCode="AGT-01"
          pageTitle="پیگیری مصوبات اقتصادی"
        />

        {/* 4 Summary Cards */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
          <div className="bg-[#0F1423] border border-amber-500/20 p-4 rounded-2xl">
            <div className="text-[11px] text-slate-400">در انتظار اقدام اولیه</div>
            <div className="text-2xl font-black text-amber-400 font-mono mt-1">
              {toPersianDigits(pendingList.length)} مصوبه
            </div>
          </div>

          <div className="bg-[#0F1423] border border-cyan-500/20 p-4 rounded-2xl">
            <div className="text-[11px] text-slate-400">در حال اجرا و پایش</div>
            <div className="text-2xl font-black text-cyan-400 font-mono mt-1">
              {toPersianDigits(inProgressList.length)} مصوبه
            </div>
          </div>

          <div className="bg-[#0F1423] border border-rose-500/20 p-4 rounded-2xl">
            <div className="text-[11px] text-slate-400">دارای تاخیر زمانی (اخطار)</div>
            <div className="text-2xl font-black text-rose-400 font-mono mt-1">
              {toPersianDigits(delayedList.length)} مصوبه
            </div>
          </div>

          <div className="bg-[#0F1423] border border-emerald-500/20 p-4 rounded-2xl">
            <div className="text-[11px] text-slate-400">تحقق‌یافته و مختومه</div>
            <div className="text-2xl font-black text-emerald-400 font-mono mt-1">
              {toPersianDigits(completedList.length)} مصوبه
            </div>
          </div>
        </div>

        {/* Kanban Board Columns */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {/* Column 1: Delayed */}
          <div className="bg-[#0F1423]/90 border border-rose-500/30 rounded-2xl p-4 flex flex-col space-y-3">
            <div className="flex items-center justify-between border-b border-rose-500/20 pb-2">
              <span className="font-bold text-xs text-rose-300 flex items-center gap-1.5">
                <AlertCircle className="w-3.5 h-3.5 text-rose-400" />
                دارای تاخیر زمانی ({toPersianDigits(delayedList.length)})
              </span>
            </div>
            <div className="space-y-2.5">
              {delayedList.map((d) => (
                <div key={d.id} className="bg-[#161D31] p-3 rounded-xl border border-rose-500/30 text-xs space-y-2">
                  <div className="flex items-center justify-between text-[10px] text-slate-400">
                    <span className="font-mono">{d.id}</span>
                    <span className="text-rose-400 font-bold">مهلت: {d.dueDate}</span>
                  </div>
                  <h4 className="font-bold text-white text-xs leading-snug">{d.subject}</h4>
                  <div className="text-[11px] text-slate-400">{d.assignedAuthority}</div>
                  <div className="pt-2 border-t border-slate-700/60 flex items-center justify-between">
                    <span className="text-[10px] font-mono text-slate-300">پیشرفت: {toPersianDigits(d.progressPercent)}٪</span>
                    <button
                      onClick={() => handleGenerateFollowUp(d)}
                      className="text-[10px] bg-rose-600/20 hover:bg-rose-600/40 text-rose-200 border border-rose-500/30 px-2 py-1 rounded transition-colors flex items-center gap-1"
                    >
                      <Sparkles className="w-3 h-3" />
                      <span>صدور اخطار هوشمند</span>
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Column 2: In Progress */}
          <div className="bg-[#0F1423]/90 border border-cyan-500/30 rounded-2xl p-4 flex flex-col space-y-3">
            <div className="flex items-center justify-between border-b border-cyan-500/20 pb-2">
              <span className="font-bold text-xs text-cyan-300 flex items-center gap-1.5">
                <Clock className="w-3.5 h-3.5 text-cyan-400" />
                در حال پیگیری و اجرا ({toPersianDigits(inProgressList.length)})
              </span>
            </div>
            <div className="space-y-2.5">
              {inProgressList.map((d) => (
                <div key={d.id} className="bg-[#161D31] p-3 rounded-xl border border-slate-700/60 text-xs space-y-2">
                  <div className="flex items-center justify-between text-[10px] text-slate-400">
                    <span className="font-mono">{d.id}</span>
                    <span className="text-cyan-400">مهلت: {d.dueDate}</span>
                  </div>
                  <h4 className="font-bold text-white text-xs leading-snug">{d.subject}</h4>
                  <div className="text-[11px] text-slate-400">{d.assignedAuthority}</div>
                  <div className="w-full bg-slate-800 h-1.5 rounded-full overflow-hidden">
                    <div className="bg-cyan-500 h-full rounded-full" style={{ width: `${d.progressPercent}%` }} />
                  </div>
                  <div className="pt-2 border-t border-slate-700/60 flex items-center justify-between">
                    <span className="text-[10px] font-mono text-slate-300">پیشرفت: {toPersianDigits(d.progressPercent)}٪</span>
                    <button
                      onClick={() => handleGenerateFollowUp(d)}
                      className="text-[10px] text-cyan-400 hover:underline flex items-center gap-1"
                    >
                      <span>متن پیگیری</span>
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Column 3: Pending */}
          <div className="bg-[#0F1423]/90 border border-slate-700/40 rounded-2xl p-4 flex flex-col space-y-3">
            <div className="flex items-center justify-between border-b border-slate-800 pb-2">
              <span className="font-bold text-xs text-slate-300">در انتظار اقدام اولیه ({toPersianDigits(pendingList.length)})</span>
            </div>
            <div className="space-y-2.5">
              {pendingList.map((d) => (
                <div key={d.id} className="bg-[#161D31] p-3 rounded-xl border border-slate-800 text-xs space-y-2">
                  <div className="flex items-center justify-between text-[10px] text-slate-400">
                    <span className="font-mono">{d.id}</span>
                    <span>مهلت: {d.dueDate}</span>
                  </div>
                  <h4 className="font-bold text-white text-xs leading-snug">{d.subject}</h4>
                  <div className="text-[11px] text-slate-400">{d.assignedAuthority}</div>
                </div>
              ))}
            </div>
          </div>

          {/* Column 4: Completed */}
          <div className="bg-[#0F1423]/90 border border-emerald-500/30 rounded-2xl p-4 flex flex-col space-y-3">
            <div className="flex items-center justify-between border-b border-emerald-500/20 pb-2">
              <span className="font-bold text-xs text-emerald-300 flex items-center gap-1.5">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
                تحقق‌یافته و انجام‌شده ({toPersianDigits(completedList.length)})
              </span>
            </div>
            <div className="space-y-2.5">
              {completedList.map((d) => (
                <div key={d.id} className="bg-[#161D31] p-3 rounded-xl border border-emerald-500/20 text-xs space-y-2 opacity-90">
                  <div className="flex items-center justify-between text-[10px] text-slate-400">
                    <span className="font-mono">{d.id}</span>
                    <span className="text-emerald-400 font-bold">تکمیل ۱۰۰٪</span>
                  </div>
                  <h4 className="font-bold text-white text-xs leading-snug line-through opacity-80">{d.subject}</h4>
                  <div className="text-[10px] text-emerald-300/80">{d.lastAction}</div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* AI Follow-up Letter Preview Drawer/Modal */}
        {generatedLetter && selectedDirective && (
          <div className="bg-[#0F1423] border border-cyan-500/40 rounded-2xl p-5 shadow-2xl space-y-3 text-xs">
            <div className="flex items-center justify-between border-b border-slate-800 pb-2">
              <div className="flex items-center gap-2">
                <Sparkles className="w-4 h-4 text-cyan-400" />
                <h3 className="font-bold text-white text-sm">پیش‌نویس نامه پیگیری رسمی صادرشده توسط هوش مصنوعی</h3>
              </div>
              <button
                onClick={() => setGeneratedLetter(null)}
                className="text-slate-400 hover:text-white text-xs"
              >
                بستن پیش‌نویس
              </button>
            </div>

            <div className="bg-[#070913] p-4 rounded-xl border border-slate-800 font-mono text-[11.5px] text-slate-200 whitespace-pre-line leading-relaxed selection:bg-cyan-600/40">
              {generatedLetter}
            </div>

            <div className="flex justify-end gap-2">
              <button
                onClick={() => {
                  navigator.clipboard.writeText(generatedLetter);
                }}
                className="px-4 py-2 rounded-xl bg-cyan-600 hover:bg-cyan-500 text-white font-semibold transition-colors flex items-center gap-1.5"
              >
                <Send className="w-3.5 h-3.5" />
                <span>کپی متن جهت ارسال در اتوماسیون اداری</span>
              </button>
            </div>
          </div>
        )}
      </div>
  );
}
