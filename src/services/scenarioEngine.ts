import { PolicyLevers, ScenarioImpactResult } from '@/src/types/economy';

export const DEFAULT_LEVERS: PolicyLevers = {
  flourQuotaDeltaPercent: 0,
  marketInjectionTons: 0,
  powerCurtailmentPercent: 0,
  fxShockPercent: 0,
  workingCapitalCreditHemmat: 0,
  inspectionIntensity: 'normal',
  customsClearanceSpeedPercent: 0,
  waterStressPercent: 0,
  kalabargCreditDeltaPercent: 0,
  assetMonetizationHemmat: 0,
  seasonalDemandShockPercent: 0,
  freightTariffDeltaPercent: 0,
};

export const PRESET_SCENARIOS: {
  id: string;
  title: string;
  badge: string;
  description: string;
  levers: PolicyLevers;
}[] = [
  {
    id: 'baseline',
    title: 'سناریوی پایه (ادامه روند فعلی)',
    badge: 'وضع موجود',
    description: 'تثبیت متغیرهای فعلی بدون شوک بیرونی؛ تداوم نرخ تورم ۷۴.۱٪ و روزهای پوشش ۴۲ روزه گندم.',
    levers: { ...DEFAULT_LEVERS },
  },
  {
    id: 'ai_optimal',
    title: 'بسته پیشنهادی هوش مصنوعی (جهش تولید و ثبات بازار)',
    badge: 'پیشنهاد هوشمند AI',
    description: 'ترکیب هوشمندانه تزریق ۳۵۰۰ تن کالای اساسی، تخصیص ۴۰ همت سرمایه در گردش، ارتقای سرعت ترخیص گمرک شهریار و افزایش ۳۰٪ اعتبار کالابرگ.',
    levers: {
      flourQuotaDeltaPercent: 10,
      marketInjectionTons: 3500,
      powerCurtailmentPercent: 5,
      fxShockPercent: 0,
      workingCapitalCreditHemmat: 40,
      inspectionIntensity: 'intensified_50',
      customsClearanceSpeedPercent: 35,
      waterStressPercent: 0,
      kalabargCreditDeltaPercent: 30,
      assetMonetizationHemmat: 25,
      seasonalDemandShockPercent: 0,
      freightTariffDeltaPercent: 0,
    },
  },
  {
    id: 'multi_stress',
    title: 'سناریوی تنش ترکیبی (ناترازی انرژی + شوک ارزی + خشکسالی)',
    badge: 'آزمون بحران',
    description: 'شبیه‌سازی هم‌زمان ۳۵٪ محدودیت برق شهرک‌ها، ۳۰٪ شوک ارزی و ۲۰٪ تنش آبی در دشت‌های ورامین و ری.',
    levers: {
      flourQuotaDeltaPercent: -10,
      marketInjectionTons: 500,
      powerCurtailmentPercent: 35,
      fxShockPercent: 30,
      workingCapitalCreditHemmat: 0,
      inspectionIntensity: 'strike_100',
      customsClearanceSpeedPercent: -25,
      waterStressPercent: -20,
      kalabargCreditDeltaPercent: 0,
      assetMonetizationHemmat: 0,
      seasonalDemandShockPercent: 15,
      freightTariffDeltaPercent: 25,
    },
  },
  {
    id: 'subsidy_surgery',
    title: 'جراحی هدفمند یارانه آرد و تقویت کالابرگ کارگری',
    badge: 'اصلاح ساختاری',
    description: 'کاهش ۱۵٪ سهمیه آرد خام برای جلوگیری از قاچاق هم‌زمان با افزایش ۶۰٪ اعتبار کالابرگ در بهارستان، قرچک و ملارد.',
    levers: {
      flourQuotaDeltaPercent: -15,
      marketInjectionTons: 2000,
      powerCurtailmentPercent: 0,
      fxShockPercent: 10,
      workingCapitalCreditHemmat: 20,
      inspectionIntensity: 'strike_100',
      customsClearanceSpeedPercent: 15,
      waterStressPercent: 0,
      kalabargCreditDeltaPercent: 60,
      assetMonetizationHemmat: 30,
      seasonalDemandShockPercent: 0,
      freightTariffDeltaPercent: 10,
    },
  },
];

