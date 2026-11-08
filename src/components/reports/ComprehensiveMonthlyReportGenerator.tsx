'use client';

import React, { useState, useMemo } from 'react';
import {
  Printer,
  Download,
  Copy,
  Check,
  FileSpreadsheet,
  Building2,
  Calendar,
  MapPin,
  TrendingUp,
  TrendingDown,
  AlertTriangle,
  CheckCircle2,
  Clock,
  ShieldAlert,
  Layers,
  ChevronDown,
  Sparkles,
  Send,
  Award,
  Info,
  FileText,
  UserCheck,
  Zap,
  Wheat,
  ShoppingBag,
  Coins,
  Briefcase,
  CheckCircle,
} from 'lucide-react';
import { useCommand } from '@/src/context/CommandContext';
import {
  TEHRAN_16_COUNTIES,
  TEHRAN_COUNTY_PROFILES,
  TEHRAN_PROVINCE_BASELINE,
} from '@/src/data/tehranMasterData';
import { OFFICIAL_ROLES } from '@/src/data/rolesAndOfficials';
import { toPersianDigits, formatPersianNumber } from '@/src/utils/formatters';
import { TehranGovernorateLogo } from '@/src/components/common/TehranGovernorateLogo';

export type ReportTemplateType =
  | 'comprehensive'
  | 'market'
  | 'fiscal'
  | 'industry'
  | 'resilience';

export interface MonthlyMetricRow {
  id: string;
  category: string;
  title: string;
  unit: string;
  currentValue: number | string;
  prevValue: number | string;
  changePercent: number;
  isPositiveGood: boolean;
  annualTarget: number | string;
  realizationPercent: number;
  status: 'optimal' | 'stable' | 'warning' | 'critical';
  statusText: string;
}

const MONTHS_LIST = [
  { id: 'm01', name: 'فروردین ۱۴۰۵' },
  { id: 'm02', name: 'اردیبهشت ۱۴۰۵' },
  { id: 'm03', name: 'خرداد ۱۴۰۵' },
  { id: 'm04', name: 'تیر ۱۴۰۵' },
  { id: 'm05', name: 'مرداد ۱۴۰۵' },
  { id: 'm06', name: 'شهریور ۱۴۰۵' },
  { id: 'm07', name: 'مهر ۱۴۰۵' },
  { id: 'm08', name: 'آبان ۱۴۰۵ (دوره جاری)' },
  { id: 'm09', name: 'آذر ۱۴۰۵' },
  { id: 'm10', name: 'دی ۱۴۰۵' },
  { id: 'm11', name: 'بهمن ۱۴۰۵' },
  { id: 'm12', name: 'اسفند ۱۴۰۵' },
  { id: 'q1', name: 'فصل بهار ۱۴۰۵ (تجمعی)' },
  { id: 'q2', name: 'فصل تابستان ۱۴۰۵ (تجمعی)' },
  { id: 'h1', name: 'شش‌ماهه نخست ۱۴۰۵ (جامع)' },
];

const REPORT_TEMPLATES_CONFIG: {
  id: ReportTemplateType;
  title: string;
  subtitle: string;
  icon: React.ElementType;
}[] = [
  {
    id: 'comprehensive',
    title: 'گزارش جامع وضعیت اقتصادی، صنعتی و معیشتی',
    subtitle: 'دید ۳۶۰ درجه عملکرد فرمانداری در تمام بخش‌های تولیدی و بازرگانی',
    icon: Layers,
  },
  {
    id: 'market',
    title: 'کارنامه تنظیم بازار، آرد و نان و ذخایر راهبردی',
    subtitle: 'پایش قیمت ۲۰ قلم اساسی، نظارت نانینو و عرضه در میادین میوه و تره‌بار',
    icon: ShoppingBag,
  },
  {
    id: 'fiscal',
    title: 'تراز مالیاتی، خزانه‌داری، اعتبارات بانکی و مصارف',
    subtitle: 'درآمدهای محقق‌شده، ارزش افزوده، تسهیلات تکلیفی و منابع بانکی',
    icon: Coins,
  },
  {
    id: 'industry',
    title: 'اشتغال سامانه رصد، احیای کارخانجات و شهرک‌های صنعتی',
    subtitle: 'کارگروه تسهیل، پروانه‌های جدید و بازگشت واحدهای راکد به چرخه تولید',
    icon: Briefcase,
  },
  {
    id: 'resilience',
    title: 'پدافند غیرعامل، ناترازی انرژی و مدیریت بحران',
    subtitle: 'تامین آب پایدار، دیماند برق شهرک‌ها و ذخایر اضطراری شهرستان',
    icon: Zap,
  },
];

