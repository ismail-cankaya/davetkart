import React from 'react';

/**
 * Self-contained inline SVG icon set for the invitation sections — the public
 * invitation page must not depend on external icon/image libraries.
 */
interface IconProps {
  size?: number;
  className?: string;
  strokeWidth?: number;
}

function makeIcon(paths: React.ReactNode) {
  return function Icon({ size = 18, className, strokeWidth = 1.75 }: IconProps) {
    return (
      <svg
        width={size}
        height={size}
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth={strokeWidth}
        strokeLinecap="round"
        strokeLinejoin="round"
        className={className}
        aria-hidden="true"
      >
        {paths}
      </svg>
    );
  };
}

export const CalendarIcon = makeIcon(
  <>
    <rect x="3" y="4" width="18" height="18" rx="2" />
    <path d="M16 2v4M8 2v4M3 10h18" />
  </>
);

export const ClockIcon = makeIcon(
  <>
    <circle cx="12" cy="12" r="9" />
    <path d="M12 7v5l3 2" />
  </>
);

export const MapPinIcon = makeIcon(
  <>
    <path d="M20 10c0 6-8 12-8 12S4 16 4 10a8 8 0 1 1 16 0Z" />
    <circle cx="12" cy="10" r="3" />
  </>
);

export const CopyIcon = makeIcon(
  <>
    <rect x="9" y="9" width="12" height="12" rx="2" />
    <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1" />
  </>
);

export const CheckIcon = makeIcon(<path d="M4 12.5 9.5 18 20 6.5" />);

export const GiftIcon = makeIcon(
  <>
    <rect x="3" y="8" width="18" height="4" rx="1" />
    <path d="M12 8v13M19 12v7a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2v-7" />
    <path d="M7.5 8a2.5 2.5 0 0 1 0-5C11 3 12 8 12 8s1-5 4.5-5a2.5 2.5 0 0 1 0 5" />
  </>
);

export const HeartIcon = makeIcon(
  <path d="M19 14c1.5-1.5 3-3.3 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.8 0-3.4 1-4.5 2.5C10.9 4 9.3 3 7.5 3A5.5 5.5 0 0 0 2 8.5c0 2.2 1.5 4 3 5.5l7 7 7-7Z" />
);

export const SparkleIcon = makeIcon(
  <path d="M12 3v3M12 18v3M3 12h3M18 12h3M5.6 5.6l2.1 2.1M16.3 16.3l2.1 2.1M18.4 5.6l-2.1 2.1M7.7 16.3l-2.1 2.1" />
);

export const ChevronDownIcon = makeIcon(<path d="m6 9 6 6 6-6" />);

export const ChevronLeftIcon = makeIcon(<path d="m15 18-6-6 6-6" />);

export const ChevronRightIcon = makeIcon(<path d="m9 18 6-6-6-6" />);

export const UsersIcon = makeIcon(
  <>
    <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" />
    <circle cx="9" cy="7" r="4" />
    <path d="M22 21v-2a4 4 0 0 0-3-3.87M16 3.13a4 4 0 0 1 0 7.75" />
  </>
);

export const ExternalLinkIcon = makeIcon(
  <>
    <path d="M15 3h6v6M10 14 21 3" />
    <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" />
  </>
);

export const SendIcon = makeIcon(
  <path d="m22 2-7 20-4-9-9-4Z M22 2 11 13" />
);

export const AppleIcon = ({ size = 18, className }: IconProps) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor" className={className} aria-hidden="true">
    <path d="M17.05 12.54c-.03-2.9 2.37-4.29 2.48-4.36-1.35-1.98-3.45-2.25-4.2-2.28-1.79-.18-3.49 1.05-4.4 1.05-.9 0-2.3-1.02-3.79-.99-1.95.03-3.75 1.13-4.75 2.88-2.03 3.52-.52 8.72 1.46 11.58.97 1.4 2.12 2.97 3.63 2.91 1.46-.06 2.01-.94 3.77-.94s2.26.94 3.8.91c1.57-.03 2.57-1.42 3.53-2.83 1.11-1.62 1.57-3.19 1.6-3.27-.04-.02-3.07-1.18-3.1-4.66zM14.16 4.02c.8-.97 1.34-2.32 1.19-3.66-1.15.05-2.55.77-3.38 1.74-.74.86-1.39 2.23-1.22 3.55 1.29.1 2.6-.65 3.41-1.63z" />
  </svg>
);

export const GoogleIcon = ({ size = 18, className }: IconProps) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor" className={className} aria-hidden="true">
    <path d="M21.35 11.1h-9.17v2.73h6.51c-.33 3.81-3.5 5.44-6.5 5.44C8.36 19.27 5 16.25 5 12c0-4.1 3.2-7.27 7.2-7.27 3.09 0 4.9 1.97 4.9 1.97L19 4.72S16.56 2 12.1 2C6.42 2 2.03 6.8 2.03 12c0 5.05 4.13 10 10.22 10 5.35 0 9.25-3.67 9.25-9.09 0-1.15-.15-1.81-.15-1.81z" />
  </svg>
);

/* ——— Category ornaments (decorative, one per flavor) ——— */

/** Two interlocked wedding rings. */
export const RingsOrnament = ({ size = 48, className }: IconProps) => (
  <svg width={size} height={size} viewBox="0 0 48 48" fill="none" stroke="currentColor" strokeWidth="1.5" className={className} aria-hidden="true">
    <circle cx="18" cy="27" r="10" />
    <circle cx="30" cy="27" r="10" opacity="0.65" />
    <path d="M18 17l-3.5-5h7L18 17zM14.5 12h7" strokeLinejoin="round" />
  </svg>
);

/** Stylized henna hand/paisley motif. */
export const HennaOrnament = ({ size = 48, className }: IconProps) => (
  <svg width={size} height={size} viewBox="0 0 48 48" fill="none" stroke="currentColor" strokeWidth="1.5" className={className} aria-hidden="true">
    <path d="M24 42c-9 -4 -14 -11 -14 -19C10 13 16 6 24 6s14 7 14 17c0 8 -5 15 -14 19z" />
    <path d="M24 34c-4.5 -2 -7 -5.5 -7 -9.5C17 19 20 15 24 15s7 4 7 9.5c0 4 -2.5 7.5 -7 9.5z" opacity="0.65" />
    <circle cx="24" cy="24" r="2.5" fill="currentColor" stroke="none" opacity="0.8" />
  </svg>
);

/** Cut diamond for engagements. */
export const DiamondOrnament = ({ size = 48, className }: IconProps) => (
  <svg width={size} height={size} viewBox="0 0 48 48" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round" className={className} aria-hidden="true">
    <path d="M14 10h20l8 10-18 20L6 20l8-10z" />
    <path d="M6 20h36M14 10l4 10 6 20M34 10l-4 10-6 20" opacity="0.65" />
  </svg>
);
