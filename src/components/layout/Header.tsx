import React, { useState } from 'react';
import { motion, AnimatePresence, useScroll, useMotionValueEvent } from 'motion/react';
import { Menu, X } from 'lucide-react';
import { BrandMark } from '../ui/BrandMark';

const NAV_LINKS = [
  { href: '#animasyon-ve-onizleme', label: 'Önizleme' },
  { href: '#koleksiyonlar', label: 'Kategoriler' },
  { href: '#tasarimci', label: 'Davetiye Tasarla' },
  { href: '#neden-dijital', label: 'Özellikler' },
  { href: '#lcv-paneli', label: 'Canlı Katılım Paneli' }
];

const menuVariants = {
  hidden: { opacity: 0, height: 0 },
  visible: {
    opacity: 1,
    height: 'auto' as const,
    transition: { duration: 0.4, ease: [0.22, 1, 0.36, 1] as const, staggerChildren: 0.05, delayChildren: 0.1 }
  },
  exit: { opacity: 0, height: 0, transition: { duration: 0.3, ease: [0.22, 1, 0.36, 1] as const } }
};

const menuItemVariants = {
  hidden: { opacity: 0, x: -12 },
  visible: { opacity: 1, x: 0, transition: { duration: 0.35, ease: [0.22, 1, 0.36, 1] as const } },
  exit: { opacity: 0 }
};

export const Header = React.memo(function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const { scrollY } = useScroll();

  useMotionValueEvent(scrollY, 'change', (latest) => {
    setScrolled(latest > 12);
  });

  return (
    <motion.header
      initial={{ y: -80, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
      className={`sticky top-0 z-50 transition-all duration-500 ${
        scrolled || mobileMenuOpen
          ? 'bg-white/85 backdrop-blur-xl border-b border-ink/5 shadow-[0_1px_20px_rgba(20,32,27,0.06)]'
          : 'bg-transparent border-b border-transparent'
      }`}
    >
      <div className="flex justify-between items-center w-full px-4 md:px-12 py-4 max-w-7xl mx-auto">
        {/* Brand */}
        <a className="flex items-center gap-2.5 group" href="#">
          <span className="relative flex items-center justify-center w-9 h-9 rounded-xl bg-brand text-champagne shadow-md shadow-brand/20 group-hover:shadow-lg group-hover:shadow-brand/30 group-hover:-translate-y-0.5 transition-all duration-500">
            <BrandMark size={19} />
          </span>
          <span className="font-serif text-lg md:text-xl font-bold text-brand tracking-tight">
            Davet<span className="italic font-medium text-gold">Kart</span>
          </span>
        </a>

        {/* Navigation Links (Desktop) */}
        <nav className="hidden md:flex items-center gap-7">
          {NAV_LINKS.map(link => (
            <a
              key={link.href}
              href={link.href}
              className="relative text-muted hover:text-brand transition-colors duration-300 font-medium text-sm group py-1"
            >
              {link.label}
              <span className="absolute left-0 -bottom-0.5 w-full h-px bg-gold origin-right scale-x-0 group-hover:origin-left group-hover:scale-x-100 transition-transform duration-500 ease-[cubic-bezier(0.22,1,0.36,1)]" />
            </a>
          ))}
        </nav>

        {/* Actions */}
        <div className="flex items-center gap-3">
          <a
            href="#tasarimci"
            className="hidden md:block text-muted hover:text-brand font-semibold text-sm transition-colors duration-300 py-2 px-4"
          >
            Giriş Yap
          </a>
          <a
            href="#tasarimci"
            className="relative overflow-hidden bg-brand text-white px-5 py-2.5 rounded-full font-semibold text-sm hover:bg-brand-soft transition-all duration-500 shadow-md shadow-brand/15 hover:shadow-lg hover:shadow-brand/25 hover:-translate-y-0.5"
          >
            <span className="absolute inset-0 animate-shimmer pointer-events-none" />
            Kayıt Ol
          </a>
          {/* Mobile Menu Toggle */}
          <button
            onClick={() => setMobileMenuOpen(prev => !prev)}
            className="md:hidden text-brand p-1 h-9 w-9 rounded-full hover:bg-brand/5 flex items-center justify-center transition-colors"
            aria-label="Menü"
          >
            <AnimatePresence mode="wait" initial={false}>
              <motion.span
                key={mobileMenuOpen ? 'close' : 'open'}
                initial={{ opacity: 0, rotate: -45, scale: 0.8 }}
                animate={{ opacity: 1, rotate: 0, scale: 1 }}
                exit={{ opacity: 0, rotate: 45, scale: 0.8 }}
                transition={{ duration: 0.25 }}
                className="flex"
              >
                {mobileMenuOpen ? <X size={22} /> : <Menu size={22} />}
              </motion.span>
            </AnimatePresence>
          </button>
        </div>
      </div>

      {/* Mobile Navigation Menu */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            variants={menuVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
            className="md:hidden border-t border-ink/5 bg-white/95 backdrop-blur-xl overflow-hidden"
          >
            <div className="flex flex-col p-6 gap-1">
              {NAV_LINKS.map(link => (
                <motion.a
                  key={link.href}
                  variants={menuItemVariants}
                  onClick={() => setMobileMenuOpen(false)}
                  className="text-muted hover:text-brand hover:bg-brand/[0.03] font-medium text-base py-3 px-3 rounded-xl border-b border-ink/5 last:border-b-0 transition-colors"
                  href={link.href}
                >
                  {link.label}
                </motion.a>
              ))}

              <motion.div variants={menuItemVariants} className="flex gap-3 mt-4">
                <a
                  onClick={() => setMobileMenuOpen(false)}
                  className="flex-1 bg-ink/5 text-center text-ink py-3 rounded-full font-semibold text-sm hover:bg-ink/10 transition-colors"
                  href="#tasarimci"
                >
                  Giriş Yap
                </a>
                <a
                  onClick={() => setMobileMenuOpen(false)}
                  className="flex-1 bg-brand text-white text-center py-3 rounded-full font-semibold text-sm shadow-md shadow-brand/20"
                  href="#tasarimci"
                >
                  Kayıt Ol
                </a>
              </motion.div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  );
});
