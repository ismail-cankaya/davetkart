import React from 'react';
import { EmeraldTemplate } from './Emerald/EmeraldTemplate';
import { SunsetTemplate } from './Sunset/SunsetTemplate';
import { BabyShowerTemplate } from './BabyShower/BabyShowerTemplate';
import { MidnightGoldTemplate } from './MidnightGold/MidnightGoldTemplate';
import { Invitation } from '../../types';

interface TemplateRendererProps {
  templateId: string;
  invitation: Invitation;
  bgImage: string;
  onRsvpClick: () => void;
}

export function TemplateRenderer({ templateId, invitation, bgImage, onRsvpClick }: TemplateRendererProps) {
  switch (templateId) {
    case 'emerald':
      return <EmeraldTemplate invitation={invitation} bgImage={bgImage} onRsvpClick={onRsvpClick} />;
    case 'sunset':
      return <SunsetTemplate invitation={invitation} bgImage={bgImage} onRsvpClick={onRsvpClick} />;
    case 'baby':
      return <BabyShowerTemplate invitation={invitation} bgImage={bgImage} onRsvpClick={onRsvpClick} />;
    case 'corporate':
      return <MidnightGoldTemplate invitation={invitation} bgImage={bgImage} onRsvpClick={onRsvpClick} />;
    default:
      return <EmeraldTemplate invitation={invitation} bgImage={bgImage} onRsvpClick={onRsvpClick} />;
  }
}
