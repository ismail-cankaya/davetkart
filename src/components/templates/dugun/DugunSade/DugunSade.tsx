import React from 'react';
import { InvitationComposition } from '../../shared/InvitationComposition';
import { SADE_THEME } from '../../shared/themeTokens';
import { DUGUN_FLAVOR } from '../flavors';
import { TemplateProps } from '../../types';
import bgImage from './assets/bg-desktop.svg';

export function DugunSade({ invitation, mode = 'preview' }: TemplateProps) {
  return (
    <InvitationComposition 
      invitation={invitation} 
      flavor={DUGUN_FLAVOR} 
      mode={mode} 
      themeOverride={SADE_THEME} 
      renderHeroBackground={() => (
        <div 
          className="absolute inset-0 bg-cover bg-center opacity-20 mix-blend-multiply" 
          style={{ backgroundImage: `url(${bgImage})` }}
        />
      )}
    />
  );
}
