import { onMounted, ref } from 'vue';

const useFetch = <T>(url: string) => {
  const data = ref<null | T>(null);
  const isLoading = ref(true);
  const error = ref<string | null>(null);

  onMounted(() => {
    getPlanets(url).catch((err: unknown) => {
      //narrowing
      if (err instanceof Error) {
        console.error(err.message);
        error.value = err.message;
      } else if (typeof err === 'string') {
        console.error(err);
        error.value = err;
      } else {
        console.error(err);
        error.value = 'An error occured';
      }
    });
  });

  const getPlanets = async (url: string) => {
    isLoading.value = true;
    const res = await fetch(url);
    const response = await res.json();
    data.value = response;
    isLoading.value = false;
  };

  return { data, isLoading, error };
};

export default useFetch;
