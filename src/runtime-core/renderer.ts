import { isObject } from '../shared/index';
import { createComponentInstance, setupComponent } from './components';

export function render(vnode, container) {
  patch(vnode, container);
}
function patch(vnode, container) {
  console.log('vnode :>> ', vnode);
  if (typeof vnode.type === 'string') {
    processElement(vnode, container);
  } else if (isObject(vnode.type)) {
    processComponent(vnode, container);
  }
}
function processComponent(vnode: any, container: any) {
  mountComponent(vnode, container);
}

function mountComponent(vnode: any, container: any) {
  const instance = createComponentInstance(vnode);
  setupComponent(instance);
  setupRenderEffect(instance, container);
}
function setupRenderEffect(instance: any, container: any) {
  const {proxy} = instance;
  const subTree = instance.render.call(proxy);
  patch(subTree, container);
}
function processElement(vnode: any, container: any) {
  mountElement(vnode, container);
}
function mountElement(vnode: any, container: any) {
  const el = document.createElement(vnode.type);
  const { children, props } = vnode;
  if (typeof children === 'string') {
    el.textContent = children;
  } else if (Array.isArray(children)) {
    mountChildren(vnode, el);
  }
  for (const key in props) {
    const val = props[key];
    el.setAttribute(key, val);
  }
  container.append(el);
  // document.append(container);
}
function mountChildren(vnode: any, container: any) {
  vnode.children.forEach((v) => {
    patch(v, container);
  });
}
