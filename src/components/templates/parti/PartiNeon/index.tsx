import React from 'react';
import { InvitationComposition } from '../../shared/InvitationComposition';
import { PARTI_NEON } from '../themes';
import { PARTI_FLAVOR } from '../flavors';
import { TemplateProps } from '../../types';

/**
 * Parti — Neon Gece: koyu kulüp atmosferinde cyan-pembe neon glow'lar,
 * ışıldayan halka ve lazer huzmeleriyle elektrik yüklü bir sahne.
 */
export function PartiNeon({ invitation, mode = 'preview' }: TemplateProps) {
  return (
    <InvitationComposition
      invitation={invitation}
      flavor={PARTI_FLAVOR}
      mode={mode}
      themeOverride={PARTI_NEON}
      renderHeroBackground={() => (
        <div className="absolute inset-0 bg-[#07070f]">
          {/* Neon ışık kaynakları */}
          <div className="absolute -top-24 -left-24 w-96 h-96 bg-cyan-500/25 rounded-full blur-3xl mix-blend-screen animate-pulse [animation-duration:4s]" />
          <div className="absolute top-1/3 -right-28 w-96 h-96 bg-fuchsia-600/25 rounded-full blur-3xl mix-blend-screen animate-pulse [animation-duration:5s] [animation-delay:1s]" />
          <div className="absolute -bottom-20 left-1/4 w-80 h-80 bg-violet-600/20 rounded-full blur-3xl mix-blend-screen" />

          {/* Neon halka — sahnenin odağı */}
          <div className="absolute top-[16%] left-1/2 -translate-x-1/2 w-56 h-56 rounded-full border-2 border-cyan-400/50 shadow-[0_0_40px_rgba(34,211,238,0.35),inset_0_0_40px_rgba(34,211,238,0.15)]" />
          <div className="absolute top-[18%] left-1/2 -translate-x-1/2 w-48 h-48 rounded-full border border-fuchsia-500/40 shadow-[0_0_30px_rgba(217,70,239,0.3)]" />

          {/* Lazer huzmeleri */}
          <div className="absolute top-0 left-[20%] w-px h-2/5 bg-gradient-to-b from-cyan-400/60 to-transparent rotate-[14deg] origin-top" />
          <div className="absolute top-0 right-[24%] w-px h-1/3 bg-gradient-to-b from-fuchsia-500/60 to-transparent -rotate-[18deg] origin-top" />

          {/* Parıltı noktaları */}
          <div className="absolute top-[40%] left-[14%] w-1.5 h-1.5 bg-cyan-300 rounded-full shadow-[0_0_12px_rgba(103,232,249,0.9)] animate-pulse" />
          <div className="absolute top-[52%] right-[16%] w-1 h-1 bg-fuchsia-400 rounded-full shadow-[0_0_10px_rgba(232,121,249,0.9)] animate-pulse [animation-delay:700ms]" />
          <div className="absolute bottom-[26%] left-[30%] w-1 h-1 bg-violet-300 rounded-full shadow-[0_0_10px_rgba(196,181,253,0.8)] animate-pulse [animation-delay:1300ms]" />

          {/* Zemin yansıması */}
          <div className="absolute bottom-0 inset-x-0 h-40 bg-gradient-to-t from-cyan-950/40 to-transparent" />
        </div>
      )}
    />
  );
}
