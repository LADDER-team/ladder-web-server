import 'babel-polyfill'
import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

const store = new Vuex.Store({
  state: {
    isLogin: false,
    token: null,
    name: null,
    email: null,
    password: null
  },
  getters: {
    nameGetter(state){return state.name},
    emailGetter(state){return state.email},
    passGetter(state){return state.password},

    tokenGetter(state){return state.token},
    loginGetter(state){return state.isLogin}
  },
  mutations: {
    addUserMutation(state, payload){state.name = payload.name},
    addEmailMutation(state, payload){state.email = payload.email},
    addPassMutation(state, payload){state.password = payload.password},

    addTokenMutation(state, payload){state.token = payload.token},
    loginEmailMutation(state, payload){state.email = payload.email},
    loginPassMutation(state, payload){state.password = payload.password},
    loginMutation(state, payload){state.isLogin = payload.isLogin}
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
    },

    addTokenAction({commit}, token){
      commit('addTokenMutation', {token})
    },
    loginEmailAction({commit}, email){
      commit('loginEmailMutation', {email})
    },
    loginPassAction({commit}, password){
      commit('loginPassMutation', {password})
    },
    loginAction({commit}, isLogin){
      commit('loginMutation', { isLogin })
    }
  }
})
export default store