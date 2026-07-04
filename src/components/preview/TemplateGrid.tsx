import React from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Check, PenLine } from 'lucide-react';
import { TEMPLATE_PRESETS } from '../../data';

const EASE_LUXE = [0.22, 1, 0.36, 1] as const;

interface TemplateGridProps {
  activePresetId: string;
  handleTemplateChange: (id: string, phoneRef?: React.RefObject<HTMLDivElement>) => void;
  phoneRef: React.RefObject<HTMLDivElement>;
}

export function TemplateGrid({ activePresetId, handleTemplateChange, phoneRef }: TemplateGridProps) {
  return (
    <motion.div
      className="w-full lg:w-1/2 flex flex-col justify-center space-y-4 lg:space-y-6 pt-4"
      initial={{ opacity: 0, x: -60 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true, margin: '-20px' }}
      transition={{ duration: 1, ease: EASE_LUXE }}
    >
      <div className="mb-4 text-center lg:text-left hidden lg:block">
        <motion.span
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, ease: EASE_LUXE }}
          className="text-brand font-semibold text-xs tracking-[0.15em] uppercase bg-brand/5 border border-brand/10 px-3.5 py-1.5 rounded-full inline-block"
        >
          Eşsiz Koleksiyonlar
        </motion.span>
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, ease: EASE_LUXE, delay: 0.1 }}
          className="font-serif text-3xl md:text-4xl font-bold text-ink mt-4 mb-3"
        >
          Her Etkinliğe Özel <br className="hidden lg:block" />
          <span className="italic text-brand font-medium font-serif">Koleksiyonlar</span>
        </motion.h2>
        <motion.p
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, ease: EASE_LUXE, delay: 0.2 }}
          className="text-muted text-sm md:text-base max-w-md mx-auto lg:mx-0"
        >
          Hayalinizdeki konsepti yansıtan tasarımınızı seçin ve sağdaki canlı cihaz önizlemesinden anında görüntüleyin.
        </motion.p>
      </div>

      {/* Category Grid */}
      <div className="grid grid-cols-2 gap-3 lg:gap-4 scroll-mt-24" id="koleksiyonlar">
        {TEMPLATE_PRESETS.map((pst, idx) => {
          const isActive = activePresetId === pst.id;
          return (
            <motion.div
              key={pst.id}
              initial={{ opacity: 0, y: 30, scale: 0.95 }}
              whileInView={{ opacity: 1, y: 0, scale: 1 }}
              viewport={{ once: true, margin: '0px' }}
              transition={{ duration: 0.7, ease: EASE_LUXE, delay: idx * 0.08 }}
              whileHover={{ y: -5 }}
              whileTap={{ scale: 0.97 }}
              onClick={() => handleTemplateChange(pst.id, phoneRef)}
              className={`group relative rounded-2xl overflow-hidden h-36 lg:h-48 cursor-pointer transition-shadow duration-700 ${
                isActive
                  ? 'shadow-xl shadow-brand/20 ring-2 ring-brand ring-offset-2 ring-offset-cream'
                  : 'shadow-sm hover:shadow-2xl hover:shadow-ink/15'
              }`}
            >
              <img
                className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-[1200ms] ease-out filter brightness-90 md:brightness-[0.82] group-hover:brightness-95"
                src={pst.imageUrl}
                alt={pst.name}
                loading="lazy"
              />

              <AnimatePresence>
                {isActive && (
                  <motion.div
                    initial={{ opacity: 0, scale: 0.5, y: -6 }}
                    animate={{ opacity: 1, scale: 1, y: 0 }}
                    exit={{ opacity: 0, scale: 0.5 }}
                    transition={{ type: 'spring', stiffness: 400, damping: 25 }}
                    className="absolute top-3 right-3 bg-brand text-white text-[10px] font-semibold px-2.5 py-1 rounded-full flex items-center gap-1 shadow-md z-10"
                  >
                    <Check size={10} /> Seçili
                  </motion.div>
                )}
              </AnimatePresence>

              <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent flex flex-col justify-end p-5">
                <span className={`w-3 h-3 rounded-full ${pst.backgroundStyle} border border-white/40 mb-2 shadow-sm`} />
                <h3 className="font-serif text-lg text-white font-bold leading-tight translate-y-0 group-hover:-translate-y-0.5 transition-transform duration-500">
                  {pst.name.split(' (')[0]}
                </h3>
                <p className="text-[10px] text-white/70 font-medium tracking-wide max-h-0 opacity-0 group-hover:max-h-6 group-hover:opacity-100 group-hover:mt-0.5 transition-all duration-500 overflow-hidden">
                  Önizlemek için tıklayın
                </p>
              </div>
            </motion.div>
          );
        })}
      </div>

      {/* Quick Info Box - hidden on mobile */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8, ease: EASE_LUXE, delay: 0.5 }}
        className="bg-champagne/30 p-4 rounded-2xl border border-champagne hidden lg:flex items-start gap-4 mt-4 hover:bg-champagne/50 transition-colors duration-500"
      >
        <div className="p-2 rounded-xl bg-white text-brand shadow-sm mt-0.5">
          <PenLine size={16} />
        </div>
        <div>
          <h4 className="font-semibold text-xs text-brand-deep uppercase tracking-wider">Metinleri Düzenleyin</h4>
          <p className="text-xs text-muted mt-1">
            Aşağıdaki <strong>"Davetiye Tasarımcısı"</strong> bölümünden davetiye içeriklerini dilediğiniz gibi güncelleyebilirsiniz.
          </p>
        </div>
      </motion.div>
    </motion.div>
  );
}
