import React from 'react';
import { InvitationComposition } from '../../shared/InvitationComposition';
import { SUNNET_MODERN } from '../themes';
import { SUNNET_FLAVOR } from '../flavors';
import { TemplateProps } from '../../types';

/**
 * Sünnet — Modern / Ferah: turkuaz-gümüş yumuşak gradientler,
 * minimalist bulut formları ve bol nefes alan boşluk düzeni.
 */
export function SunnetModern({ invitation, mode = 'preview' }: TemplateProps) {
  return (
    <InvitationComposition
      invitation={invitation}
      flavor={SUNNET_FLAVOR}
      mode={mode}
      themeOverride={SUNNET_MODERN}
      renderHeroBackground={() => (
        <div className="absolute inset-0 bg-gradient-to-b from-cyan-50 via-[#f2fbfb] to-white">
          {/* Yumuşak turkuaz ışık kümeleri */}
          <div className="absolute -top-20 -left-16 w-96 h-96 bg-teal-200/40 rounded-full blur-3xl" />
          <div className="absolute top-1/4 -right-24 w-80 h-80 bg-cyan-200/40 rounded-full blur-3xl" />
          <div className="absolute bottom-0 left-1/3 w-72 h-72 bg-slate-200/50 rounded-full blur-3xl" />

          {/* Gümüş ince halkalar — modern geometri */}
          <div className="absolute top-[14%] right-[10%] w-40 h-40 border border-slate-300/50 rounded-full" />
          <div className="absolute top-[18%] right-[16%] w-24 h-24 border border-teal-300/40 rounded-full" />
          <div className="absolute bottom-[16%] left-[8%] w-32 h-32 border border-slate-300/40 rounded-full" />

          {/* Uçurtma kuyruğu — çocuksu ama zarif bir çizgi */}
          <svg className="absolute bottom-[10%] right-[12%] w-40 h-40 text-teal-400/30" viewBox="0 0 100 100" fill="none">
            <path d="M20 80C40 60 45 45 60 20" stroke="currentColor" strokeWidth="1" strokeDasharray="4 5" strokeLinecap="round" />
            <path d="M60 20l8-6 2 10-10-4Z" stroke="currentColor" strokeWidth="1" strokeLinejoin="round" />
          </svg>
        </div>
      )}
    />
  );
}
