import 'babel-polyfill'
import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

const store = new Vuex.Store({
  state: {
    isLogin: false,
    loginUser: null,
    name: null,
    email: null,
    password: null
  },
  getters: {
    nameGetter(state){return state.name},
    emailGetter(state){return state.email},
    passGetter(state){return state.password},
  },
  mutations: {
    addUserMutation(state, payload){state.name = payload.name},
    addEmailMutation(state, payload){state.email = payload.email},
    addPassMutation(state, payload){state.password = payload.password}
  },
  actions: {
    addNameAction({commit}, name){
      commit('addUserMutation', {name})
    },
    addEmailAction({commit}, email){
      commit('addEmailMutation', {email})
    },
    addPassAction({commit}, password){
      commit('addPassMutation', {password})
    }
  }
})
export default store