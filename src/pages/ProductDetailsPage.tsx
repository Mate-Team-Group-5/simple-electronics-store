import type { Category } from '@/hooks/useProducts';
import { useParams } from 'react-router';
import React from 'react';
import { useProductDetails } from '@/hooks/useProductDetails';
import { Loader } from '@/components/atoms/Loader/Loader';
import { ErrorMessage } from '@/components/molecules/ErrorMessage/ErrorMessage';
import { PageTitle } from '@/components/atoms/PageTitle/PageTitle';
import { ProductGallery } from '@/components/organisms/ProductGallery';
import { ProductPurchase } from '@/components/organisms/ProductPurchase';

type Props = {
  category: Category;
};

export const ProductDetailsPage: React.FC<Props> = ({ category }) => {
  const { productId } = useParams();
  const { product, isLoading, hasError } = useProductDetails(productId);

  function renderContent() {
    if (isLoading) {
      return <Loader />;
    }
    if (hasError) {
      return <ErrorMessage message="Something went wrong. Please try again." />;
    }
    if (!product) {
      return <ErrorMessage message="Product not found" />;
    }
    return (
      <>
        <PageTitle className="mt-6 tablet:mt-10">{product?.name}</PageTitle>
        <section className="mt-8 grid grid-cols-1 gap-8 tablet:grid-cols-2">
          <ProductGallery
            // key={product.id}
            images={product.images}
            name={product.name}
          />
          <ProductPurchase
            product={product}
            category={category}
          />
        </section>

        <section className="mt-14 grid grid-cols-1 gap-14 desktop:grid-cols-2">
          <div className="min-h-64 border">About</div>
          <div className="min-h-64 border">Tech specs</div>
        </section>
      </>
    );
  }
  return renderContent();
};
