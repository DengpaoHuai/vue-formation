import { setActivePinia, createPinia } from 'pinia';
import { flushPromises } from '@vue/test-utils';
import { describe, it, expect, vi, beforeEach } from 'vitest';
import useCarStore from '@/stores/useCarStore';
import type { Car } from '@/schemas/car.schema';
import { createCarApi, deletecar, getcars, updatecar } from '@/services/car.service';

vi.mock('@/services/car.service', () => ({
  createCarApi: vi.fn(),
  deletecar: vi.fn(),
  getcars: vi.fn(),
  updatecar: vi.fn(),
}));

describe('useCarStore', () => {
  beforeEach(() => {
    setActivePinia(createPinia());
  });

  it('getCars sets cars from service', async () => {
    const fakeCars: Car[] = [
      { _id: '1', brand: 'Toyota', model: 'Corolla', year: 2020 },
      { _id: '2', brand: 'Honda', model: 'Civic', year: 2021 },
    ];
    (getcars as any).mockResolvedValue({ data: fakeCars });

    const store = useCarStore();
    await store.getCars();
    expect(store.cars).toEqual(fakeCars);
  });

  it('deleteCar removes a car from the list', async () => {
    const initialCars: Car[] = [
      { _id: '1', brand: 'Toyota', model: 'Corolla', year: 2020 },
      { _id: '2', brand: 'Honda', model: 'Civic', year: 2021 },
    ];
    const store = useCarStore();
    store.cars = initialCars;
    (deletecar as any).mockResolvedValue({});
    store.deleteCar('1');
    await flushPromises();
    expect(store.cars).toEqual([initialCars[1]]);
  });

  it('addCar appends a new car to the list', async () => {
    const newCarInput = { brand: 'Ford', model: 'Focus', year: 2019 };
    const newCar: Car = { _id: '3', ...newCarInput };
    const store = useCarStore();
    store.cars = [];
    (createCarApi as any).mockResolvedValue({ data: newCar });
    await store.addCar(newCarInput);
    expect(store.cars).toEqual([newCar]);
  });

  it('getCarById returns the correct car', () => {
    const car1: Car = { _id: '1', brand: 'Toyota', model: 'Corolla', year: 2020 };
    const car2: Car = { _id: '2', brand: 'Honda', model: 'Civic', year: 2021 };
    const store = useCarStore();
    store.cars = [car1, car2];
    expect(store.getCarById('2')).toEqual(car2);
    expect(store.getCarById('non-existent')).toBeUndefined();
  });

  it('updateCar updates an existing car', async () => {
    const car1: Car = { _id: '1', brand: 'Toyota', model: 'Corolla', year: 2020 };
    const store = useCarStore();
    store.cars = [car1];
    const updatedData = { model: 'Camry' };
    (updatecar as any).mockResolvedValue({});
    await store.updateCar('1', updatedData);
    expect(store.cars[0]).toEqual({ ...car1, ...updatedData });
  });
});
