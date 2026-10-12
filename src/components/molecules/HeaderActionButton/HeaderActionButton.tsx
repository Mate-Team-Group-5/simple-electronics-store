import type { ReactNode } from 'react';
import { NavLink } from 'react-router';
import { cn } from 'cn';
import { Counter } from '@/components/atoms/Counter/Counter';

type HeaderActionButtonProps = {
  to: string;
  label: string;
  count?: number;
  children: ReactNode;
  className?: string;
};

export function HeaderActionButton({
  to,
  label,
  count = 0,
  children,
  className,
}: HeaderActionButtonProps) {
  const ariaLabel = count > 0 ? `${label}, ${count} items` : label;

  return (
    <NavLink
      to={to}
      aria-label={ariaLabel}
      className={({ isActive }) =>
        cn(
          'relative flex h-12 w-12 shrink-0 items-center justify-center desktop:h-16 desktop:w-16',
          'bg-white text-text-primary transition-colors hover:bg-hover-bg',
          'shadow-[-1px_0_0_0_var(--color-elements)]',
          isActive &&
            'after:absolute after:inset-x-0 after:bottom-0 after:h-[3px] after:bg-text-primary',
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
