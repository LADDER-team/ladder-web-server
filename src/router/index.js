import Vue from 'vue'
import Router from 'vue-router'
import LadderDetail from '../Views/LadderDetailPage'
import LadderList from '../Views/LadderListPage'
import LadderPost from '../Views/LadderPostPage'
import MyPage from '../Views/MyPage'

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
    },
    {
      path: '/user/:name',
      name: 'user',
      component: MyPage
    }
  ]
})
