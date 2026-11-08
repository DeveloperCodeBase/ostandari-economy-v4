'use client';

import React, { useState, useMemo } from 'react';
import {
  Sliders,
  TrendingUp,
  AlertTriangle,
  FileCheck2,
  HelpCircle,
  Sparkles,
  ChevronDown,
  ChevronUp,
  RotateCcw,
  Send,
  CheckCircle2,
  Info,
  ShieldAlert,
  ArrowRight,
  Bot,
} from 'lucide-react';
import { toPersianDigits, formatPersianNumber } from '@/src/utils/formatters';
import { useCommand } from '@/src/context/CommandContext';

export interface DomainLever {
  id: string;
  name: string;
  min: number;
  max: number;
  step: number;
  defaultValue: number;
  unit: string;
  description: string;
}

export interface DomainForecastMetric {
  id: string;
  label: string;
  baseline: number;
  unit: string;
  calculate: (levers: Record<string, number>) => {
    value: number;
    deltaPercent: number;
    trend: 'up' | 'down' | 'stable';
    riskLevel: 'safe' | 'warning' | 'critical';
  };
}

export interface DomainAlertRule {
  id: string;
  condition: (levers: Record<string, number>) => boolean;
  level: 'critical' | 'warning' | 'info';
  title: string;
  description: string;
  actionRecommendation: string;
}

export interface DomainGuideContent {
  summary: string;
  methodology: string;
  keyFormulas: string[];
  legalBasis: string;
  actionableAuthority: string;
}

export interface DomainScenarioConfig {
  moduleId: string;
  moduleTitle: string;
  agentCode: string;
  agentName: string;
  levers: DomainLever[];
  metrics: DomainForecastMetric[];
  alerts: DomainAlertRule[];
  guide: DomainGuideContent;
}

// 11 Comprehensive Domain Engine Configurations
export const DOMAIN_CONFIGS: Record<string, DomainScenarioConfig> = {
  treasury: {
    moduleId: 'treasury',
    moduleTitle: 'خزانه‌داری، مالیات و مولدسازی دارایی‌ها',
    agentCode: 'AGT-02',
    agentName: 'ایجنت ممیز هوشمند مالیاتی و خزانه‌داری (TAX-AI)',
    levers: [
      {
        id: 'vatFulfillment',
        name: 'درصد تحقق عوارض ارزش افزوده شهرداری‌ها و دهیاری‌ها',
        min: 60,
        max: 140,
        step: 5,
        defaultValue: 100,
        unit: '٪',
        description: 'تأثیر مستقیم بر توزیع اعتبارات عمرانی شهری و روستایی ۱۶ شهرستان',
      },
      {
        id: 'auditDigitization',
        name: 'ضریب اتصال سامانه‌های فروشگاهی به پایانه مودیان',
        min: 40,
        max: 100,
        step: 5,
        defaultValue: 78,
        unit: '٪',
        description: 'کاهش فرار مالیاتی در اصناف پرگردش بازار بزرگ تهران',
      },
      {
        id: 'assetReleaseRate',
        name: 'سرعت آزادسازی و مولدسازی املاک مازاد دستگاه‌ها',
        min: 10,
        max: 80,
        step: 5,
        defaultValue: 35,
        unit: '٪',
        description: 'تزریق نقدینگی مستقیم به خزانه‌داری معین استان تهران',
      },
    ],
    metrics: [
      {
        id: 'rev5M',
        label: 'پیش‌بینی درآمد ۶ ماهه استان تهران',
        baseline: 470,
        unit: 'همت',
        calculate: (l) => {
          const mult = 1 + (l.auditDigitization - 78) * 0.006 + (l.assetReleaseRate - 35) * 0.005;
          const val = Math.round(470 * mult * 10) / 10;
          const delta = Math.round(((val - 470) / 470) * 1000) / 10;
          return {
            value: val,
            deltaPercent: delta,
            trend: delta >= 0 ? 'up' : 'down',
            riskLevel: val >= 460 ? 'safe' : val >= 430 ? 'warning' : 'critical',
          };
        },
      },
      {
        id: 'vatSurplus',
        label: 'اعتبار ارزش افزوده قابل توزیع به شهرستان‌ها',
        baseline: 32,
        unit: 'همت',
        calculate: (l) => {
          const val = Math.round(32 * (l.vatFulfillment / 100) * 10) / 10;
          const delta = Math.round(((val - 32) / 32) * 1000) / 10;
          return {
            value: val,
            deltaPercent: delta,
            trend: delta >= 0 ? 'up' : 'down',
            riskLevel: val >= 30 ? 'safe' : 'warning',
          };
        },
      },
      {
        id: 'taxDeficitRisk',
        label: 'شاخص ریسک انحراف از سقف بودجه مصوب',
        baseline: 12,
        unit: 'از ۱۰۰',
        calculate: (l) => {
          let score = 20 - (l.auditDigitization - 50) * 0.3 - (l.assetReleaseRate - 30) * 0.2;
          score = Math.max(5, Math.min(95, Math.round(score)));
          return {
            value: score,
            deltaPercent: Math.round((score - 12) * 10) / 10,
            trend: score < 12 ? 'down' : 'up',
            riskLevel: score <= 20 ? 'safe' : score <= 45 ? 'warning' : 'critical',
          };
        },
      },
    ],
    alerts: [
      {
        id: 'alt-tr-1',
        condition: (l) => l.auditDigitization < 60,
        level: 'critical',
        title: 'افت پوشش سامانه مودیان به زیر ۶۰٪',
        description: 'خطر ریزش درآمدهای ابرازی اصناف مرکزی تهران به میزان حداقل ۱۸ همت در فصل جاری.',
        actionRecommendation: 'ابلاغ ضرب‌الاجل ۴۸ ساعته به اداره کل امور مالیاتی استان جهت بازرسی تراکنش‌های بانکی مشکوک.',
      },
      {
        id: 'alt-tr-2',
        condition: (l) => l.assetReleaseRate < 25,
        level: 'warning',
        title: 'کندی در اجرای مصوبات هیات مولدسازی',
        description: 'تاخیر در عرضه مزایده‌ای ۳۲ فقره ملک راکد دستگاه‌های دولتی در شهر تهران.',
        actionRecommendation: 'تشکیل کمیته ویژه خلع ید و مزایده با حضور دادستان استان و بازرسی کل کشور.',
      },
    ],
    guide: {
      summary: 'این بخش عملکرد تحقق درآمدهای مالیاتی و غیرمالیاتی، واریزی‌های خزانه معین استان و سهم توزیع ارزش افزوده را به صورت بلادرنگ پایش می‌کند.',
      methodology: 'تحلیل داده‌ها از تقاطع درگاه ملی مالیات، خزانه کل کشور و پایانه مودیان انجام می‌شود. هر تغییر در ضرایب وصولی مستقیماً روی سهم اعتباری ۱۶ شهرستان بازتاب دارد.',
      keyFormulas: [
        'درآمد تحقق‌یافته = درآمد ابرازی + وصولی قطعی سامانه‌ها + عوارض گمرکی',
        'سهم ارزش افزوده هر شهرستان = ۸۸٪ جمعیت + ۱۲٪ ضریب محرومیت پهنه‌ای',
      ],
      legalBasis: 'ماده ۳۷ و ۳۸ قانون مالیات بر ارزش افزوده و قانون بودجه سنواتی کل کشور.',
      actionableAuthority: 'استاندار و رئیس کارگروه درآمدها حق بازتوزیع ۲۰٪ اعتبارات مازاد وصولی را به پروژه‌های اولویت‌دار دارند.',
    },
  },

  banking: {
    moduleId: 'banking',
    moduleTitle: 'شبکه بانکی، تسهیلات و هدایت اعتبار',
    agentCode: 'AGT-03',
    agentName: 'ایجنت بازرس شبکه بانکی و هدایت اعتبار (BANK-AI)',
    levers: [
      {
        id: 'workingCapitalShare',
        name: 'سهم تسهیلات اعطایی به سرمایه در گردش صنایع',
        min: 30,
        max: 85,
        step: 5,
        defaultValue: 62,
        unit: '٪',
        description: 'تامین نقدینگی خرید مواد اولیه کارخانجات شمس‌آباد و پاکدشت',
      },
      {
        id: 'ldrTarget',
        name: 'نسبت هدف مصارف به منابع بانکی استان (LDR)',
        min: 45,
        max: 85,
        step: 2,
        defaultValue: 60,
        unit: '٪',
        description: 'جلوگیری از خروج منابع سپرده‌های تهرانی‌ها به سایر بخش‌های غیرمولد',
      },
      {
        id: 'tab18Allocation',
        name: 'درصد تحقق تسهیلات تکلیفی تبصره ۱۸ و اشتغال',
        min: 30,
        max: 100,
        step: 5,
        defaultValue: 68,
        unit: '٪',
        description: 'پرداخت وام‌های قرض‌الحسنه به کارگاه‌های خرد و خانگی',
      },
    ],
    metrics: [
      {
        id: 'facilityVol',
        label: 'مانده تسهیلات جاری به بخش مولد',
        baseline: 1420,
        unit: 'همت',
        calculate: (l) => {
          const val = Math.round(1420 * (1 + (l.ldrTarget - 60) * 0.012));
          return {
            value: val,
            deltaPercent: Math.round(((val - 1420) / 1420) * 1000) / 10,
            trend: val >= 1420 ? 'up' : 'down',
            riskLevel: val >= 1380 ? 'safe' : 'warning',
          };
        },
      },
      {
        id: 'smefinanced',
        label: 'واحدهای صنعتی تأمین مالی شده در ماه',
        baseline: 340,
        unit: 'واحد',
        calculate: (l) => {
          const val = Math.round(340 * (l.workingCapitalShare / 62) * (l.tab18Allocation / 68));
          return {
            value: val,
            deltaPercent: Math.round(((val - 340) / 340) * 1000) / 10,
            trend: val >= 340 ? 'up' : 'down',
            riskLevel: val >= 300 ? 'safe' : 'critical',
          };
        },
      },
      {
        id: 'nplRate',
        label: 'ریسک مطالبات غیرجاری بانکی (NPL)',
        baseline: 5.8,
        unit: '٪',
        calculate: (l) => {
          const val = Math.round((5.8 + (l.ldrTarget > 70 ? (l.ldrTarget - 70) * 0.12 : -0.2)) * 10) / 10;
          return {
            value: val,
            deltaPercent: Math.round(((val - 5.8) / 5.8) * 1000) / 10,
            trend: val <= 6 ? 'down' : 'up',
            riskLevel: val <= 6.5 ? 'safe' : val <= 8 ? 'warning' : 'critical',
          };
        },
      },
    ],
    alerts: [
      {
        id: 'alt-bk-1',
        condition: (l) => l.workingCapitalShare < 50,
        level: 'critical',
        title: 'ریسک قفل شدن خطوط تولید شهرک‌های صنعتی',
        description: 'کاهش سهم سرمایه در گردش به زیر ۵۰٪ منجر به بحران نقدینگی در ۳۴۰ کارخانه قطعه‌سازی خواهد شد.',
        actionRecommendation: 'فراخوان مدیران شعب سرپرستی بانک‌های دولتی تهران در شورای هماهنگی بانک‌ها به ریاست استاندار.',
      },
    ],
    guide: {
      summary: 'نظارت هوشمند بر جریان سپرده‌ها، تسهیلات تکلیفی تبصره ۱۸ و نسبت مصارف به منابع (LDR) شبکه بانکی استان تهران.',
      methodology: 'داده‌ها بر پایه وب‌سرویس بانک مرکزی جمهوری اسلامی ایران و پورتال سرپرستی بانک‌های استان تهران تجمیع می‌گردد.',
      keyFormulas: [
        'LDR = (مجموع مصارف و تسهیلات اعطایی / مجموع سپرده‌های موثر پس از کسر سپرده قانونی) × ۱۰۰',
        'تخصیص تبصره ۱۸ = مجموع معرفی‌های سامانه بهین‌یاب که منجر به عقد قرارداد بانکی شده است.',
      ],
      legalBasis: 'مصوبات ستاد تسهیل و رفع موانع تولید و بخشنامه‌های اعتباری بانک مرکزی.',
      actionableAuthority: 'استاندار می‌تواند بانک‌های متخلف در عدم پرداخت تسهیلات تکلیفی را به بازرسی بانک مرکزی معرفی و حساب‌های دستگاه‌های استانی را منتقل نماید.',
    },
  },

  industry: {
    moduleId: 'industry',
    moduleTitle: 'شهرک‌های صنعتی، معادن و احیای تولید (صمت)',
    agentCode: 'AGT-04',
    agentName: 'ایجنت دیده‌بان شهرک‌های صنعتی و احیای تولید (IND-AI)',
    levers: [
      {
        id: 'powerCurtailment',
        name: 'ساعات محدودیت هفتگی برق شهرک‌ها در ساعات پیک',
        min: 0,
        max: 48,
        step: 4,
        defaultValue: 16,
        unit: 'ساعت/هفته',
        description: 'مدیریت بار صنعتی فیدرهای شمس‌آباد، عباس‌آباد و نصیرآباد',
      },
      {
        id: 'revivalTarget',
        name: 'هدف احیای ماهانه واحدهای راکد و تملیک‌شده بانکی',
        min: 5,
        max: 50,
        step: 5,
        defaultValue: 22,
        unit: 'واحد/ماه',
        description: 'تعیین تکلیف سوله‌ها و خطوط متوقف در ۲۲ شهرک صنعتی',
      },
      {
        id: 'techUpgradeGrant',
        name: 'تخصیص یارانه تسهیلات نوسازی و ارتقای فناوری',
        min: 10,
        max: 90,
        step: 10,
        defaultValue: 45,
        unit: 'میلیارد تومان',
        description: 'کاهش آلایندگی و افزایش بهره‌وری انرژی خطوط ریخته‌گری و شیمیایی',
      },
    ],
    metrics: [
      {
        id: 'indOutputLoss',
        label: 'برآورد افت ارزش تولید ناشی از ناترازی انرژی',
        baseline: 8.4,
        unit: 'همت/ماه',
        calculate: (l) => {
          const val = Math.round((l.powerCurtailment * 0.525) * 10) / 10;
          return {
            value: val,
            deltaPercent: Math.round(((val - 8.4) / 8.4) * 1000) / 10,
            trend: val <= 8.4 ? 'down' : 'up',
            riskLevel: val <= 6 ? 'safe' : val <= 12 ? 'warning' : 'critical',
          };
        },
      },
      {
        id: 'activeFactories',
        label: 'تعداد کل صنایع فعال ثبت‌شده در پایان ماه',
        baseline: 19850,
        unit: 'کارخانه',
        calculate: (l) => {
          const val = 19850 + l.revivalTarget * 2;
          return {
            value: val,
            deltaPercent: Math.round(((val - 19850) / 19850) * 1000) / 10,
            trend: 'up',
            riskLevel: 'safe',
          };
        },
      },
      {
        id: 'industrialJobCreated',
        label: 'فرصت‌های شغلی تثبیت و ایجاد شده',
        baseline: 3200,
        unit: 'نفر/ماه',
        calculate: (l) => {
          const val = Math.round(l.revivalTarget * 65 + l.techUpgradeGrant * 15);
          return {
            value: val,
            deltaPercent: Math.round(((val - 3200) / 3200) * 1000) / 10,
            trend: val >= 3200 ? 'up' : 'down',
            riskLevel: val >= 2800 ? 'safe' : 'warning',
          };
        },
      },
    ],
    alerts: [
      {
        id: 'alt-ind-1',
        condition: (l) => l.powerCurtailment > 24,
        level: 'critical',
        title: 'هشدار عبور محدودیت برق صنعتی از آستانه تاب‌آوری',
        description: 'محدودیت بیش از ۲۴ ساعت در هفته موجب آسیب به کوره‌های پیوسته و فساد مواد اولیه ریخته‌گری در پاکدشت می‌گردد.',
        actionRecommendation: 'دستور فوری انتقال شیفت کاری به روزهای جمعه و ساعات شب همراه با تسهیلات سوخت دیزل‌ژنراتورها.',
      },
    ],
    guide: {
      summary: 'رصد ۲۲ شهرک صنعتی، ۱۷ هزار واحد تولیدی و وضعیت ناترازی برق و گاز صنعتی در استان تهران.',
      methodology: 'داده‌ها از سازمان صنعت، معدن و تجارت استان تهران و شرکت شهرک‌های صنعتی استان تهران استخراج می‌شود.',
      keyFormulas: [
        'افت تولید = ساعات قطعی × ظرفیت اسمی فیدر × ضریب ارزش افزوده هر کیلووات‌ساعت',
        'شاخص بهره‌وری شهرک = نسبت واحدهای فعال به کل قطعات واگذارشده',
      ],
      legalBasis: 'قانون رفع موانع تولید رقابت‌پذیر و مصوبات ستاد تسهیل استان.',
      actionableAuthority: 'استاندار اختیار صدور معافیت‌های استانی تقسیط بدهی و بیمه کارگاه‌های بحرانی را دارد.',
    },
  },

  bread: {
    moduleId: 'bread',
    moduleTitle: 'زنجیره گندم، سیلوها، آرد و نان (نانینو)',
    agentCode: 'AGT-06',
    agentName: 'ایجنت نگهبان زنجیره گندم، آرد و نانینو (BREAD-AI)',
    levers: [
      {
        id: 'naninoAdjustment',
        name: 'درصد تعدیل الگوریتمی سهمیه بر اساس تراکنش نانینو',
        min: -20,
        max: 20,
        step: 2,
        defaultValue: 0,
        unit: '٪',
        description: 'تشویق نانوایی‌های پاک‌دست و کسر سهمیه متخلفان فروش خارج از شبکه',
      },
      {
        id: 'strategicReserveDays',
        name: 'پوشش هدف ذخایر استراتژیک گندم سیلوهای استان',
        min: 20,
        max: 90,
        step: 5,
        defaultValue: 42,
        unit: 'روز',
        description: 'حفظ امنیت غذایی ۱۰.۴ میلیون نفر ساکن تهران و حومه',
      },
      {
        id: 'flourQualityIndex',
        name: 'درصد اختلاط گندم کیفی در کارخانجات آرد استان',
        min: 30,
        max: 90,
        step: 5,
        defaultValue: 65,
        unit: '٪',
        description: 'ارتقای پروتئین و سبوس‌گیری استاندارد آرد نوع ۱ و ۲',
      },
    ],
    metrics: [
      {
        id: 'wheatStockTons',
        label: 'موجودی کل گندم سیلوهای فعال تهران',
        baseline: 185000,
        unit: 'تن',
        calculate: (l) => {
          const val = Math.round(l.strategicReserveDays * 4400);
          return {
            value: val,
            deltaPercent: Math.round(((val - 185000) / 185000) * 1000) / 10,
            trend: val >= 185000 ? 'up' : 'down',
            riskLevel: val >= 170000 ? 'safe' : val >= 120000 ? 'warning' : 'critical',
          };
        },
      },
      {
        id: 'flourWastePrevented',
        label: 'جلوگیری از انحراف و قاچاق آرد یارانه‌ای',
        baseline: 420,
        unit: 'تن/ماه',
        calculate: (l) => {
          const val = Math.round(420 * (1 + l.naninoAdjustment * 0.04));
          return {
            value: val,
            deltaPercent: Math.round(((val - 420) / 420) * 1000) / 10,
            trend: val >= 420 ? 'up' : 'down',
            riskLevel: 'safe',
          };
        },
      },
      {
        id: 'queueTimeMin',
        label: 'میانگین زمان صف شهروندان در نانوایی‌ها',
        baseline: 9.5,
        unit: 'دقیقه',
        calculate: (l) => {
          const val = Math.round((9.5 - l.naninoAdjustment * 0.15) * 10) / 10;
          return {
            value: val,
            deltaPercent: Math.round(((val - 9.5) / 9.5) * 1000) / 10,
            trend: val <= 9.5 ? 'down' : 'up',
            riskLevel: val <= 10 ? 'safe' : val <= 15 ? 'warning' : 'critical',
          };
        },
      },
    ],
    alerts: [
      {
        id: 'alt-br-1',
        condition: (l) => l.strategicReserveDays < 30,
        level: 'critical',
        title: 'هشدار قرمز: سقوط ذخایر گندم پایتخت به زیر ۳۰ روز',
        description: 'خطر کمبود آرد در شهرستان‌های اقماری پرجمعیت نظیر بهارستان، ملارد و اسلامشهر.',
        actionRecommendation: 'درخواست فوری صدور حواله انتقال ۱۰۰ هزار تن گندم از مبادی ورودی بنادر جنوب و سیلوهای خوزستان به سیلوی بزرگ ری.',
      },
    ],
    guide: {
      summary: 'پایش زنجیره گندم، آرد، حمل سیلوها و عملکرد ۹۶۴۰ نانوایی متصل به کارتخوان‌های هوشمند نانینو در تهران.',
      methodology: 'تراکنش‌های پایانه هوشمند نانینو با ظرفیت تولید و سهمیه ورودی هر واحد تطبیق داده می‌شود.',
      keyFormulas: [
        'مصرف روزانه گندم تهران = ۴,۴۰۰ تن در روز (معادل ۱۱۰ هزار کیسه آرد)',
        'شاخص انحراف نانینو = (تراکنش ثبت‌شده کارت بانکی / معادل وزن سهمیه تخصیص‌یافته) × ۱۰۰',
      ],
      legalBasis: 'طرح مردمی‌سازی و توزیع عادلانه یارانه‌ها و مصوبات کارگروه آرد و نان استان.',
      actionableAuthority: 'کارگروه آرد و نان استان به ریاست معاون اقتصادی استاندار اختیار ابطال یا جابجایی پروانه نانوایان متخلف را دارد.',
    },
  },

  bazaar: {
    moduleId: 'bazaar',
    moduleTitle: 'تنظیم بازار، میادین تره‌بار و اصناف',
    agentCode: 'AGT-05',
    agentName: 'ایجنت تنظیم بازار، میادین تره‌بار و ضداحتکار (BAZAAR-AI)',
    levers: [
      {
        id: 'coldStorageInjection',
        name: 'عرضه ذخایر سردخانه‌ای مرغ و گوشت منجمد به بازار',
        min: 0,
        max: 500,
        step: 25,
        defaultValue: 150,
        unit: 'تن/روز',
        description: 'مهار حباب قیمت در ۳۰۵ میدان میوه و تره‌بار شهرداری تهران',
      },
      {
        id: 'inspectionPatrols',
        name: 'تعداد تیم‌های بازرسی مشترک گشت تعزیرات و صمت',
        min: 20,
        max: 180,
        step: 10,
        defaultValue: 75,
        unit: 'تیم/روز',
        description: 'رسیدگی به شکایات سامانه ۱۲۴ در میادین و فروشگاه‌های زنجیره‌ای',
      },
      {
        id: 'directSaleMarginLimit',
        name: 'سقف مجاز سود خرده‌فروشی میوه و صیفی‌جات',
        min: 15,
        max: 35,
        step: 2,
        defaultValue: 25,
        unit: '٪',
        description: 'کنترل واسطه‌گری در میدان مرکزی میوه و تره‌بار تهران',
      },
    ],
    metrics: [
      {
        id: 'priceGapPercent',
        label: 'شکاف قیمت میادین با نرخ کف بازار آزاد',
        baseline: 38,
        unit: '٪ ارزان‌تر',
        calculate: (l) => {
          const val = Math.round((38 + (l.coldStorageInjection - 150) * 0.05 - (l.directSaleMarginLimit - 25) * 0.4) * 10) / 10;
          return {
            value: val,
            deltaPercent: Math.round(((val - 38) / 38) * 1000) / 10,
            trend: val >= 38 ? 'up' : 'down',
            riskLevel: val >= 30 ? 'safe' : 'warning',
          };
        },
      },
      {
        id: 'inflationImpulse',
        label: 'شاخص فشار تورمی خوراکی‌ها در استان',
        baseline: 2.8,
        unit: '٪ ماهانه',
        calculate: (l) => {
          const val = Math.round((2.8 - (l.coldStorageInjection - 150) * 0.003 - (l.inspectionPatrols - 75) * 0.008) * 10) / 10;
          return {
            value: val,
            deltaPercent: Math.round(((val - 2.8) / 2.8) * 1000) / 10,
            trend: val <= 2.8 ? 'down' : 'up',
            riskLevel: val <= 2.5 ? 'safe' : val <= 4 ? 'warning' : 'critical',
          };
        },
      },
    ],
    alerts: [
      {
        id: 'alt-bz-1',
        condition: (l) => l.coldStorageInjection < 50,
        level: 'warning',
        title: 'خطر جهش قیمت مرغ گرم در شهرستان‌های پرجمعیت',
        description: 'کاهش عرضه ذخایر منجمد سبب افزایش قیمت آزاد به بیش از ۲۲٪ نرخ مصوب در بهارستان و قدس خواهد شد.',
        actionRecommendation: 'تخصیص فوری سهمیه ۱۰۰ تنی به فروشگاه‌های اتکا و رفاه مناطق جنوبی تهران.',
      },
    ],
    guide: {
      summary: 'نظارت بر شبکه توزیع اقلام اساسی، میادین تره‌بار و رسیدگی به گشت‌های ۱۲۴ در استان تهران.',
      methodology: 'پایش قیمت‌های روزانه از ۳۰۵ میدان شهرداری، سامانه‌های بازرگانی دولتی و اتحادیه‌های صنفی.',
      keyFormulas: [
        'نرخ شکاف قیمتی = ((قیمت بازار آزاد - نرخ مصوب میادین) / نرخ مصوب) × ۱۰۰',
        'ضریب نفوذ میادین = سهم تامین خانوارهای تهرانی از میادین شهرداری (هم‌اکنون ۴۵٪)',
      ],
      legalBasis: 'قانون نظام صنفی و مصوبات ستاد هماهنگی اقتصادی دولت.',
      actionableAuthority: 'ستاد تنظیم بازار استان به ریاست استاندار حق پلمب فوری و الزام توزیع انبارهای احتکارشده را دارد.',
    },
  },

  agriculture: {
    moduleId: 'agriculture',
    moduleTitle: 'جهاد کشاورزی، گلخانه‌ها و دامپروری',
    agentCode: 'AGT-07',
    agentName: 'ایجنت کشاورزی مدرن و امنیت زیستی (AGRI-AI)',
    levers: [
      {
        id: 'greenhouseModernization',
        name: 'سطح توسعه گلخانه‌های هیدروپونیک با بهره‌وری بالا',
        min: 200,
        max: 2000,
        step: 100,
        defaultValue: 1258,
        unit: 'هکتار',
        description: 'صرفه‌جویی ۸۵ درصدی آب در دشت‌های ورامین، پیشوا و پاکدشت',
      },
      {
        id: 'feedSubsidyPass',
        name: 'نرخ پوشش نهاده‌های دامی مدت‌دار به گاوداری‌های شیری',
        min: 40,
        max: 100,
        step: 5,
        defaultValue: 74,
        unit: '٪',
        description: 'تثبیت قیمت شیر خام کارخانجات لبنی پگاه و پاک',
      },
      {
        id: 'waterRecyclingRate',
        name: 'استفاده از پساب تصفیه‌شده جنوب تهران در اراضی زراعی',
        min: 10,
        max: 80,
        step: 5,
        defaultValue: 38,
        unit: 'میلیون م۳/سال',
        description: 'کاهش برداشت از سفره‌های آب زیرزمینی دشت ورامین',
      },
    ],
    metrics: [
      {
        id: 'agriWaterSaved',
        label: 'حجم آب کشاورزی صرفه‌جویی شده',
        baseline: 84,
        unit: 'میلیون م۳',
        calculate: (l) => {
          const val = Math.round((l.greenhouseModernization * 0.065 + l.waterRecyclingRate * 0.8) * 10) / 10;
          return {
            value: val,
            deltaPercent: Math.round(((val - 84) / 84) * 1000) / 10,
            trend: 'up',
            riskLevel: 'safe',
          };
        },
      },
      {
        id: 'milkMeatOutput',
        label: 'تولید ماهانه شیر و گوشت قرمز استان',
        baseline: 92,
        unit: 'هزار تن',
        calculate: (l) => {
          const val = Math.round((92 * (l.feedSubsidyPass / 74)) * 10) / 10;
          return {
            value: val,
            deltaPercent: Math.round(((val - 92) / 92) * 1000) / 10,
            trend: val >= 92 ? 'up' : 'down',
            riskLevel: val >= 85 ? 'safe' : 'warning',
          };
        },
      },
    ],
    alerts: [
      {
        id: 'alt-ag-1',
        condition: (l) => l.feedSubsidyPass < 60,
        level: 'critical',
        title: 'ریسک کشتار دام‌های مولد در قطب‌های دامپروری ملارد و شهریار',
        description: 'کمبود کنجاله سویا و ذرت منجر به ضرر دامداران و کاهش تولید شیر استان خواهد شد.',
        actionRecommendation: 'ابلاغ ترخیص اعتباری نهاده‌ها در گمرک شهریار با ضمانت‌نامه بانکی ۷۲ ساعته.',
      },
    ],
    guide: {
      summary: 'پایش گلخانه‌های صنعتی، تولیدات دامی و مدیریت منابع آب کشاورزی دشت‌های جنوبی و شرقی تهران.',
      methodology: 'تلفیق داده‌های سامانه بازارگاه نهاده‌ها، ماهواره‌های سنجش از دور و شرکت آب منطقه‌ای تهران.',
      keyFormulas: [
        'بهره‌وری آب گلخانه‌ای = ۴۵ کیلوگرم محصول به ازای هر مترمکعب آب (در برابر ۴ کیلوگرم در فضای باز)',
        'تراز نهاده = میزان توزیع کنجاله و جو نسبت به پلاک‌گذاری دام‌های ثبت‌شده در سامانه هویت‌گذاری',
      ],
      legalBasis: 'قانون افزایش بهره‌وری بخش کشاورزی و مصوبات شورای کشاورزی استان.',
      actionableAuthority: 'استاندار اختیار تخصیص پساب تصفیه‌خانه‌ها و اراضی ملی جهت احداث شهرک‌های گلخانه‌ای را دارد.',
    },
  },

  customs: {
    moduleId: 'customs',
    moduleTitle: 'گمرکات ۶گانه، صادرات، واردات و ترخیص کالا',
    agentCode: 'AGT-08',
    agentName: 'ایجنت فرمانده گمرکات ۶گانه و لجستیک (CUSTOMS-AI)',
    levers: [
      {
        id: 'greenLineShare',
        name: 'سهم ترخیص از مسیر سبز گمرکی برای صنایع خوش‌حساب',
        min: 20,
        max: 80,
        step: 5,
        defaultValue: 48,
        unit: '٪',
        description: 'ترخیص زیر ۴۸ ساعت قطعات یدکی و مواد اولیه کارخانجات',
      },
      {
        id: 'demurrageWaiverDays',
        name: 'سقف مجاز معافیت انبارداری کانتینرهای استراتژیک',
        min: 3,
        max: 20,
        step: 1,
        defaultValue: 7,
        unit: 'روز',
        description: 'کاهش هزینه تمام‌شده نهاده‌ها و کالاهای اساسی',
      },
      {
        id: 'electronicSingleWindow',
        name: 'پوشش سامانه جامع پنجره واحد فرودگاه امام و شهریار',
        min: 50,
        max: 100,
        step: 5,
        defaultValue: 88,
        unit: '٪',
        description: 'حذف تشریفات کاغذی و اتصال به آزمایشگاه‌های استاندارد',
      },
    ],
    metrics: [
      {
        id: 'avgClearanceDays',
        label: 'میانگین زمان ترخیص کالا در گمرکات استان',
        baseline: 5.4,
        unit: 'روز',
        calculate: (l) => {
          const val = Math.round((5.4 - (l.greenLineShare - 48) * 0.05 - (l.electronicSingleWindow - 88) * 0.03) * 10) / 10;
          return {
            value: val,
            deltaPercent: Math.round(((val - 5.4) / 5.4) * 1000) / 10,
            trend: val <= 5.4 ? 'down' : 'up',
            riskLevel: val <= 4.5 ? 'safe' : val <= 7 ? 'warning' : 'critical',
          };
        },
      },
      {
        id: 'exportHemmat',
        label: 'صادرات غیرنفتی ماهانه استان تهران',
        baseline: 18.5,
        unit: 'همت',
        calculate: (l) => {
          const val = Math.round((18.5 * (1 + (l.greenLineShare - 48) * 0.008)) * 10) / 10;
          return {
            value: val,
            deltaPercent: Math.round(((val - 18.5) / 18.5) * 1000) / 10,
            trend: 'up',
            riskLevel: 'safe',
          };
        },
      },
    ],
    alerts: [
      {
        id: 'alt-cst-1',
        condition: (l) => l.greenLineShare < 35,
        level: 'warning',
        title: 'رسوب کانتینرها در انبارهای گمرک فرودگاه امام و شهریار',
        description: 'طولانی شدن زمان توقف موجب جریمه دموراژ و خواب سرمایه صنایع دارویی و خودرویی خواهد شد.',
        actionRecommendation: 'برگزاری جلسه فوری با ستاد مرکزی گمرک جمهوری اسلامی جهت فعال‌سازی مسیر سبز خودکار.',
      },
    ],
    guide: {
      summary: 'پایش عملکرد ۶ گمرک استان تهران (فرودگاه امام، تهران شهریار، غرب تهران، امانات پستی، منطقه ویژه اقتصادی پیام و ری).',
      methodology: 'داده‌ها از سامانه جامع امور گمرکی (EPL) و پنجره واحد تجارت فرامرزی خوانده می‌شود.',
      keyFormulas: [
        'زمان ماندگاری = تاریخ ورود مانیفست تا صدور پته الکترونیکی خروج کالا',
        'ضریب ریسک گمرکی = نسبت کوتاژهای ارجاع‌شده به مسیر قرمز و آزمایشگاه به کل کوتاژها',
      ],
      legalBasis: 'قانون امور گمرکی و مقررات صادرات و واردات سال ۱۴۰۵.',
      actionableAuthority: 'استاندار می‌تواند ترخیص درصدی ۹۰٪ کالاهای واحدهای تولیدی بحرانی را تا زمان تعیین تکلیف نهایی ابلاغ کند.',
    },
  },

  labor: {
    moduleId: 'labor',
    moduleTitle: 'اشتغال، بازار کار، تامین اجتماعی و رفاه',
    agentCode: 'AGT-09',
    agentName: 'ایجنت تحلیلگر اشتغال و تامین اجتماعی (LABOR-AI)',
    levers: [
      {
        id: 'employerInsuranceRelief',
        name: 'تخفیف سهم بیمه کارفرما برای استخدام نیروی کار جوان',
        min: 0,
        max: 50,
        step: 5,
        defaultValue: 20,
        unit: '٪ تخفیف',
        description: 'کاهش هزینه سربار اشتغال جدید در کارگاه‌های تولیدی',
      },
      {
        id: 'microLoansTarget',
        name: 'تسهیلات مشاغل خانگی در شهرستان‌های کم‌برخوردار',
        min: 50,
        max: 600,
        step: 50,
        defaultValue: 250,
        unit: 'میلیارد تومان',
        description: 'تمرکز بر شهرستان‌های قدس، قرچک، بهارستان و ملارد',
      },
      {
        id: 'skillsMismatchReduction',
        name: 'ضریب آموزش‌های فنی‌وحرفه‌ای منطبق بر نیاز شهرک‌ها',
        min: 30,
        max: 95,
        step: 5,
        defaultValue: 65,
        unit: '٪',
        description: 'پیوند دانشگاه‌های فنی و پارک‌های علم و فناوری با صنایع استان',
      },
    ],
    metrics: [
      {
        id: 'unemploymentRateEst',
        label: 'نرخ بیکاری فصلی برآوردی استان تهران',
        baseline: 7.2,
        unit: '٪',
        calculate: (l) => {
          const val = Math.round((7.2 - (l.employerInsuranceRelief - 20) * 0.04 - (l.microLoansTarget - 250) * 0.002) * 10) / 10;
          return {
            value: val,
            deltaPercent: Math.round(((val - 7.2) / 7.2) * 1000) / 10,
            trend: val <= 7.2 ? 'down' : 'up',
            riskLevel: val <= 6.8 ? 'safe' : val <= 8.5 ? 'warning' : 'critical',
          };
        },
      },
      {
        id: 'newInsuredMonthly',
        label: 'بیمه‌شدگان اجباری جدید تامین اجتماعی',
        baseline: 14800,
        unit: 'نفر/ماه',
        calculate: (l) => {
          const val = Math.round(14800 * (1 + (l.employerInsuranceRelief - 20) * 0.01 + (l.skillsMismatchReduction - 65) * 0.005));
          return {
            value: val,
            deltaPercent: Math.round(((val - 14800) / 14800) * 1000) / 10,
            trend: 'up',
            riskLevel: 'safe',
          };
        },
      },
    ],
    alerts: [
      {
        id: 'alt-lb-1',
        condition: (l) => l.microLoansTarget < 100,
        level: 'warning',
        title: 'کندی در جذب اعتبارات اشتغال‌زایی مشاغل خرد',
        description: 'خطر عقب‌ماندگی از تعهد ایجاد ۱۸۰ هزار شغل ناخالص استان تهران در سال جاری.',
        actionRecommendation: 'ابلاغ سهمیه بانک‌های عامل در کارگروه اشتغال و سرمایه‌گذاری استان.',
      },
    ],
    guide: {
      summary: 'پایش بازار کار، بیمه‌شدگان تامین اجتماعی و فرصت‌های اشتغال ثبت‌شده در سامانه رصد اشتغال استان تهران.',
      methodology: 'داده‌ها از اداره کل تعاون، کار و رفاه اجتماعی و شعب تامین اجتماعی استان تهران پالایش می‌شود.',
      keyFormulas: [
        'نرخ مشارکت اقتصادی = (جمعیت فعال / جمعیت در سن کار بالای ۱۵ سال) × ۱۰۰',
        'خالص اشتغال = تعداد بیمه‌شدگان جدید منهای ریزش‌های بیمه‌ای و بازنشستگی',
      ],
      legalBasis: 'قانون کار، قانون ساختار نظام جامع رفاه و سند اشتغال استان تهران.',
      actionableAuthority: 'استاندار به عنوان رئیس کارگروه اشتغال و سرمایه‌گذاری حق جابجایی خطوط اعتباری بین شهرستان‌ها را دارد.',
    },
  },

  energy: {
    moduleId: 'energy',
    moduleTitle: 'ناترازی انرژی، شبکه برق منطقه‌ای و ۵ سد تهران',
    agentCode: 'AGT-10',
    agentName: 'ایجنت کنترلگر ناترازی انرژی و ۵ سد تهران (ENERGY-AI)',
    levers: [
      {
        id: 'gasToPowerPlants',
        name: 'تخصیص گاز طبیعی پایدار به نیروگاه‌های تهران',
        min: 20,
        max: 60,
        step: 2,
        defaultValue: 42,
        unit: 'میلیون مترمکعب/روز',
        description: 'جلوگیری از مازوت‌سوزی در نیروگاه‌های ری و منتظر قائم و حفظ هوای پاک',
      },
      {
        id: 'solarRooftopTarget',
        name: 'ظرفیت نیروگاه‌های خورشیدی مستقر در شهرک‌های صنعتی',
        min: 50,
        max: 800,
        step: 50,
        defaultValue: 220,
        unit: 'مگاوات',
        description: 'تولید برق پاک خودتأمین در شمس‌آباد، پرند و عباس‌آباد',
      },
      {
        id: 'damWaterQuota',
        name: 'سقف برداشت روزانه شرب از ۵ سد استان (امیرکبیر، لتیان و...) ',
        min: 1.8,
        max: 3.8,
        step: 0.1,
        defaultValue: 2.7,
        unit: 'میلیون م۳/روز',
        description: 'مدیریت تراز منفی آبخوان‌ها و پرشدگی مخازن',
      },
    ],
    metrics: [
      {
        id: 'powerDeficitMW',
        label: 'کسری برق استان تهران در ساعات اوج بار',
        baseline: 1450,
        unit: 'مگاوات',
        calculate: (l) => {
          const val = Math.max(100, Math.round(1450 - (l.gasToPowerPlants - 42) * 45 - (l.solarRooftopTarget - 220) * 0.9));
          return {
            value: val,
            deltaPercent: Math.round(((val - 1450) / 1450) * 1000) / 10,
            trend: val <= 1450 ? 'down' : 'up',
            riskLevel: val <= 800 ? 'safe' : val <= 1500 ? 'warning' : 'critical',
          };
        },
      },
      {
        id: 'damsFillPercent',
        label: 'میانگین ذخیره حجم آب در ۵ سد تهران',
        baseline: 28,
        unit: '٪ پرشدگی',
        calculate: (l) => {
          const val = Math.round((28 - (l.damWaterQuota - 2.7) * 4) * 10) / 10;
          return {
            value: val,
            deltaPercent: Math.round(((val - 28) / 28) * 1000) / 10,
            trend: val >= 28 ? 'up' : 'down',
            riskLevel: val >= 35 ? 'safe' : val >= 25 ? 'warning' : 'critical',
          };
        },
      },
    ],
    alerts: [
      {
        id: 'alt-en-1',
        condition: (l) => l.damWaterQuota > 3.2,
        level: 'critical',
        title: 'هشدار افت شدید تراز ۵ سد تأمین‌کننده آب شرب تهران',
        description: 'حجم ذخیره آب پشت سدهای لتیان و ماملو به کمتر از آستانه اطمینان هیدرولیکی خواهد رسید.',
        actionRecommendation: 'دستور فوری فعال‌سازی رینگ قمر بنی‌هاشم و تقویت انتقال آب تصفیه‌شده سد طالقان به غرب تهران.',
      },
    ],
    guide: {
      summary: 'پایش ناترازی برق منطقه‌ای تهران، گاز مصرفی نیروگاه‌ها و وضعیت ذخیره ۵ سد بزرگ (امیرکبیر، لتیان، لار، طالقان و ماملو).',
      methodology: 'داده‌ها از دیسپاچینگ شرکت برق منطقه‌ای، شرکت گاز استان و شرکت آب منطقه‌ای تهران ثبت می‌شود.',
      keyFormulas: [
        'ناترازی برق = پیک مصرف استان (حدود ۵۵۰۰ مگاوات) منهای کل تولید در دسترس نیروگاه‌های استانی',
        'تراز سدها = (حجم فعلی مخازن ۵ سد / گنجایش کل ۱.۸۸ میلیارد مترمکعب) × ۱۰۰',
      ],
      legalBasis: 'قانون مانع‌زدایی از توسعه صنعت برق و مصوبات ستاد مدیریت بحران استان.',
      actionableAuthority: 'استاندار به عنوان رئیس شورای مدیریت بحران اختیار اعلام تغییر ساعت کاری و مدیریت بار صنایع را دارد.',
    },
  },

  gis: {
    moduleId: 'gis',
    moduleTitle: 'نقشه ماهواره‌ای ۳ بعدی، حریم شهری و اتاق جنگ سناریو',
    agentCode: 'AGT-11',
    agentName: 'ایجنت ژئواکونومیک و تحلیل فضایی ماهواره‌ای (GIS-AI)',
    levers: [
      {
        id: 'industrialRadiusStrictness',
        name: 'سخت‌گیری ضوابط حریم ۱۲۰ کیلومتری استقرار صنایع',
        min: 50,
        max: 100,
        step: 5,
        defaultValue: 85,
        unit: '٪ رعایت',
        description: 'هدایت صنایع نوین و دانش‌بنیان به شهرک‌های تخصصی',
      },
      {
        id: 'seismicBufferDistance',
        name: 'حریم ساخت‌وساز روی گسل‌های فعال ری و شمال تهران',
        min: 50,
        max: 300,
        step: 25,
        defaultValue: 150,
        unit: 'متر',
        description: 'تاب‌آوری کالبدی و کاهش آسیب‌پذیری زیرساخت‌های اقتصادی',
      },
      {
        id: 'satelliteChangeDetection',
        name: 'دقت پایش ماهواره‌ای ساخت‌وساز غیرمجاز و تصرف اراضی',
        min: 60,
        max: 98,
        step: 2,
        defaultValue: 92,
        unit: '٪ دقت',
        description: 'حفاظت از اراضی زراعی دماوند، فیروزکوه و شمیرانات',
      },
    ],
    metrics: [
      {
        id: 'illegalLandSaved',
        label: 'مساحت اراضی ملی و زراعی حفظ‌شده در ماه',
        baseline: 380,
        unit: 'هکتار',
        calculate: (l) => {
          const val = Math.round(380 * (l.satelliteChangeDetection / 92));
          return {
            value: val,
            deltaPercent: Math.round(((val - 380) / 380) * 1000) / 10,
            trend: 'up',
            riskLevel: 'safe',
          };
        },
      },
      {
        id: 'infraResilienceIndex',
        label: 'شاخص تاب‌آوری فضایی زیرساخت‌های اقتصادی',
        baseline: 68,
        unit: 'از ۱۰۰',
        calculate: (l) => {
          const val = Math.round((68 + (l.seismicBufferDistance - 150) * 0.08) * 10) / 10;
          return {
            value: Math.min(95, val),
            deltaPercent: Math.round(((val - 68) / 68) * 1000) / 10,
            trend: 'up',
            riskLevel: 'safe',
          };
        },
      },
    ],
    alerts: [
      {
        id: 'alt-gis-1',
        condition: (l) => l.satelliteChangeDetection < 75,
        level: 'warning',
        title: 'افت تفکیک تصاویر ماهواره‌ای در مناطق ییلاقی شرق استان',
        description: 'خطر افزایش تغییر کاربری غیرمجاز باغات در حوزه فیروزکوه و سربندان دماوند.',
        actionRecommendation: 'به‌روزرسانی لایه‌های داده‌های پهپادی و سنجش از دور با همکاری اداره کل راه و شهرسازی.',
      },
    ],
    guide: {
      summary: 'تحلیل داده‌های مکانی، نقشه‌های ماهواره‌ای با وضوح بالا، حریم گسل‌ها و کانون‌های اقتصادی ۱۶ شهرستان.',
      methodology: 'ترکیب لایه‌های ماهواره‌ای Esri World Imagery، داده‌های نقشه‌برداری کارتوگرافی و تصاویر ماهواره‌ای سنجش از دور.',
      keyFormulas: [
        'شاخص تراکم فضایی = مساحت کاربری‌های اقتصادی / سطح کل قطعه شهری',
        'ضریب آسیب‌پذیری لرزه‌ای = فاصله از گسل × تیپ خاک × قدمت سازه صنعتی',
      ],
      legalBasis: 'طرح جامع کالبدی استان تهران و مصوبات شورای عالی شهرسازی و معماری ایران.',
      actionableAuthority: 'استاندار به عنوان رئیس شورای برنامه‌ریزی و توسعه استان اختیار ابلاغ طرح‌های جامع و هادی را دارد.',
    },
  },

  overview: {
    moduleId: 'overview',
    moduleTitle: 'سکوی تصمیم‌یار کلان و نبض ۳۶۰ درجه اقتصاد تهران',
    agentCode: 'AGT-01',
    agentName: 'ایجنت استراتژیست ارشد اقتصاد کلان تهران (MACRO-AI)',
    levers: [
      {
        id: 'regionalInflationTarget',
        name: 'مهار نرخ تورم ماهانه استان تهران',
        min: 1,
        max: 6,
        step: 0.2,
        defaultValue: 2.4,
        unit: '٪ در ماه',
        description: 'هدایت انتظارات تورمی و تثبیت سبد معیشت خانوار',
      },
      {
        id: 'gdpGrowthPace',
        name: 'نرخ رشد واقعی هدف‌گذاری شده GDP استان',
        min: 1,
        max: 8,
        step: 0.5,
        defaultValue: 4.8,
        unit: '٪ در سال',
        description: 'ارتقای بهره‌وری خدمات، صنعت و اقتصاد دیجیتال',
      },
      {
        id: 'provincialBudgetRealization',
        name: 'ضریب تحقق درآمدهای مصوب ۳۹۳ همت استان',
        min: 80,
        max: 130,
        step: 5,
        defaultValue: 104,
        unit: '٪',
        description: 'تضمین تامین منابع زیرساخت‌های حمل‌ونقل و انرژی',
      },
    ],
    metrics: [
      {
        id: 'provincialGdpVolume',
        label: 'برآورد ارزش تولید ناخالص داخلی استان تهران',
        baseline: 3850,
        unit: 'همت',
        calculate: (l) => {
          const val = Math.round(3850 * (1 + (l.gdpGrowthPace - 4.8) * 0.015));
          return {
            value: val,
            deltaPercent: Math.round(((val - 3850) / 3850) * 1000) / 10,
            trend: 'up',
            riskLevel: 'safe',
          };
        },
      },
      {
        id: 'macroStabilityIndex',
        label: 'شاخص پایداری و تاب‌آوری کلان استان',
        baseline: 82,
        unit: 'از ۱۰۰',
        calculate: (l) => {
          const val = Math.round((82 - (l.regionalInflationTarget - 2.4) * 8 + (l.provincialBudgetRealization - 104) * 0.2) * 10) / 10;
          return {
            value: Math.max(20, Math.min(99, val)),
            deltaPercent: Math.round(((val - 82) / 82) * 1000) / 10,
            trend: val >= 82 ? 'up' : 'down',
            riskLevel: val >= 75 ? 'safe' : val >= 55 ? 'warning' : 'critical',
          };
        },
      },
    ],
    alerts: [
      {
        id: 'alt-ov-1',
        condition: (l) => l.regionalInflationTarget > 4,
        level: 'critical',
        title: 'هشدار ورود به دالان تورم پرشتاب استانی',
        description: 'رشد بیش از ۴٪ تورم ماهانه منجر به افت قدرت خرید در ۷ شهرستان حاشیه‌ای تهران خواهد شد.',
        actionRecommendation: 'تشکیل شورای اضطراری هماهنگی اقتصادی استان با حضور اصناف، بانک‌ها و شهرداری تهران.',
      },
    ],
    guide: {
      summary: 'مرکز تجمیع شاخص‌های ۲۰.۹۴٪ تولید ناخالص داخلی کشور، درآمد ۳۹۳ همتی و ۶۰.۵٪ سپرده‌های بانکی در تهران.',
      methodology: 'محاسبات بر اساس داده‌های حساب‌های منطقه‌ای مرکز آمار ایران، بانک مرکزی و وزارت امور اقتصادی و دارایی انجام می‌شود.',
      keyFormulas: [
        'سهم تهران از GDP ملی = (تولید ناخالص داخلی استان تهران / کل GDP کشور) × ۱۰۰ ≈ ۲۰.۹۴٪',
        'تراز بودجه استانی = درآمدهای وصولی خزانه معین منهای اعتبارات هزینه‌ای و عمرانی مصوب',
      ],
      legalBasis: 'سیاست‌های کلی برنامه هفتم پیشرفت و سند آمایش سرزمین استان تهران.',
      actionableAuthority: 'استاندار تهران به عنوان نماینده عالی حاکمیت ریاست شورای برنامه‌ریزی، ستاد تسهیل و ستاد تنظیم بازار استان را بر عهده دارد.',
    },
  },
};

interface EngineProps {
  moduleId: string;
}

export function DomainScenarioAndPredictionEngine({ moduleId }: EngineProps) {
  const config = DOMAIN_CONFIGS[moduleId] || DOMAIN_CONFIGS.overview;
  const { openCopilot, selectedCounty } = useCommand();

  // Initialize lever values
  const [leverValues, setLeverValues] = useState<Record<string, number>>(() => {
    const init: Record<string, number> = {};
    config.levers.forEach((l) => {
      init[l.id] = l.defaultValue;
    });
    return init;
  });

  const [isGuideOpen, setIsGuideOpen] = useState(false);
  const [issuedDirectiveSuccess, setIssuedDirectiveSuccess] = useState<string | null>(null);

  const handleLeverChange = (id: string, value: number) => {
    setLeverValues((prev) => ({ ...prev, [id]: value }));
  };

  const handleResetLevers = () => {
    const reset: Record<string, number> = {};
    config.levers.forEach((l) => {
      reset[l.id] = l.defaultValue;
    });
    setLeverValues(reset);
  };

  // Calculate dynamic forecast metrics
  const calculatedMetrics = useMemo(() => {
    return config.metrics.map((m) => {
      const result = m.calculate(leverValues);
      return {
        ...m,
        ...result,
      };
    });
  }, [config.metrics, leverValues]);

  // Check active alerts
  const activeAlerts = useMemo(() => {
    return config.alerts.filter((a) => a.condition(leverValues));
  }, [config.alerts, leverValues]);

  const handleIssueDirective = (alert: DomainAlertRule) => {
    setIssuedDirectiveSuccess(alert.id);
    setTimeout(() => setIssuedDirectiveSuccess(null), 4000);
  };

  return (
    <div className="space-y-4 my-6">
      {/* Container Card */}
      <div className="glass-panel p-4 md:p-6 border border-[var(--lg-border-strong)] rounded-2xl shadow-xl transition-all">
        {/* Top Header of the Domain Engine */}
        <div className="flex flex-wrap items-center justify-between gap-3 pb-4 border-b border-[var(--lg-border)]">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-cyan-600 to-sky-700 text-white flex items-center justify-center font-bold shadow-md shadow-cyan-900/30">
              <Sliders className="w-5 h-5 text-cyan-200" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="text-base font-black text-[var(--lg-ink)]">
                  اتاق شبیه‌ساز سناریوها، پیش‌بینی ۳۰ روزه و هشدارها
                </h3>
                <span className="text-[10px] bg-cyan-500/15 text-cyan-300 px-2 py-0.5 rounded-full border border-cyan-500/30 font-bold">
                  {config.agentCode}
                </span>
              </div>
              <p className="text-xs text-[var(--lg-muted)] mt-0.5">
                تغییر متغیرهای سیاستی حوزه «{config.moduleTitle}» و مشاهده آنی آثار بر سنجه‌های اقتصادی{' '}
                {selectedCounty ? `در شهرستان ${selectedCounty.nameFa}` : 'کل استان'}
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={handleResetLevers}
              title="بازنشانی به مقادیر اولیه مصوب"
              className="px-2.5 py-1.5 rounded-xl glass-button text-[var(--lg-muted)] hover:text-[var(--lg-ink)] border border-[var(--lg-border)] text-xs flex items-center gap-1.5 transition-colors"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              <span>بازنشانی</span>
            </button>

            <button
              onClick={() => setIsGuideOpen((prev) => !prev)}
              className={`px-3 py-1.5 rounded-xl border text-xs font-semibold flex items-center gap-1.5 transition-all ${
                isGuideOpen
                  ? 'bg-cyan-600 text-white border-cyan-400 shadow-sm'
                  : 'glass-button text-[var(--lg-ink)] border-[var(--lg-border)] hover:border-cyan-400/40'
              }`}
            >
              <HelpCircle className="w-3.5 h-3.5 text-cyan-400" />
              <span>راهنمای تخصصی و متدولوژی</span>
              {isGuideOpen ? <ChevronUp className="w-3 h-3" /> : <ChevronDown className="w-3 h-3" />}
            </button>
          </div>
        </div>

        {/* 1. Collapsible Methodology & Field Guide */}
        {isGuideOpen && (
          <div className="mt-4 p-4 rounded-xl bg-cyan-950/20 dark:bg-cyan-950/40 border border-cyan-500/30 text-xs text-[var(--lg-ink)] space-y-3 animate-in fade-in slide-in-from-top-2 duration-200">
            <div className="flex items-center justify-between border-b border-cyan-500/20 pb-2">
              <span className="font-bold text-sm text-cyan-300 flex items-center gap-1.5">
                <Info className="w-4 h-4 text-cyan-400" />
                راهنمای جامع، مبانی قانونی و متدولوژی محاسباتی بخش {config.moduleTitle}
              </span>
              <span className="text-[11px] text-[var(--lg-muted)] font-mono">
                استانداری تهران · کارگروه اقتصادی
              </span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <div>
                  <h4 className="font-bold text-cyan-300">خلاصه کارکرد و ماموریت:</h4>
                  <p className="text-[var(--lg-secondary)] leading-relaxed mt-0.5">{config.guide.summary}</p>
                </div>
                <div>
                  <h4 className="font-bold text-cyan-300">روش‌شناسی و منابع داده:</h4>
                  <p className="text-[var(--lg-secondary)] leading-relaxed mt-0.5">{config.guide.methodology}</p>
                </div>
              </div>

              <div className="space-y-2">
                <div>
                  <h4 className="font-bold text-cyan-300">فرمول‌ها و روابط کلیدی:</h4>
                  <ul className="list-disc list-inside space-y-1 text-[var(--lg-secondary)] mt-0.5">
                    {config.guide.keyFormulas.map((f, i) => (
                      <li key={i} className="font-mono text-[11px]">{f}</li>
                    ))}
                  </ul>
                </div>
                <div className="pt-1 border-t border-cyan-500/20 text-[11px]">
                  <strong className="text-cyan-300">اختیارات اجرایی استاندار: </strong>
                  <span className="text-[var(--lg-secondary)]">{config.guide.actionableAuthority}</span>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* 2. Main Workbench: Levers on Right, Forecast & Alerts on Left */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 mt-5">
          {/* Right Column (7 cols): Interactive Sliders */}
          <div className="lg:col-span-7 space-y-4">
            <div className="flex items-center justify-between mb-1">
              <span className="text-xs font-bold text-[var(--lg-ink)] flex items-center gap-1.5">
                <Sliders className="w-3.5 h-3.5 text-cyan-400" />
                اهرم‌های تصمیم‌گیری و سناریونویسی (What-If Levers):
              </span>
              <span className="text-[11px] text-[var(--lg-muted)]">
                {config.levers.length} متغیر فعال
              </span>
            </div>

            <div className="space-y-3.5">
              {config.levers.map((lever) => {
                const currentVal = leverValues[lever.id] ?? lever.defaultValue;
                const isChanged = currentVal !== lever.defaultValue;

                return (
                  <div
                    key={lever.id}
                    className={`p-3.5 rounded-xl border transition-all ${
                      isChanged
                        ? 'bg-cyan-950/15 border-cyan-500/40 dark:bg-cyan-950/30'
                        : 'bg-white/5 border-[var(--lg-border)] hover:border-[var(--lg-border-strong)]'
                    }`}
                  >
                    <div className="flex items-center justify-between gap-2 mb-1.5">
                      <div className="text-xs font-bold text-[var(--lg-ink)] flex items-center gap-2">
                        <span>{lever.name}</span>
                        {isChanged && (
                          <span className="text-[10px] text-cyan-400 font-mono font-bold bg-cyan-950/60 px-1.5 py-0.2 rounded border border-cyan-500/30">
                            تغییریافته
                          </span>
                        )}
                      </div>
                      <div className="text-xs font-black font-mono text-cyan-400 px-2.5 py-0.5 rounded-lg bg-black/20 dark:bg-black/40 border border-cyan-500/30">
                        {toPersianDigits(currentVal)} {lever.unit}
                      </div>
                    </div>

                    <div className="text-[11px] text-[var(--lg-muted)] mb-2">
                      {lever.description}
                    </div>

                    {/* Range slider */}
                    <div className="flex items-center gap-3">
                      <span className="text-[10px] font-mono text-[var(--lg-muted)]">
                        {toPersianDigits(lever.min)}
                      </span>
                      <input
                        type="range"
                        min={lever.min}
                        max={lever.max}
                        step={lever.step}
                        value={currentVal}
                        onChange={(e) => handleLeverChange(lever.id, parseFloat(e.target.value))}
                        className="flex-1 accent-cyan-500 h-1.5 rounded-lg bg-slate-800 cursor-pointer"
                      />
                      <span className="text-[10px] font-mono text-[var(--lg-muted)]">
                        {toPersianDigits(lever.max)}
                      </span>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Left Column (5 cols): Dynamic 30-Day Forecast Metrics & Early Warning Alerts */}
          <div className="lg:col-span-5 space-y-4">
            <div className="text-xs font-bold text-[var(--lg-ink)] flex items-center gap-1.5 mb-1">
              <TrendingUp className="w-3.5 h-3.5 text-cyan-400" />
              پیش‌بینی اثرات ۳۰ روزه سناریو:
            </div>

            {/* Calculated Metric Cards */}
            <div className="space-y-2.5">
              {calculatedMetrics.map((m) => (
                <div
                  key={m.id}
                  className="p-3.5 rounded-xl border border-[var(--lg-border)] bg-white/5 flex items-center justify-between"
                >
                  <div>
                    <div className="text-[11px] text-[var(--lg-muted)] font-medium">
                      {m.label}
                    </div>
                    <div className="text-lg font-black font-mono text-[var(--lg-ink)] mt-0.5">
                      {toPersianDigits(m.value)} <span className="text-xs font-normal text-[var(--lg-muted)]">{m.unit}</span>
                    </div>
                  </div>

                  <div className="text-left">
                    <span
                      className={`text-[11px] font-mono font-bold px-2 py-0.5 rounded-lg border inline-block ${
                        m.riskLevel === 'critical'
                          ? 'bg-rose-500/20 text-rose-300 border-rose-500/40'
                          : m.riskLevel === 'warning'
                          ? 'bg-amber-500/20 text-amber-300 border-amber-500/40'
                          : 'bg-emerald-500/20 text-emerald-300 border-emerald-500/40'
                      }`}
                    >
                      {m.deltaPercent >= 0 ? `+${toPersianDigits(m.deltaPercent)}٪` : `${toPersianDigits(m.deltaPercent)}٪`}
                    </span>
                    <div className="text-[10px] text-[var(--lg-muted)] mt-1">
                      نسبت به خط پایه
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Early Warning Triggered Alerts */}
            {activeAlerts.length > 0 ? (
              <div className="space-y-2 pt-2">
                <div className="text-xs font-bold text-amber-400 flex items-center gap-1.5">
                  <ShieldAlert className="w-3.5 h-3.5 text-amber-400" />
                  هشدارهای زودهنگام فعال شده (Early Warning):
                </div>

                {activeAlerts.map((alt) => (
                  <div
                    key={alt.id}
                    className={`p-3 rounded-xl border text-xs space-y-1.5 ${
                      alt.level === 'critical'
                        ? 'bg-rose-950/30 border-rose-500/40 text-rose-200'
                        : 'bg-amber-950/30 border-amber-500/40 text-amber-200'
                    }`}
                  >
                    <div className="flex items-center justify-between font-bold">
                      <span className="flex items-center gap-1.5">
                        <AlertTriangle className="w-3.5 h-3.5" />
                        {alt.title}
                      </span>
                      <span className="text-[10px] uppercase font-mono px-1.5 py-0.2 rounded bg-black/40">
                        {alt.level === 'critical' ? 'سطح ۱ بحرانی' : 'سطح ۲ هشدار'}
                      </span>
                    </div>

                    <p className="text-[11px] text-[var(--lg-ink)] opacity-90 leading-tight">
                      {alt.description}
                    </p>

                    <div className="pt-1.5 border-t border-white/10 flex items-center justify-between gap-2">
                      <span className="text-[10px] text-[var(--lg-muted)] truncate">
                        {alt.actionRecommendation}
                      </span>
                      <button
                        onClick={() => handleIssueDirective(alt)}
                        className="px-2 py-1 rounded-lg bg-cyan-600 hover:bg-cyan-500 text-white text-[10px] font-bold shrink-0 transition-colors flex items-center gap-1"
                      >
                        {issuedDirectiveSuccess === alt.id ? (
                          <>
                            <CheckCircle2 className="w-3 h-3 text-emerald-300" />
                            <span>ابلاغ شد</span>
                          </>
                        ) : (
                          <>
                            <FileCheck2 className="w-3 h-3" />
                            <span>صدور دستور</span>
                          </>
                        )}
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="p-3 rounded-xl bg-emerald-950/20 border border-emerald-500/30 text-emerald-300 text-xs flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                <span>کلیه متغیرهای این بخش در محدوده پایدار و استاندارد قرار دارند.</span>
              </div>
            )}

            {/* Quick Action to AI Copilot for this Domain */}
            <button
              onClick={() => openCopilot(config.agentCode)}
              className="w-full py-2 px-3 rounded-xl bg-gradient-to-l from-cyan-600/20 to-sky-600/20 hover:from-cyan-600/30 hover:to-sky-600/30 text-cyan-300 border border-cyan-500/40 text-xs font-bold flex items-center justify-center gap-2 transition-all mt-3"
            >
              <Bot className="w-4 h-4 text-cyan-400" />
              <span>تحلیل پیشرفته این سناریو با {config.agentName.split(' ')[1]}</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default DomainScenarioAndPredictionEngine;
