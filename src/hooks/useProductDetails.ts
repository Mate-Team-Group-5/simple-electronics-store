import { useEffect, useState } from 'react';
import { getPhones } from '@/services/products';
import type { Phone } from '@/types/Phone';

export function useProductDetails(productId: string | undefined) {
  const [product, setProduct] = useState<Phone | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [hasError, setHasError] = useState(false);

  useEffect(() => {
    getPhones()
      .then((phones) => {
        setProduct(phones.find((phone) => phone.id === productId) ?? null);
        setHasError(false);
      })
      .catch(() => setHasError(true))
      .finally(() => setIsLoading(false));
  }, [productId]);

  return { product, isLoading, hasError };
}
