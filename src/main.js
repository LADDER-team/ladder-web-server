import Vue from 'vue'
import App from './App'
import router from './router'
import store from './store'
import Vuetify from 'vuetify'
import 'vuetify/dist/vuetify.min.css'
import _ from './lib/lodash'

Vue.config.productionTip = false

Vue.use(
    Vuetify,
)

new Vue({
  el: '#app',
  router,
  store,
  scroll,
  Vuetify,
  render: h => h(App)
})

