import React from 'react';

/**
 * Category-specific personality injected into the shared sections by each
 * template (dugun/kina/nisan). Sections stay generic; flavor carries the
 * wording and the decorative ornament.
 */
export interface TemplateFlavor {
  categoryId: string;
  /** Wax-seal / hero ornament (inline SVG component). */
  Ornament: React.ComponentType<{ size?: number; className?: string }>;
  /** Envelope front label, e.g. "Düğün Davetiyesi". */
  envelopeLabel: string;
  /** Serif line under the hero names. */
  tagline: string;
  /** Section heading wording per category. */
  headings: {
    timeline: string;
    details: string;
    gallery: string;
    gift: string;
    rsvp: string;
  };
}
