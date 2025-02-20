import type { Car } from '@/schemas/car.schema';
import { createCarApi, deletecar, getcars } from '@/services/car.service';
import { defineStore } from 'pinia';
import { onMounted, ref } from 'vue';

const useCarStore = defineStore('car', () => {
  const cars = ref<Car[]>([]);

  onMounted(() => {
    getcars().then((data) => {
      cars.value = data.data;
    });
  });

  const deleteCar = (id: string) => {
    deletecar(id).then(() => {
      cars.value = cars.value.filter((car) => car._id !== id);
    });
  };

  const addCar = async (car: Omit<Car, '_id'>) => {
    const res = await createCarApi(car);
    cars.value = [...cars.value, res.data];
  };

  return { cars, deleteCar, addCar };
});

export default useCarStore;
