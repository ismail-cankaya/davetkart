import React from 'react';
import { TemplateFlavor } from '../shared/flavor';

// A sophisticated intertwined rings / floral SVG
function DugunOrnament({ size = 48, className }: { size?: number; className?: string }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
      <path d="M10 14C12.2091 14 14 12.2091 14 10C14 7.79086 12.2091 6 10 6C7.79086 6 6 7.79086 6 10C6 12.2091 7.79086 14 10 14Z" stroke="currentColor" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round"/>
      <path d="M14 18C16.2091 18 18 16.2091 18 14C18 11.7909 16.2091 10 14 10C11.7909 10 10 11.7909 10 14C10 16.2091 11.7909 18 14 18Z" stroke="currentColor" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
  );
}

// Subtle floral / wave background pattern
function DugunPattern({ className }: { className?: string }) {
  return (
    <svg className={className} width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <pattern id="dugunPattern" x="0" y="0" width="100" height="100" patternUnits="userSpaceOnUse">
          <path d="M0 100 Q 25 50 50 100 T 100 100" fill="none" stroke="currentColor" strokeWidth="0.5" strokeOpacity="0.1" />
          <path d="M0 50 Q 25 0 50 50 T 100 50" fill="none" stroke="currentColor" strokeWidth="0.5" strokeOpacity="0.1" />
          <circle cx="50" cy="50" r="2" fill="currentColor" fillOpacity="0.1" />
        </pattern>
      </defs>
      <rect x="0" y="0" width="100%" height="100%" fill="url(#dugunPattern)" />
    </svg>
  );
}

export const DUGUN_FLAVOR: TemplateFlavor = {
  categoryId: 'dugun',
  Ornament: DugunOrnament,
  BackgroundPattern: DugunPattern,
  envelopeLabel: 'Düğün Davetiyesi',
  tagline: 'Evleniyoruz',
  headings: {
    timeline: 'Program',
    details: 'Detaylar',
    gallery: 'Galeri',
    gift: 'Hediye & Takı',
    rsvp: 'LCV (Lütfen Cevap Veriniz)'
  }
};
