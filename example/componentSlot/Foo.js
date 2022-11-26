import { h, renderSlots } from '../../lib/guild-mini-vue.esm.js';

export const Foo = {
  setup() {
    return {};
  },
  render() {
    const foo = h('div', {}, 'foo');
    console.log('%c this.$slots', 'color: red');
    console.log(this.$slots);
    const age = 19;
    return h('div', {}, [
      renderSlots(this.$slots, 'header', { age }),
      foo,
      renderSlots(this.$slots, 'footer'),
    ]);
  },
};
