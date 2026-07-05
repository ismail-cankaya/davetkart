import { SectionTheme } from '../shared/palette';
import { SADE_THEME, MANZARA_THEME, SEKILLI_THEME, MODERN_THEME } from '../shared/themeTokens';

export const NISAN_SADE: SectionTheme = {
  ...SADE_THEME,
  accent: 'text-rose-600',
  accentBg: 'bg-rose-600',
  accentSoft: 'bg-rose-600/10',
  buttonPrimary: 'bg-rose-700 hover:bg-rose-600 text-stone-50 shadow-lg shadow-rose-900/10',
  timelineLine: 'from-rose-600 via-rose-700/70 to-transparent',
  input: SADE_THEME.input.replace('focus:border-[#8f7355]', 'focus:border-rose-600').replace('focus:ring-[#8f7355]/20', 'focus:ring-rose-600/20')
};

export const NISAN_MANZARA: SectionTheme = {
  ...MANZARA_THEME,
  base: 'bg-[#191016]',
  accent: 'text-pink-300',
  accentBg: 'bg-pink-500',
  accentSoft: 'bg-pink-500/20',
  buttonPrimary: 'bg-pink-600 hover:bg-pink-500 text-white shadow-lg shadow-pink-600/20',
  timelineLine: 'from-pink-400 via-pink-600/50 to-transparent',
  input: MANZARA_THEME.input.replace('focus:border-emerald-400', 'focus:border-pink-400').replace('focus:ring-emerald-400/20', 'focus:ring-pink-400/20')
};

export const NISAN_SEKILLI: SectionTheme = {
  ...SEKILLI_THEME,
  base: 'bg-[#201a23]',
  buttonPrimary: 'bg-gradient-to-r from-pink-400 to-rose-600 hover:from-pink-300 hover:to-rose-500 text-stone-900 shadow-lg shadow-rose-500/20',
  timelineLine: 'from-pink-400 via-rose-600/50 to-transparent'
};

export const NISAN_MODERN: SectionTheme = {
  ...MODERN_THEME,
  accent: 'text-pink-400',
  accentBg: 'bg-pink-500',
  accentSoft: 'bg-pink-500/10',
  buttonPrimary: 'bg-rose-600 hover:bg-rose-500 text-white shadow-lg shadow-rose-600/20 rounded-xl',
  timelineLine: 'from-pink-500 via-rose-500/50 to-transparent',
  input: MODERN_THEME.input.replace('focus:border-indigo-500', 'focus:border-pink-500').replace('focus:ring-indigo-500/20', 'focus:ring-pink-500/20')
};
