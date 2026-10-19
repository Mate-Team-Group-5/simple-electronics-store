import { getProductsPaginated } from '@/services/products';
import { useCallback, useState } from 'react';
import type { Product } from '@/types/Product';

export function useLoadMoreProducts(limit: number) {
  const [products, setProducts] = useState<(Product | null)[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [hasMore, setHasMore] = useState(true);

  const loadMoreProducts = useCallback(async () => {
    if (isLoading || !hasMore) return;

    // Скільки реальних продуктів вже було запитано
    const offset = products.filter((product) => product !== null).length;

    // Запам'ятовуємо, де почалися нові skeleton-елементи
    const placeholdersStart = products.length;

    // Одразу додаємо limit порожніх місць для skeleton-карток
    setProducts((currentProducts) => [
      ...currentProducts,
      ...Array(limit).fill(null),
    ]);

    setIsLoading(true);

    try {
      const newProducts = await getProductsPaginated(limit, offset);

      setProducts((currentProducts) => [
        // Усі старі продукти до нової порції
        ...currentProducts.slice(0, placeholdersStart),
        // Замінюємо null на отримані продукти
        ...newProducts,
      ]);

      // Якщо сервер повернув менше продуктів за limit — це кінець списку
      if (newProducts.length < limit) {
        setHasMore(false);
      }
    } catch (error) {
      console.error("Can't load products", error);

      // При помилці прибираємо створені null-заглушки
      setProducts((currentProducts) =>
        currentProducts.slice(0, placeholdersStart),
      );
    } finally {
      setIsLoading(false);
    }
  }, [limit, products, isLoading, hasMore]);

  return {
    products,
    loadMoreProducts,
    isLoading,
    hasMore,
  };
}
