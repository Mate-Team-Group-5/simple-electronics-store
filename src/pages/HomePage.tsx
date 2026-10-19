import { PageTitle } from '@/components/atoms/PageTitle/PageTitle';
import { BannerSlider } from '@/components/organisms/BannerSlider/BannerSlider';
import { ProductGrid } from '@/components/organisms/ProductGrid';
import {
  getHotPricesProducts,
  getNewModelsProducts,
  getProductById,
} from '@/services/products';
import type { Product } from '@/types/Product';
import { useEffect, useMemo, useState } from 'react';
import { ShopByCategory } from '@/components/organisms/ShopByCategory/ShopByCategory';
import type { Category } from '@/hooks/useProducts';
import { useLanguage } from '@/context/LanguageContext';

export function HomePage() {
  const { t } = useLanguage();
  const [newModelsProducts, setNewModelsProducts] = useState<
    (Product | null)[]
  >(Array.from({ length: 50 }, () => null));
  const [hotPricesProducts, setHotPricesProducts] = useState<
    (Product | null)[]
  >([]);

  useEffect(() => {
    let isActive = true;

    const requests: Promise<Product>[] = [];
    for (let i = 1; i < 50; i++) {
      requests.push(getProductById(i));
    }

    requests.forEach((request, index) => {
      request
        .then((product) => {
          if (!isActive) return;
          setNewModelsProducts((current) =>
            current.map((item, i) => (i === index ? product : item)),
          );
        })
        .catch((error) => {
          console.error(`Could not load product ${[index]}`, error);
        });
    });

    return () => {
      isActive = false;
    };

    getNewModelsProducts()
      .then((prod) => setNewModelsProducts(prod))
      .catch(() => console.error('cant load products in HamePage'));

    getHotPricesProducts()
      .then((prod) => setHotPricesProducts(prod))
      .catch(() => console.error('cant load hot prices products in HomePage'));
  }, []);

  const categoryCounts = useMemo(() => {
    const countByCategory = (category: Category) =>
      newModelsProducts.filter((product) => product?.category === category)
        .length;

    return {
      phones: countByCategory('phones'),
      tablets: countByCategory('tablets'),
      accessories: countByCategory('accessories'),
    };
  }, [newModelsProducts]);

  return (
    <>
      <div className="flex flex-col gap-14 sm:gap-16 lg:gap-20">
        <div>
          <PageTitle className="mt-6 mb-6 tablet:mt-8 tablet:mb-8 desktop:mt-14 desktop:mb-14">
            {t('home.title')}
          </PageTitle>

          <BannerSlider className="-mx-4 tablet:mx-0" />
        </div>

        <ProductGrid
          title={t('home.newModels')}
          products={newModelsProducts}
        />

        <ShopByCategory counts={categoryCounts} />

        <ProductGrid
          title={t('home.hotPrices')}
          products={hotPricesProducts}
          isSaleGrid={true}
          classNames="mb-14 sm:mb-16 lg:mb-20"
        />
      </div>
    </>
  );
}
