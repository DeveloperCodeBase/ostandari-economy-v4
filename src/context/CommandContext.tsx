'use client';

import React, { createContext, useContext, useState, useEffect } from 'react';
import { OfficialRole, AlertItem, CountyData, KPICardData } from '@/src/types/economy';
import { OFFICIAL_ROLES } from '@/src/data/rolesAndOfficials';
import { TEHRAN_16_COUNTIES, EXECUTIVE_OVERVIEW_KPIS } from '@/src/data/tehranMasterData';

interface CommandContextType {
  activeRole: OfficialRole;
  setActiveRole: (role: OfficialRole) => void;
  selectedCountyId: string | null;
  setSelectedCountyId: (id: string | null) => void;
  selectedCounty: CountyData | null;
  isCopilotOpen: boolean;
  setIsCopilotOpen: (open: boolean) => void;
  isCommandPaletteOpen: boolean;
  setIsCommandPaletteOpen: (open: boolean) => void;
  provenanceItem: KPICardData | null;
  setProvenanceItem: (item: KPICardData | null) => void;
  microAgentItem: { kpi: KPICardData; mode: 'why' | 'forecast' | 'simulate' } | null;
  setMicroAgentItem: (item: { kpi: KPICardData; mode: 'why' | 'forecast' | 'simulate' } | null) => void;
  alertThresholds: {
    minWheatReserveDays: number;
    maxWeeklyPriceFluctuationPercent: number;
    maxCustomsClearanceDays: number;
    maxUnemploymentRatePercent: number;
  };
  setAlertThresholds: React.Dispatch<React.SetStateAction<{
    minWheatReserveDays: number;
    maxWeeklyPriceFluctuationPercent: number;
    maxCustomsClearanceDays: number;
    maxUnemploymentRatePercent: number;
  }>>;
  alerts: AlertItem[];
  setAlerts: React.Dispatch<React.SetStateAction<AlertItem[]>>;
  dismissAlert: (id: string) => void;
  pinnedKpiIds: string[];
  togglePinKpi: (id: string) => void;
  videoWallMode: boolean;
  setVideoWallMode: (mode: boolean) => void;
  liveResearchLoading: boolean;
  liveResearchResult: {
    summary: string;
    groundingSources: Array<{ title: string; uri: string }>;
    timestamp: string;
  } | null;
  runLiveResearch: (topic?: string) => Promise<void>;
  currentCounty: string;
  isOnline: boolean;
  activeModuleTab: string;
  setActiveModuleTab: (tab: string) => void;
  isHelpModalOpen: boolean;
  setIsHelpModalOpen: (open: boolean) => void;
  openHelpModal: (topic?: string) => void;
  helpModalTopic: string | null;
  openCopilot: (agentCode?: string) => void;
  openProvenance: (kpiIdOrItem?: string | KPICardData) => void;
  openMicroAgent: (kpiIdOrItem?: string | KPICardData, mode?: 'why' | 'forecast' | 'simulate') => void;
  theme: 'dark' | 'light';
  toggleTheme: () => void;
  sidebarCollapsed: boolean;
  setSidebarCollapsed: React.Dispatch<React.SetStateAction<boolean>>;
  toggleSidebarCollapse: () => void;
}

const INITIAL_ALERTS: AlertItem[] = [
  {
    id: 'alt-01',
    level: 1,
    title: 'انحراف قیمتی گوشت گرم در شهرستان‌های بهارستان و قدس',
    category: 'تنظیم بازار',
    countyId: 'baharestan',
    timestamp: '۱۰ دقیقه پیش',
    description: 'شکاف قیمتی گوشت گرم در بهارستان به ۴۸٪ بالای نرخ مصوب رسیده است. نیاز به تزریق فوری گوشت منجمد و تشدید گشت‌های تعزیرات.',
    suggestedAction: 'تخصیص سهمیه اضطراری ۴۰ تن گوشت گرم وارداتی به میادین میوه و تره‌بار بهارستان و قدس',
    agentCode: 'AGT-05',
    status: 'active',
  },
  {
    id: 'alt-02',
    level: 2,
    title: 'ناترازی فیدر برق شهرک صنعتی عباس‌آباد پاکدشت',
    category: 'انرژی و صنعت',
    countyId: 'pakdasht',
    timestamp: '۴۵ دقیقه پیش',
    description: 'پیک تقاضای برق شهرک عباس‌آباد از ظرفیت ایستگاه فرعی عبور کرده است. خطر اعمال محدودیت اضطراری بر صنایع فلزی.',
    suggestedAction: 'فعال‌سازی دیزل‌ژنراتورهای خودتأمین صنایع و انتقال ۲۰ مگاوات بار به پست خوارزمی',
    agentCode: 'AGT-10',
    status: 'active',
  },
  {
    id: 'alt-03',
    level: 2,
    title: 'کندی ترخیص نهاده دامی (کنجاله سویا) در گمرک شهریار',
    category: 'گمرک و تجارت',
    countyId: 'shahriar',
    timestamp: '۱ ساعت پیش',
    description: 'توقف ۱۲ کانتینر کنجاله سویا به دلیل تاخیر در استعلام دامپزشکی؛ ریسک افزایش هزینه تمام‌شده مرغداری‌های ملارد.',
    suggestedAction: 'هماهنگی فوری با ناظر گمرکات جهت ترخیص با اخذ تعهد آزمایشگاهی ۷۲ساعته',
    agentCode: 'AGT-08',
    status: 'active',
  },
  {
    id: 'alt-04',
    level: 3,
    title: 'تحقق ۱۱۷٪ درآمدهای موضوع ماده ۳۷ در خزانه استان تهران',
    category: 'خزانه و دارایی',
    timestamp: '۳ ساعت پیش',
    description: 'واریز ۲۵ همت عوارض ماده ۳۷ به خزانه معین استان تهران؛ مازاد اعتبار قابل تخصیص به پروژه‌های آبرسانی دشت ورامین.',
    suggestedAction: 'ارسال نامه به سازمان مدیریت و برنامه‌ریزی جهت مبادله موافقت‌نامه احیا دشت ورامین',
    agentCode: 'AGT-02',
    status: 'active',
  },
];

