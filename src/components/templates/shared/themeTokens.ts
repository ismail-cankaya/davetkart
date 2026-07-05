import { SectionTheme } from './palette';

/**
 * 1. Sade (Krem/Pastel tonları, zarif minimalist tipografi)
 */
export const SADE_THEME: SectionTheme = {
  id: 'stone',
  base: 'bg-[#faf8f3]',
  page: 'text-stone-800',
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

/**
 * 2. Manzara (Doğa/Deniz görselleri içeren yüksek kaliteli arka planlar)
 * Yarı saydam siyah yüzeyler ile metin kontrastı korunur.
 */
export const MANZARA_THEME: SectionTheme = {
  id: 'midnight',
  base: 'bg-slate-950',
  page: 'text-slate-100',
  surface: 'bg-black/60 backdrop-blur-md',
  border: 'border-white/10',
  heading: 'text-white drop-shadow-md',
  body: 'text-slate-200',
  accent: 'text-emerald-300',
  accentBg: 'bg-emerald-500',
  accentSoft: 'bg-emerald-500/20',
  input:
    'w-full bg-black/40 border border-white/20 rounded-lg px-3.5 py-2.5 text-sm text-slate-100 placeholder:text-slate-400 focus:outline-none focus:border-emerald-400 focus:ring-2 focus:ring-emerald-400/20 transition-all duration-300',
  buttonPrimary:
    'bg-emerald-500 hover:bg-emerald-400 text-white shadow-lg shadow-emerald-500/20',
  buttonGhost:
    'border border-white/30 text-white hover:bg-white/10',
  divider: 'bg-white/20',
  timelineLine: 'from-emerald-400 via-emerald-500/50 to-transparent'
};

/**
 * 3. Şekilli (Geometrik veya yaldızlı desenler)
 */
export const SEKILLI_THEME: SectionTheme = {
  id: 'midnight',
  base: 'bg-[#1a1c23]',
  page: 'text-amber-50',
  surface: 'bg-[#2a2c35]/80 backdrop-blur-sm border-amber-500/20 border', 
  border: 'border-amber-500/30',
  heading: 'text-amber-400',
  body: 'text-amber-100/70',
  accent: 'text-amber-300',
  accentBg: 'bg-amber-500',
  accentSoft: 'bg-amber-500/10',
  input:
    'w-full bg-[#1a1c23]/50 border border-amber-500/30 rounded-lg px-3.5 py-2.5 text-sm text-amber-50 placeholder:text-amber-100/40 focus:outline-none focus:border-amber-400 focus:ring-2 focus:ring-amber-400/20 transition-all duration-300',
  buttonPrimary:
    'bg-gradient-to-r from-amber-400 to-amber-600 hover:from-amber-300 hover:to-amber-500 text-stone-900 shadow-lg shadow-amber-500/20',
  buttonGhost:
    'border border-amber-500/50 text-amber-400 hover:bg-amber-500/10',
  divider: 'bg-amber-500/20',
  timelineLine: 'from-amber-400 via-amber-600/50 to-transparent'
};

/**
 * 4. Modern (Dinamik yerleşimler veya hareketli GIF/Video arka planları)
 */
export const MODERN_THEME: SectionTheme = {
  id: 'midnight',
  base: 'bg-zinc-950',
  page: 'text-zinc-100',
  surface: 'bg-zinc-900/70 backdrop-blur-xl border border-white/5 rounded-2xl',
  border: 'border-white/10',
  heading: 'text-white tracking-tight',
  body: 'text-zinc-400',
  accent: 'text-indigo-400',
  accentBg: 'bg-indigo-500',
  accentSoft: 'bg-indigo-500/10',
  input:
    'w-full bg-zinc-950/50 border border-white/10 rounded-xl px-4 py-3 text-sm text-zinc-100 placeholder:text-zinc-500 focus:outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/20 transition-all duration-300',
  buttonPrimary:
    'bg-indigo-600 hover:bg-indigo-500 text-white shadow-lg shadow-indigo-600/20 rounded-xl',
  buttonGhost:
    'border border-white/10 text-zinc-300 hover:bg-white/5 rounded-xl',
  divider: 'bg-white/5',
  timelineLine: 'from-indigo-500 via-purple-500/50 to-transparent'
};
