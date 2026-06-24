import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Heart, Menu, X } from 'lucide-react';

export const Header = React.memo(function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <header className="bg-white/80 backdrop-blur-md sticky top-0 z-50 border-b border-[#0b1c30]/5 transition-all duration-300">
      <div className="flex justify-between items-center w-full px-4 md:px-12 py-4 max-w-7xl mx-auto">
        {/* Brand */}
        <a className="flex items-center gap-2 group" href="#">
          <Heart className="text-[#003527] w-8 h-8 group-hover:scale-110 transition-transform duration-300 fill-[#003527]/10" />
          <span className="font-serif text-xl md:text-2xl font-bold text-[#003527] tracking-tight">E-Dijital Davetiye</span>
        </a>

        {/* Navigation Links (Desktop) */}
        <nav className="hidden md:flex items-center gap-8">
          <a className="text-[#515f74] hover:text-[#003527] transition-colors font-medium text-sm" href="#animasyon-ve-onizleme">Önizleme</a>
          <a className="text-[#515f74] hover:text-[#003527] transition-colors font-medium text-sm" href="#koleksiyonlar">Kategoriler</a>
          <a className="text-[#515f74] hover:text-[#003527] transition-colors font-medium text-sm" href="#tasarimci">Davetiye Tasarla</a>
          <a className="text-[#515f74] hover:text-[#003527] transition-colors font-medium text-sm" href="#neden-dijital">Özellikler</a>
          <a className="text-[#515f74] hover:text-[#003527] transition-colors font-medium text-sm" href="#lcv-paneli">Canlı Katılım Paneli</a>
        </nav>

        {/* Actions */}
        <div className="flex items-center gap-3">
          <a
            href="#tasarimci"
            className="hidden md:block text-[#515f74] hover:text-[#003527] font-semibold text-sm transition-colors py-2 px-4"
          >
            Giriş Yap
          </a>
          <a
            href="#tasarimci"
            className="bg-[#003527] text-white px-5 py-2.5 rounded-full font-semibold text-sm hover:bg-[#064e3b] transition-all duration-300 shadow-md hover:shadow-lg"
          >
            Kayıt Ol
          </a>
          {/* Mobile Menu Toggle */}
          <button
            onClick={() => setMobileMenuOpen(prev => !prev)}
            className="md:hidden text-[#003527] p-1 h-9 w-9 rounded-full hover:bg-[#003527]/5 flex items-center justify-center transition-colors"
            aria-label="Menü"
          >
            {mobileMenuOpen ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>
      </div>

      {/* Mobile Navigation Menu */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden border-t border-[#0b1c30]/5 bg-white/95 backdrop-blur-md overflow-hidden"
          >
            <div className="flex flex-col p-6 gap-4">
              <a
                onClick={() => setMobileMenuOpen(false)}
                className="text-[#515f74] hover:text-[#003527] font-medium text-base py-1 border-b border-[#0b1c30]/5"
                href="#animasyon-ve-onizleme"
              >
                Önizleme
              </a>
              <a
                onClick={() => setMobileMenuOpen(false)}
                className="text-[#515f74] hover:text-[#003527] font-medium text-base py-1 border-b border-[#0b1c30]/5"
                href="#koleksiyonlar"
              >
                Kategoriler
              </a>
              <a
                onClick={() => setMobileMenuOpen(false)}
                className="text-[#515f74] hover:text-[#003527] font-medium text-base py-1 border-b border-[#0b1c30]/5"
                href="#tasarimci"
              >
                Davetiye Tasarla
              </a>
              <a
                onClick={() => setMobileMenuOpen(false)}
                className="text-[#515f74] hover:text-[#003527] font-medium text-base py-1 border-b border-[#0b1c30]/5"
                href="#neden-dijital"
              >
                Özellikler
              </a>
              <a
                onClick={() => setMobileMenuOpen(false)}
                className="text-[#515f74] hover:text-[#003527] font-medium text-base py-1"
                href="#lcv-paneli"
              >
                Canlı Katılım Paneli
              </a>

              <div className="flex gap-4 mt-2">
                <a
                  onClick={() => setMobileMenuOpen(false)}
                  className="flex-1 bg-gray-100 text-center text-gray-700 py-2.5 rounded-full font-semibold text-sm"
                  href="#tasarimci"
                >
                  Giriş Yap
                </a>
                <a
                  onClick={() => setMobileMenuOpen(false)}
                  className="flex-1 bg-[#003527] text-white text-center py-2.5 rounded-full font-semibold text-sm shadow"
                  href="#tasarimci"
                >
                  Kayıt Ol
                </a>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
});
