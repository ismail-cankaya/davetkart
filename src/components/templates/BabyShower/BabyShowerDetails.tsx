import React from 'react';
import { motion } from 'motion/react';
import { TemplateProps } from '../types';

export default function BabyShowerDetails({ invitation }: TemplateProps) {
  return (
    <div className="w-full bg-sky-100 text-sky-900 py-12 px-6">
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="max-w-md mx-auto bg-white/60 rounded-3xl p-8 border border-white"
      >
        <h3 className="text-xl font-bold text-sky-800 mb-4 text-center names">
          Mekan & Adres
        </h3>
        <div className="w-full h-48 bg-sky-200/50 rounded-xl flex items-center justify-center border border-white mb-6">
          <span className="text-sky-600/50 text-xs tracking-widest uppercase font-bold">
            [Harita & Galeri Modülü]
          </span>
        </div>
        <p className="text-sm text-sky-900/80 text-center leading-relaxed font-medium">
          {invitation.venue}
        </p>
      </motion.div>
    </div>
  );
}
