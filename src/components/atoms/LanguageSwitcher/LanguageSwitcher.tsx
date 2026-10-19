import { cn } from 'cn';
import { useLanguage, type Language } from '@/context/LanguageContext';

const LANGUAGES: { code: Language; label: string }[] = [
  { code: 'en', label: 'EN' },
  { code: 'uk', label: 'UA' },
];

type LanguageSwitcherProps = {
  className?: string;
};

export function LanguageSwitcher({ className }: LanguageSwitcherProps) {
  const { language, setLanguage, t } = useLanguage();

  return (
    <div
      role="group"
      aria-label={t('language.label')}
      className={cn('flex items-center', className)}
    >
      {LANGUAGES.map(({ code, label }) => {
        const isActive = code === language;

        return (
          <button
            key={code}
            type="button"
            lang={code}
            aria-pressed={isActive}
            onClick={() => setLanguage(code)}
            className={cn(
              'h-8 cursor-pointer px-1.5 text-xs font-bold tracking-[0.04em] transition-colors',
              isActive ? 'text-text-primary' : (
                'text-icons hover:text-text-primary'
              ),
            )}
          >
            {label}
          </button>
        );
      })}
    </div>
  );
}
