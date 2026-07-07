import React from 'react';
import { TemplateFlavor } from '../shared/flavor';

// Şehzade tacı — sünnet temalarının mühür/hero süsü
function SunnetOrnament({ size = 48, className }: { size?: number; className?: string }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
      <path
        d="M3 17L4.5 8L8.5 12L12 6L15.5 12L19.5 8L21 17H3Z"
        stroke="currentColor"
        strokeWidth="1.2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path d="M4.5 19.5H19.5" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" />
      <circle cx="12" cy="4.5" r="1" stroke="currentColor" strokeWidth="1" />
      <circle cx="12" cy="14" r="1.4" stroke="currentColor" strokeWidth="1" />
    </svg>
  );
}

// Hilal ve yıldızlardan oluşan zarif tekrar deseni
function SunnetPattern({ className }: { className?: string }) {
  return (
    <svg className={className} width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <pattern id="sunnetPattern" x="0" y="0" width="90" height="90" patternUnits="userSpaceOnUse">
          <path
            d="M30 22a9 9 0 1 0 9 12 7.5 7.5 0 1 1-9-12Z"
            fill="none"
            stroke="currentColor"
            strokeWidth="0.6"
            strokeOpacity="0.1"
          />
          <path
            d="M64 58l1.4 3.2 3.2 1.4-3.2 1.4-1.4 3.2-1.4-3.2-3.2-1.4 3.2-1.4 1.4-3.2Z"
            fill="currentColor"
            fillOpacity="0.08"
          />
        </pattern>
      </defs>
      <rect x="0" y="0" width="100%" height="100%" fill="url(#sunnetPattern)" />
    </svg>
  );
}

export const SUNNET_FLAVOR: TemplateFlavor = {
  categoryId: 'sunnet',
  Ornament: SunnetOrnament,
  BackgroundPattern: SunnetPattern,
  envelopeLabel: 'Sünnet Davetiyesi',
  tagline: 'Şehzademizin Büyük Gününe Bekliyoruz',
  headings: {
    timeline: 'Program Akışı',
    details: 'Adres & Ulaşım',
    gallery: 'Anılarımız',
    gift: 'Takı & Armağan',
    rsvp: 'Katılım Durumu'
  }
};
