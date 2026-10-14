import type { Category } from '@/hooks/useProducts';
import { useParams } from 'react-router';
import React from 'react';
import { useProductDetails } from '@/hooks/useProductDetails';
import { Loader } from '@/components/atoms/Loader/Loader';
import { ErrorMessage } from '@/components/molecules/ErrorMessage/ErrorMessage';

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
    return product.name;
  }
  return (
    <div>
      {category}
      <br />
      {productId}
      <br />
      {renderContent()}
    </div>
  );
};
