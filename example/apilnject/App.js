import { h, provide, inject } from '../../lib/guild-mini-vue.esm.js';
// import { Foo } from './Foo.js';
const Provider = {
  name: 'Provider',
  setup() {
    provide('foo', 'fooVal');
    provide('bar', 'barVal');
  },
  render() {
    return h('div', {}, [h('p', {}, 'provider'), h(ProviderTwo)]);
  },
};
const ProviderTwo = {
  name: 'ProviderTwo',
  setup() {
    provide('foo', 'footwo');
    const foo = inject('foo');
    return {
      foo,
    };
  },
  render() {
    return h('div', {}, [
      h('p', {}, 'ProviderTwo foo:' + this.foo),
      h(Consumer),
    ]);
  },
};
const Consumer = {
  name: 'Consumer',
  setup() {
    const foo = inject('foo');
    const bar = inject('bar');
    const baz = inject('baz', () => 'bazDefault');
    return {
      foo,
      bar,
      baz,
    };
  },
  render() {
    return h('div', {}, `consumer: ${this.foo}  - ${this.bar} - ${this.baz}`);
  },
};
export default {
  name: 'App',
  setup() {},
  render() {
    return h('div', {}, [h('p', {}, 'apiInject'), h(Provider)]);
  },
};
