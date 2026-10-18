import { cn } from 'cn';
import { NavItem } from '@/components/atoms/NavItem/NavItem';
import { useLanguage } from '@/context/LanguageContext';
import type { TranslationKey } from '@/i18n/en';

const NAV_LINKS: { to: string; labelKey: TranslationKey; end?: boolean }[] = [
  { to: '/', labelKey: 'nav.home', end: true },
  { to: '/phones', labelKey: 'nav.phones' },
  { to: '/tablets', labelKey: 'nav.tablets' },
  { to: '/accessories', labelKey: 'nav.accessories' },
];

type NavigationProps = {
  vertical?: boolean;
  className?: string;
};

export function Navigation({ vertical = false, className }: NavigationProps) {
  const { t } = useLanguage();

  return (
    <nav className={cn('h-full', className)}>
      <ul
        className={cn(
          'flex h-full',
          vertical ? 'flex-col items-center gap-4' : 'gap-6 desktop:gap-16',
        )}
      >
        {NAV_LINKS.map(({ to, labelKey, end }) => (
          <li
            key={to}
            className={vertical ? undefined : 'h-full'}
          >
            <NavItem
              to={to}
              end={end}
              className={vertical ? 'pb-2' : undefined}
            >
              {t(labelKey)}
            </NavItem>
          </li>
        ))}
      </ul>
    </nav>
  );
}
