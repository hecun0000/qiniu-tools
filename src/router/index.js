import Vue from 'vue'
import Router from 'vue-router'

const Layout = () => import('@/views/layout/index')

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'home',
      component: Layout,
      redirect: '/upload',
      children: [
        {
          path: '/upload',
          name: 'upload',
          component: () => import('@/views/upload/index')
        },
        {
          path: '/tailor',
          name: 'expend',
          component: () => import('@/views/tailor/index')
        },
        {
          path: '/user',
          name: 'user',
          component: () => import('@/views/user/index')
        },
        {
          path: '/setting',
          name: 'setting',
          component: () => import('@/views/setting/index')
        }
      ]
    },
    {
      path: '*',
      redirect: '/'
    }
  ]
})
