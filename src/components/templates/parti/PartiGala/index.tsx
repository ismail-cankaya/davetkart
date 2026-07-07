import React from 'react';
import { InvitationComposition } from '../../shared/InvitationComposition';
import { PARTI_GALA } from '../themes';
import { PARTI_FLAVOR } from '../flavors';
import { TemplateProps } from '../../types';

/**
 * Parti — Gala / Glamour: simsiyah zemin, metalik gold çizgiler ve
 * şampanya ışıltısıyla kırmızı halı lüksünde sade bir davet.
 */
export function PartiGala({ invitation, mode = 'preview' }: TemplateProps) {
  return (
    <InvitationComposition
      invitation={invitation}
      flavor={PARTI_FLAVOR}
      mode={mode}
      themeOverride={PARTI_GALA}
      renderHeroBackground={() => (
        <div className="absolute inset-0 bg-[#0a0a0a] bg-gradient-to-b from-[#121110] via-[#0a0a0a] to-black">
          {/* Şampanya ışıması */}
          <div className="absolute -top-24 left-1/2 -translate-x-1/2 w-[440px] h-[440px] bg-[#d4af37]/[0.08] rounded-full blur-3xl" />
          <div className="absolute bottom-0 -right-24 w-72 h-72 bg-[#d4af37]/[0.05] rounded-full blur-3xl" />

          {/* Metalik gold hatlar — sade lüks çerçeve */}
          <div className="absolute top-10 inset-x-8 h-px bg-gradient-to-r from-transparent via-[#d4af37]/50 to-transparent" />
          <div className="absolute bottom-10 inset-x-8 h-px bg-gradient-to-r from-transparent via-[#d4af37]/40 to-transparent" />
          <div className="absolute inset-y-16 left-8 w-px bg-gradient-to-b from-transparent via-[#d4af37]/25 to-transparent" />
          <div className="absolute inset-y-16 right-8 w-px bg-gradient-to-b from-transparent via-[#d4af37]/25 to-transparent" />

          {/* Köşe aksanları */}
          <div className="absolute top-8 left-6 w-6 h-6 border-l border-t border-[#d4af37]/50" />
          <div className="absolute top-8 right-6 w-6 h-6 border-r border-t border-[#d4af37]/50" />
          <div className="absolute bottom-8 left-6 w-6 h-6 border-l border-b border-[#d4af37]/50" />
          <div className="absolute bottom-8 right-6 w-6 h-6 border-r border-b border-[#d4af37]/50" />

          {/* Süzülen altın zerreleri */}
          <div className="absolute top-[24%] left-[18%] w-1 h-1 bg-[#e8cf7a]/80 rounded-full animate-pulse [animation-duration:3.5s]" />
          <div className="absolute top-[36%] right-[20%] w-1.5 h-1.5 bg-[#d4af37]/60 rounded-full animate-pulse [animation-duration:4.5s] [animation-delay:800ms]" />
          <div className="absolute bottom-[30%] left-[28%] w-1 h-1 bg-[#e8cf7a]/50 rounded-full animate-pulse [animation-duration:4s] [animation-delay:1600ms]" />
        </div>
      )}
    />
  );
}
