import { client } from '../utils/fetchClient';
import { type Product } from '../types/Product';

export const getProducts = () => {
  return client.get<Product[]>(`/products.json`);
};
