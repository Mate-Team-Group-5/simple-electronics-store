import { cn } from 'cn';
import { Select, type SelectOption } from '@/components/atoms/Select/Select';
import type { SortType } from '@/utils/sortProducts';

export type PerPage = '4' | '8' | '16' | 'all';

const SORT_OPTIONS: SelectOption[] = [
  { value: 'newest', label: 'Newest' },
  { value: 'alphabetically', label: 'Alphabetically' },
  { value: 'cheapest', label: 'Cheapest' },
];

const PER_PAGE_OPTIONS: SelectOption[] = [
  { value: '4', label: '4' },
  { value: '8', label: '8' },
  { value: '16', label: '16' },
  { value: 'all', label: 'All' },
];

type CatalogControlsProps = {
  sort: SortType;
  perPage: PerPage;
  onSortChange: (sort: SortType) => void;
  onPerPageChange: (perPage: PerPage) => void;
  className?: string;
};

export function CatalogControls({
  sort,
  perPage,
  onSortChange,
  onPerPageChange,
  className,
}: CatalogControlsProps) {
  return (
    <div className={cn('flex gap-4', className)}>
      <Select
        label="Sort by"
        value={sort}
        options={SORT_OPTIONS}
        onChange={(value) => onSortChange(value as SortType)}
        className="flex-1 tablet:w-44 tablet:flex-none"
      />

      <Select
        label="Items on page"
        value={perPage}
        options={PER_PAGE_OPTIONS}
        onChange={(value) => onPerPageChange(value as PerPage)}
        className="flex-1 tablet:w-32 tablet:flex-none"
      />
    </div>
  );
}
