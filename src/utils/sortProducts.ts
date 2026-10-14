import type { Product } from '@/types/Product';

export type SortType = 'newest' | 'alphabetically' | 'cheapest';

export function sortProducts(products: Product[], sort: SortType) {
  return products.toSorted((product1, product2) => {
    switch (sort) {
      case 'alphabetically':
        return product1.name.localeCompare(product2.name);

      case 'cheapest':
        return product1.price - product2.price;

      case 'newest':
      default:
        return product2.year - product1.year;
    }
  });
}
