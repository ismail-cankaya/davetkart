import React from 'react';
import { InvitationComposition } from '../../shared/InvitationComposition';
import { BABY_SHOWER_BOHO } from '../themes';
import { BABY_SHOWER_FLAVOR } from '../flavors';
import { TemplateProps } from '../../types';

/**
 * Baby Shower — Boho / Nötr: bej-toprak tonlarında kemer (arch) formları,
 * güneş ışınları ve kurutulmuş dal çizimiyle sıcak, minimalist bir doku.
 */
export function BabyShowerBoho({ invitation, mode = 'preview' }: TemplateProps) {
  return (
    <InvitationComposition
      invitation={invitation}
      flavor={BABY_SHOWER_FLAVOR}
      mode={mode}
      themeOverride={BABY_SHOWER_BOHO}
      renderHeroBackground={() => (
        <div className="absolute inset-0 bg-[#f6f1e8]">
          {/* Boho kemer katmanları — zeminin merkezinde */}
          <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[420px] h-[520px] bg-[#efe6d6] rounded-t-full" />
          <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[340px] h-[440px] bg-[#e9ddc8] rounded-t-full" />
          <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[260px] h-[360px] bg-[#f3ecdf] rounded-t-full" />

          {/* Toprak tonu ışık */}
          <div className="absolute -top-20 -right-20 w-72 h-72 bg-[#d9c7a7]/40 rounded-full blur-3xl" />

          {/* Boho güneşi — ince ışınlar */}
          <svg className="absolute top-[10%] left-[10%] w-24 h-24 text-[#b08d63]/40" viewBox="0 0 100 100" fill="none">
            <circle cx="50" cy="50" r="14" stroke="currentColor" strokeWidth="1" />
            <path
              d="M50 24v-9M50 85v-9M76 50h9M15 50h9M68 32l6-6M26 74l6-6M68 68l6 6M26 26l6 6"
              stroke="currentColor"
              strokeWidth="1"
              strokeLinecap="round"
            />
          </svg>

          {/* Kurutulmuş dal (pampas) çizimi */}
          <svg className="absolute bottom-[6%] right-[8%] w-32 h-48 text-[#a1714b]/35" viewBox="0 0 100 150" fill="none">
            <path d="M50 145C48 100 46 60 55 15" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" />
            <path
              d="M53 40c-10-6-15-14-16-25 9 5 14 13 16 25ZM52 65c-12-2-19-8-23-19 11 2 18 8 23 19ZM51 92c-11 1-19-3-25-12 10-1 18 3 25 12ZM55 40c8-8 11-17 10-28-8 6-11 16-10 28ZM54 65c10-4 16-11 18-22-10 3-16 11-18 22Z"
              stroke="currentColor"
              strokeWidth="0.9"
              strokeLinejoin="round"
            />
          </svg>

          {/* İnce nötr çizgi vurgusu */}
          <div className="absolute top-[8%] left-1/2 -translate-x-1/2 w-16 h-px bg-[#b08d63]/50" />
        </div>
      )}
    />
  );
}
