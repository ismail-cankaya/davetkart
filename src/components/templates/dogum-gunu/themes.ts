import { SectionTheme } from '../shared/palette';

/**
 * Doğum Günü Tema 1 — Canlı / Eğlenceli
 * Pastel-canlı gradientler, tamamen yuvarlak hatlar, neşeli sıcak tonlar.
 */
export const DOGUM_GUNU_NESELI: SectionTheme = {
  id: 'stone',
  base: 'bg-[#fff7fa]',
  page: 'text-rose-950',
  surface: 'bg-white/80 backdrop-blur-md border border-rose-100 rounded-3xl shadow-sm shadow-rose-100/60',
  border: 'border-rose-200/80',
  heading: 'text-rose-950 tracking-tight',
  body: 'text-rose-950/60',
  accent: 'text-fuchsia-500',
  accentBg: 'bg-fuchsia-500',
  accentSoft: 'bg-fuchsia-500/10',
  input:
    'w-full bg-white border border-rose-200 rounded-2xl px-4 py-3 text-sm text-rose-950 placeholder:text-rose-300 focus:outline-none focus:border-fuchsia-400 focus:ring-2 focus:ring-fuchsia-400/20 transition-all duration-300',
  buttonPrimary:
    'bg-gradient-to-r from-fuchsia-500 via-rose-500 to-orange-400 hover:from-fuchsia-400 hover:via-rose-400 hover:to-orange-300 text-white shadow-lg shadow-rose-400/30 hover:shadow-rose-400/50 hover:-translate-y-0.5 active:scale-[0.97] rounded-full transition-all duration-300',
  buttonGhost:
    'border border-rose-300 text-rose-500 hover:bg-rose-50 hover:border-fuchsia-400 rounded-full transition-all duration-300',
  divider: 'bg-rose-100',
  timelineLine: 'from-fuchsia-400 via-orange-300/60 to-transparent'
};

/**
 * Doğum Günü Tema 2 — Yetişkin / Şık
 * Dark mode zemin, altın-neon vurgular ve glassmorphism yüzeyler.
 */
export const DOGUM_GUNU_SIK: SectionTheme = {
  id: 'midnight',
  base: 'bg-[#0c0c0f]',
  page: 'text-zinc-100',
  surface: 'bg-white/[0.04] backdrop-blur-2xl border border-white/10 rounded-2xl',
  border: 'border-white/10',
  heading: 'text-white tracking-tight',
  body: 'text-zinc-400',
  accent: 'text-amber-300',
  accentBg: 'bg-amber-400',
  accentSoft: 'bg-amber-400/10',
  input:
    'w-full bg-white/[0.04] border border-white/10 rounded-xl px-4 py-3 text-sm text-zinc-100 placeholder:text-zinc-500 focus:outline-none focus:border-amber-300/60 focus:ring-2 focus:ring-amber-300/15 transition-all duration-300',
  buttonPrimary:
    'bg-gradient-to-r from-amber-300 to-yellow-500 hover:from-amber-200 hover:to-yellow-400 text-black font-semibold shadow-lg shadow-amber-400/25 hover:shadow-amber-300/40 hover:-translate-y-0.5 active:scale-[0.98] rounded-xl transition-all duration-300',
  buttonGhost:
    'border border-white/15 text-zinc-200 hover:bg-white/5 hover:border-amber-300/40 rounded-xl transition-all duration-300',
  divider: 'bg-white/10',
  timelineLine: 'from-amber-300 via-amber-500/40 to-transparent'
};
