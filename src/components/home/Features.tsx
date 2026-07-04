import React from 'react';
import { motion } from 'motion/react';
import { Sparkles, Laptop, Send, ArrowRight } from 'lucide-react';

const EASE_LUXE = [0.22, 1, 0.36, 1] as const;

const STEPS = [
  {
    step: '01',
    title: 'Şablon Seçin',
    desc: 'Düğün, nişan, baby shower, doğum günü veya kurumsal etkinlik — hayalinizdeki konsepte uygun premium şablonu seçin.',
    icon: <Sparkles size={22} />
  },
  {
    step: '02',
    title: 'Kişiselleştirin',
    desc: 'İsimleri, tarihi, mekanı ve özel mesajınızı girin. Canlı önizlemede her değişikliği anında görün.',
    icon: <Laptop size={22} />
  },
  {
    step: '03',
    title: 'Paylaşın & Takip Edin',
    desc: 'WhatsApp, SMS veya e-posta ile gönderin. Canlı katılım panelinden katılım durumlarını anlık takip edin.',
    icon: <Send size={22} />
  }
];

export const Features = React.memo(function Features() {
  return (
    <section id="neden-dijital" className="py-20 md:py-32 bg-cream relative overflow-hidden scroll-mt-20">
      {/* Subtle background decoration */}
      <div className="absolute top-0 left-0 w-full h-full pointer-events-none">
        <div className="absolute top-20 right-10 w-72 h-72 bg-emerald-100/40 rounded-full blur-3xl" />
        <div className="absolute bottom-20 left-10 w-96 h-96 bg-champagne/30 rounded-full blur-3xl" />
      </div>

      <div className="max-w-7xl mx-auto px-4 md:px-12 relative z-10">
        {/* Section Header */}
        <motion.div
          className="text-center mb-16 md:mb-20"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, ease: EASE_LUXE }}
        >
          <span className="text-brand font-semibold text-xs tracking-[0.15em] uppercase bg-brand/5 border border-brand/10 px-3.5 py-1.5 rounded-full inline-block mb-4">
            Basit 3 Adım
          </span>
          <h2 className="font-serif text-3xl md:text-5xl font-bold text-ink mb-4">
            Nasıl <span className="italic text-brand font-medium">Çalışır?</span>
          </h2>
          <p className="text-muted text-sm md:text-base max-w-xl mx-auto leading-relaxed">
            Dijital davetiyenizi dakikalar içinde oluşturun ve sevdiklerinizle anında paylaşın.
          </p>
        </motion.div>

        {/* Steps Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-6 lg:gap-10">
          {STEPS.map((item, idx) => (
            <motion.div
              key={item.step}
              className="relative group rounded-3xl bg-white border border-ink/[0.06] p-8 md:p-10 shadow-sm hover:shadow-2xl hover:shadow-brand/10 hover:border-brand/15 transition-all duration-700 hover:-translate-y-2 overflow-hidden"
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, ease: EASE_LUXE, delay: idx * 0.15 }}
            >
              {/* Ghost step numeral */}
              <span className="absolute -top-6 right-2 font-serif text-[7rem] leading-none font-bold text-brand/[0.05] group-hover:text-gold/15 transition-colors duration-700 select-none pointer-events-none">
                {item.step}
              </span>

              {/* Icon */}
              <div className="relative w-14 h-14 rounded-2xl bg-brand/[0.06] text-brand border border-brand/10 flex items-center justify-center mb-6 group-hover:bg-brand group-hover:text-champagne group-hover:scale-105 transition-all duration-500">
                {item.icon}
              </div>

              {/* Content */}
              <div className="flex items-center gap-3 mb-3">
                <span className="font-serif text-sm font-bold text-gold">{item.step}</span>
                <span className="h-px w-8 bg-gold/40" />
              </div>
              <h3 className="font-serif text-xl md:text-2xl font-bold text-ink mb-3">
                {item.title}
              </h3>
              <p className="text-muted text-sm leading-relaxed">
                {item.desc}
              </p>

              {/* Connector line (between cards on desktop) */}
              {idx < 2 && (
                <div className="hidden md:block absolute top-1/2 -right-3 lg:-right-5 w-6 lg:w-10 h-px bg-gradient-to-r from-brand/25 to-transparent z-20" />
              )}
            </motion.div>
          ))}
        </div>

        {/* CTA */}
        <motion.div
          className="text-center mt-14 md:mt-20"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, ease: EASE_LUXE, delay: 0.4 }}
        >
          <a
            href="#tasarimci"
            className="group relative overflow-hidden inline-flex items-center gap-3 bg-brand text-white px-10 py-5 rounded-full font-semibold text-sm hover:bg-brand-soft transition-all duration-500 shadow-lg shadow-brand/20 hover:shadow-2xl hover:shadow-brand/30 hover:-translate-y-1"
          >
            <span className="absolute inset-0 animate-shimmer pointer-events-none" />
            Hemen Başlayın
            <ArrowRight size={18} className="group-hover:translate-x-1.5 transition-transform duration-300" />
          </a>
          <p className="text-muted text-xs mt-4">Kredi kartı gerektirmez · İlk davetiye %60 indirimli</p>
        </motion.div>
      </div>
    </section>
  );
});
