'use client';

import React, { useState } from 'react';
import { usePathname } from 'next/navigation';
import { CommandProvider } from '@/src/context/CommandContext';
import { TopCommandHeader } from '@/src/components/layout/TopCommandHeader';
import { LiveAgentTicker } from '@/src/components/layout/LiveAgentTicker';
import { Sidebar } from '@/src/components/layout/Sidebar';
import { AICopilotDrawer } from '@/src/components/ai/AICopilotDrawer';
import { MicroAgentModal } from '@/src/components/ai/MicroAgentModal';
import { DataProvenanceModal } from '@/src/components/shared/DataProvenanceModal';
import { CommandPalette } from '@/src/components/shared/CommandPalette';
import { PwaInstallBanner } from '@/src/components/layout/PwaInstallBanner';
import { GlobalHelpGuideModal } from '@/src/components/shared/GlobalHelpGuideModal';

export function MainLayout({ children }: { children: React.ReactNode }) {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const pathname = usePathname();

  const isStandalone = pathname === '/' || pathname === '/login';

  return (
    <CommandProvider>
      {/* Liquid Glass Floating Ambient Orbs */}
      <div className="liquid-orbs" aria-hidden="true">
        <div className="liquid-orb liquid-orb--one" />
        <div className="liquid-orb liquid-orb--two" />
        <div className="liquid-orb liquid-orb--three" />
      </div>

      {isStandalone ? (
        <>
          {children}
          <CommandPalette />
          <AICopilotDrawer />
          <GlobalHelpGuideModal />
          <PwaInstallBanner />
        </>
      ) : (
        <div className="h-screen flex flex-col overflow-hidden text-[var(--lg-ink)] bg-[var(--lg-canvas)] antialiased selection:bg-cyan-600/30 selection:text-cyan-200 relative">
          {/* Top Sticky Header */}
          <TopCommandHeader onToggleSidebar={() => setSidebarOpen((prev) => !prev)} />

          {/* Live Ticker right below header */}
          <LiveAgentTicker />

          {/* Main workspace container: Sidebar on the right (RTL), Content on the left */}
          <div className="flex-1 flex w-full overflow-hidden relative min-h-0">
            {/* Right Sidebar (Smooth, collapsible, non-overlapping) */}
            <Sidebar isOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} />

            {/* Main Viewport Content & Official Company Footer */}
            <div className="flex-1 min-w-0 flex flex-col justify-between overflow-y-auto">
              <main className="flex-1 p-3 sm:p-5 md:p-6 lg:p-8">
                {children}
              </main>

              {/* Official Governorate & Vista Smart Network Company Footer */}
              <footer className="glass-panel mx-3 sm:mx-5 md:mx-6 lg:mx-8 mb-6 mt-8 p-4 border border-[var(--lg-border)] text-xs text-[var(--lg-muted)]">
                <div className="flex flex-col md:flex-row items-center justify-between gap-3 text-center md:text-right">
                  <div className="flex items-center gap-2">
                    <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 radar-glow inline-block" />
                    <span className="font-bold text-[var(--lg-ink)]">
                      سکوی تصمیم‌یار اقتصادی استاندار تهران — استانداری تهران
                    </span>
                  </div>
                  <div className="text-[11px] text-[var(--lg-secondary)] font-medium">
                    طراحی، توسعه و هوشمندسازی: <span className="font-bold text-[var(--lg-accent)]">شرکت شبکه هوشمند ابتکار ویستا</span> (دانش‌بنیان)
                  </div>
                </div>
                <div className="mt-3 pt-2.5 border-t border-[var(--lg-border)] flex flex-col sm:flex-row items-center justify-between gap-2 text-[10px] text-[var(--lg-muted)]">
                  <div>
                    تمامی حقوق مادی و معنوی این سامانه متعلق به استانداری تهران و شرکت شبکه هوشمند ابتکار ویستا می‌باشد © ۱۴۰۵
                  </div>
                  <div className="font-mono font-medium">
                    TEHRAN GOV-DECISION PLATFORM v3.0 | INTELLIGENT GOVERNANCE
                  </div>
                </div>
              </footer>
            </div>
          </div>

          {/* Omnipresent Drawers & Modals */}
          <AICopilotDrawer />
          <CommandPalette />
          <MicroAgentModal />
          <DataProvenanceModal />
          <GlobalHelpGuideModal />
          <PwaInstallBanner />
        </div>
      )}
    </CommandProvider>
  );
}

export default MainLayout;
