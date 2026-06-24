import React from 'react';
import { motion } from 'motion/react';
import { TemplateProps } from '../types';

export default function EmeraldDetails({ invitation }: TemplateProps) {
  return (
    <div className="w-full bg-emerald-950 text-emerald-50 py-12 px-6">
      {/* Dummy heavy component placeholder */}
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="max-w-md mx-auto bg-emerald-900/40 rounded-3xl p-8 border border-emerald-800/50"
      >
        <h3 className="text-xl font-serif text-amber-200 mb-4 text-center names">
          Mekan Detayları & Harita
        </h3>
        <div className="w-full h-48 bg-emerald-900/80 rounded-xl flex items-center justify-center border border-emerald-800/80 mb-6">
          <span className="text-emerald-700/50 text-xs tracking-widest uppercase">
            [İnteraktif Harita Yüklenecek]
          </span>
        </div>
        <p className="text-sm text-emerald-100/70 text-center leading-relaxed">
          {invitation.venue}
        </p>
      </motion.div>
    </div>
  );
}
