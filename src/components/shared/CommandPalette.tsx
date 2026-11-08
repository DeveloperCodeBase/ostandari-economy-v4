'use client';

import React, { useState, useEffect } from 'react';
import { useCommand } from '@/src/context/CommandContext';
import { TEHRAN_16_COUNTIES } from '@/src/data/tehranMasterData';
import { TEHRAN_MACRO_MODULES } from '@/src/data/modulesAndRoutes';
import { Search, MapPin, FileText, Bot, X, ArrowLeft } from 'lucide-react';
import { useRouter } from 'next/navigation';

export function CommandPalette() {
  const {
    isCommandPaletteOpen,
    setIsCommandPaletteOpen,
    setSelectedCountyId,
    setIsCopilotOpen,
  } = useCommand();

  const [query, setQuery] = useState('');
  const router = useRouter();

  if (!isCommandPaletteOpen) return null;

  const filteredCounties = TEHRAN_16_COUNTIES.filter(
    (c) => c.nameFa.includes(query) || c.id.toLowerCase().includes(query.toLowerCase())
  );

  const filteredPages: { title: string; route: string; module: string }[] = [];
  TEHRAN_MACRO_MODULES.forEach((m) => {
    m.subModules.forEach((s) => {
      if (s.titleFa.includes(query) || m.titleFa.includes(query)) {
        filteredPages.push({
          title: s.titleFa,
          route: s.route,
          module: m.titleFa,
        });
      }
    });
  });

  const handleSelectCounty = (id: string | null) => {
    setSelectedCountyId(id);
    setIsCommandPaletteOpen(false);
  };

  const handleNavigate = (route: string) => {
    router.push(route);
    setIsCommandPaletteOpen(false);
  };

  return (
    <div
      className="fixed inset-0 bg-black/70 backdrop-blur-md z-50 flex items-start justify-center pt-20 p-4"
      onClick={() => setIsCommandPaletteOpen(false)}
    >
      <div
        className="w-full max-w-xl bg-[#0F1423] border border-cyan-500/40 rounded-2xl shadow-2xl overflow-hidden animate-in fade-in zoom-in-95 duration-150"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Search Input Bar */}
        <div className="flex items-center gap-3 p-4 border-b border-slate-800 bg-[#161D31]">
          <Search className="w-5 h-5 text-cyan-400" />
          <input
            type="text"
            autoFocus
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="پرش سریع به هر شهرستان، صفحه، کالا یا اقدام (مثلاً: ورامین، گندم، مالیات)..."
            className="flex-1 bg-transparent text-sm text-white placeholder-slate-500 focus:outline-none"
          />
          <button
            onClick={() => setIsCommandPaletteOpen(false)}
            className="p-1 rounded text-slate-400 hover:text-white"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Results List */}
        <div className="max-h-96 overflow-y-auto p-3 space-y-3 text-xs">
          {/* Quick Actions */}
          <div>
            <div className="text-[10px] font-semibold text-slate-500 px-2 mb-1">اقدامات هوشمند سریع:</div>
            <div className="space-y-1">
              <button
                onClick={() => {
                  setIsCommandPaletteOpen(false);
                  setIsCopilotOpen(true);
                }}
                className="w-full text-right p-2.5 rounded-xl hover:bg-slate-800 flex items-center justify-between text-slate-200 transition-colors"
              >
                <div className="flex items-center gap-2">
                  <Bot className="w-4 h-4 text-cyan-400" />
                  <span className="font-medium">باز کردن دستیار و چت‌بات تصمیم‌یار AI</span>
                </div>
                <ArrowLeft className="w-3.5 h-3.5 text-slate-500" />
              </button>

              <button
                onClick={() => handleNavigate('/ai-center/scenario-war-room')}
                className="w-full text-right p-2.5 rounded-xl hover:bg-slate-800 flex items-center justify-between text-slate-200 transition-colors"
              >
                <div className="flex items-center gap-2">
                  <FileText className="w-4 h-4 text-cyan-400" />
                  <span className="font-medium">ورود به آزمایشگاه شبیه‌ساز سناریوی اقتصادی</span>
                </div>
                <ArrowLeft className="w-3.5 h-3.5 text-slate-500" />
              </button>
            </div>
          </div>

          {/* Counties Match */}
          {filteredCounties.length > 0 && (
            <div>
              <div className="text-[10px] font-semibold text-slate-500 px-2 mb-1">شهرستان‌های استان تهران:</div>
              <div className="grid grid-cols-2 gap-1.5">
                {filteredCounties.map((c) => (
                  <button
                    key={c.id}
                    onClick={() => handleSelectCounty(c.id)}
                    className="text-right p-2 rounded-xl bg-[#161D31]/80 hover:bg-cyan-900/30 border border-slate-800 hover:border-cyan-500/40 text-slate-200 transition-colors flex items-center justify-between"
                  >
                    <div className="flex items-center gap-1.5">
                      <MapPin className="w-3.5 h-3.5 text-cyan-400" />
                      <span className="font-bold">{c.nameFa}</span>
                    </div>
                    <span className="text-[10px] text-slate-400">{c.zone.replace('پهنه ', '')}</span>
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Pages Match */}
          {filteredPages.length > 0 && (
            <div>
              <div className="text-[10px] font-semibold text-slate-500 px-2 mb-1">صفحات و ماژول‌های سامانه:</div>
              <div className="space-y-1">
                {filteredPages.slice(0, 8).map((p, idx) => (
                  <button
                    key={idx}
                    onClick={() => handleNavigate(p.route)}
                    className="w-full text-right p-2 rounded-xl hover:bg-slate-800 flex items-center justify-between text-slate-200 transition-colors"
                  >
                    <div>
                      <div className="font-semibold">{p.title}</div>
                      <div className="text-[10px] text-slate-500">{p.module}</div>
                    </div>
                    <ArrowLeft className="w-3.5 h-3.5 text-slate-500" />
                  </button>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="p-2.5 bg-[#070913] border-t border-slate-800 text-[11px] text-slate-500 flex items-center justify-between">
          <span>کلید Esc جهت انصراف | Enter جهت انتخاب</span>
          <span className="font-mono">۱۶ شهرستان و ۶۴ صفحه</span>
        </div>
      </div>
    </div>
  );
}
