import { SectionTheme } from '../shared/palette';

/**
 * Mezuniyet Tema 1 — Akademik
 * Lacivert cübbe & gold püskül; resmi serif başlıklar, vakur bir düzen.
 */
export const MEZUNIYET_AKADEMIK: SectionTheme = {
  id: 'midnight',
  base: 'bg-[#101f3e]',
  page: 'text-slate-100',
  surface: 'bg-[#0b1730]/70 backdrop-blur-md border border-yellow-500/15',
  border: 'border-yellow-500/25',
  heading: 'text-yellow-400/95 font-serif',
  body: 'text-slate-300/80',
  accent: 'text-yellow-400',
  accentBg: 'bg-yellow-500',
  accentSoft: 'bg-yellow-500/10',
  input:
    'w-full bg-[#0b1730]/60 border border-yellow-500/20 rounded-lg px-3.5 py-2.5 text-sm text-slate-100 placeholder:text-slate-400/60 focus:outline-none focus:border-yellow-400/60 focus:ring-2 focus:ring-yellow-400/15 transition-all duration-300',
  buttonPrimary:
    'bg-yellow-500 hover:bg-yellow-400 text-[#101f3e] font-semibold shadow-lg shadow-yellow-500/20 hover:shadow-yellow-400/35 hover:-translate-y-0.5 active:scale-[0.98] transition-all duration-300',
  buttonGhost:
    'border border-yellow-500/40 text-yellow-300 hover:bg-yellow-500/10 hover:border-yellow-400/60 transition-all duration-300',
  divider: 'bg-yellow-500/15',
  timelineLine: 'from-yellow-400 via-yellow-500/40 to-transparent'
};

/**
 * Mezuniyet Tema 2 — Dinamik
 * Siyah zemin üzerine fosforlu (lime) ince detaylar; asimetrik kesimler,
 * kalın modern sans-serif tipografi.
 */
export const MEZUNIYET_DINAMIK: SectionTheme = {
  id: 'midnight',
  base: 'bg-[#050505]',
  page: 'text-neutral-100',
  surface: 'bg-neutral-900/70 backdrop-blur-xl border border-lime-400/15 rounded-xl',
  border: 'border-lime-400/25',
  heading: 'text-white font-sans font-black tracking-tighter uppercase',
  body: 'text-neutral-400',
  accent: 'text-lime-400',
  accentBg: 'bg-lime-400',
  accentSoft: 'bg-lime-400/10',
  input:
    'w-full bg-neutral-950/60 border border-neutral-800 rounded-lg px-4 py-3 text-sm text-neutral-100 placeholder:text-neutral-500 focus:outline-none focus:border-lime-400 focus:ring-2 focus:ring-lime-400/20 transition-all duration-300',
  buttonPrimary:
    'bg-lime-400 hover:bg-lime-300 text-black font-bold uppercase tracking-wide shadow-lg shadow-lime-400/25 hover:shadow-lime-300/40 hover:-translate-y-0.5 active:scale-[0.98] transition-all duration-300',
  buttonGhost:
    'border border-lime-400/40 text-lime-300 hover:bg-lime-400/10 hover:border-lime-300/60 transition-all duration-300',
  divider: 'bg-lime-400/15',
  timelineLine: 'from-lime-400 via-lime-500/40 to-transparent'
};
