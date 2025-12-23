import { type LanguageType, translations } from "@/lib/translations";

export function useTranslation(lang: LanguageType) {
  const t = (key: string): string => {
    const langTranslations = translations[lang];
    return langTranslations?.[key] || key;
  };

  return { t, lang };
}
