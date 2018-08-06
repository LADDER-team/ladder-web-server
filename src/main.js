import Vue from 'vue'
import App from './App'
import router from './router'
import store from './store'
import Vuetify from 'vuetify'
import VueCookies from 'vue-cookies'
import 'vuetify/dist/vuetify.min.css'
Vue.config.productionTip = false

Vue.use(
    Vuetify,
    VueCookies,
)

new Vue({
  el: '#app',
  router,
  store,
  scroll,
  Vuetify,
  VueCookies,
  render: h => h(App)
})

