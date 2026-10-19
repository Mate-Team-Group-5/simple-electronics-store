import { useEffect, useState } from 'react';
import { searchCities } from '@/services/novaPoshta';
import type { NovaPoshtaCity } from '@/types/NovaPoshta';

const delay = 300;

export function useCitySearch(query: string) {
  const [cities, setCities] = useState<NovaPoshtaCity[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [hasError, setHasError] = useState(false);

  useEffect(() => {
    let ignore = false;

    const timerId = setTimeout(() => {
      setIsLoading(true);

      searchCities(query)
        .then((result) => {
          if (!ignore) {
            setCities(result);
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
  }, [query]);

  return { cities, isLoading, hasError };
}
