import React, { Suspense } from 'react';
import { BabyShowerHero } from './BabyShowerHero';
import { TemplateProps } from '../types';

const BabyShowerDetails = React.lazy(() => import('./BabyShowerDetails'));

export function BabyShowerLive(props: TemplateProps) {
  return (
    <div className="baby-live-container w-full h-full flex flex-col overflow-y-auto overflow-x-hidden bg-sky-100">
      <div className="w-full h-screen relative shrink-0">
        <BabyShowerHero {...props} />
      </div>
      
      <Suspense fallback={
        <div className="w-full h-32 flex items-center justify-center bg-sky-100">
          <div className="w-6 h-6 border-2 border-sky-500 border-t-transparent rounded-full animate-spin" />
        </div>
      }>
        <BabyShowerDetails {...props} />
      </Suspense>
    </div>
  );
}
