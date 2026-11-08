'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import {
  LayoutDashboard,
  Coins,
  Building2,
  Factory,
  Wheat,
  ShoppingBag,
  Sprout,
  Truck,
  Users,
  Zap,
  Globe,
  Flame,
  FileText,
  FileSpreadsheet,
  MapPin,
  Sliders,
  BrainCircuit,
  Bell,
  Settings,
  ChevronLeft,
  ChevronRight,
  Search,
  X,
  Sparkles,
} from 'lucide-react';
import { useCommand } from '@/src/context/CommandContext';
import { TehranGovernorateLogo } from '@/src/components/common/TehranGovernorateLogo';

export interface SovereignSidebarModule {
  id: string;
  number: string;
  titleFa: string;
  route: string;
  icon: React.ElementType;
  agentBadge: string;
  alertBadge?: string;
  category: 'sovereign' | 'operational' | 'ai' | 'system';
}

export const SOVEREIGN_11_MODULES: SovereignSidebarModule[] = [
  {
    id: 'overview',
    number: '۱',
    titleFa: 'سکوی تصمیم‌یار و نبض کلان پایتخت',
    route: '/dashboard/overview#overview',
    icon: LayoutDashboard,
    agentBadge: 'AGT-01',
    alertBadge: '۳۶۰°',
    category: 'sovereign',
  },
  {
    id: 'treasury',
    number: '۲',
    titleFa: 'خزانه‌داری، مالیات، بودجه و مولدسازی',
    route: '/dashboard/overview#treasury',
    icon: Coins,
    agentBadge: 'AGT-02',
    alertBadge: '۳۹۳ همت',
    category: 'sovereign',
  },
  {
    id: 'banking',
    number: '۳',
    titleFa: 'شبکه بانکی، تسهیلات و هدایت اعتبار',
    route: '/dashboard/overview#banking',
    icon: Building2,
    agentBadge: 'AGT-03',
    alertBadge: '۶۰.۵٪',
    category: 'sovereign',
  },
  {
    id: 'industry',
    number: '۴',
    titleFa: 'شهرک‌های صنعتی، معادن و تولید (صمت)',
    route: '/dashboard/overview#industry',
    icon: Factory,
    agentBadge: 'AGT-04',
    alertBadge: '۲۲ شهرک',
    category: 'sovereign',
  },
  {
    id: 'bread',
    number: '۵',
    titleFa: 'زنجیره گندم، سیلوها، آرد و نانینو',
    route: '/dashboard/overview#bread',
    icon: Wheat,
    agentBadge: 'AGT-06',
    alertBadge: '۱۰,۴۲۰',
    category: 'sovereign',
  },
  {
    id: 'bazaar',
    number: '۶',
    titleFa: 'تنظیم بازار، میادین تره‌بار و نظارت ۱۲۴',
    route: '/dashboard/overview#bazaar',
    icon: ShoppingBag,
    agentBadge: 'AGT-05',
    alertBadge: '۳۰۵ میدان',
    category: 'sovereign',
  },
  {
    id: 'agriculture',
    number: '۷',
    titleFa: 'جهاد کشاورزی، گلخانه‌ها و دامپروری',
    route: '/dashboard/overview#agriculture',
    icon: Sprout,
    agentBadge: 'AGT-07',
    alertBadge: '۱,۲۵۸ هکتار',
    category: 'sovereign',
  },
  {
    id: 'customs',
    number: '۸',
    titleFa: 'گمرکات ۶گانه، صادرات، واردات و ترخیص',
    route: '/dashboard/overview#customs',
    icon: Truck,
    agentBadge: 'AGT-08',
    alertBadge: '۶ گمرک',
    category: 'sovereign',
  },
  {
    id: 'labor',
    number: '۹',
    titleFa: 'اشتغال، بازار کار و سامانه رصد',
    route: '/dashboard/overview#labor',
    icon: Users,
    agentBadge: 'AGT-09',
    alertBadge: '۱۸۰K شغل',
    category: 'sovereign',
  },
  {
    id: 'energy',
    number: '۱۰',
    titleFa: 'ناترازی انرژی، برق منطقه‌ای و ۵ سد آب',
    route: '/dashboard/overview#energy',
    icon: Zap,
    agentBadge: 'AGT-10',
    alertBadge: '۵ سد آب',
    category: 'sovereign',
  },
  {
    id: 'gis_warroom',
    number: '۱۱',
    titleFa: 'نقشه ماهواره‌ای ۳D و اتاق جنگ GIS',
    route: '/dashboard/overview#gis',
    icon: Globe,
    agentBadge: 'AGT-01',
    alertBadge: '۳D GIS',
    category: 'sovereign',
  },
];

