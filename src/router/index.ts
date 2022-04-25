import { createRouter, createWebHistory } from 'vue-router'
import progress from '@/utils/progress'
import routes from '~pages'

console.info(routes)

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes
})

router.beforeEach((to, from) => {
  progress.start()
})

router.afterEach(() => {
  progress.done()
})

export default router
