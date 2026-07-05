import React, { Suspense, useRef, useState } from 'react';
import { AnimatePresence, motion } from 'motion/react';
import { cn } from '../../../utils/cn';
import { useInvitationStore } from '../../../stores/useInvitationStore';
import { Envelope, Summary } from '../shared';
import { SectionTheme, EASE_LUXE } from '../shared/palette';
import { TemplateFlavor } from '../shared/flavor';
import './theme1.css';

// Below-the-fold sections stay lazy — the hero paints without them.
const Timeline = React.lazy(() => import('../shared/Timeline').then((m) => ({ default: m.Timeline })));
const Details = React.lazy(() => import('../shared/Details').then((m) => ({ default: m.Details })));
const Gallery = React.lazy(() => import('../shared/Gallery').then((m) => ({ default: m.Gallery })));
const GiftRegistry = React.lazy(() => import('../shared/GiftRegistry').then((m) => ({ default: m.GiftRegistry })));
const RSVPForm = React.lazy(() => import('../shared/RSVPForm').then((m) => ({ default: m.RSVPForm })));

/**
 * "Sade" tema tokenları — sıcak fildişi zemin üzerine taş grisi tipografi ve
 * yumuşak bronz vurgu. Yarı saydam `backdrop-blur` yüzeyler, desenli arka
 * planlarda dahi metin kontrastını korur (okunabilirlik kuralı).
 */
const SADE_THEME: SectionTheme = {
  id: 'stone',
  page: 'bg-[#faf8f3] text-stone-800',
  surface: 'bg-white/60 backdrop-blur-md',
  border: 'border-stone-200/90',
  heading: 'text-stone-900',
  body: 'text-stone-500',
  accent: 'text-[#8f7355]',
  accentBg: 'bg-[#8f7355]',
  accentSoft: 'bg-[#8f7355]/10',
  input:
    'w-full bg-white/80 border border-stone-200 rounded-lg px-3.5 py-2.5 text-sm text-stone-800 placeholder:text-stone-400 focus:outline-none focus:border-[#8f7355] focus:ring-2 focus:ring-[#8f7355]/20 transition-all duration-300',
  buttonPrimary:
    'bg-stone-900 hover:bg-stone-700 text-stone-50 shadow-lg shadow-stone-900/10',
  buttonGhost:
    'border border-stone-300 text-stone-600 hover:bg-stone-100/80 hover:border-stone-400',
  divider: 'bg-stone-200/80',
  timelineLine: 'from-[#8f7355] via-[#c9b8a3]/70 to-transparent'
};

/** İnce hatlı alyanslar ve üzerlerinde minimal bir defne dalı. */
function SadeRingsOrnament({ size = 48, className }: { size?: number; className?: string }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 48 48"
      fill="none"
      stroke="currentColor"
      strokeWidth={1.25}
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      aria-hidden="true"
    >
      {/* Defne dalı */}
      <path d="M14 12c3.2 1.6 6.6 2.4 10 2.4S30.8 13.6 34 12" opacity="0.8" />
      <path d="M17 12.9c0-1.8 1-3.4 2.6-4.2 0.4 1.8-0.4 3.6-2 4.6M24 14.2c-0.5-1.7 0-3.6 1.4-4.8 0.9 1.6 0.6 3.6-0.7 5M31 12.9c0-1.8-1-3.4-2.6-4.2-0.4 1.8 0.4 3.6 2 4.6" opacity="0.6" />
      {/* İç içe geçmiş alyanslar */}
      <circle cx="19.5" cy="28" r="9.5" />
      <circle cx="28.5" cy="28" r="9.5" opacity="0.5" />
    </svg>
  );
}

/** Sade düğün kişiliği: minimal alyans süslemesi ve törensel metinler. */
const SADE_FLAVOR: TemplateFlavor = {
  categoryId: 'dugun',
  Ornament: SadeRingsOrnament,
  envelopeLabel: 'Düğün Davetiyesi',
  tagline: 'Sade bir başlangıç, ömürlük bir söz',
  headings: {
    timeline: 'Düğün Günü Akışı',
    details: 'Törenimize Bekleriz',
    gallery: 'Hikayemizden Kareler',
    gift: 'Hediye Takdiriniz İçin',
    rsvp: 'Bizimle misiniz?'
  }
};

/** "Elif & Kerem" → "E & K"; tek isim ya da boş değerde yalın bir "&". */
function coupleInitials(names: string): string {
  const initials = names
    .split('&')
    .map((part) => part.trim().charAt(0).toLocaleUpperCase('tr-TR'))
    .filter(Boolean);
  return initials.length >= 2 ? `${initials[0]} & ${initials[1]}` : '&';
}

