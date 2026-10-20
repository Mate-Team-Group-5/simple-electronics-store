import { PageTitle } from '@/components/atoms/PageTitle/PageTitle';
import { BannerSlider } from '@/components/organisms/BannerSlider/BannerSlider';
import { ProductGrid } from '@/components/organisms/ProductGrid';
import {
  getAccessoriesCount,
  getPhonesCount,
  getTabletsCount,
} from '@/services/products';
import { useEffect, useState } from 'react';
import { ShopByCategory } from '@/components/organisms/ShopByCategory/ShopByCategory';
import { useLanguage } from '@/context/LanguageContext';
import { useLoadMoreProducts } from '@/hooks/useLoadMoreProducts';

export function HomePage() {
  const { t } = useLanguage();
  const newModelsProducts = useLoadMoreProducts(4);

  const hotPricesProducts = useLoadMoreProducts(4);

  const [categoryCounts, setCategoryCounts] = useState({
    phones: 0,
    tablets: 0,
    accessories: 0,
  });

  useEffect(() => {
    newModelsProducts.loadMoreProducts();

    hotPricesProducts.loadMoreProducts();

    const loadProductCount = async () => {
      try {
        const phones = await getPhonesCount();
        const tablets = await getTabletsCount();
        const accessories = await getAccessoriesCount();
        setCategoryCounts({
          phones,
          tablets,
          accessories,
        });
      } catch {
        console.error('cant load product count');
      }
    };
    loadProductCount();
  }, []);

  return (
    <>
      <div className="flex flex-col gap-14 sm:gap-16 lg:gap-20">
        <div>
          <PageTitle className="mt-6 mb-6 tablet:mt-8 tablet:mb-8 desktop:mt-14 desktop:mb-14 text-primary">
            {t('home.title')}
          </PageTitle>

          <BannerSlider className="-mx-4 tablet:mx-0" />
        </div>

        <ProductGrid
          title={t('home.newModels')}
          products={newModelsProducts.products}
          loadMoreProducts={newModelsProducts.loadMoreProducts}
          isLoading={newModelsProducts.isLoading}
          hasMore={newModelsProducts.hasMore}
        />

        <ShopByCategory counts={categoryCounts} />

        <ProductGrid
          title={t('home.hotPrices')}
          products={hotPricesProducts.products}
          loadMoreProducts={hotPricesProducts.loadMoreProducts}
          isLoading={hotPricesProducts.isLoading}
          hasMore={hotPricesProducts.hasMore}
          isSaleGrid={true}
          classNames="mb-14 sm:mb-16 lg:mb-20"
        />
      </div>
    </>
  );
}
