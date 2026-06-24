import React from 'react';
import { TEMPLATE_PRESETS } from './data';
import { useScrollSnap } from './hooks/useScrollSnap';
import { useAppState } from './hooks/useAppState';

import { Header } from './components/layout/Header';
import { Footer } from './components/layout/Footer';
import { Hero } from './components/home/Hero';
import { Features } from './components/home/Features';
import { Testimonials } from './components/home/Testimonials';
import { PreviewSection } from './components/preview/PreviewSection';
import { DesignerPanel } from './components/editor/DesignerPanel';
import { LiveRsvpPanel } from './components/rsvp/LiveRsvpPanel';

function App() {
  // 1. Scroll-jack logic hook
  useScrollSnap();

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
    <div className="min-h-screen bg-[#f8f9ff] text-slate-800 font-sans selection:bg-[#003527]/20 relative">
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

        <Features />

        <LiveRsvpPanel
          rsvpList={rsvpList}
          handleDeleteRsvp={handleDeleteRsvp}
          handleResetRsvps={handleResetRsvps}
        />

        <Testimonials />
      </main>

      <Footer />
    </div>
  );
}

export default App;
