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