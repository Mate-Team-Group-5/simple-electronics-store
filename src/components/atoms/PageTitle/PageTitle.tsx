import type { ReactNode } from 'react';
import { cn } from 'cn';

type PageTitleProps = {
  children: ReactNode;
  className?: string;
};

export function PageTitle({ children, className }: PageTitleProps) {
  return (
    <h1
      className={cn(
        'text-[32px] leading-10.25 font-extrabold tracking-[-0.01em] text-primary',
        'tablet:text-5xl tablet:leading-14',
        className,
      )}
    >
      {children}
    </h1>
  );
}
