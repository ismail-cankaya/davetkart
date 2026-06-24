import React from 'react';
import { motion } from 'motion/react';
import { Sparkles, Check, ArrowRight, Flame } from 'lucide-react';
import { Invitation } from '../../types';
import { INITIAL_INVITATION } from '../../data';

interface DesignerPanelProps {
  invitation: Invitation;
  handleInputChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
  setInvitation: React.Dispatch<React.SetStateAction<Invitation>>;
  setActivePresetId: React.Dispatch<React.SetStateAction<string>>;
}

export function DesignerPanel({
  invitation,
  handleInputChange,
  setInvitation,
  setActivePresetId
}: DesignerPanelProps) {
  return (
    <motion.section
      id="tasarimci"
      className="py-12 md:py-20 bg-emerald-950 text-white relative"
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "0px" }}
      transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
    >
      <div className="max-w-7xl mx-auto px-4 md:px-12">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          
          {/* Designer Setup Panel Form - Left Column */}
          <div className="lg:col-span-7 space-y-8">
            <div>
              <div className="bg-[#efe2c1] text-[#211b07] px-3.5 py-1 rounded-full text-[11px] font-semibold tracking-wide w-fit flex items-center gap-1 shadow-sm mb-4">
                <Sparkles size={12} />
                <span>Özelleştirilebilir Alanlar</span>
              </div>
              <h2 className="font-serif text-3xl font-bold italic text-amber-100">
                Kendi E-Davetiyeni Tasarla
              </h2>
              <p className="text-stone-300 text-sm mt-2 max-w-xl">
                Aşağıdaki bilgileri düzenleyerek davetiyenizi anında kişiselleştirebilirsiniz. Yukarıdaki telefon simülatöründe ve canlı katılım panelinde sonuçları gerçek zamanlı gözlemleyin.
              </p>
            </div>

            <div className="bg-white/10 backdrop-blur-md p-6 md:p-8 rounded-2xl border border-white/15 space-y-6">
              
              {/* Form entries */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                
                {/* Event Names / Couple Names */}
                <div className="space-y-2">
                  <label className="block text-xs font-bold tracking-wider uppercase text-amber-200">
                    Davet Sahipleri / İsimler
                  </label>
                  <input
                    type="text"
                    name="names"
                    value={invitation.names}
                    onChange={handleInputChange}
                    placeholder="Örn. Sophia &amp; Elias"
                    className="w-full bg-white/5 border border-white/15 focus:border-amber-300 focus:outline-none rounded-xl px-4 py-3 text-sm text-white transition-colors"
                  />
                </div>

                {/* Entry Badge / Title */}
                <div className="space-y-2">
                  <label className="block text-xs font-bold tracking-wider uppercase text-amber-200">
                    Üst Başlık (Slogan)
                  </label>
                  <input
                    type="text"
                    name="title"
                    value={invitation.title}
                    onChange={handleInputChange}
                    placeholder="Örn. HAYATIMIZIN EN ÖZEL GÜNÜ"
                    className="w-full bg-white/5 border border-white/15 focus:border-amber-300 focus:outline-none rounded-xl px-4 py-3 text-sm text-white transition-colors"
                  />
                </div>

                {/* Event Date Picker */}
                <div className="space-y-2">
                  <label className="block text-xs font-bold tracking-wider uppercase text-amber-200">
                    Etkinlik Tarihi &amp; Saati
                  </label>
                  <input
                    type="datetime-local"
                    name="date"
                    value={invitation.date}
                    onChange={handleInputChange}
                    className="w-full bg-white/5 border border-white/15 focus:border-amber-300 focus:outline-none rounded-xl px-4 py-3 text-sm text-white transition-colors [color-scheme:dark]"
                  />
                </div>

                {/* Event Location */}
                <div className="space-y-2">
                  <label className="block text-xs font-bold tracking-wider uppercase text-amber-200">
                    Etkinlik Mekanı / Adres
                  </label>
                  <input
                    type="text"
                    name="venue"
                    value={invitation.venue}
                    onChange={handleInputChange}
                    placeholder="Örn. Çırağan Sarayı, Beşiktaş"
                    className="w-full bg-white/5 border border-white/15 focus:border-amber-300 focus:outline-none rounded-xl px-4 py-3 text-sm text-white transition-colors"
                  />
                </div>

              </div>

              {/* Message subtitle */}
              <div className="space-y-2">
                <label className="block text-xs font-bold tracking-wider uppercase text-amber-200">
                  Davet Mesajı (Açıklama / Şiir)
                </label>
                <textarea
                  name="subtitle"
                  rows={3}
                  value={invitation.subtitle}
                  onChange={handleInputChange}
                  placeholder="Örn. Sizleri de bu mutlu günümüzde aramızda görmekten onur duyarız..."
                  className="w-full bg-white/5 border border-white/15 focus:border-amber-300 focus:outline-none rounded-xl px-4 py-3 text-sm text-white transition-colors resize-none"
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
                  className="text-stone-300 hover:text-white text-xs underline cursor-pointer"
                >
                  Bütün Formu Sıfırla
                </button>

                <button
                  type="button"
                  onClick={(e) => {
                    e.preventDefault();
                    document.getElementById('animasyon-ve-onizleme')?.scrollIntoView({ behavior: 'smooth' });
                  }}
                  className="bg-amber-400 hover:bg-amber-500 text-slate-950 font-bold px-5 py-2.5 rounded-xl text-xs flex items-center gap-2 shadow-md cursor-pointer transition-colors"
                >
                  Önizleme
                </button>
              </div>

            </div>
          </div>

          {/* Info & Simulated Device Guide - Right Column */}
          <div className="lg:col-span-5 space-y-6">
            
            <div className="bg-white/5 p-6 rounded-2xl border border-white/10 space-y-4">
              <h3 className="font-serif text-lg font-bold text-amber-200 flex items-center gap-2 border-b border-white/10 pb-3">
                <Sparkles className="text-amber-300 w-4 h-4" />
                Premium Dijital Özellikler
              </h3>

              <div className="space-y-3 text-xs text-stone-300">
                <p>
                  Oluşturulan premium dijital davetiyeler, geleneksel kağıt baskının sunamadığı gelişmiş interaktif özelliklerle birlikte gelir:
                </p>
                <ul className="space-y-2 list-none pl-1">
                  <li className="flex items-start gap-2">
                    <Check size={14} className="text-amber-300 shrink-0 mt-0.5" />
                    <span><strong>Akıllı Harita Navigasyonu</strong>: Misafirler davetiyeden tek tuşla konuma yol tarifi alabilir.</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <Check size={14} className="text-amber-300 shrink-0 mt-0.5" />
                    <span><strong>Takvime Ekle (iCal/Google)</strong>: Unutulmamasını sağlamak amacıyla tek tuşla ajandaya işlenebilir.</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <Check size={14} className="text-amber-300 shrink-0 mt-0.5" />
                    <span><strong>Ses &amp; Arka Plan Müziği</strong>: Misafirleriniz davetiyeyi açtığında seçtiğiniz enstrümantal hoş bir müzik karşılar.</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <Check size={14} className="text-amber-300 shrink-0 mt-0.5" />
                    <span><strong>Doğa Dostu</strong>: Kağıt israfına, kargo ve zarf karmaşasına son verir!</span>
                  </li>
                </ul>
              </div>
            </div>

            <div className="bg-gradient-to-r from-amber-500 to-orange-500 p-6 rounded-2xl text-slate-950 shadow-lg relative overflow-hidden">
              <div className="relative z-10">
                <div className="flex items-center gap-2 mb-2 bg-white/20 w-fit px-2.5 py-0.5 rounded-full text-[10px] font-bold">
                  <Flame size={12} /> Sınırlı Süre Promosyonu
                </div>
                <h4 className="font-serif text-xl font-bold">İlk Davetiyeniz %60 İndirimli!</h4>
                <p className="text-xs font-medium mt-1 text-slate-900 leading-relaxed">
                  Sitemize şimdi üye olarak ilk dijital davetiyenizi büyük bir indirimle oluşturabilir ve ilk 102 misafirinize tamamen ücretsiz katılım takibi yapabilirsiniz.
                </p>
                <a
                  href="#tasarimci"
                  className="mt-4 inline-flex items-center gap-1 bg-slate-950 text-white font-bold text-xs px-4 py-2 rounded-lg hover:bg-slate-900 transition-colors"
                >
                  <span>Hemen Başla</span>
                  <ArrowRight size={12} />
                </a>
              </div>
              {/* Glowing graphic element */}
              <div className="absolute top-1/2 right-1/2 translate-x-1/2 -translate-y-1/2 bg-white/10 w-96 h-96 rounded-full blur-2xl pointer-events-none" />
            </div>

          </div>

        </div>
      </div>
    </motion.section>
  );
}
