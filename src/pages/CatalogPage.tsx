import { useMemo, useState } from 'react';
import { useSearchParams } from 'react-router';
import { SlidersHorizontal } from 'lucide-react';
import { cn } from 'cn';
import { Breadcrumbs } from '@/components/molecules/Breadcrumbs/Breadcrumbs';
import { PageTitle } from '@/components/atoms/PageTitle/PageTitle';
import {
  CatalogControls,
  type PerPage,
} from '@/components/molecules/CatalogControls/CatalogControls';
import { Pagination } from '@/components/molecules/Pagination/Pagination';
import { ProductsGrid } from '@/components/organisms/ProductsGrid/ProductsGrid';
import { CatalogFilters } from '@/components/organisms/CatalogFilters/CatalogFilters';
import { useProducts, type Category } from '@/hooks/useProducts';
import { sortProducts, type SortType } from '@/utils/sortProducts';
import {
  FILTER_KEYS,
  countActiveFilters,
  filterProducts,
  type ProductFilters,
} from '@/utils/filterProducts';
import { Loader } from '@/components/atoms/Loader/Loader';
import { ErrorMessage } from '@/components/molecules/ErrorMessage/ErrorMessage';
import { useLanguage } from '@/context/LanguageContext';
import type { TranslationKey } from '@/i18n/en';

type CatalogPageProps = {
  category: Category;
  title: string;
};

const CATEGORY_LABEL_KEYS: Record<Category, TranslationKey> = {
  phones: 'nav.phones',
  tablets: 'nav.tablets',
  accessories: 'nav.accessories',
};

const SORT_VALUES: SortType[] = ['newest', 'alphabetically', 'cheapest'];
const PER_PAGE_VALUES: PerPage[] = ['4', '8', '16', 'all'];

const DEFAULT_SORT: SortType = 'newest';
const DEFAULT_PER_PAGE: PerPage = '16';

function parseSort(value: string | null): SortType {
  return SORT_VALUES.find((sort) => sort === value) ?? DEFAULT_SORT;
}

function parsePerPage(value: string | null): PerPage {
  return (
    PER_PAGE_VALUES.find((perPage) => perPage === value) ?? DEFAULT_PER_PAGE
  );
}

function parsePage(value: string | null): number {
  const page = Number(value);

  return Number.isInteger(page) && page > 0 ? page : 1;
}

function parsePrice(value: string | null): number | null {
  if (value === null) {
    return null;
  }

  const price = Number(value);

  return Number.isFinite(price) && price >= 0 ? price : null;
}

function parseList(value: string | null): string[] {
  return value ? value.split(',') : [];
}

function parseFilters(params: URLSearchParams): ProductFilters {
  return {
    query: params.get('query') ?? '',
    minPrice: parsePrice(params.get('minPrice')),
    maxPrice: parsePrice(params.get('maxPrice')),
    capacity: parseList(params.get('capacity')),
    ram: parseList(params.get('ram')),
    year: parseList(params.get('year')),
  };
}

