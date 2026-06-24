import React, { useRef } from 'react';
import { motion } from 'motion/react';
import { PhoneSimulator } from './PhoneSimulator';
import { TemplateGrid } from './TemplateGrid';
import { Invitation } from '../../types';

interface PreviewSectionProps {
  isMobile: boolean;
  activePresetId: string;
  activePreset: any;
  handleTemplateChange: (id: string, phoneRef?: React.RefObject<HTMLDivElement>) => void;
  invitation: Invitation;
  isRsvpModalOpen: boolean;
  setIsRsvpModalOpen: (isOpen: boolean) => void;
  handleAddRsvp: (e: React.FormEvent) => void;
  newRsvp: any;
  setNewRsvp: React.Dispatch<React.SetStateAction<any>>;
  handleRsvpPhotoUpload: (e: React.ChangeEvent<HTMLInputElement>) => void;
  handleRsvpVideoUpload: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

export const PreviewSection = React.memo(function PreviewSection({
  isMobile,
  activePresetId,
  activePreset,
  handleTemplateChange,
  invitation,
  isRsvpModalOpen,
  setIsRsvpModalOpen,
  handleAddRsvp,
  newRsvp,
  setNewRsvp,
  handleRsvpPhotoUpload,
  handleRsvpVideoUpload
}: PreviewSectionProps) {
  const phoneRef = useRef<HTMLDivElement>(null);

  return (
    <section id="animasyon-ve-onizleme" className="py-12 md:py-20 bg-[#f8f9ff] relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 md:px-12">
        {/* Mobile-only section header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="lg:hidden text-center mb-8"
        >
          <span className="text-[#003527] font-semibold text-xs tracking-wider uppercase bg-[#003527]/5 px-3 py-1 rounded-full inline-block">
            Canlı Önizleme
          </span>
          <h2 className="font-serif text-2xl font-bold text-[#0b1c30] mt-3 mb-2">
            Davetiyenizi <span className="italic text-[#003527] font-medium">Görüntüleyin</span>
          </h2>
          <p className="text-[#515f74] text-sm max-w-sm mx-auto">
            Aşağıdan bir kategori seçerek önizlemeyi canlı olarak güncelleyebilirsiniz.
          </p>
        </motion.div>

        <div className="flex flex-col-reverse lg:flex-row gap-8 lg:gap-16 items-center lg:items-start justify-center">
          <TemplateGrid 
            activePresetId={activePresetId} 
            handleTemplateChange={handleTemplateChange} 
            phoneRef={phoneRef}
          />

          <PhoneSimulator
            phoneRef={phoneRef}
            isMobile={isMobile}
            activePresetId={activePresetId}
            activePreset={activePreset}
            invitation={invitation}
            isRsvpModalOpen={isRsvpModalOpen}
            setIsRsvpModalOpen={setIsRsvpModalOpen}
            handleAddRsvp={handleAddRsvp}
            newRsvp={newRsvp}
            setNewRsvp={setNewRsvp}
            handleRsvpPhotoUpload={handleRsvpPhotoUpload}
            handleRsvpVideoUpload={handleRsvpVideoUpload}
          />
        </div>
      </div>
    </section>
  );
});
