import { cn } from 'cn';
import { NavItem } from '@/components/atoms/NavItem/NavItem';

const NAV_LINKS = [
  { to: '/', label: 'Home', end: true },
  { to: '/phones', label: 'Phones' },
  { to: '/tablets', label: 'Tablets' },
  { to: '/accessories', label: 'Accessories' },
];

type NavigationProps = {
  vertical?: boolean;
  className?: string;
};

export function Navigation({ vertical = false, className }: NavigationProps) {
  return (
    <nav className={cn('h-full', className)}>
      <ul
        className={cn(
          'flex h-full',
          vertical ? 'flex-col items-center gap-4' : 'gap-8 desktop:gap-16',
        )}
      >
        {NAV_LINKS.map(({ to, label, end }) => (
          <li
            key={to}
            className={vertical ? undefined : 'h-full'}
          >
            <NavItem
              to={to}
              end={end}
              className={vertical ? 'pb-2' : undefined}
            >
              {label}
            </NavItem>
          </li>
        ))}
      </ul>
    </nav>
  );
}
