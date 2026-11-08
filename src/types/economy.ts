export type GovernorateType = 'مرکز استان' | 'فرمانداری ویژه' | 'فرمانداری عادی';

export type TehranZone = 
  | 'پهنه مرکزی'
  | 'پهنه غرب'
  | 'پهنه جنوب‌غرب'
  | 'پهنه جنوب‌شرق'
  | 'پهنه شمال‌شرق و شمال';

export type RiskLevel = 'normal' | 'warning' | 'critical' | 'safe';

export interface CountyData {
  id: string;
  nameFa: string;
  name?: string;
  governorateType: GovernorateType;
  zone: TehranZone;
  lat?: number;
  lng?: number;
  population1395: number;
  population1405Est: number;
  estimatedPopulation1405?: number;
  gdpShareInProvince: number;
  gdpSharePercent?: number;
  unemploymentRate: number;
  inflationPoint: number;
  activeIndustrialUnits: number;
  semiActiveUnits: number;
  inactiveUnits: number;
  stagnantIndustrialUnits?: number;
  industrialEstates: string[];
  keyEconomicSectors: string[];
  keyEconomicPoles?: string[];
  strategicProducts: string[];
  dailyFlourQuotaTons: number;
  dailyFlourQuota_Sacks?: number;
  activeBakeries: number;
  bakeriesCount?: number;
  wheatProductionTons: number;
  greenhouseAreaHectares: number;
  greenhouseArea_Hectares?: number;
  agriculturalOutput_Tons?: number;
  bankBranches: number;
  loanToDepositRatio: number;
  riskLevel: RiskLevel;
  topRiskFactor: string;
  topCrisisAlert?: string;
  coordinates: { x: number; y: number };
  taxRevenue5M_Hemmat?: number;
  vatShare_BillionToman?: number;
  employmentTarget1405?: number;
  employmentRealizedPercent?: number;
  powerImbalance_MW?: number;
  waterStressIndex?: number;
  glowColor?: string;
  washColor?: string;
  governorRoleTitle?: string;
}

export interface CountyEconomicProfile {
  id: string;
  name: string;
  nameFa?: string;
  governorateType: string;
  governorRoleTitle: string;
  lat: number;
  lng: number;
  population1395: number;
  estimatedPopulation1405: number;
  gdpSharePercent: number;
  taxRevenue5M_Hemmat: number;
  vatShare_BillionToman: number;
  unemploymentRate: number;
  employmentTarget1405: number;
  employmentRealizedPercent: number;
  activeIndustrialUnits: number;
  stagnantIndustrialUnits: number;
  bakeriesCount: number;
  dailyFlourQuota_Sacks: number;
  greenhouseArea_Hectares: number;
  agriculturalOutput_Tons: number;
  powerImbalance_MW: number;
  waterStressIndex: number;
  keyEconomicPoles: string[];
  industrialEstates: string[];
  topCrisisAlert: string;
  glowColor: string;
  washColor: string;
}

export interface DamData {
  id: string;
  name: string;
  river: string;
  totalCapacity_MCM: number;
  currentVolume_MCM: number;
  lastYearVolume_MCM: number;
  fillPercent: number;
  targetZones: string;
  lat: number;
  lng: number;
  status: string;
}

export interface CustomsHubData {
  id: string;
  name: string;
  type: string;
  clearanceTime_Days: number;
  containersInQueue: number;
  monthlyImport_MUSD: number;
  monthlyExport_MUSD: number;
  mainGoods: string;
  lat: number;
  lng: number;
  capacityPercent: number;
}

export interface EssentialGoodBazaarData {
  id: string;
  name: string;
  govApprovedPrice_Toman: number;
  tarabarPrice_Toman: number;
  freeMarketPrice_Toman: number;
  dailySupply_Tons: number;
  strategicReserve_Days: number;
  status: string;
}

export interface ProvinceBaseline {
  provinceName: string;
  capital: string;
  governorName: string;
  economicDeputyName: string;
  areaKm2: number;
  countiesCount: number;
  specialGovernoratesCount: number;
  districtsCount: number;
  citiesCount: number;
  ruralDistrictsCount: number;
  population1395: number;
  households1395: number;
  urbanizationRate: number;
  population1405Est: number;
  gdpNationalSharePercent: number;
  industryNationalSharePercent: number;
  transportLogisticsNationalSharePercent: number;
  agricultureNationalSharePercent: number;
  bankingDepositsNationalSharePercent: number;
  bankingFacilitiesNationalSharePercent: number;
  publicRevenue5Months1405Hemmat: number;
  publicRevenueGrowthPercent: number;
  vatRevenue5Months1405Hemmat: number;
  eastTehranMarkedTaxBillionToman: number;
  inflationPoint1405Percent: number;
  unemploymentRatePercent: number;
  femaleLaborParticipationPercent: number;
  activeIndustrialUnitsTotal: number;
  activeGuildUnitsTotal: number;
  activeBakeriesTotal: number;
  greenhouseTotalHectares: number;
  strategicWheatReserveDays: number;
}

export interface OfficialRole {
  id: string;
  category: 'مقامات عالی ستادی استانداری' | 'مدیران کل دستگاه‌های اجرایی' | 'فرمانداران ۱۶ شهرستان';
  title: string;
  titleFa?: string;
  officialName: string;
  nameFa?: string;
  username: string;
  avatarSeed: string;
  geographicScope: 'کل استان تهران' | string;
  scope?: string;
  countyId?: string;
  accessLevel: 'فرماندهی عالی کلان' | 'تخصصی دستگاهی' | 'شهرستانی و منطقه‌ای' | string;
  mandate: string;
  topModules: string[];
  assignedAgents?: string[];
}

