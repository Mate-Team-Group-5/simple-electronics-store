import { useState } from 'react';
import { Slider } from '@base-ui/react/slider';
import { useLanguage } from '@/context/LanguageContext';

export type PriceRange = [number, number];

type PriceFilterProps = {
  min: number;
  max: number;
  value: PriceRange;
  onChange: (value: PriceRange) => void;
};

export function PriceFilter({ min, max, value, onChange }: PriceFilterProps) {
  const { t } = useLanguage();
  const [draft, setDraft] = useState<PriceRange>(value);

  const commit = ([from, to]: PriceRange) => {
    const low = Math.max(min, Math.min(from, to));
    const high = Math.min(max, Math.max(from, to));
    const next: PriceRange = [low, high];

    setDraft(next);
    onChange(next);
  };

  const handleInputChange = (index: 0 | 1, text: string) => {
    const number = Number(text);

    if (Number.isNaN(number)) {
      return;
    }

    setDraft((prev) => (index === 0 ? [number, prev[1]] : [prev[0], number]));
  };

  const inputClassName =
    'h-10 w-full min-w-0 border border-icons px-3 text-sm text-text-primary outline-none transition-colors hover:border-text-primary focus:border-accent-purple';

  return (
    <div className="flex flex-col gap-4">
      <div className="flex items-center gap-2">
        <input
          type="number"
          inputMode="numeric"
          aria-label={t('filters.minPrice')}
          value={draft[0]}
          min={min}
          max={max}
          onChange={(event) => handleInputChange(0, event.target.value)}
          onBlur={() => commit(draft)}
          onKeyDown={(event) => event.key === 'Enter' && commit(draft)}
          className={inputClassName}
        />

        <span className="text-text-secondary">–</span>

        <input
          type="number"
          inputMode="numeric"
          aria-label={t('filters.maxPrice')}
          value={draft[1]}
          min={min}
          max={max}
          onChange={(event) => handleInputChange(1, event.target.value)}
          onBlur={() => commit(draft)}
          onKeyDown={(event) => event.key === 'Enter' && commit(draft)}
          className={inputClassName}
        />
      </div>

      <Slider.Root
        value={draft}
        min={min}
        max={max}
        onValueChange={(next) => setDraft(next as PriceRange)}
        onValueCommitted={(next) => commit(next as PriceRange)}
      >
        <Slider.Control className="flex h-6 w-full cursor-pointer touch-none items-center px-2.5">
          <Slider.Track className="h-1 w-full rounded-full bg-elements">
            <Slider.Indicator className="rounded-full bg-text-primary" />

            <Slider.Thumb
              index={0}
              getAriaLabel={() => t('filters.minPrice')}
              className="size-5 rounded-full border-2 border-text-primary bg-white shadow-sm outline-none focus-visible:ring-4 focus-visible:ring-accent-purple/30"
            />

            <Slider.Thumb
              index={1}
              getAriaLabel={() => t('filters.maxPrice')}
              className="size-5 rounded-full border-2 border-text-primary bg-white shadow-sm outline-none focus-visible:ring-4 focus-visible:ring-accent-purple/30"
            />
          </Slider.Track>
        </Slider.Control>
      </Slider.Root>
    </div>
  );
}
