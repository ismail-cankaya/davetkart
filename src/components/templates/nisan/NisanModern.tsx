import React from 'react';
import { InvitationComposition } from '../shared/InvitationComposition';
import { NISAN_MODERN } from './themes';
import { NISAN_FLAVOR } from './flavors';
import { TemplateProps } from '../types';

export function NisanModern({ invitation, bgImage, mode = 'preview' }: TemplateProps) {
  return (
    <InvitationComposition 
      invitation={invitation} 
      flavor={NISAN_FLAVOR} 
      mode={mode} 
      themeOverride={NISAN_MODERN} 
      renderHeroBackground={() => (
        <div className="absolute inset-0 bg-zinc-950 bg-gradient-to-tl from-pink-900/40 via-rose-900/30 to-zinc-900">
          <div className="absolute inset-0 overflow-hidden">
             <div className="absolute bottom-1/4 left-1/4 w-[400px] h-[400px] bg-rose-500/20 rounded-full blur-3xl mix-blend-screen animate-pulse" />
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
