import { onMounted, ref } from 'vue';

const useFetch = <T>(url: string) => {
  const data = ref<null | T>(null);
  const isLoading = ref(true);

  onMounted(() => {
    getPlanets(url);
  });

  const getPlanets = async (url: string) => {
    isLoading.value = true;
    const res = await fetch(url);
    const response = await res.json();
    data.value = response;
    isLoading.value = false;
  };

  return { data, isLoading };
};

export default useFetch;
