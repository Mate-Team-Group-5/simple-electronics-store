import { useParams } from 'react-router';
import React, { useRef } from 'react';
import { Loader } from '@/components/atoms/Loader/Loader';
import { ErrorMessage } from '@/components/molecules/ErrorMessage/ErrorMessage';
import { PageTitle } from '@/components/atoms/PageTitle/PageTitle';
import { ProductGallery } from '@/components/organisms/ProductGallery';
import { ProductPurchase } from '@/components/organisms/ProductPurchase';
import { TechSpecs } from '@/components/organisms/TechSpecs';
import { ProductAbout } from '@/components/organisms/ProductAbout';
import { ProductGrid } from '@/components/organisms/ProductGrid';
import type { Category } from '@/hooks/useProducts';
import { useProductDetails } from '@/hooks/useProductDetails';
import { useLanguage } from '@/context/LanguageContext';

type Props = {
  category: Category;
};
export const ProductDetailsPage: React.FC<Props> = ({ category }) => {
  const { t } = useLanguage();
  const { productId } = useParams();
  const mainImageRef = useRef<HTMLImageElement>(null);
  const { product, isLoading, hasError, catalogProduct, allProducts } =
    useProductDetails(category, productId);
  function renderContent() {
    if (isLoading) {
      return <Loader />;
    }
    if (hasError) {
      return <ErrorMessage message={t('common.error')} />;
    }
    if (!product) {
      return <ErrorMessage message={t('details.notFound')} />;
    }
    return (
      <>
        <PageTitle className="mt-6 tablet:mt-10">{product?.name}</PageTitle>
        <section className="mt-8 grid grid-cols-1 gap-8 tablet:grid-cols-2">
          <ProductGallery
            // key={product.id}
            images={product.images}
            name={product.name}
            imageRef={mainImageRef}
          />
          <ProductPurchase
            product={product}
            category={category}
            catalogProduct={catalogProduct}
            flySourceRef={mainImageRef}
          />
        </section>

        <section className="mt-14 grid grid-cols-1 gap-6 desktop:grid-cols-2">
          <ProductAbout description={product.description} />
          <TechSpecs product={product} />
        </section>

        <ProductGrid
          title={t('details.alsoLike')}
          products={allProducts}
          classNames="mt-20"
        />
      </>
    );
  }
  return renderContent();
};
