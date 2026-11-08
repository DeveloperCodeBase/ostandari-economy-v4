'use client';

import React, { useState, useEffect, useSyncExternalStore } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { OFFICIAL_ROLES } from '@/src/data/rolesAndOfficials';
import { TEHRAN_PROVINCE_BASELINE } from '@/src/data/tehranMasterData';
import { TehranInteractiveMap } from '@/src/components/map/TehranInteractiveMap';
import { OfficialRole } from '@/src/types/economy';
import { toPersianDigits, formatPersianNumber } from '@/src/utils/formatters';
import {
  Lock,
  UserCheck,
  Search,
  ShieldCheck,
  MapPin,
  ArrowLeft,
  Building,
  KeyRound,
  CheckCircle2,
  Sun,
  Moon,
} from 'lucide-react';

const emptySubscribe = () => () => {};

export default function LoginPage() {
  const router = useRouter();
  const isClient = useSyncExternalStore(emptySubscribe, () => true, () => false);

  const [selectedRole, setSelectedRole] = useState<OfficialRole>(OFFICIAL_ROLES[0]);
  const [roleSearch, setRoleSearch] = useState('');
  const [username, setUsername] = useState(OFFICIAL_ROLES[0].username);
  const [password, setPassword] = useState('12345678');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [currentTheme, setCurrentTheme] = useState<'dark' | 'light'>(() => {
    if (typeof window !== 'undefined') {
      const savedTheme = localStorage.getItem('tehran-econ-theme');
      return savedTheme === 'light' ? 'light' : 'dark';
    }
    return 'dark';
  });

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', currentTheme);
    if (currentTheme === 'dark') {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [currentTheme]);

  const toggleTheme = () => {
    const nextTheme = currentTheme === 'dark' ? 'light' : 'dark';
    setCurrentTheme(nextTheme);
    localStorage.setItem('tehran-econ-theme', nextTheme);
  };

  const handleRoleSelect = (role: OfficialRole) => {
    setSelectedRole(role);
    setUsername(role.username);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      localStorage.setItem('tehran_command_role', selectedRole.id);
      if (selectedRole.countyId) {
        localStorage.setItem('tehran_command_county', selectedRole.countyId);
      } else {
        localStorage.setItem('tehran_command_county', 'all');
      }
    } catch {}

    setTimeout(() => {
      router.push('/dashboard/overview');
    }, 600);
  };

  const filteredRoles = OFFICIAL_ROLES.filter(
    (r) =>
      r.title.includes(roleSearch) ||
      r.officialName.includes(roleSearch) ||
      r.geographicScope.includes(roleSearch) ||
      r.category.includes(roleSearch)
  );

  return (
    <div className="min-h-screen bg-[var(--lg-canvas)] text-[var(--lg-ink)] flex flex-col justify-between selection:bg-cyan-500/30 selection:text-cyan-200 transition-colors">
      {/* Top Navbar */}
      <header className="px-6 py-4 border-b border-[var(--lg-border)] glass-panel backdrop-blur-xl flex items-center justify-between">
        <Link href="/" className="flex items-center gap-2.5">
          <div className="w-8 h-8 rounded-xl bg-cyan-600 text-white font-bold flex items-center justify-center border border-cyan-400/40 shadow-md">
            ط
          </div>
          <div>
            <span className="font-extrabold text-sm text-[var(--lg-ink)]">سکوی تصمیم‌یار اقتصادی استاندار تهران</span>
            <span className="text-[11px] text-[var(--lg-muted)] block">درگاه ورود یکپارچه مقامات استان تهران</span>
          </div>
        </Link>

        <div className="flex items-center gap-3">
          <button
            onClick={toggleTheme}
            aria-label="تغییر تم"
            title={isClient && currentTheme === 'light' ? 'تغییر به تم تاریک' : 'تغییر به تم روشن'}
            className="p-2 rounded-xl glass-button text-[var(--lg-ink)] hover:text-amber-400 border border-[var(--lg-border)] transition-transform active:scale-95"
          >
            {isClient && currentTheme === 'light' ? (
              <Moon className="w-4 h-4 text-sky-600" />
            ) : (
              <Sun className="w-4 h-4 text-amber-400" />
            )}
          </button>

          <Link href="/" className="text-xs text-[var(--lg-cyan)] hover:underline flex items-center gap-1 font-semibold">
            <span>بازگشت به لندینگ‌پیج</span>
            <ArrowLeft className="w-3.5 h-3.5" />
          </Link>
        </div>
      </header>

      {/* Main Dual-Column Content */}
      <main className="flex-1 max-w-7xl mx-auto w-full p-4 md:p-8 flex items-center justify-center">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 w-full items-stretch">
          {/* Left Column: Interactive Map & Tehran Province ID Certificate */}
          <div className="lg:col-span-6 flex flex-col justify-between space-y-4">
            <div className="glass-panel border border-[var(--lg-border)] rounded-2xl p-5 shadow-xl space-y-4">
              <div className="flex items-center justify-between border-b border-[var(--lg-border)] pb-3">
                <div className="flex items-center gap-2.5">
                  <div className="w-9 h-9 rounded-xl bg-cyan-600/20 text-cyan-400 border border-cyan-500/30 flex items-center justify-center font-bold">
                    <Building className="w-4 h-4" />
                  </div>
                  <div>
                    <h2 className="text-base font-bold text-[var(--lg-ink)]">شناسنامه جغرافیایی و حاکمیتی استان تهران</h2>
                    <p className="text-[11px] text-[var(--lg-muted)]">تقسیمات مصوب کشوری — سال ۱۴۰۵</p>
                  </div>
                </div>
                <span className="text-xs font-mono bg-emerald-500/15 text-emerald-500 border border-emerald-500/30 px-2 py-0.5 rounded-full font-bold">
                  تایید رسمی
                </span>
              </div>

              {/* Province stats grid */}
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-2.5 text-xs">
                <div className="glass-card p-2.5 rounded-xl border border-[var(--lg-border)]">
                  <span className="text-[10px] text-[var(--lg-muted)] block">استاندار محترم تهران:</span>
                  <strong className="text-[var(--lg-ink)] text-xs">{TEHRAN_PROVINCE_BASELINE.governorName}</strong>
                </div>
                <div className="glass-card p-2.5 rounded-xl border border-[var(--lg-border)]">
                  <span className="text-[10px] text-[var(--lg-muted)] block">معاون هماهنگی اقتصادی:</span>
                  <strong className="text-[var(--lg-ink)] text-xs">{TEHRAN_PROVINCE_BASELINE.economicDeputyName}</strong>
                </div>
                <div className="glass-card p-2.5 rounded-xl border border-[var(--lg-border)]">
                  <span className="text-[10px] text-[var(--lg-muted)] block">جمعیت رسمی (برآورد ۱۴۰۵):</span>
                  <strong className="text-[var(--lg-ink)] text-xs font-mono">{formatPersianNumber(TEHRAN_PROVINCE_BASELINE.population1405Est)} نفر</strong>
                </div>
                <div className="glass-card p-2.5 rounded-xl border border-[var(--lg-border)]">
                  <span className="text-[10px] text-[var(--lg-muted)] block">تقسیمات سیاسی:</span>
                  <strong className="text-[var(--lg-ink)] text-xs font-mono">۱۶ شهرستان (۳ فرمانداری ویژه)</strong>
                </div>
                <div className="glass-card p-2.5 rounded-xl border border-[var(--lg-border)]">
                  <span className="text-[10px] text-[var(--lg-muted)] block">شهرک‌های صنعتی:</span>
                  <strong className="text-[var(--lg-ink)] text-xs font-mono">۲۲ شهرک و ناحیه صنعتی</strong>
                </div>
                <div className="glass-card p-2.5 rounded-xl border border-[var(--lg-border)]">
                  <span className="text-[10px] text-[var(--lg-muted)] block">گمرکات تخصصی:</span>
                  <strong className="text-[var(--lg-ink)] text-xs font-mono">۶ گمرک رسمی</strong>
                </div>
              </div>

              {/* Map Preview */}
              <div className="h-[280px]">
                <TehranInteractiveMap
                  interactive={true}
                  compact={true}
                  showLayerControls={false}
                />
              </div>
            </div>
          </div>

          {/* Right Column: Form with Province Locked on Tehran & 32 Roles Selection */}
          <div className="lg:col-span-6">
            <div className="glass-panel border border-[var(--lg-border)] rounded-2xl p-5 md:p-6 shadow-xl space-y-5">
              <div>
                <h3 className="text-lg font-extrabold text-[var(--lg-ink)]">ورود به سکوی تصمیم‌یار و انتخاب نقش سازمانی</h3>
                <p className="text-xs text-[var(--lg-muted)] mt-1">
                  پلتفرم بر اساس نقش انتخابی، دسترسی‌های جغرافیایی و چیدمان ماژول‌ها را شخصی‌سازی می‌کند.
                </p>
              </div>

              <form onSubmit={handleSubmit} className="space-y-4 text-xs">
                {/* 1. Province Locked Field */}
                <div>
                  <label className="block text-[var(--lg-secondary)] font-semibold mb-1">استان تحت مدیریت:</label>
                  <div className="flex items-center justify-between glass-card border border-cyan-500/40 rounded-xl px-3.5 py-2.5 text-[var(--lg-ink)]">
                    <div className="flex items-center gap-2">
                      <MapPin className="w-4 h-4 text-cyan-400" />
                      <span className="font-bold">استان تهران (پایتخت و قطب اقتصادی، صنعتی و مالی ایران)</span>
                    </div>
                    <div className="flex items-center gap-1 text-[11px] text-amber-500 bg-amber-500/10 px-2 py-0.5 rounded border border-amber-500/30 font-medium">
                      <Lock className="w-3 h-3" />
                      <span>قفل جغرافیایی</span>
                    </div>
                  </div>
                </div>

                {/* 2. Search & Select from 32 Official Roles */}
                <div>
                  <div className="flex items-center justify-between mb-1">
                    <label className="text-[var(--lg-secondary)] font-semibold">انتخاب مقام و نقش حاکمیتی (۳۲ نقش رسمی):</label>
                    <span className="text-[11px] text-[var(--lg-muted)] font-mono">
                      {toPersianDigits(filteredRoles.length)} از ۳۲ نقش
                    </span>
                  </div>

                  <div className="relative mb-2">
                    <Search className="w-3.5 h-3.5 text-[var(--lg-muted)] absolute right-3 top-1/2 -translate-y-1/2" />
                    <input
                      type="text"
                      value={roleSearch}
                      onChange={(e) => setRoleSearch(e.target.value)}
                      placeholder="جستجوی سمت، نام مقام یا شهرستان (مثلاً: معتمدیان، عسگری، ورامین)..."
                      className="w-full glass-input border border-[var(--lg-border)] rounded-xl pr-9 pl-3 py-2 text-[var(--lg-ink)] placeholder-[var(--lg-muted)] focus:outline-none focus:border-[var(--lg-cyan)]"
                    />
                  </div>

                  <div className="max-h-48 overflow-y-auto space-y-1.5 p-1 rounded-xl border border-[var(--lg-border)]">
                    {filteredRoles.map((r) => {
                      const isSelected = selectedRole.id === r.id;
                      return (
                        <div
                          key={r.id}
                          onClick={() => handleRoleSelect(r)}
                          className={`p-2.5 rounded-xl cursor-pointer transition-all flex items-center justify-between ${
                            isSelected
                              ? 'bg-cyan-600 text-white shadow-md'
                              : 'glass-card hover:bg-[var(--lg-hover)] text-[var(--lg-ink)]'
                          }`}
                        >
                          <div className="flex items-center gap-2.5">
                            <div
                              className={`w-7 h-7 rounded-lg flex items-center justify-center font-bold text-xs ${
                                isSelected ? 'bg-white text-cyan-800' : 'bg-cyan-500/15 text-cyan-500'
                              }`}
                            >
                              <UserCheck className="w-3.5 h-3.5" />
                            </div>
                            <div>
                              <div className="font-bold text-xs leading-snug">{r.title}</div>
                              <div className="text-[10px] opacity-80 mt-0.5">
                                {r.officialName} · قلمرو: {r.geographicScope}
                              </div>
                            </div>
                          </div>
                          {isSelected && <CheckCircle2 className="w-4 h-4 text-white" />}
                        </div>
                      );
                    })}
                  </div>
                </div>

                {/* 3. Mandate & Access Info Box */}
                <div className="glass-card border border-cyan-500/30 p-3 rounded-xl space-y-1.5">
                  <div className="flex items-center justify-between text-[11px] font-bold text-[var(--lg-cyan)]">
                    <span className="flex items-center gap-1.5">
                      <ShieldCheck className="w-3.5 h-3.5" />
                      شرح مأموریت و سطح دسترسی نقش انتخابی:
                    </span>
                    <span className="bg-cyan-500/15 text-[var(--lg-cyan)] px-2 py-0.5 rounded text-[10px] font-mono">
                      طبقه {selectedRole.accessLevel}
                    </span>
                  </div>
                  <p className="text-[11px] text-[var(--lg-secondary)] leading-relaxed">
                    {selectedRole.mandate}
                  </p>
                  <div className="text-[10px] text-[var(--lg-muted)] pt-1 border-t border-[var(--lg-border)]">
                    ماژول‌های اولویت‌دار: {selectedRole.topModules.join(' · ')}
                  </div>
                </div>

                {/* 4. Credentials (prefilled for demo) */}
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block text-[var(--lg-muted)] text-[11px] mb-1">شناسه کاربری (حاکمیتی):</label>
                    <input
                      type="text"
                      value={username}
                      onChange={(e) => setUsername(e.target.value)}
                      className="w-full glass-input border border-[var(--lg-border)] rounded-xl px-3 py-2 text-[var(--lg-ink)] font-mono text-xs focus:outline-none focus:border-[var(--lg-cyan)]"
                    />
                  </div>
                  <div>
                    <label className="block text-[var(--lg-muted)] text-[11px] mb-1">کلمه عبور امنیتی:</label>
                    <input
                      type="password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      className="w-full glass-input border border-[var(--lg-border)] rounded-xl px-3 py-2 text-[var(--lg-ink)] font-mono text-xs focus:outline-none focus:border-[var(--lg-cyan)]"
                    />
                  </div>
                </div>

                {/* Submit Action Button */}
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full py-3 px-4 bg-gradient-to-l from-cyan-600 via-sky-600 to-blue-700 hover:from-cyan-500 hover:to-sky-500 text-white font-bold rounded-xl shadow-xl shadow-cyan-950/30 transition-all flex items-center justify-center gap-2 text-sm mt-2 disabled:opacity-50 active:scale-[0.99]"
                >
                  <KeyRound className="w-4 h-4" />
                  <span>{isSubmitting ? 'در حال ورود به سکو...' : 'ورود به سکوی تصمیم‌یار اقتصادی استاندار'}</span>
                </button>
              </form>
            </div>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="px-6 py-4 border-t border-[var(--lg-border)] glass-panel text-center text-xs text-[var(--lg-muted)]">
        سکوی تصمیم‌یار اقتصادی استاندار تهران — شرکت شبکه هوشمند ابتکار ویستا (دانش‌بنیان)
      </footer>
    </div>
  );
}
