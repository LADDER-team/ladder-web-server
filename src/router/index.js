import Vue from 'vue'
import Router from 'vue-router'
import App from '../App'
import LadderDetail from '../pages/LadderDetail'
import LadderList from '../pages/LadderList'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'list',
      component: LadderList
    },
    {
      path: '/detail',
      name: 'detail',
      component: LadderDetail
    }
  ]
})
