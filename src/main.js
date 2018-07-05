import Vue from 'vue'
import App from './App'
import router from './router'
import Vuetify from 'vuetify'
import 'vuetify/dist/vuetify.min.css'

Vue.config.productionTip = false

Vue.use(
    Vuetify
)

new Vue({
  el: '#app',
  router,
  scroll,
  Vuetify,
  render: h => h(App)
})

Vue.use(
    Vuetify
)
