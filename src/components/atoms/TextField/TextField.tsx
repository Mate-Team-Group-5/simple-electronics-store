import { useId, type HTMLInputTypeAttribute } from 'react';
import { cn } from 'cn';

type TextFieldProps = {
  label: string;
  value: string;
  onChange: (value: string) => void;
  error?: string;
  type?: HTMLInputTypeAttribute;
  placeholder?: string;
  autoComplete?: string;
  className?: string;
};

export function TextField({
  label,
  value,
  onChange,
  error,
  type = 'text',
  placeholder,
  autoComplete,
  className,
}: TextFieldProps) {
  const id = useId();
  const errorId = `${id}-error`;

  return (
    <div className={cn('flex flex-col gap-1', className)}>
      <label
        htmlFor={id}
        className="text-xs font-semibold text-secondary"
      >
        {label}
      </label>

      <input
        id={id}
        type={type}
        value={value}
        onChange={(event) => onChange(event.target.value)}
        placeholder={placeholder}
        autoComplete={autoComplete}
        aria-invalid={Boolean(error)}
        aria-describedby={error ? errorId : undefined}
        className={cn(
          'h-12 border px-4 text-sm text-primary transition-colors outline-none placeholder:text-icons focus:border-accent-purple',
          error ? 'border-red' : 'border-icons hover:border-primary',
        )}
      />

      {error && (
        <p
          id={errorId}
          className="text-xs text-red"
        >
          {error}
        </p>
      )}
    </div>
  );
}
