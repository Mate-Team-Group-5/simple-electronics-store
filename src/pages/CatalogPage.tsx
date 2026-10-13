import { useState } from 'react';
import { Breadcrumbs } from '@/components/molecules/Breadcrumbs/Breadcrumbs';
import { PageTitle } from '@/components/atoms/PageTitle/PageTitle';
import { Select } from '@/components/atoms/Select/Select';
import { ProductsGrid } from '@/components/organisms/ProductsGrid/ProductsGrid';
import { useProducts, type Category } from '@/hooks/useProducts';

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
  const [sort, setSort] = useState('newest');

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

          <Select
            label="Sort by"
            value={sort}
            options={[
              { value: 'newest', label: 'Newest' },
              { value: 'alphabetically', label: 'Alphabetically' },
              { value: 'cheapest', label: 'Cheapest' },
            ]}
            onChange={setSort}
            className="mt-10 w-44"
          />

          <ProductsGrid
            products={products}
            className="mt-6"
          />
        </>
      )}
    </>
  );
}
