// 在 render 中使用 proxy 调用 emit 函数
// 也可以直接使用 this
// 验证 proxy 的实现逻辑
import { h } from '../../lib/guild-mini-vue.esm.js';
export default {
  name: 'Child',
  setup(props, { emit }) {},
  render(proxy) {
    return h('div', {}, [h('div', {}, 'child' + this.$props.msg)]);
  },
};
