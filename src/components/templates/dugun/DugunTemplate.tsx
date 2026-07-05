import React from 'react';
import { TemplateProps } from '../types';
import { InvitationComposition } from '../shared';
import { TemplateFlavor } from '../shared/flavor';
import { RingsOrnament } from '../shared/icons';

/** Wedding flavor — interlocked rings and ceremonial wording. */
const DUGUN_FLAVOR: TemplateFlavor = {
  categoryId: 'dugun',
  Ornament: RingsOrnament,
  envelopeLabel: 'Düğün Davetiyesi',
  tagline: 'Bir ömür boyu sürecek yolculuğumuza tanıklık edin',
  headings: {
    timeline: 'Düğün Günü Akışı',
    details: 'Törenimize Bekleriz',
    gallery: 'Hikayemizden Kareler',
    gift: 'Hediye Takdiriniz İçin',
    rsvp: 'Bizimle misiniz?'
  }
};

export function DugunTemplate({ invitation, mode = 'preview' }: TemplateProps) {
  return <InvitationComposition invitation={invitation} flavor={DUGUN_FLAVOR} mode={mode} />;
}
