/**
 * مرکز فرماندهی و تصمیم‌یار هوشمند اقتصادی استانداری تهران
 * مخزن جامع داده‌های تخصصی تفکیک‌شده ۱۲ کلان‌ماژول (Domain Data Repository)
 * شرکت شبکه هوشمند ابتکار ویستا © ۱۴۰۵
 */

export interface DomainMetricItem {
  key: string;
  label: string;
  value: string;
  subValue?: string;
  changePercent?: number;
  isPositiveGood?: boolean;
  unit: string;
  source: string;
  level: 'A' | 'B';
}

export interface DomainTableRow {
  id: string;
  title: string;
  category: string;
  countyOrZone: string;
  metric1: string;
  metric2: string;
  status: 'normal' | 'warning' | 'critical' | 'optimal';
  statusText: string;
  detail: string;
}

export interface DomainModuleData {
  moduleId: string;
  titleFa: string;
  agentCode: string;
  headlineSummary: string;
  policyPriority: string;
  metrics: DomainMetricItem[];
  carouselHighlights: {
    id: string;
    title: string;
    subtitle: string;
    badge: string;
    badgeColor: 'cyan' | 'blue' | 'emerald' | 'amber' | 'rose';
    description: string;
    metric: string;
    metricLabel: string;
    actionLabel: string;
    actionUrl: string;
  }[];
  chartData: {
    label: string;
    primaryValue: number;
    secondaryValue: number;
    targetValue?: number;
  }[];
  chartTitles: {
    main: string;
    sub: string;
    primaryLegend: string;
    secondaryLegend: string;
  };
  tableRows: DomainTableRow[];
  tableHeaders: {
    col1: string;
    col2: string;
    col3: string;
    col4: string;
    col5: string;
  };
  whatIfScenarios: {
    id: string;
    title: string;
    description: string;
    estimatedImpact: string;
    leverKey: string;
  }[];
}

