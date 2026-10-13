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
  className?: string;
};

export function Select({
  label,
  value,
  options,
  onChange,
  className,
}: SelectProps) {
  const id = useId();

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
          className={cn(
            'h-10 w-full cursor-pointer appearance-none bg-white pr-10 pl-3',
            'border border-icons text-sm leading-[21px] font-semibold text-text-primary',
            'transition-colors outline-none hover:border-text-secondary focus:border-text-primary',
          )}
        >
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
    </div>
  );
}
