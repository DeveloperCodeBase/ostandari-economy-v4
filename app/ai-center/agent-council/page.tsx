'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import {
  Users,
  Sparkles,
  Play,
  RotateCcw,
  ShieldCheck,
  AlertTriangle,
  Cpu,
  FileCheck,
  Send,
  CheckCircle2,
  ThumbsUp,
  ThumbsDown,
  Scale,
  BrainCircuit,
  MessageSquare,
  Building2,
  ChevronLeft
} from 'lucide-react';
import { useCommand } from '@/src/context/CommandContext';
import { TEHRAN_AI_AGENTS } from '@/src/data/tehranMasterData';
import { toPersianDigits } from '@/src/utils/formatters';
import InPageAgentPanel from '@/src/components/ai/InPageAgentPanel';

interface CouncilPreset {
  id: string;
  title: string;
  dilemma: string;
  participatingAgents: string[];
  consensusScore: number;
}

const COUNCIL_PRESETS: CouncilPreset[] = [
  {
    id: 'flour-subsidy',
    title: 'تخصیص سهمیه آرد نانوایی‌های فانتزی و صنعتی',
    dilemma: 'آیا سهمیه آرد یارانه‌ای صنف و صنعت در استان تهران حذف و معادل ریالی آن به کالابرگ خانوار افزوده شود، یا به دلیل ریسک جهش قیمت ماکارونی و نان‌های حجیم تمدید گردد؟',
    participatingAgents: ['AGT-01', 'AGT-03', 'AGT-04', 'AGT-08', 'AGT-10'],
    consensusScore: 84
  },
  {
    id: 'power-curtailment',
    title: 'محدودیت دیماند برق شهرک‌های صنعتی پاکدشت و شمس‌آباد',
    dilemma: 'در ایام اوج مصرف زمستانی، آیا محدودیت ۲ روزه دیماند برق برای کارخانجات فولاد و ریخته‌گری اعمال شود یا اولویت با تداوم تولید و شیفت‌بندی مصرف در ساعات کم‌باری باشد؟',
    participatingAgents: ['AGT-02', 'AGT-05', 'AGT-08', 'AGT-09', 'AGT-10'],
    consensusScore: 78
  },
  {
    id: 'poultry-price-ceiling',
    title: 'شناورسازی نرخ مرغ گرم در میادین بهمن و پیروزی',
    dilemma: 'آزادسازی سقف قیمت مصوب مرغ گرم در سطح عمده‌فروشی میدان بهمن و جایگزینی با یارانه خرید در کالابرگ الکترونیک جهت رفع انگیزه قاچاق به استان‌های همجوار.',
    participatingAgents: ['AGT-01', 'AGT-04', 'AGT-06', 'AGT-07', 'AGT-10'],
    consensusScore: 91
  },
  {
    id: 'bank-credit-allocation',
    title: 'تعهد بانک‌های تهران به پرداخت ۵۰ همت سرمایه در گردش',
    dilemma: 'الزام قانونی شعب مرکزی بانک‌های تجاری مستقر در تهران جهت تخصیص حداقل ۵۰٪ سپرده‌های جذب‌شده به واحدهای فعال در ۲۲ شهرک صنعتی استان.',
    participatingAgents: ['AGT-01', 'AGT-02', 'AGT-05', 'AGT-09', 'AGT-10'],
    consensusScore: 88
  }
];

