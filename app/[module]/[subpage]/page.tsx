'use client';

import React, { use, useMemo, useState } from 'react';
import { motion } from 'motion/react';
import Link from 'next/link';
import {
  TrendingUp,
  Sparkles,
  ArrowRight,
  Database,
  Building2,
  Calendar,
  Layers,
  MapPin,
  CheckCircle2,
  AlertTriangle,
  Download,
  Filter,
  BarChart3,
  Search,
  ExternalLink,
  ShieldCheck,
  ChevronLeft,
  Sliders,
  Cpu,
} from 'lucide-react';
import { useCommand } from '@/src/context/CommandContext';
import { TEHRAN_MACRO_MODULES } from '@/src/data/modulesAndRoutes';
import { TEHRAN_AI_AGENTS } from '@/src/data/tehranMasterData';
import { TEHRAN_DOMAIN_DATA_REPO, DomainModuleData } from '@/src/data/domainDataRepo';
import { toPersianDigits, formatPersianNumber } from '@/src/utils/formatters';
import InPageAgentPanel from '@/src/components/ai/InPageAgentPanel';
import { GlassyCarousel } from '@/src/components/shared/GlassyCarousel';
import {
  CyberAreaChart,
  CyberBarChart,
} from '@/src/components/charts/InteractiveCharts';

interface PageProps {
  params: Promise<{
    module: string;
    subpage: string;
  }>;
}

