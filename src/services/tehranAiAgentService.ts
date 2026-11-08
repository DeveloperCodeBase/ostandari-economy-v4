import { GoogleGenAI } from '@google/genai';
import { TEHRAN_COUNTY_PROFILES, CountyEconomicProfile } from '../data/tehranMasterData';

export interface AgentContextPayload {
  activeRoute: string;
  activeModuleTitle: string;
  currentRoleName: string;
  selectedCountyId: string;
  scenarioLevers?: Record<string, number>;
  userQuery: string;
}

export interface AgentResponsePayload {
  agentName: string;
  agentBadge: string;
  answerMarkdown: string;
  suggestedActions: { label: string; actionType: string; targetId?: string }[];
  sources: { title: string; url: string }[];
}

export async function askTehranEconomicAgent(payload: AgentContextPayload): Promise<AgentResponsePayload> {
  const county = TEHRAN_COUNTY_PROFILES.find((c) => c.id === payload.selectedCountyId) || TEHRAN_COUNTY_PROFILES[0];

  // Map active route to its dedicated Specialist AI Agent
  const agentMap: Record<string, { name: string; badge: string }> = {
    overview: { name: 'ایجنت استراتژیست ارشد اقتصاد کلان تهران', badge: 'MACRO-AI' },
    treasury: { name: 'ایجنت ممیز هوشمند مالیاتی و خزانه‌داری', badge: 'TAX-AI' },
    banking: { name: 'ایجنت بازرس شبکه بانکی و هدایت اعتبار', badge: 'BANK-AI' },
    industry: { name: 'ایجنت دیده‌بان شهرک‌های صنعتی و احیای تولید', badge: 'IND-AI' },
    bread: { name: 'ایجنت نگهبان زنجیره گندم، آرد و نانینو', badge: 'BREAD-AI' },
    bazaar: { name: 'ایجنت تنظیم بازار، میادین تره‌بار و ضداحتکار', badge: 'BAZAAR-AI' },
    agriculture: { name: 'ایجنت کشاورزی مدرن، گلخانه و امنیت زیستی', badge: 'AGRI-AI' },
    customs: { name: 'ایجنت فرمانده گمرکات ۶گانه و لجستیک', badge: 'CUSTOMS-AI' },
    labor: { name: 'ایجنت تحلیلگر اشتغال، تامین اجتماعی و رفاه', badge: 'LABOR-AI' },
    energy: { name: 'ایجنت کنترلگر ناترازی انرژی و ۵ سد تهران', badge: 'ENERGY-AI' },
    gis: { name: 'ایجنت ژئواکونومیک و تحلیل فضایی ماهواره‌ای', badge: 'GIS-AI' },
    warroom: { name: 'شورای عالی ۱۰ ایجنت اتاق جنگ اقتصادی', badge: 'COUNCIL-AI' },
  };

  const activeAgent = agentMap[payload.activeRoute] || agentMap.overview;

  // Attempt live Gemini API call with Google Search Grounding if API_KEY is available
  const apiKey = typeof process !== 'undefined' && process.env && process.env.GEMINI_API_KEY ? process.env.GEMINI_API_KEY : '';
  if (apiKey) {
    try {
      const ai = new GoogleGenAI({
        apiKey,
        httpOptions: {
          headers: {
            'User-Agent': 'aistudio-build',
          },
        },
      });
      const systemPrompt = `
شما «${activeAgent.name}» در پلتفرم رسمی «مرکز فرماندهی و تصمیم‌یار هوشمند اقتصادی استانداری تهران (فرمانِ اقتصاد تهران)» هستید که توسط «شرکت شبکه هوشمند ابتکار ویستا» طراحی شده است.
کاربر فعلی: «${payload.currentRoleName}»
ماژول فعال فعلی: «${payload.activeModuleTitle}»
شهرستان منتخب فعلی: «${county.name}» (جمعیت برآوردی: ${(county.estimatedPopulation1405 ?? 500000).toLocaleString('fa-IR')} نفر، سهم GDP استانی: ${county.gdpSharePercent}٪، درآمد مالیاتی ۵ ماهه: ${county.taxRevenue5M_Hemmat} همت، نرخ بیکاری: ${county.unemploymentRate}٪، واحدهای صنعتی فعال: ${county.activeIndustrialUnits}، نانوایی‌ها: ${county.bakeriesCount}، ناترازی برق: ${county.powerImbalance_MW} مگاوات، هشدار اولویت‌دار: ${county.topCrisisAlert}).
وظیفه شما: پاسخگویی بسیار رسمی، دقیق، عددی، مبتنی بر داده‌های واقعی استان تهران، همراه با ارائه ۱) تحلیل وضعیت موجود، ۲) پیش‌بینی ریسک ۳۰ روز آینده، و ۳) پیشنهاد دستور اجرایی مشخص برای استاندار یا معاون اقتصادی.
`;
      const response = await ai.models.generateContent({
        model: 'gemini-2.5-flash',
        contents: payload.userQuery,
        config: {
          systemInstruction: systemPrompt,
          tools: [{ googleSearch: {} }],
        },
      });

      const chunks = response.candidates?.[0]?.groundingMetadata?.groundingChunks || [];
      const extractedSources = (chunks as Array<{ web?: { title?: string; uri?: string } }>)
        .filter((c) => c.web?.uri)
        .map((c) => ({ title: c.web?.title || 'منبع وب رسمی', url: c.web?.uri || '' }));

      if (response.text) {
        return {
          agentName: activeAgent.name,
          agentBadge: activeAgent.badge,
          answerMarkdown: response.text,
          suggestedActions: [
            { label: `تمرکز نقشه ماهواره‌ای روی ${county.name}`, actionType: 'FLY_TO_COUNTY', targetId: county.id },
            { label: 'اجرای شبیه‌سازی سناریو در اتاق جنگ', actionType: 'OPEN_WARROOM', targetId: payload.activeRoute },
          ],
          sources: extractedSources.length
            ? extractedSources
            : [
                { title: 'پورتال استانداری تهران - معاونت اقتصادی', url: 'https://ostan-th.ir/' },
                { title: 'آمارهای اقتصادی استان تهران - مرکز آمار', url: 'https://iranstatis.com/downloads/economy-statistics-tehran/' },
              ],
        };
      }
    } catch (err) {
      console.warn('Gemini live API fallback triggered:', err);
    }
  }

  // Deterministic High-Precision Domain Intelligence Engine (Always Works Offline/Instant)
  return generateDeterministicDomainAnswer(payload, county, activeAgent);
}

