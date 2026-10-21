import type { ReactNode } from 'react';
import { cn } from 'cn';
import { Link } from 'react-router';

type FooterLinkProps = {
  href: string;
  children: ReactNode;
  className?: string;
  openInNewTab?: boolean;
};

export function FooterLink({
  href,
  children,
  className,
  openInNewTab,
}: FooterLinkProps) {
  return (
    <Link
      to={href}
      target={openInNewTab ? '_blank' : undefined}
      rel="noopener noreferrer"
      className={cn(
        'text-xs leading-2.75 font-bold tracking-[0.04em] uppercase',
        'text-secondary transition-colors hover:text-primary',
        className,
      )}
    >
      {children}
    </Link>
  );
}
