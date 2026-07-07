import { useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { getLanguageDirection } from '../i18n';

/**
 * Keeps <html dir> and <html lang> in sync with the active i18next language,
 * flipping the whole document to RTL for Arabic. Tailwind's logical utilities
 * (ms-/me-/ps-/pe-/start-/end-) pick the new direction up automatically.
 */
export function useDocumentDirection(): void {
  const { i18n } = useTranslation();
  const language = i18n.resolvedLanguage ?? i18n.language;

  useEffect(() => {
    const root = document.documentElement;
    root.dir = getLanguageDirection(language);
    root.lang = language;
  }, [language]);
}
