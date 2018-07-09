import Vue from 'vue'
import Router from 'vue-router'
import App from '../App'
import LadderDetail from '../Views/LadderDetail'
import LadderList from '../Views/LadderList'
import LadderPost from '../Views/LadderPost'

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
    },
    {
      path: '/post',
      name: 'post',
      component: LadderPost
    }
  ]
})
