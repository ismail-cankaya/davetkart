import React from 'react';
import { motion } from 'motion/react';
import { TemplateProps } from '../types';

export default function SunsetDetails({ invitation }: TemplateProps) {
  return (
    <div className="w-full bg-orange-950 text-orange-50 py-12 px-6">
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="max-w-md mx-auto bg-orange-900/40 rounded-3xl p-8 border border-orange-800/50"
      >
        <h3 className="text-xl font-serif text-orange-200 mb-4 text-center names">
          Mekan & Galeri
        </h3>
        <div className="w-full h-48 bg-orange-900/80 rounded-xl flex items-center justify-center border border-orange-800/80 mb-6">
          <span className="text-orange-700/50 text-xs tracking-widest uppercase">
            [Harita & Galeri Modülü]
          </span>
        </div>
        <p className="text-sm text-orange-100/70 text-center leading-relaxed">
          {invitation.venue}
        </p>
      </motion.div>
    </div>
  );
}
