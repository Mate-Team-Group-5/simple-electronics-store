import { useState } from 'react';
import { ChevronDown } from 'lucide-react';
import { cn } from 'cn';
import type { FilterOption } from '@/utils/filterProducts';
import { useLanguage } from '@/context/LanguageContext';

const VISIBLE_COUNT = 5;

type CheckboxFilterProps = {
  options: FilterOption[];
  selected: string[];
  onChange: (selected: string[]) => void;
};

export function CheckboxFilter({
  options,
  selected,
  onChange,
}: CheckboxFilterProps) {
  const { t } = useLanguage();
  const [isExpanded, setIsExpanded] = useState(false);

  const hasMore = options.length > VISIBLE_COUNT;
  const visibleOptions = isExpanded ? options : options.slice(0, VISIBLE_COUNT);

  const toggleOption = (value: string) => {
    if (selected.includes(value)) {
      onChange(selected.filter((item) => item !== value));
    } else {
      onChange([...selected, value]);
    }
  };

  return (
    <div className="flex flex-col gap-1">
      <ul className="flex flex-col">
        {visibleOptions.map(({ value, count }) => {
          const isChecked = selected.includes(value);

          return (
            <li key={value}>
              <label className="flex cursor-pointer items-center gap-3 py-1.5 text-sm">
                <input
                  type="checkbox"
                  checked={isChecked}
                  onChange={() => toggleOption(value)}
                  className="size-4 shrink-0 cursor-pointer accent-primary"
                />

                <span
                  className={cn('text-primary', isChecked && 'font-semibold')}
                >
                  {value}
                </span>

                <span className="text-xs text-secondary">({count})</span>
              </label>
            </li>
          );
        })}
      </ul>

      {hasMore && (
        <button
          type="button"
          onClick={() => setIsExpanded((prev) => !prev)}
          className="flex w-fit cursor-pointer items-center gap-1 py-1 text-sm font-semibold text-primary transition-colors hover:text-accent-purple"
        >
          {t(isExpanded ? 'filters.showLess' : 'filters.showMore')}
          <ChevronDown
            size={16}
            aria-hidden="true"
            className={cn('transition-transform', isExpanded && 'rotate-180')}
          />
        </button>
      )}
    </div>
  );
}
