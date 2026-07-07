import React from 'react';
import { InvitationComposition } from '../../shared/InvitationComposition';
import { MEZUNIYET_DINAMIK } from '../themes';
import { MEZUNIYET_FLAVOR } from '../flavors';
import { TemplateProps } from '../../types';

/**
 * Mezuniyet — Dinamik: simsiyah zemin, fosforlu lime çizgiler ve
 * asimetrik clip-path kesimleriyle enerjik, genç bir kompozisyon.
 */
export function MezuniyetDinamik({ invitation, mode = 'preview' }: TemplateProps) {
  return (
    <InvitationComposition
      invitation={invitation}
      flavor={MEZUNIYET_FLAVOR}
      mode={mode}
      themeOverride={MEZUNIYET_DINAMIK}
      renderHeroBackground={() => (
        <div className="absolute inset-0 bg-[#050505]">
          {/* Asimetrik fosforlu kesim — sağ üst */}
          <div className="absolute top-0 right-0 w-3/4 h-2/5 bg-gradient-to-bl from-lime-400/[0.08] to-transparent [clip-path:polygon(100%_0,100%_100%,15%_0)]" />
          {/* Asimetrik kesim — sol alt */}
          <div className="absolute bottom-0 left-0 w-2/3 h-1/3 bg-gradient-to-tr from-lime-400/[0.06] to-transparent [clip-path:polygon(0_100%,100%_100%,0_20%)]" />

          {/* Fosforlu ışık odağı */}
          <div className="absolute top-1/4 -right-20 w-72 h-72 bg-lime-400/15 rounded-full blur-3xl" />
          <div className="absolute bottom-1/4 -left-16 w-56 h-56 bg-lime-500/10 rounded-full blur-3xl" />

          {/* İnce neon çizgiler */}
          <div className="absolute top-[20%] left-0 w-1/2 h-px bg-gradient-to-r from-lime-400/70 to-transparent" />
          <div className="absolute top-[22%] left-0 w-1/3 h-px bg-gradient-to-r from-lime-400/40 to-transparent" />
          <div className="absolute bottom-[26%] right-0 w-2/5 h-px bg-gradient-to-l from-lime-400/60 to-transparent" />

          {/* Köşe koordinat işaretleri — teknik/dinamik doku */}
          <div className="absolute top-6 left-6 w-5 h-5 border-l-2 border-t-2 border-lime-400/50" />
          <div className="absolute bottom-6 right-6 w-5 h-5 border-r-2 border-b-2 border-lime-400/50" />

          {/* Fosforlu nokta vurgular */}
          <div className="absolute top-[36%] right-[16%] w-1.5 h-1.5 bg-lime-400 rounded-full shadow-[0_0_12px_rgba(163,230,53,0.9)] animate-pulse" />
          <div className="absolute bottom-[38%] left-[20%] w-1 h-1 bg-lime-300 rounded-full shadow-[0_0_10px_rgba(190,242,100,0.8)] animate-pulse [animation-delay:800ms]" />
        </div>
      )}
    />
  );
}
