import React from 'react';
import { InvitationComposition } from '../../shared/InvitationComposition';
import { MEZUNIYET_AKADEMIK } from '../themes';
import { MEZUNIYET_FLAVOR } from '../flavors';
import { TemplateProps } from '../../types';

/**
 * Mezuniyet — Akademik: lacivert cübbe dokusu üzerine gold defne dalları,
 * resmi çift çerçeve ve serif tipografiyle tören vakarında bir davet.
 */
export function MezuniyetAkademik({ invitation, mode = 'preview' }: TemplateProps) {
  return (
    <InvitationComposition
      invitation={invitation}
      flavor={MEZUNIYET_FLAVOR}
      mode={mode}
      themeOverride={MEZUNIYET_AKADEMIK}
      renderHeroBackground={() => (
        <div className="absolute inset-0 bg-[#101f3e] bg-gradient-to-b from-[#15294f] via-[#101f3e] to-[#0a1428]">
          {/* Gold tören ışıması */}
          <div className="absolute -top-24 left-1/2 -translate-x-1/2 w-[400px] h-[400px] bg-yellow-500/10 rounded-full blur-3xl" />
          <div className="absolute bottom-0 -right-24 w-80 h-80 bg-blue-600/10 rounded-full blur-3xl" />

          {/* Resmi çift çerçeve */}
          <div className="absolute inset-4 border-2 border-yellow-500/20 pointer-events-none" />
          <div className="absolute inset-6 border border-yellow-500/10 pointer-events-none" />

          {/* Defne dalları — sol ve sağ alt köşeler */}
          <svg className="absolute bottom-[8%] left-[6%] w-28 h-28 text-yellow-500/25" viewBox="0 0 100 100" fill="none">
            <path d="M50 90C30 70 25 45 35 15" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" />
            <path d="M38 30c-8-2-13-8-14-16 8 1 13 7 14 16ZM36 48c-9 0-15-5-18-13 9-1 15 4 18 13ZM40 66c-9 2-16-2-21-9 8-3 16 1 21 9Z" stroke="currentColor" strokeWidth="1" strokeLinejoin="round" />
          </svg>
          <svg className="absolute bottom-[8%] right-[6%] w-28 h-28 text-yellow-500/25 -scale-x-100" viewBox="0 0 100 100" fill="none">
            <path d="M50 90C30 70 25 45 35 15" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" />
            <path d="M38 30c-8-2-13-8-14-16 8 1 13 7 14 16ZM36 48c-9 0-15-5-18-13 9-1 15 4 18 13ZM40 66c-9 2-16-2-21-9 8-3 16 1 21 9Z" stroke="currentColor" strokeWidth="1" strokeLinejoin="round" />
          </svg>

          {/* Püskül çizgisi */}
          <div className="absolute top-[9%] left-1/2 -translate-x-1/2 flex flex-col items-center">
            <div className="w-px h-10 bg-gradient-to-b from-transparent to-yellow-400/60" />
            <div className="w-1.5 h-1.5 rounded-full bg-yellow-400/70" />
          </div>
        </div>
      )}
    />
  );
}