export const OPERATIONAL_DESKS = [
  {
    id: 'live-pulse',
    titleFa: 'نبض لحظه‌ای ۲۰ کالای اساسی',
    route: '/dashboard/live-pulse',
    icon: Flame,
    badge: 'زنده',
  },
  {
    id: 'directives',
    titleFa: 'کارتابل مصوبات و بخشنامه‌ها',
    route: '/dashboard/directives',
    icon: FileText,
    badge: 'اقدام',
  },
  {
    id: 'counties-gis',
    titleFa: 'میز کار مقایسه ۱۶ شهرستان',
    route: '/dashboard/counties-gis',
    icon: MapPin,
    badge: 'GIS',
  },
  {
    id: 'monthly-reports',
    titleFa: 'گزارش‌های جامع دوره‌ای فرمانداران',
    route: '/dashboard/monthly-reports',
    icon: FileSpreadsheet,
    badge: '۱۶ شهرستان',
  },
];

export const AI_SCENARIO_DESKS = [
  {
    id: 'scenario-war-room',
    titleFa: 'اتاق جنگ و شبیه‌ساز What-If',
    route: '/ai-center/scenario-war-room',
    icon: Sliders,
    badge: '۱۲ اهرم',
  },
  {
    id: 'agent-council',
    titleFa: 'صحن مناظره و اجماع چندعامله',
    route: '/ai-center/agent-council',
    icon: BrainCircuit,
    badge: '۱۰ ایجنت',
  },
];

export const SYSTEM_DESKS = [
  {
    id: 'alerts-reports',
    titleFa: 'هشدارها و بولتن صبحگاهی استاندار',
    route: '/system/alerts-reports',
    icon: Bell,
    badge: 'آلارم',
  },
  {
    id: 'profile-settings-help',
    titleFa: 'تنظیمات و هویت ۳۲ مقام استان',
    route: '/system/profile-settings-help',
    icon: Settings,
    badge: '۳۲ مقام',
  },
];

interface SidebarProps {
  isOpen: boolean;
  onClose: () => void;
}

