import Vue from 'vue'
import Router from 'vue-router'
import App from '../App'
import LadderDetail from '../Views/LadderDetail'
import LadderList from '../Views/LadderList'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'list',
      component: LadderList
    },
    {
      path: '/detail/:id',
      name: 'detail',
      component: LadderDetail
    }
  ]
})
