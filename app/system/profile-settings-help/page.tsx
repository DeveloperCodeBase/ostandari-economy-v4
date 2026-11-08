'use client';

import React, { useState } from 'react';
import { motion } from 'motion/react';
import {
  UserCheck,
  Settings,
  HelpCircle,
  Shield,
  Sliders,
  Database,
  Monitor,
  HardDrive,
  Activity,
  Key,
  BookOpen,
  Search,
  CheckCircle,
  Save,
  RotateCcw,
  Sparkles,
  Info
} from 'lucide-react';
import { useCommand } from '@/src/context/CommandContext';
import { OFFICIAL_ROLES } from '@/src/data/rolesAndOfficials';
import { TEHRAN_EXECUTIVE_KPIS } from '@/src/data/tehranMasterData';
import { toPersianDigits } from '@/src/utils/formatters';
import InPageAgentPanel from '@/src/components/ai/InPageAgentPanel';

type SettingsTab = 'ai-config' | 'thresholds' | 'sync' | 'video-wall' | 'cache' | 'audit';

export default function ProfileSettingsHelpPage() {
  const {
    activeRole,
    setActiveRole,
    videoWallMode,
    setVideoWallMode,
    isOnline,
    openCopilot,
    openProvenance
  } = useCommand();

  const [mainTab, setMainTab] = useState<'profile' | 'settings' | 'help'>('profile');
  const [settingsTab, setSettingsTab] = useState<SettingsTab>('ai-config');

  // AI Config state
  const [geminiModel, setGeminiModel] = useState<string>('gemini-3.8-flash');
  const [searchGrounding, setSearchGrounding] = useState<boolean>(true);
  const [temperature, setTemperature] = useState<number>(0.3);

  // Thresholds state
  const [breadQueueThreshold, setBreadQueueThreshold] = useState<number>(30); // minutes
  const [priceVarianceThreshold, setPriceVarianceThreshold] = useState<number>(20); // percent
  const [minReserveDays, setMinReserveDays] = useState<number>(30); // days

  // Help search
  const [kpiSearch, setKpiSearch] = useState<string>('');
  const [saveToast, setSaveToast] = useState<boolean>(false);

  const handleSaveSettings = () => {
    setSaveToast(true);
    setTimeout(() => setSaveToast(false), 2500);
  };

  const filteredKpis = TEHRAN_EXECUTIVE_KPIS.filter(
    (k) =>
      k.title.toLowerCase().includes(kpiSearch.toLowerCase()) ||
      (k.agentInsight || '').toLowerCase().includes(kpiSearch.toLowerCase())
  );

  return (
    <div className="space-y-6">
      {/* Executive Agent Panel */}
      <InPageAgentPanel
        analyst={{
          id: 'AGT-10',
          name: 'سنتزکننده ارشد تصمیم و هماهنگ‌ساز عاملی',
          role: 'معماری سامانه‌های یکپارچه استانداری تهران',
          analysis: `پیکربندی امنیتی سیستم منطبق بر الزامات شبکه دولت و پدافند غیرعامل است. در حال حاضر هویت جاری «${activeRole.title} - ${activeRole.officialName}» با ضریب دسترسی سطح الف فعال می‌باشد.`,
          recommendation: 'آستانه‌های هشدار تنظیم بازار جهت فصل زمستان روی بازه حساسیت ۲۰٪ کالیبره گردد.',
          status: 'ready'
        }}
        kpiIds={['kpi-fiscal-rev', 'kpi-industry', 'kpi-reserve']}
      />

      {/* Main Tab Nav */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 p-5 rounded-2xl border border-slate-800 bg-[#0F1423]/90 shadow-xl">
        <div className="flex items-center gap-3">
          <div className="p-2.5 rounded-xl bg-cyan-500/10 border border-cyan-500/30 text-cyan-400">
            <Settings className="w-6 h-6 animate-spin-slow" />
          </div>
          <div>
            <h1 className="text-xl font-bold text-white">تنظیمات، هویت کاربری و راهنمای سیستم</h1>
            <p className="text-xs text-slate-400">
              مدیریت دسترسی ۳۲ مقام رسمی، پارامترهای عامل هوشمند و دانشنامه شاخص‌های اقتصادی
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2 bg-slate-900 p-1.5 rounded-xl border border-slate-800">
          <button
            onClick={() => setMainTab('profile')}
            className={`flex items-center gap-1.5 px-4 py-2 rounded-lg text-xs font-bold transition-all ${
              mainTab === 'profile'
                ? 'bg-cyan-500 text-slate-950 shadow-md'
                : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            <UserCheck className="w-4 h-4" />
            <span>پروفایل کاربری</span>
          </button>
          <button
            onClick={() => setMainTab('settings')}
            className={`flex items-center gap-1.5 px-4 py-2 rounded-lg text-xs font-bold transition-all ${
              mainTab === 'settings'
                ? 'bg-cyan-500 text-slate-950 shadow-md'
                : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            <Sliders className="w-4 h-4" />
            <span>پیکربندی سامانه</span>
          </button>
          <button
            onClick={() => setMainTab('help')}
            className={`flex items-center gap-1.5 px-4 py-2 rounded-lg text-xs font-bold transition-all ${
              mainTab === 'help'
                ? 'bg-cyan-500 text-slate-950 shadow-md'
                : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            <HelpCircle className="w-4 h-4" />
            <span>دانشنامه و راهنما</span>
          </button>
        </div>
      </div>

      {/* Main Content Area */}
      {mainTab === 'profile' && (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          {/* Identity Card (5 cols) */}
          <div className="lg:col-span-5 space-y-4">
            <div className="rounded-2xl border border-cyan-500/30 bg-[#0F1423]/95 p-6 shadow-xl relative overflow-hidden">
              <div className="flex items-center gap-4 mb-4">
                <div className="w-16 h-16 rounded-2xl bg-gradient-to-tr from-cyan-600 to-blue-600 flex items-center justify-center text-white text-xl font-black shadow-lg shadow-cyan-600/30">
                  {activeRole.officialName.slice(0, 2)}
                </div>
                <div>
                  <h2 className="text-base font-black text-white">{activeRole.officialName}</h2>
                  <p className="text-xs text-cyan-400 font-medium">{activeRole.title}</p>
                  <span className="text-[10px] text-slate-400 font-mono block mt-1">
                    کد دسترسی: {activeRole.username}
                  </span>
                </div>
              </div>

              <div className="space-y-3 pt-4 border-t border-slate-800 text-xs">
                <div className="flex justify-between py-1.5 border-b border-slate-800/60">
                  <span className="text-slate-400">حوزه صلاحیت:</span>
                  <span className="text-slate-200 font-medium">{activeRole.geographicScope}</span>
                </div>
                <div className="flex justify-between py-1.5 border-b border-slate-800/60">
                  <span className="text-slate-400">سطح دسترسی امنیتی:</span>
                  <span className="text-emerald-400 font-bold bg-emerald-950/40 px-2 py-0.5 rounded border border-emerald-800/40">
                    طبقه {activeRole.accessLevel} (ویژه تصمیم‌گیران ارشد)
                  </span>
                </div>
                <div className="flex justify-between py-1.5 border-b border-slate-800/60">
                  <span className="text-slate-400">ماژول‌های کلیدی تحت اشراف:</span>
                  <span className="text-cyan-400 font-mono font-bold">
                    {toPersianDigits((activeRole.topModules || []).length)} ماژول تخصصی
                  </span>
                </div>
              </div>

              <div className="mt-5 p-3.5 rounded-xl bg-slate-900/80 border border-slate-800 text-[11px] text-slate-300 leading-relaxed">
                <strong className="text-cyan-400 block mb-1">ماموریت کلیدی ابلاغی:</strong>
                {activeRole.mandate}
              </div>
            </div>
          </div>

          {/* Role Switcher Grid (7 cols) */}
          <div className="lg:col-span-7 space-y-4">
            <div className="rounded-2xl border border-slate-800 bg-[#0F1423]/95 p-5 shadow-xl">
              <div className="flex items-center justify-between pb-3 mb-4 border-b border-slate-800">
                <div className="flex items-center gap-2">
                  <UserCheck className="w-4 h-4 text-cyan-400" />
                  <span className="text-xs font-bold text-white">تغییر هویت کاربری (۳۲ مقام رسمی استان تهران)</span>
                </div>
                <span className="text-[11px] text-slate-400">جهت شبیه‌سازی میز کار مقامات</span>
              </div>

              <div className="space-y-2 max-h-[500px] overflow-y-auto pr-1">
                {OFFICIAL_ROLES.map((role) => {
                  const isActive = activeRole.id === role.id;
                  return (
                    <div
                      key={role.id}
                      onClick={() => setActiveRole(role)}
                      className={`p-3 rounded-xl border cursor-pointer transition-all flex items-center justify-between ${
                        isActive
                          ? 'border-cyan-400 bg-cyan-950/30 shadow-md'
                          : 'border-slate-800/80 bg-slate-900/40 hover:border-slate-700'
                      }`}
                    >
                      <div>
                        <div className="flex items-center gap-2">
                          <span className="text-xs font-bold text-white">{role.officialName}</span>
                          <span className="text-[10px] text-slate-400">({role.title})</span>
                          {isActive && (
                            <span className="text-[9px] bg-cyan-500 text-slate-950 font-bold px-1.5 py-0.2 rounded">
                              فعال
                            </span>
                          )}
                        </div>
                        <span className="text-[10px] text-slate-400 mt-0.5 block">{role.geographicScope}</span>
                      </div>
                      <span className="text-[10px] font-mono text-cyan-400 bg-slate-800 px-2 py-0.5 rounded">
                        سطح {role.accessLevel}
                      </span>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      )}

      {mainTab === 'settings' && (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          {/* Sub-Tabs (3 cols) */}
          <div className="lg:col-span-3 space-y-1.5">
            {[
              { id: 'ai-config', label: 'هوش مصنوعی و مدل‌ها', icon: Sparkles },
              { id: 'thresholds', label: 'آستانه هشدارها و قواعد', icon: Sliders },
              { id: 'sync', label: 'اتصالات داده و اینجکشن', icon: Database },
              { id: 'video-wall', label: 'حالت ویدئو وال و چگالی', icon: Monitor },
              { id: 'cache', label: 'کش محلی و آفلاین PWA', icon: HardDrive },
              { id: 'audit', label: 'لاگ امنیتی و ممیزی', icon: Shield },
            ].map((tab) => {
              const Icon = tab.icon;
              const isActive = settingsTab === tab.id;
              return (
                <button
                  key={tab.id}
                  onClick={() => setSettingsTab(tab.id as SettingsTab)}
                  className={`w-full flex items-center gap-2.5 px-4 py-3 rounded-xl text-xs font-bold transition-all text-right ${
                    isActive
                      ? 'bg-cyan-500/20 border border-cyan-400 text-cyan-300 shadow-md'
                      : 'border border-transparent text-slate-400 hover:text-slate-200 hover:bg-slate-900/60'
                  }`}
                >
                  <Icon className="w-4 h-4 shrink-0" />
                  <span>{tab.label}</span>
                </button>
              );
            })}
          </div>

          {/* Settings Tab Content (9 cols) */}
          <div className="lg:col-span-9">
            <div className="rounded-2xl border border-slate-800 bg-[#0F1423]/95 p-6 shadow-xl space-y-6">
              {settingsTab === 'ai-config' && (
                <div className="space-y-4">
                  <h3 className="text-sm font-bold text-white border-b border-slate-800 pb-2">
                    تنظیمات موتور هوش مصنوعی Gemini و عامل‌ها
                  </h3>

                  <div className="space-y-4 text-xs">
                    <div>
                      <label className="block text-slate-300 font-medium mb-1.5">مدل زبان تخصصی تحلیلگر</label>
                      <select
                        value={geminiModel}
                        onChange={(e) => setGeminiModel(e.target.value)}
                        className="w-full bg-slate-900 border border-slate-700 rounded-xl px-3 py-2.5 text-slate-200 focus:outline-none"
                      >
                        <option value="gemini-3.8-flash">Gemini 3.8 Flash (پیشنهادی استانداری - سرعت و تحلیل داده فوق‌العاده)</option>
                        <option value="gemini-3.5-pro">Gemini 3.5 Pro (استدلال پیچیده و شبیه‌سازی عمیق)</option>
                      </select>
                    </div>

                    <div className="flex items-center justify-between p-3.5 rounded-xl bg-slate-900/60 border border-slate-800">
                      <div>
                        <span className="text-slate-200 font-bold block">جستجوی زنده در وب (Google Search Grounding)</span>
                        <span className="text-[11px] text-slate-400">ارزیابی آنلاین اخبار روزانه اقتصادی و بخشنامه‌های جدید بانک مرکزی</span>
                      </div>
                      <input
                        type="checkbox"
                        checked={searchGrounding}
                        onChange={(e) => setSearchGrounding(e.target.checked)}
                        className="w-4 h-4 rounded accent-cyan-400"
                      />
                    </div>

                    <div>
                      <div className="flex justify-between mb-1">
                        <span className="text-slate-300 font-medium">میزان خلاقیت مدل (Temperature): {temperature}</span>
                        <span className="text-slate-500 font-mono">دقت حداکثری حاکمیتی</span>
                      </div>
                      <input
                        type="range"
                        min={0.1}
                        max={1.0}
                        step={0.1}
                        value={temperature}
                        onChange={(e) => setTemperature(Number(e.target.value))}
                        className="w-full accent-cyan-400"
                      />
                    </div>
                  </div>
                </div>
              )}

              {settingsTab === 'thresholds' && (
                <div className="space-y-4">
                  <h3 className="text-sm font-bold text-white border-b border-slate-800 pb-2">
                    کالیبراسیون حد آستانه هشدارهای خودکار استان تهران
                  </h3>

                  <div className="space-y-4 text-xs">
                    <div>
                      <div className="flex justify-between mb-1">
                        <span className="text-slate-300">حداکثر زمان مجاز صف نانوایی‌ها قبل از آلارم سطح ۲:</span>
                        <span className="font-mono text-cyan-300 font-bold">{toPersianDigits(breadQueueThreshold)} دقیقه</span>
                      </div>
                      <input
                        type="range"
                        min={15}
                        max={60}
                        value={breadQueueThreshold}
                        onChange={(e) => setBreadQueueThreshold(Number(e.target.value))}
                        className="w-full accent-cyan-400"
                      />
                    </div>

                    <div>
                      <div className="flex justify-between mb-1">
                        <span className="text-slate-300">انحراف قیمت اقلام اساسی نسبت به نرخ مصوب:</span>
                        <span className="font-mono text-amber-300 font-bold">{toPersianDigits(priceVarianceThreshold)}٪</span>
                      </div>
                      <input
                        type="range"
                        min={5}
                        max={40}
                        value={priceVarianceThreshold}
                        onChange={(e) => setPriceVarianceThreshold(Number(e.target.value))}
                        className="w-full accent-amber-400"
                      />
                    </div>

                    <div>
                      <div className="flex justify-between mb-1">
                        <span className="text-slate-300">حداقل روزهای مجاز ذخیره استراتژیک استان (گندم، شکر، مرغ):</span>
                        <span className="font-mono text-rose-300 font-bold">{toPersianDigits(minReserveDays)} روز</span>
                      </div>
                      <input
                        type="range"
                        min={15}
                        max={90}
                        value={minReserveDays}
                        onChange={(e) => setMinReserveDays(Number(e.target.value))}
                        className="w-full accent-rose-400"
                      />
                    </div>
                  </div>
                </div>
              )}

              {settingsTab === 'sync' && (
                <div className="space-y-4 text-xs">
                  <h3 className="text-sm font-bold text-white border-b border-slate-800 pb-2">
                    اتصال به پایگاه‌های اطلاعاتی دستگاه‌های اجرایی استان
                  </h3>

                  <div className="space-y-2.5">
                    {[
                      { name: 'سامانه هوشمند یارانه آرد و نان (نانینو)', status: 'برخط', latency: '۱۲۰ میلی‌ثانیه', level: 'الف (A)' },
                      { name: 'سازمان میادین میوه و تره‌بار شهرداری تهران', status: 'برخط', latency: '۳۵۰ میلی‌ثانیه', level: 'ب (B)' },
                      { name: 'پورتال جامع سازمان صمت و شهرک‌های صنعتی', status: 'برخط', latency: '۲۱۰ میلی‌ثانیه', level: 'الف (A)' },
                      { name: 'پایگاه اطلاعاتی سازمان امور مالیاتی استان تهران', status: 'به‌روزرسانی روزانه', latency: 'تکمیل دیشب', level: 'الف (A)' },
                      { name: 'گمرکات فرودگاه امام خمینی و تهران', status: 'برخط', latency: '۴۲۰ میلی‌ثانیه', level: 'ب (B)' },
                    ].map((s, idx) => (
                      <div key={idx} className="flex items-center justify-between p-3 rounded-xl bg-slate-900/60 border border-slate-800">
                        <div className="flex items-center gap-2">
                          <span className="w-2 h-2 rounded-full bg-emerald-400" />
                          <span className="text-slate-200 font-medium">{s.name}</span>
                        </div>
                        <div className="flex items-center gap-3">
                          <span className="text-slate-400">{s.latency}</span>
                          <span className="text-[10px] text-cyan-300 font-mono bg-cyan-950/40 px-2 py-0.5 rounded border border-cyan-800/40">
                            سطح {s.level}
                          </span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {settingsTab === 'video-wall' && (
                <div className="space-y-4 text-xs">
                  <h3 className="text-sm font-bold text-white border-b border-slate-800 pb-2">
                    پیکربندی سکوی تصمیم‌یار و ویدئووال استاندار
                  </h3>

                  <div className="flex items-center justify-between p-4 rounded-xl bg-slate-900/60 border border-slate-800">
                    <div>
                      <span className="text-slate-200 font-bold block mb-1">فعال‌سازی حالت ویدئو وال (Video-Wall Mode)</span>
                      <span className="text-[11px] text-slate-400">بزرگ‌نمایی ارقام کلیدی، نمایش با کنتراست فوق‌العاده و اسکرول خودکار برای مانیتورهای عریض اتاق جلسات</span>
                    </div>
                    <button
                      onClick={() => setVideoWallMode(!videoWallMode)}
                      className={`px-4 py-2 rounded-xl text-xs font-bold transition-all ${
                        videoWallMode ? 'bg-cyan-500 text-slate-950' : 'bg-slate-800 text-slate-400'
                      }`}
                    >
                      {videoWallMode ? 'فعال' : 'غیرفعال'}
                    </button>
                  </div>
                </div>
              )}

              {settingsTab === 'cache' && (
                <div className="space-y-4 text-xs">
                  <h3 className="text-sm font-bold text-white border-b border-slate-800 pb-2">
                    وضعیت کش محلی و کارایی آفلاین سامانه
                  </h3>
                  <div className="p-4 rounded-xl bg-slate-900/60 border border-slate-800 space-y-2">
                    <div className="flex justify-between">
                      <span className="text-slate-400">وضعیت اتصال فعلی:</span>
                      <span className={`font-bold ${isOnline ? 'text-emerald-400' : 'text-amber-400'}`}>
                        {isOnline ? 'برخط و متصل به درگاه استانی' : 'آفلاین (اطلاعات از حافظه کش خوانده می‌شود)'}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-slate-400">حجم پایگاه داده محلی IndexedDB:</span>
                      <span className="text-cyan-400 font-mono">۴.۸ مگابایت (۱۶ شهرستان و ۲۲ شهرک صنعتی)</span>
                    </div>
                  </div>
                </div>
              )}

              {settingsTab === 'audit' && (
                <div className="space-y-4 text-xs">
                  <h3 className="text-sm font-bold text-white border-b border-slate-800 pb-2">
                    سیاهه رویدادهای امنیتی و ممیزی سامانه (Security Audit Log)
                  </h3>
                  <div className="space-y-2 font-mono text-[11px]">
                    <div className="p-2.5 rounded-lg bg-slate-900/80 border border-slate-800 flex justify-between text-slate-300">
                      <span>ورود امن استاندار تهران (محمدصادق معتمدیان) از IP معتبر استانداری</span>
                      <span className="text-cyan-400">۱۰ دقیقه پیش</span>
                    </div>
                    <div className="p-2.5 rounded-lg bg-slate-900/80 border border-slate-800 flex justify-between text-slate-300">
                      <span>اجرای شبیه‌سازی سناریوی شوک ارزی و دومینوی نان در اتاق جنگ</span>
                      <span className="text-cyan-400">۲۸ دقیقه پیش</span>
                    </div>
                    <div className="p-2.5 rounded-lg bg-slate-900/80 border border-slate-800 flex justify-between text-slate-300">
                      <span>تولید پیش‌نویس مصوبه کارگروه تنظیم بازار توسط عامل AGT-10</span>
                      <span className="text-cyan-400">۱ ساعت پیش</span>
                    </div>
                  </div>
                </div>
              )}

              {/* Save Button */}
              <div className="flex items-center justify-between pt-4 border-t border-slate-800">
                <span className="text-xs text-slate-500">تمامی تغییرات در مرورگر و سرور ثبت می‌گردد.</span>
                <button
                  onClick={handleSaveSettings}
                  className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-bold text-xs shadow-lg transition-all"
                >
                  <Save className="w-4 h-4" />
                  <span>ذخیره تغییرات پیکربندی</span>
                </button>
              </div>

              {saveToast && (
                <div className="p-3 rounded-xl bg-emerald-950/60 border border-emerald-500/50 text-emerald-300 text-xs flex items-center gap-2">
                  <CheckCircle className="w-4 h-4" />
                  <span>تنظیمات سامانه با موفقیت در پایگاه داده ذخیره و به تمامی عامل‌های ده‌گانه ابلاغ گردید.</span>
                </div>
              )}
            </div>
          </div>
        </div>
      )}

      {mainTab === 'help' && (
        <div className="space-y-4">
          <div className="flex items-center justify-between p-4 rounded-xl border border-slate-800 bg-[#0F1423]/90">
            <div className="flex items-center gap-2 text-xs text-white font-bold">
              <BookOpen className="w-4 h-4 text-cyan-400" />
              <span>دانشنامه و منشور شاخص‌های اقتصادی استان تهران</span>
            </div>
            <div className="relative w-72">
              <Search className="absolute right-3 top-2.5 w-4 h-4 text-slate-500 pointer-events-none" />
              <input
                type="text"
                value={kpiSearch}
                onChange={(e) => setKpiSearch(e.target.value)}
                placeholder="جستجو در شاخص‌ها و فرمول‌ها..."
                className="w-full bg-slate-900 border border-slate-700 rounded-xl pr-9 pl-3 py-1.5 text-xs text-slate-200 focus:outline-none focus:border-cyan-400"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {filteredKpis.map((kpi) => (
              <div
                key={kpi.id}
                className="p-4 rounded-xl border border-slate-800 bg-[#0F1423]/95 space-y-2 hover:border-slate-700 transition-all"
              >
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold text-white">{kpi.title}</span>
                  <span
                    onClick={() => openProvenance(kpi.id)}
                    className="text-[10px] text-cyan-400 font-mono bg-cyan-950/40 border border-cyan-800/40 px-2 py-0.5 rounded cursor-pointer hover:bg-cyan-900/60 transition-all"
                  >
                    سطح اصالت {kpi.provenanceLevel} ↗
                  </span>
                </div>
                <p className="text-xs text-slate-300 leading-relaxed">{kpi.agentInsight}</p>
                <div className="p-2.5 rounded-lg bg-slate-900/70 border border-slate-800/80 font-mono text-[11px] text-cyan-300">
                  فرمول محاسبه: {kpi.formula}
                </div>
                <div className="flex justify-between items-center text-[10px] text-slate-500 pt-1">
                  <span>منبع: {kpi.source}</span>
                  <span>دوره به‌روزرسانی: {kpi.period}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
