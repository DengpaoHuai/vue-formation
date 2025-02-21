import { describe, it, expect, vi, beforeEach } from 'vitest';
import { mount } from '@vue/test-utils';
import { ref } from 'vue';
import PlanetListPaginated from '@/views/PlanetListPaginated.vue';

type Planet = {
  name: string;
  population: string;
  climate: string;
  terrain: string;
  films: string[];
  url: string;
};

type ApiResponse<T> = {
  count: number;
  next: string | null;
  previous: string | null;
  results: T[];
};

let fakeData = ref<ApiResponse<Planet>>({
  count: 1,
  next: 'next-url',
  previous: null,
  results: [
    {
      name: 'Tatooine',
      population: '200000',
      climate: 'arid',
      terrain: 'desert',
      films: ['film1', 'film2'],
      url: 'https://swapi.dev/api/planets/1/',
    },
  ],
});

vi.mock('@tanstack/vue-query', () => ({
  useQuery: vi.fn(() => ({ data: fakeData })),
}));

const CardComponentListStub = {
  template: `<div>
    <slot name="title" :message="'Test Message'" :toto="'Test Toto'"></slot>
    <slot name="nomquetuveux"></slot>
    <div class="planets">{{ planets }}</div>
  </div>`,
  props: ['planets'],
};

const RouterLinkStub = {
  template: `<a><slot /></a>`,
};

describe('MyComponent', () => {
  let wrapper: ReturnType<typeof mount>;

  beforeEach(() => {
    fakeData.value = {
      count: 1,
      next: 'next-url',
      previous: null,
      results: [
        {
          name: 'Tatooine',
          population: '200000',
          climate: 'arid',
          terrain: 'desert',
          films: ['film1', 'film2'],
          url: 'https://swapi.dev/api/planets/1/',
        },
      ],
    };

    wrapper = mount(PlanetListPaginated, {
      global: {
        stubs: {
          RouterLink: RouterLinkStub,
          CardComponentList: CardComponentListStub,
        },
      },
    });
  });

  it('affiche correctement les éléments du composant', () => {
    expect(wrapper.find('h1').text()).toBe('Star Wars Planets');
    const prevButton = wrapper.find('button:nth-of-type(1)');
    const nextButton = wrapper.find('button:nth-of-type(2)');
    expect(prevButton.exists()).toBe(true);
    expect(nextButton.exists()).toBe(true);
    expect(prevButton.attributes('disabled')).toBeDefined();
    expect(nextButton.attributes('disabled')).toBeUndefined();
    expect(wrapper.find('a').text()).toContain('Car list');
    expect(wrapper.find('.planets').text()).toContain('Tatooine');
    expect(wrapper.html()).toContain('Test Message - Test Toto');
    expect(wrapper.html()).toContain('<p>toto</p>');
  });

  it('met à jour l’état des boutons lorsque les données changent', async () => {
    fakeData.value = {
      count: 1,
      next: null,
      previous: 'prev-url',
      results: [
        {
          name: 'Naboo',
          population: '4500000',
          climate: 'temperate',
          terrain: 'grassy hills, swamps, forests, mountains',
          films: ['film3', 'film4'],
          url: 'https://swapi.dev/api/planets/8/',
        },
      ],
    };
    await wrapper.vm.$nextTick();
    const prevButton = wrapper.find('button:nth-of-type(1)');
    const nextButton = wrapper.find('button:nth-of-type(2)');
    expect(prevButton.attributes('disabled')).toBeUndefined();
    expect(nextButton.attributes('disabled')).toBeDefined();
    expect(wrapper.find('.planets').text()).toContain('Naboo');
  });
});