export function CatalogPage({ category, title }: CatalogPageProps) {
  const { t } = useLanguage();
  const { products, isLoading, hasError, reload } = useProducts(category);
  const [searchParams, setSearchParams] = useSearchParams();
  const [isFiltersOpen, setIsFiltersOpen] = useState(false);

  const sort = parseSort(searchParams.get('sort'));
  const perPage = parsePerPage(searchParams.get('perPage'));

  const filters = useMemo(() => parseFilters(searchParams), [searchParams]);
  const filteredProducts = useMemo(
    () => filterProducts(products, filters),
    [products, filters],
  );

  const activeFiltersCount = countActiveFilters(filters);

  const itemsPerPage =
    perPage === 'all' ? Math.max(filteredProducts.length, 1) : Number(perPage);
  const totalPages = Math.max(
    1,
    Math.ceil(filteredProducts.length / itemsPerPage),
  );
  const currentPage = Math.min(parsePage(searchParams.get('page')), totalPages);

  const updateParams = (changes: Record<string, string | null>) => {
    setSearchParams((prevParams) => {
      const params = new URLSearchParams(prevParams);

      Object.entries(changes).forEach(([key, value]) => {
        if (value === null) {
          params.delete(key);
        } else {
          params.set(key, value);
        }
      });

      return params;
    });
  };

  const handleSortChange = (value: SortType) => {
    updateParams({
      sort: value === DEFAULT_SORT ? null : value,
      page: null,
    });
  };

  const handlePerPageChange = (value: PerPage) => {
    updateParams({
      perPage: value === DEFAULT_PER_PAGE ? null : value,
      page: null,
    });
  };

  const handlePageChange = (page: number) => {
    updateParams({ page: page === 1 ? null : String(page) });
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleFiltersChange = (changes: Partial<ProductFilters>) => {
    const params: Record<string, string | null> = { page: null };

    if (changes.query !== undefined) {
      params.query = changes.query || null;
    }

    if (changes.minPrice !== undefined) {
      params.minPrice =
        changes.minPrice === null ? null : String(changes.minPrice);
    }

    if (changes.maxPrice !== undefined) {
      params.maxPrice =
        changes.maxPrice === null ? null : String(changes.maxPrice);
    }

    FILTER_KEYS.forEach((key) => {
      const selected = changes[key];

      if (selected !== undefined) {
        params[key] = selected.length > 0 ? selected.join(',') : null;
      }
    });

    updateParams(params);
  };

  const handleFiltersReset = () => {
    updateParams({
      query: null,
      minPrice: null,
      maxPrice: null,
      capacity: null,
      ram: null,
      year: null,
      page: null,
    });
  };

  const visibleProducts = useMemo(() => {
    const sorted = sortProducts(filteredProducts, sort);
    const start = (currentPage - 1) * itemsPerPage;

    return sorted.slice(start, start + itemsPerPage);
  }, [filteredProducts, sort, currentPage, itemsPerPage]);

  return (
    <>
      <Breadcrumbs
        items={[{ label: t(CATEGORY_LABEL_KEYS[category]) }]}
        className="mt-6"
      />

      <PageTitle className="mt-6 tablet:mt-10">{title}</PageTitle>

      {isLoading && <Loader />}

      {hasError && (
        <ErrorMessage
          message={t('common.error')}
          onRetry={reload}
        />
      )}

      {!isLoading && !hasError && products.length === 0 && (
        <ErrorMessage message={t('catalog.empty', { category })} />
      )}

      {!isLoading && !hasError && products.length > 0 && (
        <>
          <p className="mt-2 text-sm text-text-secondary">
            {filteredProducts.length === products.length ?
              t('category.modelsCount', { count: products.length })
            : t('catalog.filteredCount', {
                shown: filteredProducts.length,
                count: products.length,
              })
            }
          </p>

          <div className="mt-8 mb-20 grid items-start gap-8 desktop:mt-10 desktop:grid-cols-[240px_1fr]">
            <aside aria-label={t('catalog.filters')}>
              <button
                type="button"
                aria-expanded={isFiltersOpen}
                onClick={() => setIsFiltersOpen((prev) => !prev)}
                className="flex h-10 w-full cursor-pointer items-center justify-center gap-2 border border-icons text-sm font-semibold text-text-primary transition-colors hover:border-text-primary desktop:hidden"
              >
                <SlidersHorizontal
                  size={16}
                  aria-hidden="true"
                />
                {t('catalog.filters')}
                {activeFiltersCount > 0 && ` (${activeFiltersCount})`}
              </button>

              <CatalogFilters
                products={products}
                filters={filters}
                onChange={handleFiltersChange}
                onReset={handleFiltersReset}
                className={cn(
                  'mt-4 desktop:mt-0 desktop:flex',
                  !isFiltersOpen && 'hidden',
                )}
              />
            </aside>

            <div className="min-w-0">
              <CatalogControls
                sort={sort}
                perPage={perPage}
                onSortChange={handleSortChange}
                onPerPageChange={handlePerPageChange}
              />

              {filteredProducts.length === 0 ?
                <div className="flex flex-col items-center gap-4 py-20 text-center">
                  <p className="font-semibold text-text-primary">
                    {t('catalog.noMatches')}
                  </p>
                  <button
                    type="button"
                    onClick={handleFiltersReset}
                    className="h-10 cursor-pointer bg-text-primary px-6 text-sm font-semibold text-white transition-shadow hover:shadow-lg"
                  >
                    {t('catalog.resetFilters')}
                  </button>
                </div>
              : <>
                  <ProductsGrid
                    products={visibleProducts}
                    className="mt-6"
                  />

                  <Pagination
                    currentPage={currentPage}
                    totalPages={totalPages}
                    onPageChange={handlePageChange}
                    className="mt-10"
                  />
                </>
              }
            </div>
          </div>
        </>
      )}
    </>
  );
}
