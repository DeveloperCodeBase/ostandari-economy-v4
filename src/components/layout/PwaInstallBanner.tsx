'use client';

import React, { useState, useEffect } from 'react';
import { Download, X, Smartphone, CheckCircle } from 'lucide-react';

export function PwaInstallBanner() {
  const [showBanner, setShowBanner] = useState(false);
  const [installed, setInstalled] = useState(false);

  useEffect(() => {
    try {
      const dismissed = localStorage.getItem('tehran_pwa_dismissed');
      if (!dismissed) {
        // Show after 3 seconds
        const timer = setTimeout(() => setShowBanner(true), 3000);
        return () => clearTimeout(timer);
      }
    } catch {}
  }, []);

  if (!showBanner) return null;

  const handleDismiss = () => {
    setShowBanner(false);
    try {
      localStorage.setItem('tehran_pwa_dismissed', 'true');
    } catch {}
  };

  const handleInstall = () => {
    setInstalled(true);
    setTimeout(() => {
      setShowBanner(false);
    }, 2500);
  };

  return (
    <div className="fixed bottom-4 left-4 z-40 max-w-sm glass-panel border border-[var(--lg-border-strong)] rounded-2xl p-4 shadow-2xl text-xs text-[var(--lg-ink)] animate-in slide-in-from-bottom-5 duration-300">
      <button
        onClick={handleDismiss}
        className="absolute top-2.5 right-2.5 text-[var(--lg-muted)] hover:text-[var(--lg-ink)] p-1 rounded-lg"
      >
        <X className="w-3.5 h-3.5" />
      </button>

      <div className="flex items-start gap-3 pl-4">
        <div className="w-10 h-10 rounded-xl bg-cyan-600/20 text-cyan-500 border border-cyan-500/30 flex items-center justify-center shrink-0">
          <Smartphone className="w-5 h-5 radar-glow" />
        </div>
        <div>
          <h4 className="font-bold text-sm text-[var(--lg-ink)]">نصب اپلیکیشن سکوی تصمیم‌یار استاندار (PWA)</h4>
          <p className="text-[11px] text-[var(--lg-muted)] leading-relaxed mt-1">
            دسترسی سریع و آفلاین به داشبورد ۱۶ شهرستان و پیشخوان تصمیم‌یار استاندار در بازدیدهای میدانی
          </p>

          <div className="flex items-center gap-2 mt-3">
            {installed ? (
              <div className="flex items-center gap-1.5 text-emerald-500 text-xs font-semibold">
                <CheckCircle className="w-4 h-4" />
                <span>برنامه با موفقیت ثبت شد</span>
              </div>
            ) : (
              <>
                <button
                  onClick={handleInstall}
                  className="px-3.5 py-1.5 rounded-lg bg-cyan-600 hover:bg-cyan-500 text-white font-semibold transition-colors flex items-center gap-1.5 shadow-md shadow-cyan-950/50"
                >
                  <Download className="w-3.5 h-3.5" />
                  <span>نصب روی دستگاه</span>
                </button>
                <button
                  onClick={handleDismiss}
                  className="px-2.5 py-1.5 rounded-lg text-[var(--lg-muted)] hover:text-[var(--lg-ink)] transition-colors"
                >
                  بعداً
                </button>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
