import React from 'react';
import { InvitationComposition } from '../shared/InvitationComposition';
import { NISAN_SADE } from './themes';
import { NISAN_FLAVOR } from './flavors';
import { TemplateProps } from '../types';

export function NisanSade({ invitation, bgImage, mode = 'preview' }: TemplateProps) {
  return (
    <InvitationComposition 
      invitation={invitation} 
      flavor={NISAN_FLAVOR} 
      mode={mode} 
      themeOverride={NISAN_SADE} 
      renderHeroBackground={bgImage ? () => (
        <div 
          className="absolute inset-0 bg-cover bg-center opacity-20 mix-blend-multiply" 
          style={{ backgroundImage: `url(${bgImage})` }}
        />
      ) : undefined}
    />
  );
}
