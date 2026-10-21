import type { Product } from '@/types/Product';

const SIZE_PATTERN = /\s\d+(GB|TB|mm)\b.*$/;

function getModelKey(product: Product) {
  return `${product.category}|${product.name.replace(SIZE_PATTERN, '')}`;
}

// Every word of the query must be in the product name.
// Variants of one model are merged: the cheapest matching variant is shown.
export function searchProducts(
  products: Product[],
  query: string,
  limit: number,
): Product[] {
  const words = query.toLowerCase().split(/\s+/).filter(Boolean);

  if (words.length === 0) {
    return [];
  }

  const models = new Map<string, Product>();

  for (const product of products) {
    const name = product.name.toLowerCase();

    if (!words.every((word) => name.includes(word))) {
      continue;
    }

    const key = getModelKey(product);
    const current = models.get(key);

    if (!current || product.price < current.price) {
      models.set(key, product);
    }
  }

  return [...models.values()].slice(0, limit);
}
