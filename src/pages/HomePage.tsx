import { PageTitle } from '@/components/atoms/PageTitle/PageTitle';
import { BannerSlider } from '@/components/organisms/BannerSlider/BannerSlider';
import { ProductGrid } from '@/components/organisms/ProductGrid';
import {
  getHotPricesProducts,
  getNewModelsProducts,
} from '@/services/products';
import type { Product } from '@/types/Product';
import { useEffect, useState } from 'react';

export function HomePage() {
  const [newModelsProducts, setNewModelsProducts] = useState<Product[]>([]);
  const [hotPricesProducts, setHotPricesProducts] = useState<Product[]>([]);

  useEffect(() => {
    getNewModelsProducts()
      .then((prod) => setNewModelsProducts(prod))
      .catch(() => console.error('cant load products in HamePage'));

    getHotPricesProducts()
      .then((prod) => setHotPricesProducts(prod))
      .catch(() => console.error('cant load hot prices products in HomePage'));
  }, []);

  return (
    <>
      <div className="flex flex-col gap-14 sm:gap-16 lg:gap-20">
        <div>
          <PageTitle className="mt-6 mb-6 tablet:mt-8 tablet:mb-8 desktop:mt-14 desktop:mb-14">
            Welcome to Nice Gadgets store!
          </PageTitle>

          <BannerSlider className="-mx-4 tablet:mx-0" />
        </div>

        <ProductGrid
          title="Brand new models"
          products={newModelsProducts}
        />
        <ProductGrid
          title="Hot prices"
          products={hotPricesProducts}
          classNames="mb-14 sm:mb-16 lg:mb-20"
        />
      </div>
    </>
  );
}
