import React, { Suspense, useRef, useState } from 'react';
import { AnimatePresence } from 'motion/react';
import { Invitation } from '../../../types';
import { cn } from '../../../utils/cn';
import { getSectionTheme } from './palette';
import { TemplateFlavor } from './flavor';
import { Envelope } from './Envelope';
import { Summary } from './Summary';

// Below-the-fold sections stay lazy — the hero paints without them.
const Timeline = React.lazy(() => import('./Timeline').then((m) => ({ default: m.Timeline })));
const Details = React.lazy(() => import('./Details').then((m) => ({ default: m.Details })));
const Gallery = React.lazy(() => import('./Gallery').then((m) => ({ default: m.Gallery })));
const GiftRegistry = React.lazy(() => import('./GiftRegistry').then((m) => ({ default: m.GiftRegistry })));
const RSVPForm = React.lazy(() => import('./RSVPForm').then((m) => ({ default: m.RSVPForm })));

interface InvitationCompositionProps {
  invitation: Invitation;
  flavor: TemplateFlavor;
  mode: 'preview' | 'live';
}

/**
 * Composition root of the modular invitation. Reads the wizard's visibility
 * flags off the invitation and renders only the enabled modules, themed by
 * the invitation's palette and flavored by its category template.
 */
export function InvitationComposition({ invitation, flavor, mode }: InvitationCompositionProps) {
  const theme = getSectionTheme(invitation.palette);
  const [envelopeOpened, setEnvelopeOpened] = useState(false);
  const scrollRef = useRef<HTMLDivElement | null>(null);

  const envelopeVisible = invitation.showEnvelope && !envelopeOpened;

  const sectionFallback = (
    <div className={cn('w-full h-24 flex items-center justify-center', theme.page)}>
      <div className={cn('w-5 h-5 border-2 border-current border-t-transparent rounded-full animate-spin', theme.accent)} />
    </div>
  );

  return (
    <div data-mode={mode} className={cn('relative w-full h-full', theme.page)}>
      <AnimatePresence>
        {envelopeVisible && (
          <Envelope
            invitation={invitation}
            theme={theme}
            flavor={flavor}
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
        {/* Hero fills at least one "screen" of the scroll container and can
            grow with its content instead of overlapping the next section. */}
        <div className="min-h-full flex flex-col">
          <Summary invitation={invitation} theme={theme} flavor={flavor} />
        </div>

        <Suspense fallback={sectionFallback}>
          {invitation.showTimeline && (
            <Timeline invitation={invitation} theme={theme} flavor={flavor} scrollContainer={scrollRef} />
          )}

          <Details invitation={invitation} theme={theme} flavor={flavor} />

          {invitation.showGallery && <Gallery invitation={invitation} theme={theme} flavor={flavor} />}

          {invitation.showGift && <GiftRegistry invitation={invitation} theme={theme} flavor={flavor} />}

          {invitation.showRSVP && <RSVPForm invitation={invitation} theme={theme} flavor={flavor} />}
        </Suspense>

        {/* Footer signature */}
        <footer className={cn('py-8 text-center', theme.page)}>
          <p className={cn('text-[10px] font-medium tracking-[0.3em] uppercase opacity-60', theme.body)}>
            {invitation.names || 'DavetKart'}
          </p>
          <p className={cn('text-[9px] mt-1.5 opacity-40', theme.body)}>DavetKart ile hazırlandı</p>
        </footer>
      </div>
    </div>
  );
}
