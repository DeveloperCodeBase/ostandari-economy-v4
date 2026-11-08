'use client';

import React, { useState, useEffect } from 'react';
import { TEHRAN_AI_AGENTS } from '@/src/data/tehranMasterData';
import { Radio, Sparkles } from 'lucide-react';

const TICKER_MESSAGES = [
  { agent: 'AGT-01', text: 'سنتز گزارش ۳۰ ثانیه‌ای صبحگاهی برای استاندار معتمدیان و دکتر عسگری صادر شد — تمامی شاخص‌های ۱۶ شهرستان در تراز سبز قرار دارد.' },
  { agent: 'AGT-05', text: 'انحراف +۶.۴٪ در قیمت گوشت گوسفندی در شهرستان بهارستان شناسایی شد — پیشنهاد: تزریق ۲۰ تن سهمیه میادین تره‌بار.' },
  { agent: 'AGT-02', text: 'تحقق ۱۱۷٪ مالیات موضوع ماده ۳۷ در ۵ماهه نخست ۱۴۰۵ با وصول ۲۵ همت در خزانه معین استان تهران.' },
  { agent: 'AGT-04', text: 'روز پوشش ذخیره استراتژیک سیلوهای گندم استان تهران به ۴۲ روز مصرف مطمئن پایتخت ارتقا یافت.' },
  { agent: 'AGT-03', text: 'افزایش سهم اوراق گام و تامین مالی زنجیره‌ای در شهرک‌های صنعتی شمس‌آباد و عباس‌آباد به ۱۸ همت.' },
  { agent: 'AGT-06', text: 'کلینیک احیای واحدهای راکد: بازگشت ۲۴ کارخانه نیمه‌فعال صفادشت و پیشوا به چرخه تولید در آبان‌ماه.' },
  { agent: 'AGT-08', text: 'کاهش میانگین زمان ترخیص گمرکی مواد اولیه در گمرک شهریار و فرودگاه امام به ۴.۸ روز.' },
  { agent: 'AGT-10', text: 'طرح مدیریت هوشمند بار شهرک صنعتی عباس‌آباد: انتقال ۲۰ مگاوات اوج بار به ساعات غیرپیک با صفر خاموشی کارگاهی.' },
];

export function LiveAgentTicker() {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setIndex((prev) => (prev + 1) % TICKER_MESSAGES.length);
    }, 6000);
    return () => clearInterval(timer);
  }, []);

  const current = TICKER_MESSAGES[index];
  const agentInfo = TEHRAN_AI_AGENTS.find((a) => a.code === current.agent) || TEHRAN_AI_AGENTS[0];

  return (
    <div className="bg-[#0B0F1D] border-b border-cyan-500/20 px-4 py-1.5 flex items-center justify-between text-xs overflow-hidden select-none">
      <div className="flex items-center gap-2 overflow-hidden flex-1">
        <div className="flex items-center gap-1 text-cyan-400 font-bold shrink-0">
          <Radio className="w-3.5 h-3.5 radar-glow" />
          <span className="text-[11px] font-mono">رادار تله‌متری ایجنت‌ها:</span>
        </div>

        <div className="flex items-center gap-2 truncate transition-all duration-300">
          <span
            className="text-[10px] font-bold px-1.5 py-0.2 rounded font-mono shrink-0"
            style={{ backgroundColor: `${agentInfo.color}25`, color: agentInfo.color }}
          >
            {agentInfo.nameFa} [{current.agent}]
          </span>
          <span className="text-slate-300 text-[11px] truncate">{current.text}</span>
        </div>
      </div>

      <div className="hidden md:flex items-center gap-2 text-[10px] text-slate-500 font-mono shrink-0">
        <Sparkles className="w-3 h-3 text-cyan-400" />
        <span>۱۰ ایجنت هوشمند آنلاین</span>
        <span>·</span>
        <span className="text-emerald-400">۱۶ شهرستان متصل</span>
      </div>
    </div>
  );
}
