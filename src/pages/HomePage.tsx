import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'motion/react';
import { PenLine, ArrowRight } from 'lucide-react';
import { Hero } from '../components/home/Hero';
import { PreviewSection } from '../components/preview/PreviewSection';

const EASE_LUXE = [0.22, 1, 0.36, 1] as const;

const Features = React.lazy(() => import('../components/home/Features').then(m => ({ default: m.Features })));
const LiveRsvpPanel = React.lazy(() => import('../components/rsvp/LiveRsvpPanel').then(m => ({ default: m.LiveRsvpPanel })));
const Testimonials = React.lazy(() => import('../components/home/Testimonials').then(m => ({ default: m.Testimonials })));

/**
 * Showcase CTA right under the template/preview area: browsing is free-form
 * on the landing page, detailed editing lives in the /create studio.
 */
function CreateCtaBanner() {
  return (
    <section className="pb-16 md:pb-24 bg-cream">
      <motion.div
        initial={{ opacity: 0, y: 25 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.9, ease: EASE_LUXE }}
        className="max-w-3xl mx-auto px-4 text-center space-y-5"
      >
        <p className="text-muted text-sm md:text-base max-w-md mx-auto leading-relaxed">
          Beğendiğiniz şablonu seçtiniz mi? Tasarım stüdyosunda isimleri, tarihi ve davet
          mesajınızı ekleyerek davetiyenizi dakikalar içinde kişiselleştirin.
        </p>
        <Link
          to="/create"
          className="group relative overflow-hidden inline-flex items-center gap-3 bg-brand text-white px-10 py-5 rounded-full font-semibold text-sm md:text-base hover:bg-brand-soft transition-all duration-500 shadow-lg shadow-brand/20 hover:shadow-2xl hover:shadow-brand/30 hover:-translate-y-1"
        >
          <span className="absolute inset-0 animate-shimmer pointer-events-none" />
          <PenLine size={17} />
          Kendi Davetiyeni Oluştur
          <ArrowRight size={17} className="group-hover:translate-x-1.5 transition-transform duration-300" />
        </Link>
        <p className="text-muted text-[11px]">Giriş gerekmez · İlk davetiye %60 indirimli</p>
      </motion.div>
    </section>
  );
}

/**
 * Landing page: hero, the template showcase with the live phone preview
 * (shared PreviewSection — the same component the /create studio uses),
 * feature highlights and social proof. No editing tools here.
 */
export default function HomePage() {
  return (
    <>
      <Hero />
      <PreviewSection />
      <CreateCtaBanner />
      <React.Suspense
        fallback={
          <div className="py-20 flex justify-center items-center">
            <div className="w-8 h-8 border-4 border-brand border-t-transparent rounded-full animate-spin" />
          </div>
        }
      >
        <Features />
        {/* Vitrin: canlı katılım takibi — ziyaretçi önizlemedeki RSVP formuyla deneyebilir */}
        <LiveRsvpPanel />
        <Testimonials />
      </React.Suspense>
    </>
  );
}
