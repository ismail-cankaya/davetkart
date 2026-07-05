import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { motion } from 'motion/react';
import { Rocket, ShieldCheck } from 'lucide-react';
import { PreviewSection } from '../components/preview/PreviewSection';
import { DesignerPanel } from '../components/editor/DesignerPanel';
import { useAuthStore } from '../stores/useAuthStore';
import { toast } from '../components/ui/Toast';
import { AuthRedirectState } from '../types';

const EASE_LUXE = [0.22, 1, 0.36, 1] as const;

/**
 * Publish action bar. Anonymous designers are welcome — the invitation
 * lives in useInvitationStore (persisted through the persistence service),
 * so sending the user through /login loses nothing: after authentication
 * they land right back here with the design intact.
 */
function PublishBar() {
  const isAuthenticated = useAuthStore(s => s.isAuthenticated);
  const navigate = useNavigate();
  const location = useLocation();

  const handlePublish = () => {
    if (!isAuthenticated) {
      const state: AuthRedirectState = { from: location.pathname };
      toast('Tasarımınız güvende! Yayınlamak için giriş yapmanız yeterli.', 'info');
      navigate('/login', { state });
      return;
    }
    // TODO(backend): POST the invitation through `api` (services/api.ts)
    // and navigate to the hosted /invite/:id link it returns.
    toast('Davetiyeniz yayınlandı! Katılım yanıtlarını panelinizden takip edebilirsiniz. 🎉');
    navigate('/dashboard');
  };

  return (
    <section className="py-14 md:py-20 bg-cream">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.9, ease: EASE_LUXE }}
        className="max-w-3xl mx-auto px-4 text-center space-y-5"
      >
        <h2 className="font-serif text-2xl md:text-3xl font-bold text-ink">
          Tasarımınız hazır mı? <span className="italic text-brand font-medium">Yayınlayın</span>
        </h2>
        <p className="text-muted text-sm max-w-md mx-auto leading-relaxed">
          Davetiyeniz saniyeler içinde paylaşıma hazır bir bağlantıya dönüşür; misafirleriniz
          anında görüntüleyip katılım bildirebilir.
        </p>
        <button
          onClick={handlePublish}
          className="group relative overflow-hidden inline-flex items-center gap-2.5 bg-brand text-white px-9 py-4 rounded-full font-semibold text-sm hover:bg-brand-soft transition-all duration-500 shadow-lg shadow-brand/20 hover:shadow-xl hover:shadow-brand/30 hover:-translate-y-1 cursor-pointer"
        >
          <span className="absolute inset-0 animate-shimmer pointer-events-none" />
          <Rocket size={16} className="group-hover:-translate-y-0.5 transition-transform duration-300" />
          Kaydet &amp; Yayınla
        </button>
        <p className="text-muted text-[11px] flex items-center justify-center gap-1.5">
          <ShieldCheck size={13} className="text-brand" />
          Giriş yapmadan tasarlayabilirsiniz — tasarımınız güvenle saklanır.
        </p>
      </motion.div>
    </section>
  );
}

/** Design studio: live preview, template collections and the designer panel. */
export default function CreatePage() {
  return (
    <>
      <PreviewSection />
      <DesignerPanel />
      <PublishBar />
    </>
  );
}
