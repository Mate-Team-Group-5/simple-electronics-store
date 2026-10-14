import { cn } from 'cn';

type LoaderProps = {
  className?: string;
};

export function Loader({ className }: LoaderProps) {
  return (
    <div
      role="status"
      className={cn('flex justify-center py-20', className)}
    >
      <span
        aria-hidden="true"
        className="size-10 animate-spin rounded-full border-4 border-elements border-t-text-primary"
      />
      <span className="sr-only">Loading...</span>
    </div>
  );
}
