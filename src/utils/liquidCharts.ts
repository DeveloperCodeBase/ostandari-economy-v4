/**
 * مرکز فرماندهی و تصمیم‌یار هوشمند اقتصادی استانداری تهران
 * موتور نمودارهای اختصاصی SVG شیشه‌ای و نئونی (Liquid Glass SVG Charts Engine V3.0)
 * طراحی و معماری توسط: شرکت شبکه هوشمند ابتکار ویستا © ۱۴۰۵
 * OFFICIAL PALETTE: Electric Cyan, State Emerald, Sapphire Blue, Treasury Gold (Zero Purple)
 */

export const LiquidCharts = {
  // 1. Vertical Glowing Bar Chart (Revenue / Taxes)
  revenue: (values: number[], labels: string[], unit = 'همت'): string => {
    const max = Math.max(...values, 10);
    const height = 180;
    const width = 360;
    const barWidth = 32;
    const count = values.length;
    const step = width / (count + 1);

    const bars = values.map((val, idx) => {
      const barH = (val / max) * 120;
      const x = step * (idx + 1) - barWidth / 2;
      const y = height - 35 - barH;
      const isMax = val === max;
      return `
        <g class="chart-col ${isMax ? 'is-peak' : ''}">
          <defs>
            <linearGradient id="revGrad-${idx}" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stop-color="${isMax ? '#38bdf8' : '#0284c7'}" stop-opacity="0.95" />
              <stop offset="100%" stop-color="${isMax ? '#0284c7' : '#0f2942'}" stop-opacity="0.6" />
            </linearGradient>
          </defs>
          <rect x="${x}" y="${y}" width="${barWidth}" height="${barH}" rx="8" fill="url(#revGrad-${idx})" />
          <rect x="${x + 2}" y="${y + 2}" width="${barWidth - 4}" height="3" rx="1.5" fill="#ffffffaa" />
          <text x="${x + barWidth / 2}" y="${y - 8}" text-anchor="middle" fill="${isMax ? '#38bdf8' : '#cbd5e1'}" font-size="11" font-weight="700" font-family="Vazirmatn">${val} ${unit}</text>
          <text x="${x + barWidth / 2}" y="${height - 12}" text-anchor="middle" fill="#94a3b8" font-size="10" font-family="Vazirmatn">${labels[idx] || ''}</text>
        </g>
      `;
    }).join('');

    return `
      <svg viewBox="0 0 ${width} ${height}" class="w-full h-full select-none" xmlns="http://www.w3.org/2000/svg">
        <line x1="20" y1="${height - 35}" x2="${width - 20}" y2="${height - 35}" stroke="rgba(255,255,255,0.12)" stroke-dasharray="3,3" />
        <line x1="20" y1="${height - 95}" x2="${width - 20}" y2="${height - 95}" stroke="rgba(255,255,255,0.06)" stroke-dasharray="3,3" />
        ${bars}
      </svg>
    `;
  },

  // 2. Spline fulfillment curve (Flour / Energy / Prices)
  fulfillment: (values: number[], labels: string[], color = '#38bdf8'): string => {
    const max = Math.max(...values, 10);
    const min = Math.min(...values, 0);
    const width = 360;
    const height = 160;
    const paddingX = 25;
    const paddingY = 25;
    const innerW = width - paddingX * 2;
    const innerH = height - paddingY * 2;

    const points = values.map((v, i) => {
      const x = paddingX + (i / (values.length - 1)) * innerW;
      const y = height - paddingY - ((v - min) / (max - min || 1)) * innerH;
      return { x, y, val: v };
    });

    let d = `M ${points[0].x} ${points[0].y}`;
    for (let i = 0; i < points.length - 1; i++) {
      const p0 = points[i];
      const p1 = points[i + 1];
      const cx = (p0.x + p1.x) / 2;
      d += ` C ${cx} ${p0.y}, ${cx} ${p1.y}, ${p1.x} ${p1.y}`;
    }

    const areaD = `${d} L ${points[points.length - 1].x} ${height - paddingY} L ${points[0].x} ${height - paddingY} Z`;

    const dots = points.map((p, idx) => `
      <g>
        <circle cx="${p.x}" cy="${p.y}" r="4.5" fill="${color}" stroke="#060d19" stroke-width="2" />
        <circle cx="${p.x}" cy="${p.y}" r="7" fill="${color}" opacity="0.3" />
        <text x="${p.x}" y="${p.y - 10}" text-anchor="middle" fill="#f1f5fd" font-size="10" font-weight="700" font-family="Vazirmatn">${p.val}</text>
        <text x="${p.x}" y="${height - 6}" text-anchor="middle" fill="#94a3b8" font-size="9" font-family="Vazirmatn">${labels[idx] || ''}</text>
      </g>
    `).join('');

    return `
      <svg viewBox="0 0 ${width} ${height}" class="w-full h-full select-none" xmlns="http://www.w3.org/2000/svg">
        <defs>
          <linearGradient id="areaGrad" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stop-color="${color}" stop-opacity="0.35" />
            <stop offset="100%" stop-color="${color}" stop-opacity="0.0" />
          </linearGradient>
        </defs>
        <path d="${areaD}" fill="url(#areaGrad)" />
        <path d="${d}" fill="none" stroke="${color}" stroke-width="2.5" stroke-linecap="round" />
        ${dots}
      </svg>
    `;
  },

  // 3. Dual Throughput Bar (Banking In/Out, Customs Import/Export)
  throughput: (
    pairs: Array<[number, number] | { inVal: number; outVal: number }>,
    labels: string[]
  ): string => {
    const width = 360;
    const height = 170;
    const normalized = pairs.map((p) =>
      Array.isArray(p) ? { inVal: p[0], outVal: p[1] } : p
    );
    const allVals = normalized.flatMap((p) => [p.inVal, p.outVal]);
    const max = Math.max(...allVals, 10);
    const barW = 12;
    const count = normalized.length;
    const step = width / (count + 1);

    const elements = normalized.map((pair, idx) => {
      const centerX = step * (idx + 1);
      const inH = (pair.inVal / max) * 110;
      const outH = (pair.outVal / max) * 110;
      const inY = height - 30 - inH;
      const outY = height - 30 - outH;
      return `
        <g>
          <!-- Inflow Bar (Cyan / Sapphire) -->
          <rect x="${centerX - barW - 2}" y="${inY}" width="${barW}" height="${inH}" rx="4" fill="url(#tpNavy)" />
          <!-- Outflow Bar (Emerald) -->
          <rect x="${centerX + 2}" y="${outY}" width="${barW}" height="${outH}" rx="4" fill="url(#tpEmerald)" />
          <text x="${centerX}" y="${height - 10}" text-anchor="middle" fill="#94a3b8" font-size="9.5" font-family="Vazirmatn">${labels[idx] || ''}</text>
        </g>
      `;
    }).join('');

    return `
      <svg viewBox="0 0 ${width} ${height}" class="w-full h-full select-none" xmlns="http://www.w3.org/2000/svg">
        <defs>
          <linearGradient id="tpNavy" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stop-color="#38bdf8" /><stop offset="100%" stop-color="#0284c7" />
          </linearGradient>
          <linearGradient id="tpEmerald" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stop-color="#34d399" /><stop offset="100%" stop-color="#059669" />
          </linearGradient>
        </defs>
        <line x1="20" y1="${height - 30}" x2="${width - 20}" y2="${height - 30}" stroke="rgba(255,255,255,0.12)" />
        ${elements}
      </svg>
    `;
  },

  // 4. Cohort / Dual Line (Gov Approved vs Free Market, Greenhouses vs Traditional)
  cohort: (seriesA: number[], seriesB: number[], labels: string[]): string => {
    const max = Math.max(...seriesA, ...seriesB, 10);
    const width = 360;
    const height = 160;
    const paddingX = 30;
    const innerW = width - paddingX * 2;
    const innerH = 100;

    const getPath = (vals: number[]) => {
      const pts = vals.map((v, i) => ({
        x: paddingX + (i / (vals.length - 1)) * innerW,
        y: height - 35 - (v / max) * innerH,
      }));
      let str = `M ${pts[0].x} ${pts[0].y}`;
      for (let i = 0; i < pts.length - 1; i++) {
        const cx = (pts[i].x + pts[i + 1].x) / 2;
        str += ` C ${cx} ${pts[i].y}, ${cx} ${pts[i + 1].y}, ${pts[i + 1].x} ${pts[i + 1].y}`;
      }
      return { path: str, points: pts };
    };

    const lineA = getPath(seriesA);
    const lineB = getPath(seriesB);

    return `
      <svg viewBox="0 0 ${width} ${height}" class="w-full h-full select-none" xmlns="http://www.w3.org/2000/svg">
        <path d="${lineA.path}" fill="none" stroke="#10b981" stroke-width="2.5" />
        <path d="${lineB.path}" fill="none" stroke="#38bdf8" stroke-width="2" stroke-dasharray="4,4" />
        ${lineA.points.map((p, idx) => `
          <circle cx="${p.x}" cy="${p.y}" r="4" fill="#10b981" stroke="#060d19" stroke-width="1.5" />
          <text x="${p.x}" y="${height - 12}" text-anchor="middle" fill="#94a3b8" font-size="9" font-family="Vazirmatn">${labels[idx] || ''}</text>
        `).join('')}
        ${lineB.points.map((p) => `<circle cx="${p.x}" cy="${p.y}" r="3" fill="#38bdf8" />`).join('')}
      </svg>
    `;
  },

  // 5. Donut Chart (GDP Sectoral Composition: Services 68.2%, Industry 26%, Agri 4.1%)
  donut: (values: number[], labels: string[], colors = ['#0284c7', '#38bdf8', '#10b981', '#f59e0b']): string => {
    const total = values.reduce((a, b) => a + b, 0) || 1;
    const size = 160;
    const strokeWidth = 22;
    const radius = (size - strokeWidth) / 2;
    const circumference = 2 * Math.PI * radius;
    let accumulatedAngle = 0;

    const segments = values.map((val, idx) => {
      const fraction = val / total;
      const strokeLength = fraction * circumference;
      const strokeDashoffset = -accumulatedAngle;
      accumulatedAngle += strokeLength;
      return `
        <circle cx="${size / 2}" cy="${size / 2}" r="${radius}"
          fill="none" stroke="${colors[idx % colors.length]}" stroke-width="${strokeWidth}"
          stroke-dasharray="${strokeLength} ${circumference}"
          stroke-dashoffset="${strokeDashoffset}"
          stroke-linecap="round" />
      `;
    }).join('');

    return `
      <svg viewBox="0 0 ${size} ${size}" class="w-36 h-36 mx-auto select-none" xmlns="http://www.w3.org/2000/svg" style="transform: rotate(-90deg);">
        ${segments}
        <circle cx="${size / 2}" cy="${size / 2}" r="${radius - strokeWidth / 2 - 2}" fill="var(--lg-canvas)" />
      </svg>
    `;
  },

  // 6. 3 Concentric Telemetry Rings (Banking LDR, Capital Adequacy, NPL)
  telemetry: (r1: number, r2: number, r3: number, labels?: string[]): string => {
    const size = 170;
    const center = size / 2;
    const rings = [
      { r: 70, val: Math.min(100, r1), color: '#38bdf8' },
      { r: 52, val: Math.min(100, r2), color: '#0284c7' },
      { r: 35, val: Math.min(100, r3), color: '#10b981' },
    ];

    const svgRings = rings.map((ring) => {
      const circ = 2 * Math.PI * ring.r;
      const dash = (ring.val / 100) * circ;
      return `
        <circle cx="${center}" cy="${center}" r="${ring.r}" fill="none" stroke="rgba(255,255,255,0.08)" stroke-width="8" />
        <circle cx="${center}" cy="${center}" r="${ring.r}" fill="none" stroke="${ring.color}" stroke-width="8"
          stroke-dasharray="${dash} ${circ}" stroke-linecap="round"
          style="transform: rotate(-90deg); transform-origin: ${center}px ${center}px;" />
      `;
    }).join('');

    return `
      <svg viewBox="0 0 ${size} ${size}" class="w-40 h-40 mx-auto select-none" xmlns="http://www.w3.org/2000/svg">
        ${svgRings}
        <text x="${center}" y="${center + 4}" text-anchor="middle" fill="#ffffff" font-size="14" font-weight="900" font-family="Vazirmatn">${Math.round(r1)}٪</text>
      </svg>
    `;
  },

  // 7. 180-Degree Market Stability Gauge
  gauge: (val: number, label = 'شاخص آرامش بازار'): string => {
    const clamped = Math.max(0, Math.min(100, val));
    const size = 180;
    const radius = 70;
    const center = size / 2;
    const semiCirc = Math.PI * radius;
    const dash = (clamped / 100) * semiCirc;

    return `
      <svg viewBox="0 0 ${size} ${size / 2 + 30}" class="w-44 mx-auto select-none" xmlns="http://www.w3.org/2000/svg">
        <defs>
          <linearGradient id="gaugeGrad" x1="0" y1="0" x2="1" y2="0">
            <stop offset="0%" stop-color="#38bdf8" />
            <stop offset="50%" stop-color="#0284c7" />
            <stop offset="100%" stop-color="#10b981" />
          </linearGradient>
        </defs>
        <path d="M ${center - radius} ${center} A ${radius} ${radius} 0 0 1 ${center + radius} ${center}"
          fill="none" stroke="rgba(255,255,255,0.1)" stroke-width="14" stroke-linecap="round" />
        <path d="M ${center - radius} ${center} A ${radius} ${radius} 0 0 1 ${center + radius} ${center}"
          fill="none" stroke="url(#gaugeGrad)" stroke-width="14" stroke-dasharray="${dash} ${semiCirc}" stroke-linecap="round" />
        <text x="${center}" y="${center - 10}" text-anchor="middle" fill="#ffffff" font-size="22" font-weight="900" font-family="Vazirmatn">${clamped}٪</text>
        <text x="${center}" y="${center + 16}" text-anchor="middle" fill="#94a3b8" font-size="11" font-family="Vazirmatn">${label}</text>
      </svg>
    `;
  },

  // 8. Glowing Capsule Matrix for Seasonal Targets (Q1 - Q4)
  capsules: (activeQuarter: string, values: number[], labels: string[]): string => {
    const width = 360;
    const height = 150;
    const count = values.length;
    const colW = 60;
    const step = width / (count + 1);

    const items = values.map((val, idx) => {
      const x = step * (idx + 1) - colW / 2;
      const isSel = labels[idx]?.includes(activeQuarter);
      const capH = (val / 100) * 80;
      const capY = height - 35 - capH;
      return `
        <g class="capsule-col">
          <rect x="${x}" y="20" width="${colW}" height="95" rx="16" fill="rgba(255,255,255,0.05)" stroke="rgba(255,255,255,0.1)" />
          <rect x="${x + 4}" y="${capY}" width="${colW - 8}" height="${capH}" rx="12"
            fill="${isSel ? 'url(#capActive)' : 'url(#capNormal)'}" />
          <circle cx="${x + colW / 2}" cy="${capY + 8}" r="4" fill="#ffffff" />
          <text x="${x + colW / 2}" y="${capY - 6}" text-anchor="middle" fill="${isSel ? '#38bdf8' : '#cbd5e1'}" font-size="10" font-weight="700" font-family="Vazirmatn">${val}٪</text>
          <text x="${x + colW / 2}" y="${height - 10}" text-anchor="middle" fill="${isSel ? '#38bdf8' : '#94a3b8'}" font-size="11" font-weight="600" font-family="Vazirmatn">${labels[idx] || ''}</text>
        </g>
      `;
    }).join('');

    return `
      <svg viewBox="0 0 ${width} ${height}" class="w-full h-full select-none" xmlns="http://www.w3.org/2000/svg">
        <defs>
          <linearGradient id="capActive" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stop-color="#38bdf8" /><stop offset="100%" stop-color="#0284c7" />
          </linearGradient>
          <linearGradient id="capNormal" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stop-color="#0284c7" /><stop offset="100%" stop-color="#0f2942" />
          </linearGradient>
        </defs>
        ${items}
      </svg>
    `;
  },
};
