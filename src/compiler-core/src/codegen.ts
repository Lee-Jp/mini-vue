import { NodeTypes } from './ast';
import {
  CREATE_ELEMENT_VNODE,
  helperMapName,
  TO_DISPLAY_STRING,
} from './runtimeHelpers';

export function generate(ast) {
  const context = createCodegenContext();
  const { push } = context;

  genFunctionPreamble(ast, context);
  const functionName = 'render';

  const args = ['_ctx', '_cache'];
  const signature = args.join(', ');

  push(`function ${functionName}(${signature}){`);
  push(`return `);
  genNode(ast.codegenNode, context);
  push(`}`);
  return {
    code: context.code,
    // code: `
    // return function render(_ctx,_cache, $props, $setup, $data, $options) {
    //   return "hi 1"
    // }
    // `,
  };
}
function genFunctionPreamble(ast: any, context) {
  const { push, helper } = context;
  const VueBinging = 'Vue';
  const aliasHelper = (s) => `${helperMapName[s]}: _${helperMapName[s]}`;
  if (ast.helpers.length > 0) {
    push(
      `const { ${ast.helpers.map(aliasHelper).join(', ')} } = ${VueBinging};`
    );
  }
  push('\n');
  push('return ');
}

function genNode(node: any, context: any) {
  switch (node.type) {
    case NodeTypes.TEXT:
      genText(node, context);
      break;
    case NodeTypes.INTEPROLATION:
      genInterprolation(node, context);
      break;
    case NodeTypes.SIMPLE_EXPRESSION:
      genExpression(node, context);
      break;
    case NodeTypes.ELEMENT:
      genElement(node, context);
      break;
    default:
      break;
  }
}

function genElement(node: any, context: any) {
  const { push, helper } = context;
  const { tag } = node;
  push(`${helper(CREATE_ELEMENT_VNODE)}('${tag}')`);
}

function genExpression(node: any, context: any) {
  const { push } = context;

  push(`${node.content}`);
}
function genInterprolation(node: any, context: any) {
  const { push, helper } = context;
  push(`${helper(TO_DISPLAY_STRING)}(`);
  genNode(node.content, context);
  push(')');
}

function genText(node: any, context: any) {
  const { push } = context;
  push(`'${node.content}'`);
}

function createCodegenContext() {
  const context = {
    code: '',
    push(source) {
      context.code += source;
    },
    helper(key) {
      return `_${helperMapName[key]}`;
    },
  };
  return context;
}
