import { useEffect, useState } from 'react';
import { getWarehouses } from '@/services/novaPoshta';
import type { WarehouseType, NovaPoshtaWarehouse } from '@/types/NovaPoshta';

const delay = 300;

export function useWarehouses(
  cityRef: string,
  type: WarehouseType,
  query: string,
) {
  const [warehouses, setWarehouses] = useState<NovaPoshtaWarehouse[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [hasError, setHasError] = useState(false);

  useEffect(() => {
    let ignore = false;

    const timerId = setTimeout(() => {
      setIsLoading(true);

      getWarehouses(cityRef, type, query)
        .then((result) => {
          if (!ignore) {
            setWarehouses(result);
            setHasError(false);
          }
        })
        .catch(() => {
          if (!ignore) {
            setHasError(true);
          }
        })
        .finally(() => {
          if (!ignore) {
            setIsLoading(false);
          }
        });
    }, delay);

    return () => {
      ignore = true;
      clearTimeout(timerId);
    };
  }, [cityRef, type, query]);

  return { warehouses, isLoading, hasError };
}
