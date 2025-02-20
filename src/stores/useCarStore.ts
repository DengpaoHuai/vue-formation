import type { Car } from '@/schemas/car.schema';
import { createCarApi, deletecar, getcars, updatecar } from '@/services/car.service';
import { defineStore } from 'pinia';
import { onMounted, ref } from 'vue';

const useCarStore = defineStore('car', () => {
  const cars = ref<Car[]>([]);

  onMounted(() => {
    getCars();
  });

  const getCars = async () => {
    const res = await getcars();
    cars.value = res.data;
  };

  const deleteCar = (id: string) => {
    deletecar(id).then(() => {
      cars.value = cars.value.filter((car) => car._id !== id);
    });
  };

  const addCar = async (car: Omit<Car, '_id'>) => {
    const res = await createCarApi(car);
    cars.value = [...cars.value, res.data];
  };

  const getCarById = (id: string) => {
    return cars.value.find((car) => car._id === id);
  };

  const updateCar = async (id: string, car: Partial<Omit<Car, '_id'>>) => {
    const index = cars.value.findIndex((c) => c._id === id);
    await updatecar(id, car);
    cars.value[index] = {
      ...cars.value[index],
      ...car,
    };
  };

  return { cars, deleteCar, addCar, getCarById, getCars, updateCar };
});

export default useCarStore;
