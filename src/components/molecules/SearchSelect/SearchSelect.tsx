import { useId, useState, type FocusEvent } from 'react';
import { cn } from 'cn';
import type { SelectOption } from '@/components/atoms/Select/Select';

type SearchSelectProps = {
  label: string;
  query: string;
  onQueryChange: (query: string) => void;
  options: SelectOption[];
  onSelect: (option: SelectOption) => void;
  isLoading?: boolean;
  hasError?: boolean;
  placeholder?: string;
  error?: string;
  disabled?: boolean;
  className?: string;
};

export function SearchSelect({
  label,
  query,
  onQueryChange,
  options,
  onSelect,
  isLoading = false,
  hasError = false,
  placeholder,
  error,
  disabled = false,
  className,
}: SearchSelectProps) {
  const [isOpen, setIsOpen] = useState(false);
  const id = useId();
  const errorId = `${id}-error`;

  const handleQueryChange = (value: string) => {
    onQueryChange(value);
    setIsOpen(true);
  };

  const handleSelect = (option: SelectOption) => {
    onSelect(option);
    setIsOpen(false);
  };

  const handleBlur = (event: FocusEvent<HTMLDivElement>) => {
    if (!event.currentTarget.contains(event.relatedTarget)) {
      setIsOpen(false);
    }
  };

  const renderListContent = () => {
    if (isLoading) {
      return (
        <li className="px-4 py-3 text-sm text-text-secondary">Loading...</li>
      );
    }

    if (hasError) {
      return (
        <li className="px-4 py-3 text-sm text-red">Something went wrong</li>
      );
    }

    if (options.length === 0) {
      return query.trim() ?
          <li className="px-4 py-3 text-sm text-text-secondary">
            Nothing found
          </li>
        : null;
    }

    return options.map((option) => (
      <li key={option.value}>
        <button
          type="button"
          onMouseDown={(event) => event.preventDefault()}
          onClick={() => handleSelect(option)}
          className="w-full px-4 py-3 text-left text-sm text-text-primary outline-none hover:bg-hover-bg focus:bg-hover-bg"
        >
          {option.label}
        </button>
      </li>
    ));
  };

  const listContent = renderListContent();

  return (
    <div
      className={cn('flex flex-col gap-1', className)}
      onBlur={handleBlur}
    >
      <label
        htmlFor={id}
        className="text-xs font-semibold text-text-secondary"
      >
        {label}
      </label>

      <div className="relative">
        <input
          id={id}
          type="text"
          value={query}
          onChange={(event) => handleQueryChange(event.target.value)}
          onFocus={() => setIsOpen(true)}
          onKeyDown={(event) => {
            if (event.key === 'Escape') {
              setIsOpen(false);
            }
          }}
          placeholder={placeholder}
          disabled={disabled}
          autoComplete="off"
          aria-invalid={Boolean(error)}
          aria-describedby={error ? errorId : undefined}
          className={cn(
            'h-12 w-full border px-4 text-sm text-text-primary transition-colors outline-none placeholder:text-icons focus:border-accent-purple',
            'disabled:cursor-not-allowed disabled:bg-hover-bg disabled:text-icons',
            error ? 'border-red' : 'border-icons hover:border-text-primary',
          )}
        />

        {isOpen && listContent && (
          <ul className="absolute top-full left-0 z-10 mt-1 max-h-64 w-full overflow-y-auto border border-icons bg-white">
            {listContent}
          </ul>
        )}
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
