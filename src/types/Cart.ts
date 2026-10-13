import type { Product } from './Product';

export type CartProduct = {
  id: Product['id'];
  quantity: number;
  product: Product;
};
