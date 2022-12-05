export function shouldUpdateComponent(prevVNode, nextVNode) {
  const { porps: prevProps } = prevVNode;
  const { porps: nextProps } = nextVNode;
  for (const key in nextProps) {
    if (nextProps[key] !== prevProps[key]) {
      return true;
    }
  }
  return false;
}
