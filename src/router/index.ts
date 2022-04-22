import { createRouter, createWebHistory } from 'vue-router'
//import autoload from '@/utils/router'
import progress from '@/utils/progress'
import routes from '~pages'

console.info(routes)

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes/*: [
    {
      path: '/',
      name: 'home',
      component: () => import('@/views/HomeView.vue'),
      children: [
        ...autoload()
      ]
    },
    {
      path: '/auth/login',
      name: 'auth.login',
      component: () => import('@/views/LoginView.vue')
    },
    {
      path: '/playground',
      name: 'test',
      component: () => import('@/views/Playground.vue')
    },
  ]*/
})

router.beforeEach((to, from) => {
  progress.start()
})

router.afterEach(() => {
  progress.done()
})

export default router