export default function DynamicSubModulePage({ params }: PageProps) {
  const resolvedParams = use(params);
  const { module: moduleSlug, subpage: subpageSlug } = resolvedParams;
  const currentPath = `/${moduleSlug}/${subpageSlug}`;

  const { openCopilot, openMicroAgent, openProvenance } = useCommand();
  const [searchTerm, setSearchTerm] = useState('');
  const [activeScenarioId, setActiveScenarioId] = useState<string | null>(null);

  // Find module & subpage definition from routing tree
  const currentModule = useMemo(() => {
    return (
      TEHRAN_MACRO_MODULES.find(
        (m) =>
          m.id === moduleSlug ||
          m.subModules.some((s) => s.route.startsWith(`/${moduleSlug}`) || s.id === subpageSlug)
      ) || TEHRAN_MACRO_MODULES[0]
    );
  }, [moduleSlug, subpageSlug]);

  const currentSubpage = useMemo(() => {
    for (const mod of TEHRAN_MACRO_MODULES) {
      const found = mod.subModules.find(
        (s) => s.route === currentPath || s.id === subpageSlug || s.route.endsWith(subpageSlug)
      );
      if (found) return found;
    }
    return currentModule?.subModules[0] || null;
  }, [currentPath, subpageSlug, currentModule]);

  // Resolve domain data from TEHRAN_DOMAIN_DATA_REPO
  const domainData: DomainModuleData = useMemo(() => {
    // Map slugs to domain repository keys
    const directKey = moduleSlug;
    if (TEHRAN_DOMAIN_DATA_REPO[directKey]) {
      return TEHRAN_DOMAIN_DATA_REPO[directKey];
    }
    if (directKey === 'energy') return TEHRAN_DOMAIN_DATA_REPO['resilience'];
    if (directKey === 'risk') return TEHRAN_DOMAIN_DATA_REPO['resilience'];
    if (directKey === 'land') return TEHRAN_DOMAIN_DATA_REPO['spatial'];
    if (directKey === 'admin') return TEHRAN_DOMAIN_DATA_REPO['governorate'];
    return TEHRAN_DOMAIN_DATA_REPO['dashboard'] || Object.values(TEHRAN_DOMAIN_DATA_REPO)[0];
  }, [moduleSlug]);

  // Assigned AI agent
  const assignedAgent = useMemo(() => {
    const code = currentSubpage?.agentCode || domainData.agentCode || 'AGT-01';
    return (
      TEHRAN_AI_AGENTS.find((a) => a.code === code || a.id === code) ||
      TEHRAN_AI_AGENTS[0]
    );
  }, [currentSubpage, domainData]);

  const pageTitle = currentSubpage?.titleFa || domainData.titleFa;
  const pageDescription =
    currentSubpage?.description ||
    domainData.headlineSummary ||
    'رصد آنلاین شاخص‌ها، تله‌متری میدانی و تحلیل سناریوهای تصمیم‌یار استان تهران.';

  // Filter table rows based on search input
  const filteredRows = useMemo(() => {
    if (!searchTerm.trim()) return domainData.tableRows;
    const q = searchTerm.trim().toLowerCase();
    return domainData.tableRows.filter(
      (r) =>
        r.title.toLowerCase().includes(q) ||
        r.category.toLowerCase().includes(q) ||
        r.countyOrZone.toLowerCase().includes(q) ||
        r.detail.toLowerCase().includes(q)
    );
  }, [domainData.tableRows, searchTerm]);

  return (
    <div className="space-y-6">
      {/* 1. Top AI Analyst Panel - Specialized per domain */}
      <InPageAgentPanel
        analyst={{
          id: assignedAgent.id || assignedAgent.code,
          name: assignedAgent.name || assignedAgent.nameFa,
          role: assignedAgent.role || assignedAgent.titleFa,
          analysis: `تحلیل هوشمند رصدخانه در حوزه «${pageTitle}»: ${domainData.headlineSummary} ضریب همبستگی داده‌های ثبتی با برآوردهای میدانی ۹۶.۴٪ است.`,
          recommendation: `اولویت اجرایی استاندار: ${domainData.policyPriority}`,
          status: 'ready',
        }}
        kpiIds={[domainData.metrics[0]?.key, domainData.metrics[1]?.key]}
      />

      {/* 2. Glassmorphic Hero & Subpage Navigation Breadcrumb */}
      <div className="glass-panel p-6 shadow-xl relative overflow-hidden border border-[var(--lg-border)]">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 text-xs text-[var(--lg-muted)] mb-2 font-medium">
              <Link href="/dashboard/overview" className="hover:text-[var(--lg-cyan)] transition-colors">
                سکوی تصمیم‌یار تهران
              </Link>
              <span>/</span>
              <span className="text-[var(--lg-secondary)]">{currentModule.titleFa}</span>
              <span>/</span>
              <span className="text-[var(--lg-accent)] font-bold">{pageTitle}</span>
            </div>

            <div className="flex items-center gap-3">
              <h1 className="text-xl sm:text-2xl font-black text-[var(--lg-ink)] flex items-center gap-2">
                <span>{pageTitle}</span>
              </h1>
              <span className="px-2.5 py-0.5 rounded-full text-[11px] font-mono font-bold bg-cyan-500/15 text-cyan-400 border border-cyan-500/30">
                {assignedAgent.code}
              </span>
            </div>

            <p className="text-xs sm:text-sm text-[var(--lg-muted)] mt-2 max-w-3xl leading-relaxed">
              {pageDescription}
            </p>
          </div>

          <div className="flex items-center gap-2 shrink-0">
            <button
              onClick={() => openCopilot(assignedAgent.id || assignedAgent.code)}
              className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-gradient-to-l from-cyan-600 via-sky-600 to-blue-700 hover:opacity-95 text-white text-xs font-bold shadow-lg shadow-cyan-900/30 transition-all active:scale-95"
            >
              <Sparkles className="w-4 h-4" />
              <span>مشاوره هوشمند با {assignedAgent.name || assignedAgent.nameFa}</span>
            </button>
          </div>
        </div>

        {/* 4 Unique Bespoke KPIs for this domain */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 mt-6 pt-5 border-t border-[var(--lg-border)]">
          {domainData.metrics.map((m, idx) => (
            <div
              key={m.key || idx}
              className="glass-card p-3.5 space-y-1.5 border border-[var(--lg-border)]"
            >
              <div className="flex items-center justify-between text-[11px] text-[var(--lg-muted)]">
                <span className="truncate">{m.label}</span>
                <span className="text-[9px] font-mono px-1.5 py-0.2 rounded bg-white/10 dark:bg-black/20 text-[var(--lg-cyan)]">
                  سطح {m.level}
                </span>
              </div>
              <div className="flex items-baseline gap-1.5">
                <span className="text-lg sm:text-xl font-black font-mono text-[var(--lg-ink)]">
                  {toPersianDigits(m.value)}
                </span>
                <span className="text-[11px] text-[var(--lg-muted)] font-medium">{m.unit}</span>
              </div>
              <div className="flex items-center justify-between text-[10px] pt-1 border-t border-[var(--lg-border)] text-[var(--lg-muted)]">
                <span className="truncate">{m.subValue || m.source}</span>
                {m.changePercent !== undefined && (
                  <span
                    className={`font-mono font-bold ${
                      (m.changePercent > 0 && m.isPositiveGood) || (m.changePercent < 0 && !m.isPositiveGood)
                        ? 'text-emerald-500'
                        : 'text-rose-500'
                    }`}
                  >
                    {m.changePercent > 0 ? '+' : ''}
                    {toPersianDigits(m.changePercent)}٪
                  </span>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* 3. Glassy 3D Carousel (User requested showcase) */}
      <div className="space-y-3">
        <div className="flex items-center justify-between px-1">
          <div className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-cyan-400 radar-glow inline-block" />
            <h2 className="text-sm font-bold text-[var(--lg-ink)]">
              بولتن تحلیلی و کانون‌های تصمیم‌سازی {pageTitle}
            </h2>
          </div>
          <span className="text-[11px] text-[var(--lg-muted)] font-medium">
            رویدادها و شاخص‌های استراتژیک استان
          </span>
        </div>

        <GlassyCarousel items={domainData.carouselHighlights} />
      </div>

      {/* 4. Chart & What-If Policy Simulation Zone */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left 2 Cols: Bespoke Domain Chart */}
        <div className="lg:col-span-2 glass-panel p-5 border border-[var(--lg-border)] space-y-4">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-3 border-b border-[var(--lg-border)]">
            <div>
              <h3 className="text-sm font-bold text-[var(--lg-ink)] flex items-center gap-2">
                <BarChart3 className="w-4 h-4 text-[var(--lg-cyan)]" />
                <span>{domainData.chartTitles.main}</span>
              </h3>
              <p className="text-[11px] text-[var(--lg-muted)] mt-0.5">
                {domainData.chartTitles.sub}
              </p>
            </div>
            <div className="flex items-center gap-3 text-[11px] font-medium text-[var(--lg-muted)]">
              <span className="flex items-center gap-1.5">
                <span className="w-2.5 h-2.5 rounded bg-sky-500 inline-block" />
                {domainData.chartTitles.primaryLegend}
              </span>
              <span className="flex items-center gap-1.5">
                <span className="w-2.5 h-2.5 rounded bg-cyan-400 inline-block" />
                {domainData.chartTitles.secondaryLegend}
              </span>
            </div>
          </div>

          <div className="h-64 sm:h-72 w-full pt-2">
            <CyberBarChart
              data={domainData.chartData.map((d) => ({
                label: d.label,
                value: d.primaryValue,
                secondaryValue: d.secondaryValue,
              }))}
            />
          </div>
        </div>

        {/* Right 1 Col: What-If Policy Levers for this domain */}
        <div className="glass-panel p-5 border border-[var(--lg-border)] space-y-4 flex flex-col justify-between">
          <div className="space-y-3">
            <div className="flex items-center gap-2 pb-3 border-b border-[var(--lg-border)]">
              <Sliders className="w-4 h-4 text-[var(--lg-accent)]" />
              <h3 className="text-sm font-bold text-[var(--lg-ink)]">
                سناریوساز تصمیم‌یار استاندار
              </h3>
            </div>
            <p className="text-[11px] text-[var(--lg-muted)] leading-relaxed">
              شبیه‌سازی اثر مداخلات مدیریتی، تخصیص منابع و شوک‌های اقتصادی در حوزه {pageTitle}:
            </p>

            <div className="space-y-2.5">
              {domainData.whatIfScenarios.map((sc) => (
                <div
                  key={sc.id}
                  onClick={() => setActiveScenarioId(sc.id)}
                  className={`p-3 rounded-xl border transition-all cursor-pointer ${
                    activeScenarioId === sc.id
                      ? 'border-cyan-500 bg-cyan-500/15 shadow-md'
                      : 'border-[var(--lg-border)] glass-card hover:border-[var(--lg-border-strong)]'
                  }`}
                >
                  <div className="text-xs font-bold text-[var(--lg-ink)] mb-1 flex items-center justify-between">
                    <span>{sc.title}</span>
                    {activeScenarioId === sc.id && (
                      <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
                    )}
                  </div>
                  <p className="text-[10px] text-[var(--lg-muted)] leading-relaxed">
                    {sc.description}
                  </p>
                  <div className="mt-2 pt-1.5 border-t border-[var(--lg-border)] text-[10px] font-medium text-cyan-400 flex items-center gap-1">
                    <TrendingUp className="w-3 h-3" />
                    <span>{sc.estimatedImpact}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <button
            onClick={() => {
              openCopilot(assignedAgent.id || assignedAgent.code);
            }}
            className="w-full mt-4 py-2.5 rounded-xl glass-button border border-[var(--lg-cyan)] text-[var(--lg-cyan)] hover:bg-[var(--lg-cyan)]/15 text-xs font-bold transition-all text-center flex items-center justify-center gap-2"
          >
            <Cpu className="w-3.5 h-3.5" />
            <span>
              {activeScenarioId ? 'محاسبه اثرات سیستمی سناریو' : 'طراحی سناریوی سفارشی جدید'}
            </span>
          </button>
        </div>
      </div>

      {/* 5. Domain-Specific Deep Data Table (Unique per Module) */}
      <div className="glass-panel p-5 border border-[var(--lg-border)] space-y-4">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 pb-3 border-b border-[var(--lg-border)]">
          <div className="flex items-center gap-2">
            <Database className="w-4 h-4 text-[var(--lg-accent)]" />
            <div>
              <h3 className="text-sm font-bold text-[var(--lg-ink)]">
                پایگاه داده عملیاتی و پایش میدانی {pageTitle}
              </h3>
              <p className="text-[10px] text-[var(--lg-muted)]">
                آخرین داده‌های ممیزی‌شده با ضریب اطمینان سطح الف
              </p>
            </div>
          </div>

          {/* Search filter input */}
          <div className="relative w-full sm:w-64">
            <Search className="w-3.5 h-3.5 text-[var(--lg-muted)] absolute right-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="جستجو در شاخص‌ها، شهرستان‌ها و ..."
              className="w-full glass-input pr-8 pl-3 py-1.5 text-xs text-[var(--lg-ink)] placeholder-[var(--lg-muted)] focus:outline-none focus:border-[var(--lg-cyan)]"
            />
          </div>
        </div>

        {/* The Table */}
        <div className="overflow-x-auto">
          <table className="w-full text-right text-xs">
            <thead>
              <tr className="border-b border-[var(--lg-border)] text-[var(--lg-muted)]">
                <th className="py-2.5 px-3 font-semibold">{domainData.tableHeaders.col1}</th>
                <th className="py-2.5 px-3 font-semibold">{domainData.tableHeaders.col2}</th>
                <th className="py-2.5 px-3 font-semibold">{domainData.tableHeaders.col3}</th>
                <th className="py-2.5 px-3 font-semibold">{domainData.tableHeaders.col4}</th>
                <th className="py-2.5 px-3 font-semibold">{domainData.tableHeaders.col5}</th>
                <th className="py-2.5 px-3 font-semibold text-center">اقدام</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[var(--lg-border)]">
              {filteredRows.map((row) => (
                <tr
                  key={row.id}
                  className="hover:bg-[var(--lg-hover)] transition-colors group"
                >
                  <td className="py-3 px-3 font-bold text-[var(--lg-ink)]">
                    <div className="flex items-center gap-2">
                      <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 group-hover:scale-125 transition-transform" />
                      <span>{row.title}</span>
                    </div>
                  </td>
                  <td className="py-3 px-3 text-[var(--lg-secondary)]">
                    <span className="px-2 py-0.5 rounded-md bg-white/5 dark:bg-black/20 border border-[var(--lg-border)] text-[11px]">
                      {row.category}
                    </span>
                  </td>
                  <td className="py-3 px-3 font-mono text-[var(--lg-ink)]">
                    {toPersianDigits(row.metric1)}
                  </td>
                  <td className="py-3 px-3 text-[var(--lg-secondary)]">
                    {toPersianDigits(row.metric2)}
                  </td>
                  <td className="py-3 px-3">
                    <span
                      className={`inline-block px-2.5 py-0.5 rounded-full text-[10px] font-bold border ${
                        row.status === 'optimal'
                          ? 'bg-emerald-500/15 text-emerald-500 border-emerald-500/30'
                          : row.status === 'warning'
                          ? 'bg-amber-500/15 text-amber-500 border-amber-500/30'
                          : row.status === 'critical'
                          ? 'bg-rose-500/15 text-rose-500 border-rose-500/30'
                          : 'bg-cyan-500/15 text-cyan-500 border-cyan-500/30'
                      }`}
                    >
                      {row.statusText}
                    </span>
                  </td>
                  <td className="py-3 px-3 text-center">
                    <button
                      onClick={() => openProvenance(row.id)}
                      className="text-[11px] text-[var(--lg-accent)] hover:underline flex items-center justify-center gap-1 mx-auto"
                      title="مشاهده شجره داده و مستندات ثبتی"
                    >
                      <span>ردیابی</span>
                      <ChevronLeft className="w-3 h-3" />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          {filteredRows.length === 0 && (
            <div className="text-center py-8 text-xs text-[var(--lg-muted)]">
              موردی مطابق با عبارت جستجو یافت نشد.
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
