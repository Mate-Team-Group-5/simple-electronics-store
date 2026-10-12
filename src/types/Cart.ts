import type { Product } from './Product';

export type CartProduct = {
  id: Product['itemId'];
  quantity: number;
  product: Product;
};
