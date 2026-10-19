import { cn } from 'cn';
import { useLanguage } from '@/context/LanguageContext';
import type { TranslationKey } from '@/i18n/en';
import {
  getPasswordStrength,
  type PasswordStrength as Strength,
} from '@/utils/getPasswordStrength';

const STRENGTH_CONFIG: Record<
  Strength,
  { bars: number; color: string; labelKey: TranslationKey }
> = {
  weak: { bars: 1, color: 'bg-red', labelKey: 'auth.strength.weak' },
  medium: { bars: 2, color: 'bg-[#f2c94c]', labelKey: 'auth.strength.medium' },
  strong: { bars: 3, color: 'bg-[#27ae60]', labelKey: 'auth.strength.strong' },
};

type PasswordStrengthProps = {
  password: string;
};

export function PasswordStrength({ password }: PasswordStrengthProps) {
  const { t } = useLanguage();
  const strength = getPasswordStrength(password);

  if (!strength) {
    return null;
  }

  const { bars, color, labelKey } = STRENGTH_CONFIG[strength];

  return (
    <div
      className="mt-1 flex items-center gap-3"
      aria-live="polite"
    >
      <div className="flex flex-1 gap-1">
        {[1, 2, 3].map((bar) => (
          <span
            key={bar}
            className={cn(
              'h-1 flex-1 transition-colors',
              bar <= bars ? color : 'bg-elements',
            )}
          />
        ))}
      </div>

      <span className="w-20 text-right text-xs text-text-secondary">
        {t(labelKey)}
      </span>
    </div>
  );
}
