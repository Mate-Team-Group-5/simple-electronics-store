import { useEffect, useState } from 'react';
import { getProducts } from '@/services/products';
import type { Product } from '@/types/Product';

export type Category = 'phones' | 'tablets' | 'accessories';

type LoadResult = {
  category: Category | null;
  products: Product[];
  hasError: boolean;
};

export function useProducts(category: Category) {
  const [result, setResult] = useState<LoadResult>({
    category: null,
    products: [],
    hasError: false,
  });

  useEffect(() => {
    let isCancelled = false;

    getProducts()
      .then((allProducts) => {
        if (!isCancelled) {
          setResult({
            category,
            products: allProducts.filter(
              (product) => product.category === category,
            ),
            hasError: false,
          });
        }
      })
      .catch(() => {
        if (!isCancelled) {
          setResult({ category, products: [], hasError: true });
        }
      });

    return () => {
      isCancelled = true;
    };
  }, [category]);

  const isLoading = result.category !== category;

  return {
    products: isLoading ? [] : result.products,
    isLoading,
    hasError: !isLoading && result.hasError,
  };
}
