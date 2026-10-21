import { useEffect, useState } from 'react';
import { getProducts } from '@/services/products';
import type { Product } from '@/types/Product';

// Loads all products only after isEnabled becomes true (e.g. first focus)
export function useAllProducts(isEnabled: boolean) {
  const [products, setProducts] = useState<Product[]>([]);
  const hasProducts = products.length > 0;

  useEffect(() => {
    if (!isEnabled || hasProducts) {
      return;
    }

    let isCancelled = false;

    getProducts()
      .then((loadedProducts) => {
        if (!isCancelled) {
          setProducts(loadedProducts);
        }
      })
      .catch(() => {
        // search just shows "nothing found" if products can't be loaded
      });

    return () => {
      isCancelled = true;
    };
  }, [isEnabled, hasProducts]);

  return products;
}