/** Bölümler arası kaligrafik ayraç — iki taş rengi çizgi arasında el yazısı. */
function ScriptDivider({ text }: { text: string }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.6 }}
      transition={{ duration: 1, ease: EASE_LUXE }}
      className={cn('flex items-center justify-center gap-5 px-10 py-4', SADE_THEME.page)}
    >
      <span className="h-px flex-1 max-w-24 bg-gradient-to-r from-transparent to-stone-300" />
      <span className="theme1-script text-2xl text-[#8f7355] leading-none whitespace-nowrap">{text}</span>
      <span className="h-px flex-1 max-w-24 bg-gradient-to-l from-transparent to-stone-300" />
    </motion.div>
  );
}

interface Theme1Props {
  /** Sihirbazdaki cihaz çerçevesinde `preview`, /invite/:id sayfasında `live`. */
  mode?: 'preview' | 'live';
}

/**
 * Düğün / Tema 1 — "Sade".
 *
 * Minimalist, tipografi odaklı fildişi-taş düğün teması. Davetiye verisini
 * prop zinciri yerine doğrudan `useInvitationStore`'dan okur; RSVP tarafı
 * `RSVPForm` içinde `useRsvpStore`'a bağlıdır. Modüler bölümler (Envelope,
 * Summary, Timeline, Details, Gallery, GiftRegistry, RSVPForm) sihirbazın
 * görünürlük bayraklarına göre koşullu render edilir ve tüm renk/buton/font
 * kimliğini `SADE_THEME` token setinden alır.
 */
export function Theme1({ mode = 'preview' }: Theme1Props) {
  const invitation = useInvitationStore((s) => s.invitation);
  const [envelopeOpened, setEnvelopeOpened] = useState(false);
  const scrollRef = useRef<HTMLDivElement | null>(null);

  const envelopeVisible = invitation.showEnvelope && !envelopeOpened;

  const sectionFallback = (
    <div className={cn('w-full h-24 flex items-center justify-center', SADE_THEME.page)}>
      <div className={cn('w-5 h-5 border-2 border-current border-t-transparent rounded-full animate-spin', SADE_THEME.accent)} />
    </div>
  );

  return (
    <div data-mode={mode} className={cn('relative w-full h-full', SADE_THEME.page)}>
      <AnimatePresence>
        {envelopeVisible && (
          <Envelope
            invitation={invitation}
            theme={SADE_THEME}
            flavor={SADE_FLAVOR}
            onOpened={() => setEnvelopeOpened(true)}
          />
        )}
      </AnimatePresence>

      <div
        ref={scrollRef}
        data-lenis-prevent
        className={cn(
          'w-full h-full overflow-x-hidden',
          envelopeVisible ? 'overflow-y-hidden' : 'overflow-y-auto'
        )}
      >
        {/* Hero, kaydırma kapsayıcısının en az bir ekranını doldurur. */}
        <div className="min-h-full flex flex-col">
          <Summary invitation={invitation} theme={SADE_THEME} flavor={SADE_FLAVOR} />
        </div>

        <ScriptDivider text={coupleInitials(invitation.names)} />

        <Suspense fallback={sectionFallback}>
          {invitation.showTimeline && (
            <Timeline invitation={invitation} theme={SADE_THEME} flavor={SADE_FLAVOR} scrollContainer={scrollRef} />
          )}

          <Details invitation={invitation} theme={SADE_THEME} flavor={SADE_FLAVOR} />

          {invitation.showGallery && (
            <Gallery invitation={invitation} theme={SADE_THEME} flavor={SADE_FLAVOR} />
          )}

          {invitation.showGift && (
            <GiftRegistry invitation={invitation} theme={SADE_THEME} flavor={SADE_FLAVOR} />
          )}

          {invitation.showRSVP && (
            <>
              <ScriptDivider text="mutluluğumuza ortak olun" />
              <RSVPForm invitation={invitation} theme={SADE_THEME} flavor={SADE_FLAVOR} />
            </>
          )}
        </Suspense>

        {/* İmza — çiftin adı el yazısıyla kapanışı yapar. */}
        <footer className={cn('pt-6 pb-10 text-center', SADE_THEME.page)}>
          <p className="theme1-script text-3xl text-stone-700">{invitation.names || 'Davetlisiniz'}</p>
          <p className={cn('text-[9px] mt-3 tracking-[0.3em] uppercase opacity-50', SADE_THEME.body)}>
            DavetKart ile hazırlandı
          </p>
        </footer>
      </div>
    </div>
  );
}
