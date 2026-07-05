import { SectionTheme } from '../shared/palette';
import { SADE_THEME, MANZARA_THEME, SEKILLI_THEME, MODERN_THEME } from '../shared/themeTokens';

export const KINA_SADE: SectionTheme = {
  ...SADE_THEME,
  accent: 'text-red-800',
  accentBg: 'bg-red-800',
  accentSoft: 'bg-red-800/10',
  buttonPrimary: 'bg-red-900 hover:bg-red-800 text-stone-50 shadow-lg shadow-red-900/10',
  timelineLine: 'from-red-800 via-red-900/70 to-transparent',
  input: SADE_THEME.input.replace('focus:border-[#8f7355]', 'focus:border-red-800').replace('focus:ring-[#8f7355]/20', 'focus:ring-red-800/20')
};

export const KINA_MANZARA: SectionTheme = {
  ...MANZARA_THEME,
  base: 'bg-[#1f0b0d]',
  accent: 'text-red-400',
  accentBg: 'bg-red-600',
  accentSoft: 'bg-red-600/20',
  buttonPrimary: 'bg-red-700 hover:bg-red-600 text-white shadow-lg shadow-red-700/20',
  timelineLine: 'from-red-500 via-red-700/50 to-transparent',
  input: MANZARA_THEME.input.replace('focus:border-emerald-400', 'focus:border-red-500').replace('focus:ring-emerald-400/20', 'focus:ring-red-500/20')
};

export const KINA_SEKILLI: SectionTheme = {
  ...SEKILLI_THEME,
  base: 'bg-[#2a1315]',
  page: 'text-amber-50',
  buttonPrimary: 'bg-gradient-to-r from-red-600 to-red-800 hover:from-red-500 hover:to-red-700 text-amber-50 shadow-lg shadow-red-800/20',
  timelineLine: 'from-red-500 via-red-700/50 to-transparent'
};

export const KINA_MODERN: SectionTheme = {
  ...MODERN_THEME,
  accent: 'text-red-400',
  accentBg: 'bg-red-500',
  accentSoft: 'bg-red-500/10',
  buttonPrimary: 'bg-red-700 hover:bg-red-600 text-white shadow-lg shadow-red-700/20 rounded-xl',
  timelineLine: 'from-red-500 via-orange-500/50 to-transparent',
  input: MODERN_THEME.input.replace('focus:border-indigo-500', 'focus:border-red-500').replace('focus:ring-indigo-500/20', 'focus:ring-red-500/20')
};
