import React, { useState, useEffect, useRef } from 'react';
import { motion } from 'motion/react';
import { Sparkles, Check, ArrowRight, Flame, RotateCcw } from 'lucide-react';
import { Invitation } from '../../types';
import { INITIAL_INVITATION } from '../../data';

const EASE_LUXE = [0.22, 1, 0.36, 1] as const;

const inputClass =
  'w-full bg-white/5 border border-white/15 focus:border-gold focus:ring-2 focus:ring-gold/20 focus:outline-none rounded-xl px-4 py-3 text-sm text-white placeholder:text-white/30 transition-all duration-300';

interface DesignerPanelProps {
  invitation: Invitation;
  handleInputChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
  setInvitation: React.Dispatch<React.SetStateAction<Invitation>>;
  setActivePresetId: React.Dispatch<React.SetStateAction<string>>;
}

export const DesignerPanel = React.memo(function DesignerPanel({
  invitation,
  handleInputChange,
  setInvitation,
  setActivePresetId
}: DesignerPanelProps) {
  const [localInvitation, setLocalInvitation] = useState<Invitation>(invitation);
  const debounceRef = useRef<ReturnType<typeof setTimeout> | undefined>(undefined);

  useEffect(() => {
    setLocalInvitation(invitation);
  }, [invitation]);

  // Debounce temizliği — unmount'ta bekleyen timer sızıntısını önler
  useEffect(() => () => {
    if (debounceRef.current) clearTimeout(debounceRef.current);
  }, []);

  const handleLocalChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setLocalInvitation(prev => ({ ...prev, [name]: value }));

    if (debounceRef.current) clearTimeout(debounceRef.current);
    debounceRef.current = setTimeout(() => {
      setInvitation(prev => ({ ...prev, [name]: value }));
    }, 400);
  };

  return (
    <motion.section
      id="tasarimci"
      className="py-14 md:py-24 bg-gradient-to-b from-brand-deep via-emerald-950 to-brand-deep text-white relative overflow-hidden scroll-mt-20"
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '0px' }}
      transition={{ duration: 1, ease: EASE_LUXE }}
    >
      {/* Ambient glow */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-emerald-800/20 rounded-full blur-3xl" />
        <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-gold/10 rounded-full blur-3xl" />
      </div>

      <div className="max-w-7xl mx-auto px-4 md:px-12 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">

          {/* Designer Setup Panel Form - Left Column */}
          <div className="lg:col-span-7 space-y-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, ease: EASE_LUXE }}
            >
              <div className="bg-champagne text-brand-deep px-3.5 py-1.5 rounded-full text-[11px] font-semibold tracking-wide w-fit flex items-center gap-1.5 shadow-sm mb-4">
                <Sparkles size={12} className="text-gold" />
                <span>Özelleştirilebilir Alanlar</span>
              </div>
              <h2 className="font-serif text-3xl md:text-4xl font-bold text-white">
                Kendi E-Davetiyeni <span className="italic font-medium text-champagne">Tasarla</span>
              </h2>
              <p className="text-emerald-100/70 text-sm mt-3 max-w-xl leading-relaxed">
                Aşağıdaki bilgileri düzenleyerek davetiyenizi anında kişiselleştirebilirsiniz. Yukarıdaki telefon simülatöründe ve canlı katılım panelinde sonuçları gerçek zamanlı gözlemleyin.
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.9, ease: EASE_LUXE, delay: 0.1 }}
              className="bg-white/[0.07] backdrop-blur-md p-6 md:p-8 rounded-3xl border border-white/10 space-y-6 shadow-2xl shadow-black/20"
            >

              {/* Form entries */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

                {/* Event Names / Couple Names */}
                <div className="space-y-2">
                  <label className="block text-xs font-bold tracking-wider uppercase text-champagne">
                    Davet Sahipleri / İsimler
                  </label>
                  <input
                    type="text"
                    name="names"
                    value={localInvitation.names}
                    onChange={handleLocalChange}
                    placeholder="Örn. Sophia & Elias"
                    className={inputClass}
                  />
                </div>

                {/* Entry Badge / Title */}
                <div className="space-y-2">
                  <label className="block text-xs font-bold tracking-wider uppercase text-champagne">
                    Üst Başlık (Slogan)
                  </label>
                  <input
                    type="text"
                    name="title"
                    value={localInvitation.title}
                    onChange={handleLocalChange}
                    placeholder="Örn. HAYATIMIZIN EN ÖZEL GÜNÜ"
                    className={inputClass}
                  />
                </div>

                {/* Event Date Picker */}
                <div className="space-y-2">
                  <label className="block text-xs font-bold tracking-wider uppercase text-champagne">
                    Etkinlik Tarihi &amp; Saati
                  </label>
                  <input
                    type="datetime-local"
                    name="date"
                    value={localInvitation.date}
                    onChange={handleLocalChange}
                    className={`${inputClass} [color-scheme:dark]`}
                  />
                </div>

                {/* Event Location */}
                <div className="space-y-2">
                  <label className="block text-xs font-bold tracking-wider uppercase text-champagne">
                    Etkinlik Mekanı / Adres
                  </label>
                  <input
                    type="text"
                    name="venue"
                    value={localInvitation.venue}
                    onChange={handleLocalChange}
                    placeholder="Örn. Çırağan Sarayı, Beşiktaş"
                    className={inputClass}
                  />
                </div>

              </div>

              {/* Message subtitle */}
              <div className="space-y-2">
                <label className="block text-xs font-bold tracking-wider uppercase text-champagne">
                  Davet Mesajı (Açıklama / Şiir)
                </label>
                <textarea
                  name="subtitle"
                  rows={3}
                  value={localInvitation.subtitle}
                  onChange={handleLocalChange}
                  placeholder="Örn. Sizleri de bu mutlu günümüzde aramızda görmekten onur duyarız..."
                  className={`${inputClass} resize-none`}
                />
              </div>

              {/* Reset options */}
              <div className="flex justify-between items-center pt-2">
                <button
                  type="button"
                  onClick={() => {
                    setInvitation(INITIAL_INVITATION);
                    setActivePresetId('emerald');
                  }}
                  className="text-emerald-100/60 hover:text-white text-xs cursor-pointer flex items-center gap-1.5 transition-colors duration-300"
                >
                  <RotateCcw size={12} />
                  Bütün Formu Sıfırla
                </button>

                <a
                  href="#animasyon-ve-onizleme"
                  className="bg-champagne hover:bg-gold text-brand-deep font-bold px-6 py-3 rounded-xl text-xs flex items-center gap-2 shadow-lg shadow-black/20 cursor-pointer transition-all duration-300 hover:-translate-y-0.5"
                >
                  Önizleme
                  <ArrowRight size={13} />
                </a>
              </div>

            </motion.div>
          </div>

          {/* Info & Simulated Device Guide - Right Column */}
          <div className="lg:col-span-5 space-y-6">

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.9, ease: EASE_LUXE, delay: 0.2 }}
              className="bg-white/5 p-6 rounded-3xl border border-white/10 space-y-4"
            >
              <h3 className="font-serif text-lg font-bold text-champagne flex items-center gap-2 border-b border-white/10 pb-3">
                <Sparkles className="text-gold w-4 h-4" />
                Premium Dijital Özellikler
              </h3>

              <div className="space-y-3 text-xs text-emerald-100/70">
                <p>
                  Oluşturulan premium dijital davetiyeler, geleneksel kağıt baskının sunamadığı gelişmiş interaktif özelliklerle birlikte gelir:
                </p>
                <ul className="space-y-2.5 list-none pl-1">
                  {[
                    ['Akıllı Harita Navigasyonu', 'Misafirler davetiyeden tek tuşla konuma yol tarifi alabilir.'],
                    ['Takvime Ekle (iCal/Google)', 'Unutulmamasını sağlamak amacıyla tek tuşla ajandaya işlenebilir.'],
                    ['Ses & Arka Plan Müziği', 'Misafirleriniz davetiyeyi açtığında seçtiğiniz enstrümantal hoş bir müzik karşılar.'],
                    ['Doğa Dostu', 'Kağıt israfına, kargo ve zarf karmaşasına son verir!']
                  ].map(([title, desc]) => (
                    <li key={title} className="flex items-start gap-2.5">
                      <span className="w-4 h-4 rounded-full bg-gold/15 text-gold flex items-center justify-center shrink-0 mt-0.5">
                        <Check size={10} />
                      </span>
                      <span><strong className="text-white/90">{title}</strong>: {desc}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.9, ease: EASE_LUXE, delay: 0.3 }}
              className="bg-gradient-to-br from-champagne via-[#e8d5a8] to-gold p-6 rounded-3xl text-brand-deep shadow-2xl shadow-black/20 relative overflow-hidden"
            >
              <div className="relative z-10">
                <div className="flex items-center gap-1.5 mb-3 bg-brand-deep/10 w-fit px-2.5 py-1 rounded-full text-[10px] font-bold">
                  <Flame size={12} /> Sınırlı Süre Promosyonu
                </div>
                <h4 className="font-serif text-2xl font-bold">İlk Davetiyeniz %60 İndirimli!</h4>
                <p className="text-xs font-medium mt-2 text-brand-deep/80 leading-relaxed">
                  Sitemize şimdi üye olarak ilk dijital davetiyenizi büyük bir indirimle oluşturabilir ve ilk 102 misafirinize tamamen ücretsiz katılım takibi yapabilirsiniz.
                </p>
                <a
                  href="#tasarimci"
                  className="mt-4 inline-flex items-center gap-1.5 bg-brand-deep text-champagne font-bold text-xs px-5 py-2.5 rounded-xl hover:bg-brand transition-all duration-300 hover:-translate-y-0.5 shadow-md"
                >
                  <span>Hemen Başla</span>
                  <ArrowRight size={12} />
                </a>
              </div>
              {/* Glowing graphic element */}
              <div className="absolute top-1/2 right-1/2 translate-x-1/2 -translate-y-1/2 bg-white/25 w-96 h-96 rounded-full blur-2xl pointer-events-none" />
            </motion.div>

          </div>

        </div>
      </div>
    </motion.section>
  );
});
