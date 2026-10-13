import { client } from '../utils/fetchClient';
import type { Product } from '../types/Product';
import type { Phone } from '../types/Phone';
import type { Tablet } from '../types/Tablet';
import type { Accessory } from '../types/Accessory';

export const getProducts = () => {
  return client.get<Product[]>(`/products.json`);
};

export function getNewModelsProducts() {
  getProducts().then((products) => {
    return products.toSorted(
      (product1, product2) => product1.year - product2.year,
    );
  });
}

export const getPhones = () => {
  return client.get<Phone[]>(`/phones.json`);
};

export const getTablets = () => {
  return client.get<Tablet[]>(`/tablets.json`);
};

export const getAccessories = () => {
  return client.get<Accessory[]>(`/accessories.json`);
};
