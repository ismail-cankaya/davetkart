import React from 'react';
import { useLenis } from './hooks/useLenis';

import { Header } from './components/layout/Header';
import { Footer } from './components/layout/Footer';
import { Hero } from './components/home/Hero';
import { PreviewSection } from './components/preview/PreviewSection';
import { DesignerPanel } from './components/editor/DesignerPanel';
import { Toaster } from './components/ui/Toast';

const Features = React.lazy(() => import('./components/home/Features').then(m => ({ default: m.Features })));
const AssistantWidget = React.lazy(() => import('./components/assistant/AssistantWidget').then(m => ({ default: m.AssistantWidget })));
const Testimonials = React.lazy(() => import('./components/home/Testimonials').then(m => ({ default: m.Testimonials })));
const LiveRsvpPanel = React.lazy(() => import('./components/rsvp/LiveRsvpPanel').then(m => ({ default: m.LiveRsvpPanel })));

/**
 * Composition root. All shared state lives in the feature stores
 * (src/stores) — sections subscribe to what they need themselves,
 * so no state or callbacks are threaded through props from here.
 */
function App() {
  // Buttery-smooth scrolling & anchor navigation
  useLenis();

  return (
    <div className="min-h-screen bg-cream text-ink font-sans relative">
      <Header />

      <main className="flex-grow flex flex-col">
        <Hero />
        <PreviewSection />
        <DesignerPanel />

        <React.Suspense fallback={<div className="py-20 flex justify-center items-center"><div className="w-8 h-8 border-4 border-brand border-t-transparent rounded-full animate-spin"></div></div>}>
          <Features />
          <LiveRsvpPanel />
          <Testimonials />
        </React.Suspense>
      </main>

      <Footer />
      <Toaster />

      {/* Asistan: uygulamanın geri kalanından bağımsız, ayrı chunk olarak yüklenir */}
      <React.Suspense fallback={null}>
        <AssistantWidget />
      </React.Suspense>
    </div>
  );
}

export default App;
