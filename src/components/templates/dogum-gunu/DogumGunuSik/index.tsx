import React from 'react';
import { InvitationComposition } from '../../shared/InvitationComposition';
import { DOGUM_GUNU_SIK } from '../themes';
import { DOGUM_GUNU_FLAVOR } from '../flavors';
import { TemplateProps } from '../../types';

/**
 * Doğum Günü — Yetişkin / Şık: simsiyah zemin üzerinde altın ışıltısı,
 * cam (glassmorphism) halkalar ve loş bir kutlama atmosferi.
 */
export function DogumGunuSik({ invitation, mode = 'preview' }: TemplateProps) {
  return (
    <InvitationComposition
      invitation={invitation}
      flavor={DOGUM_GUNU_FLAVOR}
      mode={mode}
      themeOverride={DOGUM_GUNU_SIK}
      renderHeroBackground={() => (
        <div className="absolute inset-0 bg-[#0c0c0f] bg-gradient-to-b from-[#141216] via-[#0c0c0f] to-black">
          {/* Altın şampanya ışıması */}
          <div className="absolute -top-28 left-1/2 -translate-x-1/2 w-[460px] h-[460px] bg-amber-400/10 rounded-full blur-3xl" />
          <div className="absolute bottom-1/4 -left-24 w-72 h-72 bg-yellow-600/10 rounded-full blur-3xl" />

          {/* Glass halkalar */}
          <div className="absolute top-[16%] right-[8%] w-44 h-44 rounded-full border border-white/10 bg-white/[0.03] backdrop-blur-sm" />
          <div className="absolute top-[26%] right-[20%] w-24 h-24 rounded-full border border-amber-300/20 bg-amber-300/[0.04] backdrop-blur-sm" />
          <div className="absolute bottom-[18%] left-[10%] w-32 h-32 rounded-full border border-white/[0.07] bg-white/[0.02] backdrop-blur-sm" />

          {/* Yükselen altın kabarcıklar */}
          <div className="absolute bottom-[30%] left-[30%] w-1 h-1 bg-amber-200/80 rounded-full animate-pulse" />
          <div className="absolute bottom-[42%] left-[36%] w-1.5 h-1.5 bg-amber-300/60 rounded-full animate-pulse [animation-delay:700ms]" />
          <div className="absolute bottom-[54%] left-[32%] w-1 h-1 bg-yellow-200/50 rounded-full animate-pulse [animation-delay:1400ms]" />

          {/* İnce altın çizgi — lüks dokunuş */}
          <div className="absolute top-[10%] left-1/2 -translate-x-1/2 w-24 h-px bg-gradient-to-r from-transparent via-amber-300/60 to-transparent" />
        </div>
      )}
    />
  );
}
