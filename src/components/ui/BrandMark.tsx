import React from 'react';

interface BrandMarkProps {
  size?: number;
  className?: string;
}

/**
 * DavetKart marka işareti: ortasında dolgulu bir kalp ve metin satırları
 * bulunan dikey bir davetiye kartı — markanın "Kart" kimliğini taşır.
 * Renk `currentColor` üzerinden gelir.
 */
export function BrandMark({ size = 18, className }: BrandMarkProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={1.7}
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      aria-hidden="true"
    >
      <rect x="4.75" y="2.75" width="14.5" height="18.5" rx="2.6" />
      <path
        d="M12 13.6c-2.3-1.84-3.3-2.95-3.3-4.24 0-1.1.92-1.84 1.84-1.84.6 0 1.14.31 1.46.86.32-.55.86-.86 1.46-.86.92 0 1.84.74 1.84 1.84 0 1.29-1 2.4-3.3 4.24Z"
        fill="currentColor"
        stroke="none"
      />
      <path d="M8.6 16.6h6.8" />
      <path d="M10.2 19h3.6" />
    </svg>
  );
}
