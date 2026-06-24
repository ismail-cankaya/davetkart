import React from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Calendar, MapPin, Maximize2, Smartphone } from 'lucide-react';
import { Invitation } from '../../types';
import { RsvpModal } from './RsvpModal';
import { TemplateRenderer } from '../templates/TemplateRenderer';

interface PhoneSimulatorProps {
  phoneRef: React.RefObject<HTMLDivElement>;
  isMobile: boolean;
  activePresetId: string;
  activePreset: any;
  invitation: Invitation;
  isRsvpModalOpen: boolean;
  setIsRsvpModalOpen: (isOpen: boolean) => void;
  handleAddRsvp: (e: React.FormEvent) => void;
  newRsvp: any;
  setNewRsvp: React.Dispatch<React.SetStateAction<any>>;
  handleRsvpPhotoUpload: (e: React.ChangeEvent<HTMLInputElement>) => void;
  handleRsvpVideoUpload: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

export function PhoneSimulator({
  phoneRef,
  isMobile,
  activePresetId,
  activePreset,
  invitation,
  isRsvpModalOpen,
  setIsRsvpModalOpen,
  handleAddRsvp,
  newRsvp,
  setNewRsvp,
  handleRsvpPhotoUpload,
  handleRsvpVideoUpload
}: PhoneSimulatorProps) {
  return (
    <div
      ref={phoneRef}
      className="w-full lg:w-1/2 flex flex-col items-center justify-center min-h-[400px] lg:min-h-[550px] perspective-container"
    >
      {/* Device Frame Animation */}
      <motion.div
        initial={isMobile ? { opacity: 0, y: 30, scale: 0.95 } : { opacity: 0, y: 60, scale: 0.7, rotateX: 15 }}
        whileInView={{ opacity: 1, y: 0, scale: 1, rotateX: 0 }}
        viewport={{ once: true, margin: "0px" }}
        transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
        className="relative will-change-transform"
      >
        {/* Ambient glow behind device */}
        <div className="absolute -inset-4 md:-inset-8 bg-gradient-to-b from-emerald-200/20 via-amber-100/15 to-emerald-200/10 rounded-[60px] blur-xl md:blur-2xl pointer-events-none" />

        {/* Actual Device Frame */}
        <motion.div
          layout
          className="relative p-2.5 lg:p-3.5 bg-slate-900 shadow-2xl overflow-hidden border-[3px] lg:border-4 border-slate-800 w-[280px] h-[540px] lg:w-[335px] lg:h-[650px] rounded-[36px] lg:rounded-[42px] device-glow"
        >
          {/* Speaker and Camera Notch for Mobile Frame */}
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-32 h-6 bg-slate-900 rounded-b-2xl z-40 flex items-center justify-center">
            <div className="w-12 h-1 bg-slate-800 rounded-full" />
            <div className="w-2.5 h-2.5 bg-slate-800 rounded-full ml-2" />
          </div>

          {/* High Quality Screen Area */}
          <div className="w-full h-full rounded-[24px] md:rounded-[20px] overflow-hidden relative bg-emerald-950 flex flex-col">
            {/* Dynamically render the selected template */}
            <TemplateRenderer 
              templateId={activePresetId} 
              invitation={invitation} 
              bgImage={activePreset.imageUrl} 
              onRsvpClick={() => setIsRsvpModalOpen(true)} 
            />

            {/* RSVP Modal */}
            <AnimatePresence>
              {isRsvpModalOpen && (
                <RsvpModal
                  setIsRsvpModalOpen={setIsRsvpModalOpen}
                  handleAddRsvp={handleAddRsvp}
                  newRsvp={newRsvp}
                  setNewRsvp={setNewRsvp}
                  handleRsvpPhotoUpload={handleRsvpPhotoUpload}
                  handleRsvpVideoUpload={handleRsvpVideoUpload}
                />
              )}
            </AnimatePresence>
          </div>
        </motion.div>
      </motion.div>

      {/* Tam Ekranda Görüntüle Button */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8, delay: 0.2 }}
        className="w-full mt-6"
      >
        <button
          onClick={() => {
            if (document.documentElement.requestFullscreen) {
              document.documentElement.requestFullscreen();
            }
          }}
          className="w-full max-w-[280px] lg:max-w-[335px] mx-auto bg-white/80 hover:bg-white text-[#003527] border border-[#003527]/10 py-3 rounded-xl font-bold text-xs shadow-sm hover:shadow-md cursor-pointer transition-all flex items-center justify-center gap-2"
        >
          <Maximize2 size={16} />
          Tam Ekranda Görüntüle
        </button>
      </motion.div>

      {/* Animated scroll label - desktop only */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8, delay: 0.3 }}
        className="hidden lg:flex gap-2 items-center text-[#515f74] text-xs font-semibold mt-8"
      >
        <motion.div
          animate={{ y: [0, -4, 0] }}
          transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
        >
          <Smartphone size={14} />
        </motion.div>
        <span>Önizleme üzerinde deneyin! Katılım Bildir butonuna basıp form doldurabilirsiniz.</span>
      </motion.div>
    </div>
  );
}
