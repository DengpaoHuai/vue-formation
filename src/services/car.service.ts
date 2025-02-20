import httpClient from '@/lib/http-client';
import type { Car } from '@/schemas/car.schema';

export const createCarApi = async (car: Omit<Car, '_id'>) => {
  const res = httpClient.post('/cars', car);
  return res;
};

export const getcars = async () => {
  const res = httpClient.get('/cars');
  return res;
};

export const deletecar = async (id: string) => {
  return httpClient.delete(`/cars/${id}`);
};
