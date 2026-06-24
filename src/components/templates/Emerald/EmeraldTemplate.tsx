import React from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Calendar, MapPin } from 'lucide-react';
import { TemplateProps } from '../types';
import { formatDateStr } from '../utils';
import './emerald.css';

export function EmeraldTemplate({ invitation, bgImage, onRsvpClick }: TemplateProps) {
  return (
    <div className="template-emerald w-full h-full relative bg-emerald-950 flex flex-col">
      <AnimatePresence mode="popLayout">
        <motion.img
          key="bg"
          initial={{ opacity: 0, scale: 1.05 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.95 }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          src={bgImage}
          alt="Emerald Davetiye"
          className="absolute inset-0 w-full h-full object-cover select-none pointer-events-none filter brightness-90 md:brightness-[0.8]"
        />
      </AnimatePresence>

      <div className="relative z-10 w-full h-full flex flex-col justify-between p-6">
        <div className="self-center mt-6">
          <motion.span
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.8 }}
            className="backdrop-blur-md bg-white/10 text-white/95 border border-white/20 text-[10px] tracking-[0.2em] font-medium px-3 py-1 rounded-full uppercase"
          >
            DAVETLİSİNİZ
          </motion.span>
        </div>

        <div className="flex flex-col text-center my-auto px-1 space-y-4">
          <div className="w-8 h-[1px] bg-amber-200/50 mx-auto" />

          <div className="min-h-[16px]">
            <motion.p
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="text-[9px] font-semibold tracking-[0.2em] text-amber-200/95 uppercase drop-shadow-sm leading-tight"
            >
              {invitation.title || 'HAYATIMIZIN EN ÖZEL GÜNÜ'}
            </motion.p>
          </div>

          <div className="min-h-[48px] flex items-center justify-center names">
            <motion.h2
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
              className="text-4xl md:text-5xl lg:text-6xl text-amber-100 italic tracking-wide leading-tight px-2 py-1 drop-shadow-md"
            >
              {invitation.names || 'Sophia & Elias'}
            </motion.h2>
          </div>

          <div className="flex items-center justify-center gap-2">
            <div className="w-6 h-[0.5px] bg-amber-200/30" />
            <span className="text-white/90 text-xs tracking-wider">&amp;</span>
            <div className="w-6 h-[0.5px] bg-amber-200/30" />
          </div>

          <div className="min-h-[40px] flex items-center justify-center">
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5 }}
              className="text-[10px] text-emerald-50/90 tracking-wide leading-relaxed max-w-xs mx-auto px-4 italic"
            >
              "{invitation.subtitle}"
            </motion.p>
          </div>

          <div className="w-12 h-[1px] bg-amber-200/40 mx-auto" />

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

        <div className="mt-auto mb-2 text-center flex flex-col items-center gap-3">
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={onRsvpClick}
            className="w-full max-w-[210px] bg-amber-500 hover:bg-amber-600 text-emerald-950 font-semibold py-3 px-6 rounded-full text-xs tracking-wider shadow-xl transition-all duration-300 border border-white/15 cursor-pointer"
          >
            KATILIM BİLDİR
          </motion.button>
          <p className="text-[9px] text-stone-300/80 tracking-wide">
            *Lütfen yanıtınızı en geç etkinlik haftasına kadar iletiniz.
          </p>
        </div>
      </div>
    </div>
  );
}
