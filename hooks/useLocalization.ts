import { translations } from '../localization/translations';
import { Language } from '../types';

export const useLocalization = (lang: Language) => {
  const t = (key: string): string => {
    // Access the specific language translations for the given key
    const langTranslations = translations[key as keyof typeof translations];
    if (langTranslations) {
      // Return the translation for the current language, or fallback to English if not found
      return langTranslations[lang] || langTranslations[Language.ENGLISH];
    }
    // If the key doesn't exist at all, fallback to the key itself
    return key;
  };
  
  return { t };
};
