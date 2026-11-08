'use client';

import React, { useState } from 'react';
import { TEHRAN_16_COUNTIES } from '@/src/data/tehranMasterData';
import { CountyData } from '@/src/types/economy';
import { toPersianDigits, formatPersianNumber } from '@/src/utils/formatters';
import { useCommand } from '@/src/context/CommandContext';
import { MapPin, Factory, Wheat, Users, AlertTriangle, Globe, Eye, Mountain, Compass, ZoomIn, ZoomOut } from 'lucide-react';

export type MapLayer = 'industry' | 'market' | 'agriculture' | 'labor' | 'risk';
export type MapViewMode = 'satellite' | 'cyber' | 'topo';

// SVG relative geographical boundaries of the 16 Tehran counties
const COUNTY_PATHS: Record<string, string> = {
  // North / Mountainous
  shemiranat: 'M 400 120 L 490 100 L 580 150 L 550 240 L 450 250 L 390 200 Z',
  firuzkuh: 'M 720 130 L 880 110 L 920 220 L 850 320 L 730 300 L 700 210 Z',
  damavand: 'M 560 210 L 720 200 L 750 310 L 680 410 L 570 380 L 530 290 Z',
  pardis: 'M 500 280 L 580 270 L 600 360 L 520 380 L 480 340 Z',
  // Central
  tehran: 'M 360 270 L 490 260 L 520 370 L 470 450 L 370 440 L 340 350 Z',
  rey: 'M 360 450 L 480 450 L 540 550 L 480 720 L 340 680 L 330 530 Z',
  // West
  qods: 'M 290 310 L 350 300 L 360 370 L 300 380 Z',
  shahriar: 'M 220 330 L 300 320 L 320 450 L 230 460 L 190 390 Z',
  malard: 'M 110 320 L 220 330 L 220 460 L 150 510 L 90 420 Z',
  // South-West
  eslamshahr: 'M 310 440 L 380 430 L 390 530 L 320 540 Z',
  baharestan: 'M 260 490 L 330 480 L 340 560 L 270 570 Z',
  robatkarim: 'M 190 470 L 270 470 L 280 600 L 190 620 L 160 540 Z',
  // South-East
  pakdasht: 'M 510 420 L 650 400 L 680 540 L 570 560 L 490 480 Z',
  qarchak: 'M 490 510 L 560 500 L 570 580 L 500 590 Z',
  varamin: 'M 530 570 L 670 540 L 730 710 L 550 780 L 480 680 Z',
  pishva: 'M 640 590 L 730 580 L 770 700 L 670 720 Z',
};

// Elevation landmarks
const LANDMARKS = [
  { name: 'قله دماوند (۵٬۶۱۰ متر)', x: 670, y: 240, type: 'peak' },
  { name: 'ارتفاعات توچال (۳٬۹۶۴ متر)', x: 440, y: 150, type: 'peak' },
  { name: 'فرودگاه امام خمینی (ره)', x: 250, y: 550, type: 'airport' },
  { name: 'سیلوی بزرگ گندم ری', x: 420, y: 510, type: 'silo' },
  { name: 'شهرک صنعتی شمس‌آباد', x: 380, y: 640, type: 'industrial' },
  { name: 'دشت گلخانه‌ای ورامین', x: 620, y: 640, type: 'agriculture' },
];

interface Props {
  onSelectCounty?: (county: CountyData) => void;
  activeLayer?: MapLayer;
  showLayerControls?: boolean;
  interactive?: boolean;
  compact?: boolean;
  defaultViewMode?: MapViewMode;
}

