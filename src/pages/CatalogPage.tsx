import { useMemo } from 'react';
import { useSearchParams } from 'react-router';
import { Breadcrumbs } from '@/components/molecules/Breadcrumbs/Breadcrumbs';
import { PageTitle } from '@/components/atoms/PageTitle/PageTitle';
import {
  CatalogControls,
  type PerPage,
} from '@/components/molecules/CatalogControls/CatalogControls';
import { ProductsGrid } from '@/components/organisms/ProductsGrid/ProductsGrid';
import { useProducts, type Category } from '@/hooks/useProducts';
import { sortProducts, type SortType } from '@/utils/sortProducts';

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

export function CatalogPage({ category, title }: CatalogPageProps) {
  const { products, isLoading, hasError } = useProducts(category);
  const [searchParams, setSearchParams] = useSearchParams();

  const sort = parseSort(searchParams.get('sort'));
  const perPage = parsePerPage(searchParams.get('perPage'));

  const updateParam = (key: string, value: string, defaultValue: string) => {
    setSearchParams((prevParams) => {
      const params = new URLSearchParams(prevParams);

      if (value === defaultValue) {
        params.delete(key);
      } else {
        params.set(key, value);
      }

      return params;
    });
  };

  const visibleProducts = useMemo(() => {
    const sorted = sortProducts(products, sort);

    return perPage === 'all' ? sorted : sorted.slice(0, Number(perPage));
  }, [products, sort, perPage]);

  return (
    <>
      <Breadcrumbs
        items={[{ label: CATEGORY_LABELS[category] }]}
        className="mt-6"
      />

      <PageTitle className="mt-6 tablet:mt-10">{title}</PageTitle>

      {!isLoading && !hasError && (
        <>
          <p className="mt-2 text-sm text-text-secondary">
            {products.length} models
          </p>

          <CatalogControls
            sort={sort}
            perPage={perPage}
            onSortChange={(value) => updateParam('sort', value, DEFAULT_SORT)}
            onPerPageChange={(value) =>
              updateParam('perPage', value, DEFAULT_PER_PAGE)
            }
            className="mt-8 desktop:mt-10"
          />

          <ProductsGrid
            products={visibleProducts}
            className="mt-6"
          />
        </>
      )}
    </>
  );
}
