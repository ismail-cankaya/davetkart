import React, { Suspense } from 'react';
import { MidnightGoldHero } from './MidnightGoldHero';
import { TemplateProps } from '../types';

const MidnightGoldDetails = React.lazy(() => import('./MidnightGoldDetails'));

export function MidnightGoldLive(props: TemplateProps) {
  return (
    <div className="midnight-live-container w-full h-full flex flex-col overflow-y-auto overflow-x-hidden bg-slate-950">
      <div className="w-full h-screen relative shrink-0">
        <MidnightGoldHero {...props} />
      </div>
      
      <Suspense fallback={
        <div className="w-full h-32 flex items-center justify-center bg-slate-950">
          <div className="w-6 h-6 border-2 border-amber-400 border-t-transparent rounded-full animate-spin" />
        </div>
      }>
        <MidnightGoldDetails {...props} />
      </Suspense>
    </div>
  );
}
