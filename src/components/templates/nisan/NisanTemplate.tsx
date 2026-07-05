import React from 'react';
import { TemplateProps } from '../types';
import { InvitationComposition } from '../shared';
import { TemplateFlavor } from '../shared/flavor';
import { DiamondOrnament } from '../shared/icons';

/** Engagement flavor — cut-diamond motif and first-step wording. */
const NISAN_FLAVOR: TemplateFlavor = {
  categoryId: 'nisan',
  Ornament: DiamondOrnament,
  envelopeLabel: 'Nişan Davetiyesi',
  tagline: 'Mutluluğa attığımız ilk adımı birlikte kutlayalım',
  headings: {
    timeline: 'Nişan Programı',
    details: 'Nişanımıza Bekleriz',
    gallery: 'Bizden Kareler',
    gift: 'Hediye Takdiriniz İçin',
    rsvp: 'Aramızda mısınız?'
  }
};

export function NisanTemplate({ invitation, mode = 'preview' }: TemplateProps) {
  return <InvitationComposition invitation={invitation} flavor={NISAN_FLAVOR} mode={mode} />;
}
