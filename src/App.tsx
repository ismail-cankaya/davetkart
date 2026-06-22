import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
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

  const handleTemplateChange = (id: string) => {
    setActivePresetId(id);
    setInvitation(prev => ({ ...prev, imageTheme: id, phoneBackground: id }));
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
    alert(`Teşekkürler, ${entry.guestName}! LCV yanıtınız başarıyla kaydedildi ve LCV paneline eklendi.`);
  };

  const handleDeleteRsvp = (id: string) => {
    if (window.confirm('Bu LCV kaydını silmek istediğinize emin misiniz?')) {
      setRsvpList(prev => prev.filter(r => r.id !== id));
    }
  };

  const handleResetRsvps = () => {
    if (window.confirm('LCV listesini orijinal durumuna sıfırlamak istiyor musunuz?')) {
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
            <a className="text-[#515f74] hover:text-[#003527] transition-colors font-medium text-sm" href="#lcv-paneli">Canlı LCV Paneli</a>
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
                  Canlı LCV Paneli
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
        <section className="relative min-h-[100dvh] pt-20 pb-20 overflow-hidden bg-gradient-to-b from-[#f8f9ff] via-white to-[#f8f9ff] flex flex-col justify-center">
          <div className="max-w-7xl mx-auto px-4 md:px-12 relative z-10 flex flex-col items-center text-center w-full">
            
            <motion.div 
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
              className="bg-[#efe2c1] text-[#211b07] px-4 py-1.5 rounded-full font-semibold text-xs tracking-wide mb-8 inline-flex items-center gap-1.5 shadow-sm border border-[#211b07]/10"
            >
              <Sparkles size={14} className="text-amber-600 animate-pulse" />
              <span>Yeni Nesil Davetiye Deneyimi</span>
            </motion.div>

            <motion.h1 
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1], delay: 0.1 }}
              className="font-serif text-3xl md:text-5xl lg:text-6xl text-[#0b1c30] max-w-4xl mx-auto leading-tight md:leading-tight mb-6 font-bold tracking-tight"
            >
              Özel Anlarınızı <span className="text-[#003527] italic font-medium font-serif">Dijital Zarafetle</span> Taçlandırın
            </motion.h1>

            <motion.p 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1], delay: 0.2 }}
              className="text-[#515f74] text-base md:text-lg max-w-2xl mx-auto mb-10 leading-relaxed"
            >
              Çevre dostu, anında paylaşılabilir, müzikli ve tamamen kişiselleştirilebilir dijital lüks davetiyelerle sevdiklerinize unutulmaz bir ilk izlenim bırakın.
            </motion.p>

            <motion.div 
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1], delay: 0.3 }}
              className="flex flex-col sm:flex-row gap-4 justify-center w-full sm:w-auto"
            >
              <a 
                href="#tasarimci" 
                className="bg-[#003527] text-white px-8 py-4 rounded-full font-semibold text-sm hover:bg-[#064e3b] transition-all duration-300 shadow-lg flex items-center justify-center gap-2 hover:-translate-y-0.5"
              >
                Davetiyeni Oluştur
                <ArrowRight size={16} />
              </a>
              <a 
                href="#koleksiyonlar" 
                className="bg-white text-[#003527] border border-[#003527]/20 px-8 py-4 rounded-full font-semibold text-sm hover:bg-[#003527]/5 transition-all duration-300 flex items-center justify-center gap-2"
              >
                Şablonları İncele
              </a>
            </motion.div>

            {/* Hero Stats */}
            <motion.div 
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="mt-20 w-full max-w-5xl grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-4 border-t border-[#0b1c30]/10 pt-12 text-center"
            >
              <div className="p-2">
                <p className="font-serif text-3xl md:text-4xl font-bold text-[#003527]">10K+</p>
                <p className="text-xs text-[#515f74] uppercase tracking-wider font-semibold mt-2">Oluşturulan Davetiye</p>
              </div>
              <div className="p-2">
                <p className="font-serif text-3xl md:text-4xl font-bold text-[#003527]">70B+</p>
                <p className="text-xs text-[#515f74] uppercase tracking-wider font-semibold mt-2">Görüntülenme</p>
              </div>
              <div className="p-2">
                <p className="font-serif text-3xl md:text-4xl font-bold text-[#003527]">500+</p>
                <p className="text-xs text-[#515f74] uppercase tracking-wider font-semibold mt-2">Özel Şablon</p>
              </div>
              <div className="p-2">
                <p className="font-serif text-3xl md:text-4xl font-bold text-[#003527]">%100</p>
                <p className="text-xs text-[#515f74] uppercase tracking-wider font-semibold mt-2">Çevre Dostu</p>
              </div>
            </motion.div>
          </div>

          {/* Decorative design blobs */}
          <div className="absolute top-10 right-0 w-80 h-80 bg-emerald-100/40 rounded-full blur-3xl pointer-events-none -z-10" />
          <div className="absolute bottom-20 left-10 w-96 h-96 bg-amber-100/30 rounded-full blur-3xl pointer-events-none -z-10" />
        </section>

        {/* Scroll Interaction & Device Preview Section */}
        <motion.section 
          id="animasyon-ve-onizleme" 
          className="py-20 bg-[#f8f9ff] relative overflow-hidden"
          initial={{ opacity: 0, y: 100 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-10%" }}
          transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
        >
          <div className="max-w-7xl mx-auto px-4 md:px-12">
            
            <div className="flex flex-col lg:flex-row gap-12 items-center lg:items-start justify-center">
              
              {/* Left Column: Her Etkinliğe Özel Koleksiyonlar */}
              <div className="w-full lg:w-1/2 flex flex-col justify-center space-y-6 pt-4">
                <div className="mb-4 text-center lg:text-left">
                  <span className="text-[#003527] font-semibold text-xs tracking-wider uppercase bg-[#003527]/5 px-3 py-1 rounded-full">
                    Eşsiz Koleksiyonlar
                  </span>
                  <h2 className="font-serif text-3xl md:text-4xl font-bold text-[#0b1c30] mt-4 mb-3">
                    Her Etkinliğe Özel <br className="hidden lg:block" />
                    <span className="italic text-[#003527] font-medium font-serif">Koleksiyonlar</span>
                  </h2>
                  <p className="text-[#515f74] text-sm md:text-base max-w-md mx-auto lg:mx-0">
                    Hayalinizdeki konsepti yansıtan tasarımınızı seçin ve sağdaki canlı cihaz önizlemesinden anında görüntüleyin.
                  </p>
                </div>
                
                {/* 2x2 Grid for Templates */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {TEMPLATE_PRESETS.map((pst, idx) => (
                    <motion.div 
                      key={pst.id}
                      initial={{ opacity: 0, y: 30 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true, margin: "-50px" }}
                      transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1], delay: idx * 0.1 }}
                      onClick={() => handleTemplateChange(pst.id)}
                      className={`group relative rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-500 h-48 cursor-pointer border-2 ${
                        activePresetId === pst.id ? 'border-[#003527]' : 'border-transparent'
                      }`}
                    >
                      <img 
                        className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-700 filter brightness-[0.7] md:brightness-[0.6]" 
                        src={pst.imageUrl}
                        alt={pst.name} 
                      />
                      
                      {activePresetId === pst.id && (
                        <div className="absolute top-3 right-3 bg-[#003527] text-white text-[10px] font-semibold px-2.5 py-1 rounded-full flex items-center gap-1 shadow-md z-10 transition-all">
                          <Check size={10} /> Seçili
                        </div>
                      )}

                      <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent flex flex-col justify-end p-5">
                        <span className={`w-3 h-3 rounded-full ${pst.backgroundStyle} border border-white/30 mb-2 shadow-sm`} />
                        <h3 className="font-serif text-lg text-white font-bold leading-tight">
                          {pst.name.split(' (')[0]}
                        </h3>
                      </div>
                    </motion.div>
                  ))}
                </div>

                {/* Quick Info Box */}
                <div className="bg-[#efe2c1]/30 p-4 rounded-2xl border border-[#efe2c1] flex items-start gap-4 mt-4">
                  <div className="p-2 rounded-xl bg-white text-[#003527] shadow-sm mt-0.5">
                    <Heart size={16} className="fill-[#003527]/10" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-xs text-[#211b07] uppercase tracking-wider">Metinleri Düzenleyin</h4>
                    <p className="text-xs text-[#515f74] mt-1">
                      Aşağıdaki <strong>"Davetiye Tasarımcısı"</strong> bölümünden davetiye içeriklerini dilediğiniz gibi güncelleyebilirsiniz.
                    </p>
                  </div>
                </div>
              </div>

              {/* Right Column: Premium Interactive Phone Layout Container */}
              <div className="w-full lg:w-1/2 flex flex-col items-center justify-center min-h-[700px]">
                
                {/* Simulated Device Frame */}
                <motion.div 
                  layout
                  className="relative p-3.5 bg-slate-900 shadow-2xl overflow-hidden border-4 border-slate-800 w-[335px] h-[650px] rounded-[42px]"
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
                        transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
                        src={activePreset.imageUrl} 
                        alt="Zarif Premium Dijital Davetiye Tasarımı" 
                        className="absolute inset-0 w-full h-full object-cover select-none pointer-events-none filter brightness-[0.7]"
                      />
                    </AnimatePresence>

                    {/* Semi-transparent Gold luxury card overlay inside screen */}
                    <div className="relative z-10 w-full h-full flex flex-col justify-between p-6">
                      
                      {/* Live Date Watermark Badge on Top */}
                      <div className="self-center mt-6">
                        <span className="backdrop-blur-md bg-white/10 text-white/95 border border-white/20 text-[10px] tracking-[0.2em] font-medium font-sans px-3 py-1 rounded-full uppercase">
                          DAVETLİSİNİZ
                        </span>
                      </div>

                      {/* Main Invitation Texts Overlay */}
                      <div className="flex flex-col text-center my-auto px-1 space-y-4">
                        
                        <div className="w-8 h-[1px] bg-amber-200/50 mx-auto" />
                        
                        {/* Invitation Short Title */}
                        <p className="text-[11px] font-sans font-semibold tracking-[0.15em] text-amber-200/95 uppercase drop-shadow-sm leading-tight">
                          {invitation.title || 'HAYATIMIZIN EN ÖZEL GÜNÜ'}
                        </p>

                        {/* Beautiful Script Couple Names */}
                        <h2 className="font-serif text-3xl md:text-4xl lg:text-5xl font-normal text-amber-100 italic tracking-wide leading-tight px-2 py-1 drop-shadow-md">
                          {invitation.names || 'Sophia & Elias'}
                        </h2>

                        <div className="flex items-center justify-center gap-2">
                          <div className="w-6 h-[0.5px] bg-amber-200/30" />
                          <span className="text-white/90 text-xs tracking-wider">&amp;</span>
                          <div className="w-6 h-[0.5px] bg-amber-200/30" />
                        </div>

                        {/* Custom message */}
                        <p className="text-xs text-stone-200/90 font-sans tracking-wide leading-relaxed max-w-xs mx-auto px-4 italic">
                          "{invitation.subtitle}"
                        </p>
                        
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
                        <button 
                          onClick={() => setIsRsvpModalOpen(true)}
                          className={`w-full max-w-[210px] ${activePreset.btnColor} font-semibold py-3 px-6 rounded-full text-xs tracking-wider shadow-xl transition-all duration-300 hover:scale-[1.03] active:scale-[0.98] border border-white/15 cursor-pointer`}
                        >
                          LCV GÖNDER (RSVP)
                        </button>
                        <p className="text-[9px] text-stone-300/80 tracking-wide">
                          *Lütfen yanıtınızı en geç etkinlik haftasına kadar iletiniz.
                        </p>
                      </div>

                    </div>

                    {/* Elegant Simulated RSVP Form overlaying inside the device screen structure! */}
                    <AnimatePresence>
                      {isRsvpModalOpen && (
                        <motion.div 
                          initial={{ opacity: 0, y: 150 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0, y: 150 }}
                          className="absolute inset-0 bg-slate-950/95 backdrop-blur-md z-50 p-6 flex flex-col justify-center"
                        >
                          <div className="flex justify-between items-center mb-5">
                            <h3 className="text-sm font-serif font-bold text-amber-200 flex items-center gap-1.5 uppercase tracking-wider">
                              <Heart size={14} className="text-amber-300 fill-amber-300/20" />
                              LCV Katılım Formu
                            </h3>
                            <button 
                              onClick={() => setIsRsvpModalOpen(false)}
                              className="p-1 text-stone-400 hover:text-white rounded-full bg-white/5 border border-white/10"
                            >
                              <X size={15} />
                            </button>
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
                                  <button
                                    key={st}
                                    type="button"
                                    onClick={() => setNewRsvp(prev => ({ ...prev, status: st }))}
                                    className={`py-2 px-1 text-[10px] font-semibold rounded-lg border transition-all ${
                                      newRsvp.status === st 
                                        ? 'bg-amber-400 border-amber-400 text-slate-950 font-bold' 
                                        : 'bg-white/5 border-white/10 text-stone-300 hover:bg-white/10'
                                    }`}
                                  >
                                    {st === 'Katılıyor' ? 'Katılıyorum' : st === 'Bekleniyor' ? 'Belirsiz' : 'Katılamıyorum'}
                                  </button>
                                ))}
                              </div>
                            </div>

                            <button 
                              type="submit"
                              className="w-full bg-amber-400 hover:bg-amber-500 text-slate-950 py-3 rounded-xl text-xs font-semibold tracking-wider shadow-lg transition-colors mt-4 flex items-center justify-center gap-2"
                            >
                              <Send size={13} />
                              YANITI GÖNDER
                            </button>
                          </form>
                        </motion.div>
                      )}
                    </AnimatePresence>

                  </div>
                </motion.div>

                {/* Animated scroll label */}
                <div className="flex gap-2 items-center text-[#515f74] text-xs font-semibold mt-4">
                  <Smartphone size={14} className="animate-bounce" />
                  <span>Önizleme üzerinde deneyin! LCV Gönder butonuna basıp form doldurabilirsiniz.</span>
                </div>
              </div>

            </div>

          </div>
        </motion.section>

        {/* Dynamic Invitation Designer Panel */}
        <motion.section 
          id="tasarimci" 
          className="py-20 bg-emerald-950 text-white relative"
          initial={{ opacity: 0, y: 100 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-10%" }}
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
                    Aşağıdaki bilgileri düzenleyerek davetiyenizi anında kişiselleştirebilirsiniz. Yukarıdaki telefon simülatöründe ve canlı LCV panelinde sonuçları gerçek zamanlı gözlemleyin.
                  </p>
                </div>

                <div className="bg-white/10 backdrop-blur-md p-6 md:p-8 rounded-2xl border border-white/15 space-y-6">
                  
                  {/* Design Template Quick Selection */}
                  <div>
                    <label className="block text-xs font-bold tracking-wider uppercase text-amber-200 mb-3">
                      Tasarım Şablon Teması
                    </label>
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                      {TEMPLATE_PRESETS.map((pst) => (
                        <button
                          key={pst.id}
                          type="button"
                          onClick={() => handleTemplateChange(pst.id)}
                          className={`flex flex-col items-center justify-center p-3 rounded-xl border text-center transition-all cursor-pointer ${
                            activePresetId === pst.id 
                              ? 'bg-[#003527] border-amber-300 shadow-lg scale-[1.03]' 
                              : 'bg-white/5 border-white/10 hover:bg-white/10'
                          }`}
                        >
                          <div className={`w-5 h-5 rounded-full ${pst.backgroundStyle} border border-white/20 mb-1`} />
                          <span className="text-[10px] font-semibold tracking-wide truncate max-w-[100px]">
                            {pst.name.split(' (')[0]}
                          </span>
                        </button>
                      ))}
                    </div>
                  </div>

                  <div className="h-[1px] bg-white/10" />

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
                    
                    <a 
                      href="#davetiye-simulasyonu"
                      className="bg-amber-400 hover:bg-amber-500 text-slate-950 font-bold px-5 py-2.5 rounded-xl text-xs flex items-center gap-2 shadow-md"
                    >
                      <Smartphone size={14} />
                      Simülatöre Git
                    </a>
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
                    <h4 className="font-serif text-xl font-bold">İlk Davetiyeniz %100 Ücretsiz!</h4>
                    <p className="text-xs font-medium mt-1 text-slate-900 leading-relaxed">
                      Sitemize şimdi üye olarak ilk dijital davetiyenizi hiçbir ücret ödemeden oluşturabilir ve ilk 102 misafirinize tamamen ücretsiz LCV takibi uygulayabilirsiniz.
                    </p>
                    <a 
                      href="#tasarimci"
                      className="mt-4 inline-flex items-center gap-1 bg-slate-950 text-white font-bold text-xs px-4 py-2 rounded-lg hover:bg-slate-900 transition-colors"
                    >
                      <span>Hemen Ücretsiz Başla</span>
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

        {/* Feature list: Why E-Dijital Davetiye */}
        <motion.section 
          id="neden-dijital" 
          className="py-24 bg-[#eff4ff]"
          initial={{ opacity: 0, y: 100 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-10%" }}
          transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
        >
          <div className="max-w-7xl mx-auto px-4 md:px-12">
            
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
              
              {/* Left Column content */}
              <div className="space-y-6">
                <span className="text-[#003527] font-semibold text-xs tracking-wider uppercase bg-[#003527]/5 px-3 py-1 rounded-full">
                  Neden E-Dijital Davetiye?
                </span>
                <h2 className="font-serif text-3xl md:text-4xl font-bold text-[#0b1c30]">
                  Geleneksel Matbaa Süreçlerini Geride Bırakın
                </h2>
                <p className="text-[#515f74] text-sm md:text-base leading-relaxed">
                  Zarflama, kargo kayıpları ve eksik LCV dönüşleriyle vakit kaybetmeyin. Modern teknolojinin getirdiği kolaylık ve estetiği bir arada yaşayın.
                </p>

                <div className="space-y-6 pt-4">
                  
                  <div className="flex gap-4">
                    <div className="w-12 h-12 rounded-full bg-[#b0f0d6] flex items-center justify-center text-[#002117] shrink-0 shadow-sm font-bold">
                      1
                    </div>
                    <div>
                      <h4 className="font-semibold text-sm text-[#0b1c30]">Dakikalar İçinde Hazır</h4>
                      <p className="text-xs text-[#515f74] mt-1 text-justify">
                        Seçtiğiniz lüks şablonu anında kişiselleştirebilir ve akıllı telefonunuzdan WhatsApp, SMS veya diğer kanallar üzerinden sevdiklerinizle anında paylaşabilirsiniz.
                      </p>
                    </div>
                  </div>

                  <div className="flex gap-4">
                    <div className="w-12 h-12 rounded-full bg-[#b0f0d6] flex items-center justify-center text-[#002117] shrink-0 shadow-sm font-bold">
                      2
                    </div>
                    <div>
                      <h4 className="font-semibold text-sm text-[#0b1c30]">Çevre Dostu Yaklaşım</h4>
                      <p className="text-xs text-[#515f74] mt-1 text-justify">
                        Tonlarca kağıt israfını ve orman tahribatını önleyin. Sürdürülebilir, sıfır karbon, doğaya ve ekosisteme saygılı bir kutlama organize etmenin gururunu yaşayın.
                      </p>
                    </div>
                  </div>

                  <div className="flex gap-4">
                    <div className="w-12 h-12 rounded-full bg-[#b0f0d6] flex items-center justify-center text-[#002117] shrink-0 shadow-sm font-bold">
                      3
                    </div>
                    <div>
                      <h4 className="font-semibold text-sm text-[#0b1c30]">Gelişmiş Anlık LCV Takibi</h4>
                      <p className="text-xs text-[#515f74] mt-1 text-justify">
                        Katılımcı sayılarını, çocuk menüsü veya glütensiz yiyecek tercihlerini anlık gözlemleyin. Oturma düzenini hatasız ve zahmetsizce planlayın.
                      </p>
                    </div>
                  </div>

                </div>
              </div>

              {/* LCV List live Panel - Right Column */}
              <div id="lcv-paneli" className="relative">
                
                <div className="bg-white rounded-3xl p-6 md:p-8 shadow-xl border border-slate-100 relative z-10 space-y-6">
                  
                  <div className="flex justify-between items-center border-b border-stone-100 pb-4">
                    <div>
                      <h3 className="font-serif text-lg font-bold text-[#0b1c30] flex items-center gap-2">
                        <Users className="text-[#003527]" size={20} />
                        Canlı LCV Paneli
                      </h3>
                      <p className="text-[10px] text-[#515f74] mt-0.5">
                        Misafirlerinizin LCV yanıtları bu panele eşzamanlı yansır (*Simülasyondur)
                      </p>
                    </div>
                    
                    <button 
                      onClick={handleResetRsvps}
                      title="Listeyi Orijinal Haline Sıfırla"
                      className="p-2 rounded-lg bg-gray-50 border border-gray-200 text-gray-500 hover:text-red-600 transition-colors cursor-pointer flex items-center gap-1 text-[11px] font-semibold"
                    >
                      <RefreshCw size={13} /> SIFIRLA
                    </button>
                  </div>

                  {/* LCV Counters Status Grid */}
                  <div className="grid grid-cols-3 gap-3 bg-slate-50 p-4 rounded-xl border border-slate-100 text-center">
                    <div>
                      <p className="text-xs font-semibold text-emerald-700 uppercase tracking-wide">KATILIYOR</p>
                      <p className="font-serif text-xl font-bold text-emerald-800 mt-1">{countAttending} Kişi</p>
                    </div>
                    <div>
                      <p className="text-xs font-semibold text-yellow-700 uppercase tracking-wide">BELİRSİZ</p>
                      <p className="font-serif text-xl font-bold text-yellow-800 mt-1">{countPending} Kişi</p>
                    </div>
                    <div>
                      <p className="text-xs font-semibold text-red-700 uppercase tracking-wide">KATILAMAYACAK</p>
                      <p className="font-serif text-xl font-bold text-red-800 mt-1">{countDeclines} Kişi</p>
                    </div>
                  </div>

                  {/* Guest responses listing */}
                  <div className="space-y-3 max-h-80 overflow-y-auto pr-1">
                    <AnimatePresence initial={false}>
                      {rsvpList.map((rsvp) => {
                        let badgeBg = 'bg-stone-100 text-[#404944]';
                        if (rsvp.status === 'Katılıyor') badgeBg = 'bg-[#efe2c1] text-[#211b07]';
                        if (rsvp.status === 'Katılamıyor') badgeBg = 'bg-[#ffdad6] text-[#93000a]';

                        return (
                          <motion.div 
                            key={rsvp.id}
                            initial={{ opacity: 0, x: 20 }}
                            animate={{ opacity: 1, x: 0 }}
                            exit={{ opacity: 0, x: -20 }}
                            className="flex items-center justify-between border-b border-stone-100 pb-3"
                          >
                            <div className="flex items-center gap-3">
                              <div className="w-10 h-10 rounded-full bg-[#003527]/5 text-[#003527] border border-[#003527]/10 flex items-center justify-center font-bold text-xs uppercase shadow-sm">
                                {rsvp.guestName ? rsvp.guestName.substring(0,2) : 'M'}
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
                              
                              {/* Option to delete row */}
                              <button 
                                onClick={() => handleDeleteRsvp(rsvp.id)}
                                className="p-1 h-7 w-7 rounded bg-red-50 text-red-600 hover:bg-red-100 flex items-center justify-center border border-red-200 transition-colors"
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
                      <p className="text-center text-xs text-gray-400 py-8">Henüz kaydedilmiş LCV yanıtı bulunmuyor.</p>
                    )}
                  </div>

                  <div className="bg-[#b0f0d6]/20 p-4 rounded-xl border border-[#b0f0d6]/70 text-center">
                    <p className="text-xs font-semibold text-[#003527] flex items-center justify-center gap-1.5">
                      <UserCheck size={14} />
                      Misafirlerinizin yaptığı her RSVP anında burada görünür!
                    </p>
                  </div>

                </div>

                {/* Decorative blob styling */}
                <div className="absolute -bottom-10 -right-10 w-64 h-64 bg-amber-100 rounded-full blur-3xl opacity-50 z-0" />
                <div className="absolute -top-10 -left-10 w-64 h-64 bg-emerald-100 rounded-full blur-3xl opacity-50 z-0" />
              </div>

            </div>

          </div>
        </motion.section>

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
