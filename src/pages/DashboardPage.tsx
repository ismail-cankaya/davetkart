import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'motion/react';
import { PenLine, Share2 } from 'lucide-react';
import { LiveRsvpPanel } from '../components/rsvp/LiveRsvpPanel';
import { useAuthStore } from '../stores/useAuthStore';

const EASE_LUXE = [0.22, 1, 0.36, 1] as const;

/**
 * Member dashboard. Hosts the live RSVP panel for now; invitation
 * management widgets will grow around it.
 */
export default function DashboardPage() {
  const user = useAuthStore(s => s.user);

  return (
    <>
      <section className="pt-14 md:pt-20 bg-cream">
        <motion.div
          initial={{ opacity: 0, y: 25 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: EASE_LUXE }}
          className="max-w-5xl mx-auto px-4 md:px-12 flex flex-col sm:flex-row sm:items-end justify-between gap-6"
        >
          <div>
            <span className="text-brand font-semibold text-xs tracking-[0.15em] uppercase bg-brand/5 border border-brand/10 px-3.5 py-1.5 rounded-full inline-block mb-4">
              Üye Paneli
            </span>
            <h1 className="font-serif text-3xl md:text-4xl font-bold text-ink">
              Hoş geldiniz{user ? <>, <span className="italic text-brand font-medium">{user.fullName}</span></> : null}
            </h1>
            <p className="text-muted text-sm mt-2 max-w-md leading-relaxed">
              Davetiyelerinizi yönetin, misafir yanıtlarını gerçek zamanlı takip edin.
            </p>
          </div>

          <div className="flex gap-3 shrink-0">
            <Link
              to="/create"
              className="inline-flex items-center gap-2 bg-brand text-white px-5 py-3 rounded-full font-semibold text-xs hover:bg-brand-soft transition-all duration-300 shadow-md shadow-brand/15 hover:-translate-y-0.5"
            >
              <PenLine size={14} />
              Davetiyeyi Düzenle
            </Link>
            <Link
              to="/invite/demo"
              className="inline-flex items-center gap-2 bg-white text-brand border border-brand/15 px-5 py-3 rounded-full font-semibold text-xs hover:border-brand/30 transition-all duration-300 shadow-sm hover:-translate-y-0.5"
            >
              <Share2 size={14} />
              Davetiyeyi Görüntüle
            </Link>
          </div>
        </motion.div>
      </section>

      <LiveRsvpPanel />
    </>
  );
}
