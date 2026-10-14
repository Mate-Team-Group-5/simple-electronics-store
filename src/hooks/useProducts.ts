import { useEffect, useState } from 'react';
import { getProducts } from '@/services/products';
import type { Product } from '@/types/Product';
import type { ProductCategory } from '@/types/ProductCategory';

export type Category = Exclude<ProductCategory, 'all'>;

type LoadResult = {
  requestKey: string | null;
  products: Product[];
  hasError: boolean;
};

export function useProducts(category: Category) {
  const [attempt, setAttempt] = useState(0);
  const [result, setResult] = useState<LoadResult>({
    requestKey: null,
    products: [],
    hasError: false,
  });

  const requestKey = `${category}-${attempt}`;

  useEffect(() => {
    let isCancelled = false;

    getProducts()
      .then((allProducts) => {
        if (!isCancelled) {
          setResult({
            requestKey,
            products: allProducts.filter(
              (product) => product.category === category,
            ),
            hasError: false,
          });
        }
      })
      .catch(() => {
        if (!isCancelled) {
          setResult({ requestKey, products: [], hasError: true });
        }
      });

    return () => {
      isCancelled = true;
    };
  }, [category, requestKey]);

  const isLoading = result.requestKey !== requestKey;

  const reload = () => {
    setAttempt((prev) => prev + 1);
  };

  return {
    products: isLoading ? [] : result.products,
    isLoading,
    hasError: !isLoading && result.hasError,
    reload,
  };
}
