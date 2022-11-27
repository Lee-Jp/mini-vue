import { effect } from '../reactivity/effect';
import { isObject } from '../shared/index';
import { ShapeFlags } from '../shared/shapeFlags';
import { createComponentInstance, setupComponent } from './components';
import { createAppAPI } from './createApp';
import { Fragment, Text } from './vnode';

export function createRenderer(options) {
  const {
    createElement: hostCreateElement,
    patchProp: hostPatchProp,
    insert: hostInsert,
  } = options;
  function render(vnode, container) {
    patch(null, vnode, container, null);
  }
  // n1 老的 n2 新的
  function patch(n1, n2, container, parentComponent) {
    const { type, shapeFlag } = n2;
    // Fragment => 只渲染 children
    switch (type) {
      case Fragment:
        processFragment(n1, n2, container, parentComponent);
        break;

      case Text:
        processText(n1, n2, container);
        break;

      default:
        if (shapeFlag & ShapeFlags.ELEMENT) {
          processElement(n1, n2, container, parentComponent);
        } else if (shapeFlag && ShapeFlags.STATEFUL_COMPONENT) {
          processComponent(n1, n2, container, parentComponent);
        }
    }
  }
  function processFragment(
    n1: any,
    n2: any,
    container: any,
    parentComponent: any
  ) {
    mountChildren(n2, container, parentComponent);
  }
  function processText(n1: any, n2: any, container: any) {
    const { children } = n2;
    const textNode = (n2.el = document.createTextNode(children));
    container.append(textNode);
  }
  function processElement(
    n1: any,
    n2: any,
    container: any,
    parentComponent: any
  ) {
    if (!n1) {
      mountElement(n2, container, parentComponent);
    } else {
      patchElement(n1, n2, container);
    }
  }
  function patchElement(n1: any, n2: any, container: any) {
    // props
    console.log('%c patchElement', 'color: red');
    console.log('n1 :>> ', n1);
    console.log('n2 :>> ', n2);

    // children
  }
  function mountElement(vnode: any, container: any, parentComponent: any) {
    const el = (vnode.el = hostCreateElement(vnode.type));
    const { children, props, shapeFlag } = vnode;
    if (shapeFlag & ShapeFlags.TEXT_CHILDREN) {
      el.textContent = children;
    } else if (shapeFlag & ShapeFlags.ARRAY_CHILDREN) {
      mountChildren(vnode, el, parentComponent);
    }
    for (const key in props) {
      console.log(key);
      const val = props[key];
      hostPatchProp(el, key, val);
    }
    hostInsert(el, container);
  }
  function mountChildren(vnode: any, container: any, parentComponent: any) {
    vnode.children.forEach((v) => {
      patch(null, v, container, parentComponent);
    });
  }

  function processComponent(
    n1: any,
    n2: any,
    container: any,
    parentComponent: any
  ) {
    mountComponent(n2, container, parentComponent);
  }

  function mountComponent(
    initialVNode: any,
    container: any,
    parentComponent: any
  ) {
    const instance = createComponentInstance(initialVNode, parentComponent);
    setupComponent(instance);
    setupRenderEffect(instance, initialVNode, container);
  }
  function setupRenderEffect(instance: any, initialVNode: any, container: any) {
    effect(() => {
      if (!instance.isMounted) {
        console.log('%c 初始化', 'color: red');
        const { proxy } = instance;
        const subTree = (instance.subTree = instance.render.call(proxy));
        patch(null, subTree, container, instance);
        initialVNode.el = subTree.el;
        instance.isMounted = true;
      } else {
        console.log('%c 更新', 'color: red');
        const { proxy } = instance;
        const subTree = instance.render.call(proxy);
        const prevSubTree = instance.subTree;
        instance.subTree = subTree;
        patch(prevSubTree, subTree, container, instance);
      }
    });
  }
  return {
    createApp: createAppAPI(render),
  };
}
