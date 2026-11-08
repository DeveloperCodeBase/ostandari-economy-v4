'use client';

import React, { useState } from 'react';
import { toPersianDigits, formatPersianNumber } from '@/src/utils/formatters';

// 1. Cyber Area Chart (Smooth curved SVG line with gradient glow)
export interface AreaPoint {
  label: string;
  value: number;
  secondaryValue?: number;
}

export function CyberAreaChart({
  data,
  height = 200,
  unit = '',
  color = '#8B5CF6',
  secondaryColor = '#06B6D4',
  secondaryLabel,
  primaryLabel = 'مقدار جاری',
}: {
  data: AreaPoint[];
  height?: number;
  unit?: string;
  color?: string;
  secondaryColor?: string;
  secondaryLabel?: string;
  primaryLabel?: string;
}) {
  const [hoverIndex, setHoverIndex] = useState<number | null>(null);

  if (!data || data.length === 0) return null;

  const width = 600;
  const paddingX = 40;
  const paddingY = 25;

  const allValues = data.flatMap((d) => [d.value, d.secondaryValue ?? d.value]);
  const minVal = Math.min(...allValues) * 0.9;
  const maxVal = Math.max(...allValues) * 1.1 || 1;

  const getX = (index: number) => paddingX + (index / (data.length - 1)) * (width - 2 * paddingX);
  const getY = (val: number) => height - paddingY - ((val - minVal) / (maxVal - minVal)) * (height - 2 * paddingY);

  const pointsPrimary = data.map((d, i) => `${getX(i)},${getY(d.value)}`).join(' ');
  const pointsSecondary = data[0].secondaryValue !== undefined
    ? data.map((d, i) => `${getX(i)},${getY(d.secondaryValue!)}`).join(' ')
    : '';

  const areaPath = `M ${getX(0)},${height - paddingY} ` +
    data.map((d, i) => `L ${getX(i)},${getY(d.value)}`).join(' ') +
    ` L ${getX(data.length - 1)},${height - paddingY} Z`;

  return (
    <div className="relative w-full">
      <svg viewBox={`0 0 ${width} ${height}`} className="w-full h-auto overflow-visible select-none">
        <defs>
          <linearGradient id={`grad-${color}`} x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor={color} stopOpacity="0.35" />
            <stop offset="100%" stopColor={color} stopOpacity="0.0" />
          </linearGradient>
        </defs>

        {/* Horizontal grid lines */}
        {[0, 0.5, 1].map((pct, idx) => {
          const y = paddingY + pct * (height - 2 * paddingY);
          const val = maxVal - pct * (maxVal - minVal);
          return (
            <g key={idx}>
              <line x1={paddingX} y1={y} x2={width - paddingX} y2={y} stroke="#334155" strokeDasharray="4 4" strokeWidth="0.8" opacity="0.4" />
              <text x={paddingX - 6} y={y + 3} fill="#64748B" fontSize="9" textAnchor="end" className="font-mono">
                {toPersianDigits(Math.round(val))}
              </text>
            </g>
          );
        })}

        {/* Gradient fill */}
        <path d={areaPath} fill={`url(#grad-${color})`} />

        {/* Secondary curve if provided */}
        {pointsSecondary && (
          <polyline
            fill="none"
            stroke={secondaryColor}
            strokeWidth="2"
            strokeDasharray="4 3"
            points={pointsSecondary}
          />
        )}

        {/* Primary curve */}
        <polyline
          fill="none"
          stroke={color}
          strokeWidth="2.5"
          points={pointsPrimary}
          className="transition-all duration-300"
        />

        {/* Interactive dots and hover guides */}
        {data.map((d, i) => {
          const x = getX(i);
          const y = getY(d.value);
          const isHovered = hoverIndex === i;

          return (
            <g key={i} className="cursor-pointer" onMouseEnter={() => setHoverIndex(i)} onMouseLeave={() => setHoverIndex(null)}>
              {/* Invisible touch area */}
              <rect x={x - 15} y={0} width={30} height={height} fill="transparent" />

              {isHovered && (
                <line x1={x} y1={paddingY} x2={x} y2={height - paddingY} stroke="#94A3B8" strokeWidth="1" strokeDasharray="3 3" opacity="0.7" />
              )}

              <circle
                cx={x}
                cy={y}
                r={isHovered ? 6 : 3.5}
                fill={isHovered ? '#FFFFFF' : color}
                stroke="#0F1423"
                strokeWidth="2"
                className="transition-all duration-150"
              />

              {/* X label */}
              <text x={x} y={height - 6} fill={isHovered ? '#FFFFFF' : '#94A3B8'} fontSize="10" textAnchor="middle">
                {d.label}
              </text>
            </g>
          );
        })}
      </svg>

      {/* Tooltip on hover */}
      {hoverIndex !== null && data[hoverIndex] && (
        <div
          className="absolute -top-10 bg-[#161D31] text-xs px-2.5 py-1 rounded-lg border border-cyan-500/40 shadow-xl pointer-events-none transform -translate-x-1/2 whitespace-nowrap z-20"
          style={{ left: `${(getX(hoverIndex) / width) * 100}%` }}
        >
          <div className="text-slate-300">{data[hoverIndex].label}</div>
          <div className="font-bold text-white flex items-center gap-1.5">
            <span className="w-2 h-2 rounded-full inline-block" style={{ backgroundColor: color }}></span>
            <span>{primaryLabel}:</span>
            <span className="font-mono">{formatPersianNumber(data[hoverIndex].value)} {unit}</span>
          </div>
          {data[hoverIndex].secondaryValue !== undefined && secondaryLabel && (
            <div className="text-cyan-300 flex items-center gap-1.5 mt-0.5">
              <span className="w-2 h-2 rounded-full inline-block" style={{ backgroundColor: secondaryColor }}></span>
              <span>{secondaryLabel}:</span>
              <span className="font-mono">{formatPersianNumber(data[hoverIndex].secondaryValue!)} {unit}</span>
            </div>
          )}
        </div>
      )}
    </div>
  );
}

