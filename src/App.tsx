import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence, useScroll, useTransform, useSpring, useInView } from 'motion/react';
import {
  Heart,
  Menu,
  X,
  Sparkles,
  ArrowRight,
  Check,
  Clock,
  MapPin,
  Calendar,
  ChevronRight,
  Smartphone,
  Laptop,
  Maximize2,
  Minimize2,
  Plus,
  Users,
  Utensils,
  ExternalLink,
  Flame,
  UserCheck,
  Send,
  Trash2,
  RefreshCw
} from 'lucide-react';
import { Invitation, RSVPResponse } from './types';
import { TEMPLATE_PRESETS, INITIAL_INVITATION, INITIAL_RSVP_LIST } from './data';

export default function App() {
  // Load initial states from localStorage if available
  const [invitation, setInvitation] = useState<Invitation>(() => {
    const saved = localStorage.getItem('e_davetiye_invitation');
    return saved ? JSON.parse(saved) : INITIAL_INVITATION;
  });

  const [rsvpList, setRsvpList] = useState<RSVPResponse[]>(() => {
    const saved = localStorage.getItem('e_davetiye_rsvps');
    return saved ? JSON.parse(saved) : INITIAL_RSVP_LIST;
  });

  const [activePresetId, setActivePresetId] = useState<string>(invitation.imageTheme || 'emerald');
  const [isRsvpModalOpen, setIsRsvpModalOpen] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  // New RSVP Form State
  const [newRsvp, setNewRsvp] = useState({
    guestName: '',
    guestCount: 2,
    menuPreference: 'Et Menü',
    status: 'Katılıyor' as 'Katılıyor' | 'Bekleniyor' | 'Katılamıyor'
  });

  // Save state on change
  useEffect(() => {
    localStorage.setItem('e_davetiye_invitation', JSON.stringify(invitation));
  }, [invitation]);

  useEffect(() => {
    localStorage.setItem('e_davetiye_rsvps', JSON.stringify(rsvpList));
  }, [rsvpList]);

  const activePreset = TEMPLATE_PRESETS.find(p => p.id === activePresetId) || TEMPLATE_PRESETS[0];

  // Mobile detection
  const [isMobile, setIsMobile] = useState(false);
  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 1024);
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  // Ref for scrolling to phone on mobile
  const phoneRef = useRef<HTMLDivElement>(null);

  const handleTemplateChange = (id: string) => {
    setActivePresetId(id);
    setInvitation(prev => ({ ...prev, imageTheme: id, phoneBackground: id }));
    // On mobile, scroll to the phone preview after selecting a template
    if (isMobile && phoneRef.current) {
      phoneRef.current.scrollIntoView({ behavior: 'smooth', block: 'center' });
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setInvitation(prev => ({ ...prev, [name]: value }));
  };

  const handleAddRsvp = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newRsvp.guestName.trim()) return;

    const entry: RSVPResponse = {
      id: `rsvp-${Date.now()}`,
      guestName: newRsvp.guestName,
      guestCount: Number(newRsvp.guestCount),
      menuPreference: newRsvp.menuPreference,
      status: newRsvp.status,
      createdAt: new Date().toISOString()
    };

    setRsvpList(prev => [entry, ...prev]);
    setNewRsvp({ guestName: '', guestCount: 2, menuPreference: 'Et Menü', status: 'Katılıyor' });
    setIsRsvpModalOpen(false);

    // Visual notification/alert
    alert(`Teşekkürler, ${entry.guestName}! Katılım bildiriminiz başarıyla kaydedildi ve katılım paneline eklendi.`);
  };

  const handleDeleteRsvp = (id: string) => {
    if (window.confirm('Bu katılım kaydını silmek istediğinize emin misiniz?')) {
      setRsvpList(prev => prev.filter(r => r.id !== id));
    }
  };

  const handleResetRsvps = () => {
    if (window.confirm('Katılım listesini orijinal durumuna sıfırlamak istiyor musunuz?')) {
      setRsvpList(INITIAL_RSVP_LIST);
    }
  };

  // Stats Counters
  const countAttending = rsvpList
    .filter(r => r.status === 'Katılıyor')
    .reduce((total, cur) => total + cur.guestCount, 0);

  const countPending = rsvpList
    .filter(r => r.status === 'Bekleniyor')
    .reduce((total, cur) => total + cur.guestCount, 0);

  const countDeclines = rsvpList
    .filter(r => r.status === 'Katılamıyor').length;

  // Format Date for preview
  const formatDateStr = (isoString: string) => {
    if (!isoString) return '';
    try {
      const date = new Date(isoString);
      return date.toLocaleDateString('tr-TR', {
        weekday: 'long',
        year: 'numeric',
        month: 'long',
        day: 'numeric',
        hour: '2-digit',
        minute: '2-digit'
      });
    } catch (e) {
      return isoString;
    }
  };

  // Scroll-jack effect: from Hero to Categories directly
  useEffect(() => {
    let isScrolling = false;
    let lastScrollY = window.scrollY;

    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      const isScrollingDown = currentScrollY > lastScrollY;
      lastScrollY = currentScrollY;

      if (isScrolling) return;

      // If near the top and scrolling down, snap to Categories
      // Disabled on mobile (innerWidth < 768) so users can scroll down naturally to see the usage statistics
      if (window.innerWidth >= 768 && isScrollingDown && currentScrollY > 10 && currentScrollY < window.innerHeight * 0.3) {
        isScrolling = true;
        const target = document.getElementById('animasyon-ve-onizleme');
        if (target) {
          target.scrollIntoView({ behavior: 'smooth' });
        }
        setTimeout(() => { isScrolling = false; }, 800); // Cooldown
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Standard section refs
  const featuresRef = useRef<HTMLDivElement>(null);

  return (
    <div className="min-h-screen bg-[#f8f9ff] text-[#0b1c30] flex flex-col font-sans selection:bg-[#064e3b] selection:text-white">

      {/* TopNavBar */}
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

      <main className="flex-grow">

        {/* Hero Section */}
        <section className="relative min-h-[100dvh] pt-20 pb-20 overflow-hidden bg-gradient-to-b from-[#f8f9ff] via-white to-[#f8f9ff] flex flex-col justify-center bg-grain">
          <div
            className="max-w-7xl mx-auto px-4 md:px-12 relative z-10 flex flex-col items-center text-center w-full"
          >

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

        {/* Device Preview Section */}
        <section
          id="animasyon-ve-onizleme"
          className="py-12 md:py-20 bg-[#f8f9ff] relative overflow-hidden"
        >
          <div className="max-w-7xl mx-auto px-4 md:px-12">

            {/* Mobile-only section header */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
              className="lg:hidden text-center mb-8"
            >
              <span className="text-[#003527] font-semibold text-xs tracking-wider uppercase bg-[#003527]/5 px-3 py-1 rounded-full inline-block">
                Canlı Önizleme
              </span>
              <h2 className="font-serif text-2xl font-bold text-[#0b1c30] mt-3 mb-2">
                Davetiyenizi <span className="italic text-[#003527] font-medium">Görüntüleyin</span>
              </h2>
              <p className="text-[#515f74] text-sm max-w-sm mx-auto">
                Aşağıdan bir kategori seçerek önizlemeyi canlı olarak güncelleyebilirsiniz.
              </p>
            </motion.div>

            <div className="flex flex-col-reverse lg:flex-row gap-8 lg:gap-16 items-center lg:items-start justify-center">

              {/* Left Column (on desktop) / Bottom Column (mobile): Koleksiyonlar */}
              <motion.div
                className="w-full lg:w-1/2 flex flex-col justify-center space-y-4 lg:space-y-6 pt-4"
                initial={{ opacity: 0, x: -60 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, margin: "-20px" }}
                transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
              >
                <div className="mb-4 text-center lg:text-left hidden lg:block">
                  <motion.span
                    initial={{ opacity: 0, y: 10 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
                    className="text-[#003527] font-semibold text-xs tracking-wider uppercase bg-[#003527]/5 px-3 py-1 rounded-full inline-block"
                  >
                    Eşsiz Koleksiyonlar
                  </motion.span>
                  <motion.h2
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1], delay: 0.1 }}
                    className="font-serif text-3xl md:text-4xl font-bold text-[#0b1c30] mt-4 mb-3"
                  >
                    Her Etkinliğe Özel <br className="hidden lg:block" />
                    <span className="italic text-[#003527] font-medium font-serif">Koleksiyonlar</span>
                  </motion.h2>
                  <motion.p
                    initial={{ opacity: 0, y: 15 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1], delay: 0.2 }}
                    className="text-[#515f74] text-sm md:text-base max-w-md mx-auto lg:mx-0"
                  >
                    Hayalinizdeki konsepti yansıtan tasarımınızı seçin ve sağdaki canlı cihaz önizlemesinden anında görüntüleyin.
                  </motion.p>
                </div>

                {/* Category Grid - horizontal scroll on mobile, 2x2 grid on desktop */}
                <div className="grid grid-cols-2 sm:grid-cols-2 gap-3 lg:gap-4" id="koleksiyonlar">
                  {TEMPLATE_PRESETS.map((pst, idx) => (
                    <motion.div
                      key={pst.id}
                      initial={{ opacity: 0, y: 30, scale: 0.95 }}
                      whileInView={{ opacity: 1, y: 0, scale: 1 }}
                      viewport={{ once: true, margin: "0px" }}
                      transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1], delay: idx * 0.08 }}
                      whileHover={{ scale: 1.03, y: -4 }}
                      whileTap={{ scale: 0.97 }}
                      onClick={() => handleTemplateChange(pst.id)}
                      className={`group relative rounded-2xl overflow-hidden shadow-sm hover:shadow-2xl transition-shadow duration-700 h-36 lg:h-48 cursor-pointer border-2 ${activePresetId === pst.id ? 'border-[#003527] shadow-lg' : 'border-transparent'
                        }`}
                    >
                      <img
                        className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-1000 ease-out filter brightness-90 md:brightness-[0.8]"
                        src={pst.imageUrl}
                        alt={pst.name}
                      />

                      <AnimatePresence>
                        {activePresetId === pst.id && (
                          <motion.div
                            initial={{ opacity: 0, scale: 0.5 }}
                            animate={{ opacity: 1, scale: 1 }}
                            exit={{ opacity: 0, scale: 0.5 }}
                            transition={{ type: "spring", stiffness: 400, damping: 25 }}
                            className="absolute top-3 right-3 bg-[#003527] text-white text-[10px] font-semibold px-2.5 py-1 rounded-full flex items-center gap-1 shadow-md z-10"
                          >
                            <Check size={10} /> Seçili
                          </motion.div>
                        )}
                      </AnimatePresence>

                      <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent flex flex-col justify-end p-5">
                        <span className={`w-3 h-3 rounded-full ${pst.backgroundStyle} border border-white/30 mb-2 shadow-sm`} />
                        <h3 className="font-serif text-lg text-white font-bold leading-tight">
                          {pst.name.split(' (')[0]}
                        </h3>
                      </div>
                    </motion.div>
                  ))}
                </div>

                {/* Quick Info Box - hidden on mobile */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1], delay: 0.5 }}
                  className="bg-[#efe2c1]/30 p-4 rounded-2xl border border-[#efe2c1] hidden lg:flex items-start gap-4 mt-4 hover:bg-[#efe2c1]/50 transition-colors duration-500"
                >
                  <div className="p-2 rounded-xl bg-white text-[#003527] shadow-sm mt-0.5">
                    <Heart size={16} className="fill-[#003527]/10" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-xs text-[#211b07] uppercase tracking-wider">Metinleri Düzenleyin</h4>
                    <p className="text-xs text-[#515f74] mt-1">
                      Aşağıdaki <strong>"Davetiye Tasarımcısı"</strong> bölümünden davetiye içeriklerini dilediğiniz gibi güncelleyebilirsiniz.
                    </p>
                  </div>
                </motion.div>
              </motion.div>

              {/* Right Column (desktop) / Bottom Column (mobile): Phone Device Preview */}
              <div
                ref={phoneRef}
                className="w-full lg:w-1/2 flex flex-col items-center justify-center min-h-[400px] lg:min-h-[550px] perspective-container"
              >

                {/* Device Frame Animation */}
                <motion.div
                  initial={isMobile ? { opacity: 0, y: 30, scale: 0.95 } : { opacity: 0, y: 60, scale: 0.7, rotateX: 15 }}
                  whileInView={{ opacity: 1, y: 0, scale: 1, rotateX: 0 }}
                  viewport={{ once: true, margin: "0px" }}
                  transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
                  className="relative will-change-transform"
                >
                  {/* Ambient glow behind device - lighter on mobile */}
                  <div className="absolute -inset-4 md:-inset-8 bg-gradient-to-b from-emerald-200/20 via-amber-100/15 to-emerald-200/10 rounded-[60px] blur-xl md:blur-2xl pointer-events-none" />

                  {/* Actual Device Frame - smaller on mobile */}
                  <motion.div
                    layout
                    className="relative p-2.5 lg:p-3.5 bg-slate-900 shadow-2xl overflow-hidden border-[3px] lg:border-4 border-slate-800 w-[280px] h-[540px] lg:w-[335px] lg:h-[650px] rounded-[36px] lg:rounded-[42px] device-glow"
                  >
                    {/* Speaker and Camera Notch for Mobile Frame */}
                    <div className="absolute top-0 left-1/2 -translate-x-1/2 w-32 h-6 bg-slate-900 rounded-b-2xl z-40 flex items-center justify-center">
                      <div className="w-12 h-1 bg-slate-800 rounded-full" />
                      <div className="w-2.5 h-2.5 bg-slate-800 rounded-full ml-2" />
                    </div>

                    {/* High Quality Screen Area */}
                    <div className="w-full h-full rounded-[24px] md:rounded-[20px] overflow-hidden relative bg-emerald-950 flex flex-col">

                      {/* Background preset image layer */}
                      <AnimatePresence mode="popLayout">
                        <motion.img
                          key={activePresetId}
                          initial={{ opacity: 0, scale: 1.05 }}
                          animate={{ opacity: 1, scale: 1 }}
                          exit={{ opacity: 0, scale: 0.95 }}
                          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
                          src={activePreset.imageUrl}
                          alt="Zarif Premium Dijital Davetiye Tasarımı"
                          className="absolute inset-0 w-full h-full object-cover select-none pointer-events-none filter brightness-90 md:brightness-[0.8]"
                        />
                      </AnimatePresence>

                      {/* Semi-transparent Gold luxury card overlay inside screen */}
                      <div className="relative z-10 w-full h-full flex flex-col justify-between p-6">

                        {/* Live Date Watermark Badge on Top */}
                        <div className="self-center mt-6">
                          <motion.span
                            initial={{ opacity: 0, y: -10 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.3, duration: 0.8 }}
                            className="backdrop-blur-md bg-white/10 text-white/95 border border-white/20 text-[10px] tracking-[0.2em] font-medium font-sans px-3 py-1 rounded-full uppercase"
                          >
                            DAVETLİSİNİZ
                          </motion.span>
                        </div>

                        {/* Main Invitation Texts Overlay */}
                        <div className="flex flex-col text-center my-auto px-1 space-y-4">

                          <div className="w-8 h-[1px] bg-amber-200/50 mx-auto" />

                          {/* Invitation Short Title */}
                          <AnimatePresence mode="wait">
                            <motion.p
                              key={invitation.title}
                              initial={{ opacity: 0, y: 8 }}
                              animate={{ opacity: 1, y: 0 }}
                              exit={{ opacity: 0, y: -8 }}
                              transition={{ duration: 0.5 }}
                              className="text-[11px] font-sans font-semibold tracking-[0.15em] text-amber-200/95 uppercase drop-shadow-sm leading-tight"
                            >
                              {invitation.title || 'HAYATIMIZIN EN ÖZEL GÜNÜ'}
                            </motion.p>
                          </AnimatePresence>

                          {/* Beautiful Script Couple Names */}
                          <AnimatePresence mode="wait">
                            <motion.h2
                              key={invitation.names}
                              initial={{ opacity: 0, scale: 0.95 }}
                              animate={{ opacity: 1, scale: 1 }}
                              exit={{ opacity: 0, scale: 1.05 }}
                              transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
                              className="font-serif text-3xl md:text-4xl lg:text-5xl font-normal text-amber-100 italic tracking-wide leading-tight px-2 py-1 drop-shadow-md"
                            >
                              {invitation.names || 'Sophia & Elias'}
                            </motion.h2>
                          </AnimatePresence>

                          <div className="flex items-center justify-center gap-2">
                            <div className="w-6 h-[0.5px] bg-amber-200/30" />
                            <span className="text-white/90 text-xs tracking-wider">&amp;</span>
                            <div className="w-6 h-[0.5px] bg-amber-200/30" />
                          </div>

                          {/* Custom message */}
                          <AnimatePresence mode="wait">
                            <motion.p
                              key={invitation.subtitle}
                              initial={{ opacity: 0 }}
                              animate={{ opacity: 1 }}
                              exit={{ opacity: 0 }}
                              transition={{ duration: 0.5 }}
                              className="text-xs text-stone-200/90 font-sans tracking-wide leading-relaxed max-w-xs mx-auto px-4 italic"
                            >
                              "{invitation.subtitle}"
                            </motion.p>
                          </AnimatePresence>

                          <div className="w-12 h-[1px] bg-amber-200/40 mx-auto" />

                          {/* Logistics info */}
                          <div className="space-y-2 mt-2">
                            <div className="flex items-center justify-center gap-1.5 text-xs text-amber-100">
                              <Calendar size={13} className="text-amber-300" />
                              <span className="font-medium tracking-wide">
                                {formatDateStr(invitation.date)}
                              </span>
                            </div>

                            <div className="flex items-center justify-center gap-1.5 text-xs text-stone-300 px-4">
                              <MapPin size={13} className="text-amber-300 shrink-0 mt-0.5" />
                              <span className="leading-tight line-clamp-2">
                                {invitation.venue}
                              </span>
                            </div>
                          </div>
                        </div>

                        {/* Active RSVP Button on bottom of phone screen */}
                        <div className="mt-auto mb-2 text-center flex flex-col items-center gap-3">
                          <motion.button
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            onClick={() => setIsRsvpModalOpen(true)}
                            className={`w-full max-w-[210px] ${activePreset.btnColor} font-semibold py-3 px-6 rounded-full text-xs tracking-wider shadow-xl transition-all duration-300 border border-white/15 cursor-pointer`}
                          >
                            KATILIM BİLDİR
                          </motion.button>
                          <p className="text-[9px] text-stone-300/80 tracking-wide">
                            *Lütfen yanıtınızı en geç etkinlik haftasına kadar iletiniz.
                          </p>
                        </div>

                      </div>

                      {/* Elegant Simulated RSVP Form overlaying inside the device screen structure! */}
                      <AnimatePresence>
                        {isRsvpModalOpen && (
                          <motion.div
                            initial={{ opacity: 0, y: 150, scale: 0.95 }}
                            animate={{ opacity: 1, y: 0, scale: 1 }}
                            exit={{ opacity: 0, y: 150, scale: 0.95 }}
                            transition={{ type: "spring", stiffness: 300, damping: 30 }}
                            className="absolute inset-0 bg-slate-950/95 backdrop-blur-md z-50 p-6 flex flex-col justify-center"
                          >
                            <div className="flex justify-between items-center mb-5">
                              <h3 className="text-sm font-serif font-bold text-amber-200 flex items-center gap-1.5 uppercase tracking-wider">
                                <Heart size={14} className="text-amber-300 fill-amber-300/20" />
                                Davet Katılım Formu
                              </h3>
                              <motion.button
                                whileHover={{ scale: 1.1, rotate: 90 }}
                                whileTap={{ scale: 0.9 }}
                                onClick={() => setIsRsvpModalOpen(false)}
                                className="p-1 text-stone-400 hover:text-white rounded-full bg-white/5 border border-white/10 transition-colors"
                              >
                                <X size={15} />
                              </motion.button>
                            </div>

                            <form onSubmit={handleAddRsvp} className="space-y-4">
                              <div>
                                <label className="block text-[11px] font-semibold text-stone-300 uppercase tracking-wider mb-1.5">
                                  Misafir Adı &amp; Soyadı
                                </label>
                                <input
                                  type="text"
                                  required
                                  value={newRsvp.guestName}
                                  onChange={e => setNewRsvp(p => ({ ...p, guestName: e.target.value }))}
                                  placeholder="Örn. Can Doğan"
                                  className="w-full bg-white/5 border border-white/15 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-amber-400 transition-colors placeholder:text-stone-500"
                                />
                              </div>

                              <div className="grid grid-cols-2 gap-3">
                                <div>
                                  <label className="block text-[11px] font-semibold text-stone-300 uppercase tracking-wider mb-1.5">
                                    Kişi Sayısı
                                  </label>
                                  <select
                                    value={newRsvp.guestCount}
                                    onChange={e => setNewRsvp(p => ({ ...p, guestCount: Number(e.target.value) }))}
                                    className="w-full bg-slate-900 border border-white/15 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-amber-400"
                                  >
                                    <option value={1}>1 Kişi</option>
                                    <option value={2}>2 Kişi</option>
                                    <option value={3}>3 Kişi</option>
                                    <option value={4}>4+ Kişi</option>
                                  </select>
                                </div>

                                <div>
                                  <label className="block text-[11px] font-semibold text-stone-300 uppercase tracking-wider mb-1.5">
                                    Yemek Menüsü
                                  </label>
                                  <select
                                    value={newRsvp.menuPreference}
                                    onChange={e => setNewRsvp(p => ({ ...p, menuPreference: e.target.value }))}
                                    className="w-full bg-slate-900 border border-white/15 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-amber-400"
                                  >
                                    <option value="Et Menü">Et Menü</option>
                                    <option value="Vejetaryen">Vejetaryen</option>
                                    <option value="Çocuk Menüsü">Çocuk Menü</option>
                                    <option value="Standart Menü">Standart</option>
                                  </select>
                                </div>
                              </div>

                              <div>
                                <label className="block text-[11px] font-semibold text-stone-300 uppercase tracking-wider mb-1.5">
                                  Katılım Durumu
                                </label>
                                <div className="grid grid-cols-3 gap-2">
                                  {(['Katılıyor', 'Bekleniyor', 'Katılamıyor'] as const).map(st => (
                                    <motion.button
                                      key={st}
                                      type="button"
                                      whileHover={{ scale: 1.05 }}
                                      whileTap={{ scale: 0.95 }}
                                      onClick={() => setNewRsvp(prev => ({ ...prev, status: st }))}
                                      className={`py-2 px-1 text-[10px] font-semibold rounded-lg border transition-all duration-300 ${newRsvp.status === st
                                        ? 'bg-amber-400 border-amber-400 text-slate-950 font-bold shadow-lg shadow-amber-400/20'
                                        : 'bg-white/5 border-white/10 text-stone-300 hover:bg-white/10'
                                        }`}
                                    >
                                      {st === 'Katılıyor' ? 'Katılıyorum' : st === 'Bekleniyor' ? 'Belirsiz' : 'Katılamıyorum'}
                                    </motion.button>
                                  ))}
                                </div>
                              </div>

                              <motion.button
                                type="submit"
                                whileHover={{ scale: 1.02 }}
                                whileTap={{ scale: 0.98 }}
                                className="w-full bg-amber-400 hover:bg-amber-500 text-slate-950 py-3 rounded-xl text-xs font-semibold tracking-wider shadow-lg transition-colors mt-4 flex items-center justify-center gap-2"
                              >
                                <Send size={13} />
                                YANITI GÖNDER
                              </motion.button>
                            </form>
                          </motion.div>
                        )}
                      </AnimatePresence>

                    </div>
                  </motion.div>
                </motion.div>

                {/* Tam Ekranda Görüntüle Button */}
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.8, delay: 0.2 }}
                  className="w-full mt-6"
                >
                  <button
                    onClick={() => {
                      if (document.documentElement.requestFullscreen) {
                        document.documentElement.requestFullscreen();
                      }
                    }}
                    className="w-full max-w-[280px] lg:max-w-[335px] mx-auto bg-white/80 hover:bg-white text-[#003527] border border-[#003527]/10 py-3 rounded-xl font-bold text-xs shadow-sm hover:shadow-md cursor-pointer transition-all flex items-center justify-center gap-2"
                  >
                    <Maximize2 size={16} />
                    Tam Ekranda Görüntüle
                  </button>
                </motion.div>

                {/* Animated scroll label - desktop only */}
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.8, delay: 0.3 }}
                  className="hidden lg:flex gap-2 items-center text-[#515f74] text-xs font-semibold mt-8"
                >
                  <motion.div
                    animate={{ y: [0, -4, 0] }}
                    transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
                  >
                    <Smartphone size={14} />
                  </motion.div>
                  <span>Önizleme üzerinde deneyin! Katılım Bildir butonuna basıp form doldurabilirsiniz.</span>
                </motion.div>
              </div>

            </div>

          </div>
        </section>

        {/* Dynamic Invitation Designer Panel */}
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
                      <Smartphone size={14} />
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

        {/* ═══════════════════════════════════════════════════════════════ */}
        {/* How It Works — 3 Step Process */}
        {/* ═══════════════════════════════════════════════════════════════ */}
        <section ref={featuresRef} id="neden-dijital" className="py-20 md:py-32 bg-[#f8f9ff] relative overflow-hidden">
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

        {/* ═══════════════════════════════════════════════════════════════ */}
        {/* Live LCV Dashboard Panel — Independent Full-Width Section */}
        {/* ═══════════════════════════════════════════════════════════════ */}
        <section id="lcv-paneli" className="py-20 md:py-28 bg-gradient-to-b from-slate-50 to-stone-100 relative overflow-hidden">
          {/* Decorative background */}
          <div className="absolute inset-0 pointer-events-none">
            <div className="absolute top-0 left-1/4 w-96 h-96 bg-emerald-100/20 rounded-full blur-3xl" />
            <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-amber-100/20 rounded-full blur-3xl" />
          </div>

          <div className="max-w-5xl mx-auto px-4 md:px-12 relative z-10">
            {/* Section Header */}
            <motion.div
              className="text-center mb-12"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            >
              <span className="text-[#003527] font-semibold text-xs tracking-wider uppercase bg-[#003527]/5 px-3 py-1 rounded-full inline-block mb-4">
                Gerçek Zamanlı Takip
              </span>
              <h2 className="font-serif text-3xl md:text-5xl font-bold text-[#0b1c30] mb-4">
                Canlı <span className="italic text-[#003527] font-medium">Katılım Paneli</span>
              </h2>
              <p className="text-[#515f74] text-sm md:text-base max-w-lg mx-auto leading-relaxed">
                Misafirlerinizin katılım durumlarını anlık olarak izleyin. Menü tercihlerini, kişi sayılarını ve yanıt durumlarını tek panelden yönetin.
              </p>
            </motion.div>

            {/* LCV Dashboard Card */}
            <motion.div
              className="relative"
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 1, ease: [0.16, 1, 0.3, 1], delay: 0.15 }}
            >
              <div className="bg-white rounded-3xl p-6 md:p-10 shadow-2xl border border-slate-100/80 relative z-10 space-y-8">

                {/* Header Row */}
                <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 border-b border-stone-100 pb-6">
                  <div>
                    <h3 className="font-serif text-xl font-bold text-[#0b1c30] flex items-center gap-2">
                      <Users className="text-[#003527]" size={22} />
                      Misafir Takip Panosu
                    </h3>
                    <p className="text-xs text-[#515f74] mt-1">
                      Misafirlerinizin katılım yanıtları bu panele eşzamanlı yansır <span className="text-[#003527] font-medium">(*Simülasyondur)</span>
                    </p>
                  </div>

                  <button
                    onClick={handleResetRsvps}
                    title="Listeyi Orijinal Haline Sıfırla"
                    className="p-2.5 rounded-xl bg-gray-50 border border-gray-200 text-gray-500 hover:text-red-600 hover:border-red-200 transition-all cursor-pointer flex items-center gap-1.5 text-xs font-semibold"
                  >
                    <RefreshCw size={13} /> Sıfırla
                  </button>
                </div>

                {/* Stats Counters */}
                <div className="grid grid-cols-3 gap-4">
                  <div className="bg-emerald-50 p-5 rounded-2xl border border-emerald-100 text-center">
                    <div className="w-10 h-10 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center mx-auto mb-2">
                      <UserCheck size={18} />
                    </div>
                    <p className="text-[10px] md:text-xs font-bold text-emerald-700 uppercase tracking-wider">Katılıyor</p>
                    <p className="font-serif text-2xl md:text-3xl font-bold text-emerald-800 mt-1">{countAttending}</p>
                    <p className="text-[10px] text-emerald-600 font-medium">kişi</p>
                  </div>
                  <div className="bg-amber-50 p-5 rounded-2xl border border-amber-100 text-center">
                    <div className="w-10 h-10 rounded-full bg-amber-100 text-amber-600 flex items-center justify-center mx-auto mb-2">
                      <Clock size={18} />
                    </div>
                    <p className="text-[10px] md:text-xs font-bold text-amber-700 uppercase tracking-wider">Belirsiz</p>
                    <p className="font-serif text-2xl md:text-3xl font-bold text-amber-800 mt-1">{countPending}</p>
                    <p className="text-[10px] text-amber-600 font-medium">kişi</p>
                  </div>
                  <div className="bg-red-50 p-5 rounded-2xl border border-red-100 text-center">
                    <div className="w-10 h-10 rounded-full bg-red-100 text-red-600 flex items-center justify-center mx-auto mb-2">
                      <X size={18} />
                    </div>
                    <p className="text-[10px] md:text-xs font-bold text-red-700 uppercase tracking-wider">Katılamayacak</p>
                    <p className="font-serif text-2xl md:text-3xl font-bold text-red-800 mt-1">{countDeclines}</p>
                    <p className="text-[10px] text-red-600 font-medium">kişi</p>
                  </div>
                </div>

                {/* Guest List */}
                <div className="space-y-3 max-h-72 overflow-y-auto pr-1">
                  <AnimatePresence initial={false}>
                    {rsvpList.map((rsvp) => {
                      let badgeBg = 'bg-stone-100 text-[#404944]';
                      if (rsvp.status === 'Katılıyor') badgeBg = 'bg-emerald-100 text-emerald-800';
                      if (rsvp.status === 'Katılamıyor') badgeBg = 'bg-red-100 text-red-800';

                      return (
                        <motion.div
                          key={rsvp.id}
                          initial={{ opacity: 0, x: 20 }}
                          animate={{ opacity: 1, x: 0 }}
                          exit={{ opacity: 0, x: -20 }}
                          className="flex items-center justify-between bg-slate-50/80 hover:bg-white rounded-xl p-3 md:p-4 border border-slate-100 transition-colors duration-300"
                        >
                          <div className="flex items-center gap-3">
                            <div className="w-10 h-10 rounded-full bg-[#003527]/5 text-[#003527] border border-[#003527]/10 flex items-center justify-center font-bold text-xs uppercase shadow-sm">
                              {rsvp.guestName ? rsvp.guestName.substring(0, 2) : 'M'}
                            </div>
                            <div>
                              <p className="font-bold text-xs text-[#0b1c30]">{rsvp.guestName}</p>
                              <div className="flex items-center gap-1.5 text-[10px] text-[#515f74] mt-0.5">
                                <Users size={11} className="text-stone-400" />
                                <span>{rsvp.guestCount} Kişi</span>
                                <span className="text-stone-300">•</span>
                                <Utensils size={11} className="text-stone-400" />
                                <span>{rsvp.menuPreference || 'Belirtilmedi'}</span>
                              </div>
                            </div>
                          </div>

                          <div className="flex items-center gap-2">
                            <span className={`${badgeBg} px-3 py-1 rounded-full text-[10px] font-bold shadow-sm`}>
                              {rsvp.status}
                            </span>
                            <button
                              onClick={() => handleDeleteRsvp(rsvp.id)}
                              className="p-1 h-7 w-7 rounded-lg bg-red-50 text-red-500 hover:bg-red-100 hover:text-red-700 flex items-center justify-center border border-red-200 transition-all"
                              title="Kaydı Sil"
                            >
                              <Trash2 size={12} />
                            </button>
                          </div>
                        </motion.div>
                      );
                    })}
                  </AnimatePresence>

                  {rsvpList.length === 0 && (
                    <p className="text-center text-xs text-gray-400 py-8">Henüz kaydedilmiş katılım yanıtı bulunmuyor.</p>
                  )}
                </div>

                {/* Footer Info */}
                <div className="bg-gradient-to-r from-[#003527]/5 to-emerald-50 p-4 rounded-xl border border-emerald-100 text-center">
                  <p className="text-xs font-semibold text-[#003527] flex items-center justify-center gap-1.5">
                    <motion.div animate={{ scale: [1, 1.2, 1] }} transition={{ duration: 2, repeat: Infinity }}>
                      <UserCheck size={14} />
                    </motion.div>
                    Yukarıdaki telefon önizlemesinden Katılım bildirerek bu paneli canlı test edebilirsiniz!
                  </p>
                </div>

              </div>

              {/* Decorative blur blobs */}
              <div className="absolute -bottom-6 -right-6 w-48 h-48 bg-amber-200/40 rounded-full blur-3xl z-0" />
              <div className="absolute -top-6 -left-6 w-48 h-48 bg-emerald-200/40 rounded-full blur-3xl z-0" />
            </motion.div>
          </div>
        </section>

        {/* ═══════════════════════════════════════════════════════════════ */}
        {/* Social Proof — Customer Testimonials */}
        {/* ═══════════════════════════════════════════════════════════════ */}
        <section className="py-20 md:py-28 bg-gradient-to-b from-emerald-950 to-[#001a10] text-white relative overflow-hidden">
          {/* Decorative elements */}
          <div className="absolute inset-0 pointer-events-none">
            <div className="absolute top-10 right-10 w-80 h-80 bg-emerald-800/20 rounded-full blur-3xl" />
            <div className="absolute bottom-10 left-10 w-96 h-96 bg-amber-900/10 rounded-full blur-3xl" />
          </div>

          <div className="max-w-7xl mx-auto px-4 md:px-12 relative z-10">
            {/* Section Header */}
            <motion.div
              className="text-center mb-14 md:mb-20"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            >
              <span className="text-amber-300 font-semibold text-xs tracking-wider uppercase bg-amber-300/10 px-3 py-1 rounded-full inline-block mb-4 border border-amber-300/20">
                Müşteri Deneyimleri
              </span>
              <h2 className="font-serif text-3xl md:text-5xl font-bold text-white mb-4">
                Binlerce Çiftin <span className="italic text-amber-200 font-medium">Tercihi</span>
              </h2>
              <p className="text-stone-300 text-sm md:text-base max-w-xl mx-auto leading-relaxed">
                Özel günlerini dijital zarafetle taçlandıran kullanıcılarımızın deneyimlerini keşfedin.
              </p>
            </motion.div>

            {/* Testimonial Cards */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8">
              {[
                {
                  name: 'Elif & Burak',
                  event: 'Düğün Davetiyesi',
                  quote: 'Davetiyemiz o kadar güzel oldu ki, birçok misafirimiz "bu gerçekten dijital mi?" diye sordu. Harika bir deneyimdi!',
                  stars: 5,
                  avatar: 'EB'
                },
                {
                  name: 'Ayşe Kılıç',
                  event: 'Baby Shower',
                  quote: 'Katılım takip sistemi hayat kurtarıcı. Kim geliyor, ne yemek istiyor, hepsini tek panelden takip ettim. Çok pratik!',
                  stars: 5,
                  avatar: 'AK'
                },
                {
                  name: 'Serkan & Merve',
                  event: 'Nişan Töreni',
                  quote: 'Sürdürülebilir, şık ve modern. Kağıt davetiye yerine dijital tercih ettiğimiz için çok mutluyuz. Şiddetle tavsiye ederiz.',
                  stars: 5,
                  avatar: 'SM'
                }
              ].map((review, idx) => (
                <motion.div
                  key={review.name}
                  className="bg-white/5 backdrop-blur-md border border-white/10 rounded-3xl p-8 hover:bg-white/10 hover:border-white/20 transition-all duration-500 group"
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1], delay: idx * 0.12 }}
                >
                  {/* Stars */}
                  <div className="flex gap-1 mb-5">
                    {Array.from({ length: review.stars }).map((_, i) => (
                      <svg key={i} className="w-4 h-4 text-amber-400 fill-amber-400" viewBox="0 0 20 20">
                        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                      </svg>
                    ))}
                  </div>

                  {/* Quote */}
                  <p className="text-stone-200 text-sm leading-relaxed mb-6 italic">
                    &ldquo;{review.quote}&rdquo;
                  </p>

                  {/* Author */}
                  <div className="flex items-center gap-3 pt-4 border-t border-white/10">
                    <div className="w-10 h-10 rounded-full bg-gradient-to-br from-amber-400 to-amber-600 flex items-center justify-center text-slate-950 font-bold text-xs shadow-md">
                      {review.avatar}
                    </div>
                    <div>
                      <p className="text-white font-semibold text-sm">{review.name}</p>
                      <p className="text-stone-400 text-xs">{review.event}</p>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

      </main>
      {/* Footer */}
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

    </div>
  );
}
