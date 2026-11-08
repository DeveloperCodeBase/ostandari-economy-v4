'use client';

import React, { useState, useEffect } from 'react';
import dynamic from 'next/dynamic';
import { OverviewView } from '@/src/components/views/OverviewView';
import { TreasuryView } from '@/src/components/views/TreasuryView';
import { BankingView } from '@/src/components/views/BankingView';
import { IndustryView } from '@/src/components/views/IndustryView';
import { BreadChainView } from '@/src/components/views/BreadChainView';
import { BazaarView } from '@/src/components/views/BazaarView';
import { AgricultureView } from '@/src/components/views/AgricultureView';
import { CustomsView } from '@/src/components/views/CustomsView';
import { LaborWelfareView } from '@/src/components/views/LaborWelfareView';
import { EnergyDamsView } from '@/src/components/views/EnergyDamsView';
import { GisWarRoomView } from '@/src/components/views/GisWarRoomView';
import { SOVEREIGN_11_MODULES } from '@/src/components/layout/Sidebar';
import { useLiquidSpotlight } from '@/src/hooks/useLiquidSpotlight';
import { VistaCopyrightFooter } from '@/src/components/layout/VistaCopyrightFooter';

import { useCommand } from '@/src/context/CommandContext';

export default function OverviewDashboardPage() {
  // Activate mouse spotlight tracking across cards and navbar
  useLiquidSpotlight();
  const { activeModuleTab, setActiveModuleTab } = useCommand();

  const switchTab = (tabId: string) => {
    setActiveModuleTab(tabId);
    if (typeof window !== 'undefined') {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const activeTab = activeModuleTab;

  return (
    <div className="space-y-6">
      {/* 1. Quick Horizontal Sovereign Module Switcher */}
      <div className="flex items-center gap-1.5 overflow-x-auto pb-2 border-b border-[var(--lg-border)] scrollbar-none">
        {SOVEREIGN_11_MODULES.map((mod) => {
          const modKey = mod.id === 'gis_warroom' ? 'gis' : mod.id;
          const isActive = activeTab === modKey || (modKey === 'gis' && activeTab === 'warroom');
          const Icon = mod.icon;

          return (
            <button
              key={mod.id}
              onClick={() => switchTab(modKey)}
              className={`px-3 py-1.5 rounded-xl text-xs font-bold whitespace-nowrap flex items-center gap-1.5 border transition-all shrink-0 ${
                isActive
                  ? 'bg-gradient-to-l from-cyan-600 to-sky-700 text-white border-cyan-400 shadow-md shadow-cyan-950/40'
                  : 'bg-white/5 hover:bg-white/10 text-[var(--lg-secondary)] border-white/10 hover:text-[var(--lg-ink)]'
              }`}
            >
              <Icon className="w-3.5 h-3.5" />
              <span>{mod.number}. {mod.titleFa.split(' ')[0]} {mod.titleFa.split(' ')[1] || ''}</span>
            </button>
          );
        })}
      </div>

      {/* 2. Sovereign View Content (Zero-Duplication Mandate: each view has a distinct CSS Grid & components) */}
      <div className="animate-in fade-in duration-300">
        {activeTab === 'overview' && <OverviewView />}
        {activeTab === 'treasury' && <TreasuryView />}
        {activeTab === 'banking' && <BankingView />}
        {activeTab === 'industry' && <IndustryView />}
        {activeTab === 'bread' && <BreadChainView />}
        {activeTab === 'bazaar' && <BazaarView />}
        {activeTab === 'agriculture' && <AgricultureView />}
        {activeTab === 'customs' && <CustomsView />}
        {activeTab === 'labor' && <LaborWelfareView />}
        {activeTab === 'energy' && <EnergyDamsView />}
        {(activeTab === 'gis' || activeTab === 'warroom') && <GisWarRoomView />}
      </div>

      {/* 3. Official Vista Innovation Smart Network Copyright Footer */}
      <VistaCopyrightFooter />
    </div>
  );
}
