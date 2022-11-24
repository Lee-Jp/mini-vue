import { camelize, toHandlerKey } from "../shared/index";

export function emit(instance, event, ...args) {
  console.log('emit', event);
  const { props } = instance;

  // TPP
  // 先写一个特定的行为，在重构成通用行为
  const handlerName = toHandlerKey(camelize(event));
  const handler = props[handlerName];
  handler && handler(...args);
}
