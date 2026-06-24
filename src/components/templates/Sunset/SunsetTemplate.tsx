import React from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Calendar, MapPin } from 'lucide-react';
import { TemplateProps } from '../types';
import { formatDateStr } from '../utils';
import './sunset.css';

export function SunsetTemplate({ invitation, bgImage, onRsvpClick }: TemplateProps) {
  return (
    <div className="template-sunset w-full h-full relative bg-orange-950 flex flex-col">
      <AnimatePresence mode="popLayout">
        <motion.img
          key="bg"
          initial={{ opacity: 0, scale: 1.05 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.95 }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          src={bgImage}
          alt="Sunset Davetiye"
          className="absolute inset-0 w-full h-full object-cover select-none pointer-events-none filter brightness-90"
        />
      </AnimatePresence>

      <div className="relative z-10 w-full h-full flex flex-col justify-between p-6">
        <div className="self-center mt-4">
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.3, duration: 0.8 }}
            className="bg-orange-100/10 backdrop-blur-sm border border-orange-200/30 px-4 py-2 rounded-xl text-center"
          >
            <span className="text-orange-100 text-[10px] tracking-[0.15em] font-light uppercase block">
              DAVETLİSİNİZ
            </span>
          </motion.div>
        </div>

        <div className="flex flex-col text-center my-auto px-1 space-y-5">
          <div className="min-h-[16px]">
            <motion.p
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="text-[10px] font-semibold tracking-[0.2em] text-orange-200 uppercase drop-shadow-sm leading-tight"
            >
              {invitation.title || 'HAYATIMIZIN EN ÖZEL GÜNÜ'}
            </motion.p>
          </div>

          <div className="min-h-[48px] flex items-center justify-center names">
            <motion.h2
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
              className="text-4xl md:text-5xl lg:text-6xl text-white drop-shadow-md py-2"
            >
              {invitation.names || 'Sophia & Elias'}
            </motion.h2>
          </div>

          <div className="min-h-[40px] flex items-center justify-center">
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5 }}
              className="text-[11px] text-orange-100/90 tracking-wider leading-relaxed max-w-xs mx-auto px-4"
            >
              {invitation.subtitle}
            </motion.p>
          </div>

          <div className="w-16 h-[1px] bg-orange-200/50 mx-auto my-2" />

          <div className="space-y-3 mt-2">
            <div className="flex items-center justify-center gap-2 text-xs text-white">
              <Calendar size={14} className="text-orange-300" />
              <span className="font-semibold tracking-wide">
                {formatDateStr(invitation.date)}
              </span>
            </div>

            <div className="flex items-center justify-center gap-2 text-xs text-orange-100 px-4">
              <MapPin size={14} className="text-orange-300 shrink-0" />
              <span className="leading-snug line-clamp-2">
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
            className="w-full max-w-[220px] bg-orange-500 hover:bg-orange-600 text-white font-bold py-3.5 px-6 rounded-lg text-xs tracking-widest shadow-xl transition-all duration-300 border border-orange-400/50 cursor-pointer uppercase"
          >
            KATILIM BİLDİR
          </motion.button>
        </div>
      </div>
    </div>
  );
}
