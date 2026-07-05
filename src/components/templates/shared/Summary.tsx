import React, { useEffect, useMemo, useState } from 'react';
import { motion } from 'motion/react';
import { Invitation } from '../../../types';
import { cn } from '../../../utils/cn';
import { formatDateStr } from '../utils';
import { SectionTheme, EASE_LUXE } from './palette';
import { TemplateFlavor } from './flavor';
import { ChevronDownIcon } from './icons';

interface SummaryProps {
  invitation: Invitation;
  theme: SectionTheme;
  flavor: TemplateFlavor;
}

/** Remaining time to the event, recomputed every second. */
function useCountdown(targetDate: string) {
  const target = useMemo(() => new Date(targetDate).getTime(), [targetDate]);
  const [now, setNow] = useState(() => Date.now());

  useEffect(() => {
    const timer = window.setInterval(() => setNow(Date.now()), 1000);
    return () => window.clearInterval(timer);
  }, []);

  const diff = Math.max(0, target - now);
  return {
    valid: !Number.isNaN(target),
    days: Math.floor(diff / 86_400_000),
    hours: Math.floor(diff / 3_600_000) % 24,
    minutes: Math.floor(diff / 60_000) % 60,
    seconds: Math.floor(diff / 1000) % 60
  };
}

function CountdownTile({ value, label, theme }: { value: number; label: string; theme: SectionTheme }) {
  return (
    <div
      className={cn(
        'flex flex-col items-center justify-center rounded-xl border px-2 py-3 w-[68px]',
        theme.surface,
        theme.border
      )}
    >
      <span className={cn('font-serif text-2xl font-bold tabular-nums leading-none', theme.heading)}>
        {String(value).padStart(2, '0')}
      </span>
      <span className={cn('text-[9px] font-semibold tracking-[0.2em] uppercase mt-1.5', theme.body)}>
        {label}
      </span>
    </div>
  );
}

function Countdown({ date, theme }: { date: string; theme: SectionTheme }) {
  const { valid, days, hours, minutes, seconds } = useCountdown(date);
  if (!valid) return null;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.9, ease: EASE_LUXE, delay: 1.6 }}
      className="flex items-center justify-center gap-2.5"
    >
      <CountdownTile value={days} label="Gün" theme={theme} />
      <CountdownTile value={hours} label="Saat" theme={theme} />
      <CountdownTile value={minutes} label="Dakika" theme={theme} />
      <CountdownTile value={seconds} label="Saniye" theme={theme} />
    </motion.div>
  );
}

/**
 * Hero section — Magic UI aesthetic: names materialize word by word over a
 * soft radial glow and a faint grid, followed by the message, the date and
 * (optionally) the live countdown.
 */
export function Summary({ invitation, theme, flavor }: SummaryProps) {
  const isDark = theme.id === 'midnight';
  const { Ornament } = flavor;
  const nameWords = (invitation.names || 'Davetlisiniz').split(' ');

  return (
    <section className={cn('relative flex-1 flex flex-col items-center justify-center overflow-hidden px-6 py-16', theme.page)}>
      {/* Faint grid backdrop */}
      <div
        className="absolute inset-0 pointer-events-none opacity-[0.35]"
        style={{
          backgroundImage: `linear-gradient(${isDark ? 'rgba(148,163,184,0.07)' : 'rgba(120,113,108,0.09)'} 1px, transparent 1px), linear-gradient(90deg, ${isDark ? 'rgba(148,163,184,0.07)' : 'rgba(120,113,108,0.09)'} 1px, transparent 1px)`,
          backgroundSize: '44px 44px',
          maskImage: 'radial-gradient(ellipse 70% 60% at 50% 45%, black 30%, transparent 100%)',
          WebkitMaskImage: 'radial-gradient(ellipse 70% 60% at 50% 45%, black 30%, transparent 100%)'
        }}
      />
      {/* Radial glow */}
      <div
        className={cn(
          'absolute top-[12%] left-1/2 -translate-x-1/2 w-[480px] h-[480px] rounded-full blur-3xl pointer-events-none',
          isDark ? 'bg-amber-300/[0.07]' : 'bg-rose-200/40'
        )}
      />

      <div className="relative z-10 flex flex-col items-center text-center max-w-md gap-6">
        {/* Ornament */}
        <motion.div
          initial={{ opacity: 0, scale: 0.6, rotate: -12 }}
          animate={{ opacity: 1, scale: 1, rotate: 0 }}
          transition={{ duration: 1, ease: EASE_LUXE }}
          className={theme.accent}
        >
          <Ornament size={44} />
        </motion.div>

        {/* Eyebrow */}
        <motion.span
          initial={{ opacity: 0, letterSpacing: '0.1em' }}
          animate={{ opacity: 1, letterSpacing: '0.35em' }}
          transition={{ duration: 1.2, ease: EASE_LUXE, delay: 0.3 }}
          className={cn('text-[10px] font-semibold uppercase', theme.accent)}
        >
          {invitation.title}
        </motion.span>

        {/* Names — staggered word reveal */}
        <h1 className={cn('font-serif text-4xl md:text-5xl font-bold leading-tight', theme.heading)}>
          {nameWords.map((word, i) => (
            <motion.span
              key={`${word}-${i}`}
              className="inline-block mr-[0.28em] last:mr-0"
              initial={{ opacity: 0, y: 26, filter: 'blur(8px)' }}
              animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
              transition={{ duration: 0.9, ease: EASE_LUXE, delay: 0.5 + i * 0.14 }}
            >
              {word === '&' ? <span className={cn('italic font-medium', theme.accent)}>&amp;</span> : word}
            </motion.span>
          ))}
        </h1>

        {/* Divider */}
        <motion.div
          initial={{ scaleX: 0 }}
          animate={{ scaleX: 1 }}
          transition={{ duration: 1.1, ease: EASE_LUXE, delay: 1 }}
          className={cn(
            'h-px w-40',
            isDark
              ? 'bg-gradient-to-r from-transparent via-amber-200/70 to-transparent'
              : 'bg-gradient-to-r from-transparent via-stone-400 to-transparent'
          )}
        />

        {/* Message */}
        <motion.p
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, ease: EASE_LUXE, delay: 1.2 }}
          className={cn('text-sm leading-relaxed font-light max-w-xs', theme.body)}
        >
          {invitation.subtitle}
        </motion.p>

        {/* Date & venue line */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, ease: EASE_LUXE, delay: 1.4 }}
          className="flex flex-col items-center gap-1"
        >
          <span className={cn('font-serif italic text-lg', theme.heading)}>{formatDateStr(invitation.date)}</span>
          <span className={cn('text-[11px] font-medium tracking-[0.15em] uppercase', theme.body)}>
            {invitation.venue}
          </span>
        </motion.div>

        {invitation.showTimer && <Countdown date={invitation.date} theme={theme} />}
      </div>

      {/* Scroll hint */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1, y: [0, 6, 0] }}
        transition={{ opacity: { delay: 2.2, duration: 0.8 }, y: { duration: 1.6, repeat: Infinity, ease: 'easeInOut' } }}
        className={cn('absolute bottom-6 left-1/2 -translate-x-1/2', theme.body)}
      >
        <ChevronDownIcon size={20} />
      </motion.div>
    </section>
  );
}