export function Sidebar({ isOpen, onClose }: SidebarProps) {
  const pathname = usePathname();
  const router = useRouter();
  const { activeModuleTab, setActiveModuleTab, sidebarCollapsed, setSidebarCollapsed } = useCommand();

  const isCollapsed = sidebarCollapsed;
  const setIsCollapsed = setSidebarCollapsed;
  const [searchQuery, setSearchQuery] = useState('');

  // Sync hash on client
  useEffect(() => {
    if (typeof window === 'undefined') return;

    const syncHash = () => {
      const hash = window.location.hash.replace('#', '');
      if (hash && pathname.includes('/dashboard/overview')) {
        setActiveModuleTab(hash);
      }
    };

    syncHash();
    window.addEventListener('hashchange', syncHash);
    return () => window.removeEventListener('hashchange', syncHash);
  }, [pathname, setActiveModuleTab]);

  const handleSovereignClick = (mod: SovereignSidebarModule) => {
    const targetHash = mod.id === 'gis_warroom' ? 'gis' : mod.id;
    setActiveModuleTab(targetHash);

    router.push(`/dashboard/overview#${targetHash}`);

    if (typeof window !== 'undefined' && window.innerWidth < 1024) {
      onClose();
    }
  };

  const handleNavigate = (route: string) => {
    router.push(route);
    if (typeof window !== 'undefined' && window.innerWidth < 1024) {
      onClose();
    }
  };

  const filteredModules = SOVEREIGN_11_MODULES.filter(
    (m) =>
      !searchQuery.trim() ||
      m.titleFa.includes(searchQuery) ||
      m.agentBadge.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <>
      {/* Mobile Backdrop */}
      {isOpen && (
        <div
          onClick={onClose}
          className="fixed inset-0 bg-black/60 backdrop-blur-sm z-40 lg:hidden transition-opacity duration-300"
          aria-hidden="true"
        />
      )}

      {/* Right-Docked Smooth Sidebar */}
      <aside
        className={`glass-panel border-l border-[var(--lg-border)] h-full flex flex-col justify-between transition-[width,transform] duration-300 ease-in-out shrink-0 select-none overflow-x-hidden ${
          isCollapsed ? 'lg:w-[76px]' : 'lg:w-[280px]'
        } ${
          isOpen
            ? 'fixed inset-y-0 right-0 z-50 shadow-2xl flex w-[280px] max-w-[85vw]'
            : 'hidden lg:flex relative z-30'
        }`}
      >
        {/* Toggle Collapse Button on LEFT BORDER for Desktop */}
        <button
          onClick={() => setIsCollapsed((prev) => !prev)}
          className="hidden lg:flex absolute -left-3.5 top-5 z-40 w-7 h-7 rounded-full bg-[var(--lg-panel)] border border-[var(--lg-border-strong)] items-center justify-center text-[var(--lg-ink)] hover:text-cyan-400 hover:border-cyan-400 shadow-md transition-colors cursor-pointer"
          title={isCollapsed ? 'گسترش سایدبار' : 'جمع‌کردن سایدبار'}
          aria-label="تغییر عرض سایدبار"
        >
          {isCollapsed ? (
            <ChevronLeft className="w-4 h-4" />
          ) : (
            <ChevronRight className="w-4 h-4" />
          )}
        </button>

        {/* Top: Header & Search */}
        <div className="p-3 border-b border-[var(--lg-border)] shrink-0">
          <div className="flex items-center justify-between">
            <Link
              href="/dashboard/overview"
              className="flex items-center gap-2.5 overflow-hidden group py-0.5 whitespace-nowrap"
            >
              <TehranGovernorateLogo size="sm" />
              {!isCollapsed && (
                <div className="text-right overflow-hidden whitespace-nowrap">
                  <div className="text-xs font-black text-[var(--lg-ink)] tracking-tight truncate group-hover:text-cyan-400 transition-colors">
                    سکوی تصمیم‌یار استاندار
                  </div>
                  <div className="text-[10px] text-[var(--lg-muted)] truncate">
                    استانداری تهران
                  </div>
                </div>
              )}
            </Link>

            <button
              onClick={onClose}
              aria-label="بستن سایدبار"
              className="lg:hidden text-[var(--lg-muted)] hover:text-[var(--lg-ink)] p-1 rounded-lg"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Search Box when Expanded */}
          {!isCollapsed && (
            <div className="relative mt-2.5">
              <Search className="w-3.5 h-3.5 text-[var(--lg-muted)] absolute right-2.5 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="جستجوی بخش‌های کلان..."
                className="w-full glass-input pr-8 pl-2.5 py-1 text-xs text-[var(--lg-ink)] placeholder-[var(--lg-muted)] focus:outline-none focus:border-cyan-500"
              />
            </div>
          )}
        </div>

        {/* Scrollable Navigation Body */}
        <div className="flex-1 overflow-y-auto px-2 py-2 space-y-4 text-xs scrollbar-thin">
          {/* Group 1: 11 Sovereign Modules */}
          <div className="space-y-1">
            {!isCollapsed && (
              <div className="text-[10.5px] font-bold text-[var(--lg-muted)] px-2 py-1 flex items-center justify-between">
                <span>۱۱ حوزه کلان اقتصادی استان</span>
                <span className="font-mono text-[9.5px] bg-cyan-500/10 text-cyan-400 px-1.5 py-0.2 rounded">
                  ۱۱ ماژول
                </span>
              </div>
            )}

            {filteredModules.map((mod) => {
              const Icon = mod.icon;
              const targetHash = mod.id === 'gis_warroom' ? 'gis' : mod.id;
              const isOverviewPage = pathname === '/dashboard/overview' || pathname === '/dashboard';
              const isActive =
                isOverviewPage &&
                (activeModuleTab === targetHash || (targetHash === 'gis' && activeModuleTab === 'warroom'));

              return (
                <button
                  key={mod.id}
                  onClick={() => handleSovereignClick(mod)}
                  title={isCollapsed ? mod.titleFa : undefined}
                  className={`w-full flex items-center rounded-xl p-2 transition-all text-right ${
                    isCollapsed ? 'justify-center' : 'justify-between'
                  } ${
                    isActive
                      ? 'bg-cyan-600 text-white font-bold shadow-md shadow-cyan-900/30'
                      : 'text-[var(--lg-secondary)] hover:bg-[var(--lg-hover)] hover:text-[var(--lg-ink)]'
                  }`}
                >
                  <div className="flex items-center gap-2.5 truncate whitespace-nowrap">
                    <Icon className="w-4 h-4 shrink-0" />
                    {!isCollapsed && (
                      <span className="truncate text-[12px] whitespace-nowrap">
                        {mod.number}. {mod.titleFa}
                      </span>
                    )}
                  </div>

                  {!isCollapsed && mod.alertBadge && (
                    <span
                      className={`text-[9.5px] px-1.5 py-0.2 rounded font-mono font-bold shrink-0 ${
                        isActive
                          ? 'bg-white/20 text-white'
                          : 'bg-black/5 dark:bg-white/5 text-[var(--lg-muted)]'
                      }`}
                    >
                      {mod.alertBadge}
                    </span>
                  )}
                </button>
              );
            })}
          </div>

          {/* Group 2: Operational Desks */}
          <div className="space-y-1 pt-2 border-t border-[var(--lg-border)]">
            {!isCollapsed && (
              <div className="text-[10.5px] font-bold text-[var(--lg-muted)] px-2 py-1 whitespace-nowrap">
                میزهای کار تخصصی و پایش
              </div>
            )}

            {OPERATIONAL_DESKS.map((item) => {
              const Icon = item.icon;
              const isActive = pathname === item.route;

              return (
                <button
                  key={item.id}
                  onClick={() => handleNavigate(item.route)}
                  title={isCollapsed ? item.titleFa : undefined}
                  className={`w-full flex items-center rounded-xl p-2 transition-all text-right ${
                    isCollapsed ? 'justify-center' : 'justify-between'
                  } ${
                    isActive
                      ? 'bg-cyan-600 text-white font-bold shadow-md shadow-cyan-900/30'
                      : 'text-[var(--lg-secondary)] hover:bg-[var(--lg-hover)] hover:text-[var(--lg-ink)]'
                  }`}
                >
                  <div className="flex items-center gap-2.5 truncate whitespace-nowrap">
                    <Icon className="w-4 h-4 shrink-0 text-amber-500" />
                    {!isCollapsed && (
                      <span className="truncate text-[12px] whitespace-nowrap">{item.titleFa}</span>
                    )}
                  </div>
                  {!isCollapsed && (
                    <span className="text-[9.5px] px-1.5 py-0.2 rounded bg-amber-500/10 text-amber-500 font-bold shrink-0">
                      {item.badge}
                    </span>
                  )}
                </button>
              );
            })}
          </div>

          {/* Group 3: AI & Scenario Center */}
          <div className="space-y-1 pt-2 border-t border-[var(--lg-border)]">
            {!isCollapsed && (
              <div className="text-[10.5px] font-bold text-[var(--lg-muted)] px-2 py-1 flex items-center justify-between whitespace-nowrap">
                <span>مرکز هوش مصنوعی و سناریو</span>
                <Sparkles className="w-3 h-3 text-cyan-400" />
              </div>
            )}

            {AI_SCENARIO_DESKS.map((item) => {
              const Icon = item.icon;
              const isActive = pathname === item.route;

              return (
                <button
                  key={item.id}
                  onClick={() => handleNavigate(item.route)}
                  title={isCollapsed ? item.titleFa : undefined}
                  className={`w-full flex items-center rounded-xl p-2 transition-all text-right ${
                    isCollapsed ? 'justify-center' : 'justify-between'
                  } ${
                    isActive
                      ? 'bg-gradient-to-l from-cyan-600 to-sky-700 text-white font-bold shadow-md'
                      : 'text-[var(--lg-secondary)] hover:bg-[var(--lg-hover)] hover:text-[var(--lg-ink)]'
                  }`}
                >
                  <div className="flex items-center gap-2.5 truncate whitespace-nowrap">
                    <Icon className="w-4 h-4 shrink-0 text-cyan-400" />
                    {!isCollapsed && (
                      <span className="truncate text-[12px] whitespace-nowrap">{item.titleFa}</span>
                    )}
                  </div>
                  {!isCollapsed && (
                    <span className="text-[9.5px] px-1.5 py-0.2 rounded bg-cyan-500/15 text-cyan-400 font-bold shrink-0">
                      {item.badge}
                    </span>
                  )}
                </button>
              );
            })}
          </div>

          {/* Group 4: System & Governance */}
          <div className="space-y-1 pt-2 border-t border-[var(--lg-border)]">
            {!isCollapsed && (
              <div className="text-[10.5px] font-bold text-[var(--lg-muted)] px-2 py-1 whitespace-nowrap">
                مدیریت سیستم و نظارت
              </div>
            )}

            {SYSTEM_DESKS.map((item) => {
              const Icon = item.icon;
              const isActive = pathname === item.route;

              return (
                <button
                  key={item.id}
                  onClick={() => handleNavigate(item.route)}
                  title={isCollapsed ? item.titleFa : undefined}
                  className={`w-full flex items-center rounded-xl p-2 transition-all text-right ${
                    isCollapsed ? 'justify-center' : 'justify-between'
                  } ${
                    isActive
                      ? 'bg-cyan-600 text-white font-bold shadow-md'
                      : 'text-[var(--lg-secondary)] hover:bg-[var(--lg-hover)] hover:text-[var(--lg-ink)]'
                  }`}
                >
                  <div className="flex items-center gap-2.5 truncate whitespace-nowrap">
                    <Icon className="w-4 h-4 shrink-0 text-emerald-500" />
                    {!isCollapsed && (
                      <span className="truncate text-[12px] whitespace-nowrap">{item.titleFa}</span>
                    )}
                  </div>
                  {!isCollapsed && (
                    <span className="text-[9.5px] px-1.5 py-0.2 rounded bg-emerald-500/10 text-emerald-500 font-bold shrink-0">
                      {item.badge}
                    </span>
                  )}
                </button>
              );
            })}
          </div>
        </div>

        {/* Bottom: Official Seal */}
        <div className="p-3 border-t border-[var(--lg-border)]">
          {!isCollapsed ? (
            <div className="p-2 rounded-xl glass-card text-right space-y-1">
              <div className="flex items-center justify-between text-[10.5px]">
                <span className="font-bold text-[var(--lg-ink)]">
                  استانداری تهران · ۱۴۰۵
                </span>
                <span className="w-2 h-2 rounded-full bg-emerald-500 radar-glow inline-block" />
              </div>
              <div className="text-[9.5px] text-[var(--lg-muted)] leading-tight">
                طراحی و هوشمندسازی: <strong className="text-[var(--lg-cyan)]">شبکه هوشمند ابتکار ویستا</strong>
              </div>
            </div>
          ) : (
            <div
              className="flex justify-center py-1"
              title="استانداری تهران — شرکت شبکه هوشمند ابتکار ویستا"
            >
              <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 radar-glow inline-block" />
            </div>
          )}
        </div>
      </aside>
    </>
  );
}

export default Sidebar;