export const TEHRAN_DOMAIN_DATA_REPO: Record<string, DomainModuleData> = {
  // 1. Overview
  dashboard: {
    moduleId: 'dashboard',
    titleFa: 'سکوی تصمیم‌یار کلان و دید ۳۶۰ درجه استاندار',
    agentCode: 'AGT-01',
    headlineSummary: 'پایش ۳۶۰ درجه و تله‌متری زنده متغیرهای حیاتی استان تهران با پوشش ۱۶ شهرستان و ۱۱ مدیرکل اقتصادی.',
    policyPriority: 'مهار تورم فصلی خوراکی‌ها در میادین جنوب تهران و تسریع در تخصیص اعتبارات تبصره ۱۸ صنایع شمس‌آباد.',
    metrics: [
      { key: 'gdp', label: 'سهم تهران از GDP کشور', value: '۲۰.۹۴٪', subValue: 'هدف‌گذاری: ۲۲.۱٪', changePercent: 1.2, isPositiveGood: true, unit: 'درصد کل کشور', source: 'مرکز آمار ایران', level: 'A' },
      { key: 'tax', label: 'درآمدهای عمومی ۵ماهه', value: '۳۹۳', subValue: 'رشد نسبت به سال قبل', changePercent: 77.0, isPositiveGood: true, unit: 'همت (هزار میلیارد)', source: 'خزانه معین استان', level: 'A' },
      { key: 'deposits', label: 'سهم تهران از سپرده‌ها', value: '۶۰.۵٪', subValue: '۵٬۴۰۰ همت مانده سپرده', changePercent: 1.8, isPositiveGood: true, unit: 'درصد کل شبکه بانکی', source: 'بانک مرکزی', level: 'A' },
      { key: 'wheat', label: 'ذخایر استراتژیک گندم', value: '۴۲', subValue: 'سیلوهای ری و تهرانسر', changePercent: 4.0, isPositiveGood: true, unit: 'روز مصرف مطمئن', source: 'اداره کل غله استان', level: 'A' },
    ],
    carouselHighlights: [
      { id: 'c1', title: 'تحقق ۳۹۳ همت درآمد عمومی در ۵ ماهه نخست', subtitle: 'خزانه معین استان تهران', badge: 'رشد ۷۷٪', badgeColor: 'emerald', description: 'واریز قطعی درآمدهای عمومی استان تهران به ۳۹۳ هزار میلیارد تومان بالغ شده که بیانگر رشد ۷۷ درصدی نسبت به مقطع مشابه است.', metric: '۳۹۳ همت', metricLabel: 'وصولی قطعی', actionLabel: 'مشاهده خزانه', actionUrl: '/macro/tax-treasury' },
      { id: 'c2', title: 'سهم ۶۰.۵ درصدی تهران از کل منابع بانکی کشور', subtitle: 'گزارش نظارتی شورای هماهنگی بانک‌ها', badge: 'کانون مالی کشور', badgeColor: 'cyan', description: 'مانده سپرده‌های ریالی و ارزی تهران به بیش از ۵٬۴۰۰ همت رسیده که بالاترین ظرفیت تامین مالی خطوط تولید را ایجاد کرده است.', metric: '۶۰.۵٪', metricLabel: 'سهم پایتخت', actionLabel: 'بررسی تسهیلات', actionUrl: '/finance/banking-deposits-loans' },
      { id: 'c3', title: 'تثبیت ۴۲ روزه ذخایر مطمئن سیلوهای استان', subtitle: 'قرارگاه امنیت غذایی استان تهران', badge: 'ذخایر استراتژیک', badgeColor: 'blue', description: 'موجودی گندم در سیلوهای شهید مدرس ری و تهرانسر معادل ۳۱۵ هزار تن ارزیابی شده که تراز پایداری مصرف آرد تهران را تامین می‌کند.', metric: '۴۲ روز', metricLabel: 'پوشش سیلویی', actionLabel: 'پایش نانینو', actionUrl: '/bread/nanino-smart-monitoring' },
    ],
    chartData: [
      { label: 'فروردین', primaryValue: 58, secondaryValue: 39.8 },
      { label: 'اردیبهشت', primaryValue: 69, secondaryValue: 39.4 },
      { label: 'خرداد', primaryValue: 84, secondaryValue: 39.1 },
      { label: 'تیر', primaryValue: 88, secondaryValue: 38.9 },
      { label: 'مرداد', primaryValue: 94, secondaryValue: 38.6 },
      { label: 'شهریور', primaryValue: 102, secondaryValue: 38.2 },
    ],
    chartTitles: { main: 'روند تحقق درآمدهای عمومی در برابر تورم نقطه‌ای', sub: 'مقایسه عملکرد وصولی (همت) و تغییرات شاخص بهای کالاها (٪)', primaryLegend: 'درآمد وصولی (همت)', secondaryLegend: 'تورم نقطه‌ای (٪)' },
    tableRows: [
      { id: 'r1', title: 'فرمانداری ویژه شهریار', category: 'پهنه غرب', countyOrZone: 'شهریار', metric1: '۸۴۵ هزار نفر', metric2: '۱۲۸۰ واحد صنعتی', status: 'optimal', statusText: 'پایدار', detail: 'رتبه برتر احیای واحدهای راکد قطب میوه و صنایع تبدیلی' },
      { id: 'r2', title: 'فرمانداری بهارستان', category: 'پهنه جنوب‌غرب', countyOrZone: 'بهارستان', metric1: '۶۰۵ هزار نفر', metric2: '۶۸۰ واحد صنعتی', status: 'warning', statusText: 'پایش فشرده', detail: 'تراکم جمعیتی بالا و لزوم نظارت بر توزیع مویرگی آرد نانینو' },
      { id: 'r3', title: 'فرمانداری ویژه ری', category: 'پهنه جنوب', countyOrZone: 'ری', metric1: '۴۰۵ هزار نفر', metric2: '۱۹۲۰ واحد صنعتی', status: 'normal', statusText: 'عادی', detail: 'میزبانی بزرگترین شهرک صنعتی شمس‌آباد و سیلوهای غله' },
      { id: 'r4', title: 'فرمانداری پاکدشت', category: 'پهنه جنوب‌شرق', countyOrZone: 'پاکدشت', metric1: '۴۱۰ هزار نفر', metric2: '۲۱۵۰ واحد صنعتی', status: 'warning', statusText: 'ناترازی برق', detail: 'پایتخت گل و گیاه کشور و تمرکز صنایع ریخته‌گری در عباس‌آباد' },
    ],
    tableHeaders: { col1: 'دستگاه / شهرستان', col2: 'پهنه استانی', col3: 'شاخص جمعیتی', col4: 'صنایع فعال', col5: 'وضعیت پایش' },
    whatIfScenarios: [
      { id: 'w1', title: 'افزایش ۲۰٪ سهمیه آرد شهرستان‌های پرجمعیت', description: 'کاهش صفوف نانوایی‌ها در بهارستان و ملارد به میزان ۳۵٪.', estimatedImpact: 'کاهش شاخص تنش معیشتی به میزان ۱۸٪', leverKey: 'flourQuotaDeltaPercent' },
      { id: 'w2', title: 'تزریق ۳۵۰۰ تن مرغ منجمد به میادین شهرداری', description: 'مهار شکاف قیمتی گوشت مرغ با نرخ مصوب ۷۸ هزار تومان.', estimatedImpact: 'تثبیت قیمت در ۲۶۲ میدان میوه و تره‌بار', leverKey: 'marketInjectionTons' },
    ]
  },

  // 2. Macro Economy & Tax
  macro: {
    moduleId: 'macro',
    titleFa: 'اقتصاد کلان، خزانه، دارایی و بودجه استان',
    agentCode: 'AGT-02',
    headlineSummary: 'تحلیل ساختار درآمدی ۳۹۳ همتی تهران، ارزش افزوده ۷۳ همتی و سهم ۲۰.۹۴ درصدی پایتخت در تولید ناخالص داخلی کشور.',
    policyPriority: 'تخصیص مازاد درآمدهای ماده ۳۷ به توسعه زیرساخت‌های آبرسانی دشت ورامین و قطب‌های صنعتی.',
    metrics: [
      { key: 'm1', label: 'مالیات اشخاص حقوقی (شرکت‌ها)', value: '۱۸۲', subValue: 'سهم ۴۶٪ از کل درآمدها', changePercent: 82.0, isPositiveGood: true, unit: 'همت وصولی', source: 'امور مالیاتی استان تهران', level: 'A' },
      { key: 'm2', label: 'مالیات بر ارزش افزوده (VAT)', value: '۷۳', subValue: 'سهم شهرداری‌ها و دهیاری‌ها', changePercent: 68.5, isPositiveGood: true, unit: 'همت', source: 'اداره کل مالیاتی', level: 'A' },
      { key: 'm3', label: 'پروژه‌های مالیات نشان‌دار شرق', value: '۱۱۴', subValue: 'انتخاب مستقیم توسط مودیان', changePercent: 120.0, isPositiveGood: true, unit: 'میلیارد تومان', source: 'سامانه مودیان', level: 'A' },
      { key: 'm4', label: 'سهم خدمات در ارزش افزوده', value: '۶۸.۲٪', subValue: 'صنعت ۲۶٪ - کشاورزی ۴.۱٪', changePercent: 0.8, isPositiveGood: true, unit: 'درصد کل GDP استان', source: 'حساب‌های منطقه‌ای', level: 'A' },
    ],
    carouselHighlights: [
      { id: 'mc1', title: 'سهم ۶۸ درصدی بخش خدمات در تولید ارزش افزوده تهران', subtitle: 'ساختار نوین اقتصاد دانش‌بنیان و مالی', badge: 'بخش غالب', badgeColor: 'blue', description: 'اقتصاد پایتخت با تمرکز بر خدمات نوین، فناوری اطلاعات، بانکداری و تجارت عمده، ارزش افزوده‌ای بالغ بر ۴ برابر میانگین استان‌ها تولید می‌کند.', metric: '۶۸.۲٪', metricLabel: 'سهم ارزش افزوده', actionLabel: 'مشاهده تفکیک GDP', actionUrl: '/macro/gdp-growth' },
      { id: 'mc2', title: 'تحقق ۱۱۷ درصدی هدف‌گذاری مالیاتی در نیمه نخست سال', subtitle: 'اداره کل امور مالیاتی استان تهران', badge: 'مازاد درآمد', badgeColor: 'emerald', description: 'وصول به موقع مالیات کارتخوان‌ها و شرکت‌های بزرگ مستقر در تهران، مازاد درآمدی معادل ۲۸ همت جهت طرح در شورای برنامه‌ریزی ایجاد کرده است.', metric: '۱۱۷٪', metricLabel: 'پوشش هدف', actionLabel: 'بررسی خزانه‌داری', actionUrl: '/macro/tax-treasury' },
      { id: 'mc3', title: 'سهم ۴۸ درصدی مسکن و اجاره در سبد هزینه خانوار تهرانی', subtitle: 'پایش شاخص بهای مصرف‌کننده (CPI)', badge: 'فشار هزینه', badgeColor: 'rose', description: 'وزن بالای مسکن در سبد مصرفی تهران باعث گردیده تورم مسکن اصلی‌ترین محرک انتظارات تورمی در مناطق ۲۲ گانه شهر تهران باشد.', metric: '۴۸.۴٪', metricLabel: 'وزن در سبد CPI', actionLabel: 'تحلیل تورم مسکن', actionUrl: '/macro/inflation-cpi' },
    ],
    chartData: [
      { label: 'اشخاص حقوقی', primaryValue: 182, secondaryValue: 150 },
      { label: 'ارزش افزوده', primaryValue: 73, secondaryValue: 60 },
      { label: 'حقوق و دستمزد', primaryValue: 48, secondaryValue: 45 },
      { label: 'مشاغل و اصناف', primaryValue: 35, secondaryValue: 30 },
      { label: 'گمرکات استان', primaryValue: 55, secondaryValue: 42 },
    ],
    chartTitles: { main: 'ترکیب پایه‌های وصولی درآمدهای عمومی استان تهران', sub: 'مقایسه وصولی ۵ ماهه در برابر رقم مصوب بودجه (همت)', primaryLegend: 'وصولی قطعی (همت)', secondaryLegend: 'مصوب متناظر (همت)' },
    tableRows: [
      { id: 't1', title: 'اداره کل امور مالیاتی مودیان بزرگ تهران', category: 'شرکت‌های بورسی و ملی', countyOrZone: 'تهران', metric1: '۱۱۴ همت', metric2: '۹۶٪ وصولی الکترونیک', status: 'optimal', statusText: 'تحقق کامل', detail: 'وصول عوارض و مالیات ۳۵۰ هلدینگ صنعتی و بانک‌های مستقر در پایتخت' },
      { id: 't2', title: 'امور مالیاتی جنوب تهران و ری', category: 'صنایع شمس‌آباد و انبارها', countyOrZone: 'ری', metric1: '۳۸ همت', metric2: '۸۴٪ شرکت‌های تولیدی', status: 'normal', statusText: 'عادی', detail: 'تمرکز بر اعطای مشوق‌های مالیاتی ماده ۱۳۲ به کارخانجات فعال' },
      { id: 't3', title: 'امور مالیاتی غرب استان تهران', category: 'شهریار و قدس', countyOrZone: 'شهریار', metric1: '۲۴ همت', metric2: '۷۹٪ اصناف و کارگاه‌ها', status: 'normal', statusText: 'عادی', detail: 'وصول مالیات نشان‌دار مودیان برای ساخت بیمارستان امام خمینی شهریار' },
      { id: 't4', title: 'امور مالیاتی شرق استان تهران', category: 'پاکدشت و دماوند', countyOrZone: 'پاکدشت', metric1: '۱۹ همت', metric2: '۱۱۴ م.ت نشان‌دار', status: 'optimal', statusText: 'پیشرو', detail: 'مشارکت مودیان در بهسازی راه مواصلاتی شریف‌آباد به پاکدشت' },
    ],
    tableHeaders: { col1: 'حوزه مالیاتی', col2: 'طبقه مودیان', col3: 'حجم وصولی ۵ماهه', col4: 'ضریب الکترونیکی', col5: 'ارزیابی عملکرد' },
    whatIfScenarios: [
      { id: 'wm1', title: 'افزایش ۱۰٪ معافیت مالیاتی کارگاه‌های زیر ۵۰ نفر', description: 'حفظ اشتغال ۳۵ هزار کارگر در شهرک‌های صنعتی قرچک و پیشوا.', estimatedImpact: 'رشد اشتغال خرد به میزان ۴.۲٪ با بار مالی ۱.۲ همت', leverKey: 'workingCapitalCreditHemmat' },
      { id: 'wm2', title: 'مولدسازی ۲۰ همت املاک مازاد دستگاه‌های اجرایی تهران', description: 'تامین اعتبار خطوط متروی پرند و پاکدشت بدون فشار به پایه پولی.', estimatedImpact: 'جذب نقدینگی بخش خصوصی در ۲۴ پروژه نیمه‌تمام', leverKey: 'assetMonetizationHemmat' },
    ]
  },

  // 3. Banking, Finance & Investment
  finance: {
    moduleId: 'finance',
    titleFa: 'شبکه بانکی، تامین مالی، بورس و سرمایه‌گذاری',
    agentCode: 'AGT-03',
    headlineSummary: 'هدایت جریان نقدینگی ۶۰.۵ درصدی بانک‌های تهران به سوی ابزارهای زنجیره تامین (اوراق گام) و احیای کارخانجات راکد.',
    policyPriority: 'افزایش سقف انتشار اوراق گام به ۶۰ همت برای صنایع قطعه‌سازی خودرو و داروسازی استان.',
    metrics: [
      { key: 'f1', label: 'مانده سپرده‌های بانکی تهران', value: '۵٬۴۲۰', subValue: '۶۰.۵٪ سپرده‌های کشور', changePercent: 2.1, isPositiveGood: true, unit: 'هزار میلیارد (همت)', source: 'بانک مرکزی ج.ا.ا', level: 'A' },
      { key: 'f2', label: 'مانده تسهیلات پرداختی', value: '۴٬۲۱۰', subValue: 'نسبت تسهیلات به سپرده: ۷۷.۶٪', changePercent: 1.4, isPositiveGood: true, unit: 'همت', source: 'شورای هماهنگی بانک‌ها', level: 'A' },
      { key: 'f3', label: 'انتشار اوراق گام زنجیره تولید', value: '۴۲', subValue: 'تسویه خرید نهاده و مواد اولیه', changePercent: 45.0, isPositiveGood: true, unit: 'همت', source: 'فرابورس ایران', level: 'A' },
      { key: 'f4', label: 'املاک مازاد شناسایی‌شده مولدسازی', value: '۴۸', subValue: 'ارزش کارشناسی: ۳۸.۵ همت', changePercent: 30.0, isPositiveGood: true, unit: 'پلاک ثبتی', source: 'دبیرخانه مولدسازی تهران', level: 'A' },
    ],
    carouselHighlights: [
      { id: 'fc1', title: 'تخصیص ۴۲ همت اوراق گام به شرکت‌های صنعتی استان تهران', subtitle: 'تامین مالی غیرتورمی سرمایه در گردش', badge: 'ابزار نوین', badgeColor: 'cyan', description: 'با هماهنگی بانک ملی، تجارت و ملت، اوراق گام برای خرید مواد اولیه فولادی، آلومینیوم و پتروشیمی صنایع مستقر در شمس‌آباد عملیاتی شد.', metric: '۴۲ همت', metricLabel: 'حجم انتشار', actionLabel: 'مشاهده عملکرد گام', actionUrl: '/finance/production-credit-gam' },
      { id: 'fc2', title: 'سرمایه‌گذاری خارجی ۱.۲ میلیارد دلاری در قطب‌های فناوری', subtitle: 'مرکز خدمات سرمایه‌گذاری استان تهران', badge: 'رشد ارزی', badgeColor: 'emerald', description: 'توسعه ۳ طرح مشترک در شهرک صنعتی پردیس و فرودگاه امام خمینی (ره) با مشارکت سرمایه‌گذاران حوزه داروسازی پیشرفته و ریزالکترونیک.', metric: '۱.۲ م.د', metricLabel: 'سرمایه مصوب', actionLabel: 'بررسی طرح‌های خارجی', actionUrl: '/finance/foreign-investment' },
      { id: 'fc3', title: 'عرضه ۱۲ فقره ملک مازاد دولتی در تالار املاک بورس کالا', subtitle: 'ستاد مولدسازی دارایی‌های مازاد تهران', badge: 'تامین نقدینگی', badgeColor: 'amber', description: 'عواید حاصل از فروش این املاک صرف تکمیل تصفیه‌خانه‌های فاضلاب جنوب تهران و خط انتقال پساب به مزارع ورامین می‌گردد.', metric: '۱۲ پلاک', metricLabel: 'در مرحله واگذاری', actionLabel: 'کارنامه مولدسازی', actionUrl: '/finance/asset-monetization' },
    ],
    chartData: [
      { label: 'سرمایه در گردش', primaryValue: 2450, secondaryValue: 2100 },
      { label: 'تسهیلات تکلیفی تبصره ۱۸', primaryValue: 48, secondaryValue: 40 },
      { label: 'اوراق گام صنعتی', primaryValue: 42, secondaryValue: 25 },
      { label: 'مسکن و خرید تجهیزات', primaryValue: 840, secondaryValue: 720 },
      { label: 'مشاغل خانگی و خوداشتغالی', primaryValue: 18, secondaryValue: 15 },
    ],
    chartTitles: { main: 'توزیع تسهیلات بانکی استان تهران بر حسب نوع مصرف', sub: 'مقایسه عملکرد پرداخت با مانده سال قبل (همت)', primaryLegend: 'تسهیلات سال جاری (همت)', secondaryLegend: 'عملکرد دوره قبل (همت)' },
    tableRows: [
      { id: 'b1', title: 'بانک ملی ایران - مدیریت امور شعب تهران', category: 'بانک دولتی تجاری', countyOrZone: 'تهران', metric1: '۱٬۲۴۰ همت سپرده', metric2: '۱۸ همت اوراق گام', status: 'optimal', statusText: 'فعال', detail: 'پیشرو در تسهیلات زنجیره تامین خودروسازی و دارویی پایتخت' },
      { id: 'b2', title: 'بانک صنعت و معدن استان تهران', category: 'بانک تخصصی توسعه‌ای', countyOrZone: 'ری و پاکدشت', metric1: '۳۸ همت اعتبارات', metric2: '۶۸ کارخانه احیاشده', status: 'optimal', statusText: 'رتبه برتر', detail: 'تسهیلات ویژه بازسازی ماشین‌آلات شهرک‌های صنعتی شمس‌آباد و عباس‌آباد' },
      { id: 'b3', title: 'بانک کشاورزی - شعب استان تهران', category: 'بانک تخصصی بخش کشاورزی', countyOrZone: 'ورامین و پیشوا', metric1: '۲۲ همت تسهیلات', metric2: '۴۲۰ هکتار گلخانه نوین', status: 'normal', statusText: 'عادی', detail: 'تامین مالی سیستم‌های آبیاری تحت فشار و واحدهای پرورش قارچ ملارد' },
      { id: 'b4', title: 'بانک تجارت - سرپرستی منطقه آزاد فرودگاه امام', category: 'بانک تجاری بین‌المللی', countyOrZone: 'رباط‌کریم', metric1: '۱۵ همت اعتبارات', metric2: '۴۵۰ فقره LC داخلی', status: 'normal', statusText: 'روان', detail: 'پشتیبانی از واردات کالاهای اساسی و ماشین‌آلات خطوط صنعتی غرب' },
    ],
    tableHeaders: { col1: 'بانک / سرپرستی', col2: 'نوع کارکرد', col3: 'حجم تسهیلات / سپرده', col4: 'شاخص عملکرد صنعتی', col5: 'وضعیت اعتباری' },
    whatIfScenarios: [
      { id: 'wf1', title: 'افزایش سهم تسهیلات تکلیفی تبصره ۱۸ به میزان ۳۰ همت', description: 'تثبیت اشتغال ۴۵ هزار نفر در صنایع غذایی و دارویی تهران.', estimatedImpact: 'کاهش نرخ بیکاری استان به میزان ۰.۵ درصد', leverKey: 'workingCapitalCreditHemmat' },
      { id: 'wf2', title: 'کاهش نرخ تنزیل اوراق گام به ۲۴ درصد در فرابورس', description: 'استقبال کارخانجات قطعه‌سازی از تامین مواد اولیه بدون نقدینگی نقدی.', estimatedImpact: 'افزایش تولید قطعات به میزان ۱۲ درصد', leverKey: 'workingCapitalCreditHemmat' },
    ]
  },

  // 4. Strategic Bread, Flour & Wheat
  bread: {
    moduleId: 'bread',
    titleFa: 'زنجیره استراتژیک گندم، آرد و نان استان تهران',
    agentCode: 'AGT-04',
    headlineSummary: 'رصد برخط ۹٬۶۴۰ نانوایی با سامانه هوشمند نانینو، مصرف روزانه ۲۸۵۰ تن آرد و پایش موجودی ۴۲ روزه سیلوهای پایتخت.',
    policyPriority: 'تعدیل سهمیه آرد نانوایی‌های پرتراکم بهارستان، ملارد و قرچک بر اساس ثبت تراکنش واقعی نانینو.',
    metrics: [
      { key: 'b1', label: 'پوشش ذخیره گندم سیلوهای تهران', value: '۴۲', subValue: 'موجودی ۳۱۵ هزار تن گندم', changePercent: 4.0, isPositiveGood: true, unit: 'روز مصرف مطمئن', source: 'اداره کل غله استان تهران', level: 'A' },
      { key: 'b2', label: 'نانوایی‌های فعال متصل به نانینو', value: '۹٬۶۴۰', subValue: 'تجهیز ۱۰۰٪ به کارتخوان هوشمند', changePercent: 0.5, isPositiveGood: true, unit: 'واحد صنفی', source: 'سامانه نانینو', level: 'A' },
      { key: 'b3', label: 'تراکنش‌های روزانه فروش نان', value: '۴.۸۲', subValue: '۱۴.۸ میلیون قرص نان در روز', changePercent: 2.3, isPositiveGood: true, unit: 'میلیون تراکنش/روز', source: 'شاپرک و نانینو', level: 'A' },
      { key: 'b4', label: 'آرد یارانه‌ای توزیع‌شده روزانه', value: '۲٬۸۵۰', subValue: 'آرد نوع ۱ و نوع ۲', changePercent: -1.2, isPositiveGood: true, unit: 'تن در روز', source: 'کارخانجات آرد استان', level: 'A' },
    ],
    carouselHighlights: [
      { id: 'bc1', title: 'ثبت روزانه ۱۴.۸ میلیون قرص نان در سامانه نانینو استان تهران', subtitle: 'نظارت هوشمند بر تراکنش کارتخوان‌ها', badge: 'پایش برخط', badgeColor: 'cyan', description: 'سامانه هوشمند نانینو با هوش مصنوعی الگوریتم‌های خرید غیرعادی، تراکنش‌های صوری و فروش آرد خارج از شبکه را در ۹٬۶۴۰ نانوایی شناسایی می‌کند.', metric: '۱۴.۸ م.قرص', metricLabel: 'تراکنش روزانه', actionLabel: 'ورود به نانینو', actionUrl: '/bread/nanino-smart-monitoring' },
      { id: 'bc2', title: 'پایداری موجودی سیلوی شهید مدرس ری با ۳۰۰ هزار تن ذخیره', subtitle: 'بزرگترین پایانه غله استان تهران', badge: 'سیلوی استراتژیک', badgeColor: 'emerald', description: 'اتصال ریلی مستقیم سیلوی ری به شبکه سراسری راه‌آهن امکان تخلیه و بارگیری روزانه تا ۱۰ هزار تن گندم وارداتی و داخلی را فراهم ساخته است.', metric: '۳۰۰ ک.تن', metricLabel: 'ظرفیت اسمی', actionLabel: 'دیده‌بان سیلوها', actionUrl: '/bread/wheat-silos-reserves' },
      { id: 'bc3', title: 'کاهش ۲۲ درصدی صفوف انتظار در شهرستان‌های بهارستان و پردیس', subtitle: 'تعدیل سهمیه بر اساس عملکرد نانوایان', badge: 'رضایت شهروندی', badgeColor: 'blue', description: 'با اجرای آزمایشی طرح افزایش سهمیه نانوایان منظم و شیفت‌های بعدازظهر، متوسط زمان معطلی شهروندان به ۱۲ دقیقه کاهش یافت.', metric: '-۲۲٪', metricLabel: 'کاهش زمان صف', actionLabel: 'گزارش بازرسی‌ها', actionUrl: '/bread/violations-inspections' },
    ],
    chartData: [
      { label: 'تهران', primaryValue: 1450, secondaryValue: 1420 },
      { label: 'شهریار', primaryValue: 265, secondaryValue: 260 },
      { label: 'بهارستان', primaryValue: 210, secondaryValue: 195 },
      { label: 'اسلامشهر', primaryValue: 198, secondaryValue: 190 },
      { label: 'ری', primaryValue: 142, secondaryValue: 140 },
      { label: 'ملارد', primaryValue: 145, secondaryValue: 135 },
      { label: 'پاکدشت', primaryValue: 138, secondaryValue: 130 },
      { label: 'ورامین', primaryValue: 112, secondaryValue: 110 },
    ],
    chartTitles: { main: 'سهمیه آرد تخصیصی در برابر مصرف واقعی ثبت‌شده در نانینو', sub: 'مقایسه تن سهمیه ماهانه مصوب با برآورد فروش نان در شهرستان‌ها (تن/روز)', primaryLegend: 'سهمیه مصوب (تن)', secondaryLegend: 'فروش معادل نانینو (تن)' },
    tableRows: [
      { id: 'br1', title: 'سیلوی بزرگ شهید مدرس ری', category: 'سیلوهای دولتی غله', countyOrZone: 'ری', metric1: '۳۰۰ هزار تن', metric2: 'پوشش ۲۴ روز استان', status: 'optimal', statusText: 'امن', detail: 'مجهز به آزمایشگاه کنترل کیفی گلوتن و رطوبت گندم' },
      { id: 'br2', title: 'سیلوی مکانیزه تهرانسر', category: 'سیلوهای غرب استان', countyOrZone: 'تهران', metric1: '۱۸۰ هزار تن', metric2: 'پوشش ۱۴ روز پایتخت', status: 'optimal', statusText: 'امن', detail: 'تامین آرد کارخانجات آرد البرز، اسیل و تهرانسو' },
      { id: 'br3', title: 'کارخانه آردداران شمس‌آباد', category: 'آسیاب صنعتی آرد', countyOrZone: 'ری', metric1: '۸۵۰ تن روزانه', metric2: 'استحصال آرد ۱۸٪', status: 'normal', statusText: 'عادی', detail: 'تولید آرد ستاره و سبوس‌گرفته نانوایی‌های بربری و تافتون' },
      { id: 'br4', title: 'نانوایی‌های متخلف ارجاع به تعزیرات', category: 'ممیزی بازرسی ۱۲۴', countyOrZone: 'بهارستان و قدس', metric1: '۳۱۸ پرونده', metric2: '۴۵ پلمب واحد', status: 'critical', statusText: 'برخورد تعزیراتی', detail: 'فروش خارج از شبکه آرد یارانه‌ای و کسر تراکنش مشکوک نانینو' },
    ],
    tableHeaders: { col1: 'نام مرکز / کارخانه', col2: 'رده فعالیت', col3: 'ظرفیت / پرونده', col4: 'شاخص پوشش / اقدام', col5: 'وضعیت نظارتی' },
    whatIfScenarios: [
      { id: 'wb1', title: 'افزایش ۱۵٪ سهمیه آرد نانوایی‌های آزادپز نوع ۲', description: 'حذف صفوف نان سنگک و بربری در ساعات اوج تقاضا (۱۶ تا ۲۰ عصر).', estimatedImpact: 'کاهش متوسط معطلی صفوف از ۲۲ دقیقه به ۱۴ دقیقه', leverKey: 'flourQuotaDeltaPercent' },
      { id: 'wb2', title: 'هوشمندسازی شناور سهمیه بر اساس رضایت مردمی در نانینو', description: 'اختصاص آرد تشویقی به ۵۰۰ نانوایی برتر با رتبه بهداشت و تکریم.', estimatedImpact: 'ارتقای ضریب کیفیت پخت نان به میزان ۲۵٪', leverKey: 'flourQuotaDeltaPercent' },
    ]
  },

  // 5. Market Regulation & Essential Goods
  market: {
    moduleId: 'market',
    titleFa: 'تنظیم بازار، کالاهای اساسی و امنیت غذایی',
    agentCode: 'AGT-05',
    headlineSummary: 'پایش قیمت ۲۰ کالای راهبردی، عرضه روزانه ۶۸۰ تن مرغ و ۱۲۰۰ تن میوه در ۲۶۲ بازار میادین شهرداری تهران.',
    policyPriority: 'کنترل شکاف قیمتی گوشت گرم گوسفندی در شهرستان‌های حاشیه‌ای و تامین ذخایر شب عید.',
    metrics: [
      { key: 'mk1', label: 'توزیع مرغ گرم در میادین پایتخت', value: '۶۸۰', subValue: 'نرخ مصوب: ۷۸ هزار تومان', changePercent: 5.0, isPositiveGood: true, unit: 'تن در روز', source: 'سازگاه میادین میوه و تره‌بار', level: 'A' },
      { key: 'mk2', label: 'بازارها و میادین فعال شهرداری', value: '۲۶۲', subValue: 'پوشش کلیه مناطق ۲۲ گانه', changePercent: 2.0, isPositiveGood: true, unit: 'مرکز عرضه مستقیم', source: 'سازمان میادین', level: 'A' },
      { key: 'mk3', label: 'گوشت قرمز منجمد تنظیم بازار', value: '۱۸۰', subValue: 'قیمت: ۲۹۰ هزار تومان/کیلو', changePercent: 12.0, isPositiveGood: true, unit: 'تن توزیع روزانه', source: 'شرکت پشتیبانی امور دام', level: 'A' },
      { key: 'mk4', label: 'گشت‌های مشترک تعزیرات و صمت', value: '۱۴۰', subValue: 'بازرسی روزانه از انبارها و مراکز', changePercent: 25.0, isPositiveGood: true, unit: 'تیم بازرسی/روز', source: 'تعزیرات حکومتی استان تهران', level: 'A' },
    ],
    carouselHighlights: [
      { id: 'mkc1', title: 'عرضه مستقیم میوه و صیفی در ۲۶۲ میدان با اختلاف قیمت ۴۰٪', subtitle: 'سازمان میادین میوه و تره‌بار تهران', badge: 'تنظیم بازار', badgeColor: 'emerald', description: 'میادین شهرداری تهران روزانه بیش از ۲٬۵۰۰ تن انواع محصولات باغی و صیفی را با نرخ مصوب حداقل ۴۰ درصد زیر قیمت مغازه‌های سطح شهر عرضه می‌کنند.', metric: '۴۰٪', metricLabel: 'تفاوت با خرده‌فروشی', actionLabel: 'مشاهده نرخ میادین', actionUrl: '/market/mayadin-fruit-centers' },
      { id: 'mkc2', title: 'تخلیه روزانه ۱۰۰ هزار لاشه مرغ در میدان بهمن تهران', subtitle: 'پایانه اصلی بارانداز پروتئینی کشور', badge: 'مرکز لجستیک', badgeColor: 'cyan', description: 'میدان بهمن به عنوان نبض قیمت‌گذاری مرغ کشور، بار ارسالی از مرغداری‌های گلستان، مازندران، گیلان و سمنان را در کمتر از ۴ ساعت توزیع می‌نماید.', metric: '۱۰۰ ک.لاشه', metricLabel: 'تخلیه شبانه', actionLabel: 'پایش زنجیره مرغ', actionUrl: '/market/poultry-meat-supply' },
      { id: 'mkc3', title: 'ذخیره‌سازی ۱۲ هزار تن سیب و پرتقال در سردخانه‌های کهریزک', subtitle: 'آمادگی کامل طرح تنظیم بازار نوروز و رمضان', badge: 'ذخیره مطمئن', badgeColor: 'blue', description: 'انعقاد قرارداد مستقیم با باغداران مازندران و آذربایجان غربی جهت تضمین عرضه میوه باکیفیت بدون واسطه در ایام اوج تقاضای تهران.', metric: '۱۲ ک.تن', metricLabel: 'ذخیره میوه شب عید', actionLabel: 'بررسی سردخانه‌ها', actionUrl: '/market/cold-storage-warehouses' },
    ],
    chartData: [
      { label: 'مرغ گرم', primaryValue: 78, secondaryValue: 88, targetValue: 78 },
      { label: 'گوشت گوساله', primaryValue: 310, secondaryValue: 395, targetValue: 310 },
      { label: 'برنج هندی ۱۱۲۱', primaryValue: 52, secondaryValue: 58, targetValue: 52 },
      { label: 'شکر فله', primaryValue: 42, secondaryValue: 47, targetValue: 42 },
      { label: 'روغن مایع خوراکی', primaryValue: 68, secondaryValue: 74, targetValue: 68 },
      { label: 'تخم‌مرغ شانه‌ای', primaryValue: 110, secondaryValue: 125, targetValue: 110 },
    ],
    chartTitles: { main: 'اسپرد قیمتی کالاهای اساسی در میادین شهرداری در برابر بازار آزاد', sub: 'مقایسه نرخ مصوب میادین با میانگین خرده‌فروشی سطح شهر تهران (هزار تومان)', primaryLegend: 'نرخ میادین شهرداری', secondaryLegend: 'نرخ بازار آزاد خرده‌فروشی' },
    tableRows: [
      { id: 'mkr1', title: 'میدان مرکزی میوه و تره‌بار بهمن', category: 'پروتئین و مرغ', countyOrZone: 'تهران - منطقه ۱۶', metric1: '۶۸۰ تن مرغ', metric2: 'نرخ ۷۸ هزار ت', status: 'optimal', statusText: 'روان و بدون صف', detail: 'توزیع به عمده‌فروشان و ارسال مویرگی به ۲۶۱ میدان تابعه شهرداری' },
      { id: 'mkr2', title: 'سردخانه بزرگ مهر کهریزک', category: 'سردخانه بالای صفر و زیر صفر', countyOrZone: 'ری - کهریزک', metric1: '۳۵ هزار تن ظرفیت', metric2: 'موجودی گوشت منجمد', status: 'optimal', statusText: 'تراز مطلوب', detail: 'نگهداری گوشت برزیلی و مرغ منجمد شرکت پشتیبانی امور دام' },
      { id: 'mkr3', title: 'بازرسی تعزیرات شهرستان قدس', category: 'گشت مشترک ۱۲۴', countyOrZone: 'قدس', metric1: '۸۴ بازرسی روزانه', metric2: '۱۲ پرونده گرانفروشی', status: 'warning', statusText: 'انحراف محدود', detail: 'شناسایی احتکار ۲۵ تن شکر در انبارهای غیرمجاز حاشیه راه‌آهن' },
      { id: 'mkr4', title: 'بارانداز میوه و صیفی مرکزی تهران', category: 'میدان بزرگ خیام و شوش', countyOrZone: 'تهران - منطقه ۱۲', metric1: '۴٬۲۰۰ تن ورود بار', metric2: 'تخلیه شبانه میوه', status: 'normal', statusText: 'عادی', detail: 'تامین میوه شبانه اصناف میوه‌فروشی کلیه شهرستان‌های پایتخت' },
    ],
    tableHeaders: { col1: 'نام مرکز توزیع / انبار', col2: 'رسته کالایی', col3: 'حجم توزیع / ظرفیت', col4: 'شاخص انحراف قیمت', col5: 'وضعیت میدانی' },
    whatIfScenarios: [
      { id: 'wmk1', title: 'تزریق ۲۰۰۰ تن گوشت قرمز منجمد در ۱۰ شهرستان حاشیه‌ای', description: 'کاهش شکاف قیمتی گوشت قرمز در اسلامشهر، بهارستان و ورامین.', estimatedImpact: 'کاهش قیمت بازار آزاد گوشت گرم به میزان ۱۲ درصد', leverKey: 'marketInjectionTons' },
      { id: 'wmk2', title: 'راه‌اندازی ۲۰ بازارچه موقت عرضه مستقیم در شهرستان‌های متراکم', description: 'دسترسی اقشار کم‌درآمد به کالاهای تنظیم بازار بدون هزینه تردد به مرکز تهران.', estimatedImpact: 'افزایش عدالت توزیعی کالابرگ به میزان ۳۲٪', leverKey: 'marketInjectionTons' },
    ]
  },

  // 6. Industry, Mining & Industrial Parks
  industry: {
    moduleId: 'industry',
    titleFa: 'صنعت، معدن و شهرک‌های صنعتی استان تهران',
    agentCode: 'AGT-06',
    headlineSummary: 'پایش ۲۲ شهرک صنعتی، ۱۱٬۴۵۰ کارخانه فعال، اشتغال ۴۸۰ هزار نفر و احیای ۱۸۵ واحد راکد با حمایت ستاد تسهیل.',
    policyPriority: 'مدیریت بار و ناترازی برق تابستانه شهرک‌ها با توافق بر زمان‌بندی جابجایی روز تعطیل کارخانجات.',
    metrics: [
      { key: 'i1', label: 'واحدهای صنعتی فعال استان تهران', value: '۱۱٬۴۵۰', subValue: 'سهم ۲۱.۱٪ از کل صنایع کشور', changePercent: 3.2, isPositiveGood: true, unit: 'کارخانه فعال', source: 'شرکت شهرک‌های صنعتی تهران', level: 'A' },
      { key: 'i2', label: 'شاغلین بیمه‌شده در شهرک‌ها', value: '۴۸۰٬۰۰۰', subValue: 'رشد اشتغال صنعتی پایدار', changePercent: 4.5, isPositiveGood: true, unit: 'نفر شاغل مستقیم', source: 'تامین اجتماعی استان', level: 'A' },
      { key: 'i3', label: 'واحدهای راکد احیاشده (۱۴۰۴-۱۴۰۵)', value: '۱۸۵', subValue: 'بازگشت به چرخه تولید با ستاد تسهیل', changePercent: 28.0, isPositiveGood: true, unit: 'کارخانه', source: 'کارگروه تسهیل و رفع موانع', level: 'A' },
      { key: 'i4', label: 'دیماند مصرفی برق شهرک‌ها', value: '۱٬۶۵۰', subValue: 'پیک تقاضای صنعتی استان', changePercent: 6.0, isPositiveGood: false, unit: 'مگاوات', source: 'شرکت برق منطقه‌ای تهران', level: 'A' },
    ],
    carouselHighlights: [
      { id: 'ic1', title: 'شهرک صنعتی شمس‌آباد با ۲۴۰۰ واحد، بزرگترین قطب صنعتی خاورمیانه', subtitle: 'پایتخت صنایع فلزی، شیمیایی و سنگ کشور', badge: 'بزرگترین شهرک', badgeColor: 'cyan', description: 'مستقر در شهرستان ری با وسعت ۳۰۰۰ هکتار و اشتغال بیش از ۷۵ هزار نفر، نقش کلیدی در تامین زنجیره تامین خودرو و لوازم خانگی ایفا می‌کند.', metric: '۲٬۴۰۰ واحد', metricLabel: 'کارخانه فعال', actionLabel: 'اطلس شهرک‌ها', actionUrl: '/industry/industrial-parks' },
      { id: 'ic2', title: 'احیای ۱۸۵ کارخانه تعطیل‌شده در شهرک‌های صنعتی عباس‌آباد و صفادشت', subtitle: 'مصوبات ستاد تسهیل و رفع موانع تولید', badge: 'احیای تولید', badgeColor: 'emerald', description: 'با استمهال بدهی‌های بانکی و تقسیط بدهی گاز و برق، کارخانجات تولید قطعات الکترونیک و ریسندگی به چرخه اشتغال بازگشتند.', metric: '۱۸۵ کارخانه', metricLabel: 'احیا در سال جاری', actionLabel: 'واحدهای احیاشده', actionUrl: '/industry/idle-factories-revival' },
      { id: 'ic3', title: 'اتصال ۱۰ مگاوات نیروگاه خورشیدی در شهرک صنعتی قرچک', subtitle: 'برنامه جهش پایداری انرژی صنایع تهران', badge: 'انرژی پاک', badgeColor: 'blue', description: 'طرح خودتامین برق کارخانجات نساجی و چرم قرچک با نصب پنل‌های خورشیدی بر سقف سوله‌ها، خطر قطعی برق را به صفر رسانده است.', metric: '۱۰ مگاوات', metricLabel: 'ظرفیت نصب‌شده', actionLabel: 'پایش دیماند برق', actionUrl: '/industry/power-curtailment-impact' },
    ],
    chartData: [
      { label: 'شمس‌آباد', primaryValue: 2400, secondaryValue: 75000 },
      { label: 'عباس‌آباد', primaryValue: 1850, secondaryValue: 52000 },
      { label: 'صفادشت', primaryValue: 920, secondaryValue: 28000 },
      { label: 'خوارزمی', primaryValue: 640, secondaryValue: 19000 },
      { label: 'پایتخت (علی‌آباد)', primaryValue: 580, secondaryValue: 17500 },
      { label: 'قرچک', primaryValue: 490, secondaryValue: 14000 },
      { label: 'نصیرآباد', primaryValue: 460, secondaryValue: 13200 },
      { label: 'پرند', primaryValue: 420, secondaryValue: 12000 },
    ],
    chartTitles: { main: 'قطب‌های صنعتی استان تهران بر حسب تعداد واحد فعال و شاغلین', sub: 'مقایسه واحدهای تولیدی فعال در برابر حجم نیروی کار مستقیم (نفر)', primaryLegend: 'تعداد کارخانه فعال', secondaryLegend: 'تعداد شاغلین مستقیم (نفر)' },
    tableRows: [
      { id: 'ir1', title: 'شهرک صنعتی شمس‌آباد', category: 'صنایع سنگین و فلزی', countyOrZone: 'ری', metric1: '۲٬۴۰۰ واحد', metric2: '۷۵٬۰۰۰ شاغل', status: 'optimal', statusText: 'فعالیت حداکثری', detail: 'تولیدکننده اصلی قطعات آلومینیوم، پروفیل و ریخته‌گری دقیق' },
      { id: 'ir2', title: 'شهرک صنعتی عباس‌آباد', category: 'ماشین‌سازی و برق', countyOrZone: 'پاکدشت', metric1: '۱٬۸۵۰ واحد', metric2: '۵۲٬۰۰۰ شاغل', status: 'warning', statusText: 'تنش آب و برق', detail: 'نیازمند تکمیل خط انتقال پساب تصفیه‌شده جنوب تهران' },
      { id: 'ir3', title: 'شهرک صنعتی صفادشت', category: 'داروسازی و غذایی', countyOrZone: 'ملارد', metric1: '۹۲۰ واحد', metric2: '۲۸٬۰۰۰ شاغل', status: 'optimal', statusText: 'دانش‌بنیان', detail: 'تمرکز ۳۵ شرکت داروسازی بیوتکنولوژی و تولید سرم و واکسن' },
      { id: 'ir4', title: 'شهرک صنعتی قرچک', category: 'نساجی، پوشاک و چرم', countyOrZone: 'قرچک', metric1: '۴۹۰ واحد', metric2: '۱۴٬۰۰۰ شاغل', status: 'optimal', statusText: 'رو به رشد', detail: 'اشتغال‌زایی بانوان در خوشه پوشاک و کفش صادراتی' },
    ],
    tableHeaders: { col1: 'نام شهرک صنعتی', col2: 'رسته تخصصی', col3: 'واحدهای فعال', col4: 'جمعیت شاغل', col5: 'وضعیت زیرساخت' },
    whatIfScenarios: [
      { id: 'wi1', title: 'سرمایه‌گذاری در نصب ۵۰ مگاوات نیروگاه خورشیدی شهرک‌ها', description: 'کاهش اعمال خاموشی در روزهای اوج گرما برای ۳۵۰ کارخانه حیاتی.', estimatedImpact: 'حفظ تولید ناخالص به ارزش ۱۸ همت در فصل تابستان', leverKey: 'powerCurtailmentPercent' },
      { id: 'wi2', title: 'تسهیل صدور مجوز طرح توسعه کارخانجات دانش‌بنیان در شعاع ۱۲۰ کیلومتری', description: 'جذب ۱۰۰ شرکت های‌تک در شهرک‌های صنعتی دماوند و فیروزکوه.', estimatedImpact: 'ایجاد ۸ هزار شغل تخصصی برای فارغ‌التحصیلان دانشگاهی', leverKey: 'workingCapitalCreditHemmat' },
    ]
  },

  // 7. Agriculture, Livestock & Water Security
  agriculture: {
    moduleId: 'agriculture',
    titleFa: 'کشاورزی، دامپروری، گلخانه‌ها و امنیت آب',
    agentCode: 'AGT-07',
    headlineSummary: 'رصد ۳٬۸۵۰ هکتار گلخانه مدرن در ورامین و پاکدشت، تولید روزانه ۳۸۰۰ تن شیر خام و جبران ناترازی آبخوان جنوب تهران.',
    policyPriority: 'تسریع در اتصال مدول دوم پساب تصفیه‌خانه جنوب تهران به دشت‌های حاصلخیز ورامین و ری.',
    metrics: [
      { key: 'a1', label: 'وسعت گلخانه‌های مدرن استان', value: '۳٬۸۵۰', subValue: 'سهم ۳۲٪ از گلخانه‌های کشور', changePercent: 8.5, isPositiveGood: true, unit: 'هکتار', source: 'سازمان جهاد کشاورزی تهران', level: 'A' },
      { key: 'a2', label: 'تولید سالانه سبزی، صیفی و گل', value: '۴۸۰٬۰۰۰', subValue: 'صادرات به روسیه و حوزه خلیج فارس', changePercent: 6.2, isPositiveGood: true, unit: 'تن محصول گلخانه‌ای', source: 'جهاد کشاورزی', level: 'A' },
      { key: 'a3', label: 'تولید روزانه شیر خام استان', value: '۳٬۸۰۰', subValue: 'دامداری‌های صنعتی ری و اسلامشهر', changePercent: 2.8, isPositiveGood: true, unit: 'تن در روز', source: 'اتحادیه دامداران تهران', level: 'A' },
      { key: 'a4', label: 'کسری مخزن آبخوان دشت ورامین', value: '۱۴۰-', subValue: 'نرخ فرونشست زمین: ۲۴ سانتی‌متر', changePercent: -5.0, isPositiveGood: false, unit: 'میلیون مترمکعب/سال', source: 'شرکت آب منطقه‌ای تهران', level: 'A' },
    ],
    carouselHighlights: [
      { id: 'ac1', title: 'دشت ورامین و پاکدشت؛ بزرگترین قطب گلخانه‌ای و کشت گل‌های زینتی کشور', subtitle: 'سازمان جهاد کشاورزی استان تهران', badge: 'رتبه اول کشور', badgeColor: 'emerald', description: 'تولید سالانه بیش از ۱ میلیارد شاخه گل بریده (رز، ارکیده، آنتوریوم) و صادرات محصولات صیفی استاندارد با استفاده از روش‌های هیدروپونیک و صرفه‌جویی ۷۰ درصدی آب.', metric: '۳٬۸۵۰ هکتار', metricLabel: 'اراضی زیر کشت', actionLabel: 'اطلس گلخانه‌ها', actionUrl: '/agriculture/greenhouses-varamin' },
      { id: 'ac2', title: 'تولید ۳٬۸۰۰ تن شیر خام روزانه در بزرگترین مگاگاوداری‌های کشور', subtitle: 'مجتمع‌های دامپروری صنعتی ری و اسلامشهر', badge: 'امنیت لبنیات', badgeColor: 'cyan', description: 'وجود ۴۲۰ هزار رأس دام شیری نژاد اصیل هلشتاین در دامداری‌های تهران، تامین‌کننده اصلی کارخانجات لبنی پگاه، کاله و چوپان در منطقه مرکزی کشور است.', metric: '۳٬۸۰۰ تن/روز', metricLabel: 'تولید شیر خام', actionLabel: 'پایش دامپروری', actionUrl: '/agriculture/livestock-dairy-farms' },
      { id: 'ac3', title: 'انتقال ۷.۲ مترمکعب در ثانیه پساب تصفیه‌شده به دشت کشاورزی ورامین', subtitle: 'طرح راهبردی مقابله با فرونشست دشت‌های جنوب تهران', badge: 'احیای آبخوان', badgeColor: 'blue', description: 'جایگزینی چاه‌های عمیق کشاورزی با پساب تصفیه‌شده استاندارد تصفیه‌خانه جنوب تهران، سالانه بیش از ۲۰۰ میلیون مترمکعب از منابع آبخوان را ذخیره می‌کند.', metric: '۷.۲ م³/ثانیه', metricLabel: 'دبی انتقال پساب', actionLabel: 'تنش و بیلان آب', actionUrl: '/agriculture/irrigation-water-stress' },
    ],
    chartData: [
      { label: 'ورامین', primaryValue: 1850, secondaryValue: 240 },
      { label: 'پاکدشت', primaryValue: 1200, secondaryValue: 180 },
      { label: 'پیشوا', primaryValue: 540, secondaryValue: 85 },
      { label: 'ری', primaryValue: 260, secondaryValue: 70 },
      { label: 'شهریار', primaryValue: 180, secondaryValue: 45 },
      { label: 'دماوند', primaryValue: 85, secondaryValue: 25 },
    ],
    chartTitles: { main: 'پراکندگی سطح زیر کشت گلخانه‌ها و تولید محصول در شهرستان‌ها', sub: 'مقایسه سطح زیر کشت (هکتار) و تولید سالانه سبزی، صیفی و گل (هزار تن)', primaryLegend: 'سطح گلخانه (هکتار)', secondaryLegend: 'تولید محصول (هزار تن)' },
    tableRows: [
      { id: 'ar1', title: 'خوشه گلخانه‌ای دشت ورامین و پیشوا', category: 'کشت هیدروپونیک', countyOrZone: 'ورامین و پیشوا', metric1: '۲٬۳۹۰ هکتار', metric2: '۳۲۵ هزار تن فلفل و گوجه', status: 'optimal', statusText: 'صادراتی', detail: 'تجهیز به گواهی استاندارد سلامت و صادرات به بازارهای اوراسیا' },
      { id: 'ar2', title: 'بازار گل و مزارع زینتی پاکدشت', category: 'گل‌های شاخه‌بریده', countyOrZone: 'پاکدشت', metric1: '۱٬۲۰۰ هکتار', metric2: '۹۵۰ میلیون شاخه گل', status: 'optimal', statusText: 'قطب ملی', detail: 'تامین ۸۰ درصد گل شاخه‌بریده مورد نیاز بازار بزرگ گل محلاتی و امام رضا' },
      { id: 'ar3', title: 'مجتمع دامپروری و کشت و صنعت ری', category: 'گاوداری‌های صنعتی', countyOrZone: 'ری', metric1: '۱۸۰ هزار رأس دام', metric2: '۱٬۹۵۰ تن شیر روزانه', status: 'normal', statusText: 'عادی', detail: 'تجهیز به دستگاه‌های شیردوشی روتاری و بازیافت کود جهت تولید بیوگاز' },
      { id: 'ar4', title: 'دشت ممنوعه بحرانی ورامین و جوادآباد', category: 'آبخوان و فرونشست', countyOrZone: 'ورامین', metric1: '۱۴۰ م.م³ کسری', metric2: '۲۴ سانتی‌متر فرونشست', status: 'critical', statusText: 'هشدار زیست‌محیطی', detail: 'نیاز به مسدودسازی چاه‌های غیرمجاز و تسریع کانال انتقال پساب ری' },
    ],
    tableHeaders: { col1: 'نام مجتمع / دشت', col2: 'رسته زراعی / دامی', col3: 'وسعت / ظرفیت', col4: 'میزان تولید / بیلان', col5: 'شاخص پایداری' },
    whatIfScenarios: [
      { id: 'wa1', title: 'توسعه ۱۰۰۰ هکتار گلخانه نوین با تسهیلات کم‌بهره', description: 'افزایش تولید صادراتی صیفی‌جات به میزان ۱۲۰ هزار تن در سال.', estimatedImpact: 'کاهش مصرف آب کشاورزی به میزان ۴۵ میلیون مترمکعب', leverKey: 'waterStressPercent' },
      { id: 'wa2', title: 'افزایش تامین نهاده دامی کنجاله سویا و جو در گمرک شهریار', description: 'تثبیت قیمت تمام‌شده شیر و مهار گرانی لبنیات در تهران.', estimatedImpact: 'کاهش بهای تمام‌شده شیر خام به میزان ۸ درصد', leverKey: 'customsClearanceSpeedPercent' },
    ]
  },

  // 8. Customs, Foreign Trade, Warehouses & Logistics
  logistics: {
    moduleId: 'logistics',
    titleFa: 'گمرکات، تجارت خارجی، انبارها و لجستیک',
    agentCode: 'AGT-08',
    headlineSummary: 'پایش ۶ گمرک استان تهران، ترخیص روزانه ۵۵ همت کالا، انبارداری ۳۲۰۰ کانتینر و فعالیت پایانه بار نسیم‌شهر با ۱۴ هزار سفر باری.',
    policyPriority: 'کاهش متوسط زمان ترخیص ماشین‌آلات خطوط دانش‌بنیان در گمرک فرودگاه امام (ره) به زیر ۲۴ ساعت.',
    metrics: [
      { key: 'l1', label: 'تعداد گمرکات فعال استان تهران', value: '۶', subValue: 'فرودگاه امام، شهریار، غرب، نمایشگاه و...', changePercent: 0.0, isPositiveGood: true, unit: 'گمرک تخصصی', source: 'نظارت گمرکات استان تهران', level: 'A' },
      { key: 'l2', label: 'ارزش ترخیص سالانه گمرکات تهران', value: '۱۸.۴', subValue: 'سهم ۳۲.۸٪ از ارزش واردات کشور', changePercent: 14.5, isPositiveGood: true, unit: 'میلیارد دلار', source: 'گمرک ج.ا.ا', level: 'A' },
      { key: 'l3', label: 'سفرهای باری پایانه نسیم‌شهر', value: '۱۴٬۲۰۰', subValue: 'بزرگترین پایانه حمل کالای خاورمیانه', changePercent: 5.2, isPositiveGood: true, unit: 'کامیون در روز', source: 'راهداری و حمل‌ونقل جاده‌ای', level: 'A' },
      { key: 'l4', label: 'متوسط زمان ترخیص در پنجره واحد', value: '۱.۸', subValue: 'کالاهای اساسی و نهاده‌های دامی', changePercent: -35.0, isPositiveGood: true, unit: 'روز کاری', source: 'پنجره واحد تجارت فرامرزی', level: 'A' },
    ],
    carouselHighlights: [
      { id: 'lc1', title: 'گمرک منطقه ویژه اقتصادی فرودگاه امام خمینی (ره)؛ دروازه ترخیص سریع هوایی', subtitle: 'نظارت گمرکات استان تهران', badge: 'هاب هوایی کشور', badgeColor: 'cyan', description: 'ترخیص روزانه بیش از ۳۰۰ فقره اظهارنامه دارو، واکسن، تجهیزات پزشکی و قطعات های‌تک در مسیر سبز گمرکی با زمان میانگین کمتر از ۲۴ ساعت.', metric: '۳۰۰ فقره/روز', metricLabel: 'ترخیص مسیر سبز', actionLabel: 'پایش گمرک هوایی', actionUrl: '/logistics/air-cargo-ikac' },
      { id: 'lc2', title: 'پایانه بزرگ بار نسیم‌شهر؛ بارانداز استراتژیک ۱۴ هزار کامیون بارگیری در روز', subtitle: 'شهرستان بهارستان - اداره کل راهداری تهران', badge: 'بزرگترین پایانه بار', badgeColor: 'emerald', description: 'توزیع کالاها و نهاده‌های ورودی از بنادر جنوب (شهید رجایی، امام خمینی) و اعزام روزانه محموله‌های صنعتی تهران به سراسر استان‌های کشور.', metric: '۱۴٬۲۰۰ سفر', metricLabel: 'اعزام روزانه ناوگان', actionLabel: 'ترافیک نسیم‌شهر', actionUrl: '/logistics/nasimshahr-freight-terminal' },
      { id: 'lc3', title: 'گمرک شهریار (غرب تهران)؛ مرکز ترخیص نهاده‌ها و ماشین‌آلات سنگین', subtitle: 'بزرگترین گمرک زمینی پایتخت', badge: 'ترخیص نهاده‌ها', badgeColor: 'blue', description: 'انبارداری و ترخیص ریلی کنجاله سویا، ذرت دامی و قطعات خطوط خودروسازی با ظرفیت پذیرش بیش از ۴۰ هزار تن کالا در محوطه مسقف.', metric: '۴۰ ک.تن', metricLabel: 'ظرفیت انبار مسقف', actionLabel: 'آمار ترخیص شهریار', actionUrl: '/logistics/customs-clearance' },
    ],
    chartData: [
      { label: 'گمرک فرودگاه امام', primaryValue: 8.2, secondaryValue: 1.2 },
      { label: 'گمرک شهریار (غرب)', primaryValue: 5.4, secondaryValue: 2.1 },
      { label: 'گمرک تهران (شهریار)', primaryValue: 2.8, secondaryValue: 3.5 },
      { label: 'گمرک نمایشگاه‌ها', primaryValue: 0.9, secondaryValue: 0.8 },
      { label: 'گمرک پست تهران', primaryValue: 0.7, secondaryValue: 0.4 },
      { label: 'گمرک منطقه پیام', primaryValue: 0.4, secondaryValue: 1.5 },
    ],
    chartTitles: { main: 'ارزش دلاری ترخیص واردات و متوسط زمان توقف در گمرکات تهران', sub: 'مقایسه ارزش ترخیص سالانه (میلیارد دلار) با میانگین زمان تشریفات (روز)', primaryLegend: 'ارزش واردات (میلیارد دلار)', secondaryLegend: 'میانگین زمان ترخیص (روز)' },
    tableRows: [
      { id: 'lr1', title: 'گمرک حوزه تجاری فرودگاه امام خمینی', category: 'گمرک هوایی و مسافری', countyOrZone: 'ری و رباط‌کریم', metric1: '۸.۲ میلیارد دلار', metric2: 'زمان ۱.۲ روز', status: 'optimal', statusText: 'روان', detail: 'مسیر سبز ویژه ترخیص فوری دارو، کیت‌های تشخیصی و مواد اولیه بیولوژیک' },
      { id: 'lr2', title: 'پایانه حمل‌ونقل و بار نسیم‌شهر', category: 'لجستیک و باربری جاده‌ای', countyOrZone: 'بهارستان', metric1: '۱۴٬۲۰۰ کامیون/روز', metric2: 'تعرفه حمل مصوب', status: 'optimal', statusText: 'فعالیت شبانه‌روزی', detail: 'اعزام بدون تاخیر محموله‌های صنایع سنگین به استان‌های خراسان، اصفهان و فارس' },
      { id: 'lr3', title: 'گمرک غرب تهران (شهریار)', category: 'گمرک زمینی و ریلی', countyOrZone: 'شهریار', metric1: '۵.۴ میلیارد دلار', metric2: 'زمان ۲.۱ روز', status: 'normal', statusText: 'عادی', detail: 'ترخیص مواد شیمیایی و تجهیزات صنعتی کارخانجات شمس‌آباد و صفادشت' },
      { id: 'lr4', title: 'انبارهای عمومی و خدمات گمرکی تهرانسر', category: 'انبارداری و بارانداز کالا', countyOrZone: 'تهران - منطقه ۲۱', metric1: '۲۵ هزار TEU کانتینر', metric2: 'نرم‌افزار جامع انبار', status: 'optimal', statusText: 'تراز امنیتی بالا', detail: 'نگهداری کالاهای اساسی و ترخیص پایش‌شده با کد شناسه کالا و سامانه جامع تجارت' },
    ],
    tableHeaders: { col1: 'نام گمرک / پایانه', col2: 'رده عملکردی', col3: 'حجم کالا / تردد', col4: 'شاخص سرعت ترخیص', col5: 'ارزیابی وضعیت' },
    whatIfScenarios: [
      { id: 'wl1', title: 'کاهش ۵۰٪ تشریفات گمرکی نهاده‌های دامی در گمرک شهریار', description: 'تخلیه ۴۰ هزار تن کنجاله سویا و ذرت بدون معطلی در مرغداری‌های تهران.', estimatedImpact: 'کاهش قیمت تمام‌شده مرغ و تخم‌مرغ به میزان ۶.۵٪', leverKey: 'customsClearanceSpeedPercent' },
      { id: 'wl2', title: 'تعدیل ۱۰٪ تعرفه ناوگان باربری نسیم‌شهر برای حمل کالاهای اساسی', description: 'کاهش کرایه حمل از جنوب کشور به باراندازهای تهران و مهار تورم خوراکی.', estimatedImpact: 'صرفه‌جویی سالانه ۸۵۰ میلیارد تومان در بهای مصرف‌کننده', leverKey: 'freightTariffDeltaPercent' },
    ]
  },

  // 9. Labor, Employment & Kalabarg
  labor: {
    moduleId: 'labor',
    titleFa: 'بازار کار، اشتغال، معیشت خانوار و کالابرگ',
    agentCode: 'AGT-09',
    headlineSummary: 'پایش نرخ بیکاری ۶.۸ درصدی استان تهران، ثبت ۱۴۲ هزار شغل در سامانه رصد و شارژ کالابرگ برای ۷.۸ میلیون نفر در دهک‌های ۱ تا ۷.',
    policyPriority: 'تسهیل اشتغال فارغ‌التحصیلان دانشگاهی در شرکت‌های دانش‌بنیان و ساماندهی نیروی کار فصلی در قطب‌های صنعتی.',
    metrics: [
      { key: 'lb1', label: 'نرخ بیکاری رسمی استان تهران', value: '۶.۸٪', subValue: 'کمتر از میانگین کشور (۷.۶٪)', changePercent: -0.4, isPositiveGood: true, unit: 'درصد جمعیت فعال', source: 'مرکز آمار ایران', level: 'A' },
      { key: 'lb2', label: 'اشتغال ثبت‌شده در سامانه رصد', value: '۱۴۲٬۵۰۰', subValue: 'تحقق ۸۸.۴٪ تعهد سالانه اشتغال', changePercent: 12.0, isPositiveGood: true, unit: 'شغل جدید راستی‌آزمایی‌شده', source: 'وزارت کار و استانداری تهران', level: 'A' },
      { key: 'lb3', label: 'مشمولین طرح کالابرگ فجرانه', value: '۷.۸۲', subValue: '۲.۴۵ میلیون خانوار دهک ۱ تا ۷', changePercent: 5.0, isPositiveGood: true, unit: 'میلیون نفر در تهران', source: 'سامانه کالابرگ الکترونیک', level: 'A' },
      { key: 'lb4', label: 'فروشگاه‌های متصل به کالابرگ', value: '۲۸٬۴۰۰', subValue: 'سوپرمارکت‌ها و فروشگاه‌های زنجیره‌ای', changePercent: 14.0, isPositiveGood: true, unit: 'پایانه فروش متصل', source: 'شرکت فارا', level: 'A' },
    ],
    carouselHighlights: [
      { id: 'lbc1', title: 'شارژ اعتبار فجرانه کالابرگ برای ۷.۸۲ میلیون شهروند استان تهران', subtitle: 'طرح حمایت معیشتی دهک‌های اول تا هفتم', badge: 'حمایت معیشتی', badgeColor: 'emerald', description: 'تخصیص اعتبار تشویقی خرید ۱۱ قلم کالای اساسی در ۲۸٬۴۰۰ فروشگاه و سوپرمارکت متصل، قدرت خرید خانوار کارگری را در برابر تورم حفظ کرده است.', metric: '۷.۸۲ م.نفر', metricLabel: 'جمعیت تحت پوشش', actionLabel: 'داشبورد کالابرگ', actionUrl: '/labor/kalabarg-electronic-subsidy' },
      { id: 'lbc2', title: 'تحقق ۸۸.۴ درصدی تعهد اشتغال استان تهران با ۱۴۲ هزار شغل جدید', subtitle: 'سامانه ملی رصد اشتغال کشور', badge: 'اشتغال پایدار', badgeColor: 'cyan', description: 'با راستی‌آزمایی پیامکی و تماس تلفنی با شاغلین بیمه‌شده، شهرستان‌های ری، شهریار و پاکدشت بالاترین رکورد جذب نیروی کار در صنایع را ثبت کردند.', metric: '۱۴۲٬۵۰۰ شغل', metricLabel: 'اشتغال محقق‌شده', actionLabel: 'گزارش سامانه رصد', actionUrl: '/labor/unemployment-rasad-portal' },
      { id: 'lbc3', title: 'ساماندهی نیروی کار کارگری در شهرک‌های صنعتی جنوب و غرب استان', subtitle: 'اداره کل تعاون، کار و رفاه اجتماعی تهران', badge: 'مهارت‌آموزی', badgeColor: 'blue', description: 'راه‌اندازی مراکز جوار کارگاهی فنی و حرفه‌ای در شهرک‌های شمس‌آباد و پرند با هدف ارتقای مهارت ۳۰ هزار کارگر خطوط تولید و کاهش حوادث کار.', metric: '۳۰ ک.نفر', metricLabel: 'آموزش مهارت', actionLabel: 'فنی و حرفه‌ای', actionUrl: '/labor/skills-vocational-tehran' },
    ],
    chartData: [
      { label: 'تهران', primaryValue: 6.4, secondaryValue: 78000 },
      { label: 'ری', primaryValue: 6.8, secondaryValue: 18500 },
      { label: 'شهریار', primaryValue: 6.9, secondaryValue: 14200 },
      { label: 'پاکدشت', primaryValue: 6.5, secondaryValue: 12800 },
      { label: 'اسلامشهر', primaryValue: 7.2, secondaryValue: 9500 },
      { label: 'بهارستان', primaryValue: 7.8, secondaryValue: 8200 },
      { label: 'ملارد', primaryValue: 7.5, secondaryValue: 7400 },
      { label: 'دماوند', primaryValue: 6.2, secondaryValue: 3200 },
    ],
    chartTitles: { main: 'نرخ بیکاری و میزان اشتغال ایجادی جدید در شهرستان‌های تهران', sub: 'مقایسه نرخ بیکاری فصلی (٪) با تعداد شغل‌های ثبت‌شده در سامانه رصد (نفر)', primaryLegend: 'نرخ بیکاری فصلی (٪)', secondaryLegend: 'اشتغال ایجادی جدید (نفر)' },
    tableRows: [
      { id: 'lbr1', title: 'سامانه رصد اشتغال شهرستان ری', category: 'راستی‌آزمایی اشتغال', countyOrZone: 'ری', metric1: '۱۸٬۵۰۰ شغل جدید', metric2: '۹۲٪ تاییدیه بیمه‌ای', status: 'optimal', statusText: 'تحقق بالاتر از برنامه', detail: 'بیشترین جذب در کارخانجات پتروشیمی، ریخته‌گری و مواد غذایی شمس‌آباد' },
      { id: 'lbr2', title: 'شبکه توزیع کالابرگ الکترونیک اسلامشهر', category: 'حمایت اجتماعی', countyOrZone: 'اسلامشهر', metric1: '۴۸۵ هزار مشمول', metric2: '۸۹٪ نرخ تراکنش خرید', status: 'optimal', statusText: 'پذیرش بالا', detail: 'استقبال گسترده دهک‌های ۱ تا ۳ از خرید برنج، مرغ و روغن با تخفیف کالابرگ' },
      { id: 'lbr3', title: 'کاریابی و اشتغال شهرستان بهارستان', category: 'بازار کار پرتراکم', countyOrZone: 'بهارستان', metric1: 'نرخ بیکاری ۷.۸٪', metric2: '۸٬۲۰۰ شغل جدید', status: 'warning', statusText: 'نیاز به حمایت', detail: 'نیاز به ایجاد شهرک صنفی مبلمان و صنایع چوب جهت ساماندهی کارگاه‌های خانگی' },
      { id: 'lbr4', title: 'مراکز آموزش فنی و حرفه‌ای استان تهران', category: 'مهارت و توانمندسازی', countyOrZone: 'کل استان', metric1: '۵۲ مرکز ثابت دولتی', metric2: '۶۵ هزار گواهی مهارت', status: 'normal', statusText: 'روان', detail: 'برگزاری دوره‌های تخصصی PLC، اتوماسیون صنعتی و جوشکاری فوق‌پیشرفته' },
    ],
    tableHeaders: { col1: 'عنوان مرکز / حوزه', col2: 'شاخص نظارتی', col3: 'آمار جمعیتی / اشتغال', col4: 'درصد تحقق / پوشش', col5: 'وضعیت راهبردی' },
    whatIfScenarios: [
      { id: 'wlb1', title: 'افزایش ۳۰ درصدی اعتبار تشویقی کالابرگ دهک‌های ۱ تا ۳', description: 'افزایش قدرت خرید ماهانه بیش از ۶۵۰ هزار خانوار محروم استان تهران.', estimatedImpact: 'کاهش ضریب محرومیت غذایی در شهرستان‌های حاشیه‌ای به میزان ۴۰٪', leverKey: 'kalabargCreditDeltaPercent' },
      { id: 'wlb2', title: 'اعطای تسهیلات خوداشتغالی مشاغل خانگی در مناطق با بیکاری بالای ۷٪', description: 'ایجاد ۲۵ هزار فرصت شغلی در صنایع دستی، خیاطی و بسته‌بندی در بهارستان و ملارد.', estimatedImpact: 'کاهش نرخ بیکاری زنان سرپرست خانوار به میزان ۱.۵ درصد', leverKey: 'workingCapitalCreditHemmat' },
    ]
  },

  // 10. Risk, Economic Resilience & Energy Imbalance
  resilience: {
    moduleId: 'resilience',
    titleFa: 'ریسک، تاب‌آوری اقتصادی و ناترازی انرژی و آب',
    agentCode: 'AGT-10',
    headlineSummary: 'سنجش ناترازی ۱۴۵۰ مگاواتی برق، فرونشست ۲۴ سانتی‌متری دشت ورامین و طراحی سناریوهای پدافند غیرعامل اقتصادی پایتخت.',
    policyPriority: 'احداث ۱۰۰ مگاوات نیروگاه خورشیدی در اراضی شهرک‌های صنعتی و تقویت پایداری آب شرب و صنعتی.',
    metrics: [
      { key: 'r1', label: 'ناترازی بالقوه برق صنایع در پیک', value: '۱٬۴۵۰', subValue: 'شکاف تقاضای اوج تابستان', changePercent: -8.0, isPositiveGood: false, unit: 'مگاوات کمبود دیماند', source: 'دیسپاچینگ برق تهران', level: 'A' },
      { key: 'r2', label: 'حداکثر نرخ فرونشست دشت‌های استان', value: '۲۴', subValue: 'دشت ورامین و جنوب شهریار', changePercent: -4.0, isPositiveGood: false, unit: 'سانتی‌متر در سال', source: 'سازمان نقشه‌برداری کشور', level: 'A' },
      { key: 'r3', label: 'شاخص تاب‌آوری زنجیره تامین پایتخت', value: '۸۶.۵', subValue: 'سطح ایمن پدافند غیرعامل', changePercent: 3.5, isPositiveGood: true, unit: 'امتیاز از ۱۰۰', source: 'پدافند غیرعامل استانداری', level: 'A' },
      { key: 'r4', label: 'ظرفیت نیروگاه‌های خورشیدی نصب‌شده', value: '۴۵', subValue: 'سقف شهرک‌ها و اراضی پاکدشت', changePercent: 55.0, isPositiveGood: true, unit: 'مگاوات فعال', source: 'شرکت توزیع برق تهران', level: 'A' },
    ],
    carouselHighlights: [
      { id: 'rc1', title: 'پایش ماهواره‌ای فرونشست ۲۴ سانتی‌متری در دشت ورامین و جنوب ری', subtitle: 'قرارگاه پدافند غیرعامل و مدیریت بحران استانداری', badge: 'ریسک ژئوتکنیک', badgeColor: 'rose', description: 'رصد ماهواره‌ای اینترفرومتری راداری (InSAR) نشان می‌دهد کاهش بیلان آبخوان خطوط انتقال گاز، راه‌آهن تهران-مشهد و دکل‌های برق فشار قوی را تهدید می‌کند.', metric: '۲۴ سانتی‌متر', metricLabel: 'نرخ سالانه فرونشست', actionLabel: 'نقشه فرونشست', actionUrl: '/resilience/water-aquifer-depletion' },
      { id: 'rc2', title: 'برنامه جابجایی بار صنایع جهت به حداقل رساندن خسارت عدم‌النفع کارخانجات', subtitle: 'توافق استانداری با انجمن مدیران صنایع', badge: 'مدیریت بار هوشمند', badgeColor: 'amber', description: 'با اجرای جدول زمان‌بندی جابجایی شیفت تعطیل هفتگی شهرک‌های شمس‌آباد و عباس‌آباد به روزهای کاری غیرهمزمان، خطوط پیوسته با صفر ساعت قطعی به تولید ادامه دادند.', metric: '۱٬۴۵۰ مگاوات', metricLabel: 'مدیریت بار اوج', actionLabel: 'سناریوی خاموشی', actionUrl: '/resilience/energy-imbalance-blackouts' },
      { id: 'rc3', title: 'سنجش کشش انتقال نوسانات نرخ ارز به اقلام اساسی و پروتئینی', subtitle: 'مدل‌های اقتصادسنجی مرکز تصمیم‌یار', badge: 'حساسیت‌سنجی ارزی', badgeColor: 'cyan', description: 'محاسبات حاکی از آن است که به ازای هر ۱۰ درصد شوک ارزی در بازار آزاد، قیمت اقلام پروتئینی در بازه ۳۰ روزه حداکثر ۱.۸ درصد تعدیل می‌شود.', metric: '۰.۱۸', metricLabel: 'کشش انتقال قیمت', actionLabel: 'تحلیل شوک ارز', actionUrl: '/resilience/fx-shock-sensitivity' },
    ],
    chartData: [
      { label: 'شمس‌آباد', primaryValue: 340, secondaryValue: 240 },
      { label: 'عباس‌آباد', primaryValue: 280, secondaryValue: 190 },
      { label: 'صفادشت', primaryValue: 140, secondaryValue: 110 },
      { label: 'خوارزمی', primaryValue: 95, secondaryValue: 70 },
      { label: 'قرچک', primaryValue: 75, secondaryValue: 60 },
      { label: 'نصیرآباد', primaryValue: 65, secondaryValue: 50 },
    ],
    chartTitles: { main: 'تقاضای اوج دیماند در برابر ظرفیت ایستگاه‌های فرعی در شهرک‌ها', sub: 'مقایسه دیماند قراردادی کارخانجات با ظرفیت پست‌های توزیع برق (مگاوات)', primaryLegend: 'پیک دیماند درخواستی (MW)', secondaryLegend: 'ظرفیت ایمن پست (MW)' },
    tableRows: [
      { id: 'rr1', title: 'محدوده راه‌آهن تهران-مشهد در دشت پیشوا', category: 'زیرساخت ریلی حیاتی', countyOrZone: 'پیشوا و ورامین', metric1: '۲۱ سانتی‌متر نشست', metric2: 'پایش ژئودتیک مداوم', status: 'warning', statusText: 'پایش زرد', detail: 'تزریق بتن تحکیمی در زیر ریل‌ها و مهار برداشت چاه‌های مجاور خط' },
      { id: 'rr2', title: 'پست انتقال برق ۴۰۰ کیلوولت جلال‌آل‌احمد', category: 'انتقال نیروی پایتخت', countyOrZone: 'تهران', metric1: '۱٬۲۰۰ MVA ظرفیت', metric2: 'تغذیه قطب اداری و مالی', status: 'optimal', statusText: 'پایدار', detail: 'اتصال رینگ سراسری برق جهت جلوگیری از خاموشی‌های ناگهانی' },
      { id: 'rr3', title: 'شهرک صنعتی ریخته‌گری پاکدشت (عباس‌آباد)', category: 'صنایع انرژی‌بر', countyOrZone: 'پاکدشت', metric1: '۲۸۰ مگاوات دیماند', metric2: 'کوره‌های القایی ذوب', status: 'critical', statusText: 'ناترازی شدید', detail: 'ضرورت بهره‌برداری از پست ۶۳ به ۲۰ کیلوولت دوم شهرک تا پیش از تابستان' },
      { id: 'rr4', title: 'مخازن استراتژیک آب شرب سوهانک و سد لار', category: 'پدافند آب پایتخت', countyOrZone: 'شمیرانات', metric1: '۸۵۰ هزار م³ ذخیره', metric2: 'پوشش ۷۲ ساعته', status: 'optimal', statusText: 'ایمن', detail: 'حفاظت فیزیکی درجه یک و پایش آنلاین کیفیت شیمیایی و میکروبی آب' },
    ],
    tableHeaders: { col1: 'تاسیسات / محدوده', col2: 'رده اهمیت پدافندی', col3: 'ظرفیت / بیلان', col4: 'شاخص ریسک', col5: 'وضعیت تاب‌آوری' },
    whatIfScenarios: [
      { id: 'wr1', title: 'سناریوی شوک قطعی برق صنعتی به میزان ۳۰ درصد در تابستان', description: 'برآورد خسارت روزانه ۱۲۰ میلیارد تومانی بر خطوط پیوسته صنایع فولادی.', estimatedImpact: 'پیشنهاد: اولویت‌بخشی به برق صنایع دارویی و خطوط سردخانه‌ای', leverKey: 'powerCurtailmentPercent' },
      { id: 'wr2', title: 'سناریوی شوک ۴۰ درصدی نرخ ارز بر نهاده‌های دام و طیور', description: 'افزایش بالقوه قیمت مرغ در بازار آزاد به بالای ۱۰۰ هزار تومان.', estimatedImpact: 'پیشنهاد: تزریق سریع ۶۰ هزار تن نهاده از گمرک شهریار', leverKey: 'fxShockPercent' },
    ]
  },

  // 11. Spatial Planning & County Equilibrium
  spatial: {
    moduleId: 'spatial',
    titleFa: 'آمایش سرزمین، تعادل‌بخشی منطقه‌ای و توسعه شهرستان‌ها',
    agentCode: 'AGT-11',
    headlineSummary: 'تراکم جمعیتی ۱۰٬۸۰۰ نفر در کیلومترمربع در بهارستان، عدم‌تعادل استقرار صنایع بین غرب و شرق استان و رصد حریم‌های شهری.',
    policyPriority: 'توازن‌بخشی به اعتبارات تملک دارایی‌های سرمایه‌ای و مهار سرریزهای جمعیتی به پهنه جنوب غربی استان.',
    metrics: [
      { key: 'sp1', label: 'تراکم جمعیتی بهارستان (بالاترین کشور)', value: '۱۰٬۸۵۰', subValue: 'نفر در هر کیلومترمربع', changePercent: 2.1, isPositiveGood: false, unit: 'نفر/کیلومترمربع', source: 'مرکز آمار ایران', level: 'A' },
      { key: 'sp2', label: 'نسبت بودجه عمرانی شرق به جنوب غرب', value: '۱.۴۲', subValue: 'شکاف تخصیص سرانه عمرانی', changePercent: -5.0, isPositiveGood: true, unit: 'شاخص نابرابری', source: 'سازمان مدیریت و برنامه‌ریزی', level: 'A' },
      { key: 'sp3', label: 'نرخ ساخت‌وساز خارج از حریم مصوب', value: '۱.۸٪', subValue: 'کاهش نسبت به سال قبل', changePercent: -22.0, isPositiveGood: true, unit: 'درصد کل مجوزها', source: 'کمیسیون ماده ۹۹ استانداری', level: 'A' },
      { key: 'sp4', label: 'سرانه اراضی صنعتی در غرب استان', value: '۱۸.۴', subValue: 'شهریار، قدس و ملارد', changePercent: 3.2, isPositiveGood: true, unit: 'مترمربع به ازای شاغل', source: 'شرکت شهرک‌های صنعتی', level: 'A' },
    ],
    carouselHighlights: [
      { id: 'sc1', title: 'طرح تعادل‌بخشی به شاخص‌های خدماتی پهنه جنوب‌غرب (بهارستان، رباط‌کریم و اسلامشهر)', subtitle: 'کارگروه آمایش سرزمین استان تهران', badge: 'تعادل منطقه‌ای', badgeColor: 'cyan', description: 'تراکم جمعیتی ۱۰٬۸۵۰ نفری بهارستان ایجاب می‌کند ۵۰ درصد سرانه‌های بهداشتی و آموزشی جدید استان در این پهنه متمرکز شود.', metric: '۱۰٬۸۵۰', metricLabel: 'تراکم نفر/ک‌م²', actionLabel: 'بررسی اطلس', actionUrl: '/spatial/density-demographics' },
      { id: 'sc2', title: 'ساماندهی ۵ پهنه لکه‌های صنعتی غیرمجاز و انتقال به نواحی شهرکی مصوب', subtitle: 'معاونت هماهنگی امور عمرانی و اقتصادی استانداری', badge: 'آمایش صنعتی', badgeColor: 'blue', description: 'انتقال و تعیین تکلیف کارگاه‌های ریخته‌گری، آبکاری و درودگری غیرمجاز پیرامون جاده مخصوص و خاوران به شهرک‌های دارای تصفیه‌خانه صنعتی.', metric: '۵ پهنه', metricLabel: 'لکه‌های در حال انتقال', actionLabel: 'مشاهده لکه‌ها', actionUrl: '/spatial/industrial-zones-relocation' },
      { id: 'sc3', title: 'پایش ماهواره‌ای اراضی زراعی جنوب استان در جلوگیری از تغییر کاربری غیرمجاز', subtitle: 'سامانه پنجره واحد زمین و پایش فضایی سپهر', badge: 'حفاظت اراضی', badgeColor: 'emerald', description: 'شناسایی و توقف ۳۴۰ مورد ساخت‌وساز غیرمجاز در باغ‌ها و اراضی کشاورزی شهرستان‌های دماوند و شهریار با تصویربرداری هوایی هفتگی.', metric: '۳۴۰ مورد', metricLabel: 'توقف تخلفات', actionLabel: 'پایش ماهواره‌ای', actionUrl: '/spatial/land-use-satellite' },
    ],
    chartData: [
      { label: 'تهران', primaryValue: 9200, secondaryValue: 880 },
      { label: 'بهارستان', primaryValue: 10850, secondaryValue: 140 },
      { label: 'قدس', primaryValue: 8400, secondaryValue: 195 },
      { label: 'اسلامشهر', primaryValue: 4600, secondaryValue: 310 },
      { label: 'ملارد', primaryValue: 1850, secondaryValue: 240 },
      { label: 'دماوند', primaryValue: 120, secondaryValue: 420 },
      { label: 'فیروزکوه', primaryValue: 38, secondaryValue: 380 },
    ],
    chartTitles: { main: 'تراکم جمعیتی در برابر سرانه اعتبارات عمرانی شهرستان‌ها', sub: 'مقایسه تراکم نفر در کیلومترمربع با سرانه اعتبارات تملک دارایی (هزار تومان/نفر)', primaryLegend: 'تراکم جمعیتی (نفر/ک‌م²)', secondaryLegend: 'سرانه بودجه عمرانی (هزار تومان)' },
    tableRows: [
      { id: 'sr1', title: 'شهرستان بهارستان', category: 'پهنه جنوب غرب', countyOrZone: 'بهارستان', metric1: '۷۲۰ هزار نفر جمعیت', metric2: 'کمترین مساحت سرزمینی', status: 'critical', statusText: 'فوق متراکم', detail: 'ضرورت احداث بیمارستان دوم و ایجاد کنارگذر ترافیکی نسیم‌شهر' },
      { id: 'sr2', title: 'شهرستان شهریار', category: 'قطب جمعیتی و کشاورزی', countyOrZone: 'شهریار', metric1: '۸۹۰ هزار نفر جمعیت', metric2: '۵ شهرک صنفی و صنعتی', status: 'warning', statusText: 'متراکم پویا', detail: 'تکمیل رینگ فاضلاب شهری و احیای قنوات اراضی باغات گوجه‌سبز و هلو' },
      { id: 'sr3', title: 'شهرستان ری', category: 'قطب لجستیک و انبارداری', countyOrZone: 'ری', metric1: '۱٬۲۰۰ هکتار انبار', metric2: 'سیلو و صنایع سنگین', status: 'optimal', statusText: 'کلیدی استراتژیک', detail: 'تسهیل ترانزیت خودروهای سنگین در بزرگراه آزادگان و کمربندی دوم' },
      { id: 'sr4', title: 'شهرستان فیروزکوه', category: 'پهنه کوهستانی و صنایع پاک', countyOrZone: 'فیروزکوه', metric1: '۴۲ هزار نفر جمعیت', metric2: 'قطب معادن و سیمان', status: 'optimal', statusText: 'پایدار کم‌تراکم', detail: 'توسعه گردشگری سلامت و استقرار صنایع دانش‌بنیان سازگار با محیط‌زیست' },
    ],
    tableHeaders: { col1: 'شهرستان', col2: 'پهنه جغرافیایی', col3: 'شاخص جمعیتی و ظرفیت', col4: 'وضعیت آمایشی', col5: 'اولویت اقدام' },
    whatIfScenarios: [
      { id: 'wsp1', title: 'تغییر فرمول توزیع ارزش افزوده بر مبنای محرومیت به جای جمعیت صرف', description: 'افزایش ۳۵ درصدی منابع شهرداری‌ها و دهیاری‌های ملارد، پاکدشت و پیشوا.', estimatedImpact: 'بهبود ۲ پله‌ای شاخص عدالت فضایی در استان تهران', leverKey: 'spatialEquityRatio' },
    ]
  },

  // 12. Governorate Command, Petitions & Executive Resolutions
  governorate: {
    moduleId: 'governorate',
    titleFa: 'فرمانداری‌ها، مصوبات ستاد تسهیل و مطالبات مردمی',
    agentCode: 'AGT-12',
    headlineSummary: 'پایش عملکرد ۱۶ فرماندار، اجرای ۸۸.۴ درصدی مصوبات کارگروه رفع موانع تولید و رسیدگی به ۵٬۲۰۰ درخواست مردمی سامانه سامد.',
    policyPriority: 'حل‌وفصل فوری موانع حقوقی و بانکی کارخانجات نیمه‌تعطیل و ارتقای شفافیت پاسخگویی اداری فرمانداری‌ها.',
    metrics: [
      { key: 'gv1', label: 'نرخ اجرای مصوبات کارگروه تسهیل', value: '۸۸.۴٪', subValue: '۲٬۳۴۰ مصوبه اجرایی‌شده', changePercent: 5.2, isPositiveGood: true, unit: 'درصد تحقق', source: 'دبیرخانه ستاد تسهیل استان', level: 'A' },
      { key: 'gv2', label: 'میانگین زمان رسیدگی به درخواست‌های سامد', value: '۴.۸', subValue: 'کاهش از ۱۲ روز در سال قبل', changePercent: -60.0, isPositiveGood: true, unit: 'روز کاری', source: 'بازرسی استانداری تهران', level: 'A' },
      { key: 'gv3', label: 'واحدهای راکد احیاشده در سال جاری', value: '۱۲۸', subValue: 'بازگشت ۵٬۴۰۰ شاغل به کار', changePercent: 24.0, isPositiveGood: true, unit: 'واحد صنعتی و معدنی', source: 'نهضت احیای واحدهای اقتصادی', level: 'A' },
      { key: 'gv4', label: 'امتیاز ارزیابی عملکرد ۱۶ فرمانداری', value: '۸۶.۲', subValue: 'بر اساس شاخص‌های اقتصادی', changePercent: 4.1, isPositiveGood: true, unit: 'امتیاز از ۱۰۰', source: 'معاونت امور اقتصادی استانداری', level: 'A' },
    ],
    carouselHighlights: [
      { id: 'gc1', title: 'احیای ۱۲۸ واحد راکد و بازگشت ۵٬۴۰۰ کارگر به چرخه تولید استان', subtitle: 'نهضت احیای واحدهای اقتصادی استانداری تهران', badge: 'احیای اقتصادی', badgeColor: 'emerald', description: 'با مداخله مستقیم استاندار و اعطای تسهیلات سرمایه در گردش، ۱۲۸ کارخانه صنایع غذایی، نساجی و قطعه‌سازی پس از سال‌ها تعطیلی به چرخه کار برگشتند.', metric: '۱۲۸ واحد', metricLabel: 'کارخانجات احیاشده', actionLabel: 'واحدهای احیاشده', actionUrl: '/governorate/revived-factories' },
      { id: 'gc2', title: 'رسیدگی زیر ۵ روز به ۹۴ درصد شکایات فعالان اقتصادی در میز خدمت سامد', subtitle: 'دفتر بازرسی، مدیریت عملکرد و امور حقوقی استانداری', badge: 'شفافیت اداری', badgeColor: 'cyan', description: 'اتصال هوشمند درگاه سامد به سامانه‌های تخصصی دستگاه‌های اجرایی موجب کاهش چشمگیر بروکراسی و تسریع در حل تعارضات اداری سرمایه‌گذاران شد.', metric: '۴.۸ روز', metricLabel: 'میانگین پاسخگویی', actionLabel: 'درگاه سامد', actionUrl: '/governorate/public-petitions' },
      { id: 'gc3', title: 'اجرای کامل ۸۸.۴ درصد از ۲٬۶۵۰ مصوبه ستاد تسهیل و رفع موانع تولید', subtitle: 'دبیرخانه کارگروه ستاد تسهیل استان تهران', badge: 'رفع موانع', badgeColor: 'blue', description: 'بیشترین مصوبات معطوف به تقسیط بدهی‌های مالیاتی و تامین اجتماعی و آزادسازی وثایق بانکی جهت تامین نقدینگی خطوط تولید بوده است.', metric: '۸۸.۴٪', metricLabel: 'نرخ اجرای مصوبات', actionLabel: 'کارنامه مصوبات', actionUrl: '/governorate/executive-resolutions' },
    ],
    chartData: [
      { label: 'شهریار', primaryValue: 94, secondaryValue: 88 },
      { label: 'ری', primaryValue: 92, secondaryValue: 86 },
      { label: 'پاکدشت', primaryValue: 89, secondaryValue: 84 },
      { label: 'رباط‌کریم', primaryValue: 87, secondaryValue: 82 },
      { label: 'اسلامشهر', primaryValue: 85, secondaryValue: 80 },
      { label: 'بهارستان', primaryValue: 83, secondaryValue: 79 },
      { label: 'دماوند', primaryValue: 81, secondaryValue: 77 },
      { label: 'فیروزکوه', primaryValue: 78, secondaryValue: 75 },
    ],
    chartTitles: { main: 'شاخص ارزیابی تحقق مصوبات اقتصادی در فرمانداری‌های شهرستان‌ها', sub: 'مقایسه درصد تحقق مصوبات (میله اصلی) با میانگین رضایت‌مندی صنعتگران (میله دوم)', primaryLegend: 'درصد تحقق مصوبات ستاد تسهیل', secondaryLegend: 'شاخص رضایت صنعتگران' },
    tableRows: [
      { id: 'gr1', title: 'مصوبه آزادسازی وثیقه کارخانه داروسازی شمس‌آباد', category: 'بانک و تامین مالی', countyOrZone: 'ری', metric1: '۴۵ میلیارد تومان تسهیلات', metric2: 'بانک ملت شعبه مرکزی', status: 'optimal', statusText: 'اجرا شده', detail: 'فک رهن سفته‌های متقابل و شارژ خط اعتباری خرید مواد اولیه' },
      { id: 'gr2', title: 'تقسیط ۶۰ ماهه بدهی بیمه‌ای شرکت قطعه‌سازی خودرو', category: 'تامین اجتماعی', countyOrZone: 'قدس', metric1: '۱۴۰ نفر کارگر فعال', metric2: 'شعبه تامین اجتماعی قدس', status: 'optimal', statusText: 'اجرا شده', detail: 'توقف اجراییه توقیف حساب‌های جاری و ادامه پوشش بیمه‌ای کارگران' },
      { id: 'gr3', title: 'تامین انشعاب گاز ۳۰ پوند شهرک گلخانه‌ای حصارگلی', category: 'زیرساخت و انرژی', countyOrZone: 'ورامین', metric1: '۱۲۰ هکتار گلخانه هیدروپونیک', metric2: 'شرکت گاز استان تهران', status: 'warning', statusText: 'در حال تکمیل', detail: 'پیشرفت فیزیکی ۸۲ درصدی خط انتقال لوله ۴ اینچ' },
      { id: 'gr4', title: 'حل تعارض اراضی کارگاه‌های ریخته‌گری با منابع طبیعی', category: 'امور اراضی و حقوقی', countyOrZone: 'پاکدشت', metric1: '۸۵ کارگاه صنفی', metric2: 'اداره کل منابع طبیعی', status: 'optimal', statusText: 'توافق نهایی', detail: 'واگذاری سند اجاره به شرط تملیک و احداث فضای سبز مشجر' },
    ],
    tableHeaders: { col1: 'عنوان مصوبه', col2: 'دستگاه متولی', col3: 'ابعاد مالی و انسانی', col4: 'وضعیت اجرا', col5: 'شرح اقدام' },
    whatIfScenarios: [
      { id: 'wg1', title: 'الزام بانک‌ها به تعلیق اجراییه‌های توقیف ماشین‌آلات تولیدی', description: 'جلوگیری از تعطیلی ۵۰ کارخانه فعال با اشتغال بالای ۴٬۰۰۰ نفر در استان.', estimatedImpact: 'حفظ سالانه بیش از ۲ هزار میلیارد تومان ارزش افزوده صنعتی', leverKey: 'bankSeizureSuspension' },
    ]
  },

  // 13. System Telemetry, Cyber Resilience & AI Health
  system: {
    moduleId: 'system',
    titleFa: 'مرکز تله‌متری، امنیت سایبری و پایش زیرساخت‌های داده‌ای',
    agentCode: 'AGT-00',
    headlineSummary: 'پایش سلامت ۱۲ کلاستر ابری، تله‌متری ۹٬۶۴۲ پایانه نانینو، زمان تاخیر استنتاج هوش مصنوعی ۲۴۰ میلی‌ثانیه و فایروال بومی.',
    policyPriority: 'حفظ ضریب دسترس‌پذیری ۹۹.۹۹ درصدی و حفاظت از محرمانگی و حاکمیت داده‌های اقتصادی استانداری.',
    metrics: [
      { key: 'sy1', label: 'ضریب دسترس‌پذیری سرورها (Uptime)', value: '۹۹.۹۸٪', subValue: 'سطح پایدار حاکمیتی', changePercent: 0.05, isPositiveGood: true, unit: 'درصد سالانه', source: 'مرکز داده استانداری تهران', level: 'A' },
      { key: 'sy2', label: 'میانگین زمان پاسخ استنتاج AI (Latency)', value: '۲۴۰', subValue: 'مبتنی بر مدل Gemini 2.5 Flash', changePercent: -15.0, isPositiveGood: true, unit: 'میلی‌ثانیه', source: 'کلاستر هوش مصنوعی', level: 'A' },
      { key: 'sy3', label: 'پایانه‌های آنلاین پایش متصل (IoT/POS)', value: '۹٬۶۴۲', subValue: 'کارتخوان‌های نانینو و تله‌متری', changePercent: 1.2, isPositiveGood: true, unit: 'دستگاه فعال برخط', source: 'سامانه فاوا استانداری', level: 'A' },
      { key: 'sy4', label: 'حملات سایبری خنثی‌شده در ماه', value: '۱٬۴۲۰', subValue: 'مسدودسازی در لایه فایروال WAF', changePercent: -5.0, isPositiveGood: true, unit: 'تهدید شناسایی‌شده', source: 'مرکز ماهر و افتا استان', level: 'A' },
    ],
    carouselHighlights: [
      { id: 'syc1', title: 'استقرار مدل تصمیم‌یار هوشمند بومی با دقت استنتاج اقتصادی بالای ۹۸٪', subtitle: 'طراحی شده توسط شرکت شبکه هوشمند ابتکار ویستا', badge: 'هوش مصنوعی', badgeColor: 'cyan', description: 'موتور تحلیل زبان طبیعی با پشتیبانی کامل از اصطلاحات تخصصی بودجه، تجارت و صنعت ایران، تصمیم‌گیری‌های لحظه‌ای استاندار را شبیه‌سازی می‌کند.', metric: '۲۴۰ ms', metricLabel: 'سرعت پردازش هوش', actionLabel: 'تست ایجنت', actionUrl: '/system/ai-models' },
      { id: 'syc2', title: 'همگام‌سازی ۲۴ ساعته پایگاه داده توزیع‌شده با رمزنگاری پیشرفته کوانتومی', subtitle: 'امنیت داده‌های پدافندی و اقتصادی پایتخت', badge: 'امنیت سایبری', badgeColor: 'blue', description: 'پروتکل پشتیبان‌گیری چندگانه در ۳ مرکز داده امن جداگانه در پهنه‌های شمال، مرکز و جنوب تهران، مصونیت کامل در برابر حوادث غیرمترقبه را تضمین می‌کند.', metric: '۹۹.۹۸٪', metricLabel: 'آپ‌تایم مستمر', actionLabel: 'وضعیت زیرساخت', actionUrl: '/system/infrastructure' },
      { id: 'syc3', title: 'تله‌متری ۹٬۶۴۲ پایانه هوشمند نانینو و اتصال به شبکه ملی اطلاعات', subtitle: 'مرکز تبادل اطلاعات اقتصادی استانداری (IX)', badge: 'تله‌متری برخط', badgeColor: 'emerald', description: 'پایش تراکنش‌های ثانیه‌ای نانوایی‌های پایتخت با فیلتر هوشمند ضد انحراف و گزارش خودکار تخلفات سهمیه‌ای به بازرسان شهرستان‌ها.', metric: '۹٬۶۴۲', metricLabel: 'پایانه فعال', actionLabel: 'مانیتورینگ IoT', actionUrl: '/system/iot-monitoring' },
    ],
    chartData: [
      { label: '۰۰:۰۰', primaryValue: 120, secondaryValue: 99.9 },
      { label: '۰۴:۰۰', primaryValue: 85, secondaryValue: 100 },
      { label: '۰۸:۰۰', primaryValue: 340, secondaryValue: 99.8 },
      { label: '۱۲:۰۰', primaryValue: 520, secondaryValue: 99.7 },
      { label: '۱۶:۰۰', primaryValue: 480, secondaryValue: 99.9 },
      { label: '۲۰:۰۰', primaryValue: 390, secondaryValue: 99.9 },
    ],
    chartTitles: { main: 'بار ترافیک تراکنش‌ها و ضریب دسترس‌پذیری سامانه‌های تصمیم‌یار', sub: 'تعداد درخواست در ثانیه (RPS - میله اصلی) در برابر درصد پایداری سرویس (میله دوم)', primaryLegend: 'درخواست در ثانیه (RPS)', secondaryLegend: 'پایداری شبکه (٪)' },
    tableRows: [
      { id: 'syr1', title: 'سرویس‌دهنده کلاستر هوش مصنوعی Gemini', category: 'هسته‌های استنتاجی', countyOrZone: 'ابر استانداری', metric1: '۲۴۰ ms تاخیر', metric2: 'استفاده از حافظه کش', status: 'optimal', statusText: 'فعال پایدار', detail: 'پاسخگویی به سوالات سناریوسازان و تحلیل خودکار داده‌های ۱۶ شهرستان' },
      { id: 'syr2', title: 'درگاه تبادل داده اداره کل امور مالیاتی استان تهران', category: 'وب‌سرویس حاکمیتی', countyOrZone: 'تهران', metric1: '۱۵۰ استعلام/دقیقه', metric2: 'SSL دوطرفه امن', status: 'optimal', statusText: 'برخط', detail: 'دریافت برخط ارقام وصولی مالیات مشاغل و ارزش افزوده' },
      { id: 'syr3', title: 'سنسورهای رادار InSAR ماهواره‌ای فرونشست', category: 'پایش ماهواره‌ای GIS', countyOrZone: 'جنوب تهران', metric1: 'دقت ۲ میلی‌متر', metric2: 'بروزرسانی هفتگی', status: 'optimal', statusText: 'دریافت سیگنال', detail: 'ارسال بسته‌های داده ژئودتیک دشت ورامین و ری به نقشه لایه‌ای سامانه' },
      { id: 'syr4', title: 'پایگاه توزیع‌شده ردگیری حملات DDOS', category: 'امنیت شبکه SOC', countyOrZone: 'فایروال پایتخت', metric1: 'ظرفیت دفع ۴۰ Gbps', metric2: 'فیلتر خودکار IP', status: 'optimal', statusText: 'حفاظت ۱۰۰٪', detail: 'حفاظت از پایگاه داده و جلوگیری از هرگونه دستکاری یا نفوذ غیرمجاز' },
    ],
    tableHeaders: { col1: 'زیرسیستم / سرویس', col2: 'لایه معماری', col3: 'شاخص عملکرد و تاخیر', col4: 'وضعیت سلامت', col5: 'توضیحات پدافندی' },
    whatIfScenarios: [
      { id: 'wsy1', title: 'قطع ارتباط اینترنت بین‌الملل و سوئیچ به شبکه ملی اطلاعات (اینترانت)', description: 'حفظ ۱۰۰ درصدی تمام قابلیت‌های تحلیلی، نقشه GIS و هوش مصنوعی محلی در استانداری.', estimatedImpact: 'تداوم بدون وقفه عملیات تصمیم‌گیری در بحرانی‌ترین شرایط', leverKey: 'intranetFallback' },
    ]
  },
};