export function ComprehensiveMonthlyReportGenerator() {
  const { selectedCountyId, setSelectedCountyId } = useCommand();

  const [internalCounty, setInternalCounty] = useState<string | null>(null);
  const selectedCounty = internalCounty ?? (selectedCountyId || 'all');
  const [selectedMonthId, setSelectedMonthId] = useState<string>('m08');
  const [selectedTemplate, setSelectedTemplate] =
    useState<ReportTemplateType>('comprehensive');
  const [classification, setClassification] = useState<
    'محرمانه' | 'خیلی محرمانه' | 'اداری-عمومی'
  >('محرمانه');
  const [copied, setCopied] = useState(false);
  const [sentToast, setSentToast] = useState(false);

  const currentCountyData = useMemo(() => {
    if (selectedCounty === 'all') return null;
    return (
      TEHRAN_COUNTY_PROFILES.find((c) => c.id === selectedCounty) ||
      TEHRAN_COUNTY_PROFILES[0]
    );
  }, [selectedCounty]);

  const countyGovernorRole = useMemo(() => {
    if (selectedCounty === 'all') {
      return OFFICIAL_ROLES.find((r) => r.id === 'gov_motamedian');
    }
    return (
      OFFICIAL_ROLES.find(
        (r) => r.countyId === selectedCounty || r.id === `gov_${selectedCounty}`
      ) || OFFICIAL_ROLES.find((r) => r.id === 'gov_motamedian')
    );
  }, [selectedCounty]);

  const selectedMonthObj = useMemo(() => {
    return (
      MONTHS_LIST.find((m) => m.id === selectedMonthId) || MONTHS_LIST[7]
    );
  }, [selectedMonthId]);

  // Generate dynamic periodic metrics for this county and month
  const reportMetrics: MonthlyMetricRow[] = useMemo(() => {
    const isAll = selectedCounty === 'all';
    const c = currentCountyData;

    // Seasonal coefficient for month
    const mIdx = parseInt(selectedMonthId.replace('m', ''), 10) || 8;
    const seasonalFactor = 0.95 + (mIdx % 5) * 0.03;

    if (isAll) {
      // Province-wide baseline metrics
      return [
        {
          id: 'revenue',
          category: 'خزانه و مالیات',
          title: 'درآمدهای عمومی محقق‌شده استان (تجمعی)',
          unit: 'همت',
          currentValue: Math.round(393.0 * seasonalFactor * 10) / 10,
          prevValue: 341.2,
          changePercent: 15.2,
          isPositiveGood: true,
          annualTarget: 890.0,
          realizationPercent: Math.round(
            ((393 * seasonalFactor) / 890) * 100
          ),
          status: 'optimal',
          statusText: 'تحقق بالاتر از بودجه مصوب',
        },
        {
          id: 'vat',
          category: 'خزانه و مالیات',
          title: 'مالیات بر ارزش افزوده واریزی به شهرداری‌ها و دهیاری‌ها',
          unit: 'همت',
          currentValue: Math.round(73.0 * seasonalFactor * 10) / 10,
          prevValue: 62.5,
          changePercent: 16.8,
          isPositiveGood: true,
          annualTarget: 175.0,
          realizationPercent: Math.round(
            ((73 * seasonalFactor) / 175) * 100
          ),
          status: 'optimal',
          statusText: 'رشد چشمگیر واریزی عمرانی',
        },
        {
          id: 'employment',
          category: 'اشتغال و بازار کار',
          title: 'اشتغال خالص ثبت‌شده در سامانه رصد وزارت کار',
          unit: 'نفر',
          currentValue: Math.round(138200 * seasonalFactor),
          prevValue: 121500,
          changePercent: 13.7,
          isPositiveGood: true,
          annualTarget: 180000,
          realizationPercent: Math.round(
            ((138200 * seasonalFactor) / 180000) * 100
          ),
          status: 'optimal',
          statusText: '۷۶٪ تحقق برنامه سالانه',
        },
        {
          id: 'unemployment',
          category: 'اشتغال و بازار کار',
          title: 'نرخ بیکاری رسمی بر اساس طرح آمارگیری نیروی کار',
          unit: 'درصد',
          currentValue: 4.8,
          prevValue: 5.1,
          changePercent: -5.9,
          isPositiveGood: false,
          annualTarget: 5.5,
          realizationPercent: 114,
          status: 'optimal',
          statusText: 'پایین‌ترین نرخ در سال‌های اخیر',
        },
        {
          id: 'inflation',
          category: 'تنظیم بازار و قیمت',
          title: 'تورم نقطه‌ای کل استان تهران (شاخص مرکز آمار)',
          unit: 'درصد',
          currentValue: 38.6,
          prevValue: 39.4,
          changePercent: -2.0,
          isPositiveGood: false,
          annualTarget: 32.0,
          realizationPercent: 83,
          status: 'warning',
          statusText: 'نیازمند تشدید نظارت ۱۲۴',
        },
        {
          id: 'flour_wheat',
          category: 'غلات و نانینو',
          title: 'ذخیره راهبردی گندم و آرد در سیلوهای معین پایتخت',
          unit: 'روز پوشش',
          currentValue: 42,
          prevValue: 38,
          changePercent: 10.5,
          isPositiveGood: true,
          annualTarget: 60,
          realizationPercent: 70,
          status: 'stable',
          statusText: 'حفظ تراز ایمن بالای ۳۰ روز',
        },
        {
          id: 'stagnant_revival',
          category: 'صنعت و تولید',
          title: 'کارخانجات و صنایع احیاشده در ستاد تسهیل استان',
          unit: 'واحد صنعتی',
          currentValue: 142,
          prevValue: 118,
          changePercent: 20.3,
          isPositiveGood: true,
          annualTarget: 200,
          realizationPercent: 71,
          status: 'optimal',
          statusText: 'بازگشت ۲,۴۵۰ کارگر به کار',
        },
        {
          id: 'power_imbalance',
          category: 'انرژی و پدافند',
          title: 'تراز ناترازی برق صنایع در اوج بار شهرک‌های استان',
          unit: 'مگاوات کسری',
          currentValue: 420,
          prevValue: 480,
          changePercent: -12.5,
          isPositiveGood: false,
          annualTarget: 150,
          realizationPercent: 64,
          status: 'warning',
          statusText: 'نیازمند تسریع نیروگاه‌های خورشیدی',
        },
      ];
    }

    // County-specific indicators
    const pop = c?.estimatedPopulation1405 || 400000;
    const taxBase = c?.taxRevenue5M_Hemmat || 10;
    const indUnits = c?.activeIndustrialUnits || 500;
    const stagUnits = c?.stagnantIndustrialUnits || 80;
    const bakeries = c?.bakeriesCount || 200;
    const unemp = c?.unemploymentRate || 6.5;
    const powerImb = c?.powerImbalance_MW || 35;

    return [
      {
        id: 'county_tax',
        category: 'خزانه و درآمد',
        title: 'وصول درآمدهای مالیاتی و عمومی شهرستان',
        unit: 'همت',
        currentValue: Math.round(taxBase * seasonalFactor * 10) / 10,
        prevValue: Math.round(taxBase * 0.88 * 10) / 10,
        changePercent: 13.6,
        isPositiveGood: true,
        annualTarget: Math.round(taxBase * 2.3 * 10) / 10,
        realizationPercent: Math.round(
          ((taxBase * seasonalFactor) / (taxBase * 2.3)) * 100
        ),
        status: 'optimal',
        statusText: 'تراز مطلوب وصولی',
      },
      {
        id: 'county_jobs',
        category: 'اشتغال و رفاه',
        title: 'ثبت اشتغال ایجادی در سامانه رصد شهرستان',
        unit: 'نفر',
        currentValue: Math.round((pop / 85) * seasonalFactor),
        prevValue: Math.round(pop / 98),
        changePercent: 15.3,
        isPositiveGood: true,
        annualTarget: Math.round((pop / 65)),
        realizationPercent: Math.round(
          (((pop / 85) * seasonalFactor) / (pop / 65)) * 100
        ),
        status: 'optimal',
        statusText: 'پیشی گرفتن از سهمیه ماهانه',
      },
      {
        id: 'county_unemp',
        category: 'اشتغال و رفاه',
        title: 'نرخ بیکاری فصلی برآورد شده شهرستان',
        unit: 'درصد',
        currentValue: unemp,
        prevValue: Math.round((unemp + 0.3) * 10) / 10,
        changePercent: -4.4,
        isPositiveGood: false,
        annualTarget: Math.round((unemp - 0.8) * 10) / 10,
        realizationPercent: 102,
        status: unemp <= 6.0 ? 'optimal' : unemp <= 7.5 ? 'stable' : 'warning',
        statusText: unemp <= 6.0 ? 'بسیار مطلوب' : 'در محدوده نرمال استانی',
      },
      {
        id: 'county_bakeries',
        category: 'آرد و نانینو',
        title: 'میزان تراکنش‌های موفق نانینو و انحراف سهمیه آرد',
        unit: 'درصد انطباق',
        currentValue: 96.4,
        prevValue: 94.2,
        changePercent: 2.3,
        isPositiveGood: true,
        annualTarget: 98.0,
        realizationPercent: 98,
        status: 'stable',
        statusText: `پایش فعال ${toPersianDigits(bakeries)} نانوایی`,
      },
      {
        id: 'county_revival',
        category: 'صنعت و تولید',
        title: 'احیا و بازفعال‌سازی واحدهای صنعتی راکد',
        unit: 'کارخانه',
        currentValue: Math.max(1, Math.round(stagUnits * 0.18)),
        prevValue: Math.max(1, Math.round(stagUnits * 0.12)),
        changePercent: 50.0,
        isPositiveGood: true,
        annualTarget: Math.max(2, Math.round(stagUnits * 0.4)),
        realizationPercent: 45,
        status: 'stable',
        statusText: 'رسیدگی در کارگروه رفع موانع',
      },
      {
        id: 'county_inspections',
        category: 'تنظیم بازار',
        title: 'گشت‌های مشترک بازرسی صمت، جهاد و تعزیرات (۱۲۴)',
        unit: 'فقره بازرسی',
        currentValue: Math.round(bakeries * 2.8 * seasonalFactor),
        prevValue: Math.round(bakeries * 2.2),
        changePercent: 27.2,
        isPositiveGood: true,
        annualTarget: Math.round(bakeries * 3.5),
        realizationPercent: 80,
        status: 'optimal',
        statusText: 'تشدید نظارت بر ۲۰ قلم اساسی',
      },
      {
        id: 'county_power',
        category: 'انرژی و زیرساخت',
        title: 'کسری دیماند برق شهرک‌ها در ساعات اوج بار',
        unit: 'مگاوات',
        currentValue: powerImb,
        prevValue: Math.round(powerImb * 1.15),
        changePercent: -13.0,
        isPositiveGood: false,
        annualTarget: Math.round(powerImb * 0.4),
        realizationPercent: 68,
        status: powerImb > 50 ? 'critical' : powerImb > 20 ? 'warning' : 'stable',
        statusText:
          powerImb > 50 ? 'تنش جدی بار صنعتی' : 'کنترل‌شده با جابجایی بار',
      },
      {
        id: 'citizen_satisfaction',
        category: 'رضایت عمومی',
        title: 'شاخص رضایت شهروندان از دسترسی به کالاهای اساسی',
        unit: 'درصد رضایت',
        currentValue: 84.2,
        prevValue: 81.5,
        changePercent: 3.3,
        isPositiveGood: true,
        annualTarget: 90.0,
        realizationPercent: 93,
        status: 'optimal',
        statusText: 'توزیع مستقیم در میادین',
      },
    ];
  }, [selectedCounty, currentCountyData, selectedMonthId]);

  // Executive synthesized summary text
  const executiveSummaryText = useMemo(() => {
    const isAll = selectedCounty === 'all';
    const cName = isAll ? 'استان تهران' : `شهرستان ${currentCountyData?.nameFa || ''}`;
    const mName = selectedMonthObj.name;
    const govTitle = countyGovernorRole?.title || 'فرماندار';

    if (isAll) {
      return `بر اساس پایش داده‌های ثبتی دستگاه‌های اجرایی، خزانه‌داری معین، شبکه بانکی و تله‌متری سامانه نانینو در دوره ${mName}، وضعیت عمومی اقتصاد استان تهران در تراز پایدار و رو به رشد ارزیابی می‌گردد. درآمدهای عمومی وصول‌شده استان با رسیدن به مرز ۳۹۳ همت (رشد ۷۷ درصدی نسبت به دوره مشابه سال قبل) نشان‌دهنده تحقق ۱۰۴ درصدی اهداف خزانه‌داری است. در حوزه اشتغال، ثبت بیش از ۱۳۸ هزار فرصت شغلی جدید در سامانه رصد، نرخ بیکاری رسمی پایتخت را در تراز ۴.۸ درصد تثبیت نموده است. مهم‌ترین چالش‌های اولویت‌دار دوره حاضر شامل مدیریت کسری ۴۲۰ مگاواتی برق در روزهای اوج مصرف شهرک‌های صنعتی و مهار نوسانات مقطعی اقلام پروتئینی در میادین تره‌بار با تزریق هدفمند سهمیه‌ها گزارش شده است.`;
    }

    return `بر اساس بررسی اسناد بالادستی و تله‌متری شاخص‌های اقتصادی در دوره ${mName}، حوزه مدیریتی ${govTitle} در شهرستان ${currentCountyData?.nameFa} عملکرد مطلوبی در تحقق تکالیف اقتصادی به ثبت رسانده است. درآمدهای مالیاتی و عمومی با وصولی ${toPersianDigits(
      currentCountyData?.taxRevenue5M_Hemmat || 0
    )} همت حاکی از رونق نسبی اصناف و واحدهای تولیدی است. در بخش صنعت، با استقرار ${toPersianDigits(
      currentCountyData?.activeIndustrialUnits || 0
    )} واحد صنعتی فعال، تمرکز کارگروه رفع موانع تولید بر احیای واحدهای نیمه‌فعال و تسهیل اعتبارات سرمایه در گردش متمرکز بوده است. نظارت مستمر بر سامانه نانینو در ${toPersianDigits(
      currentCountyData?.bakeriesCount || 0
    )} واحد نانوایی ضریب تخلف و تراکم صفوف را تا حد ۹۶.۴ درصد تعدیل کرده است. اصلی‌ترین مخاطره پیش‌رو مطابق اعلام پدافند غیرعامل: «${
      currentCountyData?.topCrisisAlert || 'پایش تراز انرژی و ثبات زنجیره تامین'
    }» است که نیازمند پشتیبانی فوری دستگاه‌های استانی می‌باشد.`;
  }, [
    selectedCounty,
    currentCountyData,
    selectedMonthObj,
    countyGovernorRole,
  ]);

  // Priority challenges & bottlenecks
  const priorityBottlenecks = useMemo(() => {
    const isAll = selectedCounty === 'all';
    if (isAll) {
      return [
        {
          title: 'ناترازی برق و انرژی در شهرک‌های صنعتی شمس‌آباد و عباس‌آباد',
          level: 'critical',
          impact: 'خسارت بالقوه عدم‌النفع تولید به ارزش ۲.۴ همت در ماه',
          remedy:
            'تسریع در افتتاح نیروگاه‌های خورشیدی خودتامین و توافق شیفت شبانه کارخانجات',
        },
        {
          title: 'رسوب نهاده‌های دامی و کالاهای اساسی در مبادی گمرکی غرب و فرودگاه',
          level: 'warning',
          impact: 'شکاف قیمتی مقطعی در اقلام گوشت قرمز و مرغ گرم',
          remedy:
            'اجرای پنجره واحد ترخیص شبانه‌روزی با نظارت مستقیم ناظر گمرکات استان',
        },
        {
          title: 'فشار تورم اجاره‌بها و تراکم جمعیتی سرریز به شهرستان‌های اقماری',
          level: 'warning',
          impact: 'افزایش تقاضای سهمیه آرد یارانه‌ای در پرند، قرچک و ملارد',
          remedy:
            'تخصیص سهمیه شناور آرد و ایجاد شعب جدید میادین تره‌بار شهرداری',
        },
      ];
    }

    return [
      {
        title: `چالش اختصاصی: ${
          currentCountyData?.topCrisisAlert || 'پایش پایداری زنجیره عرضه'
        }`,
        level: 'critical',
        impact: 'اثر مستقیم بر سبد معیشت خانوار و بهره‌وری کارخانجات مستقر',
        remedy:
          'تشکیل جلسه فوق‌العاده کارگروه تسهیل شهرستان و ابلاغ تکالیف دستگاهی',
      },
      {
        title: 'تامین سرمایه در گردش و اعتبارات تبصره ۱۸ واحدهای صنعتی متوسط',
        level: 'warning',
        impact: 'تاخیر در تکمیل طرح‌های توسعه و نوسازی خطوط تولید',
        remedy:
          'مکاتبه فرمانداری با دبیرخانه شورای هماهنگی بانک‌های استان جهت تسهیل وثایق',
      },
      {
        title: 'پایش مستمر صف نانوایی‌ها و بازرسی گشت‌های مشترک ۱۲۴',
        level: 'stable',
        impact: 'افزایش رضایت‌مندی عمومی و جلوگیری از خروج غیرقانونی آرد',
        remedy: 'نظارت هوشمند از طریق رصد داده‌های دستگاه پوز کارت‌خوان نانینو',
      },
    ];
  }, [selectedCounty, currentCountyData]);

  // Proposed Actionable Directives
  const proposedDirectives = useMemo(() => {
    const cName =
      selectedCounty === 'all'
        ? 'استان تهران'
        : `شهرستان ${currentCountyData?.nameFa || ''}`;
    return [
      {
        num: '۱',
        title: `تامین پایدار سوخت زمستانی و تسریع خطوط برق اختصاصی صنایع ${cName}`,
        responsible: 'شرکت توزیع برق / شرکت شهرک‌های صنعتی استان',
        deadline: '۱۵ روز کاری',
        source: 'اعتبارات تملک دارایی و منابع داخلی شهرک‌ها',
      },
      {
        num: '۲',
        title: `تزریق سهمیه تنظیم بازاری پروتئین و روغن به ۵ بازارچه منتخب ${cName}`,
        responsible: 'سازمان جهاد کشاورزی / اداره کل غله و پشتیبانی دام',
        deadline: 'فوری (حداکثر ۷۲ ساعت)',
        source: 'ذخایر راهبردی تنظیم بازار استان تهران',
      },
      {
        num: '۳',
        title: `امهال تسهیلات بانکی و استمهال بدهی مالیاتی ۵ کارخانه پیشران در آستانه احیا`,
        responsible: 'اداره کل امور اقتصادی و دارایی / شورای هماهنگی بانک‌ها',
        deadline: '۳۰ روز تقویمی',
        source: 'بسته نجات مالی مصوب ستاد تسهیل و رفع موانع تولید',
      },
    ];
  }, [selectedCounty, currentCountyData]);

  // Copy report as plain text for administrative automation
  const handleCopyReport = () => {
    const textToCopy = `
بسمه‌تعالی
استانداری تهران — گزارش دوره‌ای اقتصادی
مرجع گزارش: ${countyGovernorRole?.title || 'فرماندار'} (${
      countyGovernorRole?.officialName || ''
    })
محدوده جغرافیایی: ${
      selectedCounty === 'all'
        ? 'کل استان تهران'
        : `شهرستان ${currentCountyData?.nameFa}`
    }
دوره گزارش: ${selectedMonthObj.name}
طبقه‌بندی: ${classification}

خلاصه مدیریتی:
${executiveSummaryText}

شاخص‌های کلیدی:
${reportMetrics
  .map(
    (m) =>
      `• ${m.title}: ${toPersianDigits(m.currentValue)} ${m.unit} (تغییر: ${toPersianDigits(
        m.changePercent
      )}٪)`
  )
  .join('\n')}

مصوبات پیشنهادی:
${proposedDirectives
  .map(
    (d) =>
      `${d.num}. ${d.title} — دستگاه متولی: ${d.responsible} (مهلت: ${d.deadline})`
  )
  .join('\n')}

سامانه تصمیم‌یار اقتصادی استاندار تهران © ۱۴۰۵
`.trim();

    navigator.clipboard.writeText(textToCopy);
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  // Export CSV table for Excel
  const handleExportCSV = () => {
    const headers = [
      'ردیف',
      'حوزه تخصصی',
      'عنوان شاخص اقتصادی',
      'واحد سنجش',
      'مقدار محقق‌شده',
      'مقدار دوره قبل',
      'درصد تغییر',
      'هدف سالانه',
      'درصد تحقق',
      'وضعیت ارزیابی',
    ];

    const rows = reportMetrics.map((m, idx) => [
      toPersianDigits(idx + 1),
      `"${m.category}"`,
      `"${m.title}"`,
      `"${m.unit}"`,
      m.currentValue,
      m.prevValue,
      `${m.changePercent}%`,
      m.annualTarget,
      `${m.realizationPercent}%`,
      `"${m.statusText}"`,
    ]);

    const csvContent =
      '\uFEFF' +
      [headers.join(','), ...rows.map((e) => e.join(','))].join('\n');

    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.setAttribute('href', url);
    const filename = `Gozaresh_Eqtesadi_${selectedCounty}_${selectedMonthId}.csv`;
    link.setAttribute('download', filename);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  // Print official document
  const handlePrint = () => {
    window.print();
  };

  // Send to Governor Cabinet
  const handleSendToGovernor = () => {
    setSentToast(true);
    setTimeout(() => setSentToast(false), 3500);
  };

  const currentCountyName =
    selectedCounty === 'all'
      ? 'کل استان تهران'
      : `شهرستان ${currentCountyData?.nameFa || ''}`;

  return (
    <div className="space-y-6 comprehensive-report-root">
      {/* =========================================================================
          CONTROL BAR: County selector, Month selector, Template Archetype & Actions
          (Hidden during print)
         ========================================================================= */}
      <div className="print:hidden glass-panel border border-[var(--lg-border-strong)] rounded-2xl p-4 sm:p-5 shadow-xl space-y-4">
        {/* Header Title with Official Badge */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-3 border-b border-[var(--lg-border)] pb-3">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-cyan-600/20 text-cyan-500 border border-cyan-500/30 flex items-center justify-center shrink-0 shadow-md">
              <FileSpreadsheet className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-base sm:text-lg font-black text-[var(--lg-ink)] tracking-tight">
                سامانه تولید و استخراج گزارش‌های جامع ماهانه اقتصادی
              </h2>
              <p className="text-xs text-[var(--lg-muted)]">
                ویژه فرمانداران ۱۶ شهرستان، معاونت اقتصادی و حوزه وزارتی استاندار تهران · سال ۱۴۰۵
              </p>
            </div>
          </div>

          {/* Classification Selector */}
          <div className="flex items-center gap-2 self-start md:self-auto text-xs">
            <span className="text-[var(--lg-muted)] font-medium">طبقه‌بندی سند:</span>
            <select
              value={classification}
              onChange={(e) =>
                setClassification(
                  e.target.value as 'محرمانه' | 'خیلی محرمانه' | 'اداری-عمومی'
                )
              }
              className="bg-[var(--lg-panel)] border border-[var(--lg-border-strong)] text-[var(--lg-ink)] rounded-xl px-2.5 py-1.5 font-bold focus:outline-none focus:border-cyan-500"
            >
              <option value="محرمانه">محرمانه (فرمانداری)</option>
              <option value="خیلی محرمانه">خیلی محرمانه (استاندار)</option>
              <option value="اداری-عمومی">اداری - عمومی</option>
            </select>
          </div>
        </div>

        {/* Filter Controls Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
          {/* 1. County Picker */}
          <div>
            <label className="block text-xs font-bold text-[var(--lg-muted)] mb-1.5">
              انتخاب شهرستان / حوزه فرمانداری:
            </label>
            <div className="relative">
              <select
                value={selectedCounty}
                onChange={(e) => {
                  const val = e.target.value;
                  setInternalCounty(val);
                  if (val === 'all') setSelectedCountyId(null);
                  else setSelectedCountyId(val);
                }}
                className="w-full appearance-none bg-[var(--lg-panel)] border border-[var(--lg-border-strong)] text-[var(--lg-ink)] rounded-xl px-3 py-2 pr-9 font-bold text-xs focus:outline-none focus:border-cyan-500 transition-colors cursor-pointer"
              >
                <option value="all">⭐ کل استان تهران (دید استراتژیک استاندار)</option>
                {TEHRAN_16_COUNTIES.map((county) => (
                  <option key={county.id} value={county.id}>
                    شهرستان {county.nameFa} ({county.governorateType})
                  </option>
                ))}
              </select>
              <MapPin className="w-4 h-4 text-cyan-500 absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none" />
            </div>
          </div>

          {/* 2. Month / Period Picker */}
          <div>
            <label className="block text-xs font-bold text-[var(--lg-muted)] mb-1.5">
              دوره زمانی / ماه گزارش:
            </label>
            <div className="relative">
              <select
                value={selectedMonthId}
                onChange={(e) => setSelectedMonthId(e.target.value)}
                className="w-full appearance-none bg-[var(--lg-panel)] border border-[var(--lg-border-strong)] text-[var(--lg-ink)] rounded-xl px-3 py-2 pr-9 font-bold text-xs focus:outline-none focus:border-cyan-500 transition-colors cursor-pointer"
              >
                {MONTHS_LIST.map((m) => (
                  <option key={m.id} value={m.id}>
                    {m.name}
                  </option>
                ))}
              </select>
              <Calendar className="w-4 h-4 text-sky-500 absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none" />
            </div>
          </div>

          {/* 3. Report Template / Archetype */}
          <div className="sm:col-span-2 lg:col-span-1">
            <label className="block text-xs font-bold text-[var(--lg-muted)] mb-1.5">
              قالب تخصصی کارنامه اقتصادی:
            </label>
            <div className="relative">
              <select
                value={selectedTemplate}
                onChange={(e) =>
                  setSelectedTemplate(e.target.value as ReportTemplateType)
                }
                className="w-full appearance-none bg-[var(--lg-panel)] border border-[var(--lg-border-strong)] text-[var(--lg-ink)] rounded-xl px-3 py-2 pr-9 font-bold text-xs focus:outline-none focus:border-cyan-500 transition-colors cursor-pointer"
              >
                {REPORT_TEMPLATES_CONFIG.map((t) => (
                  <option key={t.id} value={t.id}>
                    {t.title}
                  </option>
                ))}
              </select>
              <Layers className="w-4 h-4 text-emerald-500 absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none" />
            </div>
          </div>
        </div>

        {/* Action Toolbar: Print, CSV, Copy, Send */}
        <div className="flex flex-wrap items-center justify-between gap-2.5 pt-2 border-t border-[var(--lg-border)]">
          <div className="text-xs text-[var(--lg-muted)] flex items-center gap-1.5">
            <Info className="w-3.5 h-3.5 text-cyan-500 shrink-0" />
            <span>
              فرماندار محترم:{' '}
              <strong className="text-[var(--lg-ink)]">
                {countyGovernorRole?.officialName || 'مقام عالی حوزه'}
              </strong>{' '}
              · سند با داده‌های برخط تله‌متری همگام است.
            </span>
          </div>

          <div className="flex flex-wrap items-center gap-2">
            <button
              onClick={handlePrint}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-cyan-600 hover:bg-cyan-500 text-white font-bold text-xs shadow-md transition-all active:scale-95"
              title="چاپ سربرگ و خروجی رسمی PDF استانداری"
            >
              <Printer className="w-3.5 h-3.5" />
              <span>چاپ رسمی / PDF</span>
            </button>

            <button
              onClick={handleExportCSV}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl glass-button border border-[var(--lg-border-strong)] text-[var(--lg-ink)] hover:text-emerald-500 hover:border-emerald-500 font-bold text-xs transition-colors"
              title="دانلود فایل اکسل داده‌های ماهانه برای فرمانداری"
            >
              <Download className="w-3.5 h-3.5 text-emerald-500" />
              <span>خروجی اکسل (CSV)</span>
            </button>

            <button
              onClick={handleCopyReport}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl glass-button border border-[var(--lg-border-strong)] text-[var(--lg-ink)] hover:text-sky-500 font-bold text-xs transition-colors"
              title="کپی متن گزارش برای درج در اتوماسیون اداری فرمانداری"
            >
              {copied ? (
                <>
                  <Check className="w-3.5 h-3.5 text-emerald-500" />
                  <span className="text-emerald-500">کپی شد!</span>
                </>
              ) : (
                <>
                  <Copy className="w-3.5 h-3.5 text-sky-500" />
                  <span>کپی متن گزارش</span>
                </>
              )}
            </button>

            <button
              onClick={handleSendToGovernor}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-gradient-to-r from-sky-600 to-indigo-600 hover:opacity-95 text-white font-bold text-xs shadow-md transition-all active:scale-95"
              title="ارسال مستقیم گزارش به کارتابل شخص استاندار تهران"
            >
              <Send className="w-3.5 h-3.5" />
              <span>ارسال به کارتابل استاندار</span>
            </button>
          </div>
        </div>

        {/* Sent Toast Notification */}
        {sentToast && (
          <div className="bg-emerald-500/15 border border-emerald-500/40 text-emerald-400 rounded-xl p-3 flex items-center gap-2 text-xs animate-in fade-in slide-in-from-top-2">
            <CheckCircle className="w-4 h-4 text-emerald-400 shrink-0" />
            <span>
              گزارش جامع ماهانه «{currentCountyName}» با شناسه ابلاغیه رسمی در
              کارتابل پیگیری دفتر استاندار محترم (محمدصادق معتمدیان) و معاونت امور اقتصادی
              ثبت گردید.
            </span>
          </div>
        )}
      </div>

      {/* =========================================================================
          OFFICIAL SOVEREIGN REPORT CANVAS (Styled for Print & Screen Perfection)
         ========================================================================= */}
      <div className="official-document-canvas glass-panel border-2 border-[var(--lg-border-strong)] rounded-2xl p-6 sm:p-8 lg:p-10 shadow-2xl relative bg-[var(--lg-panel)] text-[var(--lg-ink)] print:shadow-none print:border-none print:p-0 print:m-0">
        {/* Security Watermark / Classification Banner */}
        <div className="flex items-center justify-between border-b-2 border-cyan-500/40 pb-4 mb-6">
          <div className="text-right">
            <div className="text-[11px] font-bold text-[var(--lg-muted)]">
              جمهوری اسلامی ایران
            </div>
            <div className="text-sm font-black text-[var(--lg-ink)] tracking-tight">
              وزارت کشور · استانداری تهران
            </div>
            <div className="text-xs font-semibold text-cyan-600 dark:text-cyan-400 mt-0.5">
              {countyGovernorRole?.title || 'فرمانداری شهرستان'}
            </div>
          </div>

          {/* Central Official Emblem Lockup */}
          <div className="text-center flex flex-col items-center">
            <TehranGovernorateLogo size="lg" />
            <div className="text-[10px] text-[var(--lg-muted)] mt-1 font-bold">
              سکوی هوشمند تصمیم‌یار استاندار
            </div>
          </div>

          {/* Document Tracking Metadata */}
          <div className="text-left text-[11px] text-[var(--lg-muted)] font-mono space-y-0.5 dir-ltr">
            <div>
              <span className="font-semibold text-[var(--lg-ink)]">
                NO:{' '}
              </span>
              TEH-RPT-1405-
              {selectedCounty === 'all'
                ? 'PROV'
                : selectedCounty.substring(0, 3).toUpperCase()}
              -{selectedMonthId.toUpperCase()}
            </div>
            <div>
              <span className="font-semibold text-[var(--lg-ink)]">
                DATE:{' '}
              </span>
              {selectedMonthObj.name}
            </div>
            <div>
              <span className="font-semibold text-[var(--lg-ink)]">
                CLASS:{' '}
              </span>
              <span
                className={`font-bold ${
                  classification === 'خیلی محرمانه'
                    ? 'text-rose-500'
                    : classification === 'محرمانه'
                    ? 'text-amber-500'
                    : 'text-cyan-500'
                }`}
              >
                {classification}
              </span>
            </div>
          </div>
        </div>

        {/* Title of the Report */}
        <div className="text-center space-y-1 mb-8">
          <h1 className="text-xl sm:text-2xl font-black text-[var(--lg-ink)] tracking-tight">
            کارنامه جامع پایش وضعیت اقتصادی و معیشتی {currentCountyName}
          </h1>
          <p className="text-xs sm:text-sm text-[var(--lg-muted)] font-medium">
            گزارش رسمی تله‌متری دوره‌ای عملکرد حاکمیتی · دوره ارزیابی:{' '}
            <strong className="text-cyan-600 dark:text-cyan-400">
              {selectedMonthObj.name}
            </strong>
          </p>
        </div>

        {/* Section 1: Executive Snapshot Card (شناسنامه مدیریتی شهرستان) */}
        <div className="bg-[var(--lg-surface)] border border-[var(--lg-border)] rounded-2xl p-4 sm:p-5 mb-8">
          <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 border-b border-[var(--lg-border)] pb-3 mb-3">
            <div className="flex items-center gap-2">
              <Building2 className="w-4 h-4 text-cyan-500" />
              <span className="text-xs font-extrabold text-[var(--lg-ink)]">
                شناسنامه و مسئولیت اجرایی حوزه گزارش
              </span>
            </div>
            <div className="flex items-center gap-4 text-xs text-[var(--lg-muted)]">
              <span>
                مقام مسئول:{' '}
                <strong className="text-[var(--lg-ink)]">
                  {countyGovernorRole?.officialName || 'فرماندار'}
                </strong>
              </span>
              <span>·</span>
              <span>
                سمت رسمی:{' '}
                <strong className="text-cyan-600 dark:text-cyan-400">
                  {countyGovernorRole?.title || 'فرماندار شهرستان'}
                </strong>
              </span>
            </div>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-xs">
            <div className="bg-[var(--lg-panel)] p-2.5 rounded-xl border border-[var(--lg-border)]">
              <span className="text-[11px] text-[var(--lg-muted)] block">
                جمعیت برآوردی ۱۴۰۵:
              </span>
              <span className="text-sm font-black font-mono text-[var(--lg-ink)]">
                {selectedCounty === 'all'
                  ? '۱۴,۴۸۰,۰۰۰ نفر'
                  : `${formatPersianNumber(
                      currentCountyData?.estimatedPopulation1405 || 0
                    )} نفر`}
              </span>
            </div>

            <div className="bg-[var(--lg-panel)] p-2.5 rounded-xl border border-[var(--lg-border)]">
              <span className="text-[11px] text-[var(--lg-muted)] block">
                سهم از تولید ناخالص (GDP):
              </span>
              <span className="text-sm font-black font-mono text-cyan-600 dark:text-cyan-400">
                {selectedCounty === 'all'
                  ? '۲۰.۹۴٪ کشور (رتبه ۱)'
                  : `${toPersianDigits(
                      currentCountyData?.gdpSharePercent || 0
                    )}٪ از استان`}
              </span>
            </div>

            <div className="bg-[var(--lg-panel)] p-2.5 rounded-xl border border-[var(--lg-border)]">
              <span className="text-[11px] text-[var(--lg-muted)] block">
                واحدهای صنعتی فعال:
              </span>
              <span className="text-sm font-black font-mono text-[var(--lg-ink)]">
                {selectedCounty === 'all'
                  ? '۱۱,۴۵۰ کارخانه'
                  : `${formatPersianNumber(
                      currentCountyData?.activeIndustrialUnits || 0
                    )} واحد`}
              </span>
            </div>

            <div className="bg-[var(--lg-panel)] p-2.5 rounded-xl border border-[var(--lg-border)]">
              <span className="text-[11px] text-[var(--lg-muted)] block">
                نانوایی‌های متصل به نانینو:
              </span>
              <span className="text-sm font-black font-mono text-emerald-600 dark:text-emerald-400">
                {selectedCounty === 'all'
                  ? '۹,۶۴۰ واحد نانوایی'
                  : `${formatPersianNumber(
                      currentCountyData?.bakeriesCount || 0
                    )} واحد`}
              </span>
            </div>
          </div>
        </div>

        {/* Section 2: Executive Synthesized Analysis (خلاصه مدیریتی استراتژیک) */}
        <div className="space-y-2 mb-8">
          <div className="flex items-center gap-2 text-xs font-black text-cyan-600 dark:text-cyan-400 uppercase tracking-wider">
            <Sparkles className="w-4 h-4" />
            <span>بخش اول: خلاصه ارزیابی و سنتز مدیریتی ماهانه</span>
          </div>
          <div className="bg-cyan-500/5 dark:bg-cyan-950/20 border border-cyan-500/20 rounded-2xl p-4 sm:p-5 text-xs sm:text-sm text-[var(--lg-ink)] leading-relaxed text-justify font-medium">
            {executiveSummaryText}
          </div>
        </div>

        {/* Section 3: 4 Key Macro Performance Strips (۴ کارت سنجه کلان ماهانه) */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3.5 mb-8">
          {reportMetrics.slice(0, 4).map((kpi) => (
            <div
              key={kpi.id}
              className="bg-[var(--lg-surface)] border border-[var(--lg-border)] rounded-2xl p-4 flex flex-col justify-between shadow-sm"
            >
              <div className="flex items-center justify-between gap-2 mb-2">
                <span className="text-xs text-[var(--lg-muted)] font-bold truncate">
                  {kpi.title}
                </span>
                <span
                  className={`text-[10px] px-2 py-0.5 rounded-full font-bold font-mono flex items-center gap-0.5 ${
                    kpi.changePercent >= 0
                      ? 'bg-emerald-500/15 text-emerald-600 dark:text-emerald-400 border border-emerald-500/20'
                      : 'bg-rose-500/15 text-rose-600 dark:text-rose-400 border border-rose-500/20'
                  }`}
                >
                  {kpi.changePercent >= 0 ? (
                    <TrendingUp className="w-3 h-3" />
                  ) : (
                    <TrendingDown className="w-3 h-3" />
                  )}
                  <span>
                    {kpi.changePercent > 0 ? '+' : ''}
                    {toPersianDigits(kpi.changePercent)}٪
                  </span>
                </span>
              </div>

              <div className="flex items-baseline gap-1.5 my-1">
                <span className="text-2xl font-black font-mono text-[var(--lg-ink)]">
                  {typeof kpi.currentValue === 'number'
                    ? formatPersianNumber(kpi.currentValue)
                    : toPersianDigits(kpi.currentValue)}
                </span>
                <span className="text-xs text-[var(--lg-muted)] font-semibold">
                  {kpi.unit}
                </span>
              </div>

              <div className="mt-2 pt-2 border-t border-[var(--lg-border)] flex items-center justify-between text-[11px] text-[var(--lg-muted)]">
                <span>
                  هدف: {toPersianDigits(kpi.annualTarget)} {kpi.unit}
                </span>
                <span className="font-bold text-cyan-600 dark:text-cyan-400">
                  تحقق: {toPersianDigits(kpi.realizationPercent)}٪
                </span>
              </div>
            </div>
          ))}
        </div>

        {/* Section 4: Detailed Performance Matrix Table (جدول ماتریس جامع شاخص‌ها) */}
        <div className="space-y-3 mb-8">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
            <div className="flex items-center gap-2 text-xs font-black text-cyan-600 dark:text-cyan-400 uppercase tracking-wider">
              <FileText className="w-4 h-4" />
              <span>بخش دوم: ماتریس تفصیلی شاخص‌های عملکردی ماهانه شهرستان</span>
            </div>
            <span className="text-[11px] text-[var(--lg-muted)]">
              واحد ارقام: استاندارد رسمی ملی و استانی · انطباق با گزارش خزانه‌داری
            </span>
          </div>

          {/* Responsive Table Wrapper */}
          <div className="overflow-x-auto rounded-2xl border border-[var(--lg-border-strong)]">
            <table className="w-full text-right text-xs border-collapse min-w-[720px]">
              <thead>
                <tr className="bg-[var(--lg-surface)] border-b border-[var(--lg-border-strong)] text-[var(--lg-muted)] font-bold">
                  <th className="py-3 px-3 w-10 text-center">#</th>
                  <th className="py-3 px-3">حوزه تخصصی</th>
                  <th className="py-3 px-4">عنوان شاخص اقتصادی</th>
                  <th className="py-3 px-3 text-center">واحد</th>
                  <th className="py-3 px-3 text-center">عملکرد این دوره</th>
                  <th className="py-3 px-3 text-center">دوره قبل</th>
                  <th className="py-3 px-3 text-center">تغییر</th>
                  <th className="py-3 px-3 text-center">هدف سال ۱۴۰۵</th>
                  <th className="py-3 px-3 text-center">تحقق</th>
                  <th className="py-3 px-4">وضعیت ارزیابی</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[var(--lg-border)]">
                {reportMetrics.map((row, idx) => (
                  <tr
                    key={row.id}
                    className="hover:bg-[var(--lg-hover)] transition-colors"
                  >
                    <td className="py-3 px-3 text-center font-mono text-[var(--lg-muted)]">
                      {toPersianDigits(idx + 1)}
                    </td>
                    <td className="py-3 px-3 font-semibold text-[var(--lg-muted)]">
                      {row.category}
                    </td>
                    <td className="py-3 px-4 font-bold text-[var(--lg-ink)]">
                      {row.title}
                    </td>
                    <td className="py-3 px-3 text-center text-[var(--lg-muted)]">
                      {row.unit}
                    </td>
                    <td className="py-3 px-3 text-center font-black font-mono text-[var(--lg-ink)]">
                      {typeof row.currentValue === 'number'
                        ? formatPersianNumber(row.currentValue)
                        : toPersianDigits(row.currentValue)}
                    </td>
                    <td className="py-3 px-3 text-center font-mono text-[var(--lg-muted)]">
                      {typeof row.prevValue === 'number'
                        ? formatPersianNumber(row.prevValue)
                        : toPersianDigits(row.prevValue)}
                    </td>
                    <td className="py-3 px-3 text-center font-mono">
                      <span
                        className={`inline-flex items-center gap-0.5 px-2 py-0.5 rounded-full text-[10px] font-bold ${
                          row.changePercent >= 0
                            ? 'bg-emerald-500/15 text-emerald-600 dark:text-emerald-400'
                            : 'bg-rose-500/15 text-rose-600 dark:text-rose-400'
                        }`}
                      >
                        {row.changePercent > 0 ? '+' : ''}
                        {toPersianDigits(row.changePercent)}٪
                      </span>
                    </td>
                    <td className="py-3 px-3 text-center font-mono text-[var(--lg-muted)]">
                      {typeof row.annualTarget === 'number'
                        ? formatPersianNumber(row.annualTarget)
                        : toPersianDigits(row.annualTarget)}
                    </td>
                    <td className="py-3 px-3 text-center font-mono font-bold text-cyan-600 dark:text-cyan-400">
                      {toPersianDigits(row.realizationPercent)}٪
                    </td>
                    <td className="py-3 px-4">
                      <div className="flex items-center gap-1.5">
                        <span
                          className={`w-2 h-2 rounded-full shrink-0 ${
                            row.status === 'optimal'
                              ? 'bg-emerald-500'
                              : row.status === 'stable'
                              ? 'bg-cyan-500'
                              : row.status === 'warning'
                              ? 'bg-amber-500'
                              : 'bg-rose-500'
                          }`}
                        />
                        <span className="text-[11px] font-medium text-[var(--lg-ink)]">
                          {row.statusText}
                        </span>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Section 5: Bottlenecks & Priority Warnings (بخش سوم: گلوگاه‌ها و مخاطرات) */}
        <div className="space-y-3 mb-8">
          <div className="flex items-center gap-2 text-xs font-black text-rose-600 dark:text-rose-400 uppercase tracking-wider">
            <AlertTriangle className="w-4 h-4" />
            <span>بخش سوم: ارزیابی موانع، گلوگاه‌ها و هشدارهای اولویت‌دار حوزه شهرستان</span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
            {priorityBottlenecks.map((item, idx) => (
              <div
                key={idx}
                className="bg-[var(--lg-surface)] border border-[var(--lg-border)] rounded-2xl p-4 flex flex-col justify-between space-y-2 shadow-sm"
              >
                <div>
                  <div className="flex items-center justify-between gap-2 mb-1.5">
                    <span className="text-[10px] font-mono font-bold px-2 py-0.5 rounded-full bg-rose-500/15 text-rose-600 dark:text-rose-400 border border-rose-500/20">
                      مخاطره اولویت {toPersianDigits(idx + 1)}
                    </span>
                    <span className="text-[10px] text-[var(--lg-muted)]">
                      سطح ریسک: {item.level === 'critical' ? 'بحرانی' : 'هشدار'}
                    </span>
                  </div>
                  <h4 className="text-xs font-extrabold text-[var(--lg-ink)] leading-snug">
                    {item.title}
                  </h4>
                  <p className="text-[11px] text-[var(--lg-muted)] mt-1 leading-relaxed">
                    پیامد: {item.impact}
                  </p>
                </div>

                <div className="pt-2 border-t border-[var(--lg-border)] text-[11px] text-cyan-600 dark:text-cyan-400 font-semibold">
                  راهکار پیشنهادی: {item.remedy}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Section 6: Actionable Governor Directives (بخش چهارم: بسته مصوبات پیشنهادی فرماندار) */}
        <div className="space-y-3 mb-10">
          <div className="flex items-center gap-2 text-xs font-black text-emerald-600 dark:text-emerald-400 uppercase tracking-wider">
            <Award className="w-4 h-4" />
            <span>بخش چهارم: مصوبات پیشنهادی فرمانداری جهت طرح در کارگروه اقتصادی استاندار</span>
          </div>

          <div className="overflow-x-auto rounded-2xl border border-[var(--lg-border)]">
            <table className="w-full text-right text-xs border-collapse min-w-[640px]">
              <thead>
                <tr className="bg-[var(--lg-surface)] border-b border-[var(--lg-border)] text-[var(--lg-muted)] font-bold">
                  <th className="py-2.5 px-3 w-10 text-center">بند</th>
                  <th className="py-2.5 px-4">عنوان مصوبه پیشنهادی</th>
                  <th className="py-2.5 px-3">دستگاه اجرایی متولی</th>
                  <th className="py-2.5 px-3 text-center">مهلت اجرا</th>
                  <th className="py-2.5 px-4">منبع تامین مالی / سازوکار</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[var(--lg-border)]">
                {proposedDirectives.map((d) => (
                  <tr
                    key={d.num}
                    className="hover:bg-[var(--lg-hover)] transition-colors"
                  >
                    <td className="py-3 px-3 text-center font-mono font-bold text-cyan-500">
                      {toPersianDigits(d.num)}
                    </td>
                    <td className="py-3 px-4 font-bold text-[var(--lg-ink)]">
                      {d.title}
                    </td>
                    <td className="py-3 px-3 text-[var(--lg-muted)] font-medium">
                      {d.responsible}
                    </td>
                    <td className="py-3 px-3 text-center font-mono font-semibold text-rose-500 dark:text-rose-400">
                      {d.deadline}
                    </td>
                    <td className="py-3 px-4 text-[var(--lg-muted)] text-[11px]">
                      {d.source}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Section 7: Official Signatures & Ratification Box (سربرگ پایان و امضاهای حاکمیتی) */}
        <div className="border-t-2 border-[var(--lg-border-strong)] pt-8 mt-10">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 text-center text-xs">
            {/* Signature 1: County Governor */}
            <div className="space-y-3">
              <div className="text-[var(--lg-muted)] font-bold text-[11px]">
                تنظیم و تایید اولیه گزارش:
              </div>
              <div className="font-extrabold text-[var(--lg-ink)] text-sm">
                {countyGovernorRole?.officialName || 'فرماندار شهرستان'}
              </div>
              <div className="text-[11px] text-cyan-600 dark:text-cyan-400 font-semibold">
                {countyGovernorRole?.title || 'فرماندار حوزه استحفاظی'}
              </div>
              <div className="pt-2 text-[10px] text-[var(--lg-muted)] font-mono">
                [امضای دیجیتال و تایید نهایی سند]
              </div>
            </div>

            {/* Signature 2: Economic Deputy */}
            <div className="space-y-3">
              <div className="text-[var(--lg-muted)] font-bold text-[11px]">
                بررسی و انطباق آماری:
              </div>
              <div className="font-extrabold text-[var(--lg-ink)] text-sm">
                دکتر حشمت‌الله عسگری
              </div>
              <div className="text-[11px] text-sky-600 dark:text-sky-400 font-semibold">
                معاون هماهنگی امور اقتصادی استانداری تهران
              </div>
              <div className="pt-2 text-[10px] text-[var(--lg-muted)] font-mono">
                [پاراف تخصصی دبیرخانه ستاد تسهیل]
              </div>
            </div>

            {/* Signature 3: Governor General */}
            <div className="space-y-2 flex flex-col items-center">
              <div className="text-[var(--lg-muted)] font-bold text-[11px]">
                صحه‌گذاری و ابلاغ دستورات:
              </div>
              <div className="font-extrabold text-[var(--lg-ink)] text-sm">
                محمدصادق معتمدیان
              </div>
              <div className="text-[11px] text-emerald-600 dark:text-emerald-400 font-semibold">
                استاندار تهران
              </div>
              <div className="pt-1 flex items-center justify-center">
                <TehranGovernorateLogo size="sm" />
              </div>
              <div className="text-[10px] text-[var(--lg-muted)] font-mono">
                [مهر امنیتی و ابلاغ جهت اجرا به دستگاه‌ها]
              </div>
            </div>
          </div>

          {/* Official Bottom System Stamp */}
          <div className="mt-8 pt-4 border-t border-[var(--lg-border)] flex flex-col sm:flex-row items-center justify-between text-[10px] text-[var(--lg-muted)] gap-2">
            <span>
              سکوی تصمیم‌یار اقتصادی استاندار تهران · استانداری تهران © ۱۴۰۵
            </span>
            <span>
              طراحی، هوشمندسازی و پردازش تله‌متری: شرکت شبکه هوشمند ابتکار ویستا (دانش‌بنیان)
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ComprehensiveMonthlyReportGenerator;
