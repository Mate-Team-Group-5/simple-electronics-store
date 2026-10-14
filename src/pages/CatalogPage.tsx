import { useMemo } from 'react';
import { useSearchParams } from 'react-router';
import { Breadcrumbs } from '@/components/molecules/Breadcrumbs/Breadcrumbs';
import { PageTitle } from '@/components/atoms/PageTitle/PageTitle';
import {
  CatalogControls,
  type PerPage,
} from '@/components/molecules/CatalogControls/CatalogControls';
import { Pagination } from '@/components/molecules/Pagination/Pagination';
import { ProductsGrid } from '@/components/organisms/ProductsGrid/ProductsGrid';
import { useProducts, type Category } from '@/hooks/useProducts';
import { sortProducts, type SortType } from '@/utils/sortProducts';
import { Loader } from '@/components/atoms/Loader/Loader';
import { ErrorMessage } from '@/components/molecules/ErrorMessage/ErrorMessage';

type CatalogPageProps = {
  category: Category;
  title: string;
};

const CATEGORY_LABELS: Record<Category, string> = {
  phones: 'Phones',
  tablets: 'Tablets',
  accessories: 'Accessories',
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

export function CatalogPage({ category, title }: CatalogPageProps) {
  const { products, isLoading, hasError, reload } = useProducts(category);
  const [searchParams, setSearchParams] = useSearchParams();

  const sort = parseSort(searchParams.get('sort'));
  const perPage = parsePerPage(searchParams.get('perPage'));

  const itemsPerPage =
    perPage === 'all' ? Math.max(products.length, 1) : Number(perPage);
  const totalPages = Math.max(1, Math.ceil(products.length / itemsPerPage));
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

  const visibleProducts = useMemo(() => {
    const sorted = sortProducts(products, sort);
    const start = (currentPage - 1) * itemsPerPage;

    return sorted.slice(start, start + itemsPerPage);
  }, [products, sort, currentPage, itemsPerPage]);

  return (
    <>
      <Breadcrumbs
        items={[{ label: CATEGORY_LABELS[category] }]}
        className="mt-6"
      />

      <PageTitle className="mt-6 tablet:mt-10">{title}</PageTitle>

      {isLoading && <Loader />}

      {hasError && (
        <ErrorMessage
          message="Something went wrong. Please try again."
          onRetry={reload}
        />
      )}

      {!isLoading && !hasError && products.length === 0 && (
        <ErrorMessage message={`There are no ${category} yet`} />
      )}

      {!isLoading && !hasError && products.length > 0 && (
        <>
          <p className="mt-2 text-sm text-text-secondary">
            {products.length} models
          </p>

          <CatalogControls
            sort={sort}
            perPage={perPage}
            onSortChange={handleSortChange}
            onPerPageChange={handlePerPageChange}
            className="mt-8 desktop:mt-10"
          />

          <ProductsGrid
            products={visibleProducts}
            className="mt-6"
          />

          <Pagination
            currentPage={currentPage}
            totalPages={totalPages}
            onPageChange={handlePageChange}
            className="mt-10 mb-20"
          />
        </>
      )}
    </>
  );
}
