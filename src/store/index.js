import 'babel-polyfill'
import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

const store = new Vuex.Store({
  state: {
    isDialog: false,
    isLogin: false,
    isSign: false,
    email: null,
    name: null,
    password: null,
    token: null,
    userId: null
  },
  getters: {
    dialogGetter(state) {
      return state.isDialog
    },
    emailGetter(state) {
      return state.email
    },
    loginGetter(state) {
      return state.isLogin
    },
    nameGetter(state) {
      return state.name
    },
    passGetter(state) {
      return state.password
    },
    signGetter(state) {
      return state.isSign
    },
    tokenGetter(state) {
      return state.token
    },
    userIdGetter(state){
      return state.userId
    }
  },
  mutations: {
    addEmailMutation(state, payload) {
      state.email = payload.email
    },
    addPassMutation(state, payload) {
      state.password = payload.password
    },
    addUserMutation(state, payload) {
      state.name = payload.name
    },
    addTokenMutation(state, payload) {
      state.token = payload.token
      localStorage.setItem('token', state.token)
    },
    addUserIdMutation(state, payload){
      state.userId = payload.userId
    },
    dialogMutation(state, payload) {
      state.isDialog = payload.isDialog
    },
    loginEmailMutation(state, payload) {
      state.email = payload.email
    },
    loginMutation(state, payload) {
      state.isLogin = payload.isLogin
    },
    loginPassMutation(state, payload) {
      state.password = payload.password
    },
    signMutation(state, payload) {
      state.isSign = payload.isSign
    }
  },
  actions: {
    addEmailAction({commit}, email) {
      commit('addEmailMutation', {email})
    },
    addNameAction({commit}, name) {
      commit('addUserMutation', {name})
    },
    addPassAction({commit}, password) {
      commit('addPassMutation', {password})
    },
    addTokenAction({commit}, token) {
      commit('addTokenMutation', {token})
    },
    addUserIdAction({commit}, userId){
      commit('addUserIdMutation', {userId})
    },
    dialogAction({commit}, isDialog) {
      commit('dialogMutation', {isDialog})
    },
    signAction({commit}, isSign) {
      commit('signMutation', {isSign})
    },
    loginAction({commit}, isLogin) {
      commit('loginMutation', {isLogin})
    },
    loginEmailAction({commit}, email) {
      commit('loginEmailMutation', {email})
    },
    loginPassAction({commit}, password) {
      commit('loginPassMutation', {password})
    }
  }
})
export default store