const CommandContext = createContext<CommandContextType | undefined>(undefined);

export function CommandProvider({ children }: { children: React.ReactNode }) {
  const [activeRole, setActiveRoleState] = useState<OfficialRole>(() => {
    if (typeof window !== 'undefined') {
      try {
        const storedRole = localStorage.getItem('tehran_command_role');
        if (storedRole) {
          const found = OFFICIAL_ROLES.find((r) => r.id === storedRole);
          if (found) return found;
        }
      } catch {}
    }
    return OFFICIAL_ROLES[0];
  });

  const [selectedCountyId, setSelectedCountyId] = useState<string | null>(() => {
    if (typeof window !== 'undefined') {
      try {
        const storedCounty = localStorage.getItem('tehran_command_county');
        if (storedCounty && storedCounty !== 'all') return storedCounty;
      } catch {}
    }
    return null;
  });
  const [isCopilotOpen, setIsCopilotOpen] = useState(false);
  const [isCommandPaletteOpen, setIsCommandPaletteOpen] = useState(false);
  const [provenanceItem, setProvenanceItem] = useState<KPICardData | null>(null);
  const [microAgentItem, setMicroAgentItem] = useState<{ kpi: KPICardData; mode: 'why' | 'forecast' | 'simulate' } | null>(null);
  const [alerts, setAlerts] = useState<AlertItem[]>(INITIAL_ALERTS);
  const [pinnedKpiIds, setPinnedKpiIds] = useState<string[]>(['gdp_national_share', 'public_revenue_5m', 'wheat_reserve_days']);
  const [videoWallMode, setVideoWallMode] = useState(false);
  const [activeModuleTab, setActiveModuleTabState] = useState<string>('overview');
  const [isHelpModalOpen, setIsHelpModalOpen] = useState(false);
  const [helpModalTopic, setHelpModalTopic] = useState<string | null>(null);

  const [sidebarCollapsed, setSidebarCollapsed] = useState<boolean>(() => {
    if (typeof window !== 'undefined') {
      try {
        return localStorage.getItem('tehran-sidebar-collapsed') === 'true';
      } catch {}
    }
    return false;
  });

  const toggleSidebarCollapse = () => {
    setSidebarCollapsed((prev) => {
      const next = !prev;
      try {
        localStorage.setItem('tehran-sidebar-collapsed', String(next));
      } catch {}
      return next;
    });
  };

  const [theme, setTheme] = useState<'dark' | 'light'>(() => {
    if (typeof window !== 'undefined') {
      try {
        const saved = localStorage.getItem('tehran-econ-theme');
        return saved === 'light' ? 'light' : 'dark';
      } catch {}
    }
    return 'dark';
  });

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
    if (theme === 'dark') {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
    try {
      localStorage.setItem('tehran-econ-theme', theme);
    } catch {}
  }, [theme]);

  const toggleTheme = () => {
    setTheme((prev) => (prev === 'dark' ? 'light' : 'dark'));
  };

  const setActiveModuleTab = (tab: string) => {
    setActiveModuleTabState(tab);
    if (typeof window !== 'undefined') {
      try {
        window.location.hash = tab;
      } catch {}
    }
  };

  const openHelpModal = (topic?: string) => {
    setHelpModalTopic(topic || null);
    setIsHelpModalOpen(true);
  };
  
  const [alertThresholds, setAlertThresholds] = useState({
    minWheatReserveDays: 30,
    maxWeeklyPriceFluctuationPercent: 10,
    maxCustomsClearanceDays: 7,
    maxUnemploymentRatePercent: 8,
  });

  const [liveResearchLoading, setLiveResearchLoading] = useState(false);
  const [liveResearchResult, setLiveResearchResult] = useState<{
    summary: string;
    groundingSources: Array<{ title: string; uri: string }>;
    timestamp: string;
  } | null>(null);

  const setActiveRole = (role: OfficialRole) => {
    setActiveRoleState(role);
    if (role.countyId) {
      setSelectedCountyId(role.countyId);
    }
    try {
      localStorage.setItem('tehran_command_role', role.id);
    } catch {}
  };

  const handleSetSelectedCountyId = (id: string | null) => {
    setSelectedCountyId(id);
    try {
      localStorage.setItem('tehran_command_county', id || 'all');
    } catch {}
  };

  const dismissAlert = (id: string) => {
    setAlerts((prev) => prev.filter((a) => a.id !== id));
  };

  const togglePinKpi = (id: string) => {
    setPinnedKpiIds((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
    );
  };

  const runLiveResearch = async (topic?: string) => {
    setLiveResearchLoading(true);
    try {
      const res = await fetch('/api/gemini/research', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          topic: topic || 'آخرین وضعیت اقتصادی، بازار و تورم استان تهران',
          countyId: selectedCountyId,
        }),
      });
      const data = await res.json();
      setLiveResearchResult(data);
    } catch (err) {
      console.error(err);
    } finally {
      setLiveResearchLoading(false);
    }
  };

  // Keyboard shortcut listeners (Ctrl+K for palette, Ctrl+J for copilot)
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.ctrlKey || e.metaKey) && e.key === 'k') {
        e.preventDefault();
        setIsCommandPaletteOpen((prev) => !prev);
      }
      if ((e.ctrlKey || e.metaKey) && e.key === 'j') {
        e.preventDefault();
        setIsCopilotOpen((prev) => !prev);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  const selectedCounty = selectedCountyId
    ? TEHRAN_16_COUNTIES.find((c) => c.id === selectedCountyId) || null
    : null;

  const [isOnline, setIsOnline] = useState(true);

  useEffect(() => {
    const handleOnline = () => setIsOnline(true);
    const handleOffline = () => setIsOnline(false);
    window.addEventListener('online', handleOnline);
    window.addEventListener('offline', handleOffline);
    return () => {
      window.removeEventListener('online', handleOnline);
      window.removeEventListener('offline', handleOffline);
    };
  }, []);

  const openCopilot = (_agentCode?: string) => {
    setIsCopilotOpen(true);
  };

  const openProvenance = (kpiIdOrItem?: string | KPICardData) => {
    if (typeof kpiIdOrItem === 'string') {
      const found = EXECUTIVE_OVERVIEW_KPIS.find((k) => k.id === kpiIdOrItem);
      if (found) setProvenanceItem(found);
      else setProvenanceItem(EXECUTIVE_OVERVIEW_KPIS[0]);
    } else if (kpiIdOrItem) {
      setProvenanceItem(kpiIdOrItem);
    } else {
      setProvenanceItem(EXECUTIVE_OVERVIEW_KPIS[0]);
    }
  };

  const openMicroAgent = (kpiIdOrItem?: string | KPICardData, mode: 'why' | 'forecast' | 'simulate' = 'why') => {
    const kpi = typeof kpiIdOrItem === 'string'
      ? (EXECUTIVE_OVERVIEW_KPIS.find((k) => k.id === kpiIdOrItem) || EXECUTIVE_OVERVIEW_KPIS[0])
      : (kpiIdOrItem || EXECUTIVE_OVERVIEW_KPIS[0]);
    setMicroAgentItem({ kpi, mode });
  };

  return (
    <CommandContext.Provider
      value={{
        activeRole,
        setActiveRole,
        selectedCountyId,
        setSelectedCountyId: handleSetSelectedCountyId,
        selectedCounty,
        isCopilotOpen,
        setIsCopilotOpen,
        isCommandPaletteOpen,
        setIsCommandPaletteOpen,
        provenanceItem,
        setProvenanceItem,
        microAgentItem,
        setMicroAgentItem,
        alertThresholds,
        setAlertThresholds,
        alerts,
        setAlerts,
        dismissAlert,
        pinnedKpiIds,
        togglePinKpi,
        videoWallMode,
        setVideoWallMode,
        liveResearchLoading,
        liveResearchResult,
        runLiveResearch,
        currentCounty: selectedCountyId || 'all',
        isOnline,
        activeModuleTab,
        setActiveModuleTab,
        isHelpModalOpen,
        setIsHelpModalOpen,
        openHelpModal,
        helpModalTopic,
        openCopilot,
        openProvenance,
        openMicroAgent,
        theme,
        toggleTheme,
        sidebarCollapsed,
        setSidebarCollapsed,
        toggleSidebarCollapse,
      }}
    >
      {children}
    </CommandContext.Provider>
  );
}

export function useCommand() {
  const context = useContext(CommandContext);
  if (!context) {
    throw new Error('useCommand must be used within a CommandProvider');
  }
  return context;
}
