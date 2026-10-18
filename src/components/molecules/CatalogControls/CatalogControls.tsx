import { cn } from 'cn';
import { Select, type SelectOption } from '@/components/atoms/Select/Select';
import type { SortType } from '@/utils/sortProducts';
import { useLanguage } from '@/context/LanguageContext';
import type { TranslationKey } from '@/i18n/en';

export type PerPage = '4' | '8' | '16' | 'all';

const SORT_OPTIONS: { value: SortType; labelKey: TranslationKey }[] = [
  { value: 'newest', labelKey: 'sort.newest' },
  { value: 'alphabetically', labelKey: 'sort.alphabetically' },
  { value: 'cheapest', labelKey: 'sort.cheapest' },
];

const PER_PAGE_VALUES: PerPage[] = ['4', '8', '16', 'all'];

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
  const { t } = useLanguage();

  const sortOptions: SelectOption[] = SORT_OPTIONS.map(
    ({ value, labelKey }) => ({ value, label: t(labelKey) }),
  );

  const perPageOptions: SelectOption[] = PER_PAGE_VALUES.map((value) => ({
    value,
    label: value === 'all' ? t('perPage.all') : value,
  }));

  return (
    <div className={cn('flex gap-4', className)}>
      <Select
        label={t('sort.label')}
        value={sort}
        options={sortOptions}
        onChange={(value) => onSortChange(value as SortType)}
        className="flex-1 tablet:w-44 tablet:flex-none"
      />

      <Select
        label={t('perPage.label')}
        value={perPage}
        options={perPageOptions}
        onChange={(value) => onPerPageChange(value as PerPage)}
        className="flex-1 tablet:w-32 tablet:flex-none"
      />
    </div>
  );
}