export interface AIAgentInfo {
  code: string;
  id?: string;
  nameFa: string;
  name?: string;
  titleFa: string;
  role?: string;
  roleDescription: string;
  supervisedModules: string[];
  primaryMetrics: string[];
  capabilities: string[];
  color: string;
  avatarIcon: string;
  icon?: string;
  domain?: string;
}

export interface KPICardData {
  id: string;
  title: string;
  value: number | string;
  unit: string;
  changeRate: number;
  period: string;
  source: string;
  provenanceLevel: 'A' | 'B' | 'C' | 'D';
  status: 'safe' | 'warning' | 'danger';
  sparkline?: number[];
  formula?: string;
  agentInsight?: string;
  prediction90d?: string;
  isSimulated?: boolean;
}

export interface EssentialGoodItem {
  id: string;
  name: string;
  category: 'غلات و نان' | 'پروتئین' | 'روغن و قند' | 'لبنیات' | 'میوه و صیفی';
  regulatedPrice: number;
  mayadinPrice: number;
  openMarketPrice: number;
  spreadPercent: number;
  unit: string;
  stockDays: number;
  dailyConsumptionTons: number;
  weeklyTrendPercent: number;
  status: RiskLevel;
  countySpreads?: Record<string, number>;
}

export interface IndustrialParkDetail {
  id: string;
  name: string;
  countyId: string;
  areaHectares: number;
  activeFactories: number;
  semiActiveFactories: number;
  inactiveFactories: number;
  employmentTotal: number;
  powerDemandMw: number;
  powerDeficitMw: number;
  waterSupplyLps: number;
  treatmentPlantStatus: 'مطلوب' | 'نیازمند ارتقاء' | 'بحرانی';
  keyIndustries: string[];
  aiObstacleIntervention: string;
}

export interface CustomsData {
  id: string;
  name: string;
  clearanceTimeDays: number;
  importVolumeThousandTons: number;
  exportVolumeThousandTons: number;
  overdueGoodsCount: number;
  customsDutyBillionToman: number;
  status: 'active' | 'congested' | 'delayed';
}

export interface DirectiveItem {
  id: string;
  subject: string;
  committee: 'ستاد تنظیم بازار' | 'کارگروه تسهیل و رفع موانع تولید' | 'شورای برنامه‌ریزی و توسعه';
  assignedAuthority: string;
  dueDate: string;
  status: 'pending' | 'in_progress' | 'completed' | 'delayed';
  progressPercent: number;
  lastAction: string;
}

export interface AlertItem {
  id: string;
  level: 1 | 2 | 3; // 1: critical, 2: warning, 3: info
  title: string;
  category: string;
  countyId?: string;
  timestamp: string;
  description: string;
  suggestedAction: string;
  agentCode: string;
  status: 'active' | 'acknowledged' | 'resolved';
}

export interface PolicyLevers {
  flourQuotaDeltaPercent: number; // -30 to +50
  marketInjectionTons: number; // 0 to 10000
  powerCurtailmentPercent: number; // 0 to 60
  fxShockPercent: number; // -20 to +80
  workingCapitalCreditHemmat: number; // 0 to 200
  inspectionIntensity: 'normal' | 'intensified_50' | 'strike_100';
  customsClearanceSpeedPercent: number; // -50 to +100
  waterStressPercent: number; // 0 to -50
  kalabargCreditDeltaPercent: number; // 0 to 100
  assetMonetizationHemmat: number; // 0 to 100
  seasonalDemandShockPercent: number; // -10 to +40
  freightTariffDeltaPercent: number; // 0 to 60
}

export interface ScenarioImpactResult {
  headline: string;
  overallScoreChange: number;
  foodInflationDelta: number;
  goodsAvailabilityDelta: number;
  wheatReserveDaysChange: number;
  industrialOutputDeltaPercent: number;
  employmentRiskDeltaPercent: number;
  publicSatisfactionDelta: number;
  budgetDeficitDeltaHemmat: number;
  smugglingRiskScore: number;
  cascadingImpacts: {
    phase: '۷ روزه (فوری)' | '۳۰ روزه (کوتاه‌مدت)' | '۹۰ روزه (میان‌مدت)' | '۱ ساله (راهبردی)';
    title: string;
    description: string;
    probability: number;
    severity: 'positive' | 'warning' | 'negative';
  }[];
  countyImpactMap: Record<string, {
    deltaInflation: number;
    deltaSupplyIndex: number;
    sentiment: 'beneficiary' | 'neutral' | 'vulnerable';
    briefNote: string;
  }>;
  policyResolutionDraft: string;
  inflationDelta: number;
  industryGdpDelta: number;
  breadQueuingMinutes: number;
  socialDiscontentScore: number;
  riskLevel: 'critical' | 'high' | 'medium' | 'low';
  fiscalCostBillionTomans: number;
  jobLossRiskCount: number;
  dominoPhases: {
    phase: string;
    timeframe: string;
    summary: string;
    effects: string[];
  }[];
  countyImpacts: {
    countyId: string;
    name: string;
    breadQueuingMinutesDelta: number;
    jobLossRisk: number;
    riskStatus: 'critical' | 'high' | 'medium' | 'low';
  }[];
}