export function TehranInteractiveMap({
  onSelectCounty,
  activeLayer: externalLayer,
  showLayerControls = true,
  interactive = true,
  compact = false,
  defaultViewMode = 'satellite',
}: Props) {
  const { selectedCountyId, setSelectedCountyId } = useCommand();
  const [internalLayer, setInternalLayer] = useState<MapLayer>('industry');
  const [viewMode, setViewMode] = useState<MapViewMode>(defaultViewMode);
  const [hoveredCounty, setHoveredCounty] = useState<CountyData | null>(null);
  const [zoomLevel, setZoomLevel] = useState(1);

  const layer = externalLayer || internalLayer;

  const getCountyColor = (county: CountyData, isSelected: boolean, isHovered: boolean) => {
    if (viewMode === 'satellite') {
      if (isSelected) {
        return { fill: 'rgba(56, 189, 248, 0.45)', stroke: '#38BDF8', strokeWidth: 3.5 };
      }
      if (isHovered) {
        return { fill: 'rgba(167, 139, 250, 0.4)', stroke: '#A78BFA', strokeWidth: 2.8 };
      }
      return { fill: 'rgba(15, 28, 48, 0.55)', stroke: 'rgba(148, 163, 184, 0.45)', strokeWidth: 1.2 };
    }

    if (viewMode === 'topo') {
      if (isSelected) return { fill: 'rgba(16, 185, 129, 0.45)', stroke: '#34D399', strokeWidth: 3 };
      if (isHovered) return { fill: 'rgba(56, 189, 248, 0.35)', stroke: '#38BDF8', strokeWidth: 2.2 };
      // Topo coloring based on elevation zone
      if (county.id === 'damavand' || county.id === 'firuzkuh' || county.id === 'shemiranat') {
        return { fill: 'rgba(180, 83, 9, 0.35)', stroke: '#D97706', strokeWidth: 1.5 };
      }
      if (county.id === 'tehran' || county.id === 'pardis') {
        return { fill: 'rgba(161, 98, 7, 0.28)', stroke: '#B45309', strokeWidth: 1.2 };
      }
      return { fill: 'rgba(16, 185, 129, 0.22)', stroke: '#10B981', strokeWidth: 1 };
    }

    // Cyber Mode
    if (isSelected) {
      return { fill: 'rgba(139, 92, 246, 0.5)', stroke: '#C084FC', strokeWidth: 3 };
    }
    if (isHovered) {
      return { fill: 'rgba(6, 182, 212, 0.4)', stroke: '#22D3EE', strokeWidth: 2.5 };
    }

    switch (layer) {
      case 'industry':
        if (county.activeIndustrialUnits > 1800) return { fill: 'rgba(139, 92, 246, 0.35)', stroke: '#8B5CF6', strokeWidth: 1.5 };
        if (county.activeIndustrialUnits > 600) return { fill: 'rgba(99, 102, 241, 0.25)', stroke: '#6366F1', strokeWidth: 1.2 };
        return { fill: 'rgba(30, 41, 59, 0.7)', stroke: '#475569', strokeWidth: 1 };

      case 'market':
        if (county.riskLevel === 'critical') return { fill: 'rgba(244, 63, 94, 0.35)', stroke: '#F43F5E', strokeWidth: 1.8 };
        if (county.riskLevel === 'warning') return { fill: 'rgba(245, 158, 11, 0.3)', stroke: '#F59E0B', strokeWidth: 1.4 };
        return { fill: 'rgba(16, 185, 129, 0.25)', stroke: '#10B981', strokeWidth: 1 };

      case 'agriculture':
        if (county.greenhouseAreaHectares > 400 || county.wheatProductionTons > 30000)
          return { fill: 'rgba(16, 185, 129, 0.38)', stroke: '#10B981', strokeWidth: 1.5 };
        if (county.wheatProductionTons > 10000)
          return { fill: 'rgba(20, 184, 166, 0.25)', stroke: '#14B8A6', strokeWidth: 1.2 };
        return { fill: 'rgba(30, 41, 59, 0.7)', stroke: '#475569', strokeWidth: 1 };

      case 'labor':
        if (county.population1405Est > 700000) return { fill: 'rgba(6, 182, 212, 0.35)', stroke: '#06B6D4', strokeWidth: 1.5 };
        if (county.population1405Est > 300000) return { fill: 'rgba(59, 130, 246, 0.25)', stroke: '#3B82F6', strokeWidth: 1.2 };
        return { fill: 'rgba(30, 41, 59, 0.7)', stroke: '#475569', strokeWidth: 1 };

      case 'risk':
        if (county.riskLevel === 'critical') return { fill: 'rgba(244, 63, 94, 0.4)', stroke: '#F43F5E', strokeWidth: 1.8 };
        if (county.riskLevel === 'warning') return { fill: 'rgba(245, 158, 11, 0.3)', stroke: '#F59E0B', strokeWidth: 1.4 };
        return { fill: 'rgba(51, 65, 85, 0.6)', stroke: '#64748B', strokeWidth: 1 };

      default:
        return { fill: 'rgba(30, 41, 59, 0.7)', stroke: '#475569', strokeWidth: 1 };
    }
  };

  const handleCountyClick = (county: CountyData) => {
    if (!interactive) return;
    if (selectedCountyId === county.id) {
      setSelectedCountyId(null);
    } else {
      setSelectedCountyId(county.id);
    }
    if (onSelectCounty) {
      onSelectCounty(county);
    }
  };

  return (
    <div className="glass-panel p-4 relative w-full h-full flex flex-col justify-between overflow-hidden">
      {/* Top Controls: Mode Switcher + Analytical Layers */}
      {showLayerControls && (
        <div className="space-y-3 mb-3 pb-3 border-b border-slate-800/80 z-10">
          <div className="flex flex-wrap items-center justify-between gap-3">
            {/* View Mode Toggle (Google Earth Satellite vs Cyber Night vs Topo) */}
            <div className="flex items-center gap-1.5 p-1 rounded-xl bg-slate-900/60 border border-slate-800 text-xs">
              <button
                onClick={() => setViewMode('satellite')}
                className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg font-bold transition-all ${
                  viewMode === 'satellite'
                    ? 'bg-gradient-to-r from-cyan-600 to-blue-600 text-white shadow-md shadow-cyan-900/40'
                    : 'text-slate-400 hover:text-slate-200'
                }`}
              >
                <Globe className="w-3.5 h-3.5 text-cyan-300" />
                <span>حالت ماهواره‌ای گوگل ارث (Earth Satellite)</span>
              </button>
              <button
                onClick={() => setViewMode('cyber')}
                className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg font-bold transition-all ${
                  viewMode === 'cyber'
                    ? 'bg-gradient-to-r from-sky-600 to-cyan-600 text-white shadow-md shadow-cyan-900/40'
                    : 'text-slate-400 hover:text-slate-200'
                }`}
              >
                <Eye className="w-3.5 h-3.5 text-cyan-300" />
                <span>رادار نئونی شب (Cyber Night)</span>
              </button>
              <button
                onClick={() => setViewMode('topo')}
                className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg font-bold transition-all ${
                  viewMode === 'topo'
                    ? 'bg-gradient-to-r from-emerald-600 to-teal-600 text-white shadow-md shadow-emerald-900/40'
                    : 'text-slate-400 hover:text-slate-200'
                }`}
              >
                <Mountain className="w-3.5 h-3.5 text-emerald-300" />
                <span>توپوگرافی و عوارض زمین (Topography)</span>
              </button>
            </div>

            {/* Satellite Telemetry Coordinates Badge */}
            <div className="flex items-center gap-2 text-[10px] font-mono text-cyan-400 bg-cyan-950/40 border border-cyan-800/40 px-2.5 py-1 rounded-lg">
              <Compass className="w-3.5 h-3.5 animate-spin-slow" />
              <span>LAT 35°41′N | LON 51°25′E | SAT: TEH-GEO1</span>
            </div>
          </div>

          {/* Analytical Layers */}
          <div className="flex flex-wrap items-center justify-between gap-2 pt-2 border-t border-slate-800/60">
            <div className="flex items-center gap-2">
              <span className="text-xs font-semibold text-slate-300">لایه داده‌ای:</span>
              <div className="flex items-center gap-1 p-0.5 rounded-lg bg-slate-900/50 border border-slate-800 text-xs">
                <button
                  onClick={() => setInternalLayer('industry')}
                  className={`px-2.5 py-1 rounded transition-colors ${
                    layer === 'industry' ? 'bg-cyan-600 text-white font-bold' : 'text-slate-400 hover:text-slate-200'
                  }`}
                >
                  صنعت و شهرک‌ها
                </button>
                <button
                  onClick={() => setInternalLayer('market')}
                  className={`px-2.5 py-1 rounded transition-colors ${
                    layer === 'market' ? 'bg-amber-600 text-white font-bold' : 'text-slate-400 hover:text-slate-200'
                  }`}
                >
                  تنظیم بازار و قیمت
                </button>
                <button
                  onClick={() => setInternalLayer('agriculture')}
                  className={`px-2.5 py-1 rounded transition-colors ${
                    layer === 'agriculture' ? 'bg-emerald-600 text-white font-bold' : 'text-slate-400 hover:text-slate-200'
                  }`}
                >
                  کشاورزی و گلخانه
                </button>
                <button
                  onClick={() => setInternalLayer('labor')}
                  className={`px-2.5 py-1 rounded transition-colors ${
                    layer === 'labor' ? 'bg-cyan-600 text-white font-bold' : 'text-slate-400 hover:text-slate-200'
                  }`}
                >
                  جمعیت و اشتغال
                </button>
                <button
                  onClick={() => setInternalLayer('risk')}
                  className={`px-2.5 py-1 rounded transition-colors ${
                    layer === 'risk' ? 'bg-rose-600 text-white font-bold' : 'text-slate-400 hover:text-slate-200'
                  }`}
                >
                  ریسک و ناترازی
                </button>
              </div>
            </div>

            <div className="text-xs text-slate-400 flex items-center gap-3">
              <span className="flex items-center gap-1 font-bold text-white">
                <span className="w-2.5 h-2.5 rounded-full bg-cyan-400 radar-glow inline-block"></span>
                انتخاب: {selectedCountyId ? TEHRAN_16_COUNTIES.find(c => c.id === selectedCountyId)?.nameFa : 'کل استان تهران'}
              </span>
              {selectedCountyId && (
                <button
                  onClick={() => setSelectedCountyId(null)}
                  className="text-cyan-400 hover:underline text-xs"
                >
                  نمایش کل استان
                </button>
              )}
            </div>
          </div>
        </div>
      )}

      {/* SVG GIS Canvas with Satellite Textures */}
      <div className="relative flex-1 w-full min-h-[380px] flex items-center justify-center rounded-xl overflow-hidden border border-slate-800/80 bg-[#071321]">
        {/* Zoom controls */}
        <div className="absolute top-3 left-3 z-20 flex flex-col gap-1.5">
          <button
            onClick={() => setZoomLevel((prev) => Math.min(prev + 0.2, 1.8))}
            className="w-7 h-7 rounded-lg glass-button flex items-center justify-center text-slate-300 hover:text-white"
            title="بزرگ‌نمایی"
          >
            <ZoomIn className="w-3.5 h-3.5" />
          </button>
          <button
            onClick={() => setZoomLevel((prev) => Math.max(prev - 0.2, 0.8))}
            className="w-7 h-7 rounded-lg glass-button flex items-center justify-center text-slate-300 hover:text-white"
            title="کوچک‌نمایی"
          >
            <ZoomOut className="w-3.5 h-3.5" />
          </button>
        </div>

        <svg
          viewBox="70 80 870 720"
          className="w-full h-full max-h-[620px] transition-transform duration-300"
          style={{ transform: `scale(${zoomLevel})` }}
          preserveAspectRatio="xMidYMid meet"
        >
          <defs>
            {/* Satellite Photorealistic Terrain Pattern */}
            <radialGradient id="satAlborzSnow" cx="50%" cy="30%" r="60%">
              <stop offset="0%" stopColor="#dce8f5" stopOpacity="0.4" />
              <stop offset="40%" stopColor="#435266" stopOpacity="0.6" />
              <stop offset="100%" stopColor="#1e2c3e" stopOpacity="0.9" />
            </radialGradient>

            <radialGradient id="satPlainsGreen" cx="60%" cy="70%" r="50%">
              <stop offset="0%" stopColor="#1b4d3e" stopOpacity="0.6" />
              <stop offset="60%" stopColor="#133328" stopOpacity="0.75" />
              <stop offset="100%" stopColor="#0d2119" stopOpacity="0.9" />
            </radialGradient>

            <linearGradient id="flowGrad" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#8B5CF6" stopOpacity="0.8" />
              <stop offset="100%" stopColor="#06B6D4" stopOpacity="0.8" />
            </linearGradient>

            <filter id="glowFilter" x="-20%" y="-20%" width="140%" height="140%">
              <feGaussianBlur stdDeviation="6" result="blur" />
              <feComposite in="SourceGraphic" in2="blur" operator="over" />
            </filter>

            {/* Grid coordinate overlay */}
            <pattern id="satGrid" width="60" height="60" patternUnits="userSpaceOnUse">
              <path d="M 60 0 L 0 0 0 60" fill="none" stroke="rgba(56, 189, 248, 0.08)" strokeWidth="0.8" />
            </pattern>
          </defs>

          {/* Satellite Base Layer Texture */}
          <rect x="70" y="80" width="870" height="720" fill="#071322" />

          {viewMode === 'satellite' && (
            <g className="pointer-events-none">
              {/* Alborz mountain snow ridge contours to north */}
              <path
                d="M 280 110 Q 500 80 720 120 T 910 160 L 910 320 Q 600 240 280 280 Z"
                fill="url(#satAlborzSnow)"
                opacity="0.85"
              />
              {/* Varamin & Southern agricultural green tracts */}
              <path
                d="M 450 480 Q 650 450 780 620 L 730 740 Q 500 780 430 620 Z"
                fill="url(#satPlainsGreen)"
                opacity="0.7"
              />
              {/* Urban Grid texture around Tehran core */}
              <circle cx="430" cy="360" r="140" fill="rgba(88, 105, 131, 0.25)" filter="blur(8px)" />
            </g>
          )}

          {/* Coordinate grid lines */}
          <rect x="70" y="80" width="870" height="720" fill="url(#satGrid)" className="pointer-events-none" />

          {/* Supply Flow Lines */}
          <g className="opacity-40 pointer-events-none">
            <line x1="430" y1="360" x2="430" y2="560" stroke="url(#flowGrad)" strokeWidth="2" className="flow-line" />
            <line x1="400" y1="360" x2="250" y2="390" stroke="url(#flowGrad)" strokeWidth="2" className="flow-line" />
            <line x1="450" y1="380" x2="570" y2="480" stroke="url(#flowGrad)" strokeWidth="2" className="flow-line" />
            <line x1="450" y1="560" x2="600" y2="650" stroke="url(#flowGrad)" strokeWidth="2" className="flow-line" />
            <line x1="260" y1="420" x2="350" y2="480" stroke="url(#flowGrad)" strokeWidth="1.5" className="flow-line" />
            <line x1="450" y1="330" x2="540" y2="330" stroke="url(#flowGrad)" strokeWidth="1.5" className="flow-line" />
          </g>

          {/* 16 County Polygons */}
          {TEHRAN_16_COUNTIES.map((county) => {
            const isSelected = selectedCountyId === county.id;
            const isHovered = hoveredCounty?.id === county.id;
            const style = getCountyColor(county, isSelected, isHovered);
            const path = COUNTY_PATHS[county.id];

            return (
              <g
                key={county.id}
                className="cursor-pointer transition-all duration-300"
                onClick={() => handleCountyClick(county)}
                onMouseEnter={() => setHoveredCounty(county)}
                onMouseLeave={() => setHoveredCounty(null)}
              >
                <path
                  d={path}
                  fill={style.fill}
                  stroke={style.stroke}
                  strokeWidth={style.strokeWidth}
                  filter={isSelected ? 'url(#glowFilter)' : undefined}
                  className="transition-all duration-200 hover:brightness-125"
                />

                {/* County Name Label */}
                <text
                  x={county.coordinates.x * 9.2}
                  y={county.coordinates.y * 8.6}
                  textAnchor="middle"
                  fill="#F8FAFC"
                  fontSize={county.id === 'tehran' ? 16 : 13}
                  fontWeight={isSelected || county.id === 'tehran' ? 800 : 600}
                  className="pointer-events-none select-none drop-shadow-lg"
                >
                  {county.nameFa}
                </text>

                {/* Sub-label under city */}
                {!compact && (
                  <text
                    x={county.coordinates.x * 9.2}
                    y={county.coordinates.y * 8.6 + 14}
                    textAnchor="middle"
                    fill={viewMode === 'satellite' ? '#BAE6FD' : '#94A3B8'}
                    fontSize={10}
                    className="pointer-events-none select-none font-mono"
                  >
                    {layer === 'industry'
                      ? `${toPersianDigits(county.activeIndustrialUnits)} واحد`
                      : layer === 'agriculture'
                      ? `${toPersianDigits(Math.round(county.wheatProductionTons / 1000))} هزار تن`
                      : layer === 'labor'
                      ? `${toPersianDigits(county.unemploymentRate)}٪ بیکاری`
                      : county.governorateType === 'فرمانداری ویژه'
                      ? 'فرمانداری ویژه'
                      : ''}
                  </text>
                )}

                {/* Risk warning badge on map if critical */}
                {county.riskLevel === 'critical' && (
                  <circle
                    cx={county.coordinates.x * 9.2 + 22}
                    cy={county.coordinates.y * 8.6 - 12}
                    r={5}
                    fill="#F43F5E"
                    className="radar-glow pointer-events-none"
                  />
                )}
              </g>
            );
          })}

          {/* Geographic Landmarks in Satellite Mode */}
          {viewMode === 'satellite' &&
            LANDMARKS.map((lm, idx) => (
              <g key={idx} className="pointer-events-none">
                <circle cx={lm.x} cy={lm.y} r={3} fill="#FACC15" className="radar-glow" />
                <text
                  x={lm.x + 8}
                  y={lm.y + 4}
                  fill="#FEF08A"
                  fontSize={9}
                  className="select-none font-mono opacity-80"
                >
                  {lm.name}
                </text>
              </g>
            ))}
        </svg>

        {/* Hover / Selected County Card popover */}
        {(hoveredCounty || selectedCountyId) && (
          <div className="absolute bottom-3 right-3 max-w-sm glass-card p-3.5 z-20 pointer-events-none transition-all shadow-2xl">
            {(() => {
              const item = hoveredCounty || TEHRAN_16_COUNTIES.find(c => c.id === selectedCountyId)!;
              return (
                <div className="space-y-2 text-xs">
                  <div className="flex items-center justify-between gap-3 border-b border-slate-700/60 pb-1.5">
                    <span className="font-bold text-sm text-white flex items-center gap-1.5">
                      <MapPin className="w-4 h-4 text-cyan-400" />
                      شهرستان {item.nameFa}
                      <span className="text-[10px] text-slate-400 font-normal">({item.governorateType})</span>
                    </span>
                    <span
                      className={`px-2 py-0.5 rounded text-[10px] font-bold ${
                        item.riskLevel === 'critical'
                          ? 'bg-rose-500/20 text-rose-300 border border-rose-500/40'
                          : item.riskLevel === 'warning'
                          ? 'bg-amber-500/20 text-amber-300 border border-amber-500/40'
                          : 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/40'
                      }`}
                    >
                      {item.riskLevel === 'critical' ? 'ریسک بحرانی' : item.riskLevel === 'warning' ? 'نیازمند توجه' : 'پایدار'}
                    </span>
                  </div>

                  <div className="grid grid-cols-2 gap-2 text-slate-300 pt-0.5">
                    <div className="flex items-center gap-1">
                      <Users className="w-3.5 h-3.5 text-cyan-400" />
                      <span>جمعیت:</span>
                      <strong className="text-white font-mono">{formatPersianNumber(item.population1405Est)}</strong>
                    </div>
                    <div className="flex items-center gap-1">
                      <Factory className="w-3.5 h-3.5 text-indigo-400" />
                      <span>صنایع فعال:</span>
                      <strong className="text-white font-mono">{formatPersianNumber(item.activeIndustrialUnits)}</strong>
                    </div>
                    <div className="flex items-center gap-1">
                      <Wheat className="w-3.5 h-3.5 text-amber-400" />
                      <span>سهمیه آرد:</span>
                      <strong className="text-white font-mono">{toPersianDigits(item.dailyFlourQuotaTons)} تن/روز</strong>
                    </div>
                    <div className="flex items-center gap-1">
                      <AlertTriangle className="w-3.5 h-3.5 text-rose-400" />
                      <span>نرخ بیکاری:</span>
                      <strong className="text-white font-mono">{toPersianDigits(item.unemploymentRate)}٪</strong>
                    </div>
                  </div>

                  <div className="text-[11px] text-slate-400 border-t border-slate-700/40 pt-1.5 leading-tight">
                    <span className="text-cyan-300 font-medium">قطب‌های صنعتی: </span>
                    {item.industrialEstates.slice(0, 2).join('، ')}
                  </div>
                </div>
              );
            })()}
          </div>
        )}
      </div>

      {/* Map Footer Legend */}
      <div className="flex flex-wrap items-center justify-between text-[11px] text-slate-400 border-t border-slate-800/80 pt-2.5 mt-2">
        <div className="flex items-center gap-4">
          <span className="flex items-center gap-1.5">
            <span className="w-3 h-3 rounded bg-cyan-500/60 border border-cyan-400 inline-block"></span>
            تراکم بالای شاخص لایه
          </span>
          <span className="flex items-center gap-1.5">
            <span className="w-3 h-3 rounded bg-slate-700/60 border border-slate-500 inline-block"></span>
            تراکم متوسط و عادی
          </span>
          <span className="flex items-center gap-1.5">
            <span className="w-2.5 h-2.5 rounded-full bg-rose-500 radar-glow inline-block"></span>
            هشدار تنش یا ریسک
          </span>
        </div>
        <div className="text-slate-400">
          کلیک روی هر شهرستان جهت فیلتر و تمرکز کلیه شاخص‌های داشبورد
        </div>
      </div>
    </div>
  );
}

export default TehranInteractiveMap;
