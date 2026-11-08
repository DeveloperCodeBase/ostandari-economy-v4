'use client';

import React from 'react';

interface TehranGovernorateLogoProps {
  size?: 'sm' | 'md' | 'lg' | 'xl' | 'seal';
  className?: string;
  variant?: 'gold' | 'monochrome' | 'cyan' | 'full';
  showText?: boolean;
  subText?: string;
}

export function TehranGovernorateLogo({
  size = 'md',
  className = '',
  variant = 'gold',
  showText = false,
  subText = 'استانداری تهران',
}: TehranGovernorateLogoProps) {
  const sizeMap = {
    sm: { box: 'w-8 h-8', px: 32 },
    md: { box: 'w-10 h-10', px: 40 },
    lg: { box: 'w-14 h-14', px: 56 },
    xl: { box: 'w-20 h-20', px: 80 },
    seal: { box: 'w-24 h-24', px: 96 },
  };

  const { box, px } = sizeMap[size] || sizeMap.md;

  return (
    <div className={`inline-flex items-center gap-3 ${className}`}>
      {/* Official Tehran Governorate Heraldic SVG Emblem */}
      <div
        className={`relative ${box} shrink-0 select-none flex items-center justify-center`}
        title="نشان رسمی استانداری تهران — جمهوری اسلامی ایران"
      >
        <svg
          viewBox="0 0 120 120"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="w-full h-full drop-shadow-md transition-transform duration-300 hover:scale-105"
        >
          <defs>
            {/* Rich Sovereign Gold Gradient */}
            <linearGradient id="govGoldGrad" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#FDE68A" />
              <stop offset="35%" stopColor="#D97706" />
              <stop offset="70%" stopColor="#B45309" />
              <stop offset="100%" stopColor="#78350F" />
            </linearGradient>

            {/* Cyan-Deep Navy Background Gradient */}
            <linearGradient id="govBgGrad" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#0E7490" />
              <stop offset="50%" stopColor="#0369A1" />
              <stop offset="100%" stopColor="#0B132B" />
            </linearGradient>

            {/* Inner Ring Glow */}
            <radialGradient id="govGlow" cx="50%" cy="50%" r="50%">
              <stop offset="60%" stopColor="#0284C7" stopOpacity="0.4" />
              <stop offset="100%" stopColor="#0284C7" stopOpacity="0" />
            </radialGradient>
          </defs>

          {/* Outer Sunburst & Star Rosette (12-point Islamic geometric foundation) */}
          <circle cx="60" cy="60" r="56" fill="url(#govBgGrad)" stroke="url(#govGoldGrad)" strokeWidth="2.5" />
          <circle cx="60" cy="60" r="52" fill="none" stroke="#FDE68A" strokeWidth="0.75" strokeDasharray="2 2" opacity="0.6" />
          <circle cx="60" cy="60" r="48" fill="url(#govGlow)" />

          {/* Wreath of Golden Wheat Sheaves & Laurel Branches (left & right) */}
          {/* Left Laurel */}
          <g stroke="url(#govGoldGrad)" strokeWidth="1.6" fill="url(#govGoldGrad)" strokeLinecap="round">
            <path d="M 30 78 C 22 62, 24 45, 34 32" fill="none" />
            {/* Laurel leaves left */}
            <ellipse cx="26" cy="70" rx="3.5" ry="1.8" transform="rotate(-30 26 70)" />
            <ellipse cx="23" cy="58" rx="3.5" ry="1.8" transform="rotate(-15 23 58)" />
            <ellipse cx="24" cy="46" rx="3.5" ry="1.8" transform="rotate(10 24 46)" />
            <ellipse cx="28" cy="36" rx="3.5" ry="1.8" transform="rotate(35 28 36)" />
            <ellipse cx="35" cy="28" rx="3.5" ry="1.8" transform="rotate(55 35 28)" />
          </g>

          {/* Right Laurel */}
          <g stroke="url(#govGoldGrad)" strokeWidth="1.6" fill="url(#govGoldGrad)" strokeLinecap="round">
            <path d="M 90 78 C 98 62, 96 45, 86 32" fill="none" />
            {/* Laurel leaves right */}
            <ellipse cx="94" cy="70" rx="3.5" ry="1.8" transform="rotate(30 94 70)" />
            <ellipse cx="97" cy="58" rx="3.5" ry="1.8" transform="rotate(15 97 58)" />
            <ellipse cx="96" cy="46" rx="3.5" ry="1.8" transform="rotate(-10 96 46)" />
            <ellipse cx="92" cy="36" rx="3.5" ry="1.8" transform="rotate(-35 92 36)" />
            <ellipse cx="85" cy="28" rx="3.5" ry="1.8" transform="rotate(-55 85 28)" />
          </g>

          {/* Central Official Emblem of the Islamic Republic of Iran (نشان رسمی ج.ا.ا) */}
          <g fill="url(#govGoldGrad)">
            {/* Central vertical sword / pillar */}
            <path d="M 58.5 28 C 58.5 26, 61.5 26, 61.5 28 L 61.5 70 C 61.5 72, 58.5 72, 58.5 70 Z" />
            <path d="M 60 22 L 62.5 27 L 57.5 27 Z" /> {/* Top tip */}

            {/* Inner crescents */}
            <path d="M 57 40 C 50 44, 50 56, 57 62 C 55 58, 55 45, 57 40 Z" />
            <path d="M 63 40 C 70 44, 70 56, 63 62 C 65 58, 65 45, 63 40 Z" />

            {/* Outer crescents */}
            <path d="M 56 32 C 43 38, 43 62, 56 70 C 47 62, 47 40, 56 32 Z" />
            <path d="M 64 32 C 77 38, 77 62, 64 70 C 73 62, 73 40, 64 32 Z" />

            {/* Tashdid above sword */}
            <path d="M 57 23 C 58 22, 59 23, 60 22 C 61 23, 62 22, 63 23 C 62 24, 61 23.5, 60 24 C 59 23.5, 58 24, 57 23 Z" />
          </g>

          {/* Official Curved Gold Ribbon / Plaque at Bottom */}
          <path
            d="M 28 86 Q 60 97 92 86 L 94 94 Q 60 106 26 94 Z"
            fill="url(#govGoldGrad)"
            stroke="#78350F"
            strokeWidth="0.8"
          />

          {/* Calligraphic Inscription: استانداری تهران */}
          <text
            x="60"
            y="94.5"
            textAnchor="middle"
            fill="#1E1B4B"
            fontSize="7"
            fontWeight="900"
            fontFamily="sans-serif"
            letterSpacing="0.2"
          >
            استانداری تهران
          </text>
        </svg>
      </div>

      {/* Optional Side Lockup Typography */}
      {showText && (
        <div className="flex flex-col text-right">
          <span className="text-[10px] text-[var(--lg-muted)] font-medium leading-tight">
            جمهوری اسلامی ایران · وزارت کشور
          </span>
          <span className="font-extrabold text-sm sm:text-base text-[var(--lg-ink)] tracking-tight leading-snug">
            {subText}
          </span>
          <span className="text-[10px] text-cyan-600 dark:text-cyan-400 font-semibold">
            سکوی تصمیم‌یار اقتصادی استاندار
          </span>
        </div>
      )}
    </div>
  );
}

export default TehranGovernorateLogo;
