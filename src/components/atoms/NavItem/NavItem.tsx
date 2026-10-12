import type { ReactNode } from 'react';
import { NavLink } from 'react-router';
import { cn } from 'cn';

type NavItemProps = {
  to: string;
  children: ReactNode;
  end?: boolean;
  className?: string;
};

export function NavItem({ to, children, end, className }: NavItemProps) {
  return (
    <NavLink
      to={to}
      end={end}
      className={({ isActive }) =>
        cn(
          'flex h-full items-center border-b-3 border-transparent',
          'text-xs leading-[11px] font-bold tracking-[0.04em] uppercase',
          'text-text-secondary transition-colors hover:text-text-primary',
          isActive && 'border-text-primary text-text-primary',
          className,
        )
      }
    >
      {children}
    </NavLink>
  );
}
