import { client } from '@/utils/fetchClient';

export type User = {
  id: number;
  email: string;
  phone: string;
  favorites: number[];
  cart: unknown[];
};

export type RegisterData = {
  email: string;
  password: string;
  phone: string;
};

type RegisterResponse = {
  message: string;
  user: User;
};

export function register(data: RegisterData) {
  return client.post<RegisterResponse>('/register', data);
}
