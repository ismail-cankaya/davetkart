import React from 'react';
import { motion } from 'motion/react';
import { Sparkles, ArrowRight } from 'lucide-react';

export function Hero() {
  return (
    <section className="relative min-h-[100dvh] pt-20 pb-20 overflow-hidden bg-gradient-to-b from-[#f8f9ff] via-white to-[#f8f9ff] flex flex-col justify-center bg-grain">
      <div className="max-w-7xl mx-auto px-4 md:px-12 relative z-10 flex flex-col items-center text-center w-full">

        <motion.div
          initial={{ opacity: 0, y: -20, scale: 0.9 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
          className="relative bg-[#efe2c1] text-[#211b07] px-4 py-1.5 rounded-full font-semibold text-xs tracking-wide mb-8 inline-flex items-center gap-1.5 shadow-sm border border-[#211b07]/10 overflow-hidden"
        >
          <div className="absolute inset-0 animate-shimmer" />
          <Sparkles size={14} className="text-amber-600 animate-pulse relative z-10" />
          <span className="relative z-10">Yeni Nesil Davetiye Deneyimi</span>
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, ease: [0.16, 1, 0.3, 1], delay: 0.15 }}
          className="font-serif text-3xl md:text-5xl lg:text-6xl text-[#0b1c30] max-w-4xl mx-auto leading-tight md:leading-tight mb-6 font-bold tracking-tight"
        >
          Özel Anlarınızı <span className="text-[#003527] italic font-medium font-serif">Dijital Zarafetle</span> Taçlandırın
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 25 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, ease: [0.16, 1, 0.3, 1], delay: 0.3 }}
          className="text-[#515f74] text-base md:text-lg max-w-2xl mx-auto mb-10 leading-relaxed"
        >
          Çevre dostu, anında paylaşılabilir, müzikli ve tamamen kişiselleştirilebilir dijital lüks davetiyelerle sevdiklerinize unutulmaz bir ilk izlenim bırakın.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1], delay: 0.45 }}
          className="flex flex-col sm:flex-row gap-4 justify-center w-full sm:w-auto"
        >
          <a
            href="#tasarimci"
            className="group bg-[#003527] text-white px-8 py-4 rounded-full font-semibold text-sm hover:bg-[#064e3b] transition-all duration-500 shadow-lg flex items-center justify-center gap-2 hover:-translate-y-1 hover:shadow-xl"
          >
            Davetiyeni Oluştur
            <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform duration-300" />
          </a>
          <a
            href="#koleksiyonlar"
            className="bg-white text-[#003527] border border-[#003527]/20 px-8 py-4 rounded-full font-semibold text-sm hover:bg-[#003527]/5 transition-all duration-500 flex items-center justify-center gap-2 hover:-translate-y-0.5"
          >
            Şablonları İncele
          </a>
        </motion.div>

        {/* Hero Stats with staggered reveal */}
        <motion.div
          id="hero-stats"
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.6, ease: [0.16, 1, 0.3, 1] }}
          className="mt-20 w-full max-w-5xl grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-4 border-t border-[#0b1c30]/10 pt-12 text-center"
        >
          {[
            { value: '10K+', label: 'Oluşturulan Davetiye', delay: 0 },
            { value: '70B+', label: 'Görüntülenme', delay: 0.1 },
            { value: '500+', label: 'Özel Şablon', delay: 0.2 },
            { value: '%100', label: 'Çevre Dostu', delay: 0.3 }
          ].map((stat, idx) => (
            <motion.div
              key={idx}
              className="p-2"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.7 + stat.delay, ease: [0.16, 1, 0.3, 1] }}
            >
              <p className="font-serif text-3xl md:text-4xl font-bold text-[#003527]">{stat.value}</p>
              <p className="text-xs text-[#515f74] uppercase tracking-wider font-semibold mt-2">{stat.label}</p>
            </motion.div>
          ))}
        </motion.div>
      </div>

      {/* Decorative floating blobs with animation */}
      <motion.div
        animate={{ x: [0, 30, 0], y: [0, -20, 0] }}
        transition={{ duration: 12, repeat: Infinity, ease: "easeInOut" }}
        className="absolute top-10 right-0 w-80 h-80 bg-emerald-100/40 rounded-full blur-3xl pointer-events-none -z-10"
      />
      <motion.div
        animate={{ x: [0, 30, 0], y: [0, -20, 0] }}
        transition={{ duration: 12, repeat: Infinity, ease: "easeInOut" }}
        className="hidden md:block absolute top-10 right-0 w-80 h-80 bg-emerald-100/40 rounded-full blur-3xl pointer-events-none -z-10"
      />
      <motion.div
        animate={{ x: [0, -20, 0], y: [0, 30, 0] }}
        transition={{ duration: 15, repeat: Infinity, ease: "easeInOut" }}
        className="hidden md:block absolute bottom-20 left-10 w-96 h-96 bg-amber-100/30 rounded-full blur-3xl pointer-events-none -z-10"
      />
      <motion.div
        animate={{ scale: [1, 1.2, 1], opacity: [0.2, 0.35, 0.2] }}
        transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
        className="hidden md:block absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-gradient-radial from-emerald-100/20 to-transparent rounded-full blur-3xl pointer-events-none -z-10"
      />

      {/* Scroll indicator */}
      <motion.a
        href="#animasyon-ve-onizleme"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5, duration: 1 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 z-10 cursor-pointer group"
      >
        <span className="text-[10px] text-[#515f74] uppercase tracking-[0.2em] font-semibold group-hover:text-[#003527] transition-colors">Keşfet</span>
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
          className="w-5 h-8 rounded-full border-2 border-[#003527]/20 flex items-start justify-center pt-1.5 group-hover:border-[#003527]/40 transition-colors"
        >
          <div className="w-1 h-2 bg-[#003527]/40 rounded-full group-hover:bg-[#003527]/60 transition-colors" />
        </motion.div>
      </motion.a>
    </section>
  );
}
