import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from 'react';
import {
  en,
  type PluralForms,
  type TranslationKey,
  type Translations,
} from '@/i18n/en';
import { uk } from '@/i18n/uk';

export type Language = 'en' | 'uk';

type TranslateParams = Record<string, string | number>;

type LanguageContextType = {
  language: Language;
  setLanguage: (language: Language) => void;
  t: (key: TranslationKey, params?: TranslateParams) => string;
};

const DICTIONARIES: Record<Language, Translations> = { en, uk };
const STORAGE_KEY = 'language';

function getInitialLanguage(): Language {
  const saved = localStorage.getItem(STORAGE_KEY);

  if (saved === 'en' || saved === 'uk') {
    return saved;
  }

  return navigator.language.startsWith('uk') ? 'uk' : 'en';
}

function interpolate(text: string, params?: TranslateParams): string {
  if (!params) {
    return text;
  }

  return text.replace(/\{(\w+)\}/g, (match, name: string) =>
    name in params ? String(params[name]) : match,
  );
}

const LanguageContext = createContext<LanguageContextType | undefined>(
  undefined,
);

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [language, setLanguage] = useState<Language>(getInitialLanguage);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, language);
    document.documentElement.lang = language;
  }, [language]);

  const t = useCallback(
    (key: TranslationKey, params?: TranslateParams) => {
      const value = DICTIONARIES[language][key];

      if (typeof value === 'string') {
        return interpolate(value, params);
      }

      const count = Number(params?.count ?? 0);
      const form = new Intl.PluralRules(language).select(count);
      const text = value[form as keyof PluralForms] ?? value.other;

      return interpolate(text, params);
    },
    [language],
  );

  const contextValue = useMemo(
    () => ({ language, setLanguage, t }),
    [language, t],
  );

  return (
    <LanguageContext.Provider value={contextValue}>
      {children}
    </LanguageContext.Provider>
  );
}
// eslint-disable-next-line react-refresh/only-export-components
export function useLanguage() {
  const context = useContext(LanguageContext);

  if (!context) {
    throw new Error('useLanguage must be used inside LanguageProvider');
  }

  return context;
}
