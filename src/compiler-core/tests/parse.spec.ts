import { NodeTypes } from '../src/ast';
import { baseParse } from '../src/parse';

describe('Parse', () => {
  describe('interpolation', () => {
    test('simple interpolation', () => {
      const ast = baseParse('{{message}}');

      expect(ast.children[0]).toStrictEqual({
        type: NodeTypes.INTEPROLATION,
        content: {
          type: NodeTypes.SIMPLE_EXPRESSION,
          content: 'message',
        },
      });
    });
  });
  describe('element',()=>{
    test('simple interpolation', () => {
      const ast = baseParse('<div></div>');

      expect(ast.children[0]).toStrictEqual({
        type: NodeTypes.ELEMENT,
        tag: 'div'
      });
    }); 
  })
});
