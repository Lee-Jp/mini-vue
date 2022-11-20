import { h } from '../../lib/guild-mini-vue.esm.js';
export const App = {
  render() {
    return h(
      'div',
      {
        id: 'root',
        class: ['red', 'hard'],
      },
      [h('p', { class: 'red' }, 'hi'), h('p', { class: 'blue' }, 'mini-vue')]
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
