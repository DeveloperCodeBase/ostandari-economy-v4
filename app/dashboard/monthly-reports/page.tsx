'use client';

import React from 'react';
import Link from 'next/link';
import { FileSpreadsheet, ChevronLeft, Layers, Printer, Download, Sparkles } from 'lucide-react';
import { InPageAgentPanel } from '@/src/components/ai/InPageAgentPanel';
import { ComprehensiveMonthlyReportGenerator } from '@/src/components/reports/ComprehensiveMonthlyReportGenerator';

export default function MonthlyReportsPage() {
  return (
    <div className="space-y-6">
      {/* Top Breadcrumb & Header Title */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-[var(--lg-border)] pb-4">
        <div>
          <div className="flex items-center gap-2 text-xs text-[var(--lg-muted)] mb-1">
            <Link
              href="/dashboard/overview"
              className="hover:text-cyan-500 transition-colors"
            >
              سکوی تصمیم‌یار اقتصادی استاندار
            </Link>
            <ChevronLeft className="w-3.5 h-3.5" />
            <span className="text-[var(--lg-ink)] font-semibold">
              میز تخصصی گزارش‌های جامع دوره‌ای و ماهانه
            </span>
          </div>
          <h1 className="text-xl sm:text-2xl font-black text-[var(--lg-ink)] tracking-tight flex items-center gap-2.5">
            <FileSpreadsheet className="w-6 h-6 text-cyan-500" />
            <span>سامانه جامع استخراج گزارش‌های ماهانه اقتصادی استان تهران</span>
          </h1>
          <p className="text-xs sm:text-sm text-[var(--lg-muted)] mt-1">
            ویژه فرمانداران ۱۶ شهرستان جهت استخراج گزارش‌های آماری، ترازهای مالیاتی، اشتغال سامانه رصد، نانینو و ارسال به دفتر استاندار
          </p>
        </div>
      </div>

      {/* Sovereign AI Agent Panel */}
      <InPageAgentPanel
        agentCode="AGT-01"
        pageTitle="میز استخراج گزارش‌های جامع ماهانه و کارنامه فرمانداری‌ها"
        analyst={{
          id: 'AGT-01',
          name: 'فرمانده ارشد و تحلیلگر کارنامه فرمانداری‌ها',
          role: 'سنتز دوره‌ای شاخص‌های ۱۶ شهرستان برای استاندار معتمدیان و دکتر عسگری',
          analysis:
            'سامانه گزارش‌ساز ماهانه به‌صورت برخط به داده‌های خزانه‌داری معین، درگاه صمت، سامانه رصد اشتغال، نانینو و شرکت گاز و برق متصل بوده و گزارش هر یک از ۱۶ شهرستان را با مهر امنیتی استانداری آماده استخراج می‌نماید.',
          recommendation:
            'فرمانداران محترم می‌توانند با کلیک بر خروجی اکسل یا چاپ رسمی، کارنامه را مستقیماً جهت طرح در شورای اداری یا کارگروه اقتصادی استانی دریافت نمایند.',
          status: 'online',
        }}
      />

      {/* Main Comprehensive Monthly Report Generator Component */}
      <ComprehensiveMonthlyReportGenerator />
    </div>
  );
}
