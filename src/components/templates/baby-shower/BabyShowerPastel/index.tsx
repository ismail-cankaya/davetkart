import React from 'react';
import { InvitationComposition } from '../../shared/InvitationComposition';
import { BABY_SHOWER_PASTEL } from '../themes';
import { BABY_SHOWER_FLAVOR } from '../flavors';
import { TemplateProps } from '../../types';

/**
 * Baby Shower — Yumuşak Pastel: pudra pembesi ile bebek mavisinin
 * bulutlar ve minik yıldızlarla buluştuğu, pamuk gibi bir gökyüzü.
 */
export function BabyShowerPastel({ invitation, mode = 'preview' }: TemplateProps) {
  return (
    <InvitationComposition
      invitation={invitation}
      flavor={BABY_SHOWER_FLAVOR}
      mode={mode}
      themeOverride={BABY_SHOWER_PASTEL}
      renderHeroBackground={() => (
        <div className="absolute inset-0 bg-gradient-to-b from-sky-50 via-[#fdf6f8] to-rose-50">
          {/* Pamuk yumuşaklığında ışık kümeleri */}
          <div className="absolute -top-16 left-1/4 w-80 h-80 bg-rose-200/40 rounded-full blur-3xl" />
          <div className="absolute top-1/3 -right-20 w-72 h-72 bg-sky-200/40 rounded-full blur-3xl" />
          <div className="absolute bottom-0 -left-16 w-72 h-72 bg-rose-100/60 rounded-full blur-3xl" />

          {/* Bulutlar */}
          <svg className="absolute top-[14%] left-[10%] w-28 h-16 text-white" viewBox="0 0 100 50" fill="currentColor">
            <path d="M22 40a13 13 0 0 1 24-8 11 11 0 0 1 20 6 9 9 0 0 1 12 2H24a10 10 0 0 1-2 0Z" opacity="0.9" />
          </svg>
          <svg className="absolute top-[26%] right-[8%] w-20 h-12 text-white" viewBox="0 0 100 50" fill="currentColor">
            <path d="M22 40a13 13 0 0 1 24-8 11 11 0 0 1 20 6 9 9 0 0 1 12 2H24a10 10 0 0 1-2 0Z" opacity="0.75" />
          </svg>

          {/* Uyuyan ay */}
          <svg className="absolute bottom-[14%] right-[12%] w-16 h-16 text-rose-300/60" viewBox="0 0 24 24" fill="none">
            <path d="M13 3.5a8.5 8.5 0 1 0 7.5 12.6A7 7 0 1 1 13 3.5Z" stroke="currentColor" strokeWidth="1" strokeLinejoin="round" />
          </svg>

          {/* Minik yıldızlar */}
          <div className="absolute top-[38%] left-[16%] w-1.5 h-1.5 bg-sky-300/70 rounded-full animate-pulse [animation-duration:3s]" />
          <div className="absolute top-[48%] right-[22%] w-1 h-1 bg-rose-300/70 rounded-full animate-pulse [animation-duration:4s] [animation-delay:900ms]" />
          <div className="absolute bottom-[30%] left-[28%] w-1 h-1 bg-sky-200/80 rounded-full animate-pulse [animation-duration:3.5s] [animation-delay:1500ms]" />
        </div>
      )}
    />
  );
}
