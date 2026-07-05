import React from 'react';
import { Hero } from '../components/home/Hero';

const Features = React.lazy(() => import('../components/home/Features').then(m => ({ default: m.Features })));
const Testimonials = React.lazy(() => import('../components/home/Testimonials').then(m => ({ default: m.Testimonials })));

/** Landing page: pure marketing — hero, feature highlights and social proof. */
export default function HomePage() {
  return (
    <>
      <Hero />
      <React.Suspense
        fallback={
          <div className="py-20 flex justify-center items-center">
            <div className="w-8 h-8 border-4 border-brand border-t-transparent rounded-full animate-spin" />
          </div>
        }
      >
        <Features />
        <Testimonials />
      </React.Suspense>
    </>
  );
}
