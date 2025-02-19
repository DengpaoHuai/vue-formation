import httpClient from '@/lib/http-client';
import type { Car } from '@/schemas/car.schema';

export const addcar = async (car: Car) => {
  const res = httpClient.post('/cars', car);
  return res;
};
