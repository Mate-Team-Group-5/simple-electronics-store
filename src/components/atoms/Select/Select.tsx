import { useId } from 'react';
import { ChevronDown } from 'lucide-react';
import { cn } from 'cn';

export type SelectOption = {
  value: string;
  label: string;
};

type SelectProps = {
  label: string;
  value: string;
  options: SelectOption[];
  onChange: (value: string) => void;
  placeholder?: string;
  error?: string;
  disabled?: boolean;
  selectClassName?: string;
  className?: string;
};

export function Select({
  label,
  value,
  options,
  onChange,
  placeholder,
  error,
  disabled = false,
  selectClassName,
  className,
}: SelectProps) {
  const id = useId();
  const errorId = `${id}-error`;

  return (
    <div className={cn('flex flex-col gap-1', className)}>
      <label
        htmlFor={id}
        className="text-xs font-semibold text-text-secondary"
      >
        {label}
      </label>

      <div className="relative">
        <select
          id={id}
          value={value}
          onChange={(event) => onChange(event.target.value)}
          disabled={disabled}
          aria-invalid={Boolean(error)}
          aria-describedby={error ? errorId : undefined}
          className={cn(
            'h-10 w-full cursor-pointer appearance-none bg-white pr-10 pl-3',
            'border text-sm leading-[21px] font-semibold [&>option]:text-text-primary',
            'transition-colors outline-none focus:border-text-primary',
            'disabled:cursor-not-allowed disabled:bg-hover-bg disabled:text-icons',
            error ? 'border-red' : 'border-icons hover:border-text-secondary',
            value === '' ? 'text-icons' : 'text-text-primary',
            selectClassName,
          )}
        >
          {placeholder && (
            <option
              value=""
              disabled
            >
              {placeholder}
            </option>
          )}

          {options.map((option) => (
            <option
              key={option.value}
              value={option.value}
            >
              {option.label}
            </option>
          ))}
        </select>

        <ChevronDown
          size={16}
          aria-hidden="true"
          className="pointer-events-none absolute top-1/2 right-3 -translate-y-1/2 text-text-secondary"
        />
      </div>

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
