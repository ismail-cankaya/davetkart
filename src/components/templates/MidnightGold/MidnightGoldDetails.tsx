import React from 'react';
import { motion } from 'motion/react';
import { TemplateProps } from '../types';

export default function MidnightGoldDetails({ invitation }: TemplateProps) {
  return (
    <div className="w-full bg-slate-950 text-slate-50 py-12 px-6">
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="max-w-md mx-auto bg-slate-900/40 rounded-3xl p-8 border border-amber-500/20"
      >
        <h3 className="text-xl font-serif text-amber-300 mb-4 text-center names">
          Mekan Detayları
        </h3>
        <div className="w-full h-48 bg-slate-900/80 rounded-xl flex items-center justify-center border border-amber-500/30 mb-6">
          <span className="text-amber-500/50 text-xs tracking-widest uppercase">
            [İnteraktif Harita & Kurumsal Vizyon]
          </span>
        </div>
        <p className="text-sm text-stone-300 text-center leading-relaxed font-light">
          {invitation.venue}
        </p>
      </motion.div>
    </div>
  );
}
