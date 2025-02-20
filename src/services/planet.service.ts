const waitFor = (ms: number) => new Promise((r) => setTimeout(r, ms));

export type Planet = {
  name: string;
  population: string;
  climate: string;
  terrain: string;
  films: string[];
  url: string;
};

const getPlanets = async (page: number) => {
  await waitFor(1000);
  const response = await fetch(`https://swapi.dev/api/planets/?page=${page}`);
  const data = await response.json();
  return data;
};

export default getPlanets;
