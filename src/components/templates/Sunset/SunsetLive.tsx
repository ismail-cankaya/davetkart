import React, { Suspense } from 'react';
import { SunsetHero } from './SunsetHero';
import { TemplateProps } from '../types';

const SunsetDetails = React.lazy(() => import('./SunsetDetails'));

export function SunsetLive(props: TemplateProps) {
  return (
    <div className="sunset-live-container w-full h-full flex flex-col overflow-y-auto overflow-x-hidden">
      <div className="w-full h-screen relative shrink-0">
        <SunsetHero {...props} />
      </div>
      
      <Suspense fallback={
        <div className="w-full h-32 flex items-center justify-center bg-orange-950">
          <div className="w-6 h-6 border-2 border-orange-500 border-t-transparent rounded-full animate-spin" />
        </div>
      }>
        <SunsetDetails {...props} />
      </Suspense>
    </div>
  );
}
