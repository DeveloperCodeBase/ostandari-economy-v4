'use client';

import React, { useState, useEffect, useRef } from 'react';
import {
  TEHRAN_COUNTY_PROFILES,
  TEHRAN_5_DAMS,
  TEHRAN_6_CUSTOMS,
  TEHRAN_16_COUNTIES,
} from '@/src/data/tehranMasterData';
import { toPersianDigits, formatPersianNumber } from '@/src/utils/formatters';
import { useCommand } from '@/src/context/CommandContext';
import {
  Layers,
  Globe,
  Compass,
  Factory,
  Droplets,
  Truck,
  Wheat,
  MapPin,
  Eye,
  Maximize2,
  RefreshCw,
  Sparkles,
  AlertTriangle,
  ZoomIn,
  ZoomOut,
  Navigation,
} from 'lucide-react';

interface Props {
  className?: string;
  height?: string;
  compact?: boolean;
  onCountySelect?: (countyId: string) => void;
}

export function TehranSatellite3DGIS({
  className = '',
  height = '620px',
  compact = false,
  onCountySelect,
}: Props) {
  const mapContainerRef = useRef<HTMLDivElement>(null);
  const mapInstanceRef = useRef<any>(null);
  const layersGroupRef = useRef<Record<string, any>>({});

  const { selectedCountyId, setSelectedCountyId } = useCommand();

  const [is3DOrbit, setIs3DOrbit] = useState(false);
  const [activeLayers, setActiveLayers] = useState({
    counties: true,
    industry: true,
    dams: true,
    customs: true,
    food: true,
  });
  const [selectedEntity, setSelectedEntity] = useState<any>(null);
  const [isLoaded, setIsLoaded] = useState(false);

  // Toggle single layer
  const toggleLayer = (layerKey: keyof typeof activeLayers) => {
    setActiveLayers((prev) => {
      const next = { ...prev, [layerKey]: !prev[layerKey] };
      const group = layersGroupRef.current[layerKey];
      if (group && mapInstanceRef.current) {
        if (next[layerKey]) {
          mapInstanceRef.current.addLayer(group);
        } else {
          mapInstanceRef.current.removeLayer(group);
        }
      }
      return next;
    });
  };

  // Initialize Leaflet Map
  useEffect(() => {
    let isCancelled = false;

    async function initMap() {
      if (typeof window === 'undefined' || !mapContainerRef.current) return;
      if (mapInstanceRef.current) return;

      const L = (await import('leaflet')).default;

      // Ensure Leaflet CSS is injected
      if (!document.getElementById('leaflet-css')) {
        const link = document.createElement('link');
        link.id = 'leaflet-css';
        link.rel = 'stylesheet';
        link.href = 'https://unpkg.com/leaflet@1.9.4/dist/leaflet.css';
        document.head.appendChild(link);
      }

      if (isCancelled || !mapContainerRef.current) return;

      // Tehran province geographic center ~ 35.6892, 51.3890
      const map = L.map(mapContainerRef.current, {
        center: [35.6892, 51.389],
        zoom: 9,
        zoomControl: false,
        attributionControl: false,
      });

      // 1. High-Resolution Esri World Imagery Satellite Tiles
      const esriSatellite = L.tileLayer(
        'https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}',
        {
          maxZoom: 18,
          attribution: 'Esri World Imagery',
        }
      );
      esriSatellite.addTo(map);

      // 2. Carto / Persian Road and Label Overlay
      const labelsOverlay = L.tileLayer(
        'https://{s}.basemaps.cartocdn.com/dark_only_labels/{z}/{x}/{y}{r}.png',
        {
          maxZoom: 18,
          subdomains: 'abcd',
          opacity: 0.9,
        }
      );
      labelsOverlay.addTo(map);

      // Create Layer Groups
      const countyGroup = L.layerGroup().addTo(map);
      const industryGroup = L.layerGroup().addTo(map);
      const damGroup = L.layerGroup().addTo(map);
      const customsGroup = L.layerGroup().addTo(map);
      const foodGroup = L.layerGroup().addTo(map);

      layersGroupRef.current = {
        counties: countyGroup,
        industry: industryGroup,
        dams: damGroup,
        customs: customsGroup,
        food: foodGroup,
      };

      // 1. Populate 16 Counties
      TEHRAN_COUNTY_PROFILES.forEach((county) => {
        const radius = Math.max(14, Math.sqrt(county.gdpSharePercent) * 8);
        const marker = L.circleMarker([county.lat, county.lng], {
          radius,
          color: county.glowColor || '#6d5dfc',
          fillColor: county.glowColor || '#6d5dfc',
          fillOpacity: 0.45,
          weight: 2,
        });

        marker.on('click', () => {
          setSelectedEntity({ type: 'county', data: county });
          if (onCountySelect) onCountySelect(county.id);
          setSelectedCountyId(county.id);
          map.flyTo([county.lat, county.lng], 12, { duration: 1.2 });
        });

        marker.bindTooltip(
          `<div style="direction:rtl; text-align:right; font-family:Vazirmatn,sans-serif; font-size:12px; font-weight:bold; color:#fff; background:#071321ee; padding:6px 10px; border-radius:10px; border:1px solid ${county.glowColor}">
            <span>${county.name}</span>
            <div style="font-size:10px; color:#8bd9ff; font-weight:normal;">سهم GDP: ${toPersianDigits(county.gdpSharePercent)}٪</div>
          </div>`,
          { permanent: false, direction: 'top', opacity: 0.95 }
        );

        countyGroup.addLayer(marker);
      });

      // 2. Populate 5 Major Dams
      TEHRAN_5_DAMS.forEach((dam) => {
        const damIcon = L.divIcon({
          className: 'custom-gis-dam-icon',
          html: `<div style="width:26px; height:26px; border-radius:50%; background:#0284c7; border:2px solid #7dd3fc; display:flex; align-items:center; justify-content:center; box-shadow:0 0 12px #38bdf8; color:#fff; font-size:12px; font-weight:bold;">سد</div>`,
          iconSize: [26, 26],
          iconAnchor: [13, 13],
        });

        const marker = L.marker([dam.lat, dam.lng], { icon: damIcon });
        marker.on('click', () => {
          setSelectedEntity({ type: 'dam', data: dam });
          map.flyTo([dam.lat, dam.lng], 13, { duration: 1.2 });
        });
        marker.bindTooltip(
          `<div style="direction:rtl; text-align:right; font-family:Vazirmatn; font-size:12px; color:#fff; background:#071321f0; padding:6px 10px; border-radius:10px; border:1px solid #38bdf8;">
            <strong>${dam.name}</strong>
            <div style="font-size:10px; color:#7dd3fc;">حجم مخزن: ${toPersianDigits(dam.currentVolume_MCM)} از ${toPersianDigits(dam.totalCapacity_MCM)} میلیون م۳</div>
          </div>`,
          { direction: 'top' }
        );
        damGroup.addLayer(marker);
      });

      // 3. Populate 6 Customs Hubs
      TEHRAN_6_CUSTOMS.forEach((hub) => {
        const customsIcon = L.divIcon({
          className: 'custom-gis-customs-icon',
          html: `<div style="width:26px; height:26px; border-radius:50%; background:#d97706; border:2px solid #fde68a; display:flex; align-items:center; justify-content:center; box-shadow:0 0 12px #fbbf24; color:#fff; font-size:11px; font-weight:bold;">گمرک</div>`,
          iconSize: [26, 26],
          iconAnchor: [13, 13],
        });

        const marker = L.marker([hub.lat, hub.lng], { icon: customsIcon });
        marker.on('click', () => {
          setSelectedEntity({ type: 'customs', data: hub });
          map.flyTo([hub.lat, hub.lng], 13, { duration: 1.2 });
        });
        marker.bindTooltip(
          `<div style="direction:rtl; text-align:right; font-family:Vazirmatn; font-size:12px; color:#fff; background:#071321f0; padding:6px 10px; border-radius:10px; border:1px solid #fbbf24;">
            <strong>${hub.name}</strong>
            <div style="font-size:10px; color:#fde68a;">صف کانتینر: ${toPersianDigits(hub.containersInQueue)} دستگاه</div>
          </div>`,
          { direction: 'top' }
        );
        customsGroup.addLayer(marker);
      });

      // 4. Industrial Parks (Shamsabad, Abbasabad, Safadasht, Parand, Charmshahr)
      const keyEstates = [
        { name: 'شهرک صنعتی شمس‌آباد', lat: 35.3214, lng: 51.2842, units: 1400 },
        { name: 'شهرک صنعتی عباس‌آباد', lat: 35.4611, lng: 51.7891, units: 1500 },
        { name: 'شهرک صنعتی غیردولتی صفادشت', lat: 35.6812, lng: 50.8842, units: 562 },
        { name: 'شهرک صنعتی پرند', lat: 35.4518, lng: 50.9841, units: 350 },
        { name: 'شهرک صنعتی چرمشهر و سالاریه', lat: 35.1841, lng: 51.5812, units: 280 },
        { name: 'شهرک صنعتی نصیرآباد', lat: 35.5012, lng: 51.1712, units: 420 },
      ];

      keyEstates.forEach((estate) => {
        const indIcon = L.divIcon({
          className: 'custom-gis-ind-icon',
          html: `<div style="width:24px; height:24px; border-radius:6px; background:#7c3aed; border:1.5px solid #c4b5fd; display:flex; align-items:center; justify-content:center; box-shadow:0 0 10px #a78bfa; color:#fff; font-size:10px; font-weight:bold;">صنعت</div>`,
          iconSize: [24, 24],
          iconAnchor: [12, 12],
        });
        const marker = L.marker([estate.lat, estate.lng], { icon: indIcon });
        marker.bindTooltip(
          `<div style="direction:rtl; text-align:right; font-family:Vazirmatn; font-size:12px; color:#fff; background:#071321f0; padding:6px 10px; border-radius:10px; border:1px solid #a78bfa;">
            <strong>${estate.name}</strong>
            <div style="font-size:10px; color:#c4b5fd;">واحدهای فعال: ${toPersianDigits(estate.units)}</div>
          </div>`,
          { direction: 'top' }
        );
        industryGroup.addLayer(marker);
      });

      // 5. Food Security (Wheat Silos & Tarabar Hub)
      const foodHubs = [
        { name: 'میدان مرکزی میوه و تره‌بار شهرداری تهران', lat: 35.612, lng: 51.395, tons: 17000 },
        { name: 'سیلوی بزرگ گندم ری', lat: 35.589, lng: 51.442, tons: 120000 },
        { name: 'سیلوی ۴۰ هزار تنی شریف‌آباد پاکدشت', lat: 35.421, lng: 51.782, tons: 40000 },
      ];

      foodHubs.forEach((hub) => {
        const foodIcon = L.divIcon({
          className: 'custom-gis-food-icon',
          html: `<div style="width:24px; height:24px; border-radius:50%; background:#059669; border:1.5px solid #6ee7b7; display:flex; align-items:center; justify-content:center; box-shadow:0 0 10px #34d399; color:#fff; font-size:10px; font-weight:bold;">غذا</div>`,
          iconSize: [24, 24],
          iconAnchor: [12, 12],
        });
        const marker = L.marker([hub.lat, hub.lng], { icon: foodIcon });
        marker.bindTooltip(
          `<div style="direction:rtl; text-align:right; font-family:Vazirmatn; font-size:12px; color:#fff; background:#071321f0; padding:6px 10px; border-radius:10px; border:1px solid #34d399;">
            <strong>${hub.name}</strong>
            <div style="font-size:10px; color:#6ee7b7;">ظرفیت/گردش: ${toPersianDigits(hub.tons.toLocaleString('fa-IR'))} تن</div>
          </div>`,
          { direction: 'top' }
        );
        foodGroup.addLayer(marker);
      });

      mapInstanceRef.current = map;
      setIsLoaded(true);
    }

    initMap();

    return () => {
      isCancelled = true;
      if (mapInstanceRef.current) {
        mapInstanceRef.current.remove();
        mapInstanceRef.current = null;
      }
    };
  }, [onCountySelect, setSelectedCountyId]);

  // Handle selectedCountyId changes from outside
  useEffect(() => {
    if (!selectedCountyId || !mapInstanceRef.current) return;
    const target = TEHRAN_COUNTY_PROFILES.find((c) => c.id === selectedCountyId);
    if (target) {
      mapInstanceRef.current.flyTo([target.lat, target.lng], 12, { duration: 1.2 });
      const timer = setTimeout(() => {
        setSelectedEntity({ type: 'county', data: target });
      }, 0);
      return () => clearTimeout(timer);
    }
  }, [selectedCountyId]);

  const resetView = () => {
    if (mapInstanceRef.current) {
      mapInstanceRef.current.flyTo([35.6892, 51.389], 9, { duration: 1.2 });
      setSelectedEntity(null);
    }
  };

  const zoomIn = () => {
    if (mapInstanceRef.current) mapInstanceRef.current.zoomIn();
  };

  const zoomOut = () => {
    if (mapInstanceRef.current) mapInstanceRef.current.zoomOut();
  };

  return (
    <div className={`relative w-full overflow-hidden rounded-[28px] border border-[var(--lg-border-strong)] bg-[#071321] text-white shadow-2xl ${className}`}>
      {/* 1. Glassmorphic HUD Top Bar */}
      <div className="absolute top-3 inset-x-3 z-30 flex flex-wrap items-center justify-between gap-2.5 p-2.5 rounded-2xl border border-white/15 bg-[#071321]/85 backdrop-blur-xl shadow-lg">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-xl bg-gradient-to-br from-cyan-500 to-blue-600 flex items-center justify-center text-white shadow-md">
            <Globe className="w-4 h-4" />
          </div>
          <div>
            <div className="text-xs font-black text-white flex items-center gap-1.5">
              <span>سامانه ژئواکونومیک و ماهواره‌ای استان تهران</span>
              <span className="text-[10px] text-cyan-300 font-mono px-1.5 py-0.2 bg-cyan-950/60 rounded border border-cyan-500/30">
                Esri World 3D
              </span>
            </div>
            <div className="text-[10px] text-slate-400">
              پایش فضایی ۱۶ شهرستان، ۲۲ شهرک صنعتی، ۵ سد و ۶ گمرک با وضوح بالا
            </div>
          </div>
        </div>

        {/* 3D Orbit & Layer Toggles */}
        <div className="flex items-center gap-1.5 flex-wrap">
          {/* 3D Tilt Toggle */}
          <button
            onClick={() => setIs3DOrbit((prev) => !prev)}
            className={`px-3 py-1.5 rounded-xl text-xs font-bold flex items-center gap-1.5 border transition-all ${
              is3DOrbit
                ? 'bg-gradient-to-l from-cyan-600 to-sky-600 text-white border-cyan-400 shadow-lg shadow-cyan-950/60'
                : 'bg-white/5 hover:bg-white/10 text-slate-300 border-white/15'
            }`}
          >
            <Compass className={`w-3.5 h-3.5 ${is3DOrbit ? 'animate-spin' : ''}`} />
            <span>نمای سه‌بعدی ماهواره‌ای (3D Tilt)</span>
          </button>

          {/* Layer toggles */}
          <div className="hidden sm:flex items-center gap-1 border-r border-white/15 pr-1.5 mr-0.5">
            <button
              onClick={() => toggleLayer('counties')}
              className={`px-2 py-1 rounded-lg text-[11px] font-medium border transition-colors ${
                activeLayers.counties
                  ? 'bg-cyan-500/20 text-cyan-300 border-cyan-500/40'
                  : 'bg-white/5 text-slate-500 border-white/10'
              }`}
            >
              ۱۶ شهرستان
            </button>

            <button
              onClick={() => toggleLayer('industry')}
              className={`px-2 py-1 rounded-lg text-[11px] font-medium border transition-colors ${
                activeLayers.industry
                  ? 'bg-amber-500/20 text-amber-300 border-amber-500/40'
                  : 'bg-white/5 text-slate-500 border-white/10'
              }`}
            >
              شهرک‌های صنعتی
            </button>

            <button
              onClick={() => toggleLayer('dams')}
              className={`px-2 py-1 rounded-lg text-[11px] font-medium border transition-colors ${
                activeLayers.dams
                  ? 'bg-sky-500/20 text-sky-300 border-sky-500/40'
                  : 'bg-white/5 text-slate-500 border-white/10'
              }`}
            >
              ۵ سد آب
            </button>

            <button
              onClick={() => toggleLayer('customs')}
              className={`px-2 py-1 rounded-lg text-[11px] font-medium border transition-colors ${
                activeLayers.customs
                  ? 'bg-amber-500/20 text-amber-300 border-amber-500/40'
                  : 'bg-white/5 text-slate-500 border-white/10'
              }`}
            >
              ۶ گمرک
            </button>

            <button
              onClick={() => toggleLayer('food')}
              className={`px-2 py-1 rounded-lg text-[11px] font-medium border transition-colors ${
                activeLayers.food
                  ? 'bg-emerald-500/20 text-emerald-300 border-emerald-500/40'
                  : 'bg-white/5 text-slate-500 border-white/10'
              }`}
            >
              امنیت غذایی
            </button>
          </div>
        </div>
      </div>

      {/* 2. Map Container with optional 3D Perspective Tilt */}
      <div
        className={`w-full relative transition-all duration-700 ${
          is3DOrbit ? 'gis-3d-orbit-active' : ''
        }`}
        style={{
          height,
          perspective: is3DOrbit ? '1400px' : 'none',
        }}
      >
        <div
          ref={mapContainerRef}
          className="w-full h-full"
          style={{
            transform: is3DOrbit
              ? 'perspective(1400px) rotateX(34deg) rotateZ(-3deg) scale(1.08)'
              : 'none',
            transformOrigin: '50% 60%',
            transition: 'transform 0.85s cubic-bezier(.22, .72, .18, 1)',
          }}
        />
      </div>

      {/* 3. Floating Map Controls (Zoom, Reset) */}
      <div className="absolute bottom-4 left-4 z-30 flex flex-col gap-1.5">
        <button
          onClick={zoomIn}
          aria-label="بزرگ‌نمایی"
          className="w-8 h-8 rounded-xl bg-[#071321]/80 hover:bg-[#071321] text-white border border-white/20 flex items-center justify-center shadow-lg backdrop-blur-md transition-colors"
        >
          <ZoomIn className="w-4 h-4" />
        </button>
        <button
          onClick={zoomOut}
          aria-label="کوچک‌نمایی"
          className="w-8 h-8 rounded-xl bg-[#071321]/80 hover:bg-[#071321] text-white border border-white/20 flex items-center justify-center shadow-lg backdrop-blur-md transition-colors"
        >
          <ZoomOut className="w-4 h-4" />
        </button>
        <button
          onClick={resetView}
          aria-label="بازنشانی زاویه دید"
          className="w-8 h-8 rounded-xl bg-[#071321]/80 hover:bg-[#071321] text-white border border-white/20 flex items-center justify-center shadow-lg backdrop-blur-md transition-colors"
          title="بازنشانی دید استان"
        >
          <RefreshCw className="w-3.5 h-3.5" />
        </button>
      </div>

      {/* 4. Bottom County Quick Jump Strip */}
      <div className="absolute bottom-4 right-4 left-16 z-30 hidden md:flex items-center gap-1.5 overflow-x-auto p-1.5 rounded-2xl bg-[#071321]/80 backdrop-blur-md border border-white/15 scrollbar-none">
        <span className="text-[10px] text-slate-400 font-bold px-2 shrink-0">پرواز سریع:</span>
        {TEHRAN_COUNTY_PROFILES.map((c) => (
          <button
            key={c.id}
            onClick={() => {
              if (mapInstanceRef.current) {
                mapInstanceRef.current.flyTo([c.lat, c.lng], 12, { duration: 1.2 });
              }
              setSelectedEntity({ type: 'county', data: c });
              if (onCountySelect) onCountySelect(c.id);
              setSelectedCountyId(c.id);
            }}
            className={`px-2 py-1 rounded-lg text-[10px] font-medium whitespace-nowrap border transition-colors shrink-0 ${
              selectedCountyId === c.id
                ? 'bg-cyan-600 text-white border-cyan-400'
                : 'bg-white/5 hover:bg-white/15 text-slate-300 border-white/10'
            }`}
          >
            {c.name.split(' ')[0]}
          </button>
        ))}
      </div>

      {/* 5. Selected Entity Floating Detail Drawer */}
      {selectedEntity && (
        <div className="absolute top-20 right-4 z-40 w-80 max-w-[calc(100%-32px)] p-4 rounded-2xl border border-white/20 bg-[#071321]/90 backdrop-blur-2xl shadow-2xl text-right animate-in fade-in slide-in-from-top-4 duration-200">
          <div className="flex items-center justify-between border-b border-white/15 pb-2 mb-3">
            <div className="flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 radar-glow inline-block" />
              <h4 className="text-sm font-black text-white">
                {selectedEntity.data.name}
              </h4>
            </div>
            <button
              onClick={() => setSelectedEntity(null)}
              className="text-slate-400 hover:text-white p-1 rounded-lg text-xs"
            >
              ✕
            </button>
          </div>

          {selectedEntity.type === 'county' && (
            <div className="space-y-2 text-xs">
              <div className="flex justify-between text-slate-300">
                <span>سهم از GDP استانی:</span>
                <span className="font-bold text-cyan-400 font-mono">
                  {toPersianDigits(selectedEntity.data.gdpSharePercent)}٪
                </span>
              </div>
              <div className="flex justify-between text-slate-300">
                <span>درآمد مالیاتی ۵ماهه:</span>
                <span className="font-bold text-emerald-400 font-mono">
                  {toPersianDigits(selectedEntity.data.taxRevenue5M_Hemmat)} همت
                </span>
              </div>
              <div className="flex justify-between text-slate-300">
                <span>واحدهای صنعتی فعال:</span>
                <span className="font-bold text-sky-300 font-mono">
                  {toPersianDigits(selectedEntity.data.activeIndustrialUnits)} واحد
                </span>
              </div>
              <div className="flex justify-between text-slate-300">
                <span>سهمیه روزانه آرد:</span>
                <span className="font-bold text-amber-300 font-mono">
                  {toPersianDigits(selectedEntity.data.dailyFlourQuota_Sacks)} کیسه
                </span>
              </div>
              {selectedEntity.data.topCrisisAlert && (
                <div className="p-2 rounded-xl bg-rose-500/15 border border-rose-500/30 text-[11px] text-rose-200 mt-2">
                  <span className="font-bold">هشدار هوش مصنوعی: </span>
                  {selectedEntity.data.topCrisisAlert}
                </div>
              )}
            </div>
          )}

          {selectedEntity.type === 'dam' && (
            <div className="space-y-2 text-xs">
              <div className="flex justify-between text-slate-300">
                <span>رودخانه حوضه:</span>
                <span className="font-bold text-cyan-400">{selectedEntity.data.river}</span>
              </div>
              <div className="flex justify-between text-slate-300">
                <span>حجم فعلی مخزن:</span>
                <span className="font-bold text-emerald-400 font-mono">
                  {toPersianDigits(selectedEntity.data.currentVolume_MCM)} م۳
                </span>
              </div>
              <div className="flex justify-between text-slate-300">
                <span>درصد پرشدگی مخزن:</span>
                <span className="font-bold text-amber-300 font-mono">
                  {toPersianDigits(selectedEntity.data.fillPercent)}٪
                </span>
              </div>
              <div className="text-[11px] text-slate-400 mt-2">
                <strong>مناطق تحت پوشش: </strong>
                {selectedEntity.data.targetZones}
              </div>
            </div>
          )}

          {selectedEntity.type === 'customs' && (
            <div className="space-y-2 text-xs">
              <div className="flex justify-between text-slate-300">
                <span>نوع گمرک:</span>
                <span className="font-bold text-cyan-400">{selectedEntity.data.type}</span>
              </div>
              <div className="flex justify-between text-slate-300">
                <span>زمان متوسط ترخیص:</span>
                <span className="font-bold text-emerald-400 font-mono">
                  {toPersianDigits(selectedEntity.data.clearanceTime_Days)} روز
                </span>
              </div>
              <div className="flex justify-between text-slate-300">
                <span>کانتینرهای در صف:</span>
                <span className="font-bold text-rose-400 font-mono">
                  {toPersianDigits(selectedEntity.data.containersInQueue)} دستگاه
                </span>
              </div>
              <div className="text-[11px] text-slate-400 mt-2">
                <strong>اقلام اصلی: </strong>
                {selectedEntity.data.mainGoods}
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
}

export default TehranSatellite3DGIS;
