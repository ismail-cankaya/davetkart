import React from 'react';
import { EmeraldHero, EmeraldLive } from './Emerald';
import { SunsetHero, SunsetLive } from './Sunset';
import { BabyShowerHero, BabyShowerLive } from './BabyShower';
import { MidnightGoldHero, MidnightGoldLive } from './MidnightGold';
import { DugunTemplate, Theme1 as DugunTheme1 } from './dugun';
import { KinaTemplate } from './kina';
import { NisanTemplate } from './nisan';
import { Invitation } from '../../types';
import { TemplateProps } from './types';

interface TemplateRendererProps {
  templateId: string;
  invitation: Invitation;
  bgImage: string;
  onRsvpClick: () => void;
  mode?: 'preview' | 'live';
}

/** Presets rendered through the modular section system (palette-driven). */
const MODULAR_PRESET_IDS = new Set(['moda-gece', 'moda-tas']);

/**
 * Kategori bazlı tema kartları — her kart doğrudan tek bir tema bileşenine
 * bağlanır (dugun/Theme1, Theme2… büyüdükçe buraya eklenir).
 */
const THEME_PRESETS: Record<string, React.ComponentType<TemplateProps>> = {
  'dugun-sade': DugunTheme1
};

/** Category → flavored composition root. Unknown categories fall back to düğün. */
const MODULAR_TEMPLATES: Record<string, React.ComponentType<TemplateProps>> = {
  dugun: DugunTemplate,
  kina: KinaTemplate,
  nisan: NisanTemplate
};

export function TemplateRenderer({ templateId, invitation, bgImage, onRsvpClick, mode = 'preview' }: TemplateRendererProps) {
  const isLive = mode === 'live';

  // Tema kartları kategori eşlemesini atlayıp doğrudan kendi temasını açar.
  const ThemePreset = THEME_PRESETS[templateId];
  if (ThemePreset) {
    return <ThemePreset invitation={invitation} bgImage={bgImage} onRsvpClick={onRsvpClick} mode={mode} />;
  }

  // Modular presets compose their own sections from the invitation's
  // visibility flags; the category picks the flavor (dugun/kina/nisan).
  if (MODULAR_PRESET_IDS.has(templateId)) {
    const ModularTemplate = MODULAR_TEMPLATES[invitation.categoryId] ?? DugunTemplate;
    return <ModularTemplate invitation={invitation} bgImage={bgImage} onRsvpClick={onRsvpClick} mode={mode} />;
  }

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
