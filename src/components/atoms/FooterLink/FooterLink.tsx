import type { ReactNode } from 'react';
import { cn } from 'cn';

type FooterLinkProps = {
  href: string;
  children: ReactNode;
  className?: string;
};

export function FooterLink({ href, children, className }: FooterLinkProps) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className={cn(
        'text-xs leading-[11px] font-bold tracking-[0.04em] uppercase',
        'text-text-secondary transition-colors hover:text-text-primary',
        className,
      )}
    >
      {children}
    </a>
  );
}
