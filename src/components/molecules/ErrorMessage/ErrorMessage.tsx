import { cn } from 'cn';

type ErrorMessageProps = {
  message: string;
  onRetry?: () => void;
  className?: string;
};

export function ErrorMessage({
  message,
  onRetry,
  className,
}: ErrorMessageProps) {
  return (
    <div
      role="alert"
      className={cn(
        'flex flex-col items-center gap-4 py-20 text-center',
        className,
      )}
    >
      <p className="text-base font-semibold text-text-primary">{message}</p>

      {onRetry && (
        <button
          type="button"
          onClick={onRetry}
          className="h-10 bg-text-primary px-6 text-sm font-semibold text-white transition-shadow hover:shadow-[0_3px_13px_0_rgba(23,32,49,0.26)]"
        >
          Reload
        </button>
      )}
    </div>
  );
}
