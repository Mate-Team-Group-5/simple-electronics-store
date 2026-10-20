import { Heart, History, Zap } from 'lucide-react';
import { cn } from 'cn';
import { useLanguage } from '@/context/LanguageContext';
import type { TranslationKey } from '@/i18n/en';

const BENEFITS: {
  icon: typeof Heart;
  titleKey: TranslationKey;
  textKey: TranslationKey;
}[] = [
  {
    icon: Heart,
    titleKey: 'auth.benefits.syncTitle',
    textKey: 'auth.benefits.syncText',
  },
  {
    icon: Zap,
    titleKey: 'auth.benefits.fastTitle',
    textKey: 'auth.benefits.fastText',
  },
  {
    icon: History,
    titleKey: 'auth.benefits.historyTitle',
    textKey: 'auth.benefits.historyText',
  },
];

type AuthBenefitsProps = {
  className?: string;
};

export function AuthBenefits({ className }: AuthBenefitsProps) {
  const { t } = useLanguage();

  return (
    <section className={cn('flex flex-col gap-6', className)}>
      <h2 className="text-xl font-bold text-primary">
        {t('auth.benefits.title')}
      </h2>

      <ul className="flex flex-col gap-6">
        {BENEFITS.map(({ icon: Icon, titleKey, textKey }) => (
          <li
            key={titleKey}
            className="flex gap-4"
          >
            <span className="flex size-10 shrink-0 items-center justify-center bg-main-beak text-accent-purple">
              <Icon
                size={20}
                aria-hidden="true"
              />
            </span>

            <div className="flex flex-col gap-1">
              <h3 className="text-sm font-semibold text-primary">
                {t(titleKey)}
              </h3>
              <p className="text-sm text-secondary">{t(textKey)}</p>
            </div>
          </li>
        ))}
      </ul>
    </section>
  );
}
