import { cn } from 'cn';
import { FooterLink } from '@/components/atoms/FooterLink/FooterLink';
import { useLanguage } from '@/context/LanguageContext';
import type { TranslationKey } from '@/i18n/en';

const FOOTER_LINKS: { href: string; labelKey: TranslationKey }[] = [
  {
    href: 'https://github.com/Mate-Team-Group-5/simple-electronics-store',
    labelKey: 'footer.github',
  },
  { href: 'https://github.com/Mate-Team-Group-5', labelKey: 'footer.contacts' },
  {
    href: 'https://github.com/Mate-Team-Group-5/simple-electronics-store',
    labelKey: 'footer.rights',
  },
];

type FooterNavProps = {
  className?: string;
};

export function FooterNav({ className }: FooterNavProps) {
  const { t } = useLanguage();

  return (
    <nav
      aria-label={t('footer.label')}
      className={className}
    >
      <ul
        className={cn(
          'flex flex-col gap-4',
          'tablet:flex-row tablet:items-center tablet:justify-between',
        )}
      >
        {FOOTER_LINKS.map(({ href, labelKey }) => (
          <li key={labelKey}>
            <FooterLink href={href}>{t(labelKey)}</FooterLink>
          </li>
        ))}
      </ul>
    </nav>
  );
}
