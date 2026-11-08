'use client';

import { useEffect } from 'react';

export function useLiquidSpotlight() {
  useEffect(() => {
    if (typeof window === 'undefined') return;

    const handlePointerMove = (e: PointerEvent) => {
      if (e.pointerType === 'touch') return;

      // 1. Update Card & Sidebar Liquid Spotlight (--spot-x, --spot-y)
      const targetCard = (e.target as Element)?.closest?.('.card, .sidebar, .glass-panel, .gc-card') as HTMLElement | null;
      if (targetCard) {
        const rect = targetCard.getBoundingClientRect();
        targetCard.style.setProperty('--spot-x', `${e.clientX - rect.left}px`);
        targetCard.style.setProperty('--spot-y', `${e.clientY - rect.top}px`);
      }

      // 2. Update Top Glassy Navbar 3D Tilt & Specular Shine (--shine-x, --tilt-x, --tilt-y)
      const navBar = (e.target as Element)?.closest?.('.gn-bar, .glass-header') as HTMLElement | null;
      if (navBar) {
        const rect = navBar.getBoundingClientRect();
        const x = Math.min(1, Math.max(0, (e.clientX - rect.left) / rect.width));
        const y = Math.min(1, Math.max(0, (e.clientY - rect.top) / rect.height));
        navBar.style.setProperty('--shine-x', `${(x * 100).toFixed(1)}%`);
        navBar.style.setProperty('--tilt-y', `${((x - 0.5) * 1.25).toFixed(2)}deg`);
        navBar.style.setProperty('--tilt-x', `${((0.5 - y) * 1.3).toFixed(2)}deg`);
      }
    };

    document.addEventListener('pointermove', handlePointerMove, { passive: true });
    return () => document.removeEventListener('pointermove', handlePointerMove);
  }, []);
}

export default useLiquidSpotlight;
