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
        'bg-main-beak text-primary transition-colors hover:bg-second-beak',
        'shadow-[-1px_0_0_0_var(--second-beak)]',
        className,
      )}
      {...props}
    />
  );
}
