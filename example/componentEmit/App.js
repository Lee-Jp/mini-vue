import { h } from '../../lib/guild-mini-vue.esm.js';
import { Foo } from './Foo.js';
export const App = {
  name: 'App',
  render() {
    return h('div', {}, [
      h('div', {}, 'App'),
      h(Foo, {
        onAdd(a,b) {
          console.log('%c onAdd', 'color: red');
          console.log(a,b);
        },
        onAddFoo(){
          console.log('%c onAddFoo', 'color: red')
        }
      }),
    ]);
  },

  setup() {
    return {};
  },
};
