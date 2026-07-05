import React from 'react';
import { InvitationComposition } from '../shared/InvitationComposition';
import { MODERN_THEME } from '../shared/themeTokens';
import { DUGUN_FLAVOR } from './flavors';
import { TemplateProps } from '../types';

export function DugunModern({ invitation, bgImage, mode = 'preview' }: TemplateProps) {
  return (
    <InvitationComposition 
      invitation={invitation} 
      flavor={DUGUN_FLAVOR} 
      mode={mode} 
      themeOverride={MODERN_THEME} 
      renderHeroBackground={() => (
        <div className="absolute inset-0 bg-zinc-950 bg-gradient-to-br from-indigo-900/40 via-purple-900/30 to-zinc-900">
          <div className="absolute inset-0 overflow-hidden">
            <div className="absolute top-1/4 left-1/4 w-[500px] h-[500px] bg-indigo-500/20 rounded-full blur-3xl mix-blend-screen animate-pulse" />
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