export default function AgentCouncilPage() {
  const { openCopilot } = useCommand();
  const [selectedPreset, setSelectedPreset] = useState<CouncilPreset>(COUNCIL_PRESETS[0]);
  const [customQuestion, setCustomQuestion] = useState<string>('');
  const [isDebating, setIsDebating] = useState<boolean>(false);
  const [debateProgress, setDebateProgress] = useState<number>(0);
  const [activeStage, setActiveStage] = useState<'idle' | 'running' | 'concluded'>('concluded');

  const startDebate = (preset?: CouncilPreset) => {
    const target = preset || selectedPreset;
    setSelectedPreset(target);
    setIsDebating(true);
    setActiveStage('running');
    setDebateProgress(15);

    setTimeout(() => setDebateProgress(45), 600);
    setTimeout(() => setDebateProgress(75), 1200);
    setTimeout(() => {
      setDebateProgress(100);
      setIsDebating(false);
      setActiveStage('concluded');
    }, 1800);
  };

  return (
    <div className="space-y-6">
      {/* Executive Agent Panel */}
      <InPageAgentPanel
        analyst={{
          id: 'AGT-10',
          name: 'سنتزکننده ارشد تصمیم و هماهنگ‌ساز عاملی',
          role: 'ریاست شورای عالی عاملی استانداری تهران',
          analysis: `شورای عاملی با مشارکت ۱۰ عامل هوشمند تخصصی تشکیل شده است. سازوکار شورا مبتنی بر نظریه بازی‌های تعاملی و استخراج نقطه تعادل نش (Nash Equilibrium) در تخصیص منابع محدود استان تهران است. منافع متضاد بخشی (مثلاً تعارض ثبات قیمت و تاب‌آوری کارخانجات) در این صحن حل‌وفصل می‌گردد.`,
          recommendation: 'پیش از امضای هرگونه بخشنامه دستوری در کارگروه تنظیم بازار، سناریوی تنش را در صحن شورا به رای‌گیری تحلیلی بگذارید.',
          status: 'ready'
        }}
        kpiIds={['kpi-inflation', 'kpi-industry', 'kpi-fiscal-rev']}
      />

      {/* Header */}
      <div className="rounded-2xl border border-cyan-500/20 bg-gradient-to-r from-[#0C1020] via-[#121933] to-[#1C1635] p-6 shadow-2xl relative overflow-hidden">
        <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-6">
          <div>
            <div className="flex items-center gap-3 mb-2">
              <div className="p-2.5 rounded-xl bg-cyan-500/10 border border-cyan-500/30 text-cyan-400">
                <BrainCircuit className="w-6 h-6 animate-pulse" />
              </div>
              <h1 className="text-2xl font-black text-white">
                صحن مناظره و اجماع چندعامله (Multi-Agent Consensus Chamber)
              </h1>
            </div>
            <p className="text-sm text-slate-400 max-w-3xl leading-relaxed">
              گردهمایی عامل‌های هوشمند استان تهران جهت حل تعارضات سیاستی بین‌دستگاهی (جهاد کشاورزی، صمت، اقتصاد، کار و غله) و استخراج مصوبه واحد با نظارت عامل هماهنگ‌ساز ارشد (AGT-10).
            </p>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => startDebate()}
              disabled={isDebating}
              className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-gradient-to-r from-cyan-500 to-sky-600 hover:from-cyan-400 hover:to-sky-500 text-white text-xs font-bold shadow-lg shadow-cyan-600/30 transition-all"
            >
              <Play className="w-4 h-4 fill-current" />
              <span>{isDebating ? 'در حال شبیه‌سازی مناظره...' : 'آغاز مناظره شورا'}</span>
            </button>
          </div>
        </div>

        {/* Preset dilemma selector */}
        <div className="mt-6 flex flex-wrap gap-2">
          {COUNCIL_PRESETS.map((preset) => {
            const isSelected = selectedPreset.id === preset.id;
            return (
              <button
                key={preset.id}
                onClick={() => startDebate(preset)}
                className={`px-3.5 py-2 rounded-xl text-xs font-medium border transition-all text-right ${
                  isSelected
                    ? 'bg-cyan-600/20 border-cyan-400 text-cyan-200 shadow-md'
                    : 'bg-slate-900/60 border-slate-800 text-slate-400 hover:text-slate-200 hover:border-slate-700'
                }`}
              >
                <span>{preset.title}</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Progress Bar when debating */}
      {isDebating && (
        <div className="rounded-xl border border-cyan-500/30 bg-[#0F1423] p-4 shadow-xl">
          <div className="flex justify-between items-center text-xs text-cyan-300 font-bold mb-2">
            <span>در حال استماع استدلال‌های تخصصی نمایندگان عاملی...</span>
            <span>{toPersianDigits(debateProgress)}٪</span>
          </div>
          <div className="w-full bg-slate-800 h-2 rounded-full overflow-hidden">
            <div
              className="bg-gradient-to-r from-cyan-500 via-sky-500 to-emerald-400 h-full rounded-full transition-all duration-300"
              style={{ width: `${debateProgress}%` }}
            />
          </div>
        </div>
      )}

      {/* Main Debate Stage */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left: Departmental Agent Arguments (8 cols) */}
        <div className="lg:col-span-8 space-y-4">
          <div className="rounded-2xl border border-slate-800 bg-[#0F1423]/95 p-5 shadow-xl">
            <div className="flex items-center justify-between pb-3 mb-4 border-b border-slate-800">
              <div className="flex items-center gap-2">
                <Users className="w-4 h-4 text-cyan-400" />
                <span className="text-xs font-bold text-white">
                  استماع استدلال‌های بخشی ({toPersianDigits(selectedPreset.participatingAgents.length)} عامل حاضر در صحن)
                </span>
              </div>
              <span className="text-[11px] text-cyan-300 bg-cyan-950/40 border border-cyan-800/50 px-2 py-0.5 rounded">
                موضوع: {selectedPreset.title}
              </span>
            </div>

            <p className="text-xs text-slate-300 bg-slate-900/60 border border-slate-800/80 p-3.5 rounded-xl mb-4 leading-relaxed">
              <strong className="text-cyan-400 font-bold">طرح مساله: </strong>
              {selectedPreset.dilemma}
            </p>

            {/* List of agent speeches */}
            <div className="space-y-3.5">
              {selectedPreset.participatingAgents.map((agentId, index) => {
                const agent = TEHRAN_AI_AGENTS.find((a) => a.id === agentId);
                if (!agent) return null;

                // Dynamic mock speech content based on role
                let positionType: 'pro' | 'con' | 'neutral' = index % 2 === 0 ? 'pro' : 'con';
                let speech = '';
                let condition = '';

                if (agent.id === 'AGT-01') {
                  speech = 'از دیدگاه اقتصاد کلان، این تصمیم کسری بودجه پنهان استان را سالانه ۱۲ همت تقلیل می‌دهد اما تورم نقطه‌ای دهک‌های ۱ تا ۳ را طی ماه اول تا ۲.۴ واحد درصد بالا می‌برد.';
                  condition = 'پیش‌شرط تایید: شارژ همزمان ۳۰۰ هزار تومانی کالابرگ برای ۵۰۰ هزار خانوار جنوب تهران.';
                } else if (agent.id === 'AGT-03') {
                  speech = 'سامانه هوشمند نانینو نشان می‌دهد که انحراف آرد در صنف فانتزی ۲۲٪ است. حذف سهمیه بدون تثبیت قیمت آرد نوع دوم موجب انتقال تقاضا به نان سنتی (لواش و بربری) و ایجاد صف‌های ۴۰ دقیقه‌ای می‌شود.';
                  condition = 'پیش‌شرط تایید: افزایش ۱۰ درصدی سهمیه آرد نانوایی‌های سنتی در شهرستان‌های ملارد و پاکدشت.';
                } else if (agent.id === 'AGT-04') {
                  speech = 'ذخایر استراتژیک استان (۴۲ روز) اجازه کنترل بازار را می‌دهد مشروط بر اینکه انبارهای شرکت پشتیبانی امور دام در تهرانسر و شهریار به شبکه توزیع متصل بمانند.';
                  condition = 'پیش‌شرط: توزیع مویرگی در ۲۶۲ میدان میوه و تره‌بار با قیمت تثبیتی.';
                } else if (agent.id === 'AGT-05') {
                  speech = 'بخش صنعت توان جذب شوک هزینه‌ای جدید را ندارد. در شهرک‌های صنعتی شمس‌آباد و عباس‌آباد حاشیه سود کارخانجات غذایی به زیر ۷٪ رسیده است.';
                  condition = 'پیش‌شرط: اختصاص تسهیلات کم‌بهره تبصره ۱۸ جهت نوسازی خطوط تولید.';
                } else if (agent.id === 'AGT-08') {
                  speech = 'کاهش فعالیت کارخانجات خطر اخراج بیش از ۱۲۰۰ کارگر در پاکدشت را به همراه دارد. امنیت شغلی کارگران فصلی خط قرمز است.';
                  condition = 'پیش‌شرط: نظارت مستمر اداره کل تعاون، کار و رفاه اجتماعی استان.';
                } else if (agent.id === 'AGT-10') {
                  speech = 'سنتز جامع: تعارض اصلی میان انضباط مالی و آرامش معیشتی است. تعادل بهینه از طریق اجرای فازبندی‌شده ۳ مرحله‌ای حاصل می‌شود.';
                  condition = 'توافق نهایی حاصل شد: تایید مشروط با ضریب اطمینان ۹۱٪.';
                } else {
                  speech = 'تحلیل داده‌های پایشی استان نشان‌دهنده لزوم اجرای آزمایشی طرح به مدت ۴۵ روز در شهرستان ری به عنوان پایلوت است.';
                  condition = 'ارزیابی هفتگی اثرات میدانی.';
                }

                return (
                  <motion.div
                    key={agent.id}
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.1 }}
                    className="p-4 rounded-xl border border-slate-800/80 bg-slate-900/40 hover:border-slate-700 transition-all"
                  >
                    <div className="flex items-center justify-between mb-2">
                      <div className="flex items-center gap-2.5">
                        <span className="text-xl">{agent.icon}</span>
                        <div>
                          <div className="flex items-center gap-2">
                            <span className="text-xs font-bold text-white">{agent.name}</span>
                            <span className="text-[10px] text-cyan-400 font-mono bg-cyan-950/40 px-1.5 py-0.2 rounded border border-cyan-800/40">
                              {agent.id}
                            </span>
                          </div>
                          <span className="text-[10px] text-slate-400">{agent.domain}</span>
                        </div>
                      </div>

                      <div className="flex items-center gap-2">
                        {positionType === 'pro' ? (
                          <span className="flex items-center gap-1 text-[11px] text-emerald-400 bg-emerald-950/40 border border-emerald-800/50 px-2 py-0.5 rounded-full font-medium">
                            <ThumbsUp className="w-3 h-3" /> موافق مشروط
                          </span>
                        ) : (
                          <span className="flex items-center gap-1 text-[11px] text-amber-400 bg-amber-950/40 border border-amber-800/50 px-2 py-0.5 rounded-full font-medium">
                            <AlertTriangle className="w-3 h-3" /> هشدار ریسک
                          </span>
                        )}
                      </div>
                    </div>

                    <p className="text-xs text-slate-300 leading-relaxed pl-2 pr-2 mb-2">
                      {speech}
                    </p>

                    <div className="text-[11px] text-slate-400 bg-slate-950/60 p-2 rounded-lg border border-slate-800/60 flex items-center gap-2">
                      <CheckCircle2 className="w-3.5 h-3.5 text-cyan-400 shrink-0" />
                      <span>{condition}</span>
                    </div>
                  </motion.div>
                );
              })}
            </div>
          </div>
        </div>

        {/* Right: Synthesis & Final Decree (4 cols) */}
        <div className="lg:col-span-4 space-y-4">
          {/* Consensus Score Card */}
          <div className="rounded-2xl border border-emerald-500/30 bg-[#0F1423]/95 p-5 shadow-xl text-center">
            <span className="text-xs text-slate-400 block mb-1">شاخص اجماع نهایی شورا</span>
            <div className="text-4xl font-black font-mono text-emerald-400 my-2">
              {toPersianDigits(selectedPreset.consensusScore)}٪
            </div>
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-300 text-xs font-bold">
              <ShieldCheck className="w-3.5 h-3.5" />
              <span>توافق اکثریت حاصل شد</span>
            </div>
            <p className="text-[11px] text-slate-400 mt-3 leading-relaxed">
              تمامی ۵ نماینده عاملی شرایط جبرانی را امضا کرده و شروط ایمنی جهت جلوگیری از تنش معیشتی ثبت گردید.
            </p>
          </div>

          {/* Synthesized Decree Box */}
          <div className="rounded-2xl border border-cyan-500/30 bg-[#0A0E1A] p-5 shadow-2xl space-y-4">
            <div className="flex items-center gap-2 pb-3 border-b border-cyan-500/20">
              <FileCheck className="w-5 h-5 text-cyan-400" />
              <span className="text-xs font-bold text-white">مصوبه ابلاغی استاندار تهران</span>
            </div>

            <div className="space-y-3 text-xs text-slate-300 leading-relaxed font-mono">
              <div className="p-2.5 rounded-lg bg-slate-900 border border-slate-800">
                <span className="text-cyan-400 font-bold block mb-1">بند ۱ - دستگاه مجری:</span>
                اداره کل غله و خدمات بازرگانی استان + سازمان جهاد کشاورزی تهران
              </div>
              <div className="p-2.5 rounded-lg bg-slate-900 border border-slate-800">
                <span className="text-cyan-400 font-bold block mb-1">بند ۲ - بسته جبرانی:</span>
                توزیع متمرکز در میادین ۲۲ گانه شهر تهران و افزایش سهمیه آرد شهرستان‌های پرجمعیت حاشیه‌ای (ملارد، بهارستان و ورامین).
              </div>
              <div className="p-2.5 rounded-lg bg-slate-900 border border-slate-800">
                <span className="text-cyan-400 font-bold block mb-1">بند ۳ - کمیته پایش:</span>
                گزارش‌دهی آنلاین روزانه از طریق داشبورد زنده نبض بازار استان تهران به معاونت هماهنگی امور اقتصادی.
              </div>
            </div>

            <button
              onClick={() => openCopilot('AGT-10')}
              className="w-full flex items-center justify-center gap-2 py-2.5 rounded-xl bg-cyan-500/20 hover:bg-cyan-500/30 border border-cyan-500/40 text-cyan-300 text-xs font-bold transition-all"
            >
              <Sparkles className="w-4 h-4" />
              <span>ارسال به دبیرخانه ستاد تنظیم بازار</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
