// 老的是 text
// 新的是 text

import { h, ref } from '../../lib/guild-mini-vue.esm.js';
const nextChildren = [h("div", {}, "A"), h("div", {}, "B")];
const prevChildren = "oldChildren";

export default {
  name: 'TextToText',
  setup() {
    const isChange = ref(false);
    window.isChange = isChange;

    return {
      isChange,
    };
  },
  render() {
    const self = this;

    return self.isChange === true
      ? h('div', {}, nextChildren)
      : h('div', {}, prevChildren);
  },
};
