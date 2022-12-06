import {
  getCurrentInstance,
  h,
  ref,
  nextTick,
} from '../../lib/guild-mini-vue.esm.js';
export const App = {
  name: 'App',
  setup() {
    const count = ref(0);
    const instance = getCurrentInstance();
    const onClick = () => {
      for (let i = 0; i < 100; i++) {
        console.log('update');
        count.value = i;
      }
      console.log(instance);
      nextTick(() => {
        console.log(111, instance);
      });
      // await nextTick();
    };
    return {
      count,
      onClick,
    };
  },
  render() {
    return h('div', {}, [
      h('div', {}, 'count:' + this.count),
      h(
        'button',
        {
          onClick: this.onClick,
        },
        'update'
      ),
    ]);
  },
};
