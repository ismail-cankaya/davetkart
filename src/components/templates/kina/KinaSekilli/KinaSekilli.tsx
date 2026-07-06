import React from 'react';
import { InvitationComposition } from '../../shared/InvitationComposition';
import { KINA_SEKILLI } from '../themes';
import { KINA_FLAVOR } from '../flavors';
import { TemplateProps } from '../../types';
import bgImage from './assets/bg.png';

export function KinaSekilli({ invitation, mode = 'preview' }: TemplateProps) {
  return (
    <InvitationComposition 
      invitation={invitation} 
      flavor={KINA_FLAVOR} 
      mode={mode} 
      themeOverride={KINA_SEKILLI} 
      renderHeroBackground={() => (
        <div 
          className="absolute inset-0 bg-[#2a1315] bg-[url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIyMCIgaGVpZ2h0PSIyMCI+CgkJPHBhdGggZmlsbD0iI2Q0YWYzNyIgZmlsbC1vcGFjaXR5PSIwLjA1IiBkPSJNMCAwbDIwIDIwWk0yMCAwTDAgMjBaIiAvPgoJPC9zdmc+')] bg-repeat"
        />
      )}
    />
  );
}
