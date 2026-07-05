import React from 'react';
import { InvitationComposition } from '../shared/InvitationComposition';
import { KINA_MANZARA } from './themes';
import { KINA_FLAVOR } from './flavors';
import { TemplateProps } from '../types';

export function KinaManzara({ invitation, bgImage, mode = 'preview' }: TemplateProps) {
  return (
    <InvitationComposition 
      invitation={invitation} 
      flavor={KINA_FLAVOR} 
      mode={mode} 
      themeOverride={KINA_MANZARA} 
      renderHeroBackground={() => (
        <div 
          className="absolute inset-0 bg-cover bg-center" 
          style={{ backgroundImage: `url(${bgImage || 'https://images.unsplash.com/photo-1542038383-e84b85c13b2e?q=80&w=2070&auto=format&fit=crop'})` }}
        >
          <div className="absolute inset-0 bg-black/50" />
        </div>
      )}
    />
  );
}
