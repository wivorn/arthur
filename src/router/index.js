import Vue from 'vue'
import Router from 'vue-router'
import Login from '@/pages/Login'
import Main from '@/pages/Main'
import ForYou from '@/pages/ForYou'
import Learn from '@/pages/Learn'
import Shop from '@/pages/Shop'
import Service from '@/pages/Service'
import Settings from '@/pages/Settings'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/login',
      name: 'Login',
      component: Login
    },
    {
      path: '/',
      name: 'Main',
      component: Main,
      children: [
        {
          path: 'you',
          name: 'ForYou',
          component: ForYou
        },
        {
          path: 'learn',
          name: 'Learn',
          component: Learn
        },
        {
          path: 'shop',
          name: 'Shop',
          component: Shop
        },
        {
          path: 'service',
          name: 'Service',
          component: Service
        },
        {
          path: 'settings',
          name: 'Settings',
          component: Settings
        }
      ]
    }
  ]
})
