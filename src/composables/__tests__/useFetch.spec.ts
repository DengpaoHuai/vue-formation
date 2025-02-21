import { mount, flushPromises } from '@vue/test-utils';
import { defineComponent } from 'vue';
import { describe, it, expect, vi, afterEach } from 'vitest';
import useFetch from '@/composables/useFetch';

describe('useFetch composable', () => {
  afterEach(() => {
    vi.restoreAllMocks();
  });

  const TestComponent = defineComponent({
    props: {
      url: { type: String, required: true },
    },
    setup(props) {
      return useFetch<{ message: string }>(props.url);
    },
    template: `<div></div>`,
  });

  it('fetches data successfully', async () => {
    const fakeResponse = { message: 'Hello world' };
    vi.spyOn(global, 'fetch').mockResolvedValue({
      json: vi.fn().mockResolvedValue(fakeResponse),
    } as unknown as Response);

    const wrapper = mount(TestComponent, {
      props: { url: 'https://api.example.com/data' },
    });

    await flushPromises();

    expect(wrapper.vm.data).toEqual(fakeResponse);
    expect(wrapper.vm.isLoading).toBe(false);
    expect(wrapper.vm.error).toBeNull();
  });

  it('handles error during fetch', async () => {
    vi.spyOn(global, 'fetch').mockRejectedValue(new Error('Network error'));

    const wrapper = mount(TestComponent, {
      props: { url: 'https://api.example.com/data' },
    });

    await flushPromises();

    expect(wrapper.vm.data).toBeNull();
    expect(wrapper.vm.error).toBe('Network error');
    expect(wrapper.vm.isLoading).toBe(true);
  });
});
