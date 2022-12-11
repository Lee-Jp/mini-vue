import { NodeTypes } from './ast';

export function isText(node) {
  return [NodeTypes.TEXT, NodeTypes.INTEPROLATION].includes(node.type);
}
