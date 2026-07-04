import React from 'react';

interface BrandMarkProps {
  size?: number;
  className?: string;
}

/**
 * Davetkart marka işareti: tam ortasında kalp bulunan bir zarf.
 * Renk `currentColor` üzerinden gelir; kalp dolgulu çizilir ve
 * zarf kapağı çizgileri kalbin altında sonlanır.
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
      <rect x="2" y="4.5" width="20" height="15.5" rx="2.8" />
      <path d="M3.2 6.8 9.4 11" />
      <path d="M20.8 6.8 14.6 11" />
      <path
        d="M12 16.2c-2.5-2-3.6-3.2-3.6-4.6 0-1.2 1-2 2-2 .66 0 1.24.34 1.6.94.36-.6.94-.94 1.6-.94 1 0 2 .8 2 2 0 1.4-1.1 2.6-3.6 4.6Z"
        fill="currentColor"
        stroke="none"
      />
    </svg>
  );
}
