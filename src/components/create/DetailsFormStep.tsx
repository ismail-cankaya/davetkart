import React, { useEffect, useRef, useState } from 'react';
import { motion } from 'motion/react';
import { WandSparkles } from 'lucide-react';
import { Invitation } from '../../types';
import { useInvitationStore } from '../../stores/useInvitationStore';
import { useActiveCategory, useCreateWizardStore } from '../../stores/useCreateWizardStore';
import { CoupleNameFields } from './CoupleNameFields';
import { scrollToTarget } from '../../hooks/useLenis';

const EASE_LUXE = [0.22, 1, 0.36, 1] as const;

const labelClass = 'block text-xs font-bold tracking-wider uppercase text-champagne';
const inputClass =
  'w-full bg-white/5 border border-white/15 focus:border-gold focus:ring-2 focus:ring-gold/20 focus:outline-none rounded-xl px-4 py-3 text-sm text-white placeholder:text-white/30 transition-all duration-300';

/**
 * Wizard step 2b — event details. "Davetiyeni Oluştur" hands the flow over to
 * the generation loading screen.
 */
export function DetailsFormStep() {
  const invitation = useInvitationStore(s => s.invitation);
  const updateField = useInvitationStore(s => s.updateField);
  const startGeneration = useCreateWizardStore(s => s.startGeneration);
  const category = useActiveCategory();

  // Local mirror keeps typing instant; the store is updated behind a debounce.
  const [local, setLocal] = useState<Invitation>(invitation);
  const debounceRef = useRef<ReturnType<typeof setTimeout> | undefined>(undefined);

  useEffect(() => {
    setLocal(invitation);
  }, [invitation]);

  useEffect(() => () => {
    if (debounceRef.current) clearTimeout(debounceRef.current);
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const name = e.target.name as keyof Invitation;
    const { value } = e.target;
    setLocal(prev => ({ ...prev, [name]: value }));
    if (debounceRef.current) clearTimeout(debounceRef.current);
    debounceRef.current = setTimeout(() => updateField(name, value), 400);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Flush anything still sitting behind the debounce before generating.
    if (debounceRef.current) clearTimeout(debounceRef.current);
    (Object.keys(local) as Array<keyof Invitation>).forEach((key) => {
      if (local[key] !== invitation[key]) updateField(key, local[key]);
    });
    startGeneration();
    scrollToTarget(0, { immediate: true });
  };

  return (
    <motion.section
      id="sihirbaz-form"
      className="py-12 md:py-20 bg-gradient-to-b from-brand-deep via-emerald-950 to-brand-deep text-white relative overflow-hidden scroll-mt-20"
      initial={{ opacity: 0, y: 60 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 30 }}
      transition={{ duration: 0.9, ease: EASE_LUXE }}
    >
      {/* Ambient glow */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-emerald-800/20 rounded-full blur-3xl" />
        <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-gold/10 rounded-full blur-3xl" />
      </div>

      <div className="max-w-3xl mx-auto px-4 md:px-8 relative z-10">
        <div className="text-center mb-8 md:mb-10">
          <h2 className="font-serif text-2xl md:text-4xl font-bold">
            Davetiyenizin <span className="italic text-champagne font-medium">bilgilerini</span> girin
          </h2>
          <p className="text-emerald-100/70 text-sm mt-3 max-w-lg mx-auto leading-relaxed">
            Bu bilgiler seçtiğiniz temaya işlenir; son adımdaki stüdyoda hepsini yeniden
            düzenleyebilirsiniz.
          </p>
        </div>

        <motion.form
          onSubmit={handleSubmit}
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, ease: EASE_LUXE, delay: 0.1 }}
          className="bg-white/[0.07] backdrop-blur-md p-6 md:p-8 rounded-3xl border border-white/10 space-y-6 shadow-2xl shadow-black/20"
        >
          <CoupleNameFields
            labels={category?.nameLabels ?? ['Partner 1', 'Partner 2']}
            labelClass={labelClass}
            inputClass={inputClass}
          />

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <label className={labelClass}>Etkinlik Tarihi &amp; Saati</label>
              <input
                type="datetime-local"
                name="date"
                value={local.date}
                onChange={handleChange}
                className={`${inputClass} [color-scheme:dark]`}
              />
            </div>

            <div className="space-y-2">
              <label className={labelClass}>Etkinlik Mekanı / Adres</label>
              <input
                type="text"
                name="venue"
                value={local.venue}
                onChange={handleChange}
                placeholder="Örn. Çırağan Sarayı, Beşiktaş"
                className={inputClass}
              />
            </div>
          </div>

          <div className="space-y-2">
            <label className={labelClass}>Davet Mesajı (Açıklama / Şiir)</label>
            <textarea
              name="subtitle"
              rows={3}
              value={local.subtitle}
              onChange={handleChange}
              placeholder="Örn. Sizleri de bu mutlu günümüzde aramızda görmekten onur duyarız..."
              className={`${inputClass} resize-none`}
            />
          </div>

          <motion.button
            type="submit"
            whileHover={{ y: -3 }}
            whileTap={{ scale: 0.98 }}
            className="group relative overflow-hidden w-full bg-champagne hover:bg-gold text-brand-deep font-bold py-4 rounded-2xl text-sm flex items-center justify-center gap-2.5 shadow-lg shadow-black/25 cursor-pointer transition-colors duration-500"
          >
            <span className="absolute inset-0 animate-shimmer pointer-events-none" />
            <WandSparkles size={17} className="group-hover:rotate-12 transition-transform duration-300" />
            Davetiyeni Oluştur
          </motion.button>
        </motion.form>
      </div>
    </motion.section>
  );
}
