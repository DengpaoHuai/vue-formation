import type { App } from 'vue';
import DemoComponent from './ui/DemoComponent.vue';

const myPlugin = {
  install(app: App<Element>) {
    app.component('DemoComponent', DemoComponent);

    const vFocus = {
      mounted(el: HTMLInputElement) {
        el.focus();
      },
    };

    app.directive('focus', vFocus);

    app.provide('myPlugin', {
      foo: 'bar',
    });
  },
};

export default myPlugin;
