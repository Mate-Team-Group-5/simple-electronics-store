import type { CartProduct } from '@/types/Cart';
import { client } from '../utils/fetchClient';
import type { User } from '@/types/User';

type RegisterResponse = {
  message: string;
  user: User;
};

type LoginResponse = {
  message: string;
  token: string;
  user: User;
};

export const registerUser = (
  email: string,
  password: string,
  phone: string,
) => {
  return client.post<RegisterResponse>('/register', { email, password, phone });
};

export const loginUser = (email: string, password: string) => {
  return client.post<LoginResponse>('/login', { email, password });
};

export const getUser = (token: string) => {
  return client.get<User>('/user', token);
};

export const updateUserFavorites = (ids: number[], token: string) => {
  return client.put('/user', { favorites: ids }, token);
};

export const updateUserCart = (products: CartProduct[], token: string) => {
  return client.put('/user', { cart: products }, token);
};
