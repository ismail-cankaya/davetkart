import React from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Calendar, MapPin } from 'lucide-react';
import { TemplateProps } from '../types';
import { formatDateStr } from '../utils';
import './midnight-gold.css';

export function MidnightGoldTemplate({ invitation, bgImage, onRsvpClick }: TemplateProps) {
  return (
    <div className="template-midnight w-full h-full relative bg-slate-950 flex flex-col">
      <AnimatePresence mode="popLayout">
        <motion.img
          key="bg"
          initial={{ opacity: 0, scale: 1.05 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.95 }}
          transition={{ duration: 0.8 }}
          src={bgImage}
          alt="Midnight Gold Davetiye"
          className="absolute inset-0 w-full h-full object-cover select-none pointer-events-none filter brightness-75 md:brightness-[0.6]"
        />
      </AnimatePresence>

      <div className="relative z-10 w-full h-full flex flex-col p-6">
        <div className="w-full border-t border-b border-amber-300/30 py-3 text-center mt-4">
          <motion.span
            initial={{ opacity: 0, letterSpacing: "0.1em" }}
            animate={{ opacity: 1, letterSpacing: "0.3em" }}
            transition={{ delay: 0.3, duration: 1 }}
            className="text-amber-200 text-[9px] font-medium uppercase"
          >
            DAVETLİSİNİZ
          </motion.span>
        </div>

        <div className="flex flex-col text-center my-auto px-2 space-y-6">
          <div className="min-h-[16px]">
            <motion.p
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="text-[9px] font-bold tracking-[0.25em] text-white uppercase leading-tight"
            >
              {invitation.title || 'HAYATIMIZIN EN ÖZEL GÜNÜ'}
            </motion.p>
          </div>

          <div className="min-h-[48px] flex items-center justify-center names">
            <motion.h2
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.8 }}
              className="text-3xl md:text-4xl lg:text-5xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-amber-200 via-amber-100 to-amber-200 py-1"
            >
              {invitation.names || 'Sophia & Elias'}
            </motion.h2>
          </div>

          <div className="w-full flex justify-center">
            <div className="w-8 h-8 border border-amber-300/40 rotate-45 flex items-center justify-center">
              <div className="w-1 h-1 bg-amber-300/80 rounded-full" />
            </div>
          </div>

          <div className="min-h-[40px] flex items-center justify-center">
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5 }}
              className="text-[10px] text-stone-300 tracking-wide leading-relaxed max-w-[260px] mx-auto"
            >
              {invitation.subtitle}
            </motion.p>
          </div>

          <div className="bg-slate-900/60 backdrop-blur-md border border-amber-200/10 p-4 space-y-3 mt-4">
            <div className="flex items-center justify-center gap-2 text-xs text-amber-100">
              <Calendar size={13} className="text-amber-400" />
              <span className="font-medium tracking-widest uppercase text-[10px]">
                {formatDateStr(invitation.date)}
              </span>
            </div>

            <div className="w-4 h-[1px] bg-amber-400/20 mx-auto" />

            <div className="flex items-center justify-center gap-2 text-[10px] text-stone-300 px-2 uppercase tracking-wide">
              <MapPin size={13} className="text-amber-400 shrink-0" />
              <span className="leading-snug line-clamp-2">
                {invitation.venue}
              </span>
            </div>
          </div>
        </div>

        <div className="mt-auto mb-2 text-center w-full">
          <motion.button
            whileHover={{ scale: 1.02, backgroundColor: "rgba(251, 191, 36, 1)", color: "#020617" }}
            whileTap={{ scale: 0.98 }}
            onClick={onRsvpClick}
            className="w-full bg-transparent text-amber-300 font-bold py-3.5 px-6 text-[11px] tracking-[0.2em] transition-all duration-300 border border-amber-300/50 cursor-pointer uppercase"
          >
            Katılım Bildir
          </motion.button>
        </div>
      </div>
    </div>
  );
}
