'use client';

import React, { useState, useSyncExternalStore } from 'react';
import { useCommand } from '@/src/context/CommandContext';
import { TEHRAN_16_COUNTIES } from '@/src/data/tehranMasterData';
import { OFFICIAL_ROLES } from '@/src/data/rolesAndOfficials';
import {
  MapPin,
  Bot,
  Search,
  Globe,
  Tv,
  UserCheck,
  ChevronDown,
  Menu,
  ShieldAlert,
  Sun,
  Moon,
  Sparkles,
  HelpCircle,
} from 'lucide-react';
import Link from 'next/link';
import { TehranGovernorateLogo } from '@/src/components/common/TehranGovernorateLogo';

export function TopCommandHeader({ onToggleSidebar }: { onToggleSidebar?: () => void }) {
  const {
    activeRole,
    setActiveRole,
    selectedCountyId,
    setSelectedCountyId,
    setIsCopilotOpen,
    setIsCommandPaletteOpen,
    videoWallMode,
    setVideoWallMode,
    runLiveResearch,
    liveResearchLoading,
    alerts,
    openHelpModal,
    theme,
    toggleTheme,
    sidebarCollapsed,
    toggleSidebarCollapse,
  } = useCommand();

  const [roleDropdownOpen, setRoleDropdownOpen] = useState(false);
  const [countyDropdownOpen, setCountyDropdownOpen] = useState(false);
  const mounted = useSyncExternalStore(
    () => () => {},
    () => true,
    () => false
  );

  const handleSidebarToggle = () => {
    if (typeof window !== 'undefined' && window.innerWidth < 1024) {
      if (onToggleSidebar) onToggleSidebar();
    } else {
      toggleSidebarCollapse();
    }
  };

  const selectedCountyName = selectedCountyId
    ? TEHRAN_16_COUNTIES.find((c) => c.id === selectedCountyId)?.nameFa
    : 'کل استان تهران';

  const criticalAlertsCount = alerts.filter((a) => a.level === 1).length;

  return (
    <header className="sticky top-0 z-40 glass-panel border-b border-[var(--lg-border)] px-3 md:px-6 py-2.5 flex items-center justify-between gap-3 text-xs select-none backdrop-blur-2xl transition-colors">
      {/* Right Zone: Sidebar toggle + Brand Lockup */}
      <div className="flex items-center gap-3">
        <button
          onClick={handleSidebarToggle}
          aria-label="تغییر وضعیت سایدبار"
          title={sidebarCollapsed ? 'گسترش سایدبار' : 'جمع کردن سایدبار'}
          className="p-2 rounded-xl glass-button text-[var(--lg-ink)] hover:text-cyan-400 transition-colors"
        >
          <Menu className="w-5 h-5" />
        </button>

        <Link href="/dashboard/overview" className="flex items-center gap-2.5 group">
          <TehranGovernorateLogo size="md" />
          <div>
            <div className="flex items-center gap-2">
              <span className="font-extrabold text-sm md:text-base text-[var(--lg-ink)] tracking-tight group-hover:text-cyan-400 transition-colors">
                سکوی تصمیم‌یار اقتصادی استاندار
              </span>
              <span className="hidden sm:inline-block text-[10px] bg-cyan-500/15 text-cyan-400 px-2 py-0.5 rounded-full border border-cyan-500/30 font-mono font-semibold">
                استان تهران
              </span>
            </div>
            <div className="text-[10px] text-[var(--lg-muted)] hidden md:block">
              استانداری تهران · پایش و تحلیل ۳۶۰ درجه اقتصاد پایتخت
            </div>
          </div>
        </Link>
      </div>

      {/* Middle Zone: County Filter + Fast Search + Live Research */}
      <div className="flex items-center gap-2">
        {/* 16 County Selector Dropdown */}
        <div className="relative">
          <button
            onClick={() => setCountyDropdownOpen((prev) => !prev)}
            className="flex items-center gap-1.5 glass-button border border-[var(--lg-border)] text-[var(--lg-ink)] px-3 py-1.5 rounded-xl transition-all font-medium hover:border-[var(--lg-cyan)]"
          >
            <MapPin className="w-3.5 h-3.5 text-cyan-400" />
            <span className="font-bold">{selectedCountyName}</span>
            <ChevronDown className="w-3 h-3 text-[var(--lg-muted)]" />
          </button>

          {countyDropdownOpen && (
            <div
              className="absolute top-full mt-1.5 right-0 w-64 glass-panel border border-[var(--lg-border-strong)] rounded-2xl shadow-2xl p-2 z-50 max-h-80 overflow-y-auto"
              onClick={() => setCountyDropdownOpen(false)}
            >
              <button
                onClick={() => setSelectedCountyId(null)}
                className={`w-full text-right px-3 py-2 rounded-xl font-bold transition-colors flex items-center justify-between ${
                  selectedCountyId === null
                    ? 'bg-cyan-600 text-white shadow-md'
                    : 'text-[var(--lg-ink)] hover:bg-[var(--lg-hover)]'
                }`}
              >
                <span>کل استان تهران (دید کلان استانی)</span>
                {selectedCountyId === null && <span>✓</span>}
              </button>

              <div className="text-[10px] text-[var(--lg-muted)] font-semibold px-2 pt-2 pb-1 border-t border-[var(--lg-border)] mt-1">
                ۱۶ شهرستان استان تهران:
              </div>

              {TEHRAN_16_COUNTIES.map((c) => (
                <button
                  key={c.id}
                  onClick={() => setSelectedCountyId(c.id)}
                  className={`w-full text-right px-3 py-1.5 rounded-lg text-xs transition-colors flex items-center justify-between ${
                    selectedCountyId === c.id
                      ? 'bg-cyan-600 text-white font-semibold shadow-sm'
                      : 'text-[var(--lg-ink)] hover:bg-[var(--lg-hover)]'
                  }`}
                >
                  <div className="flex items-center gap-1.5">
                    <span>شهرستان {c.nameFa}</span>
                    {c.governorateType === 'فرمانداری ویژه' && (
                      <span className="text-[9px] bg-amber-500/20 text-amber-500 px-1 py-0.2 rounded font-bold">
                        ویژه
                      </span>
                    )}
                  </div>
                  <span className="text-[10px] text-[var(--lg-muted)]">{c.zone.replace('پهنه ', '')}</span>
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Live AI Deep Research Button */}
        <button
          onClick={() => runLiveResearch()}
          disabled={liveResearchLoading}
          title="استخراج آخرین آمارهای رسمی و اخبار اقتصادی تهران از وب با هوش مصنوعی"
          className="hidden xl:flex items-center gap-1.5 bg-gradient-to-r from-cyan-500/15 to-sky-500/15 hover:from-cyan-500/25 hover:to-sky-500/25 border border-cyan-400/40 text-[var(--lg-ink)] px-3 py-1.5 rounded-xl transition-all font-medium"
        >
          <Globe className={`w-3.5 h-3.5 text-cyan-400 ${liveResearchLoading ? 'animate-spin' : ''}`} />
          <span>{liveResearchLoading ? 'در حال پژوهش وب...' : 'تحقیق زنده داده‌ها (AI)'}</span>
        </button>

        {/* Search Command Palette Trigger (Ctrl+K) */}
        <button
          onClick={() => setIsCommandPaletteOpen(true)}
          className="hidden md:flex items-center gap-2 glass-button border border-[var(--lg-border)] text-[var(--lg-muted)] px-3 py-1.5 rounded-xl transition-all hover:border-[var(--lg-border-strong)]"
        >
          <Search className="w-3.5 h-3.5 text-[var(--lg-muted)]" />
          <span className="text-[var(--lg-muted)]">جستجوی شاخص یا شهرستان...</span>
          <kbd className="bg-white/10 dark:bg-black/20 px-1.5 py-0.5 rounded text-[10px] text-[var(--lg-ink)] font-mono border border-[var(--lg-border)]">
            Ctrl+K
          </kbd>
        </button>
      </div>

      {/* Left Zone: Theme Toggle, Alerts, Help Guide, Video Wall, Copilot & Role Switcher */}
      <div className="flex items-center gap-2">
        {/* Comprehensive Help & Methodology Guide Button */}
        <button
          onClick={() => openHelpModal()}
          title="راهنمای جامع، سناریوها و مستندات داشبورد"
          className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-xl glass-button text-[var(--lg-ink)] hover:text-cyan-400 border border-[var(--lg-border)] transition-colors text-xs font-semibold"
        >
          <HelpCircle className="w-4 h-4 text-cyan-400" />
          <span className="hidden sm:inline">راهنمای سامانه</span>
        </button>

        {/* Light / Dark Mode Toggle */}
        <button
          onClick={toggleTheme}
          aria-label={mounted && theme === 'light' ? 'تغییر به تم تاریک' : 'تغییر به تم روشن'}
          title={mounted && theme === 'light' ? 'تغییر به تم تاریک حاکمیتی' : 'تغییر به تم روشن کریستالی (کنتراست بالا)'}
          className="p-2 rounded-xl glass-button text-[var(--lg-ink)] hover:text-amber-400 transition-transform active:scale-95 border border-[var(--lg-border)]"
        >
          {mounted && theme === 'light' ? (
            <Moon className="w-4 h-4 text-sky-600 transition-transform hover:-rotate-12" />
          ) : (
            <Sun className="w-4 h-4 text-amber-400 transition-transform hover:rotate-45" />
          )}
        </button>

        {/* Critical Alerts Indicator */}
        <Link
          href="/system/alerts-reports"
          className="relative p-2 rounded-xl glass-button text-[var(--lg-ink)] hover:text-rose-400 transition-colors border border-[var(--lg-border)]"
          title="مرکز فرماندهی هشدارها"
        >
          <ShieldAlert className="w-4 h-4 text-amber-400" />
          {criticalAlertsCount > 0 && (
            <span className="absolute -top-1 -right-1 w-4 h-4 bg-rose-600 text-white rounded-full text-[9px] font-bold flex items-center justify-center font-mono shadow-sm animate-pulse">
              {criticalAlertsCount}
            </span>
          )}
        </Link>

        {/* Video Wall / Monitoring Mode Toggle */}
        <button
          onClick={() => setVideoWallMode(!videoWallMode)}
          className={`p-2 rounded-xl border transition-all hidden sm:flex items-center gap-1 ${
            videoWallMode
              ? 'bg-cyan-600 text-white border-cyan-400 shadow-lg'
              : 'glass-button text-[var(--lg-ink)] border-[var(--lg-border)] hover:border-[var(--lg-border-strong)]'
          }`}
          title="حالت ویدئووال سالن جلسات استانداری (چرخش خودکار اسلایدها)"
        >
          <Tv className="w-4 h-4" />
        </button>

        {/* AI Copilot Drawer Trigger (Ctrl+J) */}
        <button
          onClick={() => setIsCopilotOpen(true)}
          className="flex items-center gap-1.5 bg-gradient-to-l from-cyan-600 to-sky-700 hover:opacity-95 text-white px-3 py-1.5 rounded-xl font-bold shadow-lg shadow-cyan-900/30 transition-all active:scale-95"
        >
          <Bot className="w-4 h-4 radar-glow" />
          <span className="hidden sm:inline">تصمیم‌یار AI</span>
          <kbd className="hidden lg:inline-block bg-black/20 px-1 py-0.2 rounded text-[9px] font-mono border border-white/20">
            Ctrl+J
          </kbd>
        </button>

        {/* Official Role Switcher Dropdown */}
        <div className="relative">
          <button
            onClick={() => setRoleDropdownOpen((prev) => !prev)}
            className="flex items-center gap-2 glass-button border border-[var(--lg-border)] text-[var(--lg-ink)] px-3 py-1.5 rounded-xl transition-all hover:border-[var(--lg-border-strong)]"
          >
            <div className="w-6 h-6 rounded-lg bg-cyan-500/20 text-cyan-300 flex items-center justify-center font-bold text-[11px] border border-cyan-500/30">
              <UserCheck className="w-3.5 h-3.5" />
            </div>
            <div className="text-right hidden sm:block">
              <div className="font-bold text-[var(--lg-ink)] text-[11px] truncate max-w-[120px]">
                {activeRole.title}
              </div>
              <div className="text-[10px] text-[var(--lg-muted)] truncate max-w-[120px]">
                {activeRole.officialName}
              </div>
            </div>
            <ChevronDown className="w-3 h-3 text-[var(--lg-muted)]" />
          </button>

          {roleDropdownOpen && (
            <div
              className="absolute top-full mt-1.5 left-0 w-72 glass-panel border border-[var(--lg-border-strong)] rounded-2xl shadow-2xl p-2 z-50 max-h-96 overflow-y-auto"
              onClick={() => setRoleDropdownOpen(false)}
            >
              <div className="text-[11px] font-bold text-cyan-400 px-2 py-1 border-b border-[var(--lg-border)] mb-1 flex items-center gap-1.5">
                <Sparkles className="w-3 h-3" />
                <span>تغییر نقش کاربری (ویژه پرزنتیشن و دمو):</span>
              </div>

              {OFFICIAL_ROLES.slice(0, 10).map((r) => (
                <button
                  key={r.id}
                  onClick={() => setActiveRole(r)}
                  className={`w-full text-right px-3 py-2 rounded-xl text-xs transition-colors flex flex-col ${
                    activeRole.id === r.id
                      ? 'bg-cyan-600 text-white shadow-md'
                      : 'text-[var(--lg-ink)] hover:bg-[var(--lg-hover)]'
                  }`}
                >
                  <span className="font-bold">{r.title}</span>
                  <span className="text-[10px] opacity-75">{r.officialName} — {r.geographicScope}</span>
                </button>
              ))}

              <Link
                href="/login"
                className="block text-center text-xs text-cyan-400 hover:underline pt-2 mt-1 border-t border-[var(--lg-border)] font-semibold"
              >
                مشاهده همه ۳۲ نقش در درگاه احراز هویت ←
              </Link>
            </div>
          )}
        </div>
      </div>
    </header>
  );
}
