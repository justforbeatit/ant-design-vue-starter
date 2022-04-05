import { createRouter, createWebHistory } from 'vue-router'
import autoload from '@/utils/router'
import progress from '@/utils/progress'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
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
  ]
})

router.beforeEach((to, from) => {
  progress.start()
})

router.afterEach(() => {
  progress.done()
})

export default router
