import type { Product } from '@/types/Product';

export const FILTER_KEYS = ['capacity', 'ram', 'year'] as const;

export type FilterKey = (typeof FILTER_KEYS)[number];

export type ProductFilters = {
  query: string;
  minPrice: number | null;
  maxPrice: number | null;
  capacity: string[];
  ram: string[];
  year: string[];
};

export type FilterOption = {
  value: string;
  count: number;
};

export const EMPTY_FILTERS: ProductFilters = {
  query: '',
  minPrice: null,
  maxPrice: null,
  capacity: [],
  ram: [],
  year: [],
};

function toSortableNumber(value: string): number {
  const number = parseFloat(value);

  if (value.endsWith('TB')) {
    return number * 1024;
  }

  if (value.endsWith('MB')) {
    return number / 1024;
  }

  return number;
}

export function getFilterOptions(
  products: Product[],
  key: FilterKey,
): FilterOption[] {
  const counts: Record<string, number> = {};

  products.forEach((product) => {
    const value = String(product[key]);

    counts[value] = (counts[value] ?? 0) + 1;
  });

  return Object.entries(counts)
    .map(([value, count]) => ({ value, count }))
    .sort((a, b) => toSortableNumber(a.value) - toSortableNumber(b.value));
}

export function getPriceBounds(products: Product[]) {
  const prices = products.map((product) => product.price);

  return {
    min: prices.length > 0 ? Math.min(...prices) : 0,
    max: prices.length > 0 ? Math.max(...prices) : 0,
  };
}

export function filterProducts(
  products: Product[],
  filters: ProductFilters,
): Product[] {
  const query = filters.query.trim().toLowerCase();

  return products.filter((product) => {
    if (query && !product.name.toLowerCase().includes(query)) {
      return false;
    }

    if (filters.minPrice !== null && product.price < filters.minPrice) {
      return false;
    }

    if (filters.maxPrice !== null && product.price > filters.maxPrice) {
      return false;
    }

    return FILTER_KEYS.every((key) => {
      const selected = filters[key];

      return selected.length === 0 || selected.includes(String(product[key]));
    });
  });
}

export function countActiveFilters(filters: ProductFilters): number {
  const listCount = FILTER_KEYS.reduce(
    (sum, key) => sum + filters[key].length,
    0,
  );
  const priceCount =
    filters.minPrice !== null || filters.maxPrice !== null ? 1 : 0;
  const queryCount = filters.query.trim() ? 1 : 0;

  return listCount + priceCount + queryCount;
}
