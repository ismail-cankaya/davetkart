import React from 'react';
import { InvitationComposition } from '../../shared/InvitationComposition';
import { NISAN_MANZARA } from '../themes';
import { NISAN_FLAVOR } from '../flavors';
import { TemplateProps } from '../../types';
import bgImage from './assets/bg.png';

export function NisanManzara({ invitation, mode = 'preview' }: TemplateProps) {
  return (
    <InvitationComposition 
      invitation={invitation} 
      flavor={NISAN_FLAVOR} 
      mode={mode} 
      themeOverride={NISAN_MANZARA} 
      renderHeroBackground={() => (
        <div 
          className="absolute inset-0 bg-cover bg-center" 
          style={{ backgroundImage: `url(${bgImage || 'https://images.unsplash.com/photo-1510076857177-7470076d4098?q=80&w=2072&auto=format&fit=crop'})` }}
        >
          <div className="absolute inset-0 bg-black/40" />
        </div>
      )}
    />
  );
}
