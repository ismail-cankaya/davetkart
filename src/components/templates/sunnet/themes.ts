import { SectionTheme } from '../shared/palette';

/**
 * Sünnet Tema 1 — Klasik / Zarif
 * Derin lacivert zemin üzerine altın sarısı vurgular; klasik serif başlıklar.
 */
export const SUNNET_KLASIK: SectionTheme = {
  id: 'midnight',
  base: 'bg-[#0a1633]',
  page: 'text-blue-50',
  surface: 'bg-white/[0.05] backdrop-blur-md border border-amber-300/15',
  border: 'border-amber-300/25',
  heading: 'text-amber-200 font-serif',
  body: 'text-blue-200/70',
  accent: 'text-amber-300',
  accentBg: 'bg-amber-400',
  accentSoft: 'bg-amber-400/10',
  input:
    'w-full bg-white/[0.05] border border-amber-300/20 rounded-lg px-3.5 py-2.5 text-sm text-blue-50 placeholder:text-blue-200/40 focus:outline-none focus:border-amber-300/60 focus:ring-2 focus:ring-amber-300/15 transition-all duration-300',
  buttonPrimary:
    'bg-gradient-to-r from-amber-300 to-amber-500 hover:from-amber-200 hover:to-amber-400 text-[#0a1633] shadow-lg shadow-amber-500/25 hover:shadow-amber-400/40 hover:-translate-y-0.5 active:scale-[0.98] transition-all duration-300',
  buttonGhost:
    'border border-amber-300/40 text-amber-200 hover:bg-amber-300/10 hover:border-amber-300/60 transition-all duration-300',
  divider: 'bg-amber-300/15',
  timelineLine: 'from-amber-300 via-amber-400/40 to-transparent'
};

/**
 * Sünnet Tema 2 — Modern / Ferah
 * Turkuaz & gümüş; minimalist, bol boşluklu, yumuşak gradient zemin.
 */
export const SUNNET_MODERN: SectionTheme = {
  id: 'stone',
  base: 'bg-[#f2fbfb]',
  page: 'text-slate-700',
  surface: 'bg-white/70 backdrop-blur-xl border border-cyan-100 rounded-2xl shadow-sm shadow-cyan-100/50',
  border: 'border-cyan-200/70',
  heading: 'text-slate-800 tracking-tight',
  body: 'text-slate-500',
  accent: 'text-teal-600',
  accentBg: 'bg-teal-500',
  accentSoft: 'bg-teal-500/10',
  input:
    'w-full bg-white/80 border border-slate-200 rounded-xl px-4 py-3 text-sm text-slate-700 placeholder:text-slate-400 focus:outline-none focus:border-teal-400 focus:ring-2 focus:ring-teal-400/20 transition-all duration-300',
  buttonPrimary:
    'bg-gradient-to-r from-teal-500 to-cyan-500 hover:from-teal-400 hover:to-cyan-400 text-white shadow-lg shadow-teal-500/25 hover:shadow-teal-400/40 hover:-translate-y-0.5 active:scale-[0.98] rounded-xl transition-all duration-300',
  buttonGhost:
    'border border-slate-300 text-slate-600 hover:bg-white hover:border-teal-400 rounded-xl transition-all duration-300',
  divider: 'bg-slate-200/70',
  timelineLine: 'from-teal-400 via-cyan-400/50 to-transparent'
};
