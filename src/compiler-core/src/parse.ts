import { NodeTypes } from './ast';
const enum TagType {
  Start,
  End,
}
export function baseParse(content: string) {
  const context = createParserContext(content);
  return createRoot(parseChildren(context));
}
function createRoot(children) {
  return { children };
}

function createParserContext(content: string) {
  return {
    source: content,
  };
}
function parseChildren(context): any {
  const nodes: any = [];
  let node;
  const s = context.source;
  if (s.startsWith('{{')) {
    node = parseInterpolation(context);
  } else if (s[0] === '<') {
    if (/[a-z]/i.test(s[1])) {
      console.log('element');
      node = parseElement(context);
    }
  }
  nodes.push(node);
  return nodes;
}
function parseElement(context: any) {
  // 解析 tag
  const element = parseTag(context, TagType.Start);
  parseTag(context, TagType.End);
  console.log('context22222222 :>> ', context);
  return element;
}
function parseTag(context: any, type: TagType) {
  const match: any = /^<(\/?[a-z]*)/i.exec(context.source);
  console.log('match :>> ', match);
  const tag = match[1];
  // 删除处理完成的代码
  advanceBy(context, match[0].length);
  advanceBy(context, 1);
  if (type === TagType.End) return;
  return {
    type: NodeTypes.ELEMENT,
    tag,
  };
}

function parseInterpolation(context) {
  // {{message}}
  const openDelimiter = '{{';
  const closeDelimiter = '}}';

  const closeIndex = context.source.indexOf(
    closeDelimiter,
    openDelimiter.length
  );
  advanceBy(context, openDelimiter.length);
  const rawContentLength = closeIndex - openDelimiter.length;
  const rawContent = context.source.slice(0, rawContentLength);
  const content = rawContent.trim();
  advanceBy(context, rawContentLength + closeDelimiter.length);
  return {
    type: NodeTypes.INTEPROLATION,
    content: {
      type: NodeTypes.SIMPLE_EXPRESSION,
      content,
    },
  };
}
function advanceBy(context: any, length: number) {
  context.source = context.source.slice(length);
}
