import React from 'react';
import { EmeraldHero, EmeraldLive } from './Emerald';
import { SunsetHero, SunsetLive } from './Sunset';
import { BabyShowerHero, BabyShowerLive } from './BabyShower';
import { MidnightGoldHero, MidnightGoldLive } from './MidnightGold';
import { Invitation } from '../../types';

interface TemplateRendererProps {
  templateId: string;
  invitation: Invitation;
  bgImage: string;
  onRsvpClick: () => void;
  mode?: 'preview' | 'live';
}

export function TemplateRenderer({ templateId, invitation, bgImage, onRsvpClick, mode = 'preview' }: TemplateRendererProps) {
  const isLive = mode === 'live';

  switch (templateId) {
    case 'emerald':
      return isLive 
        ? <EmeraldLive invitation={invitation} bgImage={bgImage} onRsvpClick={onRsvpClick} />
        : <EmeraldHero invitation={invitation} bgImage={bgImage} onRsvpClick={onRsvpClick} />;
    case 'sunset':
      return isLive
        ? <SunsetLive invitation={invitation} bgImage={bgImage} onRsvpClick={onRsvpClick} />
        : <SunsetHero invitation={invitation} bgImage={bgImage} onRsvpClick={onRsvpClick} />;
    case 'baby':
      return isLive
        ? <BabyShowerLive invitation={invitation} bgImage={bgImage} onRsvpClick={onRsvpClick} />
        : <BabyShowerHero invitation={invitation} bgImage={bgImage} onRsvpClick={onRsvpClick} />;
    case 'corporate':
      return isLive
        ? <MidnightGoldLive invitation={invitation} bgImage={bgImage} onRsvpClick={onRsvpClick} />
        : <MidnightGoldHero invitation={invitation} bgImage={bgImage} onRsvpClick={onRsvpClick} />;
    default:
      return isLive
        ? <EmeraldLive invitation={invitation} bgImage={bgImage} onRsvpClick={onRsvpClick} />
        : <EmeraldHero invitation={invitation} bgImage={bgImage} onRsvpClick={onRsvpClick} />;
  }
}
