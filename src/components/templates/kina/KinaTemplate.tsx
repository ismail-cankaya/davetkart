import React from 'react';
import { TemplateProps } from '../types';
import { InvitationComposition } from '../shared';
import { TemplateFlavor } from '../shared/flavor';
import { HennaOrnament } from '../shared/icons';

/** Henna-night flavor — paisley motif and festive wording. */
const KINA_FLAVOR: TemplateFlavor = {
  categoryId: 'kina',
  Ornament: HennaOrnament,
  envelopeLabel: 'Kına Gecesi Davetiyesi',
  tagline: 'Geleneğin en renkli gecesinde buluşalım',
  headings: {
    timeline: 'Gece Boyunca Neler Var?',
    details: 'Kına Gecemize Bekleriz',
    gallery: 'Renkli Anlarımız',
    gift: 'Hediye Takdiriniz İçin',
    rsvp: 'Gecemize Katılıyor musunuz?'
  }
};

export function KinaTemplate({ invitation, mode = 'preview' }: TemplateProps) {
  return <InvitationComposition invitation={invitation} flavor={KINA_FLAVOR} mode={mode} />;
}
