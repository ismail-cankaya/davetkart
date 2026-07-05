import React from 'react';
import { InvitationComposition } from '../shared/InvitationComposition';
import { SEKILLI_THEME } from '../shared/themeTokens';
import { DUGUN_FLAVOR } from './flavors';
import { TemplateProps } from '../types';

export function DugunSekilli({ invitation, mode = 'preview' }: TemplateProps) {
  return (
    <InvitationComposition 
      invitation={invitation} 
      flavor={DUGUN_FLAVOR} 
      mode={mode} 
      themeOverride={SEKILLI_THEME} 
      renderHeroBackground={() => (
        <div 
          className="absolute inset-0 bg-[#1a1c23] bg-[url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIyMCIgaGVpZ2h0PSIyMCI+CgkJPHBhdGggZmlsbD0iI2Q0YWYzNyIgZmlsbC1vcGFjaXR5PSIwLjA1IiBkPSJNMCAwbDIwIDIwWk0yMCAwTDAgMjBaIiAvPgoJPC9zdmc+')] bg-repeat"
        />
      )}
    />
  );
}