// 2. Cyber Bar Chart
export function CyberBarChart({
  data,
  height = 190,
  unit = '',
  color = '#8B5CF6',
}: {
  data: { label: string; value: number; secondaryValue?: number; note?: string }[];
  height?: number;
  unit?: string;
  color?: string;
}) {
  const maxVal = Math.max(...data.map((d) => Math.max(d.value, d.secondaryValue || 0))) * 1.15 || 1;

  return (
    <div className="w-full flex flex-col justify-end gap-2 pt-4">
      <div className="flex items-end justify-between gap-2 w-full px-1" style={{ height: `${height}px` }}>
        {data.map((item, idx) => {
          const heightPct = Math.max(4, (item.value / maxVal) * 100);
          const secHeightPct = item.secondaryValue ? Math.max(4, (item.secondaryValue / maxVal) * 100) : null;

          return (
            <div key={idx} className="flex-1 flex flex-col items-center h-full justify-end group">
              <div className="text-[10px] text-slate-300 opacity-0 group-hover:opacity-100 transition-opacity font-mono mb-1 whitespace-nowrap">
                {formatPersianNumber(item.value)}
              </div>
              <div className="w-full flex items-end justify-center gap-1 h-full">
                <div
                  className="w-full max-w-[28px] rounded-t-md transition-all duration-300 group-hover:brightness-125"
                  style={{
                    height: `${heightPct}%`,
                    backgroundColor: color,
                    boxShadow: `0 0 10px ${color}33`,
                  }}
                />
                {secHeightPct !== null && (
                  <div
                    className="w-full max-w-[28px] rounded-t-md bg-cyan-500/80 transition-all duration-300 group-hover:brightness-125"
                    style={{ height: `${secHeightPct}%` }}
                  />
                )}
              </div>
              <div className="text-[11px] text-slate-400 group-hover:text-slate-200 mt-2 text-center truncate w-full">
                {item.label}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

// 3. Cyber Radar Spider Chart (Ideal for 16-county multi-dimensional comparison)
export function CyberRadarChart({
  axes,
  series,
  size = 280,
}: {
  axes: string[]; // e.g. ['صنعت', 'کشاورزی', 'بانک', 'امنیت کالا', 'اشتغال', 'درآمد']
  series: { name: string; values: number[]; color: string }[];
  size?: number;
}) {
  const center = size / 2;
  const radius = center - 42;
  const angleStep = (2 * Math.PI) / axes.length;

  const getCoordinates = (value: number, axisIndex: number) => {
    const angle = axisIndex * angleStep - Math.PI / 2;
    const r = (value / 100) * radius;
    return {
      x: center + r * Math.cos(angle),
      y: center + r * Math.sin(angle),
    };
  };

  return (
    <div className="flex flex-col items-center">
      <svg width={size} height={size} className="overflow-visible select-none">
        {/* Concentric spider web polygon rings */}
        {[0.25, 0.5, 0.75, 1].map((level, idx) => {
          const points = axes
            .map((_, i) => {
              const angle = i * angleStep - Math.PI / 2;
              const r = level * radius;
              return `${center + r * Math.cos(angle)},${center + r * Math.sin(angle)}`;
            })
            .join(' ');

          return (
            <polygon
              key={idx}
              points={points}
              fill="none"
              stroke="#334155"
              strokeWidth="0.8"
              opacity="0.5"
            />
          );
        })}

        {/* Axes lines and text labels */}
        {axes.map((axis, i) => {
          const angle = i * angleStep - Math.PI / 2;
          const outerX = center + radius * Math.cos(angle);
          const outerY = center + radius * Math.sin(angle);
          const labelX = center + (radius + 20) * Math.cos(angle);
          const labelY = center + (radius + 20) * Math.sin(angle);

          return (
            <g key={i}>
              <line x1={center} y1={center} x2={outerX} y2={outerY} stroke="#334155" strokeWidth="0.8" opacity="0.6" />
              <text
                x={labelX}
                y={labelY + 4}
                textAnchor="middle"
                fill="#94A3B8"
                fontSize="11"
                className="font-medium"
              >
                {axis}
              </text>
            </g>
          );
        })}

        {/* Data series polygons */}
        {series.map((s, sIdx) => {
          const points = s.values
            .map((val, i) => {
              const { x, y } = getCoordinates(val, i);
              return `${x},${y}`;
            })
            .join(' ');

          return (
            <g key={sIdx}>
              <polygon
                points={points}
                fill={s.color}
                fillOpacity="0.25"
                stroke={s.color}
                strokeWidth="2"
                className="transition-all duration-300"
              />
              {s.values.map((val, i) => {
                const { x, y } = getCoordinates(val, i);
                return <circle key={i} cx={x} cy={y} r="3" fill={s.color} />;
              })}
            </g>
          );
        })}
      </svg>

      {/* Series legend */}
      <div className="flex flex-wrap items-center justify-center gap-4 mt-3 text-xs">
        {series.map((s, idx) => (
          <div key={idx} className="flex items-center gap-1.5">
            <span className="w-2.5 h-2.5 rounded-full inline-block" style={{ backgroundColor: s.color }} />
            <span className="text-slate-300">{s.name}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

// 4. Dial Gauge Meter
export function CyberGaugeMeter({
  value,
  max = 100,
  label,
  unit = '',
  status = 'safe',
}: {
  value: number;
  max?: number;
  label: string;
  unit?: string;
  status?: 'safe' | 'warning' | 'danger';
}) {
  const pct = Math.min(100, Math.max(0, (value / max) * 100));
  const strokeColor = status === 'danger' ? '#F43F5E' : status === 'warning' ? '#F59E0B' : '#10B981';

  // Arc calculation (from 135 deg to 405 deg = 270 deg total)
  const radius = 54;
  const circumference = 2 * Math.PI * radius;
  const strokeDashoffset = circumference - (pct / 100) * (circumference * 0.75);

  return (
    <div className="flex flex-col items-center justify-center p-2">
      <div className="relative w-36 h-28 flex items-center justify-center">
        <svg viewBox="0 0 140 120" className="w-full h-full transform -rotate-90">
          <circle
            cx="70"
            cy="70"
            r={radius}
            fill="none"
            stroke="#1E293B"
            strokeWidth="10"
            strokeDasharray={`${circumference * 0.75} ${circumference}`}
            strokeLinecap="round"
          />
          <circle
            cx="70"
            cy="70"
            r={radius}
            fill="none"
            stroke={strokeColor}
            strokeWidth="10"
            strokeDasharray={`${circumference * 0.75} ${circumference}`}
            strokeDashoffset={strokeDashoffset}
            strokeLinecap="round"
            className="transition-all duration-700 ease-out"
          />
        </svg>
        <div className="absolute inset-0 flex flex-col items-center justify-center pt-4">
          <span className="text-xl font-bold text-white font-mono">{toPersianDigits(value)}</span>
          <span className="text-[11px] text-slate-400">{unit}</span>
        </div>
      </div>
      <span className="text-xs text-slate-300 font-medium -mt-2">{label}</span>
    </div>
  );
}

// 5. Supply Chain Sankey Flow Visualizer
export function CyberSankeyFlow({
  stages,
}: {
  stages: {
    title: string;
    items: { label: string; amount: string; sub?: string }[];
  }[];
}) {
  return (
    <div className="w-full overflow-x-auto py-2">
      <div className="flex items-stretch justify-between gap-4 min-w-[620px]">
        {stages.map((stage, idx) => (
          <React.Fragment key={idx}>
            <div className="flex-1 bg-[#161D31]/80 border border-slate-700/60 rounded-xl p-3 flex flex-col justify-between">
              <div className="text-xs font-bold text-cyan-400 border-b border-slate-700/50 pb-1.5 mb-2">
                {stage.title}
              </div>
              <div className="space-y-2">
                {stage.items.map((it, itIdx) => (
                  <div key={itIdx} className="bg-[#0F1423] p-2 rounded-lg border border-slate-800 text-xs">
                    <div className="text-slate-300 font-medium">{it.label}</div>
                    <div className="font-bold text-white font-mono mt-0.5">{toPersianDigits(it.amount)}</div>
                    {it.sub && <div className="text-[10px] text-slate-500 mt-0.5">{it.sub}</div>}
                  </div>
                ))}
              </div>
            </div>

            {idx < stages.length - 1 && (
              <div className="flex flex-col items-center justify-center px-1 text-slate-600">
                <div className="w-6 h-0.5 bg-gradient-to-l from-cyan-500 to-cyan-500 opacity-60" />
                <span className="text-xs text-cyan-400 font-mono">←</span>
              </div>
            )}
          </React.Fragment>
        ))}
      </div>
    </div>
  );
}
