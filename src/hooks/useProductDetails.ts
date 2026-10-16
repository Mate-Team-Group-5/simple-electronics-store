import { useEffect, useState } from 'react';
import type { Product } from '@/types/Product';
import {
  getAccessories,
  getPhones,
  getProducts,
  getTablets,
} from '@/services/products';
import type { Category } from '@/hooks/useProducts';
import type { ProductDetails } from '@/types/ProductDetails';

const loaders = {
  phones: getPhones,
  tablets: getTablets,
  accessories: getAccessories,
};
export function useProductDetails(
  category: Category,
  productId: string | undefined,
) {
  const [product, setProduct] = useState<ProductDetails | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [hasError, setHasError] = useState(false);
  const [catalogProduct, setCatalogProduct] = useState<Product | null>(null);
  const [allProducts, setAllProducts] = useState<Product[]>([]);
  useEffect(() => {
    Promise.all([loaders[category](), getProducts()])
      .then(([phones, products]) => {
        setProduct(phones.find((phone) => phone.id === productId) ?? null);
        setAllProducts(products);
        setCatalogProduct(
          products.find((productLocal) => productLocal.itemId === productId) ??
            null,
        );
        setHasError(false);
      })
      .catch(() => setHasError(true))
      .finally(() => setIsLoading(false));
  }, [category, productId]);

  return { product, isLoading, hasError, catalogProduct, allProducts };
}
