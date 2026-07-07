import React from 'react';
import { InvitationComposition } from '../../shared/InvitationComposition';
import { SUNNET_KLASIK } from '../themes';
import { SUNNET_FLAVOR } from '../flavors';
import { TemplateProps } from '../../types';

/**
 * Sünnet — Klasik / Zarif: lacivert gece göğü üzerine altın ışıltısı,
 * hilal formu ve saray havasında serif tipografi.
 */
export function SunnetKlasik({ invitation, mode = 'preview' }: TemplateProps) {
  return (
    <InvitationComposition
      invitation={invitation}
      flavor={SUNNET_FLAVOR}
      mode={mode}
      themeOverride={SUNNET_KLASIK}
      renderHeroBackground={() => (
        <div className="absolute inset-0 bg-[#0a1633] bg-gradient-to-b from-[#0d1d42] via-[#0a1633] to-[#060e22]">
          {/* Altın taç ışıması — üst merkez */}
          <div className="absolute -top-24 left-1/2 -translate-x-1/2 w-[420px] h-[420px] bg-amber-400/15 rounded-full blur-3xl" />
          <div className="absolute top-1/3 -right-20 w-72 h-72 bg-blue-500/10 rounded-full blur-3xl" />

          {/* Zarif altın çerçeve */}
          <div className="absolute inset-4 border border-amber-300/20 rounded-[2rem] pointer-events-none" />
          <div className="absolute inset-6 border border-amber-300/10 rounded-[1.75rem] pointer-events-none" />

          {/* Hilal silüeti */}
          <svg
            className="absolute bottom-[12%] right-[8%] w-24 h-24 text-amber-300/25"
            viewBox="0 0 24 24"
            fill="none"
          >
            <path d="M12 3a9 9 0 1 0 9 12A7.5 7.5 0 1 1 12 3Z" stroke="currentColor" strokeWidth="0.8" />
          </svg>

          {/* Yıldız tozu */}
          <div className="absolute top-[18%] left-[14%] w-1 h-1 bg-amber-200/70 rounded-full animate-pulse" />
          <div className="absolute top-[30%] right-[22%] w-1.5 h-1.5 bg-amber-200/50 rounded-full animate-pulse [animation-delay:600ms]" />
          <div className="absolute bottom-[28%] left-[24%] w-1 h-1 bg-blue-200/60 rounded-full animate-pulse [animation-delay:1200ms]" />
        </div>
      )}
    />
  );
}
