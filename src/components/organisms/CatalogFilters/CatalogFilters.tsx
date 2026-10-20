import { useMemo } from 'react';
import { Search, X } from 'lucide-react';
import { cn } from 'cn';
import {
  Accordion,
  AccordionItem,
} from '@/components/atoms/Accordion/Accordion';
import { CheckboxFilter } from '@/components/molecules/CheckboxFilter/CheckboxFilter';
import {
  PriceFilter,
  type PriceRange,
} from '@/components/molecules/PriceFilter/PriceFilter';
import type { Product } from '@/types/Product';
import {
  FILTER_KEYS,
  countActiveFilters,
  getFilterOptions,
  getPriceBounds,
  type FilterKey,
  type ProductFilters,
} from '@/utils/filterProducts';
import { useLanguage } from '@/context/LanguageContext';
import type { TranslationKey } from '@/i18n/en';

const FILTER_TITLE_KEYS: Record<FilterKey, TranslationKey> = {
  capacity: 'filters.capacity',
  ram: 'filters.ram',
  year: 'filters.year',
};

type CatalogFiltersProps = {
  products: Product[];
  filters: ProductFilters;
  onChange: (changes: Partial<ProductFilters>) => void;
  onReset: () => void;
  className?: string;
};

export function CatalogFilters({
  products,
  filters,
  onChange,
  onReset,
  className,
}: CatalogFiltersProps) {
  const { t } = useLanguage();
  const bounds = useMemo(() => getPriceBounds(products), [products]);
  const activeCount = countActiveFilters(filters);

  const priceValue: PriceRange = [
    filters.minPrice ?? bounds.min,
    filters.maxPrice ?? bounds.max,
  ];

  const handlePriceChange = ([from, to]: PriceRange) => {
    onChange({
      minPrice: from === bounds.min ? null : from,
      maxPrice: to === bounds.max ? null : to,
    });
  };

  return (
    <div className={cn('flex flex-col', className)}>
      <div className="flex items-center justify-between pb-2">
        <h2 className="text-xl font-bold text-primary">
          {t('catalog.filters')}
        </h2>

        {activeCount > 0 && (
          <button
            type="button"
            onClick={onReset}
            className="flex cursor-pointer items-center gap-1 text-sm font-semibold text-secondary transition-colors hover:text -primary"
          >
            <X
              size={14}
              aria-hidden="true"
            />
            {t('filters.reset', { count: activeCount })}
          </button>
        )}
      </div>

      <Accordion
        defaultValue={['search', 'price', ...FILTER_KEYS]}
        className="border-t border-elements"
      >
        <AccordionItem
          value="search"
          title={t('filters.search')}
        >
          <label className="relative flex items-center">
            <Search
              size={16}
              aria-hidden="true"
              className="pointer-events-none absolute left-3 text-secondary"
            />
            <input
              type="search"
              aria-label={t('filters.searchLabel')}
              placeholder="iPhone 14 Pro…"
              value={filters.query}
              onChange={(event) => onChange({ query: event.target.value })}
              className="h-10 w-full border border-icons pr-3 pl-9 text-sm text-primary transition-colors outline-none placeholder:text-icons hover:border-primary focus:border-button-background"
            />
          </label>
        </AccordionItem>

        <AccordionItem
          value="price"
          title={t('filters.price')}
          badge={`${bounds.min}–${bounds.max}`}
        >
          <PriceFilter
            key={`${priceValue[0]}-${priceValue[1]}`}
            min={bounds.min}
            max={bounds.max}
            value={priceValue}
            onChange={handlePriceChange}
          />
        </AccordionItem>

        {FILTER_KEYS.map((key) => (
          <AccordionItem
            key={key}
            value={key}
            title={t(FILTER_TITLE_KEYS[key])}
            badge={filters[key].length > 0 ? filters[key].length : undefined}
          >
            <CheckboxFilter
              options={getFilterOptions(products, key)}
              selected={filters[key]}
              onChange={(selected) => onChange({ [key]: selected })}
            />
          </AccordionItem>
        ))}
      </Accordion>
    </div>
  );
}
