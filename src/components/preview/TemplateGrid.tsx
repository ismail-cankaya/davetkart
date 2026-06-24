import React from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Check, Heart } from 'lucide-react';
import { TEMPLATE_PRESETS } from '../../data';

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
      viewport={{ once: true, margin: "-20px" }}
      transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
    >
      <div className="mb-4 text-center lg:text-left hidden lg:block">
        <motion.span
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          className="text-[#003527] font-semibold text-xs tracking-wider uppercase bg-[#003527]/5 px-3 py-1 rounded-full inline-block"
        >
          Eşsiz Koleksiyonlar
        </motion.span>
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1], delay: 0.1 }}
          className="font-serif text-3xl md:text-4xl font-bold text-[#0b1c30] mt-4 mb-3"
        >
          Her Etkinliğe Özel <br className="hidden lg:block" />
          <span className="italic text-[#003527] font-medium font-serif">Koleksiyonlar</span>
        </motion.h2>
        <motion.p
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1], delay: 0.2 }}
          className="text-[#515f74] text-sm md:text-base max-w-md mx-auto lg:mx-0"
        >
          Hayalinizdeki konsepti yansıtan tasarımınızı seçin ve sağdaki canlı cihaz önizlemesinden anında görüntüleyin.
        </motion.p>
      </div>

      {/* Category Grid - horizontal scroll on mobile, 2x2 grid on desktop */}
      <div className="grid grid-cols-2 sm:grid-cols-2 gap-3 lg:gap-4" id="koleksiyonlar">
        {TEMPLATE_PRESETS.map((pst, idx) => (
          <motion.div
            key={pst.id}
            initial={{ opacity: 0, y: 30, scale: 0.95 }}
            whileInView={{ opacity: 1, y: 0, scale: 1 }}
            viewport={{ once: true, margin: "0px" }}
            transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1], delay: idx * 0.08 }}
            whileHover={{ scale: 1.03, y: -4 }}
            whileTap={{ scale: 0.97 }}
            onClick={() => handleTemplateChange(pst.id, phoneRef)}
            className={`group relative rounded-2xl overflow-hidden shadow-sm hover:shadow-2xl transition-shadow duration-700 h-36 lg:h-48 cursor-pointer border-2 ${
              activePresetId === pst.id ? 'border-[#003527] shadow-lg' : 'border-transparent'
            }`}
          >
            <img
              className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-1000 ease-out filter brightness-90 md:brightness-[0.8]"
              src={pst.imageUrl}
              alt={pst.name}
            />

            <AnimatePresence>
              {activePresetId === pst.id && (
                <motion.div
                  initial={{ opacity: 0, scale: 0.5 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.5 }}
                  transition={{ type: "spring", stiffness: 400, damping: 25 }}
                  className="absolute top-3 right-3 bg-[#003527] text-white text-[10px] font-semibold px-2.5 py-1 rounded-full flex items-center gap-1 shadow-md z-10"
                >
                  <Check size={10} /> Seçili
                </motion.div>
              )}
            </AnimatePresence>

            <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent flex flex-col justify-end p-5">
              <span className={`w-3 h-3 rounded-full ${pst.backgroundStyle} border border-white/30 mb-2 shadow-sm`} />
              <h3 className="font-serif text-lg text-white font-bold leading-tight">
                {pst.name.split(' (')[0]}
              </h3>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Quick Info Box - hidden on mobile */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1], delay: 0.5 }}
        className="bg-[#efe2c1]/30 p-4 rounded-2xl border border-[#efe2c1] hidden lg:flex items-start gap-4 mt-4 hover:bg-[#efe2c1]/50 transition-colors duration-500"
      >
        <div className="p-2 rounded-xl bg-white text-[#003527] shadow-sm mt-0.5">
          <Heart size={16} className="fill-[#003527]/10" />
        </div>
        <div>
          <h4 className="font-semibold text-xs text-[#211b07] uppercase tracking-wider">Metinleri Düzenleyin</h4>
          <p className="text-xs text-[#515f74] mt-1">
            Aşağıdaki <strong>"Davetiye Tasarımcısı"</strong> bölümünden davetiye içeriklerini dilediğiniz gibi güncelleyebilirsiniz.
          </p>
        </div>
      </motion.div>
    </motion.div>
  );
}
