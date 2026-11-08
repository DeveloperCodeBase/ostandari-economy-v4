'use client';

import React, { useState, useEffect, useSyncExternalStore } from 'react';
import Link from 'next/link';
import { TEHRAN_PROVINCE_BASELINE } from '@/src/data/tehranMasterData';
import { TEHRAN_MACRO_MODULES } from '@/src/data/modulesAndRoutes';
import { TehranInteractiveMap } from '@/src/components/map/TehranInteractiveMap';
import { toPersianDigits, formatPersianNumber } from '@/src/utils/formatters';
import {
  BrainCircuit,
  ShieldCheck,
  TrendingUp,
  MapPin,
  ArrowLeft,
  Activity,
  Layers,
  Sparkles,
  Bot,
  Database,
  Radio,
  FileCheck,
  Sun,
  Moon,
} from 'lucide-react';

const emptySubscribe = () => () => {};

export default function LandingPage() {
  const isClient = useSyncExternalStore(emptySubscribe, () => true, () => false);
  const [activeTabLayer, setActiveTabLayer] = useState<'industry' | 'market' | 'agriculture' | 'labor' | 'risk'>('industry');
  const [currentTheme, setCurrentTheme] = useState<'dark' | 'light'>(() => {
    if (typeof window !== 'undefined') {
      const savedTheme = localStorage.getItem('tehran-econ-theme');
      return savedTheme === 'light' ? 'light' : 'dark';
    }
    return 'dark';
  });

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', currentTheme);
    if (currentTheme === 'dark') {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [currentTheme]);

  const toggleTheme = () => {
    const nextTheme = currentTheme === 'dark' ? 'light' : 'dark';
    setCurrentTheme(nextTheme);
    localStorage.setItem('tehran-econ-theme', nextTheme);
  };

  return (
    <div className="min-h-screen bg-[var(--lg-canvas)] text-[var(--lg-ink)] selection:bg-cyan-500/30 selection:text-cyan-200 transition-colors">
      {/* 1. Glassmorphic Top Navbar */}
      <header className="sticky top-0 z-50 glass-panel border-b border-[var(--lg-border)] px-4 md:px-8 py-3.5 flex items-center justify-between backdrop-blur-xl">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-cyan-600 to-sky-700 flex items-center justify-center text-white font-extrabold text-lg shadow-lg shadow-cyan-950/40 border border-cyan-400/30">
            <span>ط</span>
          </div>
          <div>
            <h1 className="font-extrabold text-sm md:text-base text-[var(--lg-ink)] tracking-tight">
              سکوی تصمیم‌یار اقتصادی استاندار تهران
            </h1>
            <p className="text-[11px] text-[var(--lg-muted)] hidden sm:block">
              استانداری تهران · پایش و شبیه‌ساز ۳۶۰ درجه اقتصاد پایتخت
            </p>
          </div>
        </div>

        {/* Live Network Status Badge */}
        <div className="hidden lg:flex items-center gap-2 glass-panel px-3 py-1.5 rounded-full border border-[var(--lg-border)] text-xs">
          <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 radar-glow inline-block" />
          <span className="text-[var(--lg-secondary)] font-medium">هسته چندایجنتی فعال</span>
          <span className="text-[var(--lg-muted)]">|</span>
          <span className="text-[var(--lg-cyan)] font-mono font-bold">۱۶ شهرستان متصل</span>
          <span className="text-[var(--lg-muted)]">|</span>
          <span className="text-[var(--lg-muted)] font-mono">سال ۱۴۰۵</span>
        </div>

        {/* Theme Toggle & CTA Buttons */}
        <div className="flex items-center gap-2.5">
          <button
            onClick={toggleTheme}
            aria-label="تغییر حالت تم"
            title={isClient && currentTheme === 'light' ? 'تغییر به تم تاریک' : 'تغییر به تم روشن'}
            className="p-2 rounded-xl glass-button text-[var(--lg-ink)] hover:text-amber-400 transition-transform active:scale-95 border border-[var(--lg-border)]"
          >
            {isClient && currentTheme === 'light' ? (
              <Moon className="w-4 h-4 text-sky-600" />
            ) : (
              <Sun className="w-4 h-4 text-amber-400" />
            )}
          </button>

          <Link
            href="/login"
            className="px-4 py-2 rounded-xl bg-gradient-to-l from-cyan-600 to-sky-600 hover:from-cyan-500 hover:to-sky-500 text-white font-bold text-xs flex items-center gap-1.5 shadow-lg shadow-cyan-950/30 transition-all"
          >
            <span>ورود به سکوی تصمیم‌یار ←</span>
          </Link>
        </div>
      </header>

      {/* 2. Hero Command Section */}
      <section className="relative px-4 md:px-8 py-8 md:py-16 max-w-7xl mx-auto overflow-hidden">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          {/* Right Column: Hero Prose & Live Stats */}
          <div className="lg:col-span-7 space-y-6">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-500/10 border border-cyan-500/30 text-[var(--lg-cyan)] text-xs font-semibold">
              <Sparkles className="w-3.5 h-3.5 text-cyan-400" />
              <span>سامانه اختصاصی معاونت هماهنگی امور اقتصادی استانداری تهران</span>
            </div>

            <h2 className="text-3xl md:text-5xl font-black text-[var(--lg-ink)] leading-tight tracking-tight">
              سکوی تصمیم‌یار و مرکز پایش اقتصادی <span className="bg-gradient-to-l from-cyan-500 to-sky-400 bg-clip-text text-transparent">استاندار تهران</span>
            </h2>

            <p className="text-sm md:text-base text-[var(--lg-secondary)] leading-relaxed">
              پایش ۳۶۰ درجه و برخط کلان‌شهر تهران و ۱۶ شهرستان، ۲۲ شهرک صنعتی، ۶ گمرک، خزانه‌داری و شبکه بانکی، زنجیره گندم و نان، تنظیم بازار و شبیه‌سازی سناریوهای اقتصادی با معماری ۱۰ عامل هوشمند تخصصی.
            </p>

            {/* Real Stats Counter Strip */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-2">
              <div className="glass-card p-3 rounded-2xl border border-[var(--lg-border)]">
                <div className="text-2xl font-black text-[var(--lg-ink)] font-mono">
                  {toPersianDigits(TEHRAN_PROVINCE_BASELINE.gdpNationalSharePercent)}٪
                </div>
                <div className="text-[11px] text-[var(--lg-muted)] mt-1">سهم از GDP کشور (رتبه ۱)</div>
              </div>

              <div className="glass-card p-3 rounded-2xl border border-[var(--lg-border)]">
                <div className="text-2xl font-black text-[var(--lg-cyan)] font-mono">
                  {toPersianDigits(TEHRAN_PROVINCE_BASELINE.bankingDepositsNationalSharePercent)}٪
                </div>
                <div className="text-[11px] text-[var(--lg-muted)] mt-1">سهم از سپرده‌های بانکی</div>
              </div>

              <div className="glass-card p-3 rounded-2xl border border-[var(--lg-border)]">
                <div className="text-2xl font-black text-emerald-500 font-mono">
                  {formatPersianNumber(TEHRAN_PROVINCE_BASELINE.publicRevenue5Months1405Hemmat)}
                </div>
                <div className="text-[11px] text-[var(--lg-muted)] mt-1">همت درآمد ۵ماهه (+۷۷٪)</div>
              </div>

              <div className="glass-card p-3 rounded-2xl border border-[var(--lg-border)]">
                <div className="text-2xl font-black text-sky-500 font-mono">
                  {toPersianDigits(10)}
                </div>
                <div className="text-[11px] text-[var(--lg-muted)] mt-1">عامل تخصصی هوش مصنوعی</div>
              </div>
            </div>

            {/* CTAs */}
            <div className="flex flex-wrap items-center gap-3 pt-4">
              <Link
                href="/login"
                className="px-6 py-3 rounded-xl bg-gradient-to-l from-cyan-600 via-sky-600 to-blue-700 hover:from-cyan-500 hover:to-sky-500 text-white font-bold text-sm shadow-xl shadow-cyan-950/30 transition-all flex items-center gap-2"
              >
                <span>ورود به درگاه احراز هویت و انتخاب نقش</span>
                <ArrowLeft className="w-4 h-4" />
              </Link>

              <Link
                href="/dashboard/overview"
                className="px-5 py-3 rounded-xl glass-button border border-[var(--lg-border)] text-[var(--lg-ink)] font-semibold text-sm transition-colors flex items-center gap-2"
              >
                <span>مشاهده پیشخوان زنده تهران</span>
              </Link>
            </div>
          </div>

          {/* Left Column: Interactive 16 Counties GIS Map Explorer */}
          <div className="lg:col-span-5 h-[480px]">
            <TehranInteractiveMap
              activeLayer={activeTabLayer}
              showLayerControls={true}
              interactive={true}
            />
          </div>
        </div>
      </section>

      {/* 3. Multi-Agent AI 4-Stage Pipeline */}
      <section className="px-4 md:px-8 py-12 glass-panel border-y border-[var(--lg-border)]">
        <div className="max-w-7xl mx-auto space-y-8">
          <div className="text-center space-y-2">
            <span className="text-xs font-bold text-[var(--lg-cyan)] uppercase tracking-widest font-mono">
              ARCHITECTURE & REASONING ENGINE
            </span>
            <h3 className="text-2xl md:text-3xl font-extrabold text-[var(--lg-ink)]">
              خط لوله ۴مرحله‌ای هوش مصنوعی چندایجنتی استان تهران
            </h3>
            <p className="text-xs md:text-sm text-[var(--lg-muted)] max-w-2xl mx-auto">
              همگرایی ده عامل تخصصی برای تضمین انضباط مالی، امنیت غذایی و تصمیم‌یاری لحظه‌ای استاندار
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            <div className="glass-card p-5 rounded-2xl border border-[var(--lg-border)]">
              <div className="w-10 h-10 rounded-xl bg-cyan-600/20 text-cyan-400 flex items-center justify-center font-bold mb-3 border border-cyan-500/30">
                ۱
              </div>
              <h4 className="font-bold text-sm text-[var(--lg-ink)] mb-2">رصد و تجمیع چندبخشی</h4>
              <p className="text-xs text-[var(--lg-muted)] leading-relaxed">
                واکشی پیوسته داده‌ها از مرکز آمار، سامانه نانینو، سامانه ۱۲۴، گمرک، بانک مرکزی و سامانه‌های استانی.
              </p>
            </div>

            <div className="glass-card p-5 rounded-2xl border border-[var(--lg-border)]">
              <div className="w-10 h-10 rounded-xl bg-cyan-600/20 text-cyan-400 flex items-center justify-center font-bold mb-3 border border-cyan-500/30">
                ۲
              </div>
              <h4 className="font-bold text-sm text-[var(--lg-ink)] mb-2">کنترل اصالت داده (Provenance)</h4>
              <p className="text-xs text-[var(--lg-muted)] leading-relaxed">
                تطبیق خودکار ارقام با سطوح چهارگانه اعتبار (A تا D) و ممانعت قطعی از ورود داده‌های فاقد سند آماری.
              </p>
            </div>

            <div className="glass-card p-5 rounded-2xl border border-[var(--lg-border)]">
              <div className="w-10 h-10 rounded-xl bg-amber-600/20 text-amber-500 flex items-center justify-center font-bold mb-3 border border-amber-500/30">
                ۳
              </div>
              <h4 className="font-bold text-sm text-[var(--lg-ink)] mb-2">پیش‌بینی و هشدار زودهنگام</h4>
              <p className="text-xs text-[var(--lg-muted)] leading-relaxed">
                تشخیص هوشمند ناهنجاری قیمتی، افت ذخایر سیلوها زیر ۳۰ روز و ناترازی برق شهرک‌های صنعتی پیش از بحران.
              </p>
            </div>

            <div className="glass-card p-5 rounded-2xl border border-[var(--lg-border)]">
              <div className="w-10 h-10 rounded-xl bg-emerald-600/20 text-emerald-500 flex items-center justify-center font-bold mb-3 border border-emerald-500/30">
                ۴
              </div>
              <h4 className="font-bold text-sm text-[var(--lg-ink)] mb-2">اتاق جنگ و شبیه‌ساز سناریو</h4>
              <p className="text-xs text-[var(--lg-muted)] leading-relaxed">
                محاسبه اثرات متقاطع ۱۲ اهرم سیاست‌گذاری بر تورم، تولید و رضایت عمومی در ۱۶ شهرستان استان تهران.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 4. Showcase of 12 Macro-Modules */}
      <section className="px-4 md:px-8 py-16 max-w-7xl mx-auto space-y-8">
        <div className="text-center space-y-2">
          <span className="text-xs font-bold text-[var(--lg-cyan)] font-mono">12 MACRO MODULES</span>
          <h3 className="text-2xl md:text-3xl font-extrabold text-[var(--lg-ink)]">
            ۱۲ کلان‌ماژول اقتصادی استان تهران با ۶۴ صفحه تخصصی
          </h3>
          <p className="text-xs md:text-sm text-[var(--lg-muted)]">
            پوشش جامع و دقیق تمامی تکالیف و اختیارات معاونت هماهنگی امور اقتصادی استانداری تهران
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {TEHRAN_MACRO_MODULES.map((m) => (
            <Link
              key={m.id}
              href={m.subModules[0]?.route || '/dashboard/overview'}
              className="group glass-card p-4 rounded-2xl border border-[var(--lg-border)] hover:border-[var(--lg-cyan)] transition-all duration-200 flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between gap-2 mb-3">
                  <span className="w-8 h-8 rounded-xl bg-cyan-600/20 text-cyan-500 border border-cyan-500/30 flex items-center justify-center text-xs font-bold font-mono">
                    {toPersianDigits(m.number)}
                  </span>
                  <span className="text-[10px] text-[var(--lg-muted)] font-mono">
                    {toPersianDigits(m.subModules.length)} زیرصفحه تخصصی
                  </span>
                </div>

                <h4 className="font-bold text-sm text-[var(--lg-ink)] group-hover:text-[var(--lg-cyan)] transition-colors mb-1.5">
                  {m.titleFa}
                </h4>
                <p className="text-[11px] text-[var(--lg-muted)] leading-relaxed mb-3">
                  {m.subModules[0]?.description}
                </p>
              </div>

              <div className="flex items-center justify-between text-xs text-[var(--lg-cyan)] pt-2 border-t border-[var(--lg-border)]">
                <span className="text-[11px] text-[var(--lg-muted)]">{m.titleEn}</span>
                <span className="group-hover:translate-x-1 transition-transform font-bold">ورود ←</span>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* 5. Footer */}
      <footer className="border-t border-[var(--lg-border)] glass-panel px-4 md:px-8 py-8 text-xs text-[var(--lg-muted)]">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="space-y-1 text-center md:text-right">
            <div className="font-bold text-[var(--lg-ink)] text-sm">
              استانداری تهران — معاونت هماهنگی امور اقتصادی
            </div>
            <p className="text-[11px] text-[var(--lg-muted)]">
              سکوی تصمیم‌یار اقتصادی استاندار تهران
            </p>
          </div>

          <div className="text-center md:text-left text-[11px] text-[var(--lg-secondary)]">
            طراحی، معماری و هوشمندسازی: <span className="font-bold text-[var(--lg-cyan)]">شرکت شبکه هوشمند ابتکار ویستا</span> (دانش‌بنیان)
          </div>
        </div>
      </footer>
    </div>
  );
}
