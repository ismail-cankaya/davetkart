import React from 'react';
import { InvitationComposition } from '../../shared/InvitationComposition';
import { KINA_MODERN } from '../themes';
import { KINA_FLAVOR } from '../flavors';
import { TemplateProps } from '../../types';
import bgImage from './assets/bg-desktop.svg';

export function KinaModern({ invitation, mode = 'preview' }: TemplateProps) {
  return (
    <InvitationComposition 
      invitation={invitation} 
      flavor={KINA_FLAVOR} 
      mode={mode} 
      themeOverride={KINA_MODERN} 
      renderHeroBackground={() => (
        <div className="absolute inset-0 bg-zinc-950 bg-gradient-to-tr from-red-900/40 via-orange-900/30 to-zinc-900">
          <div className="absolute inset-0 overflow-hidden">
             <div className="absolute top-1/4 right-1/4 w-[500px] h-[500px] bg-red-500/20 rounded-full blur-3xl mix-blend-screen animate-pulse" />
          </div>
          {bgImage && (
            <div 
              className="absolute inset-0 bg-cover bg-center mix-blend-overlay opacity-30" 
              style={{ backgroundImage: `url(${bgImage})` }} 
            />
          )}
        </div>
      )}
    />
  );
}
