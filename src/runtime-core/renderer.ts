import { isObject } from '../shared/index';
import { ShapeFlags } from '../shared/shapeFlags';
import { createComponentInstance, setupComponent } from './components';
import { Fragment, Text } from './vnode';

export function render(vnode, container) {
  patch(vnode, container, null);
}
function patch(vnode, container, parentComponent) {
  const { type, shapeFlag } = vnode;
  // Fragment => 只渲染 children
  switch (type) {
    case Fragment:
      processFragment(vnode, container, parentComponent);
      break;

    case Text:
      processText(vnode, container);
      break;

    default:
      if (shapeFlag & ShapeFlags.ELEMENT) {
        processElement(vnode, container, parentComponent);
      } else if (shapeFlag && ShapeFlags.STATEFUL_COMPONENT) {
        processComponent(vnode, container, parentComponent);
      }
  }
}
function processFragment(vnode: any, container: any, parentComponent: any) {
  mountChildren(vnode, container, parentComponent);
}
function processText(vnode: any, container: any) {
  const { children } = vnode;
  const textNode = (vnode.el = document.createTextNode(children));
  container.append(textNode);
}
function processElement(vnode: any, container: any, parentComponent: any) {
  mountElement(vnode, container, parentComponent);
}
function mountElement(vnode: any, container: any, parentComponent: any) {
  const el = (vnode.el = document.createElement(vnode.type));
  const { children, props, shapeFlag } = vnode;
  if (shapeFlag & ShapeFlags.TEXT_CHILDREN) {
    el.textContent = children;
  } else if (shapeFlag & ShapeFlags.ARRAY_CHILDREN) {
    mountChildren(vnode, el, parentComponent);
  }
  for (const key in props) {
    console.log(key);
    const val = props[key];
    // on + EventName
    const isOn = (key: string) => /^on[A-Z]/.test(key);
    if (isOn(key)) {
      const event = key.slice(2).toLowerCase();
      el.addEventListener(event, val);
    } else {
      el.setAttribute(key, val);
    }
  }
  container.append(el);
  // document.append(container);
}
function mountChildren(vnode: any, container: any, parentComponent: any) {
  vnode.children.forEach((v) => {
    patch(v, container, parentComponent);
  });
}

function processComponent(vnode: any, container: any, parentComponent: any) {
  mountComponent(vnode, container, parentComponent);
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
  const { proxy } = instance;
  const subTree = instance.render.call(proxy);
  patch(subTree, container, instance);
  initialVNode.el = subTree.el;
}
