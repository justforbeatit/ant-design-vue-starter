import { resolve } from 'path'
import Pages from 'vite-plugin-pages'

export default function() {
  return [
    Pages({
      importMode: 'async',
      exclude: [resolve(__dirname, './src/pages/layouts/*.vue')],
      extendRoute(route) {
        if (['auth-login', 'index'].includes(route.name)) {
          return route
        }
        return { ...route, meta: { auth: true } }
      }
    })
  ]
}
