import React from 'react';
import { TEMPLATE_PRESETS } from './data';
import { useLenis } from './hooks/useLenis';
import { useAppState } from './hooks/useAppState';

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

function App() {
  // 1. Buttery-smooth scrolling & anchor navigation
  useLenis();

  // 2. Global State hook
  const {
    invitation,
    setInvitation,
    rsvpList,
    activePresetId,
    setActivePresetId,
    isRsvpModalOpen,
    setIsRsvpModalOpen,
    newRsvp,
    setNewRsvp,
    isMobile,
    handleTemplateChange,
    handleInputChange,
    handleAddRsvp,
    handleDeleteRsvp,
    handleResetRsvps,
    handleRsvpPhotoUpload,
    handleRsvpVideoUpload
  } = useAppState();

  // Derived state
  const activePreset = TEMPLATE_PRESETS.find(p => p.id === activePresetId) || TEMPLATE_PRESETS[0];

  return (
    <div className="min-h-screen bg-cream text-ink font-sans relative">
      <Header />

      <main className="flex-grow flex flex-col">
        <Hero />

        <PreviewSection
          isMobile={isMobile}
          activePresetId={activePresetId}
          activePreset={activePreset}
          handleTemplateChange={handleTemplateChange}
          invitation={invitation}
          isRsvpModalOpen={isRsvpModalOpen}
          setIsRsvpModalOpen={setIsRsvpModalOpen}
          handleAddRsvp={handleAddRsvp}
          newRsvp={newRsvp}
          setNewRsvp={setNewRsvp}
          handleRsvpPhotoUpload={handleRsvpPhotoUpload}
          handleRsvpVideoUpload={handleRsvpVideoUpload}
        />

        <DesignerPanel
          invitation={invitation}
          handleInputChange={handleInputChange}
          setInvitation={setInvitation}
          setActivePresetId={setActivePresetId}
        />

        <React.Suspense fallback={<div className="py-20 flex justify-center items-center"><div className="w-8 h-8 border-4 border-brand border-t-transparent rounded-full animate-spin"></div></div>}>
          <Features />

          <LiveRsvpPanel
            rsvpList={rsvpList}
            handleDeleteRsvp={handleDeleteRsvp}
            handleResetRsvps={handleResetRsvps}
          />

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
