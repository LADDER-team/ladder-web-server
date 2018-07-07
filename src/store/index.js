import 'babel-polyfill'
import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

const store = new Vuex.Store({
  state: {
    test: 1
  },
  mutations: {
    increment: state=>{state.test++}
  }
})
export default store