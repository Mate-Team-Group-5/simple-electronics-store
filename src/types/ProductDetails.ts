import type { Phone } from './Phone';

export type ProductDetails = Omit<Phone, 'camera' | 'zoom'> & {
  camera?: string;
  zoom?: string;
};
