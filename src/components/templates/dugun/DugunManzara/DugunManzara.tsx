import React from 'react';
import { InvitationComposition } from '../../shared/InvitationComposition';
import { MANZARA_THEME } from '../../shared/themeTokens';
import { DUGUN_FLAVOR } from '../flavors';
import { TemplateProps } from '../../types';
import bgImage from './assets/bg.png';

export function DugunManzara({ invitation, mode = 'preview' }: TemplateProps) {
  return (
    <InvitationComposition 
      invitation={invitation} 
      flavor={DUGUN_FLAVOR} 
      mode={mode} 
      themeOverride={MANZARA_THEME} 
      renderHeroBackground={() => (
        <div 
          className="absolute inset-0 bg-cover bg-center" 
          style={{ backgroundImage: `url(${bgImage || 'https://images.unsplash.com/photo-1519225421980-715cb0215aed?q=80&w=2070&auto=format&fit=crop'})` }}
        >
          <div className="absolute inset-0 bg-black/40" />
        </div>
      )}
    />
  );
}
