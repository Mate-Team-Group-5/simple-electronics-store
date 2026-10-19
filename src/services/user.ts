import { client } from '../utils/fetchClient';

export const registerUser = (
  email: string,
  password: string,
  phone: string,
) => {
  return client.post('/api/register', { email, password, phone });
};

export const loginUser = (email: string, password: string) => {
  return client.post('/api/login', { email, password });
};
