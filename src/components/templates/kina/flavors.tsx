import React from 'react';
import { TemplateFlavor } from '../shared/flavor';

// An intricate oriental mandala/henna element
function KinaOrnament({ size = 48, className }: { size?: number; className?: string }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
      <path d="M12 2L14.4 7.6L20 10L14.4 12.4L12 18L9.6 12.4L4 10L9.6 7.6L12 2Z" stroke="currentColor" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round"/>
      <circle cx="12" cy="10" r="2" stroke="currentColor" strokeWidth="1"/>
    </svg>
  );
}

// Traditional lace / mandala repeating background
function KinaPattern({ className }: { className?: string }) {
  return (
    <svg className={className} width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <pattern id="kinaPattern" x="0" y="0" width="80" height="80" patternUnits="userSpaceOnUse">
          <circle cx="40" cy="40" r="15" fill="none" stroke="currentColor" strokeWidth="0.5" strokeOpacity="0.1" strokeDasharray="2 2" />
          <path d="M40 10 L45 35 L70 40 L45 45 L40 70 L35 45 L10 40 L35 35 Z" fill="none" stroke="currentColor" strokeWidth="0.5" strokeOpacity="0.05" />
        </pattern>
      </defs>
      <rect x="0" y="0" width="100%" height="100%" fill="url(#kinaPattern)" />
    </svg>
  );
}

export const KINA_FLAVOR: TemplateFlavor = {
  categoryId: 'kina',
  Ornament: KinaOrnament,
  BackgroundPattern: KinaPattern,
  envelopeLabel: 'Kına Davetiyesi',
  tagline: 'Kınamıza Bekliyoruz',
  headings: {
    timeline: 'Akış',
    details: 'Adres & Ulaşım',
    gallery: 'Anılarımız',
    gift: 'Takı & Armağan',
    rsvp: 'Katılım Durumu'
  }
};
