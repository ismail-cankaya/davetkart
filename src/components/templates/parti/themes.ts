import { SectionTheme } from '../shared/palette';

/**
 * Parti Tema 1 — Neon Gece
 * Koyu zemin üzerinde cyan-pembe neon glow; kulüp ışıkları atmosferi.
 */
export const PARTI_NEON: SectionTheme = {
  id: 'midnight',
  base: 'bg-[#07070f]',
  page: 'text-slate-100',
  surface: 'bg-white/[0.04] backdrop-blur-xl border border-cyan-400/15 rounded-2xl',
  border: 'border-cyan-400/25',
  heading: 'text-white tracking-tight drop-shadow-[0_0_14px_rgba(34,211,238,0.35)]',
  body: 'text-slate-400',
  accent: 'text-cyan-300',
  accentBg: 'bg-cyan-400',
  accentSoft: 'bg-cyan-400/10',
  input:
    'w-full bg-white/[0.04] border border-white/10 rounded-xl px-4 py-3 text-sm text-slate-100 placeholder:text-slate-500 focus:outline-none focus:border-cyan-400/70 focus:ring-2 focus:ring-cyan-400/20 transition-all duration-300',
  buttonPrimary:
    'bg-gradient-to-r from-cyan-400 to-fuchsia-500 hover:from-cyan-300 hover:to-fuchsia-400 text-white font-semibold shadow-lg shadow-fuchsia-500/30 hover:shadow-cyan-400/40 hover:-translate-y-0.5 active:scale-[0.98] rounded-xl transition-all duration-300',
  buttonGhost:
    'border border-cyan-400/40 text-cyan-300 hover:bg-cyan-400/10 hover:border-cyan-300/60 rounded-xl transition-all duration-300',
  divider: 'bg-white/10',
  timelineLine: 'from-cyan-400 via-fuchsia-500/50 to-transparent'
};

/**
 * Parti Tema 2 — Gala / Glamour
 * Siyah & metalik gold; son derece lüks, sade ve keskin bir görünüm.
 */
export const PARTI_GALA: SectionTheme = {
  id: 'midnight',
  base: 'bg-[#0a0a0a]',
  page: 'text-neutral-200',
  surface: 'bg-white/[0.03] backdrop-blur-sm border border-[#d4af37]/20',
  border: 'border-[#d4af37]/30',
  heading: 'text-[#e8cf7a] font-serif tracking-wide',
  body: 'text-neutral-400',
  accent: 'text-[#d4af37]',
  accentBg: 'bg-[#d4af37]',
  accentSoft: 'bg-[#d4af37]/10',
  input:
    'w-full bg-white/[0.03] border border-[#d4af37]/25 rounded-lg px-3.5 py-2.5 text-sm text-neutral-200 placeholder:text-neutral-500 focus:outline-none focus:border-[#d4af37]/70 focus:ring-2 focus:ring-[#d4af37]/15 transition-all duration-300',
  buttonPrimary:
    'bg-[#d4af37] hover:bg-[#e3c35a] text-black font-semibold tracking-wide shadow-lg shadow-[#d4af37]/20 hover:shadow-[#e3c35a]/35 hover:-translate-y-0.5 active:scale-[0.98] transition-all duration-300',
  buttonGhost:
    'border border-[#d4af37]/40 text-[#d4af37] hover:bg-[#d4af37]/10 hover:border-[#d4af37]/70 transition-all duration-300',
  divider: 'bg-[#d4af37]/20',
  timelineLine: 'from-[#d4af37] via-[#d4af37]/40 to-transparent'
};
