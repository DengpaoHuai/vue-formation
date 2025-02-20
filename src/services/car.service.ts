import httpClient from '@/lib/http-client';
import type { Car } from '@/schemas/car.schema';

export const createCarApi = async (car: Omit<Car, '_id'>) => {
  const res = httpClient.post('/cars', car);
  return res;
};

export const getcars = async () => {
  const res = await httpClient.get('/cars');
  return res.data;
};

const waitFor = (ms: number) => new Promise((r) => setTimeout(r, ms));

export const deletecar = async (id: string) => {
  await waitFor(1000);
  throw new Error('test');
};

export const updatecar = async (id: string, car: Partial<Omit<Car, '_id'>>) => {
  return httpClient.put(`/cars/${id}`, car);
};