export function calculateScenarioImpact(levers: PolicyLevers): ScenarioImpactResult {
  const inspectionMultiplier = 
    levers.inspectionIntensity === 'strike_100' ? 1.0 :
    levers.inspectionIntensity === 'intensified_50' ? 0.5 : 0.0;

  // 1. Food Inflation Delta (%)
  const foodInflationDelta = Number((
    (levers.fxShockPercent * 0.45) +
    (levers.freightTariffDeltaPercent * 0.22) +
    (levers.seasonalDemandShockPercent * 0.18) -
    (levers.marketInjectionTons * 0.0018) -
    (inspectionMultiplier * 2.8) -
    (levers.customsClearanceSpeedPercent * 0.05)
  ).toFixed(2));

  // 2. Goods Availability Delta (%)
  const goodsAvailabilityDelta = Number((
    (levers.marketInjectionTons * 0.0035) +
    (levers.customsClearanceSpeedPercent * 0.12) -
    (levers.powerCurtailmentPercent * 0.18) -
    (levers.waterStressPercent * 0.15) -
    (levers.freightTariffDeltaPercent * 0.08)
  ).toFixed(2));

  // 3. Wheat Reserve Days Change (days)
  const wheatReserveDaysChange = Number((
    (levers.flourQuotaDeltaPercent * 0.7) -
    (levers.seasonalDemandShockPercent * 0.3)
  ).toFixed(1));

  // 4. Industrial Output Delta (%)
  const industrialOutputDeltaPercent = Number((
    (levers.workingCapitalCreditHemmat * 0.18) +
    (levers.customsClearanceSpeedPercent * 0.08) -
    (levers.powerCurtailmentPercent * 0.55) -
    (levers.fxShockPercent * 0.15)
  ).toFixed(2));

  // 5. Employment Risk Delta (%)
  const employmentRiskDeltaPercent = Number((
    (levers.powerCurtailmentPercent * 0.12) +
    (levers.fxShockPercent * 0.08) -
    (levers.workingCapitalCreditHemmat * 0.06)
  ).toFixed(2));

  // 6. Public Satisfaction Delta (index -100 to +100)
  const publicSatisfactionDelta = Number((
    (levers.kalabargCreditDeltaPercent * 0.45) +
    (levers.marketInjectionTons * 0.004) -
    (foodInflationDelta * 1.8) +
    (industrialOutputDeltaPercent * 0.8)
  ).toFixed(1));

  // 7. Budget Impact (Hemmat)
  const budgetDeficitDeltaHemmat = Number((
    (levers.assetMonetizationHemmat * 0.85) -
    (levers.workingCapitalCreditHemmat * 0.15) -
    (levers.kalabargCreditDeltaPercent * 0.25)
  ).toFixed(1));

  // 8. Smuggling / Arbitrage Risk Score (0 to 100)
  let smugglingRiskScore = 35;
  if (levers.flourQuotaDeltaPercent > 15) smugglingRiskScore += 25;
  if (levers.fxShockPercent > 20) smugglingRiskScore += 20;
  if (levers.inspectionIntensity === 'strike_100') smugglingRiskScore -= 22;
  else if (levers.inspectionIntensity === 'intensified_50') smugglingRiskScore -= 12;
  smugglingRiskScore = Math.max(5, Math.min(95, smugglingRiskScore));

  // Cascading Domino Impacts
  const cascadingImpacts: ScenarioImpactResult['cascadingImpacts'] = [
    {
      phase: '۷ روزه (فوری)',
      title: levers.marketInjectionTons > 1500 ? 'تخلیه حباب قیمتی در میادین میوه و تره‌بار' : 'تغییر در صفوف خرید و نوسان شاخص خرده‌فروشی',
      description: levers.marketInjectionTons > 1500
        ? `تزریق ${levers.marketInjectionTons} تن کالای اساسی موجب کاهش فوری صفوف در ۳۰۰ میدان تره‌بار شهرداری تهران می‌شود.`
        : `نوسان هفتگی شاخص قیمت به میزان ${foodInflationDelta > 0 ? '+' : ''}${foodInflationDelta}٪ گزارش خواهد شد.`,
      probability: 92,
      severity: foodInflationDelta > 3 ? 'negative' : 'positive',
    },
    {
      phase: '۳۰ روزه (کوتاه‌مدت)',
      title: levers.powerCurtailmentPercent > 20 ? 'کاهش ظرفیت اسمی کارخانجات شهرک‌های صنعتی' : 'تنظیم تراز نقدینگی و جریان کالا در انبارها',
      description: levers.powerCurtailmentPercent > 20
        ? `قطعی ${levers.powerCurtailmentPercent}٪ برق شهرک‌های شمس‌آباد و عباس‌آباد منجر به افت ${Math.abs(industrialOutputDeltaPercent)}٪ راندمان تولید می‌شود.`
        : `تزریق سرمایه در گردش و ترخیص کالا موجودی انبارها را در وضعیت پایدار حفظ می‌کند.`,
      probability: 85,
      severity: industrialOutputDeltaPercent < -2 ? 'negative' : 'positive',
    },
    {
      phase: '۹۰ روزه (میان‌مدت)',
      title: 'اثر متقاطع بر اشتغال پایدار و دهک‌های درآمدی ۱ تا ۵',
      description: `تغییر قدرت خرید خانوار و تثبیت ضریب جینی در شهرستان‌های حاشیه‌ای (بهارستان، قرچک، اسلامشهر) با اثر رضایت‌مندی ${publicSatisfactionDelta > 0 ? '+' : ''}${publicSatisfactionDelta}.`,
      probability: 78,
      severity: publicSatisfactionDelta >= 0 ? 'positive' : 'warning',
    },
    {
      phase: '۱ ساله (راهبردی)',
      title: 'تحقق اهداف رشد اقتصادی استان و تراز بودجه عمومی',
      description: `خالص اثر بر بودجه استان به میزان ${budgetDeficitDeltaHemmat > 0 ? '+' : ''}${budgetDeficitDeltaHemmat} همت برآورد می‌گردد.`,
      probability: 70,
      severity: budgetDeficitDeltaHemmat >= 0 ? 'positive' : 'negative',
    },
  ];

  // 16 Counties Impact Map
  const countyImpactMap: ScenarioImpactResult['countyImpactMap'] = {
    tehran: {
      deltaInflation: Number((foodInflationDelta * 1.05).toFixed(1)),
      deltaSupplyIndex: Number((goodsAvailabilityDelta * 1.1).toFixed(1)),
      sentiment: publicSatisfactionDelta >= 0 ? 'beneficiary' : 'vulnerable',
      briefNote: 'بیشترین اثرپذیری از توزیع میادین و نرخ تورم خرده‌فروشی پایتخت',
    },
    rey: {
      deltaInflation: Number((foodInflationDelta * 0.95).toFixed(1)),
      deltaSupplyIndex: Number((goodsAvailabilityDelta * 0.9).toFixed(1)),
      sentiment: levers.powerCurtailmentPercent > 15 ? 'vulnerable' : 'beneficiary',
      briefNote: 'اثر مستقیم بر بزرگ‌ترین شهرک صنعتی ایران (شمس‌آباد) و سیلوهای گندم',
    },
    shahriar: {
      deltaInflation: Number((foodInflationDelta * 0.98).toFixed(1)),
      deltaSupplyIndex: Number((goodsAvailabilityDelta * 1.0).toFixed(1)),
      sentiment: levers.customsClearanceSpeedPercent > 10 ? 'beneficiary' : 'neutral',
      briefNote: 'وابستگی شدید به ترخیص روان گمرک شهریار و صنایع غذایی صفادشت',
    },
    pakdasht: {
      deltaInflation: Number((foodInflationDelta * 0.92).toFixed(1)),
      deltaSupplyIndex: Number((goodsAvailabilityDelta * 0.85).toFixed(1)),
      sentiment: levers.powerCurtailmentPercent > 20 ? 'vulnerable' : 'beneficiary',
      briefNote: 'شهرک عباس‌آباد با ۱۵۰۰ کارخانه و ۱۱۲۰ هکتار گلخانه‌های صادراتی',
    },
    baharestan: {
      deltaInflation: Number((foodInflationDelta * 1.15).toFixed(1)),
      deltaSupplyIndex: Number((goodsAvailabilityDelta * 0.9).toFixed(1)),
      sentiment: levers.kalabargCreditDeltaPercent > 20 ? 'beneficiary' : 'vulnerable',
      briefNote: 'بالاترین تراکم جمعیتی و حساسیت فوری به سهمیه آرد و کالابرگ',
    },
    qarchak: {
      deltaInflation: Number((foodInflationDelta * 1.12).toFixed(1)),
      deltaSupplyIndex: Number((goodsAvailabilityDelta * 0.92).toFixed(1)),
      sentiment: levers.kalabargCreditDeltaPercent > 20 ? 'beneficiary' : 'vulnerable',
      briefNote: 'حساسیت معیشتی بالا و نیاز فوری به تثبیت قیمت مرغ و نان',
    },
    eslamshahr: {
      deltaInflation: Number((foodInflationDelta * 1.0).toFixed(1)),
      deltaSupplyIndex: Number((goodsAvailabilityDelta * 1.05).toFixed(1)),
      sentiment: levers.freightTariffDeltaPercent > 20 ? 'vulnerable' : 'neutral',
      briefNote: 'شاهراه لجستیک جاده‌ای پایانه بار نسیم‌شهر و بندر خشک آپرین',
    },
    varamin: {
      deltaInflation: Number((foodInflationDelta * 0.88).toFixed(1)),
      deltaSupplyIndex: Number((goodsAvailabilityDelta * 0.88).toFixed(1)),
      sentiment: levers.waterStressPercent < -10 ? 'vulnerable' : 'neutral',
      briefNote: 'انبار غله استان با ۶۸.۵ هزار تن گندم و صنایع چرمشهر',
    },
    robatkarim: {
      deltaInflation: Number((foodInflationDelta * 1.02).toFixed(1)),
      deltaSupplyIndex: Number((goodsAvailabilityDelta * 0.95).toFixed(1)),
      sentiment: levers.workingCapitalCreditHemmat > 20 ? 'beneficiary' : 'neutral',
      briefNote: 'رشد جمعیتی پرند و کارخانجات شهرک صنعتی پرند و نصیرآباد',
    },
    malard: {
      deltaInflation: Number((foodInflationDelta * 0.94).toFixed(1)),
      deltaSupplyIndex: Number((goodsAvailabilityDelta * 0.9).toFixed(1)),
      sentiment: levers.marketInjectionTons > 1000 ? 'neutral' : 'beneficiary',
      briefNote: 'تولیدکننده بزرگ شیر خام، قارچ خوراکی و مرغداری‌های گوشتی',
    },
    qods: {
      deltaInflation: Number((foodInflationDelta * 1.05).toFixed(1)),
      deltaSupplyIndex: Number((goodsAvailabilityDelta * 0.98).toFixed(1)),
      sentiment: levers.workingCapitalCreditHemmat > 15 ? 'beneficiary' : 'neutral',
      briefNote: 'واحدهای قطعه‌سازی خودرو و شهرک‌های زاگرس و ابریشم',
    },
    pardis: {
      deltaInflation: Number((foodInflationDelta * 1.08).toFixed(1)),
      deltaSupplyIndex: Number((goodsAvailabilityDelta * 1.02).toFixed(1)),
      sentiment: 'neutral',
      briefNote: 'رشد جمعیت مسکن مهر و شرکت‌های دانش‌بنیان پارک پردیس',
    },
    damavand: {
      deltaInflation: Number((foodInflationDelta * 0.9).toFixed(1)),
      deltaSupplyIndex: Number((goodsAvailabilityDelta * 0.95).toFixed(1)),
      sentiment: 'neutral',
      briefNote: 'باغات سیب درختی و مرغداری‌های تخم‌گذار آبسرد',
    },
    pishva: {
      deltaInflation: Number((foodInflationDelta * 0.85).toFixed(1)),
      deltaSupplyIndex: Number((goodsAvailabilityDelta * 0.92).toFixed(1)),
      sentiment: 'beneficiary',
      briefNote: 'قطب گلخانه‌های نوین سبزی و صیفی صادراتی و شهرک پیشوا',
    },
    shemiranat: {
      deltaInflation: Number((foodInflationDelta * 1.02).toFixed(1)),
      deltaSupplyIndex: Number((goodsAvailabilityDelta * 1.0).toFixed(1)),
      sentiment: 'neutral',
      briefNote: 'اقتصاد گردشگری، باغات گیلاس و حوضه آبریز سد لتیان',
    },
    firuzkuh: {
      deltaInflation: Number((foodInflationDelta * 0.88).toFixed(1)),
      deltaSupplyIndex: Number((goodsAvailabilityDelta * 0.9).toFixed(1)),
      sentiment: 'neutral',
      briefNote: 'تولید سیب‌زمینی خوراکی، سیمان و ترانزیت جاده‌ای شمال',
    },
  };

  // Deterministic tracking number based on lever values
  const trackingNumber = Math.abs(
    Math.round(
      levers.flourQuotaDeltaPercent * 73 +
      levers.marketInjectionTons * 19 +
      levers.workingCapitalCreditHemmat * 37 +
      levers.fxShockPercent * 11 + 46864
    ) % 90000 + 10000
  );

  // Draft Resolution Text
  const policyResolutionDraft = `بسمه‌تعالی
استانداری تهران — دبیرخانه کارگروه تنظیم بازار و ستاد تسهیل و رفع موانع تولید
شماره پیگیری مصوبه هوشمند: TEH-DEC-${trackingNumber}
تاریخ: آبان ۱۴۰۵

موضوع: بسته سیاستی ابلاغی استاندار و معاون هماهنگی امور اقتصادی بر مبنای خروجی شبیه‌ساز سکوی تصمیم‌یار اقتصادی استاندار تهران

پیرو تحلیل اثرات متقاطع و نتایج شبیه‌سازی هوش مصنوعی چندایجنتی استان تهران، تصمیمات ذیل جهت اجرا به دستگاه‌های عضو ابلاغ می‌گردد:

۱. اداره کل صمت و اتاق اصناف استان تهران:
- اجرای گشت‌های مشترک بازرسی با شدت «${levers.inspectionIntensity === 'strike_100' ? 'ضربتی ۱۰۰٪' : levers.inspectionIntensity === 'intensified_50' ? 'تشدید ۵۰٪' : 'عادی'}» در مراکز عرضه عمده و میادین شهرستان‌های پرجمعیت.
- نظارت ویژه بر تثبیت قیمت ۲۰ قلم کالای اساسی با نرخ انحراف حداکثر ۵٪.

۲. اداره کل غله و خدمات بازرگانی استان تهران:
- پایش لحظه‌ای سامانه نانینو و تثبیت روزهای پوشش سیلوها در سطح حداقل ۴۲ روز مصرف مطمئن پایتخت.
- اعمال ضریب تغییر سهمیه آرد به میزان «${levers.flourQuotaDeltaPercent >= 0 ? '+' : ''}${levers.flourQuotaDeltaPercent}٪» در شهرستان‌های پرتراکم بهارستان، قرچک و پردیس.

۳. شورای هماهنگی بانک‌های استان تهران:
- تسریع در پرداخت اعتبارات سرمایه در گردش به مبلغ «${levers.workingCapitalCreditHemmat} همت» به صنایع مستقر در شهرک‌های صنعتی شمس‌آباد، عباس‌آباد و صفادشت.

۴. ناظر گمرکات استان تهران:
- کاهش تشریفات گمرکی و ارتقای سرعت ترخیص کالاهای اساسی و نهاده‌های دامی به میزان «${levers.customsClearanceSpeedPercent >= 0 ? '+' : ''}${levers.customsClearanceSpeedPercent}٪» در گمرک شهریار و فرودگاه امام.

پیش‌بینی پیامد: کاهش شاخص تورم خوراکی به میزان ${Math.abs(foodInflationDelta)}٪ و ارتقای تاب‌آوری عرضه تا ۹۴.۵٪.

امضاء:
محمدصادق معتمدیان — استاندار تهران
دکتر حشمت‌الله عسگری — معاون هماهنگی امور اقتصادی استانداری تهران`;

  const dominoPhases = [
    {
      phase: 'phase_7d',
      timeframe: '۷ روز اول (فوری)',
      summary: 'انعکاس اولیه در صفوف میادین و نرخ تابلوی صرافی‌ها',
      effects: [
        `تغییر نوسان قیمت اقلام پروتئینی در میدان بهمن به میزان ${foodInflationDelta > 0 ? '+' : ''}${foodInflationDelta}٪`,
        `تعدیل زمان انتظار صفوف نانوایی‌ها در سطح استان به میزان ${Math.abs(Math.round(levers.flourQuotaDeltaPercent * 0.4))} دقیقه`,
        `افزایش استعلام حواله‌های ارزی در صرافی‌های مجاز میرداماد و فردوسی`,
      ],
    },
    {
      phase: 'phase_30d',
      timeframe: '۳۰ روز (کوتاه‌مدت)',
      summary: 'انتقال اثر به بهای تمام‌شده کارخانجات و ذخایر سیلوها',
      effects: [
        `کاهش یا افزایش روزهای پوشش گندم سیلوهای تهران به میزان ${wheatReserveDaysChange > 0 ? '+' : ''}${wheatReserveDaysChange} روز`,
        `نوسان در شاخص فروش خرده‌فروشی در ۲۶۲ میدان میوه و تره‌بار شهرداری`,
        `تغییر در تقاضای خطوط اعتباری سرمایه در گردش در شهرک‌های شمس‌آباد و عباس‌آباد`,
      ],
    },
    {
      phase: 'phase_90d',
      timeframe: '۹۰ روز (میان‌مدت)',
      summary: 'تثبیت نسبی و ارزیابی تراز بودجه‌ای استانداری',
      effects: [
        `تحقق درآمدهای مالیاتی فصلی استان با ضریب تغییر ${industrialOutputDeltaPercent > 0 ? '+' : ''}${industrialOutputDeltaPercent}٪`,
        `پایش میزان بازگشت کارگران فصلی در کارگاه‌های پاکدشت و شهریار`,
        `بازنگری در سهمیه آرد شهرستان‌های پرجمعیت حاشیه‌ای بر مبنای تراکنش نانینو`,
      ],
    },
    {
      phase: 'phase_1y',
      timeframe: '۱ ساله (راهبردی)',
      summary: 'تثبیت سهم ۲۰.۹۴ درصدی تهران در تولید ناخالص ملی',
      effects: [
        `تحقق نرخ رشد اقتصادی هدف‌گذاری‌شده در سند آمایش سرزمینی استان تهران`,
        `تکمیل زنجیره تامین پایدار نهاده‌ها از مبادی گمرکات فرودگاه امام و شهریار`,
        `ارتقای پایداری تاب‌آوری شهری در برابر شوک‌های بیرونی به بالای ۹۰٪`,
      ],
    },
  ];

  type CountyRisk = 'critical' | 'high' | 'medium' | 'low';

  const countyImpacts: {
    countyId: string;
    name: string;
    breadQueuingMinutesDelta: number;
    jobLossRisk: number;
    riskStatus: CountyRisk;
  }[] = [
    { countyId: 'tehran', name: 'تهران', breadQueuingMinutesDelta: Math.round(-levers.flourQuotaDeltaPercent * 0.4), jobLossRisk: Math.round(employmentRiskDeltaPercent * 120), riskStatus: foodInflationDelta > 10 ? 'high' : 'medium' },
    { countyId: 'rey', name: 'ری', breadQueuingMinutesDelta: Math.round(-levers.flourQuotaDeltaPercent * 0.5), jobLossRisk: Math.round(employmentRiskDeltaPercent * 60), riskStatus: foodInflationDelta > 8 ? 'high' : 'low' },
    { countyId: 'shemiranat', name: 'شمیرانات', breadQueuingMinutesDelta: Math.round(-levers.flourQuotaDeltaPercent * 0.2), jobLossRisk: 10, riskStatus: 'low' },
    { countyId: 'damavand', name: 'دماوند', breadQueuingMinutesDelta: Math.round(-levers.flourQuotaDeltaPercent * 0.3), jobLossRisk: 25, riskStatus: 'low' },
    { countyId: 'firuzkuh', name: 'فیروزکوه', breadQueuingMinutesDelta: Math.round(-levers.flourQuotaDeltaPercent * 0.2), jobLossRisk: 15, riskStatus: 'low' },
    { countyId: 'varamin', name: 'ورامین', breadQueuingMinutesDelta: Math.round(-levers.flourQuotaDeltaPercent * 0.6), jobLossRisk: Math.round(employmentRiskDeltaPercent * 45), riskStatus: levers.waterStressPercent > 20 ? 'critical' : 'high' },
    { countyId: 'eslamshahr', name: 'اسلامشهر', breadQueuingMinutesDelta: Math.round(-levers.flourQuotaDeltaPercent * 0.7), jobLossRisk: Math.round(employmentRiskDeltaPercent * 50), riskStatus: foodInflationDelta > 10 ? 'critical' : 'high' },
    { countyId: 'robatkarim', name: 'رباط‌کریم', breadQueuingMinutesDelta: Math.round(-levers.flourQuotaDeltaPercent * 0.5), jobLossRisk: Math.round(employmentRiskDeltaPercent * 35), riskStatus: 'medium' },
    { countyId: 'pakdasht', name: 'پاکدشت', breadQueuingMinutesDelta: Math.round(-levers.flourQuotaDeltaPercent * 0.6), jobLossRisk: Math.round(employmentRiskDeltaPercent * 80), riskStatus: levers.powerCurtailmentPercent > 20 ? 'critical' : 'high' },
    { countyId: 'shahriar', name: 'شهریار', breadQueuingMinutesDelta: Math.round(-levers.flourQuotaDeltaPercent * 0.6), jobLossRisk: Math.round(employmentRiskDeltaPercent * 55), riskStatus: 'high' },
    { countyId: 'qods', name: 'قدس', breadQueuingMinutesDelta: Math.round(-levers.flourQuotaDeltaPercent * 0.6), jobLossRisk: Math.round(employmentRiskDeltaPercent * 40), riskStatus: 'high' },
    { countyId: 'malard', name: 'ملارد', breadQueuingMinutesDelta: Math.round(-levers.flourQuotaDeltaPercent * 0.7), jobLossRisk: Math.round(employmentRiskDeltaPercent * 45), riskStatus: foodInflationDelta > 8 ? 'critical' : 'high' },
    { countyId: 'baharestan', name: 'بهارستان', breadQueuingMinutesDelta: Math.round(-levers.flourQuotaDeltaPercent * 0.8), jobLossRisk: Math.round(employmentRiskDeltaPercent * 50), riskStatus: foodInflationDelta > 8 ? 'critical' : 'high' },
    { countyId: 'pardis', name: 'پردیس', breadQueuingMinutesDelta: Math.round(-levers.flourQuotaDeltaPercent * 0.5), jobLossRisk: Math.round(employmentRiskDeltaPercent * 30), riskStatus: 'medium' },
    { countyId: 'pishva', name: 'پیشوا', breadQueuingMinutesDelta: Math.round(-levers.flourQuotaDeltaPercent * 0.5), jobLossRisk: Math.round(employmentRiskDeltaPercent * 25), riskStatus: levers.waterStressPercent > 20 ? 'critical' : 'medium' },
    { countyId: 'qarchak', name: 'قرچک', breadQueuingMinutesDelta: Math.round(-levers.flourQuotaDeltaPercent * 0.6), jobLossRisk: Math.round(employmentRiskDeltaPercent * 35), riskStatus: 'high' },
  ];

  const riskLevel: 'critical' | 'high' | 'medium' | 'low' =
    foodInflationDelta > 15 ? 'critical' :
    foodInflationDelta > 8 ? 'high' :
    foodInflationDelta > 3 ? 'medium' : 'low';

  return {
    headline: foodInflationDelta <= 0
      ? 'سناریوی باثبات‌کننده بازار و حمایت از تولید'
      : 'سناریوی دارای ریسک تورمی و نیازمند اقدامات حمایتی مکمل',
    overallScoreChange: Number((publicSatisfactionDelta - foodInflationDelta).toFixed(1)),
    foodInflationDelta,
    inflationDelta: foodInflationDelta,
    goodsAvailabilityDelta,
    wheatReserveDaysChange,
    industrialOutputDeltaPercent,
    industryGdpDelta: industrialOutputDeltaPercent,
    employmentRiskDeltaPercent,
    publicSatisfactionDelta,
    budgetDeficitDeltaHemmat,
    fiscalCostBillionTomans: Math.round(budgetDeficitDeltaHemmat * 1000),
    jobLossRiskCount: Math.max(0, Math.round(employmentRiskDeltaPercent * 450)),
    breadQueuingMinutes: Math.max(15, Math.round(22 - levers.flourQuotaDeltaPercent * 0.5 + levers.seasonalDemandShockPercent * 0.2)),
    socialDiscontentScore: Math.max(10, Math.min(100, Math.round(45 - publicSatisfactionDelta * 3 + foodInflationDelta * 1.5))),
    riskLevel,
    smugglingRiskScore,
    cascadingImpacts,
    dominoPhases,
    countyImpactMap,
    countyImpacts,
    policyResolutionDraft,
  };
}

