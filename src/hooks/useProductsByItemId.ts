import { useEffect, useState } from 'react';
import { getProducts } from '@/services/products';
import type { Product } from '@/types/Product';

export function useProductsByItemId(isEnabled: boolean) {
  const [productsByItemId, setProductsByItemId] = useState<
    Map<string, Product>
  >(new Map());

  const hasProducts = productsByItemId.size > 0;

  useEffect(() => {
    if (!isEnabled || hasProducts) {
      return;
    }

    let isCancelled = false;

    getProducts()
      .then((products) => {
        if (!isCancelled) {
          setProductsByItemId(
            new Map(products.map((product) => [product.itemId, product])),
          );
        }
      })
      .catch(() => {
        // without products the chat just shows text, no cards
      });

    return () => {
      isCancelled = true;
    };
  }, [isEnabled, hasProducts]);

  return productsByItemId;
}
