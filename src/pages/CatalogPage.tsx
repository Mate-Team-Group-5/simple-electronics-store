import { useMemo, useState } from 'react';
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

export function CatalogPage({ category, title }: CatalogPageProps) {
  const { products, isLoading, hasError } = useProducts(category);
  const [sort, setSort] = useState<SortType>('newest');
  const [perPage, setPerPage] = useState<PerPage>('16');

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
            onSortChange={setSort}
            onPerPageChange={setPerPage}
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
