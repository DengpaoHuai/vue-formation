import { reactive } from 'vue';

type Store = {
  demo: string;
  [index: string]: string;
};

const store = reactive<Store>({
  demo: 'demo',
});

const useCustomStore = () => {
  const setStore = (key: string, value: any) => {
    store[key] = value;
    console.log(store);
  };

  return {
    store,
    setStore,
  };
};

export default useCustomStore;
