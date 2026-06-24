import React from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Calendar, MapPin, Heart } from 'lucide-react';
import { TemplateProps } from '../types';
import { formatDateStr } from '../utils';
import './baby-shower.css';

export function BabyShowerTemplate({ invitation, bgImage, onRsvpClick }: TemplateProps) {
  return (
    <div className="template-baby w-full h-full relative bg-sky-100 flex flex-col">
      <AnimatePresence mode="popLayout">
        <motion.img
          key="bg"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.8 }}
          src={bgImage}
          alt="Baby Shower Davetiye"
          className="absolute inset-0 w-full h-full object-cover select-none pointer-events-none filter brightness-105"
        />
      </AnimatePresence>

      <div className="relative z-10 w-full h-full flex flex-col justify-between p-6">
        <div className="self-center mt-6">
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.8, type: "spring" }}
            className="bg-white/80 backdrop-blur-md text-sky-800 border-2 border-white text-[11px] font-bold px-4 py-1.5 rounded-full uppercase shadow-sm flex items-center gap-1.5"
          >
            <Heart size={12} className="fill-sky-400 text-sky-400" /> DAVETLİSİNİZ
          </motion.div>
        </div>

        <div className="flex flex-col text-center my-auto px-1 space-y-4">
          <div className="min-h-[16px]">
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5 }}
              className="text-[10px] font-bold tracking-widest text-sky-800/80 uppercase"
            >
              {invitation.title || 'HAYATIMIZIN EN ÖZEL GÜNÜ'}
            </motion.p>
          </div>

          <div className="min-h-[48px] flex items-center justify-center names">
            <motion.h2
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6, type: "spring" }}
              className="text-4xl md:text-5xl text-sky-900 drop-shadow-sm py-2 px-4"
            >
              {invitation.names || 'Sophia & Elias'}
            </motion.h2>
          </div>

          <div className="w-12 h-1 bg-white/60 rounded-full mx-auto my-1" />

          <div className="min-h-[40px] flex items-center justify-center">
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5 }}
              className="text-[11px] text-sky-900/80 font-medium leading-relaxed max-w-[240px] mx-auto"
            >
              {invitation.subtitle}
            </motion.p>
          </div>

          <div className="bg-white/40 backdrop-blur-sm rounded-2xl p-4 mt-4 border border-white/50 shadow-sm space-y-3">
            <div className="flex items-center justify-center gap-2 text-xs text-sky-900">
              <Calendar size={14} className="text-sky-600" />
              <span className="font-bold">
                {formatDateStr(invitation.date)}
              </span>
            </div>

            <div className="flex items-center justify-center gap-2 text-xs text-sky-800 px-2">
              <MapPin size={14} className="text-sky-600 shrink-0" />
              <span className="font-medium leading-snug line-clamp-2">
                {invitation.venue}
              </span>
            </div>
          </div>
        </div>

        <div className="mt-auto mb-2 text-center flex flex-col items-center gap-3">
          <motion.button
            whileHover={{ scale: 1.05, y: -2 }}
            whileTap={{ scale: 0.95 }}
            onClick={onRsvpClick}
            className="w-full max-w-[210px] bg-sky-400 hover:bg-sky-500 text-white font-bold py-3.5 px-6 rounded-full text-xs tracking-wider shadow-lg transition-all duration-300 border-2 border-white/40 cursor-pointer"
          >
            KATILIM BİLDİR
          </motion.button>
        </div>
      </div>
    </div>
  );
}
