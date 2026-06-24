import React from 'react';
import { motion } from 'motion/react';
import { Sparkles, Laptop, Send, ArrowRight } from 'lucide-react';

export function Features() {
  return (
    <section id="neden-dijital" className="py-20 md:py-32 bg-[#f8f9ff] relative overflow-hidden">
      {/* Subtle background decoration */}
      <div className="absolute top-0 left-0 w-full h-full pointer-events-none">
        <div className="absolute top-20 right-10 w-72 h-72 bg-emerald-100/30 rounded-full blur-3xl" />
        <div className="absolute bottom-20 left-10 w-96 h-96 bg-amber-50/40 rounded-full blur-3xl" />
      </div>

      <div className="max-w-7xl mx-auto px-4 md:px-12 relative z-10">
        {/* Section Header */}
        <motion.div
          className="text-center mb-16 md:mb-20"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        >
          <span className="text-[#003527] font-semibold text-xs tracking-wider uppercase bg-[#003527]/5 px-3 py-1 rounded-full inline-block mb-4">
            Basit 3 Adım
          </span>
          <h2 className="font-serif text-3xl md:text-5xl font-bold text-[#0b1c30] mb-4">
            Nasıl <span className="italic text-[#003527] font-medium">Çalışır?</span>
          </h2>
          <p className="text-[#515f74] text-sm md:text-base max-w-xl mx-auto leading-relaxed">
            Dijital davetiyenizi dakikalar içinde oluşturun ve sevdiklerinizle anında paylaşın.
          </p>
        </motion.div>

        {/* Steps Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-6 lg:gap-10">
          {[
            {
              step: '01',
              title: 'Şablon Seçin',
              desc: 'Düğün, nişan, baby shower, doğum günü veya kurumsal etkinlik — hayalinizdeki konsepte uygun premium şablonu seçin.',
              icon: <Sparkles size={24} />,
              gradient: 'from-emerald-500 to-teal-600',
              bgLight: 'bg-emerald-50',
              borderColor: 'border-emerald-200',
              iconBg: 'bg-emerald-100 text-emerald-700'
            },
            {
              step: '02',
              title: 'Kişiselleştirin',
              desc: 'İsimleri, tarihi, mekanı ve özel mesajınızı girin. Canlı önizlemede her değişikliği anında görün.',
              icon: <Laptop size={24} />,
              gradient: 'from-amber-500 to-orange-600',
              bgLight: 'bg-amber-50',
              borderColor: 'border-amber-200',
              iconBg: 'bg-amber-100 text-amber-700'
            },
            {
              step: '03',
              title: 'Paylaşın & Takip Edin',
              desc: 'WhatsApp, SMS veya e-posta ile gönderin. Canlı katılım panelinden katılım durumlarını anlık takip edin.',
              icon: <Send size={24} />,
              gradient: 'from-violet-500 to-purple-600',
              bgLight: 'bg-violet-50',
              borderColor: 'border-violet-200',
              iconBg: 'bg-violet-100 text-violet-700'
            }
          ].map((item, idx) => (
            <motion.div
              key={item.step}
              className={`relative group rounded-3xl ${item.bgLight} border ${item.borderColor} p-8 md:p-10 hover:shadow-2xl transition-all duration-700 hover:-translate-y-2`}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1], delay: idx * 0.15 }}
            >
              {/* Step Number */}
              <div className="absolute -top-4 -right-2 md:-right-4">
                <span className={`bg-gradient-to-br ${item.gradient} text-white text-2xl md:text-3xl font-serif font-bold w-14 h-14 md:w-16 md:h-16 rounded-2xl flex items-center justify-center shadow-lg`}>
                  {item.step}
                </span>
              </div>

              {/* Icon */}
              <div className={`w-14 h-14 rounded-2xl ${item.iconBg} flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-500`}>
                {item.icon}
              </div>

              {/* Content */}
              <h3 className="font-serif text-xl md:text-2xl font-bold text-[#0b1c30] mb-3">
                {item.title}
              </h3>
              <p className="text-[#515f74] text-sm leading-relaxed">
                {item.desc}
              </p>

              {/* Connector line (between cards on desktop) */}
              {idx < 2 && (
                <div className="hidden md:block absolute top-1/2 -right-3 lg:-right-5 w-6 lg:w-10 h-[2px] bg-gradient-to-r from-[#003527]/20 to-transparent z-20" />
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
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1], delay: 0.4 }}
        >
          <a
            href="#tasarimci"
            className="group inline-flex items-center gap-3 bg-[#003527] text-white px-10 py-5 rounded-full font-semibold text-sm hover:bg-[#064e3b] transition-all duration-500 shadow-lg hover:shadow-2xl hover:-translate-y-1"
          >
            Hemen Başlayın
            <ArrowRight size={18} className="group-hover:translate-x-1.5 transition-transform duration-300" />
          </a>
          <p className="text-[#515f74] text-xs mt-4">Kredi kartı gerektirmez · İlk davetiye %60 indirimli</p>
        </motion.div>
      </div>
    </section>
  );
}