export type ScenarioImpact = ReturnType<typeof calculateScenarioImpact>;
export type { PolicyLevers };

export interface LeverDefinition {
  key: keyof PolicyLevers;
  label: string;
  min: number;
  max: number;
  step: number;
  unit: string;
  icon: string;
  description: string;
}

export const LEVER_DEFINITIONS: LeverDefinition[] = [
  {
    key: 'flourQuotaDeltaPercent',
    label: 'سهمیه آرد نانوایی‌های استان',
    min: -30,
    max: 30,
    step: 5,
    unit: '٪',
    icon: '🌾',
    description: 'تغییر سهمیه آرد تخصیصی به نانوایی‌های دولتی و آزادپز بر بستر سامانه نانینو',
  },
  {
    key: 'marketInjectionTons',
    label: 'تزریق ذخایر مرغ، گوشت و روغن',
    min: 0,
    max: 5000,
    step: 250,
    unit: 'تن',
    icon: '📦',
    description: 'عرضه مستقیم کالاهای اساسی در ۲۶۲ بازار و میدان میوه و تره‌بار شهرداری تهران',
  },
  {
    key: 'powerCurtailmentPercent',
    label: 'محدودیت دیماند برق شهرک‌ها',
    min: 0,
    max: 60,
    step: 5,
    unit: '٪',
    icon: '⚡',
    description: 'سهمیه‌بندی و کاهش بار مصرفی صنایع در شهرک‌های شمس‌آباد، عباس‌آباد و صفادشت',
  },
  {
    key: 'fxShockPercent',
    label: 'شوک نرخ ارز در بازار آزاد',
    min: -10,
    max: 80,
    step: 5,
    unit: '٪',
    icon: '💵',
    description: 'نوسان نرخ ارز بازار آزاد و اثر انتقال قیمت بر اقلام پروتئینی و خوراکی پایتخت',
  },
  {
    key: 'workingCapitalCreditHemmat',
    label: 'سرمایه در گردش بانکی',
    min: 0,
    max: 100,
    step: 5,
    unit: 'همت',
    icon: '🏦',
    description: 'تسهیلات تکلیفی تبصره ۱۸ و سرمایه در گردش شورای هماهنگی بانک‌های تهران',
  },
  {
    key: 'customsClearanceSpeedPercent',
    label: 'تسریع ترخیص گمرکات تهران',
    min: -40,
    max: 60,
    step: 5,
    unit: '٪',
    icon: '🛃',
    description: 'پنجره واحد گمرکی در گمرک فرودگاه امام (ره) و گمرک غرب تهران (شهریار)',
  },
  {
    key: 'waterStressPercent',
    label: 'تنش و افت دبی آب کشاورزی',
    min: 0,
    max: 50,
    step: 5,
    unit: '٪',
    icon: '💧',
    description: 'کاهش حقابه زراعی دشت‌های ورامین، ری و پیشوا از تصفیه‌خانه جنوب تهران',
  },
  {
    key: 'kalabargCreditDeltaPercent',
    label: 'اعتبار کالابرگ الکترونیک خانوار',
    min: 0,
    max: 80,
    step: 10,
    unit: '٪',
    icon: '💳',
    description: 'شارژ اعتباری یارانه فجرانه برای دهک‌های ۱ تا ۷ در فروشگاه‌های متصل استان تهران',
  },
  {
    key: 'assetMonetizationHemmat',
    label: 'مولدسازی دارایی‌های راکد دولت',
    min: 0,
    max: 50,
    step: 5,
    unit: 'همت',
    icon: '🏢',
    description: 'فروش و تهاتر املاک مازاد ادارات کل جهت تامین مالی طرح‌های نیمه‌تمام استان',
  },
  {
    key: 'seasonalDemandShockPercent',
    label: 'شوک تقاضای فصلی پایتخت',
    min: -10,
    max: 40,
    step: 5,
    unit: '٪',
    icon: '📈',
    description: 'افزایش پیک مصرف میوه، پروتئین و خواروبار در مقاطع اوج تقاضای تهران',
  },
  {
    key: 'freightTariffDeltaPercent',
    label: 'تعرفه ناوگان حمل‌ونقل و باربری',
    min: -10,
    max: 50,
    step: 5,
    unit: '٪',
    icon: '🚚',
    description: 'کرایه پایانه بار نسیم‌شهر و هزینه حمل کالاهای ورودی از مبادی جنوب به پایتخت',
  },
];

export function generateGovernorateDecree(levers: PolicyLevers, impact?: any): string {
  if (impact && impact.policyResolutionDraft) {
    return impact.policyResolutionDraft;
  }
  const calc = calculateScenarioImpact(levers);
  return calc.policyResolutionDraft;
}