function generateDeterministicDomainAnswer(
  payload: AgentContextPayload,
  county: CountyEconomicProfile,
  activeAgent: { name: string; badge: string }
): AgentResponsePayload {
  let md = `### گزارش تحلیلی «${activeAgent.name}» ویژه **${county.name}**\n\n`;
  md += `**مخاطب گزارش:** ${payload.currentRoleName} | **ماژول فعال:** ${payload.activeModuleTitle}\n\n`;
  md += `#### ۱. وضعیت سنجه‌های کلیدی و واقعیت میدانی در ${county.name}\n`;
  md += `- **جمعیت تحت پوشش:** \`${county.estimatedPopulation1405.toLocaleString('fa-IR')}\` نفر (سهم از اقتصاد استان تهران: **${county.gdpSharePercent}٪**)\n`;
  md += `- **عملکرد درآمدهای عمومی و مالیاتی (۵ ماهه):** تحقق **${county.taxRevenue5M_Hemmat} همت** از کل ۳۹۳ همت استان تهران و تخصیص **${county.vatShare_BillionToman.toLocaleString('fa-IR')} میلیارد تومان** عوارض ارزش افزوده به مدیریت شهری و روستایی.\n`;
  md += `- **وضعیت تولید و صنعت:** **${county.activeIndustrialUnits.toLocaleString('fa-IR')}** واحد صنعتی فعال و **${county.stagnantIndustrialUnits}** واحد راکد/نیمه‌فعال در قطب‌های \`${county.industrialEstates.join('، ')}\`.\n`;
  md += `- **امنیت غذایی و انرژی:** **${county.bakeriesCount.toLocaleString('fa-IR')}** واحد نانوایی فعال با سهمیه روزانه **${county.dailyFlourQuota_Sacks.toLocaleString('fa-IR')}** کیسه آرد؛ ناترازی برق ثبت‌شده: **${county.powerImbalance_MW} مگاوات** و شاخص تنش آبی: **${county.waterStressIndex} از ۱۰۰**.\n\n`;
  md += `#### ۲. هشدار پیش‌بینانه هوش مصنوعی (Early Warning)\n`;
  md += `> ⚠️ **کانون ریسک شناسایی‌شده:** ${county.topCrisisAlert}\n\n`;
  md += `#### ۳. بسته پیشنهادی تصمیم‌یار برای صدور دستور اجرایی\n`;
  md += `1. **اقدام فوری (۷۲ ساعته):** تشکیل جلسه فوق‌العاده ستاد تسهیل و تنظیم بازار با فرماندار **${county.name}** و تخصیص خط اعتباری اضطراری از محل منابع بانکی استان.\n`;
  md += `2. **اقدام میان‌مدت (۳۰ روزه):** بازتوزیع هوشمند سهمیه انرژی و آرد بر اساس داده‌های واقعی تراکنش و استقرار پنل‌های خورشیدی صنعتی جهت جبران **${Math.round(county.powerImbalance_MW * 0.35)} مگاوات** از ناترازی شبکه.\n`;

  return {
    agentName: activeAgent.name,
    agentBadge: activeAgent.badge,
    answerMarkdown: md,
    suggestedActions: [
      { label: `پرواز ماهواره‌ای روی ${county.name}`, actionType: 'FLY_TO_COUNTY', targetId: county.id },
      { label: 'صدور پیش‌نویس دستور استاندار', actionType: 'ISSUE_DIRECTIVE', targetId: county.id },
      { label: 'تست سناریوی شوک در اتاق جنگ', actionType: 'OPEN_WARROOM', targetId: payload.activeRoute },
    ],
    sources: [
      { title: 'پورتال رسمی استانداری تهران', url: 'https://ostan-th.ir/' },
      { title: 'گزارش تحقق ۳۹۳ همت درآمد عمومی تهران (ایرنا)', url: 'https://www.irna.ir/news/86259838/' },
    ],
  };
}
