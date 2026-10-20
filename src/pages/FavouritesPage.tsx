import { useMemo } from 'react';
import { Breadcrumbs } from '@/components/molecules/Breadcrumbs/Breadcrumbs';
import { PageTitle } from '@/components/atoms/PageTitle/PageTitle';
import { Loader } from '@/components/atoms/Loader/Loader';
import { ErrorMessage } from '@/components/molecules/ErrorMessage/ErrorMessage';
import { ProductsGrid } from '@/components/organisms/ProductsGrid/ProductsGrid';
import { useProducts } from '@/hooks/useProducts';
import { useAccountContext } from '@/context/AccountContext';
import { ProductCategory } from '@/types/ProductCategory';
import { useLanguage } from '@/context/LanguageContext';

export function FavouritesPage() {
  const { t } = useLanguage();
  const { products, isLoading, hasError, reload } = useProducts(
    ProductCategory.all,
  );
  const { favoriteProducts } = useAccountContext();

  const favourites = useMemo(
    () => products.filter((product) => favoriteProducts.includes(product.id)),
    [products, favoriteProducts],
  );

  return (
    <>
      <Breadcrumbs
        items={[{ label: t('header.favourites') }]}
        className="mt-6"
      />

      <PageTitle className="mt-6 tablet:mt-10">
        {t('header.favourites')}
      </PageTitle>

      {isLoading && <Loader />}

      {hasError && (
        <ErrorMessage
          message={t('common.error')}
          onRetry={reload}
        />
      )}

      {!isLoading && !hasError && favourites.length === 0 && (
        <ErrorMessage message={t('favourites.empty')} />
      )}

      {!isLoading && !hasError && favourites.length > 0 && (
        <>
          <p className="mt-2 text-sm text-text-secondary">
            {t('favourites.count', { count: favourites.length })}
          </p>

          <ProductsGrid
            products={favourites}
            className="mt-8 mb-20 desktop:mt-10"
          />
        </>
      )}
    </>
  );
}
