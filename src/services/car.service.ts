import httpClient from '@/lib/http-client';
import type { Car } from '@/schemas/car.schema';

export const addcar = async (car: Omit<Car, '_id'>) => {
  const res = httpClient.post('/cars', car);
  return res;
};

export const getcars = async () => {
  const res = httpClient.get('/cars');
  return res;
};
