import React from 'react';
import Link from 'next/link';
import { AlertCircle, ArrowRight, Home } from 'lucide-react';

export default function NotFound() {
  return (
    <div className="min-h-screen bg-[var(--lg-canvas)] text-[var(--lg-ink)] flex items-center justify-center p-6 selection:bg-cyan-500/30 selection:text-cyan-200" dir="rtl">
      <div className="max-w-md w-full glass-panel border border-[var(--lg-border)] p-8 rounded-3xl text-center space-y-5 shadow-2xl">
        <div className="w-16 h-16 rounded-2xl bg-cyan-500/10 border border-cyan-500/30 flex items-center justify-center text-cyan-400 mx-auto">
          <AlertCircle className="w-8 h-8" />
        </div>

        <div className="space-y-2">
          <h1 className="text-2xl font-black text-[var(--lg-ink)]">صفحه مورد نظر یافت نشد</h1>
          <p className="text-xs text-[var(--lg-muted)] leading-relaxed">
            مسیر درخواستی در سامانه تصمیم‌یار اقتصادی استاندار تهران تعریف نشده است یا دسترسی به آن محدود می‌باشد.
          </p>
        </div>

        <div className="pt-2">
          <Link
            href="/dashboard/overview"
            className="inline-flex items-center justify-center gap-2 w-full py-3 px-4 rounded-xl bg-gradient-to-l from-cyan-600 to-sky-600 hover:from-cyan-500 hover:to-sky-500 text-white font-bold text-xs shadow-lg shadow-cyan-950/30 transition-all"
          >
            <Home className="w-4 h-4" />
            <span>بازگشت به پیشخوان سکوی تصمیم‌یار</span>
          </Link>
        </div>
      </div>
    </div>
  );
}
