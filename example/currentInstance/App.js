import { h, getCurrentInstance } from '../../lib/guild-mini-vue.esm.js';
import { Foo } from './Foo.js';
export const App = {
  name: 'App',
  render() {
    const app = h('div', {}, 'currentInstance');
    return h('div', {}, [app, h(Foo)]);
  },

  setup() {
    const instance = getCurrentInstance();
    console.log('APP::', instance);
    return {};
  },
};
