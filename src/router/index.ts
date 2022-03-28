import { createRouter, createWebHistory } from 'vue-router'
import { autoload } from '@/utils/route'

autoload()

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: () => import('@/views/HomeView.vue')
    },
    {
      path: '/auth/login',
      name: 'auth.login',
      component: () => import('@/views/LoginView.vue')
    },
  ]
})

export default router
