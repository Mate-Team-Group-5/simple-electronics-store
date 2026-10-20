import { client } from '../utils/fetchClient';
import type { Product } from '../types/Product';
import type { Phone } from '../types/Phone';
import type { Tablet } from '../types/Tablet';
import type { Accessory } from '../types/Accessory';

export const getProducts = () => {
  return client.get<Product[]>(`/products`);
};
export const getProductById = (id: number) => {
  return client.get<Product>(`/products/${id}`);
};
export const getProductsPaginated = (limit: number, offset: number) => {
  return client.get<Product[]>(`/products/?limit=${limit}&offset=${offset}`);
};

// Returns products sorted by year in descending order
// The most recent products will be at the beginning of the array
// It's for "Brand new models" section on the home page
export async function getNewModelsProducts() {
  const products = await getProducts();

  const result = products.toSorted(
    (product1, product2) => product2.year - product1.year,
  );

  return result;
}

// Returns products sorted by discount in descending order
// The products with higther discount will be at the beginning of the array
// It's for "Hot prices" section on the home page
export async function getHotPricesProducts() {
  const products = await getProducts();

  const result = products.toSorted(
    (product1, product2) =>
      product2.fullPrice -
      product2.price -
      (product1.fullPrice - product1.price),
  );

  return result;
}

export const getPhones = () => {
  return client.get<Phone[]>(`/phones`);
};
export const getPhonesCount = () => {
  return client.get<number>(`/phones/count`);
};

export const getTablets = () => {
  return client.get<Tablet[]>(`/tablets`);
};

export const getTabletsCount = () => {
  return client.get<number>(`/tablets/count`);
};

export const getAccessories = () => {
  return client.get<Accessory[]>(`/accessories`);
};

export const getAccessoriesCount = () => {
  return client.get<number>(`/accessories/count`);
};
