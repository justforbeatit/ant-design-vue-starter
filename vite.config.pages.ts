import type { RouteRecordRaw } from 'vue-router'
import Pages from 'vite-plugin-pages'
import {resolve} from 'path'

export default function() {
  return [
    Pages({
      importMode: 'async',
      dirs: [
        { dir: 'src/views', baseRoute: '' }
      ],
      exclude: [resolve(__dirname, 'src/views/components/**/*')],
      extendRoute(route: RouteRecordRaw) {
        route.name = (route.name! as string).toLowerCase()
        if (['auth-login', 'index'].includes(<string>route.name)) {
          return route
        }
        return { ...route, meta: { auth: true } }
      }
    })
  ]
}
