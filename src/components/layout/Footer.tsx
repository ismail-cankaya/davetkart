import React from 'react';
import { Heart } from 'lucide-react';

export const Footer = React.memo(function Footer() {
  return (
    <footer className="bg-stone-900 border-t border-white/5 text-white/90">
      <div className="max-w-7xl mx-auto px-4 md:px-12 py-16 grid grid-cols-1 md:grid-cols-12 gap-12">

        <div className="md:col-span-4 space-y-4">
          <span className="font-serif text-2xl font-bold text-white tracking-tight flex items-center gap-2">
            <Heart className="text-amber-400 fill-amber-400/20" />
            E-Dijital Davetiye
          </span>
          <p className="text-stone-400 text-xs leading-relaxed">
            Özel anlarınız için özenle tasarlanmış, doğa dostu, pratik ve lüks dijital davetiyeler. Hayatınızın en mutlu gününü sevdiklerinizle lüks zarafetle paylaşın.
          </p>
        </div>

        <div className="md:col-span-2 space-y-3">
          <h4 className="text-xs uppercase font-bold text-amber-300 tracking-[0.1em]">Koleksiyonlar</h4>
          <ul className="space-y-2 text-xs text-stone-400">
            <li><a href="#koleksiyonlar" className="hover:text-white transition-colors">Düğün &amp; Nikah</a></li>
            <li><a href="#koleksiyonlar" className="hover:text-white transition-colors">Sünnet Düğünü</a></li>
            <li><a href="#koleksiyonlar" className="hover:text-white transition-colors">Baby Shower</a></li>
            <li><a href="#koleksiyonlar" className="hover:text-white transition-colors">Doğum Günü</a></li>
            <li><a href="#koleksiyonlar" className="hover:text-white transition-colors">Kurumsal Gala</a></li>
          </ul>
        </div>

        <div className="md:col-span-2 space-y-3">
          <h4 className="text-xs uppercase font-bold text-amber-300 tracking-[0.1em]">Kurumsal</h4>
          <ul className="space-y-2 text-xs text-stone-400">
            <li><a href="#" className="hover:text-white transition-colors">Hakkımızda</a></li>
            <li><a href="#" className="hover:text-white transition-colors">Özellikler</a></li>
            <li><a href="#" className="hover:text-white transition-colors">Fiyatlandırma</a></li>
            <li><a href="#" className="hover:text-white transition-colors">Sürdürülebilirlik</a></li>
            <li><a href="#" className="hover:text-white transition-colors">İletişim</a></li>
          </ul>
        </div>

        <div className="md:col-span-4 space-y-4">
          <h4 className="text-xs uppercase font-bold text-amber-300 tracking-[0.1em]">Haber Bülteni</h4>
          <p className="text-stone-400 text-xs leading-relaxed">
            Kampanyalardan, yeni lüks şablon tasarımlarından ve davetiye tüyolarından ilk siz haberdar olun.
          </p>
          <div className="flex gap-2">
            <input
              type="email"
              placeholder="E-posta adresiniz"
              className="bg-white/5 border border-white/10 rounded-lg px-3 py-2 text-xs text-white focus:outline-none focus:border-amber-300 flex-grow"
            />
            <button
              onClick={() => alert('Bültene başarıyla kayıt oldunuz! Teşekkür ederiz.')}
              className="bg-white text-slate-900 border-none px-4 py-2 rounded-lg text-xs font-bold hover:bg-amber-300 hover:text-slate-950 transition-all cursor-pointer"
            >
              Kayıt Ol
            </button>
          </div>
        </div>

      </div>

      {/* Legal Credits */}
      <div className="border-t border-white/5 bg-black/30 py-6 text-center text-stone-500 text-xs">
        <div className="max-w-7xl mx-auto px-4 flex flex-col sm:flex-row justify-between items-center gap-4">
          <p>© 2026 E-Dijital Davetiye. Tüm hakları saklıdır.</p>
          <div className="flex gap-6">
            <a href="#" className="hover:text-gray-300 transition-colors">Kullanım Şartları</a>
            <a href="#" className="hover:text-gray-300 transition-colors">Gizlilik Sözleşmesi</a>
            <a href="#" className="hover:text-gray-300 transition-colors">Çerez Politikası</a>
          </div>
        </div>
      </div>
    </footer>
  );
});
