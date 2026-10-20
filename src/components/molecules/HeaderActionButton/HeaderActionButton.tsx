import type { ReactNode } from 'react';
import { NavLink } from 'react-router';
import { cn } from 'cn';
import { Counter } from '@/components/atoms/Counter/Counter';
import type { FlyTarget } from '@/utils/flyToTarget';
import { useLanguage } from '@/context/LanguageContext';

type HeaderActionButtonProps = {
  to: string;
  label: string;
  count?: number;
  flyTarget?: FlyTarget;
  children: ReactNode;
  className?: string;
};

export function HeaderActionButton({
  to,
  label,
  count = 0,
  flyTarget,
  children,
  className,
}: HeaderActionButtonProps) {
  const { t } = useLanguage();
  const ariaLabel =
    count > 0 ? t('header.itemsCount', { label, count }) : label;

  return (
    <NavLink
      to={to}
      aria-label={ariaLabel}
      data-fly-target={flyTarget}
      className={({ isActive }) =>
        cn(
          'relative flex h-12 w-12 shrink-0 items-center justify-center desktop:h-16 desktop:w-16',
          'bg-main-beak text-primary transition-colors hover:bg-sbns-hover',
          'shadow-[-1px_0_0_0_var(--header-border)]',
          isActive &&
            'after:absolute after:inset-x-0 after:bottom-0 after:h-0.75 after:bg-primary',
          className,
        )
      }
    >
      <span className="relative flex size-4 items-center justify-center">
        {children}
        <Counter
          count={count}
          className="absolute -top-1.5 -right-2"
        />
      </span>
    </NavLink>
  );
}
