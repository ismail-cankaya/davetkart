import { SectionTheme } from '../shared/palette';

/**
 * Baby Shower Tema 1 — Yumuşak Pastel
 * Pudra pembesi & bebek mavisi; el yazısı (italik serif) dokunuşları,
 * çok yumuşak gölgeler.
 */
export const BABY_SHOWER_PASTEL: SectionTheme = {
  id: 'stone',
  base: 'bg-[#fdf6f8]',
  page: 'text-[#5f4b56]',
  surface: 'bg-white/75 backdrop-blur-md border border-rose-100 rounded-[2rem] shadow-md shadow-rose-100/40',
  border: 'border-rose-100',
  heading: 'text-[#8a5a6d] font-serif italic',
  body: 'text-[#a08894]',
  accent: 'text-rose-400',
  accentBg: 'bg-rose-300',
  accentSoft: 'bg-rose-300/15',
  input:
    'w-full bg-white border border-rose-100 rounded-2xl px-4 py-3 text-sm text-[#5f4b56] placeholder:text-rose-200 focus:outline-none focus:border-rose-300 focus:ring-2 focus:ring-rose-200/40 transition-all duration-300',
  buttonPrimary:
    'bg-rose-300 hover:bg-rose-400 text-white shadow-lg shadow-rose-200/60 hover:shadow-rose-300/60 hover:-translate-y-0.5 active:scale-[0.98] rounded-full transition-all duration-300',
  buttonGhost:
    'border border-sky-200 text-sky-500 hover:bg-sky-50 hover:border-sky-300 rounded-full transition-all duration-300',
  divider: 'bg-rose-100',
  timelineLine: 'from-rose-300 via-sky-200/70 to-transparent'
};

/**
 * Baby Shower Tema 2 — Boho / Nötr
 * Bej & toprak tonları; minimalist, ince sans-serif tipografi.
 */
export const BABY_SHOWER_BOHO: SectionTheme = {
  id: 'stone',
  base: 'bg-[#f6f1e8]',
  page: 'text-stone-700',
  surface: 'bg-[#fdfaf4]/90 backdrop-blur-sm border border-[#e7dcc9] rounded-xl',
  border: 'border-[#e7dcc9]',
  heading: 'text-[#7a5c3e] font-light tracking-[0.08em]',
  body: 'text-stone-500 font-light',
  accent: 'text-[#a1714b]',
  accentBg: 'bg-[#b08d63]',
  accentSoft: 'bg-[#b08d63]/10',
  input:
    'w-full bg-[#fdfaf4] border border-[#e7dcc9] rounded-lg px-3.5 py-2.5 text-sm text-stone-700 placeholder:text-stone-400 focus:outline-none focus:border-[#b08d63] focus:ring-2 focus:ring-[#b08d63]/15 transition-all duration-300',
  buttonPrimary:
    'bg-[#b08d63] hover:bg-[#9a7952] text-[#fdfaf4] tracking-wide shadow-lg shadow-[#b08d63]/20 hover:shadow-[#9a7952]/30 hover:-translate-y-0.5 active:scale-[0.98] transition-all duration-300',
  buttonGhost:
    'border border-[#d3c3a8] text-[#8a6b48] hover:bg-[#efe7d8] hover:border-[#b08d63] transition-all duration-300',
  divider: 'bg-[#e7dcc9]',
  timelineLine: 'from-[#b08d63] via-[#d3c3a8]/70 to-transparent'
};
