import { cn } from 'cn';
import { FooterLink } from '@/components/atoms/FooterLink/FooterLink';
import { useLanguage } from '@/context/LanguageContext';
import type { TranslationKey } from '@/i18n/en';

const FOOTER_LINKS: {
  href: string;
  labelKey: TranslationKey;
  openInNewTab: boolean;
}[] = [
  {
    href: 'https://github.com/Mate-Team-Group-5/simple-electronics-store',
    labelKey: 'footer.github',
    openInNewTab: true,
  },
  { href: '/contacts', labelKey: 'footer.contacts', openInNewTab: false },
  {
    href: 'https://github.com/Mate-Team-Group-5/simple-electronics-store',
    labelKey: 'footer.rights',
    openInNewTab: true,
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
        {FOOTER_LINKS.map(({ href, labelKey, openInNewTab }) => (
          <li key={labelKey}>
            <FooterLink
              href={href}
              openInNewTab={openInNewTab}
              className="text-card-primary-text"
            >
              {t(labelKey)}
            </FooterLink>
          </li>
        ))}
      </ul>
    </nav>
  );
}
