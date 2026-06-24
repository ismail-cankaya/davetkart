import React from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Calendar, MapPin, Maximize2, Smartphone } from 'lucide-react';
import { Invitation } from '../../types';
import { RsvpModal } from './RsvpModal';

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
  const formatDateStr = (dateStr: string) => {
    if (!dateStr) return '';
    const date = new Date(dateStr);
    return date.toLocaleDateString('tr-TR', {
      day: 'numeric',
      month: 'long',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

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
            {/* Background preset image layer */}
            <AnimatePresence mode="popLayout">
              <motion.img
                key={activePresetId}
                initial={{ opacity: 0, scale: 1.05 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
                src={activePreset.imageUrl}
                alt="Zarif Premium Dijital Davetiye Tasarımı"
                className="absolute inset-0 w-full h-full object-cover select-none pointer-events-none filter brightness-90 md:brightness-[0.8]"
              />
            </AnimatePresence>

            {/* Semi-transparent Gold luxury card overlay inside screen */}
            <div className="relative z-10 w-full h-full flex flex-col justify-between p-6">
              {/* Live Date Watermark Badge on Top */}
              <div className="self-center mt-6">
                <motion.span
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3, duration: 0.8 }}
                  className="backdrop-blur-md bg-white/10 text-white/95 border border-white/20 text-[10px] tracking-[0.2em] font-medium font-sans px-3 py-1 rounded-full uppercase"
                >
                  DAVETLİSİNİZ
                </motion.span>
              </div>

              {/* Main Invitation Texts Overlay */}
              <div className="flex flex-col text-center my-auto px-1 space-y-4">
                <div className="w-8 h-[1px] bg-amber-200/50 mx-auto" />

                {/* Invitation Short Title */}
                <AnimatePresence mode="wait">
                  <motion.p
                    key={invitation.title}
                    initial={{ opacity: 0, y: 8 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -8 }}
                    transition={{ duration: 0.5 }}
                    className="text-[11px] font-sans font-semibold tracking-[0.15em] text-amber-200/95 uppercase drop-shadow-sm leading-tight"
                  >
                    {invitation.title || 'HAYATIMIZIN EN ÖZEL GÜNÜ'}
                  </motion.p>
                </AnimatePresence>

                {/* Beautiful Script Couple Names */}
                <AnimatePresence mode="wait">
                  <motion.h2
                    key={invitation.names}
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 1.05 }}
                    transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
                    className="font-serif text-3xl md:text-4xl lg:text-5xl font-normal text-amber-100 italic tracking-wide leading-tight px-2 py-1 drop-shadow-md"
                  >
                    {invitation.names || 'Sophia & Elias'}
                  </motion.h2>
                </AnimatePresence>

                <div className="flex items-center justify-center gap-2">
                  <div className="w-6 h-[0.5px] bg-amber-200/30" />
                  <span className="text-white/90 text-xs tracking-wider">&amp;</span>
                  <div className="w-6 h-[0.5px] bg-amber-200/30" />
                </div>

                {/* Custom message */}
                <AnimatePresence mode="wait">
                  <motion.p
                    key={invitation.subtitle}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.5 }}
                    className="text-xs text-stone-200/90 font-sans tracking-wide leading-relaxed max-w-xs mx-auto px-4 italic"
                  >
                    "{invitation.subtitle}"
                  </motion.p>
                </AnimatePresence>

                <div className="w-12 h-[1px] bg-amber-200/40 mx-auto" />

                {/* Logistics info */}
                <div className="space-y-2 mt-2">
                  <div className="flex items-center justify-center gap-1.5 text-xs text-amber-100">
                    <Calendar size={13} className="text-amber-300" />
                    <span className="font-medium tracking-wide">
                      {formatDateStr(invitation.date)}
                    </span>
                  </div>

                  <div className="flex items-center justify-center gap-1.5 text-xs text-stone-300 px-4">
                    <MapPin size={13} className="text-amber-300 shrink-0 mt-0.5" />
                    <span className="leading-tight line-clamp-2">
                      {invitation.venue}
                    </span>
                  </div>
                </div>
              </div>

              {/* Active RSVP Button on bottom of phone screen */}
              <div className="mt-auto mb-2 text-center flex flex-col items-center gap-3">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => setIsRsvpModalOpen(true)}
                  className={`w-full max-w-[210px] ${activePreset.btnColor} font-semibold py-3 px-6 rounded-full text-xs tracking-wider shadow-xl transition-all duration-300 border border-white/15 cursor-pointer`}
                >
                  KATILIM BİLDİR
                </motion.button>
                <p className="text-[9px] text-stone-300/80 tracking-wide">
                  *Lütfen yanıtınızı en geç etkinlik haftasına kadar iletiniz.
                </p>
              </div>
            </div>

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
