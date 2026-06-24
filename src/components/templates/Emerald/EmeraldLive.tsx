import React, { Suspense } from 'react';
import { EmeraldHero } from './EmeraldHero';
import { TemplateProps } from '../types';

const EmeraldDetails = React.lazy(() => import('./EmeraldDetails'));

export function EmeraldLive(props: TemplateProps) {
  return (
    <div className="emerald-live-container w-full h-full flex flex-col overflow-y-auto overflow-x-hidden">
      {/* Hero section takes full viewport height usually */}
      <div className="w-full h-screen relative shrink-0">
        <EmeraldHero {...props} />
      </div>
      
      {/* Lazy loaded details */}
      <Suspense fallback={
        <div className="w-full h-32 flex items-center justify-center bg-emerald-950">
          <div className="w-6 h-6 border-2 border-amber-500 border-t-transparent rounded-full animate-spin" />
        </div>
      }>
        <EmeraldDetails {...props} />
      </Suspense>
    </div>
  );
}
