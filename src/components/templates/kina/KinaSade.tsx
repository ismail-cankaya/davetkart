import React from 'react';
import { InvitationComposition } from '../shared/InvitationComposition';
import { KINA_SADE } from './themes';
import { KINA_FLAVOR } from './flavors';
import { TemplateProps } from '../types';

export function KinaSade({ invitation, bgImage, mode = 'preview' }: TemplateProps) {
  return (
    <InvitationComposition 
      invitation={invitation} 
      flavor={KINA_FLAVOR} 
      mode={mode} 
      themeOverride={KINA_SADE} 
      renderHeroBackground={bgImage ? () => (
        <div 
          className="absolute inset-0 bg-cover bg-center opacity-20 mix-blend-multiply" 
          style={{ backgroundImage: `url(${bgImage})` }}
        />
      ) : undefined}
    />
  );
}
