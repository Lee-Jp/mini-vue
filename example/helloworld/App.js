import { h } from '../../lib/guild-mini-vue.esm.js';
import { Foo } from './Foo.js';
window.self = null;
export const App = {
  name:'App',
  render() {
    window.self = this;
    return h(
      'div',
      {
        id: 'root',
        class: ['red', 'hard'],
        onClick() {
          console.log('1');
        },
        onMousedown() {
          console.log('%c mouse', 'color: red');
        },
      },
      [
        h('div', {}, 'hi' + this.msg),
        h(Foo, {
          count: 1,
        }),
      ]
      // [h('p', { class: 'red' }, 'hi'), h('p', { class: 'blue' }, 'mini-vue')]
      // 'hei'
      // this.msg
    );
  },

  setup() {
    return {
      msg: 'mini vue',
    };
  },
};
