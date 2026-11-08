'use client';

import React, { useState } from 'react';
import {
  X,
  HelpCircle,
  BookOpen,
  Map,
  Sliders,
  Bot,
  Layers,
  ShieldAlert,
  Search,
  ExternalLink,
  ChevronLeft,
  CheckCircle2,
  Sparkles,
  Compass,
  FileText,
} from 'lucide-react';
import { useCommand } from '@/src/context/CommandContext';
import { SOVEREIGN_11_MODULES } from '@/src/components/layout/Sidebar';
import { TEHRAN_AI_AGENTS } from '@/src/data/tehranMasterData';

export function GlobalHelpGuideModal() {
  const { isHelpModalOpen, setIsHelpModalOpen, helpModalTopic } = useCommand();
  const [activeTab, setActiveTab] = useState<'overview' | 'modules' | 'agents' | 'scenarios' | 'maps'>('overview');

  if (!isHelpModalOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-5 md:p-8 bg-black/70 backdrop-blur-md animate-in fade-in duration-200">
      <div className="relative w-full max-w-4xl max-h-[90vh] glass-panel rounded-2xl border border-[var(--lg-border-strong)] shadow-2xl flex flex-col overflow-hidden text-right">
        {/* Modal Top Bar */}
        <div className="flex items-center justify-between p-4 md:p-5 border-b border-[var(--lg-border)] bg-black/10 dark:bg-black/30">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-cyan-600 to-sky-800 text-white flex items-center justify-center font-bold shadow-md shadow-cyan-950/50">
              <BookOpen className="w-5 h-5 text-cyan-200" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h2 className="text-base md:text-lg font-black text-[var(--lg-ink)]">
                  راهنمای جامع کاربری و متدولوژی مرکز فرماندهی اقتصاد تهران
                </h2>
                <span className="text-[10px] bg-cyan-500/15 text-cyan-300 px-2 py-0.5 rounded-full border border-cyan-500/30 font-bold">
                  نسخه ۳.۰
                </span>
              </div>
              <p className="text-xs text-[var(--lg-muted)]">
                مستندات راهبردی، نحوه کارکرد شبیه‌سازها، نقشه‌های ماهواره‌ای و ایجنت‌های هوشمند
              </p>
            </div>
          </div>

          <button
            onClick={() => setIsHelpModalOpen(false)}
            className="p-2 rounded-xl glass-button text-[var(--lg-muted)] hover:text-[var(--lg-ink)] transition-colors"
            aria-label="بستن پنجره راهنما"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Tab Navigation */}
        <div className="flex items-center gap-1.5 p-2.5 border-b border-[var(--lg-border)] bg-black/5 dark:bg-black/20 overflow-x-auto text-xs font-bold scrollbar-none">
          <button
            onClick={() => setActiveTab('overview')}
            className={`px-3 py-1.5 rounded-xl transition-all whitespace-nowrap flex items-center gap-1.5 ${
              activeTab === 'overview'
                ? 'bg-cyan-600 text-white shadow-md'
                : 'text-[var(--lg-muted)] hover:text-[var(--lg-ink)] hover:bg-white/5'
            }`}
          >
            <HelpCircle className="w-3.5 h-3.5" />
            <span>معرفی کلی و ساختار</span>
          </button>

          <button
            onClick={() => setActiveTab('scenarios')}
            className={`px-3 py-1.5 rounded-xl transition-all whitespace-nowrap flex items-center gap-1.5 ${
              activeTab === 'scenarios'
                ? 'bg-cyan-600 text-white shadow-md'
                : 'text-[var(--lg-muted)] hover:text-[var(--lg-ink)] hover:bg-white/5'
            }`}
          >
            <Sliders className="w-3.5 h-3.5" />
            <span>سناریوها و پیش‌بینی‌ها در هر بخش</span>
          </button>

          <button
            onClick={() => setActiveTab('maps')}
            className={`px-3 py-1.5 rounded-xl transition-all whitespace-nowrap flex items-center gap-1.5 ${
              activeTab === 'maps'
                ? 'bg-cyan-600 text-white shadow-md'
                : 'text-[var(--lg-muted)] hover:text-[var(--lg-ink)] hover:bg-white/5'
            }`}
          >
            <Compass className="w-3.5 h-3.5" />
            <span>نقشه‌های ماهواره‌ای گوگل ارث و ۳D</span>
          </button>

          <button
            onClick={() => setActiveTab('agents')}
            className={`px-3 py-1.5 rounded-xl transition-all whitespace-nowrap flex items-center gap-1.5 ${
              activeTab === 'agents'
                ? 'bg-cyan-600 text-white shadow-md'
                : 'text-[var(--lg-muted)] hover:text-[var(--lg-ink)] hover:bg-white/5'
            }`}
          >
            <Bot className="w-3.5 h-3.5" />
            <span>۱۰ ایجنت تخصصی و چت‌بات</span>
          </button>

          <button
            onClick={() => setActiveTab('modules')}
            className={`px-3 py-1.5 rounded-xl transition-all whitespace-nowrap flex items-center gap-1.5 ${
              activeTab === 'modules'
                ? 'bg-cyan-600 text-white shadow-md'
                : 'text-[var(--lg-muted)] hover:text-[var(--lg-ink)] hover:bg-white/5'
            }`}
          >
            <Layers className="w-3.5 h-3.5" />
            <span>۱۱ بخش کلان اقتصادی</span>
          </button>
        </div>

        {/* Content Area */}
        <div className="flex-1 overflow-y-auto p-5 md:p-6 space-y-6 text-xs text-[var(--lg-ink)] leading-relaxed">
          {activeTab === 'overview' && (
            <div className="space-y-4">
              <div className="p-4 rounded-xl bg-cyan-950/20 border border-cyan-500/30 space-y-2">
                <h3 className="text-sm font-black text-cyan-300">
                  ماموریت مرکز فرماندهی و تصمیم‌یار هوشمند اقتصادی استانداری تهران
                </h3>
                <p className="text-[var(--lg-secondary)]">
                  این سامانه به عنوان نخستین پلتفرم هوشمند حاکمیتی، با تجمیع تله‌متری ۱۶ شهرستان، ۲۲ شهرک صنعتی، ۹,۶۴۰ نانوایی، ۳۰۵ میدان تره‌بار، ۵ سد بزرگ و ۶ گمرک، امکان دیده‌بانی لحظه‌ای و شبیه‌سازی پیش‌بینانه آثار تصمیمات اقتصادی را برای استاندار محترم و مدیران ارشد استان فراهم آورده است.
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="p-3.5 rounded-xl border border-[var(--lg-border)] bg-white/5 space-y-2">
                  <h4 className="font-bold text-cyan-400 flex items-center gap-1.5">
                    <Sparkles className="w-4 h-4" />
                    تم حاکمیتی و خوانایی بی‌نقص در تم روشن و تاریک:
                  </h4>
                  <p className="text-[var(--lg-muted)] leading-relaxed">
                    تم تاریک بر پایه رنگ سرمه‌ای حاکمیتی و خطوط فیروزه‌ای طراحی شده است. تم روشن با پس‌زمینه‌های کریستالی شفاف و فونت مشکی با کنتراست ۱۰۰٪ مطابق استانداردهای WCAG AAA تنظیم گردیده تا در نمایشگرهای جلسات استانداری و زیر نور زیاد به آسانی خوانا باشد.
                  </p>
                </div>

                <div className="p-3.5 rounded-xl border border-[var(--lg-border)] bg-white/5 space-y-2">
                  <h4 className="font-bold text-cyan-400 flex items-center gap-1.5">
                    <Search className="w-4 h-4" />
                    کلیدهای میانبر سریع فرماندهی:
                  </h4>
                  <ul className="space-y-1.5 text-[var(--lg-muted)]">
                    <li className="flex items-center justify-between">
                      <span>جستجوی سریع هر شاخص یا شهرستان:</span>
                      <kbd className="px-1.5 py-0.5 rounded bg-black/30 font-mono text-cyan-300 border border-[var(--lg-border)]">Ctrl + K</kbd>
                    </li>
                    <li className="flex items-center justify-between">
                      <span>فراخوانی تصمیم‌یار هوش مصنوعی (AI Copilot):</span>
                      <kbd className="px-1.5 py-0.5 rounded bg-black/30 font-mono text-cyan-300 border border-[var(--lg-border)]">Ctrl + J</kbd>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'scenarios' && (
            <div className="space-y-4">
              <div className="p-3.5 rounded-xl bg-amber-950/20 border border-amber-500/30 text-amber-200">
                <h4 className="font-bold flex items-center gap-1.5 text-sm mb-1">
                  <Sliders className="w-4 h-4 text-amber-400" />
                  مستقل بودن سناریوها، متغیرها و پیش‌بینی‌ها در هر بخش:
                </h4>
                <p className="text-xs text-[var(--lg-ink)] opacity-90 leading-relaxed">
                  طبق دستور کار حاکمیتی، شبیه‌سازی آثار تصمیمات محدود به یک صفحه مشترک نیست. هر بخش از ۱۱ بخش کلان (خزانه‌داری، بانک‌ها، صنعت، آرد و نان، بازار، کشاورزی، گمرک، کار، انرژی، GIS و پیشخوان کلان) اهرم‌های کنترلی و الگوریتم‌های پیش‌بینی اختصاصی خود را در همان بخش داراست.
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-3.5">
                <div className="p-3 rounded-xl border border-[var(--lg-border)] bg-white/5 space-y-1.5">
                  <span className="font-bold text-cyan-300">۱. اهرم‌های What-If:</span>
                  <p className="text-[var(--lg-muted)] text-[11px]">
                    با حرکت دادن اسلایدرها، فرضیاتی چون افزایش نرخ بازرسی، تعدیل سهمیه آرد نانینو یا ساعات محدودیت برق را اعمال کنید.
                  </p>
                </div>

                <div className="p-3 rounded-xl border border-[var(--lg-border)] bg-white/5 space-y-1.5">
                  <span className="font-bold text-cyan-300">۲. پیش‌بینی ۳۰ روزه:</span>
                  <p className="text-[var(--lg-muted)] text-[11px]">
                    الگوریتم‌های ریاضی فوری آثار تغییرات را بر ذخایر، درآمدها و ریسک‌های فصلی استان محاسبه و با خط مبنا مقایسه می‌کنند.
                  </p>
                </div>

                <div className="p-3 rounded-xl border border-[var(--lg-border)] bg-white/5 space-y-1.5">
                  <span className="font-bold text-cyan-300">۳. هشدارهای زودهنگام (Early Warning):</span>
                  <p className="text-[var(--lg-muted)] text-[11px]">
                    در صورت عبور هر شاخص از مرز تاب‌آوری، هشدارهای سطح ۱ (بحرانی) و سطح ۲ ظاهر شده و راهکار اجرایی ارائه می‌دهند.
                  </p>
                </div>

                <div className="p-3 rounded-xl border border-[var(--lg-border)] bg-white/5 space-y-1.5">
                  <span className="font-bold text-cyan-300">۴. صدور دستور اجرایی استاندار:</span>
                  <p className="text-[var(--lg-muted)] text-[11px]">
                    با کلیک بر روی دکمه «صدور دستور»، پیش‌نویس مصوبه لازم‌الاجرا برای فرمانداران و مدیران کل ذی‌ربط ثبت می‌گردد.
                  </p>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'maps' && (
            <div className="space-y-4">
              <div className="p-3.5 rounded-xl bg-cyan-950/20 border border-cyan-500/30 text-cyan-200">
                <h4 className="font-bold flex items-center gap-1.5 text-sm mb-1">
                  <Compass className="w-4 h-4 text-cyan-400" />
                  نقشه‌های ماهواره‌ای با کیفیت بالا و زاویه دید سه‌بعدی (3D Orbit)
                </h4>
                <p className="text-xs text-[var(--lg-ink)] opacity-90 leading-relaxed">
                  لایه‌های نقشه‌ای سامانه با تلفیق تصاویر ماهواره‌ای با وضوح بالای Esri World Imagery و گوگل مپ، امکان زوم تا سطح جزئیات معابر، شهرک‌های صنعتی و سدها را در اختیار قرار می‌دهد.
                </p>
              </div>

              <div className="space-y-2.5">
                <div className="p-3 rounded-xl border border-[var(--lg-border)] bg-white/5 flex items-start gap-3">
                  <div className="w-7 h-7 rounded-lg bg-cyan-600/20 text-cyan-300 flex items-center justify-center font-bold shrink-0">
                    ۱
                  </div>
                  <div>
                    <strong className="text-[var(--lg-ink)]">نمای ۳ بعدی زاویه‌دار (3D Tilt):</strong>
                    <p className="text-[var(--lg-muted)] mt-0.5">
                      با فشردن دکمه «نمای سه‌بعدی ماهواره‌ای»، زاویه دید به حالت پرسپکتیو ۳۴ درجه شیب‌دار تغییر می‌یابد تا رشته کوه البرز و عوارض دشت تهران به صورت ژئواکونومیک نمایان گردند.
                    </p>
                  </div>
                </div>

                <div className="p-3 rounded-xl border border-[var(--lg-border)] bg-white/5 flex items-start gap-3">
                  <div className="w-7 h-7 rounded-lg bg-cyan-600/20 text-cyan-300 flex items-center justify-center font-bold shrink-0">
                    ۲
                  </div>
                  <div>
                    <strong className="text-[var(--lg-ink)]">پرواز سریع روی ۱۶ شهرستان:</strong>
                    <p className="text-[var(--lg-muted)] mt-0.5">
                      از نوار پرواز سریع پایین نقشه یا با کلیک بر روی هر شهرستان، دوربین بلافاصله روی آن منطقه فوکوس کرده و اطلاعات جمعیتی، صنعتی و آرد آن بارگذاری می‌شود.
                    </p>
                  </div>
                </div>

                <div className="p-3 rounded-xl border border-[var(--lg-border)] bg-white/5 flex items-start gap-3">
                  <div className="w-7 h-7 rounded-lg bg-cyan-600/20 text-cyan-300 flex items-center justify-center font-bold shrink-0">
                    ۳
                  </div>
                  <div>
                    <strong className="text-[var(--lg-ink)]">روشن و خاموش کردن لایه‌های اطلاعاتی:</strong>
                    <p className="text-[var(--lg-muted)] mt-0.5">
                      امکان فیلتر جداگانه لایه‌های ۲۲ شهرک صنعتی، ۵ سد آب، ۶ گمرک و سیلوهای گندم روی نقشه به صورت زنده وجود دارد.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'agents' && (
            <div className="space-y-4">
              <div className="p-3.5 rounded-xl bg-cyan-950/20 border border-cyan-500/30 text-cyan-200">
                <h4 className="font-bold flex items-center gap-1.5 text-sm mb-1">
                  <Bot className="w-4 h-4 text-cyan-400" />
                  ۱۰ ایجنت تخصصی با حوزه فعالیت مجزا و بدون تداخل
                </h4>
                <p className="text-xs text-[var(--lg-ink)] opacity-90 leading-relaxed">
                  هر بخش از داشبورد به یک ایجنت هوش مصنوعی با تخصص عمیق مجهز است. با اتصال کلید Gemini، این ایجنت‌ها با سرور متصل شده و با استناد به منابع وب و پایگاه داده‌های استانداری، پاسخ‌های دقیق و رسمی ارائه می‌کنند.
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                {TEHRAN_AI_AGENTS.map((agent) => (
                  <div key={agent.code} className="p-3 rounded-xl border border-[var(--lg-border)] bg-white/5 space-y-1">
                    <div className="flex items-center justify-between">
                      <span className="font-bold text-cyan-300">{agent.nameFa}</span>
                      <span className="text-[10px] font-mono px-1.5 py-0.2 rounded bg-cyan-950/60 border border-cyan-500/30 text-cyan-300">
                        {agent.code}
                      </span>
                    </div>
                    <div className="text-[11px] text-[var(--lg-secondary)]">{agent.titleFa || agent.roleDescription}</div>
                    <div className="text-[10px] text-[var(--lg-muted)]">
                      ماژول‌های ناظر: {agent.supervisedModules.slice(0, 2).join('، ')}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {activeTab === 'modules' && (
            <div className="space-y-3">
              <div className="text-xs text-[var(--lg-muted)] mb-2">
                فهرست ۱۱ بخش کلان اقتصادی استانداری تهران با دسترسی مستقیم:
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-2.5">
                {SOVEREIGN_11_MODULES.map((mod) => {
                  const Icon = mod.icon;
                  return (
                    <div key={mod.id} className="p-3 rounded-xl border border-[var(--lg-border)] bg-white/5 flex items-center justify-between">
                      <div className="flex items-center gap-2.5">
                        <div className="w-7 h-7 rounded-lg bg-cyan-600/20 text-cyan-300 flex items-center justify-center font-bold">
                          <Icon className="w-3.5 h-3.5" />
                        </div>
                        <div>
                          <div className="font-bold text-xs text-[var(--lg-ink)]">{mod.number}. {mod.titleFa}</div>
                          <div className="text-[10px] text-[var(--lg-muted)]">ایجنت: {mod.agentBadge}</div>
                        </div>
                      </div>
                      <span className="text-[10px] font-mono text-cyan-300 px-2 py-0.5 rounded bg-black/20 border border-[var(--lg-border)]">
                        {mod.alertBadge}
                      </span>
                    </div>
                  );
                })}
              </div>
            </div>
          )}
        </div>

        {/* Modal Footer with Company Attribution */}
        <div className="p-3.5 border-t border-[var(--lg-border)] bg-black/10 dark:bg-black/30 flex flex-col sm:flex-row items-center justify-between gap-2 text-xs text-[var(--lg-muted)]">
          <div className="text-[11px]">
            طراحی و پیاده‌سازی سامانه: <strong className="text-cyan-400">شرکت شبکه هوشمند ابتکار ویستا</strong>
          </div>
          <button
            onClick={() => setIsHelpModalOpen(false)}
            className="px-4 py-1.5 rounded-xl bg-cyan-600 hover:bg-cyan-500 text-white font-bold transition-colors text-xs"
          >
            متوجه شدم
          </button>
        </div>
      </div>
    </div>
  );
}

export default GlobalHelpGuideModal;
