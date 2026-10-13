import type { ComponentProps } from 'react';
import { cn } from 'cn';

type IconButtonProps = ComponentProps<'button'>;

export function IconButton({
  className,
  type = 'button',
  ...props
}: IconButtonProps) {
  return (
    <button
      type={type}
      className={cn(
        'flex size-12 shrink-0 items-center justify-center',
        'bg-white text-text-primary transition-colors hover:bg-hover-bg',
        'shadow-[-1px_0_0_0_var(--color-elements)]',
        className,
      )}
      {...props}
    />
  );
}
