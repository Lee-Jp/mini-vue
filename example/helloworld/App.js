import { h } from '../../lib/guild-mini-vue.esm.js';
export const App = {

  render(){
    return h('div', this.msg);
  },

  setup(){

    return {
      msg:'mini vue',
    }
  }
}