import React from 'react';
import { InvitationComposition } from '../../shared/InvitationComposition';
import { DOGUM_GUNU_NESELI } from '../themes';
import { DOGUM_GUNU_FLAVOR } from '../flavors';
import { TemplateProps } from '../../types';

/**
 * Doğum Günü — Canlı / Eğlenceli: pastel-canlı gradient bulutları,
 * süzülen konfeti ve yuvarlak hatlarıyla neşe saçan bir sahne.
 */
export function DogumGunuNeseli({ invitation, mode = 'preview' }: TemplateProps) {
  return (
    <InvitationComposition
      invitation={invitation}
      flavor={DOGUM_GUNU_FLAVOR}
      mode={mode}
      themeOverride={DOGUM_GUNU_NESELI}
      renderHeroBackground={() => (
        <div className="absolute inset-0 bg-gradient-to-br from-rose-100 via-[#fff7fa] to-sky-100">
          {/* Canlı pastel ışık toplari */}
          <div className="absolute -top-16 -left-16 w-80 h-80 bg-fuchsia-300/40 rounded-full blur-3xl animate-pulse [animation-duration:5s]" />
          <div className="absolute top-1/4 -right-20 w-72 h-72 bg-orange-200/50 rounded-full blur-3xl animate-pulse [animation-duration:6s] [animation-delay:1s]" />
          <div className="absolute bottom-0 left-1/4 w-96 h-96 bg-sky-200/50 rounded-full blur-3xl" />

          {/* Konfeti parçacıkları */}
          <div className="absolute top-[12%] left-[18%] w-2.5 h-2.5 bg-fuchsia-400/60 rounded-full" />
          <div className="absolute top-[22%] right-[14%] w-2 h-2 bg-orange-400/60 rotate-[24deg] rounded-[2px]" />
          <div className="absolute top-[38%] left-[10%] w-1.5 h-4 bg-sky-400/50 rotate-[-18deg] rounded-full" />
          <div className="absolute bottom-[24%] right-[20%] w-2.5 h-2.5 bg-rose-400/50 rounded-full" />
          <div className="absolute bottom-[34%] left-[26%] w-2 h-2 bg-violet-400/50 rotate-[40deg] rounded-[2px]" />

          {/* Balon çizgileri */}
          <svg className="absolute bottom-[8%] right-[6%] w-36 h-44 text-rose-400/40" viewBox="0 0 100 120" fill="none">
            <ellipse cx="36" cy="30" rx="18" ry="22" stroke="currentColor" strokeWidth="1.4" />
            <path d="M36 52c-3 18 4 34 14 60" stroke="currentColor" strokeWidth="1" strokeLinecap="round" />
            <ellipse cx="68" cy="20" rx="13" ry="16" stroke="currentColor" strokeWidth="1.4" className="text-orange-400/50" />
            <path d="M68 36c2 22-6 42-16 76" stroke="currentColor" strokeWidth="1" strokeLinecap="round" className="text-orange-400/50" />
          </svg>
        </div>
      )}
    />
  );
}
