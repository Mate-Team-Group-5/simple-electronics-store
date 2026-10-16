import { useEffect, useState } from 'react';
import type { Phone } from '@/types/Phone';
import { getPhones, getProducts } from '@/services/products';

export function useProductDetails(productId: string | undefined) {
  const [product, setProduct] = useState<Phone | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [hasError, setHasError] = useState(false);
  const [catalogId, setCatalogId] = useState<number | null>(null);
  useEffect(() => {
    Promise.all([getPhones(), getProducts()])
      .then(([phones, products]) => {
        setProduct(phones.find((phone) => phone.id === productId) ?? null);
        setCatalogId(
          products.find((productLocal) => productLocal.itemId === productId)
            ?.id ?? null,
        );
        setHasError(false);
      })
      .catch(() => setHasError(true))
      .finally(() => setIsLoading(false));
  }, [productId]);

  return { product, isLoading, hasError, catalogId };
}
