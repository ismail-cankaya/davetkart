import React from 'react';
import { InvitationComposition } from '../../shared/InvitationComposition';
import { NISAN_SEKILLI } from '../themes';
import { NISAN_FLAVOR } from '../flavors';
import { TemplateProps } from '../../types';
import bgImage from './assets/bg.png';

export function NisanSekilli({ invitation, mode = 'preview' }: TemplateProps) {
  return (
    <InvitationComposition 
      invitation={invitation} 
      flavor={NISAN_FLAVOR} 
      mode={mode} 
      themeOverride={{ ...NISAN_SEKILLI, page: 'bg-transparent text-amber-50' }} 
      renderHeroBackground={() => (
        <div 
          className="absolute inset-0 bg-[#201a23] bg-[url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIyMCIgaGVpZ2h0PSIyMCI+CgkJPHBhdGggZmlsbD0iI2Q0YWYzNyIgZmlsbC1vcGFjaXR5PSIwLjA1IiBkPSJNMCAwbDIwIDIwWk0yMCAwTDAgMjBaIiAvPgoJPC9zdmc+')] bg-repeat"
        />
      )}
    />
  );
}
