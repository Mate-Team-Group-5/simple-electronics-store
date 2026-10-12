import { cn } from 'cn';

type CounterProps = {
  count: number;
  className?: string;
};

export function Counter({ count, className }: CounterProps) {
  if (count <= 0) {
    return null;
  }

  return (
    <span
      aria-hidden="true"
      className={cn(
        'flex h-3.5 min-w-3.5 items-center justify-center rounded-full px-0.5',
        'border border-white bg-red',
        'text-[9px] leading-none font-bold text-white',
        className,
      )}
    >
      {count > 99 ? '99+' : count}
    </span>
  );
}
